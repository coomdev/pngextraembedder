import { writable } from "svelte/store";
import type { Booru } from "./thirdeye";

const localLoad = <T>(key: string, def: T) =>
    ('__pee__' + key) in localStorage
        ? JSON.parse(localStorage.getItem('__pee__' + key)!) as T
        : def;

const localSet = (key: string, value: any) =>
    localStorage.setItem('__pee__' + key, JSON.stringify(value));

export const settings = writable(localLoad('settingsv2', {
    ...localLoad('settings', {}),
    loop: true,
    dh: false,
    xpv: false,
    xpi: false,
    te: false,
    eye: false,
    ca: false,
    pre: false,
    prev: false,
    sh: false,
    ep: false,
    blacklist: ['guro', 'scat', 'ryona', 'gore'],
    rsources: [{
        name: 'Gelbooru',
        domain: 'gelbooru.com',
        endpoint: '/index.php?page=dapi&s=post&q=index&json=1&tags=md5:',
        view: "https://gelbooru.com/index.php?page=post&s=view&id="
    },
    {
        name: 'Yandere',
        domain: 'yande.re',
        endpoint: '/post.json?tags=md5:',
        view: `https://yande.re/post/show/`
    },
    {
        name: 'Sankaku',
        domain: 'capi-v2.sankakucomplex.com',
        endpoint: '/posts/keyset?tags=md5:',
        view: `https://chan.sankakucomplex.com/post/show/`
    },
    {
        name: 'Rule34',
        domain: 'api.rule34.xxx',
        endpoint: '/index.php?page=dapi&s=post&q=index&json=1&tags=md5:',
        // note: rule34 do not seem to give source in their API
        view: "https://rule34.xxx/index.php?page=post&s=view&id="
    },
    {
        name: 'Danbooru',
        domain: 'danbooru.donmai.us',
        endpoint: '/posts.json?tags=md5:',
        view: 'https://danbooru.donmai.us/posts/'
    },
    {
        name: 'Lolibooru',
        domain: 'lolibooru.moe',
        endpoint: '/post.json?tags=md5:',
        view: 'https://lolibooru.moe/post/show/'
    },
    {
        name: "ATFbooru",
        domain: "booru.allthefallen.moe",
        endpoint: "/posts.json?tags=md5:",
        view: 'https://booru.allthefallen.moe/posts/'
    }] as (Omit<Booru, 'quirks'> & {view: string, disabled?: boolean})[]
}));

export const appState = writable({
    isCatalog: false,
    is4chanX: false,
    foundPosts: [] as HTMLElement[]
});

settings.subscribe(newVal => {
    localSet('settingsv2', newVal);
});
