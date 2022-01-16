export type QueryProcessor = {
    thumbnailSelector: string;
    md5Selector: string;
    filenameSelector: string;
    linkSelector: string;
    postsWithFiles: (host?: HTMLElement) => HTMLElement[];
    postContainerSelector: string;
    controlHostSelector: string;
    settingsHost: () => HTMLSpanElement;
    catalogControlHost: () => HTMLDivElement;
    getImageLink: (post: HTMLElement) => string;
    getFilename: (post: HTMLElement) => string;
    getMD5: (post: HTMLElement) => string;
    getInfoBox: (post: HTMLElement) => HTMLElement;
};

export const V4chan: QueryProcessor = {
    thumbnailSelector: "",
    md5Selector: "",
    filenameSelector: "",
    linkSelector: "",
    postsWithFiles: (h) => [...(h || document).querySelectorAll('.file')].map(e => e.closest('.postContainer')) as any,
    postContainerSelector: ".postContainer",
    controlHostSelector: "",
    settingsHost: () => document.getElementById("navtopright") as any,
    catalogControlHost: () => document.getElementById("settings") as HTMLDivElement,
    getImageLink: (post: HTMLElement) => post.querySelector('a[target="_blank"]')?.getAttribute('href') || '',
    getFilename: (post: HTMLElement) => {
        const a = post.querySelector('a[target="_blank"]') as (HTMLAnchorElement | null);
        if (a && a.title)
            return a.title;
        return a?.textContent || '';
    },
    getMD5: (post: HTMLElement) => post.querySelector("img[data-md5]")?.getAttribute("data-md5") || '',
    getInfoBox: post => post.querySelector("div.fileText")!
};

export const X4chan: QueryProcessor = {
    thumbnailSelector: "",
    md5Selector: "",
    filenameSelector: "",
    linkSelector: "",
    postsWithFiles: (h) => [...(h || document).querySelectorAll('.postContainer:not([class*="noFile"])')] as HTMLElement[],
    postContainerSelector: ".postContainer",
    controlHostSelector: "",
    settingsHost: () => document.getElementById("shortcuts") as any,
    catalogControlHost: () => document.getElementById("index-options") as HTMLDivElement,
    getImageLink: (post: HTMLElement) => post.querySelector('a[target="_blank"]')?.getAttribute('href') || '',
    getFilename: (post: HTMLElement) => {
        const a = post.querySelector('a[target="_blank"]') as (HTMLAnchorElement | null);
        const origlink = post.querySelector('.file-info > a[target*="_blank"]') as HTMLAnchorElement;
        return (origlink.querySelector('.fnfull') || origlink)?.textContent || '';
    },
    getMD5: (post: HTMLElement) => post.querySelector("img[data-md5]")?.getAttribute("data-md5") || '',
    getInfoBox: post => post.querySelector("span.file-info")!
};

export const getQueryProcessor = (is4chanX: boolean) => {
    if (['boards.4chan.org', 'boards.4channel.org'].includes(location.host))
        return is4chanX ? X4chan : V4chan;
};