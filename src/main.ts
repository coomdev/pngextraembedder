import { Buffer } from "buffer";
import { fileTypeFromBuffer } from 'file-type';
import * as png from "./png";
import * as webm from "./webm";

type Awaited<T> = T extends PromiseLike<infer U> ? U : T

const xmlhttprequest = typeof GM_xmlhttpRequest != 'undefined' ? GM_xmlhttpRequest : (GM ? GM.xmlHttpRequest : GM_xmlhttpRequest);

const headerStringToObject = (s: string) =>
    Object.fromEntries(s.split('\n').map(e => {
        const [name, ...rest] = e.split(':');
        return [name.toLowerCase(), rest.join(':').trim()];
    }));

function GM_head(...[url, opt]: Parameters<typeof fetch>) {
    return new Promise<string>((resolve, reject) => {
        // https://www.tampermonkey.net/documentation.php?ext=dhdg#GM_xmlhttpRequest
        const gmopt: Tampermonkey.Request<any> = {
            url: url.toString(),
            data: opt?.body?.toString(),
            method: "HEAD",
            onload: (resp) => {
                resolve(resp.responseHeaders);
            },
            ontimeout: () => reject("fetch timeout"),
            onerror: () => reject("fetch error"),
            onabort: () => reject("fetch abort")
        };
        xmlhttprequest(gmopt);
    });
}

function GM_fetch(...[url, opt]: Parameters<typeof fetch>) {
    function blobTo(to: string, blob: Blob) {
        if (to == "arrayBuffer" && blob.arrayBuffer)
            return blob.arrayBuffer();
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = function (event) {
                if (!event) return;
                if (to == "base64")
                    resolve(event.target!.result);
                else
                    resolve(event.target!.result);
            };
            if (to == "arrayBuffer") fileReader.readAsArrayBuffer(blob);
            else if (to == "base64") fileReader.readAsDataURL(blob); // "data:*/*;base64,......"
            else if (to == "text") fileReader.readAsText(blob, "utf-8");
            else reject("unknown to");
        });
    }
    return new Promise<ReturnType<typeof fetch>>((resolve, reject) => {
        // https://www.tampermonkey.net/documentation.php?ext=dhdg#GM_xmlhttpRequest
        const gmopt: Tampermonkey.Request<any> = {
            url: url.toString(),
            data: opt?.body?.toString(),
            responseType: "blob",
            headers: opt?.headers as any,
            method: "GET",
            onload: (resp) => {
                const blob = resp.response as Blob;
                const ref = resp as any as Awaited<ReturnType<typeof fetch>>;
                ref.blob = () => Promise.resolve(blob);
                ref.arrayBuffer = () => blobTo("arrayBuffer", blob) as Promise<ArrayBuffer>;
                ref.text = () => blobTo("text", blob) as Promise<string>;
                ref.json = async () => JSON.parse(await (blobTo("text", blob) as Promise<any>));
                resolve(resp as any);
            },
            ontimeout: () => reject("fetch timeout"),
            onerror: () => reject("fetch error"),
            onabort: () => reject("fetch abort")
        };
        xmlhttprequest(gmopt);
    });
}

async function* streamRemote(url: string, chunkSize = 128 * 1024, fetchRestOnNonCanceled = true) {
    const headers = await GM_head(url);
    const h = headerStringToObject(headers);
    const size = +h['content-length'];
    let ptr = 0;
    let fetchSize = chunkSize;
    while (ptr != size) {
        const res = await GM_fetch(url, { headers: { range: `bytes=${ptr}-${ptr + fetchSize - 1}` } }) as any as Tampermonkey.Response<any>;
        const obj = headerStringToObject(res.responseHeaders);
        if (!('content-length' in obj))
            return;
        const len = +obj['content-length'];
        ptr += len;
        if (fetchRestOnNonCanceled)
            fetchSize = size;
        yield Buffer.from(await (res as any).arrayBuffer());
    }
}

function iteratorToStream<T>(iterator: AsyncGenerator<T>) {
    return new ReadableStream<T>({
        async pull(controller) {
            const { value, done } = await iterator.next();

            if (done) {
                controller.close();
            } else {
                controller.enqueue(value);
            }
        },
    });
}

// (async () => {
//     const iter = streamRemote("https://i.4cdn.org/g/1641097404527.png", 16 * 1024, false);
//     //const str = iteratorToStream(iter);
//     const cum: Buffer[] = [];
//     for await (const buf of iter) {
//         console.log(buf.byteLength);
//         cum.push(buf);
//     }
//     const total = cum.reduce((a, b) => png.concatAB(a, b));
//     console.log(await fileTypeFromBuffer(total));
// })();

const processors: [RegExp,
    (reader: ReadableStreamDefaultReader<Uint8Array>) => Promise<{ filename: string; data: Buffer } | undefined>,
    (container: File, inj: File) => Promise<Buffer>][] = [
        [/\.png$/, png.extract, png.inject],
        [/\.webm$/, webm.extract, webm.inject]
    ];

const processImage = async (src: string) => {
    if (src.includes('/images/')) // thirdeye removes the original link and puts a non-existing link
        return; // cant do shit about that.
    const proc = processors.find(e => src.match(e[0]));
    if (!proc)
        return;
    // const resp = await GM_fetch(src);
    // const reader = resp.body;
    const iter = streamRemote(src);
    const reader = iteratorToStream(iter);
    if (!reader)
        return;
    return await proc[1](reader.getReader());
};

const processPost = async (post: HTMLDivElement) => {
    const thumb = post.querySelector(".fileThumb") as HTMLAnchorElement;
    if (!thumb)
        return;
    const res = await processImage(thumb.href);
    if (!res)
        return;
    const replyBox = post.querySelector('.post');
    replyBox?.classList.toggle('hasembed');
    // add buttons
    const fi = post.querySelector(".file-info")!;
    const cf = `
    <a class="fa fa-eye">
    </a>`;
    let a: HTMLAnchorElement | null;
    a = fi.querySelector('.fa.fa-eye');
    let inlining = true;
    if (!a) {
        inlining = false;
        a = document.createRange().createContextualFragment(cf).children[0] as HTMLAnchorElement;
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
        cont.pause();
    } else if (type?.mime.startsWith("audio")) {
        cont = document.createElement("audio");
        cont.autoplay = false;
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

    if (cont instanceof HTMLAudioElement || cont instanceof HTMLVideoElement) {
        cont.controls = true;
    }

    const contract = () => {
        // ugh
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
    cont.onclick = (e) => {
        contracted = !contracted;
        (contracted) ? contract() : expand();
        e.stopPropagation();
    };

    let visible = false;
    a.onclick = () => {
        visible = !visible;
        if (visible) {
            if (cont instanceof HTMLVideoElement) {
                cont.play();
            }
            imgcont.appendChild(cont);
        } else {
            if (cont instanceof HTMLVideoElement) {
                cont.pause();
            }
            imgcont.removeChild(cont);
        }
        a!.classList.toggle("disabled");
    };
    if (!inlining)
        fi.children[1].insertAdjacentElement('afterend', a);
    post.setAttribute('data-processed', src);
};

const startup = async () => {

    //await Promise.all([...document.querySelectorAll('.postContainer')].filter(e => e.textContent?.includes("191 KB")).map(e => processPost(e as any)));

    // Basically this is a misnommer: fires even when inlining existings posts, also posts are inlined through some kind of dom projection
    // document.addEventListener('PostsInserted', <any>(async (e: CustomEvent<string>) => {
    //     const threadelement = e.target as HTMLDivElement;
    //     const posts = [...threadelement.querySelectorAll(".postContainer")].filter(e => !e.hasAttribute('data-processed'));
    //     posts.map(e => processPost(e as any));
    // }));threadelement

    const mo = new MutationObserver(reco => {
        for (const rec of reco)
            if (rec.type == "childList")
                rec.addedNodes.forEach(e => {
                    const el = (e as any).querySelector(".postContainer");
                    if (el)
                        processPost(el as any);
                });
    });

    mo.observe(document.querySelector('.thread')!, { childList: true, subtree: true });

    const getSelectedFile = () => {
        return new Promise<File>(res => {
            document.addEventListener('QRFile', e => res((e as any).detail), { once: true });
            document.dispatchEvent(new CustomEvent('QRGetFile'));
        });
    };

    let injected = false;
    document.addEventListener('QRDialogCreation', <any>((e: CustomEvent<string>) => {
        if (injected)
            return;
        injected = true;
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
                        const buff = await proc[2](file, input.files[0]);
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
    }));

    await Promise.all([...document.querySelectorAll('.postContainer')].map(e => processPost(e as any)));

};

document.addEventListener('4chanXInitFinished', startup);

const customStyles = document.createElement('style');
customStyles.appendChild(document.createTextNode(
    `
.extractedImg {
    width:auto;
    height:auto;
    max-width:125px;
    max-height:125px;
    cursor: pointer;
    
}
.hasembed {
    border-right: 3px dashed deeppink !important;
}
`
));
document.documentElement.insertBefore(customStyles, null);

// onload = () => {
//     let container = document.getElementById("container") as HTMLInputElement;
//     let injection = document.getElementById("injection") as HTMLInputElement;

//     container.onchange = injection.onchange = async () => {
//         if (container.files?.length && injection.files?.length) {
//             let res = await buildInjection(container.files[0], injection.files[0]);
//             let result = document.getElementById("result") as HTMLImageElement;
//             let extracted = document.getElementById("extracted") as HTMLImageElement;
//             result.src = URL.createObjectURL(res.file);
//             let embedded = await extractEmbedded(res.file.stream().getReader());
//             extracted.src = URL.createObjectURL(new Blob([embedded?.data!]));
//         }
//     }
// }
