import { Platform } from "./platform";

const obj = execution_mode == "chrome_api" ? chrome : browser;
type Methods<T> = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [k in Exclude<keyof T, 'prototype'>]: T[k] extends Function ? T[k] : never;
};

obj.webRequest.onBeforeRequest.addListener((details) => {
    const redirectUrl = details.url;
    if (!redirectUrl.startsWith("https://loli.piss/"))
        return;
    const m = redirectUrl.match(/https:\/\/loli.piss\/(?<domain>.*?)(?<path>\/.*)\/(?<start>.*)\/(?<end>.*)/);
    if (!m)
        return;
    const { domain, path, start, end } = m.groups!;
    return {
        redirectUrl: `https://${domain}${path}`,
        requestHeaders: [{
            name: 'range',
            value: `bytes=${start}-${end}`
        }]
    } as browser.webRequest.BlockingResponse;
}, { urls: ['*://loli.piss/*'] }, ['blocking']);

obj.runtime.onConnect.addListener((c) => {
    c.onMessage.addListener(async obj => {
        const { id, name, args } = obj as {id: number, name: keyof Methods<typeof Platform>, args: Parameters<typeof Platform[keyof Methods<typeof Platform>]>};
        const res = await Platform[name](...args);
        c.postMessage({
            id, res
        });
    });
});