import { writable } from "svelte/store";

const localLoad = (key: string, def: any) =>
    ('__pee__' + key) in localStorage
        ? JSON.parse(localStorage.getItem('__pee__' + key)!)
        : def;

const localSet = (key: string, value: any) =>
    localStorage.setItem('__pee__' + key, JSON.stringify(value));

export const settings = writable(localLoad('settings', {
    loop: true,
    xpv: false,
    xpi: false,
    blacklist: [],
    sources: []
}));

settings.subscribe(newVal => {
    localSet('settings', newVal);
});
