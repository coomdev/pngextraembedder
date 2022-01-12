import { localLoad, settings } from "./stores";

const xmlhttprequest = typeof GM_xmlhttpRequest != 'undefined' ?
    GM_xmlhttpRequest :
    (typeof GM != "undefined" ?
        GM.xmlHttpRequest :
        (window as any)['GM_xmlhttpRequest']);

export const headerStringToObject = (s: string) =>
    Object.fromEntries(s.split('\n').map(e => {
        const [name, ...rest] = e.split(':');
        return [name.toLowerCase(), rest.join(':').trim()];
    }));

export function GM_head(...[url, opt]: Parameters<typeof fetch>) {
    return new Promise<string>((resolve, reject) => {
        // https://www.tampermonkey.net/documentation.php?ext=dhdg#GM_xmlhttpRequest
        const gmopt: Tampermonkey.Request<any> = {
            url: url.toString(),
            data: opt?.body?.toString(),
            method: "HEAD",
            onload: (resp) => {
                if ((resp.status / 100) >= 4)
                    reject("response error");
                else
                    resolve(resp.responseHeaders);
            },
            ontimeout: () => reject("fetch timeout"),
            onerror: () => reject("fetch error"),
            onabort: () => reject("fetch abort")
        };
        xmlhttprequest(gmopt);
    });
}

export let GM_fetch = (...[url, opt, lisn]: [...Parameters<typeof fetch>, EventTarget?]) => {
    function blobTo(to: string, blob: Blob) {
        if (to == "arrayBuffer" && blob.arrayBuffer)
            return blob.arrayBuffer();
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = function (event) {
                if (!event) return;
                if (to == "base64")
                    resolve(event.target!.result);
                else
                    resolve(event.target!.result);
            };
            if (to == "arrayBuffer") fileReader.readAsArrayBuffer(blob);
            else if (to == "base64") fileReader.readAsDataURL(blob); // "data:*/*;base64,......"
            else if (to == "text") fileReader.readAsText(blob, "utf-8");
            else reject("unknown to");
        });
    }
    return new Promise<ReturnType<typeof fetch>>((resolve, reject) => {
        // https://www.tampermonkey.net/documentation.php?ext=dhdg#GM_xmlhttpRequest
        const gmopt: Tampermonkey.Request<any> = {
            url: url.toString(),
            data: opt?.body as any,
            responseType: "blob",
            headers: opt?.headers as any,
            method: opt?.method as any || "GET",
            ...(lisn ? {
                onprogress: (prog) => {
                    if (prog.loaded != prog.total && prog.total != 0)
                        lisn.dispatchEvent(new CustomEvent("progress", { detail: [prog.loaded, prog.total] }));
                },
            } : {}),
            onload: (resp) => {
                const blob = resp.response as Blob;
                const ref = resp as any as Awaited<ReturnType<typeof fetch>>;
                ref.blob = () => Promise.resolve(blob);
                ref.arrayBuffer = () => blobTo("arrayBuffer", blob) as Promise<ArrayBuffer>;
                ref.text = () => blobTo("text", blob) as Promise<string>;
                ref.json = async () => JSON.parse(await (blobTo("text", blob) as Promise<any>));
                resolve(resp as any);
            },
            ontimeout: () => reject("fetch timeout"),
            onerror: (...args) => {
                debugger;
                reject("fetch error");
            },
            onabort: () => reject("fetch abort")
        };
        xmlhttprequest(gmopt);
    });
};

if ((window as any)['pagemode'])
    GM_fetch = fetch as any;

const makePoolable = <T extends any[], U>(fun: (...args: T) => Promise<U>, getPoolSize: () => number) => {
    const pool = [];
    let pending = 0;
    const poolFree: (() => void)[] = [];

    return async (...args: T) => {
        while (pending >= getPoolSize())
            await new Promise<void>(_ => poolFree.push(_));
        pending++;
        const prom = fun(...args);
        prom.then(() => {
            pending--;
            poolFree.forEach(_ => _());
            poolFree.length = 0;
        });
        return prom;
    };
};

let csettings: Parameters<typeof settings['set']>[0] = localLoad('settingsv2', {} as any);

settings.subscribe(s => {
    csettings = s;
});

const poolFetch = makePoolable(GM_fetch, () => csettings.conc);