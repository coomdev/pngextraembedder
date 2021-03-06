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
    types: ["main_frame", "sub_frame", "csp_report", "object", "other", "ping"] as browser.webRequest.ResourceType[]
};

if (manifest == 2)
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

async function deserialize(src: any): Promise<any> {
    if (typeof src != "object")
        return src;
    switch (src.cls) {
        case 'FormData': {
            const ret = new FormData();
            for (const [key, items] of src.value) {
                for (const item of items) {
                    ret.append(key, await deserialize(item));
                }
            }
            return ret;
        }
        case 'File': {
            return new File([await (await fetch(src.value)).blob()], src.name, {
                lastModified: src.lastModified,
                type: src.type
            });
        }
        case 'Blob': {
            return new Blob([await (await fetch(src.value)).blob()], {
                type: src.type
            });
        }
        case 'Object': {
            const ret = {} as any;
            for (const prop in src.value) {
                ret[prop] = await deserialize(src.value[prop]);
            }
            return ret;
        }
    }
}

const pendingFetches = new Map<MessagePort, { [id in number]: { fetchFully: boolean } }>();

const bgCorsFetch = async (c: MessagePort, id: number, input: string, init?: RequestInit) => {
    if (input.startsWith('//')) // firefox??
        input = 'https:' + input;
    if (init?.body && execution_mode == "chrome_api")
        init.body = await deserialize(init.body);
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
                //const url = new Blob([chunk]);
                c.postMessage({ id, s: s++, pushData: { data: chunk } }, [chunk.buffer]);
            } else {
                buff.push(Buffer.from(chunk));
            }
        },
        close() {
            if (buff.length > 0) {
                const chunk = Buffer.concat(buff);
                c.postMessage({ id, s: s++, pushData: { data: chunk } }, [chunk.buffer]);
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

const meself = new URL(obj.runtime.getURL('')).origin;

const waitConnect = (cb: any) => {
    window.addEventListener("message", (msg) => {
        //if (msg.origin === meself) {
            cb(msg.ports[0]);
        //}
    });
};

const onMessage = (c: MessagePort, cb: any) =>
    c.onmessage = (e) => {
        cb(e.data);
    };

waitConnect((c: any) => {
    onMessage(c, async (obj: any) => {
        const { id, name, args, sid, fid, url } = obj as { url?: string, fid?: number, sid?: number, id: number, name: string, args: Parameters<typeof Platform[keyof Methods<typeof Platform>]> };
        if (name == "keepAlive") {
            console.log('im alive, tho?');
            return;
        }
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