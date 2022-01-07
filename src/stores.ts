import { writable } from "svelte/store";

const localLoad = (key: string, def: any) =>
    ('__pee__' + key) in localStorage
        ? JSON.parse(localStorage.getItem('__pee__' + key)!)
        : def;

const localSet = (key: string, value: any) =>
    localStorage.setItem('__pee__' + key, JSON.stringify(value));

export const settings = writable(localLoad('settings', {
    loop: true,
    dh: false,
    xpv: false,
    xpi: false,
    te: false,
    eye: false,
    ca: false,
    pre: false,
    prev: false,
    blacklist: ['guro', 'scat', 'ryona', 'gore'],
    sources: ['gelbooru.com',
        'yande.re',
        'capi-v2.sankakucomplex.com',
        'api.rule34.xxx',
        'danbooru.donmai.us',
        'lolibooru.moe']
}));

export const appState = writable({
    isCatalog: false
});

appState.subscribe(v => {
    console.log(v);
});

settings.subscribe(newVal => {
    localSet('settings', newVal);
});
