/* eslint-disable */
import { buf } from "crc-32";
import { Buffer } from "buffer";

export let concatAB = (...bufs: Buffer[]) => {
    let sz = bufs.map(e => e.byteLength).reduce((a, b) => a + b);
    const ret = Buffer.alloc(sz);
    let ptr = 0;
    for (const b of bufs) {
        b.copy(ret, ptr);
        ptr += b.byteLength;
    }
    return ret;
}

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
            let chunk = await this.reader.read();
            if (chunk.done)
                throw new Error("Unexpected EOF");
            this.repr = concatAB(this.repr, Buffer.from(chunk.value));
        }
    }

    async *chunks() {
        while (true) {
            this.req += 8; // req length and name
            await this.catchup();
            let length = this.repr.readUInt32BE(this.ptr);
            let name = this.repr.slice(this.ptr + 4, this.ptr + 8).toString();
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
    }
}

export class PNGEncoder {
    writer: WritableStreamDefaultWriter<Buffer>;

    constructor(bytes: WritableStream<Buffer>) {
        this.writer = bytes.getWriter();
        this.writer.write(Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]));
    }

    async insertchunk(chunk: PNGChunk) {
        let b = Buffer.alloc(4);
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