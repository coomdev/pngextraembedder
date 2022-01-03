import { Buffer } from "buffer";
import { BufferWriteStream, concatAB } from "./png";

const netscape = Buffer.from("!\xFF\x0BNETSCAPE2.0\x03\x01\x00\x00\x00");
const magic = Buffer.from("!\xFF\x0B" + "COOMTECH0.1", 'ascii');

const extractBuff = (gif: Buffer) => {
    let field = gif.readUInt8(10);
    let gcte = !!(field & (1 << 7));
    let end = 13;
    if (gcte) {
        end += 3 * (1 << ((field & 7) + 1));
    }
    // skip beeg blocks
    while (gif.readUInt8(end) == '!'.charCodeAt(0)) {
        if (magic.compare(gif, end, end + magic.byteLength) != 0) {
            end += 3 + gif.readUInt8(end + 2);
            while (1) { // skip sub blocks
                let v = gif.readUInt8(end++);
                if (!v)
                    break;
                end += v;
            }
        } else {
            let count = end + magic.byteLength;
            let t = 0;
            let v = 0;
            while ((v = gif.readUInt8(count)) != 0) {
                t += v;
                count += v + 1;
            }
            let buff = Buffer.alloc(t);
            count = end + magic.byteLength;
            t = 0;
            while ((v = gif.readUInt8(count)) != 0) {
                gif.copy(buff, t, count + 1, count + 1 + v)
                t += v;
                count += v + 1;
            }
            return buff;
        }
    }
    // metadata ended, nothing...
};

export const extract = async (reader: ReadableStreamDefaultReader<Uint8Array>): Promise<{ filename: string; data: Buffer } | undefined> => {
    let total = Buffer.from('');
    let chunk: ReadableStreamDefaultReadResult<Uint8Array>;
    // todo: early reject
    do {
        chunk = await reader.read();
        if (chunk.value)
            total = concatAB(total, Buffer.from(chunk.value));
    } while (!chunk.done);
    const data = extractBuff(total);
    if (!data)
        return;
    return { filename: 'embedded', data };
};

const write_embedding = async (writer: WritableStreamDefaultWriter<Buffer>, inj: Buffer) => {
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

export const inject = async (container: File, inj: File) => {
    const [writestream, extract] = BufferWriteStream();
    const writer = writestream.getWriter();

    let contbuff = Buffer.from(await container.arrayBuffer());

    let field = contbuff.readUInt8(10);
    let gcte = !!(field & (1 << 0x7))
    let endo = 13;
    if (gcte)
        endo += 3 * (1 << ((field & 7) + 1));

    if (netscape.compare(contbuff, endo, endo + netscape.byteLength) == 0)
        endo += netscape.byteLength;
    await writer.write(contbuff.slice(0, endo));
    await write_embedding(writer, Buffer.from(await inj.arrayBuffer()));
    await writer.write(contbuff.slice(endo));
    return extract();
};