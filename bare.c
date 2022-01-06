#include <stdio.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <sys/fcntl.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>

typedef unsigned char u8;

u8 *map_file(const char *file, size_t *sz) {
	struct stat fs;
	int fd = open(file, O_RDONLY);
	fstat(fd, &fs);
	*sz = fs.st_size;
	u8 *filecontent = mmap(0, *sz, PROT_READ, MAP_PRIVATE, fd, 0);
	return filecontent;
}

char sign[14] = "!\xFF\x0B""COOMTECH0.1";

void write_gif_embedding(const u8 *data, size_t size) {
	write(1, sign, sizeof(sign));
	u8 ws;
	while (size) {
		ws = size >= 255 ? 255 : size;
		write(1, &ws, 1);
		write(1, data, ws);
		data += ws;
		size -= ws;
	}
	ws = 0;
	write(1, &ws, 1);
}

void extract_from_gif(const u8 *data, size_t size,
					  void **outdata, size_t *osize) {
	const u8 *ptr = data;

	u8 field = ptr[10];
	u8 gcte = !!(field & (1 << 7));
	const u8 *end = ptr + 13;
	if (gcte) {
		int gcts = 1 << ((field & 7) + 1);
		end += 3 * gcts;
	}
	// skip
	while (*end == '!') {
		if (memcmp(end, sign, sizeof(sign))) {
			end += 3 + end[2];
			while (1) {
				u8 v = *end++;
				if (!v)
					break;
				end += v;
			}
		} else {
			const u8 *count = end + sizeof(sign);
			size_t t = 0;
			while (*count) {
				t += *count;
				count += *count + 1;
			}
			void *buff = malloc(t);
			count = end + 14;
			t = 0;
			while (*count) {
				memcpy(buff + t, count + 1, *count);
				t += *count;
				count += *count + 1;
			}
			*osize = t;
			*outdata = buff;
			return;
		}
	}
}

#if 1

int main(int argc, char *argv[argc]) {
	size_t size;
	u8 *file = map_file(argv[1], &size);
	u8 *ptr = file;

	u8 field = ptr[10];
	u8 gcte = !!(field & (1 << 7));
	u8 *end = ptr + 13;
	if (gcte) {
		int gcts = 1 << ((field & 7) + 1);
		end += 3 * gcts;
	}
	// skip 
	if (memcmp(end, "!\xFF\x0BNETSCAPE2.0\x03\x01\x00\x00\x00", 19) == 0)
		end += 19;
	write(1, file, end - file);

	size_t size2;
	u8 *file2 = map_file(argv[2], &size2);

	write_gif_embedding(file2, size2);
	write(1, end, size - (end - file));
    return 0;
}

#else

int main(int argc, char *argv[argc]) {
	printf("%zu\n", sizeof(sign));
	size_t size, sz;
	u8 *file = map_file(argv[1], &size);
	u8 *ptr = file;
	void *ext;
	extract_from_gif(file, size, &ext, &sz);
	printf("extracted (%zu bytes) %s\n", sz, ext);
    return 0;
}

#endif