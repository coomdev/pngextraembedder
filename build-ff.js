/* eslint-disable */

import { spawnSync } from 'child_process';
import { writeFileSync, readFileSync, copyFileSync } from 'fs'

import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

import webExt from 'web-ext';

let res = spawnSync("git", ["rev-list", "--count", "HEAD"]);
let rev = +res.stdout;

const domains = [
  "https://*.coom.tech/*",
  "https://boards.4channel.org/*",
  "https://boards.4chan.org/*",
  "https://desuarchive.org/*",
  "https://archived.moe/*",
  "https://archive.nyafuu.org/*",
  "https://arch.b4k.co/*",
  "https://archive.wakarimasen.moe/*",
  "https://b4k.co/*",
  "https://fireden.net/*",
  "https://thebarchive.com/*",
  "https://archiveofsins.com/*",
  "https://catbox.moe/*",
  "https://zz.ht/*",
  "https://take-me-to.space/*",
  "https://*.4cdn.org/*",
  "https://*.desuarchive.org/*",
  "https://*.archived.moe/*",
  "https://*.archive.nyafuu.org/*",
  "https://*.b4k.co/*",
  "https://*.wakarimasen.moe/*",
  "https://*.fireden.net/*",
  "https://*.thebarchive.com/*",
  "https://*.archiveofsins.com/*",
  "https://*.catbox.moe/*",
  "https://*.zz.ht/*",
  "https://*.imouto.kawaii.su/*",
  "https://*.take-me-to.space/*",
  "https://*.gelbooru.com/*",
  "https://*.yande.re/*",
  "https://*.sankakucomplex.com/*",
  "https://*.rule34.xxx/*",
  "https://*.donmai.us/*",
  "https://*.lolibooru.moe/*",
  "https://*.allthefallen.moe/*",
];

const manif = {
  "manifest_version": 2,
  "browser_specific_settings": {
    "gecko": {
      "update_url": "https://git.coom.tech/fuckjannies/lolipiss/raw/branch/%E4%B8%AD%E5%87%BA%E3%81%97/firefox_update.json",
    }
  },
  "name": "PngExtraEmbedder",
  "description": "Discover embedded files on 4chan and archives!",
  "version": "0." + rev,
  "icons": {
    "64": "1449696017588.png"
  },
  "permissions": [
    "notifications",
    "clipboardWrite",
    "menus",
    "activeTab",
    "webRequest",
    "webRequestBlocking",
    "contextMenus",
    ...domains
  ],
  "content_scripts": [
    {
      "matches": domains,
      "css": [],
      "run_at": "document_start",
      "js": ["polyfill.min.js", "dist/main.js"],
    }
  ],
  "web_accessible_resources": ["*.html", "*.js",],

//  "background": {
//    persistent: true,
//    "scripts": [
//      "polyfill.min.js",
//      "browser-polyfill.min.js",
//      "dist/background.js"
//    ]
//  }
};

(async () => {
  let res;

  res = await esbuild
    .build({
      entryPoints: ["src/main.ts"],
      bundle: true,
      treeShaking: true,
      outfile: "./firefox/dist/main.js",
      define: {
        global: 'window',
        execution_mode: '"ff_api"',
        manifest: manif.version,
        isBackground: 'false',
        BUILD_VERSION: JSON.stringify([0, rev])
      },
      inject: ['./esbuild.inject.js'],
      plugins: [
        esbuildSvelte({
          compilerOptions: { css: true, accessors: true },
          preprocess: sveltePreprocess(),
        })
      ],
      loader: {
        '.css': 'text',
        '.png': 'binary'
      },
      metafile: true
    })

  console.log(res.metafile.inputs);
  console.log(Object.entries(res.metafile.inputs).sort((a, b) => a[1].bytes - b[1].bytes).map(e => `${e[0]} -> ${e[1].bytes}`).join('\n'));

  res = await esbuild
    .build({
      entryPoints: ["src/background.ts"],
      bundle: true,
      treeShaking: true,
      outfile: "./firefox/dist/background.js",
      define: {
        global: 'window',
        execution_mode: '"ff_api"',
        manifest: manif.version,
        isBackground: 'true',
        BUILD_VERSION: JSON.stringify([0, rev])
      },
      inject: ['./esbuild.inject.js'],
      metafile: true
    });
  console.log(res.metafile.inputs);
  console.log(Object.entries(res.metafile.inputs).sort((a, b) => a[1].bytes - b[1].bytes).map(e => `${e[0]} -> ${e[1].bytes}`).join('\n'));

  writeFileSync('./firefox/manifest.json', JSON.stringify(manif, null, 2));
  copyFileSync("./logo.png", "./chrome/1449696017588.png");

  res = await webExt.cmd.build({
    sourceDir: './firefox/',
    artifactsDir: '.',
    filename: 'PEE-firefox.zip',
    overwriteDest: true,
  });
  console.log(res);
  writeFileSync('./firefox_update.json', JSON.stringify({
    "addons": {
      "{34ac4994-07f2-44d2-8599-682516a6c6a6}": {
        "updates": [
          {
            "version": manif.version,
            "update_link": "https://git.coom.tech/fuckjannies/lolipiss/raw/branch/%E4%B8%AD%E5%87%BA%E3%81%97/pee-firefox.zip",
          }
        ]
      }
    }

  }));
})();
