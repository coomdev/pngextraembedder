/* eslint-disable */

const { writeFileSync, readFileSync } = require('fs');

const extheader = `// ==UserScript==
// @name         PNGFileEmbed
// @namespace    https://tampermonkey.net/
// @version      0.1
// @description  uhh
// @author       You
// @match        https://boards.4channel.org/*/thread/*
// @match        https://boards.4chan.org/*/thread/*
// @icon         https://www.google.com/s2/favicons?domain=4channel.org
// @require      https://unpkg.com/web-streams-polyfill/dist/polyfill.min.js
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @run-at       document-start
// @connect      4chan.org
// @connect      4channel.org
// @connect      i.4cdn.org
// ==/UserScript==
`;

(async () => {
  await require('esbuild').build({
    entryPoints: ['src/main.ts'],
    bundle: true,
    outfile: 'dist/main.js',
    define: {
      global: 'window'
    }
  });
  writeFileSync('./main.user.js', extheader + readFileSync('./dist/main.js'));
})();
