import { buf } from "crc-32";
import { Buffer } from "buffer";
import type { ImageProcessor } from "./main";

export type PNGChunk = [
    string, // name
    () => Promise<Buffer>, // data
    () => Promise<number>, // crc
    number];// offset

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
            if (chunk.done) {
                throw new Error(`Unexpected EOF, got ${this.repr.byteLength}, required ${this.req}, ${chunk.value}`);
            }
            this.repr = Buffer.concat([this.repr, chunk.value]);
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
            //await this.catchup();
            const pos = this.ptr;
            yield [name, 
                async () => {
                    await this.catchup();
                    return this.repr.slice(pos, pos + length + 4);
                }, 
                async () => {
                    await this.catchup();
                    return this.repr.readUInt32BE(this.ptr + length + 4);
                }, 
                this.ptr] as PNGChunk;
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
        const buff = chunk[1];
        await this.writer.write(await buff()); // chunk includes chunkname
        b.writeInt32BE(buf(await buff()), 0);
        await this.writer.write(b);
    }

    async dtor() {
        this.writer.releaseLock();
        await this.writer.close();
    }
}

export const BufferWriteStream = () => {
    let b = Buffer.from([]);
    const ret = new WritableStream<Buffer>({
        write(chunk) {
            b = Buffer.concat([b, chunk]);
        }
    });
    return [ret, () => b] as [WritableStream<Buffer>, () => Buffer];
};
