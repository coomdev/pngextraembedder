/* eslint-disable */

const { spawnSync } = require('child_process');
const { writeFileSync, readFileSync } = require('fs');

let res = spawnSync("git",  ["rev-list", "--count", "HEAD"]);
let rev = +res.stdout;
const extheader = `// ==UserScript==
// @name         PNGExtraEmbed
// @namespace    https://coom.tech/
// @version      0.${rev}
// @description  uhh
// @author       You
// @match        https://boards.4channel.org/*/thread/*
// @match        https://boards.4chan.org/*/thread/*
// @icon         https://www.google.com/s2/favicons?domain=4channel.org
// @require      https://unpkg.com/web-streams-polyfill/dist/polyfill.min.js
// @updateURL    https://git.coom.tech/coomdev/PEE/raw/branch/%e4%b8%ad%e5%87%ba%e3%81%97/main.user.js
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @run-at       document-start
// @connect      4chan.org
// @connect      4channel.org
// @connect      i.4cdn.org
// ==/UserScript==
`;

(async () => {
  let res = await require('esbuild').build({
    entryPoints: ['src/main.ts'],
    bundle: true,
    outfile: 'dist/main.js',
    define: {
      global: 'window'
    },
    inject: ['./esbuild.inject.js'],
    metafile: true
  });
  console.log(Object.entries(res.metafile.inputs).sort((a, b) => a[1].bytes - b[1].bytes).map(e => `${e[0]} -> ${e[1].bytes}`).join('\n'));
  writeFileSync('./main.user.js', extheader + readFileSync('./dist/main.js'));
})();
