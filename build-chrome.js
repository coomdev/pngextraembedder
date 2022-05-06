/* eslint-disable */

import { spawnSync } from 'child_process';
import { writeFileSync, readFileSync, copyFileSync } from 'fs'

import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";
//import path from 'path';

//import ChromeExtension from 'crx';

//const crx = new ChromeExtension({
//  codebase: 'https://github.com/coomdev/pngextraembedder/raw/branch/%E4%B8%AD%E5%87%BA%E3%81%97/PEE-chrome.crx',
//  privateKey: readFileSync('./key.pem')
//});

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
//  "update_url": "https://github.com/coomdev/pngextraembedder/raw/branch/%E4%B8%AD%E5%87%BA%E3%81%97/chrome_update.xml",
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
      "js": ["dist/main.js"],
    }
  ],
  "background": {
    persistent: true,
    "scripts": [
      "browser-polyfill.min.js",
      "dist/background.js"
    ]
  }
};


const manif3 = {
  "manifest_version": 3,
//  "update_url": "https://github.com/coomdev/pngextraembedder/raw/branch/%E4%B8%AD%E5%87%BA%E3%81%97/chrome_update.xml",
  "name": "PngExtraEmbedder",
  "description": "Discover embedded files on 4chan and archives!",
  "version": "0." + rev,
  "icons": {
    "64": "1449696017588.png"
  },
  "permissions": [
    //"notifications",
    //"clipboardWrite",
    //"activeTab",
    "declarativeNetRequestWithHostAccess",
    //"contextMenus",
  ],
  host_permissions: domains,
  //"host_permissions":["<all_urls>"],
  "web_accessible_resources": [{
    "resources": ["*.html", "*.js"],
    "matches": ["<all_urls>"]
  }],
  "content_scripts": [
    {
      "matches": domains,
      "css": [],
      "run_at": "document_start",
      "js": ["dist/main.js"],
    }
  ],
  "declarative_net_request": {
    "rule_resources": [
      {
        id: 'rule1',
        enabled: true,
        path: 'b4k-csp.json'
      }
    ]
  },
  //"background": {
    // hope I won't need that polyfill...
    //"service_worker": "dist/background.js"
//  }
};

(async () => {
  let res;

  const lmanif = manif3;

  res = await esbuild
    .build({
      entryPoints: ["src/main.ts"],
      bundle: true,
      treeShaking: true,
      outfile: "./chrome/dist/main.js",
      define: {
        global: 'window',
        execution_mode: '"chrome_api"',
        manifest: lmanif.version,
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
      outfile: "./chrome/dist/background.js",
      define: {
        global: 'window',
        execution_mode: '"chrome_api"',
        manifest: lmanif.version,
        isBackground: 'true',
        BUILD_VERSION: JSON.stringify([0, rev])
      },
      inject: ['./esbuild.inject.js'],
      metafile: true
    });
  console.log(res.metafile.inputs);
  console.log(Object.entries(res.metafile.inputs).sort((a, b) => a[1].bytes - b[1].bytes).map(e => `${e[0]} -> ${e[1].bytes}`).join('\n'));

  writeFileSync('./chrome/manifest.json', JSON.stringify(lmanif, null, 2));
  copyFileSync("./logo.png", "./chrome/1449696017588.png");

  //const ext = await crx.load('./chrome');
  //const crxBuffer = await ext.pack();
  //const updateXML = crx.generateUpdateXML();
  //writeFileSync('./chrome_update.xml', updateXML);
  //writeFileSync('./PEE-chrome.crx', crxBuffer);
})();
