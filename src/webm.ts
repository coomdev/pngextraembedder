import { Buffer } from "buffer";
import * as ebml from "ts-ebml";
import { concatAB } from "./png";

// unused, but will in case 4chan does file sig checks
//const password = Buffer.from("NOA");

const xor = (a: Buffer, p: Buffer) => {
    let n = 0;
    for (let i = 0; i < a.byteLength; ++i) {
        a[i] ^= p[n];
        n++;
        n %= p.byteLength;
    }
};

// just some debugging
const printChunks = (chunks: ebml.EBMLElementDetail[], ptr = 0, depth = 0): void => {
    if (ptr >= chunks.length)
        return;
    const k = chunks[ptr];
    const closing = ('isEnd' in k && k.isEnd ? 1 : 0);
    console.log('\t'.repeat(depth - closing) + (closing ? '/' : '') + k.name);
    switch (k.type) {
        case "m":
            if (k.isEnd) {
                return printChunks(chunks, ptr + 1, depth - 1);
            } else {
                return printChunks(chunks, ptr + 1, depth + 1);
            }
        default:
            return printChunks(chunks, ptr + 1, depth);
    }
};

const findEnclosingTag = (ch: ebml.EBMLElementDetail[], name: string): [number, number] | undefined => {
    const first = ch.findIndex(e => e.type == 'm' && e.name == name);
    if (first < 0)
        return;
    const second = ch.slice(first).findIndex(e => e.type == 'm' && e.name == name);
    if (second < 0)
        return;
    return [
        first, first + second
    ];
};

const embed = (webm: Buffer, data: Buffer) => {
    const dec = new ebml.Decoder();
    const chunks = dec.decode(webm);
    const enc = new ebml.Encoder();

    let embed = chunks.findIndex(e => e.name == "Tracks" && e.type == "m" && e.isEnd);

    const findOrInsert = (n: string) => {
        let tags = findEnclosingTag(chunks, n);
        const stack = [];
        if (!tags) {
            stack.push({
                type: "m",
                isEnd: false,
                name: n,
                data: Buffer.from('')
            });
            stack.push({
                type: "m",
                isEnd: true,
                name: n,
                data: Buffer.from('')
            });
            chunks.splice(embed + 1, 0, ...stack as any);
            tags = findEnclosingTag(chunks, n);
        }
        embed = tags![1];    
    };
    
    findOrInsert('Tags');
    findOrInsert('Tag');
    findOrInsert('Targets');
    embed++;

    chunks.splice(embed + 1, 0, ...[
        {
            type: "m",
            isEnd: false,
            name: 'SimpleTag',
            data: Buffer.from('')
        },
        {
            type: "8",
            isEnd: false,
            name: 'TagName',
            data: Buffer.from('COOM')
        },
        {
            type: "8",
            isEnd: false,
            name: 'TagBinary',
            data
        },
        {
            type: "m",
            isEnd: true,
            name: 'SimpleTag',
            data: Buffer.from('')
        }
    ] as any);
    return Buffer.from(enc.encode(chunks.filter(e => e.name != "unknown")));
};

const extractBuff = (webm: Buffer) => {
    const dec = new ebml.Decoder();
    const chunks = dec.decode(webm);

    const embed = chunks.findIndex(e => e.name == "TagName" && e.type == '8' && e.value == "COOM");
    const cl = chunks.find(e => e.name == "Cluster");
    if (cl && embed == -1)
        return;
    if (embed == -1)
        return;
    const chk = chunks[embed + 1];
    if (chk.type == "b" && chk.name == "TagBinary")
        return chk.data;
};

export const extract = async (reader: ReadableStreamDefaultReader<Uint8Array>): Promise<{ filename: string; data: Buffer } | undefined> => {
    let total = Buffer.from('');
    let chunk: ReadableStreamDefaultReadResult<Uint8Array>;
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

export const inject = async (container: File, inj: File): Promise<Buffer> =>
    embed(Buffer.from(await container.arrayBuffer()), Buffer.from(await inj.arrayBuffer()));