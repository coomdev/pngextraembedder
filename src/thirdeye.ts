import type { EmbeddedFile, ImageProcessor } from "./main";
import { GM_fetch } from "./requests";
import { settings } from "./stores";

export type Booru = {
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
    }))
}

const gelquirk: (s: string) => tran = prefix => (a =>
    (a.post || a).map((e: any) => ({
        ext: e.image.substr(e.image.indexOf('.') + 1),
        full_url: e.file_url,
        source: e.source,
        page: `${prefix}${e.id}`,
        preview_url: e.preview_url,
        tags: e.tags.split(' ')
    } as BooruMatch)) || []);

export const boorus: Booru[] = [
    {
        name: 'Gelbooru',
        domain: 'gelbooru.com',
        endpoint: '/index.php?page=dapi&s=post&q=index&json=1&tags=md5:',
        quirks: gelquirk("https://gelbooru.com/index.php?page=post&s=view&id=")
    },
    {
        name: 'Yandere',
        domain: 'yande.re',
        endpoint: '/post.json?tags=md5:',
        quirks: a =>
            a.map((e: any) => ({
                source: e.source,
                page: `https://yande.re/post/show/${e.id}`,
                ext: e.file_ext,
                full_url: e.file_url,
                preview_url: e.preview_url,
                tags: e.tags.split(' ')
            } as BooruMatch))
    },
    {
        name: 'Sankaku',
        domain: 'capi-v2.sankakucomplex.com',
        endpoint: '/posts/keyset?tags=md5:',
        quirks: a => a.data ?
            a.data.map((e: any) => ({
                source: e.source,
                // api cannot differenciate between idol and chan?
                page: `https://chan.sankakucomplex.com/post/show/${e.id}`,
                ext: e.file_type.substr(e.file_type.indexOf('/') + 1),
                full_url: e.file_url,
                preview_url: e.preview_url,
                tags: e.tags.map((e: any) => e.name_en)
            } as BooruMatch)) : []
    },
    {
        name: 'Rule34',
        domain: 'api.rule34.xxx',
        endpoint: '/index.php?page=dapi&s=post&q=index&json=1&tags=md5:',
        // note: rule34 do not seem to give source in their API
        quirks: gelquirk("https://rule34.xxx/index.php?page=post&s=view&id=")
    },
    {
        name: 'Danbooru',
        domain: 'danbooru.donmai.us',
        endpoint: '/posts.json?tags=md5:',
        quirks: a =>
            a.map((e: any) => ({
                source: e.source,
                page: `https://danbooru.donmai.us/posts/${e.id}`,
                ext: e.file_ext,
                full_url: e.file_url,
                preview_url: e.preview_url,
                tags: e.tag_string.split(' ')
            } as BooruMatch))
    },
    {
        name: 'Lolibooru',
        domain: 'lolibooru.moe',
        endpoint: '/post.json?tags=md5:',
        quirks: a =>
            a.map((e: any) => ({
                source: e.source,
                page: `https://lolibooru.moe/post/show/${e.id}`,
                ext: e.file_url.substr(e.file_url.lastIndexOf('.') + 1),
                full_url: e.file_url,
                preview_url: e.preview_url,
                tags: e.tags.split(' ')
            } as BooruMatch))
    }
];

let black = new Set<string>();
let sources = new Set<string>();

settings.subscribe(s => {
    black = new Set(s.blacklist);
    sources = new Set(s.sources);
});

const cache: any = {};

const findFileFrom = async (b: Booru, hex: string, abort?: EventTarget) => {
    try {
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
        if (!sources.has(e.domain))
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
    return {
        source: result[0].source,
        page: { title: booru, url: result[0].page },
        filename: fn!.substring(0, 33) + result[0].ext,
        thumbnail: (await (await GM_fetch(prev || full)).arrayBuffer()), // prefer preview
        data: async (lsn) => {
            if (!cachedFile)
                cachedFile = (await (await GM_fetch(full || prev, undefined, lsn)).arrayBuffer()); // prefer full
            return cachedFile;
        }
    } as EmbeddedFile;
};

const has_embed = async (b: Buffer, fn?: string) => {
    // It's not worth to bother skipping images with filenames that match their md5 because 
    // 4chan reencodes jpegs, which is well over half the files posted

    // ok fine you autists
    if (Buffer.from(fn!, 'hex').equals(b))
        return false;

    let result: BooruMatch[] | undefined = undefined;
    for (const e of Object.values(boorus)) {
        if (!sources.has(e.domain))
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
    match: fn => !!fn.match(/^[0-9a-fA-F]{32}\.....?/)
} as ImageProcessor;