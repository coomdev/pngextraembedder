/* eslint-disable */

const { writeFileSync, readFileSync } = require('fs');

const extheader = `// ==UserScript==
// @name         PNGFileEmbed
// @namespace    https://tampermonkey.net/
// @version      0.1
// @description  uhh
// @author       You
// @match        https://boards.4channel.org/g/thread/*
// @icon         https://www.google.com/s2/favicons?domain=4channel.org
// @grant        GM_xmlhttpRequest
// @require      https://greasyfork.org/scripts/421384-gm-fetch/code/GM_fetch.js?version=898562
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
