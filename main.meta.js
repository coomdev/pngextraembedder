// ==UserScript==
// @name         PNGExtraEmbed
// @namespace    https://coom.tech/
// @version      0.200
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

const oldSetI = unsafeWindow.setInterval;
const odocumentQS = unsafeWindow.document.querySelector;

unsafeWindow.document.querySelector = (...args) => {
  if (['.pee', '[src^="blob:"]'].some(e => args[0].includes(e)))
    return null;
  return odocumentQS.call(unsafeWindow.document, args);
}

const toStr = () => 'function toString() { [native code] }';
toStr.toString = toStr;
unsafeWindow.setInterval.toString = toStr;
unsafeWindow.document.querySelector.toString = toStr;
