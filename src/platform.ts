import { GM_fetch, GM_head, headerStringToObject } from './requests';

let port: browser.runtime.Port;
const lqueue = {} as any;

console.log(execution_mode, isBackground);
if (execution_mode != 'userscript' && !isBackground) {
    // It has to be a content script
    port = (chrome || browser).runtime.connect();
    port.onMessage.addListener((e: any) => {
        lqueue[e.id](e);
    });
}

let gid = 0;

const sendCmd = <V>(cmd: any) => {
    const prom = new Promise<V>(_ => {
        const id = gid++;
        lqueue[id] = (e: any) => {
            _(e.res);
            delete lqueue[id];
        };
        port.postMessage({ id, ...cmd });
    });
    return prom;
};

const bridge = <U extends any[], V, T extends (...args: U) => V>(name: string, f: T) => {
    if (execution_mode != 'userscript' && !isBackground)
        return f;
    // It has to be the background script
    return (...args: U) => {
        return sendCmd({ name, args });
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
    return !location.host.includes('boards.4chan');
}

// Used to call background-only APIs from content scripts
@Bridged
export class Platform {
    static async openInTab(src: string, opts: { active: boolean, insert: boolean }) {
        if (execution_mode == 'userscript') {
            return GM.openInTab(src, opts);
        }
        const obj = execution_mode == "chrome_api" ? chrome : browser;
        let i: number | undefined;
        if (opts.insert)
            i = (await obj.tabs.getCurrent()).index + 1;
        return obj.tabs.create({ active: opts.active, url: src, index: i });
    }
}

const extrBlob = async (url: string) => {
    const ret = await (await fetch(url)).arrayBuffer();
    await sendCmd({ name: 'revoke', url });
    return new Uint8Array(ret);
};

async function serialize(src: any): Promise<any> {
    if (src instanceof FormData) {
        const value = [];
        for (const kv of src)
            value.push([kv[0], await Promise.all(src.getAll(kv[0]).map(serialize))]);
        return {
            cls: 'FormData', value,
        };
    }
    if (src instanceof File) {
        const { name, type, lastModified } = src;
        const value = URL.createObjectURL(src);
        return {
            cls: 'File',
            name, type, lastModified, value,
        };
    }
    if (src instanceof Blob) {
        const { type } = src;
        const value = URL.createObjectURL(src);
        return {
            cls: 'Blob', type, value,
        };
    }
    if (src === null || src === undefined || typeof src != "object")
        return src;
    const ret = {
        cls: 'Object',
        value: {}
    } as any;
    for (const prop in src) {
        ret.value[prop] = await serialize(src[prop]);
    }
    return ret;
}

export const corsFetch = async (input: string, init?: RequestInit, lsn?: EventTarget) => {
    const id = gid++;

    /*    if (init) {
            if (init.signal) {
                const sid = gid++;
                init.signal.addEventListener("abort", () => {
                    port.postMessage({ name: 'abortCorsFetch', sid });
                });
                (init as any).signal = sid as any;
            }
        }*/

    if (init?.body) {
        // Chrom* can't pass around FormData and File/Blobs between 
        // the content and bg scripts, so the data is passed through bloburls
        if (execution_mode == "chrome_api")
            init.body = await serialize(init.body);
    }

    const prom = new Promise<Awaited<ReturnType<typeof fetch>>>((_, rej) => {
        let gcontroller: ReadableStreamController<Uint8Array> | undefined;
        let buffer: Uint8Array[] = [];
        let finished = false;
        const rs = new ReadableStream<Uint8Array>({
            // I think start is not called immediately, but when something tries to pull the response
            start(controller) {
                // something is finally ready to read
                gcontroller = controller;
                // flush buffer
                buffer.forEach(b => gcontroller?.enqueue(b));
                buffer = [];
                if (finished) {
                    gcontroller.close();
                }
            }
        });

        // seq num... see background script for explanation
        let s: number;
        s = 0;
        const cmdbuff: any[] = [];

        lqueue[id] = (async (e: any) => {
            // this is computed from the background script because the content script may
            // request everything to be delivered in one chunk, defeating the purpose
            if (e.progress) {
                lsn?.dispatchEvent(new CustomEvent("progress", { detail: e.progress }));
            }

            if (e.pushData) {
                if (e.s > s) {
                    // insert before an hypothetical cmd with a higher seq number
                    // -1 will be returned on empty arrays, which still results in correct insertion
                    let idx = 0;
                    while (idx < cmdbuff.length) {
                        if (cmdbuff[idx].s > e.s)
                            break;
                        idx++;
                    }
                    cmdbuff.splice(idx, 0, e);
                    return;
                }
                // since we start from 0 and
                // don't accept command s > local s, 
                // then these must be equal
                // this also  means that cmdbuff must contain 0 or more ordered commands that must be processed
                // afterward until discontinuity 
                const processCmd = async (e: any) => {

                    if (e.pushData.data) {
                        const data = await extrBlob(e.pushData.data);

                        if (gcontroller)
                            gcontroller.enqueue(data);
                        else
                            buffer.push(data);
                    } else {
                        if (gcontroller)
                            gcontroller?.close();
                        else
                            finished = true;
                    }
                };
                await processCmd(e);
                s++;
                // process remaining sequential buffered commands
                while (cmdbuff[0]?.s == s) {
                    await processCmd(cmdbuff.shift());
                    s++;
                }
            }

            if (e.setRes) {
                const arrayBuffer = async () => {
                    // read the response fully
                    const r = rs.getReader();
                    await sendCmd({ name: 'fullyRead', fid: id });
                    const abs: Uint8Array[] = [];
                    let res: ReadableStreamDefaultReadResult<Uint8Array>;
                    do {
                        res = await r.read();
                        if (res.done) break;
                        abs.push(res.value);
                    } while (!res.done);
                    const sum = abs.reduce((a, b) => a + b.byteLength, 0);
                    const ret = new Uint8Array(sum);
                    abs.reduce((ptr, arr) => {
                        ret.set(arr, ptr);
                        return ptr + arr.byteLength;
                    }, 0);
                    r.releaseLock();
                    return ret;
                };

                const blob = async () => new Blob([await arrayBuffer()]);
                const text = async () => new TextDecoder().decode(await arrayBuffer());
                const json = async () => JSON.parse(await text());

                if (e.ok)
                    _({
                        body: rs,
                        ok: e.ok,
                        headers: e.headers,
                        redirected: e.redirected,
                        type: e.type,
                        url: e.url,
                        status: e.status,
                        bodyUsed: e.bodyUsed,
                        statusText: e.statusText,
                        clone() {
                            return this as Response;
                        },
                        arrayBuffer,
                        blob,
                        text,
                        json,
                        async formData() {
                            return new FormData;
                        }
                    });
                else {
                    rej(new Error(`${e.url} - ${e.status}`));
                }
            }
        });

        port.postMessage({
            id, name: 'corsFetch', args: [input, init]
        });
    });
    return prom;
};

export async function getHeaders(s: string) {
    if (execution_mode == 'userscript')
        return headerStringToObject(await GM_head(s));
    const res = await ifetch(s, {
        method: "HEAD"
    });
    return res.headers as any as Record<string, string>;
}

export async function ifetch(...[url, opt, lisn]: [...Parameters<typeof fetch>, EventTarget?]): ReturnType<typeof fetch> {
    if (execution_mode != "userscript")
        return corsFetch(url.toString(), opt, lisn);
    return GM_fetch(url, opt, lisn);
}

// most pngs are encoded with 65k idat chunks
export async function* streamRemote(url: string, chunkSize = 72 * 1024, fetchRestOnNonCanceled = true) {
    // if (false) {
    //     const res = await corsFetch(url);
    //     const reader = res.body;
    //     const stream = reader?.getReader();
    //     while (!stream?.closed) {
    //         const buff = await stream?.read();
    //         if (buff?.done) {
    //             break;
    //         }
    //         if (buff?.value) {
    //             const e = (yield buff.value) as boolean;
    //             if (e) {
    //                 stream?.cancel();
    //                 reader?.cancel();
    //                 break;
    //             }
    //         }
    //     }
    //     stream?.releaseLock();
    //     return;
    // }
    //const headers = await getHeaders(url);
    let size = Number.POSITIVE_INFINITY;
    let ptr = 0;
    let fetchSize = chunkSize;
    while (ptr != size) {
        //console.log('doing a fetch of ', url, ptr, ptr + fetchSize - 1);
        let obj: Record<string, string>;

        const fres = await ifetch(url, { headers: { range: `bytes=${ptr}-${ptr + fetchSize - 1}` } });
        if (execution_mode == "userscript") {
            obj = headerStringToObject((fres as any as Tampermonkey.Response<any>).responseHeaders);
        } else {
            obj = (fres as any as Response).headers as any;
        }
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
        const val = Buffer.from(await (fres as any).arrayBuffer());
        const e = (yield val) as boolean;
        //console.log('yeieledd, a', e);
        if (e) {
            break;
        }
    }
}
