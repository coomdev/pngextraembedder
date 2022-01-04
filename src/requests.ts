const xmlhttprequest = typeof GM_xmlhttpRequest != 'undefined' ? GM_xmlhttpRequest : (typeof GM != "undefined" ? GM.xmlHttpRequest : GM_xmlhttpRequest);

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
                resolve(resp.responseHeaders);
            },
            ontimeout: () => reject("fetch timeout"),
            onerror: () => reject("fetch error"),
            onabort: () => reject("fetch abort")
        };
        xmlhttprequest(gmopt);
    });
}

export function GM_fetch(...[url, opt]: Parameters<typeof fetch>) {
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
            data: opt?.body?.toString(),
            responseType: "blob",
            headers: opt?.headers as any,
            method: "GET",
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
            onerror: () => reject("fetch error"),
            onabort: () => reject("fetch abort")
        };
        xmlhttprequest(gmopt);
    });
}