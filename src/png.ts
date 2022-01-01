import { buf } from "crc-32";
import { Buffer } from "buffer";

export const concatAB = (...bufs: Buffer[]) => {
    const sz = bufs.map(e => e.byteLength).reduce((a, b) => a + b);
    const ret = Buffer.alloc(sz);
    let ptr = 0;
    for (const b of bufs) {
        b.copy(ret, ptr);
        ptr += b.byteLength;
    }
    return ret;
};

export type PNGChunk = [string, Buffer, number, number];

export class PNGDecoder {
    repr: Buffer;

    req = 8;

    ptr = 8;

    constructor(private reader: ReadableStreamDefaultReader<Uint8Array>) {
        this.repr = Buffer.from([]);
    }

    async catchup() {
        while (this.repr.byteLength < this.req) {
            const chunk = await this.reader.read();
            if (chunk.done)
                throw new Error("Unexpected EOF");
            this.repr = concatAB(this.repr, Buffer.from(chunk.value));
        }
    }

    async *chunks() {
        while (true) {
            this.req += 8; // req length and name
            await this.catchup();
            const length = this.repr.readUInt32BE(this.ptr);
            const name = this.repr.slice(this.ptr + 4, this.ptr + 8).toString();
            this.ptr += 4;
            this.req += length + 4; // crc
            await this.catchup();
            yield [name, this.repr.slice(this.ptr, this.ptr + length + 4 /* chunkname included in buffer for easier crc fixup */), this.repr.readUInt32BE(this.ptr + length + 4), this.ptr] as PNGChunk;
            this.ptr += length + 8;
            if (name == 'IEND')
                break;
        }
    }

    async dtor() {
        //ugh
    }
}

export class PNGEncoder {
    writer: WritableStreamDefaultWriter<Buffer>;

    constructor(bytes: WritableStream<Buffer>) {
        this.writer = bytes.getWriter();
        this.writer.write(Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]));
    }

    async insertchunk(chunk: PNGChunk) {
        const b = Buffer.alloc(4);
        b.writeInt32BE(chunk[1].length - 4, 0);
        await this.writer.write(b); // write length
        await this.writer.write(chunk[1]); // chunk includes chunkname
        b.writeInt32BE(buf(chunk[1]), 0);
        await this.writer.write(b);
    }

    async dtor() {
        this.writer.releaseLock();
        await this.writer.close();
    }
}

const CUM0 = Buffer.from("CUM\0" + "0");

export const extract = async (reader: ReadableStreamDefaultReader<Uint8Array>) => {
    let magic = false;

    const sneed = new PNGDecoder(reader);
    try {
        let lastIDAT: Buffer | null = null;
        for await (const [name, chunk, crc, offset] of sneed.chunks()) {
            switch (name) {
                // should exist at the beginning of file to signal decoders if the file indeed has an embedded chunk
                case 'tEXt':
                    if (chunk.slice(4, 4 + CUM0.length).equals(CUM0))
                        magic = true;
                    break;
                case 'IDAT':
                    if (magic) {
                        lastIDAT = chunk;
                        break;
                    }
                // eslint-disable-next-line no-fallthrough
                case 'IEND':
                    if (!magic)
                        return; // Didn't find tExt Chunk;
                // eslint-disable-next-line no-fallthrough
                default:
                    break;
            }
        }
        if (lastIDAT) {
            let data = (lastIDAT as Buffer).slice(4);
            const fnsize = data.readUInt32LE(0);
            const fn = data.slice(4, 4 + fnsize).toString();
            // Todo: xor the buffer to prevent scanning for file signatures (4chan embedded file detection)?
            data = data.slice(4 + fnsize);
            return { filename: fn, data };
        }
    } catch (e) {
        console.error(e);
    } finally {
        reader.releaseLock();
    }
};

const buildChunk = (tag: string, data: Buffer) => {
    const ret = Buffer.alloc(data.byteLength + 4);
    ret.write(tag.substr(0, 4), 0);
    data.copy(ret, 4);
    return ret;
};

const BufferWriteStream = () => {
    let b = Buffer.from([]);
    const ret = new WritableStream<Buffer>({
        write(chunk) {
            b = concatAB(b, chunk);
        }
    });
    return [ret, () => b] as [WritableStream<Buffer>, () => Buffer];
};

export const inject = async (container: File, inj: File) => {
    const [writestream, extract] = BufferWriteStream();
    const encoder = new PNGEncoder(writestream);
    const decoder = new PNGDecoder(container.stream().getReader());

    let magic = false;
    for await (const [name, chunk, crc, offset] of decoder.chunks()) {
        if (magic && name != "IDAT")
            break;
        if (!magic && name == "IDAT") {
            await encoder.insertchunk(["tEXt", buildChunk("tEXt", CUM0), 0, 0]);
            magic = true;
        }
        await encoder.insertchunk([name, chunk, crc, offset]);
    }
    const injb = Buffer.alloc(4 + inj.name.length + inj.size);
    injb.writeInt32LE(inj.name.length, 0);
    injb.write(inj.name, 4);
    Buffer.from(await inj.arrayBuffer()).copy(injb, 4 + inj.name.length);
    await encoder.insertchunk(["IDAT", buildChunk("IDAT", injb), 0, 0]);
    await encoder.insertchunk(["IEND", buildChunk("IEND", Buffer.from([])), 0, 0]);
    return extract();
};