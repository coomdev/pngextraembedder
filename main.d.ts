declare module '*.css' {
    export default string;
}

declare module '*.png' {
    export default new Uint8Array;
}

declare const QR: any;