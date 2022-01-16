import type { EmbeddedFile, ImageProcessor } from "./main";
import { GM_fetch } from "./requests";
import { localLoad, settings } from "./stores";
import { Buffer } from "buffer";

export let csettings: Parameters<typeof settings['set']>[0];
settings.subscribe(b => {
    csettings = b;
});

export type Booru = {
    disabled?: boolean;
    name: string;
    domain: string;
    endpoint: string;
    quirks: tran;
};

export type BooruMatch = {
    source?: string;
    page?: string;
    tags: string[];
    full_url: string;
    preview_url: string;
    ext: string;
};

type tran = (a: any) => BooruMatch[];

function firstThatFor<T>(promises: Promise<T>[], pred: (v: T) => boolean) {
    Promise.any(promises.map(async p => {
        const v = await p;
        if (pred(v))
            return v;
        throw v;
    }));
}

const gelquirk: (s: string) => tran = prefix => (a =>
    (a.post || a.data || a).map((e: any) => ({
        full_url: e.file_url,
        preview_url: e.preview_url || e.preview_url,
        source: e.source,

        ext: e.file_ext || e.file_url.substr(e.file_url.lastIndexOf('.') + 1),
        page: `${prefix}${(e.id || e.parent_id)}`,
        tags: (e.tag_string || (e.tags
            && (Array.isArray(e.tags)
                && (typeof e.tags[0] == "string" ? e.tags.join(' ') : e.tags.map((e: any) => e.name_en).join(' '))) || e.tags) || '').split(' ')
    } as BooruMatch)) || []);

let experimentalApi = false;
settings.subscribe(s => {
    experimentalApi = s.expte;
    boorus = s.rsources.map(e => ({
        ...e,
        quirks: gelquirk(e.view)
    }));
});
export let boorus: Booru[] =
    localLoad('settingsv2', { rsources: [] as (Omit<Booru, 'quirks'> & { view: string, disabled?: boolean })[] })
        .rsources.map(e => ({
            ...e,
            quirks: gelquirk(e.view)
        }));

let black = new Set<string>();

settings.subscribe(s => {
    black = new Set(s.blacklist);
});

const bufferingTime = 2000;
let expired: number | undefined = undefined;
type ApiResult = { [md5 in string]: { [domain in string]: BooruMatch[] } };
let reqQueue: [string, (a: ApiResult) => void][] = [];
let unlockQueue = Promise.resolve();

const queryCache: ApiResult = {};
const processQueries = async () => {
    let unlock!: () => void;
    unlockQueue = new Promise<void>(_ => unlock = _);
    const md5 = reqQueue.map(e => e[0]).filter(e => !(e in queryCache));
    expired = undefined;
    if (md5.length > 0) {
        const res = await fetch("https://shoujo.coom.tech/api", {
            method: "POST",
            body: JSON.stringify({ md5 }),
            headers: {
                'content-type': 'application/json'
            }
        });
        const results: ApiResult = await res.json();
        Object.entries(results).forEach(e => queryCache[e[0]] = e[1]);
    }
    reqQueue.forEach(e => e[1]({ [e[0]]: queryCache[e[0]] }));
    reqQueue = [];
    unlock();
};

const queueForProcessing = async (hex: string, cb: (a: ApiResult) => void) => {
    console.log("putting", hex, 'in queue');
    await unlockQueue;
    console.log("put", hex, 'in queue');
    reqQueue.push([hex, cb]);
    if (!expired) {
        expired = setTimeout(processQueries, bufferingTime);
    }
};

const cache: any = {};

const shoujoFind = async (hex: string): Promise<ApiResult> => {
    return new Promise(res => {
        queueForProcessing(hex, res);
    });
};

const findFileFrom = async (b: Booru, hex: string, abort?: EventTarget) => {
    try {
        /*        if (experimentalApi) {
                    const res = await shoujoFind(hex);
                    if (!res)
                        debugger;
                    return hex in res ? (res[hex][b.domain] || []) : [];
                }*/
        if (b.domain in cache && hex in cache[b.domain])
            return cache[b.domain][hex] as BooruMatch[];
        const res = await GM_fetch(`https://${b.domain}${b.endpoint}${hex}`);
        // might throw because some endpoint respond with invalid json when an error occurs
        const pres = await res.json();
        const tran = b.quirks(pres).filter(e => !e.tags.some(e => black.has(e)));
        if (!(b.domain in cache))
            cache[b.domain] = {};
        cache[b.domain][hex] = tran;
        return tran;
    } catch {
        return [];
    }
};

const extract = async (b: Buffer, fn?: string) => {
    let result!: BooruMatch[];
    let booru!: string;
    for (const e of Object.values(boorus)) {
        if (e.disabled)
            continue;
        result = await findFileFrom(e, fn!.substring(0, 32));

        if (result.length) {
            booru = e.name;
            break;
        }
    }
    let cachedFile: ArrayBuffer;
    const prev = result[0].preview_url;
    const full = result[0].full_url;
    return [{
        source: result[0].source,
        page: { title: booru, url: result[0].page },
        filename: fn!.substring(0, 33) + result[0].ext,
        thumbnail: (await (await GM_fetch(prev || full)).arrayBuffer()), // prefer preview
        data: csettings.hotlink ? (full || prev) : async (lsn) => {
            if (!cachedFile)
                cachedFile = (await (await GM_fetch(full || prev, undefined, lsn)).arrayBuffer()); // prefer full
            return cachedFile;
        }
    } as EmbeddedFile];
};

const has_embed = async (b: Buffer, fn?: string) => {
    // It's not worth to bother skipping images with filenames that match their md5 because 
    // 4chan reencodes jpegs, which is well over half the files posted

    // ok fine you autists
    if (Buffer.from(fn!, 'hex').equals(b))
        return false;

    let result: BooruMatch[] | undefined = undefined;
    for (const e of Object.values(boorus)) {
        if (e.disabled)
            continue;
        result = await findFileFrom(e, fn!.substring(0, 32));
        result = result.filter(e => e.full_url || e.preview_url); // skips possible paywalls
        if (result.length)
            break;
    }
    return result && result.length != 0;
};

export default {
    skip: true,
    extract,
    has_embed,
    match: fn => !!fn.match(/^[0-9a-f]{32}\.....?/)
} as ImageProcessor;