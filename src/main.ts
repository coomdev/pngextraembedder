import { Buffer } from "buffer";
import { appState, settings, initial_settings } from "./stores";
import { debounce } from './debounce';
import globalCss from './global.css';

import pngv3 from "./pngv3";
import webm from "./webm";
import gif from "./gif";
import jpg from "./jpg";
import thirdeye from "./thirdeye";
import pomf from "./pomf";

import App from "./Components/App.svelte";
import ScrollHighlighter from "./Components/ScrollHighlighter.svelte";
import PostOptions from "./Components/PostOptions.svelte";
import SettingsButton from './Components/SettingsButton.svelte';
import Embeddings from './Components/Embeddings.svelte';
import EyeButton from './Components/EyeButton.svelte';
import NotificationsHandler from './Components/NotificationsHandler.svelte';

import { fireNotification, getSelectedFile } from "./utils";
import { getQueryProcessor, QueryProcessor } from "./websites";
import { ifetch, streamRemote, supportedAltDomain } from "./platform";
import TextEmbeddingsSvelte from "./Components/TextEmbeddings.svelte";
import { HydrusClient } from "./hydrus";
import { registerPlugin } from 'linkifyjs';
import { GM_fetch } from "./requests";

export interface ImageProcessor {
    skip?: true;
    match(fn: string): boolean;
    has_embed(b: Buffer, fn?: string, prevurl?: string): boolean | Promise<boolean>;
    extract(b: Buffer, fn?: string): EmbeddedFile[] | Promise<EmbeddedFile[]>;
    inject?(b: File, c: string[]): Buffer | Promise<Buffer>;
}
let qp: QueryProcessor;

export let csettings: Parameters<typeof settings['set']>[0] = initial_settings;
let processors: ImageProcessor[] =
    [thirdeye, pomf, pngv3, jpg, webm, gif];

let cappState: Parameters<typeof appState['set']>[0];
settings.subscribe(async b => {
    if (b.hyd) {
        // transition from disable to enabled
        if (b.ak) {
            const hydCli = new HydrusClient(b.ak);
            console.log(b.ak);
            let herror: string | undefined;
            try {
                const valid = await hydCli.verify();
                if (!valid)
                    herror = "Hydrus appears to not be running or the key is wrong.";
                appState.set({ ...cappState, akValid: valid, client: hydCli, herror });
            } catch {
                herror = "Hydrus appears to not be running";
                appState.set({ ...cappState, akValid: false, client: null, herror });
            }
        }
    }
    csettings = b;
    processors = [...(!csettings.te ? [thirdeye] : []),
        pngv3, pomf, jpg, webm, gif
    ];

});

appState.subscribe(v => {
    cappState = v;
});

type EmbeddedFileWithPreview = {
    page?: { title: string, url: string }; // can be a booru page
    source?: string; // can be like a twitter post this was posted in originally
    thumbnail: string | Buffer;
    filename: string;
    data: EmbeddedFileWithoutPreview['data'] | ((lisn?: EventTarget) => Promise<Buffer>);
};

type EmbeddedFileWithoutPreview = {
    page: undefined;
    source: undefined;
    thumbnail?: string;
    filename: string;
    data: string | Buffer;
};

export type EmbeddedFile = EmbeddedFileWithPreview | EmbeddedFileWithoutPreview;

const processImage = async (src: string, fn: string, hex: string, prevurl: string, onfound: () => void): Promise<([EmbeddedFile[], boolean] | undefined)[]> => {
    return Promise.all(processors.filter(e => e.match(fn)).map(async proc => {
        if (proc.skip) {
            // skip file downloading, file is referenced from the filename
            // basically does things like filtering out blacklisted tags
            const md5 = Buffer.from(hex, 'base64');
            if (await proc.has_embed(md5, fn, prevurl) === true) {
                onfound();
                return [await proc.extract(md5, fn), true] as [EmbeddedFile[], boolean];
            } return;
        }
        // TODO: Move this outside the loop?
        const iter = streamRemote(src);
        if (!iter)
            return;
        let cumul = Buffer.alloc(0);
        let found: boolean | undefined;
        let chunk: ReadableStreamDefaultReadResult<Buffer> = { done: true };
        do {
            const { value, done } = await iter.next(typeof found === "boolean");
            if (done) {
                chunk = { done: true } as ReadableStreamDefaultReadDoneResult;
            } else {
                chunk = { done: false, value } as ReadableStreamDefaultReadValueResult<Buffer>;
                cumul = Buffer.concat([cumul, value!]);
                found = await proc.has_embed(cumul);
            }
        } while (found !== false && !chunk.done /* Because we only embed links now, it's safe to assume we get everything we need in the first chunk */);
        await iter.next(true);
        if (found === false) {
            //console.log(`Gave up on ${src} after downloading ${cumul.byteLength} bytes...`);
            return;
        }
        onfound();
        return [await proc.extract(cumul), false] as [EmbeddedFile[], boolean];
    }));
};

const textToElement = <T = HTMLElement>(s: string) =>
    document.createRange().createContextualFragment(s).children[0] as any as T;

let pendingPosts: { id: number, op: number }[] = [];

const signalNewEmbeds = debounce(async () => {
    // ensure user explicitely enabled telemetry
    if (!csettings.tm)
        return;
    try {
        const boardname = location.pathname.match(/\/([^/]*)\//)![1];
        // restructure to minimize redundancy
        const reshaped = Object.fromEntries([...new Set(pendingPosts.map(e => e.op))].map(e => [e, pendingPosts.filter(p => p.op == e).map(e => e.id)]));
        console.log(reshaped);

        const res = await fetch("https://shoujo.coom.tech/listing/" + boardname, {
            method: "POST",
            body: JSON.stringify(reshaped),
            headers: {
                'content-type': 'application/json'
            }
        });
        await res.json();
        pendingPosts = [];
    } catch (e) {
        // silently fail
        console.error(e);
    }
}, 5000, { trailing: true });

const processPost = async (post: HTMLDivElement) => {
    const origlink = qp.getImageLink(post);
    if (!origlink)
        return;
    const thumbLink = qp.getThumbnailLink(post);
    if (!thumbLink)
        return;
    let res2 = await processImage(origlink, qp.getFilename(post), qp.getMD5(post), thumbLink,
        () => {
            if (csettings.tm) {
                // dont report results from archive, only live threads
                if (['boards.4chan.org', 'boards.4channel.org'].includes(location.host)) {
                    if (!cappState.isCatalog) { // only save from within threads
                        // we must be in a thread, thus the following is valid
                        const op = +location.pathname.match(/\/thread\/(.*)/)![1];
                        pendingPosts.push({ id: +(post.id.match(/([0-9]+)/)![1]), op });
                        signalNewEmbeds(); // let it run async
                    }
                }
            }
            post.querySelector('.post')?.classList.add("embedfound");
        });
    res2 = res2?.filter(e => e);
    if (!res2 || res2.length == 0)
        return;
    processAttachments(post, res2?.flatMap(e => e![0].map(k => [k, e![1]] as [EmbeddedFile, boolean])));
};

const versionCheck = async () => {
    const [lmajor, lminor] =
        (await (await ifetch("https://git.coom.tech/coomdev/PEE/raw/branch/%e4%b8%ad%e5%87%ba%e3%81%97/main.meta.js"))
            .text())
            .split('\n')
            .filter(e => e.includes("// @version"))[0].match(/.*version\s+(.*)/)![1].split('.')
            .map(e => +e);
    const [major, minor] = BUILD_VERSION;
    if (major < lmajor || (major == lmajor && minor < lminor)) {
        fireNotification("info", `Last PEE version is ${lmajor}.${lminor}, you're on ${major}.${minor}`);
    }
};

// Not using the clipboard API because it needs focus
function copyTextToClipboard(text: string) {
    const copyFrom = document.createElement("textarea");
    copyFrom.textContent = text;
    document.body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.blur();
    document.body.removeChild(copyFrom);
    navigator.clipboard.writeText(text);
}

const scrapeBoard = async (self: HTMLButtonElement) => {
    if (csettings.tm) {
        fireNotification("success", "Scrapping board with telemetry on! Thank you for your service, selfless stranger ;_;7");
    }
    self.disabled = true;
    self.textContent = "Searching...";
    const boardname = location.pathname.match(/\/([^/]*)\//)![1];
    const res = await ifetch(`https://a.4cdn.org/${boardname}/threads.json`);
    const pages = await res.json() as Page[];
    type Page = { threads: Thread[] }
    type Thread = { no: number; posts: Post[] };
    type BasePost = { no: number, resto: number, tim: number };
    type PostWithFile = BasePost & { tim: number, ext: string, md5: string, filename: string };
    type PostWithoutFile = BasePost & Record<string, unknown>;
    type Post = (PostWithoutFile | PostWithFile);
    fireNotification("info", "Fetching all threads...");
    const threads = (await Promise.all(pages
        .reduce((a: Thread[], b: Page) => [...a, ...b.threads], [])
        .map(e => e.no)
        .map(async id => {
            try {
                const res = await ifetch(`https://a.4cdn.org/${boardname}/thread/${id}.json`);
                return await res.json() as Thread;
            } catch {
                return undefined;
            }
        }))).filter(e => e).map(e => e as Thread);
    const filenames = threads
        .reduce((a, b) => [...a, ...b.posts.filter(p => p.ext)
            .map(p => p as PostWithFile)], [] as PostWithFile[]).filter(p => p.ext != '.webm' && p.ext != '.gif')
        .map(p => [p.resto || p.no, `https://i.4cdn.org/${boardname}/${p.tim}${p.ext}`, p.md5, p.filename + p.ext, p.no] as [number, string, string, string, number]);

    console.log(filenames);
    fireNotification("info", "Analyzing images...");
    const n = 7;
    //console.log(posts);
    const processFile = (src: string, fn: string, hex: string) => {
        return Promise.all(processors.filter(e => e.match(fn)).map(async proc => {
            if (proc.skip) {
                const md5 = Buffer.from(hex, 'base64');
                return await proc.has_embed(md5, fn);
            }
            // TODO: Move this outside the loop?
            const iter = streamRemote(src);
            if (!iter)
                return false;
            let cumul = Buffer.alloc(0);
            let found: boolean | undefined;
            let chunk: ReadableStreamDefaultReadResult<Buffer> = { done: true };
            do {
                const { value, done } = await iter.next(typeof found === "boolean");
                if (done) {
                    chunk = { done: true } as ReadableStreamDefaultReadDoneResult;
                } else {
                    chunk = { done: false, value } as ReadableStreamDefaultReadValueResult<Buffer>;
                    cumul = Buffer.concat([cumul, value!]);
                    found = await proc.has_embed(cumul);
                }
            } while (found !== false && !chunk.done);
            await iter.next(true);
            return found === true;
        }));
    };
    const range = ~~(filenames.length / n) + 1;
    const hasEmbed: typeof filenames = [];
    const total = filenames.length;
    let processed = 0;

    const int = setInterval(() => {
        fireNotification("info", `Processed [${processed} / ${total}] files`);
    }, 5000);

    await Promise.all([...new Array(n + 1)].map(async (e, i) => {
        const postsslice = filenames.slice(i * range, (i + 1) * range);
        for (const post of postsslice) {
            try {
                const res = await processFile(post[1], post[3], post[2]);
                processed++;
                if (res.some(e => e)) {
                    hasEmbed.push(post);
                    // dont report results from archive, only live threads
                    if (['boards.4chan.org', 'boards.4channel.org'].includes(location.host)) {
                        pendingPosts.push({ id: post[4], op: post[0] });
                        signalNewEmbeds(); // let it run async
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
    }));

    clearInterval(int);

    const counters: Record<number, number> = {};
    for (const k of hasEmbed)
        counters[k[0]] = k[0] in counters ? counters[k[0]] + 1 : 1;
    console.log(counters);
    fireNotification("success", "Processing finished! Results pasted in the clipboard");
    const text = Object.entries(counters).sort((a, b) => b[1] - a[1]).map(e => `>>${e[0]} (${e[1]})`).join('\n');
    console.log(text);
    copyTextToClipboard(text);
    self.textContent = "Copy Results";
    self.disabled = false;
    self.onclick = () => {
        copyTextToClipboard(text);
    };
};

const cleanupHTML = async (s: string) => {
    const ndom = new _DOMParser().parseFromString(s, "text/html");
    const evalWhenReady: string[] = [];
    const addFromSource = async (elem: HTMLElement, url: string) => {
        /* const scr = document.createElement('script');
         scr.type = 'text/javascript';
         scr.src = url;
         scr.addEventListener("load", e => console.log('url loaded', e));
         elem.append(scr);*/
        try {
            const code = await (await GM_fetch(url)).text();
            evalWhenReady.push(code);
        } catch (e) {
            console.error(e);
            debugger;

        }
    };

    const addFromCode = (elem: HTMLElement, sr: string) => {
        /*        const scr = document.createElement('script');
                scr.type = 'text/javascript';
                scr.innerText = sr;
                scr.addEventListener("load", e => console.log('code loaded', e));
                elem.append(scr);*/
        //eval(sr);
        evalWhenReady.push(sr);
    };

    [...ndom.head.children].filter(e => e.tagName == "SCRIPT").forEach(e => e.remove());
    [...ndom.body.children].filter(e => e.tagName == "SCRIPT").forEach(e => e.remove());

    unsafeWindow['isEventSupported'] = () => false;

    await addFromSource(ndom.body, "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
    await addFromSource(ndom.head, "https://based.coom.tech/highlight.pack.js");
    addFromCode(ndom.body, `
    document.documentElement.className = "";
    document.documentElement.lang = "en";
    document.documentElement.dataset.site = "arch.b4k.co";`);
    addFromCode(ndom.body, `
    hljs.configure({
        tableReplace: '  '
    });
    $('pre,code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    var backend_vars = {"user_name":false,"user_email":false,"user_pass":"9fOK4K8","site_url":"https://arch.b4k.co/","default_url":"https://arch.b4k.co/","archive_url":"https://arch.b4k.co/","system_url":"https://arch.b4k.co/","api_url":"https://arch.b4k.co/","cookie_domain":null,"cookie_prefix":"foolfuuka_a2e7d4_","selected_theme":"foolz/foolfuuka-theme-foolfuuka","csrf_token_key":"csrf_token","images":{"banned_image":"https://arch.b4k.co/foolfuuka/foolz/foolfuuka-theme-foolfuuka/assets-1.2.28/images/banned-image.png","banned_image_width":150,"banned_image_height":150,"missing_image":"https://arch.b4k.co/foolfuuka/foolz/foolfuuka-theme-foolfuuka/assets-1.2.28/images/missing-image.jpg","missing_image_width":150,"missing_image_height":150},"gettext":{"submit_state":"Submitting","thread_is_real_time":"This thread is being displayed in real time.","update_now":"Update now","ghost_mode":"This thread has entered ghost mode. Your reply will be marked as a ghost post and will only affect the ghost index."},"board_shortname":"v"};`);
    // head
    //body
    {
        await addFromSource(ndom.body, "https://based.coom.tech/bootstrap.min.js");
        await addFromSource(ndom.body, "https://based.coom.tech/plugins.js");

        await addFromSource(ndom.body, "https://based.coom.tech/board.js");
        await addFromSource(ndom.body, "https://based.coom.tech/fuuka.js");
        await addFromSource(ndom.body, "https://based.coom.tech/lazyload.js");
    }
    return [ndom.documentElement.innerHTML, evalWhenReady] as [string, string[]];
};

let gmo: MutationObserver;
let ispostreload = false;

const earlystartup = async () => {
    if (location.host == 'arch.b4k.co') {
        if (GM.info.version == "2.13.0") {
            alert(`Due to b4k's admin being a faggot, PEE will get you banned if you're not using Greasemonkey Beta and enabled "Synchronous page mode" or TamperMonkey with Instant Injection`);
            alert("Because you use the regular GM, PEE will disable itself on this domain");
            return false;
        }
        if (!GM_getValue("warning_seen", false)) {
            alert(`Due to b4k's admin being a faggot, PEE will get you banned if you're not using Greasemonkey Beta and enabled "Synchronous page mode" or TamperMonkey with Instant Injection`);
            alert("Make sure you have enabled \"Synchronous page mode\" on VM Beta or Instant Injection on TM");
            if (!confirm("Proceed?")) {
                return false;
            }
            GM_setValue("warning_seen", true);
        }
        document.documentElement.innerHTML = '';
        const k = await GM_fetch(location.href);
        const src = await k.text();
        gmo.disconnect();
        ispostreload = true;
        const [code, scripts] = await cleanupHTML(src);
        unsafeWindow.document.documentElement.innerHTML = code;
        await new Promise(r => setTimeout(r, 500));
        //unsafeWindow.document.documentElement.replaceWith(unsafeWindow.document.documentElement.cloneNode(true));
        for (const s of scripts)
            unsafeWindow.eval(s);
        unsafeWindow.dispatchEvent(new CustomEvent("load"));
        // out of spite:
        document.querySelectorAll<HTMLImageElement>('img[data-src]').forEach(i => {
            i.src = i.getAttribute('data-src')!;
        });
        return true;
    }
};

const startup = async (is4chanX = true) => {
    const meta = document.querySelector('meta[name="referrer"]') as HTMLMetaElement;
    const customStyles = document.createElement('style');
    //return;
    customStyles.appendChild(document.createTextNode(globalCss));
    document.documentElement.insertBefore(customStyles, null);

    if (meta) {
        meta.setAttribute('name', 'referrer');
        meta.setAttribute('content', 'no-referrer');
    }

    appState.set({ ...cappState, is4chanX });
    const lqp = getQueryProcessor(is4chanX);
    if (!lqp)
        return;
    else
        qp = lqp;

    if (csettings.vercheck)
        versionCheck();

    const postQuote = ({ scanner, parser, utils }: any) => {
        const { CLOSEANGLEBRACKET, NUM } = scanner.tokens;
        const START_STATE = parser.start;

        const pref = qp.getPostIdPrefix();
        const endQuote = utils.createTokenClass('postQuote', {
            isLink: true,
            toHref() {
                return `#${pref}${this.toString().substr(2)}`;
            }
        });

        // A post quote (>>123456789) is made of
        const MEMEARROW1 = START_STATE.tt(CLOSEANGLEBRACKET); // One meme arrow followed by
        const MEMEARROW2 = MEMEARROW1.tt(CLOSEANGLEBRACKET); // another meme arrow, terminated by
        const POSTNUM_STATE = MEMEARROW2.tt(NUM, endQuote); // a number
    };

    registerPlugin('quote', postQuote);

    if (!is4chanX && location.host.startsWith('boards.4chan')) {
        const qr = QR;
        const show = qr.show.bind(qr);
        qr.show = (...args: any[]) => {
            show(...args);
            document.dispatchEvent(new CustomEvent("QRDialogCreation", {
                detail: document.getElementById('quickReply')
            }));
        };

        document.addEventListener("QRGetFile", (e) => {
            const qr = document.getElementById('qrFile') as HTMLInputElement | null;
            document.dispatchEvent(new CustomEvent("QRFile", { detail: (qr?.files || [])[0] }));
        });

        document.addEventListener("QRSetFile", ((e: CustomEvent<{ file: Blob, name: string }>) => {
            const qr = document.getElementById('qrFile') as HTMLInputElement | null;
            if (!qr) return;
            const dt = new DataTransfer();
            dt.items.add(new File([e.detail.file], e.detail.name));
            qr.files = dt.files;
        }) as any);

        const notificationHost = document.createElement('span');
        new NotificationsHandler({
            target: notificationHost
        });
        document.body.append(notificationHost);
    }
    //await Promise.all([...document.querySelectorAll('.postContainer')].filter(e => e.textContent?.includes("191 KB")).map(e => processPost(e as any)));

    // keep this to handle posts getting inlined
    const mo = new MutationObserver(reco => {
        for (const rec of reco)
            if (rec.type == "childList")
                rec.addedNodes.forEach(e => {
                    if (!(e instanceof HTMLElement))
                        return;
                    // apparently querySelector cannot select the root element if it matches
                    let el = qp.postsWithFiles(e);
                    if (!el && e.classList.contains('postContainer'))
                        el = [e];
                    if (el)
                        [...el].map(el => processPost(el as any));
                });
    });

    document.querySelectorAll('.board').forEach(e => {
        mo.observe(e!, { childList: true, subtree: true });
    });
    const posts = qp.postsWithFiles();

    const scts = qp.settingsHost();
    const button = textToElement(`<span></span>`);
    const settingsButton = new SettingsButton({
        target: button
    });
    scts?.appendChild(button);

    const appHost = textToElement(`<div class="peee-settings"></div>`);
    const appInstance = new App({ target: appHost });
    document.body.append(appHost);

    const scrollHost = textToElement(`<div></div>`);
    new ScrollHighlighter({ target: scrollHost });
    document.body.append(scrollHost);

    appState.set({
        ...cappState,
        isCatalog: !!document.querySelector('.catalog-small') || !!location.pathname.match(/\/catalog$/),
    });
    //await processPost(posts[0] as any);

    if (cappState.isCatalog) {
        const opts = qp.catalogControlHost() as HTMLDivElement;
        if (opts) {
            const button = document.createElement('button');
            button.textContent = "おもらし";
            button.onclick = () => scrapeBoard(button);
            opts.insertAdjacentElement("beforebegin", button);
        }
    }

    const n = 7;
    //console.log(posts);
    const range = ~~(posts.length / n) + 1;
    await Promise.all([...new Array(n + 1)].map(async (e, i) => {
        const postsslice = posts.slice(i * range, (i + 1) * range);
        for (const post of postsslice) {
            try {
                await processPost(post as any);
            } catch (e) { console.log('Processing failed for post', post, e); }
        }
    }));
    //await Promise.all(posts.map(e => processPost(e as any)));
};
document.addEventListener('4chanXInitFinished', () => startup(true));
document.addEventListener('4chanParsingDone', () => startup(false), { once: true });
if (supportedAltDomain(location.host)) {
    if (location.host == 'arch.b4k.co') {
        gmo = new MutationObserver(m => {
            for (const r of m) {
                if (ispostreload) debugger;
                r.addedNodes.forEach(e => {
                    if ((e as any).tagName == "SCRIPT") {
                        if (e.parentElement?.tagName == "HEAD" || e.parentElement?.tagName == "BODY")
                            e.parentElement?.removeChild(e);
                    }
                });
            }
        });
        gmo.observe(document.documentElement, { subtree: true, childList: true });
    }

    const proceed = earlystartup();

    window.addEventListener('load', async () => {
        if (await proceed)
            startup(false);
    }, { once: true });

}

document.addEventListener('4chanThreadUpdated', ((e: CustomEvent<{ count: number }>) => {
    document.dispatchEvent(new CustomEvent("ThreadUpdate", {
        detail: {
            newPosts: [...document.querySelector(".thread")!.children].slice(-e.detail.count).map(e => 'b.' + e.id.slice(2))
        }
    }));
}) as any);

document.addEventListener('ThreadUpdate', <any>(async (e: CustomEvent<any>) => {
    const newPosts = e.detail.newPosts;
    for (const post of newPosts) {
        const postContainer = document.getElementById("pc" + post.substring(post.indexOf(".") + 1)) as HTMLDivElement;
        processPost(postContainer);
    }
}));

document.addEventListener('QRDialogCreation', <any>((e: CustomEvent<HTMLElement>) => {
    const a = document.createElement('span');

    const po = new PostOptions({
        target: a,
        props: { processors, textinput: (e.detail || e.target).querySelector('textarea')! }
    });

    let prevFile: File;
    let target;
    const somethingChanged = async (m: any) => {
        // file possibly changed
        const currentFile = await getSelectedFile();
        if (prevFile != currentFile) {
            prevFile = currentFile;
            document.dispatchEvent(new CustomEvent("PEEFile", { detail: prevFile }));
        }
    };
    const obs = new MutationObserver(somethingChanged);
    if (!cappState.is4chanX) {
        target = e.detail;
        a.style.display = "inline-block";
        target.querySelector("input[type=submit]")?.insertAdjacentElement("beforebegin", a);
        const filesinp = target.querySelector('#qrFile') as HTMLInputElement;
        filesinp.addEventListener("change", somethingChanged);
    }
    else {
        target = e.target as HTMLDivElement;
        target.querySelector('#qr-filename-container')?.appendChild(a);
        const filesinp = target.querySelector('#file-n-submit') as HTMLInputElement;
        obs.observe(filesinp, { attributes: true });
    }

}), { once: !cappState!.is4chanX }); // 4chan's normal extension destroys the QR form everytime

function processAttachments(post: HTMLDivElement, ress: [EmbeddedFile, boolean][]) {
    if (ress.length == 0)
        return;
    const replyBox = qp.getPost(post);
    const external = ress[0][1];
    if (external)
        replyBox?.classList.add('hasext');
    else
        replyBox?.classList.add('hasembed');
    if (ress.length > 1)
        replyBox?.classList.add('hasmultiple');

    if (!cappState.foundPosts.includes(replyBox as HTMLElement))
        cappState.foundPosts.push(replyBox as HTMLElement);
    appState.set(cappState);

    const isCatalog = replyBox?.classList.contains('catalog-post');
    // add buttons
    if (!isCatalog) {
        const ft = qp.getFileThumbnail(post);
        const info = qp.getInfoBox(post);
        const quot = qp.getTextBox(post);
        const textInsertCursor = document.createElement('div');
        quot?.appendChild(textInsertCursor);
        const filehost: HTMLElement | null = ft.querySelector('.fiilehost');
        const eyehost: HTMLElement | null = info.querySelector('.eyeehost');
        const imgcont = filehost || document.createElement('div');
        const eyecont = eyehost || document.createElement('span');

        if (!filehost) {
            ft.append(imgcont);
            imgcont.classList.add("fileThumb");
            imgcont.classList.add("fiilehost");
        } else {
            imgcont.innerHTML = '';
        }
        if (!eyehost) {
            info.append(eyecont);
            eyecont.classList.add("eyeehost");
        } else {
            eyecont.innerHTML = '';
        }
        const id = ~~(Math.random() * 20000000);
        const text = new TextEmbeddingsSvelte({
            target: textInsertCursor,
            props: {
                files: ress.map(e => e[0]).filter(e =>
                    Buffer.isBuffer(e.data) && e.filename.endsWith('.txt') && e.filename.startsWith('message')
                )
            }
        });
        const emb = new Embeddings({
            target: imgcont,
            props: {
                files: ress.map(e => e[0]),
                id: '' + id
            }
        });
        new EyeButton({
            target: eyecont,
            props: {
                files: ress.map(e => e[0]),
                inst: emb,
                id: '' + id
            }
        });
    } else {
        const opFile = post.querySelector('.catalog-link');
        const ahem = opFile?.querySelector('.catalog-host');
        const imgcont = ahem || document.createElement('div');
        imgcont.className = "catalog-host";
        if (ahem) {
            imgcont.innerHTML = '';
        }
        const emb = new Embeddings({
            target: imgcont,
            props: {
                files: ress.map(e => e[0])
            }
        });
        if (!ahem)
            opFile?.append(imgcont);
    }

    post.setAttribute('data-processed', "true");
}
