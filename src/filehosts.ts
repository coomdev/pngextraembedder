import { GM_fetch } from "./requests";

const lolisafe = (domain: string) => ({
    domain,
    async uploadFile(f: Blob) {
        return '';
    }
});

function parseForm(data: object) {
    const form = new FormData();

    Object.entries(data)
        .filter(([key, value]) => value !== null)
        .map(([key, value]) => form.append(key, value));

    return form;
}

const catbox = (domain: string) => ({
    domain,
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
    uploadFile(f: Blob): Promise<string>;
}

export const filehosts: API[] = [
    catbox('catbox.moe'),
    lolisafe('zz.ht'),
    lolisafe('imouto.kawaii.su'),
    lolisafe('take-me-to.space'),
    lolisafe('loli.solutions'),
    lolisafe('loli.graphics'),
    lolisafe('sucks-to-b.eu')
];