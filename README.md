PNG Extra Embedder (PEE)
========================

Can embed any file in a PNG and upload it through 4chanX.
Requires 4chanX and violentmonkey.

How to Build
============

npm i and npm run build
then install the generated main.users.js

How to Install
==============

Or use the prebuilt main.user.js at the root of this repo.


Format
======

This works by appending the file in the last IDAT chunk.
Metadata information is stored in a tEXt chunk, placed near the header so that a parser looking for that embedded information can bail out without having to parse the whole file.

Metadata in the tEXt has the following meaning:

CUM[null]0 -> The last IDAT chunk is formatted as [filename length[LE 4 bytes], filename, filedata]

CUM[null]X is reserved for future extensions

Possible workaround for 4chan jannies would be to assoome IDAT chunks don't go over a certain size, slightly harder workaround would be to check if the deflate stream yields enough pixels to fit the described dimensions of the image. 

Other formats
=============

The format used by Zip anon won't be supported because:
- it isn't extensible (if change were to the storage format, an extension update wouldn't be backcompatible)
- requires parsing the whole file to know if it has an embedded file
- and includes a private chunk type that is functionally defective (stores the length of the last IDAT chunk as a mean to identify it, instead of assooming it's simply the last one)