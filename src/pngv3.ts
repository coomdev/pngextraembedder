import { Buffer } from "buffer";
import type { EmbeddedFile, ImageProcessor } from "./main";
import { PNGDecoder, PNGEncoder } from "./png";
import { decodeCoom3Payload } from "./utils";
import { settings } from "./stores";

export let csettings: Parameters<typeof settings['set']>[0];

settings.subscribe(b => {
    csettings = b;
});
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
    const ret: EmbeddedFile[] = [];

    try {
        for await (const [name, chunk, crc, offset] of sneed.chunks()) {
            let buff: Buffer;
            switch (name) {
                // should exist at the beginning of file to signal decoders if the file indeed has an embedded chunk
                case 'tEXt':
                    buff = await chunk();
                    if (buff.slice(4, 4 + CUM3.length).equals(CUM3)) {
                        const k = await decodeCoom3Payload(buff.slice(4 + CUM3.length));
                        ret.push(...k.filter(e => e).map(e => e as EmbeddedFile));
                    }
                    break;
                case 'IDAT':
                // eslint-disable-next-line no-fallthrough
                case 'IEND':
                    return ret.slice(0, csettings.maxe);
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

export const inject_data = async (container: File, injb: Buffer) => {
    let magic = false;
    const [writestream, extract] = BufferWriteStream();
    const encoder = new PNGEncoder(writestream);
    const decoder = new PNGDecoder(container.stream().getReader());

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

const inject = async (container: File, links: string[]) => {
    const injb = Buffer.from(links.join(' '));
    return inject_data(container, injb);
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
