import { spawnSync } from 'child_process';

let res = spawnSync("git", ["rev-list", "--count", "HEAD"]);
let rev = +res.stdout;

export const extheader = `// ==UserScript==
// @name         PNGExtraEmbed
// @namespace    https://coom.tech/
// @version      0.${rev}
// @description  uhh
// @author       You
// @match        https://boards.4channel.org/*
// @match        https://boards.4chan.org/*
// @match        https://desuarchive.org/*
// @match        https://archived.moe/*
// @match        https://archive.nyafuu.org/*
// @match        https://arch.b4k.co/*
// @match        https://archive.wakarimasen.moe/*
// @match        https://fireden.net/*
// @match        https://thebarchive.com/*
// @match        https://archiveofsins.com/*
// @require      https://unpkg.com/web-streams-polyfill/dist/polyfill.min.js
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @grant        GM_openInTab
// @grant        GM.openInTab
// @grant        unsafeWindow
// @run-at       document-start
// @connect      4chan.org
// @connect      4channel.org
// @connect      i.4cdn.org
// @connect      *
// @icon         https://coom.tech/resources/assets/1449696017588.png
// ==/UserScript==

const observer = new MutationObserver((mutations) => {
    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach((addedNode) => {
        if (addedNode.textContent.includes('-0x')) {
          addedNode.remove();
        }
      });
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
`;