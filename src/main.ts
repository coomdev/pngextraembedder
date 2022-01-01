import { Buffer } from "buffer";
import { fileTypeFromBuffer } from 'file-type';
import * as png from "./png";
import * as webm from "./webm";

type Awaited<T> = T extends PromiseLike<infer U> ? U : T

const xmlhttprequest = typeof GM_xmlhttpRequest != 'undefined' ? GM_xmlhttpRequest : (GM ? GM.xmlHttpRequest : GM_xmlhttpRequest);

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

const processors: [RegExp,
    (reader: ReadableStreamDefaultReader<Uint8Array>) => Promise<{ filename: string; data: Buffer } | undefined>,
    (container: File, inj: File) => Promise<Buffer>][] = [
        [/\.png$/, png.extract, png.inject],
        [/\.webm$/, webm.extract, webm.inject]
    ];

const processImage = async (src: string) => {
    const proc = processors.find(e => src.match(e[0]));
    if (!proc)
        return;
    const resp = await GM_fetch(src);
    const reader = (await resp.blob()).stream();
    if (!reader)
        return;
    return await proc[1](reader.getReader());
};

const processPost = async (post: HTMLDivElement) => {
    if (post.hasAttribute('data-processed'))
        return;
    post.setAttribute('data-processed', "true");
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
    const a = document.createRange().createContextualFragment(cf).children[0] as HTMLAnchorElement;
    const type = await fileTypeFromBuffer(res.data);
    let cont: HTMLImageElement | HTMLVideoElement | HTMLAudioElement;
    let w: number, h: number;
    if (type?.mime.startsWith("image")) {
        cont = document.createElement("img");
    } else if (type?.mime.startsWith("video")) {
        cont = document.createElement("video");
    } else if (type?.mime.startsWith("audio")) {
        cont = document.createElement("audio");
    } else
        return; // TODO: handle new file types??? Or direct "download"?

    cont.src = URL.createObjectURL(new Blob([res.data], { type: type.mime }));

    await new Promise(res => {
        if (cont instanceof HTMLImageElement)
            cont.onload = res;
        else if (cont instanceof HTMLVideoElement)
            cont.onloadedmetadata = res;
        else if (cont instanceof HTMLAudioElement)
            cont.onloadedmetadata = res;
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
            imgcont.appendChild(cont);
        } else {
            imgcont.removeChild(cont);
        }
        a.classList.toggle("disabled");
    };
    fi.children[1].insertAdjacentElement('afterend', a);
};

const startup = async () => {

    //await Promise.all([...document.querySelectorAll('.postContainer')].filter(e => e.textContent?.includes("191 KB")).map(e => processPost(e as any)));

    document.addEventListener('PostsInserted', <any>(async (e: CustomEvent<string>) => {
        const threadelement = e.target as HTMLDivElement;
        const posts = [...threadelement.querySelectorAll("postContainer")].filter(e => e.hasAttribute('data-processed'));
        posts.map(e => processPost(e as any));
    }));

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
                    const proc = processors.find(e => file.name.match(e[0]));
                    if (!proc)
                        return;
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
