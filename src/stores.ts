import { writable } from "svelte/store";

const localLoad = (key: string, def: any) =>
    key in localStorage
        ? JSON.parse(localStorage.getItem('__pee__' + key)!)
        : def;

const localSet = (key: string, value: any) =>
    localStorage.setItem('__pee__' + key, JSON.stringify(value));

export const settings = writable(localLoad('settings', {
    apv: false,
    apa: false,
    blacklist: [],
    sources: []
}));

settings.subscribe(newVal => {
    localSet('settings', newVal);
});
