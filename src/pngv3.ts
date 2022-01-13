import { Buffer } from "buffer";
import type { ImageProcessor } from "./main";
import { PNGDecoder, PNGEncoder } from "./png";
import { buildPeeFile, decodeCoom3Payload, fireNotification, uploadFiles } from "./utils";
import { GM_fetch } from "./requests";

const CUM3 = Buffer.from("doo\0" + "m");

const BufferReadStream = (b: Buffer) => {
    const ret = new ReadableStream<Buffer>({
        pull(cont) {
            cont.enqueue(b);
            cont.close();
        }
    });
    return ret;
};

const extract = async (png: Buffer) => {
    const reader = BufferReadStream(png).getReader();
    const sneed = new PNGDecoder(reader);
    try {
        for await (const [name, chunk, crc, offset] of sneed.chunks()) {
            let buff: Buffer;
            switch (name) {
                // should exist at the beginning of file to signal decoders if the file indeed has an embedded chunk
                case 'tEXt':
                    buff = await chunk();
                    if (buff.slice(4, 4 + CUM3.length).equals(CUM3)) {
                        return await decodeCoom3Payload(buff.slice(4 + CUM3.length));
                    }
                    break;
                case 'IDAT':
                // eslint-disable-next-line no-fallthrough
                case 'IEND':
                    return;
                // eslint-disable-next-line no-fallthrough
                default:
                    break;
            }
        }
    } catch (e) {
        console.error(e);
    } finally {
        reader.releaseLock();
    }
};

const buildChunk = (tag: string, data: Buffer) => {
    const ret = Buffer.alloc(data.byteLength + 4);
    ret.write(tag.slice(0, 4), 0);
    data.copy(ret, 4);
    return ret;
};

export const BufferWriteStream = () => {
    let b = Buffer.from([]);
    const ret = new WritableStream<Buffer>({
        write(chunk) {
            b = Buffer.concat([b, chunk]);
        }
    });
    return [ret, () => b] as [WritableStream<Buffer>, () => Buffer];
};

const inject = async (container: File, injs: File[]) => {
    const [writestream, extract] = BufferWriteStream();
    const encoder = new PNGEncoder(writestream);
    const decoder = new PNGDecoder(container.stream().getReader());

    let magic = false;
    const links = await uploadFiles(injs);
    const injb = Buffer.from(links.join(' '));

    for await (const [name, chunk, crc, offset] of decoder.chunks()) {
        if (magic && name != "IDAT")
            break;
        if (!magic && name == "IDAT") {
            await encoder.insertchunk(["tEXt", async () => buildChunk("tEXt", Buffer.concat([CUM3, injb])), () => Promise.resolve(0), 0]);
            magic = true;
        }
        await encoder.insertchunk([name, chunk, crc, offset]);
    }
    await encoder.insertchunk(["IEND",
        async () => Promise.resolve(buildChunk("IEND", Buffer.from([]))),
        async () => Promise.resolve(0),
        0]);
    return extract();
};

const has_embed = async (png: Buffer) => {
    const reader = BufferReadStream(png).getReader();
    const sneed = new PNGDecoder(reader);
    try {
        for await (const [name, chunk, crc, offset] of sneed.chunks()) {
            let buff: Buffer;
            switch (name) {
                // should exist at the beginning of file to signal decoders if the file indeed has an embedded chunk
                case 'tEXt':
                    buff = await chunk();
                    if (buff.slice(4, 4 + CUM3.length).equals(CUM3))
                        return true;
                    break;
                case 'IDAT':
                // eslint-disable-next-line no-fallthrough
                case 'IEND':
                    return false; // Didn't find tExt Chunk; Definite no
                // eslint-disable-next-line no-fallthrough
                default:
                    break;
            }
        }
        // stream ended on chunk boundary, so no unexpected EOF was fired, need more data anyway
    } catch (e) {
        return; // possibly unexpected EOF, need more data to decide
    } finally {
        reader.releaseLock();
    }
};

export default {
    extract,
    has_embed,
    inject,
    match: fn => !!fn.match(/\.png$/)
} as ImageProcessor;
