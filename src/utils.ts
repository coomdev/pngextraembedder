import { Buffer } from "buffer";
import thumbnail from "./assets/hasembed.png";
import type { EmbeddedFile } from './main';
import { settings } from "./stores";
import { filehosts } from "./filehosts";
import { getHeaders, ifetch, Platform } from "./platform";
import type { HydrusClient } from "./hydrus";
import { GM_fetch } from "./requests";
import { fileTypeFromBuffer } from "file-type";

export let csettings: Parameters<typeof settings['set']>[0];

settings.subscribe(b => {
    csettings = b;
});

const generateThumbnail = async (f: File): Promise<Buffer> => {
    const can = document.createElement("canvas");
    can.width = 125;
    can.height = 125;

    const [sw, sh] = [125, 125];
    const url = URL.createObjectURL(f);

    let source: CanvasImageSource;
    let iw: number, ih: number;

    if (f.type.startsWith("image")) {
        const imgElem = document.createElement('img');
        imgElem.src = url;
        await new Promise(_ => imgElem.onload = _);
        [iw, ih] = [imgElem.naturalWidth, imgElem.naturalHeight];
        source = imgElem;
    } else if (f.type.startsWith("video")) {
        const vidElem = document.createElement('video');
        vidElem.src = url;
        await new Promise(_ => vidElem.onloadedmetadata = _);
        vidElem.currentTime = 0;
        await new Promise(_ => vidElem.onloadeddata = _);
        await new Promise(requestAnimationFrame);
        await new Promise(requestAnimationFrame);
        await new Promise(requestAnimationFrame);
        [iw, ih] = [vidElem.videoWidth, vidElem.videoHeight];
        source = vidElem;
    } else
        return Buffer.alloc(0);

    const scale = Math.min(1, sw / iw, sh / ih);
    const dims = [~~(iw * scale), ~~(ih * scale)] as [number, number];

    can.width = dims[0];
    can.height = dims[1];

    const ctx = can.getContext("2d");

    if (!ctx)
        return Buffer.alloc(0);

    ctx.drawImage(source, 0, 0, dims[0], dims[1]);

    const blob = await new Promise<Blob | null>(_ => can.toBlob(_, "image/jpg"));
    if (!blob)
        return Buffer.alloc(0);
    return Buffer.from(await blob.arrayBuffer());
};

export const buildPeeFile = async (f: File) => {
    //const isMemeBrowser = navigator.userAgent.indexOf("Chrome") == -1;
    let thumbnail = Buffer.alloc(0);
    thumbnail = await generateThumbnail(f);
    const namebuf = Buffer.from(f.name);
    const ret = Buffer.alloc(4 /* Magic */ +
        1 /* Flags */ + namebuf.byteLength + 1 +
        (thumbnail.byteLength != 0 ? (4 + thumbnail.byteLength) : 0) /* TSize + Thumbnail */ +
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
    Buffer.from(await f.arrayBuffer()).copy(ret, ptr);
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
    const allowed_domains = filehosts.map(e => e.serving.replaceAll('.', '\\.'));
    const pees = buff
        .toString()
        .split(' ')
        .slice(0, csettings.maxe)
        .filter(e => allowed_domains
            .some(v => e.match(`https://(.*\\.)?${v}/`)));

    return (await Promise.all(pees.map(async pee => {
        try {
            const m = pee.match(/(?<protocol>https?):\/\/(?<domain>.*?)(?<file>\/.*)/);
            if (!m)
                return;
            const { domain, file } = m.groups!;
            const headers = await getHeaders(pee);
            const res = await ifetch(pee, {
                headers: { range: 'bytes=0-2048', 'user-agent': '' },
                mode: 'cors',
                referrerPolicy: 'no-referrer',
            });
            const size = +headers['content-length'] || 0;
            const header = Buffer.from(await res.arrayBuffer());
            let hptr = 0;
            if (header.slice(0, 4).toString() == "PEE\0")
                hptr += 4;
            else
                return;
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
                ptr += 4;
                if (execution_mode == 'userscript')
                    thumb = Buffer.from(await (await ifetch(pee, { headers: { 'user-agent': '', range: `bytes=${ptr}-${ptr + thumbsize}` } })).arrayBuffer());
                else
                    thumb = `https://loli.piss/${domain}${file}/${ptr}/${ptr + thumbsize}`;
                ptr += thumbsize;
            }
            const unzip = async (lsn?: EventTarget) =>
                Buffer.from(await (await ifetch(pee, { headers: { 'user-agent': '', range: `bytes=${ptr}-${size - 1}` } }, lsn)).arrayBuffer());
            let data;
            if (execution_mode == 'userscript') {
                data = unzip;
                if (size < 3072) {
                    thumb = data = await unzip();
                }
            } else {
                data = `https://loli.piss/${domain}${file}/${ptr}/${size - 1}`;
            }
            return {
                filename: fn,
                // if file is small, then just get it fully
                data,
                thumbnail: thumb,
            } as EmbeddedFile;
        } catch (e) {
            // niggers trying to fuck with bad links
            console.warn(e);
        }
    }))).filter(e => e);
};

export const fireNotification = (type: 'success' | 'error' | 'info' | 'warning', content: string, lifetime = 3) => {
    document.dispatchEvent(new CustomEvent("CreateNotification", {
        detail: {
            type, content, lifetime
        }
    }));
};

function parseForm(data: object) {
    const form = new FormData();

    Object.entries(data)
        .filter(([key, value]) => value !== null)
        .map(([key, value]) => form.append(key, value));

    return form;
}

export const uploadFiles = async (injs: File[]) => {
    let total = 0;
    fireNotification('info', `Uploading ${injs.length} files...`);
    return await Promise.all(injs.map(async inj => {
        const ret = await filehosts[csettings.fhost || 0].uploadFile(await buildPeeFile(inj));
        fireNotification('info', `Uploaded files [${++total}/${injs.length}] ${ret}`);
        return ret;
    }));
};

export const getSelectedFile = () => {
    return new Promise<File>(res => {
        document.addEventListener('QRFile', e => res((e as any).detail), { once: true });
        document.dispatchEvent(new CustomEvent('QRGetFile'));
    });
};

export async function embeddedToBlob(...efs: EmbeddedFile[]) {
    return (await Promise.all(efs.map(async ef => {
        let buff: Buffer;
        if (typeof ef.data == "string") {
            const req = await GM_fetch(ef.data);
            buff = Buffer.from(await req.arrayBuffer());
        } else if (!Buffer.isBuffer(ef.data))
            buff = await ef.data();
        else
            buff = ef.data;
        const mim = await fileTypeFromBuffer(buff);
        const file = new File([buff], ef.filename, { type: mim?.mime });
        return file;
    }))).filter(e => e);
}

export async function addToEmbeds(...efs: EmbeddedFile[]) {
    const files = await embeddedToBlob(...efs);
    const links = await uploadFiles(files);
    document.dispatchEvent(new CustomEvent("AddPEE", { detail: links }));
}

export async function getFileFromHydrus(client: HydrusClient,
    tags: string[], args?: any) {
    const results = (
        await client.idsByTags(tags, args)
    ).file_ids;
    const metas = await client.getMetaDataByIds(results);
    return await Promise.all(
        results.map(async (id, idx) => {
            return [
                id,
                {
                    thumbnail: Buffer.from(
                        await client.getThumbnail(id)!
                    ),
                    data: async () =>
                        Buffer.from(
                            await client.getFile(id)!
                        ),
                    filename: metas.metadata[idx].hash + metas.metadata[idx].ext,
                },
            ] as [number, EmbeddedFile];
        })
    );
}