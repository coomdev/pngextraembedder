import { Buffer } from "buffer";
import { GM_fetch, headerStringToObject } from "./requests";
import thumbnail from "./assets/hasembed.png";
import type { EmbeddedFile } from './main';

/*
header (must be < 2k): [1 byte bitfield](if hasfilename: null terminated string)(if has tags: [X null terminated string, tags are whitespace-separated])
(if has thumbnail: [thumbnail size X]
rest: [X bytes of thumbnail data])[file bytes]
&1 => has filename
&2 => has tags
&4 => has thumbnail
*/
export const decodeCoom3Payload = async (buff: Buffer) => {
    const pees = buff.toString().split('\0');
    return Promise.all(pees.map(async pee => {
        const res = await GM_fetch(pee, { headers: { ranges: 'bytes=0-2048' } });
        const size = +(res.headers.get('content-size') || 0);
        const header = Buffer.from(await res.arrayBuffer());
        const flags = header[0];
        const hasFn = flags & 1;
        const hasTags = flags & 2;
        const hasThumbnail = flags & 4;
        let [ptr, ptr2] = [1, 1];
        let fn = 'embedded';
        let tags = [];
        let thumb: EmbeddedFile['thumbnail'] = Buffer.from(thumbnail);
        if (hasFn) {
            while (buff[ptr2] != 0)
                ptr2++;
            fn = header.slice(ptr, ptr2).toString();
            ptr = ++ptr2;
        }
        if (hasTags) {
            while (buff[ptr2] != 0)
                ptr2++;
            tags = header.slice(ptr, ptr2).toString().split(/\s+/);
        }
        let thumbsize = 0;
        if (hasThumbnail) {
            thumbsize = header.readInt32LE(ptr);
            thumb = Buffer.from(await (await GM_fetch(pee, { headers: { range: `bytes: ${ptr + 4}-${ptr + 4 + thumbsize}` } })).arrayBuffer());
        }
        return {
            filename: fn,
            data: async (lsn) =>
                Buffer.from(await (await GM_fetch(pee, { headers: { range: `bytes: ${ptr + 4 + thumbsize}-${size-1}` } }, lsn)).arrayBuffer()),
            thumbnail: thumb,
        } as EmbeddedFile;
    }));
};