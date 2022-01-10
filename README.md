PNG Extra Embedder (PEE)
========================

Can embed any file in a PNG/WebM/GIF and upload it through 4chanX.
Requires 4chanX and violentmonkey.

How to Install
==============

Ok retard, listen up, just click on these things out of your grasp:
- [Install ViolentMonkey](https://violentmonkey.github.io/get-it/) (it is preferable to TamperMonkey(closed source) and GreaseMonkey(abandonned shit))
- [Install 4chanX](https://www.4chan-x.net/builds/4chan-X.user.js)
- Use the prebuilt [main.user.js](https://shoujo.coom.tech/main.user.js)

How to Build
============

npm i and npm run build
then install the generated main.users.js


How to use
==========

Posts with an embedded image/video will have an colored dashed line on their right. Golden means the file is external (ie. a booru), and pink means it was a file embedded in the post file.

![eye](settings.png)

In the quick reply form, a magnet icon will appear.
You need to select a png/webm/gif file to upload first, as you would normally (this is what the file will appear as), then click on the magnet to select a file to embed (can be anything).

![qr](screen.png)


# TroubleShooting

## "It doesn't wor-"
![ACK](ack.png)

**ACK!**

## "I am using [BROWSER] and [USERSCRIPT MANAGER] and when I do [X]..."

That's better. Officially, all developpment is made and tested on latest Chromium with VM. I'm willing to provide support and help for FF and other Chromium-based browsers as long as you use ViolentMonkey and provide as much information as you can: console logs, screenshots, versions...

## Something else

Either post in /cumg/, but I might gloss over your post, or open an issue on this repository, you need an account but email verification is disabled.

## It's slow

The slowest machine I have available is an 8GB 2011 Sandy Bridge i5 with a 1660Ti, the only way I can tell something is slow is if you post a performance profile for me to study. (DevTools > Performance > Reload and Start Profiler > Save Profiler).

There are parts where slowness is unavoidable, for example if you have a slow internet connection and enabled preloading (wtf are you doing?).

Even without preloading enabled, PEE still makes many requests at the start of a page as it fetches a small initial chunk of png/webm/gif files to know if something is embedded in there, only progressing further when something is detected.

## Why is it so big

The file-type detection package is huge as it detect many file types, but also depends on node constructs that are also huge by themselves. There's also a webm parser that's relatively big that's used for embedding/extracting files in/from webms. There's also the svelte UI that compiles down to simple javascript.

# Technical details

## Formats

### PNG

This works by appending the file in the last IDAT chunk.
Metadata information is stored in a tEXt chunk, placed near the header so that a parser looking for that embedded information can bail out without having to parse the whole file.

Metadata in the tEXt has the following meaning:

CUM[null]0 -> The last IDAT chunk is formatted as [filename length[LE 4 bytes], filename, filedata]

CUM[null]X is reserved for future extensions

Possible workaround for 4chan jannies would be to assoome IDAT chunks don't go over a certain size, slightly harder workaround would be to check if the deflate stream yields enough pixels to fit the described dimensions of the image. 


Webm
----
The file is embedded in a SimpleTag tag, with a TagName of C00M and a TagBinary that contains the file content.
The Tags section of that file can contain a TagName with a value of COOMFILENAME and a TagString containing a filename

GIF
---

The embedded data is contained in an application extension chunk, usually right after the NETSCAPE extension.
The extension is named COOMTECH0.1, the rest of the bytes encode directly the file content, with no filename. The filesize is implicitely determined by a sentinel value that marks the end of the subchunk.

JPG
---

Can never be supported as 4chan reincodes them.

Third Eye
---------

Third eye filenames are supported.
Filename just need to be made of 32 hex characters that correspond to a filename in any of the supported boorus.

Other formats
=============

The format used by Zip anon won't be supported because:
- it isn't extensible (if change were to the storage format, an extension update wouldn't be backcompatible)
- requires parsing the whole file to know if it has an embedded file
- and includes a private chunk type that is functionally defective (stores the length of the last IDAT chunk as a mean to identify it, instead of assooming it's simply the last one)

Bugs
====

- more to come
- not having a feature isn't a bug you retard