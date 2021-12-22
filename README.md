PNG Extra Embedder (PEE)
========================

Can embed any file in a PNG and upload it through 4chanX.
Requires 4chanX and tampermonkey.

Notes: 4chan seems to limit the amount of embedded data to around 140kb files.

How to Build
============

npm i and npm run build
then add something like 

```
// ==UserScript==
// @name         PNGFileEmbed
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  uhh
// @author       You
// @match        https://boards.4channel.org/g/thread/*
// @icon         https://www.google.com/s2/favicons?domain=4channel.org
// @grant        GM_xmlhttpRequest
// @run-at document-start
// @connect      4chan.org
// @connect      4channel.org
// @connect      i.4cdn.org
// ==/UserScript==
```

at the very top of the file `dist/main.js` and import it in tampermonkey.
Don't know how to make this automatically yet.

How to Install
==============

Or use the prebuilt main.user.js at the root of this repo.