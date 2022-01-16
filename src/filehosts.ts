import { GM_fetch } from "./requests";

function parseForm(data: object) {
    const form = new FormData();

    Object.entries(data)
        .filter(([key, value]) => value !== null)
        .map(([key, value]) => form.append(key, value));

    return form;
}

export const lolisafe = (domain: string, serving = domain) => ({
    domain,
    serving,
    async uploadFile(f: Blob) {
        const resp = await GM_fetch(`https://${domain}/api/upload`, {
            headers: {
                accept: "application/json",
            },
            "body": parseForm({
                reqtype: 'fileupload',
                'files[]': new File([f], 'f.pee')
            }),
            "method": "POST",
        });
        const res = (await resp.json()) as { success: boolean, files: { url: string, name: string, size: number }[] };
        return res.files.map(e => e.url)[0];
    }
});

export const catbox = (domain: string, serving: string) => ({
    domain,
    serving,
    async uploadFile(inj: Blob) {
        const resp = await GM_fetch(`https://${domain}/user/api.php`, {
            method: 'POST',
            body: parseForm({
                reqtype: 'fileupload',
                fileToUpload: inj
            })
        });
        return resp.text();
    }
});

export type API = {
    domain: string;
    serving: string;
    uploadFile(f: Blob): Promise<string>;
}

export const filehosts: API[] = [
    catbox('catbox.moe', 'files.catbox.moe'),
    lolisafe('zz.ht', 'z.zz.fo'),
    lolisafe('imouto.kawaii.su'),
    lolisafe('take-me-to.space'),
];