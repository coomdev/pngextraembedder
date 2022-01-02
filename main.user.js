// ==UserScript==
// @name         PNGExtraEmbed
// @namespace    https://coom.tech/
// @version      0.39
// @description  uhh
// @author       You
// @match        https://boards.4channel.org/*/thread/*
// @match        https://boards.4chan.org/*/thread/*
// @icon         https://www.google.com/s2/favicons?domain=4channel.org
// @require      https://unpkg.com/web-streams-polyfill/dist/polyfill.min.js
// @updateURL    https://git.coom.tech/coomdev/PEE/raw/branch/%e4%b8%ad%e5%87%ba%e3%81%97/main.user.js
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @run-at       document-start
// @connect      4chan.org
// @connect      4channel.org
// @connect      i.4cdn.org
// ==/UserScript==
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toESM = (module, isNodeMode) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports) {
      "use strict";
      init_esbuild_inject();
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1)
          validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
        }
        return parts.join("");
      }
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      init_esbuild_inject();
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "node_modules/buffer/index.js"(exports) {
      "use strict";
      init_esbuild_inject();
      var base64 = require_base64_js();
      var ieee7542 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer9;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer9.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer9.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer9.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer9.isBuffer(this))
            return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer9.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer9.isBuffer(this))
            return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf2 = new Uint8Array(length);
        Object.setPrototypeOf(buf2, Buffer9.prototype);
        return buf2;
      }
      function Buffer9(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError('The "string" argument must be of type string. Received type number');
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer9.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError('The "value" argument must not be of type number. Received type number');
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer9.from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b)
          return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer9.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
      }
      Buffer9.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer9.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer9, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer9.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer9.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer9.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer9.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf2 = createBuffer(length);
        const actual = buf2.write(string, encoding);
        if (actual !== length) {
          buf2 = buf2.slice(0, actual);
        }
        return buf2;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf2 = createBuffer(length);
        for (let i = 0; i < length; i += 1) {
          buf2[i] = array[i] & 255;
        }
        return buf2;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf2;
        if (byteOffset === void 0 && length === void 0) {
          buf2 = new Uint8Array(array);
        } else if (length === void 0) {
          buf2 = new Uint8Array(array, byteOffset);
        } else {
          buf2 = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf2, Buffer9.prototype);
        return buf2;
      }
      function fromObject(obj) {
        if (Buffer9.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf2 = createBuffer(len);
          if (buf2.length === 0) {
            return buf2;
          }
          obj.copy(buf2, 0, 0, len);
          return buf2;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer9.alloc(+length);
      }
      Buffer9.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer9.prototype;
      };
      Buffer9.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array))
          a = Buffer9.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array))
          b = Buffer9.from(b, b.offset, b.byteLength);
        if (!Buffer9.isBuffer(a) || !Buffer9.isBuffer(b)) {
          throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
        }
        if (a === b)
          return 0;
        let x = a.length;
        let y = b.length;
        for (let i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      Buffer9.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer9.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer9.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer = Buffer9.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf2 = list[i];
          if (isInstance(buf2, Uint8Array)) {
            if (pos + buf2.length > buffer.length) {
              if (!Buffer9.isBuffer(buf2))
                buf2 = Buffer9.from(buf2);
              buf2.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(buffer, buf2, pos);
            }
          } else if (!Buffer9.isBuffer(buf2)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf2.copy(buffer, pos);
          }
          pos += buf2.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer9.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0)
          return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer9.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding)
          encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer9.prototype._isBuffer = true;
      function swap(b, n, m) {
        const i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer9.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer9.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer9.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer9.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0)
          return "";
        if (arguments.length === 0)
          return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer9.prototype.toLocaleString = Buffer9.prototype.toString;
      Buffer9.prototype.equals = function equals(b) {
        if (!Buffer9.isBuffer(b))
          throw new TypeError("Argument must be a Buffer");
        if (this === b)
          return true;
        return Buffer9.compare(this, b) === 0;
      };
      Buffer9.prototype.inspect = function inspect() {
        let str = "";
        const max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max)
          str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer9.prototype[customInspectSymbol] = Buffer9.prototype.inspect;
      }
      Buffer9.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer9.from(target, target.offset, target.byteLength);
        }
        if (!Buffer9.isBuffer(target)) {
          throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target)
          return 0;
        let x = thisEnd - thisStart;
        let y = end - start;
        const len = Math.min(x, y);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0)
          return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0)
          byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir)
            return -1;
          else
            byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir)
            byteOffset = 0;
          else
            return -1;
        }
        if (typeof val === "string") {
          val = Buffer9.from(val, encoding);
        }
        if (Buffer9.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read2(buf2, i2) {
          if (indexSize === 1) {
            return buf2[i2];
          } else {
            return buf2.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1)
                foundIndex = i;
              if (i - foundIndex + 1 === valLength)
                return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1)
                i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength)
            byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read2(arr, i + j) !== read2(val, j)) {
                found = false;
                break;
              }
            }
            if (found)
              return i;
          }
        }
        return -1;
      }
      Buffer9.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer9.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer9.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf2, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf2.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i;
        for (i = 0; i < length; ++i) {
          const parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed))
            return i;
          buf2[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf2, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf2.length - offset), buf2, offset, length);
      }
      function asciiWrite(buf2, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf2, offset, length);
      }
      function base64Write(buf2, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf2, offset, length);
      }
      function ucs2Write(buf2, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf2.length - offset), buf2, offset, length);
      }
      Buffer9.prototype.write = function write2(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0)
              encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining)
          length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding)
          encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer9.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf2, start, end) {
        if (start === 0 && end === buf2.length) {
          return base64.fromByteArray(buf2);
        } else {
          return base64.fromByteArray(buf2.slice(start, end));
        }
      }
      function utf8Slice(buf2, start, end) {
        end = Math.min(buf2.length, end);
        const res = [];
        let i = start;
        while (i < end) {
          const firstByte = buf2[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf2[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf2[i + 1];
                thirdByte = buf2[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf2[i + 1];
                thirdByte = buf2[i + 2];
                fourthByte = buf2[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
        }
        return res;
      }
      function asciiSlice(buf2, start, end) {
        let ret = "";
        end = Math.min(buf2.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf2[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf2, start, end) {
        let ret = "";
        end = Math.min(buf2.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf2[i]);
        }
        return ret;
      }
      function hexSlice(buf2, start, end) {
        const len = buf2.length;
        if (!start || start < 0)
          start = 0;
        if (!end || end < 0 || end > len)
          end = len;
        let out = "";
        for (let i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf2[i]];
        }
        return out;
      }
      function utf16leSlice(buf2, start, end) {
        const bytes = buf2.slice(start, end);
        let res = "";
        for (let i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer9.prototype.slice = function slice(start, end) {
        const len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0)
            start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0)
            end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start)
          end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer9.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0)
          throw new RangeError("offset is not uint");
        if (offset + ext > length)
          throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer9.prototype.readUintLE = Buffer9.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer9.prototype.readUintBE = Buffer9.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer9.prototype.readUint8 = Buffer9.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer9.prototype.readUint16LE = Buffer9.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer9.prototype.readUint16BE = Buffer9.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer9.prototype.readUint32LE = Buffer9.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer9.prototype.readUint32BE = Buffer9.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer9.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer9.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer9.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer9.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul = 1;
        let val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer9.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128))
          return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer9.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer9.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer9.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer9.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer9.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer9.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer9.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee7542.read(this, offset, true, 23, 4);
      };
      Buffer9.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee7542.read(this, offset, false, 23, 4);
      };
      Buffer9.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee7542.read(this, offset, true, 52, 8);
      };
      Buffer9.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee7542.read(this, offset, false, 52, 8);
      };
      function checkInt(buf2, value, offset, ext, max, min) {
        if (!Buffer9.isBuffer(buf2))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min)
          throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf2.length)
          throw new RangeError("Index out of range");
      }
      Buffer9.prototype.writeUintLE = Buffer9.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer9.prototype.writeUintBE = Buffer9.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer9.prototype.writeUint8 = Buffer9.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer9.prototype.writeUint16LE = Buffer9.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer9.prototype.writeUint16BE = Buffer9.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer9.prototype.writeUint32LE = Buffer9.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer9.prototype.writeUint32BE = Buffer9.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf2, value, offset, min, max) {
        checkIntBI(value, min, max, buf2, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf2[offset++] = lo;
        lo = lo >> 8;
        buf2[offset++] = lo;
        lo = lo >> 8;
        buf2[offset++] = lo;
        lo = lo >> 8;
        buf2[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf2[offset++] = hi;
        hi = hi >> 8;
        buf2[offset++] = hi;
        hi = hi >> 8;
        buf2[offset++] = hi;
        hi = hi >> 8;
        buf2[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf2, value, offset, min, max) {
        checkIntBI(value, min, max, buf2, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf2[offset + 7] = lo;
        lo = lo >> 8;
        buf2[offset + 6] = lo;
        lo = lo >> 8;
        buf2[offset + 5] = lo;
        lo = lo >> 8;
        buf2[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf2[offset + 3] = hi;
        hi = hi >> 8;
        buf2[offset + 2] = hi;
        hi = hi >> 8;
        buf2[offset + 1] = hi;
        hi = hi >> 8;
        buf2[offset] = hi;
        return offset + 8;
      }
      Buffer9.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer9.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer9.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer9.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer9.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 127, -128);
        if (value < 0)
          value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer9.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer9.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer9.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer9.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0)
          value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer9.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer9.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf2, value, offset, ext, max, min) {
        if (offset + ext > buf2.length)
          throw new RangeError("Index out of range");
        if (offset < 0)
          throw new RangeError("Index out of range");
      }
      function writeFloat(buf2, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf2, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee7542.write(buf2, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer9.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer9.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf2, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf2, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee7542.write(buf2, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer9.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer9.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer9.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer9.isBuffer(target))
          throw new TypeError("argument should be a Buffer");
        if (!start)
          start = 0;
        if (!end && end !== 0)
          end = this.length;
        if (targetStart >= target.length)
          targetStart = target.length;
        if (!targetStart)
          targetStart = 0;
        if (end > 0 && end < start)
          end = start;
        if (end === start)
          return 0;
        if (target.length === 0 || this.length === 0)
          return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length)
          throw new RangeError("Index out of range");
        if (end < 0)
          throw new RangeError("sourceEnd out of bounds");
        if (end > this.length)
          end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
        }
        return len;
      };
      Buffer9.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer9.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val)
          val = 0;
        let i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          const bytes = Buffer9.isBuffer(val) ? val : Buffer9.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var errors = {};
      function E(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E("ERR_BUFFER_OUT_OF_BOUNDS", function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      }, RangeError);
      E("ERR_INVALID_ARG_TYPE", function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      }, TypeError);
      E("ERR_OUT_OF_RANGE", function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      }, RangeError);
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function checkBounds(buf2, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf2[offset] === void 0 || buf2[offset + byteLength2] === void 0) {
          boundsError(offset, buf2.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf2, offset, byteLength2) {
        if (value > max || value < min) {
          const n = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
              range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
          } else {
            range = `>= ${min}${n} and <= ${max}${n}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf2, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2)
          return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0)
              break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0)
              break;
            bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0)
              break;
            bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0)
              break;
            bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0)
            break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i;
        for (i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length)
            break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      }();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // esbuild.inject.js
  var Buffer2;
  var init_esbuild_inject = __esm({
    "esbuild.inject.js"() {
      Buffer2 = require_buffer().Buffer;
    }
  });

  // node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/events/events.js"(exports, module) {
      "use strict";
      init_esbuild_inject();
      var R = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R && typeof R.ownKeys === "function") {
        ReflectOwnKeys = R.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn)
          console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter() {
        EventEmitter.init.call(this);
      }
      module.exports = EventEmitter;
      module.exports.once = once;
      EventEmitter.EventEmitter = EventEmitter;
      EventEmitter.prototype._events = void 0;
      EventEmitter.prototype._eventsCount = 0;
      EventEmitter.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
        }
        this._maxListeners = n;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++)
          args.push(arguments[i]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit("newListener", type, listener.listener ? listener.listener : listener);
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }
        return target;
      }
      EventEmitter.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter.prototype.on = EventEmitter.prototype.addListener;
      EventEmitter.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
      EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === "removeListener")
              continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // node_modules/readable-stream/lib/internal/streams/stream-browser.js
  var require_stream_browser = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/stream-browser.js"(exports, module) {
      init_esbuild_inject();
      module.exports = require_events().EventEmitter;
    }
  });

  // (disabled):util
  var require_util = __commonJS({
    "(disabled):util"() {
      init_esbuild_inject();
    }
  });

  // node_modules/readable-stream/lib/internal/streams/buffer_list.js
  var require_buffer_list = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports, module) {
      "use strict";
      init_esbuild_inject();
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          if (enumerableOnly)
            symbols = symbols.filter(function(sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
          keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};
          if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
              _defineProperty(target, key, source[key]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
          } else {
            ownKeys(Object(source)).forEach(function(key) {
              Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
          }
        }
        return target;
      }
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var _require = require_buffer();
      var Buffer9 = _require.Buffer;
      var _require2 = require_util();
      var inspect = _require2.inspect;
      var custom = inspect && inspect.custom || "inspect";
      function copyBuffer(src, target, offset) {
        Buffer9.prototype.copy.call(src, target, offset);
      }
      module.exports = /* @__PURE__ */ function() {
        function BufferList() {
          _classCallCheck(this, BufferList);
          this.head = null;
          this.tail = null;
          this.length = 0;
        }
        _createClass(BufferList, [{
          key: "push",
          value: function push(v) {
            var entry = {
              data: v,
              next: null
            };
            if (this.length > 0)
              this.tail.next = entry;
            else
              this.head = entry;
            this.tail = entry;
            ++this.length;
          }
        }, {
          key: "unshift",
          value: function unshift(v) {
            var entry = {
              data: v,
              next: this.head
            };
            if (this.length === 0)
              this.tail = entry;
            this.head = entry;
            ++this.length;
          }
        }, {
          key: "shift",
          value: function shift() {
            if (this.length === 0)
              return;
            var ret = this.head.data;
            if (this.length === 1)
              this.head = this.tail = null;
            else
              this.head = this.head.next;
            --this.length;
            return ret;
          }
        }, {
          key: "clear",
          value: function clear() {
            this.head = this.tail = null;
            this.length = 0;
          }
        }, {
          key: "join",
          value: function join(s) {
            if (this.length === 0)
              return "";
            var p = this.head;
            var ret = "" + p.data;
            while (p = p.next) {
              ret += s + p.data;
            }
            return ret;
          }
        }, {
          key: "concat",
          value: function concat(n) {
            if (this.length === 0)
              return Buffer9.alloc(0);
            var ret = Buffer9.allocUnsafe(n >>> 0);
            var p = this.head;
            var i = 0;
            while (p) {
              copyBuffer(p.data, ret, i);
              i += p.data.length;
              p = p.next;
            }
            return ret;
          }
        }, {
          key: "consume",
          value: function consume(n, hasStrings) {
            var ret;
            if (n < this.head.data.length) {
              ret = this.head.data.slice(0, n);
              this.head.data = this.head.data.slice(n);
            } else if (n === this.head.data.length) {
              ret = this.shift();
            } else {
              ret = hasStrings ? this._getString(n) : this._getBuffer(n);
            }
            return ret;
          }
        }, {
          key: "first",
          value: function first() {
            return this.head.data;
          }
        }, {
          key: "_getString",
          value: function _getString(n) {
            var p = this.head;
            var c = 1;
            var ret = p.data;
            n -= ret.length;
            while (p = p.next) {
              var str = p.data;
              var nb = n > str.length ? str.length : n;
              if (nb === str.length)
                ret += str;
              else
                ret += str.slice(0, n);
              n -= nb;
              if (n === 0) {
                if (nb === str.length) {
                  ++c;
                  if (p.next)
                    this.head = p.next;
                  else
                    this.head = this.tail = null;
                } else {
                  this.head = p;
                  p.data = str.slice(nb);
                }
                break;
              }
              ++c;
            }
            this.length -= c;
            return ret;
          }
        }, {
          key: "_getBuffer",
          value: function _getBuffer(n) {
            var ret = Buffer9.allocUnsafe(n);
            var p = this.head;
            var c = 1;
            p.data.copy(ret);
            n -= p.data.length;
            while (p = p.next) {
              var buf2 = p.data;
              var nb = n > buf2.length ? buf2.length : n;
              buf2.copy(ret, ret.length - n, 0, nb);
              n -= nb;
              if (n === 0) {
                if (nb === buf2.length) {
                  ++c;
                  if (p.next)
                    this.head = p.next;
                  else
                    this.head = this.tail = null;
                } else {
                  this.head = p;
                  p.data = buf2.slice(nb);
                }
                break;
              }
              ++c;
            }
            this.length -= c;
            return ret;
          }
        }, {
          key: custom,
          value: function value(_, options) {
            return inspect(this, _objectSpread({}, options, {
              depth: 0,
              customInspect: false
            }));
          }
        }]);
        return BufferList;
      }();
    }
  });

  // node_modules/readable-stream/lib/internal/streams/destroy.js
  var require_destroy = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/destroy.js"(exports, module) {
      "use strict";
      init_esbuild_inject();
      function destroy(err, cb) {
        var _this = this;
        var readableDestroyed = this._readableState && this._readableState.destroyed;
        var writableDestroyed = this._writableState && this._writableState.destroyed;
        if (readableDestroyed || writableDestroyed) {
          if (cb) {
            cb(err);
          } else if (err) {
            if (!this._writableState) {
              process.nextTick(emitErrorNT, this, err);
            } else if (!this._writableState.errorEmitted) {
              this._writableState.errorEmitted = true;
              process.nextTick(emitErrorNT, this, err);
            }
          }
          return this;
        }
        if (this._readableState) {
          this._readableState.destroyed = true;
        }
        if (this._writableState) {
          this._writableState.destroyed = true;
        }
        this._destroy(err || null, function(err2) {
          if (!cb && err2) {
            if (!_this._writableState) {
              process.nextTick(emitErrorAndCloseNT, _this, err2);
            } else if (!_this._writableState.errorEmitted) {
              _this._writableState.errorEmitted = true;
              process.nextTick(emitErrorAndCloseNT, _this, err2);
            } else {
              process.nextTick(emitCloseNT, _this);
            }
          } else if (cb) {
            process.nextTick(emitCloseNT, _this);
            cb(err2);
          } else {
            process.nextTick(emitCloseNT, _this);
          }
        });
        return this;
      }
      function emitErrorAndCloseNT(self, err) {
        emitErrorNT(self, err);
        emitCloseNT(self);
      }
      function emitCloseNT(self) {
        if (self._writableState && !self._writableState.emitClose)
          return;
        if (self._readableState && !self._readableState.emitClose)
          return;
        self.emit("close");
      }
      function undestroy() {
        if (this._readableState) {
          this._readableState.destroyed = false;
          this._readableState.reading = false;
          this._readableState.ended = false;
          this._readableState.endEmitted = false;
        }
        if (this._writableState) {
          this._writableState.destroyed = false;
          this._writableState.ended = false;
          this._writableState.ending = false;
          this._writableState.finalCalled = false;
          this._writableState.prefinished = false;
          this._writableState.finished = false;
          this._writableState.errorEmitted = false;
        }
      }
      function emitErrorNT(self, err) {
        self.emit("error", err);
      }
      function errorOrDestroy(stream, err) {
        var rState = stream._readableState;
        var wState = stream._writableState;
        if (rState && rState.autoDestroy || wState && wState.autoDestroy)
          stream.destroy(err);
        else
          stream.emit("error", err);
      }
      module.exports = {
        destroy,
        undestroy,
        errorOrDestroy
      };
    }
  });

  // node_modules/readable-stream/errors-browser.js
  var require_errors_browser = __commonJS({
    "node_modules/readable-stream/errors-browser.js"(exports, module) {
      "use strict";
      init_esbuild_inject();
      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        subClass.__proto__ = superClass;
      }
      var codes = {};
      function createErrorType(code, message, Base) {
        if (!Base) {
          Base = Error;
        }
        function getMessage(arg1, arg2, arg3) {
          if (typeof message === "string") {
            return message;
          } else {
            return message(arg1, arg2, arg3);
          }
        }
        var NodeError = /* @__PURE__ */ function(_Base) {
          _inheritsLoose(NodeError2, _Base);
          function NodeError2(arg1, arg2, arg3) {
            return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
          }
          return NodeError2;
        }(Base);
        NodeError.prototype.name = Base.name;
        NodeError.prototype.code = code;
        codes[code] = NodeError;
      }
      function oneOf(expected, thing) {
        if (Array.isArray(expected)) {
          var len = expected.length;
          expected = expected.map(function(i) {
            return String(i);
          });
          if (len > 2) {
            return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
          } else if (len === 2) {
            return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
          } else {
            return "of ".concat(thing, " ").concat(expected[0]);
          }
        } else {
          return "of ".concat(thing, " ").concat(String(expected));
        }
      }
      function startsWith(str, search, pos) {
        return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
      }
      function endsWith(str, search, this_len) {
        if (this_len === void 0 || this_len > str.length) {
          this_len = str.length;
        }
        return str.substring(this_len - search.length, this_len) === search;
      }
      function includes(str, search, start) {
        if (typeof start !== "number") {
          start = 0;
        }
        if (start + search.length > str.length) {
          return false;
        } else {
          return str.indexOf(search, start) !== -1;
        }
      }
      createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
        return 'The value "' + value + '" is invalid for option "' + name + '"';
      }, TypeError);
      createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
        var determiner;
        if (typeof expected === "string" && startsWith(expected, "not ")) {
          determiner = "must not be";
          expected = expected.replace(/^not /, "");
        } else {
          determiner = "must be";
        }
        var msg;
        if (endsWith(name, " argument")) {
          msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
        } else {
          var type = includes(name, ".") ? "property" : "argument";
          msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
        }
        msg += ". Received type ".concat(typeof actual);
        return msg;
      }, TypeError);
      createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
      createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
        return "The " + name + " method is not implemented";
      });
      createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
      createErrorType("ERR_STREAM_DESTROYED", function(name) {
        return "Cannot call " + name + " after a stream was destroyed";
      });
      createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
      createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
      createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
      createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
      createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
        return "Unknown encoding: " + arg;
      }, TypeError);
      createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
      module.exports.codes = codes;
    }
  });

  // node_modules/readable-stream/lib/internal/streams/state.js
  var require_state = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/state.js"(exports, module) {
      "use strict";
      init_esbuild_inject();
      var ERR_INVALID_OPT_VALUE = require_errors_browser().codes.ERR_INVALID_OPT_VALUE;
      function highWaterMarkFrom(options, isDuplex, duplexKey) {
        return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
      }
      function getHighWaterMark(state, options, duplexKey, isDuplex) {
        var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
        if (hwm != null) {
          if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
            var name = isDuplex ? duplexKey : "highWaterMark";
            throw new ERR_INVALID_OPT_VALUE(name, hwm);
          }
          return Math.floor(hwm);
        }
        return state.objectMode ? 16 : 16 * 1024;
      }
      module.exports = {
        getHighWaterMark
      };
    }
  });

  // node_modules/inherits/inherits_browser.js
  var require_inherits_browser = __commonJS({
    "node_modules/inherits/inherits_browser.js"(exports, module) {
      init_esbuild_inject();
      if (typeof Object.create === "function") {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }
  });

  // node_modules/util-deprecate/browser.js
  var require_browser = __commonJS({
    "node_modules/util-deprecate/browser.js"(exports, module) {
      init_esbuild_inject();
      module.exports = deprecate;
      function deprecate(fn, msg) {
        if (config("noDeprecation")) {
          return fn;
        }
        var warned = false;
        function deprecated() {
          if (!warned) {
            if (config("throwDeprecation")) {
              throw new Error(msg);
            } else if (config("traceDeprecation")) {
              console.trace(msg);
            } else {
              console.warn(msg);
            }
            warned = true;
          }
          return fn.apply(this, arguments);
        }
        return deprecated;
      }
      function config(name) {
        try {
          if (!window.localStorage)
            return false;
        } catch (_) {
          return false;
        }
        var val = window.localStorage[name];
        if (val == null)
          return false;
        return String(val).toLowerCase() === "true";
      }
    }
  });

  // node_modules/readable-stream/lib/_stream_writable.js
  var require_stream_writable = __commonJS({
    "node_modules/readable-stream/lib/_stream_writable.js"(exports, module) {
      "use strict";
      init_esbuild_inject();
      module.exports = Writable;
      function CorkedRequest(state) {
        var _this = this;
        this.next = null;
        this.entry = null;
        this.finish = function() {
          onCorkedFinish(_this, state);
        };
      }
      var Duplex;
      Writable.WritableState = WritableState;
      var internalUtil = {
        deprecate: require_browser()
      };
      var Stream = require_stream_browser();
      var Buffer9 = require_buffer().Buffer;
      var OurUint8Array = window.Uint8Array || function() {
      };
      function _uint8ArrayToBuffer(chunk) {
        return Buffer9.from(chunk);
      }
      function _isUint8Array(obj) {
        return Buffer9.isBuffer(obj) || obj instanceof OurUint8Array;
      }
      var destroyImpl = require_destroy();
      var _require = require_state();
      var getHighWaterMark = _require.getHighWaterMark;
      var _require$codes = require_errors_browser().codes;
      var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
      var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
      var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
      var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
      var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
      var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
      var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
      var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
      var errorOrDestroy = destroyImpl.errorOrDestroy;
      require_inherits_browser()(Writable, Stream);
      function nop() {
      }
      function WritableState(options, stream, isDuplex) {
        Duplex = Duplex || require_stream_duplex();
        options = options || {};
        if (typeof isDuplex !== "boolean")
          isDuplex = stream instanceof Duplex;
        this.objectMode = !!options.objectMode;
        if (isDuplex)
          this.objectMode = this.objectMode || !!options.writableObjectMode;
        this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
        this.finalCalled = false;
        this.needDrain = false;
        this.ending = false;
        this.ended = false;
        this.finished = false;
        this.destroyed = false;
        var noDecode = options.decodeStrings === false;
        this.decodeStrings = !noDecode;
        this.defaultEncoding = options.defaultEncoding || "utf8";
        this.length = 0;
        this.writing = false;
        this.corked = 0;
        this.sync = true;
        this.bufferProcessing = false;
        this.onwrite = function(er) {
          onwrite(stream, er);
        };
        this.writecb = null;
        this.writelen = 0;
        this.bufferedRequest = null;
        this.lastBufferedRequest = null;
        this.pendingcb = 0;
        this.prefinished = false;
        this.errorEmitted = false;
        this.emitClose = options.emitClose !== false;
        this.autoDestroy = !!options.autoDestroy;
        this.bufferedRequestCount = 0;
        this.corkedRequestsFree = new CorkedRequest(this);
      }
      WritableState.prototype.getBuffer = function getBuffer() {
        var current = this.bufferedRequest;
        var out = [];
        while (current) {
          out.push(current);
          current = current.next;
        }
        return out;
      };
      (function() {
        try {
          Object.defineProperty(WritableState.prototype, "buffer", {
            get: internalUtil.deprecate(function writableStateBufferGetter() {
              return this.getBuffer();
            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
          });
        } catch (_) {
        }
      })();
      var realHasInstance;
      if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
        realHasInstance = Function.prototype[Symbol.hasInstance];
        Object.defineProperty(Writable, Symbol.hasInstance, {
          value: function value(object) {
            if (realHasInstance.call(this, object))
              return true;
            if (this !== Writable)
              return false;
            return object && object._writableState instanceof WritableState;
          }
        });
      } else {
        realHasInstance = function realHasInstance2(object) {
          return object instanceof this;
        };
      }
      function Writable(options) {
        Duplex = Duplex || require_stream_duplex();
        var isDuplex = this instanceof Duplex;
        if (!isDuplex && !realHasInstance.call(Writable, this))
          return new Writable(options);
        this._writableState = new WritableState(options, this, isDuplex);
        this.writable = true;
        if (options) {
          if (typeof options.write === "function")
            this._write = options.write;
          if (typeof options.writev === "function")
            this._writev = options.writev;
          if (typeof options.destroy === "function")
            this._destroy = options.destroy;
          if (typeof options.final === "function")
            this._final = options.final;
        }
        Stream.call(this);
      }
      Writable.prototype.pipe = function() {
        errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
      };
      function writeAfterEnd(stream, cb) {
        var er = new ERR_STREAM_WRITE_AFTER_END();
        errorOrDestroy(stream, er);
        process.nextTick(cb, er);
      }
      function validChunk(stream, state, chunk, cb) {
        var er;
        if (chunk === null) {
          er = new ERR_STREAM_NULL_VALUES();
        } else if (typeof chunk !== "string" && !state.objectMode) {
          er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
        }
        if (er) {
          errorOrDestroy(stream, er);
          process.nextTick(cb, er);
          return false;
        }
        return true;
      }
      Writable.prototype.write = function(chunk, encoding, cb) {
        var state = this._writableState;
        var ret = false;
        var isBuf = !state.objectMode && _isUint8Array(chunk);
        if (isBuf && !Buffer9.isBuffer(chunk)) {
          chunk = _uint8ArrayToBuffer(chunk);
        }
        if (typeof encoding === "function") {
          cb = encoding;
          encoding = null;
        }
        if (isBuf)
          encoding = "buffer";
        else if (!encoding)
          encoding = state.defaultEncoding;
        if (typeof cb !== "function")
          cb = nop;
        if (state.ending)
          writeAfterEnd(this, cb);
        else if (isBuf || validChunk(this, state, chunk, cb)) {
          state.pendingcb++;
          ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
        }
        return ret;
      };
      Writable.prototype.cork = function() {
        this._writableState.corked++;
      };
      Writable.prototype.uncork = function() {
        var state = this._writableState;
        if (state.corked) {
          state.corked--;
          if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest)
            clearBuffer(this, state);
        }
      };
      Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
        if (typeof encoding === "string")
          encoding = encoding.toLowerCase();
        if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
          throw new ERR_UNKNOWN_ENCODING(encoding);
        this._writableState.defaultEncoding = encoding;
        return this;
      };
      Object.defineProperty(Writable.prototype, "writableBuffer", {
        enumerable: false,
        get: function get() {
          return this._writableState && this._writableState.getBuffer();
        }
      });
      function decodeChunk(state, chunk, encoding) {
        if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
          chunk = Buffer9.from(chunk, encoding);
        }
        return chunk;
      }
      Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
        enumerable: false,
        get: function get() {
          return this._writableState.highWaterMark;
        }
      });
      function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
        if (!isBuf) {
          var newChunk = decodeChunk(state, chunk, encoding);
          if (chunk !== newChunk) {
            isBuf = true;
            encoding = "buffer";
            chunk = newChunk;
          }
        }
        var len = state.objectMode ? 1 : chunk.length;
        state.length += len;
        var ret = state.length < state.highWaterMark;
        if (!ret)
          state.needDrain = true;
        if (state.writing || state.corked) {
          var last = state.lastBufferedRequest;
          state.lastBufferedRequest = {
            chunk,
            encoding,
            isBuf,
            callback: cb,
            next: null
          };
          if (last) {
            last.next = state.lastBufferedRequest;
          } else {
            state.bufferedRequest = state.lastBufferedRequest;
          }
          state.bufferedRequestCount += 1;
        } else {
          doWrite(stream, state, false, len, chunk, encoding, cb);
        }
        return ret;
      }
      function doWrite(stream, state, writev, len, chunk, encoding, cb) {
        state.writelen = len;
        state.writecb = cb;
        state.writing = true;
        state.sync = true;
        if (state.destroyed)
          state.onwrite(new ERR_STREAM_DESTROYED("write"));
        else if (writev)
          stream._writev(chunk, state.onwrite);
        else
          stream._write(chunk, encoding, state.onwrite);
        state.sync = false;
      }
      function onwriteError(stream, state, sync, er, cb) {
        --state.pendingcb;
        if (sync) {
          process.nextTick(cb, er);
          process.nextTick(finishMaybe, stream, state);
          stream._writableState.errorEmitted = true;
          errorOrDestroy(stream, er);
        } else {
          cb(er);
          stream._writableState.errorEmitted = true;
          errorOrDestroy(stream, er);
          finishMaybe(stream, state);
        }
      }
      function onwriteStateUpdate(state) {
        state.writing = false;
        state.writecb = null;
        state.length -= state.writelen;
        state.writelen = 0;
      }
      function onwrite(stream, er) {
        var state = stream._writableState;
        var sync = state.sync;
        var cb = state.writecb;
        if (typeof cb !== "function")
          throw new ERR_MULTIPLE_CALLBACK();
        onwriteStateUpdate(state);
        if (er)
          onwriteError(stream, state, sync, er, cb);
        else {
          var finished = needFinish(state) || stream.destroyed;
          if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
            clearBuffer(stream, state);
          }
          if (sync) {
            process.nextTick(afterWrite, stream, state, finished, cb);
          } else {
            afterWrite(stream, state, finished, cb);
          }
        }
      }
      function afterWrite(stream, state, finished, cb) {
        if (!finished)
          onwriteDrain(stream, state);
        state.pendingcb--;
        cb();
        finishMaybe(stream, state);
      }
      function onwriteDrain(stream, state) {
        if (state.length === 0 && state.needDrain) {
          state.needDrain = false;
          stream.emit("drain");
        }
      }
      function clearBuffer(stream, state) {
        state.bufferProcessing = true;
        var entry = state.bufferedRequest;
        if (stream._writev && entry && entry.next) {
          var l = state.bufferedRequestCount;
          var buffer = new Array(l);
          var holder = state.corkedRequestsFree;
          holder.entry = entry;
          var count = 0;
          var allBuffers = true;
          while (entry) {
            buffer[count] = entry;
            if (!entry.isBuf)
              allBuffers = false;
            entry = entry.next;
            count += 1;
          }
          buffer.allBuffers = allBuffers;
          doWrite(stream, state, true, state.length, buffer, "", holder.finish);
          state.pendingcb++;
          state.lastBufferedRequest = null;
          if (holder.next) {
            state.corkedRequestsFree = holder.next;
            holder.next = null;
          } else {
            state.corkedRequestsFree = new CorkedRequest(state);
          }
          state.bufferedRequestCount = 0;
        } else {
          while (entry) {
            var chunk = entry.chunk;
            var encoding = entry.encoding;
            var cb = entry.callback;
            var len = state.objectMode ? 1 : chunk.length;
            doWrite(stream, state, false, len, chunk, encoding, cb);
            entry = entry.next;
            state.bufferedRequestCount--;
            if (state.writing) {
              break;
            }
          }
          if (entry === null)
            state.lastBufferedRequest = null;
        }
        state.bufferedRequest = entry;
        state.bufferProcessing = false;
      }
      Writable.prototype._write = function(chunk, encoding, cb) {
        cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
      };
      Writable.prototype._writev = null;
      Writable.prototype.end = function(chunk, encoding, cb) {
        var state = this._writableState;
        if (typeof chunk === "function") {
          cb = chunk;
          chunk = null;
          encoding = null;
        } else if (typeof encoding === "function") {
          cb = encoding;
          encoding = null;
        }
        if (chunk !== null && chunk !== void 0)
          this.write(chunk, encoding);
        if (state.corked) {
          state.corked = 1;
          this.uncork();
        }
        if (!state.ending)
          endWritable(this, state, cb);
        return this;
      };
      Object.defineProperty(Writable.prototype, "writableLength", {
        enumerable: false,
        get: function get() {
          return this._writableState.length;
        }
      });
      function needFinish(state) {
        return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
      }
      function callFinal(stream, state) {
        stream._final(function(err) {
          state.pendingcb--;
          if (err) {
            errorOrDestroy(stream, err);
          }
          state.prefinished = true;
          stream.emit("prefinish");
          finishMaybe(stream, state);
        });
      }
      function prefinish(stream, state) {
        if (!state.prefinished && !state.finalCalled) {
          if (typeof stream._final === "function" && !state.destroyed) {
            state.pendingcb++;
            state.finalCalled = true;
            process.nextTick(callFinal, stream, state);
          } else {
            state.prefinished = true;
            stream.emit("prefinish");
          }
        }
      }
      function finishMaybe(stream, state) {
        var need = needFinish(state);
        if (need) {
          prefinish(stream, state);
          if (state.pendingcb === 0) {
            state.finished = true;
            stream.emit("finish");
            if (state.autoDestroy) {
              var rState = stream._readableState;
              if (!rState || rState.autoDestroy && rState.endEmitted) {
                stream.destroy();
              }
            }
          }
        }
        return need;
      }
      function endWritable(stream, state, cb) {
        state.ending = true;
        finishMaybe(stream, state);
        if (cb) {
          if (state.finished)
            process.nextTick(cb);
          else
            stream.once("finish", cb);
        }
        state.ended = true;
        stream.writable = false;
      }
      function onCorkedFinish(corkReq, state, err) {
        var entry = corkReq.entry;
        corkReq.entry = null;
        while (entry) {
          var cb = entry.callback;
          state.pendingcb--;
          cb(err);
          entry = entry.next;
        }
        state.corkedRequestsFree.next = corkReq;
      }
      Object.defineProperty(Writable.prototype, "destroyed", {
        enumerable: false,
        get: function get() {
          if (this._writableState === void 0) {
            return false;
          }
          return this._writableState.destroyed;
        },
        set: function set(value) {
          if (!this._writableState) {
            return;
          }
          this._writableState.destroyed = value;
        }
      });
      Writable.prototype.destroy = destroyImpl.destroy;
      Writable.prototype._undestroy = destroyImpl.undestroy;
      Writable.prototype._destroy = function(err, cb) {
        cb(err);
      };
    }
  });

  // node_modules/readable-stream/lib/_stream_duplex.js
  var require_stream_duplex = __commonJS({
    "node_modules/readable-stream/lib/_stream_duplex.js"(exports, module) {
      "use strict";
      init_esbuild_inject();
      var objectKeys = Object.keys || function(obj) {
        var keys2 = [];
        for (var key in obj) {
          keys2.push(key);
        }
        return keys2;
      };
      module.exports = Duplex;
      var Readable = require_stream_readable();
      var Writable = require_stream_writable();
      require_inherits_browser()(Duplex, Readable);
      {
        keys = objectKeys(Writable.prototype);
        for (v = 0; v < keys.length; v++) {
          method = keys[v];
          if (!Duplex.prototype[method])
            Duplex.prototype[method] = Writable.prototype[method];
        }
      }
      var keys;
      var method;
      var v;
      function Duplex(options) {
        if (!(this instanceof Duplex))
          return new Duplex(options);
        Readable.call(this, options);
        Writable.call(this, options);
        this.allowHalfOpen = true;
        if (options) {
          if (options.readable === false)
            this.readable = false;
          if (options.writable === false)
            this.writable = false;
          if (options.allowHalfOpen === false) {
            this.allowHalfOpen = false;
            this.once("end", onend);
          }
        }
      }
      Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
        enumerable: false,
        get: function get() {
          return this._writableState.highWaterMark;
        }
      });
      Object.defineProperty(Duplex.prototype, "writableBuffer", {
        enumerable: false,
        get: function get() {
          return this._writableState && this._writableState.getBuffer();
        }
      });
      Object.defineProperty(Duplex.prototype, "writableLength", {
        enumerable: false,
        get: function get() {
          return this._writableState.length;
        }
      });
      function onend() {
        if (this._writableState.ended)
          return;
        process.nextTick(onEndNT, this);
      }
      function onEndNT(self) {
        self.end();
      }
      Object.defineProperty(Duplex.prototype, "destroyed", {
        enumerable: false,
        get: function get() {
          if (this._readableState === void 0 || this._writableState === void 0) {
            return false;
          }
          return this._readableState.destroyed && this._writableState.destroyed;
        },
        set: function set(value) {
          if (this._readableState === void 0 || this._writableState === void 0) {
            return;
          }
          this._readableState.destroyed = value;
          this._writableState.destroyed = value;
        }
      });
    }
  });

  // node_modules/safe-buffer/index.js
  var require_safe_buffer = __commonJS({
    "node_modules/safe-buffer/index.js"(exports, module) {
      init_esbuild_inject();
      var buffer = require_buffer();
      var Buffer9 = buffer.Buffer;
      function copyProps(src, dst) {
        for (var key in src) {
          dst[key] = src[key];
        }
      }
      if (Buffer9.from && Buffer9.alloc && Buffer9.allocUnsafe && Buffer9.allocUnsafeSlow) {
        module.exports = buffer;
      } else {
        copyProps(buffer, exports);
        exports.Buffer = SafeBuffer;
      }
      function SafeBuffer(arg, encodingOrOffset, length) {
        return Buffer9(arg, encodingOrOffset, length);
      }
      SafeBuffer.prototype = Object.create(Buffer9.prototype);
      copyProps(Buffer9, SafeBuffer);
      SafeBuffer.from = function(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          throw new TypeError("Argument must not be a number");
        }
        return Buffer9(arg, encodingOrOffset, length);
      };
      SafeBuffer.alloc = function(size, fill, encoding) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        var buf2 = Buffer9(size);
        if (fill !== void 0) {
          if (typeof encoding === "string") {
            buf2.fill(fill, encoding);
          } else {
            buf2.fill(fill);
          }
        } else {
          buf2.fill(0);
        }
        return buf2;
      };
      SafeBuffer.allocUnsafe = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return Buffer9(size);
      };
      SafeBuffer.allocUnsafeSlow = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return buffer.SlowBuffer(size);
      };
    }
  });

  // node_modules/string_decoder/lib/string_decoder.js
  var require_string_decoder = __commonJS({
    "node_modules/string_decoder/lib/string_decoder.js"(exports) {
      "use strict";
      init_esbuild_inject();
      var Buffer9 = require_safe_buffer().Buffer;
      var isEncoding = Buffer9.isEncoding || function(encoding) {
        encoding = "" + encoding;
        switch (encoding && encoding.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return true;
          default:
            return false;
        }
      };
      function _normalizeEncoding(enc) {
        if (!enc)
          return "utf8";
        var retried;
        while (true) {
          switch (enc) {
            case "utf8":
            case "utf-8":
              return "utf8";
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return "utf16le";
            case "latin1":
            case "binary":
              return "latin1";
            case "base64":
            case "ascii":
            case "hex":
              return enc;
            default:
              if (retried)
                return;
              enc = ("" + enc).toLowerCase();
              retried = true;
          }
        }
      }
      function normalizeEncoding(enc) {
        var nenc = _normalizeEncoding(enc);
        if (typeof nenc !== "string" && (Buffer9.isEncoding === isEncoding || !isEncoding(enc)))
          throw new Error("Unknown encoding: " + enc);
        return nenc || enc;
      }
      exports.StringDecoder = StringDecoder;
      function StringDecoder(encoding) {
        this.encoding = normalizeEncoding(encoding);
        var nb;
        switch (this.encoding) {
          case "utf16le":
            this.text = utf16Text;
            this.end = utf16End;
            nb = 4;
            break;
          case "utf8":
            this.fillLast = utf8FillLast;
            nb = 4;
            break;
          case "base64":
            this.text = base64Text;
            this.end = base64End;
            nb = 3;
            break;
          default:
            this.write = simpleWrite;
            this.end = simpleEnd;
            return;
        }
        this.lastNeed = 0;
        this.lastTotal = 0;
        this.lastChar = Buffer9.allocUnsafe(nb);
      }
      StringDecoder.prototype.write = function(buf2) {
        if (buf2.length === 0)
          return "";
        var r;
        var i;
        if (this.lastNeed) {
          r = this.fillLast(buf2);
          if (r === void 0)
            return "";
          i = this.lastNeed;
          this.lastNeed = 0;
        } else {
          i = 0;
        }
        if (i < buf2.length)
          return r ? r + this.text(buf2, i) : this.text(buf2, i);
        return r || "";
      };
      StringDecoder.prototype.end = utf8End;
      StringDecoder.prototype.text = utf8Text;
      StringDecoder.prototype.fillLast = function(buf2) {
        if (this.lastNeed <= buf2.length) {
          buf2.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
        }
        buf2.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf2.length);
        this.lastNeed -= buf2.length;
      };
      function utf8CheckByte(byte) {
        if (byte <= 127)
          return 0;
        else if (byte >> 5 === 6)
          return 2;
        else if (byte >> 4 === 14)
          return 3;
        else if (byte >> 3 === 30)
          return 4;
        return byte >> 6 === 2 ? -1 : -2;
      }
      function utf8CheckIncomplete(self, buf2, i) {
        var j = buf2.length - 1;
        if (j < i)
          return 0;
        var nb = utf8CheckByte(buf2[j]);
        if (nb >= 0) {
          if (nb > 0)
            self.lastNeed = nb - 1;
          return nb;
        }
        if (--j < i || nb === -2)
          return 0;
        nb = utf8CheckByte(buf2[j]);
        if (nb >= 0) {
          if (nb > 0)
            self.lastNeed = nb - 2;
          return nb;
        }
        if (--j < i || nb === -2)
          return 0;
        nb = utf8CheckByte(buf2[j]);
        if (nb >= 0) {
          if (nb > 0) {
            if (nb === 2)
              nb = 0;
            else
              self.lastNeed = nb - 3;
          }
          return nb;
        }
        return 0;
      }
      function utf8CheckExtraBytes(self, buf2, p) {
        if ((buf2[0] & 192) !== 128) {
          self.lastNeed = 0;
          return "\uFFFD";
        }
        if (self.lastNeed > 1 && buf2.length > 1) {
          if ((buf2[1] & 192) !== 128) {
            self.lastNeed = 1;
            return "\uFFFD";
          }
          if (self.lastNeed > 2 && buf2.length > 2) {
            if ((buf2[2] & 192) !== 128) {
              self.lastNeed = 2;
              return "\uFFFD";
            }
          }
        }
      }
      function utf8FillLast(buf2) {
        var p = this.lastTotal - this.lastNeed;
        var r = utf8CheckExtraBytes(this, buf2, p);
        if (r !== void 0)
          return r;
        if (this.lastNeed <= buf2.length) {
          buf2.copy(this.lastChar, p, 0, this.lastNeed);
          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
        }
        buf2.copy(this.lastChar, p, 0, buf2.length);
        this.lastNeed -= buf2.length;
      }
      function utf8Text(buf2, i) {
        var total = utf8CheckIncomplete(this, buf2, i);
        if (!this.lastNeed)
          return buf2.toString("utf8", i);
        this.lastTotal = total;
        var end = buf2.length - (total - this.lastNeed);
        buf2.copy(this.lastChar, 0, end);
        return buf2.toString("utf8", i, end);
      }
      function utf8End(buf2) {
        var r = buf2 && buf2.length ? this.write(buf2) : "";
        if (this.lastNeed)
          return r + "\uFFFD";
        return r;
      }
      function utf16Text(buf2, i) {
        if ((buf2.length - i) % 2 === 0) {
          var r = buf2.toString("utf16le", i);
          if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 55296 && c <= 56319) {
              this.lastNeed = 2;
              this.lastTotal = 4;
              this.lastChar[0] = buf2[buf2.length - 2];
              this.lastChar[1] = buf2[buf2.length - 1];
              return r.slice(0, -1);
            }
          }
          return r;
        }
        this.lastNeed = 1;
        this.lastTotal = 2;
        this.lastChar[0] = buf2[buf2.length - 1];
        return buf2.toString("utf16le", i, buf2.length - 1);
      }
      function utf16End(buf2) {
        var r = buf2 && buf2.length ? this.write(buf2) : "";
        if (this.lastNeed) {
          var end = this.lastTotal - this.lastNeed;
          return r + this.lastChar.toString("utf16le", 0, end);
        }
        return r;
      }
      function base64Text(buf2, i) {
        var n = (buf2.length - i) % 3;
        if (n === 0)
          return buf2.toString("base64", i);
        this.lastNeed = 3 - n;
        this.lastTotal = 3;
        if (n === 1) {
          this.lastChar[0] = buf2[buf2.length - 1];
        } else {
          this.lastChar[0] = buf2[buf2.length - 2];
          this.lastChar[1] = buf2[buf2.length - 1];
        }
        return buf2.toString("base64", i, buf2.length - n);
      }
      function base64End(buf2) {
        var r = buf2 && buf2.length ? this.write(buf2) : "";
        if (this.lastNeed)
          return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
        return r;
      }
      function simpleWrite(buf2) {
        return buf2.toString(this.encoding);
      }
      function simpleEnd(buf2) {
        return buf2 && buf2.length ? this.write(buf2) : "";
      }
    }
  });

  // node_modules/readable-stream/lib/internal/streams/end-of-stream.js
  var require_end_of_stream = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports, module) {
      "use strict";
      init_esbuild_inject();
      var ERR_STREAM_PREMATURE_CLOSE = require_errors_browser().codes.ERR_STREAM_PREMATURE_CLOSE;
      function once(callback) {
        var called = false;
        return function() {
          if (called)
            return;
          called = true;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          callback.apply(this, args);
        };
      }
      function noop() {
      }
      function isRequest(stream) {
        return stream.setHeader && typeof stream.abort === "function";
      }
      function eos(stream, opts, callback) {
        if (typeof opts === "function")
          return eos(stream, null, opts);
        if (!opts)
          opts = {};
        callback = once(callback || noop);
        var readable = opts.readable || opts.readable !== false && stream.readable;
        var writable = opts.writable || opts.writable !== false && stream.writable;
        var onlegacyfinish = function onlegacyfinish2() {
          if (!stream.writable)
            onfinish();
        };
        var writableEnded = stream._writableState && stream._writableState.finished;
        var onfinish = function onfinish2() {
          writable = false;
          writableEnded = true;
          if (!readable)
            callback.call(stream);
        };
        var readableEnded = stream._readableState && stream._readableState.endEmitted;
        var onend = function onend2() {
          readable = false;
          readableEnded = true;
          if (!writable)
            callback.call(stream);
        };
        var onerror = function onerror2(err) {
          callback.call(stream, err);
        };
        var onclose = function onclose2() {
          var err;
          if (readable && !readableEnded) {
            if (!stream._readableState || !stream._readableState.ended)
              err = new ERR_STREAM_PREMATURE_CLOSE();
            return callback.call(stream, err);
          }
          if (writable && !writableEnded) {
            if (!stream._writableState || !stream._writableState.ended)
              err = new ERR_STREAM_PREMATURE_CLOSE();
            return callback.call(stream, err);
          }
        };
        var onrequest = function onrequest2() {
          stream.req.on("finish", onfinish);
        };
        if (isRequest(stream)) {
          stream.on("complete", onfinish);
          stream.on("abort", onclose);
          if (stream.req)
            onrequest();
          else
            stream.on("request", onrequest);
        } else if (writable && !stream._writableState) {
          stream.on("end", onlegacyfinish);
          stream.on("close", onlegacyfinish);
        }
        stream.on("end", onend);
        stream.on("finish", onfinish);
        if (opts.error !== false)
          stream.on("error", onerror);
        stream.on("close", onclose);
        return function() {
          stream.removeListener("complete", onfinish);
          stream.removeListener("abort", onclose);
          stream.removeListener("request", onrequest);
          if (stream.req)
            stream.req.removeListener("finish", onfinish);
          stream.removeListener("end", onlegacyfinish);
          stream.removeListener("close", onlegacyfinish);
          stream.removeListener("finish", onfinish);
          stream.removeListener("end", onend);
          stream.removeListener("error", onerror);
          stream.removeListener("close", onclose);
        };
      }
      module.exports = eos;
    }
  });

  // node_modules/readable-stream/lib/internal/streams/async_iterator.js
  var require_async_iterator = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/async_iterator.js"(exports, module) {
      "use strict";
      init_esbuild_inject();
      var _Object$setPrototypeO;
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      var finished = require_end_of_stream();
      var kLastResolve = Symbol("lastResolve");
      var kLastReject = Symbol("lastReject");
      var kError = Symbol("error");
      var kEnded = Symbol("ended");
      var kLastPromise = Symbol("lastPromise");
      var kHandlePromise = Symbol("handlePromise");
      var kStream = Symbol("stream");
      function createIterResult(value, done) {
        return {
          value,
          done
        };
      }
      function readAndResolve(iter) {
        var resolve = iter[kLastResolve];
        if (resolve !== null) {
          var data = iter[kStream].read();
          if (data !== null) {
            iter[kLastPromise] = null;
            iter[kLastResolve] = null;
            iter[kLastReject] = null;
            resolve(createIterResult(data, false));
          }
        }
      }
      function onReadable(iter) {
        process.nextTick(readAndResolve, iter);
      }
      function wrapForNext(lastPromise, iter) {
        return function(resolve, reject) {
          lastPromise.then(function() {
            if (iter[kEnded]) {
              resolve(createIterResult(void 0, true));
              return;
            }
            iter[kHandlePromise](resolve, reject);
          }, reject);
        };
      }
      var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
      });
      var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
        get stream() {
          return this[kStream];
        },
        next: function next() {
          var _this = this;
          var error = this[kError];
          if (error !== null) {
            return Promise.reject(error);
          }
          if (this[kEnded]) {
            return Promise.resolve(createIterResult(void 0, true));
          }
          if (this[kStream].destroyed) {
            return new Promise(function(resolve, reject) {
              process.nextTick(function() {
                if (_this[kError]) {
                  reject(_this[kError]);
                } else {
                  resolve(createIterResult(void 0, true));
                }
              });
            });
          }
          var lastPromise = this[kLastPromise];
          var promise;
          if (lastPromise) {
            promise = new Promise(wrapForNext(lastPromise, this));
          } else {
            var data = this[kStream].read();
            if (data !== null) {
              return Promise.resolve(createIterResult(data, false));
            }
            promise = new Promise(this[kHandlePromise]);
          }
          this[kLastPromise] = promise;
          return promise;
        }
      }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
        return this;
      }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
        var _this2 = this;
        return new Promise(function(resolve, reject) {
          _this2[kStream].destroy(null, function(err) {
            if (err) {
              reject(err);
              return;
            }
            resolve(createIterResult(void 0, true));
          });
        });
      }), _Object$setPrototypeO), AsyncIteratorPrototype);
      var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
        var _Object$create;
        var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
          value: stream,
          writable: true
        }), _defineProperty(_Object$create, kLastResolve, {
          value: null,
          writable: true
        }), _defineProperty(_Object$create, kLastReject, {
          value: null,
          writable: true
        }), _defineProperty(_Object$create, kError, {
          value: null,
          writable: true
        }), _defineProperty(_Object$create, kEnded, {
          value: stream._readableState.endEmitted,
          writable: true
        }), _defineProperty(_Object$create, kHandlePromise, {
          value: function value(resolve, reject) {
            var data = iterator[kStream].read();
            if (data) {
              iterator[kLastPromise] = null;
              iterator[kLastResolve] = null;
              iterator[kLastReject] = null;
              resolve(createIterResult(data, false));
            } else {
              iterator[kLastResolve] = resolve;
              iterator[kLastReject] = reject;
            }
          },
          writable: true
        }), _Object$create));
        iterator[kLastPromise] = null;
        finished(stream, function(err) {
          if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
            var reject = iterator[kLastReject];
            if (reject !== null) {
              iterator[kLastPromise] = null;
              iterator[kLastResolve] = null;
              iterator[kLastReject] = null;
              reject(err);
            }
            iterator[kError] = err;
            return;
          }
          var resolve = iterator[kLastResolve];
          if (resolve !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve(createIterResult(void 0, true));
          }
          iterator[kEnded] = true;
        });
        stream.on("readable", onReadable.bind(null, iterator));
        return iterator;
      };
      module.exports = createReadableStreamAsyncIterator;
    }
  });

  // node_modules/readable-stream/lib/internal/streams/from-browser.js
  var require_from_browser = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/from-browser.js"(exports, module) {
      init_esbuild_inject();
      module.exports = function() {
        throw new Error("Readable.from is not available in the browser");
      };
    }
  });

  // node_modules/readable-stream/lib/_stream_readable.js
  var require_stream_readable = __commonJS({
    "node_modules/readable-stream/lib/_stream_readable.js"(exports, module) {
      "use strict";
      init_esbuild_inject();
      module.exports = Readable;
      var Duplex;
      Readable.ReadableState = ReadableState;
      var EE = require_events().EventEmitter;
      var EElistenerCount = function EElistenerCount2(emitter, type) {
        return emitter.listeners(type).length;
      };
      var Stream = require_stream_browser();
      var Buffer9 = require_buffer().Buffer;
      var OurUint8Array = window.Uint8Array || function() {
      };
      function _uint8ArrayToBuffer(chunk) {
        return Buffer9.from(chunk);
      }
      function _isUint8Array(obj) {
        return Buffer9.isBuffer(obj) || obj instanceof OurUint8Array;
      }
      var debugUtil = require_util();
      var debug;
      if (debugUtil && debugUtil.debuglog) {
        debug = debugUtil.debuglog("stream");
      } else {
        debug = function debug2() {
        };
      }
      var BufferList = require_buffer_list();
      var destroyImpl = require_destroy();
      var _require = require_state();
      var getHighWaterMark = _require.getHighWaterMark;
      var _require$codes = require_errors_browser().codes;
      var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
      var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
      var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
      var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
      var StringDecoder;
      var createReadableStreamAsyncIterator;
      var from;
      require_inherits_browser()(Readable, Stream);
      var errorOrDestroy = destroyImpl.errorOrDestroy;
      var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
      function prependListener(emitter, event, fn) {
        if (typeof emitter.prependListener === "function")
          return emitter.prependListener(event, fn);
        if (!emitter._events || !emitter._events[event])
          emitter.on(event, fn);
        else if (Array.isArray(emitter._events[event]))
          emitter._events[event].unshift(fn);
        else
          emitter._events[event] = [fn, emitter._events[event]];
      }
      function ReadableState(options, stream, isDuplex) {
        Duplex = Duplex || require_stream_duplex();
        options = options || {};
        if (typeof isDuplex !== "boolean")
          isDuplex = stream instanceof Duplex;
        this.objectMode = !!options.objectMode;
        if (isDuplex)
          this.objectMode = this.objectMode || !!options.readableObjectMode;
        this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
        this.buffer = new BufferList();
        this.length = 0;
        this.pipes = null;
        this.pipesCount = 0;
        this.flowing = null;
        this.ended = false;
        this.endEmitted = false;
        this.reading = false;
        this.sync = true;
        this.needReadable = false;
        this.emittedReadable = false;
        this.readableListening = false;
        this.resumeScheduled = false;
        this.paused = true;
        this.emitClose = options.emitClose !== false;
        this.autoDestroy = !!options.autoDestroy;
        this.destroyed = false;
        this.defaultEncoding = options.defaultEncoding || "utf8";
        this.awaitDrain = 0;
        this.readingMore = false;
        this.decoder = null;
        this.encoding = null;
        if (options.encoding) {
          if (!StringDecoder)
            StringDecoder = require_string_decoder().StringDecoder;
          this.decoder = new StringDecoder(options.encoding);
          this.encoding = options.encoding;
        }
      }
      function Readable(options) {
        Duplex = Duplex || require_stream_duplex();
        if (!(this instanceof Readable))
          return new Readable(options);
        var isDuplex = this instanceof Duplex;
        this._readableState = new ReadableState(options, this, isDuplex);
        this.readable = true;
        if (options) {
          if (typeof options.read === "function")
            this._read = options.read;
          if (typeof options.destroy === "function")
            this._destroy = options.destroy;
        }
        Stream.call(this);
      }
      Object.defineProperty(Readable.prototype, "destroyed", {
        enumerable: false,
        get: function get() {
          if (this._readableState === void 0) {
            return false;
          }
          return this._readableState.destroyed;
        },
        set: function set(value) {
          if (!this._readableState) {
            return;
          }
          this._readableState.destroyed = value;
        }
      });
      Readable.prototype.destroy = destroyImpl.destroy;
      Readable.prototype._undestroy = destroyImpl.undestroy;
      Readable.prototype._destroy = function(err, cb) {
        cb(err);
      };
      Readable.prototype.push = function(chunk, encoding) {
        var state = this._readableState;
        var skipChunkCheck;
        if (!state.objectMode) {
          if (typeof chunk === "string") {
            encoding = encoding || state.defaultEncoding;
            if (encoding !== state.encoding) {
              chunk = Buffer9.from(chunk, encoding);
              encoding = "";
            }
            skipChunkCheck = true;
          }
        } else {
          skipChunkCheck = true;
        }
        return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
      };
      Readable.prototype.unshift = function(chunk) {
        return readableAddChunk(this, chunk, null, true, false);
      };
      function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
        debug("readableAddChunk", chunk);
        var state = stream._readableState;
        if (chunk === null) {
          state.reading = false;
          onEofChunk(stream, state);
        } else {
          var er;
          if (!skipChunkCheck)
            er = chunkInvalid(state, chunk);
          if (er) {
            errorOrDestroy(stream, er);
          } else if (state.objectMode || chunk && chunk.length > 0) {
            if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer9.prototype) {
              chunk = _uint8ArrayToBuffer(chunk);
            }
            if (addToFront) {
              if (state.endEmitted)
                errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
              else
                addChunk(stream, state, chunk, true);
            } else if (state.ended) {
              errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
            } else if (state.destroyed) {
              return false;
            } else {
              state.reading = false;
              if (state.decoder && !encoding) {
                chunk = state.decoder.write(chunk);
                if (state.objectMode || chunk.length !== 0)
                  addChunk(stream, state, chunk, false);
                else
                  maybeReadMore(stream, state);
              } else {
                addChunk(stream, state, chunk, false);
              }
            }
          } else if (!addToFront) {
            state.reading = false;
            maybeReadMore(stream, state);
          }
        }
        return !state.ended && (state.length < state.highWaterMark || state.length === 0);
      }
      function addChunk(stream, state, chunk, addToFront) {
        if (state.flowing && state.length === 0 && !state.sync) {
          state.awaitDrain = 0;
          stream.emit("data", chunk);
        } else {
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront)
            state.buffer.unshift(chunk);
          else
            state.buffer.push(chunk);
          if (state.needReadable)
            emitReadable(stream);
        }
        maybeReadMore(stream, state);
      }
      function chunkInvalid(state, chunk) {
        var er;
        if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
          er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
        }
        return er;
      }
      Readable.prototype.isPaused = function() {
        return this._readableState.flowing === false;
      };
      Readable.prototype.setEncoding = function(enc) {
        if (!StringDecoder)
          StringDecoder = require_string_decoder().StringDecoder;
        var decoder = new StringDecoder(enc);
        this._readableState.decoder = decoder;
        this._readableState.encoding = this._readableState.decoder.encoding;
        var p = this._readableState.buffer.head;
        var content = "";
        while (p !== null) {
          content += decoder.write(p.data);
          p = p.next;
        }
        this._readableState.buffer.clear();
        if (content !== "")
          this._readableState.buffer.push(content);
        this._readableState.length = content.length;
        return this;
      };
      var MAX_HWM = 1073741824;
      function computeNewHighWaterMark(n) {
        if (n >= MAX_HWM) {
          n = MAX_HWM;
        } else {
          n--;
          n |= n >>> 1;
          n |= n >>> 2;
          n |= n >>> 4;
          n |= n >>> 8;
          n |= n >>> 16;
          n++;
        }
        return n;
      }
      function howMuchToRead(n, state) {
        if (n <= 0 || state.length === 0 && state.ended)
          return 0;
        if (state.objectMode)
          return 1;
        if (n !== n) {
          if (state.flowing && state.length)
            return state.buffer.head.data.length;
          else
            return state.length;
        }
        if (n > state.highWaterMark)
          state.highWaterMark = computeNewHighWaterMark(n);
        if (n <= state.length)
          return n;
        if (!state.ended) {
          state.needReadable = true;
          return 0;
        }
        return state.length;
      }
      Readable.prototype.read = function(n) {
        debug("read", n);
        n = parseInt(n, 10);
        var state = this._readableState;
        var nOrig = n;
        if (n !== 0)
          state.emittedReadable = false;
        if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
          debug("read: emitReadable", state.length, state.ended);
          if (state.length === 0 && state.ended)
            endReadable(this);
          else
            emitReadable(this);
          return null;
        }
        n = howMuchToRead(n, state);
        if (n === 0 && state.ended) {
          if (state.length === 0)
            endReadable(this);
          return null;
        }
        var doRead = state.needReadable;
        debug("need readable", doRead);
        if (state.length === 0 || state.length - n < state.highWaterMark) {
          doRead = true;
          debug("length less than watermark", doRead);
        }
        if (state.ended || state.reading) {
          doRead = false;
          debug("reading or ended", doRead);
        } else if (doRead) {
          debug("do read");
          state.reading = true;
          state.sync = true;
          if (state.length === 0)
            state.needReadable = true;
          this._read(state.highWaterMark);
          state.sync = false;
          if (!state.reading)
            n = howMuchToRead(nOrig, state);
        }
        var ret;
        if (n > 0)
          ret = fromList(n, state);
        else
          ret = null;
        if (ret === null) {
          state.needReadable = state.length <= state.highWaterMark;
          n = 0;
        } else {
          state.length -= n;
          state.awaitDrain = 0;
        }
        if (state.length === 0) {
          if (!state.ended)
            state.needReadable = true;
          if (nOrig !== n && state.ended)
            endReadable(this);
        }
        if (ret !== null)
          this.emit("data", ret);
        return ret;
      };
      function onEofChunk(stream, state) {
        debug("onEofChunk");
        if (state.ended)
          return;
        if (state.decoder) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length) {
            state.buffer.push(chunk);
            state.length += state.objectMode ? 1 : chunk.length;
          }
        }
        state.ended = true;
        if (state.sync) {
          emitReadable(stream);
        } else {
          state.needReadable = false;
          if (!state.emittedReadable) {
            state.emittedReadable = true;
            emitReadable_(stream);
          }
        }
      }
      function emitReadable(stream) {
        var state = stream._readableState;
        debug("emitReadable", state.needReadable, state.emittedReadable);
        state.needReadable = false;
        if (!state.emittedReadable) {
          debug("emitReadable", state.flowing);
          state.emittedReadable = true;
          process.nextTick(emitReadable_, stream);
        }
      }
      function emitReadable_(stream) {
        var state = stream._readableState;
        debug("emitReadable_", state.destroyed, state.length, state.ended);
        if (!state.destroyed && (state.length || state.ended)) {
          stream.emit("readable");
          state.emittedReadable = false;
        }
        state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
        flow(stream);
      }
      function maybeReadMore(stream, state) {
        if (!state.readingMore) {
          state.readingMore = true;
          process.nextTick(maybeReadMore_, stream, state);
        }
      }
      function maybeReadMore_(stream, state) {
        while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
          var len = state.length;
          debug("maybeReadMore read 0");
          stream.read(0);
          if (len === state.length)
            break;
        }
        state.readingMore = false;
      }
      Readable.prototype._read = function(n) {
        errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
      };
      Readable.prototype.pipe = function(dest, pipeOpts) {
        var src = this;
        var state = this._readableState;
        switch (state.pipesCount) {
          case 0:
            state.pipes = dest;
            break;
          case 1:
            state.pipes = [state.pipes, dest];
            break;
          default:
            state.pipes.push(dest);
            break;
        }
        state.pipesCount += 1;
        debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
        var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
        var endFn = doEnd ? onend : unpipe;
        if (state.endEmitted)
          process.nextTick(endFn);
        else
          src.once("end", endFn);
        dest.on("unpipe", onunpipe);
        function onunpipe(readable, unpipeInfo) {
          debug("onunpipe");
          if (readable === src) {
            if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
              unpipeInfo.hasUnpiped = true;
              cleanup();
            }
          }
        }
        function onend() {
          debug("onend");
          dest.end();
        }
        var ondrain = pipeOnDrain(src);
        dest.on("drain", ondrain);
        var cleanedUp = false;
        function cleanup() {
          debug("cleanup");
          dest.removeListener("close", onclose);
          dest.removeListener("finish", onfinish);
          dest.removeListener("drain", ondrain);
          dest.removeListener("error", onerror);
          dest.removeListener("unpipe", onunpipe);
          src.removeListener("end", onend);
          src.removeListener("end", unpipe);
          src.removeListener("data", ondata);
          cleanedUp = true;
          if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
            ondrain();
        }
        src.on("data", ondata);
        function ondata(chunk) {
          debug("ondata");
          var ret = dest.write(chunk);
          debug("dest.write", ret);
          if (ret === false) {
            if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
              debug("false write response, pause", state.awaitDrain);
              state.awaitDrain++;
            }
            src.pause();
          }
        }
        function onerror(er) {
          debug("onerror", er);
          unpipe();
          dest.removeListener("error", onerror);
          if (EElistenerCount(dest, "error") === 0)
            errorOrDestroy(dest, er);
        }
        prependListener(dest, "error", onerror);
        function onclose() {
          dest.removeListener("finish", onfinish);
          unpipe();
        }
        dest.once("close", onclose);
        function onfinish() {
          debug("onfinish");
          dest.removeListener("close", onclose);
          unpipe();
        }
        dest.once("finish", onfinish);
        function unpipe() {
          debug("unpipe");
          src.unpipe(dest);
        }
        dest.emit("pipe", src);
        if (!state.flowing) {
          debug("pipe resume");
          src.resume();
        }
        return dest;
      };
      function pipeOnDrain(src) {
        return function pipeOnDrainFunctionResult() {
          var state = src._readableState;
          debug("pipeOnDrain", state.awaitDrain);
          if (state.awaitDrain)
            state.awaitDrain--;
          if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
            state.flowing = true;
            flow(src);
          }
        };
      }
      Readable.prototype.unpipe = function(dest) {
        var state = this._readableState;
        var unpipeInfo = {
          hasUnpiped: false
        };
        if (state.pipesCount === 0)
          return this;
        if (state.pipesCount === 1) {
          if (dest && dest !== state.pipes)
            return this;
          if (!dest)
            dest = state.pipes;
          state.pipes = null;
          state.pipesCount = 0;
          state.flowing = false;
          if (dest)
            dest.emit("unpipe", this, unpipeInfo);
          return this;
        }
        if (!dest) {
          var dests = state.pipes;
          var len = state.pipesCount;
          state.pipes = null;
          state.pipesCount = 0;
          state.flowing = false;
          for (var i = 0; i < len; i++) {
            dests[i].emit("unpipe", this, {
              hasUnpiped: false
            });
          }
          return this;
        }
        var index = indexOf(state.pipes, dest);
        if (index === -1)
          return this;
        state.pipes.splice(index, 1);
        state.pipesCount -= 1;
        if (state.pipesCount === 1)
          state.pipes = state.pipes[0];
        dest.emit("unpipe", this, unpipeInfo);
        return this;
      };
      Readable.prototype.on = function(ev, fn) {
        var res = Stream.prototype.on.call(this, ev, fn);
        var state = this._readableState;
        if (ev === "data") {
          state.readableListening = this.listenerCount("readable") > 0;
          if (state.flowing !== false)
            this.resume();
        } else if (ev === "readable") {
          if (!state.endEmitted && !state.readableListening) {
            state.readableListening = state.needReadable = true;
            state.flowing = false;
            state.emittedReadable = false;
            debug("on readable", state.length, state.reading);
            if (state.length) {
              emitReadable(this);
            } else if (!state.reading) {
              process.nextTick(nReadingNextTick, this);
            }
          }
        }
        return res;
      };
      Readable.prototype.addListener = Readable.prototype.on;
      Readable.prototype.removeListener = function(ev, fn) {
        var res = Stream.prototype.removeListener.call(this, ev, fn);
        if (ev === "readable") {
          process.nextTick(updateReadableListening, this);
        }
        return res;
      };
      Readable.prototype.removeAllListeners = function(ev) {
        var res = Stream.prototype.removeAllListeners.apply(this, arguments);
        if (ev === "readable" || ev === void 0) {
          process.nextTick(updateReadableListening, this);
        }
        return res;
      };
      function updateReadableListening(self) {
        var state = self._readableState;
        state.readableListening = self.listenerCount("readable") > 0;
        if (state.resumeScheduled && !state.paused) {
          state.flowing = true;
        } else if (self.listenerCount("data") > 0) {
          self.resume();
        }
      }
      function nReadingNextTick(self) {
        debug("readable nexttick read 0");
        self.read(0);
      }
      Readable.prototype.resume = function() {
        var state = this._readableState;
        if (!state.flowing) {
          debug("resume");
          state.flowing = !state.readableListening;
          resume(this, state);
        }
        state.paused = false;
        return this;
      };
      function resume(stream, state) {
        if (!state.resumeScheduled) {
          state.resumeScheduled = true;
          process.nextTick(resume_, stream, state);
        }
      }
      function resume_(stream, state) {
        debug("resume", state.reading);
        if (!state.reading) {
          stream.read(0);
        }
        state.resumeScheduled = false;
        stream.emit("resume");
        flow(stream);
        if (state.flowing && !state.reading)
          stream.read(0);
      }
      Readable.prototype.pause = function() {
        debug("call pause flowing=%j", this._readableState.flowing);
        if (this._readableState.flowing !== false) {
          debug("pause");
          this._readableState.flowing = false;
          this.emit("pause");
        }
        this._readableState.paused = true;
        return this;
      };
      function flow(stream) {
        var state = stream._readableState;
        debug("flow", state.flowing);
        while (state.flowing && stream.read() !== null) {
          ;
        }
      }
      Readable.prototype.wrap = function(stream) {
        var _this = this;
        var state = this._readableState;
        var paused = false;
        stream.on("end", function() {
          debug("wrapped end");
          if (state.decoder && !state.ended) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length)
              _this.push(chunk);
          }
          _this.push(null);
        });
        stream.on("data", function(chunk) {
          debug("wrapped data");
          if (state.decoder)
            chunk = state.decoder.write(chunk);
          if (state.objectMode && (chunk === null || chunk === void 0))
            return;
          else if (!state.objectMode && (!chunk || !chunk.length))
            return;
          var ret = _this.push(chunk);
          if (!ret) {
            paused = true;
            stream.pause();
          }
        });
        for (var i in stream) {
          if (this[i] === void 0 && typeof stream[i] === "function") {
            this[i] = function methodWrap(method) {
              return function methodWrapReturnFunction() {
                return stream[method].apply(stream, arguments);
              };
            }(i);
          }
        }
        for (var n = 0; n < kProxyEvents.length; n++) {
          stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
        }
        this._read = function(n2) {
          debug("wrapped _read", n2);
          if (paused) {
            paused = false;
            stream.resume();
          }
        };
        return this;
      };
      if (typeof Symbol === "function") {
        Readable.prototype[Symbol.asyncIterator] = function() {
          if (createReadableStreamAsyncIterator === void 0) {
            createReadableStreamAsyncIterator = require_async_iterator();
          }
          return createReadableStreamAsyncIterator(this);
        };
      }
      Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
        enumerable: false,
        get: function get() {
          return this._readableState.highWaterMark;
        }
      });
      Object.defineProperty(Readable.prototype, "readableBuffer", {
        enumerable: false,
        get: function get() {
          return this._readableState && this._readableState.buffer;
        }
      });
      Object.defineProperty(Readable.prototype, "readableFlowing", {
        enumerable: false,
        get: function get() {
          return this._readableState.flowing;
        },
        set: function set(state) {
          if (this._readableState) {
            this._readableState.flowing = state;
          }
        }
      });
      Readable._fromList = fromList;
      Object.defineProperty(Readable.prototype, "readableLength", {
        enumerable: false,
        get: function get() {
          return this._readableState.length;
        }
      });
      function fromList(n, state) {
        if (state.length === 0)
          return null;
        var ret;
        if (state.objectMode)
          ret = state.buffer.shift();
        else if (!n || n >= state.length) {
          if (state.decoder)
            ret = state.buffer.join("");
          else if (state.buffer.length === 1)
            ret = state.buffer.first();
          else
            ret = state.buffer.concat(state.length);
          state.buffer.clear();
        } else {
          ret = state.buffer.consume(n, state.decoder);
        }
        return ret;
      }
      function endReadable(stream) {
        var state = stream._readableState;
        debug("endReadable", state.endEmitted);
        if (!state.endEmitted) {
          state.ended = true;
          process.nextTick(endReadableNT, state, stream);
        }
      }
      function endReadableNT(state, stream) {
        debug("endReadableNT", state.endEmitted, state.length);
        if (!state.endEmitted && state.length === 0) {
          state.endEmitted = true;
          stream.readable = false;
          stream.emit("end");
          if (state.autoDestroy) {
            var wState = stream._writableState;
            if (!wState || wState.autoDestroy && wState.finished) {
              stream.destroy();
            }
          }
        }
      }
      if (typeof Symbol === "function") {
        Readable.from = function(iterable, opts) {
          if (from === void 0) {
            from = require_from_browser();
          }
          return from(Readable, iterable, opts);
        };
      }
      function indexOf(xs, x) {
        for (var i = 0, l = xs.length; i < l; i++) {
          if (xs[i] === x)
            return i;
        }
        return -1;
      }
    }
  });

  // node_modules/readable-stream/lib/_stream_transform.js
  var require_stream_transform = __commonJS({
    "node_modules/readable-stream/lib/_stream_transform.js"(exports, module) {
      "use strict";
      init_esbuild_inject();
      module.exports = Transform;
      var _require$codes = require_errors_browser().codes;
      var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
      var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
      var ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING;
      var ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
      var Duplex = require_stream_duplex();
      require_inherits_browser()(Transform, Duplex);
      function afterTransform(er, data) {
        var ts = this._transformState;
        ts.transforming = false;
        var cb = ts.writecb;
        if (cb === null) {
          return this.emit("error", new ERR_MULTIPLE_CALLBACK());
        }
        ts.writechunk = null;
        ts.writecb = null;
        if (data != null)
          this.push(data);
        cb(er);
        var rs = this._readableState;
        rs.reading = false;
        if (rs.needReadable || rs.length < rs.highWaterMark) {
          this._read(rs.highWaterMark);
        }
      }
      function Transform(options) {
        if (!(this instanceof Transform))
          return new Transform(options);
        Duplex.call(this, options);
        this._transformState = {
          afterTransform: afterTransform.bind(this),
          needTransform: false,
          transforming: false,
          writecb: null,
          writechunk: null,
          writeencoding: null
        };
        this._readableState.needReadable = true;
        this._readableState.sync = false;
        if (options) {
          if (typeof options.transform === "function")
            this._transform = options.transform;
          if (typeof options.flush === "function")
            this._flush = options.flush;
        }
        this.on("prefinish", prefinish);
      }
      function prefinish() {
        var _this = this;
        if (typeof this._flush === "function" && !this._readableState.destroyed) {
          this._flush(function(er, data) {
            done(_this, er, data);
          });
        } else {
          done(this, null, null);
        }
      }
      Transform.prototype.push = function(chunk, encoding) {
        this._transformState.needTransform = false;
        return Duplex.prototype.push.call(this, chunk, encoding);
      };
      Transform.prototype._transform = function(chunk, encoding, cb) {
        cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
      };
      Transform.prototype._write = function(chunk, encoding, cb) {
        var ts = this._transformState;
        ts.writecb = cb;
        ts.writechunk = chunk;
        ts.writeencoding = encoding;
        if (!ts.transforming) {
          var rs = this._readableState;
          if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
            this._read(rs.highWaterMark);
        }
      };
      Transform.prototype._read = function(n) {
        var ts = this._transformState;
        if (ts.writechunk !== null && !ts.transforming) {
          ts.transforming = true;
          this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
        } else {
          ts.needTransform = true;
        }
      };
      Transform.prototype._destroy = function(err, cb) {
        Duplex.prototype._destroy.call(this, err, function(err2) {
          cb(err2);
        });
      };
      function done(stream, er, data) {
        if (er)
          return stream.emit("error", er);
        if (data != null)
          stream.push(data);
        if (stream._writableState.length)
          throw new ERR_TRANSFORM_WITH_LENGTH_0();
        if (stream._transformState.transforming)
          throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
        return stream.push(null);
      }
    }
  });

  // node_modules/readable-stream/lib/_stream_passthrough.js
  var require_stream_passthrough = __commonJS({
    "node_modules/readable-stream/lib/_stream_passthrough.js"(exports, module) {
      "use strict";
      init_esbuild_inject();
      module.exports = PassThrough;
      var Transform = require_stream_transform();
      require_inherits_browser()(PassThrough, Transform);
      function PassThrough(options) {
        if (!(this instanceof PassThrough))
          return new PassThrough(options);
        Transform.call(this, options);
      }
      PassThrough.prototype._transform = function(chunk, encoding, cb) {
        cb(null, chunk);
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/pipeline.js
  var require_pipeline = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/pipeline.js"(exports, module) {
      "use strict";
      init_esbuild_inject();
      var eos;
      function once(callback) {
        var called = false;
        return function() {
          if (called)
            return;
          called = true;
          callback.apply(void 0, arguments);
        };
      }
      var _require$codes = require_errors_browser().codes;
      var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
      var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
      function noop(err) {
        if (err)
          throw err;
      }
      function isRequest(stream) {
        return stream.setHeader && typeof stream.abort === "function";
      }
      function destroyer(stream, reading, writing, callback) {
        callback = once(callback);
        var closed = false;
        stream.on("close", function() {
          closed = true;
        });
        if (eos === void 0)
          eos = require_end_of_stream();
        eos(stream, {
          readable: reading,
          writable: writing
        }, function(err) {
          if (err)
            return callback(err);
          closed = true;
          callback();
        });
        var destroyed = false;
        return function(err) {
          if (closed)
            return;
          if (destroyed)
            return;
          destroyed = true;
          if (isRequest(stream))
            return stream.abort();
          if (typeof stream.destroy === "function")
            return stream.destroy();
          callback(err || new ERR_STREAM_DESTROYED("pipe"));
        };
      }
      function call(fn) {
        fn();
      }
      function pipe(from, to) {
        return from.pipe(to);
      }
      function popCallback(streams) {
        if (!streams.length)
          return noop;
        if (typeof streams[streams.length - 1] !== "function")
          return noop;
        return streams.pop();
      }
      function pipeline() {
        for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
          streams[_key] = arguments[_key];
        }
        var callback = popCallback(streams);
        if (Array.isArray(streams[0]))
          streams = streams[0];
        if (streams.length < 2) {
          throw new ERR_MISSING_ARGS("streams");
        }
        var error;
        var destroys = streams.map(function(stream, i) {
          var reading = i < streams.length - 1;
          var writing = i > 0;
          return destroyer(stream, reading, writing, function(err) {
            if (!error)
              error = err;
            if (err)
              destroys.forEach(call);
            if (reading)
              return;
            destroys.forEach(call);
            callback(error);
          });
        });
        return streams.reduce(pipe);
      }
      module.exports = pipeline;
    }
  });

  // node_modules/readable-stream/readable-browser.js
  var require_readable_browser = __commonJS({
    "node_modules/readable-stream/readable-browser.js"(exports, module) {
      init_esbuild_inject();
      exports = module.exports = require_stream_readable();
      exports.Stream = exports;
      exports.Readable = exports;
      exports.Writable = require_stream_writable();
      exports.Duplex = require_stream_duplex();
      exports.Transform = require_stream_transform();
      exports.PassThrough = require_stream_passthrough();
      exports.finished = require_end_of_stream();
      exports.pipeline = require_pipeline();
    }
  });

  // node_modules/readable-web-to-node-stream/lib/index.js
  var require_lib = __commonJS({
    "node_modules/readable-web-to-node-stream/lib/index.js"(exports) {
      "use strict";
      init_esbuild_inject();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ReadableWebToNodeStream = void 0;
      var readable_stream_1 = require_readable_browser();
      var ReadableWebToNodeStream2 = class extends readable_stream_1.Readable {
        constructor(stream) {
          super();
          this.bytesRead = 0;
          this.released = false;
          this.reader = stream.getReader();
        }
        async _read() {
          if (this.released) {
            this.push(null);
            return;
          }
          this.pendingRead = this.reader.read();
          const data = await this.pendingRead;
          delete this.pendingRead;
          if (data.done || this.released) {
            this.push(null);
          } else {
            this.bytesRead += data.value.length;
            this.push(data.value);
          }
        }
        async waitForReadToComplete() {
          if (this.pendingRead) {
            await this.pendingRead;
          }
        }
        async close() {
          await this.syncAndRelease();
        }
        async syncAndRelease() {
          this.released = true;
          await this.waitForReadToComplete();
          await this.reader.releaseLock();
        }
      };
      exports.ReadableWebToNodeStream = ReadableWebToNodeStream2;
    }
  });

  // node_modules/crc-32/crc32.js
  var require_crc32 = __commonJS({
    "node_modules/crc-32/crc32.js"(exports) {
      init_esbuild_inject();
      var CRC32;
      (function(factory) {
        if (typeof DO_NOT_EXPORT_CRC === "undefined") {
          if (typeof exports === "object") {
            factory(exports);
          } else if (typeof define === "function" && define.amd) {
            define(function() {
              var module2 = {};
              factory(module2);
              return module2;
            });
          } else {
            factory(CRC32 = {});
          }
        } else {
          factory(CRC32 = {});
        }
      })(function(CRC322) {
        CRC322.version = "1.2.0";
        function signed_crc_table() {
          var c = 0, table = new Array(256);
          for (var n = 0; n != 256; ++n) {
            c = n;
            c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
            c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
            c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
            c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
            c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
            c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
            c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
            c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
            table[n] = c;
          }
          return typeof Int32Array !== "undefined" ? new Int32Array(table) : table;
        }
        var T = signed_crc_table();
        function crc32_bstr(bstr, seed) {
          var C = seed ^ -1, L = bstr.length - 1;
          for (var i = 0; i < L; ) {
            C = C >>> 8 ^ T[(C ^ bstr.charCodeAt(i++)) & 255];
            C = C >>> 8 ^ T[(C ^ bstr.charCodeAt(i++)) & 255];
          }
          if (i === L)
            C = C >>> 8 ^ T[(C ^ bstr.charCodeAt(i)) & 255];
          return C ^ -1;
        }
        function crc32_buf(buf2, seed) {
          if (buf2.length > 1e4)
            return crc32_buf_8(buf2, seed);
          var C = seed ^ -1, L = buf2.length - 3;
          for (var i = 0; i < L; ) {
            C = C >>> 8 ^ T[(C ^ buf2[i++]) & 255];
            C = C >>> 8 ^ T[(C ^ buf2[i++]) & 255];
            C = C >>> 8 ^ T[(C ^ buf2[i++]) & 255];
            C = C >>> 8 ^ T[(C ^ buf2[i++]) & 255];
          }
          while (i < L + 3)
            C = C >>> 8 ^ T[(C ^ buf2[i++]) & 255];
          return C ^ -1;
        }
        function crc32_buf_8(buf2, seed) {
          var C = seed ^ -1, L = buf2.length - 7;
          for (var i = 0; i < L; ) {
            C = C >>> 8 ^ T[(C ^ buf2[i++]) & 255];
            C = C >>> 8 ^ T[(C ^ buf2[i++]) & 255];
            C = C >>> 8 ^ T[(C ^ buf2[i++]) & 255];
            C = C >>> 8 ^ T[(C ^ buf2[i++]) & 255];
            C = C >>> 8 ^ T[(C ^ buf2[i++]) & 255];
            C = C >>> 8 ^ T[(C ^ buf2[i++]) & 255];
            C = C >>> 8 ^ T[(C ^ buf2[i++]) & 255];
            C = C >>> 8 ^ T[(C ^ buf2[i++]) & 255];
          }
          while (i < L + 7)
            C = C >>> 8 ^ T[(C ^ buf2[i++]) & 255];
          return C ^ -1;
        }
        function crc32_str(str, seed) {
          var C = seed ^ -1;
          for (var i = 0, L = str.length, c, d; i < L; ) {
            c = str.charCodeAt(i++);
            if (c < 128) {
              C = C >>> 8 ^ T[(C ^ c) & 255];
            } else if (c < 2048) {
              C = C >>> 8 ^ T[(C ^ (192 | c >> 6 & 31)) & 255];
              C = C >>> 8 ^ T[(C ^ (128 | c & 63)) & 255];
            } else if (c >= 55296 && c < 57344) {
              c = (c & 1023) + 64;
              d = str.charCodeAt(i++) & 1023;
              C = C >>> 8 ^ T[(C ^ (240 | c >> 8 & 7)) & 255];
              C = C >>> 8 ^ T[(C ^ (128 | c >> 2 & 63)) & 255];
              C = C >>> 8 ^ T[(C ^ (128 | d >> 6 & 15 | (c & 3) << 4)) & 255];
              C = C >>> 8 ^ T[(C ^ (128 | d & 63)) & 255];
            } else {
              C = C >>> 8 ^ T[(C ^ (224 | c >> 12 & 15)) & 255];
              C = C >>> 8 ^ T[(C ^ (128 | c >> 6 & 63)) & 255];
              C = C >>> 8 ^ T[(C ^ (128 | c & 63)) & 255];
            }
          }
          return C ^ -1;
        }
        CRC322.table = T;
        CRC322.bstr = crc32_bstr;
        CRC322.buf = crc32_buf;
        CRC322.str = crc32_str;
      });
    }
  });

  // node_modules/int64-buffer/int64-buffer.js
  var require_int64_buffer = __commonJS({
    "node_modules/int64-buffer/int64-buffer.js"(exports) {
      init_esbuild_inject();
      var Uint64BE;
      var Int64BE;
      var Uint64LE;
      var Int64LE;
      !function(exports2) {
        var UNDEFINED = "undefined";
        var BUFFER = UNDEFINED !== typeof Buffer2 && Buffer2;
        var UINT8ARRAY = UNDEFINED !== typeof Uint8Array && Uint8Array;
        var ARRAYBUFFER = UNDEFINED !== typeof ArrayBuffer && ArrayBuffer;
        var ZERO = [0, 0, 0, 0, 0, 0, 0, 0];
        var isArray = Array.isArray || _isArray;
        var BIT32 = 4294967296;
        var BIT24 = 16777216;
        var storage;
        Uint64BE = factory("Uint64BE", true, true);
        Int64BE = factory("Int64BE", true, false);
        Uint64LE = factory("Uint64LE", false, true);
        Int64LE = factory("Int64LE", false, false);
        function factory(name, bigendian, unsigned) {
          var posH = bigendian ? 0 : 4;
          var posL = bigendian ? 4 : 0;
          var pos0 = bigendian ? 0 : 3;
          var pos1 = bigendian ? 1 : 2;
          var pos2 = bigendian ? 2 : 1;
          var pos3 = bigendian ? 3 : 0;
          var fromPositive = bigendian ? fromPositiveBE : fromPositiveLE;
          var fromNegative = bigendian ? fromNegativeBE : fromNegativeLE;
          var proto = Int64.prototype;
          var isName = "is" + name;
          var _isInt64 = "_" + isName;
          proto.buffer = void 0;
          proto.offset = 0;
          proto[_isInt64] = true;
          proto.toNumber = toNumber;
          proto.toString = toString;
          proto.toJSON = toNumber;
          proto.toArray = toArray;
          if (BUFFER)
            proto.toBuffer = toBuffer;
          if (UINT8ARRAY)
            proto.toArrayBuffer = toArrayBuffer;
          Int64[isName] = isInt64;
          exports2[name] = Int64;
          return Int64;
          function Int64(buffer, offset, value, raddix) {
            if (!(this instanceof Int64))
              return new Int64(buffer, offset, value, raddix);
            return init(this, buffer, offset, value, raddix);
          }
          function isInt64(b) {
            return !!(b && b[_isInt64]);
          }
          function init(that, buffer, offset, value, raddix) {
            if (UINT8ARRAY && ARRAYBUFFER) {
              if (buffer instanceof ARRAYBUFFER)
                buffer = new UINT8ARRAY(buffer);
              if (value instanceof ARRAYBUFFER)
                value = new UINT8ARRAY(value);
            }
            if (!buffer && !offset && !value && !storage) {
              that.buffer = newArray(ZERO, 0);
              return;
            }
            if (!isValidBuffer(buffer, offset)) {
              var _storage = storage || Array;
              raddix = offset;
              value = buffer;
              offset = 0;
              buffer = new _storage(8);
            }
            that.buffer = buffer;
            that.offset = offset |= 0;
            if (UNDEFINED === typeof value)
              return;
            if (typeof value === "string") {
              fromString(buffer, offset, value, raddix || 10);
            } else if (isValidBuffer(value, raddix)) {
              fromArray(buffer, offset, value, raddix);
            } else if (typeof raddix === "number") {
              writeInt32(buffer, offset + posH, value);
              writeInt32(buffer, offset + posL, raddix);
            } else if (value > 0) {
              fromPositive(buffer, offset, value);
            } else if (value < 0) {
              fromNegative(buffer, offset, value);
            } else {
              fromArray(buffer, offset, ZERO, 0);
            }
          }
          function fromString(buffer, offset, str, raddix) {
            var pos = 0;
            var len = str.length;
            var high = 0;
            var low = 0;
            if (str[0] === "-")
              pos++;
            var sign = pos;
            while (pos < len) {
              var chr = parseInt(str[pos++], raddix);
              if (!(chr >= 0))
                break;
              low = low * raddix + chr;
              high = high * raddix + Math.floor(low / BIT32);
              low %= BIT32;
            }
            if (sign) {
              high = ~high;
              if (low) {
                low = BIT32 - low;
              } else {
                high++;
              }
            }
            writeInt32(buffer, offset + posH, high);
            writeInt32(buffer, offset + posL, low);
          }
          function toNumber() {
            var buffer = this.buffer;
            var offset = this.offset;
            var high = readInt32(buffer, offset + posH);
            var low = readInt32(buffer, offset + posL);
            if (!unsigned)
              high |= 0;
            return high ? high * BIT32 + low : low;
          }
          function toString(radix) {
            var buffer = this.buffer;
            var offset = this.offset;
            var high = readInt32(buffer, offset + posH);
            var low = readInt32(buffer, offset + posL);
            var str = "";
            var sign = !unsigned && high & 2147483648;
            if (sign) {
              high = ~high;
              low = BIT32 - low;
            }
            radix = radix || 10;
            while (1) {
              var mod = high % radix * BIT32 + low;
              high = Math.floor(high / radix);
              low = Math.floor(mod / radix);
              str = (mod % radix).toString(radix) + str;
              if (!high && !low)
                break;
            }
            if (sign) {
              str = "-" + str;
            }
            return str;
          }
          function writeInt32(buffer, offset, value) {
            buffer[offset + pos3] = value & 255;
            value = value >> 8;
            buffer[offset + pos2] = value & 255;
            value = value >> 8;
            buffer[offset + pos1] = value & 255;
            value = value >> 8;
            buffer[offset + pos0] = value & 255;
          }
          function readInt32(buffer, offset) {
            return buffer[offset + pos0] * BIT24 + (buffer[offset + pos1] << 16) + (buffer[offset + pos2] << 8) + buffer[offset + pos3];
          }
        }
        function toArray(raw) {
          var buffer = this.buffer;
          var offset = this.offset;
          storage = null;
          if (raw !== false && offset === 0 && buffer.length === 8 && isArray(buffer))
            return buffer;
          return newArray(buffer, offset);
        }
        function toBuffer(raw) {
          var buffer = this.buffer;
          var offset = this.offset;
          storage = BUFFER;
          if (raw !== false && offset === 0 && buffer.length === 8 && Buffer2.isBuffer(buffer))
            return buffer;
          var dest = new BUFFER(8);
          fromArray(dest, 0, buffer, offset);
          return dest;
        }
        function toArrayBuffer(raw) {
          var buffer = this.buffer;
          var offset = this.offset;
          var arrbuf = buffer.buffer;
          storage = UINT8ARRAY;
          if (raw !== false && offset === 0 && arrbuf instanceof ARRAYBUFFER && arrbuf.byteLength === 8)
            return arrbuf;
          var dest = new UINT8ARRAY(8);
          fromArray(dest, 0, buffer, offset);
          return dest.buffer;
        }
        function isValidBuffer(buffer, offset) {
          var len = buffer && buffer.length;
          offset |= 0;
          return len && offset + 8 <= len && typeof buffer[offset] !== "string";
        }
        function fromArray(destbuf, destoff, srcbuf, srcoff) {
          destoff |= 0;
          srcoff |= 0;
          for (var i = 0; i < 8; i++) {
            destbuf[destoff++] = srcbuf[srcoff++] & 255;
          }
        }
        function newArray(buffer, offset) {
          return Array.prototype.slice.call(buffer, offset, offset + 8);
        }
        function fromPositiveBE(buffer, offset, value) {
          var pos = offset + 8;
          while (pos > offset) {
            buffer[--pos] = value & 255;
            value /= 256;
          }
        }
        function fromNegativeBE(buffer, offset, value) {
          var pos = offset + 8;
          value++;
          while (pos > offset) {
            buffer[--pos] = -value & 255 ^ 255;
            value /= 256;
          }
        }
        function fromPositiveLE(buffer, offset, value) {
          var end = offset + 8;
          while (offset < end) {
            buffer[offset++] = value & 255;
            value /= 256;
          }
        }
        function fromNegativeLE(buffer, offset, value) {
          var end = offset + 8;
          value++;
          while (offset < end) {
            buffer[offset++] = -value & 255 ^ 255;
            value /= 256;
          }
        }
        function _isArray(val) {
          return !!val && Object.prototype.toString.call(val) == "[object Array]";
        }
      }(typeof exports === "object" && typeof exports.nodeName !== "string" ? exports : exports || {});
    }
  });

  // node_modules/matroska/lib/schema.js
  var require_schema = __commonJS({
    "node_modules/matroska/lib/schema.js"(exports, module) {
      "use strict";
      init_esbuild_inject();
      var byEbmlID = {
        128: {
          name: "ChapterDisplay",
          level: 4,
          type: "m",
          multiple: true,
          minver: 1,
          webm: true,
          description: "Contains all possible strings to use for the chapter display."
        },
        131: {
          name: "TrackType",
          level: 3,
          type: "u",
          mandatory: true,
          minver: 1,
          range: "1-254",
          description: "A set of track types coded on 8 bits (1: video, 2: audio, 3: complex, 0x10: logo, 0x11: subtitle, 0x12: buttons, 0x20: control)."
        },
        133: {
          name: "ChapString",
          cppname: "ChapterString",
          level: 5,
          type: "8",
          mandatory: true,
          minver: 1,
          webm: true,
          description: "Contains the string to use as the chapter atom."
        },
        134: {
          name: "CodecID",
          level: 3,
          type: "s",
          mandatory: true,
          minver: 1,
          description: "An ID corresponding to the codec, see the codec page for more info."
        },
        136: {
          name: "FlagDefault",
          cppname: "TrackFlagDefault",
          level: 3,
          type: "u",
          mandatory: true,
          minver: 1,
          "default": 1,
          range: "0-1",
          description: "Set if that track (audio, video or subs) SHOULD be active if no language found matches the user preference. (1 bit)"
        },
        137: {
          name: "ChapterTrackNumber",
          level: 5,
          type: "u",
          mandatory: true,
          multiple: true,
          minver: 1,
          webm: false,
          range: "not 0",
          description: "UID of the Track to apply this chapter too. In the absense of a control track, choosing this chapter will select the listed Tracks and deselect unlisted tracks. Absense of this element indicates that the Chapter should be applied to any currently used Tracks."
        },
        145: {
          name: "ChapterTimeStart",
          level: 4,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: true,
          description: "Timestamp of the start of Chapter (not scaled)."
        },
        146: {
          name: "ChapterTimeEnd",
          level: 4,
          type: "u",
          minver: 1,
          webm: false,
          description: "Timestamp of the end of Chapter (timestamp excluded, not scaled)."
        },
        150: {
          name: "CueRefTime",
          level: 5,
          type: "u",
          mandatory: true,
          minver: 2,
          webm: false,
          description: "Timestamp of the referenced Block."
        },
        151: {
          name: "CueRefCluster",
          level: 5,
          type: "u",
          mandatory: true,
          webm: false,
          description: "The Position of the Cluster containing the referenced Block."
        },
        152: {
          name: "ChapterFlagHidden",
          level: 4,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: false,
          "default": 0,
          range: "0-1",
          description: "If a chapter is hidden (1), it should not be available to the user interface (but still to Control Tracks; see flag notes). (1 bit)"
        },
        16980: {
          name: "ContentCompAlgo",
          level: 6,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: false,
          "default": 0,
          description: "The compression algorithm used. Algorithms that have been specified so far are: 0 - zlib,   3 - Header Stripping"
        },
        16981: {
          name: "ContentCompSettings",
          level: 6,
          type: "b",
          minver: 1,
          webm: false,
          description: "Settings that might be needed by the decompressor. For Header Stripping (ContentCompAlgo=3), the bytes that were removed from the beggining of each frames of the track."
        },
        17026: {
          name: "DocType",
          level: 1,
          type: "s",
          mandatory: true,
          "default": "matroska",
          minver: 1,
          description: "A string that describes the type of document that follows this EBML header. 'matroska' in our case or 'webm' for webm files."
        },
        17029: {
          name: "DocTypeReadVersion",
          level: 1,
          type: "u",
          mandatory: true,
          "default": 1,
          minver: 1,
          description: "The minimum DocType version an interpreter has to support to read this file."
        },
        17030: {
          name: "EBMLVersion",
          level: 1,
          type: "u",
          mandatory: true,
          "default": 1,
          minver: 1,
          description: "The version of EBML parser used to create the file."
        },
        17031: {
          name: "DocTypeVersion",
          level: 1,
          type: "u",
          mandatory: true,
          "default": 1,
          minver: 1,
          description: "The version of DocType interpreter used to create the file."
        },
        17476: {
          name: "SegmentFamily",
          level: 2,
          type: "b",
          multiple: true,
          minver: 1,
          webm: false,
          bytesize: 16,
          description: "A randomly generated unique ID that all segments related to each other must use (128 bits)."
        },
        17505: {
          name: "DateUTC",
          level: 2,
          type: "d",
          minver: 1,
          description: "Date of the origin of timestamp (value 0), i.e. production date."
        },
        17540: {
          name: "TagDefault",
          level: 4,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: false,
          "default": 1,
          range: "0-1",
          description: "Indication to know if this is the default/original language to use for the given tag. (1 bit)"
        },
        17541: {
          name: "TagBinary",
          level: 4,
          type: "b",
          minver: 1,
          webm: false,
          description: "The values of the Tag if it is binary. Note that this cannot be used in the same SimpleTag as TagString."
        },
        17543: {
          name: "TagString",
          level: 4,
          type: "8",
          minver: 1,
          webm: false,
          description: "The value of the Element."
        },
        17545: {
          name: "Duration",
          level: 2,
          type: "f",
          minver: 1,
          range: "> 0",
          description: "Duration of the segment (based on TimecodeScale)."
        },
        17816: {
          name: "ChapterFlagEnabled",
          level: 4,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: false,
          "default": 1,
          range: "0-1",
          description: "Specify wether the chapter is enabled. It can be enabled/disabled by a Control Track. When disabled, the movie should skip all the content between the TimeStart and TimeEnd of this chapter (see flag notes). (1 bit)"
        },
        18016: {
          name: "FileMimeType",
          level: 3,
          type: "s",
          mandatory: true,
          minver: 1,
          webm: false,
          description: "MIME type of the file."
        },
        18017: {
          name: "FileUsedStartTime",
          level: 3,
          type: "u",
          divx: true,
          description: "DivX font extension"
        },
        18018: {
          name: "FileUsedEndTime",
          level: 3,
          type: "u",
          divx: true,
          description: "DivX font extension"
        },
        18037: {
          name: "FileReferral",
          level: 3,
          type: "b",
          webm: false,
          description: "A binary value that a track/codec can refer to when the attachment is needed."
        },
        20529: {
          name: "ContentEncodingOrder",
          level: 5,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: false,
          "default": 0,
          description: "Tells when this modification was used during encoding/muxing starting with 0 and counting upwards. The decoder/demuxer has to start with the highest order number it finds and work its way down. This value has to be unique over all ContentEncodingOrder elements in the segment."
        },
        20530: {
          name: "ContentEncodingScope",
          level: 5,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: false,
          "default": 1,
          range: "not 0",
          description: "A bit field that describes which elements have been modified in this way. Values (big endian) can be OR'ed. Possible values: 1 - all frame contents, 2 - the track's private data, 4 - the next ContentEncoding (next ContentEncodingOrder. Either the data inside ContentCompression and/or ContentEncryption)"
        },
        20531: {
          name: "ContentEncodingType",
          level: 5,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: false,
          "default": 0,
          description: "A value describing what kind of transformation has been done. Possible values: 0 - compression, 1 - encryption"
        },
        20532: {
          name: "ContentCompression",
          level: 5,
          type: "m",
          minver: 1,
          webm: false,
          description: "Settings describing the compression used. Must be present if the value of ContentEncodingType is 0 and absent otherwise. Each block must be decompressable even if no previous block is available in order not to prevent seeking."
        },
        20533: {
          name: "ContentEncryption",
          level: 5,
          type: "m",
          minver: 1,
          webm: false,
          description: "Settings describing the encryption used. Must be present if the value of ContentEncodingType is 1 and absent otherwise."
        },
        21368: {
          name: "CueBlockNumber",
          level: 4,
          type: "u",
          minver: 1,
          "default": 1,
          range: "not 0",
          description: "Number of the Block in the specified Cluster."
        },
        22100: {
          name: "ChapterStringUID",
          level: 4,
          type: "8",
          mandatory: false,
          minver: 3,
          webm: true,
          description: "A unique string ID to identify the Chapter. Use for WebVTT cue identifier storage."
        },
        22337: {
          name: "WritingApp",
          level: 2,
          type: "8",
          mandatory: true,
          minver: 1,
          description: 'Writing application ("mkvmerge-0.3.3").'
        },
        22612: {
          name: "SilentTracks",
          cppname: "ClusterSilentTracks",
          level: 2,
          type: "m",
          minver: 1,
          webm: false,
          description: "The list of tracks that are not used in that part of the stream. It is useful when using overlay tracks on seeking. Then you should decide what track to use."
        },
        25152: {
          name: "ContentEncoding",
          level: 4,
          type: "m",
          mandatory: true,
          multiple: true,
          minver: 1,
          webm: false,
          description: "Settings for one content encoding like compression or encryption."
        },
        25188: {
          name: "BitDepth",
          cppname: "AudioBitDepth",
          level: 4,
          type: "u",
          minver: 1,
          range: "not 0",
          description: "Bits per sample, mostly used for PCM."
        },
        25906: {
          name: "SignedElement",
          level: 3,
          type: "b",
          multiple: true,
          webm: false,
          description: "An element ID whose data will be used to compute the signature."
        },
        26148: {
          name: "TrackTranslate",
          level: 3,
          type: "m",
          multiple: true,
          minver: 1,
          webm: false,
          description: "The track identification for the given Chapter Codec."
        },
        26897: {
          name: "ChapProcessCommand",
          cppname: "ChapterProcessCommand",
          level: 5,
          type: "m",
          multiple: true,
          minver: 1,
          webm: false,
          description: "Contains all the commands associated to the Atom."
        },
        26914: {
          name: "ChapProcessTime",
          cppname: "ChapterProcessTime",
          level: 6,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: false,
          description: "Defines when the process command should be handled (0: during the whole chapter, 1: before starting playback, 2: after playback of the chapter)."
        },
        26916: {
          name: "ChapterTranslate",
          level: 2,
          type: "m",
          multiple: true,
          minver: 1,
          webm: false,
          description: "A tuple of corresponding ID used by chapter codecs to represent this segment."
        },
        26931: {
          name: "ChapProcessData",
          cppname: "ChapterProcessData",
          level: 6,
          type: "b",
          mandatory: true,
          minver: 1,
          webm: false,
          description: "Contains the command information. The data should be interpreted depending on the ChapProcessCodecID value. For ChapProcessCodecID = 1, the data correspond to the binary DVD cell pre/post commands."
        },
        26948: {
          name: "ChapProcess",
          cppname: "ChapterProcess",
          level: 4,
          type: "m",
          multiple: true,
          minver: 1,
          webm: false,
          description: "Contains all the commands associated to the Atom."
        },
        26965: {
          name: "ChapProcessCodecID",
          cppname: "ChapterProcessCodecID",
          level: 5,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: false,
          "default": 0,
          description: "Contains the type of the codec used for the processing. A value of 0 means native Matroska processing (to be defined), a value of 1 means the DVD command set is used. More codec IDs can be added later."
        },
        29555: {
          name: "Tag",
          level: 2,
          type: "m",
          mandatory: true,
          multiple: true,
          minver: 1,
          webm: false,
          description: "Element containing elements specific to Tracks/Chapters."
        },
        29572: {
          name: "SegmentFilename",
          level: 2,
          type: "8",
          minver: 1,
          webm: false,
          description: "A filename corresponding to this segment."
        },
        29766: {
          name: "AttachmentLink",
          cppname: "TrackAttachmentLink",
          level: 3,
          type: "u",
          minver: 1,
          webm: false,
          range: "not 0",
          description: "The UID of an attachment that is used by this codec."
        },
        2459272: {
          name: "CodecName",
          level: 3,
          type: "8",
          minver: 1,
          description: "A human-readable string specifying the codec."
        },
        408125543: {
          name: "Segment",
          level: "0",
          type: "m",
          mandatory: true,
          multiple: true,
          minver: 1,
          description: "This element contains all other top-level (level 1) elements. Typically a Matroska file is composed of 1 segment."
        },
        17530: {
          name: "TagLanguage",
          level: 4,
          type: "s",
          mandatory: true,
          minver: 1,
          webm: false,
          "default": "und",
          description: "Specifies the language of the tag specified, in the Matroska languages form."
        },
        17827: {
          name: "TagName",
          level: 4,
          type: "8",
          mandatory: true,
          minver: 1,
          webm: false,
          description: "The name of the Tag that is going to be stored."
        },
        26568: {
          name: "SimpleTag",
          cppname: "TagSimple",
          level: 3,
          "recursive": "1",
          type: "m",
          mandatory: true,
          multiple: true,
          minver: 1,
          webm: false,
          description: "Contains general information about the target."
        },
        25542: {
          name: "TagAttachmentUID",
          level: 4,
          type: "u",
          multiple: true,
          minver: 1,
          webm: false,
          "default": 0,
          description: "A unique ID to identify the Attachment(s) the tags belong to. If the value is 0 at this level, the tags apply to all the attachments in the Segment."
        },
        25540: {
          name: "TagChapterUID",
          level: 4,
          type: "u",
          multiple: true,
          minver: 1,
          webm: false,
          "default": 0,
          description: "A unique ID to identify the Chapter(s) the tags belong to. If the value is 0 at this level, the tags apply to all chapters in the Segment."
        },
        25545: {
          name: "TagEditionUID",
          level: 4,
          type: "u",
          multiple: true,
          minver: 1,
          webm: false,
          "default": 0,
          description: "A unique ID to identify the EditionEntry(s) the tags belong to. If the value is 0 at this level, the tags apply to all editions in the Segment."
        },
        25541: {
          name: "TagTrackUID",
          level: 4,
          type: "u",
          multiple: true,
          minver: 1,
          webm: false,
          "default": 0,
          description: "A unique ID to identify the Track(s) the tags belong to. If the value is 0 at this level, the tags apply to all tracks in the Segment."
        },
        25546: {
          name: "TargetType",
          cppname: "TagTargetType",
          level: 4,
          type: "s",
          minver: 1,
          webm: false,
          "strong": "informational",
          description: 'An  string that can be used to display the logical level of the target like "ALBUM", "TRACK", "MOVIE", "CHAPTER", etc (see TargetType).'
        },
        26826: {
          name: "TargetTypeValue",
          cppname: "TagTargetTypeValue",
          level: 4,
          type: "u",
          minver: 1,
          webm: false,
          "default": 50,
          description: "A number to indicate the logical level of the target (see TargetType)."
        },
        25536: {
          name: "Targets",
          cppname: "TagTargets",
          level: 3,
          type: "m",
          mandatory: true,
          minver: 1,
          webm: false,
          description: "Contain all UIDs where the specified meta data apply. It is empty to describe everything in the segment."
        },
        307544935: {
          name: "Tags",
          level: 1,
          type: "m",
          multiple: true,
          minver: 1,
          webm: false,
          description: "Element containing elements specific to Tracks/Chapters. A list of valid tags can be found here."
        },
        17677: {
          name: "ChapProcessPrivate",
          cppname: "ChapterProcessPrivate",
          level: 5,
          type: "b",
          minver: 1,
          webm: false,
          description: 'Some optional data attached to the ChapProcessCodecID information. For ChapProcessCodecID = 1, it is the "DVD level" equivalent.'
        },
        17278: {
          name: "ChapCountry",
          cppname: "ChapterCountry",
          level: 5,
          type: "s",
          multiple: true,
          minver: 1,
          webm: false,
          description: "The countries corresponding to the string, same 2 octets as in Internet domains."
        },
        17276: {
          name: "ChapLanguage",
          cppname: "ChapterLanguage",
          level: 5,
          type: "s",
          mandatory: true,
          multiple: true,
          minver: 1,
          webm: true,
          "default": "eng",
          description: "The languages corresponding to the string, in the bibliographic ISO-639-2 form."
        },
        143: {
          name: "ChapterTrack",
          level: 4,
          type: "m",
          minver: 1,
          webm: false,
          description: "List of tracks on which the chapter applies. If this element is not present, all tracks apply"
        },
        25539: {
          name: "ChapterPhysicalEquiv",
          level: 4,
          type: "u",
          minver: 1,
          webm: false,
          description: 'Specify the physical equivalent of this ChapterAtom like "DVD" (60) or "SIDE" (50), see complete list of values.'
        },
        28348: {
          name: "ChapterSegmentEditionUID",
          level: 4,
          type: "u",
          minver: 1,
          webm: false,
          range: "not 0",
          description: "The EditionUID to play from the segment linked in ChapterSegmentUID."
        },
        28263: {
          name: "ChapterSegmentUID",
          level: 4,
          type: "b",
          minver: 1,
          webm: false,
          range: ">0",
          bytesize: 16,
          description: "A segment to play in place of this chapter. Edition ChapterSegmentEditionUID should be used for this segment, otherwise no edition is used."
        },
        29636: {
          name: "ChapterUID",
          level: 4,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: true,
          range: "not 0",
          description: "A unique ID to identify the Chapter."
        },
        182: {
          name: "ChapterAtom",
          level: 3,
          "recursive": "1",
          type: "m",
          mandatory: true,
          multiple: true,
          minver: 1,
          webm: true,
          description: "Contains the atom information to use as the chapter atom (apply to all tracks)."
        },
        17885: {
          name: "EditionFlagOrdered",
          level: 3,
          type: "u",
          minver: 1,
          webm: false,
          "default": 0,
          range: "0-1",
          description: "Specify if the chapters can be defined multiple times and the order to play them is enforced. (1 bit)"
        },
        17883: {
          name: "EditionFlagDefault",
          level: 3,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: false,
          "default": 0,
          range: "0-1",
          description: "If a flag is set (1) the edition should be used as the default one. (1 bit)"
        },
        17853: {
          name: "EditionFlagHidden",
          level: 3,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: false,
          "default": 0,
          range: "0-1",
          description: "If an edition is hidden (1), it should not be available to the user interface (but still to Control Tracks; see flag notes). (1 bit)"
        },
        17852: {
          name: "EditionUID",
          level: 3,
          type: "u",
          minver: 1,
          webm: false,
          range: "not 0",
          description: "A unique ID to identify the edition. It's useful for tagging an edition."
        },
        17849: {
          name: "EditionEntry",
          level: 2,
          type: "m",
          mandatory: true,
          multiple: true,
          minver: 1,
          webm: true,
          description: "Contains all information about a segment edition."
        },
        272869232: {
          name: "Chapters",
          level: 1,
          type: "m",
          minver: 1,
          webm: true,
          description: "A system to define basic menus and partition data. For more detailed information, look at the Chapters Explanation."
        },
        18094: {
          name: "FileUID",
          level: 3,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: false,
          range: "not 0",
          description: "Unique ID representing the file, as random as possible."
        },
        18012: {
          name: "FileData",
          level: 3,
          type: "b",
          mandatory: true,
          minver: 1,
          webm: false,
          description: "The data of the file."
        },
        18030: {
          name: "FileName",
          level: 3,
          type: "8",
          mandatory: true,
          minver: 1,
          webm: false,
          description: "Filename of the attached file."
        },
        18046: {
          name: "FileDescription",
          level: 3,
          type: "8",
          minver: 1,
          webm: false,
          description: "A human-friendly name for the attached file."
        },
        24999: {
          name: "AttachedFile",
          level: 2,
          type: "m",
          mandatory: true,
          multiple: true,
          minver: 1,
          webm: false,
          description: "An attached file."
        },
        423732329: {
          name: "Attachments",
          level: 1,
          type: "m",
          minver: 1,
          webm: false,
          description: "Contain attached files."
        },
        235: {
          name: "CueRefCodecState",
          level: 5,
          type: "u",
          webm: false,
          "default": 0,
          description: "The position of the Codec State corresponding to this referenced element. 0 means that the data is taken from the initial Track Entry."
        },
        21343: {
          name: "CueRefNumber",
          level: 5,
          type: "u",
          webm: false,
          "default": 1,
          range: "not 0",
          description: "Number of the referenced Block of Track X in the specified Cluster."
        },
        219: {
          name: "CueReference",
          level: 4,
          type: "m",
          multiple: true,
          minver: 2,
          webm: false,
          description: "The Clusters containing the required referenced Blocks."
        },
        234: {
          name: "CueCodecState",
          level: 4,
          type: "u",
          minver: 2,
          webm: false,
          "default": 0,
          description: "The position of the Codec State corresponding to this Cue element. 0 means that the data is taken from the initial Track Entry."
        },
        178: {
          name: "CueDuration",
          level: 4,
          type: "u",
          mandatory: false,
          minver: 4,
          webm: false,
          description: "The duration of the block according to the segment time base. If missing the track's DefaultDuration does not apply and no duration information is available in terms of the cues."
        },
        240: {
          name: "CueRelativePosition",
          level: 4,
          type: "u",
          mandatory: false,
          minver: 4,
          webm: false,
          description: "The relative position of the referenced block inside the cluster with 0 being the first possible position for an element inside that cluster.",
          position: "clusterRelative"
        },
        241: {
          name: "CueClusterPosition",
          level: 4,
          type: "u",
          mandatory: true,
          minver: 1,
          description: "The position of the Cluster containing the required Block.",
          position: "segment"
        },
        247: {
          name: "CueTrack",
          level: 4,
          type: "u",
          mandatory: true,
          minver: 1,
          range: "not 0",
          description: "The track for which a position is given."
        },
        183: {
          name: "CueTrackPositions",
          level: 3,
          type: "m",
          mandatory: true,
          multiple: true,
          minver: 1,
          description: "Contain positions for different tracks corresponding to the timestamp."
        },
        179: {
          name: "CueTime",
          level: 3,
          type: "u",
          mandatory: true,
          minver: 1,
          description: "Absolute timestamp according to the segment time base."
        },
        187: {
          name: "CuePoint",
          level: 2,
          type: "m",
          mandatory: true,
          multiple: true,
          minver: 1,
          description: "Contains all information relative to a seek point in the segment."
        },
        475249515: {
          name: "Cues",
          level: 1,
          type: "m",
          minver: 1,
          description: 'A top-level element to speed seeking access. All entries are local to the segment. Should be mandatory for non "live" streams.'
        },
        18406: {
          name: "ContentSigHashAlgo",
          level: 6,
          type: "u",
          minver: 1,
          webm: false,
          "default": 0,
          description: "The hash algorithm used for the signature. A value of '0' means that the contents have not been signed but only encrypted. Predefined values: 1 - SHA1-160 2 - MD5"
        },
        18405: {
          name: "ContentSigAlgo",
          level: 6,
          type: "u",
          minver: 1,
          webm: false,
          "default": 0,
          description: "The algorithm used for the signature. A value of '0' means that the contents have not been signed but only encrypted. Predefined values: 1 - RSA"
        },
        18404: {
          name: "ContentSigKeyID",
          level: 6,
          type: "b",
          minver: 1,
          webm: false,
          description: "This is the ID of the private key the data was signed with."
        },
        18403: {
          name: "ContentSignature",
          level: 6,
          type: "b",
          minver: 1,
          webm: false,
          description: "A cryptographic signature of the contents."
        },
        18402: {
          name: "ContentEncKeyID",
          level: 6,
          type: "b",
          minver: 1,
          webm: false,
          description: "For public key algorithms this is the ID of the public key the the data was encrypted with."
        },
        18401: {
          name: "ContentEncAlgo",
          level: 6,
          type: "u",
          minver: 1,
          webm: false,
          "default": 0,
          description: "The encryption algorithm used. The value '0' means that the contents have not been encrypted but only signed. Predefined values: 1 - DES, 2 - 3DES, 3 - Twofish, 4 - Blowfish, 5 - AES"
        },
        28032: {
          name: "ContentEncodings",
          level: 3,
          type: "m",
          minver: 1,
          webm: false,
          description: "Settings for several content encoding mechanisms like compression or encryption."
        },
        196: {
          name: "TrickMasterTrackSegmentUID",
          level: 3,
          type: "b",
          divx: true,
          bytesize: 16,
          description: "DivX trick track extenstions"
        },
        199: {
          name: "TrickMasterTrackUID",
          level: 3,
          type: "u",
          divx: true,
          description: "DivX trick track extenstions"
        },
        198: {
          name: "TrickTrackFlag",
          level: 3,
          type: "u",
          divx: true,
          "default": 0,
          description: "DivX trick track extenstions"
        },
        193: {
          name: "TrickTrackSegmentUID",
          level: 3,
          type: "b",
          divx: true,
          bytesize: 16,
          description: "DivX trick track extenstions"
        },
        192: {
          name: "TrickTrackUID",
          level: 3,
          type: "u",
          divx: true,
          description: "DivX trick track extenstions"
        },
        237: {
          name: "TrackJoinUID",
          level: 5,
          type: "u",
          mandatory: true,
          multiple: true,
          minver: 3,
          webm: false,
          range: "not 0",
          description: "The trackUID number of a track whose blocks are used to create this virtual track."
        },
        233: {
          name: "TrackJoinBlocks",
          level: 4,
          type: "m",
          minver: 3,
          webm: false,
          description: "Contains the list of all tracks whose Blocks need to be combined to create this virtual track"
        },
        230: {
          name: "TrackPlaneType",
          level: 6,
          type: "u",
          mandatory: true,
          minver: 3,
          webm: false,
          description: "The kind of plane this track corresponds to (0: left eye, 1: right eye, 2: background)."
        },
        229: {
          name: "TrackPlaneUID",
          level: 6,
          type: "u",
          mandatory: true,
          minver: 3,
          webm: false,
          range: "not 0",
          description: "The trackUID number of the track representing the plane."
        },
        228: {
          name: "TrackPlane",
          level: 5,
          type: "m",
          mandatory: true,
          multiple: true,
          minver: 3,
          webm: false,
          description: "Contains a video plane track that need to be combined to create this 3D track"
        },
        227: {
          name: "TrackCombinePlanes",
          level: 4,
          type: "m",
          minver: 3,
          webm: false,
          description: "Contains the list of all video plane tracks that need to be combined to create this 3D track"
        },
        226: {
          name: "TrackOperation",
          level: 3,
          type: "m",
          minver: 3,
          webm: false,
          description: "Operation that needs to be applied on tracks to create this virtual track. For more details look at the Specification Notes on the subject."
        },
        32123: {
          name: "ChannelPositions",
          cppname: "AudioPosition",
          level: 4,
          type: "b",
          webm: false,
          description: "Table of horizontal angles for each successive channel, see appendix."
        },
        159: {
          name: "Channels",
          cppname: "AudioChannels",
          level: 4,
          type: "u",
          mandatory: true,
          minver: 1,
          "default": 1,
          range: "not 0",
          description: "Numbers of channels in the track."
        },
        30901: {
          name: "OutputSamplingFrequency",
          cppname: "AudioOutputSamplingFreq",
          level: 4,
          type: "f",
          minver: 1,
          "default": "Sampling Frequency",
          range: "> 0",
          description: "Real output sampling frequency in Hz (used for SBR techniques)."
        },
        181: {
          name: "SamplingFrequency",
          cppname: "AudioSamplingFreq",
          level: 4,
          type: "f",
          mandatory: true,
          minver: 1,
          "default": 8e3,
          range: "> 0",
          description: "Sampling frequency in Hz."
        },
        225: {
          name: "Audio",
          cppname: "TrackAudio",
          level: 3,
          type: "m",
          minver: 1,
          description: "Audio settings."
        },
        2327523: {
          name: "FrameRate",
          cppname: "VideoFrameRate",
          level: 4,
          type: "f",
          range: "> 0",
          "strong": "Informational",
          description: "Number of frames per second.  only."
        },
        3126563: {
          name: "GammaValue",
          cppname: "VideoGamma",
          level: 4,
          type: "f",
          webm: false,
          range: "> 0",
          description: "Gamma Value."
        },
        3061028: {
          name: "ColourSpace",
          cppname: "VideoColourSpace",
          level: 4,
          type: "b",
          minver: 1,
          webm: false,
          bytesize: 4,
          description: "Same value as in AVI (32 bits)."
        },
        21683: {
          name: "AspectRatioType",
          cppname: "VideoAspectRatio",
          level: 4,
          type: "u",
          minver: 1,
          "default": 0,
          description: "Specify the possible modifications to the aspect ratio (0: free resizing, 1: keep aspect ratio, 2: fixed)."
        },
        21682: {
          name: "DisplayUnit",
          cppname: "VideoDisplayUnit",
          level: 4,
          type: "u",
          minver: 1,
          "default": 0,
          description: "How DisplayWidth & DisplayHeight should be interpreted (0: pixels, 1: centimeters, 2: inches, 3: Display Aspect Ratio)."
        },
        21690: {
          name: "DisplayHeight",
          cppname: "VideoDisplayHeight",
          level: 4,
          type: "u",
          minver: 1,
          "default": "PixelHeight",
          range: "not 0",
          description: "Height of the video frames to display. The default value is only valid when DisplayUnit is 0."
        },
        21680: {
          name: "DisplayWidth",
          cppname: "VideoDisplayWidth",
          level: 4,
          type: "u",
          minver: 1,
          "default": "PixelWidth",
          range: "not 0",
          description: "Width of the video frames to display. The default value is only valid when DisplayUnit is 0."
        },
        21725: {
          name: "PixelCropRight",
          cppname: "VideoPixelCropRight",
          level: 4,
          type: "u",
          minver: 1,
          "default": 0,
          description: "The number of video pixels to remove on the right of the image."
        },
        21708: {
          name: "PixelCropLeft",
          cppname: "VideoPixelCropLeft",
          level: 4,
          type: "u",
          minver: 1,
          "default": 0,
          description: "The number of video pixels to remove on the left of the image."
        },
        21691: {
          name: "PixelCropTop",
          cppname: "VideoPixelCropTop",
          level: 4,
          type: "u",
          minver: 1,
          "default": 0,
          description: "The number of video pixels to remove at the top of the image."
        },
        21674: {
          name: "PixelCropBottom",
          cppname: "VideoPixelCropBottom",
          level: 4,
          type: "u",
          minver: 1,
          "default": 0,
          description: "The number of video pixels to remove at the bottom of the image (for HDTV content)."
        },
        186: {
          name: "PixelHeight",
          cppname: "VideoPixelHeight",
          level: 4,
          type: "u",
          mandatory: true,
          minver: 1,
          range: "not 0",
          description: "Height of the encoded video frames in pixels."
        },
        176: {
          name: "PixelWidth",
          cppname: "VideoPixelWidth",
          level: 4,
          type: "u",
          mandatory: true,
          minver: 1,
          range: "not 0",
          description: "Width of the encoded video frames in pixels."
        },
        21433: {
          name: "OldStereoMode",
          level: 4,
          type: "u",
          "maxver": "0",
          webm: false,
          divx: false,
          description: "DEPRECATED, DO NOT USE. Bogus StereoMode value used in old versions of libmatroska. (0: mono, 1: right eye, 2: left eye, 3: both eyes)."
        },
        21440: {
          name: "AlphaMode",
          cppname: "VideoAlphaMode",
          level: 4,
          type: "u",
          minver: 3,
          webm: true,
          "default": 0,
          description: "Alpha Video Mode. Presence of this element indicates that the BlockAdditional element could contain Alpha data."
        },
        21432: {
          name: "StereoMode",
          cppname: "VideoStereoMode",
          level: 4,
          type: "u",
          minver: 3,
          webm: true,
          "default": 0,
          description: "Stereo-3D video mode (0: mono, 1: side by side (left eye is first), 2: top-bottom (right eye is first), 3: top-bottom (left eye is first), 4: checkboard (right is first), 5: checkboard (left is first), 6: row interleaved (right is first), 7: row interleaved (left is first), 8: column interleaved (right is first), 9: column interleaved (left is first), 10: anaglyph (cyan/red), 11: side by side (right eye is first), 12: anaglyph (green/magenta), 13 both eyes laced in one Block (left eye is first), 14 both eyes laced in one Block (right eye is first)) . There are some more details on 3D support in the Specification Notes."
        },
        154: {
          name: "FlagInterlaced",
          cppname: "VideoFlagInterlaced",
          level: 4,
          type: "u",
          mandatory: true,
          minver: 2,
          webm: true,
          "default": 0,
          range: "0-1",
          description: "Set if the video is interlaced. (1 bit)"
        },
        224: {
          name: "Video",
          cppname: "TrackVideo",
          level: 3,
          type: "m",
          minver: 1,
          description: "Video settings."
        },
        26277: {
          name: "TrackTranslateTrackID",
          level: 4,
          type: "b",
          mandatory: true,
          minver: 1,
          webm: false,
          description: "The binary value used to represent this track in the chapter codec data. The format depends on the ChapProcessCodecID used."
        },
        26303: {
          name: "TrackTranslateCodec",
          level: 4,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: false,
          description: "The chapter codec using this ID (0: Matroska Script, 1: DVD-menu)."
        },
        26364: {
          name: "TrackTranslateEditionUID",
          level: 4,
          type: "u",
          multiple: true,
          minver: 1,
          webm: false,
          description: "Specify an edition UID on which this translation applies. When not specified, it means for all editions found in the segment."
        },
        22203: {
          name: "SeekPreRoll",
          level: 3,
          type: "u",
          mandatory: true,
          multiple: false,
          "default": 0,
          minver: 4,
          webm: true,
          description: "After a discontinuity, SeekPreRoll is the duration in nanoseconds of the data the decoder must decode before the decoded data is valid."
        },
        22186: {
          name: "CodecDelay",
          level: 3,
          type: "u",
          multiple: false,
          "default": 0,
          minver: 4,
          webm: true,
          description: "CodecDelay is The codec-built-in delay in nanoseconds. This value must be subtracted from each block timestamp in order to get the actual timestamp. The value should be small so the muxing of tracks with the same actual timestamp are in the same Cluster."
        },
        28587: {
          name: "TrackOverlay",
          level: 3,
          type: "u",
          multiple: true,
          minver: 1,
          webm: false,
          description: "Specify that this track is an overlay track for the Track specified (in the u-integer). That means when this track has a gap (see SilentTracks) the overlay track should be used instead. The order of multiple TrackOverlay matters, the first one is the one that should be used. If not found it should be the second, etc."
        },
        170: {
          name: "CodecDecodeAll",
          level: 3,
          type: "u",
          mandatory: true,
          minver: 2,
          webm: false,
          "default": 1,
          range: "0-1",
          description: "The codec can decode potentially damaged data (1 bit)."
        },
        2536e3: {
          name: "CodecDownloadURL",
          level: 3,
          type: "s",
          multiple: true,
          webm: false,
          description: "A URL to download about the codec used."
        },
        3883072: {
          name: "CodecInfoURL",
          level: 3,
          type: "s",
          multiple: true,
          webm: false,
          description: "A URL to find information about the codec used."
        },
        3839639: {
          name: "CodecSettings",
          level: 3,
          type: "8",
          webm: false,
          description: "A string describing the encoding setting used."
        },
        25506: {
          name: "CodecPrivate",
          level: 3,
          type: "b",
          minver: 1,
          description: "Private data only known to the codec."
        },
        2274716: {
          name: "Language",
          cppname: "TrackLanguage",
          level: 3,
          type: "s",
          minver: 1,
          "default": "eng",
          description: "Specifies the language of the track in the Matroska languages form."
        },
        21358: {
          name: "Name",
          cppname: "TrackName",
          level: 3,
          type: "8",
          minver: 1,
          description: "A human-readable track name."
        },
        21998: {
          name: "MaxBlockAdditionID",
          level: 3,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: false,
          "default": 0,
          description: "The maximum value of BlockAdditions for this track."
        },
        21375: {
          name: "TrackOffset",
          level: 3,
          type: "i",
          webm: false,
          "default": 0,
          description: "A value to add to the Block's Timestamp. This can be used to adjust the playback offset of a track."
        },
        2306383: {
          name: "TrackTimecodeScale",
          level: 3,
          type: "f",
          mandatory: true,
          minver: 1,
          "maxver": "3",
          webm: false,
          "default": 1,
          range: "> 0",
          description: "DEPRECATED, DO NOT USE. The scale to apply on this track to work at normal speed in relation with other tracks (mostly used to adjust video speed when the audio length differs)."
        },
        2313850: {
          name: "DefaultDecodedFieldDuration",
          cppname: "TrackDefaultDecodedFieldDuration",
          level: 3,
          type: "u",
          minver: 4,
          range: "not 0",
          description: "The period in nanoseconds (not scaled by TimcodeScale)\nbetween two successive fields at the output of the decoding process (see the notes)"
        },
        2352003: {
          name: "DefaultDuration",
          cppname: "TrackDefaultDuration",
          level: 3,
          type: "u",
          minver: 1,
          range: "not 0",
          description: "Number of nanoseconds (not scaled via TimecodeScale) per frame ('frame' in the Matroska sense -- one element put into a (Simple)Block)."
        },
        28152: {
          name: "MaxCache",
          cppname: "TrackMaxCache",
          level: 3,
          type: "u",
          minver: 1,
          webm: false,
          description: "The maximum cache size required to store referenced frames in and the current frame. 0 means no cache is needed."
        },
        28135: {
          name: "MinCache",
          cppname: "TrackMinCache",
          level: 3,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: false,
          "default": 0,
          description: "The minimum number of frames a player should be able to cache during playback. If set to 0, the reference pseudo-cache system is not used."
        },
        156: {
          name: "FlagLacing",
          cppname: "TrackFlagLacing",
          level: 3,
          type: "u",
          mandatory: true,
          minver: 1,
          "default": 1,
          range: "0-1",
          description: "Set if the track may contain blocks using lacing. (1 bit)"
        },
        21930: {
          name: "FlagForced",
          cppname: "TrackFlagForced",
          level: 3,
          type: "u",
          mandatory: true,
          minver: 1,
          "default": 0,
          range: "0-1",
          description: "Set if that track MUST be active during playback. There can be many forced track for a kind (audio, video or subs), the player should select the one which language matches the user preference or the default + forced track. Overlay MAY happen between a forced and non-forced track of the same kind. (1 bit)"
        },
        185: {
          name: "FlagEnabled",
          cppname: "TrackFlagEnabled",
          level: 3,
          type: "u",
          mandatory: true,
          minver: 2,
          webm: true,
          "default": 1,
          range: "0-1",
          description: "Set if the track is usable. (1 bit)"
        },
        29637: {
          name: "TrackUID",
          level: 3,
          type: "u",
          mandatory: true,
          minver: 1,
          range: "not 0",
          description: "A unique ID to identify the Track. This should be kept the same when making a direct stream copy of the Track to another file."
        },
        215: {
          name: "TrackNumber",
          level: 3,
          type: "u",
          mandatory: true,
          minver: 1,
          range: "not 0",
          description: "The track number as used in the Block Header (using more than 127 tracks is not encouraged, though the design allows an unlimited number)."
        },
        174: {
          name: "TrackEntry",
          level: 2,
          type: "m",
          mandatory: true,
          multiple: true,
          minver: 1,
          description: "Describes a track with all elements."
        },
        374648427: {
          name: "Tracks",
          level: 1,
          type: "m",
          multiple: true,
          minver: 1,
          description: "A top-level block of information with many tracks described."
        },
        175: {
          name: "EncryptedBlock",
          level: 2,
          type: "b",
          multiple: true,
          webm: false,
          description: "Similar to EncryptedBlock Structure)"
        },
        202: {
          name: "ReferenceTimeCode",
          level: 4,
          type: "u",
          multiple: false,
          mandatory: true,
          minver: 0,
          webm: false,
          divx: true,
          description: "DivX trick track extenstions"
        },
        201: {
          name: "ReferenceOffset",
          level: 4,
          type: "u",
          multiple: false,
          mandatory: true,
          minver: 0,
          webm: false,
          divx: true,
          description: "DivX trick track extenstions"
        },
        200: {
          name: "ReferenceFrame",
          level: 3,
          type: "m",
          multiple: false,
          minver: 0,
          webm: false,
          divx: true,
          description: "DivX trick track extenstions"
        },
        207: {
          name: "SliceDuration",
          level: 5,
          type: "u",
          "default": 0,
          description: "The (scaled) duration to apply to the element."
        },
        206: {
          name: "Delay",
          cppname: "SliceDelay",
          level: 5,
          type: "u",
          "default": 0,
          description: "The (scaled) delay to apply to the element."
        },
        203: {
          name: "BlockAdditionID",
          cppname: "SliceBlockAddID",
          level: 5,
          type: "u",
          "default": 0,
          description: "The ID of the BlockAdditional element (0 is the main Block)."
        },
        205: {
          name: "FrameNumber",
          cppname: "SliceFrameNumber",
          level: 5,
          type: "u",
          "default": 0,
          description: "The number of the frame to generate from this lace with this delay (allow you to generate many frames from the same Block/Frame)."
        },
        204: {
          name: "LaceNumber",
          cppname: "SliceLaceNumber",
          level: 5,
          type: "u",
          minver: 1,
          "default": 0,
          divx: false,
          description: "The reverse number of the frame in the lace (0 is the last frame, 1 is the next to last, etc). While there are a few files in the wild with this element, it is no longer in use and has been deprecated. Being able to interpret this element is not required for playback."
        },
        232: {
          name: "TimeSlice",
          level: 4,
          type: "m",
          multiple: true,
          minver: 1,
          divx: false,
          description: "Contains extra time information about the data contained in the Block. While there are a few files in the wild with this element, it is no longer in use and has been deprecated. Being able to interpret this element is not required for playback."
        },
        142: {
          name: "Slices",
          level: 3,
          type: "m",
          minver: 1,
          divx: false,
          description: "Contains slices description."
        },
        30114: {
          name: "DiscardPadding",
          level: 3,
          type: "i",
          minver: 4,
          webm: true,
          description: "Duration in nanoseconds of the silent data added to the Block (padding at the end of the Block for positive value, at the beginning of the Block for negative value). The duration of DiscardPadding is not calculated in the duration of the TrackEntry and should be discarded during playback."
        },
        164: {
          name: "CodecState",
          level: 3,
          type: "b",
          minver: 2,
          webm: false,
          description: "The new codec state to use. Data interpretation is private to the codec. This information should always be referenced by a seek entry."
        },
        253: {
          name: "ReferenceVirtual",
          level: 3,
          type: "i",
          webm: false,
          description: "Relative position of the data that should be in position of the virtual block."
        },
        251: {
          name: "ReferenceBlock",
          level: 3,
          type: "i",
          multiple: true,
          minver: 1,
          description: "Timestamp of another frame used as a reference (ie: B or P frame). The timestamp is relative to the block it's attached to."
        },
        250: {
          name: "ReferencePriority",
          cppname: "FlagReferenced",
          level: 3,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: false,
          "default": 0,
          description: "This frame is referenced and has the specified cache priority. In cache only a frame of the same or higher priority can replace this frame. A value of 0 means the frame is not referenced."
        },
        155: {
          name: "BlockDuration",
          level: 3,
          type: "u",
          minver: 1,
          "default": "TrackDuration",
          description: 'The duration of the Block (based on TimecodeScale). This element is mandatory when DefaultDuration is set for the track (but can be omitted as other default values). When not written and with no DefaultDuration, the value is assumed to be the difference between the timestamp of this Block and the timestamp of the next Block in "display" order (not coding order). This element can be useful at the end of a Track (as there is not other Block available), or when there is a break in a track like for subtitle tracks. When set to 0 that means the frame is not a keyframe.'
        },
        165: {
          name: "BlockAdditional",
          level: 5,
          type: "b",
          mandatory: true,
          minver: 1,
          webm: false,
          description: "Interpreted by the codec as it wishes (using the BlockAddID)."
        },
        238: {
          name: "BlockAddID",
          level: 5,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: false,
          "default": 1,
          range: "not 0",
          description: "An ID to identify the BlockAdditional level."
        },
        166: {
          name: "BlockMore",
          level: 4,
          type: "m",
          mandatory: true,
          multiple: true,
          minver: 1,
          webm: false,
          description: "Contain the BlockAdditional and some parameters."
        },
        30113: {
          name: "BlockAdditions",
          level: 3,
          type: "m",
          minver: 1,
          webm: false,
          description: "Contain additional blocks to complete the main one. An EBML parser that has no knowledge of the Block structure could still see and use/skip these data."
        },
        162: {
          name: "BlockVirtual",
          level: 3,
          type: "b",
          webm: false,
          description: "A Block with no data. It must be stored in the stream at the place the real Block should be in display order. (see Block Virtual)"
        },
        161: {
          name: "Block",
          level: 3,
          type: "b",
          mandatory: true,
          minver: 1,
          description: "Block containing the actual data to be rendered and a timestamp relative to the Cluster Timecode. (see Block Structure)"
        },
        160: {
          name: "BlockGroup",
          level: 2,
          type: "m",
          multiple: true,
          minver: 1,
          description: "Basic container of information containing a single Block or BlockVirtual, and information specific to that Block/VirtualBlock."
        },
        163: {
          name: "SimpleBlock",
          level: 2,
          type: "b",
          multiple: true,
          minver: 2,
          webm: true,
          divx: true,
          description: "Similar to SimpleBlock Structure"
        },
        171: {
          name: "PrevSize",
          cppname: "ClusterPrevSize",
          level: 2,
          type: "u",
          minver: 1,
          description: "Size of the previous Cluster, in octets. Can be useful for backward playing.",
          position: "prevCluster"
        },
        167: {
          name: "Position",
          cppname: "ClusterPosition",
          level: 2,
          type: "u",
          minver: 1,
          webm: false,
          description: "The Position of the Cluster in the segment (0 in live broadcast streams). It might help to resynchronise offset on damaged streams.",
          position: "segment"
        },
        22743: {
          name: "SilentTrackNumber",
          cppname: "ClusterSilentTrackNumber",
          level: 3,
          type: "u",
          multiple: true,
          minver: 1,
          webm: false,
          description: "One of the track number that are not used from now on in the stream. It could change later if not specified as silent in a further Cluster."
        },
        231: {
          name: "Timecode",
          cppname: "ClusterTimecode",
          level: 2,
          type: "u",
          mandatory: true,
          minver: 1,
          description: "Absolute timestamp of the cluster (based on TimecodeScale)."
        },
        524531317: {
          name: "Cluster",
          level: 1,
          type: "m",
          multiple: true,
          minver: 1,
          description: "The lower level element containing the (monolithic) Block structure."
        },
        19840: {
          name: "MuxingApp",
          level: 2,
          type: "8",
          mandatory: true,
          minver: 1,
          description: 'Muxing application or library ("libmatroska-0.4.3").'
        },
        31657: {
          name: "Title",
          level: 2,
          type: "8",
          minver: 1,
          webm: false,
          description: "General name of the segment."
        },
        2807730: {
          name: "TimecodeScaleDenominator",
          level: 2,
          type: "u",
          mandatory: true,
          minver: 4,
          "default": "1000000000",
          description: "Timestamp scale numerator, see TimecodeScale."
        },
        2807729: {
          name: "TimecodeScale",
          level: 2,
          type: "u",
          mandatory: true,
          minver: 1,
          "default": "1000000",
          description: "Timestamp scale in nanoseconds (1.000.000 means all timestamps in the segment are expressed in milliseconds)."
        },
        27045: {
          name: "ChapterTranslateID",
          level: 3,
          type: "b",
          mandatory: true,
          minver: 1,
          webm: false,
          description: "The binary value used to represent this segment in the chapter codec data. The format depends on the ChapProcessCodecID used."
        },
        27071: {
          name: "ChapterTranslateCodec",
          level: 3,
          type: "u",
          mandatory: true,
          minver: 1,
          webm: false,
          description: "The chapter codec using this ID (0: Matroska Script, 1: DVD-menu)."
        },
        27132: {
          name: "ChapterTranslateEditionUID",
          level: 3,
          type: "u",
          multiple: true,
          minver: 1,
          webm: false,
          description: "Specify an edition UID on which this correspondance applies. When not specified, it means for all editions found in the segment."
        },
        4096955: {
          name: "NextFilename",
          level: 2,
          type: "8",
          minver: 1,
          webm: false,
          description: "An escaped filename corresponding to the next segment."
        },
        4110627: {
          name: "NextUID",
          level: 2,
          type: "b",
          minver: 1,
          webm: false,
          bytesize: 16,
          description: "A unique ID to identify the next chained segment (128 bits)."
        },
        3965867: {
          name: "PrevFilename",
          level: 2,
          type: "8",
          minver: 1,
          webm: false,
          description: "An escaped filename corresponding to the previous segment."
        },
        3979555: {
          name: "PrevUID",
          level: 2,
          type: "b",
          minver: 1,
          webm: false,
          bytesize: 16,
          description: "A unique ID to identify the previous chained segment (128 bits)."
        },
        29604: {
          name: "SegmentUID",
          level: 2,
          type: "b",
          minver: 1,
          webm: false,
          range: "not 0",
          bytesize: 16,
          description: "A randomly generated unique ID to identify the current segment between many others (128 bits)."
        },
        357149030: {
          name: "Info",
          level: 1,
          type: "m",
          mandatory: true,
          multiple: true,
          minver: 1,
          description: "Contains miscellaneous general information and statistics on the file."
        },
        21420: {
          name: "SeekPosition",
          level: 3,
          type: "u",
          mandatory: true,
          minver: 1,
          description: "The position of the element in the segment in octets (0 = first level 1 element).",
          position: "segment"
        },
        21419: {
          name: "SeekID",
          level: 3,
          type: "b",
          mandatory: true,
          minver: 1,
          description: "The binary ID corresponding to the element name.",
          type2: "ebmlID"
        },
        19899: {
          name: "Seek",
          cppname: "SeekPoint",
          level: 2,
          type: "m",
          mandatory: true,
          multiple: true,
          minver: 1,
          description: "Contains a single seek entry to an EBML element."
        },
        290298740: {
          name: "SeekHead",
          cppname: "SeekHeader",
          level: 1,
          type: "m",
          multiple: true,
          minver: 1,
          description: "Contains the position of other level 1 elements."
        },
        32379: {
          name: "SignatureElementList",
          level: 2,
          type: "m",
          multiple: true,
          webm: false,
          i: "Cluster|Block|BlockAdditional",
          description: "A list consists of a number of consecutive elements that represent one case where data is used in signature. Ex:  means that the BlockAdditional of all Blocks in all Clusters is used for encryption."
        },
        32347: {
          name: "SignatureElements",
          level: 1,
          type: "m",
          webm: false,
          description: "Contains elements that will be used to compute the signature."
        },
        32437: {
          name: "Signature",
          level: 1,
          type: "b",
          webm: false,
          description: "The signature of the data (until a new."
        },
        32421: {
          name: "SignaturePublicKey",
          level: 1,
          type: "b",
          webm: false,
          description: "The public key to use with the algorithm (in the case of a PKI-based signature)."
        },
        32410: {
          name: "SignatureHash",
          level: 1,
          type: "u",
          webm: false,
          description: "Hash algorithm used (1=SHA1-160, 2=MD5)."
        },
        32394: {
          name: "SignatureAlgo",
          level: 1,
          type: "u",
          webm: false,
          description: "Signature algorithm used (1=RSA, 2=elliptic)."
        },
        458458727: {
          name: "SignatureSlot",
          level: -1,
          type: "m",
          multiple: true,
          webm: false,
          description: "Contain signature of some (coming) elements in the stream."
        },
        191: {
          name: "CRC-32",
          level: -1,
          type: "b",
          minver: 1,
          webm: false,
          description: "The CRC is computed on all the data of the Master element it's in. The CRC element should be the first in it's parent master for easier reading. All level 1 elements should include a CRC-32. The CRC in use is the IEEE CRC32 Little Endian",
          crc: true
        },
        236: {
          name: "Void",
          level: -1,
          type: "b",
          minver: 1,
          description: "Used to void damaged data, to avoid unexpected behaviors when using damaged data. The content is discarded. Also used to reserve space in a sub-element for later use."
        },
        17139: {
          name: "EBMLMaxSizeLength",
          level: 1,
          type: "u",
          mandatory: true,
          "default": 8,
          minver: 1,
          description: "The maximum length of the sizes you'll find in this file (8 or less in Matroska). This does not override the element size indicated at the beginning of an element. Elements that have an indicated size which is larger than what is allowed by EBMLMaxSizeLength shall be considered invalid."
        },
        17138: {
          name: "EBMLMaxIDLength",
          level: 1,
          type: "u",
          mandatory: true,
          "default": 4,
          minver: 1,
          description: "The maximum length of the IDs you'll find in this file (4 or less in Matroska)."
        },
        17143: {
          name: "EBMLReadVersion",
          level: 1,
          type: "u",
          mandatory: true,
          "default": 1,
          minver: 1,
          description: "The minimum EBML version a parser has to support to read this file."
        },
        440786851: {
          name: "EBML",
          level: "0",
          type: "m",
          mandatory: true,
          multiple: true,
          minver: 1,
          description: "Set the EBML characteristics of the data to follow. Each EBML document has to start with this."
        }
      };
      var byName = {};
      var schema = {
        byEbmlID,
        byName
      };
      for (ebmlID in byEbmlID) {
        desc = byEbmlID[ebmlID];
        byName[desc.name.replace("-", "_")] = parseInt(ebmlID, 10);
      }
      var desc;
      var ebmlID;
      module.exports = schema;
    }
  });

  // node_modules/ts-ebml/lib/EBMLEncoder.js
  var require_EBMLEncoder = __commonJS({
    "node_modules/ts-ebml/lib/EBMLEncoder.js"(exports) {
      "use strict";
      init_esbuild_inject();
      Object.defineProperty(exports, "__esModule", { value: true });
      var tools = require_tools2();
      var tools_1 = require_tools2();
      var schema = require_schema();
      var byEbmlID = schema.byEbmlID;
      var EBMLEncoder = function() {
        function EBMLEncoder2() {
          this._schema = byEbmlID;
          this._buffers = [];
          this._stack = [];
        }
        EBMLEncoder2.prototype.encode = function(elms) {
          var _this = this;
          return tools.concat(elms.reduce(function(lst, elm) {
            return lst.concat(_this.encodeChunk(elm));
          }, [])).buffer;
        };
        EBMLEncoder2.prototype.encodeChunk = function(elm) {
          if (elm.type === "m") {
            if (!elm.isEnd) {
              this.startTag(elm);
            } else {
              this.endTag(elm);
            }
          } else {
            this.writeTag(elm);
          }
          return this.flush();
        };
        EBMLEncoder2.prototype.flush = function() {
          var ret = this._buffers;
          this._buffers = [];
          return ret;
        };
        EBMLEncoder2.prototype.getSchemaInfo = function(tagName) {
          var tagNums = Object.keys(this._schema).map(Number);
          for (var i = 0; i < tagNums.length; i++) {
            var tagNum = tagNums[i];
            if (this._schema[tagNum].name === tagName) {
              return new tools_1.Buffer(tagNum.toString(16), "hex");
            }
          }
          return null;
        };
        EBMLEncoder2.prototype.writeTag = function(elm) {
          var tagName = elm.name;
          var tagId = this.getSchemaInfo(tagName);
          var tagData = elm.data;
          if (tagId == null) {
            throw new Error("No schema entry found for " + tagName);
          }
          var data = tools.encodeTag(tagId, tagData);
          if (this._stack.length > 0) {
            var last = this._stack[this._stack.length - 1];
            last.children.push({
              tagId,
              elm,
              children: [],
              data
            });
            return;
          }
          this._buffers = this._buffers.concat(data);
          return;
        };
        EBMLEncoder2.prototype.startTag = function(elm) {
          var tagName = elm.name;
          var tagId = this.getSchemaInfo(tagName);
          if (tagId == null) {
            throw new Error("No schema entry found for " + tagName);
          }
          if (elm.unknownSize) {
            var data = tools.encodeTag(tagId, new tools_1.Buffer(0), elm.unknownSize);
            this._buffers = this._buffers.concat(data);
            return;
          }
          var tag = {
            tagId,
            elm,
            children: [],
            data: null
          };
          if (this._stack.length > 0) {
            this._stack[this._stack.length - 1].children.push(tag);
          }
          this._stack.push(tag);
        };
        EBMLEncoder2.prototype.endTag = function(elm) {
          var tagName = elm.name;
          var tag = this._stack.pop();
          if (tag == null) {
            throw new Error("EBML structure is broken");
          }
          if (tag.elm.name !== elm.name) {
            throw new Error("EBML structure is broken");
          }
          var childTagDataBuffers = tag.children.reduce(function(lst, child) {
            if (child.data === null) {
              throw new Error("EBML structure is broken");
            }
            return lst.concat(child.data);
          }, []);
          var childTagDataBuffer = tools.concat(childTagDataBuffers);
          if (tag.elm.type === "m") {
            tag.data = tools.encodeTag(tag.tagId, childTagDataBuffer, tag.elm.unknownSize);
          } else {
            tag.data = tools.encodeTag(tag.tagId, childTagDataBuffer);
          }
          if (this._stack.length < 1) {
            this._buffers = this._buffers.concat(tag.data);
          }
        };
        return EBMLEncoder2;
      }();
      exports.default = EBMLEncoder;
    }
  });

  // node_modules/ts-ebml/node_modules/buffer/index.js
  var require_buffer2 = __commonJS({
    "node_modules/ts-ebml/node_modules/buffer/index.js"(exports) {
      "use strict";
      init_esbuild_inject();
      var base64 = require_base64_js();
      var ieee7542 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer9;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer9.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer9.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
      }
      function typedArraySupport() {
        try {
          var arr = new Uint8Array(1);
          var proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer9.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer9.isBuffer(this))
            return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer9.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer9.isBuffer(this))
            return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        var buf2 = new Uint8Array(length);
        Object.setPrototypeOf(buf2, Buffer9.prototype);
        return buf2;
      }
      function Buffer9(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError('The "string" argument must be of type string. Received type number');
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer9.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError('The "value" argument must not be of type number. Received type number');
        }
        var valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer9.from(valueOf, encodingOrOffset, length);
        }
        var b = fromObject(value);
        if (b)
          return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer9.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
      }
      Buffer9.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer9.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer9, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer9.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer9.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer9.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer9.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        var length = byteLength(string, encoding) | 0;
        var buf2 = createBuffer(length);
        var actual = buf2.write(string, encoding);
        if (actual !== length) {
          buf2 = buf2.slice(0, actual);
        }
        return buf2;
      }
      function fromArrayLike(array) {
        var length = array.length < 0 ? 0 : checked(array.length) | 0;
        var buf2 = createBuffer(length);
        for (var i = 0; i < length; i += 1) {
          buf2[i] = array[i] & 255;
        }
        return buf2;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          var copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        var buf2;
        if (byteOffset === void 0 && length === void 0) {
          buf2 = new Uint8Array(array);
        } else if (length === void 0) {
          buf2 = new Uint8Array(array, byteOffset);
        } else {
          buf2 = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf2, Buffer9.prototype);
        return buf2;
      }
      function fromObject(obj) {
        if (Buffer9.isBuffer(obj)) {
          var len = checked(obj.length) | 0;
          var buf2 = createBuffer(len);
          if (buf2.length === 0) {
            return buf2;
          }
          obj.copy(buf2, 0, 0, len);
          return buf2;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer9.alloc(+length);
      }
      Buffer9.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer9.prototype;
      };
      Buffer9.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array))
          a = Buffer9.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array))
          b = Buffer9.from(b, b.offset, b.byteLength);
        if (!Buffer9.isBuffer(a) || !Buffer9.isBuffer(b)) {
          throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
        }
        if (a === b)
          return 0;
        var x = a.length;
        var y = b.length;
        for (var i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      Buffer9.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer9.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer9.alloc(0);
        }
        var i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        var buffer = Buffer9.allocUnsafe(length);
        var pos = 0;
        for (i = 0; i < list.length; ++i) {
          var buf2 = list[i];
          if (isInstance(buf2, Uint8Array)) {
            if (pos + buf2.length > buffer.length) {
              Buffer9.from(buf2).copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(buffer, buf2, pos);
            }
          } else if (!Buffer9.isBuffer(buf2)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf2.copy(buffer, pos);
          }
          pos += buf2.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer9.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
        }
        var len = string.length;
        var mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0)
          return 0;
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer9.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        var loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding)
          encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer9.prototype._isBuffer = true;
      function swap(b, n, m) {
        var i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer9.prototype.swap16 = function swap16() {
        var len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (var i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer9.prototype.swap32 = function swap32() {
        var len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (var i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer9.prototype.swap64 = function swap64() {
        var len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (var i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer9.prototype.toString = function toString() {
        var length = this.length;
        if (length === 0)
          return "";
        if (arguments.length === 0)
          return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer9.prototype.toLocaleString = Buffer9.prototype.toString;
      Buffer9.prototype.equals = function equals(b) {
        if (!Buffer9.isBuffer(b))
          throw new TypeError("Argument must be a Buffer");
        if (this === b)
          return true;
        return Buffer9.compare(this, b) === 0;
      };
      Buffer9.prototype.inspect = function inspect() {
        var str = "";
        var max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max)
          str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer9.prototype[customInspectSymbol] = Buffer9.prototype.inspect;
      }
      Buffer9.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer9.from(target, target.offset, target.byteLength);
        }
        if (!Buffer9.isBuffer(target)) {
          throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target)
          return 0;
        var x = thisEnd - thisStart;
        var y = end - start;
        var len = Math.min(x, y);
        var thisCopy = this.slice(thisStart, thisEnd);
        var targetCopy = target.slice(start, end);
        for (var i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0)
          return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0)
          byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir)
            return -1;
          else
            byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir)
            byteOffset = 0;
          else
            return -1;
        }
        if (typeof val === "string") {
          val = Buffer9.from(val, encoding);
        }
        if (Buffer9.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        var indexSize = 1;
        var arrLength = arr.length;
        var valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read2(buf2, i2) {
          if (indexSize === 1) {
            return buf2[i2];
          } else {
            return buf2.readUInt16BE(i2 * indexSize);
          }
        }
        var i;
        if (dir) {
          var foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1)
                foundIndex = i;
              if (i - foundIndex + 1 === valLength)
                return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1)
                i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength)
            byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            var found = true;
            for (var j = 0; j < valLength; j++) {
              if (read2(arr, i + j) !== read2(val, j)) {
                found = false;
                break;
              }
            }
            if (found)
              return i;
          }
        }
        return -1;
      }
      Buffer9.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer9.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer9.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf2, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf2.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        var strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        for (var i = 0; i < length; ++i) {
          var parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed))
            return i;
          buf2[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf2, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf2.length - offset), buf2, offset, length);
      }
      function asciiWrite(buf2, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf2, offset, length);
      }
      function base64Write(buf2, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf2, offset, length);
      }
      function ucs2Write(buf2, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf2.length - offset), buf2, offset, length);
      }
      Buffer9.prototype.write = function write2(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0)
              encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        }
        var remaining = this.length - offset;
        if (length === void 0 || length > remaining)
          length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding)
          encoding = "utf8";
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer9.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf2, start, end) {
        if (start === 0 && end === buf2.length) {
          return base64.fromByteArray(buf2);
        } else {
          return base64.fromByteArray(buf2.slice(start, end));
        }
      }
      function utf8Slice(buf2, start, end) {
        end = Math.min(buf2.length, end);
        var res = [];
        var i = start;
        while (i < end) {
          var firstByte = buf2[i];
          var codePoint = null;
          var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf2[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf2[i + 1];
                thirdByte = buf2[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf2[i + 1];
                thirdByte = buf2[i + 2];
                fourthByte = buf2[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        var len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        var res = "";
        var i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
        }
        return res;
      }
      function asciiSlice(buf2, start, end) {
        var ret = "";
        end = Math.min(buf2.length, end);
        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf2[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf2, start, end) {
        var ret = "";
        end = Math.min(buf2.length, end);
        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf2[i]);
        }
        return ret;
      }
      function hexSlice(buf2, start, end) {
        var len = buf2.length;
        if (!start || start < 0)
          start = 0;
        if (!end || end < 0 || end > len)
          end = len;
        var out = "";
        for (var i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf2[i]];
        }
        return out;
      }
      function utf16leSlice(buf2, start, end) {
        var bytes = buf2.slice(start, end);
        var res = "";
        for (var i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer9.prototype.slice = function slice(start, end) {
        var len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0)
            start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0)
            end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start)
          end = start;
        var newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer9.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0)
          throw new RangeError("offset is not uint");
        if (offset + ext > length)
          throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer9.prototype.readUintLE = Buffer9.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer9.prototype.readUintBE = Buffer9.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        var val = this[offset + --byteLength2];
        var mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer9.prototype.readUint8 = Buffer9.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer9.prototype.readUint16LE = Buffer9.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer9.prototype.readUint16BE = Buffer9.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer9.prototype.readUint32LE = Buffer9.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer9.prototype.readUint32BE = Buffer9.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer9.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer9.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        var i = byteLength2;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer9.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128))
          return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer9.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer9.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer9.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer9.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer9.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee7542.read(this, offset, true, 23, 4);
      };
      Buffer9.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee7542.read(this, offset, false, 23, 4);
      };
      Buffer9.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee7542.read(this, offset, true, 52, 8);
      };
      Buffer9.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee7542.read(this, offset, false, 52, 8);
      };
      function checkInt(buf2, value, offset, ext, max, min) {
        if (!Buffer9.isBuffer(buf2))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min)
          throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf2.length)
          throw new RangeError("Index out of range");
      }
      Buffer9.prototype.writeUintLE = Buffer9.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        var mul = 1;
        var i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer9.prototype.writeUintBE = Buffer9.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        var i = byteLength2 - 1;
        var mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer9.prototype.writeUint8 = Buffer9.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer9.prototype.writeUint16LE = Buffer9.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer9.prototype.writeUint16BE = Buffer9.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer9.prototype.writeUint32LE = Buffer9.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer9.prototype.writeUint32BE = Buffer9.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer9.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        var i = 0;
        var mul = 1;
        var sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer9.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        var i = byteLength2 - 1;
        var mul = 1;
        var sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer9.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 127, -128);
        if (value < 0)
          value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer9.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer9.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer9.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer9.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0)
          value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function checkIEEE754(buf2, value, offset, ext, max, min) {
        if (offset + ext > buf2.length)
          throw new RangeError("Index out of range");
        if (offset < 0)
          throw new RangeError("Index out of range");
      }
      function writeFloat(buf2, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf2, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee7542.write(buf2, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer9.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer9.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf2, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf2, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee7542.write(buf2, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer9.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer9.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer9.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer9.isBuffer(target))
          throw new TypeError("argument should be a Buffer");
        if (!start)
          start = 0;
        if (!end && end !== 0)
          end = this.length;
        if (targetStart >= target.length)
          targetStart = target.length;
        if (!targetStart)
          targetStart = 0;
        if (end > 0 && end < start)
          end = start;
        if (end === start)
          return 0;
        if (target.length === 0 || this.length === 0)
          return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length)
          throw new RangeError("Index out of range");
        if (end < 0)
          throw new RangeError("sourceEnd out of bounds");
        if (end > this.length)
          end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        var len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
        }
        return len;
      };
      Buffer9.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer9.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            var code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val)
          val = 0;
        var i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          var bytes = Buffer9.isBuffer(val) ? val : Buffer9.from(val, encoding);
          var len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2)
          return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        var codePoint;
        var length = string.length;
        var leadSurrogate = null;
        var bytes = [];
        for (var i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0)
              break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0)
              break;
            bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0)
              break;
            bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0)
              break;
            bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0)
            break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        for (var i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length)
            break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = function() {
        var alphabet = "0123456789abcdef";
        var table = new Array(256);
        for (var i = 0; i < 16; ++i) {
          var i16 = i * 16;
          for (var j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      }();
    }
  });

  // node_modules/ebml/lib/ebml/tools.js
  var require_tools = __commonJS({
    "node_modules/ebml/lib/ebml/tools.js"(exports, module) {
      init_esbuild_inject();
      var tools = {
        readVint: function(buffer, start) {
          start = start || 0;
          for (var length = 1; length <= 8; length++) {
            if (buffer[start] >= Math.pow(2, 8 - length)) {
              break;
            }
          }
          if (length > 8) {
            throw new Error("Unrepresentable length: " + length + " " + buffer.toString("hex", start, start + length));
          }
          if (start + length > buffer.length) {
            return null;
          }
          var value = buffer[start] & (1 << 8 - length) - 1;
          for (var i = 1; i < length; i++) {
            if (i === 7) {
              if (value >= Math.pow(2, 53 - 8) && buffer[start + 7] > 0) {
                return {
                  length,
                  value: -1
                };
              }
            }
            value *= Math.pow(2, 8);
            value += buffer[start + i];
          }
          return {
            length,
            value
          };
        },
        writeVint: function(value) {
          if (value < 0 || value > Math.pow(2, 53)) {
            throw new Error("Unrepresentable value: " + value);
          }
          for (var length = 1; length <= 8; length++) {
            if (value < Math.pow(2, 7 * length) - 1) {
              break;
            }
          }
          var buffer = new Buffer2(length);
          for (var i = 1; i <= length; i++) {
            var b = value & 255;
            buffer[length - i] = b;
            value -= b;
            value /= Math.pow(2, 8);
          }
          buffer[0] = buffer[0] | 1 << 8 - length;
          return buffer;
        }
      };
      module.exports = tools;
    }
  });

  // node_modules/ebml-block/lib/vint.js
  var require_vint = __commonJS({
    "node_modules/ebml-block/lib/vint.js"(exports, module) {
      init_esbuild_inject();
      module.exports = function(buffer, start, signed) {
        start = start || 0;
        for (var length = 1; length <= 8; length++) {
          if (buffer[start] >= Math.pow(2, 8 - length)) {
            break;
          }
        }
        if (length > 8) {
          throw new Error("Unrepresentable length: " + length + " " + buffer.toString("hex", start, start + length));
        }
        if (start + length > buffer.length) {
          return null;
        }
        var i;
        var value = buffer[start] & (1 << 8 - length) - 1;
        for (i = 1; i < length; i++) {
          if (i === 7) {
            if (value >= Math.pow(2, 53 - 8) && buffer[start + 7] > 0) {
              return {
                length,
                value: -1
              };
            }
          }
          value *= Math.pow(2, 8);
          value += buffer[start + i];
        }
        if (signed) {
          value -= Math.pow(2, length * 7 - 1) - 1;
        }
        return {
          length,
          value
        };
      };
    }
  });

  // node_modules/ebml-block/lib/buffer-reader.js
  var require_buffer_reader = __commonJS({
    "node_modules/ebml-block/lib/buffer-reader.js"(exports, module) {
      init_esbuild_inject();
      var vint = require_vint();
      function BufferReader(buffer) {
        this.buffer = buffer;
        this.offset = 0;
      }
      BufferReader.prototype.nextInt16BE = function() {
        var value = this.buffer.readInt16BE(this.offset);
        this.offset += 2;
        return value;
      };
      BufferReader.prototype.nextUInt8 = function() {
        var value = this.buffer.readUInt8(this.offset);
        this.offset += 1;
        return value;
      };
      BufferReader.prototype.nextUIntV = function() {
        var v = vint(this.buffer, this.offset);
        this.offset += v.length;
        return v.value;
      };
      BufferReader.prototype.nextIntV = function() {
        var v = vint(this.buffer, this.offset, true);
        this.offset += v.length;
        return v.value;
      };
      BufferReader.prototype.nextBuffer = function(length) {
        var buffer = length ? this.buffer.slice(this.offset, this.offset + length) : this.buffer.slice(this.offset);
        this.offset += length || this.length;
        return buffer;
      };
      Object.defineProperty(BufferReader.prototype, "length", {
        get: function() {
          return this.buffer.length - this.offset;
        }
      });
      module.exports = BufferReader;
    }
  });

  // node_modules/ebml-block/index.js
  var require_ebml_block = __commonJS({
    "node_modules/ebml-block/index.js"(exports, module) {
      init_esbuild_inject();
      var BufferReader = require_buffer_reader();
      var XIPH_LACING = 1;
      var EBML_LACING = 3;
      var FIXED_SIZE_LACING = 2;
      module.exports = function(buffer) {
        var block = {};
        var reader = new BufferReader(buffer);
        block.trackNumber = reader.nextUIntV();
        block.timecode = reader.nextInt16BE();
        var flags = reader.nextUInt8();
        block.invisible = !!(flags & 8);
        block.keyframe = !!(flags & 128);
        block.discardable = !!(flags & 1);
        var lacing = (flags & 6) >> 1;
        block.frames = readLacedData(reader, lacing);
        return block;
      };
      function readLacedData(reader, lacing) {
        if (!lacing)
          return [reader.nextBuffer()];
        var i, frameSize;
        var frames = [];
        var framesNum = reader.nextUInt8() + 1;
        if (lacing === FIXED_SIZE_LACING) {
          if (reader.length % framesNum !== 0)
            throw new Error("Fixed-Size Lacing Error");
          frameSize = reader.length / framesNum;
          for (i = 0; i < framesNum; i++) {
            frames.push(reader.nextBuffer(frameSize));
          }
          return frames;
        }
        var frameSizes = [];
        if (lacing === XIPH_LACING) {
          for (i = 0; i < framesNum - 1; i++) {
            var val;
            frameSize = 0;
            do {
              val = reader.nextUInt8();
              frameSize += val;
            } while (val === 255);
            frameSizes.push(frameSize);
          }
        } else if (lacing === EBML_LACING) {
          frameSize = reader.nextUIntV();
          frameSizes.push(frameSize);
          for (i = 1; i < framesNum - 1; i++) {
            frameSize += reader.nextIntV();
            frameSizes.push(frameSize);
          }
        }
        for (i = 0; i < framesNum - 1; i++) {
          frames.push(reader.nextBuffer(frameSizes[i]));
        }
        frames.push(reader.nextBuffer());
        return frames;
      }
    }
  });

  // node_modules/ts-ebml/lib/tools.js
  var require_tools2 = __commonJS({
    "node_modules/ts-ebml/lib/tools.js"(exports) {
      "use strict";
      init_esbuild_inject();
      Object.defineProperty(exports, "__esModule", { value: true });
      var int64_buffer_1 = require_int64_buffer();
      var EBMLEncoder_1 = require_EBMLEncoder();
      var _Buffer = require_buffer2();
      var _tools = require_tools();
      var _block = require_ebml_block();
      exports.Buffer = _Buffer.Buffer;
      exports.readVint = _tools.readVint;
      exports.writeVint = _tools.writeVint;
      exports.ebmlBlock = _block;
      function readBlock(buf2) {
        return exports.ebmlBlock(new exports.Buffer(buf2));
      }
      exports.readBlock = readBlock;
      function encodeTag(tagId, tagData, unknownSize) {
        if (unknownSize === void 0) {
          unknownSize = false;
        }
        return concat([
          tagId,
          unknownSize ? new exports.Buffer("01ffffffffffffff", "hex") : exports.writeVint(tagData.length),
          tagData
        ]);
      }
      exports.encodeTag = encodeTag;
      function WebPFrameFilter(elms) {
        return WebPBlockFilter(elms).reduce(function(lst, elm) {
          var o = exports.ebmlBlock(elm.data);
          return o.frames.reduce(function(lst2, frame) {
            var webpBuf = VP8BitStreamToRiffWebPBuffer(frame);
            var webp = new Blob([webpBuf], { type: "image/webp" });
            return lst2.concat(webp);
          }, lst);
        }, []);
      }
      exports.WebPFrameFilter = WebPFrameFilter;
      function WebPBlockFilter(elms) {
        return elms.reduce(function(lst, elm) {
          if (elm.type !== "b") {
            return lst;
          }
          if (elm.name !== "SimpleBlock") {
            return lst;
          }
          var o = exports.ebmlBlock(elm.data);
          var hasWebP = o.frames.some(function(frame) {
            var startcode = frame.slice(3, 6).toString("hex");
            return startcode === "9d012a";
          });
          if (!hasWebP) {
            return lst;
          }
          return lst.concat(elm);
        }, []);
      }
      exports.WebPBlockFilter = WebPBlockFilter;
      function VP8BitStreamToRiffWebPBuffer(frame) {
        var VP8Chunk = createRIFFChunk("VP8 ", frame);
        var WebPChunk = concat([
          new exports.Buffer("WEBP", "ascii"),
          VP8Chunk
        ]);
        return createRIFFChunk("RIFF", WebPChunk);
      }
      exports.VP8BitStreamToRiffWebPBuffer = VP8BitStreamToRiffWebPBuffer;
      function createRIFFChunk(FourCC, chunk) {
        var chunkSize = new exports.Buffer(4);
        chunkSize.writeUInt32LE(chunk.byteLength, 0);
        return concat([
          new exports.Buffer(FourCC.substr(0, 4), "ascii"),
          chunkSize,
          chunk,
          new exports.Buffer(chunk.byteLength % 2 === 0 ? 0 : 1)
        ]);
      }
      exports.createRIFFChunk = createRIFFChunk;
      function makeMetadataSeekable(originalMetadata, duration, cuesInfo) {
        var header = extractElement("EBML", originalMetadata);
        var headerSize = encodedSizeOfEbml(header);
        var segmentContentStartPos = headerSize + 12;
        var originalMetadataSize = originalMetadata[originalMetadata.length - 1].dataEnd - segmentContentStartPos;
        var info = extractElement("Info", originalMetadata);
        removeElement("Duration", info);
        info.splice(1, 0, { name: "Duration", type: "f", data: createFloatBuffer(duration, 8) });
        var infoSize = encodedSizeOfEbml(info);
        var tracks = extractElement("Tracks", originalMetadata);
        var tracksSize = encodedSizeOfEbml(tracks);
        var seekHeadSize = 47;
        var seekHead = [];
        var cuesSize = 5 + cuesInfo.length * 15;
        var cues = [];
        var lastSizeDifference = -1;
        var maxIterations = 10;
        var _loop_1 = function(i2) {
          var infoStart = seekHeadSize;
          var tracksStart = infoStart + infoSize;
          var cuesStart = tracksStart + tracksSize;
          var newMetadataSize = cuesStart + cuesSize;
          var sizeDifference = newMetadataSize - originalMetadataSize;
          seekHead = [];
          seekHead.push({ name: "SeekHead", type: "m", isEnd: false });
          seekHead.push({ name: "Seek", type: "m", isEnd: false });
          seekHead.push({ name: "SeekID", type: "b", data: new exports.Buffer([21, 73, 169, 102]) });
          seekHead.push({ name: "SeekPosition", type: "u", data: createUIntBuffer(infoStart) });
          seekHead.push({ name: "Seek", type: "m", isEnd: true });
          seekHead.push({ name: "Seek", type: "m", isEnd: false });
          seekHead.push({ name: "SeekID", type: "b", data: new exports.Buffer([22, 84, 174, 107]) });
          seekHead.push({ name: "SeekPosition", type: "u", data: createUIntBuffer(tracksStart) });
          seekHead.push({ name: "Seek", type: "m", isEnd: true });
          seekHead.push({ name: "Seek", type: "m", isEnd: false });
          seekHead.push({ name: "SeekID", type: "b", data: new exports.Buffer([28, 83, 187, 107]) });
          seekHead.push({ name: "SeekPosition", type: "u", data: createUIntBuffer(cuesStart) });
          seekHead.push({ name: "Seek", type: "m", isEnd: true });
          seekHead.push({ name: "SeekHead", type: "m", isEnd: true });
          seekHeadSize = encodedSizeOfEbml(seekHead);
          cues = [];
          cues.push({ name: "Cues", type: "m", isEnd: false });
          cuesInfo.forEach(function(_a) {
            var CueTrack = _a.CueTrack, CueClusterPosition = _a.CueClusterPosition, CueTime = _a.CueTime;
            cues.push({ name: "CuePoint", type: "m", isEnd: false });
            cues.push({ name: "CueTime", type: "u", data: createUIntBuffer(CueTime) });
            cues.push({ name: "CueTrackPositions", type: "m", isEnd: false });
            cues.push({ name: "CueTrack", type: "u", data: createUIntBuffer(CueTrack) });
            CueClusterPosition -= segmentContentStartPos;
            CueClusterPosition += sizeDifference;
            cues.push({ name: "CueClusterPosition", type: "u", data: createUIntBuffer(CueClusterPosition) });
            cues.push({ name: "CueTrackPositions", type: "m", isEnd: true });
            cues.push({ name: "CuePoint", type: "m", isEnd: true });
          });
          cues.push({ name: "Cues", type: "m", isEnd: true });
          cuesSize = encodedSizeOfEbml(cues);
          if (lastSizeDifference !== sizeDifference) {
            lastSizeDifference = sizeDifference;
            if (i2 === maxIterations - 1) {
              throw new Error("Failed to converge to a stable metadata size");
            }
          } else {
            return "break";
          }
        };
        for (var i = 0; i < maxIterations; i++) {
          var state_1 = _loop_1(i);
          if (state_1 === "break")
            break;
        }
        var finalMetadata = [].concat.apply([], [
          header,
          { name: "Segment", type: "m", isEnd: false, unknownSize: true },
          seekHead,
          info,
          tracks,
          cues
        ]);
        var result = new EBMLEncoder_1.default().encode(finalMetadata);
        return result;
      }
      exports.makeMetadataSeekable = makeMetadataSeekable;
      function removeElement(idName, metadata) {
        var result = [];
        var start = -1;
        for (var i = 0; i < metadata.length; i++) {
          var element = metadata[i];
          if (element.name === idName) {
            if (element.type === "m") {
              if (!element.isEnd) {
                start = i;
              } else {
                if (start == -1)
                  throw new Error("Detected " + idName + " closing element before finding the start");
                metadata.splice(start, i - start + 1);
                return;
              }
            } else {
              metadata.splice(i, 1);
              return;
            }
          }
        }
      }
      exports.removeElement = removeElement;
      function extractElement(idName, metadata) {
        var result = [];
        var start = -1;
        for (var i = 0; i < metadata.length; i++) {
          var element = metadata[i];
          if (element.name === idName) {
            if (element.type === "m") {
              if (!element.isEnd) {
                start = i;
              } else {
                if (start == -1)
                  throw new Error("Detected " + idName + " closing element before finding the start");
                result = metadata.slice(start, i + 1);
                break;
              }
            } else {
              result.push(metadata[i]);
              break;
            }
          }
        }
        return result;
      }
      exports.extractElement = extractElement;
      function putRefinedMetaData(metadata, info) {
        if (Array.isArray(info.cueInfos) && !Array.isArray(info.cues)) {
          console.warn("putRefinedMetaData: info.cueInfos property is deprecated. please use info.cues");
          info.cues = info.cueInfos;
        }
        var ebml2 = [];
        var payload = [];
        for (var i_1 = 0; i_1 < metadata.length; i_1++) {
          var elm = metadata[i_1];
          if (elm.type === "m" && elm.name === "Segment") {
            ebml2 = metadata.slice(0, i_1);
            payload = metadata.slice(i_1);
            if (elm.unknownSize) {
              payload.shift();
              break;
            }
            throw new Error("this metadata is not streaming webm file");
          }
        }
        if (!(payload[payload.length - 1].dataEnd > 0)) {
          throw new Error("metadata dataEnd has wrong number");
        }
        var originalPayloadOffsetEnd = payload[payload.length - 1].dataEnd;
        var ebmlSize = ebml2[ebml2.length - 1].dataEnd;
        var refinedEBMLSize = new EBMLEncoder_1.default().encode(ebml2).byteLength;
        var offsetDiff = refinedEBMLSize - ebmlSize;
        var payloadSize = originalPayloadOffsetEnd - payload[0].tagStart;
        var segmentSize = payload[0].tagStart - ebmlSize;
        var segmentOffset = payload[0].tagStart;
        var segmentTagBuf = new exports.Buffer([24, 83, 128, 103]);
        var segmentSizeBuf = new exports.Buffer("01ffffffffffffff", "hex");
        var _segmentSize = segmentTagBuf.byteLength + segmentSizeBuf.byteLength;
        var newPayloadSize = payloadSize;
        var i;
        for (i = 1; i < 20; i++) {
          var newPayloadOffsetEnd = ebmlSize + _segmentSize + newPayloadSize;
          var offsetEndDiff = newPayloadOffsetEnd - originalPayloadOffsetEnd;
          var sizeDiff = offsetDiff + offsetEndDiff;
          var refined = refineMetadata(payload, sizeDiff, info);
          var newNewRefinedSize = new EBMLEncoder_1.default().encode(refined).byteLength;
          if (newNewRefinedSize === newPayloadSize) {
            return new EBMLEncoder_1.default().encode([].concat(ebml2, [{ type: "m", name: "Segment", isEnd: false, unknownSize: true }], refined));
          }
          newPayloadSize = newNewRefinedSize;
        }
        throw new Error("unable to refine metadata, stable size could not be found in " + i + " iterations!");
      }
      exports.putRefinedMetaData = putRefinedMetaData;
      function encodedSizeOfEbml(refinedMetaData) {
        var encorder = new EBMLEncoder_1.default();
        return refinedMetaData.reduce(function(lst, elm) {
          return lst.concat(encorder.encode([elm]));
        }, []).reduce(function(o, buf2) {
          return o + buf2.byteLength;
        }, 0);
      }
      function refineMetadata(mesetadata, sizeDiff, info) {
        var duration = info.duration, clusterPtrs = info.clusterPtrs, cues = info.cues;
        var _metadata = mesetadata.slice(0);
        if (typeof duration === "number") {
          var overwrited_1 = false;
          _metadata.forEach(function(elm) {
            if (elm.type === "f" && elm.name === "Duration") {
              overwrited_1 = true;
              elm.data = createFloatBuffer(duration, 8);
            }
          });
          if (!overwrited_1) {
            insertTag(_metadata, "Info", [{ name: "Duration", type: "f", data: createFloatBuffer(duration, 8) }]);
          }
        }
        if (Array.isArray(cues)) {
          insertTag(_metadata, "Cues", create_cue(cues, sizeDiff));
        }
        var seekhead_children = [];
        if (Array.isArray(clusterPtrs)) {
          console.warn("append cluster pointers to seekhead is deprecated. please use cues");
          seekhead_children = create_seek_from_clusters(clusterPtrs, sizeDiff);
        }
        insertTag(_metadata, "SeekHead", seekhead_children, true);
        return _metadata;
      }
      function create_seek_from_clusters(clusterPtrs, sizeDiff) {
        var seeks = [];
        clusterPtrs.forEach(function(start) {
          seeks.push({ name: "Seek", type: "m", isEnd: false });
          seeks.push({ name: "SeekID", type: "b", data: new exports.Buffer([31, 67, 182, 117]) });
          seeks.push({ name: "SeekPosition", type: "u", data: createUIntBuffer(start + sizeDiff) });
          seeks.push({ name: "Seek", type: "m", isEnd: true });
        });
        return seeks;
      }
      function create_cue(cueInfos, sizeDiff) {
        var cues = [];
        cueInfos.forEach(function(_a) {
          var CueTrack = _a.CueTrack, CueClusterPosition = _a.CueClusterPosition, CueTime = _a.CueTime;
          cues.push({ name: "CuePoint", type: "m", isEnd: false });
          cues.push({ name: "CueTime", type: "u", data: createUIntBuffer(CueTime) });
          cues.push({ name: "CueTrackPositions", type: "m", isEnd: false });
          cues.push({ name: "CueTrack", type: "u", data: createUIntBuffer(CueTrack) });
          cues.push({ name: "CueClusterPosition", type: "u", data: createUIntBuffer(CueClusterPosition + sizeDiff) });
          cues.push({ name: "CueTrackPositions", type: "m", isEnd: true });
          cues.push({ name: "CuePoint", type: "m", isEnd: true });
        });
        return cues;
      }
      function insertTag(_metadata, tagName, children, insertHead) {
        if (insertHead === void 0) {
          insertHead = false;
        }
        var idx = -1;
        for (var i = 0; i < _metadata.length; i++) {
          var elm = _metadata[i];
          if (elm.type === "m" && elm.name === tagName && elm.isEnd === false) {
            idx = i;
            break;
          }
        }
        if (idx >= 0) {
          Array.prototype.splice.apply(_metadata, [idx + 1, 0].concat(children));
        } else if (insertHead) {
          [].concat([{ name: tagName, type: "m", isEnd: false }], children, [{ name: tagName, type: "m", isEnd: true }]).reverse().forEach(function(elm2) {
            _metadata.unshift(elm2);
          });
        } else {
          _metadata.push({ name: tagName, type: "m", isEnd: false });
          children.forEach(function(elm2) {
            _metadata.push(elm2);
          });
          _metadata.push({ name: tagName, type: "m", isEnd: true });
        }
      }
      function concat(list) {
        var i = 0;
        var length = 0;
        for (; i < list.length; ++i) {
          length += list[i].length;
        }
        var buffer = exports.Buffer.allocUnsafe(length);
        var pos = 0;
        for (i = 0; i < list.length; ++i) {
          var buf2 = list[i];
          buf2.copy(buffer, pos);
          pos += buf2.length;
        }
        return buffer;
      }
      exports.concat = concat;
      function encodeValueToBuffer(elm) {
        var data = new exports.Buffer(0);
        if (elm.type === "m") {
          return elm;
        }
        switch (elm.type) {
          case "u":
            data = createUIntBuffer(elm.value);
            break;
          case "i":
            data = createIntBuffer(elm.value);
            break;
          case "f":
            data = createFloatBuffer(elm.value);
            break;
          case "s":
            data = new exports.Buffer(elm.value, "ascii");
            break;
          case "8":
            data = new exports.Buffer(elm.value, "utf8");
            break;
          case "b":
            data = elm.value;
            break;
          case "d":
            data = new int64_buffer_1.Int64BE(elm.value.getTime().toString()).toBuffer();
            break;
        }
        return Object.assign({}, elm, { data });
      }
      exports.encodeValueToBuffer = encodeValueToBuffer;
      function createUIntBuffer(value) {
        var bytes = 1;
        for (; value >= Math.pow(2, 8 * bytes); bytes++) {
        }
        if (bytes >= 7) {
          console.warn("7bit or more bigger uint not supported.");
          return new int64_buffer_1.Uint64BE(value).toBuffer();
        }
        var data = new exports.Buffer(bytes);
        data.writeUIntBE(value, 0, bytes);
        return data;
      }
      exports.createUIntBuffer = createUIntBuffer;
      function createIntBuffer(value) {
        var bytes = 1;
        for (; value >= Math.pow(2, 8 * bytes); bytes++) {
        }
        if (bytes >= 7) {
          console.warn("7bit or more bigger uint not supported.");
          return new int64_buffer_1.Int64BE(value).toBuffer();
        }
        var data = new exports.Buffer(bytes);
        data.writeIntBE(value, 0, bytes);
        return data;
      }
      exports.createIntBuffer = createIntBuffer;
      function createFloatBuffer(value, bytes) {
        if (bytes === void 0) {
          bytes = 8;
        }
        if (bytes === 8) {
          var data = new exports.Buffer(8);
          data.writeDoubleBE(value, 0);
          return data;
        } else if (bytes === 4) {
          var data = new exports.Buffer(4);
          data.writeFloatBE(value, 0);
          return data;
        } else {
          throw new Error("float type bits must 4bytes or 8bytes");
        }
      }
      exports.createFloatBuffer = createFloatBuffer;
      function convertEBMLDateToJSDate(int64str) {
        if (int64str instanceof Date) {
          return int64str;
        }
        return new Date(new Date("2001-01-01T00:00:00.000Z").getTime() + Number(int64str) / 1e3 / 1e3);
      }
      exports.convertEBMLDateToJSDate = convertEBMLDateToJSDate;
    }
  });

  // node_modules/ts-ebml/lib/EBMLDecoder.js
  var require_EBMLDecoder = __commonJS({
    "node_modules/ts-ebml/lib/EBMLDecoder.js"(exports) {
      "use strict";
      init_esbuild_inject();
      Object.defineProperty(exports, "__esModule", { value: true });
      var tools_1 = require_tools2();
      var int64_buffer_1 = require_int64_buffer();
      var tools = require_tools2();
      var schema = require_schema();
      var byEbmlID = schema.byEbmlID;
      var State;
      (function(State2) {
        State2[State2["STATE_TAG"] = 1] = "STATE_TAG";
        State2[State2["STATE_SIZE"] = 2] = "STATE_SIZE";
        State2[State2["STATE_CONTENT"] = 3] = "STATE_CONTENT";
      })(State || (State = {}));
      var EBMLDecoder = function() {
        function EBMLDecoder2() {
          this._buffer = new tools_1.Buffer(0);
          this._tag_stack = [];
          this._state = State.STATE_TAG;
          this._cursor = 0;
          this._total = 0;
          this._schema = byEbmlID;
          this._result = [];
        }
        EBMLDecoder2.prototype.decode = function(chunk) {
          this.readChunk(chunk);
          var diff = this._result;
          this._result = [];
          return diff;
        };
        EBMLDecoder2.prototype.readChunk = function(chunk) {
          this._buffer = tools.concat([this._buffer, new tools_1.Buffer(chunk)]);
          while (this._cursor < this._buffer.length) {
            if (this._state === State.STATE_TAG && !this.readTag()) {
              break;
            }
            if (this._state === State.STATE_SIZE && !this.readSize()) {
              break;
            }
            if (this._state === State.STATE_CONTENT && !this.readContent()) {
              break;
            }
          }
        };
        EBMLDecoder2.prototype.getSchemaInfo = function(tagNum) {
          return this._schema[tagNum] || {
            name: "unknown",
            level: -1,
            type: "unknown",
            description: "unknown"
          };
        };
        EBMLDecoder2.prototype.readTag = function() {
          if (this._cursor >= this._buffer.length) {
            return false;
          }
          var tag = tools_1.readVint(this._buffer, this._cursor);
          if (tag == null) {
            return false;
          }
          var buf2 = this._buffer.slice(this._cursor, this._cursor + tag.length);
          var tagNum = buf2.reduce(function(o, v, i, arr) {
            return o + v * Math.pow(16, 2 * (arr.length - 1 - i));
          }, 0);
          var schema2 = this.getSchemaInfo(tagNum);
          var tagObj = {
            EBML_ID: tagNum.toString(16),
            schema: schema2,
            type: schema2.type,
            name: schema2.name,
            level: schema2.level,
            tagStart: this._total,
            tagEnd: this._total + tag.length,
            sizeStart: this._total + tag.length,
            sizeEnd: null,
            dataStart: null,
            dataEnd: null,
            dataSize: null,
            data: null
          };
          this._tag_stack.push(tagObj);
          this._cursor += tag.length;
          this._total += tag.length;
          this._state = State.STATE_SIZE;
          return true;
        };
        EBMLDecoder2.prototype.readSize = function() {
          if (this._cursor >= this._buffer.length) {
            return false;
          }
          var size = tools_1.readVint(this._buffer, this._cursor);
          if (size == null) {
            return false;
          }
          var tagObj = this._tag_stack[this._tag_stack.length - 1];
          tagObj.sizeEnd = tagObj.sizeStart + size.length;
          tagObj.dataStart = tagObj.sizeEnd;
          tagObj.dataSize = size.value;
          if (size.value === -1) {
            tagObj.dataEnd = -1;
            if (tagObj.type === "m") {
              tagObj.unknownSize = true;
            }
          } else {
            tagObj.dataEnd = tagObj.sizeEnd + size.value;
          }
          this._cursor += size.length;
          this._total += size.length;
          this._state = State.STATE_CONTENT;
          return true;
        };
        EBMLDecoder2.prototype.readContent = function() {
          var tagObj = this._tag_stack[this._tag_stack.length - 1];
          if (tagObj.type === "m") {
            tagObj.isEnd = false;
            this._result.push(tagObj);
            this._state = State.STATE_TAG;
            if (tagObj.dataSize === 0) {
              var elm = Object.assign({}, tagObj, { isEnd: true });
              this._result.push(elm);
              this._tag_stack.pop();
            }
            return true;
          }
          if (this._buffer.length < this._cursor + tagObj.dataSize) {
            return false;
          }
          var data = this._buffer.slice(this._cursor, this._cursor + tagObj.dataSize);
          this._buffer = this._buffer.slice(this._cursor + tagObj.dataSize);
          tagObj.data = data;
          switch (tagObj.type) {
            case "u":
              tagObj.value = data.readUIntBE(0, data.length);
              break;
            case "i":
              tagObj.value = data.readIntBE(0, data.length);
              break;
            case "f":
              tagObj.value = tagObj.dataSize === 4 ? data.readFloatBE(0) : tagObj.dataSize === 8 ? data.readDoubleBE(0) : (console.warn("cannot read " + tagObj.dataSize + " octets float. failback to 0"), 0);
              break;
            case "s":
              tagObj.value = data.toString("ascii");
              break;
            case "8":
              tagObj.value = data.toString("utf8");
              break;
            case "b":
              tagObj.value = data;
              break;
            case "d":
              tagObj.value = tools_1.convertEBMLDateToJSDate(new int64_buffer_1.Int64BE(data).toNumber());
              break;
          }
          if (tagObj.value === null) {
            throw new Error("unknown tag type:" + tagObj.type);
          }
          this._result.push(tagObj);
          this._total += tagObj.dataSize;
          this._state = State.STATE_TAG;
          this._cursor = 0;
          this._tag_stack.pop();
          while (this._tag_stack.length > 0) {
            var topEle = this._tag_stack[this._tag_stack.length - 1];
            if (topEle.dataEnd < 0) {
              this._tag_stack.pop();
              return true;
            }
            if (this._total < topEle.dataEnd) {
              break;
            }
            if (topEle.type !== "m") {
              throw new Error("parent element is not master element");
            }
            var elm = Object.assign({}, topEle, { isEnd: true });
            this._result.push(elm);
            this._tag_stack.pop();
          }
          return true;
        };
        return EBMLDecoder2;
      }();
      exports.default = EBMLDecoder;
    }
  });

  // node_modules/ts-ebml/node_modules/events/events.js
  var require_events2 = __commonJS({
    "node_modules/ts-ebml/node_modules/events/events.js"(exports, module) {
      init_esbuild_inject();
      function EventEmitter() {
        this._events = this._events || {};
        this._maxListeners = this._maxListeners || void 0;
      }
      module.exports = EventEmitter;
      EventEmitter.EventEmitter = EventEmitter;
      EventEmitter.prototype._events = void 0;
      EventEmitter.prototype._maxListeners = void 0;
      EventEmitter.defaultMaxListeners = 10;
      EventEmitter.prototype.setMaxListeners = function(n) {
        if (!isNumber(n) || n < 0 || isNaN(n))
          throw TypeError("n must be a positive number");
        this._maxListeners = n;
        return this;
      };
      EventEmitter.prototype.emit = function(type) {
        var er, handler, len, args, i, listeners;
        if (!this._events)
          this._events = {};
        if (type === "error") {
          if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
            er = arguments[1];
            if (er instanceof Error) {
              throw er;
            } else {
              var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
              err.context = er;
              throw err;
            }
          }
        }
        handler = this._events[type];
        if (isUndefined(handler))
          return false;
        if (isFunction(handler)) {
          switch (arguments.length) {
            case 1:
              handler.call(this);
              break;
            case 2:
              handler.call(this, arguments[1]);
              break;
            case 3:
              handler.call(this, arguments[1], arguments[2]);
              break;
            default:
              args = Array.prototype.slice.call(arguments, 1);
              handler.apply(this, args);
          }
        } else if (isObject(handler)) {
          args = Array.prototype.slice.call(arguments, 1);
          listeners = handler.slice();
          len = listeners.length;
          for (i = 0; i < len; i++)
            listeners[i].apply(this, args);
        }
        return true;
      };
      EventEmitter.prototype.addListener = function(type, listener) {
        var m;
        if (!isFunction(listener))
          throw TypeError("listener must be a function");
        if (!this._events)
          this._events = {};
        if (this._events.newListener)
          this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);
        if (!this._events[type])
          this._events[type] = listener;
        else if (isObject(this._events[type]))
          this._events[type].push(listener);
        else
          this._events[type] = [this._events[type], listener];
        if (isObject(this._events[type]) && !this._events[type].warned) {
          if (!isUndefined(this._maxListeners)) {
            m = this._maxListeners;
          } else {
            m = EventEmitter.defaultMaxListeners;
          }
          if (m && m > 0 && this._events[type].length > m) {
            this._events[type].warned = true;
            console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
            if (typeof console.trace === "function") {
              console.trace();
            }
          }
        }
        return this;
      };
      EventEmitter.prototype.on = EventEmitter.prototype.addListener;
      EventEmitter.prototype.once = function(type, listener) {
        if (!isFunction(listener))
          throw TypeError("listener must be a function");
        var fired = false;
        function g() {
          this.removeListener(type, g);
          if (!fired) {
            fired = true;
            listener.apply(this, arguments);
          }
        }
        g.listener = listener;
        this.on(type, g);
        return this;
      };
      EventEmitter.prototype.removeListener = function(type, listener) {
        var list, position, length, i;
        if (!isFunction(listener))
          throw TypeError("listener must be a function");
        if (!this._events || !this._events[type])
          return this;
        list = this._events[type];
        length = list.length;
        position = -1;
        if (list === listener || isFunction(list.listener) && list.listener === listener) {
          delete this._events[type];
          if (this._events.removeListener)
            this.emit("removeListener", type, listener);
        } else if (isObject(list)) {
          for (i = length; i-- > 0; ) {
            if (list[i] === listener || list[i].listener && list[i].listener === listener) {
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (list.length === 1) {
            list.length = 0;
            delete this._events[type];
          } else {
            list.splice(position, 1);
          }
          if (this._events.removeListener)
            this.emit("removeListener", type, listener);
        }
        return this;
      };
      EventEmitter.prototype.removeAllListeners = function(type) {
        var key, listeners;
        if (!this._events)
          return this;
        if (!this._events.removeListener) {
          if (arguments.length === 0)
            this._events = {};
          else if (this._events[type])
            delete this._events[type];
          return this;
        }
        if (arguments.length === 0) {
          for (key in this._events) {
            if (key === "removeListener")
              continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = {};
          return this;
        }
        listeners = this._events[type];
        if (isFunction(listeners)) {
          this.removeListener(type, listeners);
        } else if (listeners) {
          while (listeners.length)
            this.removeListener(type, listeners[listeners.length - 1]);
        }
        delete this._events[type];
        return this;
      };
      EventEmitter.prototype.listeners = function(type) {
        var ret;
        if (!this._events || !this._events[type])
          ret = [];
        else if (isFunction(this._events[type]))
          ret = [this._events[type]];
        else
          ret = this._events[type].slice();
        return ret;
      };
      EventEmitter.prototype.listenerCount = function(type) {
        if (this._events) {
          var evlistener = this._events[type];
          if (isFunction(evlistener))
            return 1;
          else if (evlistener)
            return evlistener.length;
        }
        return 0;
      };
      EventEmitter.listenerCount = function(emitter, type) {
        return emitter.listenerCount(type);
      };
      function isFunction(arg) {
        return typeof arg === "function";
      }
      function isNumber(arg) {
        return typeof arg === "number";
      }
      function isObject(arg) {
        return typeof arg === "object" && arg !== null;
      }
      function isUndefined(arg) {
        return arg === void 0;
      }
    }
  });

  // node_modules/ts-ebml/lib/EBMLReader.js
  var require_EBMLReader = __commonJS({
    "node_modules/ts-ebml/lib/EBMLReader.js"(exports) {
      "use strict";
      init_esbuild_inject();
      var __extends = exports && exports.__extends || function() {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b)
            if (b.hasOwnProperty(p))
              d[p] = b[p];
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var events_1 = require_events2();
      var tools = require_tools2();
      var EBMLReader = function(_super) {
        __extends(EBMLReader2, _super);
        function EBMLReader2() {
          var _this = _super.call(this) || this;
          _this.logGroup = "";
          _this.hasLoggingStarted = false;
          _this.metadataloaded = false;
          _this.chunks = [];
          _this.stack = [];
          _this.segmentOffset = 0;
          _this.last2SimpleBlockVideoTrackTimecode = [0, 0];
          _this.last2SimpleBlockAudioTrackTimecode = [0, 0];
          _this.lastClusterTimecode = 0;
          _this.lastClusterPosition = 0;
          _this.timecodeScale = 1e6;
          _this.metadataSize = 0;
          _this.metadatas = [];
          _this.cues = [];
          _this.firstVideoBlockRead = false;
          _this.firstAudioBlockRead = false;
          _this.currentTrack = { TrackNumber: -1, TrackType: -1, DefaultDuration: null, CodecDelay: null };
          _this.trackTypes = [];
          _this.trackDefaultDuration = [];
          _this.trackCodecDelay = [];
          _this.trackInfo = { type: "nothing" };
          _this.ended = false;
          _this.logging = false;
          _this.use_duration_every_simpleblock = false;
          _this.use_webp = false;
          _this.use_segment_info = true;
          _this.drop_default_duration = true;
          return _this;
        }
        EBMLReader2.prototype.stop = function() {
          this.ended = true;
          this.emit_segment_info();
          while (this.stack.length) {
            this.stack.pop();
            if (this.logging) {
              console.groupEnd();
            }
          }
          if (this.logging && this.hasLoggingStarted && this.logGroup) {
            console.groupEnd();
          }
        };
        EBMLReader2.prototype.emit_segment_info = function() {
          var data = this.chunks;
          this.chunks = [];
          if (!this.metadataloaded) {
            this.metadataloaded = true;
            this.metadatas = data;
            var videoTrackNum = this.trackTypes.indexOf(1);
            var audioTrackNum = this.trackTypes.indexOf(2);
            this.trackInfo = videoTrackNum >= 0 && audioTrackNum >= 0 ? { type: "both", trackNumber: videoTrackNum } : videoTrackNum >= 0 ? { type: "video", trackNumber: videoTrackNum } : audioTrackNum >= 0 ? { type: "audio", trackNumber: audioTrackNum } : { type: "nothing" };
            if (!this.use_segment_info) {
              return;
            }
            this.emit("metadata", { data, metadataSize: this.metadataSize });
          } else {
            if (!this.use_segment_info) {
              return;
            }
            var timecode = this.lastClusterTimecode;
            var duration = this.duration;
            var timecodeScale = this.timecodeScale;
            this.emit("cluster", { timecode, data });
            this.emit("duration", { timecodeScale, duration });
          }
        };
        EBMLReader2.prototype.read = function(elm) {
          var _this = this;
          var drop = false;
          if (this.ended) {
            return;
          }
          if (elm.type === "m") {
            if (elm.isEnd) {
              this.stack.pop();
            } else {
              var parent_1 = this.stack[this.stack.length - 1];
              if (parent_1 != null && parent_1.level >= elm.level) {
                this.stack.pop();
                if (this.logging) {
                  console.groupEnd();
                }
                parent_1.dataEnd = elm.dataEnd;
                parent_1.dataSize = elm.dataEnd - parent_1.dataStart;
                parent_1.unknownSize = false;
                var o = Object.assign({}, parent_1, { name: parent_1.name, type: parent_1.type, isEnd: true });
                this.chunks.push(o);
              }
              this.stack.push(elm);
            }
          }
          if (elm.type === "m" && elm.name == "Segment") {
            if (this.segmentOffset != 0) {
              console.warn("Multiple segments detected!");
            }
            this.segmentOffset = elm.dataStart;
            this.emit("segment_offset", this.segmentOffset);
          } else if (elm.type === "b" && elm.name === "SimpleBlock") {
            var _a = tools.ebmlBlock(elm.data), timecode = _a.timecode, trackNumber = _a.trackNumber, frames_1 = _a.frames;
            if (this.trackTypes[trackNumber] === 1) {
              if (!this.firstVideoBlockRead) {
                this.firstVideoBlockRead = true;
                if (this.trackInfo.type === "both" || this.trackInfo.type === "video") {
                  var CueTime = this.lastClusterTimecode + timecode;
                  this.cues.push({ CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime });
                  this.emit("cue_info", { CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime: this.lastClusterTimecode });
                  this.emit("cue", { CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime });
                }
              }
              this.last2SimpleBlockVideoTrackTimecode = [this.last2SimpleBlockVideoTrackTimecode[1], timecode];
            } else if (this.trackTypes[trackNumber] === 2) {
              if (!this.firstAudioBlockRead) {
                this.firstAudioBlockRead = true;
                if (this.trackInfo.type === "audio") {
                  var CueTime = this.lastClusterTimecode + timecode;
                  this.cues.push({ CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime });
                  this.emit("cue_info", { CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime: this.lastClusterTimecode });
                  this.emit("cue", { CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime });
                }
              }
              this.last2SimpleBlockAudioTrackTimecode = [this.last2SimpleBlockAudioTrackTimecode[1], timecode];
            }
            if (this.use_duration_every_simpleblock) {
              this.emit("duration", { timecodeScale: this.timecodeScale, duration: this.duration });
            }
            if (this.use_webp) {
              frames_1.forEach(function(frame) {
                var startcode = frame.slice(3, 6).toString("hex");
                if (startcode !== "9d012a") {
                  return;
                }
                ;
                var webpBuf = tools.VP8BitStreamToRiffWebPBuffer(frame);
                var webp = new Blob([webpBuf], { type: "image/webp" });
                var currentTime = _this.duration;
                _this.emit("webp", { currentTime, webp });
              });
            }
          } else if (elm.type === "m" && elm.name === "Cluster" && elm.isEnd === false) {
            this.firstVideoBlockRead = false;
            this.firstAudioBlockRead = false;
            this.emit_segment_info();
            this.emit("cluster_ptr", elm.tagStart);
            this.lastClusterPosition = elm.tagStart;
          } else if (elm.type === "u" && elm.name === "Timecode") {
            this.lastClusterTimecode = elm.value;
          } else if (elm.type === "u" && elm.name === "TimecodeScale") {
            this.timecodeScale = elm.value;
          } else if (elm.type === "m" && elm.name === "TrackEntry") {
            if (elm.isEnd) {
              this.trackTypes[this.currentTrack.TrackNumber] = this.currentTrack.TrackType;
              this.trackDefaultDuration[this.currentTrack.TrackNumber] = this.currentTrack.DefaultDuration;
              this.trackCodecDelay[this.currentTrack.TrackNumber] = this.currentTrack.CodecDelay;
            } else {
              this.currentTrack = { TrackNumber: -1, TrackType: -1, DefaultDuration: null, CodecDelay: null };
            }
          } else if (elm.type === "u" && elm.name === "TrackType") {
            this.currentTrack.TrackType = elm.value;
          } else if (elm.type === "u" && elm.name === "TrackNumber") {
            this.currentTrack.TrackNumber = elm.value;
          } else if (elm.type === "u" && elm.name === "CodecDelay") {
            this.currentTrack.CodecDelay = elm.value;
          } else if (elm.type === "u" && elm.name === "DefaultDuration") {
            if (this.drop_default_duration) {
              console.warn("DefaultDuration detected!, remove it");
              drop = true;
            } else {
              this.currentTrack.DefaultDuration = elm.value;
            }
          } else if (elm.name === "unknown") {
            console.warn(elm);
          }
          if (!this.metadataloaded && elm.dataEnd > 0) {
            this.metadataSize = elm.dataEnd;
          }
          if (!drop) {
            this.chunks.push(elm);
          }
          if (this.logging) {
            this.put(elm);
          }
        };
        Object.defineProperty(EBMLReader2.prototype, "duration", {
          get: function() {
            if (this.trackInfo.type === "nothing") {
              console.warn("no video, no audio track");
              return 0;
            }
            var defaultDuration = 0;
            var codecDelay = 0;
            var lastTimecode = 0;
            var _defaultDuration = this.trackDefaultDuration[this.trackInfo.trackNumber];
            if (typeof _defaultDuration === "number") {
              defaultDuration = _defaultDuration;
            } else {
              if (this.trackInfo.type === "both") {
                if (this.last2SimpleBlockAudioTrackTimecode[1] > this.last2SimpleBlockVideoTrackTimecode[1]) {
                  defaultDuration = (this.last2SimpleBlockAudioTrackTimecode[1] - this.last2SimpleBlockAudioTrackTimecode[0]) * this.timecodeScale;
                  var delay = this.trackCodecDelay[this.trackTypes.indexOf(2)];
                  if (typeof delay === "number") {
                    codecDelay = delay;
                  }
                  lastTimecode = this.last2SimpleBlockAudioTrackTimecode[1];
                } else {
                  defaultDuration = (this.last2SimpleBlockVideoTrackTimecode[1] - this.last2SimpleBlockVideoTrackTimecode[0]) * this.timecodeScale;
                  var delay = this.trackCodecDelay[this.trackTypes.indexOf(1)];
                  if (typeof delay === "number") {
                    codecDelay = delay;
                  }
                  lastTimecode = this.last2SimpleBlockVideoTrackTimecode[1];
                }
              } else if (this.trackInfo.type === "video") {
                defaultDuration = (this.last2SimpleBlockVideoTrackTimecode[1] - this.last2SimpleBlockVideoTrackTimecode[0]) * this.timecodeScale;
                var delay = this.trackCodecDelay[this.trackInfo.trackNumber];
                if (typeof delay === "number") {
                  codecDelay = delay;
                }
                lastTimecode = this.last2SimpleBlockVideoTrackTimecode[1];
              } else if (this.trackInfo.type === "audio") {
                defaultDuration = (this.last2SimpleBlockAudioTrackTimecode[1] - this.last2SimpleBlockAudioTrackTimecode[0]) * this.timecodeScale;
                var delay = this.trackCodecDelay[this.trackInfo.trackNumber];
                if (typeof delay === "number") {
                  codecDelay = delay;
                }
                lastTimecode = this.last2SimpleBlockAudioTrackTimecode[1];
              }
            }
            var duration_nanosec = (this.lastClusterTimecode + lastTimecode) * this.timecodeScale + defaultDuration - codecDelay;
            var duration = duration_nanosec / this.timecodeScale;
            return Math.floor(duration);
          },
          enumerable: true,
          configurable: true
        });
        EBMLReader2.prototype.addListener = function(event, listener) {
          return _super.prototype.addListener.call(this, event, listener);
        };
        EBMLReader2.prototype.put = function(elm) {
          if (!this.hasLoggingStarted) {
            this.hasLoggingStarted = true;
            if (this.logging && this.logGroup) {
              console.groupCollapsed(this.logGroup);
            }
          }
          if (elm.type === "m") {
            if (elm.isEnd) {
              console.groupEnd();
            } else {
              console.group(elm.name + ":" + elm.tagStart);
            }
          } else if (elm.type === "b") {
            console.log(elm.name, elm.type);
          } else {
            console.log(elm.name, elm.tagStart, elm.type, elm.value);
          }
        };
        return EBMLReader2;
      }(events_1.EventEmitter);
      exports.default = EBMLReader;
    }
  });

  // node_modules/ts-ebml/package.json
  var require_package = __commonJS({
    "node_modules/ts-ebml/package.json"(exports, module) {
      module.exports = {
        name: "ts-ebml",
        version: "2.0.2",
        description: "ebml decoder and encoder",
        scripts: {
          setup: "npm install -g http-server;",
          init: "npm run update; npm run mkdir; npm run build",
          update: "npm run reset; npm update",
          reset: "rm -rf node_modules",
          mkdir: "mkdir lib dist 2>/dev/null",
          clean: "rm -rf lib/* dist/* test/*.js; mkdir -p dist",
          build: "npm run clean   && tsc    -p .; npm run browserify",
          start: "http-server . -s & tsc -w -p .& watchify lib/example_seekable.js -o test/example_seekable.js",
          stop: "killall -- node */tsc -w -p",
          browserify: "browserify lib/index.js --standalone EBML -o dist/EBML.js",
          watchify: "watchify lib/index.js --standalone EBML -o dist/EBMl.js -v",
          test: "tsc; espower lib/test.js > lib/test.tmp; mv -f lib/test.tmp lib/test.js; browserify lib/test.js -o test/test.js",
          example: "tsc; browserify lib/example_seekable.js -o test/example_seekable.js",
          examples: "tsc; for file in `find lib -name 'example_*.js' -type f -printf '%f\\n'`; do browserify lib/$file -o test/$file; done",
          examples_bsd: "tsc; for file in `find lib -name 'example_*.js' -type f -print`; do browserify lib/$(basename $file) -o test/$(basename $file); done",
          check: "tsc -w --noEmit -p ./",
          lint: "tslint -c ./tslint.json --project ./tsconfig.json --type-check",
          doc: "typedoc --mode modules --out doc --disableOutputCheck"
        },
        repository: {
          type: "git",
          url: "git+https://github.com/legokichi/ts-ebml.git"
        },
        keywords: [
          "ebml",
          "webm",
          "mkv",
          "matrosika",
          "webp"
        ],
        author: "legokichi duckscallion",
        license: "MIT",
        bugs: {
          url: "https://github.com/legokichi/ts-ebml/issues"
        },
        homepage: "https://github.com/legokichi/ts-ebml#readme",
        dependencies: {
          buffer: "^5.0.7",
          commander: "^2.11.0",
          ebml: "^2.2.1",
          "ebml-block": "^1.1.0",
          events: "^1.1.1",
          "int64-buffer": "^0.1.9",
          matroska: "^2.2.3"
        },
        devDependencies: {
          "@types/commander": "^2.9.1",
          "@types/qunit": "^2.0.31",
          browserify: "^13.1.0",
          empower: "^1.2.3",
          "espower-cli": "^1.1.0",
          "power-assert": "^1.4.4",
          "power-assert-formatter": "^1.4.1",
          "qunit-tap": "^1.5.1",
          qunitjs: "^2.4.0",
          tslint: "^3.15.1",
          typedoc: "^0.5.3",
          typescript: "^2.4.2",
          watchify: "^3.7.0"
        },
        bin: "./lib/cli.js",
        main: "./lib/index.js",
        typings: "./lib/index.d.ts"
      };
    }
  });

  // node_modules/ts-ebml/lib/index.js
  var require_lib2 = __commonJS({
    "node_modules/ts-ebml/lib/index.js"(exports) {
      "use strict";
      init_esbuild_inject();
      Object.defineProperty(exports, "__esModule", { value: true });
      var EBMLDecoder_1 = require_EBMLDecoder();
      exports.Decoder = EBMLDecoder_1.default;
      var EBMLEncoder_1 = require_EBMLEncoder();
      exports.Encoder = EBMLEncoder_1.default;
      var EBMLReader_1 = require_EBMLReader();
      exports.Reader = EBMLReader_1.default;
      var tools = require_tools2();
      exports.tools = tools;
      var version = require_package().version;
      exports.version = version;
    }
  });

  // src/main.ts
  init_esbuild_inject();

  // node_modules/file-type/browser.js
  init_esbuild_inject();
  var import_node_buffer4 = __toESM(require_buffer(), 1);
  var import_readable_web_to_node_stream = __toESM(require_lib(), 1);

  // node_modules/file-type/core.js
  init_esbuild_inject();
  var import_node_buffer3 = __toESM(require_buffer(), 1);

  // node_modules/token-types/lib/index.js
  init_esbuild_inject();
  var ieee754 = __toESM(require_ieee754(), 1);
  var import_node_buffer = __toESM(require_buffer(), 1);
  function dv(array) {
    return new DataView(array.buffer, array.byteOffset);
  }
  var UINT8 = {
    len: 1,
    get(array, offset) {
      return dv(array).getUint8(offset);
    },
    put(array, offset, value) {
      dv(array).setUint8(offset, value);
      return offset + 1;
    }
  };
  var UINT16_LE = {
    len: 2,
    get(array, offset) {
      return dv(array).getUint16(offset, true);
    },
    put(array, offset, value) {
      dv(array).setUint16(offset, value, true);
      return offset + 2;
    }
  };
  var UINT16_BE = {
    len: 2,
    get(array, offset) {
      return dv(array).getUint16(offset);
    },
    put(array, offset, value) {
      dv(array).setUint16(offset, value);
      return offset + 2;
    }
  };
  var UINT32_LE = {
    len: 4,
    get(array, offset) {
      return dv(array).getUint32(offset, true);
    },
    put(array, offset, value) {
      dv(array).setUint32(offset, value, true);
      return offset + 4;
    }
  };
  var UINT32_BE = {
    len: 4,
    get(array, offset) {
      return dv(array).getUint32(offset);
    },
    put(array, offset, value) {
      dv(array).setUint32(offset, value);
      return offset + 4;
    }
  };
  var INT32_BE = {
    len: 4,
    get(array, offset) {
      return dv(array).getInt32(offset);
    },
    put(array, offset, value) {
      dv(array).setInt32(offset, value);
      return offset + 4;
    }
  };
  var UINT64_LE = {
    len: 8,
    get(array, offset) {
      return dv(array).getBigUint64(offset, true);
    },
    put(array, offset, value) {
      dv(array).setBigUint64(offset, value, true);
      return offset + 8;
    }
  };
  var StringType = class {
    constructor(len, encoding) {
      this.len = len;
      this.encoding = encoding;
    }
    get(uint8Array, offset) {
      return import_node_buffer.Buffer.from(uint8Array).toString(this.encoding, offset, offset + this.len);
    }
  };
  var AnsiStringType = class {
    constructor(len) {
      this.len = len;
    }
    static decode(buffer, offset, until) {
      let str = "";
      for (let i = offset; i < until; ++i) {
        str += AnsiStringType.codePointToString(AnsiStringType.singleByteDecoder(buffer[i]));
      }
      return str;
    }
    static inRange(a, min, max) {
      return min <= a && a <= max;
    }
    static codePointToString(cp) {
      if (cp <= 65535) {
        return String.fromCharCode(cp);
      } else {
        cp -= 65536;
        return String.fromCharCode((cp >> 10) + 55296, (cp & 1023) + 56320);
      }
    }
    static singleByteDecoder(bite) {
      if (AnsiStringType.inRange(bite, 0, 127)) {
        return bite;
      }
      const codePoint = AnsiStringType.windows1252[bite - 128];
      if (codePoint === null) {
        throw Error("invaliding encoding");
      }
      return codePoint;
    }
    get(buffer, offset = 0) {
      return AnsiStringType.decode(buffer, offset, offset + this.len);
    }
  };
  AnsiStringType.windows1252 = [
    8364,
    129,
    8218,
    402,
    8222,
    8230,
    8224,
    8225,
    710,
    8240,
    352,
    8249,
    338,
    141,
    381,
    143,
    144,
    8216,
    8217,
    8220,
    8221,
    8226,
    8211,
    8212,
    732,
    8482,
    353,
    8250,
    339,
    157,
    382,
    376,
    160,
    161,
    162,
    163,
    164,
    165,
    166,
    167,
    168,
    169,
    170,
    171,
    172,
    173,
    174,
    175,
    176,
    177,
    178,
    179,
    180,
    181,
    182,
    183,
    184,
    185,
    186,
    187,
    188,
    189,
    190,
    191,
    192,
    193,
    194,
    195,
    196,
    197,
    198,
    199,
    200,
    201,
    202,
    203,
    204,
    205,
    206,
    207,
    208,
    209,
    210,
    211,
    212,
    213,
    214,
    215,
    216,
    217,
    218,
    219,
    220,
    221,
    222,
    223,
    224,
    225,
    226,
    227,
    228,
    229,
    230,
    231,
    232,
    233,
    234,
    235,
    236,
    237,
    238,
    239,
    240,
    241,
    242,
    243,
    244,
    245,
    246,
    247,
    248,
    249,
    250,
    251,
    252,
    253,
    254,
    255
  ];

  // node_modules/strtok3/lib/core.js
  init_esbuild_inject();

  // node_modules/strtok3/lib/ReadStreamTokenizer.js
  init_esbuild_inject();

  // node_modules/strtok3/lib/AbstractTokenizer.js
  init_esbuild_inject();

  // node_modules/peek-readable/lib/index.js
  init_esbuild_inject();

  // node_modules/peek-readable/lib/EndOfFileStream.js
  init_esbuild_inject();
  var defaultMessages = "End-Of-Stream";
  var EndOfStreamError = class extends Error {
    constructor() {
      super(defaultMessages);
    }
  };

  // node_modules/peek-readable/lib/StreamReader.js
  init_esbuild_inject();

  // node_modules/peek-readable/lib/Deferred.js
  init_esbuild_inject();

  // node_modules/peek-readable/lib/StreamReader.js
  var maxStreamReadSize = 1 * 1024 * 1024;

  // node_modules/strtok3/lib/AbstractTokenizer.js
  var import_node_buffer2 = __toESM(require_buffer(), 1);
  var AbstractTokenizer = class {
    constructor(fileInfo) {
      this.position = 0;
      this.numBuffer = new Uint8Array(8);
      this.fileInfo = fileInfo ? fileInfo : {};
    }
    async readToken(token, position = this.position) {
      const uint8Array = import_node_buffer2.Buffer.alloc(token.len);
      const len = await this.readBuffer(uint8Array, { position });
      if (len < token.len)
        throw new EndOfStreamError();
      return token.get(uint8Array, 0);
    }
    async peekToken(token, position = this.position) {
      const uint8Array = import_node_buffer2.Buffer.alloc(token.len);
      const len = await this.peekBuffer(uint8Array, { position });
      if (len < token.len)
        throw new EndOfStreamError();
      return token.get(uint8Array, 0);
    }
    async readNumber(token) {
      const len = await this.readBuffer(this.numBuffer, { length: token.len });
      if (len < token.len)
        throw new EndOfStreamError();
      return token.get(this.numBuffer, 0);
    }
    async peekNumber(token) {
      const len = await this.peekBuffer(this.numBuffer, { length: token.len });
      if (len < token.len)
        throw new EndOfStreamError();
      return token.get(this.numBuffer, 0);
    }
    async ignore(length) {
      if (this.fileInfo.size !== void 0) {
        const bytesLeft = this.fileInfo.size - this.position;
        if (length > bytesLeft) {
          this.position += bytesLeft;
          return bytesLeft;
        }
      }
      this.position += length;
      return length;
    }
    async close() {
    }
    normalizeOptions(uint8Array, options) {
      if (options && options.position !== void 0 && options.position < this.position) {
        throw new Error("`options.position` must be equal or greater than `tokenizer.position`");
      }
      if (options) {
        return {
          mayBeLess: options.mayBeLess === true,
          offset: options.offset ? options.offset : 0,
          length: options.length ? options.length : uint8Array.length - (options.offset ? options.offset : 0),
          position: options.position ? options.position : this.position
        };
      }
      return {
        mayBeLess: false,
        offset: 0,
        length: uint8Array.length,
        position: this.position
      };
    }
  };

  // node_modules/strtok3/lib/BufferTokenizer.js
  init_esbuild_inject();
  var BufferTokenizer = class extends AbstractTokenizer {
    constructor(uint8Array, fileInfo) {
      super(fileInfo);
      this.uint8Array = uint8Array;
      this.fileInfo.size = this.fileInfo.size ? this.fileInfo.size : uint8Array.length;
    }
    async readBuffer(uint8Array, options) {
      if (options && options.position) {
        if (options.position < this.position) {
          throw new Error("`options.position` must be equal or greater than `tokenizer.position`");
        }
        this.position = options.position;
      }
      const bytesRead = await this.peekBuffer(uint8Array, options);
      this.position += bytesRead;
      return bytesRead;
    }
    async peekBuffer(uint8Array, options) {
      const normOptions = this.normalizeOptions(uint8Array, options);
      const bytes2read = Math.min(this.uint8Array.length - normOptions.position, normOptions.length);
      if (!normOptions.mayBeLess && bytes2read < normOptions.length) {
        throw new EndOfStreamError();
      } else {
        uint8Array.set(this.uint8Array.subarray(normOptions.position, normOptions.position + bytes2read), normOptions.offset);
        return bytes2read;
      }
    }
    async close() {
    }
  };

  // node_modules/strtok3/lib/core.js
  function fromBuffer(uint8Array, fileInfo) {
    return new BufferTokenizer(uint8Array, fileInfo);
  }

  // node_modules/file-type/util.js
  init_esbuild_inject();
  function stringToBytes(string) {
    return [...string].map((character) => character.charCodeAt(0));
  }
  function tarHeaderChecksumMatches(buffer, offset = 0) {
    const readSum = Number.parseInt(buffer.toString("utf8", 148, 154).replace(/\0.*$/, "").trim(), 8);
    if (Number.isNaN(readSum)) {
      return false;
    }
    let sum = 8 * 32;
    for (let i = offset; i < offset + 148; i++) {
      sum += buffer[i];
    }
    for (let i = offset + 156; i < offset + 512; i++) {
      sum += buffer[i];
    }
    return readSum === sum;
  }
  var uint32SyncSafeToken = {
    get: (buffer, offset) => buffer[offset + 3] & 127 | buffer[offset + 2] << 7 | buffer[offset + 1] << 14 | buffer[offset] << 21,
    len: 4
  };

  // node_modules/file-type/supported.js
  init_esbuild_inject();
  var extensions = [
    "jpg",
    "png",
    "apng",
    "gif",
    "webp",
    "flif",
    "xcf",
    "cr2",
    "cr3",
    "orf",
    "arw",
    "dng",
    "nef",
    "rw2",
    "raf",
    "tif",
    "bmp",
    "icns",
    "jxr",
    "psd",
    "indd",
    "zip",
    "tar",
    "rar",
    "gz",
    "bz2",
    "7z",
    "dmg",
    "mp4",
    "mid",
    "mkv",
    "webm",
    "mov",
    "avi",
    "mpg",
    "mp2",
    "mp3",
    "m4a",
    "oga",
    "ogg",
    "ogv",
    "opus",
    "flac",
    "wav",
    "spx",
    "amr",
    "pdf",
    "epub",
    "elf",
    "exe",
    "swf",
    "rtf",
    "wasm",
    "woff",
    "woff2",
    "eot",
    "ttf",
    "otf",
    "ico",
    "flv",
    "ps",
    "xz",
    "sqlite",
    "nes",
    "crx",
    "xpi",
    "cab",
    "deb",
    "ar",
    "rpm",
    "Z",
    "lz",
    "cfb",
    "mxf",
    "mts",
    "blend",
    "bpg",
    "docx",
    "pptx",
    "xlsx",
    "3gp",
    "3g2",
    "jp2",
    "jpm",
    "jpx",
    "mj2",
    "aif",
    "qcp",
    "odt",
    "ods",
    "odp",
    "xml",
    "mobi",
    "heic",
    "cur",
    "ktx",
    "ape",
    "wv",
    "dcm",
    "ics",
    "glb",
    "pcap",
    "dsf",
    "lnk",
    "alias",
    "voc",
    "ac3",
    "m4v",
    "m4p",
    "m4b",
    "f4v",
    "f4p",
    "f4b",
    "f4a",
    "mie",
    "asf",
    "ogm",
    "ogx",
    "mpc",
    "arrow",
    "shp",
    "aac",
    "mp1",
    "it",
    "s3m",
    "xm",
    "ai",
    "skp",
    "avif",
    "eps",
    "lzh",
    "pgp",
    "asar",
    "stl",
    "chm",
    "3mf",
    "zst",
    "jxl",
    "vcf"
  ];
  var mimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/flif",
    "image/x-xcf",
    "image/x-canon-cr2",
    "image/x-canon-cr3",
    "image/tiff",
    "image/bmp",
    "image/vnd.ms-photo",
    "image/vnd.adobe.photoshop",
    "application/x-indesign",
    "application/epub+zip",
    "application/x-xpinstall",
    "application/vnd.oasis.opendocument.text",
    "application/vnd.oasis.opendocument.spreadsheet",
    "application/vnd.oasis.opendocument.presentation",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/zip",
    "application/x-tar",
    "application/x-rar-compressed",
    "application/gzip",
    "application/x-bzip2",
    "application/x-7z-compressed",
    "application/x-apple-diskimage",
    "application/x-apache-arrow",
    "video/mp4",
    "audio/midi",
    "video/x-matroska",
    "video/webm",
    "video/quicktime",
    "video/vnd.avi",
    "audio/vnd.wave",
    "audio/qcelp",
    "audio/x-ms-asf",
    "video/x-ms-asf",
    "application/vnd.ms-asf",
    "video/mpeg",
    "video/3gpp",
    "audio/mpeg",
    "audio/mp4",
    "audio/opus",
    "video/ogg",
    "audio/ogg",
    "application/ogg",
    "audio/x-flac",
    "audio/ape",
    "audio/wavpack",
    "audio/amr",
    "application/pdf",
    "application/x-elf",
    "application/x-msdownload",
    "application/x-shockwave-flash",
    "application/rtf",
    "application/wasm",
    "font/woff",
    "font/woff2",
    "application/vnd.ms-fontobject",
    "font/ttf",
    "font/otf",
    "image/x-icon",
    "video/x-flv",
    "application/postscript",
    "application/eps",
    "application/x-xz",
    "application/x-sqlite3",
    "application/x-nintendo-nes-rom",
    "application/x-google-chrome-extension",
    "application/vnd.ms-cab-compressed",
    "application/x-deb",
    "application/x-unix-archive",
    "application/x-rpm",
    "application/x-compress",
    "application/x-lzip",
    "application/x-cfb",
    "application/x-mie",
    "application/mxf",
    "video/mp2t",
    "application/x-blender",
    "image/bpg",
    "image/jp2",
    "image/jpx",
    "image/jpm",
    "image/mj2",
    "audio/aiff",
    "application/xml",
    "application/x-mobipocket-ebook",
    "image/heif",
    "image/heif-sequence",
    "image/heic",
    "image/heic-sequence",
    "image/icns",
    "image/ktx",
    "application/dicom",
    "audio/x-musepack",
    "text/calendar",
    "text/vcard",
    "model/gltf-binary",
    "application/vnd.tcpdump.pcap",
    "audio/x-dsf",
    "application/x.ms.shortcut",
    "application/x.apple.alias",
    "audio/x-voc",
    "audio/vnd.dolby.dd-raw",
    "audio/x-m4a",
    "image/apng",
    "image/x-olympus-orf",
    "image/x-sony-arw",
    "image/x-adobe-dng",
    "image/x-nikon-nef",
    "image/x-panasonic-rw2",
    "image/x-fujifilm-raf",
    "video/x-m4v",
    "video/3gpp2",
    "application/x-esri-shape",
    "audio/aac",
    "audio/x-it",
    "audio/x-s3m",
    "audio/x-xm",
    "video/MP1S",
    "video/MP2P",
    "application/vnd.sketchup.skp",
    "image/avif",
    "application/x-lzh-compressed",
    "application/pgp-encrypted",
    "application/x-asar",
    "model/stl",
    "application/vnd.ms-htmlhelp",
    "model/3mf",
    "image/jxl",
    "application/zstd"
  ];

  // node_modules/file-type/core.js
  var minimumBytes = 4100;
  async function fileTypeFromBuffer(input) {
    if (!(input instanceof Uint8Array || input instanceof ArrayBuffer)) {
      throw new TypeError(`Expected the \`input\` argument to be of type \`Uint8Array\` or \`Buffer\` or \`ArrayBuffer\`, got \`${typeof input}\``);
    }
    const buffer = input instanceof Uint8Array ? input : new Uint8Array(input);
    if (!(buffer && buffer.length > 1)) {
      return;
    }
    return fileTypeFromTokenizer(fromBuffer(buffer));
  }
  function _check(buffer, headers, options) {
    options = {
      offset: 0,
      ...options
    };
    for (const [index, header] of headers.entries()) {
      if (options.mask) {
        if (header !== (options.mask[index] & buffer[index + options.offset])) {
          return false;
        }
      } else if (header !== buffer[index + options.offset]) {
        return false;
      }
    }
    return true;
  }
  async function fileTypeFromTokenizer(tokenizer) {
    try {
      return new FileTypeParser().parse(tokenizer);
    } catch (error) {
      if (!(error instanceof EndOfStreamError)) {
        throw error;
      }
    }
  }
  var FileTypeParser = class {
    check(header, options) {
      return _check(this.buffer, header, options);
    }
    checkString(header, options) {
      return this.check(stringToBytes(header), options);
    }
    async parse(tokenizer) {
      this.buffer = import_node_buffer3.Buffer.alloc(minimumBytes);
      if (tokenizer.fileInfo.size === void 0) {
        tokenizer.fileInfo.size = Number.MAX_SAFE_INTEGER;
      }
      if (tokenizer.fileInfo.size === void 0) {
        tokenizer.fileInfo.size = Number.MAX_SAFE_INTEGER;
      }
      this.tokenizer = tokenizer;
      await tokenizer.peekBuffer(this.buffer, { length: 12, mayBeLess: true });
      if (this.check([66, 77])) {
        return {
          ext: "bmp",
          mime: "image/bmp"
        };
      }
      if (this.check([11, 119])) {
        return {
          ext: "ac3",
          mime: "audio/vnd.dolby.dd-raw"
        };
      }
      if (this.check([120, 1])) {
        return {
          ext: "dmg",
          mime: "application/x-apple-diskimage"
        };
      }
      if (this.check([77, 90])) {
        return {
          ext: "exe",
          mime: "application/x-msdownload"
        };
      }
      if (this.check([37, 33])) {
        await tokenizer.peekBuffer(this.buffer, { length: 24, mayBeLess: true });
        if (this.checkString("PS-Adobe-", { offset: 2 }) && this.checkString(" EPSF-", { offset: 14 })) {
          return {
            ext: "eps",
            mime: "application/eps"
          };
        }
        return {
          ext: "ps",
          mime: "application/postscript"
        };
      }
      if (this.check([31, 160]) || this.check([31, 157])) {
        return {
          ext: "Z",
          mime: "application/x-compress"
        };
      }
      if (this.check([71, 73, 70])) {
        return {
          ext: "gif",
          mime: "image/gif"
        };
      }
      if (this.check([255, 216, 255])) {
        return {
          ext: "jpg",
          mime: "image/jpeg"
        };
      }
      if (this.check([73, 73, 188])) {
        return {
          ext: "jxr",
          mime: "image/vnd.ms-photo"
        };
      }
      if (this.check([31, 139, 8])) {
        return {
          ext: "gz",
          mime: "application/gzip"
        };
      }
      if (this.check([66, 90, 104])) {
        return {
          ext: "bz2",
          mime: "application/x-bzip2"
        };
      }
      if (this.checkString("ID3")) {
        await tokenizer.ignore(6);
        const id3HeaderLength = await tokenizer.readToken(uint32SyncSafeToken);
        if (tokenizer.position + id3HeaderLength > tokenizer.fileInfo.size) {
          return {
            ext: "mp3",
            mime: "audio/mpeg"
          };
        }
        await tokenizer.ignore(id3HeaderLength);
        return fileTypeFromTokenizer(tokenizer);
      }
      if (this.checkString("MP+")) {
        return {
          ext: "mpc",
          mime: "audio/x-musepack"
        };
      }
      if ((this.buffer[0] === 67 || this.buffer[0] === 70) && this.check([87, 83], { offset: 1 })) {
        return {
          ext: "swf",
          mime: "application/x-shockwave-flash"
        };
      }
      if (this.checkString("FLIF")) {
        return {
          ext: "flif",
          mime: "image/flif"
        };
      }
      if (this.checkString("8BPS")) {
        return {
          ext: "psd",
          mime: "image/vnd.adobe.photoshop"
        };
      }
      if (this.checkString("WEBP", { offset: 8 })) {
        return {
          ext: "webp",
          mime: "image/webp"
        };
      }
      if (this.checkString("MPCK")) {
        return {
          ext: "mpc",
          mime: "audio/x-musepack"
        };
      }
      if (this.checkString("FORM")) {
        return {
          ext: "aif",
          mime: "audio/aiff"
        };
      }
      if (this.checkString("icns", { offset: 0 })) {
        return {
          ext: "icns",
          mime: "image/icns"
        };
      }
      if (this.check([80, 75, 3, 4])) {
        try {
          while (tokenizer.position + 30 < tokenizer.fileInfo.size) {
            await tokenizer.readBuffer(this.buffer, { length: 30 });
            const zipHeader = {
              compressedSize: this.buffer.readUInt32LE(18),
              uncompressedSize: this.buffer.readUInt32LE(22),
              filenameLength: this.buffer.readUInt16LE(26),
              extraFieldLength: this.buffer.readUInt16LE(28)
            };
            zipHeader.filename = await tokenizer.readToken(new StringType(zipHeader.filenameLength, "utf-8"));
            await tokenizer.ignore(zipHeader.extraFieldLength);
            if (zipHeader.filename === "META-INF/mozilla.rsa") {
              return {
                ext: "xpi",
                mime: "application/x-xpinstall"
              };
            }
            if (zipHeader.filename.endsWith(".rels") || zipHeader.filename.endsWith(".xml")) {
              const type = zipHeader.filename.split("/")[0];
              switch (type) {
                case "_rels":
                  break;
                case "word":
                  return {
                    ext: "docx",
                    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  };
                case "ppt":
                  return {
                    ext: "pptx",
                    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                  };
                case "xl":
                  return {
                    ext: "xlsx",
                    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  };
                default:
                  break;
              }
            }
            if (zipHeader.filename.startsWith("xl/")) {
              return {
                ext: "xlsx",
                mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              };
            }
            if (zipHeader.filename.startsWith("3D/") && zipHeader.filename.endsWith(".model")) {
              return {
                ext: "3mf",
                mime: "model/3mf"
              };
            }
            if (zipHeader.filename === "mimetype" && zipHeader.compressedSize === zipHeader.uncompressedSize) {
              const mimeType = await tokenizer.readToken(new StringType(zipHeader.compressedSize, "utf-8"));
              switch (mimeType) {
                case "application/epub+zip":
                  return {
                    ext: "epub",
                    mime: "application/epub+zip"
                  };
                case "application/vnd.oasis.opendocument.text":
                  return {
                    ext: "odt",
                    mime: "application/vnd.oasis.opendocument.text"
                  };
                case "application/vnd.oasis.opendocument.spreadsheet":
                  return {
                    ext: "ods",
                    mime: "application/vnd.oasis.opendocument.spreadsheet"
                  };
                case "application/vnd.oasis.opendocument.presentation":
                  return {
                    ext: "odp",
                    mime: "application/vnd.oasis.opendocument.presentation"
                  };
                default:
              }
            }
            if (zipHeader.compressedSize === 0) {
              let nextHeaderIndex = -1;
              while (nextHeaderIndex < 0 && tokenizer.position < tokenizer.fileInfo.size) {
                await tokenizer.peekBuffer(this.buffer, { mayBeLess: true });
                nextHeaderIndex = this.buffer.indexOf("504B0304", 0, "hex");
                await tokenizer.ignore(nextHeaderIndex >= 0 ? nextHeaderIndex : this.buffer.length);
              }
            } else {
              await tokenizer.ignore(zipHeader.compressedSize);
            }
          }
        } catch (error) {
          if (!(error instanceof EndOfStreamError)) {
            throw error;
          }
        }
        return {
          ext: "zip",
          mime: "application/zip"
        };
      }
      if (this.checkString("OggS")) {
        await tokenizer.ignore(28);
        const type = import_node_buffer3.Buffer.alloc(8);
        await tokenizer.readBuffer(type);
        if (_check(type, [79, 112, 117, 115, 72, 101, 97, 100])) {
          return {
            ext: "opus",
            mime: "audio/opus"
          };
        }
        if (_check(type, [128, 116, 104, 101, 111, 114, 97])) {
          return {
            ext: "ogv",
            mime: "video/ogg"
          };
        }
        if (_check(type, [1, 118, 105, 100, 101, 111, 0])) {
          return {
            ext: "ogm",
            mime: "video/ogg"
          };
        }
        if (_check(type, [127, 70, 76, 65, 67])) {
          return {
            ext: "oga",
            mime: "audio/ogg"
          };
        }
        if (_check(type, [83, 112, 101, 101, 120, 32, 32])) {
          return {
            ext: "spx",
            mime: "audio/ogg"
          };
        }
        if (_check(type, [1, 118, 111, 114, 98, 105, 115])) {
          return {
            ext: "ogg",
            mime: "audio/ogg"
          };
        }
        return {
          ext: "ogx",
          mime: "application/ogg"
        };
      }
      if (this.check([80, 75]) && (this.buffer[2] === 3 || this.buffer[2] === 5 || this.buffer[2] === 7) && (this.buffer[3] === 4 || this.buffer[3] === 6 || this.buffer[3] === 8)) {
        return {
          ext: "zip",
          mime: "application/zip"
        };
      }
      if (this.checkString("ftyp", { offset: 4 }) && (this.buffer[8] & 96) !== 0) {
        const brandMajor = this.buffer.toString("binary", 8, 12).replace("\0", " ").trim();
        switch (brandMajor) {
          case "avif":
          case "avis":
            return { ext: "avif", mime: "image/avif" };
          case "mif1":
            return { ext: "heic", mime: "image/heif" };
          case "msf1":
            return { ext: "heic", mime: "image/heif-sequence" };
          case "heic":
          case "heix":
            return { ext: "heic", mime: "image/heic" };
          case "hevc":
          case "hevx":
            return { ext: "heic", mime: "image/heic-sequence" };
          case "qt":
            return { ext: "mov", mime: "video/quicktime" };
          case "M4V":
          case "M4VH":
          case "M4VP":
            return { ext: "m4v", mime: "video/x-m4v" };
          case "M4P":
            return { ext: "m4p", mime: "video/mp4" };
          case "M4B":
            return { ext: "m4b", mime: "audio/mp4" };
          case "M4A":
            return { ext: "m4a", mime: "audio/x-m4a" };
          case "F4V":
            return { ext: "f4v", mime: "video/mp4" };
          case "F4P":
            return { ext: "f4p", mime: "video/mp4" };
          case "F4A":
            return { ext: "f4a", mime: "audio/mp4" };
          case "F4B":
            return { ext: "f4b", mime: "audio/mp4" };
          case "crx":
            return { ext: "cr3", mime: "image/x-canon-cr3" };
          default:
            if (brandMajor.startsWith("3g")) {
              if (brandMajor.startsWith("3g2")) {
                return { ext: "3g2", mime: "video/3gpp2" };
              }
              return { ext: "3gp", mime: "video/3gpp" };
            }
            return { ext: "mp4", mime: "video/mp4" };
        }
      }
      if (this.checkString("MThd")) {
        return {
          ext: "mid",
          mime: "audio/midi"
        };
      }
      if (this.checkString("wOFF") && (this.check([0, 1, 0, 0], { offset: 4 }) || this.checkString("OTTO", { offset: 4 }))) {
        return {
          ext: "woff",
          mime: "font/woff"
        };
      }
      if (this.checkString("wOF2") && (this.check([0, 1, 0, 0], { offset: 4 }) || this.checkString("OTTO", { offset: 4 }))) {
        return {
          ext: "woff2",
          mime: "font/woff2"
        };
      }
      if (this.check([212, 195, 178, 161]) || this.check([161, 178, 195, 212])) {
        return {
          ext: "pcap",
          mime: "application/vnd.tcpdump.pcap"
        };
      }
      if (this.checkString("DSD ")) {
        return {
          ext: "dsf",
          mime: "audio/x-dsf"
        };
      }
      if (this.checkString("LZIP")) {
        return {
          ext: "lz",
          mime: "application/x-lzip"
        };
      }
      if (this.checkString("fLaC")) {
        return {
          ext: "flac",
          mime: "audio/x-flac"
        };
      }
      if (this.check([66, 80, 71, 251])) {
        return {
          ext: "bpg",
          mime: "image/bpg"
        };
      }
      if (this.checkString("wvpk")) {
        return {
          ext: "wv",
          mime: "audio/wavpack"
        };
      }
      if (this.checkString("%PDF")) {
        await tokenizer.ignore(1350);
        const maxBufferSize = 10 * 1024 * 1024;
        const buffer = import_node_buffer3.Buffer.alloc(Math.min(maxBufferSize, tokenizer.fileInfo.size));
        await tokenizer.readBuffer(buffer, { mayBeLess: true });
        if (buffer.includes(import_node_buffer3.Buffer.from("AIPrivateData"))) {
          return {
            ext: "ai",
            mime: "application/postscript"
          };
        }
        return {
          ext: "pdf",
          mime: "application/pdf"
        };
      }
      if (this.check([0, 97, 115, 109])) {
        return {
          ext: "wasm",
          mime: "application/wasm"
        };
      }
      if (this.check([73, 73])) {
        const fileType = await this.readTiffHeader(false);
        if (fileType) {
          return fileType;
        }
      }
      if (this.check([77, 77])) {
        const fileType = await this.readTiffHeader(true);
        if (fileType) {
          return fileType;
        }
      }
      if (this.checkString("MAC ")) {
        return {
          ext: "ape",
          mime: "audio/ape"
        };
      }
      if (this.check([26, 69, 223, 163])) {
        async function readField() {
          const msb = await tokenizer.peekNumber(UINT8);
          let mask = 128;
          let ic = 0;
          while ((msb & mask) === 0) {
            ++ic;
            mask >>= 1;
          }
          const id = import_node_buffer3.Buffer.alloc(ic + 1);
          await tokenizer.readBuffer(id);
          return id;
        }
        async function readElement() {
          const id = await readField();
          const lengthField = await readField();
          lengthField[0] ^= 128 >> lengthField.length - 1;
          const nrLength = Math.min(6, lengthField.length);
          return {
            id: id.readUIntBE(0, id.length),
            len: lengthField.readUIntBE(lengthField.length - nrLength, nrLength)
          };
        }
        async function readChildren(level, children) {
          while (children > 0) {
            const element = await readElement();
            if (element.id === 17026) {
              const rawValue = await tokenizer.readToken(new StringType(element.len, "utf-8"));
              return rawValue.replace(/\00.*$/g, "");
            }
            await tokenizer.ignore(element.len);
            --children;
          }
        }
        const re = await readElement();
        const docType = await readChildren(1, re.len);
        switch (docType) {
          case "webm":
            return {
              ext: "webm",
              mime: "video/webm"
            };
          case "matroska":
            return {
              ext: "mkv",
              mime: "video/x-matroska"
            };
          default:
            return;
        }
      }
      if (this.check([82, 73, 70, 70])) {
        if (this.check([65, 86, 73], { offset: 8 })) {
          return {
            ext: "avi",
            mime: "video/vnd.avi"
          };
        }
        if (this.check([87, 65, 86, 69], { offset: 8 })) {
          return {
            ext: "wav",
            mime: "audio/vnd.wave"
          };
        }
        if (this.check([81, 76, 67, 77], { offset: 8 })) {
          return {
            ext: "qcp",
            mime: "audio/qcelp"
          };
        }
      }
      if (this.checkString("SQLi")) {
        return {
          ext: "sqlite",
          mime: "application/x-sqlite3"
        };
      }
      if (this.check([78, 69, 83, 26])) {
        return {
          ext: "nes",
          mime: "application/x-nintendo-nes-rom"
        };
      }
      if (this.checkString("Cr24")) {
        return {
          ext: "crx",
          mime: "application/x-google-chrome-extension"
        };
      }
      if (this.checkString("MSCF") || this.checkString("ISc(")) {
        return {
          ext: "cab",
          mime: "application/vnd.ms-cab-compressed"
        };
      }
      if (this.check([237, 171, 238, 219])) {
        return {
          ext: "rpm",
          mime: "application/x-rpm"
        };
      }
      if (this.check([197, 208, 211, 198])) {
        return {
          ext: "eps",
          mime: "application/eps"
        };
      }
      if (this.check([40, 181, 47, 253])) {
        return {
          ext: "zst",
          mime: "application/zstd"
        };
      }
      if (this.check([127, 69, 76, 70])) {
        return {
          ext: "elf",
          mime: "application/x-elf"
        };
      }
      if (this.check([79, 84, 84, 79, 0])) {
        return {
          ext: "otf",
          mime: "font/otf"
        };
      }
      if (this.checkString("#!AMR")) {
        return {
          ext: "amr",
          mime: "audio/amr"
        };
      }
      if (this.checkString("{\\rtf")) {
        return {
          ext: "rtf",
          mime: "application/rtf"
        };
      }
      if (this.check([70, 76, 86, 1])) {
        return {
          ext: "flv",
          mime: "video/x-flv"
        };
      }
      if (this.checkString("IMPM")) {
        return {
          ext: "it",
          mime: "audio/x-it"
        };
      }
      if (this.checkString("-lh0-", { offset: 2 }) || this.checkString("-lh1-", { offset: 2 }) || this.checkString("-lh2-", { offset: 2 }) || this.checkString("-lh3-", { offset: 2 }) || this.checkString("-lh4-", { offset: 2 }) || this.checkString("-lh5-", { offset: 2 }) || this.checkString("-lh6-", { offset: 2 }) || this.checkString("-lh7-", { offset: 2 }) || this.checkString("-lzs-", { offset: 2 }) || this.checkString("-lz4-", { offset: 2 }) || this.checkString("-lz5-", { offset: 2 }) || this.checkString("-lhd-", { offset: 2 })) {
        return {
          ext: "lzh",
          mime: "application/x-lzh-compressed"
        };
      }
      if (this.check([0, 0, 1, 186])) {
        if (this.check([33], { offset: 4, mask: [241] })) {
          return {
            ext: "mpg",
            mime: "video/MP1S"
          };
        }
        if (this.check([68], { offset: 4, mask: [196] })) {
          return {
            ext: "mpg",
            mime: "video/MP2P"
          };
        }
      }
      if (this.checkString("ITSF")) {
        return {
          ext: "chm",
          mime: "application/vnd.ms-htmlhelp"
        };
      }
      if (this.check([253, 55, 122, 88, 90, 0])) {
        return {
          ext: "xz",
          mime: "application/x-xz"
        };
      }
      if (this.checkString("<?xml ")) {
        return {
          ext: "xml",
          mime: "application/xml"
        };
      }
      if (this.check([55, 122, 188, 175, 39, 28])) {
        return {
          ext: "7z",
          mime: "application/x-7z-compressed"
        };
      }
      if (this.check([82, 97, 114, 33, 26, 7]) && (this.buffer[6] === 0 || this.buffer[6] === 1)) {
        return {
          ext: "rar",
          mime: "application/x-rar-compressed"
        };
      }
      if (this.checkString("solid ")) {
        return {
          ext: "stl",
          mime: "model/stl"
        };
      }
      if (this.checkString("BLENDER")) {
        return {
          ext: "blend",
          mime: "application/x-blender"
        };
      }
      if (this.checkString("!<arch>")) {
        await tokenizer.ignore(8);
        const string = await tokenizer.readToken(new StringType(13, "ascii"));
        if (string === "debian-binary") {
          return {
            ext: "deb",
            mime: "application/x-deb"
          };
        }
        return {
          ext: "ar",
          mime: "application/x-unix-archive"
        };
      }
      if (this.check([137, 80, 78, 71, 13, 10, 26, 10])) {
        await tokenizer.ignore(8);
        async function readChunkHeader() {
          return {
            length: await tokenizer.readToken(INT32_BE),
            type: await tokenizer.readToken(new StringType(4, "binary"))
          };
        }
        do {
          const chunk = await readChunkHeader();
          if (chunk.length < 0) {
            return;
          }
          switch (chunk.type) {
            case "IDAT":
              return {
                ext: "png",
                mime: "image/png"
              };
            case "acTL":
              return {
                ext: "apng",
                mime: "image/apng"
              };
            default:
              await tokenizer.ignore(chunk.length + 4);
          }
        } while (tokenizer.position + 8 < tokenizer.fileInfo.size);
        return {
          ext: "png",
          mime: "image/png"
        };
      }
      if (this.check([65, 82, 82, 79, 87, 49, 0, 0])) {
        return {
          ext: "arrow",
          mime: "application/x-apache-arrow"
        };
      }
      if (this.check([103, 108, 84, 70, 2, 0, 0, 0])) {
        return {
          ext: "glb",
          mime: "model/gltf-binary"
        };
      }
      if (this.check([102, 114, 101, 101], { offset: 4 }) || this.check([109, 100, 97, 116], { offset: 4 }) || this.check([109, 111, 111, 118], { offset: 4 }) || this.check([119, 105, 100, 101], { offset: 4 })) {
        return {
          ext: "mov",
          mime: "video/quicktime"
        };
      }
      if (this.check([239, 187, 191]) && this.checkString("<?xml", { offset: 3 })) {
        return {
          ext: "xml",
          mime: "application/xml"
        };
      }
      if (this.check([73, 73, 82, 79, 8, 0, 0, 0, 24])) {
        return {
          ext: "orf",
          mime: "image/x-olympus-orf"
        };
      }
      if (this.checkString("gimp xcf ")) {
        return {
          ext: "xcf",
          mime: "image/x-xcf"
        };
      }
      if (this.check([73, 73, 85, 0, 24, 0, 0, 0, 136, 231, 116, 216])) {
        return {
          ext: "rw2",
          mime: "image/x-panasonic-rw2"
        };
      }
      if (this.check([48, 38, 178, 117, 142, 102, 207, 17, 166, 217])) {
        async function readHeader() {
          const guid = import_node_buffer3.Buffer.alloc(16);
          await tokenizer.readBuffer(guid);
          return {
            id: guid,
            size: Number(await tokenizer.readToken(UINT64_LE))
          };
        }
        await tokenizer.ignore(30);
        while (tokenizer.position + 24 < tokenizer.fileInfo.size) {
          const header = await readHeader();
          let payload = header.size - 24;
          if (_check(header.id, [145, 7, 220, 183, 183, 169, 207, 17, 142, 230, 0, 192, 12, 32, 83, 101])) {
            const typeId = import_node_buffer3.Buffer.alloc(16);
            payload -= await tokenizer.readBuffer(typeId);
            if (_check(typeId, [64, 158, 105, 248, 77, 91, 207, 17, 168, 253, 0, 128, 95, 92, 68, 43])) {
              return {
                ext: "asf",
                mime: "audio/x-ms-asf"
              };
            }
            if (_check(typeId, [192, 239, 25, 188, 77, 91, 207, 17, 168, 253, 0, 128, 95, 92, 68, 43])) {
              return {
                ext: "asf",
                mime: "video/x-ms-asf"
              };
            }
            break;
          }
          await tokenizer.ignore(payload);
        }
        return {
          ext: "asf",
          mime: "application/vnd.ms-asf"
        };
      }
      if (this.check([171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10])) {
        return {
          ext: "ktx",
          mime: "image/ktx"
        };
      }
      if ((this.check([126, 16, 4]) || this.check([126, 24, 4])) && this.check([48, 77, 73, 69], { offset: 4 })) {
        return {
          ext: "mie",
          mime: "application/x-mie"
        };
      }
      if (this.check([39, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], { offset: 2 })) {
        return {
          ext: "shp",
          mime: "application/x-esri-shape"
        };
      }
      if (this.check([0, 0, 0, 12, 106, 80, 32, 32, 13, 10, 135, 10])) {
        await tokenizer.ignore(20);
        const type = await tokenizer.readToken(new StringType(4, "ascii"));
        switch (type) {
          case "jp2 ":
            return {
              ext: "jp2",
              mime: "image/jp2"
            };
          case "jpx ":
            return {
              ext: "jpx",
              mime: "image/jpx"
            };
          case "jpm ":
            return {
              ext: "jpm",
              mime: "image/jpm"
            };
          case "mjp2":
            return {
              ext: "mj2",
              mime: "image/mj2"
            };
          default:
            return;
        }
      }
      if (this.check([255, 10]) || this.check([0, 0, 0, 12, 74, 88, 76, 32, 13, 10, 135, 10])) {
        return {
          ext: "jxl",
          mime: "image/jxl"
        };
      }
      if (this.check([254, 255, 0, 60, 0, 63, 0, 120, 0, 109, 0, 108]) || this.check([255, 254, 60, 0, 63, 0, 120, 0, 109, 0, 108, 0])) {
        return {
          ext: "xml",
          mime: "application/xml"
        };
      }
      if (this.check([0, 0, 1, 186]) || this.check([0, 0, 1, 179])) {
        return {
          ext: "mpg",
          mime: "video/mpeg"
        };
      }
      if (this.check([0, 1, 0, 0, 0])) {
        return {
          ext: "ttf",
          mime: "font/ttf"
        };
      }
      if (this.check([0, 0, 1, 0])) {
        return {
          ext: "ico",
          mime: "image/x-icon"
        };
      }
      if (this.check([0, 0, 2, 0])) {
        return {
          ext: "cur",
          mime: "image/x-icon"
        };
      }
      if (this.check([208, 207, 17, 224, 161, 177, 26, 225])) {
        return {
          ext: "cfb",
          mime: "application/x-cfb"
        };
      }
      await tokenizer.peekBuffer(this.buffer, { length: Math.min(256, tokenizer.fileInfo.size), mayBeLess: true });
      if (this.checkString("BEGIN:")) {
        if (this.checkString("VCARD", { offset: 6 })) {
          return {
            ext: "vcf",
            mime: "text/vcard"
          };
        }
        if (this.checkString("VCALENDAR", { offset: 6 })) {
          return {
            ext: "ics",
            mime: "text/calendar"
          };
        }
      }
      if (this.checkString("FUJIFILMCCD-RAW")) {
        return {
          ext: "raf",
          mime: "image/x-fujifilm-raf"
        };
      }
      if (this.checkString("Extended Module:")) {
        return {
          ext: "xm",
          mime: "audio/x-xm"
        };
      }
      if (this.checkString("Creative Voice File")) {
        return {
          ext: "voc",
          mime: "audio/x-voc"
        };
      }
      if (this.check([4, 0, 0, 0]) && this.buffer.length >= 16) {
        const jsonSize = this.buffer.readUInt32LE(12);
        if (jsonSize > 12 && this.buffer.length >= jsonSize + 16) {
          try {
            const header = this.buffer.slice(16, jsonSize + 16).toString();
            const json = JSON.parse(header);
            if (json.files) {
              return {
                ext: "asar",
                mime: "application/x-asar"
              };
            }
          } catch {
          }
        }
      }
      if (this.check([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2])) {
        return {
          ext: "mxf",
          mime: "application/mxf"
        };
      }
      if (this.checkString("SCRM", { offset: 44 })) {
        return {
          ext: "s3m",
          mime: "audio/x-s3m"
        };
      }
      if (this.check([71]) && this.check([71], { offset: 188 })) {
        return {
          ext: "mts",
          mime: "video/mp2t"
        };
      }
      if (this.check([71], { offset: 4 }) && this.check([71], { offset: 196 })) {
        return {
          ext: "mts",
          mime: "video/mp2t"
        };
      }
      if (this.check([66, 79, 79, 75, 77, 79, 66, 73], { offset: 60 })) {
        return {
          ext: "mobi",
          mime: "application/x-mobipocket-ebook"
        };
      }
      if (this.check([68, 73, 67, 77], { offset: 128 })) {
        return {
          ext: "dcm",
          mime: "application/dicom"
        };
      }
      if (this.check([76, 0, 0, 0, 1, 20, 2, 0, 0, 0, 0, 0, 192, 0, 0, 0, 0, 0, 0, 70])) {
        return {
          ext: "lnk",
          mime: "application/x.ms.shortcut"
        };
      }
      if (this.check([98, 111, 111, 107, 0, 0, 0, 0, 109, 97, 114, 107, 0, 0, 0, 0])) {
        return {
          ext: "alias",
          mime: "application/x.apple.alias"
        };
      }
      if (this.check([76, 80], { offset: 34 }) && (this.check([0, 0, 1], { offset: 8 }) || this.check([1, 0, 2], { offset: 8 }) || this.check([2, 0, 2], { offset: 8 }))) {
        return {
          ext: "eot",
          mime: "application/vnd.ms-fontobject"
        };
      }
      if (this.check([6, 6, 237, 245, 216, 29, 70, 229, 189, 49, 239, 231, 254, 116, 183, 29])) {
        return {
          ext: "indd",
          mime: "application/x-indesign"
        };
      }
      await tokenizer.peekBuffer(this.buffer, { length: Math.min(512, tokenizer.fileInfo.size), mayBeLess: true });
      if (tarHeaderChecksumMatches(this.buffer)) {
        return {
          ext: "tar",
          mime: "application/x-tar"
        };
      }
      if (this.check([255, 254, 255, 14, 83, 0, 107, 0, 101, 0, 116, 0, 99, 0, 104, 0, 85, 0, 112, 0, 32, 0, 77, 0, 111, 0, 100, 0, 101, 0, 108, 0])) {
        return {
          ext: "skp",
          mime: "application/vnd.sketchup.skp"
        };
      }
      if (this.checkString("-----BEGIN PGP MESSAGE-----")) {
        return {
          ext: "pgp",
          mime: "application/pgp-encrypted"
        };
      }
      if (this.buffer.length >= 2 && this.check([255, 224], { offset: 0, mask: [255, 224] })) {
        if (this.check([16], { offset: 1, mask: [22] })) {
          if (this.check([8], { offset: 1, mask: [8] })) {
            return {
              ext: "aac",
              mime: "audio/aac"
            };
          }
          return {
            ext: "aac",
            mime: "audio/aac"
          };
        }
        if (this.check([2], { offset: 1, mask: [6] })) {
          return {
            ext: "mp3",
            mime: "audio/mpeg"
          };
        }
        if (this.check([4], { offset: 1, mask: [6] })) {
          return {
            ext: "mp2",
            mime: "audio/mpeg"
          };
        }
        if (this.check([6], { offset: 1, mask: [6] })) {
          return {
            ext: "mp1",
            mime: "audio/mpeg"
          };
        }
      }
    }
    async readTiffTag(bigEndian) {
      const tagId = await this.tokenizer.readToken(bigEndian ? UINT16_BE : UINT16_LE);
      this.tokenizer.ignore(10);
      switch (tagId) {
        case 50341:
          return {
            ext: "arw",
            mime: "image/x-sony-arw"
          };
        case 50706:
          return {
            ext: "dng",
            mime: "image/x-adobe-dng"
          };
        default:
      }
    }
    async readTiffIFD(bigEndian) {
      const numberOfTags = await this.tokenizer.readToken(bigEndian ? UINT16_BE : UINT16_LE);
      for (let n = 0; n < numberOfTags; ++n) {
        const fileType = await this.readTiffTag(bigEndian);
        if (fileType) {
          return fileType;
        }
      }
    }
    async readTiffHeader(bigEndian) {
      const version = (bigEndian ? UINT16_BE : UINT16_LE).get(this.buffer, 2);
      const ifdOffset = (bigEndian ? UINT32_BE : UINT32_LE).get(this.buffer, 4);
      if (version === 42) {
        if (ifdOffset >= 6) {
          if (this.checkString("CR", { offset: 8 })) {
            return {
              ext: "cr2",
              mime: "image/x-canon-cr2"
            };
          }
          if (ifdOffset >= 8 && (this.check([28, 0, 254, 0], { offset: 8 }) || this.check([31, 0, 11, 0], { offset: 8 }))) {
            return {
              ext: "nef",
              mime: "image/x-nikon-nef"
            };
          }
        }
        await this.tokenizer.ignore(ifdOffset);
        const fileType = await this.readTiffIFD(false);
        return fileType ? fileType : {
          ext: "tif",
          mime: "image/tiff"
        };
      }
      if (version === 43) {
        return {
          ext: "tif",
          mime: "image/tiff"
        };
      }
    }
  };
  var supportedExtensions = new Set(extensions);
  var supportedMimeTypes = new Set(mimeTypes);

  // src/png.ts
  init_esbuild_inject();
  var import_crc_32 = __toESM(require_crc32());
  var import_buffer = __toESM(require_buffer());
  var concatAB = (...bufs) => {
    const sz = bufs.map((e) => e.byteLength).reduce((a, b) => a + b);
    const ret = import_buffer.Buffer.alloc(sz);
    let ptr = 0;
    for (const b of bufs) {
      b.copy(ret, ptr);
      ptr += b.byteLength;
    }
    return ret;
  };
  var PNGDecoder = class {
    constructor(reader) {
      this.reader = reader;
      this.req = 8;
      this.ptr = 8;
      this.repr = import_buffer.Buffer.from([]);
    }
    async catchup() {
      while (this.repr.byteLength < this.req) {
        const chunk = await this.reader.read();
        if (chunk.done)
          throw new Error("Unexpected EOF");
        this.repr = concatAB(this.repr, import_buffer.Buffer.from(chunk.value));
      }
    }
    async *chunks() {
      while (true) {
        this.req += 8;
        await this.catchup();
        const length = this.repr.readUInt32BE(this.ptr);
        const name = this.repr.slice(this.ptr + 4, this.ptr + 8).toString();
        this.ptr += 4;
        this.req += length + 4;
        await this.catchup();
        yield [name, this.repr.slice(this.ptr, this.ptr + length + 4), this.repr.readUInt32BE(this.ptr + length + 4), this.ptr];
        this.ptr += length + 8;
        if (name == "IEND")
          break;
      }
    }
    async dtor() {
    }
  };
  var PNGEncoder = class {
    constructor(bytes) {
      this.writer = bytes.getWriter();
      this.writer.write(import_buffer.Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    }
    async insertchunk(chunk) {
      const b = import_buffer.Buffer.alloc(4);
      b.writeInt32BE(chunk[1].length - 4, 0);
      await this.writer.write(b);
      await this.writer.write(chunk[1]);
      b.writeInt32BE((0, import_crc_32.buf)(chunk[1]), 0);
      await this.writer.write(b);
    }
    async dtor() {
      this.writer.releaseLock();
      await this.writer.close();
    }
  };
  var CUM0 = import_buffer.Buffer.from("CUM\x000");
  var extract = async (reader) => {
    let magic = false;
    const sneed = new PNGDecoder(reader);
    try {
      let lastIDAT = null;
      for await (const [name, chunk, crc, offset] of sneed.chunks()) {
        switch (name) {
          case "tEXt":
            if (chunk.slice(4, 4 + CUM0.length).equals(CUM0))
              magic = true;
            break;
          case "IDAT":
            if (magic) {
              lastIDAT = chunk;
              break;
            }
          case "IEND":
            if (!magic)
              return;
          default:
            break;
        }
      }
      if (lastIDAT) {
        let data = lastIDAT.slice(4);
        const fnsize = data.readUInt32LE(0);
        const fn = data.slice(4, 4 + fnsize).toString();
        data = data.slice(4 + fnsize);
        return { filename: fn, data };
      }
    } catch (e) {
      console.error(e);
    } finally {
      reader.releaseLock();
    }
  };
  var buildChunk = (tag, data) => {
    const ret = import_buffer.Buffer.alloc(data.byteLength + 4);
    ret.write(tag.substr(0, 4), 0);
    data.copy(ret, 4);
    return ret;
  };
  var BufferWriteStream = () => {
    let b = import_buffer.Buffer.from([]);
    const ret = new WritableStream({
      write(chunk) {
        b = concatAB(b, chunk);
      }
    });
    return [ret, () => b];
  };
  var inject = async (container, inj) => {
    const [writestream, extract3] = BufferWriteStream();
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
    const injb = import_buffer.Buffer.alloc(4 + inj.name.length + inj.size);
    injb.writeInt32LE(inj.name.length, 0);
    injb.write(inj.name, 4);
    import_buffer.Buffer.from(await inj.arrayBuffer()).copy(injb, 4 + inj.name.length);
    await encoder.insertchunk(["IDAT", buildChunk("IDAT", injb), 0, 0]);
    await encoder.insertchunk(["IEND", buildChunk("IEND", import_buffer.Buffer.from([])), 0, 0]);
    return extract3();
  };

  // src/webm.ts
  init_esbuild_inject();
  var import_buffer2 = __toESM(require_buffer());
  var ebml = __toESM(require_lib2());
  var findEnclosingTag = (ch, name) => {
    const first = ch.findIndex((e) => e.type == "m" && e.name == name);
    if (first < 0)
      return;
    const second = ch.slice(first).findIndex((e) => e.type == "m" && e.name == name);
    if (second < 0)
      return;
    return [
      first,
      first + second
    ];
  };
  var embed = (webm, data) => {
    const dec = new ebml.Decoder();
    const chunks = dec.decode(webm);
    const enc = new ebml.Encoder();
    let embed2 = chunks.findIndex((e) => e.name == "Tracks" && e.type == "m" && e.isEnd);
    const findOrInsert = (n) => {
      let tags = findEnclosingTag(chunks, n);
      const stack = [];
      if (!tags) {
        stack.push({
          type: "m",
          isEnd: false,
          name: n,
          data: import_buffer2.Buffer.from("")
        });
        stack.push({
          type: "m",
          isEnd: true,
          name: n,
          data: import_buffer2.Buffer.from("")
        });
        chunks.splice(embed2 + 1, 0, ...stack);
        tags = findEnclosingTag(chunks, n);
      }
      embed2 = tags[1];
    };
    findOrInsert("Tags");
    findOrInsert("Tag");
    findOrInsert("Targets");
    embed2++;
    chunks.splice(embed2 + 1, 0, ...[
      {
        type: "m",
        isEnd: false,
        name: "SimpleTag",
        data: import_buffer2.Buffer.from("")
      },
      {
        type: "8",
        isEnd: false,
        name: "TagName",
        data: import_buffer2.Buffer.from("COOM")
      },
      {
        type: "8",
        isEnd: false,
        name: "TagBinary",
        data
      },
      {
        type: "m",
        isEnd: true,
        name: "SimpleTag",
        data: import_buffer2.Buffer.from("")
      }
    ]);
    return import_buffer2.Buffer.from(enc.encode(chunks.filter((e) => e.name != "unknown")));
  };
  var extractBuff = (webm) => {
    const dec = new ebml.Decoder();
    const chunks = dec.decode(webm);
    const embed2 = chunks.findIndex((e) => e.name == "TagName" && e.type == "8" && e.value == "COOM");
    const cl = chunks.find((e) => e.name == "Cluster");
    if (cl && embed2 == -1)
      return;
    if (embed2 == -1)
      return;
    const chk = chunks[embed2 + 1];
    if (chk.type == "b" && chk.name == "TagBinary")
      return chk.data;
  };
  var extract2 = async (reader) => {
    let total = import_buffer2.Buffer.from("");
    let chunk;
    do {
      chunk = await reader.read();
      if (chunk.value)
        total = concatAB(total, import_buffer2.Buffer.from(chunk.value));
    } while (!chunk.done);
    const data = extractBuff(total);
    if (!data)
      return;
    return { filename: "embedded", data };
  };
  var inject2 = async (container, inj) => embed(import_buffer2.Buffer.from(await container.arrayBuffer()), import_buffer2.Buffer.from(await inj.arrayBuffer()));

  // src/main.ts
  var xmlhttprequest = typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : GM ? GM.xmlHttpRequest : GM_xmlhttpRequest;
  function GM_fetch(...[url, opt]) {
    function blobTo(to, blob) {
      if (to == "arrayBuffer" && blob.arrayBuffer)
        return blob.arrayBuffer();
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
          if (!event)
            return;
          if (to == "base64")
            resolve(event.target.result);
          else
            resolve(event.target.result);
        };
        if (to == "arrayBuffer")
          fileReader.readAsArrayBuffer(blob);
        else if (to == "base64")
          fileReader.readAsDataURL(blob);
        else if (to == "text")
          fileReader.readAsText(blob, "utf-8");
        else
          reject("unknown to");
      });
    }
    return new Promise((resolve, reject) => {
      const gmopt = {
        url: url.toString(),
        data: opt?.body?.toString(),
        responseType: "blob",
        method: "GET",
        onload: (resp) => {
          const blob = resp.response;
          const ref = resp;
          ref.blob = () => Promise.resolve(blob);
          ref.arrayBuffer = () => blobTo("arrayBuffer", blob);
          ref.text = () => blobTo("text", blob);
          ref.json = async () => JSON.parse(await blobTo("text", blob));
          resolve(resp);
        },
        ontimeout: () => reject("fetch timeout"),
        onerror: () => reject("fetch error"),
        onabort: () => reject("fetch abort")
      };
      xmlhttprequest(gmopt);
    });
  }
  var processors = [
    [/\.png$/, extract, inject],
    [/\.webm$/, extract2, inject2]
  ];
  var processImage = async (src) => {
    const proc = processors.find((e) => src.match(e[0]));
    if (!proc)
      return;
    const resp = await GM_fetch(src);
    const reader = (await resp.blob()).stream();
    if (!reader)
      return;
    return await proc[1](reader.getReader());
  };
  var processPost = async (post) => {
    const thumb = post.querySelector(".fileThumb");
    if (!thumb)
      return;
    const res = await processImage(thumb.href);
    if (!res)
      return;
    const replyBox = post.querySelector(".post");
    replyBox?.classList.toggle("hasembed");
    const fi = post.querySelector(".file-info");
    const cf = `
    <a class="fa fa-eye">
    </a>`;
    let a;
    a = fi.querySelector(".fa.fa-eye");
    let inlining = true;
    if (!a) {
      inlining = false;
      a = document.createRange().createContextualFragment(cf).children[0];
    }
    let type = await fileTypeFromBuffer(res.data);
    let cont;
    let w, h;
    if (type?.mime.startsWith("image")) {
      cont = document.createElement("img");
    } else if (type?.mime.startsWith("video")) {
      cont = document.createElement("video");
      cont.autoplay = true;
      cont.loop = true;
      cont.pause();
    } else if (type?.mime.startsWith("audio")) {
      cont = document.createElement("audio");
      cont.autoplay = true;
    } else {
      if (!type)
        type = { mime: "application/unknown", "ext": "data" };
      cont = document.createElement("a");
      let fn = res.filename;
      if (!fn.includes("."))
        fn += "." + type.ext;
      cont.download = fn;
      cont.textContent = "Download " + cont.download;
    }
    let src;
    src = post.getAttribute("data-processed");
    if (!src)
      src = URL.createObjectURL(new Blob([res.data], { type: type.mime }));
    if (!(cont instanceof HTMLAnchorElement))
      cont.src = src;
    else
      cont.href = src;
    await new Promise((res2) => {
      if (cont instanceof HTMLImageElement)
        cont.onload = res2;
      else if (cont instanceof HTMLVideoElement)
        cont.onloadedmetadata = res2;
      else if (cont instanceof HTMLAudioElement)
        cont.onloadedmetadata = res2;
      else
        res2(void 0);
    });
    if (cont instanceof HTMLImageElement) {
      w = cont.naturalWidth;
      h = cont.naturalHeight;
    }
    if (cont instanceof HTMLVideoElement) {
      w = cont.videoWidth;
      h = cont.videoHeight;
    }
    if (cont instanceof HTMLAudioElement || cont instanceof HTMLVideoElement) {
      cont.controls = true;
    }
    const contract = () => {
    };
    const expand = () => {
      cont.style.width = `${w}px`;
      cont.style.height = `${h}px`;
      cont.style.maxWidth = "unset";
      cont.style.maxHeight = "unset";
    };
    const imgcont = document.createElement("div");
    const p = thumb.parentElement;
    p.removeChild(thumb);
    imgcont.appendChild(thumb);
    p.appendChild(imgcont);
    thumb.style.display = "flex";
    thumb.style.gap = "5px";
    thumb.style.flexDirection = "column";
    a.classList.toggle("disabled");
    a.classList.toggle("pee-button");
    let contracted = true;
    contract();
    cont.onclick = (e) => {
      contracted = !contracted;
      contracted ? contract() : expand();
      e.stopPropagation();
    };
    let visible = false;
    a.onclick = () => {
      visible = !visible;
      if (visible) {
        if (cont instanceof HTMLVideoElement) {
          cont.play();
        }
        imgcont.appendChild(cont);
      } else {
        if (cont instanceof HTMLVideoElement) {
          cont.pause();
        }
        imgcont.removeChild(cont);
      }
      a.classList.toggle("disabled");
    };
    if (!inlining)
      fi.children[1].insertAdjacentElement("afterend", a);
    post.setAttribute("data-processed", src);
  };
  var startup = async () => {
    const mo = new MutationObserver((reco) => {
      for (const rec of reco)
        if (rec.type == "childList")
          rec.addedNodes.forEach((e) => {
            const el = e.querySelector(".postContainer");
            if (el)
              processPost(el);
          });
    });
    mo.observe(document.querySelector(".thread"), { childList: true, subtree: true });
    const getSelectedFile = () => {
      return new Promise((res) => {
        document.addEventListener("QRFile", (e) => res(e.detail), { once: true });
        document.dispatchEvent(new CustomEvent("QRGetFile"));
      });
    };
    let injected = false;
    document.addEventListener("QRDialogCreation", (e) => {
      if (injected)
        return;
      injected = true;
      const target = e.target;
      const bts = target.querySelector("#qr-filename-container");
      const i = document.createElement("i");
      i.className = "fa fa-magnet";
      const a = document.createElement("a");
      a.appendChild(i);
      a.title = "Embed File (Select a file before...)";
      bts?.appendChild(a);
      a.onclick = async (e2) => {
        const file = await getSelectedFile();
        if (!file)
          return;
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        const type = file.type;
        input.onchange = async (ev) => {
          if (input.files) {
            try {
              const proc = processors.find((e3) => file.name.match(e3[0]));
              if (!proc)
                throw new Error("Container filetype not supported");
              const buff = await proc[2](file, input.files[0]);
              document.dispatchEvent(new CustomEvent("QRSetFile", {
                detail: { file: new Blob([buff], { type }), name: file.name }
              }));
              document.dispatchEvent(new CustomEvent("CreateNotification", {
                detail: {
                  type: "success",
                  content: "File successfully embedded!",
                  lifetime: 3
                }
              }));
            } catch (err) {
              const e3 = err;
              document.dispatchEvent(new CustomEvent("CreateNotification", {
                detail: {
                  type: "error",
                  content: "Couldn't embed file: " + e3.message,
                  lifetime: 3
                }
              }));
            }
          }
        };
        input.click();
      };
    });
    await Promise.all([...document.querySelectorAll(".postContainer")].map((e) => processPost(e)));
  };
  document.addEventListener("4chanXInitFinished", startup);
  var customStyles = document.createElement("style");
  customStyles.appendChild(document.createTextNode(`
.extractedImg {
    width:auto;
    height:auto;
    max-width:125px;
    max-height:125px;
    cursor: pointer;
    
}
.hasembed {
    border-right: 3px dashed deeppink !important;
}
`));
  document.documentElement.insertBefore(customStyles, null);
})();
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
