import { Buffer } from "buffer";
import type { ImageProcessor } from "./main";
import pngv3 from "./pngv3";
import { fireNotification } from "./utils";

export const convertToPng = async (f: File): Promise<Blob | undefined> => {
    const can = document.createElement("canvas");

    const url = URL.createObjectURL(f);
    try {
        let dims: [number, number];
        let source: CanvasImageSource;
        if (f.type.startsWith("image")) {
            const imgElem = document.createElement('img');
            imgElem.src = url;
            await new Promise(_ => imgElem.onload = _);
            dims = [imgElem.naturalWidth, imgElem.naturalHeight];
            source = imgElem;
        } else if (f.type.startsWith("video")) {
            const vidElem = document.createElement('video');
            vidElem.src = url;
            await new Promise(_ => vidElem.onloadedmetadata = _);
            vidElem.currentTime = 0;
            await new Promise(_ => vidElem.onloadeddata = _);
            await new Promise(requestAnimationFrame);
            await new Promise(requestAnimationFrame);
            await new Promise(requestAnimationFrame);
            dims = [vidElem.videoWidth, vidElem.videoHeight];
            source = vidElem;
        } else
            return;
        can.width = dims[0];
        can.height = dims[1];
        const ctx = can.getContext("2d");
        
        if (!ctx)
            return;
        ctx.drawImage(source, 0, 0, dims[0], dims[1]);

        const blob = await new Promise<Blob | null>(_ => can.toBlob(_, "image/png"));
        if (!blob)
            return;
        return blob;
    } finally {
        URL.revokeObjectURL(url);
    }
};

const inject = async (b: File, c: File[]) => {
    const pngfile = await convertToPng(b);
    if (!pngfile || pngfile.size > 3000 * 1024) {
        throw "Couldn't convert file to PNG: resulting filesize too big.";
    }
    return pngv3.inject!(b, c);
};

export default {
    skip: true,
    match: fn => !!fn.match(/\.jpe?g$/),
    has_embed: () => false,
    extract: () => [],
    inject
} as ImageProcessor;