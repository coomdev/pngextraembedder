/* eslint-disable */

import { spawnSync } from 'child_process';
import { writeFileSync, readFileSync } from 'fs'

import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";
import { extheader } from './extheader.js';

let res = spawnSync("git", ["rev-list", "--count", "HEAD"]);
let rev = +res.stdout;

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
          compilerOptions: { css: true, accessors: true },
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
