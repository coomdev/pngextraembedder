/* eslint-disable */

import { spawnSync } from 'child_process';
import { writeFileSync, readFileSync } from 'fs'

import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

let res = spawnSync("git", ["rev-list", "--count", "HEAD"]);
let rev = +res.stdout;
const extheader = `// ==UserScript==
// @name         PNGExtraEmbed
// @namespace    https://coom.tech/
// @version      0.${rev}
// @description  uhh
// @author       You
// @match        https://boards.4channel.org/*
// @match        https://boards.4chan.org/*
// @icon         https://www.google.com/s2/favicons?domain=4channel.org
// @require      https://unpkg.com/web-streams-polyfill/dist/polyfill.min.js
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @run-at       document-start
// @connect      4chan.org
// @connect      4channel.org
// @connect      i.4cdn.org
// @icon         https://coom.tech/resources/assets/1449696017588.png
// ==/UserScript==
`;

(async () => {
  let res;

  res = await esbuild
    .build({
      entryPoints: ["src/main.ts"],
      bundle: true,
      outfile: "./dist/main.js",
      define: {
        global: 'window'
      },
      inject: ['./esbuild.inject.js'],
      plugins: [
        esbuildSvelte({
          compilerOptions: { css: true },
          preprocess: sveltePreprocess(),
        })
      ],
      loader: {
        '.css': 'text'
      },
      metafile: true
    })

  console.log(Object.entries(res.metafile.inputs).sort((a, b) => a[1].bytes - b[1].bytes).map(e => `${e[0]} -> ${e[1].bytes}`).join('\n'));
  writeFileSync('./main.user.js', extheader + readFileSync('./dist/main.js'));
  writeFileSync('./main.meta.js', extheader);
})();
