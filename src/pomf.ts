import type { EmbeddedFile, ImageProcessor } from "./main";
import { GM_fetch, GM_head } from "./requests";
import type { Buffer } from "buffer";
import thumbnail from "./assets/hasembed.png";
import { settings } from "./stores";

const sources = [
    { host: 'Catbox', prefix: 'https://files.catbox.moe/' },
    { host: 'Litter', prefix: 'https://litter.catbox.moe/' },
    { host: 'Pomf', prefix: 'https://a.pomf.cat/' },
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
    try {
        if (isDum) {
            ext = fn.split('.').slice(0, -1).join('.');
        } else if (isB64) {
            ext = atob(isB64[1]);
        } else if (isExt) {
            ext = isExt[1];
        }
    } catch {
        /**/
    }
    return ext;
};

const extract = async (b: Buffer, fn?: string) => {
    const ext = getExt(fn!);

    let rsource: string;
    for (const source of sources) {
        try {
            await GM_head(source.prefix + ext);
            rsource = source.prefix + ext;
            break;
        } catch {
            // 404
        }
    }

    return [{
        filename: ext,
        data: csettings.hotlink ? rsource! : async (lsn) => {
            try {
                return (await GM_fetch(rsource, undefined, lsn)).arrayBuffer();
            } catch (e) {
                //404
            }
        },
        thumbnail
    } as EmbeddedFile];
};

const has_embed = async (b: Buffer, fn?: string) => {
    const ext = getExt(fn!);
    if (!ext)
        return false;
    for (const source of sources) {
        try {
            const e = await GM_head(source.prefix + ext);
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