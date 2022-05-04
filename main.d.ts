declare module '*.css' {
    export default string;
}

declare module '*.png' {
    export default new Uint8Array;
}

declare module 'blockhash' {
    export const hammingDistance: (a: string, b: string) => number;
    export const blockhash: () => void;
    export const blockhashData: (imgData: {
        width: number,
        height: number,
        data: Uint8Array
    }, bits: number, method: number) => string;
}

declare module "jpeg-js/lib/decoder" {
    export interface RawImageData<T> {
        width: number;
        height: number;
        data: T;
    }

    type BufferRet = RawImageData<Buffer>;
    type UintArrRet = RawImageData<Uint8Array>;

    type ImageData = BufferRet | UintArrRet;
    type BufferLike = Buffer | Uint8Array | ArrayLike<number> | Iterable<number> | ArrayBuffer;

    export declare function decode(
        jpegData: BufferLike,
        opts: {
            useTArray: true;
            colorTransform?: boolean;
            formatAsRGBA?: boolean;
            tolerantDecoding?: boolean;
            maxResolutionInMP?: number;
            maxMemoryUsageInMB?: number;
        },
    ): UintArrRet & { comments?: string[] };
    export declare function decode(
        jpegData: BufferLike,
        opts?: {
            useTArray?: false;
            colorTransform?: boolean;
            formatAsRGBA?: boolean;
            tolerantDecoding?: boolean;
            maxResolutionInMP?: number;
            maxMemoryUsageInMB?: number;
        },
    ): BufferRet & { comments?: string[] };

}

declare const QR: any;
declare const BUILD_VERSION: [number, number];
declare const execution_mode: 'userscript' | 'chrome_api' | 'ff_api';
declare const isBackground: boolean;
declare const chrome: typeof browser;
declare const _DOMParser: typeof DOMParser;
declare const manifest: 2 | 3;
declare function GM_addElement(parent: HTMLElement, tagname: string, attrs: Record<string, string>)