import { ifetch } from "../platform";

export type QueryProcessor = {
    getPost: (post: HTMLElement) => HTMLElement;
    getFileThumbnail: (post: HTMLElement) => HTMLElement;
    postsWithFiles: (host?: HTMLElement) => HTMLElement[];
    settingsHost: () => HTMLSpanElement;
    catalogControlHost: () => HTMLDivElement;
    getImageLink:(post: HTMLElement) => AsyncGenerator<string, void, void>;
    getThumbnailLink: (post: HTMLElement) => string;
    getFilename: (post: HTMLElement) => string;
    getMD5: (post: HTMLElement) => string;
    getInfoBox: (post: HTMLElement) => HTMLElement;
    getPostIdPrefix: () => string;
    getTextBox: (post: HTMLElement) => HTMLElement;
    getCurrentBoard: () => string;
    getCurrentThread: () => number | undefined;
};

export const V4chan: QueryProcessor = {
    getFileThumbnail: post => post.querySelector('div.file')!,
    getPost: (post) => post.querySelector('.post')!,
    postsWithFiles: (h) => [...(h || document).querySelectorAll('.file')].map(e => e.closest('.postContainer')) as any,
    settingsHost: () => document.getElementById("navtopright") as any,
    catalogControlHost: () => document.getElementById("settings") as HTMLDivElement,
    getImageLink: async function *(post: HTMLElement) {
        yield post.querySelector('a[target="_blank"]')?.getAttribute('href') || '';
    },
    
    //(post: HTMLElement) => post.querySelector('a[target="_blank"]')?.getAttribute('href') || '',
    getFilename: (post: HTMLElement) => {
        const a = post.querySelector('a[target="_blank"]') as (HTMLAnchorElement | null);
        if (a && a.title)
            return a.title;
        return a?.textContent || '';
    },
    getMD5: (post: HTMLElement) => post.querySelector("img[data-md5]")?.getAttribute("data-md5") || '',
    getThumbnailLink: (post: HTMLElement) => post.querySelector("img[data-md5]")?.getAttribute("src") || '',
    getInfoBox: post => post.querySelector("div.fileText")!,
    getPostIdPrefix: () => 'p',
    getTextBox: (post) => post.querySelector('blockquote')!,
    getCurrentBoard: () => location.pathname.split('/')[1],
    getCurrentThread: () => +location.pathname.split('/')[3]
};

export const X4chan: QueryProcessor = {
    getFileThumbnail: post => post.querySelector('div.file')!,
    getPost: (post) => post.querySelector('.post')!,
    postsWithFiles: (h) => [...(h || document).querySelectorAll('.postContainer:not([class*="noFile"])')] as HTMLElement[],
    settingsHost: () => document.getElementById("shortcuts") as any,
    catalogControlHost: () => document.getElementById("index-options") as HTMLDivElement,
    getImageLink: async function *(post: HTMLElement) {
        yield post.querySelector('a[target="_blank"]')?.getAttribute('href') || '';
    },
    getFilename: (post: HTMLElement) => {
        const a = post.querySelector('a[target="_blank"]') as (HTMLAnchorElement | null);
        const origlink = post.querySelector('.file-info > a[target*="_blank"]') as HTMLAnchorElement;
        return (origlink.querySelector('.fnfull') || origlink)?.textContent || '';
    },
    getMD5: (post: HTMLElement) => post.querySelector("img[data-md5]")?.getAttribute("data-md5") || '',
    getThumbnailLink: (post: HTMLElement) => post.querySelector("img[data-md5]")?.getAttribute("src") || '',
    getInfoBox: post => post.querySelector("span.file-info")!,
    getPostIdPrefix: V4chan.getPostIdPrefix,
    getTextBox: V4chan.getTextBox,
    getCurrentBoard: V4chan.getCurrentBoard,
    getCurrentThread: V4chan.getCurrentThread,
};

export const FoolFuuka: QueryProcessor = {
    getFileThumbnail: post => post.classList.contains('post_is_op') ? post.querySelector('.thread_image_link')! : post.querySelector('.thread_image_box')!,
    getPost: (post) => post.querySelector('.post_wrapper')!,
    postsWithFiles: (h) => [...(h || document).querySelectorAll('article[class*="has_image"]')] as HTMLElement[],
    settingsHost: () => document.querySelector(".letters") as any,
    catalogControlHost: () => document.getElementById("index-options") as HTMLDivElement,
    getImageLink: async function *(post: HTMLElement) {
        if (location.host == "arch.b4k.co") { //get hecked
            const pid = post.id.match(/\d+/)![0];
            const board = location.pathname.match(/\/(..?.?)\//)![1];
            const res = await ifetch(`https://archive.wakarimasen.moe/_/api/chan/post/?board=${board}&num=${pid}`);
            const data = await res.json();
            yield data.media.media_link;
        }
        yield post.querySelector('a[rel]')?.getAttribute('href') || '';
    },
    getFilename: (post: HTMLElement) => {
        const opfn = post.querySelector('a.post_file_filename')?.textContent;
        if (opfn)
            return opfn;
        const a = post.querySelector('a[rel]') as (HTMLAnchorElement | null);
        return a?.title || '';
    },
    getMD5: (post: HTMLElement) => post.querySelector("img[data-md5]")?.getAttribute("data-md5") || '',
    getThumbnailLink: (post: HTMLElement) => {
        const e = post.querySelector("img[data-md5]");
        return e?.getAttribute("src") || e?.getAttribute("data-src") || '';
    },
    getInfoBox: post => post.querySelector("span.post_controls")!,
    getPostIdPrefix: () => '',
    getTextBox: post => post.querySelector('.text')!,
    getCurrentBoard: V4chan.getCurrentBoard,
    getCurrentThread: V4chan.getCurrentThread,
};

export const getQueryProcessor = (is4chanX: boolean) => {
    if (['boards.4chan.org', 'boards.4channel.org'].includes(location.host))
        return is4chanX ? X4chan : V4chan;
    if (document.querySelector('meta[name="generator"]')?.getAttribute("content")?.startsWith("FoolFuuka"))
        return FoolFuuka;
};
