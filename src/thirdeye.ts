import type { EmbeddedFile, ImageProcessor } from "./main";
import { GM_fetch } from "./requests";
import { settings } from "./stores";

export type Booru = {
    domain: string;
    endpoint: string;
    quirks: tran;
};

export type BooruMatch = {
    tags: string[];
    full_url: string;
    preview_url: string;
    ext: string;
};

type tran = (a: any) => BooruMatch[];

const gelquirk: tran = a =>
    a.post?.map((e: any) => ({
        ext: e.image.substr(e.image.indexOf('.') + 1),
        full_url: e.file_url,
        preview_url: e.preview_url,
        tags: e.tags.split(' ')
    } as BooruMatch)) || [];

export const boorus: Booru[] = [
    {
        domain: 'gelbooru.com',
        endpoint: '/index.php?page=dapi&s=post&q=index&json=1&tags=md5:',
        quirks: gelquirk
    },
    {
        domain: 'yande.re',
        endpoint: '/post.json?tags=md5:',
        quirks: a =>
            a.map((e: any) => ({
                ext: e.file_ext,
                full_url: e.file_url,
                preview_url: e.preview_url,
                tags: e.tags.split(' ')
            } as BooruMatch))
    },
    {
        domain: 'capi-v2.sankakucomplex.com',
        endpoint: '/posts/keyset?tags=md5:',
        quirks: a => a.data ?
            a.data.map((e: any) => ({
                ext: e.file_type.substr(e.file_type.indexOf('/') + 1),
                full_url: e.file_url,
                preview_url: e.preview_url,
                tags: e.tags.map((e: any) => e.name_en)
            } as BooruMatch)) : []
    },
    {
        domain: 'api.rule34.xxx',
        endpoint: '/index.php?page=dapi&s=post&q=index&json=1&tags=md5:',
        quirks: gelquirk
    },
    {
        domain: 'danbooru.donmai.us',
        endpoint: '/posts.json?tags=md5:',
        quirks: a =>
            a.map((e: any) => ({
                ext: e.file_ext,
                full_url: e.file_url,
                preview_url: e.preview_url,
                tags: e.tag_string.split(' ')
            } as BooruMatch))
    },
    {
        domain: 'lolibooru.moe',
        endpoint: '/post.json?tags=md5:',
        quirks: a =>
            a.map((e: any) => ({
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

const findFileFrom = async (b: Booru, hex: string) => {
    try {
        if (hex in cache)
            return cache[hex] as BooruMatch[];
        const res = await GM_fetch(`https://${b.domain}${b.endpoint}${hex}`);
        // might throw because some endpoint respond with invalid json when an error occurs
        const pres = await res.json();
        const tran = b.quirks(pres);
        cache[hex] = tran;
        return tran;
    } catch {
        return [];
    }
};

const extract = async (b: Buffer, fn?: string) => {
    const result = await Promise.race(Object.values(boorus)
        .filter(e => sources.has(e.domain))
        .map(e => findFileFrom(e, fn!.substring(0, 32))));
    return {
        filename: fn!.substring(33) + result[0].ext,
        thumbnail: (await (await GM_fetch(result[0].preview_url)).arrayBuffer()),
        data: async () => (await (await GM_fetch(result[0].full_url)).arrayBuffer())
    } as EmbeddedFile;
};

const has_embed = async (b: Buffer, fn?: string) => {
    // It's not worth to bother skipping images with filenames that match their md5 because 
    // 4chan reencodes jpegs, which is well over half the files posted
    let result: BooruMatch[] | undefined = undefined;
    for (const e of Object.values(boorus)) {
        if (!sources.has(e.domain))
            continue;
        result = await findFileFrom(e, fn!.substring(0, 32));
    }
    return result && result.length != 0;
};

export default {
    skip: true,
    extract,
    has_embed,
    match: fn => !!fn.match(/^[0-9a-fA-F]{32}\.....?$/)
} as ImageProcessor;