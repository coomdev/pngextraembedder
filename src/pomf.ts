import type { EmbeddedFile, ImageProcessor } from "./main";
import { Buffer } from "buffer";
import thumbnail from "./assets/hasembed.png";
import { settings } from "./stores";
import { getHeaders, ifetch, Platform } from "./platform";

const sources = [
    { host: 'Catbox', prefix: 'files.catbox.moe/' },
    { host: 'Litter', prefix: 'litter.catbox.moe/' },
    { host: 'Zzzz', prefix: 'z.zz.fo/' },
    { host: 'Pomf', prefix: 'a.pomf.cat/' },
];

export let csettings: Parameters<typeof settings['set']>[0];
settings.subscribe(b => {
    csettings = b;
});

const getExt = (fn: string) => {
    const isDum = fn!.match(/^[a-z0-9]{6}\./i);
    const isB64 = fn!.match(/^((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=))?\.(gif|jpe?g|png|webm)/);
    const isExt = fn!.match(/\[.*=(.*)\]/);
    let ext;
    let source: string | undefined;
    try {
        if (isDum) {
            ext = fn.split('.').slice(0, -1).join('.');
        } else if (isB64) {
            ext = atob(isB64[1]);
        } else if (isExt) {
            ext = decodeURIComponent(isExt[1]);
            if (ext.startsWith('https://'))
                ext = ext.slice('https://'.length);
            for (const cs of sources)
                if (ext.startsWith(cs.prefix)) {
                    source = cs.prefix;
                    ext = ext.slice(cs.prefix.length);
                    break;
                }
        }
    } catch {
        /**/
    }
    return { ext, source };
};

const extract = async (b: Buffer, fn?: string) => {
    const { ext, source } = getExt(fn!);

    let rsource: string;
    for (const cs of sources) {
        if (source && cs.prefix != source)
            continue;
        try {
            await getHeaders('https://' + cs.prefix + ext);
            rsource = 'https://' + cs.prefix + ext;
            break;
        } catch {
            // 404
        }
    }

    return [{
        filename: ext,
        data: csettings.hotlink ? rsource! : async (lsn) => {
            try {
                return Buffer.from(await (await ifetch(rsource, undefined, lsn)).arrayBuffer());
            } catch (e) {
                //404
            }
        },
        thumbnail
    } as EmbeddedFile];
};

const has_embed = async (b: Buffer, fn?: string) => {
    const { ext, source } = getExt(fn!);
    if (!ext)
        return false;
    for (const cs of sources) {
        if (source && cs.prefix != source)
            continue;
        try {
            const e = await getHeaders('https://' + cs.prefix + ext);
            return true;
        } catch {
            // 404
        }
    }

    return false;
};

export default {
    skip: true,
    extract,
    has_embed,
    match: fn => !!getExt(fn)
} as ImageProcessor;