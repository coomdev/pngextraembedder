/* eslint-disable */

import { Buffer } from "buffer";
import { fileTypeFromBuffer } from 'file-type';
import { concatAB, PNGDecoder, PNGEncoder } from "./png";

const IDAT = Buffer.from("IDAT");
const IEND = Buffer.from("IEND");
const tEXt = Buffer.from("tEXt");
const CUM0 = Buffer.from("CUM\0" + "0");

let extractEmbedded = async (reader: ReadableStreamDefaultReader<Uint8Array>) => {
    let magic = false;

    let sneed = new PNGDecoder(reader);
    try {
        let lastIDAT: Buffer | null = null;
        for await (let [name, chunk, crc, offset] of sneed.chunks()) {
            switch (name) {
                case 'tEXt': // should exist at the beginning of file to signal decoders if the file indeed has an embedded chunk
                    if (chunk.slice(4, 4 + CUM0.length).equals(CUM0))
                        magic = true;
                    break;
                case 'IDAT':
                    if (magic) {
                        lastIDAT = chunk;
                        break;
                    }
                case 'IEND':
                    if (!magic)
                        throw "Didn't find tExt Chunk";
                default:
                    break;
            }
        }
        if (lastIDAT) {
            let data = (lastIDAT as Buffer).slice(4);
            let fnsize = data.readUInt32LE(0);
            let fn = data.slice(4, 4 + fnsize).toString();
            // Todo: xor the buffer to prevent scanning for file signatures (4chan embedded file detection)?
            data = data.slice(4 + fnsize);
            return { filename: fn, data };
        }
    } catch (e) {
        console.error(e);
    } finally {
        reader.releaseLock();
    }
}

let processImage = async (src: string) => {
    if (!src.match(/\.png$/))
        return;
    let resp = await GM_fetch(src);
    let reader = (await resp.blob()).stream();
    if (!reader)
        return;
    return await extractEmbedded(reader.getReader());
};

/* Used for debugging */
let processImage2 = async (src: string) => {
    if (!src.match(/\.png$/))
        return;
    let resp = await GM_fetch(src);
    let reader = resp.body!.getReader();
    if (!reader)
        return;

    let data = Buffer.alloc(0);
    let chunk;
    while ((chunk = await reader.read()) && !chunk.done) {
        data = concatAB(data, Buffer.from(chunk.value));
    }

    return {
        filename: 'aaaa',
        data
    };
};

let processPost = async (post: HTMLDivElement) => {
    let thumb = post.querySelector(".fileThumb") as HTMLAnchorElement;
    if (!thumb)
        return;
    console.log("Processing post", post)
    let res = await processImage(thumb.href);
    if (!res)
        return;
    // add buttons
    let fi = post.querySelector(".file-info")!;
    let a = document.createElement('a');
    a.className = "fa fa-eye";
    let type = await fileTypeFromBuffer(res.data);
    let cont: HTMLImageElement | HTMLVideoElement;
    let w: number, h: number;
    if (type?.mime.startsWith("image")) {
        cont = document.createElement("img");
    } else if (type?.mime.startsWith("video")) {
        cont = document.createElement("video");
    } else
        return; // TODO: handle new file types??? Or direct "download"?

    cont.src = URL.createObjectURL(new Blob([res.data]));

    await new Promise(res => {
        cont.onload = res;
    });

    if (cont instanceof HTMLImageElement) {
        w = cont.naturalWidth;
        h = cont.naturalHeight;
    }

    if (cont instanceof HTMLVideoElement) {
        w = cont.width;
        h = cont.height;
    }

    let contract = () => {
        cont.style.width = "auto";
        cont.style.height = "auto";
        cont.style.maxWidth = "125px";
        cont.style.maxHeight = "125px";
    }

    let expand = () => {
        cont.style.width = `${w}px`;
        cont.style.height = `${h}px`;
        cont.style.maxWidth = "unset";
        cont.style.maxHeight = "unset";
    }

    let imgcont = document.createElement('div');
    let p = thumb.parentElement!;
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
    }

    let visible = false;
    a.onclick = () => {
        visible = !visible;
        if (visible) {
            imgcont.appendChild(cont)
        } else {
            imgcont.removeChild(cont);
        }
        a.classList.toggle("disabled");
    }
    fi.children[1].insertAdjacentElement('afterend', a);
}

let buildChunk = (tag: string, data: Buffer) => {
    let ret = Buffer.alloc(data.byteLength + 4);
    ret.write(tag.substr(0, 4), 0);
    data.copy(ret, 4);
    return ret;
}

let BufferWriteStream = () => {
    let b = Buffer.from([])
    let ret = new WritableStream<Buffer>({
        write(chunk) {
            b = concatAB(b, chunk);
        }
    });
    return [ret, () => b] as [WritableStream<Buffer>, () => Buffer];
}

let buildInjection = async (container: File, inj: File) => {
    let [writestream, extract] = BufferWriteStream();
    let encoder = new PNGEncoder(writestream);
    let decoder = new PNGDecoder(container.stream().getReader());

    let magic = false;
    for await (let [name, chunk, crc, offset] of decoder.chunks()) {
        if (magic && name != "IDAT")
            break;
        if (!magic && name == "IDAT") {
            await encoder.insertchunk(["tEXt", buildChunk("tEXt", CUM0), 0, 0]);
            magic = true;
        }
        await encoder.insertchunk([name, chunk, crc, offset]);
    }
    let injb = Buffer.alloc(4 + inj.name.length + inj.size);
    injb.writeInt32LE(inj.name.length, 0);
    injb.write(inj.name, 4);
    Buffer.from(await inj.arrayBuffer()).copy(injb, 4 + inj.name.length);
    await encoder.insertchunk(["IDAT", buildChunk("IDAT", injb), 0, 0]);
    await encoder.insertchunk(["IEND", buildChunk("IEND", Buffer.from([])), 0, 0]);
    return { file: new Blob([extract()]), name: container.name };
}

const startup = async () => {
    await Promise.all([...document.querySelectorAll('.postContainer')].map(e => processPost(e as any)));

    //await Promise.all([...document.querySelectorAll('.postContainer')].filter(e => e.textContent?.includes("191 KB")).map(e => processPost(e as any)));

    document.addEventListener('PostsInserted', <any>(async (e: CustomEvent<string>) => {
        processPost(e.target as any);
    }));

    let getSelectedFile = () => {
        return new Promise<File>(res => {
            document.addEventListener('QRFile', e => res((e as any).detail), { once: true });
            document.dispatchEvent(new CustomEvent('QRGetFile'));
        })
    }

    let injected = false;
    document.addEventListener('QRDialogCreation', <any>((e: CustomEvent<string>) => {
        if (injected)
            return;
        injected = true;
        let target = e.target as HTMLDivElement;
        let bts = target.querySelector('#qr-filename-container')
        let i = document.createElement('i');
        i.className = "fa fa-magnet";
        let a = document.createElement('a')
        a.appendChild(i);
        a.title = "Embed File (Select a file before...)";
        bts?.appendChild(a);
        a.onclick = async (e) => {
            let file = await getSelectedFile();
            if (!file)
                return;
            let input = document.createElement('input') as HTMLInputElement;
            input.setAttribute("type", "file");
            input.onchange = (async ev => {
                if (input.files)
                    document.dispatchEvent(new CustomEvent('QRSetFile', { detail: await buildInjection(file, input.files[0]) }))
            })
            input.click();
        }
    }));
};

document.addEventListener('4chanXInitFinished', startup);


onload = () => {
    let container = document.getElementById("container") as HTMLInputElement;
    let injection = document.getElementById("injection") as HTMLInputElement;

    container.onchange = injection.onchange = async () => {
        if (container.files?.length && injection.files?.length) {
            let res = await buildInjection(container.files[0], injection.files[0]);
            let result = document.getElementById("result") as HTMLImageElement;
            let extracted = document.getElementById("extracted") as HTMLImageElement;
            result.src = URL.createObjectURL(res.file);
            let embedded = await extractEmbedded(res.file.stream().getReader());
            extracted.src = URL.createObjectURL(new Blob([embedded?.data!]));
        }
    }
}
