import { Buffer } from "buffer";
import type { EmbeddedFile, ImageProcessor } from "./main";
import { BufferWriteStream } from "./png";
import { uploadFiles } from "./utils";

const netscape = Buffer.from("!\xFF\x0BNETSCAPE2.0", 'ascii');
const magic = Buffer.from("!\xFF\x0B" + "DOOMTECH1.1", 'ascii');

const read_section = (gif: Buffer, pos: number) => {
    const begin = pos;
    pos += 3 + gif[pos + 2];
    let buf = Buffer.alloc(0);
    while (pos < gif.byteLength) {
        const v = gif[pos++];
        buf = Buffer.concat([buf, gif.slice(pos, pos + v)]);
        if (v == 0)
            break;
        pos += v;
    }
    const appname = gif.slice(begin + 3, begin + 11).toString('ascii');
    return {
        appname,
        data: buf,
        end: pos
    };
};

const extractBuff = (gif: Buffer) => {
    const field = gif.readUInt8(10);
    const gcte = !!(field & (1 << 7));
    let end = 13;
    if (gcte) {
        end += 3 * (1 << ((field & 7) + 1));
    }
    // skip beeg blocks
    while (gif[end] == '!'.charCodeAt(0)) {
        let sec = read_section(gif, end); // this section contains the size to more easily preallocate a buffer size, but you don't need to care care
        if (sec.appname == "COOMTECH") {
            const ret = Buffer.alloc(sec.data.readInt32LE(0));
            let ptr = 0;
            do {
                sec = read_section(gif, sec.end);
                sec.data.copy(ret, ptr);
                ptr += sec.data.byteLength;
                end = sec.end;
            } while (sec.appname == "COOMTECH" && gif[end] == '!'.charCodeAt(0));
            return [{ data: ret, filename: 'embedded' }] as EmbeddedFile[];
        }
        end = sec.end;
    }
    throw "Shouldn't happen";
    // metadata ended, nothing...
};

const extract = extractBuff;

const write_data = async (writer: WritableStreamDefaultWriter<Buffer>, inj: Buffer) => {
    await writer.write(magic);
    const byte = Buffer.from([0]);
    let size = inj.byteLength;
    let ws;
    let offset = 0;
    while (size != 0) {
        ws = size >= 255 ? 255 : size;
        byte.writeUInt8(ws, 0);
        await writer.write(byte);
        await writer.write(inj.slice(offset, offset + ws));
        size -= ws;
        offset += ws;
    }
    byte.writeUInt8(0, 0);
    await writer.write(byte);
};

const write_embedding = async (writer: WritableStreamDefaultWriter<Buffer>, inj: Buffer) => {
    const b = Buffer.alloc(4);
    b.writeInt32LE(inj.byteLength, 0);
    await write_data(writer, b);
    let size = inj.byteLength;
    let offset = 0;
    while (size != 0) {
        const ws = size >= (3 << 13) ? (3 << 13) : size;
        await write_data(writer, inj.slice(offset, offset + ws));
        offset += ws;
        size -= ws;
    }
};

const inject = async (container: File, injs: File[]) => {
    const [writestream, extract] = BufferWriteStream();
    const writer = writestream.getWriter();

    const links = await uploadFiles(injs);
    const inj = Buffer.from(links.join(' '));

    const contbuff = Buffer.from(await container.arrayBuffer());

    const field = contbuff.readUInt8(10);
    const gcte = !!(field & (1 << 0x7));
    let endo = 13;
    if (gcte)
        endo += 3 * (1 << ((field & 7) + 1));

    if (netscape.compare(contbuff, endo, endo + netscape.byteLength) == 0)
        endo += 19;
    await writer.write(contbuff.slice(0, endo));
    await write_embedding(writer, Buffer.from(inj));
    await writer.write(contbuff.slice(endo));
    return extract();
};

const has_embed = (gif: Buffer) => {
    const field = gif.readUInt8(10);
    const gcte = !!(field & (1 << 7));
    let end = 13;
    if (gcte) {
        end += 3 * (1 << ((field & 7) + 1));
    }
    // skip beeg blocks
    while (end < gif.byteLength && gif.readUInt8(end) == '!'.charCodeAt(0)) {
        if (magic.compare(gif, end, end + magic.byteLength) != 0) {
            end += 3 + gif.readUInt8(end + 2);
            // eslint-disable-next-line no-constant-condition
            while (true) { // skip sub blocks
                const v = gif.readUInt8(end++);
                if (!v)
                    break;
                end += v;
            }
        } else {
            return true;
        }
    }
    if (end >= gif.byteLength)
        return; // Don't know yet, need more to decide.
    return false; // no more extension blocks, so definite no
};

export default {
    extract,
    has_embed,
    inject,
    match: fn => !!fn.match(/\.gif$/)
} as ImageProcessor;
