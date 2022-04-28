import { Buffer } from 'ts-ebml/lib/tools';
import { GM_fetch, GM_head, headerStringToObject } from './requests';

let port: browser.runtime.Port;
const lqueue: ((e: any) => boolean)[] = [];

if (execution_mode != 'userscript' && !isBackground) {
    port = browser.runtime.connect();
    port.onMessage.addListener((e: any) => {
        const k = lqueue.map(f => f(e));
        for (let i = k.length - 1; i != -1; --i) {
            if (k[i])
                lqueue.splice(i, 1);
        }
    });
}

let gid = 0;
const bridge = <U extends any[], V, T extends (...args: U) => V>(name: string, f: T) => {
    if (execution_mode != 'userscript' && !isBackground)
        return f;
    return (...args: U) => {
        const id = gid++;
        const prom = new Promise<V>(_ => {
            lqueue.push((e: any) => {
                if (e.id != id)
                    return false;
                _(e.res);
                return true;
            });
            port.postMessage({
                id, name, args
            });
        });
        return prom;
    };
};

// eslint-disable-next-line @typescript-eslint/ban-types
const Bridged = (ctor: any) => {
    const keys = Object.getOwnPropertyNames(ctor).filter(k => typeof ctor[k] == "function");
    for (const k of keys)
        ctor[k] = bridge(k, ctor[k]);
};

export function supportedAltDomain(s: string) {
    if (execution_mode == 'userscript')
        return GM.info.script.matches.slice(2).some(m => m.includes(s));
    return false;
}

// Used to call background-only APIs from content scripts
@Bridged
export class Platform {
    static async openInTab(src: string, opts: { active: boolean, insert: boolean }) {
        if (execution_mode == 'userscript') {
            return GM.openInTab(src, opts);
        }
        const obj = execution_mode == "chrome_api" ? chrome : browser;
        if (execution_mode == 'chrome_api') {
            let i: number | undefined;
            if (opts.insert)
                i = (await obj.tabs.getCurrent()).index + 1;
            return obj.tabs.create({ active: opts.active, url: src, index: i });
        }
    }
}

export async function getHeaders(s: string) {
    if (execution_mode == 'userscript')
        return headerStringToObject(await GM_head(s));
    const res = await fetch(s, {
        method: "HEAD"
    });
    return [...res.headers.entries()].reduce((a, b) => (a[b[0]] = b[1], a), {} as ReturnType<typeof headerStringToObject>);
}

export async function ifetch(...[url, opt, lisn]: [...Parameters<typeof fetch>, EventTarget?]): ReturnType<typeof fetch> {
    if (execution_mode != "userscript")
        return fetch(url, opt);
    return GM_fetch(url, opt, lisn);
}

// most pngs are encoded with 65k idat chunks
export async function* streamRemote(url: string, chunkSize = 72 * 1024, fetchRestOnNonCanceled = true) {
    if (execution_mode != 'userscript') {
        const res = await fetch(url);
        const reader = res.body;
        const stream = reader?.getReader();
        while (!stream?.closed) {
            const buff = await stream?.read();
            if (buff?.done) {
                break;
            }
            if (buff?.value) {
                const e = (yield buff.value) as boolean;
                if (e) {
                    stream?.cancel();
                    reader?.cancel();
                    break;
                }
            }
        }
        stream?.releaseLock();
        return;
    }
    //const headers = await getHeaders(url);
    let size = Number.POSITIVE_INFINITY;
    let ptr = 0;
    let fetchSize = chunkSize;
    while (ptr != size) {
        //console.log('doing a fetch of ', url, ptr, ptr + fetchSize - 1);
        const res = await ifetch(url, { headers: { range: `bytes=${ptr}-${ptr + fetchSize - 1}` } }) as any as Tampermonkey.Response<any>;
        const obj = headerStringToObject(res.responseHeaders);
        if (!('content-length' in obj)) {
            console.warn("no content lenght???", url);
            break;
        }
        if ('content-range' in obj) {
            size = +obj['content-range'].split('/')[1];
        }
        const len = +obj['content-length'];
        ptr += len;
        if (fetchRestOnNonCanceled)
            fetchSize = size;
        const val = Buffer.from(await (res as any).arrayBuffer());
        const e = (yield val) as boolean;
        //console.log('yeieledd, a', e);
        if (e) {
            break;
        }
    }
}
