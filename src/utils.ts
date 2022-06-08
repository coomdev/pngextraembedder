import { Buffer } from "buffer";
import thumbnail from "./assets/hasembed.png";
import type { EmbeddedFile } from './main';
import { settings } from "./stores";
import { filehosts } from "./filehosts";
import { getHeaders, ifetch, Platform } from "./platform";
import type { HydrusClient } from "./hydrus";
import { fileTypeFromBuffer } from "file-type";
import { writable } from "svelte/store";
import { init } from "svelte/internal";

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

export const buildPeeFileFF = async (f: File) => {
    let thumbnail = new Uint8Array();
    const te = new TextEncoder();
    thumbnail = await generateThumbnail(f);
    const namebuf = te.encode(f.name);
    const ret = new Uint8Array(4 /* Magic */ +
        1 /* Flags */ + namebuf.byteLength + 1 +
        (thumbnail.byteLength != 0 ? (4 + thumbnail.byteLength) : 0) /* TSize + Thumbnail */ +
        f.size /*Teh file*/);
    const ret32 = new DataView(ret.buffer);
    let ptr = 0;
    ret.set(te.encode('PEE\0'), 0);
    ptr += 4;
    ret[ptr++] = 1 | ((+(thumbnail.length != 0)) << 2);
    ret.set(namebuf, ptr);
    ptr += namebuf.byteLength;
    ret[ptr++] = 0;
    if (thumbnail.length > 0) {
        ret32.setUint32(ptr, thumbnail.byteLength, true);
        ptr += 4;
        ret.set(thumbnail, ptr);
        ptr += thumbnail.byteLength;
    }
    const content = await f.arrayBuffer();
    ret.set(new Uint8Array(content), ptr);
    return new Blob([ret]);
};

export const buildPeeFile = async (f: File) => {
    if (execution_mode == "ff_api")
        return buildPeeFileFF(f);
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
    const content = await f.arrayBuffer();
    Buffer.from(content).copy(ret, ptr);
    return new Blob([ret]);
};

const getThreadInfo = async (board: string, op: number) => {
    const res = await ((await fetch(`http://shoujo.coom.tech/data/${board}/${op}`)).json() as Promise<{
        id: number;
        cnt: number;
        data: {
            pee: string[]
        } | {
            third: any;
        }
    }[]>);
    return Object.fromEntries(res.map(e => [e.id, e]));
};

export const threadDataCache = writable<undefined | {
    [k in number]: {
        id: number;
        cnt: number;
        mdist?: number;
        data: {
            pee: string[];
        } | {
            third: any;
        };
    }
}>();

let cthreadDataCache: Parameters<typeof threadDataCache['set']>[0];

threadDataCache.subscribe(newval => {
    cthreadDataCache = newval;
});

export const refreshThreadDataCache = async (board: string, op: number) => {
    threadDataCache.set(await getThreadInfo(board, op));
};

export const getThreadDataCache = async (board: string, op: number) => {
    if (!cthreadDataCache)
        await refreshThreadDataCache(board, op);
    return threadDataCache;
};

export const getEmbedsFromCache = async (board: string, op: number, pid: string): Promise<[EmbeddedFile[], boolean][]> => {
    await getThreadDataCache(board, op);
    const target = +pid.slice(pid.match(/\d/)!.index);
    const cachedData = cthreadDataCache![target];
    if (!cachedData)
        return [];
    const ret: [EmbeddedFile[], boolean][] = [];
    if ('pee' in cachedData.data) {
        const files = await decodeCoom3Payload(Buffer.from(cachedData.data.pee.join(' ')));
        ret.push([files, false]);
    }
    if ('third' in cachedData.data) {
        if (csettings.phash) {
            // if mdist is unknown (happens when no thumbnail was found, assume they are different)
            if ((cachedData.mdist || Number.POSITIVE_INFINITY) < (csettings.mdist || 5))
                return ret;
        }
        let cachedFile: ArrayBuffer;
        const data = cachedData.data.third;
        const prev = data.preview_url;
        const full = data.full_url;
        const fn = new URL(full).pathname.split('/').slice(-1)[0];
        const end = [{
            source: data.source,
            page: {
                title: 'PEE Cache',
                url: data.page
            },
            filename: fn,
            thumbnail: csettings.hotlink ? (prev || full) : Buffer.from(await (await ifetch(prev || full)).arrayBuffer()),
            data: csettings.hotlink ? (full || prev) : (async (lsn) => {
                if (!cachedFile)
                    cachedFile = (await (await ifetch(full || prev, undefined, lsn)).arrayBuffer());
                return Buffer.from(cachedFile);
            })
        } as EmbeddedFile];
        ret.push([end, true]);
    }
    return ret;
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
                headers: { range: 'bytes=0-16383', 'user-agent': '' },
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
                if (header.byteLength < ptr + thumbsize)
                    thumb = header.slice(ptr, ptr + thumbsize);
                else
                    thumb = Buffer.from(await (await ifetch(pee, { headers: { 'user-agent': '', range: `bytes=${ptr}-${ptr + thumbsize}` } })).arrayBuffer());
                ptr += thumbsize;
            }
            const unzip = async (lsn?: EventTarget) =>
                Buffer.from(await (await ifetch(pee, { headers: { 'user-agent': '', range: `bytes=${ptr}-${size - 1}` } }, lsn)).arrayBuffer());
            let data;
            data = unzip;
            if (size < 3072) {
                thumb = data = await unzip();
            }
            return {
                filename: fn,
                // if file is small, then just get it fully
                data,
                thumbnail: thumb,
            } as EmbeddedFile;
        } catch (e) {
            // meanies trying to heck with bad links
            console.warn(e);
        }
    }))).filter(e => e).map(e => e!);
};

export const fireNotification = (type: 'success' | 'error' | 'info' | 'warning', content: string, lifetime = 3) => {
    externalDispatch("CreateNotification", {
        type, content, lifetime
    });
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
        const peefile = await buildPeeFile(inj);
        const ret = await filehosts[csettings.fhost || 0].uploadFile(peefile);
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
            const req = await ifetch(ef.data);
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

export function externalDispatch(name: string, data: any) {
    let event: Event;
    if (execution_mode == "ff_api") {
        const clonedDetail = cloneInto(data, document.defaultView);
        event = new CustomEvent(name, { detail: clonedDetail });
    } else {
        event = new CustomEvent(name, { detail: data });
    }
    document.dispatchEvent(event);
}

export class peeTarget {
    targets = {} as { [k in string]: Array<(e: any) => any> };

    addEventListener(ev: string, cb: (e: any) => any) {
        this.targets[ev] = this.targets[ev] || [];
        this.targets[ev].push(cb);
    }

    dispatchEvent(ev: CustomEvent) {
        const evs = this.targets[ev.type];
        if (evs)
            for (const cb of evs)
                cb(ev);
        return true;
    }

    removeEventListener(ev: string, cb: any) {
        const evs = this.targets[ev];
        if (!evs) return;
        for (let i = 0; i < evs.length; ++i) {
            if (evs[i] == cb) {
                evs.splice(i, 1);
                return;
            }
        }
    }
}