import { Buffer } from "buffer";
import { fileTypeFromBuffer } from 'file-type';
import { settings } from "./stores";

import * as png from "./png";
import * as webm from "./webm";
import * as gif from "./gif";

import { GM_fetch, GM_head, headerStringToObject } from "./requests";

import App from "./App.svelte";
import SettingsButton from './SettingsButton.svelte';

let csettings: any;
settings.subscribe(b => csettings = b);

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

type EmbeddedFile = { filename: string; data: Buffer };
const processors: [RegExp,
    (b: Buffer) => (boolean | undefined) | Promise<boolean | undefined>,
    (b: Buffer) => EmbeddedFile | undefined | Promise<EmbeddedFile | undefined>,
    (container: File, inj: File) => Promise<Buffer>][] = [
        [/\.png$/, png.has_embed, png.extract, png.inject],
        [/\.webm$/, webm.has_embed, webm.extract, webm.inject],
        [/\.gif$/, gif.has_embed, gif.extract, gif.inject],
    ];

const processImage = async (src: string) => {
    const proc = processors.find(e => src.match(e[0]));
    if (!proc)
        return;
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
        found = await proc[1](cumul);
    } while (found !== false && !chunk.done);
    await iter.next(false);
    if (found === false) {
        //console.log(`Gave up on ${src} after downloading ${cumul.byteLength} bytes...`);
        return;
    }
    return await proc[2](cumul);
};

const textToElement = <T = HTMLElement>(s: string) =>
    document.createRange().createContextualFragment(s).children[0] as any as T;

const processPost = async (post: HTMLDivElement) => {
    const thumb = post.querySelector(".fileThumb") as HTMLAnchorElement;
    const origlink = post.querySelector('.file-info > a') as HTMLAnchorElement;
    if (!thumb || !origlink)
        return;
    const res = await processImage(origlink.href);
    if (!res)
        return;
    const replyBox = post.querySelector('.post');
    replyBox?.classList.toggle('hasembed');
    // add buttons
    const fi = post.querySelector(".file-info")!;
    let a: HTMLAnchorElement | null;
    a = fi.querySelector('.fa.fa-eye');
    let inlining = true;
    if (!a) {
        inlining = false;
        a = textToElement<HTMLAnchorElement>(`
        <a class="fa fa-eye">
        </a>`);
    }
    let type = await fileTypeFromBuffer(res.data);
    let cont: HTMLImageElement | HTMLVideoElement | HTMLAudioElement | HTMLAnchorElement;
    let w: number, h: number;
    if (type?.mime.startsWith("image")) {
        cont = document.createElement("img");
    } else if (type?.mime.startsWith("video")) {
        cont = document.createElement("video");
        //cont.autoplay = true;
        cont.loop = true;
        cont.controls = true;
        cont.pause();
    } else if (type?.mime.startsWith("audio")) {
        cont = document.createElement("audio");
        cont.autoplay = false;
        cont.controls = true;
        cont.pause();
    } else {
        // If type detection fails, you'd better have an extension
        if (!type)
            type = { mime: "application/unknown" as any, 'ext': "data" as any };
        cont = document.createElement('a');
        let fn = res.filename;
        if (!fn.includes('.'))
            fn += '.' + type.ext;
        cont.download = fn;
        cont.textContent = "Download " + cont.download;
    }

    let src: string | null;
    src = post.getAttribute('data-processed');
    if (!src)
        src = URL.createObjectURL(new Blob([res.data], { type: type.mime }));
    if (!(cont instanceof HTMLAnchorElement))
        cont.src = src;
    else
        cont.href = src;

    await new Promise(res => {
        if (cont instanceof HTMLImageElement)
            cont.onload = res;
        else if (cont instanceof HTMLVideoElement)
            cont.onloadedmetadata = res;
        else if (cont instanceof HTMLAudioElement)
            cont.onloadedmetadata = res;
        else
            res(void 0); // Don't know what this is: don't wait
    });

    if (cont instanceof HTMLImageElement) {
        w = cont.naturalWidth;
        h = cont.naturalHeight;
    }

    if (cont instanceof HTMLVideoElement) {
        w = cont.videoWidth;
        h = cont.videoHeight;
    }

    const playable = cont instanceof HTMLAudioElement || cont instanceof HTMLVideoElement;

    const contract = () => {
        if (cont instanceof HTMLAudioElement)
            return;
        cont.style.width = `unset`;
        cont.style.height = `unset`;
        cont.style.maxWidth = "125px";
        cont.style.maxHeight = "125px";
    };

    const expand = () => {
        cont.style.width = `${w}px`;
        cont.style.height = `${h}px`;
        cont.style.maxWidth = "unset";
        cont.style.maxHeight = "unset";
    };

    const imgcont = document.createElement('div');
    const p = thumb.parentElement!;
    p.removeChild(thumb);
    imgcont.appendChild(thumb);
    p.appendChild(imgcont);

    thumb.style.display = "flex";
    thumb.style.gap = "5px";
    thumb.style.flexDirection = "column";
    a.classList.toggle("disabled");
    a.classList.toggle("pee-button");
    let contracted = true;
    contract();
    contract();
    cont.onclick = (e) => {
        contracted = !contracted;
        (contracted) ? contract() : expand();
        e.stopPropagation();
    };

    let visible = false;
    a.onclick = () => {
        visible = !visible;
        if (visible) {
            console.log(csettings);
            if ((cont instanceof HTMLVideoElement && csettings.apv) ||
                (cont instanceof HTMLAudioElement && csettings.apa))
                cont.play();
            if ((cont instanceof HTMLImageElement && csettings.xpi) ||
                (cont instanceof HTMLVideoElement && csettings.xpv))
                expand();
            imgcont.appendChild(cont);
        } else {
            if (playable) {
                (cont as any).pause();
            }
            contract();
            imgcont.removeChild(cont);
        }
        a!.classList.toggle("disabled");
    };
    if (!inlining)
        fi.children[1].insertAdjacentElement('afterend', a);
    post.setAttribute('data-processed', src);
};

const startup = async () => {

    await Promise.all([...document.querySelectorAll('.postContainer')].filter(e => e.textContent?.includes("191 KB")).map(e => processPost(e as any)));

    // Basically this is a misnommer: fires even when inlining existings posts, also posts are inlined through some kind of dom projection
    document.addEventListener('ThreadUpdate', <any>(async (e: CustomEvent<any>) => {
        const newPosts = e.detail.newPosts;
        for (const post of newPosts) {
            const postContainer = document.getElementById("pc" + post.substring(post.indexOf(".") + 1)) as HTMLDivElement;
            processPost(postContainer);
        }
    }));

    // keep this to handle posts getting inlined
    const mo = new MutationObserver(reco => {
        for (const rec of reco)
            if (rec.type == "childList")
                rec.addedNodes.forEach(e => {
                    if (!(e instanceof HTMLElement))
                        return;
                    // apparently querySelector cannot select the root element if it matches
                    let el = (e as any).querySelectorAll(".postContainer");
                    if (!el && e.classList.contains('postContainer'))
                        el = e;
                    if (el)
                        [...el].map(el => processPost(el as any));
                });
    });

    document.querySelectorAll('.board').forEach(e => {
        mo.observe(e!, { childList: true, subtree: true });
    });
    const posts = [...document.querySelectorAll('.postContainer')];

    const scts = document.getElementById('shortcuts');
    const button = textToElement(`<span></span>`);
    const settingsButton = new SettingsButton({
        target: button
    });
    scts?.appendChild(button);

    const appHost = textToElement(`<div class="pee-settings"></div>`);
    const appInstance = new App({ target: appHost });
    document.body.append(appHost);

    await Promise.all(posts.map(e => processPost(e as any)));
};

const getSelectedFile = () => {
    return new Promise<File>(res => {
        document.addEventListener('QRFile', e => res((e as any).detail), { once: true });
        document.dispatchEvent(new CustomEvent('QRGetFile'));
    });
};

document.addEventListener('4chanXInitFinished', startup);

document.addEventListener('QRDialogCreation', <any>((e: CustomEvent<string>) => {
    const target = e.target as HTMLDivElement;
    const bts = target.querySelector('#qr-filename-container');
    const i = document.createElement('i');
    i.className = "fa fa-magnet";
    const a = document.createElement('a');
    a.appendChild(i);
    a.title = "Embed File (Select a file before...)";
    bts?.appendChild(a);
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
                    const proc = processors.find(e => file.name.match(e[0]));
                    if (!proc)
                        throw new Error("Container filetype not supported");
                    const buff = await proc[3](file, input.files[0]);
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
}), { once: true });

const customStyles = document.createElement('style');
customStyles.appendChild(document.createTextNode(
    `
.pee-hidden {
    display: none;
}

.extractedImg {
    width:auto;
    height:auto;
    max-width:125px;
    max-height:125px;
    cursor: pointer;
    
}

.postContainer > div.hasembed {
    border-right: 3px dashed deeppink !important;
}

.expanded-image > .post > .file .fileThumb > img[data-md5] {
    display: none;
}

.expanded-image > .post > .file .fileThumb  .full-image {
    display: inline;
}

.pee-settings {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
`
));

document.documentElement.insertBefore(customStyles, null);
// import * as gif from './gif';

// onload = () => {
//     let container = document.getElementById("container") as HTMLInputElement;
//     let injection = document.getElementById("injection") as HTMLInputElement;
//     container.onchange = injection.onchange = async () => {
//         if (container.files?.length && injection.files?.length) {
//             let res = await gif.inject(container.files[0], injection.files[0]);
//             let result = document.getElementById("result") as HTMLImageElement;
//             let extracted = document.getElementById("extracted") as HTMLImageElement;
//             let res2 = new Blob([res], { type: 'image/gif' });
//             result.src = URL.createObjectURL(res2);
//             let embedded = await gif.extract(res2.stream().getReader());
//             extracted.src = URL.createObjectURL(new Blob([embedded?.data!]));
//             let dlr = document.getElementById("dlr") as HTMLAnchorElement;
//             let dle = document.getElementById("dle") as HTMLAnchorElement;
//             dlr.href = result.src;
//             dle.href = extracted.src;
//         }
//     }
// }
