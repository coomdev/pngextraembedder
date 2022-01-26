declare module '*.css' {
    export default string;
}

declare module '*.png' {
    export default new Uint8Array;
}

declare module 'blockhash' {
    export const hammingDistance:  (a: string, b: string) => number;
    export const blockhash:  () => void;
    export const blockhashData:  (imgData: {
        width: number,
        height: number,
        data: Uint8Array
    }, bits: number, method: number) => string;
}

declare const QR: any;