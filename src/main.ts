import { Buffer } from "buffer";
import { appState, settings } from "./stores";
import globalCss from './global.css';

import png from "./png";
import webm from "./webm";
import gif from "./gif";
import thirdeye from "./thirdeye";

import { GM_fetch, GM_head, headerStringToObject } from "./requests";

import App from "./App.svelte";
import ScrollHighlighter from "./ScrollHighlighter.svelte";
import SettingsButton from './SettingsButton.svelte';
//import Embedding from './Embedding.svelte';
import Embeddings from './Embeddings.svelte';
import EyeButton from './EyeButton.svelte';

export interface ImageProcessor {
    skip?: true;
    match(fn: string): boolean;
    has_embed(b: Buffer, fn?: string): boolean | Promise<boolean>;
    extract(b: Buffer, fn?: string): EmbeddedFile | Promise<EmbeddedFile>;
    inject?(b: File, c: File): Buffer | Promise<Buffer>;
}

export let csettings: Parameters<typeof settings['set']>[0];
let processors: ImageProcessor[] =
    [thirdeye, png, webm, gif];

let cappState: Parameters<typeof appState['set']>[0];
settings.subscribe(b => {
    csettings = b;
    processors = [...(!csettings.te ? [thirdeye] : []), png, webm, gif
    ];
});

appState.subscribe(v => {
    cappState = v;
});

// most pngs are encoded with 65k idat chunks
async function* streamRemote(url: string, chunkSize = 16 * 1024, fetchRestOnNonCanceled = true) {
    const headers = await GM_head(url);
    const h = headerStringToObject(headers);
    const size = +h['content-length'];
    let ptr = 0;
    let fetchSize = chunkSize;
    while (ptr != size) {
        const res = await GM_fetch(url, { headers: { range: `bytes=${ptr}-${ptr + fetchSize - 1}` } }) as any as Tampermonkey.Response<any>;
        const obj = headerStringToObject(res.responseHeaders);
        if (!('content-length' in obj)) {
            console.warn("no content lenght???", url);
            break;
        } const len = +obj['content-length'];
        ptr += len;
        if (fetchRestOnNonCanceled)
            fetchSize = size;
        const val = Buffer.from(await (res as any).arrayBuffer());
        const e = (yield val) as boolean;
        if (e) {
            break;
        }
    }
    //console.log("streaming ended, ", ptr, size);
}

type EmbeddedFileWithPreview = {
    page?: { title: string, url: string }; // can be a booru page
    source?: string; // can be like a twitter post this was posted in originally
    thumbnail: Buffer;
    filename: string;
    data: (lisn?: EventTarget) => Promise<Buffer>;
};

type EmbeddedFileWithoutPreview = {
    page: undefined;
    source: undefined;
    thumbnail: undefined;
    filename: string;
    data: Buffer;
};

export type EmbeddedFile = EmbeddedFileWithPreview | EmbeddedFileWithoutPreview;

const processImage = async (src: string, fn: string, hex: string): Promise<([EmbeddedFile, boolean] | undefined)[]> => {
    return Promise.all(processors.filter(e => e.match(fn)).map(async proc => {
        if (proc.skip) {
            // skip file downloading, file is referenced from the filename
            // basically does things like filtering out blacklisted tags
            const md5 = Buffer.from(hex, 'base64');
            if (await proc.has_embed(md5, fn) === true)
                return [await proc.extract(md5, fn), true] as [EmbeddedFile, boolean];
            return;
        }
        const iter = streamRemote(src);
        if (!iter)
            return;
        let cumul = Buffer.alloc(0);
        let found: boolean | undefined;
        let chunk: ReadableStreamDefaultReadResult<Buffer> = { done: true };
        do {
            const { value, done } = await iter.next(found === false);
            if (done) {
                chunk = { done: true } as ReadableStreamDefaultReadDoneResult;
            } else {
                chunk = { done: false, value } as ReadableStreamDefaultReadValueResult<Buffer>;
            }
            if (!done)
                cumul = Buffer.concat([cumul, value!]);
            found = await proc.has_embed(cumul);
        } while (found !== false && !chunk.done);
        await iter.next(false);
        if (found === false) {
            //console.log(`Gave up on ${src} after downloading ${cumul.byteLength} bytes...`);
            return;
        }
        return [await proc.extract(cumul), false] as [EmbeddedFile, boolean];
    }));
};

const textToElement = <T = HTMLElement>(s: string) =>
    document.createRange().createContextualFragment(s).children[0] as any as T;

const processPost = async (post: HTMLDivElement) => {
    const thumb = post.querySelector("a.fileThumb") as HTMLAnchorElement;
    const origlink = post.querySelector('.file-info > a[target*="_blank"]') as HTMLAnchorElement;
    if (!thumb || !origlink)
        return;
    let res2 = await processImage(origlink.href,
        (origlink.querySelector('.fnfull') || origlink).textContent || '',
        post.querySelector("[data-md5]")?.getAttribute('data-md5') || '');
    res2 = res2?.filter(e => e);
    if (!res2 || res2.length == 0)
        return;
    processAttachments(post, res2?.filter(e => e) as [EmbeddedFile, boolean][]);
};

const startup = async () => {
    if (typeof (window as any)['FCX'] != "undefined")
        appState.set({ ...cappState, is4chanX: true });

    await Promise.all([...document.querySelectorAll('.postContainer')].filter(e => e.textContent?.includes("191 KB")).map(e => processPost(e as any)));

    // keep this to handle posts getting inlined
    const mo = new MutationObserver(reco => {
        for (const rec of reco)
            if (rec.type == "childList")
                rec.addedNodes.forEach(e => {
                    if (!(e instanceof HTMLElement))
                        return;
                    // apparently querySelector cannot select the root element if it matches
                    let el = (e as any).querySelectorAll('.postContainer:not([class*="noFile"])');
                    if (!el && e.classList.contains('postContainer'))
                        el = e;
                    if (el)
                        [...el].map(el => processPost(el as any));
                });
    });

    document.querySelectorAll('.board').forEach(e => {
        mo.observe(e!, { childList: true, subtree: true });
    });
    const posts = [...document.querySelectorAll('.postContainer:not([class*="noFile"])')];

    const scts = document.getElementById('shortcuts');
    const button = textToElement(`<span></span>`);
    const settingsButton = new SettingsButton({
        target: button
    });
    scts?.appendChild(button);

    const appHost = textToElement(`<div class="pee-settings"></div>`);
    const appInstance = new App({ target: appHost });
    document.body.append(appHost);

    const scrollHost = textToElement(`<div class="pee-scroll"></div>`);
    new ScrollHighlighter({ target: scrollHost });
    document.body.append(scrollHost);

    appState.set({
        ...cappState,
        isCatalog: !!document.querySelector('.catalog-small') || !!location.pathname.match(/\/catalog$/),
    });
    await Promise.all(posts.map(e => processPost(e as any)));
};

const getSelectedFile = () => {
    return new Promise<File>(res => {
        document.addEventListener('QRFile', e => res((e as any).detail), { once: true });
        document.dispatchEvent(new CustomEvent('QRGetFile'));
    });
};

//if (cappState!.is4chanX)
document.addEventListener('4chanXInitFinished', startup);
/*else {
    document.addEventListener("QRGetFile", (e) => {
        const qr = document.getElementById('qrFile') as HTMLInputElement | null;
        document.dispatchEvent(new CustomEvent("QRFile", { detail: (qr?.files || [])[0] }));
    });
    startup();
}*/

// Basically this is a misnommer: fires even when inlining existings posts, also posts are inlined through some kind of dom projection
document.addEventListener('ThreadUpdate', <any>(async (e: CustomEvent<any>) => {
    const newPosts = e.detail.newPosts;
    for (const post of newPosts) {
        const postContainer = document.getElementById("pc" + post.substring(post.indexOf(".") + 1)) as HTMLDivElement;
        processPost(postContainer);
    }
}));

if (cappState!.is4chanX) {
    const qr = (window as any)['QR'];
    const show = qr.show.bind(qr);
    qr.show = (...args: any[]) => {
        show(...args);
        document.dispatchEvent(new CustomEvent("QRDialogCreation", {
            detail: document.getElementById('quickReply')
        }));
    };
}

document.addEventListener('QRDialogCreation', <any>((e: CustomEvent<HTMLElement>) => {
    const a = document.createElement('a');
    const i = document.createElement('i');
    i.className = "fa fa-magnet";
    a.appendChild(i);
    a.title = "Embed File (Select a file before...)";

    let target;
    if (cappState.is4chanX) {
        i.innerText = "🧲";
        target = e.detail;
        target.querySelector("input[type=submit]")?.insertAdjacentElement("beforebegin", a);
    }
    else {
        target = e.target as HTMLDivElement;
        target.querySelector('#qr-filename-container')?.appendChild(a);
    }

    a.onclick = async (e) => {
        const file = await getSelectedFile();
        if (!file)
            return;
        const input = document.createElement('input') as HTMLInputElement;
        input.setAttribute("type", "file");
        const type = file.type;
        input.onchange = (async ev => {
            if (input.files) {
                try {
                    const proc = processors.find(e => e.match(file.name));
                    if (!proc)
                        throw new Error("Container filetype not supported");
                    if (!proc.inject)
                        return;
                    const buff = await proc.inject(file, input.files[0]);
                    document.dispatchEvent(new CustomEvent('QRSetFile', {
                        //detail: { file: new Blob([buff]), name: file.name, type: file.type }
                        detail: { file: new Blob([buff], { type }), name: file.name }
                    }));
                    document.dispatchEvent(new CustomEvent("CreateNotification", {
                        detail: {
                            type: 'success',
                            content: 'File successfully embedded!',
                            lifetime: 3
                        }
                    }));
                } catch (err) {
                    const e = err as Error;
                    document.dispatchEvent(new CustomEvent("CreateNotification", {
                        detail: {
                            type: 'error',
                            content: "Couldn't embed file: " + e.message,
                            lifetime: 3
                        }
                    }));
                }
            }
        });
        input.click();
    };
}), { once: !cappState!.is4chanX }); // 4chan's normal extension destroys the QR form everytime

const customStyles = document.createElement('style');

customStyles.appendChild(document.createTextNode(globalCss));

document.documentElement.insertBefore(customStyles, null);

function processAttachments(post: HTMLDivElement, ress: [EmbeddedFile, boolean][]) {
    const replyBox = post.querySelector('.post');
    const external = ress[0][1];
    if (external)
        replyBox?.classList.add('hasext');
    else
        replyBox?.classList.add('hasembed');

    if (!cappState.foundPosts.includes(replyBox as HTMLElement))
        cappState.foundPosts.push(replyBox as HTMLElement);
    appState.set(cappState);

    const isCatalog = replyBox?.classList.contains('catalog-post');
    // add buttons
    if (!isCatalog) {
        const ft = post.querySelector('div.file') as HTMLDivElement;
        const info = post.querySelector("span.file-info") as HTMLSpanElement;

        const filehost: HTMLElement | null = ft.querySelector('.filehost');
        const eyehost: HTMLElement | null = info.querySelector('.eyehost');
        const imgcont = filehost || document.createElement('div');
        const eyecont = eyehost || document.createElement('span');

        if (!filehost) {
            ft.append(imgcont);
            imgcont.classList.add("fileThumb");
            imgcont.classList.add("filehost");
        } else {
            imgcont.innerHTML = '';
        }
        if (!eyehost) {
            info.append(eyecont);
            eyecont.classList.add("eyehost");
        } else {
            eyecont.innerHTML = '';
        }
        const id = ~~(Math.random() * 20000000);
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
//if ((window as any)['pagemode']) {
//    onload = () => {
//        console.log("loaded");
//        const resbuf = async (s: EmbeddedFile['data']) => Buffer.isBuffer(s) ? s : await s();
//        const container = document.getElementById("container") as HTMLInputElement;
//        const injection = document.getElementById("injection") as HTMLInputElement;
//        container.onchange = injection.onchange = async () => {
//            console.log('eval changed');
//            if (container.files?.length && injection.files?.length) {
//                const dlr = document.getElementById("dlr") as HTMLAnchorElement;
//                const dle = document.getElementById("dle") as HTMLAnchorElement;
//                console.log(buf(new Uint8Array(await container.files[0].arrayBuffer())));
//                console.log(buf(new Uint8Array(await injection.files[0].arrayBuffer())));
//                const res = await gif.inject!(container.files[0], injection.files[0]);
//                console.log('inj done', buf(res));
//                const result = document.getElementById("result") as HTMLImageElement;
//                const extracted = document.getElementById("extracted") as HTMLImageElement;
//                const res2 = new Blob([res], { type: (await fileTypeFromBuffer(res))?.mime });
//                result.src = URL.createObjectURL(res2);
//                dlr.href = result.src;
//                console.log('url created');
//                const embedded = await gif.extract(res);
//                console.log(buf(new Uint8Array(await resbuf(embedded.data))));
//                if (!embedded) {
//                    debugger;
//                    return;
//                }
//                extracted.src = URL.createObjectURL(new Blob([await resbuf(embedded.data!)]));
//                dle.href = extracted.src;
//            }
//        };
//    };
//}