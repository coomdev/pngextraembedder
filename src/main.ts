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

import { decodeCoom3Payload, fireNotification, getEmbedsFromCache, getSelectedFile } from "./utils";
import { getQueryProcessor, QueryProcessor } from "./websites";
import { ifetch, Platform, streamRemote, supportedAltDomain } from "./platform";
import TextEmbeddingsSvelte from "./Components/TextEmbeddings.svelte";
import { HydrusClient } from "./hydrus";
import { registerPlugin } from 'linkifyjs';
import ViewCountSvelte from "./Components/ViewCount.svelte";

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

const processImage = async (srcs: AsyncGenerator<string, void, void>, fn: string, hex: string, prevurl: string, onfound: () => void) => {
    const ret = await Promise.all(processors.filter(e => e.match(fn)).map(async proc => {
        if (proc.skip) {
            // skip file downloading, file is referenced from the filename
            // basically does things like filtering out blacklisted tags
            const md5 = Buffer.from(hex, 'base64');
            if (await proc.has_embed(md5, fn, prevurl) === true) {
                onfound();
                return [await proc.extract(md5, fn), true] as [EmbeddedFile[], boolean];
            }
            return;
        }
        let succ = false;
        let cumul: Buffer;
        do {
            try {
                const n = await srcs.next();
                if (n.done)
                    return; // no more links to try
                const iter = streamRemote(n.value);
                if (!iter)
                    return;
                cumul = Buffer.alloc(0);
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
                succ = true;
                await iter.next(true);
                if (found === false) {
                    //console.log(`Gave up on ${src} after downloading ${cumul.byteLength} bytes...`);
                    return;
                }
                onfound();
                return [await proc.extract(cumul), false] as [EmbeddedFile[], boolean];
            } catch {
                // ignore error and retry with another link
            }
        } while (!succ);
    }));
    return ret.filter(e => e).map(e => e!);
};

const textToElement = <T = HTMLElement>(s: string) =>
    document.createRange().createContextualFragment(s).children[0] as any as T;

type ParametersExceptFirst<F> =
    F extends (arg0: any, ...rest: infer R) => any ? R : never;
const buildCumFun = <T extends any[], U>(f: (args: T[]) => void, ...r: ParametersExceptFirst<typeof debounce>): (args: T) => void => {
    let cumul: T[] = [];
    const debounced = debounce(() => {
        f(cumul);
        cumul = [];
    }, ...r);
    return (newarg: T) => {
        cumul.push(newarg);
        debounced();
    };
};

let pendingPosts: { id: number, op: number }[] = [];
// should be equivalent to buildCumFun(signalNewEmbeds, 5000, {trailing: true})
const signalNewEmbeds = debounce(async () => {
    // ensure user explicitely enabled telemetry
    if (!csettings.tm)
        return;
    try {
        const boardname = location.pathname.match(/\/([^/]*)\//)![1];
        // restructure to minimize redundancy
        const reshaped = Object.fromEntries([...new Set(pendingPosts.map(e => e.op))].map(e => [e, pendingPosts.filter(p => p.op == e).map(e => e.id)]));
        console.log(reshaped);

        const res = await ifetch("https://shoujo.coom.tech/listing/" + boardname, {
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

const shouldUseCache = () => {
    if (cappState.isCatalog)
        return false;
    return typeof csettings.cache == "boolean"
        ? csettings.cache
        : location.hostname.includes('b4k');
};

const processPost = async (post: HTMLDivElement) => {
    const origlink = qp.getImageLink(post);
    if (!origlink)
        return;
    const thumbLink = qp.getThumbnailLink(post);
    if (!thumbLink)
        return;
    let res2: [EmbeddedFile[], boolean][] | undefined = undefined;

    if (shouldUseCache()) {
        res2 = await getEmbedsFromCache(qp.getCurrentBoard(), +qp.getCurrentThread()!, post.id);
    }
    if (!res2) {
        res2 = await processImage(origlink, qp.getFilename(post), qp.getMD5(post), thumbLink,
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
    }
    if (!res2 || res2.length == 0)
        return;
    processAttachments(post, res2?.flatMap(e => e![0].map(k => [k, e![1]] as [EmbeddedFile, boolean])));
};

const versionCheck = async () => {
    const txt = (await (await ifetch("https://raw.githubusercontent.com/coomdev/pngextraembedder/main/main.meta.js")).text());
    const [lmajor, lminor] = txt.split('\n')
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

const __DOMParser = execution_mode == "userscript" ? _DOMParser : DOMParser;
const cleanupHTML = (ndom: Document) => {
    const evalWhenReady: string[] = [];
    const addFromSource = (elem: HTMLElement, url: string) => {
        const scr = document.createElement('script');
        scr.type = 'text/javascript';
        scr.src = url;
        elem.append(scr);
    };

    const addFromCode = (elem: HTMLElement, sr: string) => {
        const scr = document.createElement('script');
        scr.type = 'text/javascript';
        scr.innerText = sr;
        elem.append(scr);
    };

    const rm = (e: any) => e.remove();
    [...ndom.head.children].filter(e => e.tagName == "SCRIPT").forEach(rm);
    [...ndom.body.children].filter(e => e.tagName == "SCRIPT").forEach(rm);

    addFromSource(ndom.body, "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
    addFromSource(ndom.head, "https://based.coom.tech/highlight.pack.js");
    /*
        addFromCode(ndom.body, `document.documentElement.className = "";document.documentElement.lang = "en";document.documentElement.dataset.site = "arch.b4k.co";`);
        addFromCode(ndom.body, `hljs.configure({        tableReplace: '  '    });    $('pre,code').each(function(i, block) {        hljs.highlightBlock(block);    });    var backend_vars = {"user_name":false,"user_email":false,"user_pass":"9fOK4K8","site_url":"https://arch.b4k.co/","default_url":"https://arch.b4k.co/","archive_url":"https://arch.b4k.co/","system_url":"https://arch.b4k.co/","api_url":"https://arch.b4k.co/","cookie_domain":null,"cookie_prefix":"foolfuuka_a2e7d4_","selected_theme":"foolz/foolfuuka-theme-foolfuuka","csrf_token_key":"csrf_token","images":{"banned_image":"https://arch.b4k.co/foolfuuka/foolz/foolfuuka-theme-foolfuuka/assets-1.2.28/images/banned-image.png","banned_image_width":150,"banned_image_height":150,"missing_image":"https://arch.b4k.co/foolfuuka/foolz/foolfuuka-theme-foolfuuka/assets-1.2.28/images/missing-image.jpg","missing_image_width":150,"missing_image_height":150},"gettext":{"submit_state":"Submitting","thread_is_real_time":"This thread is being displayed in real time.","update_now":"Update now","ghost_mode":"This thread has entered ghost mode. Your reply will be marked as a ghost post and will only affect the ghost index."},"board_shortname":"v"};`);
        // head
        //body
            await addFromSource(ndom.body, "https://based.coom.tech/bootstrap.min.js");
            await addFromSource(ndom.body, "https://based.coom.tech/plugins.js");
    
            await addFromSource(ndom.body, "https://based.coom.tech/board.js");
            await addFromSource(ndom.body, "https://based.coom.tech/fuuka.js");
            await addFromSource(ndom.body, "https://based.coom.tech/lazyload.js");
        */
    return [ndom.documentElement.innerHTML, evalWhenReady] as [string, string[]];
};

let gmo: MutationObserver;

const earlystartup = async () => {
    if (location.host == 'arch.b4k.co' && execution_mode == "userscript") {
        if (!GM_getValue("warning_seen2", false)) {
            alert(`Due to b4k's policies being mean, PEE will get you banned, so the userscript version is disabled here`);
            alert("Use the WebExtension version of PEE if you want to use b4k!"); // "Cool new features will be coming to it, too", then MV3 happened.
            GM_setValue("warning_seen2", true);
            return false;
        }
    }
    return true;
};

const startup = async (is4chanX = true) => {
    const meta = document.querySelector('meta[name="referrer"]') as HTMLMetaElement;
    const customStyles = document.createElement('style');

    customStyles.appendChild(document.createTextNode(globalCss));
    document.documentElement.insertBefore(customStyles, null);

    if (!navigator.userAgent.includes('Firefox') && meta)
        meta.setAttribute('content', 'no-referrer');
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
        const QRObs = new MutationObserver(rec => {
            rec.forEach(m => {
                m.addedNodes.forEach(no => {
                    if ((no as HTMLElement).id != "quickReply") {
                        return;
                    }
                    document.dispatchEvent(new CustomEvent("QRDialogCreation", {
                        detail: no
                    }));
                });
            });
        });
        // only need immediate children of body
        QRObs.observe(document.body, { childList: true });

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

    if (!document.body) {
        let bodyRes: any;
        const bodyInit = new Promise(r => bodyRes = r);
        const mo2 = new MutationObserver(r => {
            if (document.body) {
                mo2.disconnect();
                bodyRes();
            }
        });
        mo2.observe(document.documentElement, { childList: true, subtree: true });
        await bodyInit;
    }

    if (!is4chanX && location.host.startsWith('boards.4chan')) {
        const notificationHost = document.createElement('span');
        new NotificationsHandler({
            target: notificationHost
        });
        document.body.append(notificationHost);
    }

    if (location.host == 'arch.b4k.co') {
        document.querySelectorAll<HTMLImageElement>('img[data-src]').forEach(i => {
            i.src = i.getAttribute('data-src')!;
        });
    }

    const appHost = textToElement(`<div class="peee-settings"></div>`);
    const appInstance = new App({ target: appHost });
    document.body.append(appHost);

    const scrollHost = textToElement(`<div></div>`);
    new ScrollHighlighter({ target: scrollHost });
    document.body.append(scrollHost);

    const posts = qp.postsWithFiles();
    const scts = qp.settingsHost();
    const button = textToElement(`<span></span>`);
    const settingsButton = new SettingsButton({
        target: button
    });
    scts?.appendChild(button);

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
// 4chanMainInit is fired even if the native extension is disabled, which we don't want
document.addEventListener('4chanParsingDone', () => startup(false), { once: true });
if (supportedAltDomain(location.host)) {
    if (location.host == 'arch.b4k.co') {
        gmo = new MutationObserver(m => {
            for (const r of m) {
                r.addedNodes.forEach(e => {
                    if ((e as any).tagName == "SCRIPT") {
                        const scr = e as HTMLScriptElement;
                        if (scr.src.startsWith('https://arch.b4k.co/') || scr.src.startsWith('https://b4k.co/')) {
                            let file = scr.src.slice(scr.src.lastIndexOf('/') + 1);
                            if (file.includes('?'))
                                file = file.slice(0, file.lastIndexOf('?'));
                            if (execution_mode == "userscript")
                                scr.src = `https://based.coom.tech/` + file;
                            else
                                scr.src = chrome.runtime.getURL('b4k/' + file);
                            return;
                        }
                        if ((scr.src && !scr.src.startsWith('https://ajax.googleapis.com/')) || scr.innerHTML.includes('googletagmanager') || scr.src.startsWith("data:")) {
                            scr.parentElement?.removeChild(scr);
                        }
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

    // attempt to load the view count, if it's found, attach it
    (async () => {
        const viewcounthost = document.createElement('div');
        const pid = +post.id.slice(post.id.match(/\d/)!.index);
        if (pid == qp.getCurrentThread()) {
            viewcounthost.style.right = '0px';
            viewcounthost.style.bottom = '0px';
            viewcounthost.style.position = 'absolute';
        } else {
            viewcounthost.style.right = '0px';
            viewcounthost.style.transform = 'translateX(calc(100% + 10px))';
            viewcounthost.style.position = 'absolute';
        }
        new ViewCountSvelte({
            target: viewcounthost,
            props: {
                board: qp.getCurrentBoard(),
                op: cappState.isCatalog ? pid : qp.getCurrentThread(),
                pid
            }
        });
        replyBox.insertAdjacentElement("afterbegin", viewcounthost);
        replyBox.style.position = 'relative';
    })();

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
