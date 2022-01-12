import { Buffer } from "buffer";
import { GM_fetch, GM_head, headerStringToObject } from "./requests";
import thumbnail from "./assets/hasembed.png";
import type { EmbeddedFile } from './main';

const generateThumbnail = async (f: File): Promise<Buffer> => {
    const can = document.createElement("canvas");
    can.width = 125;
    can.height = 125;
    const ctx = can.getContext("2d");

    if (!ctx)
        return Buffer.alloc(0);

    const [sw, sh] = [125, 125];
    const url = URL.createObjectURL(f);

    if (f.type.startsWith("image")) {
        const imgElem = document.createElement('img');
        imgElem.src = url;
        await new Promise(_ => imgElem.onload = _);
        const [iw, ih] = [imgElem.naturalWidth, imgElem.naturalHeight];
        const scale = Math.min(1, sw / iw, sh / ih);
        const dims = [~~(iw * scale), ~~(ih * scale)] as [number, number];
        ctx.drawImage(imgElem, 0, 0, dims[0], dims[1]);
    } else if (f.type.startsWith("video")) {
        const vidElem = document.createElement('video');
        vidElem.src = url;
        await new Promise(_ => vidElem.onloadedmetadata = _);
        const [iw, ih] = [vidElem.videoWidth, vidElem.videoHeight];
        const scale = Math.min(1, sw / iw, sh / ih);
        const dims = [~~(iw * scale), ~~(ih * scale)] as [number, number];
        ctx.drawImage(vidElem, 0, 0, dims[0], dims[1]);
    } else
        return Buffer.alloc(0);
    const blob = await new Promise<Blob | null>(_ => can.toBlob(_, "image/jpg"));
    if (!blob)
        return Buffer.alloc(0);
    return new Buffer(await blob.arrayBuffer());
};

export const buildPeeFile = async (f: File) => {
    //const isMemeBrowser = navigator.userAgent.indexOf("Chrome") == -1;
    let thumbnail = Buffer.alloc(0);
    thumbnail = await generateThumbnail(f);
    const namebuf = Buffer.from(f.name);
    const ret = Buffer.alloc(4 /* Magic */ +
        1 /* Flags */ + namebuf.byteLength + 1 +
        (4 + thumbnail.byteLength) /* TSize + Thumbnail */ +
        f.size /*Teh file*/);
    let ptr = 0;
    ret.write('PEE\0', 0);
    ptr += 4;
    ret[ptr++] = 1 | ((+(thumbnail.length != 0)) << 2);
    namebuf.copy(ret, ptr);
    ptr += namebuf.byteLength;
    ret[ptr++] = 0;
    if (thumbnail.length > 0) {
        ret.writeInt32LE(thumbnail.byteLength, ptr);
        ptr += 4;
        thumbnail.copy(ret, ptr);
        ptr += thumbnail.byteLength;
    }
    new Buffer(await f.arrayBuffer()).copy(ret, ptr);
    return new Blob([ret]);
};

/*
header (must be < 2k): [1 byte bitfield](if hasfilename: null terminated string)(if has tags: [X null terminated string, tags are whitespace-separated])
(if has thumbnail: [thumbnail size X]
rest: [X bytes of thumbnail data])[file bytes]
&1 => has filename
&2 => has tags
&4 => has thumbnail
*/
export const decodeCoom3Payload = async (buff: Buffer) => {
    const pees = buff.toString().split(' ').slice(0, 5).filter(e => e.startsWith("https://files.catbox.moe/"));
    return (await Promise.all(pees.map(async pee => {
        try {
            const headers = headerStringToObject(await GM_head(pee));
            const res = await GM_fetch(pee, {
                headers: { ranges: 'bytes=0-2048', 'user-agent': '' },
                mode: 'cors',
                referrerPolicy: 'no-referrer',
            });
            const size = +headers['content-length'] || 0;
            const header = Buffer.from(await res.arrayBuffer());
            let hptr = 0;
            if (header.slice(0, 4).toString() == "PEE\0")
                hptr += 4;
            const flags = header[hptr];
            const hasFn = !!(flags & 1);
            const hasTags = !!(flags & 2);
            const hasThumbnail = !!(flags & 4);
            let [ptr, ptr2] = [hptr + 1, hptr + 1];
            let fn = 'embedded';
            let tags = [];
            let thumb: EmbeddedFile['thumbnail'] = Buffer.from(thumbnail);
            if (hasFn) {
                while (header[ptr2] != 0)
                    ptr2++;
                fn = header.slice(ptr, ptr2).toString();
                ptr = ++ptr2;
            }
            if (hasTags) {
                while (header[ptr2] != 0)
                    ptr2++;
                tags = header.slice(ptr, ptr2).toString().split(/\s+/);
            }
            let thumbsize = 0;
            if (hasThumbnail) {
                thumbsize = header.readInt32LE(ptr);
                thumb = Buffer.from(await (await GM_fetch(pee, { headers: { 'user-agent': '', range: `bytes=${ptr + 4}-${ptr + 4 + thumbsize}` } })).arrayBuffer());
            }
            return {
                filename: fn,
                data: async (lsn) =>
                    Buffer.from(await (await GM_fetch(pee, { headers: { 'user-agent': '', range: `bytes=${ptr + 4 + thumbsize}-${size - 1}` } }, lsn)).arrayBuffer()),
                thumbnail: thumb,
            } as EmbeddedFile;
        } catch (e) {
            // niggers trying to fuck with bad links
            console.warn(e);
        }
    }))).map(e => e);
};

export const fireNotification = (level: 'success' | 'error' | 'info' | 'warning', text: string, lifetime = 3) => {
    document.dispatchEvent(new CustomEvent("CreateNotification", {
        detail: {
            type: level,
            content: text,
            lifetime
        }
    }));
};