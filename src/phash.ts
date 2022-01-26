const median = (data: number[]) => {
    const mdarr = data.slice(0);
    mdarr.sort((a, b) => a - b);
    if (mdarr.length % 2 === 0)
        return (mdarr[mdarr.length / 2 - 1] + mdarr[mdarr.length / 2]) / 2.0;
    return mdarr[Math.floor(mdarr.length / 2)];
};

const translate_blocks_to_bits = function (blocks: number[], pixels_per_block: number) {
    const half_block_value = pixels_per_block * 256 * 3 / 2;
    const bandsize = blocks.length / 4;

    // Compare medians across four horizontal bands
    for (let i = 0; i < 4; i++) {
        const m = median(blocks.slice(i * bandsize, (i + 1) * bandsize));
        for (let j = i * bandsize; j < (i + 1) * bandsize; j++) {
            const v = blocks[j];
            blocks[j] = Number(v > m || (Math.abs(v - m) < 1 && m > half_block_value));
        }
    }
};

const bits_to_hexhash = (bitsArray: number[]) => {
    const hex = [];
    for (let i = 0; i < bitsArray.length; i += 4) {
        const nibble = bitsArray.slice(i, i + 4);
        hex.push(parseInt(nibble.join(''), 2).toString(16));
    }

    return hex.join('');
};

export const bmvbhash_even = (data: {
    width: number;
    height: number;
    data: Uint8Array;
}, bits: number) => {
    const blocksize_x = Math.floor(data.width / bits);
    const blocksize_y = Math.floor(data.height / bits);

    const result = [];

    for (let y = 0; y < bits; y++) {
        for (let x = 0; x < bits; x++) {
            let total = 0;

            for (let iy = 0; iy < blocksize_y; iy++) {
                for (let ix = 0; ix < blocksize_x; ix++) {
                    const cx = x * blocksize_x + ix;
                    const cy = y * blocksize_y + iy;
                    const ii = (cy * data.width + cx) * 4;

                    const alpha = data.data[ii + 3];
                    if (alpha === 0) {
                        total += 765;
                    } else {
                        total += data.data[ii] + data.data[ii + 1] + data.data[ii + 2];
                    }
                }
            }

            result.push(total);
        }
    }

    translate_blocks_to_bits(result, blocksize_x * blocksize_y);
    return bits_to_hexhash(result);
};
