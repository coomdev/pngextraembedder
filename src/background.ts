import { Platform } from "./platform";

const obj = execution_mode == "chrome_api" ? chrome : browser;
type Methods<T> = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [k in Exclude<keyof T, 'prototype'>]: T[k] extends Function ? T[k] : never;
};

const types = [
    "csp_report",
    "font",
    "image",
    "main_frame",
    "media",
    "object",
    "other",
    "ping",
    "script",
    "stylesheet",
    "sub_frame",
    "websocket",
    "xmlhttprequest"
] as browser.webRequest.ResourceType[];
const filts = {
    urls: ["https://boards.4channel.org/*",
        "https://boards.4chan.org/*",
        "https://desuarchive.org/*",
        "https://archived.moe/*",
        "https://archive.nyafuu.org/*",
        "https://arch.b4k.co/*",
        "https://archive.wakarimasen.moe/*",
        "https://fireden.net/*",
        "https://thebarchive.com/*",
        "https://files.catbox.moe/*",
        "https://de.catbox.moe/*",
        "https://based.coom.tech/*",
        "https://archiveofsins.com/*"],
    types
};
/*
obj.webRequest.onBeforeSendHeaders.addListener(
    function (details: any) {
        details.requestHeaders.push({ name: 'x-basldas', value: 'aslkhfqe' });
        return { requestHeaders: details.requestHeaders };
    },
    { urls: ["<all_urls>"], types },
    ["blocking", "requestHeaders"]
);
*/

//const ridh = {
//} as any;

//obj.webRequest.onCompleted.addListener(details => {
//    if (details.requestId in ridh)
//        delete ridh[details.requestId];
//}, filts);

obj.webRequest.onHeadersReceived.addListener(details => {
    if (details.url.startsWith('https://arch.b4k.co/') && details.type == "main_frame") {
        const e = details.responseHeaders!.findIndex(e => e.name.toLowerCase() == "content-security-policy");
        if (e >= 0)
            details.responseHeaders![e].value = "";
        return {
            responseHeaders: [
                ...details.responseHeaders!,
                { name: 'access-control-allow-origin', value: '*' }
            ]
        } as browser.webRequest.BlockingResponse;
    }
}, filts, ['blocking', 'responseHeaders', ...(execution_mode == "chrome_api" ? ['extraHeaders' as 'blocking'] : [])]);

/*
obj.webRequest.onBeforeSendHeaders.addListener((details) => {
    if (ridh[details.requestId]) {
        const res = ridh[details.requestId];
        return {
            requestHeaders: [res]
        } as browser.webRequest.BlockingResponse;
    }
}, filts, ['blocking']);

obj.webRequest.onBeforeRequest.addListener((details) => {
    const redirectUrl = details.url;
    let idx: number;
    if ((idx = redirectUrl.indexOf(spe)) == -1)
        return;
    const parts = redirectUrl.slice(idx + spe.length).split('/').filter(e => e);
    const [domain, path, [start, end]] = [
        parts[0],
        parts.slice(1, -2).join('/'),
        parts.slice(-2)
    ];
    ridh[details.requestId] = {
        name: "range",
        value: `bytes=${start}-${end}`
    };
    return {
        redirectUrl: `https://${domain}/${path}`,
        requestHeaders: [{ name: 'x-akjflkd', value: 'qofh3r3' }]
    } as browser.webRequest.BlockingResponse;
}, filts, ['blocking']);
*/

const pendingFetches = new Map<browser.runtime.Port, { [id in number]: { fetchFully: boolean } }>();

const bgCorsFetch = async (c: browser.runtime.Port, id: number, input: string, init?: RequestInit) => {
    /*if (typeof init?.signal == "number") {
        const id = init?.signal as any as number;
        const ab = new AbortController();
        init.signal = ab.signal;
    }*/

    if (input.startsWith('//')) // wtf fireshit??
        input = 'https:' + input;
    const k = await fetch(input, init);
    let headersStr = '';
    const headerObj = {} as any;
    k.headers.forEach((v, k) => {
        headerObj[k] = v;
        headersStr += `${k}: ${v}\n`;
    });
    c.postMessage({
        id, setRes: true,
        ok: k.ok,
        headers: headerObj,
        responseHeaders: headersStr,
        redirected: k.redirected,
        type: k.type,
        url: k.url,
        status: k.status,
        bodyUsed: k.bodyUsed,
        statusText: k.statusText,
    });

    pendingFetches.set(c, {
        [id]: {
            fetchFully: false
        },
        ...(pendingFetches.get(c) || {})
    });

    let buff: Buffer[] = [];

    const ctotal = +headerObj['content-length'] || 0; // content total
    let ltotal = 0; // loaded total

    // sequence number, required to reorder messages client-side
    // if they get processed out of order
    let s = 0;
    const e = {
        write(chunk: Uint8Array) {
            ltotal += chunk.byteLength;
            c.postMessage({ id, progress: [ltotal, ctotal] });
            if (!pendingFetches.get(c)![id].fetchFully) {
                const url = URL.createObjectURL(new Blob([chunk]));
                c.postMessage({ id, s: s++, pushData: { data: url } });
            } else {
                buff.push(Buffer.from(chunk));
            }
        },
        close() {
            if (buff.length > 0) {
                const url = URL.createObjectURL(new Blob([Buffer.concat(buff)]));
                c.postMessage({ id, s: s++, pushData: { data: url } });
                buff = [];
            }
            const obj = pendingFetches.get(c)!;
            delete obj[id];
            if (Object.keys(obj).length == 0)
                pendingFetches.delete(c);
            c.postMessage({ id, s: s++, pushData: {} });
        }
    };
    const reader = k.body?.getReader();
    let res: ReadableStreamDefaultReadResult<Uint8Array>;
    for (; ;) {
        res = await reader!.read();
        if (res.done) break;
        e.write(res.value);
    }
    e.close();
    reader?.releaseLock();
};

obj.runtime.onConnect.addListener((c) => {
    c.onMessage.addListener(async obj => {
        const { id, name, args, sid, fid, url } = obj as { url?: string, fid?: number, sid?: number, id: number, name: string, args: Parameters<typeof Platform[keyof Methods<typeof Platform>]> };
        if (name == "abortCorsFetch") {
            //chrome.runtime.sendMessage({ name, sid });
            return;
        }
        if (name == "corsFetch") {
            // this handles the reply
            (bgCorsFetch as any)(c, id, ...args);
            return;
        }

        if (name == "revoke") {
            URL.revokeObjectURL(url!);
            c.postMessage({
                id, ok: 1
            });
            return;
        }

        if (name == "fullyRead") {
            const obj = pendingFetches.get(c)!;
            if (obj && fid! in obj)
                obj[fid!].fetchFully = true;
            c.postMessage({
                id, ok: 1
            });
            return;
        }
        const res = await (Platform as any)[name](...args);
        c.postMessage({
            id, res
        });
    });
});