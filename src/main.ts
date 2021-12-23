/* eslint-disable */

import { Buffer } from "buffer";
import { buf } from "crc-32";
import { fileTypeFromBuffer } from 'file-type';
import { Readable } from "stream";

const IDAT = Buffer.from("IDAT");
const IEND = Buffer.from("IEND");
const tEXt = Buffer.from("tEXt");
const CUM0 = Buffer.from("CUM0");

let concatAB = (...bufs: Buffer[]) => {
    let sz = bufs.map(e => e.byteLength).reduce((a, b) => a + b);
    const ret = Buffer.alloc(sz);
    let ptr = 0;
    for (const b of bufs) {
        b.copy(ret, ptr);
        ptr += b.byteLength;
    }
    return ret;
}

let extractTextData = async (reader: ReadableStreamDefaultReader<Uint8Array>) => {
    let total = Buffer.from('');
    let ptr = 8;
    let req = 8; // required bytes: require the png signature

    try {
        let chunk: ReadableStreamDefaultReadResult<Uint8Array>;

        const catchup = async () => {
            while (total.byteLength < req) {
                chunk = await reader.read();
                if (chunk.done)
                    throw new Error("Unexpected EOF");
                total = concatAB(total, Buffer.from(chunk.value));
            }
        }

        do {
            req += 8; // require the bytes that store the length of the next chunk and its name
            await catchup();
            // at this point, ptr pointing to length of current chunk
            let length = total.readInt32BE(ptr);
            // ptr pointing to type of current chunk
            ptr += 4;
            const name = total.slice(ptr, ptr + 4);
            if (Buffer.compare(IDAT, name) == 0 ||
                Buffer.compare(IEND, name) == 0) {
                // reached idat or iend before finding a tEXt, bail out
                throw new Error("Couldn't find tEXt chunk");
            }
            req += length + 4; // require the rest of the chunk + CRC
            //let crc = total.readInt32BE(ptr + 4 + length); // dont really care
            ptr += 4; // ptr now points to the chunk data
            if (Buffer.compare(tEXt, name) == 0) {
                // our specific format stores a single file, CUM0 stores it as Base64. Could be enhanced to use more characters (the whole printable ascii characters, ie base85, but we lack good encoders...)
                // catchup because we need to know the type;
                await catchup();
                if (Buffer.compare(total.slice(ptr, ptr + 4), CUM0) == 0) {
                    let data = Buffer.from(total.slice(ptr + 4, ptr + length - 4).toString(), 'base64');
                    let fns = data.readUInt32LE(0);
                    let filename = data.slice(4, 4 + fns).toString();
                    return { data: data.slice(4 + fns), filename };
                }
                // Unknown tEXt format
            }
            ptr += length + 4; // skips over data section and crc
        } while (!chunk!.done);
    } catch (e) {
        //console.error(e);
        await reader.cancel();
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
    return await extractTextData(new ReadableStreamDefaultReader(reader));
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

let buildTextChunk = async (f: File) => {
    let ab = await f.arrayBuffer();
    let fns = Buffer.alloc(4);
    fns.writeInt32LE(f.name.length, 0)
    let fb = Buffer.from(await new Blob([fns, f.name, ab]).arrayBuffer()).toString('base64');
    let buff = Buffer.alloc(4 /*Length storage*/ + 4 /*Chunk Type*/ + 4 /*Magic*/ + 1 /*Null separator*/ + fb.length + 4 /* CRC */);
    let ptr = 0;
    buff.writeInt32BE(buff.byteLength - 12, ptr); // doesn't count chunk type, lenght storage and crc
    ptr += 4;
    buff.write("tEXtCUM0\0", ptr); // Writes Chunktype+ Magic+null byte
    ptr += 9;
    buff.write(fb, ptr);
    ptr += fb.length;
    // CRC over the chunk name to the last piece of data
    let checksum = buf(buff.slice(4, -4))
    buff.writeInt32BE(checksum, ptr);
    return buff;
}

let buildInjection = async (container: File, inj: File) => {
    let tEXtChunk = await buildTextChunk(inj);
    let ogFile = Buffer.from(await container.arrayBuffer());
    let ret = Buffer.alloc(tEXtChunk.byteLength + ogFile.byteLength);
    let ptr = 8;
    let wptr = 8;
    let wrote = false;
    ogFile.copy(ret, 0, 0, ptr);// copy PNG signature
    // copy every chunk as is except inject the text chunk before the first IDAT or END
    while (ptr < ogFile.byteLength) {
        let len = ogFile.readInt32BE(ptr);
        let name = ogFile.slice(ptr + 4, ptr + 8);
        if (name.equals(IDAT) || name.equals(IEND)) {
            if (!wrote) {
                wrote = true;
                tEXtChunk.copy(ret, wptr);
                wptr += tEXtChunk.byteLength;
            }
        }
        ret.writeInt32BE(len, wptr);
        wptr += 4;
        name.copy(ret, wptr);
        wptr += 4;
        ogFile.slice(ptr + 8, ptr + 8 + len + 4).copy(ret, wptr);
        ptr += len + 8 + 4;
        wptr += len + 4;
    }

    return { file: new Blob([ret]), name: container.name };
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
