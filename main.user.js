// ==UserScript==
// @name         PNGExtraEmbed
// @namespace    https://coom.tech/
// @version      0.186
// @description  uhh
// @author       You
// @match        https://boards.4channel.org/*
// @match        https://boards.4chan.org/*
// @match        https://desuarchive.org/*
// @match        https://archived.moe/*
// @match        https://archive.nyafuu.org/*
// @match        https://arch.b4k.co/*
// @match        https://archive.wakarimasen.moe/*
// @match        https://fireden.net/*
// @match        https://thebarchive.com/*
// @match        https://archiveofsins.com/*
// @require      https://unpkg.com/web-streams-polyfill/dist/polyfill.min.js
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @grant        GM_openInTab
// @grant        GM.openInTab
// @run-at       document-start
// @connect      4chan.org
// @connect      4channel.org
// @connect      i.4cdn.org
// @connect      *
// @icon         https://coom.tech/resources/assets/1449696017588.png
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
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };
  var __toBinary = /* @__PURE__ */ (() => {
    var table = new Uint8Array(128);
    for (var i = 0; i < 64; i++)
      table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
    return (base64) => {
      var n = base64.length, bytes = new Uint8Array((n - (base64[n - 1] == "=") - (base64[n - 2] == "=")) * 3 / 4 | 0);
      for (var i2 = 0, j = 0; i2 < n; ) {
        var c0 = table[base64.charCodeAt(i2++)], c1 = table[base64.charCodeAt(i2++)];
        var c2 = table[base64.charCodeAt(i2++)], c3 = table[base64.charCodeAt(i2++)];
        bytes[j++] = c0 << 2 | c1 >> 4;
        bytes[j++] = c1 << 4 | c2 >> 2;
        bytes[j++] = c2 << 6 | c3;
      }
      return bytes;
    };
  })();

  // <define:BUILD_VERSION>
  var define_BUILD_VERSION_default;
  var init_define_BUILD_VERSION = __esm({
    "<define:BUILD_VERSION>"() {
      define_BUILD_VERSION_default = [0, 186];
    }
  });

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports) {
      "use strict";
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
      init_esbuild_inject();
      var base64 = require_base64_js();
      var ieee7542 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer19;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer19.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer19.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
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
      Object.defineProperty(Buffer19.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer19.isBuffer(this))
            return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer19.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer19.isBuffer(this))
            return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf2 = new Uint8Array(length);
        Object.setPrototypeOf(buf2, Buffer19.prototype);
        return buf2;
      }
      function Buffer19(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError('The "string" argument must be of type string. Received type number');
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer19.poolSize = 8192;
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
          return Buffer19.from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b)
          return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer19.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
      }
      Buffer19.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer19.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer19, Uint8Array);
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
      Buffer19.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer19.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer19.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer19.isEncoding(encoding)) {
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
        Object.setPrototypeOf(buf2, Buffer19.prototype);
        return buf2;
      }
      function fromObject(obj) {
        if (Buffer19.isBuffer(obj)) {
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
        return Buffer19.alloc(+length);
      }
      Buffer19.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer19.prototype;
      };
      Buffer19.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array))
          a = Buffer19.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array))
          b = Buffer19.from(b, b.offset, b.byteLength);
        if (!Buffer19.isBuffer(a) || !Buffer19.isBuffer(b)) {
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
      Buffer19.isEncoding = function isEncoding(encoding) {
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
      Buffer19.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer19.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer = Buffer19.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf2 = list[i];
          if (isInstance(buf2, Uint8Array)) {
            if (pos + buf2.length > buffer.length) {
              if (!Buffer19.isBuffer(buf2))
                buf2 = Buffer19.from(buf2);
              buf2.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(buffer, buf2, pos);
            }
          } else if (!Buffer19.isBuffer(buf2)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf2.copy(buffer, pos);
          }
          pos += buf2.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer19.isBuffer(string)) {
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
      Buffer19.byteLength = byteLength;
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
      Buffer19.prototype._isBuffer = true;
      function swap(b, n, m) {
        const i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer19.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer19.prototype.swap32 = function swap32() {
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
      Buffer19.prototype.swap64 = function swap64() {
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
      Buffer19.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0)
          return "";
        if (arguments.length === 0)
          return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer19.prototype.toLocaleString = Buffer19.prototype.toString;
      Buffer19.prototype.equals = function equals(b) {
        if (!Buffer19.isBuffer(b))
          throw new TypeError("Argument must be a Buffer");
        if (this === b)
          return true;
        return Buffer19.compare(this, b) === 0;
      };
      Buffer19.prototype.inspect = function inspect() {
        let str = "";
        const max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max)
          str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer19.prototype[customInspectSymbol] = Buffer19.prototype.inspect;
      }
      Buffer19.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer19.from(target, target.offset, target.byteLength);
        }
        if (!Buffer19.isBuffer(target)) {
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
          val = Buffer19.from(val, encoding);
        }
        if (Buffer19.isBuffer(val)) {
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
      Buffer19.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer19.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer19.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
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
      Buffer19.prototype.write = function write2(string, offset, length, encoding) {
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
      Buffer19.prototype.toJSON = function toJSON() {
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
      Buffer19.prototype.slice = function slice(start, end) {
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
        Object.setPrototypeOf(newBuf, Buffer19.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0)
          throw new RangeError("offset is not uint");
        if (offset + ext > length)
          throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer19.prototype.readUintLE = Buffer19.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
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
      Buffer19.prototype.readUintBE = Buffer19.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
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
      Buffer19.prototype.readUint8 = Buffer19.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer19.prototype.readUint16LE = Buffer19.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer19.prototype.readUint16BE = Buffer19.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer19.prototype.readUint32LE = Buffer19.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer19.prototype.readUint32BE = Buffer19.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer19.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
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
      Buffer19.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
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
      Buffer19.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
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
      Buffer19.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
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
      Buffer19.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128))
          return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer19.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer19.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer19.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer19.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer19.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
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
      Buffer19.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
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
      Buffer19.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee7542.read(this, offset, true, 23, 4);
      };
      Buffer19.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee7542.read(this, offset, false, 23, 4);
      };
      Buffer19.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee7542.read(this, offset, true, 52, 8);
      };
      Buffer19.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee7542.read(this, offset, false, 52, 8);
      };
      function checkInt(buf2, value, offset, ext, max, min) {
        if (!Buffer19.isBuffer(buf2))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min)
          throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf2.length)
          throw new RangeError("Index out of range");
      }
      Buffer19.prototype.writeUintLE = Buffer19.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
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
      Buffer19.prototype.writeUintBE = Buffer19.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
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
      Buffer19.prototype.writeUint8 = Buffer19.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer19.prototype.writeUint16LE = Buffer19.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer19.prototype.writeUint16BE = Buffer19.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer19.prototype.writeUint32LE = Buffer19.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
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
      Buffer19.prototype.writeUint32BE = Buffer19.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
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
      Buffer19.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer19.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer19.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
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
      Buffer19.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
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
      Buffer19.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 127, -128);
        if (value < 0)
          value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer19.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer19.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer19.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
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
      Buffer19.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
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
      Buffer19.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer19.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
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
      Buffer19.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer19.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
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
      Buffer19.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer19.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer19.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer19.isBuffer(target))
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
      Buffer19.prototype.fill = function fill(val, start, end, encoding) {
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
          if (typeof encoding === "string" && !Buffer19.isEncoding(encoding)) {
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
          const bytes = Buffer19.isBuffer(val) ? val : Buffer19.from(val, encoding);
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

  // node_modules/lodash/lodash.js
  var require_lodash = __commonJS({
    "node_modules/lodash/lodash.js"(exports, module) {
      init_define_BUILD_VERSION();
      init_esbuild_inject();
      (function() {
        var undefined2;
        var VERSION = "4.17.21";
        var LARGE_ARRAY_SIZE = 200;
        var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
        var HASH_UNDEFINED = "__lodash_hash_undefined__";
        var MAX_MEMOIZE_SIZE = 500;
        var PLACEHOLDER = "__lodash_placeholder__";
        var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
        var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
        var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
        var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
        var HOT_COUNT = 800, HOT_SPAN = 16;
        var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
        var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
        var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
        var wrapFlags = [
          ["ary", WRAP_ARY_FLAG],
          ["bind", WRAP_BIND_FLAG],
          ["bindKey", WRAP_BIND_KEY_FLAG],
          ["curry", WRAP_CURRY_FLAG],
          ["curryRight", WRAP_CURRY_RIGHT_FLAG],
          ["flip", WRAP_FLIP_FLAG],
          ["partial", WRAP_PARTIAL_FLAG],
          ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
          ["rearg", WRAP_REARG_FLAG]
        ];
        var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
        var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
        var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
        var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
        var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
        var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
        var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
        var reTrimStart = /^\s+/;
        var reWhitespace = /\s/;
        var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
        var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
        var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
        var reEscapeChar = /\\(\\)?/g;
        var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
        var reFlags = /\w*$/;
        var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
        var reIsBinary = /^0b[01]+$/i;
        var reIsHostCtor = /^\[object .+?Constructor\]$/;
        var reIsOctal = /^0o[0-7]+$/i;
        var reIsUint = /^(?:0|[1-9]\d*)$/;
        var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
        var reNoMatch = /($^)/;
        var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
        var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
        var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
        var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
        var reApos = RegExp(rsApos, "g");
        var reComboMark = RegExp(rsCombo, "g");
        var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
        var reUnicodeWord = RegExp([
          rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
          rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
          rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
          rsUpper + "+" + rsOptContrUpper,
          rsOrdUpper,
          rsOrdLower,
          rsDigits,
          rsEmoji
        ].join("|"), "g");
        var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
        var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
        var contextProps = [
          "Array",
          "Buffer",
          "DataView",
          "Date",
          "Error",
          "Float32Array",
          "Float64Array",
          "Function",
          "Int8Array",
          "Int16Array",
          "Int32Array",
          "Map",
          "Math",
          "Object",
          "Promise",
          "RegExp",
          "Set",
          "String",
          "Symbol",
          "TypeError",
          "Uint8Array",
          "Uint8ClampedArray",
          "Uint16Array",
          "Uint32Array",
          "WeakMap",
          "_",
          "clearTimeout",
          "isFinite",
          "parseInt",
          "setTimeout"
        ];
        var templateCounter = -1;
        var typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
        var cloneableTags = {};
        cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
        cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
        var deburredLetters = {
          "\xC0": "A",
          "\xC1": "A",
          "\xC2": "A",
          "\xC3": "A",
          "\xC4": "A",
          "\xC5": "A",
          "\xE0": "a",
          "\xE1": "a",
          "\xE2": "a",
          "\xE3": "a",
          "\xE4": "a",
          "\xE5": "a",
          "\xC7": "C",
          "\xE7": "c",
          "\xD0": "D",
          "\xF0": "d",
          "\xC8": "E",
          "\xC9": "E",
          "\xCA": "E",
          "\xCB": "E",
          "\xE8": "e",
          "\xE9": "e",
          "\xEA": "e",
          "\xEB": "e",
          "\xCC": "I",
          "\xCD": "I",
          "\xCE": "I",
          "\xCF": "I",
          "\xEC": "i",
          "\xED": "i",
          "\xEE": "i",
          "\xEF": "i",
          "\xD1": "N",
          "\xF1": "n",
          "\xD2": "O",
          "\xD3": "O",
          "\xD4": "O",
          "\xD5": "O",
          "\xD6": "O",
          "\xD8": "O",
          "\xF2": "o",
          "\xF3": "o",
          "\xF4": "o",
          "\xF5": "o",
          "\xF6": "o",
          "\xF8": "o",
          "\xD9": "U",
          "\xDA": "U",
          "\xDB": "U",
          "\xDC": "U",
          "\xF9": "u",
          "\xFA": "u",
          "\xFB": "u",
          "\xFC": "u",
          "\xDD": "Y",
          "\xFD": "y",
          "\xFF": "y",
          "\xC6": "Ae",
          "\xE6": "ae",
          "\xDE": "Th",
          "\xFE": "th",
          "\xDF": "ss",
          "\u0100": "A",
          "\u0102": "A",
          "\u0104": "A",
          "\u0101": "a",
          "\u0103": "a",
          "\u0105": "a",
          "\u0106": "C",
          "\u0108": "C",
          "\u010A": "C",
          "\u010C": "C",
          "\u0107": "c",
          "\u0109": "c",
          "\u010B": "c",
          "\u010D": "c",
          "\u010E": "D",
          "\u0110": "D",
          "\u010F": "d",
          "\u0111": "d",
          "\u0112": "E",
          "\u0114": "E",
          "\u0116": "E",
          "\u0118": "E",
          "\u011A": "E",
          "\u0113": "e",
          "\u0115": "e",
          "\u0117": "e",
          "\u0119": "e",
          "\u011B": "e",
          "\u011C": "G",
          "\u011E": "G",
          "\u0120": "G",
          "\u0122": "G",
          "\u011D": "g",
          "\u011F": "g",
          "\u0121": "g",
          "\u0123": "g",
          "\u0124": "H",
          "\u0126": "H",
          "\u0125": "h",
          "\u0127": "h",
          "\u0128": "I",
          "\u012A": "I",
          "\u012C": "I",
          "\u012E": "I",
          "\u0130": "I",
          "\u0129": "i",
          "\u012B": "i",
          "\u012D": "i",
          "\u012F": "i",
          "\u0131": "i",
          "\u0134": "J",
          "\u0135": "j",
          "\u0136": "K",
          "\u0137": "k",
          "\u0138": "k",
          "\u0139": "L",
          "\u013B": "L",
          "\u013D": "L",
          "\u013F": "L",
          "\u0141": "L",
          "\u013A": "l",
          "\u013C": "l",
          "\u013E": "l",
          "\u0140": "l",
          "\u0142": "l",
          "\u0143": "N",
          "\u0145": "N",
          "\u0147": "N",
          "\u014A": "N",
          "\u0144": "n",
          "\u0146": "n",
          "\u0148": "n",
          "\u014B": "n",
          "\u014C": "O",
          "\u014E": "O",
          "\u0150": "O",
          "\u014D": "o",
          "\u014F": "o",
          "\u0151": "o",
          "\u0154": "R",
          "\u0156": "R",
          "\u0158": "R",
          "\u0155": "r",
          "\u0157": "r",
          "\u0159": "r",
          "\u015A": "S",
          "\u015C": "S",
          "\u015E": "S",
          "\u0160": "S",
          "\u015B": "s",
          "\u015D": "s",
          "\u015F": "s",
          "\u0161": "s",
          "\u0162": "T",
          "\u0164": "T",
          "\u0166": "T",
          "\u0163": "t",
          "\u0165": "t",
          "\u0167": "t",
          "\u0168": "U",
          "\u016A": "U",
          "\u016C": "U",
          "\u016E": "U",
          "\u0170": "U",
          "\u0172": "U",
          "\u0169": "u",
          "\u016B": "u",
          "\u016D": "u",
          "\u016F": "u",
          "\u0171": "u",
          "\u0173": "u",
          "\u0174": "W",
          "\u0175": "w",
          "\u0176": "Y",
          "\u0177": "y",
          "\u0178": "Y",
          "\u0179": "Z",
          "\u017B": "Z",
          "\u017D": "Z",
          "\u017A": "z",
          "\u017C": "z",
          "\u017E": "z",
          "\u0132": "IJ",
          "\u0133": "ij",
          "\u0152": "Oe",
          "\u0153": "oe",
          "\u0149": "'n",
          "\u017F": "s"
        };
        var htmlEscapes = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        };
        var htmlUnescapes = {
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": '"',
          "&#39;": "'"
        };
        var stringEscapes = {
          "\\": "\\",
          "'": "'",
          "\n": "n",
          "\r": "r",
          "\u2028": "u2028",
          "\u2029": "u2029"
        };
        var freeParseFloat = parseFloat, freeParseInt = parseInt;
        var freeGlobal = typeof window == "object" && window && window.Object === Object && window;
        var freeSelf = typeof self == "object" && self && self.Object === Object && self;
        var root = freeGlobal || freeSelf || Function("return this")();
        var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
        var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
        var moduleExports = freeModule && freeModule.exports === freeExports;
        var freeProcess = moduleExports && freeGlobal.process;
        var nodeUtil = function() {
          try {
            var types = freeModule && freeModule.require && freeModule.require("util").types;
            if (types) {
              return types;
            }
            return freeProcess && freeProcess.binding && freeProcess.binding("util");
          } catch (e) {
          }
        }();
        var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
        function apply(func, thisArg, args) {
          switch (args.length) {
            case 0:
              return func.call(thisArg);
            case 1:
              return func.call(thisArg, args[0]);
            case 2:
              return func.call(thisArg, args[0], args[1]);
            case 3:
              return func.call(thisArg, args[0], args[1], args[2]);
          }
          return func.apply(thisArg, args);
        }
        function arrayAggregator(array, setter, iteratee, accumulator) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            var value = array[index];
            setter(accumulator, value, iteratee(value), array);
          }
          return accumulator;
        }
        function arrayEach(array, iteratee) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayEachRight(array, iteratee) {
          var length = array == null ? 0 : array.length;
          while (length--) {
            if (iteratee(array[length], length, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayEvery(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (!predicate(array[index], index, array)) {
              return false;
            }
          }
          return true;
        }
        function arrayFilter(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result[resIndex++] = value;
            }
          }
          return result;
        }
        function arrayIncludes(array, value) {
          var length = array == null ? 0 : array.length;
          return !!length && baseIndexOf(array, value, 0) > -1;
        }
        function arrayIncludesWith(array, value, comparator) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (comparator(value, array[index])) {
              return true;
            }
          }
          return false;
        }
        function arrayMap(array, iteratee) {
          var index = -1, length = array == null ? 0 : array.length, result = Array(length);
          while (++index < length) {
            result[index] = iteratee(array[index], index, array);
          }
          return result;
        }
        function arrayPush(array, values) {
          var index = -1, length = values.length, offset = array.length;
          while (++index < length) {
            array[offset + index] = values[index];
          }
          return array;
        }
        function arrayReduce(array, iteratee, accumulator, initAccum) {
          var index = -1, length = array == null ? 0 : array.length;
          if (initAccum && length) {
            accumulator = array[++index];
          }
          while (++index < length) {
            accumulator = iteratee(accumulator, array[index], index, array);
          }
          return accumulator;
        }
        function arrayReduceRight(array, iteratee, accumulator, initAccum) {
          var length = array == null ? 0 : array.length;
          if (initAccum && length) {
            accumulator = array[--length];
          }
          while (length--) {
            accumulator = iteratee(accumulator, array[length], length, array);
          }
          return accumulator;
        }
        function arraySome(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (predicate(array[index], index, array)) {
              return true;
            }
          }
          return false;
        }
        var asciiSize = baseProperty("length");
        function asciiToArray(string) {
          return string.split("");
        }
        function asciiWords(string) {
          return string.match(reAsciiWord) || [];
        }
        function baseFindKey(collection, predicate, eachFunc) {
          var result;
          eachFunc(collection, function(value, key, collection2) {
            if (predicate(value, key, collection2)) {
              result = key;
              return false;
            }
          });
          return result;
        }
        function baseFindIndex(array, predicate, fromIndex, fromRight) {
          var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
          while (fromRight ? index-- : ++index < length) {
            if (predicate(array[index], index, array)) {
              return index;
            }
          }
          return -1;
        }
        function baseIndexOf(array, value, fromIndex) {
          return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
        }
        function baseIndexOfWith(array, value, fromIndex, comparator) {
          var index = fromIndex - 1, length = array.length;
          while (++index < length) {
            if (comparator(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function baseIsNaN(value) {
          return value !== value;
        }
        function baseMean(array, iteratee) {
          var length = array == null ? 0 : array.length;
          return length ? baseSum(array, iteratee) / length : NAN;
        }
        function baseProperty(key) {
          return function(object) {
            return object == null ? undefined2 : object[key];
          };
        }
        function basePropertyOf(object) {
          return function(key) {
            return object == null ? undefined2 : object[key];
          };
        }
        function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
          eachFunc(collection, function(value, index, collection2) {
            accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
          });
          return accumulator;
        }
        function baseSortBy(array, comparer) {
          var length = array.length;
          array.sort(comparer);
          while (length--) {
            array[length] = array[length].value;
          }
          return array;
        }
        function baseSum(array, iteratee) {
          var result, index = -1, length = array.length;
          while (++index < length) {
            var current = iteratee(array[index]);
            if (current !== undefined2) {
              result = result === undefined2 ? current : result + current;
            }
          }
          return result;
        }
        function baseTimes(n, iteratee) {
          var index = -1, result = Array(n);
          while (++index < n) {
            result[index] = iteratee(index);
          }
          return result;
        }
        function baseToPairs(object, props) {
          return arrayMap(props, function(key) {
            return [key, object[key]];
          });
        }
        function baseTrim(string) {
          return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
        }
        function baseUnary(func) {
          return function(value) {
            return func(value);
          };
        }
        function baseValues(object, props) {
          return arrayMap(props, function(key) {
            return object[key];
          });
        }
        function cacheHas(cache2, key) {
          return cache2.has(key);
        }
        function charsStartIndex(strSymbols, chrSymbols) {
          var index = -1, length = strSymbols.length;
          while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
          }
          return index;
        }
        function charsEndIndex(strSymbols, chrSymbols) {
          var index = strSymbols.length;
          while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
          }
          return index;
        }
        function countHolders(array, placeholder) {
          var length = array.length, result = 0;
          while (length--) {
            if (array[length] === placeholder) {
              ++result;
            }
          }
          return result;
        }
        var deburrLetter = basePropertyOf(deburredLetters);
        var escapeHtmlChar = basePropertyOf(htmlEscapes);
        function escapeStringChar(chr) {
          return "\\" + stringEscapes[chr];
        }
        function getValue(object, key) {
          return object == null ? undefined2 : object[key];
        }
        function hasUnicode(string) {
          return reHasUnicode.test(string);
        }
        function hasUnicodeWord(string) {
          return reHasUnicodeWord.test(string);
        }
        function iteratorToArray(iterator) {
          var data, result = [];
          while (!(data = iterator.next()).done) {
            result.push(data.value);
          }
          return result;
        }
        function mapToArray(map) {
          var index = -1, result = Array(map.size);
          map.forEach(function(value, key) {
            result[++index] = [key, value];
          });
          return result;
        }
        function overArg(func, transform) {
          return function(arg) {
            return func(transform(arg));
          };
        }
        function replaceHolders(array, placeholder) {
          var index = -1, length = array.length, resIndex = 0, result = [];
          while (++index < length) {
            var value = array[index];
            if (value === placeholder || value === PLACEHOLDER) {
              array[index] = PLACEHOLDER;
              result[resIndex++] = index;
            }
          }
          return result;
        }
        function setToArray(set) {
          var index = -1, result = Array(set.size);
          set.forEach(function(value) {
            result[++index] = value;
          });
          return result;
        }
        function setToPairs(set) {
          var index = -1, result = Array(set.size);
          set.forEach(function(value) {
            result[++index] = [value, value];
          });
          return result;
        }
        function strictIndexOf(array, value, fromIndex) {
          var index = fromIndex - 1, length = array.length;
          while (++index < length) {
            if (array[index] === value) {
              return index;
            }
          }
          return -1;
        }
        function strictLastIndexOf(array, value, fromIndex) {
          var index = fromIndex + 1;
          while (index--) {
            if (array[index] === value) {
              return index;
            }
          }
          return index;
        }
        function stringSize(string) {
          return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
        }
        function stringToArray(string) {
          return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
        }
        function trimmedEndIndex(string) {
          var index = string.length;
          while (index-- && reWhitespace.test(string.charAt(index))) {
          }
          return index;
        }
        var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
        function unicodeSize(string) {
          var result = reUnicode.lastIndex = 0;
          while (reUnicode.test(string)) {
            ++result;
          }
          return result;
        }
        function unicodeToArray(string) {
          return string.match(reUnicode) || [];
        }
        function unicodeWords(string) {
          return string.match(reUnicodeWord) || [];
        }
        var runInContext = function runInContext2(context) {
          context = context == null ? root : _2.defaults(root.Object(), context, _2.pick(root, contextProps));
          var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
          var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
          var coreJsData = context["__core-js_shared__"];
          var funcToString = funcProto.toString;
          var hasOwnProperty = objectProto.hasOwnProperty;
          var idCounter = 0;
          var maskSrcKey = function() {
            var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
            return uid ? "Symbol(src)_1." + uid : "";
          }();
          var nativeObjectToString = objectProto.toString;
          var objectCtorString = funcToString.call(Object2);
          var oldDash = root._;
          var reIsNative = RegExp2("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
          var Buffer19 = moduleExports ? context.Buffer : undefined2, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer19 ? Buffer19.allocUnsafe : undefined2, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined2, symIterator = Symbol2 ? Symbol2.iterator : undefined2, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined2;
          var defineProperty = function() {
            try {
              var func = getNative(Object2, "defineProperty");
              func({}, "", {});
              return func;
            } catch (e) {
            }
          }();
          var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
          var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer19 ? Buffer19.isBuffer : undefined2, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
          var DataView2 = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap2 = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
          var metaMap = WeakMap2 && new WeakMap2();
          var realNames = {};
          var dataViewCtorString = toSource(DataView2), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
          var symbolProto = Symbol2 ? Symbol2.prototype : undefined2, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2, symbolToString = symbolProto ? symbolProto.toString : undefined2;
          function lodash(value) {
            if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
              if (value instanceof LodashWrapper) {
                return value;
              }
              if (hasOwnProperty.call(value, "__wrapped__")) {
                return wrapperClone(value);
              }
            }
            return new LodashWrapper(value);
          }
          var baseCreate = function() {
            function object() {
            }
            return function(proto) {
              if (!isObject(proto)) {
                return {};
              }
              if (objectCreate) {
                return objectCreate(proto);
              }
              object.prototype = proto;
              var result2 = new object();
              object.prototype = undefined2;
              return result2;
            };
          }();
          function baseLodash() {
          }
          function LodashWrapper(value, chainAll) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__chain__ = !!chainAll;
            this.__index__ = 0;
            this.__values__ = undefined2;
          }
          lodash.templateSettings = {
            "escape": reEscape,
            "evaluate": reEvaluate,
            "interpolate": reInterpolate,
            "variable": "",
            "imports": {
              "_": lodash
            }
          };
          lodash.prototype = baseLodash.prototype;
          lodash.prototype.constructor = lodash;
          LodashWrapper.prototype = baseCreate(baseLodash.prototype);
          LodashWrapper.prototype.constructor = LodashWrapper;
          function LazyWrapper(value) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__dir__ = 1;
            this.__filtered__ = false;
            this.__iteratees__ = [];
            this.__takeCount__ = MAX_ARRAY_LENGTH;
            this.__views__ = [];
          }
          function lazyClone() {
            var result2 = new LazyWrapper(this.__wrapped__);
            result2.__actions__ = copyArray(this.__actions__);
            result2.__dir__ = this.__dir__;
            result2.__filtered__ = this.__filtered__;
            result2.__iteratees__ = copyArray(this.__iteratees__);
            result2.__takeCount__ = this.__takeCount__;
            result2.__views__ = copyArray(this.__views__);
            return result2;
          }
          function lazyReverse() {
            if (this.__filtered__) {
              var result2 = new LazyWrapper(this);
              result2.__dir__ = -1;
              result2.__filtered__ = true;
            } else {
              result2 = this.clone();
              result2.__dir__ *= -1;
            }
            return result2;
          }
          function lazyValue() {
            var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
            if (!isArr || !isRight && arrLength == length && takeCount == length) {
              return baseWrapperValue(array, this.__actions__);
            }
            var result2 = [];
            outer:
              while (length-- && resIndex < takeCount) {
                index += dir;
                var iterIndex = -1, value = array[index];
                while (++iterIndex < iterLength) {
                  var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                  if (type == LAZY_MAP_FLAG) {
                    value = computed;
                  } else if (!computed) {
                    if (type == LAZY_FILTER_FLAG) {
                      continue outer;
                    } else {
                      break outer;
                    }
                  }
                }
                result2[resIndex++] = value;
              }
            return result2;
          }
          LazyWrapper.prototype = baseCreate(baseLodash.prototype);
          LazyWrapper.prototype.constructor = LazyWrapper;
          function Hash(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          function hashClear() {
            this.__data__ = nativeCreate ? nativeCreate(null) : {};
            this.size = 0;
          }
          function hashDelete(key) {
            var result2 = this.has(key) && delete this.__data__[key];
            this.size -= result2 ? 1 : 0;
            return result2;
          }
          function hashGet(key) {
            var data = this.__data__;
            if (nativeCreate) {
              var result2 = data[key];
              return result2 === HASH_UNDEFINED ? undefined2 : result2;
            }
            return hasOwnProperty.call(data, key) ? data[key] : undefined2;
          }
          function hashHas(key) {
            var data = this.__data__;
            return nativeCreate ? data[key] !== undefined2 : hasOwnProperty.call(data, key);
          }
          function hashSet(key, value) {
            var data = this.__data__;
            this.size += this.has(key) ? 0 : 1;
            data[key] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
            return this;
          }
          Hash.prototype.clear = hashClear;
          Hash.prototype["delete"] = hashDelete;
          Hash.prototype.get = hashGet;
          Hash.prototype.has = hashHas;
          Hash.prototype.set = hashSet;
          function ListCache(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          function listCacheClear() {
            this.__data__ = [];
            this.size = 0;
          }
          function listCacheDelete(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
              return false;
            }
            var lastIndex = data.length - 1;
            if (index == lastIndex) {
              data.pop();
            } else {
              splice.call(data, index, 1);
            }
            --this.size;
            return true;
          }
          function listCacheGet(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            return index < 0 ? undefined2 : data[index][1];
          }
          function listCacheHas(key) {
            return assocIndexOf(this.__data__, key) > -1;
          }
          function listCacheSet(key, value) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
              ++this.size;
              data.push([key, value]);
            } else {
              data[index][1] = value;
            }
            return this;
          }
          ListCache.prototype.clear = listCacheClear;
          ListCache.prototype["delete"] = listCacheDelete;
          ListCache.prototype.get = listCacheGet;
          ListCache.prototype.has = listCacheHas;
          ListCache.prototype.set = listCacheSet;
          function MapCache(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          function mapCacheClear() {
            this.size = 0;
            this.__data__ = {
              "hash": new Hash(),
              "map": new (Map2 || ListCache)(),
              "string": new Hash()
            };
          }
          function mapCacheDelete(key) {
            var result2 = getMapData(this, key)["delete"](key);
            this.size -= result2 ? 1 : 0;
            return result2;
          }
          function mapCacheGet(key) {
            return getMapData(this, key).get(key);
          }
          function mapCacheHas(key) {
            return getMapData(this, key).has(key);
          }
          function mapCacheSet(key, value) {
            var data = getMapData(this, key), size2 = data.size;
            data.set(key, value);
            this.size += data.size == size2 ? 0 : 1;
            return this;
          }
          MapCache.prototype.clear = mapCacheClear;
          MapCache.prototype["delete"] = mapCacheDelete;
          MapCache.prototype.get = mapCacheGet;
          MapCache.prototype.has = mapCacheHas;
          MapCache.prototype.set = mapCacheSet;
          function SetCache(values2) {
            var index = -1, length = values2 == null ? 0 : values2.length;
            this.__data__ = new MapCache();
            while (++index < length) {
              this.add(values2[index]);
            }
          }
          function setCacheAdd(value) {
            this.__data__.set(value, HASH_UNDEFINED);
            return this;
          }
          function setCacheHas(value) {
            return this.__data__.has(value);
          }
          SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
          SetCache.prototype.has = setCacheHas;
          function Stack(entries) {
            var data = this.__data__ = new ListCache(entries);
            this.size = data.size;
          }
          function stackClear() {
            this.__data__ = new ListCache();
            this.size = 0;
          }
          function stackDelete(key) {
            var data = this.__data__, result2 = data["delete"](key);
            this.size = data.size;
            return result2;
          }
          function stackGet(key) {
            return this.__data__.get(key);
          }
          function stackHas(key) {
            return this.__data__.has(key);
          }
          function stackSet(key, value) {
            var data = this.__data__;
            if (data instanceof ListCache) {
              var pairs = data.__data__;
              if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
                pairs.push([key, value]);
                this.size = ++data.size;
                return this;
              }
              data = this.__data__ = new MapCache(pairs);
            }
            data.set(key, value);
            this.size = data.size;
            return this;
          }
          Stack.prototype.clear = stackClear;
          Stack.prototype["delete"] = stackDelete;
          Stack.prototype.get = stackGet;
          Stack.prototype.has = stackHas;
          Stack.prototype.set = stackSet;
          function arrayLikeKeys(value, inherited) {
            var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
            for (var key in value) {
              if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
                result2.push(key);
              }
            }
            return result2;
          }
          function arraySample(array) {
            var length = array.length;
            return length ? array[baseRandom(0, length - 1)] : undefined2;
          }
          function arraySampleSize(array, n) {
            return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
          }
          function arrayShuffle(array) {
            return shuffleSelf(copyArray(array));
          }
          function assignMergeValue(object, key, value) {
            if (value !== undefined2 && !eq(object[key], value) || value === undefined2 && !(key in object)) {
              baseAssignValue(object, key, value);
            }
          }
          function assignValue(object, key, value) {
            var objValue = object[key];
            if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined2 && !(key in object)) {
              baseAssignValue(object, key, value);
            }
          }
          function assocIndexOf(array, key) {
            var length = array.length;
            while (length--) {
              if (eq(array[length][0], key)) {
                return length;
              }
            }
            return -1;
          }
          function baseAggregator(collection, setter, iteratee2, accumulator) {
            baseEach(collection, function(value, key, collection2) {
              setter(accumulator, value, iteratee2(value), collection2);
            });
            return accumulator;
          }
          function baseAssign(object, source) {
            return object && copyObject(source, keys(source), object);
          }
          function baseAssignIn(object, source) {
            return object && copyObject(source, keysIn(source), object);
          }
          function baseAssignValue(object, key, value) {
            if (key == "__proto__" && defineProperty) {
              defineProperty(object, key, {
                "configurable": true,
                "enumerable": true,
                "value": value,
                "writable": true
              });
            } else {
              object[key] = value;
            }
          }
          function baseAt(object, paths) {
            var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
            while (++index < length) {
              result2[index] = skip ? undefined2 : get(object, paths[index]);
            }
            return result2;
          }
          function baseClamp(number, lower, upper) {
            if (number === number) {
              if (upper !== undefined2) {
                number = number <= upper ? number : upper;
              }
              if (lower !== undefined2) {
                number = number >= lower ? number : lower;
              }
            }
            return number;
          }
          function baseClone(value, bitmask, customizer, key, object, stack) {
            var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
            if (customizer) {
              result2 = object ? customizer(value, key, object, stack) : customizer(value);
            }
            if (result2 !== undefined2) {
              return result2;
            }
            if (!isObject(value)) {
              return value;
            }
            var isArr = isArray(value);
            if (isArr) {
              result2 = initCloneArray(value);
              if (!isDeep) {
                return copyArray(value, result2);
              }
            } else {
              var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
              if (isBuffer(value)) {
                return cloneBuffer(value, isDeep);
              }
              if (tag == objectTag || tag == argsTag || isFunc && !object) {
                result2 = isFlat || isFunc ? {} : initCloneObject(value);
                if (!isDeep) {
                  return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
                }
              } else {
                if (!cloneableTags[tag]) {
                  return object ? value : {};
                }
                result2 = initCloneByTag(value, tag, isDeep);
              }
            }
            stack || (stack = new Stack());
            var stacked = stack.get(value);
            if (stacked) {
              return stacked;
            }
            stack.set(value, result2);
            if (isSet(value)) {
              value.forEach(function(subValue) {
                result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
              });
            } else if (isMap(value)) {
              value.forEach(function(subValue, key2) {
                result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
              });
            }
            var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
            var props = isArr ? undefined2 : keysFunc(value);
            arrayEach(props || value, function(subValue, key2) {
              if (props) {
                key2 = subValue;
                subValue = value[key2];
              }
              assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
            return result2;
          }
          function baseConforms(source) {
            var props = keys(source);
            return function(object) {
              return baseConformsTo(object, source, props);
            };
          }
          function baseConformsTo(object, source, props) {
            var length = props.length;
            if (object == null) {
              return !length;
            }
            object = Object2(object);
            while (length--) {
              var key = props[length], predicate = source[key], value = object[key];
              if (value === undefined2 && !(key in object) || !predicate(value)) {
                return false;
              }
            }
            return true;
          }
          function baseDelay(func, wait, args) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return setTimeout2(function() {
              func.apply(undefined2, args);
            }, wait);
          }
          function baseDifference(array, values2, iteratee2, comparator) {
            var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
            if (!length) {
              return result2;
            }
            if (iteratee2) {
              values2 = arrayMap(values2, baseUnary(iteratee2));
            }
            if (comparator) {
              includes2 = arrayIncludesWith;
              isCommon = false;
            } else if (values2.length >= LARGE_ARRAY_SIZE) {
              includes2 = cacheHas;
              isCommon = false;
              values2 = new SetCache(values2);
            }
            outer:
              while (++index < length) {
                var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                  var valuesIndex = valuesLength;
                  while (valuesIndex--) {
                    if (values2[valuesIndex] === computed) {
                      continue outer;
                    }
                  }
                  result2.push(value);
                } else if (!includes2(values2, computed, comparator)) {
                  result2.push(value);
                }
              }
            return result2;
          }
          var baseEach = createBaseEach(baseForOwn);
          var baseEachRight = createBaseEach(baseForOwnRight, true);
          function baseEvery(collection, predicate) {
            var result2 = true;
            baseEach(collection, function(value, index, collection2) {
              result2 = !!predicate(value, index, collection2);
              return result2;
            });
            return result2;
          }
          function baseExtremum(array, iteratee2, comparator) {
            var index = -1, length = array.length;
            while (++index < length) {
              var value = array[index], current = iteratee2(value);
              if (current != null && (computed === undefined2 ? current === current && !isSymbol(current) : comparator(current, computed))) {
                var computed = current, result2 = value;
              }
            }
            return result2;
          }
          function baseFill(array, value, start, end) {
            var length = array.length;
            start = toInteger(start);
            if (start < 0) {
              start = -start > length ? 0 : length + start;
            }
            end = end === undefined2 || end > length ? length : toInteger(end);
            if (end < 0) {
              end += length;
            }
            end = start > end ? 0 : toLength(end);
            while (start < end) {
              array[start++] = value;
            }
            return array;
          }
          function baseFilter(collection, predicate) {
            var result2 = [];
            baseEach(collection, function(value, index, collection2) {
              if (predicate(value, index, collection2)) {
                result2.push(value);
              }
            });
            return result2;
          }
          function baseFlatten(array, depth, predicate, isStrict, result2) {
            var index = -1, length = array.length;
            predicate || (predicate = isFlattenable);
            result2 || (result2 = []);
            while (++index < length) {
              var value = array[index];
              if (depth > 0 && predicate(value)) {
                if (depth > 1) {
                  baseFlatten(value, depth - 1, predicate, isStrict, result2);
                } else {
                  arrayPush(result2, value);
                }
              } else if (!isStrict) {
                result2[result2.length] = value;
              }
            }
            return result2;
          }
          var baseFor = createBaseFor();
          var baseForRight = createBaseFor(true);
          function baseForOwn(object, iteratee2) {
            return object && baseFor(object, iteratee2, keys);
          }
          function baseForOwnRight(object, iteratee2) {
            return object && baseForRight(object, iteratee2, keys);
          }
          function baseFunctions(object, props) {
            return arrayFilter(props, function(key) {
              return isFunction(object[key]);
            });
          }
          function baseGet(object, path) {
            path = castPath(path, object);
            var index = 0, length = path.length;
            while (object != null && index < length) {
              object = object[toKey(path[index++])];
            }
            return index && index == length ? object : undefined2;
          }
          function baseGetAllKeys(object, keysFunc, symbolsFunc) {
            var result2 = keysFunc(object);
            return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
          }
          function baseGetTag(value) {
            if (value == null) {
              return value === undefined2 ? undefinedTag : nullTag;
            }
            return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
          }
          function baseGt(value, other) {
            return value > other;
          }
          function baseHas(object, key) {
            return object != null && hasOwnProperty.call(object, key);
          }
          function baseHasIn(object, key) {
            return object != null && key in Object2(object);
          }
          function baseInRange(number, start, end) {
            return number >= nativeMin(start, end) && number < nativeMax(start, end);
          }
          function baseIntersection(arrays, iteratee2, comparator) {
            var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
            while (othIndex--) {
              var array = arrays[othIndex];
              if (othIndex && iteratee2) {
                array = arrayMap(array, baseUnary(iteratee2));
              }
              maxLength = nativeMin(array.length, maxLength);
              caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined2;
            }
            array = arrays[0];
            var index = -1, seen = caches[0];
            outer:
              while (++index < length && result2.length < maxLength) {
                var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
                value = comparator || value !== 0 ? value : 0;
                if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                  othIndex = othLength;
                  while (--othIndex) {
                    var cache2 = caches[othIndex];
                    if (!(cache2 ? cacheHas(cache2, computed) : includes2(arrays[othIndex], computed, comparator))) {
                      continue outer;
                    }
                  }
                  if (seen) {
                    seen.push(computed);
                  }
                  result2.push(value);
                }
              }
            return result2;
          }
          function baseInverter(object, setter, iteratee2, accumulator) {
            baseForOwn(object, function(value, key, object2) {
              setter(accumulator, iteratee2(value), key, object2);
            });
            return accumulator;
          }
          function baseInvoke(object, path, args) {
            path = castPath(path, object);
            object = parent(object, path);
            var func = object == null ? object : object[toKey(last(path))];
            return func == null ? undefined2 : apply(func, object, args);
          }
          function baseIsArguments(value) {
            return isObjectLike(value) && baseGetTag(value) == argsTag;
          }
          function baseIsArrayBuffer(value) {
            return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
          }
          function baseIsDate(value) {
            return isObjectLike(value) && baseGetTag(value) == dateTag;
          }
          function baseIsEqual(value, other, bitmask, customizer, stack) {
            if (value === other) {
              return true;
            }
            if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
              return value !== value && other !== other;
            }
            return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
          }
          function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
            var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
            objTag = objTag == argsTag ? objectTag : objTag;
            othTag = othTag == argsTag ? objectTag : othTag;
            var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
            if (isSameTag && isBuffer(object)) {
              if (!isBuffer(other)) {
                return false;
              }
              objIsArr = true;
              objIsObj = false;
            }
            if (isSameTag && !objIsObj) {
              stack || (stack = new Stack());
              return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
            }
            if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
              var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
              if (objIsWrapped || othIsWrapped) {
                var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
                stack || (stack = new Stack());
                return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
              }
            }
            if (!isSameTag) {
              return false;
            }
            stack || (stack = new Stack());
            return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
          }
          function baseIsMap(value) {
            return isObjectLike(value) && getTag(value) == mapTag;
          }
          function baseIsMatch(object, source, matchData, customizer) {
            var index = matchData.length, length = index, noCustomizer = !customizer;
            if (object == null) {
              return !length;
            }
            object = Object2(object);
            while (index--) {
              var data = matchData[index];
              if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
                return false;
              }
            }
            while (++index < length) {
              data = matchData[index];
              var key = data[0], objValue = object[key], srcValue = data[1];
              if (noCustomizer && data[2]) {
                if (objValue === undefined2 && !(key in object)) {
                  return false;
                }
              } else {
                var stack = new Stack();
                if (customizer) {
                  var result2 = customizer(objValue, srcValue, key, object, source, stack);
                }
                if (!(result2 === undefined2 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                  return false;
                }
              }
            }
            return true;
          }
          function baseIsNative(value) {
            if (!isObject(value) || isMasked(value)) {
              return false;
            }
            var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
            return pattern.test(toSource(value));
          }
          function baseIsRegExp(value) {
            return isObjectLike(value) && baseGetTag(value) == regexpTag;
          }
          function baseIsSet(value) {
            return isObjectLike(value) && getTag(value) == setTag;
          }
          function baseIsTypedArray(value) {
            return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
          }
          function baseIteratee(value) {
            if (typeof value == "function") {
              return value;
            }
            if (value == null) {
              return identity;
            }
            if (typeof value == "object") {
              return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
            }
            return property(value);
          }
          function baseKeys(object) {
            if (!isPrototype(object)) {
              return nativeKeys(object);
            }
            var result2 = [];
            for (var key in Object2(object)) {
              if (hasOwnProperty.call(object, key) && key != "constructor") {
                result2.push(key);
              }
            }
            return result2;
          }
          function baseKeysIn(object) {
            if (!isObject(object)) {
              return nativeKeysIn(object);
            }
            var isProto = isPrototype(object), result2 = [];
            for (var key in object) {
              if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
                result2.push(key);
              }
            }
            return result2;
          }
          function baseLt(value, other) {
            return value < other;
          }
          function baseMap(collection, iteratee2) {
            var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
            baseEach(collection, function(value, key, collection2) {
              result2[++index] = iteratee2(value, key, collection2);
            });
            return result2;
          }
          function baseMatches(source) {
            var matchData = getMatchData(source);
            if (matchData.length == 1 && matchData[0][2]) {
              return matchesStrictComparable(matchData[0][0], matchData[0][1]);
            }
            return function(object) {
              return object === source || baseIsMatch(object, source, matchData);
            };
          }
          function baseMatchesProperty(path, srcValue) {
            if (isKey(path) && isStrictComparable(srcValue)) {
              return matchesStrictComparable(toKey(path), srcValue);
            }
            return function(object) {
              var objValue = get(object, path);
              return objValue === undefined2 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
            };
          }
          function baseMerge(object, source, srcIndex, customizer, stack) {
            if (object === source) {
              return;
            }
            baseFor(source, function(srcValue, key) {
              stack || (stack = new Stack());
              if (isObject(srcValue)) {
                baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
              } else {
                var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined2;
                if (newValue === undefined2) {
                  newValue = srcValue;
                }
                assignMergeValue(object, key, newValue);
              }
            }, keysIn);
          }
          function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
            var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
            if (stacked) {
              assignMergeValue(object, key, stacked);
              return;
            }
            var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined2;
            var isCommon = newValue === undefined2;
            if (isCommon) {
              var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
              newValue = srcValue;
              if (isArr || isBuff || isTyped) {
                if (isArray(objValue)) {
                  newValue = objValue;
                } else if (isArrayLikeObject(objValue)) {
                  newValue = copyArray(objValue);
                } else if (isBuff) {
                  isCommon = false;
                  newValue = cloneBuffer(srcValue, true);
                } else if (isTyped) {
                  isCommon = false;
                  newValue = cloneTypedArray(srcValue, true);
                } else {
                  newValue = [];
                }
              } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                newValue = objValue;
                if (isArguments(objValue)) {
                  newValue = toPlainObject(objValue);
                } else if (!isObject(objValue) || isFunction(objValue)) {
                  newValue = initCloneObject(srcValue);
                }
              } else {
                isCommon = false;
              }
            }
            if (isCommon) {
              stack.set(srcValue, newValue);
              mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
              stack["delete"](srcValue);
            }
            assignMergeValue(object, key, newValue);
          }
          function baseNth(array, n) {
            var length = array.length;
            if (!length) {
              return;
            }
            n += n < 0 ? length : 0;
            return isIndex(n, length) ? array[n] : undefined2;
          }
          function baseOrderBy(collection, iteratees, orders) {
            if (iteratees.length) {
              iteratees = arrayMap(iteratees, function(iteratee2) {
                if (isArray(iteratee2)) {
                  return function(value) {
                    return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                  };
                }
                return iteratee2;
              });
            } else {
              iteratees = [identity];
            }
            var index = -1;
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            var result2 = baseMap(collection, function(value, key, collection2) {
              var criteria = arrayMap(iteratees, function(iteratee2) {
                return iteratee2(value);
              });
              return { "criteria": criteria, "index": ++index, "value": value };
            });
            return baseSortBy(result2, function(object, other) {
              return compareMultiple(object, other, orders);
            });
          }
          function basePick(object, paths) {
            return basePickBy(object, paths, function(value, path) {
              return hasIn(object, path);
            });
          }
          function basePickBy(object, paths, predicate) {
            var index = -1, length = paths.length, result2 = {};
            while (++index < length) {
              var path = paths[index], value = baseGet(object, path);
              if (predicate(value, path)) {
                baseSet(result2, castPath(path, object), value);
              }
            }
            return result2;
          }
          function basePropertyDeep(path) {
            return function(object) {
              return baseGet(object, path);
            };
          }
          function basePullAll(array, values2, iteratee2, comparator) {
            var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
            if (array === values2) {
              values2 = copyArray(values2);
            }
            if (iteratee2) {
              seen = arrayMap(array, baseUnary(iteratee2));
            }
            while (++index < length) {
              var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
              while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
                if (seen !== array) {
                  splice.call(seen, fromIndex, 1);
                }
                splice.call(array, fromIndex, 1);
              }
            }
            return array;
          }
          function basePullAt(array, indexes) {
            var length = array ? indexes.length : 0, lastIndex = length - 1;
            while (length--) {
              var index = indexes[length];
              if (length == lastIndex || index !== previous) {
                var previous = index;
                if (isIndex(index)) {
                  splice.call(array, index, 1);
                } else {
                  baseUnset(array, index);
                }
              }
            }
            return array;
          }
          function baseRandom(lower, upper) {
            return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
          }
          function baseRange(start, end, step, fromRight) {
            var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
            while (length--) {
              result2[fromRight ? length : ++index] = start;
              start += step;
            }
            return result2;
          }
          function baseRepeat(string, n) {
            var result2 = "";
            if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
              return result2;
            }
            do {
              if (n % 2) {
                result2 += string;
              }
              n = nativeFloor(n / 2);
              if (n) {
                string += string;
              }
            } while (n);
            return result2;
          }
          function baseRest(func, start) {
            return setToString(overRest(func, start, identity), func + "");
          }
          function baseSample(collection) {
            return arraySample(values(collection));
          }
          function baseSampleSize(collection, n) {
            var array = values(collection);
            return shuffleSelf(array, baseClamp(n, 0, array.length));
          }
          function baseSet(object, path, value, customizer) {
            if (!isObject(object)) {
              return object;
            }
            path = castPath(path, object);
            var index = -1, length = path.length, lastIndex = length - 1, nested = object;
            while (nested != null && ++index < length) {
              var key = toKey(path[index]), newValue = value;
              if (key === "__proto__" || key === "constructor" || key === "prototype") {
                return object;
              }
              if (index != lastIndex) {
                var objValue = nested[key];
                newValue = customizer ? customizer(objValue, key, nested) : undefined2;
                if (newValue === undefined2) {
                  newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
                }
              }
              assignValue(nested, key, newValue);
              nested = nested[key];
            }
            return object;
          }
          var baseSetData = !metaMap ? identity : function(func, data) {
            metaMap.set(func, data);
            return func;
          };
          var baseSetToString = !defineProperty ? identity : function(func, string) {
            return defineProperty(func, "toString", {
              "configurable": true,
              "enumerable": false,
              "value": constant(string),
              "writable": true
            });
          };
          function baseShuffle(collection) {
            return shuffleSelf(values(collection));
          }
          function baseSlice(array, start, end) {
            var index = -1, length = array.length;
            if (start < 0) {
              start = -start > length ? 0 : length + start;
            }
            end = end > length ? length : end;
            if (end < 0) {
              end += length;
            }
            length = start > end ? 0 : end - start >>> 0;
            start >>>= 0;
            var result2 = Array2(length);
            while (++index < length) {
              result2[index] = array[index + start];
            }
            return result2;
          }
          function baseSome(collection, predicate) {
            var result2;
            baseEach(collection, function(value, index, collection2) {
              result2 = predicate(value, index, collection2);
              return !result2;
            });
            return !!result2;
          }
          function baseSortedIndex(array, value, retHighest) {
            var low = 0, high = array == null ? low : array.length;
            if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
              while (low < high) {
                var mid = low + high >>> 1, computed = array[mid];
                if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                  low = mid + 1;
                } else {
                  high = mid;
                }
              }
              return high;
            }
            return baseSortedIndexBy(array, value, identity, retHighest);
          }
          function baseSortedIndexBy(array, value, iteratee2, retHighest) {
            var low = 0, high = array == null ? 0 : array.length;
            if (high === 0) {
              return 0;
            }
            value = iteratee2(value);
            var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined2;
            while (low < high) {
              var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined2, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
              if (valIsNaN) {
                var setLow = retHighest || othIsReflexive;
              } else if (valIsUndefined) {
                setLow = othIsReflexive && (retHighest || othIsDefined);
              } else if (valIsNull) {
                setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
              } else if (valIsSymbol) {
                setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
              } else if (othIsNull || othIsSymbol) {
                setLow = false;
              } else {
                setLow = retHighest ? computed <= value : computed < value;
              }
              if (setLow) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return nativeMin(high, MAX_ARRAY_INDEX);
          }
          function baseSortedUniq(array, iteratee2) {
            var index = -1, length = array.length, resIndex = 0, result2 = [];
            while (++index < length) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              if (!index || !eq(computed, seen)) {
                var seen = computed;
                result2[resIndex++] = value === 0 ? 0 : value;
              }
            }
            return result2;
          }
          function baseToNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            return +value;
          }
          function baseToString(value) {
            if (typeof value == "string") {
              return value;
            }
            if (isArray(value)) {
              return arrayMap(value, baseToString) + "";
            }
            if (isSymbol(value)) {
              return symbolToString ? symbolToString.call(value) : "";
            }
            var result2 = value + "";
            return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
          }
          function baseUniq(array, iteratee2, comparator) {
            var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
            if (comparator) {
              isCommon = false;
              includes2 = arrayIncludesWith;
            } else if (length >= LARGE_ARRAY_SIZE) {
              var set2 = iteratee2 ? null : createSet(array);
              if (set2) {
                return setToArray(set2);
              }
              isCommon = false;
              includes2 = cacheHas;
              seen = new SetCache();
            } else {
              seen = iteratee2 ? [] : result2;
            }
            outer:
              while (++index < length) {
                var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                  var seenIndex = seen.length;
                  while (seenIndex--) {
                    if (seen[seenIndex] === computed) {
                      continue outer;
                    }
                  }
                  if (iteratee2) {
                    seen.push(computed);
                  }
                  result2.push(value);
                } else if (!includes2(seen, computed, comparator)) {
                  if (seen !== result2) {
                    seen.push(computed);
                  }
                  result2.push(value);
                }
              }
            return result2;
          }
          function baseUnset(object, path) {
            path = castPath(path, object);
            object = parent(object, path);
            return object == null || delete object[toKey(last(path))];
          }
          function baseUpdate(object, path, updater, customizer) {
            return baseSet(object, path, updater(baseGet(object, path)), customizer);
          }
          function baseWhile(array, predicate, isDrop, fromRight) {
            var length = array.length, index = fromRight ? length : -1;
            while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
            }
            return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
          }
          function baseWrapperValue(value, actions) {
            var result2 = value;
            if (result2 instanceof LazyWrapper) {
              result2 = result2.value();
            }
            return arrayReduce(actions, function(result3, action) {
              return action.func.apply(action.thisArg, arrayPush([result3], action.args));
            }, result2);
          }
          function baseXor(arrays, iteratee2, comparator) {
            var length = arrays.length;
            if (length < 2) {
              return length ? baseUniq(arrays[0]) : [];
            }
            var index = -1, result2 = Array2(length);
            while (++index < length) {
              var array = arrays[index], othIndex = -1;
              while (++othIndex < length) {
                if (othIndex != index) {
                  result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
                }
              }
            }
            return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
          }
          function baseZipObject(props, values2, assignFunc) {
            var index = -1, length = props.length, valsLength = values2.length, result2 = {};
            while (++index < length) {
              var value = index < valsLength ? values2[index] : undefined2;
              assignFunc(result2, props[index], value);
            }
            return result2;
          }
          function castArrayLikeObject(value) {
            return isArrayLikeObject(value) ? value : [];
          }
          function castFunction(value) {
            return typeof value == "function" ? value : identity;
          }
          function castPath(value, object) {
            if (isArray(value)) {
              return value;
            }
            return isKey(value, object) ? [value] : stringToPath(toString(value));
          }
          var castRest = baseRest;
          function castSlice(array, start, end) {
            var length = array.length;
            end = end === undefined2 ? length : end;
            return !start && end >= length ? array : baseSlice(array, start, end);
          }
          var clearTimeout = ctxClearTimeout || function(id) {
            return root.clearTimeout(id);
          };
          function cloneBuffer(buffer, isDeep) {
            if (isDeep) {
              return buffer.slice();
            }
            var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
            buffer.copy(result2);
            return result2;
          }
          function cloneArrayBuffer(arrayBuffer) {
            var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
            new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
            return result2;
          }
          function cloneDataView(dataView, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
            return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
          }
          function cloneRegExp(regexp) {
            var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
            result2.lastIndex = regexp.lastIndex;
            return result2;
          }
          function cloneSymbol(symbol) {
            return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
          }
          function cloneTypedArray(typedArray, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
            return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
          }
          function compareAscending(value, other) {
            if (value !== other) {
              var valIsDefined = value !== undefined2, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
              var othIsDefined = other !== undefined2, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
              if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
                return 1;
              }
              if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
                return -1;
              }
            }
            return 0;
          }
          function compareMultiple(object, other, orders) {
            var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
            while (++index < length) {
              var result2 = compareAscending(objCriteria[index], othCriteria[index]);
              if (result2) {
                if (index >= ordersLength) {
                  return result2;
                }
                var order = orders[index];
                return result2 * (order == "desc" ? -1 : 1);
              }
            }
            return object.index - other.index;
          }
          function composeArgs(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
            while (++leftIndex < leftLength) {
              result2[leftIndex] = partials[leftIndex];
            }
            while (++argsIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                result2[holders[argsIndex]] = args[argsIndex];
              }
            }
            while (rangeLength--) {
              result2[leftIndex++] = args[argsIndex++];
            }
            return result2;
          }
          function composeArgsRight(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
            while (++argsIndex < rangeLength) {
              result2[argsIndex] = args[argsIndex];
            }
            var offset = argsIndex;
            while (++rightIndex < rightLength) {
              result2[offset + rightIndex] = partials[rightIndex];
            }
            while (++holdersIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                result2[offset + holders[holdersIndex]] = args[argsIndex++];
              }
            }
            return result2;
          }
          function copyArray(source, array) {
            var index = -1, length = source.length;
            array || (array = Array2(length));
            while (++index < length) {
              array[index] = source[index];
            }
            return array;
          }
          function copyObject(source, props, object, customizer) {
            var isNew = !object;
            object || (object = {});
            var index = -1, length = props.length;
            while (++index < length) {
              var key = props[index];
              var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined2;
              if (newValue === undefined2) {
                newValue = source[key];
              }
              if (isNew) {
                baseAssignValue(object, key, newValue);
              } else {
                assignValue(object, key, newValue);
              }
            }
            return object;
          }
          function copySymbols(source, object) {
            return copyObject(source, getSymbols(source), object);
          }
          function copySymbolsIn(source, object) {
            return copyObject(source, getSymbolsIn(source), object);
          }
          function createAggregator(setter, initializer) {
            return function(collection, iteratee2) {
              var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
              return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
            };
          }
          function createAssigner(assigner) {
            return baseRest(function(object, sources2) {
              var index = -1, length = sources2.length, customizer = length > 1 ? sources2[length - 1] : undefined2, guard = length > 2 ? sources2[2] : undefined2;
              customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined2;
              if (guard && isIterateeCall(sources2[0], sources2[1], guard)) {
                customizer = length < 3 ? undefined2 : customizer;
                length = 1;
              }
              object = Object2(object);
              while (++index < length) {
                var source = sources2[index];
                if (source) {
                  assigner(object, source, index, customizer);
                }
              }
              return object;
            });
          }
          function createBaseEach(eachFunc, fromRight) {
            return function(collection, iteratee2) {
              if (collection == null) {
                return collection;
              }
              if (!isArrayLike(collection)) {
                return eachFunc(collection, iteratee2);
              }
              var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
              while (fromRight ? index-- : ++index < length) {
                if (iteratee2(iterable[index], index, iterable) === false) {
                  break;
                }
              }
              return collection;
            };
          }
          function createBaseFor(fromRight) {
            return function(object, iteratee2, keysFunc) {
              var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
              while (length--) {
                var key = props[fromRight ? length : ++index];
                if (iteratee2(iterable[key], key, iterable) === false) {
                  break;
                }
              }
              return object;
            };
          }
          function createBind(func, bitmask, thisArg) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
              var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              return fn.apply(isBind ? thisArg : this, arguments);
            }
            return wrapper;
          }
          function createCaseFirst(methodName) {
            return function(string) {
              string = toString(string);
              var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined2;
              var chr = strSymbols ? strSymbols[0] : string.charAt(0);
              var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
              return chr[methodName]() + trailing;
            };
          }
          function createCompounder(callback) {
            return function(string) {
              return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
            };
          }
          function createCtor(Ctor) {
            return function() {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return new Ctor();
                case 1:
                  return new Ctor(args[0]);
                case 2:
                  return new Ctor(args[0], args[1]);
                case 3:
                  return new Ctor(args[0], args[1], args[2]);
                case 4:
                  return new Ctor(args[0], args[1], args[2], args[3]);
                case 5:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4]);
                case 6:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                case 7:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
              }
              var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
              return isObject(result2) ? result2 : thisBinding;
            };
          }
          function createCurry(func, bitmask, arity) {
            var Ctor = createCtor(func);
            function wrapper() {
              var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
              while (index--) {
                args[index] = arguments[index];
              }
              var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
              length -= holders.length;
              if (length < arity) {
                return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined2, args, holders, undefined2, undefined2, arity - length);
              }
              var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              return apply(fn, this, args);
            }
            return wrapper;
          }
          function createFind(findIndexFunc) {
            return function(collection, predicate, fromIndex) {
              var iterable = Object2(collection);
              if (!isArrayLike(collection)) {
                var iteratee2 = getIteratee(predicate, 3);
                collection = keys(collection);
                predicate = function(key) {
                  return iteratee2(iterable[key], key, iterable);
                };
              }
              var index = findIndexFunc(collection, predicate, fromIndex);
              return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined2;
            };
          }
          function createFlow(fromRight) {
            return flatRest(function(funcs) {
              var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
              if (fromRight) {
                funcs.reverse();
              }
              while (index--) {
                var func = funcs[index];
                if (typeof func != "function") {
                  throw new TypeError2(FUNC_ERROR_TEXT);
                }
                if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                  var wrapper = new LodashWrapper([], true);
                }
              }
              index = wrapper ? index : length;
              while (++index < length) {
                func = funcs[index];
                var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined2;
                if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                  wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
                } else {
                  wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
                }
              }
              return function() {
                var args = arguments, value = args[0];
                if (wrapper && args.length == 1 && isArray(value)) {
                  return wrapper.plant(value).value();
                }
                var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
                while (++index2 < length) {
                  result2 = funcs[index2].call(this, result2);
                }
                return result2;
              };
            });
          }
          function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
            var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined2 : createCtor(func);
            function wrapper() {
              var length = arguments.length, args = Array2(length), index = length;
              while (index--) {
                args[index] = arguments[index];
              }
              if (isCurried) {
                var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
              }
              if (partials) {
                args = composeArgs(args, partials, holders, isCurried);
              }
              if (partialsRight) {
                args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
              }
              length -= holdersCount;
              if (isCurried && length < arity) {
                var newHolders = replaceHolders(args, placeholder);
                return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary2, arity - length);
              }
              var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
              length = args.length;
              if (argPos) {
                args = reorder(args, argPos);
              } else if (isFlip && length > 1) {
                args.reverse();
              }
              if (isAry && ary2 < length) {
                args.length = ary2;
              }
              if (this && this !== root && this instanceof wrapper) {
                fn = Ctor || createCtor(fn);
              }
              return fn.apply(thisBinding, args);
            }
            return wrapper;
          }
          function createInverter(setter, toIteratee) {
            return function(object, iteratee2) {
              return baseInverter(object, setter, toIteratee(iteratee2), {});
            };
          }
          function createMathOperation(operator, defaultValue) {
            return function(value, other) {
              var result2;
              if (value === undefined2 && other === undefined2) {
                return defaultValue;
              }
              if (value !== undefined2) {
                result2 = value;
              }
              if (other !== undefined2) {
                if (result2 === undefined2) {
                  return other;
                }
                if (typeof value == "string" || typeof other == "string") {
                  value = baseToString(value);
                  other = baseToString(other);
                } else {
                  value = baseToNumber(value);
                  other = baseToNumber(other);
                }
                result2 = operator(value, other);
              }
              return result2;
            };
          }
          function createOver(arrayFunc) {
            return flatRest(function(iteratees) {
              iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
              return baseRest(function(args) {
                var thisArg = this;
                return arrayFunc(iteratees, function(iteratee2) {
                  return apply(iteratee2, thisArg, args);
                });
              });
            });
          }
          function createPadding(length, chars) {
            chars = chars === undefined2 ? " " : baseToString(chars);
            var charsLength = chars.length;
            if (charsLength < 2) {
              return charsLength ? baseRepeat(chars, length) : chars;
            }
            var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
            return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
          }
          function createPartial(func, bitmask, thisArg, partials) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
              var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              while (++leftIndex < leftLength) {
                args[leftIndex] = partials[leftIndex];
              }
              while (argsLength--) {
                args[leftIndex++] = arguments[++argsIndex];
              }
              return apply(fn, isBind ? thisArg : this, args);
            }
            return wrapper;
          }
          function createRange(fromRight) {
            return function(start, end, step) {
              if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
                end = step = undefined2;
              }
              start = toFinite(start);
              if (end === undefined2) {
                end = start;
                start = 0;
              } else {
                end = toFinite(end);
              }
              step = step === undefined2 ? start < end ? 1 : -1 : toFinite(step);
              return baseRange(start, end, step, fromRight);
            };
          }
          function createRelationalOperation(operator) {
            return function(value, other) {
              if (!(typeof value == "string" && typeof other == "string")) {
                value = toNumber(value);
                other = toNumber(other);
              }
              return operator(value, other);
            };
          }
          function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
            var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined2, newHoldersRight = isCurry ? undefined2 : holders, newPartials = isCurry ? partials : undefined2, newPartialsRight = isCurry ? undefined2 : partials;
            bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
            bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
            if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
              bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
            }
            var newData = [
              func,
              bitmask,
              thisArg,
              newPartials,
              newHolders,
              newPartialsRight,
              newHoldersRight,
              argPos,
              ary2,
              arity
            ];
            var result2 = wrapFunc.apply(undefined2, newData);
            if (isLaziable(func)) {
              setData(result2, newData);
            }
            result2.placeholder = placeholder;
            return setWrapToString(result2, func, bitmask);
          }
          function createRound(methodName) {
            var func = Math2[methodName];
            return function(number, precision) {
              number = toNumber(number);
              precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
              if (precision && nativeIsFinite(number)) {
                var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
                pair = (toString(value) + "e").split("e");
                return +(pair[0] + "e" + (+pair[1] - precision));
              }
              return func(number);
            };
          }
          var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop2 : function(values2) {
            return new Set2(values2);
          };
          function createToPairs(keysFunc) {
            return function(object) {
              var tag = getTag(object);
              if (tag == mapTag) {
                return mapToArray(object);
              }
              if (tag == setTag) {
                return setToPairs(object);
              }
              return baseToPairs(object, keysFunc(object));
            };
          }
          function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
            var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
            if (!isBindKey && typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            var length = partials ? partials.length : 0;
            if (!length) {
              bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
              partials = holders = undefined2;
            }
            ary2 = ary2 === undefined2 ? ary2 : nativeMax(toInteger(ary2), 0);
            arity = arity === undefined2 ? arity : toInteger(arity);
            length -= holders ? holders.length : 0;
            if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
              var partialsRight = partials, holdersRight = holders;
              partials = holders = undefined2;
            }
            var data = isBindKey ? undefined2 : getData(func);
            var newData = [
              func,
              bitmask,
              thisArg,
              partials,
              holders,
              partialsRight,
              holdersRight,
              argPos,
              ary2,
              arity
            ];
            if (data) {
              mergeData(newData, data);
            }
            func = newData[0];
            bitmask = newData[1];
            thisArg = newData[2];
            partials = newData[3];
            holders = newData[4];
            arity = newData[9] = newData[9] === undefined2 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
            if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
              bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
            }
            if (!bitmask || bitmask == WRAP_BIND_FLAG) {
              var result2 = createBind(func, bitmask, thisArg);
            } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
              result2 = createCurry(func, bitmask, arity);
            } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
              result2 = createPartial(func, bitmask, thisArg, partials);
            } else {
              result2 = createHybrid.apply(undefined2, newData);
            }
            var setter = data ? baseSetData : setData;
            return setWrapToString(setter(result2, newData), func, bitmask);
          }
          function customDefaultsAssignIn(objValue, srcValue, key, object) {
            if (objValue === undefined2 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
              return srcValue;
            }
            return objValue;
          }
          function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
            if (isObject(objValue) && isObject(srcValue)) {
              stack.set(srcValue, objValue);
              baseMerge(objValue, srcValue, undefined2, customDefaultsMerge, stack);
              stack["delete"](srcValue);
            }
            return objValue;
          }
          function customOmitClone(value) {
            return isPlainObject(value) ? undefined2 : value;
          }
          function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
            if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
              return false;
            }
            var arrStacked = stack.get(array);
            var othStacked = stack.get(other);
            if (arrStacked && othStacked) {
              return arrStacked == other && othStacked == array;
            }
            var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined2;
            stack.set(array, other);
            stack.set(other, array);
            while (++index < arrLength) {
              var arrValue = array[index], othValue = other[index];
              if (customizer) {
                var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
              }
              if (compared !== undefined2) {
                if (compared) {
                  continue;
                }
                result2 = false;
                break;
              }
              if (seen) {
                if (!arraySome(other, function(othValue2, othIndex) {
                  if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                    return seen.push(othIndex);
                  }
                })) {
                  result2 = false;
                  break;
                }
              } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                result2 = false;
                break;
              }
            }
            stack["delete"](array);
            stack["delete"](other);
            return result2;
          }
          function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
            switch (tag) {
              case dataViewTag:
                if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                  return false;
                }
                object = object.buffer;
                other = other.buffer;
              case arrayBufferTag:
                if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                  return false;
                }
                return true;
              case boolTag:
              case dateTag:
              case numberTag:
                return eq(+object, +other);
              case errorTag:
                return object.name == other.name && object.message == other.message;
              case regexpTag:
              case stringTag:
                return object == other + "";
              case mapTag:
                var convert = mapToArray;
              case setTag:
                var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                convert || (convert = setToArray);
                if (object.size != other.size && !isPartial) {
                  return false;
                }
                var stacked = stack.get(object);
                if (stacked) {
                  return stacked == other;
                }
                bitmask |= COMPARE_UNORDERED_FLAG;
                stack.set(object, other);
                var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                stack["delete"](object);
                return result2;
              case symbolTag:
                if (symbolValueOf) {
                  return symbolValueOf.call(object) == symbolValueOf.call(other);
                }
            }
            return false;
          }
          function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
            if (objLength != othLength && !isPartial) {
              return false;
            }
            var index = objLength;
            while (index--) {
              var key = objProps[index];
              if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
                return false;
              }
            }
            var objStacked = stack.get(object);
            var othStacked = stack.get(other);
            if (objStacked && othStacked) {
              return objStacked == other && othStacked == object;
            }
            var result2 = true;
            stack.set(object, other);
            stack.set(other, object);
            var skipCtor = isPartial;
            while (++index < objLength) {
              key = objProps[index];
              var objValue = object[key], othValue = other[key];
              if (customizer) {
                var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
              }
              if (!(compared === undefined2 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
                result2 = false;
                break;
              }
              skipCtor || (skipCtor = key == "constructor");
            }
            if (result2 && !skipCtor) {
              var objCtor = object.constructor, othCtor = other.constructor;
              if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
                result2 = false;
              }
            }
            stack["delete"](object);
            stack["delete"](other);
            return result2;
          }
          function flatRest(func) {
            return setToString(overRest(func, undefined2, flatten), func + "");
          }
          function getAllKeys(object) {
            return baseGetAllKeys(object, keys, getSymbols);
          }
          function getAllKeysIn(object) {
            return baseGetAllKeys(object, keysIn, getSymbolsIn);
          }
          var getData = !metaMap ? noop2 : function(func) {
            return metaMap.get(func);
          };
          function getFuncName(func) {
            var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
            while (length--) {
              var data = array[length], otherFunc = data.func;
              if (otherFunc == null || otherFunc == func) {
                return data.name;
              }
            }
            return result2;
          }
          function getHolder(func) {
            var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
            return object.placeholder;
          }
          function getIteratee() {
            var result2 = lodash.iteratee || iteratee;
            result2 = result2 === iteratee ? baseIteratee : result2;
            return arguments.length ? result2(arguments[0], arguments[1]) : result2;
          }
          function getMapData(map2, key) {
            var data = map2.__data__;
            return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
          }
          function getMatchData(object) {
            var result2 = keys(object), length = result2.length;
            while (length--) {
              var key = result2[length], value = object[key];
              result2[length] = [key, value, isStrictComparable(value)];
            }
            return result2;
          }
          function getNative(object, key) {
            var value = getValue(object, key);
            return baseIsNative(value) ? value : undefined2;
          }
          function getRawTag(value) {
            var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
            try {
              value[symToStringTag] = undefined2;
              var unmasked = true;
            } catch (e) {
            }
            var result2 = nativeObjectToString.call(value);
            if (unmasked) {
              if (isOwn) {
                value[symToStringTag] = tag;
              } else {
                delete value[symToStringTag];
              }
            }
            return result2;
          }
          var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
            if (object == null) {
              return [];
            }
            object = Object2(object);
            return arrayFilter(nativeGetSymbols(object), function(symbol) {
              return propertyIsEnumerable.call(object, symbol);
            });
          };
          var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
            var result2 = [];
            while (object) {
              arrayPush(result2, getSymbols(object));
              object = getPrototype(object);
            }
            return result2;
          };
          var getTag = baseGetTag;
          if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
            getTag = function(value) {
              var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined2, ctorString = Ctor ? toSource(Ctor) : "";
              if (ctorString) {
                switch (ctorString) {
                  case dataViewCtorString:
                    return dataViewTag;
                  case mapCtorString:
                    return mapTag;
                  case promiseCtorString:
                    return promiseTag;
                  case setCtorString:
                    return setTag;
                  case weakMapCtorString:
                    return weakMapTag;
                }
              }
              return result2;
            };
          }
          function getView(start, end, transforms) {
            var index = -1, length = transforms.length;
            while (++index < length) {
              var data = transforms[index], size2 = data.size;
              switch (data.type) {
                case "drop":
                  start += size2;
                  break;
                case "dropRight":
                  end -= size2;
                  break;
                case "take":
                  end = nativeMin(end, start + size2);
                  break;
                case "takeRight":
                  start = nativeMax(start, end - size2);
                  break;
              }
            }
            return { "start": start, "end": end };
          }
          function getWrapDetails(source) {
            var match = source.match(reWrapDetails);
            return match ? match[1].split(reSplitDetails) : [];
          }
          function hasPath(object, path, hasFunc) {
            path = castPath(path, object);
            var index = -1, length = path.length, result2 = false;
            while (++index < length) {
              var key = toKey(path[index]);
              if (!(result2 = object != null && hasFunc(object, key))) {
                break;
              }
              object = object[key];
            }
            if (result2 || ++index != length) {
              return result2;
            }
            length = object == null ? 0 : object.length;
            return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
          }
          function initCloneArray(array) {
            var length = array.length, result2 = new array.constructor(length);
            if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
              result2.index = array.index;
              result2.input = array.input;
            }
            return result2;
          }
          function initCloneObject(object) {
            return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
          }
          function initCloneByTag(object, tag, isDeep) {
            var Ctor = object.constructor;
            switch (tag) {
              case arrayBufferTag:
                return cloneArrayBuffer(object);
              case boolTag:
              case dateTag:
                return new Ctor(+object);
              case dataViewTag:
                return cloneDataView(object, isDeep);
              case float32Tag:
              case float64Tag:
              case int8Tag:
              case int16Tag:
              case int32Tag:
              case uint8Tag:
              case uint8ClampedTag:
              case uint16Tag:
              case uint32Tag:
                return cloneTypedArray(object, isDeep);
              case mapTag:
                return new Ctor();
              case numberTag:
              case stringTag:
                return new Ctor(object);
              case regexpTag:
                return cloneRegExp(object);
              case setTag:
                return new Ctor();
              case symbolTag:
                return cloneSymbol(object);
            }
          }
          function insertWrapDetails(source, details) {
            var length = details.length;
            if (!length) {
              return source;
            }
            var lastIndex = length - 1;
            details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
            details = details.join(length > 2 ? ", " : " ");
            return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
          }
          function isFlattenable(value) {
            return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
          }
          function isIndex(value, length) {
            var type = typeof value;
            length = length == null ? MAX_SAFE_INTEGER : length;
            return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
          }
          function isIterateeCall(value, index, object) {
            if (!isObject(object)) {
              return false;
            }
            var type = typeof index;
            if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
              return eq(object[index], value);
            }
            return false;
          }
          function isKey(value, object) {
            if (isArray(value)) {
              return false;
            }
            var type = typeof value;
            if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
              return true;
            }
            return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
          }
          function isKeyable(value) {
            var type = typeof value;
            return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
          }
          function isLaziable(func) {
            var funcName = getFuncName(func), other = lodash[funcName];
            if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
              return false;
            }
            if (func === other) {
              return true;
            }
            var data = getData(other);
            return !!data && func === data[0];
          }
          function isMasked(func) {
            return !!maskSrcKey && maskSrcKey in func;
          }
          var isMaskable = coreJsData ? isFunction : stubFalse;
          function isPrototype(value) {
            var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
            return value === proto;
          }
          function isStrictComparable(value) {
            return value === value && !isObject(value);
          }
          function matchesStrictComparable(key, srcValue) {
            return function(object) {
              if (object == null) {
                return false;
              }
              return object[key] === srcValue && (srcValue !== undefined2 || key in Object2(object));
            };
          }
          function memoizeCapped(func) {
            var result2 = memoize(func, function(key) {
              if (cache2.size === MAX_MEMOIZE_SIZE) {
                cache2.clear();
              }
              return key;
            });
            var cache2 = result2.cache;
            return result2;
          }
          function mergeData(data, source) {
            var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
            var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
            if (!(isCommon || isCombo)) {
              return data;
            }
            if (srcBitmask & WRAP_BIND_FLAG) {
              data[2] = source[2];
              newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
            }
            var value = source[3];
            if (value) {
              var partials = data[3];
              data[3] = partials ? composeArgs(partials, value, source[4]) : value;
              data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
            }
            value = source[5];
            if (value) {
              partials = data[5];
              data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
              data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
            }
            value = source[7];
            if (value) {
              data[7] = value;
            }
            if (srcBitmask & WRAP_ARY_FLAG) {
              data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
            }
            if (data[9] == null) {
              data[9] = source[9];
            }
            data[0] = source[0];
            data[1] = newBitmask;
            return data;
          }
          function nativeKeysIn(object) {
            var result2 = [];
            if (object != null) {
              for (var key in Object2(object)) {
                result2.push(key);
              }
            }
            return result2;
          }
          function objectToString(value) {
            return nativeObjectToString.call(value);
          }
          function overRest(func, start, transform2) {
            start = nativeMax(start === undefined2 ? func.length - 1 : start, 0);
            return function() {
              var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
              while (++index < length) {
                array[index] = args[start + index];
              }
              index = -1;
              var otherArgs = Array2(start + 1);
              while (++index < start) {
                otherArgs[index] = args[index];
              }
              otherArgs[start] = transform2(array);
              return apply(func, this, otherArgs);
            };
          }
          function parent(object, path) {
            return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
          }
          function reorder(array, indexes) {
            var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
            while (length--) {
              var index = indexes[length];
              array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined2;
            }
            return array;
          }
          function safeGet(object, key) {
            if (key === "constructor" && typeof object[key] === "function") {
              return;
            }
            if (key == "__proto__") {
              return;
            }
            return object[key];
          }
          var setData = shortOut(baseSetData);
          var setTimeout2 = ctxSetTimeout || function(func, wait) {
            return root.setTimeout(func, wait);
          };
          var setToString = shortOut(baseSetToString);
          function setWrapToString(wrapper, reference, bitmask) {
            var source = reference + "";
            return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
          }
          function shortOut(func) {
            var count = 0, lastCalled = 0;
            return function() {
              var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
              lastCalled = stamp;
              if (remaining > 0) {
                if (++count >= HOT_COUNT) {
                  return arguments[0];
                }
              } else {
                count = 0;
              }
              return func.apply(undefined2, arguments);
            };
          }
          function shuffleSelf(array, size2) {
            var index = -1, length = array.length, lastIndex = length - 1;
            size2 = size2 === undefined2 ? length : size2;
            while (++index < size2) {
              var rand = baseRandom(index, lastIndex), value = array[rand];
              array[rand] = array[index];
              array[index] = value;
            }
            array.length = size2;
            return array;
          }
          var stringToPath = memoizeCapped(function(string) {
            var result2 = [];
            if (string.charCodeAt(0) === 46) {
              result2.push("");
            }
            string.replace(rePropName, function(match, number, quote, subString) {
              result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
            });
            return result2;
          });
          function toKey(value) {
            if (typeof value == "string" || isSymbol(value)) {
              return value;
            }
            var result2 = value + "";
            return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
          }
          function toSource(func) {
            if (func != null) {
              try {
                return funcToString.call(func);
              } catch (e) {
              }
              try {
                return func + "";
              } catch (e) {
              }
            }
            return "";
          }
          function updateWrapDetails(details, bitmask) {
            arrayEach(wrapFlags, function(pair) {
              var value = "_." + pair[0];
              if (bitmask & pair[1] && !arrayIncludes(details, value)) {
                details.push(value);
              }
            });
            return details.sort();
          }
          function wrapperClone(wrapper) {
            if (wrapper instanceof LazyWrapper) {
              return wrapper.clone();
            }
            var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
            result2.__actions__ = copyArray(wrapper.__actions__);
            result2.__index__ = wrapper.__index__;
            result2.__values__ = wrapper.__values__;
            return result2;
          }
          function chunk(array, size2, guard) {
            if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined2) {
              size2 = 1;
            } else {
              size2 = nativeMax(toInteger(size2), 0);
            }
            var length = array == null ? 0 : array.length;
            if (!length || size2 < 1) {
              return [];
            }
            var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
            while (index < length) {
              result2[resIndex++] = baseSlice(array, index, index += size2);
            }
            return result2;
          }
          function compact(array) {
            var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
            while (++index < length) {
              var value = array[index];
              if (value) {
                result2[resIndex++] = value;
              }
            }
            return result2;
          }
          function concat() {
            var length = arguments.length;
            if (!length) {
              return [];
            }
            var args = Array2(length - 1), array = arguments[0], index = length;
            while (index--) {
              args[index - 1] = arguments[index];
            }
            return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
          }
          var difference = baseRest(function(array, values2) {
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
          });
          var differenceBy = baseRest(function(array, values2) {
            var iteratee2 = last(values2);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined2;
            }
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
          });
          var differenceWith = baseRest(function(array, values2) {
            var comparator = last(values2);
            if (isArrayLikeObject(comparator)) {
              comparator = undefined2;
            }
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined2, comparator) : [];
          });
          function drop(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            return baseSlice(array, n < 0 ? 0 : n, length);
          }
          function dropRight(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            n = length - n;
            return baseSlice(array, 0, n < 0 ? 0 : n);
          }
          function dropRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
          }
          function dropWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
          }
          function fill(array, value, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
              start = 0;
              end = length;
            }
            return baseFill(array, value, start, end);
          }
          function findIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
              index = nativeMax(length + index, 0);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index);
          }
          function findLastIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = length - 1;
            if (fromIndex !== undefined2) {
              index = toInteger(fromIndex);
              index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index, true);
          }
          function flatten(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, 1) : [];
          }
          function flattenDeep(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, INFINITY) : [];
          }
          function flattenDepth(array, depth) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            depth = depth === undefined2 ? 1 : toInteger(depth);
            return baseFlatten(array, depth);
          }
          function fromPairs(pairs) {
            var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
            while (++index < length) {
              var pair = pairs[index];
              result2[pair[0]] = pair[1];
            }
            return result2;
          }
          function head(array) {
            return array && array.length ? array[0] : undefined2;
          }
          function indexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
              index = nativeMax(length + index, 0);
            }
            return baseIndexOf(array, value, index);
          }
          function initial(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 0, -1) : [];
          }
          var intersection = baseRest(function(arrays) {
            var mapped = arrayMap(arrays, castArrayLikeObject);
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
          });
          var intersectionBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            if (iteratee2 === last(mapped)) {
              iteratee2 = undefined2;
            } else {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
          });
          var intersectionWith = baseRest(function(arrays) {
            var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            comparator = typeof comparator == "function" ? comparator : undefined2;
            if (comparator) {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined2, comparator) : [];
          });
          function join(array, separator) {
            return array == null ? "" : nativeJoin.call(array, separator);
          }
          function last(array) {
            var length = array == null ? 0 : array.length;
            return length ? array[length - 1] : undefined2;
          }
          function lastIndexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = length;
            if (fromIndex !== undefined2) {
              index = toInteger(fromIndex);
              index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
            }
            return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
          }
          function nth(array, n) {
            return array && array.length ? baseNth(array, toInteger(n)) : undefined2;
          }
          var pull = baseRest(pullAll);
          function pullAll(array, values2) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
          }
          function pullAllBy(array, values2, iteratee2) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
          }
          function pullAllWith(array, values2, comparator) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined2, comparator) : array;
          }
          var pullAt = flatRest(function(array, indexes) {
            var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
            basePullAt(array, arrayMap(indexes, function(index) {
              return isIndex(index, length) ? +index : index;
            }).sort(compareAscending));
            return result2;
          });
          function remove(array, predicate) {
            var result2 = [];
            if (!(array && array.length)) {
              return result2;
            }
            var index = -1, indexes = [], length = array.length;
            predicate = getIteratee(predicate, 3);
            while (++index < length) {
              var value = array[index];
              if (predicate(value, index, array)) {
                result2.push(value);
                indexes.push(index);
              }
            }
            basePullAt(array, indexes);
            return result2;
          }
          function reverse(array) {
            return array == null ? array : nativeReverse.call(array);
          }
          function slice(array, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
              start = 0;
              end = length;
            } else {
              start = start == null ? 0 : toInteger(start);
              end = end === undefined2 ? length : toInteger(end);
            }
            return baseSlice(array, start, end);
          }
          function sortedIndex(array, value) {
            return baseSortedIndex(array, value);
          }
          function sortedIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
          }
          function sortedIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
              var index = baseSortedIndex(array, value);
              if (index < length && eq(array[index], value)) {
                return index;
              }
            }
            return -1;
          }
          function sortedLastIndex(array, value) {
            return baseSortedIndex(array, value, true);
          }
          function sortedLastIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
          }
          function sortedLastIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
              var index = baseSortedIndex(array, value, true) - 1;
              if (eq(array[index], value)) {
                return index;
              }
            }
            return -1;
          }
          function sortedUniq(array) {
            return array && array.length ? baseSortedUniq(array) : [];
          }
          function sortedUniqBy(array, iteratee2) {
            return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          function tail(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 1, length) : [];
          }
          function take(array, n, guard) {
            if (!(array && array.length)) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            return baseSlice(array, 0, n < 0 ? 0 : n);
          }
          function takeRight(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            n = length - n;
            return baseSlice(array, n < 0 ? 0 : n, length);
          }
          function takeRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
          }
          function takeWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
          }
          var union = baseRest(function(arrays) {
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
          });
          var unionBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined2;
            }
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
          });
          var unionWith = baseRest(function(arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined2;
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined2, comparator);
          });
          function uniq(array) {
            return array && array.length ? baseUniq(array) : [];
          }
          function uniqBy(array, iteratee2) {
            return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          function uniqWith(array, comparator) {
            comparator = typeof comparator == "function" ? comparator : undefined2;
            return array && array.length ? baseUniq(array, undefined2, comparator) : [];
          }
          function unzip(array) {
            if (!(array && array.length)) {
              return [];
            }
            var length = 0;
            array = arrayFilter(array, function(group) {
              if (isArrayLikeObject(group)) {
                length = nativeMax(group.length, length);
                return true;
              }
            });
            return baseTimes(length, function(index) {
              return arrayMap(array, baseProperty(index));
            });
          }
          function unzipWith(array, iteratee2) {
            if (!(array && array.length)) {
              return [];
            }
            var result2 = unzip(array);
            if (iteratee2 == null) {
              return result2;
            }
            return arrayMap(result2, function(group) {
              return apply(iteratee2, undefined2, group);
            });
          }
          var without = baseRest(function(array, values2) {
            return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
          });
          var xor = baseRest(function(arrays) {
            return baseXor(arrayFilter(arrays, isArrayLikeObject));
          });
          var xorBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined2;
            }
            return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
          });
          var xorWith = baseRest(function(arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined2;
            return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined2, comparator);
          });
          var zip = baseRest(unzip);
          function zipObject(props, values2) {
            return baseZipObject(props || [], values2 || [], assignValue);
          }
          function zipObjectDeep(props, values2) {
            return baseZipObject(props || [], values2 || [], baseSet);
          }
          var zipWith = baseRest(function(arrays) {
            var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined2;
            iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined2;
            return unzipWith(arrays, iteratee2);
          });
          function chain(value) {
            var result2 = lodash(value);
            result2.__chain__ = true;
            return result2;
          }
          function tap(value, interceptor) {
            interceptor(value);
            return value;
          }
          function thru(value, interceptor) {
            return interceptor(value);
          }
          var wrapperAt = flatRest(function(paths) {
            var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
              return baseAt(object, paths);
            };
            if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
              return this.thru(interceptor);
            }
            value = value.slice(start, +start + (length ? 1 : 0));
            value.__actions__.push({
              "func": thru,
              "args": [interceptor],
              "thisArg": undefined2
            });
            return new LodashWrapper(value, this.__chain__).thru(function(array) {
              if (length && !array.length) {
                array.push(undefined2);
              }
              return array;
            });
          });
          function wrapperChain() {
            return chain(this);
          }
          function wrapperCommit() {
            return new LodashWrapper(this.value(), this.__chain__);
          }
          function wrapperNext() {
            if (this.__values__ === undefined2) {
              this.__values__ = toArray(this.value());
            }
            var done = this.__index__ >= this.__values__.length, value = done ? undefined2 : this.__values__[this.__index__++];
            return { "done": done, "value": value };
          }
          function wrapperToIterator() {
            return this;
          }
          function wrapperPlant(value) {
            var result2, parent2 = this;
            while (parent2 instanceof baseLodash) {
              var clone2 = wrapperClone(parent2);
              clone2.__index__ = 0;
              clone2.__values__ = undefined2;
              if (result2) {
                previous.__wrapped__ = clone2;
              } else {
                result2 = clone2;
              }
              var previous = clone2;
              parent2 = parent2.__wrapped__;
            }
            previous.__wrapped__ = value;
            return result2;
          }
          function wrapperReverse() {
            var value = this.__wrapped__;
            if (value instanceof LazyWrapper) {
              var wrapped = value;
              if (this.__actions__.length) {
                wrapped = new LazyWrapper(this);
              }
              wrapped = wrapped.reverse();
              wrapped.__actions__.push({
                "func": thru,
                "args": [reverse],
                "thisArg": undefined2
              });
              return new LodashWrapper(wrapped, this.__chain__);
            }
            return this.thru(reverse);
          }
          function wrapperValue() {
            return baseWrapperValue(this.__wrapped__, this.__actions__);
          }
          var countBy = createAggregator(function(result2, value, key) {
            if (hasOwnProperty.call(result2, key)) {
              ++result2[key];
            } else {
              baseAssignValue(result2, key, 1);
            }
          });
          function every(collection, predicate, guard) {
            var func = isArray(collection) ? arrayEvery : baseEvery;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined2;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          function filter(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, getIteratee(predicate, 3));
          }
          var find = createFind(findIndex);
          var findLast = createFind(findLastIndex);
          function flatMap(collection, iteratee2) {
            return baseFlatten(map(collection, iteratee2), 1);
          }
          function flatMapDeep(collection, iteratee2) {
            return baseFlatten(map(collection, iteratee2), INFINITY);
          }
          function flatMapDepth(collection, iteratee2, depth) {
            depth = depth === undefined2 ? 1 : toInteger(depth);
            return baseFlatten(map(collection, iteratee2), depth);
          }
          function forEach(collection, iteratee2) {
            var func = isArray(collection) ? arrayEach : baseEach;
            return func(collection, getIteratee(iteratee2, 3));
          }
          function forEachRight(collection, iteratee2) {
            var func = isArray(collection) ? arrayEachRight : baseEachRight;
            return func(collection, getIteratee(iteratee2, 3));
          }
          var groupBy = createAggregator(function(result2, value, key) {
            if (hasOwnProperty.call(result2, key)) {
              result2[key].push(value);
            } else {
              baseAssignValue(result2, key, [value]);
            }
          });
          function includes(collection, value, fromIndex, guard) {
            collection = isArrayLike(collection) ? collection : values(collection);
            fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
            var length = collection.length;
            if (fromIndex < 0) {
              fromIndex = nativeMax(length + fromIndex, 0);
            }
            return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
          }
          var invokeMap = baseRest(function(collection, path, args) {
            var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
            baseEach(collection, function(value) {
              result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
            });
            return result2;
          });
          var keyBy = createAggregator(function(result2, value, key) {
            baseAssignValue(result2, key, value);
          });
          function map(collection, iteratee2) {
            var func = isArray(collection) ? arrayMap : baseMap;
            return func(collection, getIteratee(iteratee2, 3));
          }
          function orderBy(collection, iteratees, orders, guard) {
            if (collection == null) {
              return [];
            }
            if (!isArray(iteratees)) {
              iteratees = iteratees == null ? [] : [iteratees];
            }
            orders = guard ? undefined2 : orders;
            if (!isArray(orders)) {
              orders = orders == null ? [] : [orders];
            }
            return baseOrderBy(collection, iteratees, orders);
          }
          var partition = createAggregator(function(result2, value, key) {
            result2[key ? 0 : 1].push(value);
          }, function() {
            return [[], []];
          });
          function reduce(collection, iteratee2, accumulator) {
            var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
          }
          function reduceRight(collection, iteratee2, accumulator) {
            var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
          }
          function reject(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, negate(getIteratee(predicate, 3)));
          }
          function sample(collection) {
            var func = isArray(collection) ? arraySample : baseSample;
            return func(collection);
          }
          function sampleSize(collection, n, guard) {
            if (guard ? isIterateeCall(collection, n, guard) : n === undefined2) {
              n = 1;
            } else {
              n = toInteger(n);
            }
            var func = isArray(collection) ? arraySampleSize : baseSampleSize;
            return func(collection, n);
          }
          function shuffle(collection) {
            var func = isArray(collection) ? arrayShuffle : baseShuffle;
            return func(collection);
          }
          function size(collection) {
            if (collection == null) {
              return 0;
            }
            if (isArrayLike(collection)) {
              return isString(collection) ? stringSize(collection) : collection.length;
            }
            var tag = getTag(collection);
            if (tag == mapTag || tag == setTag) {
              return collection.size;
            }
            return baseKeys(collection).length;
          }
          function some(collection, predicate, guard) {
            var func = isArray(collection) ? arraySome : baseSome;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined2;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          var sortBy = baseRest(function(collection, iteratees) {
            if (collection == null) {
              return [];
            }
            var length = iteratees.length;
            if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
              iteratees = [];
            } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
              iteratees = [iteratees[0]];
            }
            return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
          });
          var now = ctxNow || function() {
            return root.Date.now();
          };
          function after(n, func) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function() {
              if (--n < 1) {
                return func.apply(this, arguments);
              }
            };
          }
          function ary(func, n, guard) {
            n = guard ? undefined2 : n;
            n = func && n == null ? func.length : n;
            return createWrap(func, WRAP_ARY_FLAG, undefined2, undefined2, undefined2, undefined2, n);
          }
          function before(n, func) {
            var result2;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function() {
              if (--n > 0) {
                result2 = func.apply(this, arguments);
              }
              if (n <= 1) {
                func = undefined2;
              }
              return result2;
            };
          }
          var bind = baseRest(function(func, thisArg, partials) {
            var bitmask = WRAP_BIND_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bind));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(func, bitmask, thisArg, partials, holders);
          });
          var bindKey = baseRest(function(object, key, partials) {
            var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bindKey));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(key, bitmask, object, partials, holders);
          });
          function curry(func, arity, guard) {
            arity = guard ? undefined2 : arity;
            var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
            result2.placeholder = curry.placeholder;
            return result2;
          }
          function curryRight(func, arity, guard) {
            arity = guard ? undefined2 : arity;
            var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
            result2.placeholder = curryRight.placeholder;
            return result2;
          }
          function debounce(func, wait, options) {
            var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            wait = toNumber(wait) || 0;
            if (isObject(options)) {
              leading = !!options.leading;
              maxing = "maxWait" in options;
              maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
              trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            function invokeFunc(time) {
              var args = lastArgs, thisArg = lastThis;
              lastArgs = lastThis = undefined2;
              lastInvokeTime = time;
              result2 = func.apply(thisArg, args);
              return result2;
            }
            function leadingEdge(time) {
              lastInvokeTime = time;
              timerId = setTimeout2(timerExpired, wait);
              return leading ? invokeFunc(time) : result2;
            }
            function remainingWait(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
              return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
            }
            function shouldInvoke(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
              return lastCallTime === undefined2 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
            }
            function timerExpired() {
              var time = now();
              if (shouldInvoke(time)) {
                return trailingEdge(time);
              }
              timerId = setTimeout2(timerExpired, remainingWait(time));
            }
            function trailingEdge(time) {
              timerId = undefined2;
              if (trailing && lastArgs) {
                return invokeFunc(time);
              }
              lastArgs = lastThis = undefined2;
              return result2;
            }
            function cancel() {
              if (timerId !== undefined2) {
                clearTimeout(timerId);
              }
              lastInvokeTime = 0;
              lastArgs = lastCallTime = lastThis = timerId = undefined2;
            }
            function flush2() {
              return timerId === undefined2 ? result2 : trailingEdge(now());
            }
            function debounced() {
              var time = now(), isInvoking = shouldInvoke(time);
              lastArgs = arguments;
              lastThis = this;
              lastCallTime = time;
              if (isInvoking) {
                if (timerId === undefined2) {
                  return leadingEdge(lastCallTime);
                }
                if (maxing) {
                  clearTimeout(timerId);
                  timerId = setTimeout2(timerExpired, wait);
                  return invokeFunc(lastCallTime);
                }
              }
              if (timerId === undefined2) {
                timerId = setTimeout2(timerExpired, wait);
              }
              return result2;
            }
            debounced.cancel = cancel;
            debounced.flush = flush2;
            return debounced;
          }
          var defer = baseRest(function(func, args) {
            return baseDelay(func, 1, args);
          });
          var delay = baseRest(function(func, wait, args) {
            return baseDelay(func, toNumber(wait) || 0, args);
          });
          function flip(func) {
            return createWrap(func, WRAP_FLIP_FLAG);
          }
          function memoize(func, resolver) {
            if (typeof func != "function" || resolver != null && typeof resolver != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            var memoized = function() {
              var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
              if (cache2.has(key)) {
                return cache2.get(key);
              }
              var result2 = func.apply(this, args);
              memoized.cache = cache2.set(key, result2) || cache2;
              return result2;
            };
            memoized.cache = new (memoize.Cache || MapCache)();
            return memoized;
          }
          memoize.Cache = MapCache;
          function negate(predicate) {
            if (typeof predicate != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return function() {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return !predicate.call(this);
                case 1:
                  return !predicate.call(this, args[0]);
                case 2:
                  return !predicate.call(this, args[0], args[1]);
                case 3:
                  return !predicate.call(this, args[0], args[1], args[2]);
              }
              return !predicate.apply(this, args);
            };
          }
          function once(func) {
            return before(2, func);
          }
          var overArgs = castRest(function(func, transforms) {
            transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
            var funcsLength = transforms.length;
            return baseRest(function(args) {
              var index = -1, length = nativeMin(args.length, funcsLength);
              while (++index < length) {
                args[index] = transforms[index].call(this, args[index]);
              }
              return apply(func, this, args);
            });
          });
          var partial = baseRest(function(func, partials) {
            var holders = replaceHolders(partials, getHolder(partial));
            return createWrap(func, WRAP_PARTIAL_FLAG, undefined2, partials, holders);
          });
          var partialRight = baseRest(function(func, partials) {
            var holders = replaceHolders(partials, getHolder(partialRight));
            return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined2, partials, holders);
          });
          var rearg = flatRest(function(func, indexes) {
            return createWrap(func, WRAP_REARG_FLAG, undefined2, undefined2, undefined2, indexes);
          });
          function rest(func, start) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            start = start === undefined2 ? start : toInteger(start);
            return baseRest(func, start);
          }
          function spread(func, start) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            start = start == null ? 0 : nativeMax(toInteger(start), 0);
            return baseRest(function(args) {
              var array = args[start], otherArgs = castSlice(args, 0, start);
              if (array) {
                arrayPush(otherArgs, array);
              }
              return apply(func, this, otherArgs);
            });
          }
          function throttle(func, wait, options) {
            var leading = true, trailing = true;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            if (isObject(options)) {
              leading = "leading" in options ? !!options.leading : leading;
              trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            return debounce(func, wait, {
              "leading": leading,
              "maxWait": wait,
              "trailing": trailing
            });
          }
          function unary(func) {
            return ary(func, 1);
          }
          function wrap(value, wrapper) {
            return partial(castFunction(wrapper), value);
          }
          function castArray() {
            if (!arguments.length) {
              return [];
            }
            var value = arguments[0];
            return isArray(value) ? value : [value];
          }
          function clone(value) {
            return baseClone(value, CLONE_SYMBOLS_FLAG);
          }
          function cloneWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
          }
          function cloneDeep(value) {
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
          }
          function cloneDeepWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
          }
          function conformsTo(object, source) {
            return source == null || baseConformsTo(object, source, keys(source));
          }
          function eq(value, other) {
            return value === other || value !== value && other !== other;
          }
          var gt = createRelationalOperation(baseGt);
          var gte = createRelationalOperation(function(value, other) {
            return value >= other;
          });
          var isArguments = baseIsArguments(function() {
            return arguments;
          }()) ? baseIsArguments : function(value) {
            return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
          };
          var isArray = Array2.isArray;
          var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
          function isArrayLike(value) {
            return value != null && isLength(value.length) && !isFunction(value);
          }
          function isArrayLikeObject(value) {
            return isObjectLike(value) && isArrayLike(value);
          }
          function isBoolean(value) {
            return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
          }
          var isBuffer = nativeIsBuffer || stubFalse;
          var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
          function isElement(value) {
            return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
          }
          function isEmpty(value) {
            if (value == null) {
              return true;
            }
            if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
              return !value.length;
            }
            var tag = getTag(value);
            if (tag == mapTag || tag == setTag) {
              return !value.size;
            }
            if (isPrototype(value)) {
              return !baseKeys(value).length;
            }
            for (var key in value) {
              if (hasOwnProperty.call(value, key)) {
                return false;
              }
            }
            return true;
          }
          function isEqual(value, other) {
            return baseIsEqual(value, other);
          }
          function isEqualWith(value, other, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            var result2 = customizer ? customizer(value, other) : undefined2;
            return result2 === undefined2 ? baseIsEqual(value, other, undefined2, customizer) : !!result2;
          }
          function isError(value) {
            if (!isObjectLike(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
          }
          function isFinite2(value) {
            return typeof value == "number" && nativeIsFinite(value);
          }
          function isFunction(value) {
            if (!isObject(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
          }
          function isInteger(value) {
            return typeof value == "number" && value == toInteger(value);
          }
          function isLength(value) {
            return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
          }
          function isObject(value) {
            var type = typeof value;
            return value != null && (type == "object" || type == "function");
          }
          function isObjectLike(value) {
            return value != null && typeof value == "object";
          }
          var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
          function isMatch(object, source) {
            return object === source || baseIsMatch(object, source, getMatchData(source));
          }
          function isMatchWith(object, source, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return baseIsMatch(object, source, getMatchData(source), customizer);
          }
          function isNaN2(value) {
            return isNumber(value) && value != +value;
          }
          function isNative(value) {
            if (isMaskable(value)) {
              throw new Error2(CORE_ERROR_TEXT);
            }
            return baseIsNative(value);
          }
          function isNull(value) {
            return value === null;
          }
          function isNil(value) {
            return value == null;
          }
          function isNumber(value) {
            return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
          }
          function isPlainObject(value) {
            if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
              return false;
            }
            var proto = getPrototype(value);
            if (proto === null) {
              return true;
            }
            var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
            return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
          }
          var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
          function isSafeInteger(value) {
            return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
          }
          var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
          function isString(value) {
            return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
          }
          function isSymbol(value) {
            return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
          }
          var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
          function isUndefined(value) {
            return value === undefined2;
          }
          function isWeakMap(value) {
            return isObjectLike(value) && getTag(value) == weakMapTag;
          }
          function isWeakSet(value) {
            return isObjectLike(value) && baseGetTag(value) == weakSetTag;
          }
          var lt = createRelationalOperation(baseLt);
          var lte = createRelationalOperation(function(value, other) {
            return value <= other;
          });
          function toArray(value) {
            if (!value) {
              return [];
            }
            if (isArrayLike(value)) {
              return isString(value) ? stringToArray(value) : copyArray(value);
            }
            if (symIterator && value[symIterator]) {
              return iteratorToArray(value[symIterator]());
            }
            var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
            return func(value);
          }
          function toFinite(value) {
            if (!value) {
              return value === 0 ? value : 0;
            }
            value = toNumber(value);
            if (value === INFINITY || value === -INFINITY) {
              var sign = value < 0 ? -1 : 1;
              return sign * MAX_INTEGER;
            }
            return value === value ? value : 0;
          }
          function toInteger(value) {
            var result2 = toFinite(value), remainder = result2 % 1;
            return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
          }
          function toLength(value) {
            return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
          }
          function toNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            if (isObject(value)) {
              var other = typeof value.valueOf == "function" ? value.valueOf() : value;
              value = isObject(other) ? other + "" : other;
            }
            if (typeof value != "string") {
              return value === 0 ? value : +value;
            }
            value = baseTrim(value);
            var isBinary = reIsBinary.test(value);
            return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
          }
          function toPlainObject(value) {
            return copyObject(value, keysIn(value));
          }
          function toSafeInteger(value) {
            return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
          }
          function toString(value) {
            return value == null ? "" : baseToString(value);
          }
          var assign2 = createAssigner(function(object, source) {
            if (isPrototype(source) || isArrayLike(source)) {
              copyObject(source, keys(source), object);
              return;
            }
            for (var key in source) {
              if (hasOwnProperty.call(source, key)) {
                assignValue(object, key, source[key]);
              }
            }
          });
          var assignIn = createAssigner(function(object, source) {
            copyObject(source, keysIn(source), object);
          });
          var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
            copyObject(source, keysIn(source), object, customizer);
          });
          var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
            copyObject(source, keys(source), object, customizer);
          });
          var at = flatRest(baseAt);
          function create(prototype, properties) {
            var result2 = baseCreate(prototype);
            return properties == null ? result2 : baseAssign(result2, properties);
          }
          var defaults = baseRest(function(object, sources2) {
            object = Object2(object);
            var index = -1;
            var length = sources2.length;
            var guard = length > 2 ? sources2[2] : undefined2;
            if (guard && isIterateeCall(sources2[0], sources2[1], guard)) {
              length = 1;
            }
            while (++index < length) {
              var source = sources2[index];
              var props = keysIn(source);
              var propsIndex = -1;
              var propsLength = props.length;
              while (++propsIndex < propsLength) {
                var key = props[propsIndex];
                var value = object[key];
                if (value === undefined2 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                  object[key] = source[key];
                }
              }
            }
            return object;
          });
          var defaultsDeep = baseRest(function(args) {
            args.push(undefined2, customDefaultsMerge);
            return apply(mergeWith, undefined2, args);
          });
          function findKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
          }
          function findLastKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
          }
          function forIn(object, iteratee2) {
            return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
          }
          function forInRight(object, iteratee2) {
            return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
          }
          function forOwn(object, iteratee2) {
            return object && baseForOwn(object, getIteratee(iteratee2, 3));
          }
          function forOwnRight(object, iteratee2) {
            return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
          }
          function functions(object) {
            return object == null ? [] : baseFunctions(object, keys(object));
          }
          function functionsIn(object) {
            return object == null ? [] : baseFunctions(object, keysIn(object));
          }
          function get(object, path, defaultValue) {
            var result2 = object == null ? undefined2 : baseGet(object, path);
            return result2 === undefined2 ? defaultValue : result2;
          }
          function has(object, path) {
            return object != null && hasPath(object, path, baseHas);
          }
          function hasIn(object, path) {
            return object != null && hasPath(object, path, baseHasIn);
          }
          var invert = createInverter(function(result2, value, key) {
            if (value != null && typeof value.toString != "function") {
              value = nativeObjectToString.call(value);
            }
            result2[value] = key;
          }, constant(identity));
          var invertBy = createInverter(function(result2, value, key) {
            if (value != null && typeof value.toString != "function") {
              value = nativeObjectToString.call(value);
            }
            if (hasOwnProperty.call(result2, value)) {
              result2[value].push(key);
            } else {
              result2[value] = [key];
            }
          }, getIteratee);
          var invoke = baseRest(baseInvoke);
          function keys(object) {
            return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
          }
          function keysIn(object) {
            return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
          }
          function mapKeys(object, iteratee2) {
            var result2 = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function(value, key, object2) {
              baseAssignValue(result2, iteratee2(value, key, object2), value);
            });
            return result2;
          }
          function mapValues(object, iteratee2) {
            var result2 = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function(value, key, object2) {
              baseAssignValue(result2, key, iteratee2(value, key, object2));
            });
            return result2;
          }
          var merge = createAssigner(function(object, source, srcIndex) {
            baseMerge(object, source, srcIndex);
          });
          var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
            baseMerge(object, source, srcIndex, customizer);
          });
          var omit = flatRest(function(object, paths) {
            var result2 = {};
            if (object == null) {
              return result2;
            }
            var isDeep = false;
            paths = arrayMap(paths, function(path) {
              path = castPath(path, object);
              isDeep || (isDeep = path.length > 1);
              return path;
            });
            copyObject(object, getAllKeysIn(object), result2);
            if (isDeep) {
              result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
            }
            var length = paths.length;
            while (length--) {
              baseUnset(result2, paths[length]);
            }
            return result2;
          });
          function omitBy(object, predicate) {
            return pickBy(object, negate(getIteratee(predicate)));
          }
          var pick = flatRest(function(object, paths) {
            return object == null ? {} : basePick(object, paths);
          });
          function pickBy(object, predicate) {
            if (object == null) {
              return {};
            }
            var props = arrayMap(getAllKeysIn(object), function(prop) {
              return [prop];
            });
            predicate = getIteratee(predicate);
            return basePickBy(object, props, function(value, path) {
              return predicate(value, path[0]);
            });
          }
          function result(object, path, defaultValue) {
            path = castPath(path, object);
            var index = -1, length = path.length;
            if (!length) {
              length = 1;
              object = undefined2;
            }
            while (++index < length) {
              var value = object == null ? undefined2 : object[toKey(path[index])];
              if (value === undefined2) {
                index = length;
                value = defaultValue;
              }
              object = isFunction(value) ? value.call(object) : value;
            }
            return object;
          }
          function set(object, path, value) {
            return object == null ? object : baseSet(object, path, value);
          }
          function setWith(object, path, value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return object == null ? object : baseSet(object, path, value, customizer);
          }
          var toPairs = createToPairs(keys);
          var toPairsIn = createToPairs(keysIn);
          function transform(object, iteratee2, accumulator) {
            var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
            iteratee2 = getIteratee(iteratee2, 4);
            if (accumulator == null) {
              var Ctor = object && object.constructor;
              if (isArrLike) {
                accumulator = isArr ? new Ctor() : [];
              } else if (isObject(object)) {
                accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
              } else {
                accumulator = {};
              }
            }
            (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
              return iteratee2(accumulator, value, index, object2);
            });
            return accumulator;
          }
          function unset(object, path) {
            return object == null ? true : baseUnset(object, path);
          }
          function update2(object, path, updater) {
            return object == null ? object : baseUpdate(object, path, castFunction(updater));
          }
          function updateWith(object, path, updater, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
          }
          function values(object) {
            return object == null ? [] : baseValues(object, keys(object));
          }
          function valuesIn(object) {
            return object == null ? [] : baseValues(object, keysIn(object));
          }
          function clamp(number, lower, upper) {
            if (upper === undefined2) {
              upper = lower;
              lower = undefined2;
            }
            if (upper !== undefined2) {
              upper = toNumber(upper);
              upper = upper === upper ? upper : 0;
            }
            if (lower !== undefined2) {
              lower = toNumber(lower);
              lower = lower === lower ? lower : 0;
            }
            return baseClamp(toNumber(number), lower, upper);
          }
          function inRange(number, start, end) {
            start = toFinite(start);
            if (end === undefined2) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            number = toNumber(number);
            return baseInRange(number, start, end);
          }
          function random(lower, upper, floating) {
            if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
              upper = floating = undefined2;
            }
            if (floating === undefined2) {
              if (typeof upper == "boolean") {
                floating = upper;
                upper = undefined2;
              } else if (typeof lower == "boolean") {
                floating = lower;
                lower = undefined2;
              }
            }
            if (lower === undefined2 && upper === undefined2) {
              lower = 0;
              upper = 1;
            } else {
              lower = toFinite(lower);
              if (upper === undefined2) {
                upper = lower;
                lower = 0;
              } else {
                upper = toFinite(upper);
              }
            }
            if (lower > upper) {
              var temp = lower;
              lower = upper;
              upper = temp;
            }
            if (floating || lower % 1 || upper % 1) {
              var rand = nativeRandom();
              return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
            }
            return baseRandom(lower, upper);
          }
          var camelCase = createCompounder(function(result2, word, index) {
            word = word.toLowerCase();
            return result2 + (index ? capitalize(word) : word);
          });
          function capitalize(string) {
            return upperFirst(toString(string).toLowerCase());
          }
          function deburr(string) {
            string = toString(string);
            return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
          }
          function endsWith(string, target, position) {
            string = toString(string);
            target = baseToString(target);
            var length = string.length;
            position = position === undefined2 ? length : baseClamp(toInteger(position), 0, length);
            var end = position;
            position -= target.length;
            return position >= 0 && string.slice(position, end) == target;
          }
          function escape(string) {
            string = toString(string);
            return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
          }
          function escapeRegExp(string) {
            string = toString(string);
            return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
          }
          var kebabCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? "-" : "") + word.toLowerCase();
          });
          var lowerCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + word.toLowerCase();
          });
          var lowerFirst = createCaseFirst("toLowerCase");
          function pad(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            if (!length || strLength >= length) {
              return string;
            }
            var mid = (length - strLength) / 2;
            return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
          }
          function padEnd(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
          }
          function padStart(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
          }
          function parseInt2(string, radix, guard) {
            if (guard || radix == null) {
              radix = 0;
            } else if (radix) {
              radix = +radix;
            }
            return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
          }
          function repeat(string, n, guard) {
            if (guard ? isIterateeCall(string, n, guard) : n === undefined2) {
              n = 1;
            } else {
              n = toInteger(n);
            }
            return baseRepeat(toString(string), n);
          }
          function replace() {
            var args = arguments, string = toString(args[0]);
            return args.length < 3 ? string : string.replace(args[1], args[2]);
          }
          var snakeCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? "_" : "") + word.toLowerCase();
          });
          function split(string, separator, limit) {
            if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
              separator = limit = undefined2;
            }
            limit = limit === undefined2 ? MAX_ARRAY_LENGTH : limit >>> 0;
            if (!limit) {
              return [];
            }
            string = toString(string);
            if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
              separator = baseToString(separator);
              if (!separator && hasUnicode(string)) {
                return castSlice(stringToArray(string), 0, limit);
              }
            }
            return string.split(separator, limit);
          }
          var startCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + upperFirst(word);
          });
          function startsWith(string, target, position) {
            string = toString(string);
            position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
            target = baseToString(target);
            return string.slice(position, position + target.length) == target;
          }
          function template(string, options, guard) {
            var settings2 = lodash.templateSettings;
            if (guard && isIterateeCall(string, options, guard)) {
              options = undefined2;
            }
            string = toString(string);
            options = assignInWith({}, options, settings2, customDefaultsAssignIn);
            var imports = assignInWith({}, options.imports, settings2.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
            var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
            var reDelimiters = RegExp2((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g");
            var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
            string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
              interpolateValue || (interpolateValue = esTemplateValue);
              source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
              if (escapeValue) {
                isEscaping = true;
                source += "' +\n__e(" + escapeValue + ") +\n'";
              }
              if (evaluateValue) {
                isEvaluating = true;
                source += "';\n" + evaluateValue + ";\n__p += '";
              }
              if (interpolateValue) {
                source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
              }
              index = offset + match.length;
              return match;
            });
            source += "';\n";
            var variable = hasOwnProperty.call(options, "variable") && options.variable;
            if (!variable) {
              source = "with (obj) {\n" + source + "\n}\n";
            } else if (reForbiddenIdentifierChars.test(variable)) {
              throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
            }
            source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
            source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
            var result2 = attempt(function() {
              return Function2(importsKeys, sourceURL + "return " + source).apply(undefined2, importsValues);
            });
            result2.source = source;
            if (isError(result2)) {
              throw result2;
            }
            return result2;
          }
          function toLower(value) {
            return toString(value).toLowerCase();
          }
          function toUpper(value) {
            return toString(value).toUpperCase();
          }
          function trim(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined2)) {
              return baseTrim(string);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
            return castSlice(strSymbols, start, end).join("");
          }
          function trimEnd(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined2)) {
              return string.slice(0, trimmedEndIndex(string) + 1);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
            return castSlice(strSymbols, 0, end).join("");
          }
          function trimStart(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined2)) {
              return string.replace(reTrimStart, "");
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
            return castSlice(strSymbols, start).join("");
          }
          function truncate(string, options) {
            var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
            if (isObject(options)) {
              var separator = "separator" in options ? options.separator : separator;
              length = "length" in options ? toInteger(options.length) : length;
              omission = "omission" in options ? baseToString(options.omission) : omission;
            }
            string = toString(string);
            var strLength = string.length;
            if (hasUnicode(string)) {
              var strSymbols = stringToArray(string);
              strLength = strSymbols.length;
            }
            if (length >= strLength) {
              return string;
            }
            var end = length - stringSize(omission);
            if (end < 1) {
              return omission;
            }
            var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
            if (separator === undefined2) {
              return result2 + omission;
            }
            if (strSymbols) {
              end += result2.length - end;
            }
            if (isRegExp(separator)) {
              if (string.slice(end).search(separator)) {
                var match, substring = result2;
                if (!separator.global) {
                  separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
                }
                separator.lastIndex = 0;
                while (match = separator.exec(substring)) {
                  var newEnd = match.index;
                }
                result2 = result2.slice(0, newEnd === undefined2 ? end : newEnd);
              }
            } else if (string.indexOf(baseToString(separator), end) != end) {
              var index = result2.lastIndexOf(separator);
              if (index > -1) {
                result2 = result2.slice(0, index);
              }
            }
            return result2 + omission;
          }
          function unescape(string) {
            string = toString(string);
            return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
          }
          var upperCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + word.toUpperCase();
          });
          var upperFirst = createCaseFirst("toUpperCase");
          function words(string, pattern, guard) {
            string = toString(string);
            pattern = guard ? undefined2 : pattern;
            if (pattern === undefined2) {
              return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
            }
            return string.match(pattern) || [];
          }
          var attempt = baseRest(function(func, args) {
            try {
              return apply(func, undefined2, args);
            } catch (e) {
              return isError(e) ? e : new Error2(e);
            }
          });
          var bindAll = flatRest(function(object, methodNames) {
            arrayEach(methodNames, function(key) {
              key = toKey(key);
              baseAssignValue(object, key, bind(object[key], object));
            });
            return object;
          });
          function cond(pairs) {
            var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
            pairs = !length ? [] : arrayMap(pairs, function(pair) {
              if (typeof pair[1] != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              return [toIteratee(pair[0]), pair[1]];
            });
            return baseRest(function(args) {
              var index = -1;
              while (++index < length) {
                var pair = pairs[index];
                if (apply(pair[0], this, args)) {
                  return apply(pair[1], this, args);
                }
              }
            });
          }
          function conforms(source) {
            return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
          }
          function constant(value) {
            return function() {
              return value;
            };
          }
          function defaultTo(value, defaultValue) {
            return value == null || value !== value ? defaultValue : value;
          }
          var flow = createFlow();
          var flowRight = createFlow(true);
          function identity(value) {
            return value;
          }
          function iteratee(func) {
            return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
          }
          function matches(source) {
            return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
          }
          function matchesProperty(path, srcValue) {
            return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
          }
          var method = baseRest(function(path, args) {
            return function(object) {
              return baseInvoke(object, path, args);
            };
          });
          var methodOf = baseRest(function(object, args) {
            return function(path) {
              return baseInvoke(object, path, args);
            };
          });
          function mixin(object, source, options) {
            var props = keys(source), methodNames = baseFunctions(source, props);
            if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
              options = source;
              source = object;
              object = this;
              methodNames = baseFunctions(source, keys(source));
            }
            var chain2 = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
            arrayEach(methodNames, function(methodName) {
              var func = source[methodName];
              object[methodName] = func;
              if (isFunc) {
                object.prototype[methodName] = function() {
                  var chainAll = this.__chain__;
                  if (chain2 || chainAll) {
                    var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                    actions.push({ "func": func, "args": arguments, "thisArg": object });
                    result2.__chain__ = chainAll;
                    return result2;
                  }
                  return func.apply(object, arrayPush([this.value()], arguments));
                };
              }
            });
            return object;
          }
          function noConflict() {
            if (root._ === this) {
              root._ = oldDash;
            }
            return this;
          }
          function noop2() {
          }
          function nthArg(n) {
            n = toInteger(n);
            return baseRest(function(args) {
              return baseNth(args, n);
            });
          }
          var over = createOver(arrayMap);
          var overEvery = createOver(arrayEvery);
          var overSome = createOver(arraySome);
          function property(path) {
            return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
          }
          function propertyOf(object) {
            return function(path) {
              return object == null ? undefined2 : baseGet(object, path);
            };
          }
          var range = createRange();
          var rangeRight = createRange(true);
          function stubArray() {
            return [];
          }
          function stubFalse() {
            return false;
          }
          function stubObject() {
            return {};
          }
          function stubString() {
            return "";
          }
          function stubTrue() {
            return true;
          }
          function times(n, iteratee2) {
            n = toInteger(n);
            if (n < 1 || n > MAX_SAFE_INTEGER) {
              return [];
            }
            var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
            iteratee2 = getIteratee(iteratee2);
            n -= MAX_ARRAY_LENGTH;
            var result2 = baseTimes(length, iteratee2);
            while (++index < n) {
              iteratee2(index);
            }
            return result2;
          }
          function toPath(value) {
            if (isArray(value)) {
              return arrayMap(value, toKey);
            }
            return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
          }
          function uniqueId(prefix) {
            var id = ++idCounter;
            return toString(prefix) + id;
          }
          var add = createMathOperation(function(augend, addend) {
            return augend + addend;
          }, 0);
          var ceil = createRound("ceil");
          var divide = createMathOperation(function(dividend, divisor) {
            return dividend / divisor;
          }, 1);
          var floor = createRound("floor");
          function max(array) {
            return array && array.length ? baseExtremum(array, identity, baseGt) : undefined2;
          }
          function maxBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined2;
          }
          function mean(array) {
            return baseMean(array, identity);
          }
          function meanBy(array, iteratee2) {
            return baseMean(array, getIteratee(iteratee2, 2));
          }
          function min(array) {
            return array && array.length ? baseExtremum(array, identity, baseLt) : undefined2;
          }
          function minBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined2;
          }
          var multiply = createMathOperation(function(multiplier, multiplicand) {
            return multiplier * multiplicand;
          }, 1);
          var round = createRound("round");
          var subtract = createMathOperation(function(minuend, subtrahend) {
            return minuend - subtrahend;
          }, 0);
          function sum(array) {
            return array && array.length ? baseSum(array, identity) : 0;
          }
          function sumBy(array, iteratee2) {
            return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
          }
          lodash.after = after;
          lodash.ary = ary;
          lodash.assign = assign2;
          lodash.assignIn = assignIn;
          lodash.assignInWith = assignInWith;
          lodash.assignWith = assignWith;
          lodash.at = at;
          lodash.before = before;
          lodash.bind = bind;
          lodash.bindAll = bindAll;
          lodash.bindKey = bindKey;
          lodash.castArray = castArray;
          lodash.chain = chain;
          lodash.chunk = chunk;
          lodash.compact = compact;
          lodash.concat = concat;
          lodash.cond = cond;
          lodash.conforms = conforms;
          lodash.constant = constant;
          lodash.countBy = countBy;
          lodash.create = create;
          lodash.curry = curry;
          lodash.curryRight = curryRight;
          lodash.debounce = debounce;
          lodash.defaults = defaults;
          lodash.defaultsDeep = defaultsDeep;
          lodash.defer = defer;
          lodash.delay = delay;
          lodash.difference = difference;
          lodash.differenceBy = differenceBy;
          lodash.differenceWith = differenceWith;
          lodash.drop = drop;
          lodash.dropRight = dropRight;
          lodash.dropRightWhile = dropRightWhile;
          lodash.dropWhile = dropWhile;
          lodash.fill = fill;
          lodash.filter = filter;
          lodash.flatMap = flatMap;
          lodash.flatMapDeep = flatMapDeep;
          lodash.flatMapDepth = flatMapDepth;
          lodash.flatten = flatten;
          lodash.flattenDeep = flattenDeep;
          lodash.flattenDepth = flattenDepth;
          lodash.flip = flip;
          lodash.flow = flow;
          lodash.flowRight = flowRight;
          lodash.fromPairs = fromPairs;
          lodash.functions = functions;
          lodash.functionsIn = functionsIn;
          lodash.groupBy = groupBy;
          lodash.initial = initial;
          lodash.intersection = intersection;
          lodash.intersectionBy = intersectionBy;
          lodash.intersectionWith = intersectionWith;
          lodash.invert = invert;
          lodash.invertBy = invertBy;
          lodash.invokeMap = invokeMap;
          lodash.iteratee = iteratee;
          lodash.keyBy = keyBy;
          lodash.keys = keys;
          lodash.keysIn = keysIn;
          lodash.map = map;
          lodash.mapKeys = mapKeys;
          lodash.mapValues = mapValues;
          lodash.matches = matches;
          lodash.matchesProperty = matchesProperty;
          lodash.memoize = memoize;
          lodash.merge = merge;
          lodash.mergeWith = mergeWith;
          lodash.method = method;
          lodash.methodOf = methodOf;
          lodash.mixin = mixin;
          lodash.negate = negate;
          lodash.nthArg = nthArg;
          lodash.omit = omit;
          lodash.omitBy = omitBy;
          lodash.once = once;
          lodash.orderBy = orderBy;
          lodash.over = over;
          lodash.overArgs = overArgs;
          lodash.overEvery = overEvery;
          lodash.overSome = overSome;
          lodash.partial = partial;
          lodash.partialRight = partialRight;
          lodash.partition = partition;
          lodash.pick = pick;
          lodash.pickBy = pickBy;
          lodash.property = property;
          lodash.propertyOf = propertyOf;
          lodash.pull = pull;
          lodash.pullAll = pullAll;
          lodash.pullAllBy = pullAllBy;
          lodash.pullAllWith = pullAllWith;
          lodash.pullAt = pullAt;
          lodash.range = range;
          lodash.rangeRight = rangeRight;
          lodash.rearg = rearg;
          lodash.reject = reject;
          lodash.remove = remove;
          lodash.rest = rest;
          lodash.reverse = reverse;
          lodash.sampleSize = sampleSize;
          lodash.set = set;
          lodash.setWith = setWith;
          lodash.shuffle = shuffle;
          lodash.slice = slice;
          lodash.sortBy = sortBy;
          lodash.sortedUniq = sortedUniq;
          lodash.sortedUniqBy = sortedUniqBy;
          lodash.split = split;
          lodash.spread = spread;
          lodash.tail = tail;
          lodash.take = take;
          lodash.takeRight = takeRight;
          lodash.takeRightWhile = takeRightWhile;
          lodash.takeWhile = takeWhile;
          lodash.tap = tap;
          lodash.throttle = throttle;
          lodash.thru = thru;
          lodash.toArray = toArray;
          lodash.toPairs = toPairs;
          lodash.toPairsIn = toPairsIn;
          lodash.toPath = toPath;
          lodash.toPlainObject = toPlainObject;
          lodash.transform = transform;
          lodash.unary = unary;
          lodash.union = union;
          lodash.unionBy = unionBy;
          lodash.unionWith = unionWith;
          lodash.uniq = uniq;
          lodash.uniqBy = uniqBy;
          lodash.uniqWith = uniqWith;
          lodash.unset = unset;
          lodash.unzip = unzip;
          lodash.unzipWith = unzipWith;
          lodash.update = update2;
          lodash.updateWith = updateWith;
          lodash.values = values;
          lodash.valuesIn = valuesIn;
          lodash.without = without;
          lodash.words = words;
          lodash.wrap = wrap;
          lodash.xor = xor;
          lodash.xorBy = xorBy;
          lodash.xorWith = xorWith;
          lodash.zip = zip;
          lodash.zipObject = zipObject;
          lodash.zipObjectDeep = zipObjectDeep;
          lodash.zipWith = zipWith;
          lodash.entries = toPairs;
          lodash.entriesIn = toPairsIn;
          lodash.extend = assignIn;
          lodash.extendWith = assignInWith;
          mixin(lodash, lodash);
          lodash.add = add;
          lodash.attempt = attempt;
          lodash.camelCase = camelCase;
          lodash.capitalize = capitalize;
          lodash.ceil = ceil;
          lodash.clamp = clamp;
          lodash.clone = clone;
          lodash.cloneDeep = cloneDeep;
          lodash.cloneDeepWith = cloneDeepWith;
          lodash.cloneWith = cloneWith;
          lodash.conformsTo = conformsTo;
          lodash.deburr = deburr;
          lodash.defaultTo = defaultTo;
          lodash.divide = divide;
          lodash.endsWith = endsWith;
          lodash.eq = eq;
          lodash.escape = escape;
          lodash.escapeRegExp = escapeRegExp;
          lodash.every = every;
          lodash.find = find;
          lodash.findIndex = findIndex;
          lodash.findKey = findKey;
          lodash.findLast = findLast;
          lodash.findLastIndex = findLastIndex;
          lodash.findLastKey = findLastKey;
          lodash.floor = floor;
          lodash.forEach = forEach;
          lodash.forEachRight = forEachRight;
          lodash.forIn = forIn;
          lodash.forInRight = forInRight;
          lodash.forOwn = forOwn;
          lodash.forOwnRight = forOwnRight;
          lodash.get = get;
          lodash.gt = gt;
          lodash.gte = gte;
          lodash.has = has;
          lodash.hasIn = hasIn;
          lodash.head = head;
          lodash.identity = identity;
          lodash.includes = includes;
          lodash.indexOf = indexOf;
          lodash.inRange = inRange;
          lodash.invoke = invoke;
          lodash.isArguments = isArguments;
          lodash.isArray = isArray;
          lodash.isArrayBuffer = isArrayBuffer;
          lodash.isArrayLike = isArrayLike;
          lodash.isArrayLikeObject = isArrayLikeObject;
          lodash.isBoolean = isBoolean;
          lodash.isBuffer = isBuffer;
          lodash.isDate = isDate;
          lodash.isElement = isElement;
          lodash.isEmpty = isEmpty;
          lodash.isEqual = isEqual;
          lodash.isEqualWith = isEqualWith;
          lodash.isError = isError;
          lodash.isFinite = isFinite2;
          lodash.isFunction = isFunction;
          lodash.isInteger = isInteger;
          lodash.isLength = isLength;
          lodash.isMap = isMap;
          lodash.isMatch = isMatch;
          lodash.isMatchWith = isMatchWith;
          lodash.isNaN = isNaN2;
          lodash.isNative = isNative;
          lodash.isNil = isNil;
          lodash.isNull = isNull;
          lodash.isNumber = isNumber;
          lodash.isObject = isObject;
          lodash.isObjectLike = isObjectLike;
          lodash.isPlainObject = isPlainObject;
          lodash.isRegExp = isRegExp;
          lodash.isSafeInteger = isSafeInteger;
          lodash.isSet = isSet;
          lodash.isString = isString;
          lodash.isSymbol = isSymbol;
          lodash.isTypedArray = isTypedArray;
          lodash.isUndefined = isUndefined;
          lodash.isWeakMap = isWeakMap;
          lodash.isWeakSet = isWeakSet;
          lodash.join = join;
          lodash.kebabCase = kebabCase;
          lodash.last = last;
          lodash.lastIndexOf = lastIndexOf;
          lodash.lowerCase = lowerCase;
          lodash.lowerFirst = lowerFirst;
          lodash.lt = lt;
          lodash.lte = lte;
          lodash.max = max;
          lodash.maxBy = maxBy;
          lodash.mean = mean;
          lodash.meanBy = meanBy;
          lodash.min = min;
          lodash.minBy = minBy;
          lodash.stubArray = stubArray;
          lodash.stubFalse = stubFalse;
          lodash.stubObject = stubObject;
          lodash.stubString = stubString;
          lodash.stubTrue = stubTrue;
          lodash.multiply = multiply;
          lodash.nth = nth;
          lodash.noConflict = noConflict;
          lodash.noop = noop2;
          lodash.now = now;
          lodash.pad = pad;
          lodash.padEnd = padEnd;
          lodash.padStart = padStart;
          lodash.parseInt = parseInt2;
          lodash.random = random;
          lodash.reduce = reduce;
          lodash.reduceRight = reduceRight;
          lodash.repeat = repeat;
          lodash.replace = replace;
          lodash.result = result;
          lodash.round = round;
          lodash.runInContext = runInContext2;
          lodash.sample = sample;
          lodash.size = size;
          lodash.snakeCase = snakeCase;
          lodash.some = some;
          lodash.sortedIndex = sortedIndex;
          lodash.sortedIndexBy = sortedIndexBy;
          lodash.sortedIndexOf = sortedIndexOf;
          lodash.sortedLastIndex = sortedLastIndex;
          lodash.sortedLastIndexBy = sortedLastIndexBy;
          lodash.sortedLastIndexOf = sortedLastIndexOf;
          lodash.startCase = startCase;
          lodash.startsWith = startsWith;
          lodash.subtract = subtract;
          lodash.sum = sum;
          lodash.sumBy = sumBy;
          lodash.template = template;
          lodash.times = times;
          lodash.toFinite = toFinite;
          lodash.toInteger = toInteger;
          lodash.toLength = toLength;
          lodash.toLower = toLower;
          lodash.toNumber = toNumber;
          lodash.toSafeInteger = toSafeInteger;
          lodash.toString = toString;
          lodash.toUpper = toUpper;
          lodash.trim = trim;
          lodash.trimEnd = trimEnd;
          lodash.trimStart = trimStart;
          lodash.truncate = truncate;
          lodash.unescape = unescape;
          lodash.uniqueId = uniqueId;
          lodash.upperCase = upperCase;
          lodash.upperFirst = upperFirst;
          lodash.each = forEach;
          lodash.eachRight = forEachRight;
          lodash.first = head;
          mixin(lodash, function() {
            var source = {};
            baseForOwn(lodash, function(func, methodName) {
              if (!hasOwnProperty.call(lodash.prototype, methodName)) {
                source[methodName] = func;
              }
            });
            return source;
          }(), { "chain": false });
          lodash.VERSION = VERSION;
          arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
            lodash[methodName].placeholder = lodash;
          });
          arrayEach(["drop", "take"], function(methodName, index) {
            LazyWrapper.prototype[methodName] = function(n) {
              n = n === undefined2 ? 1 : nativeMax(toInteger(n), 0);
              var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
              if (result2.__filtered__) {
                result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
              } else {
                result2.__views__.push({
                  "size": nativeMin(n, MAX_ARRAY_LENGTH),
                  "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
                });
              }
              return result2;
            };
            LazyWrapper.prototype[methodName + "Right"] = function(n) {
              return this.reverse()[methodName](n).reverse();
            };
          });
          arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
            var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
            LazyWrapper.prototype[methodName] = function(iteratee2) {
              var result2 = this.clone();
              result2.__iteratees__.push({
                "iteratee": getIteratee(iteratee2, 3),
                "type": type
              });
              result2.__filtered__ = result2.__filtered__ || isFilter;
              return result2;
            };
          });
          arrayEach(["head", "last"], function(methodName, index) {
            var takeName = "take" + (index ? "Right" : "");
            LazyWrapper.prototype[methodName] = function() {
              return this[takeName](1).value()[0];
            };
          });
          arrayEach(["initial", "tail"], function(methodName, index) {
            var dropName = "drop" + (index ? "" : "Right");
            LazyWrapper.prototype[methodName] = function() {
              return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
            };
          });
          LazyWrapper.prototype.compact = function() {
            return this.filter(identity);
          };
          LazyWrapper.prototype.find = function(predicate) {
            return this.filter(predicate).head();
          };
          LazyWrapper.prototype.findLast = function(predicate) {
            return this.reverse().find(predicate);
          };
          LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
            if (typeof path == "function") {
              return new LazyWrapper(this);
            }
            return this.map(function(value) {
              return baseInvoke(value, path, args);
            });
          });
          LazyWrapper.prototype.reject = function(predicate) {
            return this.filter(negate(getIteratee(predicate)));
          };
          LazyWrapper.prototype.slice = function(start, end) {
            start = toInteger(start);
            var result2 = this;
            if (result2.__filtered__ && (start > 0 || end < 0)) {
              return new LazyWrapper(result2);
            }
            if (start < 0) {
              result2 = result2.takeRight(-start);
            } else if (start) {
              result2 = result2.drop(start);
            }
            if (end !== undefined2) {
              end = toInteger(end);
              result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
            }
            return result2;
          };
          LazyWrapper.prototype.takeRightWhile = function(predicate) {
            return this.reverse().takeWhile(predicate).reverse();
          };
          LazyWrapper.prototype.toArray = function() {
            return this.take(MAX_ARRAY_LENGTH);
          };
          baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
            if (!lodashFunc) {
              return;
            }
            lodash.prototype[methodName] = function() {
              var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
              var interceptor = function(value2) {
                var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
                return isTaker && chainAll ? result3[0] : result3;
              };
              if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
                isLazy = useLazy = false;
              }
              var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
              if (!retUnwrapped && useLazy) {
                value = onlyLazy ? value : new LazyWrapper(this);
                var result2 = func.apply(value, args);
                result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined2 });
                return new LodashWrapper(result2, chainAll);
              }
              if (isUnwrapped && onlyLazy) {
                return func.apply(this, args);
              }
              result2 = this.thru(interceptor);
              return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
            };
          });
          arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
            var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
            lodash.prototype[methodName] = function() {
              var args = arguments;
              if (retUnwrapped && !this.__chain__) {
                var value = this.value();
                return func.apply(isArray(value) ? value : [], args);
              }
              return this[chainName](function(value2) {
                return func.apply(isArray(value2) ? value2 : [], args);
              });
            };
          });
          baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var lodashFunc = lodash[methodName];
            if (lodashFunc) {
              var key = lodashFunc.name + "";
              if (!hasOwnProperty.call(realNames, key)) {
                realNames[key] = [];
              }
              realNames[key].push({ "name": methodName, "func": lodashFunc });
            }
          });
          realNames[createHybrid(undefined2, WRAP_BIND_KEY_FLAG).name] = [{
            "name": "wrapper",
            "func": undefined2
          }];
          LazyWrapper.prototype.clone = lazyClone;
          LazyWrapper.prototype.reverse = lazyReverse;
          LazyWrapper.prototype.value = lazyValue;
          lodash.prototype.at = wrapperAt;
          lodash.prototype.chain = wrapperChain;
          lodash.prototype.commit = wrapperCommit;
          lodash.prototype.next = wrapperNext;
          lodash.prototype.plant = wrapperPlant;
          lodash.prototype.reverse = wrapperReverse;
          lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
          lodash.prototype.first = lodash.prototype.head;
          if (symIterator) {
            lodash.prototype[symIterator] = wrapperToIterator;
          }
          return lodash;
        };
        var _2 = runInContext();
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
          root._ = _2;
          define(function() {
            return _2;
          });
        } else if (freeModule) {
          (freeModule.exports = _2)._ = _2;
          freeExports._ = _2;
        } else {
          root._ = _2;
        }
      }).call(exports);
    }
  });

  // node_modules/crc-32/crc32.js
  var require_crc32 = __commonJS({
    "node_modules/crc-32/crc32.js"(exports) {
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
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
            return init2(this, buffer, offset, value, raddix);
          }
          function isInt64(b) {
            return !!(b && b[_isInt64]);
          }
          function init2(that, buffer, offset, value, raddix) {
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
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
      init_esbuild_inject();
      var base64 = require_base64_js();
      var ieee7542 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer19;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer19.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer19.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
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
      Object.defineProperty(Buffer19.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer19.isBuffer(this))
            return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer19.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer19.isBuffer(this))
            return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        var buf2 = new Uint8Array(length);
        Object.setPrototypeOf(buf2, Buffer19.prototype);
        return buf2;
      }
      function Buffer19(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError('The "string" argument must be of type string. Received type number');
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer19.poolSize = 8192;
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
          return Buffer19.from(valueOf, encodingOrOffset, length);
        }
        var b = fromObject(value);
        if (b)
          return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer19.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
      }
      Buffer19.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer19.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer19, Uint8Array);
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
      Buffer19.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer19.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer19.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer19.isEncoding(encoding)) {
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
        Object.setPrototypeOf(buf2, Buffer19.prototype);
        return buf2;
      }
      function fromObject(obj) {
        if (Buffer19.isBuffer(obj)) {
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
        return Buffer19.alloc(+length);
      }
      Buffer19.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer19.prototype;
      };
      Buffer19.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array))
          a = Buffer19.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array))
          b = Buffer19.from(b, b.offset, b.byteLength);
        if (!Buffer19.isBuffer(a) || !Buffer19.isBuffer(b)) {
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
      Buffer19.isEncoding = function isEncoding(encoding) {
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
      Buffer19.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer19.alloc(0);
        }
        var i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        var buffer = Buffer19.allocUnsafe(length);
        var pos = 0;
        for (i = 0; i < list.length; ++i) {
          var buf2 = list[i];
          if (isInstance(buf2, Uint8Array)) {
            if (pos + buf2.length > buffer.length) {
              Buffer19.from(buf2).copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(buffer, buf2, pos);
            }
          } else if (!Buffer19.isBuffer(buf2)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf2.copy(buffer, pos);
          }
          pos += buf2.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer19.isBuffer(string)) {
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
      Buffer19.byteLength = byteLength;
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
      Buffer19.prototype._isBuffer = true;
      function swap(b, n, m) {
        var i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer19.prototype.swap16 = function swap16() {
        var len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (var i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer19.prototype.swap32 = function swap32() {
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
      Buffer19.prototype.swap64 = function swap64() {
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
      Buffer19.prototype.toString = function toString() {
        var length = this.length;
        if (length === 0)
          return "";
        if (arguments.length === 0)
          return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer19.prototype.toLocaleString = Buffer19.prototype.toString;
      Buffer19.prototype.equals = function equals(b) {
        if (!Buffer19.isBuffer(b))
          throw new TypeError("Argument must be a Buffer");
        if (this === b)
          return true;
        return Buffer19.compare(this, b) === 0;
      };
      Buffer19.prototype.inspect = function inspect() {
        var str = "";
        var max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max)
          str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer19.prototype[customInspectSymbol] = Buffer19.prototype.inspect;
      }
      Buffer19.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer19.from(target, target.offset, target.byteLength);
        }
        if (!Buffer19.isBuffer(target)) {
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
          val = Buffer19.from(val, encoding);
        }
        if (Buffer19.isBuffer(val)) {
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
      Buffer19.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer19.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer19.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
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
      Buffer19.prototype.write = function write2(string, offset, length, encoding) {
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
      Buffer19.prototype.toJSON = function toJSON() {
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
      Buffer19.prototype.slice = function slice(start, end) {
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
        Object.setPrototypeOf(newBuf, Buffer19.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0)
          throw new RangeError("offset is not uint");
        if (offset + ext > length)
          throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer19.prototype.readUintLE = Buffer19.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
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
      Buffer19.prototype.readUintBE = Buffer19.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
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
      Buffer19.prototype.readUint8 = Buffer19.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer19.prototype.readUint16LE = Buffer19.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer19.prototype.readUint16BE = Buffer19.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer19.prototype.readUint32LE = Buffer19.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer19.prototype.readUint32BE = Buffer19.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer19.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
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
      Buffer19.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
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
      Buffer19.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128))
          return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer19.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer19.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer19.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer19.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer19.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee7542.read(this, offset, true, 23, 4);
      };
      Buffer19.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee7542.read(this, offset, false, 23, 4);
      };
      Buffer19.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee7542.read(this, offset, true, 52, 8);
      };
      Buffer19.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee7542.read(this, offset, false, 52, 8);
      };
      function checkInt(buf2, value, offset, ext, max, min) {
        if (!Buffer19.isBuffer(buf2))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min)
          throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf2.length)
          throw new RangeError("Index out of range");
      }
      Buffer19.prototype.writeUintLE = Buffer19.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
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
      Buffer19.prototype.writeUintBE = Buffer19.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
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
      Buffer19.prototype.writeUint8 = Buffer19.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer19.prototype.writeUint16LE = Buffer19.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer19.prototype.writeUint16BE = Buffer19.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer19.prototype.writeUint32LE = Buffer19.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
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
      Buffer19.prototype.writeUint32BE = Buffer19.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
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
      Buffer19.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
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
      Buffer19.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
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
      Buffer19.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 127, -128);
        if (value < 0)
          value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer19.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer19.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer19.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
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
      Buffer19.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
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
      Buffer19.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer19.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
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
      Buffer19.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer19.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer19.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer19.isBuffer(target))
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
      Buffer19.prototype.fill = function fill(val, start, end, encoding) {
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
          if (typeof encoding === "string" && !Buffer19.isEncoding(encoding)) {
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
          var bytes = Buffer19.isBuffer(val) ? val : Buffer19.from(val, encoding);
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
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
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
          var element2 = metadata[i];
          if (element2.name === idName) {
            if (element2.type === "m") {
              if (!element2.isEnd) {
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
          var element2 = metadata[i];
          if (element2.name === idName) {
            if (element2.type === "m") {
              if (!element2.isEnd) {
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
      function insertTag(_metadata, tagName, children2, insertHead) {
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
          Array.prototype.splice.apply(_metadata, [idx + 1, 0].concat(children2));
        } else if (insertHead) {
          [].concat([{ name: tagName, type: "m", isEnd: false }], children2, [{ name: tagName, type: "m", isEnd: true }]).reverse().forEach(function(elm2) {
            _metadata.unshift(elm2);
          });
        } else {
          _metadata.push({ name: tagName, type: "m", isEnd: false });
          children2.forEach(function(elm2) {
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

  // node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/events/events.js"(exports, module) {
      "use strict";
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
      init_esbuild_inject();
      module.exports = require_events().EventEmitter;
    }
  });

  // (disabled):util
  var require_util = __commonJS({
    "(disabled):util"() {
      init_define_BUILD_VERSION();
      init_esbuild_inject();
    }
  });

  // node_modules/readable-stream/lib/internal/streams/buffer_list.js
  var require_buffer_list = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports, module) {
      "use strict";
      init_define_BUILD_VERSION();
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
      function _classCallCheck(instance17, Constructor) {
        if (!(instance17 instanceof Constructor)) {
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
      var Buffer19 = _require.Buffer;
      var _require2 = require_util();
      var inspect = _require2.inspect;
      var custom = inspect && inspect.custom || "inspect";
      function copyBuffer(src, target, offset) {
        Buffer19.prototype.copy.call(src, target, offset);
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
              return Buffer19.alloc(0);
            var ret = Buffer19.allocUnsafe(n >>> 0);
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
            var ret = Buffer19.allocUnsafe(n);
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
          value: function value(_2, options) {
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
      init_define_BUILD_VERSION();
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
      function emitErrorAndCloseNT(self2, err) {
        emitErrorNT(self2, err);
        emitCloseNT(self2);
      }
      function emitCloseNT(self2) {
        if (self2._writableState && !self2._writableState.emitClose)
          return;
        if (self2._readableState && !self2._readableState.emitClose)
          return;
        self2.emit("close");
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
      function emitErrorNT(self2, err) {
        self2.emit("error", err);
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
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
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
        } catch (_2) {
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
      init_define_BUILD_VERSION();
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
      var Buffer19 = require_buffer().Buffer;
      var OurUint8Array = window.Uint8Array || function() {
      };
      function _uint8ArrayToBuffer(chunk) {
        return Buffer19.from(chunk);
      }
      function _isUint8Array(obj) {
        return Buffer19.isBuffer(obj) || obj instanceof OurUint8Array;
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
        } catch (_2) {
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
        if (isBuf && !Buffer19.isBuffer(chunk)) {
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
          chunk = Buffer19.from(chunk, encoding);
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
      init_define_BUILD_VERSION();
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
      function onEndNT(self2) {
        self2.end();
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
      init_define_BUILD_VERSION();
      init_esbuild_inject();
      var buffer = require_buffer();
      var Buffer19 = buffer.Buffer;
      function copyProps(src, dst) {
        for (var key in src) {
          dst[key] = src[key];
        }
      }
      if (Buffer19.from && Buffer19.alloc && Buffer19.allocUnsafe && Buffer19.allocUnsafeSlow) {
        module.exports = buffer;
      } else {
        copyProps(buffer, exports);
        exports.Buffer = SafeBuffer;
      }
      function SafeBuffer(arg, encodingOrOffset, length) {
        return Buffer19(arg, encodingOrOffset, length);
      }
      SafeBuffer.prototype = Object.create(Buffer19.prototype);
      copyProps(Buffer19, SafeBuffer);
      SafeBuffer.from = function(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          throw new TypeError("Argument must not be a number");
        }
        return Buffer19(arg, encodingOrOffset, length);
      };
      SafeBuffer.alloc = function(size, fill, encoding) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        var buf2 = Buffer19(size);
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
        return Buffer19(size);
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
      init_define_BUILD_VERSION();
      init_esbuild_inject();
      var Buffer19 = require_safe_buffer().Buffer;
      var isEncoding = Buffer19.isEncoding || function(encoding) {
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
        if (typeof nenc !== "string" && (Buffer19.isEncoding === isEncoding || !isEncoding(enc)))
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
        this.lastChar = Buffer19.allocUnsafe(nb);
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
      function utf8CheckIncomplete(self2, buf2, i) {
        var j = buf2.length - 1;
        if (j < i)
          return 0;
        var nb = utf8CheckByte(buf2[j]);
        if (nb >= 0) {
          if (nb > 0)
            self2.lastNeed = nb - 1;
          return nb;
        }
        if (--j < i || nb === -2)
          return 0;
        nb = utf8CheckByte(buf2[j]);
        if (nb >= 0) {
          if (nb > 0)
            self2.lastNeed = nb - 2;
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
              self2.lastNeed = nb - 3;
          }
          return nb;
        }
        return 0;
      }
      function utf8CheckExtraBytes(self2, buf2, p) {
        if ((buf2[0] & 192) !== 128) {
          self2.lastNeed = 0;
          return "\uFFFD";
        }
        if (self2.lastNeed > 1 && buf2.length > 1) {
          if ((buf2[1] & 192) !== 128) {
            self2.lastNeed = 1;
            return "\uFFFD";
          }
          if (self2.lastNeed > 2 && buf2.length > 2) {
            if ((buf2[2] & 192) !== 128) {
              self2.lastNeed = 2;
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
      init_define_BUILD_VERSION();
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
      function noop2() {
      }
      function isRequest(stream) {
        return stream.setHeader && typeof stream.abort === "function";
      }
      function eos(stream, opts, callback) {
        if (typeof opts === "function")
          return eos(stream, null, opts);
        if (!opts)
          opts = {};
        callback = once(callback || noop2);
        var readable = opts.readable || opts.readable !== false && stream.readable;
        var writable2 = opts.writable || opts.writable !== false && stream.writable;
        var onlegacyfinish = function onlegacyfinish2() {
          if (!stream.writable)
            onfinish();
        };
        var writableEnded = stream._writableState && stream._writableState.finished;
        var onfinish = function onfinish2() {
          writable2 = false;
          writableEnded = true;
          if (!readable)
            callback.call(stream);
        };
        var readableEnded = stream._readableState && stream._readableState.endEmitted;
        var onend = function onend2() {
          readable = false;
          readableEnded = true;
          if (!writable2)
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
          if (writable2 && !writableEnded) {
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
        } else if (writable2 && !stream._writableState) {
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
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
      init_esbuild_inject();
      module.exports = Readable;
      var Duplex;
      Readable.ReadableState = ReadableState;
      var EE = require_events().EventEmitter;
      var EElistenerCount = function EElistenerCount2(emitter, type) {
        return emitter.listeners(type).length;
      };
      var Stream = require_stream_browser();
      var Buffer19 = require_buffer().Buffer;
      var OurUint8Array = window.Uint8Array || function() {
      };
      function _uint8ArrayToBuffer(chunk) {
        return Buffer19.from(chunk);
      }
      function _isUint8Array(obj) {
        return Buffer19.isBuffer(obj) || obj instanceof OurUint8Array;
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
              chunk = Buffer19.from(chunk, encoding);
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
            if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer19.prototype) {
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
      function updateReadableListening(self2) {
        var state = self2._readableState;
        state.readableListening = self2.listenerCount("readable") > 0;
        if (state.resumeScheduled && !state.paused) {
          state.flowing = true;
        } else if (self2.listenerCount("data") > 0) {
          self2.resume();
        }
      }
      function nReadingNextTick(self2) {
        debug("readable nexttick read 0");
        self2.read(0);
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
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
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
      function noop2(err) {
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
          return noop2;
        if (typeof streams[streams.length - 1] !== "function")
          return noop2;
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
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
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

  // node_modules/ts-ebml/lib/EBMLDecoder.js
  var require_EBMLDecoder = __commonJS({
    "node_modules/ts-ebml/lib/EBMLDecoder.js"(exports) {
      "use strict";
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
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
      init_define_BUILD_VERSION();
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

  // node_modules/jpeg-js/lib/encoder.js
  var require_encoder = __commonJS({
    "node_modules/jpeg-js/lib/encoder.js"(exports, module) {
      init_define_BUILD_VERSION();
      init_esbuild_inject();
      var btoa = btoa || function(buf2) {
        return Buffer2.from(buf2).toString("base64");
      };
      function JPEGEncoder(quality) {
        var self2 = this;
        var fround = Math.round;
        var ffloor = Math.floor;
        var YTable = new Array(64);
        var UVTable = new Array(64);
        var fdtbl_Y = new Array(64);
        var fdtbl_UV = new Array(64);
        var YDC_HT;
        var UVDC_HT;
        var YAC_HT;
        var UVAC_HT;
        var bitcode = new Array(65535);
        var category = new Array(65535);
        var outputfDCTQuant = new Array(64);
        var DU = new Array(64);
        var byteout = [];
        var bytenew = 0;
        var bytepos = 7;
        var YDU = new Array(64);
        var UDU = new Array(64);
        var VDU = new Array(64);
        var clt = new Array(256);
        var RGB_YUV_TABLE = new Array(2048);
        var currentQuality;
        var ZigZag = [
          0,
          1,
          5,
          6,
          14,
          15,
          27,
          28,
          2,
          4,
          7,
          13,
          16,
          26,
          29,
          42,
          3,
          8,
          12,
          17,
          25,
          30,
          41,
          43,
          9,
          11,
          18,
          24,
          31,
          40,
          44,
          53,
          10,
          19,
          23,
          32,
          39,
          45,
          52,
          54,
          20,
          22,
          33,
          38,
          46,
          51,
          55,
          60,
          21,
          34,
          37,
          47,
          50,
          56,
          59,
          61,
          35,
          36,
          48,
          49,
          57,
          58,
          62,
          63
        ];
        var std_dc_luminance_nrcodes = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
        var std_dc_luminance_values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        var std_ac_luminance_nrcodes = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125];
        var std_ac_luminance_values = [
          1,
          2,
          3,
          0,
          4,
          17,
          5,
          18,
          33,
          49,
          65,
          6,
          19,
          81,
          97,
          7,
          34,
          113,
          20,
          50,
          129,
          145,
          161,
          8,
          35,
          66,
          177,
          193,
          21,
          82,
          209,
          240,
          36,
          51,
          98,
          114,
          130,
          9,
          10,
          22,
          23,
          24,
          25,
          26,
          37,
          38,
          39,
          40,
          41,
          42,
          52,
          53,
          54,
          55,
          56,
          57,
          58,
          67,
          68,
          69,
          70,
          71,
          72,
          73,
          74,
          83,
          84,
          85,
          86,
          87,
          88,
          89,
          90,
          99,
          100,
          101,
          102,
          103,
          104,
          105,
          106,
          115,
          116,
          117,
          118,
          119,
          120,
          121,
          122,
          131,
          132,
          133,
          134,
          135,
          136,
          137,
          138,
          146,
          147,
          148,
          149,
          150,
          151,
          152,
          153,
          154,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          178,
          179,
          180,
          181,
          182,
          183,
          184,
          185,
          186,
          194,
          195,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          210,
          211,
          212,
          213,
          214,
          215,
          216,
          217,
          218,
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
          241,
          242,
          243,
          244,
          245,
          246,
          247,
          248,
          249,
          250
        ];
        var std_dc_chrominance_nrcodes = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
        var std_dc_chrominance_values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        var std_ac_chrominance_nrcodes = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119];
        var std_ac_chrominance_values = [
          0,
          1,
          2,
          3,
          17,
          4,
          5,
          33,
          49,
          6,
          18,
          65,
          81,
          7,
          97,
          113,
          19,
          34,
          50,
          129,
          8,
          20,
          66,
          145,
          161,
          177,
          193,
          9,
          35,
          51,
          82,
          240,
          21,
          98,
          114,
          209,
          10,
          22,
          36,
          52,
          225,
          37,
          241,
          23,
          24,
          25,
          26,
          38,
          39,
          40,
          41,
          42,
          53,
          54,
          55,
          56,
          57,
          58,
          67,
          68,
          69,
          70,
          71,
          72,
          73,
          74,
          83,
          84,
          85,
          86,
          87,
          88,
          89,
          90,
          99,
          100,
          101,
          102,
          103,
          104,
          105,
          106,
          115,
          116,
          117,
          118,
          119,
          120,
          121,
          122,
          130,
          131,
          132,
          133,
          134,
          135,
          136,
          137,
          138,
          146,
          147,
          148,
          149,
          150,
          151,
          152,
          153,
          154,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          178,
          179,
          180,
          181,
          182,
          183,
          184,
          185,
          186,
          194,
          195,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          210,
          211,
          212,
          213,
          214,
          215,
          216,
          217,
          218,
          226,
          227,
          228,
          229,
          230,
          231,
          232,
          233,
          234,
          242,
          243,
          244,
          245,
          246,
          247,
          248,
          249,
          250
        ];
        function initQuantTables(sf) {
          var YQT = [
            16,
            11,
            10,
            16,
            24,
            40,
            51,
            61,
            12,
            12,
            14,
            19,
            26,
            58,
            60,
            55,
            14,
            13,
            16,
            24,
            40,
            57,
            69,
            56,
            14,
            17,
            22,
            29,
            51,
            87,
            80,
            62,
            18,
            22,
            37,
            56,
            68,
            109,
            103,
            77,
            24,
            35,
            55,
            64,
            81,
            104,
            113,
            92,
            49,
            64,
            78,
            87,
            103,
            121,
            120,
            101,
            72,
            92,
            95,
            98,
            112,
            100,
            103,
            99
          ];
          for (var i = 0; i < 64; i++) {
            var t = ffloor((YQT[i] * sf + 50) / 100);
            if (t < 1) {
              t = 1;
            } else if (t > 255) {
              t = 255;
            }
            YTable[ZigZag[i]] = t;
          }
          var UVQT = [
            17,
            18,
            24,
            47,
            99,
            99,
            99,
            99,
            18,
            21,
            26,
            66,
            99,
            99,
            99,
            99,
            24,
            26,
            56,
            99,
            99,
            99,
            99,
            99,
            47,
            66,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99
          ];
          for (var j = 0; j < 64; j++) {
            var u = ffloor((UVQT[j] * sf + 50) / 100);
            if (u < 1) {
              u = 1;
            } else if (u > 255) {
              u = 255;
            }
            UVTable[ZigZag[j]] = u;
          }
          var aasf = [
            1,
            1.387039845,
            1.306562965,
            1.175875602,
            1,
            0.785694958,
            0.5411961,
            0.275899379
          ];
          var k = 0;
          for (var row = 0; row < 8; row++) {
            for (var col = 0; col < 8; col++) {
              fdtbl_Y[k] = 1 / (YTable[ZigZag[k]] * aasf[row] * aasf[col] * 8);
              fdtbl_UV[k] = 1 / (UVTable[ZigZag[k]] * aasf[row] * aasf[col] * 8);
              k++;
            }
          }
        }
        function computeHuffmanTbl(nrcodes, std_table) {
          var codevalue = 0;
          var pos_in_table = 0;
          var HT = new Array();
          for (var k = 1; k <= 16; k++) {
            for (var j = 1; j <= nrcodes[k]; j++) {
              HT[std_table[pos_in_table]] = [];
              HT[std_table[pos_in_table]][0] = codevalue;
              HT[std_table[pos_in_table]][1] = k;
              pos_in_table++;
              codevalue++;
            }
            codevalue *= 2;
          }
          return HT;
        }
        function initHuffmanTbl() {
          YDC_HT = computeHuffmanTbl(std_dc_luminance_nrcodes, std_dc_luminance_values);
          UVDC_HT = computeHuffmanTbl(std_dc_chrominance_nrcodes, std_dc_chrominance_values);
          YAC_HT = computeHuffmanTbl(std_ac_luminance_nrcodes, std_ac_luminance_values);
          UVAC_HT = computeHuffmanTbl(std_ac_chrominance_nrcodes, std_ac_chrominance_values);
        }
        function initCategoryNumber() {
          var nrlower = 1;
          var nrupper = 2;
          for (var cat = 1; cat <= 15; cat++) {
            for (var nr = nrlower; nr < nrupper; nr++) {
              category[32767 + nr] = cat;
              bitcode[32767 + nr] = [];
              bitcode[32767 + nr][1] = cat;
              bitcode[32767 + nr][0] = nr;
            }
            for (var nrneg = -(nrupper - 1); nrneg <= -nrlower; nrneg++) {
              category[32767 + nrneg] = cat;
              bitcode[32767 + nrneg] = [];
              bitcode[32767 + nrneg][1] = cat;
              bitcode[32767 + nrneg][0] = nrupper - 1 + nrneg;
            }
            nrlower <<= 1;
            nrupper <<= 1;
          }
        }
        function initRGBYUVTable() {
          for (var i = 0; i < 256; i++) {
            RGB_YUV_TABLE[i] = 19595 * i;
            RGB_YUV_TABLE[i + 256 >> 0] = 38470 * i;
            RGB_YUV_TABLE[i + 512 >> 0] = 7471 * i + 32768;
            RGB_YUV_TABLE[i + 768 >> 0] = -11059 * i;
            RGB_YUV_TABLE[i + 1024 >> 0] = -21709 * i;
            RGB_YUV_TABLE[i + 1280 >> 0] = 32768 * i + 8421375;
            RGB_YUV_TABLE[i + 1536 >> 0] = -27439 * i;
            RGB_YUV_TABLE[i + 1792 >> 0] = -5329 * i;
          }
        }
        function writeBits(bs) {
          var value = bs[0];
          var posval = bs[1] - 1;
          while (posval >= 0) {
            if (value & 1 << posval) {
              bytenew |= 1 << bytepos;
            }
            posval--;
            bytepos--;
            if (bytepos < 0) {
              if (bytenew == 255) {
                writeByte(255);
                writeByte(0);
              } else {
                writeByte(bytenew);
              }
              bytepos = 7;
              bytenew = 0;
            }
          }
        }
        function writeByte(value) {
          byteout.push(value);
        }
        function writeWord(value) {
          writeByte(value >> 8 & 255);
          writeByte(value & 255);
        }
        function fDCTQuant(data, fdtbl) {
          var d0, d1, d2, d3, d4, d5, d6, d7;
          var dataOff = 0;
          var i;
          var I8 = 8;
          var I64 = 64;
          for (i = 0; i < I8; ++i) {
            d0 = data[dataOff];
            d1 = data[dataOff + 1];
            d2 = data[dataOff + 2];
            d3 = data[dataOff + 3];
            d4 = data[dataOff + 4];
            d5 = data[dataOff + 5];
            d6 = data[dataOff + 6];
            d7 = data[dataOff + 7];
            var tmp0 = d0 + d7;
            var tmp7 = d0 - d7;
            var tmp1 = d1 + d6;
            var tmp6 = d1 - d6;
            var tmp2 = d2 + d5;
            var tmp5 = d2 - d5;
            var tmp3 = d3 + d4;
            var tmp4 = d3 - d4;
            var tmp10 = tmp0 + tmp3;
            var tmp13 = tmp0 - tmp3;
            var tmp11 = tmp1 + tmp2;
            var tmp12 = tmp1 - tmp2;
            data[dataOff] = tmp10 + tmp11;
            data[dataOff + 4] = tmp10 - tmp11;
            var z1 = (tmp12 + tmp13) * 0.707106781;
            data[dataOff + 2] = tmp13 + z1;
            data[dataOff + 6] = tmp13 - z1;
            tmp10 = tmp4 + tmp5;
            tmp11 = tmp5 + tmp6;
            tmp12 = tmp6 + tmp7;
            var z5 = (tmp10 - tmp12) * 0.382683433;
            var z2 = 0.5411961 * tmp10 + z5;
            var z4 = 1.306562965 * tmp12 + z5;
            var z3 = tmp11 * 0.707106781;
            var z11 = tmp7 + z3;
            var z13 = tmp7 - z3;
            data[dataOff + 5] = z13 + z2;
            data[dataOff + 3] = z13 - z2;
            data[dataOff + 1] = z11 + z4;
            data[dataOff + 7] = z11 - z4;
            dataOff += 8;
          }
          dataOff = 0;
          for (i = 0; i < I8; ++i) {
            d0 = data[dataOff];
            d1 = data[dataOff + 8];
            d2 = data[dataOff + 16];
            d3 = data[dataOff + 24];
            d4 = data[dataOff + 32];
            d5 = data[dataOff + 40];
            d6 = data[dataOff + 48];
            d7 = data[dataOff + 56];
            var tmp0p2 = d0 + d7;
            var tmp7p2 = d0 - d7;
            var tmp1p2 = d1 + d6;
            var tmp6p2 = d1 - d6;
            var tmp2p2 = d2 + d5;
            var tmp5p2 = d2 - d5;
            var tmp3p2 = d3 + d4;
            var tmp4p2 = d3 - d4;
            var tmp10p2 = tmp0p2 + tmp3p2;
            var tmp13p2 = tmp0p2 - tmp3p2;
            var tmp11p2 = tmp1p2 + tmp2p2;
            var tmp12p2 = tmp1p2 - tmp2p2;
            data[dataOff] = tmp10p2 + tmp11p2;
            data[dataOff + 32] = tmp10p2 - tmp11p2;
            var z1p2 = (tmp12p2 + tmp13p2) * 0.707106781;
            data[dataOff + 16] = tmp13p2 + z1p2;
            data[dataOff + 48] = tmp13p2 - z1p2;
            tmp10p2 = tmp4p2 + tmp5p2;
            tmp11p2 = tmp5p2 + tmp6p2;
            tmp12p2 = tmp6p2 + tmp7p2;
            var z5p2 = (tmp10p2 - tmp12p2) * 0.382683433;
            var z2p2 = 0.5411961 * tmp10p2 + z5p2;
            var z4p2 = 1.306562965 * tmp12p2 + z5p2;
            var z3p2 = tmp11p2 * 0.707106781;
            var z11p2 = tmp7p2 + z3p2;
            var z13p2 = tmp7p2 - z3p2;
            data[dataOff + 40] = z13p2 + z2p2;
            data[dataOff + 24] = z13p2 - z2p2;
            data[dataOff + 8] = z11p2 + z4p2;
            data[dataOff + 56] = z11p2 - z4p2;
            dataOff++;
          }
          var fDCTQuant2;
          for (i = 0; i < I64; ++i) {
            fDCTQuant2 = data[i] * fdtbl[i];
            outputfDCTQuant[i] = fDCTQuant2 > 0 ? fDCTQuant2 + 0.5 | 0 : fDCTQuant2 - 0.5 | 0;
          }
          return outputfDCTQuant;
        }
        function writeAPP0() {
          writeWord(65504);
          writeWord(16);
          writeByte(74);
          writeByte(70);
          writeByte(73);
          writeByte(70);
          writeByte(0);
          writeByte(1);
          writeByte(1);
          writeByte(0);
          writeWord(1);
          writeWord(1);
          writeByte(0);
          writeByte(0);
        }
        function writeAPP1(exifBuffer) {
          if (!exifBuffer)
            return;
          writeWord(65505);
          if (exifBuffer[0] === 69 && exifBuffer[1] === 120 && exifBuffer[2] === 105 && exifBuffer[3] === 102) {
            writeWord(exifBuffer.length + 2);
          } else {
            writeWord(exifBuffer.length + 5 + 2);
            writeByte(69);
            writeByte(120);
            writeByte(105);
            writeByte(102);
            writeByte(0);
          }
          for (var i = 0; i < exifBuffer.length; i++) {
            writeByte(exifBuffer[i]);
          }
        }
        function writeSOF0(width, height) {
          writeWord(65472);
          writeWord(17);
          writeByte(8);
          writeWord(height);
          writeWord(width);
          writeByte(3);
          writeByte(1);
          writeByte(17);
          writeByte(0);
          writeByte(2);
          writeByte(17);
          writeByte(1);
          writeByte(3);
          writeByte(17);
          writeByte(1);
        }
        function writeDQT() {
          writeWord(65499);
          writeWord(132);
          writeByte(0);
          for (var i = 0; i < 64; i++) {
            writeByte(YTable[i]);
          }
          writeByte(1);
          for (var j = 0; j < 64; j++) {
            writeByte(UVTable[j]);
          }
        }
        function writeDHT() {
          writeWord(65476);
          writeWord(418);
          writeByte(0);
          for (var i = 0; i < 16; i++) {
            writeByte(std_dc_luminance_nrcodes[i + 1]);
          }
          for (var j = 0; j <= 11; j++) {
            writeByte(std_dc_luminance_values[j]);
          }
          writeByte(16);
          for (var k = 0; k < 16; k++) {
            writeByte(std_ac_luminance_nrcodes[k + 1]);
          }
          for (var l = 0; l <= 161; l++) {
            writeByte(std_ac_luminance_values[l]);
          }
          writeByte(1);
          for (var m = 0; m < 16; m++) {
            writeByte(std_dc_chrominance_nrcodes[m + 1]);
          }
          for (var n = 0; n <= 11; n++) {
            writeByte(std_dc_chrominance_values[n]);
          }
          writeByte(17);
          for (var o = 0; o < 16; o++) {
            writeByte(std_ac_chrominance_nrcodes[o + 1]);
          }
          for (var p = 0; p <= 161; p++) {
            writeByte(std_ac_chrominance_values[p]);
          }
        }
        function writeSOS() {
          writeWord(65498);
          writeWord(12);
          writeByte(3);
          writeByte(1);
          writeByte(0);
          writeByte(2);
          writeByte(17);
          writeByte(3);
          writeByte(17);
          writeByte(0);
          writeByte(63);
          writeByte(0);
        }
        function processDU(CDU, fdtbl, DC, HTDC, HTAC) {
          var EOB = HTAC[0];
          var M16zeroes = HTAC[240];
          var pos;
          var I16 = 16;
          var I63 = 63;
          var I64 = 64;
          var DU_DCT = fDCTQuant(CDU, fdtbl);
          for (var j = 0; j < I64; ++j) {
            DU[ZigZag[j]] = DU_DCT[j];
          }
          var Diff = DU[0] - DC;
          DC = DU[0];
          if (Diff == 0) {
            writeBits(HTDC[0]);
          } else {
            pos = 32767 + Diff;
            writeBits(HTDC[category[pos]]);
            writeBits(bitcode[pos]);
          }
          var end0pos = 63;
          for (; end0pos > 0 && DU[end0pos] == 0; end0pos--) {
          }
          ;
          if (end0pos == 0) {
            writeBits(EOB);
            return DC;
          }
          var i = 1;
          var lng;
          while (i <= end0pos) {
            var startpos = i;
            for (; DU[i] == 0 && i <= end0pos; ++i) {
            }
            var nrzeroes = i - startpos;
            if (nrzeroes >= I16) {
              lng = nrzeroes >> 4;
              for (var nrmarker = 1; nrmarker <= lng; ++nrmarker)
                writeBits(M16zeroes);
              nrzeroes = nrzeroes & 15;
            }
            pos = 32767 + DU[i];
            writeBits(HTAC[(nrzeroes << 4) + category[pos]]);
            writeBits(bitcode[pos]);
            i++;
          }
          if (end0pos != I63) {
            writeBits(EOB);
          }
          return DC;
        }
        function initCharLookupTable() {
          var sfcc = String.fromCharCode;
          for (var i = 0; i < 256; i++) {
            clt[i] = sfcc(i);
          }
        }
        this.encode = function(image, quality2) {
          var time_start = new Date().getTime();
          if (quality2)
            setQuality(quality2);
          byteout = new Array();
          bytenew = 0;
          bytepos = 7;
          writeWord(65496);
          writeAPP0();
          writeAPP1(image.exifBuffer);
          writeDQT();
          writeSOF0(image.width, image.height);
          writeDHT();
          writeSOS();
          var DCY = 0;
          var DCU = 0;
          var DCV = 0;
          bytenew = 0;
          bytepos = 7;
          this.encode.displayName = "_encode_";
          var imageData = image.data;
          var width = image.width;
          var height = image.height;
          var quadWidth = width * 4;
          var tripleWidth = width * 3;
          var x, y = 0;
          var r, g, b;
          var start, p, col, row, pos;
          while (y < height) {
            x = 0;
            while (x < quadWidth) {
              start = quadWidth * y + x;
              p = start;
              col = -1;
              row = 0;
              for (pos = 0; pos < 64; pos++) {
                row = pos >> 3;
                col = (pos & 7) * 4;
                p = start + row * quadWidth + col;
                if (y + row >= height) {
                  p -= quadWidth * (y + 1 + row - height);
                }
                if (x + col >= quadWidth) {
                  p -= x + col - quadWidth + 4;
                }
                r = imageData[p++];
                g = imageData[p++];
                b = imageData[p++];
                YDU[pos] = (RGB_YUV_TABLE[r] + RGB_YUV_TABLE[g + 256 >> 0] + RGB_YUV_TABLE[b + 512 >> 0] >> 16) - 128;
                UDU[pos] = (RGB_YUV_TABLE[r + 768 >> 0] + RGB_YUV_TABLE[g + 1024 >> 0] + RGB_YUV_TABLE[b + 1280 >> 0] >> 16) - 128;
                VDU[pos] = (RGB_YUV_TABLE[r + 1280 >> 0] + RGB_YUV_TABLE[g + 1536 >> 0] + RGB_YUV_TABLE[b + 1792 >> 0] >> 16) - 128;
              }
              DCY = processDU(YDU, fdtbl_Y, DCY, YDC_HT, YAC_HT);
              DCU = processDU(UDU, fdtbl_UV, DCU, UVDC_HT, UVAC_HT);
              DCV = processDU(VDU, fdtbl_UV, DCV, UVDC_HT, UVAC_HT);
              x += 32;
            }
            y += 8;
          }
          if (bytepos >= 0) {
            var fillbits = [];
            fillbits[1] = bytepos + 1;
            fillbits[0] = (1 << bytepos + 1) - 1;
            writeBits(fillbits);
          }
          writeWord(65497);
          if (typeof module === "undefined")
            return new Uint8Array(byteout);
          return Buffer2.from(byteout);
          var jpegDataUri = "data:image/jpeg;base64," + btoa(byteout.join(""));
          byteout = [];
          var duration = new Date().getTime() - time_start;
          return jpegDataUri;
        };
        function setQuality(quality2) {
          if (quality2 <= 0) {
            quality2 = 1;
          }
          if (quality2 > 100) {
            quality2 = 100;
          }
          if (currentQuality == quality2)
            return;
          var sf = 0;
          if (quality2 < 50) {
            sf = Math.floor(5e3 / quality2);
          } else {
            sf = Math.floor(200 - quality2 * 2);
          }
          initQuantTables(sf);
          currentQuality = quality2;
        }
        function init2() {
          var time_start = new Date().getTime();
          if (!quality)
            quality = 50;
          initCharLookupTable();
          initHuffmanTbl();
          initCategoryNumber();
          initRGBYUVTable();
          setQuality(quality);
          var duration = new Date().getTime() - time_start;
        }
        init2();
      }
      if (typeof module !== "undefined") {
        module.exports = encode;
      } else if (typeof window !== "undefined") {
        window["jpeg-js"] = window["jpeg-js"] || {};
        window["jpeg-js"].encode = encode;
      }
      function encode(imgData, qu) {
        if (typeof qu === "undefined")
          qu = 50;
        var encoder = new JPEGEncoder(qu);
        var data = encoder.encode(imgData, qu);
        return {
          data,
          width: imgData.width,
          height: imgData.height
        };
      }
    }
  });

  // node_modules/jpeg-js/lib/decoder.js
  var require_decoder = __commonJS({
    "node_modules/jpeg-js/lib/decoder.js"(exports, module) {
      init_define_BUILD_VERSION();
      init_esbuild_inject();
      var JpegImage = function jpegImage() {
        "use strict";
        var dctZigZag = new Int32Array([
          0,
          1,
          8,
          16,
          9,
          2,
          3,
          10,
          17,
          24,
          32,
          25,
          18,
          11,
          4,
          5,
          12,
          19,
          26,
          33,
          40,
          48,
          41,
          34,
          27,
          20,
          13,
          6,
          7,
          14,
          21,
          28,
          35,
          42,
          49,
          56,
          57,
          50,
          43,
          36,
          29,
          22,
          15,
          23,
          30,
          37,
          44,
          51,
          58,
          59,
          52,
          45,
          38,
          31,
          39,
          46,
          53,
          60,
          61,
          54,
          47,
          55,
          62,
          63
        ]);
        var dctCos1 = 4017;
        var dctSin1 = 799;
        var dctCos3 = 3406;
        var dctSin3 = 2276;
        var dctCos6 = 1567;
        var dctSin6 = 3784;
        var dctSqrt2 = 5793;
        var dctSqrt1d2 = 2896;
        function constructor() {
        }
        function buildHuffmanTable(codeLengths, values) {
          var k = 0, code = [], i, j, length = 16;
          while (length > 0 && !codeLengths[length - 1])
            length--;
          code.push({ children: [], index: 0 });
          var p = code[0], q;
          for (i = 0; i < length; i++) {
            for (j = 0; j < codeLengths[i]; j++) {
              p = code.pop();
              p.children[p.index] = values[k];
              while (p.index > 0) {
                if (code.length === 0)
                  throw new Error("Could not recreate Huffman Table");
                p = code.pop();
              }
              p.index++;
              code.push(p);
              while (code.length <= i) {
                code.push(q = { children: [], index: 0 });
                p.children[p.index] = q.children;
                p = q;
              }
              k++;
            }
            if (i + 1 < length) {
              code.push(q = { children: [], index: 0 });
              p.children[p.index] = q.children;
              p = q;
            }
          }
          return code[0].children;
        }
        function decodeScan(data, offset, frame, components, resetInterval, spectralStart, spectralEnd, successivePrev, successive, opts) {
          var precision = frame.precision;
          var samplesPerLine = frame.samplesPerLine;
          var scanLines = frame.scanLines;
          var mcusPerLine = frame.mcusPerLine;
          var progressive = frame.progressive;
          var maxH = frame.maxH, maxV = frame.maxV;
          var startOffset = offset, bitsData = 0, bitsCount = 0;
          function readBit() {
            if (bitsCount > 0) {
              bitsCount--;
              return bitsData >> bitsCount & 1;
            }
            bitsData = data[offset++];
            if (bitsData == 255) {
              var nextByte = data[offset++];
              if (nextByte) {
                throw new Error("unexpected marker: " + (bitsData << 8 | nextByte).toString(16));
              }
            }
            bitsCount = 7;
            return bitsData >>> 7;
          }
          function decodeHuffman(tree) {
            var node = tree, bit;
            while ((bit = readBit()) !== null) {
              node = node[bit];
              if (typeof node === "number")
                return node;
              if (typeof node !== "object")
                throw new Error("invalid huffman sequence");
            }
            return null;
          }
          function receive(length) {
            var n2 = 0;
            while (length > 0) {
              var bit = readBit();
              if (bit === null)
                return;
              n2 = n2 << 1 | bit;
              length--;
            }
            return n2;
          }
          function receiveAndExtend(length) {
            var n2 = receive(length);
            if (n2 >= 1 << length - 1)
              return n2;
            return n2 + (-1 << length) + 1;
          }
          function decodeBaseline(component2, zz) {
            var t = decodeHuffman(component2.huffmanTableDC);
            var diff = t === 0 ? 0 : receiveAndExtend(t);
            zz[0] = component2.pred += diff;
            var k2 = 1;
            while (k2 < 64) {
              var rs = decodeHuffman(component2.huffmanTableAC);
              var s = rs & 15, r = rs >> 4;
              if (s === 0) {
                if (r < 15)
                  break;
                k2 += 16;
                continue;
              }
              k2 += r;
              var z = dctZigZag[k2];
              zz[z] = receiveAndExtend(s);
              k2++;
            }
          }
          function decodeDCFirst(component2, zz) {
            var t = decodeHuffman(component2.huffmanTableDC);
            var diff = t === 0 ? 0 : receiveAndExtend(t) << successive;
            zz[0] = component2.pred += diff;
          }
          function decodeDCSuccessive(component2, zz) {
            zz[0] |= readBit() << successive;
          }
          var eobrun = 0;
          function decodeACFirst(component2, zz) {
            if (eobrun > 0) {
              eobrun--;
              return;
            }
            var k2 = spectralStart, e = spectralEnd;
            while (k2 <= e) {
              var rs = decodeHuffman(component2.huffmanTableAC);
              var s = rs & 15, r = rs >> 4;
              if (s === 0) {
                if (r < 15) {
                  eobrun = receive(r) + (1 << r) - 1;
                  break;
                }
                k2 += 16;
                continue;
              }
              k2 += r;
              var z = dctZigZag[k2];
              zz[z] = receiveAndExtend(s) * (1 << successive);
              k2++;
            }
          }
          var successiveACState = 0, successiveACNextValue;
          function decodeACSuccessive(component2, zz) {
            var k2 = spectralStart, e = spectralEnd, r = 0;
            while (k2 <= e) {
              var z = dctZigZag[k2];
              var direction = zz[z] < 0 ? -1 : 1;
              switch (successiveACState) {
                case 0:
                  var rs = decodeHuffman(component2.huffmanTableAC);
                  var s = rs & 15, r = rs >> 4;
                  if (s === 0) {
                    if (r < 15) {
                      eobrun = receive(r) + (1 << r);
                      successiveACState = 4;
                    } else {
                      r = 16;
                      successiveACState = 1;
                    }
                  } else {
                    if (s !== 1)
                      throw new Error("invalid ACn encoding");
                    successiveACNextValue = receiveAndExtend(s);
                    successiveACState = r ? 2 : 3;
                  }
                  continue;
                case 1:
                case 2:
                  if (zz[z])
                    zz[z] += (readBit() << successive) * direction;
                  else {
                    r--;
                    if (r === 0)
                      successiveACState = successiveACState == 2 ? 3 : 0;
                  }
                  break;
                case 3:
                  if (zz[z])
                    zz[z] += (readBit() << successive) * direction;
                  else {
                    zz[z] = successiveACNextValue << successive;
                    successiveACState = 0;
                  }
                  break;
                case 4:
                  if (zz[z])
                    zz[z] += (readBit() << successive) * direction;
                  break;
              }
              k2++;
            }
            if (successiveACState === 4) {
              eobrun--;
              if (eobrun === 0)
                successiveACState = 0;
            }
          }
          function decodeMcu(component2, decode2, mcu2, row, col) {
            var mcuRow = mcu2 / mcusPerLine | 0;
            var mcuCol = mcu2 % mcusPerLine;
            var blockRow = mcuRow * component2.v + row;
            var blockCol = mcuCol * component2.h + col;
            if (component2.blocks[blockRow] === void 0 && opts.tolerantDecoding)
              return;
            decode2(component2, component2.blocks[blockRow][blockCol]);
          }
          function decodeBlock(component2, decode2, mcu2) {
            var blockRow = mcu2 / component2.blocksPerLine | 0;
            var blockCol = mcu2 % component2.blocksPerLine;
            if (component2.blocks[blockRow] === void 0 && opts.tolerantDecoding)
              return;
            decode2(component2, component2.blocks[blockRow][blockCol]);
          }
          var componentsLength = components.length;
          var component, i, j, k, n;
          var decodeFn;
          if (progressive) {
            if (spectralStart === 0)
              decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;
            else
              decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive;
          } else {
            decodeFn = decodeBaseline;
          }
          var mcu = 0, marker;
          var mcuExpected;
          if (componentsLength == 1) {
            mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn;
          } else {
            mcuExpected = mcusPerLine * frame.mcusPerColumn;
          }
          if (!resetInterval)
            resetInterval = mcuExpected;
          var h, v;
          while (mcu < mcuExpected) {
            for (i = 0; i < componentsLength; i++)
              components[i].pred = 0;
            eobrun = 0;
            if (componentsLength == 1) {
              component = components[0];
              for (n = 0; n < resetInterval; n++) {
                decodeBlock(component, decodeFn, mcu);
                mcu++;
              }
            } else {
              for (n = 0; n < resetInterval; n++) {
                for (i = 0; i < componentsLength; i++) {
                  component = components[i];
                  h = component.h;
                  v = component.v;
                  for (j = 0; j < v; j++) {
                    for (k = 0; k < h; k++) {
                      decodeMcu(component, decodeFn, mcu, j, k);
                    }
                  }
                }
                mcu++;
                if (mcu === mcuExpected)
                  break;
              }
            }
            if (mcu === mcuExpected) {
              do {
                if (data[offset] === 255) {
                  if (data[offset + 1] !== 0) {
                    break;
                  }
                }
                offset += 1;
              } while (offset < data.length - 2);
            }
            bitsCount = 0;
            marker = data[offset] << 8 | data[offset + 1];
            if (marker < 65280) {
              throw new Error("marker was not found");
            }
            if (marker >= 65488 && marker <= 65495) {
              offset += 2;
            } else
              break;
          }
          return offset - startOffset;
        }
        function buildComponentData(frame, component) {
          var lines = [];
          var blocksPerLine = component.blocksPerLine;
          var blocksPerColumn = component.blocksPerColumn;
          var samplesPerLine = blocksPerLine << 3;
          var R = new Int32Array(64), r = new Uint8Array(64);
          function quantizeAndInverse(zz, dataOut, dataIn) {
            var qt = component.quantizationTable;
            var v0, v1, v2, v3, v4, v5, v6, v7, t;
            var p = dataIn;
            var i2;
            for (i2 = 0; i2 < 64; i2++)
              p[i2] = zz[i2] * qt[i2];
            for (i2 = 0; i2 < 8; ++i2) {
              var row = 8 * i2;
              if (p[1 + row] == 0 && p[2 + row] == 0 && p[3 + row] == 0 && p[4 + row] == 0 && p[5 + row] == 0 && p[6 + row] == 0 && p[7 + row] == 0) {
                t = dctSqrt2 * p[0 + row] + 512 >> 10;
                p[0 + row] = t;
                p[1 + row] = t;
                p[2 + row] = t;
                p[3 + row] = t;
                p[4 + row] = t;
                p[5 + row] = t;
                p[6 + row] = t;
                p[7 + row] = t;
                continue;
              }
              v0 = dctSqrt2 * p[0 + row] + 128 >> 8;
              v1 = dctSqrt2 * p[4 + row] + 128 >> 8;
              v2 = p[2 + row];
              v3 = p[6 + row];
              v4 = dctSqrt1d2 * (p[1 + row] - p[7 + row]) + 128 >> 8;
              v7 = dctSqrt1d2 * (p[1 + row] + p[7 + row]) + 128 >> 8;
              v5 = p[3 + row] << 4;
              v6 = p[5 + row] << 4;
              t = v0 - v1 + 1 >> 1;
              v0 = v0 + v1 + 1 >> 1;
              v1 = t;
              t = v2 * dctSin6 + v3 * dctCos6 + 128 >> 8;
              v2 = v2 * dctCos6 - v3 * dctSin6 + 128 >> 8;
              v3 = t;
              t = v4 - v6 + 1 >> 1;
              v4 = v4 + v6 + 1 >> 1;
              v6 = t;
              t = v7 + v5 + 1 >> 1;
              v5 = v7 - v5 + 1 >> 1;
              v7 = t;
              t = v0 - v3 + 1 >> 1;
              v0 = v0 + v3 + 1 >> 1;
              v3 = t;
              t = v1 - v2 + 1 >> 1;
              v1 = v1 + v2 + 1 >> 1;
              v2 = t;
              t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
              v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
              v7 = t;
              t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
              v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
              v6 = t;
              p[0 + row] = v0 + v7;
              p[7 + row] = v0 - v7;
              p[1 + row] = v1 + v6;
              p[6 + row] = v1 - v6;
              p[2 + row] = v2 + v5;
              p[5 + row] = v2 - v5;
              p[3 + row] = v3 + v4;
              p[4 + row] = v3 - v4;
            }
            for (i2 = 0; i2 < 8; ++i2) {
              var col = i2;
              if (p[1 * 8 + col] == 0 && p[2 * 8 + col] == 0 && p[3 * 8 + col] == 0 && p[4 * 8 + col] == 0 && p[5 * 8 + col] == 0 && p[6 * 8 + col] == 0 && p[7 * 8 + col] == 0) {
                t = dctSqrt2 * dataIn[i2 + 0] + 8192 >> 14;
                p[0 * 8 + col] = t;
                p[1 * 8 + col] = t;
                p[2 * 8 + col] = t;
                p[3 * 8 + col] = t;
                p[4 * 8 + col] = t;
                p[5 * 8 + col] = t;
                p[6 * 8 + col] = t;
                p[7 * 8 + col] = t;
                continue;
              }
              v0 = dctSqrt2 * p[0 * 8 + col] + 2048 >> 12;
              v1 = dctSqrt2 * p[4 * 8 + col] + 2048 >> 12;
              v2 = p[2 * 8 + col];
              v3 = p[6 * 8 + col];
              v4 = dctSqrt1d2 * (p[1 * 8 + col] - p[7 * 8 + col]) + 2048 >> 12;
              v7 = dctSqrt1d2 * (p[1 * 8 + col] + p[7 * 8 + col]) + 2048 >> 12;
              v5 = p[3 * 8 + col];
              v6 = p[5 * 8 + col];
              t = v0 - v1 + 1 >> 1;
              v0 = v0 + v1 + 1 >> 1;
              v1 = t;
              t = v2 * dctSin6 + v3 * dctCos6 + 2048 >> 12;
              v2 = v2 * dctCos6 - v3 * dctSin6 + 2048 >> 12;
              v3 = t;
              t = v4 - v6 + 1 >> 1;
              v4 = v4 + v6 + 1 >> 1;
              v6 = t;
              t = v7 + v5 + 1 >> 1;
              v5 = v7 - v5 + 1 >> 1;
              v7 = t;
              t = v0 - v3 + 1 >> 1;
              v0 = v0 + v3 + 1 >> 1;
              v3 = t;
              t = v1 - v2 + 1 >> 1;
              v1 = v1 + v2 + 1 >> 1;
              v2 = t;
              t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
              v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
              v7 = t;
              t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
              v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
              v6 = t;
              p[0 * 8 + col] = v0 + v7;
              p[7 * 8 + col] = v0 - v7;
              p[1 * 8 + col] = v1 + v6;
              p[6 * 8 + col] = v1 - v6;
              p[2 * 8 + col] = v2 + v5;
              p[5 * 8 + col] = v2 - v5;
              p[3 * 8 + col] = v3 + v4;
              p[4 * 8 + col] = v3 - v4;
            }
            for (i2 = 0; i2 < 64; ++i2) {
              var sample2 = 128 + (p[i2] + 8 >> 4);
              dataOut[i2] = sample2 < 0 ? 0 : sample2 > 255 ? 255 : sample2;
            }
          }
          requestMemoryAllocation(samplesPerLine * blocksPerColumn * 8);
          var i, j;
          for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
            var scanLine = blockRow << 3;
            for (i = 0; i < 8; i++)
              lines.push(new Uint8Array(samplesPerLine));
            for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
              quantizeAndInverse(component.blocks[blockRow][blockCol], r, R);
              var offset = 0, sample = blockCol << 3;
              for (j = 0; j < 8; j++) {
                var line = lines[scanLine + j];
                for (i = 0; i < 8; i++)
                  line[sample + i] = r[offset++];
              }
            }
          }
          return lines;
        }
        function clampTo8bit(a) {
          return a < 0 ? 0 : a > 255 ? 255 : a;
        }
        constructor.prototype = {
          load: function load(path) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", path, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = function() {
              var data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
              this.parse(data);
              if (this.onload)
                this.onload();
            }.bind(this);
            xhr.send(null);
          },
          parse: function parse(data) {
            var maxResolutionInPixels = this.opts.maxResolutionInMP * 1e3 * 1e3;
            var offset = 0, length = data.length;
            function readUint16() {
              var value = data[offset] << 8 | data[offset + 1];
              offset += 2;
              return value;
            }
            function readDataBlock() {
              var length2 = readUint16();
              var array = data.subarray(offset, offset + length2 - 2);
              offset += array.length;
              return array;
            }
            function prepareComponents(frame2) {
              var maxH2 = 0, maxV2 = 0;
              var component2, componentId2;
              for (componentId2 in frame2.components) {
                if (frame2.components.hasOwnProperty(componentId2)) {
                  component2 = frame2.components[componentId2];
                  if (maxH2 < component2.h)
                    maxH2 = component2.h;
                  if (maxV2 < component2.v)
                    maxV2 = component2.v;
                }
              }
              var mcusPerLine = Math.ceil(frame2.samplesPerLine / 8 / maxH2);
              var mcusPerColumn = Math.ceil(frame2.scanLines / 8 / maxV2);
              for (componentId2 in frame2.components) {
                if (frame2.components.hasOwnProperty(componentId2)) {
                  component2 = frame2.components[componentId2];
                  var blocksPerLine = Math.ceil(Math.ceil(frame2.samplesPerLine / 8) * component2.h / maxH2);
                  var blocksPerColumn = Math.ceil(Math.ceil(frame2.scanLines / 8) * component2.v / maxV2);
                  var blocksPerLineForMcu = mcusPerLine * component2.h;
                  var blocksPerColumnForMcu = mcusPerColumn * component2.v;
                  var blocksToAllocate = blocksPerColumnForMcu * blocksPerLineForMcu;
                  var blocks = [];
                  requestMemoryAllocation(blocksToAllocate * 256);
                  for (var i2 = 0; i2 < blocksPerColumnForMcu; i2++) {
                    var row = [];
                    for (var j2 = 0; j2 < blocksPerLineForMcu; j2++)
                      row.push(new Int32Array(64));
                    blocks.push(row);
                  }
                  component2.blocksPerLine = blocksPerLine;
                  component2.blocksPerColumn = blocksPerColumn;
                  component2.blocks = blocks;
                }
              }
              frame2.maxH = maxH2;
              frame2.maxV = maxV2;
              frame2.mcusPerLine = mcusPerLine;
              frame2.mcusPerColumn = mcusPerColumn;
            }
            var jfif = null;
            var adobe = null;
            var pixels = null;
            var frame, resetInterval;
            var quantizationTables = [], frames = [];
            var huffmanTablesAC = [], huffmanTablesDC = [];
            var fileMarker = readUint16();
            var malformedDataOffset = -1;
            this.comments = [];
            if (fileMarker != 65496) {
              throw new Error("SOI not found");
            }
            fileMarker = readUint16();
            while (fileMarker != 65497) {
              var i, j, l;
              switch (fileMarker) {
                case 65280:
                  break;
                case 65504:
                case 65505:
                case 65506:
                case 65507:
                case 65508:
                case 65509:
                case 65510:
                case 65511:
                case 65512:
                case 65513:
                case 65514:
                case 65515:
                case 65516:
                case 65517:
                case 65518:
                case 65519:
                case 65534:
                  var appData = readDataBlock();
                  if (fileMarker === 65534) {
                    var comment = String.fromCharCode.apply(null, appData);
                    this.comments.push(comment);
                  }
                  if (fileMarker === 65504) {
                    if (appData[0] === 74 && appData[1] === 70 && appData[2] === 73 && appData[3] === 70 && appData[4] === 0) {
                      jfif = {
                        version: { major: appData[5], minor: appData[6] },
                        densityUnits: appData[7],
                        xDensity: appData[8] << 8 | appData[9],
                        yDensity: appData[10] << 8 | appData[11],
                        thumbWidth: appData[12],
                        thumbHeight: appData[13],
                        thumbData: appData.subarray(14, 14 + 3 * appData[12] * appData[13])
                      };
                    }
                  }
                  if (fileMarker === 65505) {
                    if (appData[0] === 69 && appData[1] === 120 && appData[2] === 105 && appData[3] === 102 && appData[4] === 0) {
                      this.exifBuffer = appData.subarray(5, appData.length);
                    }
                  }
                  if (fileMarker === 65518) {
                    if (appData[0] === 65 && appData[1] === 100 && appData[2] === 111 && appData[3] === 98 && appData[4] === 101 && appData[5] === 0) {
                      adobe = {
                        version: appData[6],
                        flags0: appData[7] << 8 | appData[8],
                        flags1: appData[9] << 8 | appData[10],
                        transformCode: appData[11]
                      };
                    }
                  }
                  break;
                case 65499:
                  var quantizationTablesLength = readUint16();
                  var quantizationTablesEnd = quantizationTablesLength + offset - 2;
                  while (offset < quantizationTablesEnd) {
                    var quantizationTableSpec = data[offset++];
                    requestMemoryAllocation(64 * 4);
                    var tableData = new Int32Array(64);
                    if (quantizationTableSpec >> 4 === 0) {
                      for (j = 0; j < 64; j++) {
                        var z = dctZigZag[j];
                        tableData[z] = data[offset++];
                      }
                    } else if (quantizationTableSpec >> 4 === 1) {
                      for (j = 0; j < 64; j++) {
                        var z = dctZigZag[j];
                        tableData[z] = readUint16();
                      }
                    } else
                      throw new Error("DQT: invalid table spec");
                    quantizationTables[quantizationTableSpec & 15] = tableData;
                  }
                  break;
                case 65472:
                case 65473:
                case 65474:
                  readUint16();
                  frame = {};
                  frame.extended = fileMarker === 65473;
                  frame.progressive = fileMarker === 65474;
                  frame.precision = data[offset++];
                  frame.scanLines = readUint16();
                  frame.samplesPerLine = readUint16();
                  frame.components = {};
                  frame.componentsOrder = [];
                  var pixelsInFrame = frame.scanLines * frame.samplesPerLine;
                  if (pixelsInFrame > maxResolutionInPixels) {
                    var exceededAmount = Math.ceil((pixelsInFrame - maxResolutionInPixels) / 1e6);
                    throw new Error(`maxResolutionInMP limit exceeded by ${exceededAmount}MP`);
                  }
                  var componentsCount = data[offset++], componentId;
                  var maxH = 0, maxV = 0;
                  for (i = 0; i < componentsCount; i++) {
                    componentId = data[offset];
                    var h = data[offset + 1] >> 4;
                    var v = data[offset + 1] & 15;
                    var qId = data[offset + 2];
                    frame.componentsOrder.push(componentId);
                    frame.components[componentId] = {
                      h,
                      v,
                      quantizationIdx: qId
                    };
                    offset += 3;
                  }
                  prepareComponents(frame);
                  frames.push(frame);
                  break;
                case 65476:
                  var huffmanLength = readUint16();
                  for (i = 2; i < huffmanLength; ) {
                    var huffmanTableSpec = data[offset++];
                    var codeLengths = new Uint8Array(16);
                    var codeLengthSum = 0;
                    for (j = 0; j < 16; j++, offset++) {
                      codeLengthSum += codeLengths[j] = data[offset];
                    }
                    requestMemoryAllocation(16 + codeLengthSum);
                    var huffmanValues = new Uint8Array(codeLengthSum);
                    for (j = 0; j < codeLengthSum; j++, offset++)
                      huffmanValues[j] = data[offset];
                    i += 17 + codeLengthSum;
                    (huffmanTableSpec >> 4 === 0 ? huffmanTablesDC : huffmanTablesAC)[huffmanTableSpec & 15] = buildHuffmanTable(codeLengths, huffmanValues);
                  }
                  break;
                case 65501:
                  readUint16();
                  resetInterval = readUint16();
                  break;
                case 65500:
                  readUint16();
                  readUint16();
                  break;
                case 65498:
                  var scanLength = readUint16();
                  var selectorsCount = data[offset++];
                  var components = [], component;
                  for (i = 0; i < selectorsCount; i++) {
                    component = frame.components[data[offset++]];
                    var tableSpec = data[offset++];
                    component.huffmanTableDC = huffmanTablesDC[tableSpec >> 4];
                    component.huffmanTableAC = huffmanTablesAC[tableSpec & 15];
                    components.push(component);
                  }
                  var spectralStart = data[offset++];
                  var spectralEnd = data[offset++];
                  var successiveApproximation = data[offset++];
                  var processed = decodeScan(data, offset, frame, components, resetInterval, spectralStart, spectralEnd, successiveApproximation >> 4, successiveApproximation & 15, this.opts);
                  offset += processed;
                  break;
                case 65535:
                  if (data[offset] !== 255) {
                    offset--;
                  }
                  break;
                default:
                  if (data[offset - 3] == 255 && data[offset - 2] >= 192 && data[offset - 2] <= 254) {
                    offset -= 3;
                    break;
                  } else if (fileMarker === 224 || fileMarker == 225) {
                    if (malformedDataOffset !== -1) {
                      throw new Error(`first unknown JPEG marker at offset ${malformedDataOffset.toString(16)}, second unknown JPEG marker ${fileMarker.toString(16)} at offset ${(offset - 1).toString(16)}`);
                    }
                    malformedDataOffset = offset - 1;
                    const nextOffset = readUint16();
                    if (data[offset + nextOffset - 2] === 255) {
                      offset += nextOffset - 2;
                      break;
                    }
                  }
                  throw new Error("unknown JPEG marker " + fileMarker.toString(16));
              }
              fileMarker = readUint16();
            }
            if (frames.length != 1)
              throw new Error("only single frame JPEGs supported");
            for (var i = 0; i < frames.length; i++) {
              var cp = frames[i].components;
              for (var j in cp) {
                cp[j].quantizationTable = quantizationTables[cp[j].quantizationIdx];
                delete cp[j].quantizationIdx;
              }
            }
            this.width = frame.samplesPerLine;
            this.height = frame.scanLines;
            this.jfif = jfif;
            this.adobe = adobe;
            this.components = [];
            for (var i = 0; i < frame.componentsOrder.length; i++) {
              var component = frame.components[frame.componentsOrder[i]];
              this.components.push({
                lines: buildComponentData(frame, component),
                scaleX: component.h / frame.maxH,
                scaleY: component.v / frame.maxV
              });
            }
          },
          getData: function getData(width, height) {
            var scaleX = this.width / width, scaleY = this.height / height;
            var component1, component2, component3, component4;
            var component1Line, component2Line, component3Line, component4Line;
            var x, y;
            var offset = 0;
            var Y, Cb, Cr, K, C, M, Ye, R, G, B;
            var colorTransform;
            var dataLength = width * height * this.components.length;
            requestMemoryAllocation(dataLength);
            var data = new Uint8Array(dataLength);
            switch (this.components.length) {
              case 1:
                component1 = this.components[0];
                for (y = 0; y < height; y++) {
                  component1Line = component1.lines[0 | y * component1.scaleY * scaleY];
                  for (x = 0; x < width; x++) {
                    Y = component1Line[0 | x * component1.scaleX * scaleX];
                    data[offset++] = Y;
                  }
                }
                break;
              case 2:
                component1 = this.components[0];
                component2 = this.components[1];
                for (y = 0; y < height; y++) {
                  component1Line = component1.lines[0 | y * component1.scaleY * scaleY];
                  component2Line = component2.lines[0 | y * component2.scaleY * scaleY];
                  for (x = 0; x < width; x++) {
                    Y = component1Line[0 | x * component1.scaleX * scaleX];
                    data[offset++] = Y;
                    Y = component2Line[0 | x * component2.scaleX * scaleX];
                    data[offset++] = Y;
                  }
                }
                break;
              case 3:
                colorTransform = true;
                if (this.adobe && this.adobe.transformCode)
                  colorTransform = true;
                else if (typeof this.opts.colorTransform !== "undefined")
                  colorTransform = !!this.opts.colorTransform;
                component1 = this.components[0];
                component2 = this.components[1];
                component3 = this.components[2];
                for (y = 0; y < height; y++) {
                  component1Line = component1.lines[0 | y * component1.scaleY * scaleY];
                  component2Line = component2.lines[0 | y * component2.scaleY * scaleY];
                  component3Line = component3.lines[0 | y * component3.scaleY * scaleY];
                  for (x = 0; x < width; x++) {
                    if (!colorTransform) {
                      R = component1Line[0 | x * component1.scaleX * scaleX];
                      G = component2Line[0 | x * component2.scaleX * scaleX];
                      B = component3Line[0 | x * component3.scaleX * scaleX];
                    } else {
                      Y = component1Line[0 | x * component1.scaleX * scaleX];
                      Cb = component2Line[0 | x * component2.scaleX * scaleX];
                      Cr = component3Line[0 | x * component3.scaleX * scaleX];
                      R = clampTo8bit(Y + 1.402 * (Cr - 128));
                      G = clampTo8bit(Y - 0.3441363 * (Cb - 128) - 0.71413636 * (Cr - 128));
                      B = clampTo8bit(Y + 1.772 * (Cb - 128));
                    }
                    data[offset++] = R;
                    data[offset++] = G;
                    data[offset++] = B;
                  }
                }
                break;
              case 4:
                if (!this.adobe)
                  throw new Error("Unsupported color mode (4 components)");
                colorTransform = false;
                if (this.adobe && this.adobe.transformCode)
                  colorTransform = true;
                else if (typeof this.opts.colorTransform !== "undefined")
                  colorTransform = !!this.opts.colorTransform;
                component1 = this.components[0];
                component2 = this.components[1];
                component3 = this.components[2];
                component4 = this.components[3];
                for (y = 0; y < height; y++) {
                  component1Line = component1.lines[0 | y * component1.scaleY * scaleY];
                  component2Line = component2.lines[0 | y * component2.scaleY * scaleY];
                  component3Line = component3.lines[0 | y * component3.scaleY * scaleY];
                  component4Line = component4.lines[0 | y * component4.scaleY * scaleY];
                  for (x = 0; x < width; x++) {
                    if (!colorTransform) {
                      C = component1Line[0 | x * component1.scaleX * scaleX];
                      M = component2Line[0 | x * component2.scaleX * scaleX];
                      Ye = component3Line[0 | x * component3.scaleX * scaleX];
                      K = component4Line[0 | x * component4.scaleX * scaleX];
                    } else {
                      Y = component1Line[0 | x * component1.scaleX * scaleX];
                      Cb = component2Line[0 | x * component2.scaleX * scaleX];
                      Cr = component3Line[0 | x * component3.scaleX * scaleX];
                      K = component4Line[0 | x * component4.scaleX * scaleX];
                      C = 255 - clampTo8bit(Y + 1.402 * (Cr - 128));
                      M = 255 - clampTo8bit(Y - 0.3441363 * (Cb - 128) - 0.71413636 * (Cr - 128));
                      Ye = 255 - clampTo8bit(Y + 1.772 * (Cb - 128));
                    }
                    data[offset++] = 255 - C;
                    data[offset++] = 255 - M;
                    data[offset++] = 255 - Ye;
                    data[offset++] = 255 - K;
                  }
                }
                break;
              default:
                throw new Error("Unsupported color mode");
            }
            return data;
          },
          copyToImageData: function copyToImageData(imageData, formatAsRGBA) {
            var width = imageData.width, height = imageData.height;
            var imageDataArray = imageData.data;
            var data = this.getData(width, height);
            var i = 0, j = 0, x, y;
            var Y, K, C, M, R, G, B;
            switch (this.components.length) {
              case 1:
                for (y = 0; y < height; y++) {
                  for (x = 0; x < width; x++) {
                    Y = data[i++];
                    imageDataArray[j++] = Y;
                    imageDataArray[j++] = Y;
                    imageDataArray[j++] = Y;
                    if (formatAsRGBA) {
                      imageDataArray[j++] = 255;
                    }
                  }
                }
                break;
              case 3:
                for (y = 0; y < height; y++) {
                  for (x = 0; x < width; x++) {
                    R = data[i++];
                    G = data[i++];
                    B = data[i++];
                    imageDataArray[j++] = R;
                    imageDataArray[j++] = G;
                    imageDataArray[j++] = B;
                    if (formatAsRGBA) {
                      imageDataArray[j++] = 255;
                    }
                  }
                }
                break;
              case 4:
                for (y = 0; y < height; y++) {
                  for (x = 0; x < width; x++) {
                    C = data[i++];
                    M = data[i++];
                    Y = data[i++];
                    K = data[i++];
                    R = 255 - clampTo8bit(C * (1 - K / 255) + K);
                    G = 255 - clampTo8bit(M * (1 - K / 255) + K);
                    B = 255 - clampTo8bit(Y * (1 - K / 255) + K);
                    imageDataArray[j++] = R;
                    imageDataArray[j++] = G;
                    imageDataArray[j++] = B;
                    if (formatAsRGBA) {
                      imageDataArray[j++] = 255;
                    }
                  }
                }
                break;
              default:
                throw new Error("Unsupported color mode");
            }
          }
        };
        var totalBytesAllocated = 0;
        var maxMemoryUsageBytes = 0;
        function requestMemoryAllocation(increaseAmount = 0) {
          var totalMemoryImpactBytes = totalBytesAllocated + increaseAmount;
          if (totalMemoryImpactBytes > maxMemoryUsageBytes) {
            var exceededAmount = Math.ceil((totalMemoryImpactBytes - maxMemoryUsageBytes) / 1024 / 1024);
            throw new Error(`maxMemoryUsageInMB limit exceeded by at least ${exceededAmount}MB`);
          }
          totalBytesAllocated = totalMemoryImpactBytes;
        }
        constructor.resetMaxMemoryUsage = function(maxMemoryUsageBytes_) {
          totalBytesAllocated = 0;
          maxMemoryUsageBytes = maxMemoryUsageBytes_;
        };
        constructor.getBytesAllocated = function() {
          return totalBytesAllocated;
        };
        constructor.requestMemoryAllocation = requestMemoryAllocation;
        return constructor;
      }();
      if (typeof module !== "undefined") {
        module.exports = decode;
      } else if (typeof window !== "undefined") {
        window["jpeg-js"] = window["jpeg-js"] || {};
        window["jpeg-js"].decode = decode;
      }
      function decode(jpegData, userOpts = {}) {
        var defaultOpts = {
          colorTransform: void 0,
          useTArray: false,
          formatAsRGBA: true,
          tolerantDecoding: true,
          maxResolutionInMP: 100,
          maxMemoryUsageInMB: 512
        };
        var opts = { ...defaultOpts, ...userOpts };
        var arr = new Uint8Array(jpegData);
        var decoder = new JpegImage();
        decoder.opts = opts;
        JpegImage.resetMaxMemoryUsage(opts.maxMemoryUsageInMB * 1024 * 1024);
        decoder.parse(arr);
        var channels = opts.formatAsRGBA ? 4 : 3;
        var bytesNeeded = decoder.width * decoder.height * channels;
        try {
          JpegImage.requestMemoryAllocation(bytesNeeded);
          var image = {
            width: decoder.width,
            height: decoder.height,
            exifBuffer: decoder.exifBuffer,
            data: opts.useTArray ? new Uint8Array(bytesNeeded) : Buffer2.alloc(bytesNeeded)
          };
          if (decoder.comments.length > 0) {
            image["comments"] = decoder.comments;
          }
        } catch (err) {
          if (err instanceof RangeError) {
            throw new Error("Could not allocate enough memory for the image. Required: " + bytesNeeded);
          } else {
            throw err;
          }
        }
        decoder.copyToImageData(image, opts.formatAsRGBA);
        return image;
      }
    }
  });

  // node_modules/jpeg-js/index.js
  var require_jpeg_js = __commonJS({
    "node_modules/jpeg-js/index.js"(exports, module) {
      init_define_BUILD_VERSION();
      init_esbuild_inject();
      var encode = require_encoder();
      var decode = require_decoder();
      module.exports = {
        encode,
        decode
      };
    }
  });

  // src/main.ts
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var import_buffer11 = __toESM(require_buffer(), 1);

  // src/stores.ts
  init_define_BUILD_VERSION();
  init_esbuild_inject();

  // node_modules/svelte/store/index.mjs
  init_define_BUILD_VERSION();
  init_esbuild_inject();

  // node_modules/svelte/internal/index.mjs
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  function noop() {
  }
  function assign(tar, src) {
    for (const k in src)
      tar[k] = src[k];
    return tar;
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
  }
  var src_url_equal_anchor;
  function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
      src_url_equal_anchor = document.createElement("a");
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  function subscribe(store, ...callbacks) {
    if (store == null) {
      return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
  }
  function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
  }
  function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
      const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
      return definition[0](slot_ctx);
    }
  }
  function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
  }
  function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
      const lets = definition[2](fn(dirty));
      if ($$scope.dirty === void 0) {
        return lets;
      }
      if (typeof lets === "object") {
        const merged = [];
        const len = Math.max($$scope.dirty.length, lets.length);
        for (let i = 0; i < len; i += 1) {
          merged[i] = $$scope.dirty[i] | lets[i];
        }
        return merged;
      }
      return $$scope.dirty | lets;
    }
    return $$scope.dirty;
  }
  function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
      const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
      slot.p(slot_context, slot_changes);
    }
  }
  function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
      const dirty = [];
      const length = $$scope.ctx.length / 32;
      for (let i = 0; i < length; i++) {
        dirty[i] = -1;
      }
      return dirty;
    }
    return -1;
  }
  function null_to_empty(value) {
    return value == null ? "" : value;
  }
  function set_store_value(store, ret, value) {
    store.set(value);
    return ret;
  }
  var is_hydrating = false;
  function start_hydrating() {
    is_hydrating = true;
  }
  function end_hydrating() {
    is_hydrating = false;
  }
  function append(target, node) {
    target.appendChild(node);
  }
  function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
      const style = element("style");
      style.id = style_sheet_id;
      style.textContent = styles;
      append_stylesheet(append_styles_to, style);
    }
  }
  function get_root_for_style(node) {
    if (!node)
      return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
      return root;
    }
    return node.ownerDocument;
  }
  function append_stylesheet(node, style) {
    append(node.head || node, style);
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    node.parentNode.removeChild(node);
  }
  function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
      if (iterations[i])
        iterations[i].d(detaching);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function empty() {
    return text("");
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
    if (value == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  function to_number(value) {
    return value === "" ? null : +value;
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function set_data(text2, data) {
    data = "" + data;
    if (text2.wholeText !== data)
      text2.data = data;
  }
  function set_input_value(input, value) {
    input.value = value == null ? "" : value;
  }
  function set_style(node, key, value, important) {
    node.style.setProperty(key, value, important ? "important" : "");
  }
  function select_option(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
      const option = select.options[i];
      if (option.__value === value) {
        option.selected = true;
        return;
      }
    }
    select.selectedIndex = -1;
  }
  function select_value(select) {
    const selected_option = select.querySelector(":checked") || select.options[0];
    return selected_option && selected_option.__value;
  }
  function toggle_class(element2, name, toggle) {
    element2.classList[toggle ? "add" : "remove"](name);
  }
  function custom_event(type, detail, bubbles = false) {
    const e = document.createEvent("CustomEvent");
    e.initCustomEvent(type, bubbles, false, detail);
    return e;
  }
  var current_component;
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component)
      throw new Error("Function called outside component initialization");
    return current_component;
  }
  function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
  }
  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }
  function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
  }
  function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
      const callbacks = component.$$.callbacks[type];
      if (callbacks) {
        const event = custom_event(type, detail);
        callbacks.slice().forEach((fn) => {
          fn.call(component, event);
        });
      }
    };
  }
  function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
  }
  function getContext(key) {
    return get_current_component().$$.context.get(key);
  }
  function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
      callbacks.slice().forEach((fn) => fn.call(this, event));
    }
  }
  var dirty_components = [];
  var binding_callbacks = [];
  var render_callbacks = [];
  var flush_callbacks = [];
  var resolved_promise = Promise.resolve();
  var update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  var seen_callbacks = /* @__PURE__ */ new Set();
  var flushidx = 0;
  function flush() {
    const saved_component = current_component;
    do {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length)
        binding_callbacks.pop()();
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  var outroing = /* @__PURE__ */ new Set();
  var outros;
  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros
    };
  }
  function check_outros() {
    if (!outros.r) {
      run_all(outros.c);
    }
    outros = outros.p;
  }
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function transition_out(block, local, detach2, callback) {
    if (block && block.o) {
      if (outroing.has(block))
        return;
      outroing.add(block);
      outros.c.push(() => {
        outroing.delete(block);
        if (callback) {
          if (detach2)
            block.d(1);
          callback();
        }
      });
      block.o(local);
    }
  }
  var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : window;
  function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
  }
  function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
      lookup.delete(block.key);
    });
  }
  function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block8, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
      old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = /* @__PURE__ */ new Map();
    const deltas = /* @__PURE__ */ new Map();
    i = n;
    while (i--) {
      const child_ctx = get_context(ctx, list, i);
      const key = get_key(child_ctx);
      let block = lookup.get(key);
      if (!block) {
        block = create_each_block8(key, child_ctx);
        block.c();
      } else if (dynamic) {
        block.p(child_ctx, dirty);
      }
      new_lookup.set(key, new_blocks[i] = block);
      if (key in old_indexes)
        deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = /* @__PURE__ */ new Set();
    const did_move = /* @__PURE__ */ new Set();
    function insert2(block) {
      transition_in(block, 1);
      block.m(node, next);
      lookup.set(block.key, block);
      next = block.first;
      n--;
    }
    while (o && n) {
      const new_block = new_blocks[n - 1];
      const old_block = old_blocks[o - 1];
      const new_key = new_block.key;
      const old_key = old_block.key;
      if (new_block === old_block) {
        next = new_block.first;
        o--;
        n--;
      } else if (!new_lookup.has(old_key)) {
        destroy(old_block, lookup);
        o--;
      } else if (!lookup.has(new_key) || will_move.has(new_key)) {
        insert2(new_block);
      } else if (did_move.has(old_key)) {
        o--;
      } else if (deltas.get(new_key) > deltas.get(old_key)) {
        did_move.add(new_key);
        insert2(new_block);
      } else {
        will_move.add(old_key);
        o--;
      }
    }
    while (o--) {
      const old_block = old_blocks[o];
      if (!new_lookup.has(old_block.key))
        destroy(old_block, lookup);
    }
    while (n)
      insert2(new_blocks[n - 1]);
    return new_blocks;
  }
  function create_component(block) {
    block && block.c();
  }
  function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
      add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
          on_destroy.push(...new_on_destroy);
        } else {
          run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
      });
    }
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance17, create_fragment17, not_equal, props, append_styles2, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: null,
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      callbacks: blank_object(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles2 && append_styles2($$.root);
    let ready = false;
    $$.ctx = instance17 ? instance17(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i])
          $$.bound[i](value);
        if (ready)
          make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment17 ? create_fragment17($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        start_hydrating();
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro)
        transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor, options.customElement);
      end_hydrating();
      flush();
    }
    set_current_component(parent_component);
  }
  var SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }
      connectedCallback() {
        const { on_mount } = this.$$;
        this.$$.on_disconnect = on_mount.map(run).filter(is_function);
        for (const key in this.$$.slotted) {
          this.appendChild(this.$$.slotted[key]);
        }
      }
      attributeChangedCallback(attr2, _oldValue, newValue) {
        this[attr2] = newValue;
      }
      disconnectedCallback() {
        run_all(this.$$.on_disconnect);
      }
      $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
      }
      $on(type, callback) {
        const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return () => {
          const index = callbacks.indexOf(callback);
          if (index !== -1)
            callbacks.splice(index, 1);
        };
      }
      $set($$props) {
        if (this.$$set && !is_empty($$props)) {
          this.$$.skip_bound = true;
          this.$$set($$props);
          this.$$.skip_bound = false;
        }
      }
    };
  }
  var SvelteComponent = class {
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };

  // node_modules/svelte/store/index.mjs
  var subscriber_queue = [];
  function writable(value, start = noop) {
    let stop;
    const subscribers = /* @__PURE__ */ new Set();
    function set(new_value) {
      if (safe_not_equal(value, new_value)) {
        value = new_value;
        if (stop) {
          const run_queue = !subscriber_queue.length;
          for (const subscriber of subscribers) {
            subscriber[1]();
            subscriber_queue.push(subscriber, value);
          }
          if (run_queue) {
            for (let i = 0; i < subscriber_queue.length; i += 2) {
              subscriber_queue[i][0](subscriber_queue[i + 1]);
            }
            subscriber_queue.length = 0;
          }
        }
      }
    }
    function update2(fn) {
      set(fn(value));
    }
    function subscribe2(run2, invalidate = noop) {
      const subscriber = [run2, invalidate];
      subscribers.add(subscriber);
      if (subscribers.size === 1) {
        stop = start(set) || noop;
      }
      run2(value);
      return () => {
        subscribers.delete(subscriber);
        if (subscribers.size === 0) {
          stop();
          stop = null;
        }
      };
    }
    return { set, update: update2, subscribe: subscribe2 };
  }

  // src/stores.ts
  var localLoad = (key, def) => "__pee__" + key in localStorage ? JSON.parse(localStorage.getItem("__pee__" + key)) : def;
  var localSet = (key, value) => localStorage.setItem("__pee__" + key, JSON.stringify(value));
  var initial_settings = localLoad("settingsv2", {
    ...localLoad("settings", {}),
    loop: true,
    dh: false,
    xpv: false,
    xpi: false,
    hyd: false,
    ak: "",
    auto_embed: 0,
    auto_tags: "",
    te: false,
    eye: false,
    ca: false,
    pre: false,
    prev: false,
    sh: false,
    ep: false,
    tm: false,
    expte: false,
    mdist: -1,
    phash: false,
    hotlink: false,
    vercheck: false,
    fhost: 0,
    maxe: 5,
    conc: 8,
    ho: false,
    blacklist: ["guro", "scat", "ryona", "gore"],
    rsources: [
      {
        name: "Gelbooru",
        domain: "gelbooru.com",
        endpoint: "/index.php?page=dapi&s=post&q=index&json=1&tags=md5:",
        view: "https://gelbooru.com/index.php?page=post&s=view&id="
      },
      {
        name: "Yandere",
        domain: "yande.re",
        endpoint: "/post.json?tags=md5:",
        view: `https://yande.re/post/show/`
      },
      {
        name: "Sankaku",
        domain: "capi-v2.sankakucomplex.com",
        endpoint: "/posts/keyset?tags=md5:",
        view: `https://chan.sankakucomplex.com/post/show/`
      },
      {
        name: "Rule34",
        domain: "api.rule34.xxx",
        endpoint: "/index.php?page=dapi&s=post&q=index&json=1&tags=md5:",
        view: "https://rule34.xxx/index.php?page=post&s=view&id="
      },
      {
        name: "Danbooru",
        domain: "danbooru.donmai.us",
        endpoint: "/posts.json?tags=md5:",
        view: "https://danbooru.donmai.us/posts/"
      },
      {
        name: "Lolibooru",
        domain: "lolibooru.moe",
        endpoint: "/post.json?tags=md5:",
        view: "https://lolibooru.moe/post/show/"
      },
      {
        name: "ATFbooru",
        domain: "booru.allthefallen.moe",
        endpoint: "/posts.json?tags=md5:",
        view: "https://booru.allthefallen.moe/posts/"
      }
    ],
    ...localLoad("settingsv2", {})
  });
  var settings = writable(initial_settings);
  var appState = writable({
    isCatalog: false,
    is4chanX: false,
    akValid: false,
    herror: "",
    client: null,
    foundPosts: []
  });
  settings.subscribe((newVal) => {
    localSet("settingsv2", newVal);
  });

  // src/main.ts
  var import_lodash2 = __toESM(require_lodash(), 1);

  // src/global.css
  var global_default = ".pee-hidden {\n    display: none;\n}\n\n.extractedImg {\n    width: auto;\n    height: auto;\n    max-width: 125px;\n    max-height: 125px;\n    cursor: pointer;\n}\n\n#delform .postContainer>div.embedfound {\n    border-right: 3px dashed green !important;\n}\n\n#delform .postContainer>div.hasembed {\n    border-right: 3px dashed deeppink !important;\n}\n\n.hasembed.catalog-post {\n    border: 3px dashed deeppink !important;\n}\n\n#delform .postContainer>div.hasext {\n    border-right: 3px dashed goldenrod !important;\n}\n\n#delform .postContainer>div.hasmultiple {\n    border-right: 3px dashed cornflowerblue !important;\n}\n\n.post_wrapper.embedfound {\n    border-right: 3px dashed green !important;\n}\n\n.post_wrapper.hasembed {\n    border-right: 3px dashed deeppink !important;\n}\n\n.post_wrapper.hasext {\n    border-right: 3px dashed goldenrod !important;\n}\n\n.post_wrapper.hasmultiple {\n    border-right: 3px dashed cornflowerblue !important;\n}\n\n.hasext.catalog-post {\n    border: 3px dashed goldenrod !important;\n}\n\n.expanded-image>.post>.file .fileThumb>img[data-md5] {\n    display: none;\n}\n\n.expanded-image>.post>.file .fileThumb .full-image {\n    display: inline;\n}\n\n.pee-settings {\n    position: fixed;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    pointer-events: none;\n}\n\ndiv.hasemb .catalog-host img {\n    border: 1px solid deeppink;\n}\n\ndiv.hasext .catalog-host img {\n    border: 1px solid goldenrod;\n}\n\ndiv.hasmultiple .catalog-host img {\n    border: 1px solid cornflowerblue;\n}\n\n.catalog-host img {\n    position: absolute;\n    top: -5px;\n    right: 0px;\n    max-width: 80px;\n    max-height: 80px;\n    box-shadow: 0px 0px 4px 2px #00000090;\n}\n\n.fileThumb.filehost {\n    margin-left: 0 !important;\n    display: flex;\n    gap: 20px;\n}\n\n#qr > form {\n    overflow: visible !important;\n}\n\n.theme_default .post_wrapper > .thread_image_box {\n    display: flex;\n}\n\n.theme_default .post_wrapper > .thread_image_box > a {\n    margin-right: 20px;\n}\n";

  // src/pngv3.ts
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var import_buffer3 = __toESM(require_buffer(), 1);

  // src/png.ts
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var import_crc_32 = __toESM(require_crc32(), 1);
  var import_buffer = __toESM(require_buffer(), 1);
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
        if (chunk.done) {
          throw new Error(`Unexpected EOF, got ${this.repr.byteLength}, required ${this.req}, ${chunk.value}`);
        }
        this.repr = import_buffer.Buffer.concat([this.repr, chunk.value]);
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
        const pos = this.ptr;
        yield [
          name,
          async () => {
            await this.catchup();
            return this.repr.slice(pos, pos + length + 4);
          },
          async () => {
            await this.catchup();
            return this.repr.readUInt32BE(this.ptr + length + 4);
          },
          this.ptr
        ];
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
      const buff = await chunk[1]();
      b.writeInt32BE(buff.length - 4, 0);
      await this.writer.write(b);
      await this.writer.write(buff);
      b.writeInt32BE((0, import_crc_32.buf)(buff), 0);
      await this.writer.write(b);
    }
    async dtor() {
      this.writer.releaseLock();
      await this.writer.close();
    }
  };
  var BufferWriteStream = () => {
    let b = import_buffer.Buffer.from([]);
    const ret = new WritableStream({
      write(chunk) {
        b = import_buffer.Buffer.concat([b, chunk]);
      }
    });
    return [ret, () => b];
  };

  // src/utils.ts
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var import_buffer2 = __toESM(require_buffer(), 1);

  // src/assets/hasembed.png
  var hasembed_default = __toBinary("iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAMFBMVEX+/v3c3c2moZhda1ODfnfKvK49RDgCAgIbHxpsGhv6BQT9hIOV0Hh4pWO03Z//5coEk9oIAAAHdUlEQVR42qWZDXurIAyFhcDJsS31///bKzEWHX6sd2fPVqYbLycJwXXDTiGKSMrDkQKGc8WwjhCHa0WoSY5u5guIYIUk5BuGEc4oUYZTaVztUq4ZWZtSfzulCyPrCAjXEGgT+9vncQhoRtI1I1BnIdEouYecG5FmZPhNRsLn9T4l3fIjwq8gcXlFv9xwXpPriDLcKHjGYeX1RW0J2uBWUid3FsPPm+flz7Qd3FtJbqhzkuSiYHIzcq8Ybb7KiCRju5PlqirdNdLwewlT2u/IcNUrEvyVwzfKAbvEhHS1RrBF6ysK1ZRvGW0DxhbekGOSlGKzfxgIbpyE8XqJEI9W8GZN6ioi2VU9osSWk8jx8byCMC1zw5JHEiIwOY4YHmM8PDx0sZ/Gx6w9JeQcq3JoRZUUFeFLD+G1qBSh6vB4jBchjzI8NpSQE6BNgAiiodQINg4hvF9NxeYY02mFShw+lAogCUCAFhAiW3wpS/wNsGPQphjloP2FmINtkIdJoCSkvH5OIYZUxAURXk0CcsmJaQRi2IVdLGe1dJ7z7ZEkDNApDEFY27drYwRqC1shdR4dIalKBBhbwg3RCB3Edj39KNmnQ1QtZeoQJ4lIijF4kKzQZkaLUq+3zQ0iz+kwwkYFygrZUaahyr7m52TbHYa4gQxFwBT7u0XICtGO0fZFhAfqzskyHV69KkUbxeeefOQ2XjeyXEjx2JQDCgbdUAbTh5fdxr2RSBpFDillUNMmXB9bibxFFGOEIv6z9tqlxSH6CVirNL1nENGrtlCPKJWuNEijNFHlykHxfYCU1vyqXRRFo1CVJAzSU0bVKxsgpKyzoBRrLrTpy7ZWyroZDylm/lxic9ugYhapmvnSAmbfBId0FD2OlZQWB5JiSzWJFBGSHsMNRWGQnkJ2DDdP+SQDJPzk8/wV240esGY67SG6JgTHmVCQCo9JEiNQZZq82sUpdiaUspoOg/YU8n1sJE3zfLBoCGk2INT5aiTFKFoxhl9ro9QS7ijUGA4hzFNVpMKObskZBBTzxSykRUp1xkFjSIB6cRhkRxk1DXsI1zxMroRqw5iJBKRSUjVTaCbEn3SMUzhoJ/jp1hzI6z3vamBalaEEYUOSFWdmzOE6yeAcooNQ47A4efsRJCyhXmKamiIISh0FKhd8qGZIxMRGGQI6iN99z2sf3BGY67BodoDPqOpJEmX0OFo5LIPho9A7yX6jyijUWHugp6RppsBtESs6qiqMkhqlgzSbwb6E4t0CmH4okqu5sE2XWQbDOUTWe2kZVQjKLMr0UwEy9YrKClOcQ8rbjdhSLExWSYVp6oWpV6DWFAnzOcQO1DkJ5Dx428FdP4T5aNU2q6gydlbIMwjs1A7WDV5vY8xieQmnE2U1bRYhmtzKMUTs8eNlkLL0CQRhKcAZg+qU0LBmBXIMYakbJBhEizE0TplSKOdGXOmHFeIAQlmiFd4VQpUCUnReICCMJ5B0AAnKXRVvI1VsR1SEQQBy2YMgKutQoqvihly/SR3EMuAnu0NYjQEWXup0oqir8rSz0kNgrXAHsXr27QHV6UyfxG8vQvM2XG6jhxjZ22KyhnRdXnlfDjJxB+Hr1UP8JKUvN0/nygKJnT+2Humh6iCiSraOFacvlZRxWGWMc4gH4Xvl7TuyjbFWl2DNCUUw/a+IBnFGgxRygRAk/x8iG8jrFBInIfN/QwLCCUQsTss4b3dHTpK+BGo8hlBLg4QpKnZbQb6DSAcxoUKgxSETkv+8K32f+R4iNV5CMUhN3o9Gy/AFBAqEDuInlRDGu26090oKQo6cKDwp4BEkfQUpRYC+ulTFkrKHpP+F1NgjO6T1xE+8yKMTNn8JMQq2ENEqWbYjscuhiV9Vl3fCAg47I1WweBmkSayTfbcbSZ8Xw86IaYnXz1Mq5/BlW1G+XMPOiAkFykJMf1M6hOhW0PhHCCjrzMPWiItI1L9Cco27SVripblItjPyH6NFfmb+QLBrHVn1z9Fqjw5DlxF6zf6NEeup0RK/jGUHyRHyXXAQfrZgvhoErJSCLSRSVZF/v2wwHRtxiD8FcwuBplQx4Xd1hH5BXI2UskAUxVKygcyfjFDG35VR6tuWwpyQhJRBjSIbSJ6gFTKlOr6PlIR+j0AAKyeRkWoQFWqTTBEzJNUSS3eR4kHqApmGNEqFxOH5GBcIdCPa2Z5gfyyH60jhKKBkPXRH1iyE+ob5AqFuZcs3K8R1Og6NUsdh1nOmCOeBQTr5O0tMWeOUbk+RnvEYqsYRglOI0mudFUd+QwmV8Xi6FT2HtHd/kjn6gpJJ+fxr4TFyfObnGURl37Tl18c607zy1crD/mnVIL2XJlX+MlRknqduVkynECoRg/1mAvmr5xSxsnLIdA/xomaVklKZt91FvaxunTQRIqgQyHIQMN8hPBeTG7mFeG+uascmTjBBqMpHczANpucdhHht9LkYekLCksN1wqbHDYQsHcTE/V91GcaOWXvK4xYiW0bplgCA9OKQmRq1UZ7ZY3UDIXZGuAOQ68AApqROabqHlDMjNKlKzGG31a8o/wBpRk19RswBZgAAAABJRU5ErkJggg==");

  // src/filehosts.ts
  init_define_BUILD_VERSION();
  init_esbuild_inject();

  // src/platform.ts
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var import_tools = __toESM(require_tools2(), 1);

  // src/requests.ts
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var xmlhttprequest = typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : typeof GM != "undefined" ? GM.xmlHttpRequest : window["GM_xmlhttpRequest"];
  var headerStringToObject = (s) => Object.fromEntries(s.split("\n").map((e) => {
    const [name, ...rest] = e.split(":");
    return [name.toLowerCase(), rest.join(":").trim()];
  }));
  function GM_head(...[url, opt]) {
    return new Promise((resolve, reject) => {
      const gmopt = {
        url: url.toString(),
        data: opt?.body?.toString(),
        method: "HEAD",
        onload: (resp) => {
          if (resp.status / 100 >= 4)
            reject(new Error("response error"));
          else
            resolve(resp.responseHeaders);
        },
        ontimeout: () => reject(new Error("fetch timeout")),
        onerror: () => reject(new Error("fetch error")),
        onabort: () => reject(new Error("fetch abort"))
      };
      xmlhttprequest(gmopt);
    });
  }
  var GM_fetch = (...[url, opt, lisn]) => {
    function blobTo(to, blob) {
      if (to == "arrayBuffer" && blob.arrayBuffer) {
        const ret = blob.arrayBuffer();
        if (ret)
          return ret;
      }
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
          reject(new Error("unknown to"));
      });
    }
    return new Promise((resolve, reject) => {
      const gmopt = {
        url: url.toString(),
        data: opt?.body,
        responseType: "blob",
        headers: opt?.headers,
        method: opt?.method || "GET",
        ...lisn ? {
          onprogress: (prog) => {
            if (prog.loaded != prog.total && prog.total != 0)
              lisn.dispatchEvent(new CustomEvent("progress", { detail: [prog.loaded, prog.total] }));
          }
        } : {},
        onload: (resp) => {
          if (resp.status / 100 >= 4) {
            reject(new Error("Server Error: " + resp.status));
            return;
          }
          const blob = resp.response;
          const ref = resp;
          ref.blob = () => Promise.resolve(blob);
          ref.arrayBuffer = () => blobTo("arrayBuffer", blob);
          ref.text = () => blobTo("text", blob);
          ref.json = async () => JSON.parse(await blobTo("text", blob));
          resolve(resp);
        },
        ontimeout: () => reject(new Error("fetch timeout")),
        onerror: (...args) => {
          reject(new Error("fetch error"));
        },
        onabort: () => reject(new Error("fetch abort"))
      };
      xmlhttprequest(gmopt);
    });
  };
  if (window["pagemode"])
    GM_fetch = fetch;
  var makePoolable = (fun, getPoolSize) => {
    const pool = [];
    let pending = 0;
    const poolFree = [];
    return async (...args) => {
      while (pending >= getPoolSize())
        await new Promise((_2) => poolFree.push(_2));
      pending++;
      const prom = fun(...args);
      prom.then(() => {
        pending--;
        poolFree.forEach((_2) => _2());
        poolFree.length = 0;
      });
      return prom;
    };
  };
  var csettings = localLoad("settingsv2", {});
  settings.subscribe((s) => {
    csettings = s;
  });
  var poolFetch = makePoolable(GM_fetch, () => csettings.conc);

  // src/platform.ts
  var port;
  var lqueue = [];
  if (false) {
    port = browser.runtime.connect();
    port.onMessage.addListener((e) => {
      const k = lqueue.map((f) => f(e));
      for (let i = k.length - 1; i != -1; --i) {
        if (k[i])
          lqueue.splice(i, 1);
      }
    });
  }
  var gid = 0;
  var bridge = (name, f) => {
    if (false)
      return f;
    return (...args) => {
      const id = gid++;
      const prom = new Promise((_2) => {
        lqueue.push((e) => {
          if (e.id != id)
            return false;
          _2(e.res);
          return true;
        });
        port.postMessage({
          id,
          name,
          args
        });
      });
      return prom;
    };
  };
  var Bridged = (ctor) => {
    const keys = Object.getOwnPropertyNames(ctor).filter((k) => typeof ctor[k] == "function");
    for (const k of keys)
      ctor[k] = bridge(k, ctor[k]);
  };
  function supportedAltDomain(s) {
    if (true)
      return GM.info.script.matches.slice(2).some((m) => m.includes(s));
    return false;
  }
  var Platform = class {
    static async openInTab(src, opts) {
      if (true) {
        return GM.openInTab(src, opts);
      }
      const obj = false ? chrome : browser;
      if (false) {
        let i;
        if (opts.insert)
          i = (await obj.tabs.getCurrent()).index + 1;
        return obj.tabs.create({ active: opts.active, url: src, index: i });
      }
    }
  };
  Platform = __decorateClass([
    Bridged
  ], Platform);
  async function getHeaders(s) {
    if (true)
      return headerStringToObject(await GM_head(s));
    const res = await fetch(s, {
      method: "HEAD"
    });
    return [...res.headers.entries()].reduce((a, b) => (a[b[0]] = b[1], a), {});
  }
  async function ifetch(...[url, opt, lisn]) {
    if (false)
      return fetch(url, opt);
    return GM_fetch(url, opt, lisn);
  }
  async function* streamRemote(url, chunkSize = 72 * 1024, fetchRestOnNonCanceled = true) {
    if (false) {
      const res = await fetch(url);
      const reader = res.body;
      const stream = reader?.getReader();
      while (!stream?.closed) {
        const buff = await stream?.read();
        if (buff?.done) {
          break;
        }
        if (buff?.value) {
          const e = yield buff.value;
          if (e) {
            stream?.cancel();
            reader?.cancel();
            break;
          }
        }
      }
      stream?.releaseLock();
      return;
    }
    const headers = await getHeaders(url);
    const size = +headers["content-length"];
    let ptr = 0;
    let fetchSize = chunkSize;
    while (ptr != size) {
      const res = await ifetch(url, { headers: { range: `bytes=${ptr}-${ptr + fetchSize - 1}` } });
      const obj = headerStringToObject(res.responseHeaders);
      if (!("content-length" in obj)) {
        console.warn("no content lenght???", url);
        break;
      }
      const len = +obj["content-length"];
      ptr += len;
      if (fetchRestOnNonCanceled)
        fetchSize = size;
      const val = import_tools.Buffer.from(await res.arrayBuffer());
      const e = yield val;
      if (e) {
        break;
      }
    }
  }

  // src/filehosts.ts
  function parseForm(data) {
    const form = new FormData();
    Object.entries(data).filter(([key, value]) => value !== null).map(([key, value]) => form.append(key, value));
    return form;
  }
  var lolisafe = (domain, serving = domain) => ({
    domain,
    serving,
    async uploadFile(f) {
      const resp = await ifetch(`https://${domain}/api/upload`, {
        headers: {
          accept: "application/json"
        },
        "body": parseForm({
          reqtype: "fileupload",
          "files[]": new File([f], "f.pee")
        }),
        "method": "POST"
      });
      const res = await resp.json();
      return res.files.map((e) => e.url)[0];
    }
  });
  var catbox = (domain, serving) => ({
    domain,
    serving,
    async uploadFile(inj) {
      const resp = await ifetch(`https://${domain}/user/api.php`, {
        method: "POST",
        body: parseForm({
          reqtype: "fileupload",
          fileToUpload: inj
        })
      });
      return resp.text();
    }
  });
  var filehosts = [
    catbox("catbox.moe", "files.catbox.moe"),
    lolisafe("zz.ht", "z.zz.fo"),
    lolisafe("imouto.kawaii.su"),
    lolisafe("take-me-to.space")
  ];

  // node_modules/file-type/browser.js
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var import_node_buffer4 = __toESM(require_buffer(), 1);
  var import_readable_web_to_node_stream = __toESM(require_lib(), 1);

  // node_modules/file-type/core.js
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var import_node_buffer3 = __toESM(require_buffer(), 1);

  // node_modules/token-types/lib/index.js
  init_define_BUILD_VERSION();
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
  init_define_BUILD_VERSION();
  init_esbuild_inject();

  // node_modules/strtok3/lib/ReadStreamTokenizer.js
  init_define_BUILD_VERSION();
  init_esbuild_inject();

  // node_modules/strtok3/lib/AbstractTokenizer.js
  init_define_BUILD_VERSION();
  init_esbuild_inject();

  // node_modules/peek-readable/lib/index.js
  init_define_BUILD_VERSION();
  init_esbuild_inject();

  // node_modules/peek-readable/lib/EndOfFileStream.js
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var defaultMessages = "End-Of-Stream";
  var EndOfStreamError = class extends Error {
    constructor() {
      super(defaultMessages);
    }
  };

  // node_modules/peek-readable/lib/StreamReader.js
  init_define_BUILD_VERSION();
  init_esbuild_inject();

  // node_modules/peek-readable/lib/Deferred.js
  init_define_BUILD_VERSION();
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
  init_define_BUILD_VERSION();
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
  init_define_BUILD_VERSION();
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
  init_define_BUILD_VERSION();
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
        async function readChildren(level, children2) {
          while (children2 > 0) {
            const element2 = await readElement();
            if (element2.id === 17026) {
              const rawValue = await tokenizer.readToken(new StringType(element2.len, "utf-8"));
              return rawValue.replace(/\00.*$/g, "");
            }
            await tokenizer.ignore(element2.len);
            --children2;
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

  // src/utils.ts
  var csettings2;
  settings.subscribe((b) => {
    csettings2 = b;
  });
  var generateThumbnail = async (f) => {
    const can = document.createElement("canvas");
    can.width = 125;
    can.height = 125;
    const [sw, sh] = [125, 125];
    const url = URL.createObjectURL(f);
    let source;
    let iw, ih;
    if (f.type.startsWith("image")) {
      const imgElem = document.createElement("img");
      imgElem.src = url;
      await new Promise((_2) => imgElem.onload = _2);
      [iw, ih] = [imgElem.naturalWidth, imgElem.naturalHeight];
      source = imgElem;
    } else if (f.type.startsWith("video")) {
      const vidElem = document.createElement("video");
      vidElem.src = url;
      await new Promise((_2) => vidElem.onloadedmetadata = _2);
      vidElem.currentTime = 0;
      await new Promise((_2) => vidElem.onloadeddata = _2);
      await new Promise(requestAnimationFrame);
      await new Promise(requestAnimationFrame);
      await new Promise(requestAnimationFrame);
      [iw, ih] = [vidElem.videoWidth, vidElem.videoHeight];
      source = vidElem;
    } else
      return import_buffer2.Buffer.alloc(0);
    const scale = Math.min(1, sw / iw, sh / ih);
    const dims = [~~(iw * scale), ~~(ih * scale)];
    can.width = dims[0];
    can.height = dims[1];
    const ctx = can.getContext("2d");
    if (!ctx)
      return import_buffer2.Buffer.alloc(0);
    ctx.drawImage(source, 0, 0, dims[0], dims[1]);
    const blob = await new Promise((_2) => can.toBlob(_2, "image/jpg"));
    if (!blob)
      return import_buffer2.Buffer.alloc(0);
    return import_buffer2.Buffer.from(await blob.arrayBuffer());
  };
  var buildPeeFile = async (f) => {
    let thumbnail = import_buffer2.Buffer.alloc(0);
    thumbnail = await generateThumbnail(f);
    const namebuf = import_buffer2.Buffer.from(f.name);
    const ret = import_buffer2.Buffer.alloc(4 + 1 + namebuf.byteLength + 1 + (thumbnail.byteLength != 0 ? 4 + thumbnail.byteLength : 0) + f.size);
    let ptr = 0;
    ret.write("PEE\0", 0);
    ptr += 4;
    ret[ptr++] = 1 | +(thumbnail.length != 0) << 2;
    namebuf.copy(ret, ptr);
    ptr += namebuf.byteLength;
    ret[ptr++] = 0;
    if (thumbnail.length > 0) {
      ret.writeInt32LE(thumbnail.byteLength, ptr);
      ptr += 4;
      thumbnail.copy(ret, ptr);
      ptr += thumbnail.byteLength;
    }
    import_buffer2.Buffer.from(await f.arrayBuffer()).copy(ret, ptr);
    return new Blob([ret]);
  };
  var decodeCoom3Payload = async (buff) => {
    const allowed_domains = filehosts.map((e) => e.serving.replaceAll(".", "\\."));
    const pees = buff.toString().split(" ").slice(0, csettings2.maxe).filter((e) => allowed_domains.some((v) => e.match(`https://(.*\\.)?${v}/`)));
    return (await Promise.all(pees.map(async (pee) => {
      try {
        const m = pee.match(/(?<protocol>https?):\/\/(?<domain>.*?)(?<file>\/.*)/);
        if (!m)
          return;
        const { domain, file } = m.groups;
        const headers = await getHeaders(pee);
        const res = await ifetch(pee, {
          headers: { range: "bytes=0-2048", "user-agent": "" },
          mode: "cors",
          referrerPolicy: "no-referrer"
        });
        const size = +headers["content-length"] || 0;
        const header = import_buffer2.Buffer.from(await res.arrayBuffer());
        let hptr = 0;
        if (header.slice(0, 4).toString() == "PEE\0")
          hptr += 4;
        else
          return;
        const flags = header[hptr];
        const hasFn = !!(flags & 1);
        const hasTags = !!(flags & 2);
        const hasThumbnail = !!(flags & 4);
        let [ptr, ptr2] = [hptr + 1, hptr + 1];
        let fn = "embedded";
        let tags = [];
        let thumb = import_buffer2.Buffer.from(hasembed_default);
        if (hasFn) {
          while (header[ptr2] != 0)
            ptr2++;
          fn = header.slice(ptr, ptr2).toString();
          ptr = ++ptr2;
        }
        if (hasTags) {
          while (header[ptr2] != 0)
            ptr2++;
          tags = header.slice(ptr, ptr2).toString().split(/\s+/);
        }
        let thumbsize = 0;
        if (hasThumbnail) {
          thumbsize = header.readInt32LE(ptr);
          ptr += 4;
          if (true)
            thumb = import_buffer2.Buffer.from(await (await ifetch(pee, { headers: { "user-agent": "", range: `bytes=${ptr}-${ptr + thumbsize}` } })).arrayBuffer());
          else
            thumb = `https://loli.piss/${domain}${file}/${ptr}/${ptr + thumbsize}`;
          ptr += thumbsize;
        }
        const unzip = async (lsn) => import_buffer2.Buffer.from(await (await ifetch(pee, { headers: { "user-agent": "", range: `bytes=${ptr}-${size - 1}` } }, lsn)).arrayBuffer());
        let data;
        if (true) {
          data = unzip;
          if (size < 3072) {
            thumb = data = await unzip();
          }
        } else {
          data = `https://loli.piss/${domain}${file}/${ptr}/${size - 1}`;
        }
        return {
          filename: fn,
          data,
          thumbnail: thumb
        };
      } catch (e) {
        console.warn(e);
      }
    }))).filter((e) => e);
  };
  var fireNotification = (type, content, lifetime = 3) => {
    document.dispatchEvent(new CustomEvent("CreateNotification", {
      detail: {
        type,
        content,
        lifetime
      }
    }));
  };
  var uploadFiles = async (injs) => {
    let total = 0;
    fireNotification("info", `Uploading ${injs.length} files...`);
    return await Promise.all(injs.map(async (inj) => {
      const ret = await filehosts[csettings2.fhost || 0].uploadFile(await buildPeeFile(inj));
      fireNotification("info", `Uploaded files [${++total}/${injs.length}] ${ret}`);
      return ret;
    }));
  };
  var getSelectedFile = () => {
    return new Promise((res) => {
      document.addEventListener("QRFile", (e) => res(e.detail), { once: true });
      document.dispatchEvent(new CustomEvent("QRGetFile"));
    });
  };
  async function embeddedToBlob(...efs) {
    return (await Promise.all(efs.map(async (ef) => {
      let buff;
      if (typeof ef.data == "string") {
        const req = await GM_fetch(ef.data);
        buff = import_buffer2.Buffer.from(await req.arrayBuffer());
      } else if (!import_buffer2.Buffer.isBuffer(ef.data))
        buff = await ef.data();
      else
        buff = ef.data;
      const mim = await fileTypeFromBuffer(buff);
      const file = new File([buff], ef.filename, { type: mim?.mime });
      return file;
    }))).filter((e) => e);
  }
  async function addToEmbeds(...efs) {
    const files = await embeddedToBlob(...efs);
    const links = await uploadFiles(files);
    document.dispatchEvent(new CustomEvent("AddPEE", { detail: links }));
  }
  async function getFileFromHydrus(client, tags, args) {
    const results = (await client.idsByTags(tags, args)).file_ids;
    const metas = await client.getMetaDataByIds(results);
    return await Promise.all(results.map(async (id, idx) => {
      return [
        id,
        {
          thumbnail: import_buffer2.Buffer.from(await client.getThumbnail(id)),
          data: async () => import_buffer2.Buffer.from(await client.getFile(id)),
          filename: "file" + metas.metadata[idx].ext
        }
      ];
    }));
  }

  // src/pngv3.ts
  var CUM3 = import_buffer3.Buffer.from("doo\0m");
  var BufferReadStream = (b) => {
    const ret = new ReadableStream({
      pull(cont) {
        cont.enqueue(b);
        cont.close();
      }
    });
    return ret;
  };
  var extract = async (png) => {
    const reader = BufferReadStream(png).getReader();
    const sneed = new PNGDecoder(reader);
    const ret = [];
    try {
      for await (const [name, chunk, crc, offset] of sneed.chunks()) {
        let buff;
        switch (name) {
          case "tEXt":
            buff = await chunk();
            if (buff.slice(4, 4 + CUM3.length).equals(CUM3)) {
              const k = await decodeCoom3Payload(buff.slice(4 + CUM3.length));
              ret.push(...k.filter((e) => e).map((e) => e));
            }
            break;
          case "IDAT":
          case "IEND":
            return ret;
          default:
            break;
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      reader.releaseLock();
    }
  };
  var buildChunk = (tag, data) => {
    const ret = import_buffer3.Buffer.alloc(data.byteLength + 4);
    ret.write(tag.slice(0, 4), 0);
    data.copy(ret, 4);
    return ret;
  };
  var BufferWriteStream2 = () => {
    let b = import_buffer3.Buffer.from([]);
    const ret = new WritableStream({
      write(chunk) {
        b = import_buffer3.Buffer.concat([b, chunk]);
      }
    });
    return [ret, () => b];
  };
  var inject_data = async (container, injb) => {
    let magic2 = false;
    const [writestream, extract6] = BufferWriteStream2();
    const encoder = new PNGEncoder(writestream);
    const decoder = new PNGDecoder(container.stream().getReader());
    for await (const [name, chunk, crc, offset] of decoder.chunks()) {
      if (magic2 && name != "IDAT")
        break;
      if (!magic2 && name == "IDAT") {
        await encoder.insertchunk(["tEXt", async () => buildChunk("tEXt", import_buffer3.Buffer.concat([CUM3, injb])), () => Promise.resolve(0), 0]);
        magic2 = true;
      }
      await encoder.insertchunk([name, chunk, crc, offset]);
    }
    await encoder.insertchunk([
      "IEND",
      async () => Promise.resolve(buildChunk("IEND", import_buffer3.Buffer.from([]))),
      async () => Promise.resolve(0),
      0
    ]);
    return extract6();
  };
  var inject = async (container, links) => {
    const injb = import_buffer3.Buffer.from(links.join(" "));
    return inject_data(container, injb);
  };
  var has_embed = async (png) => {
    const reader = BufferReadStream(png).getReader();
    const sneed = new PNGDecoder(reader);
    try {
      for await (const [name, chunk, crc, offset] of sneed.chunks()) {
        let buff;
        switch (name) {
          case "tEXt":
            buff = await chunk();
            if (buff.slice(4, 4 + CUM3.length).equals(CUM3))
              return true;
            break;
          case "IDAT":
          case "IEND":
            return false;
          default:
            break;
        }
      }
    } catch (e) {
      return;
    } finally {
      reader.releaseLock();
    }
  };
  var pngv3_default = {
    extract,
    has_embed,
    inject,
    match: (fn) => !!fn.match(/\.png$/)
  };

  // src/webm.ts
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var import_buffer4 = __toESM(require_buffer(), 1);
  var ebml = __toESM(require_lib2(), 1);
  var password = import_buffer4.Buffer.from("NOA");
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
          data: import_buffer4.Buffer.from("")
        });
        stack.push({
          type: "m",
          isEnd: true,
          name: n,
          data: import_buffer4.Buffer.from("")
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
        data: import_buffer4.Buffer.from("")
      },
      {
        type: "8",
        isEnd: false,
        name: "TagName",
        data: import_buffer4.Buffer.from("DOOM")
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
        data: import_buffer4.Buffer.from("")
      }
    ]);
    return import_buffer4.Buffer.from(enc.encode(chunks.filter((e) => e.name != "unknown")));
  };
  var extract2 = (webm) => {
    const dec = new ebml.Decoder();
    const chunks = dec.decode(webm);
    const embed2 = chunks.findIndex((e) => e.name == "TagName" && e.type == "8" && e.value == "DOOM");
    const cl = chunks.find((e) => e.name == "Cluster");
    if (cl && embed2 == -1)
      return;
    if (embed2 == -1)
      return;
    const chk = chunks[embed2 + 1];
    if (chk.type == "b" && chk.name == "TagBinary")
      return decodeCoom3Payload(chk.data);
  };
  var inject2 = async (container, links) => {
    return embed(import_buffer4.Buffer.from(await container.arrayBuffer()), import_buffer4.Buffer.from(links.join(" ")));
  };
  var has_embed2 = (webm) => {
    const dec = new ebml.Decoder();
    const chunks = dec.decode(webm);
    const embed2 = chunks.findIndex((e) => e.name == "TagName" && e.type == "8" && e.value == "DOOM");
    const cl = chunks.find((e) => e.name == "Cluster");
    if (cl && embed2 == -1)
      return false;
    if (embed2 == -1)
      return;
    return true;
  };
  var webm_default = {
    extract: extract2,
    has_embed: has_embed2,
    inject: inject2,
    match: (fn) => !!fn.match(/\.webm$/)
  };

  // src/gif.ts
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var import_buffer5 = __toESM(require_buffer(), 1);
  var netscape = import_buffer5.Buffer.from("!\xFF\vNETSCAPE2.0", "ascii");
  var magic = import_buffer5.Buffer.from("!\xFF\vDOOMTECH1.1", "ascii");
  var read_section = (gif, pos) => {
    const begin = pos;
    pos += 3 + gif[pos + 2];
    let buf2 = import_buffer5.Buffer.alloc(0);
    while (pos < gif.byteLength) {
      const v = gif[pos++];
      buf2 = import_buffer5.Buffer.concat([buf2, gif.slice(pos, pos + v)]);
      if (v == 0)
        break;
      pos += v;
    }
    const appname = gif.slice(begin + 3, begin + 11).toString("ascii");
    return {
      appname,
      data: buf2,
      end: pos
    };
  };
  var extractBuff = (gif) => {
    const field = gif.readUInt8(10);
    const gcte = !!(field & 1 << 7);
    let end = 13;
    if (gcte) {
      end += 3 * (1 << (field & 7) + 1);
    }
    while (gif[end] == "!".charCodeAt(0)) {
      let sec = read_section(gif, end);
      if (sec.appname == "DOOMTECH") {
        const ret = import_buffer5.Buffer.alloc(sec.data.readInt32LE(0));
        let ptr = 0;
        do {
          sec = read_section(gif, sec.end);
          sec.data.copy(ret, ptr);
          ptr += sec.data.byteLength;
          end = sec.end;
        } while (sec.appname == "DOOMTECH" && gif[end] == "!".charCodeAt(0));
        return decodeCoom3Payload(ret);
      }
      end = sec.end;
    }
    throw new Error("Shouldn't happen");
  };
  var extract3 = extractBuff;
  var write_data = async (writer, inj) => {
    await writer.write(magic);
    const byte = import_buffer5.Buffer.from([0]);
    let size = inj.byteLength;
    let ws;
    let offset = 0;
    while (size != 0) {
      ws = size >= 255 ? 255 : size;
      byte.writeUInt8(ws, 0);
      await writer.write(byte);
      await writer.write(inj.slice(offset, offset + ws));
      size -= ws;
      offset += ws;
    }
    byte.writeUInt8(0, 0);
    await writer.write(byte);
  };
  var write_embedding = async (writer, inj) => {
    const b = import_buffer5.Buffer.alloc(4);
    b.writeInt32LE(inj.byteLength, 0);
    await write_data(writer, b);
    let size = inj.byteLength;
    let offset = 0;
    while (size != 0) {
      const ws = size >= 3 << 13 ? 3 << 13 : size;
      await write_data(writer, inj.slice(offset, offset + ws));
      offset += ws;
      size -= ws;
    }
  };
  var inject3 = async (container, links) => {
    const [writestream, extract6] = BufferWriteStream();
    const writer = writestream.getWriter();
    const inj = import_buffer5.Buffer.from(links.join(" "));
    const contbuff = import_buffer5.Buffer.from(await container.arrayBuffer());
    const field = contbuff.readUInt8(10);
    const gcte = !!(field & 1 << 7);
    let endo = 13;
    if (gcte)
      endo += 3 * (1 << (field & 7) + 1);
    if (netscape.compare(contbuff, endo, endo + netscape.byteLength) == 0)
      endo += 19;
    await writer.write(contbuff.slice(0, endo));
    await write_embedding(writer, import_buffer5.Buffer.from(inj));
    await writer.write(contbuff.slice(endo));
    return extract6();
  };
  var has_embed3 = (gif) => {
    const field = gif.readUInt8(10);
    const gcte = !!(field & 1 << 7);
    let end = 13;
    if (gcte) {
      end += 3 * (1 << (field & 7) + 1);
    }
    while (end < gif.byteLength && gif.readUInt8(end) == "!".charCodeAt(0)) {
      if (magic.compare(gif, end, end + magic.byteLength) != 0) {
        end += 3 + gif.readUInt8(end + 2);
        while (true) {
          const v = gif.readUInt8(end++);
          if (!v)
            break;
          end += v;
        }
      } else {
        return true;
      }
    }
    if (end >= gif.byteLength)
      return;
    return false;
  };
  var gif_default = {
    extract: extract3,
    has_embed: has_embed3,
    inject: inject3,
    match: (fn) => !!fn.match(/\.gif$/)
  };

  // src/jpg.ts
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var import_buffer6 = __toESM(require_buffer(), 1);
  var convertToPng = async (f) => {
    const can = document.createElement("canvas");
    const url = URL.createObjectURL(f);
    try {
      let dims;
      let source;
      if (f.type.startsWith("image")) {
        const imgElem = document.createElement("img");
        imgElem.src = url;
        await new Promise((_2) => imgElem.onload = _2);
        dims = [imgElem.naturalWidth, imgElem.naturalHeight];
        source = imgElem;
      } else if (f.type.startsWith("video")) {
        const vidElem = document.createElement("video");
        vidElem.src = url;
        await new Promise((_2) => vidElem.onloadedmetadata = _2);
        vidElem.currentTime = 0;
        await new Promise((_2) => vidElem.onloadeddata = _2);
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
      const blob = await new Promise((_2) => can.toBlob(_2, "image/png"));
      if (!blob)
        return;
      return blob;
    } finally {
      URL.revokeObjectURL(url);
    }
  };
  var inject4 = async (b, links) => {
    const pngfile = await convertToPng(b);
    if (!pngfile || pngfile.size > 3e3 * 1024) {
      throw new Error("Couldn't convert file to PNG: resulting filesize too big.");
    }
    return pngv3_default.inject(new File([pngfile], b.name), links);
  };
  var jpg_default = {
    skip: true,
    match: (fn) => !!fn.match(/\.jpe?g$/),
    has_embed: () => false,
    extract: () => [],
    inject: inject4
  };

  // src/thirdeye.ts
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var import_buffer7 = __toESM(require_buffer(), 1);
  var import_jpeg_js = __toESM(require_jpeg_js(), 1);

  // src/phash.ts
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var median = (data) => {
    const mdarr = data.slice(0);
    mdarr.sort((a, b) => a - b);
    if (mdarr.length % 2 === 0)
      return (mdarr[mdarr.length / 2 - 1] + mdarr[mdarr.length / 2]) / 2;
    return mdarr[Math.floor(mdarr.length / 2)];
  };
  var translate_blocks_to_bits = function(blocks, pixels_per_block) {
    const half_block_value = pixels_per_block * 256 * 3 / 2;
    const bandsize = blocks.length / 4;
    for (let i = 0; i < 4; i++) {
      const m = median(blocks.slice(i * bandsize, (i + 1) * bandsize));
      for (let j = i * bandsize; j < (i + 1) * bandsize; j++) {
        const v = blocks[j];
        blocks[j] = Number(v > m || Math.abs(v - m) < 1 && m > half_block_value);
      }
    }
  };
  var bits_to_hexhash = (bitsArray) => {
    const hex = [];
    for (let i = 0; i < bitsArray.length; i += 4) {
      const nibble = bitsArray.slice(i, i + 4);
      hex.push(parseInt(nibble.join(""), 2).toString(16));
    }
    return hex.join("");
  };
  var bmvbhash_even = (data, bits) => {
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

  // src/thirdeye.ts
  var csettings3;
  settings.subscribe((b) => {
    csettings3 = b;
  });
  var gelquirk = (prefix) => (a) => {
    let base = a.post || a.data || a;
    if (!Array.isArray(base))
      return [];
    base = base.filter((e) => e.file_url);
    return base.map((e) => ({
      full_url: e.file_url,
      preview_url: e.preview_url || e.preview_url,
      source: e.source,
      ext: e.file_ext || e.file_url.substr(e.file_url.lastIndexOf(".") + 1),
      page: `${prefix}${e.id || e.parent_id}`,
      tags: (e.tag_string || (e.tags && (Array.isArray(e.tags) && (typeof e.tags[0] == "string" ? e.tags.join(" ") : e.tags.map((e2) => e2.name_en).join(" "))) || e.tags) || "").split(" ")
    })) || [];
  };
  var experimentalApi = false;
  var black = /* @__PURE__ */ new Set();
  var phashEn = false;
  var mindist = 5;
  settings.subscribe((s) => {
    experimentalApi = s.expte;
    boorus = s.rsources.map((e) => ({
      ...e,
      quirks: gelquirk(e.view)
    }));
    black = new Set(s.blacklist);
    mindist = s.mdist || 5;
    phashEn = s.phash;
  });
  var boorus = localLoad("settingsv2", { rsources: [] }).rsources.map((e) => ({
    ...e,
    quirks: gelquirk(e.view)
  }));
  var unlockQueue = Promise.resolve();
  var cache = {};
  var findFileFrom = async (b, hex, abort) => {
    try {
      if (b.domain in cache && hex in cache[b.domain])
        return cache[b.domain][hex];
      const res = await ifetch(`https://${b.domain}${b.endpoint}${hex}`);
      const pres = await res.json();
      const tran = b.quirks(pres).filter((e) => !e.tags.some((e2) => black.has(e2)));
      if (!(b.domain in cache))
        cache[b.domain] = {};
      cache[b.domain][hex] = tran;
      return tran;
    } catch (e) {
      console.error("The following error might be expected");
      console.error(e);
      return [];
    }
  };
  var extract4 = async (b, fn) => {
    let result;
    let booru;
    for (const e of Object.values(boorus)) {
      if (e.disabled)
        continue;
      result = await findFileFrom(e, fn.substring(0, 32));
      if (result.length) {
        booru = e.name;
        break;
      }
    }
    let cachedFile;
    const prev = result[0].preview_url;
    const full = result[0].full_url;
    return [{
      source: result[0].source,
      page: {
        title: booru,
        url: result[0].page
      },
      filename: fn.substring(0, 33) + result[0].ext,
      thumbnail: csettings3.hotlink ? prev || full : import_buffer7.Buffer.from(await (await ifetch(prev || full)).arrayBuffer()),
      data: csettings3.hotlink ? full || prev : async (lsn) => {
        if (!cachedFile)
          cachedFile = await (await ifetch(full || prev, void 0, lsn)).arrayBuffer();
        return import_buffer7.Buffer.from(cachedFile);
      }
    }];
  };
  var phash = (b) => {
    const res = import_jpeg_js.default.decode(b);
    return bmvbhash_even(res, 8);
  };
  var hammingDist = (a, b) => {
    let res = BigInt("0x" + a) ^ BigInt("0x" + b);
    let acc = 0;
    while (res != 0n) {
      acc += Number(res & 1n);
      res >>= 1n;
    }
    return acc;
  };
  var has_embed4 = async (b, fn, prevlink) => {
    if (import_buffer7.Buffer.from(fn, "hex").equals(b))
      return false;
    let result = void 0;
    for (const e of Object.values(boorus)) {
      if (e.disabled)
        continue;
      result = await findFileFrom(e, fn.substring(0, 32));
      result = result.filter((e2) => e2.full_url || e2.preview_url);
      if (result.length)
        break;
    }
    if (result && result.length != 0 && phashEn && prevlink) {
      const getHash = async (l) => {
        const ogreq = await ifetch(l);
        const origPreview = await ogreq.arrayBuffer();
        return phash(import_buffer7.Buffer.from(origPreview));
      };
      const [orighash, tehash] = await Promise.all([
        getHash(prevlink),
        getHash(result[0].preview_url)
      ]);
      const d = hammingDist(orighash, tehash);
      console.log(d, prevlink);
      return d > mindist;
    }
    return result && result.length != 0;
  };
  var thirdeye_default = {
    skip: true,
    extract: extract4,
    has_embed: has_embed4,
    match: (fn) => !!fn.match(/^[0-9a-f]{32}\.....?/)
  };

  // src/pomf.ts
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var import_buffer8 = __toESM(require_buffer(), 1);
  var sources = [
    { host: "Catbox", prefix: "files.catbox.moe/" },
    { host: "Litter", prefix: "litter.catbox.moe/" },
    { host: "Zzzz", prefix: "z.zz.fo/" }
  ];
  var csettings4;
  settings.subscribe((b) => {
    csettings4 = b;
  });
  var getExt = (fn) => {
    const isB64 = fn.match(/^((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=))?\.(gif|jpe?g|png|webm)/);
    const isExt = fn.match(/\[.*=(.*)\]/);
    let ext;
    let source;
    try {
      if (isB64) {
        ext = atob(isB64[1]);
      } else if (isExt) {
        ext = decodeURIComponent(isExt[1]);
        if (ext.startsWith("https://"))
          ext = ext.slice("https://".length);
        for (const cs of sources)
          if (ext.startsWith(cs.prefix)) {
            source = cs.prefix;
            ext = ext.slice(cs.prefix.length);
            break;
          }
      }
    } catch {
    }
    return { ext, source };
  };
  var extract5 = async (b, fn) => {
    const { ext, source } = getExt(fn);
    let rsource;
    for (const cs of sources) {
      if (source && cs.prefix != source)
        continue;
      try {
        await getHeaders("https://" + cs.prefix + ext);
        rsource = "https://" + cs.prefix + ext;
        break;
      } catch {
      }
    }
    return [{
      filename: ext,
      data: csettings4.hotlink ? rsource : async (lsn) => {
        try {
          return import_buffer8.Buffer.from(await (await ifetch(rsource, void 0, lsn)).arrayBuffer());
        } catch (e) {
        }
      },
      thumbnail: import_buffer8.Buffer.from(hasembed_default)
    }];
  };
  var has_embed5 = async (b, fn) => {
    const { ext, source } = getExt(fn);
    if (!ext)
      return false;
    for (const cs of sources) {
      if (source && cs.prefix != source)
        continue;
      try {
        const e = await getHeaders("https://" + cs.prefix + ext);
        return true;
      } catch {
      }
    }
    return false;
  };
  var pomf_default = {
    skip: true,
    extract: extract5,
    has_embed: has_embed5,
    match: (fn) => !!getExt(fn)
  };

  // src/Components/App.svelte
  init_define_BUILD_VERSION();
  init_esbuild_inject();

  // node_modules/svelte/index.mjs
  init_define_BUILD_VERSION();
  init_esbuild_inject();

  // src/Components/Dialog.svelte
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  function add_css(target) {
    append_styles(target, "svelte-1edrz51", ".dialog.svelte-1edrz51{position:relative}");
  }
  function create_if_block(ctx) {
    let div;
    let current;
    const default_slot_template = ctx[5].default;
    const default_slot = create_slot(default_slot_template, ctx, ctx[4], null);
    return {
      c() {
        div = element("div");
        if (default_slot)
          default_slot.c();
        set_style(div, "top", ctx[0][1] + "px");
        set_style(div, "left", ctx[0][0] + "px");
        attr(div, "class", "dialog svelte-1edrz51");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        if (default_slot) {
          default_slot.m(div, null);
        }
        current = true;
      },
      p(ctx2, dirty) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & 16)) {
            update_slot_base(default_slot, default_slot_template, ctx2, ctx2[4], !current ? get_all_dirty_from_scope(ctx2[4]) : get_slot_changes(default_slot_template, ctx2[4], dirty, null), null);
          }
        }
        if (!current || dirty & 1) {
          set_style(div, "top", ctx2[0][1] + "px");
        }
        if (!current || dirty & 1) {
          set_style(div, "left", ctx2[0][0] + "px");
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(div);
        if (default_slot)
          default_slot.d(detaching);
      }
    };
  }
  function create_fragment(ctx) {
    let if_block_anchor;
    let current;
    let if_block = ctx[1] && create_if_block(ctx);
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (ctx2[1]) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & 2) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function setPos(p) {
  }
  function instance($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    let { pos = [0, 0] } = $$props;
    let visible = false;
    function toggle() {
      $$invalidate(1, visible = !visible);
    }
    $$self.$$set = ($$props2) => {
      if ("pos" in $$props2)
        $$invalidate(0, pos = $$props2.pos);
      if ("$$scope" in $$props2)
        $$invalidate(4, $$scope = $$props2.$$scope);
    };
    return [pos, visible, toggle, setPos, $$scope, slots];
  }
  var Dialog = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance, create_fragment, safe_not_equal, { pos: 0, toggle: 2, setPos: 3 }, add_css);
    }
    get pos() {
      return this.$$.ctx[0];
    }
    set pos(pos) {
      this.$$set({ pos });
      flush();
    }
    get toggle() {
      return this.$$.ctx[2];
    }
    get setPos() {
      return setPos;
    }
  };
  var Dialog_default = Dialog;

  // src/Components/Tag.svelte
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  function add_css2(target) {
    append_styles(target, "svelte-gsq99c", ".tag.svelte-gsq99c.svelte-gsq99c{padding:5px;border:1px solid;border-radius:55px;cursor:pointer;display:inline-flex}.tag.toggled.svelte-gsq99c.svelte-gsq99c{background-color:rgb(213, 255, 212)}span.tag.svelte-gsq99c>span.svelte-gsq99c{margin-left:5px;border-left:1px solid;padding-left:5px}.tag.toggled.svelte-gsq99c.svelte-gsq99c:hover{color:white;background-color:rgb(255 156 156 / 80%);color:white}.tag.svelte-gsq99c.svelte-gsq99c:not(.toggled):hover{color:white;background-color:rgb(213, 255, 212);color:white}");
  }
  function create_if_block2(ctx) {
    let span;
    let mounted;
    let dispose;
    return {
      c() {
        span = element("span");
        span.textContent = "x";
        attr(span, "class", "svelte-gsq99c");
      },
      m(target, anchor) {
        insert(target, span, anchor);
        if (!mounted) {
          dispose = listen(span, "click", ctx[4]);
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching)
          detach(span);
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment2(ctx) {
    let span;
    let t0;
    let t1;
    let mounted;
    let dispose;
    let if_block = ctx[1] && create_if_block2(ctx);
    return {
      c() {
        span = element("span");
        t0 = text(ctx[0]);
        t1 = space();
        if (if_block)
          if_block.c();
        attr(span, "class", "tag svelte-gsq99c");
        toggle_class(span, "toggle", ctx[1]);
        toggle_class(span, "toggled", ctx[1] && ctx[2]);
      },
      m(target, anchor) {
        insert(target, span, anchor);
        append(span, t0);
        append(span, t1);
        if (if_block)
          if_block.m(span, null);
        if (!mounted) {
          dispose = listen(span, "click", ctx[5]);
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & 1)
          set_data(t0, ctx2[0]);
        if (ctx2[1]) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block2(ctx2);
            if_block.c();
            if_block.m(span, null);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
        if (dirty & 2) {
          toggle_class(span, "toggle", ctx2[1]);
        }
        if (dirty & 6) {
          toggle_class(span, "toggled", ctx2[1] && ctx2[2]);
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(span);
        if (if_block)
          if_block.d();
        mounted = false;
        dispose();
      }
    };
  }
  function instance2($$self, $$props, $$invalidate) {
    let { tag } = $$props;
    let { toggleable = false } = $$props;
    let { toggled = false } = $$props;
    const dispatch = createEventDispatcher();
    const click_handler2 = (e) => (e.preventDefault(), dispatch("remove"));
    const click_handler_1 = () => dispatch("toggle");
    $$self.$$set = ($$props2) => {
      if ("tag" in $$props2)
        $$invalidate(0, tag = $$props2.tag);
      if ("toggleable" in $$props2)
        $$invalidate(1, toggleable = $$props2.toggleable);
      if ("toggled" in $$props2)
        $$invalidate(2, toggled = $$props2.toggled);
    };
    return [tag, toggleable, toggled, dispatch, click_handler2, click_handler_1];
  }
  var Tag = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance2, create_fragment2, safe_not_equal, { tag: 0, toggleable: 1, toggled: 2 }, add_css2);
    }
    get tag() {
      return this.$$.ctx[0];
    }
    set tag(tag) {
      this.$$set({ tag });
      flush();
    }
    get toggleable() {
      return this.$$.ctx[1];
    }
    set toggleable(toggleable) {
      this.$$set({ toggleable });
      flush();
    }
    get toggled() {
      return this.$$.ctx[2];
    }
    set toggled(toggled) {
      this.$$set({ toggled });
      flush();
    }
  };
  var Tag_default = Tag;

  // src/Components/Tabs.svelte
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  function add_css3(target) {
    append_styles(target, "svelte-16zoarp", ".tabs.svelte-16zoarp{display:flex;flex-direction:column;gap:5px}");
  }
  function create_fragment3(ctx) {
    let div;
    let current;
    const default_slot_template = ctx[1].default;
    const default_slot = create_slot(default_slot_template, ctx, ctx[0], null);
    return {
      c() {
        div = element("div");
        if (default_slot)
          default_slot.c();
        attr(div, "class", "tabs svelte-16zoarp");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        if (default_slot) {
          default_slot.m(div, null);
        }
        current = true;
      },
      p(ctx2, [dirty]) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & 1)) {
            update_slot_base(default_slot, default_slot_template, ctx2, ctx2[0], !current ? get_all_dirty_from_scope(ctx2[0]) : get_slot_changes(default_slot_template, ctx2[0], dirty, null), null);
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(div);
        if (default_slot)
          default_slot.d(detaching);
      }
    };
  }
  var TABS = {};
  function instance3($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    const tabs = [];
    const panels = [];
    const selectedTab = writable(null);
    const selectedPanel = writable(null);
    setContext(TABS, {
      registerTab: (tab) => {
        tabs.push(tab);
        selectedTab.update((current) => current || tab);
        onDestroy(() => {
          const i = tabs.indexOf(tab);
          tabs.splice(i, 1);
          selectedTab.update((current) => current === tab ? tabs[i] || tabs[tabs.length - 1] : current);
        });
      },
      registerPanel: (panel) => {
        panels.push(panel);
        selectedPanel.update((current) => current || panel);
        onDestroy(() => {
          const i = panels.indexOf(panel);
          panels.splice(i, 1);
          selectedPanel.update((current) => current === panel ? panels[i] || panels[panels.length - 1] : current);
        });
      },
      selectTab: (tab) => {
        const i = tabs.indexOf(tab);
        selectedTab.set(tab);
        selectedPanel.set(panels[i]);
      },
      selectedTab,
      selectedPanel
    });
    $$self.$$set = ($$props2) => {
      if ("$$scope" in $$props2)
        $$invalidate(0, $$scope = $$props2.$$scope);
    };
    return [$$scope, slots];
  }
  var Tabs = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance3, create_fragment3, safe_not_equal, {}, add_css3);
    }
  };
  var Tabs_default = Tabs;

  // src/Components/TabList.svelte
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  function add_css4(target) {
    append_styles(target, "svelte-1dd6kkg", ".tab-list.svelte-1dd6kkg{border-bottom:1px solid}");
  }
  function create_fragment4(ctx) {
    let div;
    let current;
    const default_slot_template = ctx[1].default;
    const default_slot = create_slot(default_slot_template, ctx, ctx[0], null);
    return {
      c() {
        div = element("div");
        if (default_slot)
          default_slot.c();
        attr(div, "class", "tab-list svelte-1dd6kkg");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        if (default_slot) {
          default_slot.m(div, null);
        }
        current = true;
      },
      p(ctx2, [dirty]) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & 1)) {
            update_slot_base(default_slot, default_slot_template, ctx2, ctx2[0], !current ? get_all_dirty_from_scope(ctx2[0]) : get_slot_changes(default_slot_template, ctx2[0], dirty, null), null);
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(div);
        if (default_slot)
          default_slot.d(detaching);
      }
    };
  }
  function instance4($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    $$self.$$set = ($$props2) => {
      if ("$$scope" in $$props2)
        $$invalidate(0, $$scope = $$props2.$$scope);
    };
    return [$$scope, slots];
  }
  var TabList = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance4, create_fragment4, safe_not_equal, {}, add_css4);
    }
  };
  var TabList_default = TabList;

  // src/Components/Tab.svelte
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  function add_css5(target) {
    append_styles(target, "svelte-1i25yaz", "button.svelte-1i25yaz{background:none;border:none;border-bottom:2px solid white;border-radius:0;margin:0;color:unset}button.svelte-1i25yaz:hover{cursor:pointer;background-color:#8d8d8d80}.selected.svelte-1i25yaz{border-bottom:2px solid;color:#f6ff76}");
  }
  function create_fragment5(ctx) {
    let button;
    let current;
    let mounted;
    let dispose;
    const default_slot_template = ctx[5].default;
    const default_slot = create_slot(default_slot_template, ctx, ctx[4], null);
    return {
      c() {
        button = element("button");
        if (default_slot)
          default_slot.c();
        attr(button, "class", "svelte-1i25yaz");
        toggle_class(button, "selected", ctx[0] === ctx[1]);
      },
      m(target, anchor) {
        insert(target, button, anchor);
        if (default_slot) {
          default_slot.m(button, null);
        }
        current = true;
        if (!mounted) {
          dispose = listen(button, "click", ctx[6]);
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & 16)) {
            update_slot_base(default_slot, default_slot_template, ctx2, ctx2[4], !current ? get_all_dirty_from_scope(ctx2[4]) : get_slot_changes(default_slot_template, ctx2[4], dirty, null), null);
          }
        }
        if (dirty & 3) {
          toggle_class(button, "selected", ctx2[0] === ctx2[1]);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(button);
        if (default_slot)
          default_slot.d(detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function instance5($$self, $$props, $$invalidate) {
    let $selectedTab;
    let { $$slots: slots = {}, $$scope } = $$props;
    const tab = {};
    const { registerTab, selectTab, selectedTab } = getContext(TABS);
    component_subscribe($$self, selectedTab, (value) => $$invalidate(0, $selectedTab = value));
    registerTab(tab);
    const click_handler2 = () => selectTab(tab);
    $$self.$$set = ($$props2) => {
      if ("$$scope" in $$props2)
        $$invalidate(4, $$scope = $$props2.$$scope);
    };
    return [$selectedTab, tab, selectTab, selectedTab, $$scope, slots, click_handler2];
  }
  var Tab = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance5, create_fragment5, safe_not_equal, {}, add_css5);
    }
  };
  var Tab_default = Tab;

  // src/Components/TabPanel.svelte
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  function create_if_block3(ctx) {
    let current;
    const default_slot_template = ctx[4].default;
    const default_slot = create_slot(default_slot_template, ctx, ctx[3], null);
    return {
      c() {
        if (default_slot)
          default_slot.c();
      },
      m(target, anchor) {
        if (default_slot) {
          default_slot.m(target, anchor);
        }
        current = true;
      },
      p(ctx2, dirty) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & 8)) {
            update_slot_base(default_slot, default_slot_template, ctx2, ctx2[3], !current ? get_all_dirty_from_scope(ctx2[3]) : get_slot_changes(default_slot_template, ctx2[3], dirty, null), null);
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (default_slot)
          default_slot.d(detaching);
      }
    };
  }
  function create_fragment6(ctx) {
    let if_block_anchor;
    let current;
    let if_block = ctx[0] === ctx[1] && create_if_block3(ctx);
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (ctx2[0] === ctx2[1]) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & 1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block3(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function instance6($$self, $$props, $$invalidate) {
    let $selectedPanel;
    let { $$slots: slots = {}, $$scope } = $$props;
    const panel = {};
    const { registerPanel, selectedPanel } = getContext(TABS);
    component_subscribe($$self, selectedPanel, (value) => $$invalidate(0, $selectedPanel = value));
    registerPanel(panel);
    $$self.$$set = ($$props2) => {
      if ("$$scope" in $$props2)
        $$invalidate(3, $$scope = $$props2.$$scope);
    };
    return [$selectedPanel, panel, selectedPanel, $$scope, slots];
  }
  var TabPanel = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance6, create_fragment6, safe_not_equal, {});
    }
  };
  var TabPanel_default = TabPanel;

  // src/Components/HydrusSearch.svelte
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var import_lodash = __toESM(require_lodash(), 1);

  // src/Components/Embedding.svelte
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var import_buffer9 = __toESM(require_buffer(), 1);
  function add_css6(target) {
    append_styles(target, "svelte-yvh28x", ".place.svelte-yvh28x.svelte-yvh28x{cursor:pointer;max-width:100vw;max-height:100vh}.unzipping.svelte-yvh28x>img.svelte-yvh28x{filter:brightness(0.5) blur(10px)}.progress.svelte-yvh28x.svelte-yvh28x{color:black;-webkit-text-stroke:0.7px white;font-weight:bold;left:50%;top:50%;font-size:larger;display:inline-block;position:absolute;z-index:10}.hoverer.svelte-yvh28x.svelte-yvh28x{display:none;position:fixed;pointer-events:none}.visible.svelte-yvh28x.svelte-yvh28x{display:block;z-index:9}.contract.svelte-yvh28x img.svelte-yvh28x,.contract.svelte-yvh28x video.svelte-yvh28x{max-width:125px !important;max-height:125px !important;width:auto;height:auto}.place.svelte-yvh28x:not(.contract) video.svelte-yvh28x,.place.svelte-yvh28x:not(.contract) img.svelte-yvh28x,.hoverer.svelte-yvh28x>video.svelte-yvh28x,.hoverer.svelte-yvh28x>img.svelte-yvh28x{max-width:100vw;max-height:100vh}");
  }
  function create_if_block4(ctx) {
    let if_block_anchor;
    let if_block = (!ctx[19].eye || ctx[16]) && create_if_block_1(ctx);
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (!ctx2[19].eye || ctx2[16]) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_1(ctx2);
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      d(detaching) {
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function create_if_block_1(ctx) {
    let div0;
    let t0;
    let t1;
    let t2;
    let div1;
    let t3;
    let t4;
    let mounted;
    let dispose;
    let if_block0 = ctx[3] && create_if_block_7(ctx);
    let if_block1 = ctx[4] && create_if_block_6(ctx);
    let if_block2 = ctx[2] && create_if_block_5(ctx);
    let if_block3 = ctx[17] && create_if_block_4(ctx);
    let if_block4 = ctx[3] && create_if_block_3(ctx);
    let if_block5 = ctx[2] && create_if_block_2(ctx);
    return {
      c() {
        div0 = element("div");
        if (if_block0)
          if_block0.c();
        t0 = space();
        if (if_block1)
          if_block1.c();
        t1 = space();
        if (if_block2)
          if_block2.c();
        t2 = space();
        div1 = element("div");
        if (if_block3)
          if_block3.c();
        t3 = space();
        if (if_block4)
          if_block4.c();
        t4 = space();
        if (if_block5)
          if_block5.c();
        attr(div0, "class", "place svelte-yvh28x");
        toggle_class(div0, "contract", ctx[7]);
        attr(div1, "class", "hoverer svelte-yvh28x");
        toggle_class(div1, "visible", ctx[8] && ctx[7]);
        toggle_class(div1, "unzipping", ctx[17]);
      },
      m(target, anchor) {
        insert(target, div0, anchor);
        if (if_block0)
          if_block0.m(div0, null);
        append(div0, t0);
        if (if_block1)
          if_block1.m(div0, null);
        append(div0, t1);
        if (if_block2)
          if_block2.m(div0, null);
        ctx[31](div0);
        insert(target, t2, anchor);
        insert(target, div1, anchor);
        if (if_block3)
          if_block3.m(div1, null);
        append(div1, t3);
        if (if_block4)
          if_block4.m(div1, null);
        append(div1, t4);
        if (if_block5)
          if_block5.m(div1, null);
        ctx[33](div1);
        if (!mounted) {
          dispose = [
            listen(div0, "click", click_handler),
            listen(div0, "auxclick", auxclick_handler),
            listen(div0, "mousedown", ctx[1]),
            listen(div0, "mouseover", ctx[20]),
            listen(div0, "mouseout", ctx[21]),
            listen(div0, "mousemove", ctx[22]),
            listen(div0, "wheel", ctx[23])
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (ctx2[3]) {
          if (if_block0) {
            if_block0.p(ctx2, dirty);
          } else {
            if_block0 = create_if_block_7(ctx2);
            if_block0.c();
            if_block0.m(div0, t0);
          }
        } else if (if_block0) {
          if_block0.d(1);
          if_block0 = null;
        }
        if (ctx2[4]) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
          } else {
            if_block1 = create_if_block_6(ctx2);
            if_block1.c();
            if_block1.m(div0, t1);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }
        if (ctx2[2]) {
          if (if_block2) {
            if_block2.p(ctx2, dirty);
          } else {
            if_block2 = create_if_block_5(ctx2);
            if_block2.c();
            if_block2.m(div0, null);
          }
        } else if (if_block2) {
          if_block2.d(1);
          if_block2 = null;
        }
        if (dirty[0] & 128) {
          toggle_class(div0, "contract", ctx2[7]);
        }
        if (ctx2[17]) {
          if (if_block3) {
            if_block3.p(ctx2, dirty);
          } else {
            if_block3 = create_if_block_4(ctx2);
            if_block3.c();
            if_block3.m(div1, t3);
          }
        } else if (if_block3) {
          if_block3.d(1);
          if_block3 = null;
        }
        if (ctx2[3]) {
          if (if_block4) {
            if_block4.p(ctx2, dirty);
          } else {
            if_block4 = create_if_block_3(ctx2);
            if_block4.c();
            if_block4.m(div1, t4);
          }
        } else if (if_block4) {
          if_block4.d(1);
          if_block4 = null;
        }
        if (ctx2[2]) {
          if (if_block5) {
            if_block5.p(ctx2, dirty);
          } else {
            if_block5 = create_if_block_2(ctx2);
            if_block5.c();
            if_block5.m(div1, null);
          }
        } else if (if_block5) {
          if_block5.d(1);
          if_block5 = null;
        }
        if (dirty[0] & 384) {
          toggle_class(div1, "visible", ctx2[8] && ctx2[7]);
        }
        if (dirty[0] & 131072) {
          toggle_class(div1, "unzipping", ctx2[17]);
        }
      },
      d(detaching) {
        if (detaching)
          detach(div0);
        if (if_block0)
          if_block0.d();
        if (if_block1)
          if_block1.d();
        if (if_block2)
          if_block2.d();
        ctx[31](null);
        if (detaching)
          detach(t2);
        if (detaching)
          detach(div1);
        if (if_block3)
          if_block3.d();
        if (if_block4)
          if_block4.d();
        if (if_block5)
          if_block5.d();
        ctx[33](null);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_7(ctx) {
    let img;
    let img_alt_value;
    let img_src_value;
    return {
      c() {
        img = element("img");
        attr(img, "referrerpolicy", "no-referrer");
        attr(img, "alt", img_alt_value = ctx[0].filename);
        if (!src_url_equal(img.src, img_src_value = ctx[15] || ctx[6]))
          attr(img, "src", img_src_value);
        attr(img, "class", "svelte-yvh28x");
      },
      m(target, anchor) {
        insert(target, img, anchor);
        ctx[29](img);
      },
      p(ctx2, dirty) {
        if (dirty[0] & 1 && img_alt_value !== (img_alt_value = ctx2[0].filename)) {
          attr(img, "alt", img_alt_value);
        }
        if (dirty[0] & 32832 && !src_url_equal(img.src, img_src_value = ctx2[15] || ctx2[6])) {
          attr(img, "src", img_src_value);
        }
      },
      d(detaching) {
        if (detaching)
          detach(img);
        ctx[29](null);
      }
    };
  }
  function create_if_block_6(ctx) {
    let audio;
    let source;
    let source_src_value;
    let audio_src_value;
    let audio_loop_value;
    let audio_alt_value;
    return {
      c() {
        audio = element("audio");
        source = element("source");
        if (!src_url_equal(source.src, source_src_value = ctx[15] || ctx[6]))
          attr(source, "src", source_src_value);
        attr(source, "type", ctx[9]);
        attr(audio, "referrerpolicy", "no-referrer");
        audio.controls = true;
        if (!src_url_equal(audio.src, audio_src_value = ctx[15] || ctx[6]))
          attr(audio, "src", audio_src_value);
        audio.loop = audio_loop_value = ctx[19].loop;
        attr(audio, "alt", audio_alt_value = ctx[0].filename);
      },
      m(target, anchor) {
        insert(target, audio, anchor);
        append(audio, source);
      },
      p(ctx2, dirty) {
        if (dirty[0] & 32832 && !src_url_equal(source.src, source_src_value = ctx2[15] || ctx2[6])) {
          attr(source, "src", source_src_value);
        }
        if (dirty[0] & 512) {
          attr(source, "type", ctx2[9]);
        }
        if (dirty[0] & 32832 && !src_url_equal(audio.src, audio_src_value = ctx2[15] || ctx2[6])) {
          attr(audio, "src", audio_src_value);
        }
        if (dirty[0] & 524288 && audio_loop_value !== (audio_loop_value = ctx2[19].loop)) {
          audio.loop = audio_loop_value;
        }
        if (dirty[0] & 1 && audio_alt_value !== (audio_alt_value = ctx2[0].filename)) {
          attr(audio, "alt", audio_alt_value);
        }
      },
      d(detaching) {
        if (detaching)
          detach(audio);
      }
    };
  }
  function create_if_block_5(ctx) {
    let video;
    let source;
    let source_src_value;
    let video_loop_value;
    return {
      c() {
        video = element("video");
        source = element("source");
        attr(source, "referrerpolicy", "no-referrer");
        if (!src_url_equal(source.src, source_src_value = ctx[15] || ctx[6]))
          attr(source, "src", source_src_value);
        attr(video, "type", ctx[9]);
        attr(video, "referrerpolicy", "no-referrer");
        video.loop = video_loop_value = ctx[19].loop;
        attr(video, "class", "svelte-yvh28x");
      },
      m(target, anchor) {
        insert(target, video, anchor);
        append(video, source);
        ctx[30](video);
      },
      p(ctx2, dirty) {
        if (dirty[0] & 32832 && !src_url_equal(source.src, source_src_value = ctx2[15] || ctx2[6])) {
          attr(source, "src", source_src_value);
        }
        if (dirty[0] & 512) {
          attr(video, "type", ctx2[9]);
        }
        if (dirty[0] & 524288 && video_loop_value !== (video_loop_value = ctx2[19].loop)) {
          video.loop = video_loop_value;
        }
      },
      d(detaching) {
        if (detaching)
          detach(video);
        ctx[30](null);
      }
    };
  }
  function create_if_block_4(ctx) {
    let span;
    let t0;
    let t1_value = ctx[18][0] + "";
    let t1;
    let t2;
    let t3_value = ctx[18][1] + "";
    let t3;
    let t4;
    return {
      c() {
        span = element("span");
        t0 = text("[");
        t1 = text(t1_value);
        t2 = text(" / ");
        t3 = text(t3_value);
        t4 = text("]");
        attr(span, "class", "progress svelte-yvh28x");
      },
      m(target, anchor) {
        insert(target, span, anchor);
        append(span, t0);
        append(span, t1);
        append(span, t2);
        append(span, t3);
        append(span, t4);
      },
      p(ctx2, dirty) {
        if (dirty[0] & 262144 && t1_value !== (t1_value = ctx2[18][0] + ""))
          set_data(t1, t1_value);
        if (dirty[0] & 262144 && t3_value !== (t3_value = ctx2[18][1] + ""))
          set_data(t3, t3_value);
      },
      d(detaching) {
        if (detaching)
          detach(span);
      }
    };
  }
  function create_if_block_3(ctx) {
    let img;
    let img_alt_value;
    let img_src_value;
    return {
      c() {
        img = element("img");
        attr(img, "alt", img_alt_value = ctx[0].filename);
        if (!src_url_equal(img.src, img_src_value = ctx[15] || ctx[6]))
          attr(img, "src", img_src_value);
        attr(img, "class", "svelte-yvh28x");
      },
      m(target, anchor) {
        insert(target, img, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & 1 && img_alt_value !== (img_alt_value = ctx2[0].filename)) {
          attr(img, "alt", img_alt_value);
        }
        if (dirty[0] & 32832 && !src_url_equal(img.src, img_src_value = ctx2[15] || ctx2[6])) {
          attr(img, "src", img_src_value);
        }
      },
      d(detaching) {
        if (detaching)
          detach(img);
      }
    };
  }
  function create_if_block_2(ctx) {
    let video;
    let source;
    let source_src_value;
    let video_loop_value;
    return {
      c() {
        video = element("video");
        source = element("source");
        attr(source, "type", ctx[9]);
        if (!src_url_equal(source.src, source_src_value = ctx[15] || ctx[6]))
          attr(source, "src", source_src_value);
        attr(source, "data-test", "");
        video.loop = video_loop_value = ctx[19].loop;
        attr(video, "class", "svelte-yvh28x");
      },
      m(target, anchor) {
        insert(target, video, anchor);
        append(video, source);
        ctx[32](video);
      },
      p(ctx2, dirty) {
        if (dirty[0] & 512) {
          attr(source, "type", ctx2[9]);
        }
        if (dirty[0] & 32832 && !src_url_equal(source.src, source_src_value = ctx2[15] || ctx2[6])) {
          attr(source, "src", source_src_value);
        }
        if (dirty[0] & 524288 && video_loop_value !== (video_loop_value = ctx2[19].loop)) {
          video.loop = video_loop_value;
        }
      },
      d(detaching) {
        if (detaching)
          detach(video);
        ctx[32](null);
      }
    };
  }
  function create_fragment7(ctx) {
    let if_block_anchor;
    let if_block = !ctx[5] && create_if_block4(ctx);
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (!ctx2[5]) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block4(ctx2);
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function hasAudio(video) {
    return video.mozHasAudio || !!video.webkitAudioDecodedByteCount || !!(video.audioTracks && video.audioTracks.length);
  }
  var click_handler = (e) => e.preventDefault();
  var auxclick_handler = (e) => e.preventDefault();
  function instance7($$self, $$props, $$invalidate) {
    let $settings;
    let $appState;
    component_subscribe($$self, settings, ($$value) => $$invalidate(19, $settings = $$value));
    component_subscribe($$self, appState, ($$value) => $$invalidate(38, $appState = $$value));
    const dispatch = createEventDispatcher();
    let { file } = $$props;
    let isVideo = false;
    let isImage = false;
    let isAudio = false;
    let isText = false;
    let url = "";
    let settled = false;
    let contracted = true;
    let hovering = false;
    let ftype = "";
    let place;
    let hoverElem;
    let imgElem;
    let videoElem;
    let hoverVideo;
    let dims = [0, 0];
    let furl = void 0;
    let visible = false;
    const isNotChrome = !navigator.userAgent.includes("Chrome/");
    let { id = "" } = $$props;
    document.addEventListener("reveal", (e) => {
      if (e.detail.id == id)
        $$invalidate(16, visible = !visible);
    });
    function isContracted() {
      return contracted;
    }
    let content;
    beforeUpdate(async () => {
      if (settled)
        return;
      settled = true;
      const thumb = file.thumbnail || file.data;
      let type;
      if (typeof thumb != "string") {
        let buff = import_buffer9.Buffer.isBuffer(thumb) ? thumb : await thumb();
        type = await fileTypeFromBuffer(buff);
        if (!type && file.filename.endsWith(".txt") && file.filename.startsWith("message")) {
          type = { ext: "txt", mime: "text/plain" };
        }
        content = new Blob([buff], { type: type?.mime });
        $$invalidate(6, url = URL.createObjectURL(content));
        if (!type)
          return;
      } else {
        let head = await getHeaders(thumb);
        $$invalidate(6, url = thumb);
        type = {
          ext: "",
          mime: head["content-type"].split(";")[0].trim()
        };
      }
      $$invalidate(9, ftype = type.mime);
      $$invalidate(2, isVideo = type.mime.startsWith("video/"));
      $$invalidate(4, isAudio = type.mime.startsWith("audio/"));
      $$invalidate(3, isImage = type.mime.startsWith("image/"));
      $$invalidate(5, isText = type.mime.startsWith("text/plain"));
      dispatch("fileinfo", { type });
      if (isImage) {
        $$invalidate(7, contracted = !$settings.xpi);
      }
      if (isVideo) {
        $$invalidate(7, contracted = !$settings.xpv && !$appState.isCatalog);
      }
      if ($appState.isCatalog)
        $$invalidate(7, contracted = true);
      if ($settings.pre) {
        unzip();
      }
      if ($settings.prev) {
        let obs = new IntersectionObserver((entries, obs2) => {
          for (const item of entries) {
            if (!item.isIntersecting)
              continue;
            unzip();
            obs2.unobserve(place);
          }
        }, {
          root: null,
          rootMargin: "0px",
          threshold: 0.01
        });
        obs.observe(place);
      }
    });
    let unzipping = false;
    let progress = [0, 0];
    async function unzip() {
      if (!file.thumbnail)
        return;
      if (unzipping)
        return;
      let type;
      if (typeof file.data != "string") {
        $$invalidate(17, unzipping = true);
        let lisn = new EventTarget();
        lisn.addEventListener("progress", (e) => {
          $$invalidate(18, progress = e.detail);
        });
        let full = import_buffer9.Buffer.isBuffer(file.data) ? file.data : await file.data(lisn);
        type = await fileTypeFromBuffer(full);
        if (!type && file.filename.endsWith(".txt") && file.filename.startsWith("message")) {
          type = { ext: "txt", mime: "text/plain" };
        }
        content = new Blob([full], { type: type?.mime });
        $$invalidate(15, furl = URL.createObjectURL(content));
      } else {
        $$invalidate(6, url = file.data);
        $$invalidate(15, furl = file.data);
        let head = await getHeaders(file.data);
        type = {
          ext: "",
          mime: head["content-type"].split(";")[0].trim()
        };
      }
      if (!type)
        return;
      $$invalidate(9, ftype = type.mime);
      $$invalidate(2, isVideo = type.mime.startsWith("video/"));
      $$invalidate(4, isAudio = type.mime.startsWith("audio/"));
      $$invalidate(3, isImage = type.mime.startsWith("image/"));
      $$invalidate(5, isText = type.mime.startsWith("text/plain"));
      $$invalidate(17, unzipping = false);
      dispatch("fileinfo", { type });
      if (hovering) {
        setTimeout(async () => {
          do {
            hoverUpdate();
            await new Promise((_2) => setTimeout(_2, 20));
          } while (dims[0] == 0 && dims[1] == 0);
        }, 20);
      }
    }
    let { inhibitExpand = false } = $$props;
    async function bepis(ev) {
      dispatch("click");
      if (inhibitExpand)
        return;
      if ($appState.isCatalog)
        return;
      if (ev.button == 0) {
        $$invalidate(7, contracted = !contracted);
        if (hovering)
          hoverStop();
        if (contracted && isVideo) {
          $$invalidate(13, videoElem.controls = false, videoElem);
          videoElem.pause();
        }
        if (!contracted && isVideo) {
          $$invalidate(13, videoElem.controls = true, videoElem);
          setTimeout(async () => {
            $$invalidate(13, videoElem.currentTime = hoverVideo.currentTime || 0, videoElem);
            await videoElem.play();
          }, 10);
        }
        if (file.thumbnail && !furl) {
          unzip();
        }
        ev.preventDefault();
      } else if (ev.button == 1) {
        let src = furl || url;
        if (ev.altKey && file.source) {
          src = file.source;
        }
        if (ev.shiftKey && file.page) {
          src = file.page.url;
        }
        ev.preventDefault();
        if (isNotChrome) {
          window.open(src, "_blank");
        } else
          await Platform.openInTab(src, { active: false, insert: true });
      }
    }
    const getViewport = () => (typeof visualViewport != "undefined" ? () => [visualViewport.width, visualViewport.height] : () => [document.documentElement.clientWidth, document.documentElement.clientHeight])();
    function recompute() {
      const [sw, sh] = getViewport();
      let [iw, ih] = [0, 0];
      if (isImage) {
        [iw, ih] = [imgElem.naturalWidth, imgElem.naturalHeight];
      } else if (isVideo) {
        [iw, ih] = [videoElem.videoWidth, videoElem.videoHeight];
      }
      let scale = Math.min(1, sw / iw, sh / ih);
      dims = [~~(iw * scale), ~~(ih * scale)];
      $$invalidate(11, hoverElem.style.width = `${dims[0]}px`, hoverElem);
      $$invalidate(11, hoverElem.style.height = `${dims[1]}px`, hoverElem);
    }
    async function hoverStart(ev) {
      if (!(isVideo || isImage))
        return;
      if ($settings.dh)
        return;
      if (file.thumbnail && !furl) {
        unzip();
      }
      if (!isImage && !isVideo)
        return;
      if (!contracted)
        return;
      recompute();
      $$invalidate(8, hovering = true);
      if (isVideo) {
        try {
          await hoverVideo.play();
        } catch (e) {
          $$invalidate(14, hoverVideo.muted = true, hoverVideo);
          $$invalidate(14, hoverVideo.volume = 0, hoverVideo);
          await hoverVideo.play();
        }
      }
    }
    function hoverStop(ev) {
      if ($settings.dh)
        return;
      $$invalidate(8, hovering = false);
      if (isVideo)
        hoverVideo.pause();
    }
    let lastev;
    function hoverUpdate(ev) {
      lastev = lastev || ev;
      if ($settings.dh)
        return;
      if (!contracted)
        return;
      if (!(isVideo || isImage))
        return;
      recompute();
      const [sw, sh] = [visualViewport.width, visualViewport.height];
      if (dims[0] == 0 && dims[1] == 0)
        recompute();
      let width = dims[0];
      let height = dims[1] + 25;
      let { clientX, clientY } = ev || lastev;
      let top = Math.max(0, clientY * (sh - height) / sh);
      let threshold = sw / 2;
      let marginX = (clientX <= threshold ? clientX : sw - clientX) + 45;
      marginX = Math.min(marginX, sw - width);
      marginX = marginX + "px";
      let [left, right] = clientX <= threshold ? [marginX, ""] : ["", marginX];
      let { style } = hoverElem;
      style.top = top + "px";
      style.left = left;
      style.right = right;
    }
    function adjustAudio(ev) {
      if (!$settings.ca)
        return;
      if (!isVideo)
        return;
      if ($settings.dh && contracted)
        return;
      if (!hasAudio(videoElem))
        return;
      let vol = videoElem.volume * (ev.deltaY > 0 ? 0.9 : 1.1);
      vol = Math.max(0, Math.min(1, vol));
      $$invalidate(13, videoElem.volume = vol, videoElem);
      $$invalidate(14, hoverVideo.volume = videoElem.volume, hoverVideo);
      $$invalidate(14, hoverVideo.muted = vol < 0, hoverVideo);
      ev.preventDefault();
    }
    function img_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        imgElem = $$value;
        $$invalidate(12, imgElem);
      });
    }
    function video_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        videoElem = $$value;
        $$invalidate(13, videoElem);
      });
    }
    function div0_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        place = $$value;
        $$invalidate(10, place);
      });
    }
    function video_binding_1($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        hoverVideo = $$value;
        $$invalidate(14, hoverVideo);
      });
    }
    function div1_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        hoverElem = $$value;
        $$invalidate(11, hoverElem);
      });
    }
    $$self.$$set = ($$props2) => {
      if ("file" in $$props2)
        $$invalidate(0, file = $$props2.file);
      if ("id" in $$props2)
        $$invalidate(26, id = $$props2.id);
      if ("inhibitExpand" in $$props2)
        $$invalidate(28, inhibitExpand = $$props2.inhibitExpand);
    };
    return [
      file,
      bepis,
      isVideo,
      isImage,
      isAudio,
      isText,
      url,
      contracted,
      hovering,
      ftype,
      place,
      hoverElem,
      imgElem,
      videoElem,
      hoverVideo,
      furl,
      visible,
      unzipping,
      progress,
      $settings,
      hoverStart,
      hoverStop,
      hoverUpdate,
      adjustAudio,
      dispatch,
      isNotChrome,
      id,
      isContracted,
      inhibitExpand,
      img_binding,
      video_binding,
      div0_binding,
      video_binding_1,
      div1_binding
    ];
  }
  var Embedding = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance7, create_fragment7, safe_not_equal, {
        dispatch: 24,
        file: 0,
        isNotChrome: 25,
        id: 26,
        isContracted: 27,
        inhibitExpand: 28,
        bepis: 1
      }, add_css6, [-1, -1]);
    }
    get dispatch() {
      return this.$$.ctx[24];
    }
    get file() {
      return this.$$.ctx[0];
    }
    set file(file) {
      this.$$set({ file });
      flush();
    }
    get isNotChrome() {
      return this.$$.ctx[25];
    }
    get id() {
      return this.$$.ctx[26];
    }
    set id(id) {
      this.$$set({ id });
      flush();
    }
    get isContracted() {
      return this.$$.ctx[27];
    }
    get inhibitExpand() {
      return this.$$.ctx[28];
    }
    set inhibitExpand(inhibitExpand) {
      this.$$set({ inhibitExpand });
      flush();
    }
    get bepis() {
      return this.$$.ctx[1];
    }
  };
  var Embedding_default = Embedding;

  // src/Components/HydrusSearch.svelte
  function add_css7(target) {
    append_styles(target, "svelte-1qi3e99", ".results.svelte-1qi3e99.svelte-1qi3e99{display:flex;flex-wrap:wrap;max-height:30vh;gap:10px;overflow-y:auto;align-items:center;justify-content:center}.tagcont.svelte-1qi3e99.svelte-1qi3e99{display:flex;gap:5px}.cont.svelte-1qi3e99.svelte-1qi3e99{display:flex;flex-direction:column;gap:10px}details.svelte-1qi3e99.svelte-1qi3e99{border:1px solid #aaa;border-radius:4px;padding:0.5em 0.5em 0}summary.svelte-1qi3e99.svelte-1qi3e99{font-weight:bold;margin:-0.5em -0.5em 0;padding:0.5em;cursor:pointer}details[open].svelte-1qi3e99.svelte-1qi3e99{padding:0.5em}details[open].svelte-1qi3e99 summary.svelte-1qi3e99{border-bottom:1px solid #aaa;margin-bottom:0.5em}");
  }
  function get_each_context(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[9] = list[i];
    return child_ctx;
  }
  function get_each_context_1(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[12] = list[i];
    return child_ctx;
  }
  function create_each_block_1(ctx) {
    let tag;
    let current;
    function toggle_handler() {
      return ctx[6](ctx[12]);
    }
    tag = new Tag_default({ props: { tag: ctx[12] } });
    tag.$on("toggle", toggle_handler);
    return {
      c() {
        create_component(tag.$$.fragment);
      },
      m(target, anchor) {
        mount_component(tag, target, anchor);
        current = true;
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        const tag_changes = {};
        if (dirty & 1)
          tag_changes.tag = ctx[12];
        tag.$set(tag_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(tag.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tag.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(tag, detaching);
      }
    };
  }
  function create_else_block(ctx) {
    let div;
    let each_blocks = [];
    let each_1_lookup = /* @__PURE__ */ new Map();
    let current;
    let each_value = ctx[2];
    const get_key = (ctx2) => ctx2[9][0];
    for (let i = 0; i < each_value.length; i += 1) {
      let child_ctx = get_each_context(ctx, each_value, i);
      let key = get_key(child_ctx);
      each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    }
    return {
      c() {
        div = element("div");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(div, "class", "results svelte-1qi3e99");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(div, null);
        }
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & 4) {
          each_value = ctx2[2];
          group_outros();
          each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div, outro_and_destroy_block, create_each_block, null, get_each_context);
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(div);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].d();
        }
      }
    };
  }
  function create_if_block5(ctx) {
    let t;
    return {
      c() {
        t = text("Loading...");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(t);
      }
    };
  }
  function create_each_block(key_1, ctx) {
    let first;
    let embedding;
    let current;
    function click_handler2() {
      return ctx[7](ctx[9]);
    }
    embedding = new Embedding_default({
      props: {
        inhibitExpand: true,
        id: "only",
        file: ctx[9][1]
      }
    });
    embedding.$on("click", click_handler2);
    return {
      key: key_1,
      first: null,
      c() {
        first = empty();
        create_component(embedding.$$.fragment);
        this.first = first;
      },
      m(target, anchor) {
        insert(target, first, anchor);
        mount_component(embedding, target, anchor);
        current = true;
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        const embedding_changes = {};
        if (dirty & 4)
          embedding_changes.file = ctx[9][1];
        embedding.$set(embedding_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(embedding.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(embedding.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(first);
        destroy_component(embedding, detaching);
      }
    };
  }
  function create_fragment8(ctx) {
    let div1;
    let input;
    let t0;
    let details;
    let t5;
    let div0;
    let t6;
    let current_block_type_index;
    let if_block;
    let current;
    let mounted;
    let dispose;
    let each_value_1 = ctx[0];
    let each_blocks = [];
    for (let i = 0; i < each_value_1.length; i += 1) {
      each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    const if_block_creators = [create_if_block5, create_else_block];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (ctx2[1])
        return 0;
      return 1;
    }
    current_block_type_index = select_block_type(ctx, -1);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
      c() {
        div1 = element("div");
        input = element("input");
        t0 = space();
        details = element("details");
        details.innerHTML = `<summary class="svelte-1qi3e99">Tips</summary>
        Press enter without entering a tag to refresh. <br/>
        Files are picked randomly <br/>
        Click on a file to embed it <br/>`;
        t5 = space();
        div0 = element("div");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t6 = space();
        if_block.c();
        attr(input, "type", "text");
        attr(input, "placeholder", "Input a tag here, then press enter");
        attr(details, "class", "svelte-1qi3e99");
        attr(div0, "class", "tagcont svelte-1qi3e99");
        attr(div1, "class", "cont svelte-1qi3e99");
      },
      m(target, anchor) {
        insert(target, div1, anchor);
        append(div1, input);
        append(div1, t0);
        append(div1, details);
        append(div1, t5);
        append(div1, div0);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(div0, null);
        }
        append(div1, t6);
        if_blocks[current_block_type_index].m(div1, null);
        current = true;
        if (!mounted) {
          dispose = listen(input, "keydown", ctx[5]);
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & 9) {
          each_value_1 = ctx2[0];
          let i;
          for (i = 0; i < each_value_1.length; i += 1) {
            const child_ctx = get_each_context_1(ctx2, each_value_1, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block_1(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(div0, null);
            }
          }
          group_outros();
          for (i = each_value_1.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(div1, null);
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_1.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        transition_in(if_block);
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(div1);
        destroy_each(each_blocks, detaching);
        if_blocks[current_block_type_index].d();
        mounted = false;
        dispose();
      }
    };
  }
  function instance8($$self, $$props, $$invalidate) {
    let $appState;
    component_subscribe($$self, appState, ($$value) => $$invalidate(8, $appState = $$value));
    let tags = [];
    let loading = false;
    function removeTag(t) {
      $$invalidate(0, tags = tags.filter((e) => e != t));
      update2();
    }
    let maps = [];
    async function update2() {
      $$invalidate(1, loading = true);
      if ($appState.client) {
        try {
          if (tags.length == 0) {
            $$invalidate(2, maps = []);
            $$invalidate(1, loading = false);
            return;
          }
          $$invalidate(2, maps = await getFileFromHydrus($appState.client, tags.concat(["system:limit=32"]), { file_sort_type: 4 }));
        } catch {
        }
      }
      $$invalidate(1, loading = false);
    }
    onMount(() => {
      return update2();
    });
    const keydown_handler = (ev) => {
      if (ev.key == "Enter") {
        if (ev.currentTarget.value)
          $$invalidate(0, tags = [...tags, ev.currentTarget.value]);
        ev.currentTarget.value = "";
        update2();
      }
    };
    const toggle_handler = (tag) => removeTag(tag);
    const click_handler2 = (map) => addToEmbeds(map[1]);
    return [
      tags,
      loading,
      maps,
      removeTag,
      update2,
      keydown_handler,
      toggle_handler,
      click_handler2
    ];
  }
  var HydrusSearch = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance8, create_fragment8, safe_not_equal, {}, add_css7);
    }
  };
  var HydrusSearch_default = HydrusSearch;

  // src/Components/App.svelte
  function add_css8(target) {
    append_styles(target, "svelte-1epvqgf", '.bepis.svelte-1epvqgf.svelte-1epvqgf{max-height:260px;overflow-y:auto}.tagcont.svelte-1epvqgf.svelte-1epvqgf{display:flex;gap:5px;margin-bottom:10px;flex-wrap:wrap}label.svelte-1epvqgf>input[type="text"].svelte-1epvqgf,label.svelte-1epvqgf>input[type="number"].svelte-1epvqgf{width:95%}.enabled.svelte-1epvqgf.svelte-1epvqgf{display:block}.disabled.svelte-1epvqgf.svelte-1epvqgf{display:none}.content.svelte-1epvqgf.svelte-1epvqgf{display:flex;flex-direction:column}.error.svelte-1epvqgf.svelte-1epvqgf{color:red}hr.svelte-1epvqgf.svelte-1epvqgf{width:100%}h1.svelte-1epvqgf.svelte-1epvqgf{text-align:center}.form.svelte-1epvqgf.svelte-1epvqgf{display:flex;flex-direction:column;gap:20px;position:absolute;padding:15px;border:1px solid white;background-color:inherit;border-radius:10px}.form.svelte-1epvqgf>label.svelte-1epvqgf{display:flex;flex-direction:column;gap:10px}.backpanel.svelte-1epvqgf.svelte-1epvqgf{position:absolute;right:32px;padding:10px;width:15%;top:32px;border:1px solid;border-radius:5px;background-color:rgba(0, 0, 0, 0.2);pointer-events:all;backdrop-filter:blur(9px);max-height:80vh;min-width:321px}');
  }
  function get_each_context2(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[48] = list[i];
    return child_ctx;
  }
  function get_each_context_12(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[51] = list[i];
    child_ctx[53] = i;
    return child_ctx;
  }
  function get_each_context_2(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[54] = list[i];
    child_ctx[53] = i;
    return child_ctx;
  }
  function get_each_context_3(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[56] = list[i];
    child_ctx[53] = i;
    return child_ctx;
  }
  function create_default_slot_12(ctx) {
    let t;
    return {
      c() {
        t = text("General");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(t);
      }
    };
  }
  function create_default_slot_11(ctx) {
    let t;
    return {
      c() {
        t = text("External");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(t);
      }
    };
  }
  function create_default_slot_10(ctx) {
    let t;
    return {
      c() {
        t = text("File Host");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(t);
      }
    };
  }
  function create_default_slot_9(ctx) {
    let t;
    return {
      c() {
        t = text("Thread Watcher");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(t);
      }
    };
  }
  function create_if_block_8(ctx) {
    let tab;
    let current;
    tab = new Tab_default({
      props: {
        $$slots: { default: [create_default_slot_8] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(tab.$$.fragment);
      },
      m(target, anchor) {
        mount_component(tab, target, anchor);
        current = true;
      },
      i(local) {
        if (current)
          return;
        transition_in(tab.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tab.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(tab, detaching);
      }
    };
  }
  function create_default_slot_8(ctx) {
    let t;
    return {
      c() {
        t = text("Hydrus");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(t);
      }
    };
  }
  function create_default_slot_7(ctx) {
    let tab0;
    let t0;
    let tab1;
    let t1;
    let tab2;
    let t2;
    let tab3;
    let t3;
    let if_block_anchor;
    let current;
    tab0 = new Tab_default({
      props: {
        $$slots: { default: [create_default_slot_12] },
        $$scope: { ctx }
      }
    });
    tab1 = new Tab_default({
      props: {
        $$slots: { default: [create_default_slot_11] },
        $$scope: { ctx }
      }
    });
    tab2 = new Tab_default({
      props: {
        $$slots: { default: [create_default_slot_10] },
        $$scope: { ctx }
      }
    });
    tab3 = new Tab_default({
      props: {
        $$slots: { default: [create_default_slot_9] },
        $$scope: { ctx }
      }
    });
    let if_block = ctx[6].akValid && create_if_block_8(ctx);
    return {
      c() {
        create_component(tab0.$$.fragment);
        t0 = space();
        create_component(tab1.$$.fragment);
        t1 = space();
        create_component(tab2.$$.fragment);
        t2 = space();
        create_component(tab3.$$.fragment);
        t3 = space();
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        mount_component(tab0, target, anchor);
        insert(target, t0, anchor);
        mount_component(tab1, target, anchor);
        insert(target, t1, anchor);
        mount_component(tab2, target, anchor);
        insert(target, t2, anchor);
        mount_component(tab3, target, anchor);
        insert(target, t3, anchor);
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const tab0_changes = {};
        if (dirty[1] & 134217728) {
          tab0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tab0.$set(tab0_changes);
        const tab1_changes = {};
        if (dirty[1] & 134217728) {
          tab1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tab1.$set(tab1_changes);
        const tab2_changes = {};
        if (dirty[1] & 134217728) {
          tab2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tab2.$set(tab2_changes);
        const tab3_changes = {};
        if (dirty[1] & 134217728) {
          tab3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tab3.$set(tab3_changes);
        if (ctx2[6].akValid) {
          if (if_block) {
            if (dirty[0] & 64) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block_8(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(tab0.$$.fragment, local);
        transition_in(tab1.$$.fragment, local);
        transition_in(tab2.$$.fragment, local);
        transition_in(tab3.$$.fragment, local);
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(tab0.$$.fragment, local);
        transition_out(tab1.$$.fragment, local);
        transition_out(tab2.$$.fragment, local);
        transition_out(tab3.$$.fragment, local);
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        destroy_component(tab0, detaching);
        if (detaching)
          detach(t0);
        destroy_component(tab1, detaching);
        if (detaching)
          detach(t1);
        destroy_component(tab2, detaching);
        if (detaching)
          detach(t2);
        destroy_component(tab3, detaching);
        if (detaching)
          detach(t3);
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function create_if_block_72(ctx) {
    let label;
    let input;
    let t;
    let mounted;
    let dispose;
    return {
      c() {
        label = element("label");
        input = element("input");
        t = text("\n            Hide original content when hidden content is visible.");
        attr(input, "type", "checkbox");
      },
      m(target, anchor) {
        insert(target, label, anchor);
        append(label, input);
        input.checked = ctx[5].ho;
        append(label, t);
        if (!mounted) {
          dispose = listen(input, "change", ctx[19]);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & 32) {
          input.checked = ctx2[5].ho;
        }
      },
      d(detaching) {
        if (detaching)
          detach(label);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_42(ctx) {
    let t0;
    let label;
    let t1;
    let a;
    let t3;
    let input;
    let t4;
    let if_block1_anchor;
    let mounted;
    let dispose;
    let if_block0 = ctx[6].herror && create_if_block_62(ctx);
    let if_block1 = ctx[6].akValid && create_if_block_52(ctx);
    return {
      c() {
        if (if_block0)
          if_block0.c();
        t0 = space();
        label = element("label");
        t1 = text("Hydrus Access Key\n            \n            ");
        a = element("a");
        a.textContent = "?";
        t3 = space();
        input = element("input");
        t4 = space();
        if (if_block1)
          if_block1.c();
        if_block1_anchor = empty();
        attr(a, "title", "Only requires Search Files permission. See Hydrus docs on where to set this up.");
        attr(input, "type", "text");
        attr(input, "class", "svelte-1epvqgf");
        attr(label, "class", "svelte-1epvqgf");
      },
      m(target, anchor) {
        if (if_block0)
          if_block0.m(target, anchor);
        insert(target, t0, anchor);
        insert(target, label, anchor);
        append(label, t1);
        append(label, a);
        append(label, t3);
        append(label, input);
        set_input_value(input, ctx[5].ak);
        insert(target, t4, anchor);
        if (if_block1)
          if_block1.m(target, anchor);
        insert(target, if_block1_anchor, anchor);
        if (!mounted) {
          dispose = listen(input, "input", ctx[27]);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (ctx2[6].herror) {
          if (if_block0) {
            if_block0.p(ctx2, dirty);
          } else {
            if_block0 = create_if_block_62(ctx2);
            if_block0.c();
            if_block0.m(t0.parentNode, t0);
          }
        } else if (if_block0) {
          if_block0.d(1);
          if_block0 = null;
        }
        if (dirty[0] & 32 && input.value !== ctx2[5].ak) {
          set_input_value(input, ctx2[5].ak);
        }
        if (ctx2[6].akValid) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
          } else {
            if_block1 = create_if_block_52(ctx2);
            if_block1.c();
            if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }
      },
      d(detaching) {
        if (if_block0)
          if_block0.d(detaching);
        if (detaching)
          detach(t0);
        if (detaching)
          detach(label);
        if (detaching)
          detach(t4);
        if (if_block1)
          if_block1.d(detaching);
        if (detaching)
          detach(if_block1_anchor);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_62(ctx) {
    let span;
    let t_value = ctx[6].herror + "";
    let t;
    return {
      c() {
        span = element("span");
        t = text(t_value);
        attr(span, "class", "error svelte-1epvqgf");
      },
      m(target, anchor) {
        insert(target, span, anchor);
        append(span, t);
      },
      p(ctx2, dirty) {
        if (dirty[0] & 64 && t_value !== (t_value = ctx2[6].herror + ""))
          set_data(t, t_value);
      },
      d(detaching) {
        if (detaching)
          detach(span);
      }
    };
  }
  function create_if_block_52(ctx) {
    let label0;
    let t0;
    let input0;
    let t1;
    let t2;
    let label1;
    let input1;
    let mounted;
    let dispose;
    return {
      c() {
        label0 = element("label");
        t0 = text("Auto-embed ");
        input0 = element("input");
        t1 = text("\n              random files");
        t2 = space();
        label1 = element("label");
        input1 = element("input");
        set_style(input0, "width", "5ch");
        attr(input0, "type", "number");
        attr(input0, "class", "svelte-1epvqgf");
        attr(label0, "class", "svelte-1epvqgf");
        attr(input1, "placeholder", "Restrict to these tags (space to separate tags, _ to separate words)");
        attr(input1, "type", "text");
        attr(input1, "class", "svelte-1epvqgf");
        attr(label1, "class", "svelte-1epvqgf");
      },
      m(target, anchor) {
        insert(target, label0, anchor);
        append(label0, t0);
        append(label0, input0);
        set_input_value(input0, ctx[5].auto_embed);
        append(label0, t1);
        insert(target, t2, anchor);
        insert(target, label1, anchor);
        append(label1, input1);
        set_input_value(input1, ctx[5].auto_tags);
        if (!mounted) {
          dispose = [
            listen(input0, "input", ctx[28]),
            listen(input1, "input", ctx[29])
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & 32 && to_number(input0.value) !== ctx2[5].auto_embed) {
          set_input_value(input0, ctx2[5].auto_embed);
        }
        if (dirty[0] & 32 && input1.value !== ctx2[5].auto_tags) {
          set_input_value(input1, ctx2[5].auto_tags);
        }
      },
      d(detaching) {
        if (detaching)
          detach(label0);
        if (detaching)
          detach(t2);
        if (detaching)
          detach(label1);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_default_slot_6(ctx) {
    let label0;
    let input0;
    let t0;
    let t1;
    let label1;
    let input1;
    let t2;
    let t3;
    let label2;
    let input2;
    let t4;
    let t5;
    let label3;
    let input3;
    let t6;
    let t7;
    let label4;
    let input4;
    let t8;
    let t9;
    let label5;
    let input5;
    let t10;
    let t11;
    let t12;
    let label6;
    let input6;
    let t13;
    let t14;
    let label7;
    let input7;
    let t15;
    let t16;
    let label8;
    let input8;
    let t17;
    let t18;
    let label9;
    let input9;
    let t19;
    let t20;
    let label10;
    let input10;
    let t21;
    let t22;
    let label11;
    let input11;
    let t23;
    let a;
    let t25;
    let label12;
    let input12;
    let t26;
    let t27;
    let if_block1_anchor;
    let mounted;
    let dispose;
    let if_block0 = ctx[5].eye && create_if_block_72(ctx);
    let if_block1 = ctx[5].hyd && create_if_block_42(ctx);
    return {
      c() {
        label0 = element("label");
        input0 = element("input");
        t0 = text("\n          Check for new versions at startup.");
        t1 = space();
        label1 = element("label");
        input1 = element("input");
        t2 = text("\n          Autoexpand Images on opening.");
        t3 = space();
        label2 = element("label");
        input2 = element("input");
        t4 = text("\n          Autoexpand Videos on opening.");
        t5 = space();
        label3 = element("label");
        input3 = element("input");
        t6 = text("\n          Loop media content.");
        t7 = space();
        label4 = element("label");
        input4 = element("input");
        t8 = text("\n          Disable hover preview.");
        t9 = space();
        label5 = element("label");
        input5 = element("input");
        t10 = text("\n          Hide embedded content behind an eye.");
        t11 = space();
        if (if_block0)
          if_block0.c();
        t12 = space();
        label6 = element("label");
        input6 = element("input");
        t13 = text("\n          Preload external files.");
        t14 = space();
        label7 = element("label");
        input7 = element("input");
        t15 = text("\n          Preload external files when they are in view.");
        t16 = space();
        label8 = element("label");
        input8 = element("input");
        t17 = text("\n          Hotlink content.");
        t18 = space();
        label9 = element("label");
        input9 = element("input");
        t19 = text("\n          Control audio on videos with mouse wheel.");
        t20 = space();
        label10 = element("label");
        input10 = element("input");
        t21 = text("\n          Show Minimap");
        t22 = space();
        label11 = element("label");
        input11 = element("input");
        t23 = text("\n          \n          Disable embedded file preloading");
        a = element("a");
        a.textContent = "?";
        t25 = space();
        label12 = element("label");
        input12 = element("input");
        t26 = text("\n          \n          Enable Hydrus Integration");
        t27 = space();
        if (if_block1)
          if_block1.c();
        if_block1_anchor = empty();
        attr(input0, "type", "checkbox");
        attr(input1, "type", "checkbox");
        attr(input2, "type", "checkbox");
        attr(input3, "type", "checkbox");
        attr(input4, "type", "checkbox");
        attr(input5, "type", "checkbox");
        attr(input6, "type", "checkbox");
        attr(input7, "type", "checkbox");
        attr(input8, "type", "checkbox");
        attr(input9, "type", "checkbox");
        attr(input10, "type", "checkbox");
        attr(input11, "type", "checkbox");
        attr(a, "title", "You might still want to enable 'preload external files'");
        attr(input12, "type", "checkbox");
      },
      m(target, anchor) {
        insert(target, label0, anchor);
        append(label0, input0);
        input0.checked = ctx[5].vercheck;
        append(label0, t0);
        insert(target, t1, anchor);
        insert(target, label1, anchor);
        append(label1, input1);
        input1.checked = ctx[5].xpi;
        append(label1, t2);
        insert(target, t3, anchor);
        insert(target, label2, anchor);
        append(label2, input2);
        input2.checked = ctx[5].xpv;
        append(label2, t4);
        insert(target, t5, anchor);
        insert(target, label3, anchor);
        append(label3, input3);
        input3.checked = ctx[5].loop;
        append(label3, t6);
        insert(target, t7, anchor);
        insert(target, label4, anchor);
        append(label4, input4);
        input4.checked = ctx[5].dh;
        append(label4, t8);
        insert(target, t9, anchor);
        insert(target, label5, anchor);
        append(label5, input5);
        input5.checked = ctx[5].eye;
        append(label5, t10);
        insert(target, t11, anchor);
        if (if_block0)
          if_block0.m(target, anchor);
        insert(target, t12, anchor);
        insert(target, label6, anchor);
        append(label6, input6);
        input6.checked = ctx[5].pre;
        append(label6, t13);
        insert(target, t14, anchor);
        insert(target, label7, anchor);
        append(label7, input7);
        input7.checked = ctx[5].prev;
        append(label7, t15);
        insert(target, t16, anchor);
        insert(target, label8, anchor);
        append(label8, input8);
        input8.checked = ctx[5].hotlink;
        append(label8, t17);
        insert(target, t18, anchor);
        insert(target, label9, anchor);
        append(label9, input9);
        input9.checked = ctx[5].ca;
        append(label9, t19);
        insert(target, t20, anchor);
        insert(target, label10, anchor);
        append(label10, input10);
        input10.checked = ctx[5].sh;
        append(label10, t21);
        insert(target, t22, anchor);
        insert(target, label11, anchor);
        append(label11, input11);
        input11.checked = ctx[5].ep;
        append(label11, t23);
        append(label11, a);
        insert(target, t25, anchor);
        insert(target, label12, anchor);
        append(label12, input12);
        input12.checked = ctx[5].hyd;
        append(label12, t26);
        insert(target, t27, anchor);
        if (if_block1)
          if_block1.m(target, anchor);
        insert(target, if_block1_anchor, anchor);
        if (!mounted) {
          dispose = [
            listen(input0, "change", ctx[13]),
            listen(input1, "change", ctx[14]),
            listen(input2, "change", ctx[15]),
            listen(input3, "change", ctx[16]),
            listen(input4, "change", ctx[17]),
            listen(input5, "change", ctx[18]),
            listen(input6, "change", ctx[20]),
            listen(input7, "change", ctx[21]),
            listen(input8, "change", ctx[22]),
            listen(input9, "change", ctx[23]),
            listen(input10, "change", ctx[24]),
            listen(input11, "change", ctx[25]),
            listen(input12, "change", ctx[26])
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & 32) {
          input0.checked = ctx2[5].vercheck;
        }
        if (dirty[0] & 32) {
          input1.checked = ctx2[5].xpi;
        }
        if (dirty[0] & 32) {
          input2.checked = ctx2[5].xpv;
        }
        if (dirty[0] & 32) {
          input3.checked = ctx2[5].loop;
        }
        if (dirty[0] & 32) {
          input4.checked = ctx2[5].dh;
        }
        if (dirty[0] & 32) {
          input5.checked = ctx2[5].eye;
        }
        if (ctx2[5].eye) {
          if (if_block0) {
            if_block0.p(ctx2, dirty);
          } else {
            if_block0 = create_if_block_72(ctx2);
            if_block0.c();
            if_block0.m(t12.parentNode, t12);
          }
        } else if (if_block0) {
          if_block0.d(1);
          if_block0 = null;
        }
        if (dirty[0] & 32) {
          input6.checked = ctx2[5].pre;
        }
        if (dirty[0] & 32) {
          input7.checked = ctx2[5].prev;
        }
        if (dirty[0] & 32) {
          input8.checked = ctx2[5].hotlink;
        }
        if (dirty[0] & 32) {
          input9.checked = ctx2[5].ca;
        }
        if (dirty[0] & 32) {
          input10.checked = ctx2[5].sh;
        }
        if (dirty[0] & 32) {
          input11.checked = ctx2[5].ep;
        }
        if (dirty[0] & 32) {
          input12.checked = ctx2[5].hyd;
        }
        if (ctx2[5].hyd) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
          } else {
            if_block1 = create_if_block_42(ctx2);
            if_block1.c();
            if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }
      },
      d(detaching) {
        if (detaching)
          detach(label0);
        if (detaching)
          detach(t1);
        if (detaching)
          detach(label1);
        if (detaching)
          detach(t3);
        if (detaching)
          detach(label2);
        if (detaching)
          detach(t5);
        if (detaching)
          detach(label3);
        if (detaching)
          detach(t7);
        if (detaching)
          detach(label4);
        if (detaching)
          detach(t9);
        if (detaching)
          detach(label5);
        if (detaching)
          detach(t11);
        if (if_block0)
          if_block0.d(detaching);
        if (detaching)
          detach(t12);
        if (detaching)
          detach(label6);
        if (detaching)
          detach(t14);
        if (detaching)
          detach(label7);
        if (detaching)
          detach(t16);
        if (detaching)
          detach(label8);
        if (detaching)
          detach(t18);
        if (detaching)
          detach(label9);
        if (detaching)
          detach(t20);
        if (detaching)
          detach(label10);
        if (detaching)
          detach(t22);
        if (detaching)
          detach(label11);
        if (detaching)
          detach(t25);
        if (detaching)
          detach(label12);
        if (detaching)
          detach(t27);
        if (if_block1)
          if_block1.d(detaching);
        if (detaching)
          detach(if_block1_anchor);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_22(ctx) {
    let label;
    let input0;
    let t0;
    let t1;
    let t2;
    let h30;
    let t4;
    let div0;
    let t5;
    let button;
    let t7;
    let dialog;
    let t8;
    let hr;
    let t9;
    let h31;
    let t11;
    let div1;
    let t12;
    let input1;
    let current;
    let mounted;
    let dispose;
    let if_block = ctx[5].phash && create_if_block_32(ctx);
    let each_value_3 = ctx[5].rsources;
    let each_blocks_1 = [];
    for (let i = 0; i < each_value_3.length; i += 1) {
      each_blocks_1[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
    }
    const out = (i) => transition_out(each_blocks_1[i], 1, 1, () => {
      each_blocks_1[i] = null;
    });
    let dialog_props = {
      $$slots: { default: [create_default_slot_5] },
      $$scope: { ctx }
    };
    dialog = new Dialog_default({ props: dialog_props });
    ctx[41](dialog);
    let each_value_2 = ctx[5].blacklist;
    let each_blocks = [];
    for (let i = 0; i < each_value_2.length; i += 1) {
      each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    }
    const out_1 = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        label = element("label");
        input0 = element("input");
        t0 = text("\n            Enable perceptual hash-based filtering");
        t1 = space();
        if (if_block)
          if_block.c();
        t2 = space();
        h30 = element("h3");
        h30.textContent = "Booru sources";
        t4 = space();
        div0 = element("div");
        for (let i = 0; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].c();
        }
        t5 = space();
        button = element("button");
        button.textContent = "Add a source";
        t7 = space();
        create_component(dialog.$$.fragment);
        t8 = space();
        hr = element("hr");
        t9 = space();
        h31 = element("h3");
        h31.textContent = "Blacklisted tags";
        t11 = space();
        div1 = element("div");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t12 = space();
        input1 = element("input");
        attr(input0, "type", "checkbox");
        attr(div0, "class", "tagcont svelte-1epvqgf");
        attr(hr, "class", "svelte-1epvqgf");
        attr(div1, "class", "tagcont svelte-1epvqgf");
        attr(input1, "placeholder", "Press enter after typing your tag");
      },
      m(target, anchor) {
        insert(target, label, anchor);
        append(label, input0);
        input0.checked = ctx[5].phash;
        append(label, t0);
        insert(target, t1, anchor);
        if (if_block)
          if_block.m(target, anchor);
        insert(target, t2, anchor);
        insert(target, h30, anchor);
        insert(target, t4, anchor);
        insert(target, div0, anchor);
        for (let i = 0; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].m(div0, null);
        }
        insert(target, t5, anchor);
        insert(target, button, anchor);
        insert(target, t7, anchor);
        mount_component(dialog, target, anchor);
        insert(target, t8, anchor);
        insert(target, hr, anchor);
        insert(target, t9, anchor);
        insert(target, h31, anchor);
        insert(target, t11, anchor);
        insert(target, div1, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(div1, null);
        }
        insert(target, t12, anchor);
        insert(target, input1, anchor);
        current = true;
        if (!mounted) {
          dispose = [
            listen(input0, "change", ctx[31]),
            listen(button, "click", ctx[36]),
            listen(input1, "keydown", ctx[43])
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & 32) {
          input0.checked = ctx2[5].phash;
        }
        if (ctx2[5].phash) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_32(ctx2);
            if_block.c();
            if_block.m(t2.parentNode, t2);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
        if (dirty[0] & 4640) {
          each_value_3 = ctx2[5].rsources;
          let i;
          for (i = 0; i < each_value_3.length; i += 1) {
            const child_ctx = get_each_context_3(ctx2, each_value_3, i);
            if (each_blocks_1[i]) {
              each_blocks_1[i].p(child_ctx, dirty);
              transition_in(each_blocks_1[i], 1);
            } else {
              each_blocks_1[i] = create_each_block_3(child_ctx);
              each_blocks_1[i].c();
              transition_in(each_blocks_1[i], 1);
              each_blocks_1[i].m(div0, null);
            }
          }
          group_outros();
          for (i = each_value_3.length; i < each_blocks_1.length; i += 1) {
            out(i);
          }
          check_outros();
        }
        const dialog_changes = {};
        if (dirty[0] & 1 | dirty[1] & 134217728) {
          dialog_changes.$$scope = { dirty, ctx: ctx2 };
        }
        dialog.$set(dialog_changes);
        if (dirty[0] & 288) {
          each_value_2 = ctx2[5].blacklist;
          let i;
          for (i = 0; i < each_value_2.length; i += 1) {
            const child_ctx = get_each_context_2(ctx2, each_value_2, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block_2(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(div1, null);
            }
          }
          group_outros();
          for (i = each_value_2.length; i < each_blocks.length; i += 1) {
            out_1(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_3.length; i += 1) {
          transition_in(each_blocks_1[i]);
        }
        transition_in(dialog.$$.fragment, local);
        for (let i = 0; i < each_value_2.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks_1 = each_blocks_1.filter(Boolean);
        for (let i = 0; i < each_blocks_1.length; i += 1) {
          transition_out(each_blocks_1[i]);
        }
        transition_out(dialog.$$.fragment, local);
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(label);
        if (detaching)
          detach(t1);
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(t2);
        if (detaching)
          detach(h30);
        if (detaching)
          detach(t4);
        if (detaching)
          detach(div0);
        destroy_each(each_blocks_1, detaching);
        if (detaching)
          detach(t5);
        if (detaching)
          detach(button);
        if (detaching)
          detach(t7);
        ctx[41](null);
        destroy_component(dialog, detaching);
        if (detaching)
          detach(t8);
        if (detaching)
          detach(hr);
        if (detaching)
          detach(t9);
        if (detaching)
          detach(h31);
        if (detaching)
          detach(t11);
        if (detaching)
          detach(div1);
        destroy_each(each_blocks, detaching);
        if (detaching)
          detach(t12);
        if (detaching)
          detach(input1);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_32(ctx) {
    let label;
    let input;
    let t0;
    let a;
    let mounted;
    let dispose;
    return {
      c() {
        label = element("label");
        input = element("input");
        t0 = text("\n              Minimum distance required (5 recommended)\n              \n              ");
        a = element("a");
        a.textContent = "?";
        attr(input, "type", "number");
        attr(input, "class", "svelte-1epvqgf");
        attr(a, "title", "Higher will filter more potentially different images, lower will let more identical images through");
        attr(label, "class", "svelte-1epvqgf");
      },
      m(target, anchor) {
        insert(target, label, anchor);
        append(label, input);
        set_input_value(input, ctx[5].mdist);
        append(label, t0);
        append(label, a);
        if (!mounted) {
          dispose = listen(input, "input", ctx[32]);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & 32 && to_number(input.value) !== ctx2[5].mdist) {
          set_input_value(input, ctx2[5].mdist);
        }
      },
      d(detaching) {
        if (detaching)
          detach(label);
        mounted = false;
        dispose();
      }
    };
  }
  function create_each_block_3(ctx) {
    let tag;
    let current;
    function func(...args) {
      return ctx[33](ctx[56], ...args);
    }
    function remove_handler() {
      return ctx[34](ctx[56]);
    }
    function toggle_handler() {
      return ctx[35](ctx[56]);
    }
    tag = new Tag_default({
      props: {
        tag: ctx[56].name,
        toggleable: true,
        toggled: !ctx[5].rsources.find(func)?.disabled
      }
    });
    tag.$on("remove", remove_handler);
    tag.$on("toggle", toggle_handler);
    return {
      c() {
        create_component(tag.$$.fragment);
      },
      m(target, anchor) {
        mount_component(tag, target, anchor);
        current = true;
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        const tag_changes = {};
        if (dirty[0] & 32)
          tag_changes.tag = ctx[56].name;
        if (dirty[0] & 32)
          tag_changes.toggled = !ctx[5].rsources.find(func)?.disabled;
        tag.$set(tag_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(tag.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tag.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(tag, detaching);
      }
    };
  }
  function create_default_slot_5(ctx) {
    let div;
    let label0;
    let t0;
    let input0;
    let t1;
    let label1;
    let t2;
    let input1;
    let t3;
    let label2;
    let t4;
    let input2;
    let t5;
    let label3;
    let t6;
    let input3;
    let t7;
    let button;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        label0 = element("label");
        t0 = text("Name\n                ");
        input0 = element("input");
        t1 = space();
        label1 = element("label");
        t2 = text("Domain\n                ");
        input1 = element("input");
        t3 = space();
        label2 = element("label");
        t4 = text("API Endpoint\n                ");
        input2 = element("input");
        t5 = space();
        label3 = element("label");
        t6 = text("Post page prefix (for sources)\n                ");
        input3 = element("input");
        t7 = space();
        button = element("button");
        button.textContent = "Add";
        attr(input0, "type", "text");
        attr(input0, "placeholder", "Gelbooru");
        attr(input0, "class", "svelte-1epvqgf");
        attr(label0, "class", "svelte-1epvqgf");
        attr(input1, "type", "text");
        attr(input1, "placeholder", "gelbooru.com");
        attr(input1, "class", "svelte-1epvqgf");
        attr(label1, "class", "svelte-1epvqgf");
        attr(input2, "type", "text");
        attr(input2, "placeholder", "/post.json?tags=md5:");
        attr(input2, "class", "svelte-1epvqgf");
        attr(label2, "class", "svelte-1epvqgf");
        attr(input3, "type", "text");
        attr(input3, "placeholder", "https://yande.re/post/show/");
        attr(input3, "class", "svelte-1epvqgf");
        attr(label3, "class", "svelte-1epvqgf");
        attr(div, "class", "form svelte-1epvqgf");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, label0);
        append(label0, t0);
        append(label0, input0);
        set_input_value(input0, ctx[0].name);
        append(div, t1);
        append(div, label1);
        append(label1, t2);
        append(label1, input1);
        set_input_value(input1, ctx[0].domain);
        append(div, t3);
        append(div, label2);
        append(label2, t4);
        append(label2, input2);
        set_input_value(input2, ctx[0].endpoint);
        append(div, t5);
        append(div, label3);
        append(label3, t6);
        append(label3, input3);
        set_input_value(input3, ctx[0].view);
        append(div, t7);
        append(div, button);
        if (!mounted) {
          dispose = [
            listen(input0, "input", ctx[37]),
            listen(input1, "input", ctx[38]),
            listen(input2, "input", ctx[39]),
            listen(input3, "input", ctx[40]),
            listen(button, "click", ctx[7])
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & 1 && input0.value !== ctx2[0].name) {
          set_input_value(input0, ctx2[0].name);
        }
        if (dirty[0] & 1 && input1.value !== ctx2[0].domain) {
          set_input_value(input1, ctx2[0].domain);
        }
        if (dirty[0] & 1 && input2.value !== ctx2[0].endpoint) {
          set_input_value(input2, ctx2[0].endpoint);
        }
        if (dirty[0] & 1 && input3.value !== ctx2[0].view) {
          set_input_value(input3, ctx2[0].view);
        }
      },
      d(detaching) {
        if (detaching)
          detach(div);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_each_block_2(ctx) {
    let tag;
    let current;
    function toggle_handler_1() {
      return ctx[42](ctx[54]);
    }
    tag = new Tag_default({ props: { tag: ctx[54] } });
    tag.$on("toggle", toggle_handler_1);
    return {
      c() {
        create_component(tag.$$.fragment);
      },
      m(target, anchor) {
        mount_component(tag, target, anchor);
        current = true;
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        const tag_changes = {};
        if (dirty[0] & 32)
          tag_changes.tag = ctx[54];
        tag.$set(tag_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(tag.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tag.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(tag, detaching);
      }
    };
  }
  function create_default_slot_4(ctx) {
    let label;
    let input;
    let t0;
    let t1;
    let if_block_anchor;
    let current;
    let mounted;
    let dispose;
    let if_block = !ctx[5].te && create_if_block_22(ctx);
    return {
      c() {
        label = element("label");
        input = element("input");
        t0 = text("\n          Disable third-eye.");
        t1 = space();
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
        attr(input, "type", "checkbox");
      },
      m(target, anchor) {
        insert(target, label, anchor);
        append(label, input);
        input.checked = ctx[5].te;
        append(label, t0);
        insert(target, t1, anchor);
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
        if (!mounted) {
          dispose = listen(input, "change", ctx[30]);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & 32) {
          input.checked = ctx2[5].te;
        }
        if (!ctx2[5].te) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty[0] & 32) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block_22(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(label);
        if (detaching)
          detach(t1);
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
        mounted = false;
        dispose();
      }
    };
  }
  function create_each_block_12(ctx) {
    let option;
    let t_value = ctx[51].domain + "";
    let t;
    let option_value_value;
    return {
      c() {
        option = element("option");
        t = text(t_value);
        option.__value = option_value_value = ctx[53];
        option.value = option.__value;
      },
      m(target, anchor) {
        insert(target, option, anchor);
        append(option, t);
      },
      p: noop,
      d(detaching) {
        if (detaching)
          detach(option);
      }
    };
  }
  function create_default_slot_3(ctx) {
    let p;
    let t1;
    let select;
    let t2;
    let label;
    let t3;
    let input;
    let mounted;
    let dispose;
    let each_value_1 = filehosts;
    let each_blocks = [];
    for (let i = 0; i < each_value_1.length; i += 1) {
      each_blocks[i] = create_each_block_12(get_each_context_12(ctx, each_value_1, i));
    }
    return {
      c() {
        p = element("p");
        p.textContent = "Host to use when uploading files (Only permanent hosts)";
        t1 = space();
        select = element("select");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t2 = space();
        label = element("label");
        t3 = text("Maximum number of embedded links to display\n          ");
        input = element("input");
        if (ctx[5].fhost === void 0)
          add_render_callback(() => ctx[44].call(select));
        attr(input, "type", "number");
        attr(input, "class", "svelte-1epvqgf");
        attr(label, "class", "svelte-1epvqgf");
      },
      m(target, anchor) {
        insert(target, p, anchor);
        insert(target, t1, anchor);
        insert(target, select, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(select, null);
        }
        select_option(select, ctx[5].fhost);
        insert(target, t2, anchor);
        insert(target, label, anchor);
        append(label, t3);
        append(label, input);
        set_input_value(input, ctx[5].maxe);
        if (!mounted) {
          dispose = [
            listen(select, "change", ctx[44]),
            listen(input, "input", ctx[45])
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & 0) {
          each_value_1 = filehosts;
          let i;
          for (i = 0; i < each_value_1.length; i += 1) {
            const child_ctx = get_each_context_12(ctx2, each_value_1, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block_12(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(select, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value_1.length;
        }
        if (dirty[0] & 32) {
          select_option(select, ctx2[5].fhost);
        }
        if (dirty[0] & 32 && to_number(input.value) !== ctx2[5].maxe) {
          set_input_value(input, ctx2[5].maxe);
        }
      },
      d(detaching) {
        if (detaching)
          detach(p);
        if (detaching)
          detach(t1);
        if (detaching)
          detach(select);
        destroy_each(each_blocks, detaching);
        if (detaching)
          detach(t2);
        if (detaching)
          detach(label);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_else_block2(ctx) {
    let p;
    return {
      c() {
        p = element("p");
        p.textContent = "Loading...";
      },
      m(target, anchor) {
        insert(target, p, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching)
          detach(p);
      }
    };
  }
  function create_if_block_12(ctx) {
    let div;
    let each_value = ctx[4];
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block2(get_each_context2(ctx, each_value, i));
    }
    return {
      c() {
        div = element("div");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(div, "class", "bepis svelte-1epvqgf");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(div, null);
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & 1040) {
          each_value = ctx2[4];
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context2(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block2(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(div, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      d(detaching) {
        if (detaching)
          detach(div);
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block2(ctx) {
    let div;
    let a;
    let t0;
    let t1_value = ctx[48].id + "";
    let t1;
    let a_href_value;
    let t2;
    let t3_value = ctx[48].cnt + "";
    let t3;
    let t4;
    return {
      c() {
        div = element("div");
        a = element("a");
        t0 = text(">>");
        t1 = text(t1_value);
        t2 = text("\n                (");
        t3 = text(t3_value);
        t4 = text(" embeds)\n              ");
        attr(a, "href", a_href_value = "https://boards.4chan.org/" + ctx[10] + "/thread/" + ctx[48].id);
        attr(div, "class", "mbepis");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, a);
        append(a, t0);
        append(a, t1);
        append(div, t2);
        append(div, t3);
        append(div, t4);
      },
      p(ctx2, dirty) {
        if (dirty[0] & 16 && t1_value !== (t1_value = ctx2[48].id + ""))
          set_data(t1, t1_value);
        if (dirty[0] & 16 && a_href_value !== (a_href_value = "https://boards.4chan.org/" + ctx2[10] + "/thread/" + ctx2[48].id)) {
          attr(a, "href", a_href_value);
        }
        if (dirty[0] & 16 && t3_value !== (t3_value = ctx2[48].cnt + ""))
          set_data(t3, t3_value);
      },
      d(detaching) {
        if (detaching)
          detach(div);
      }
    };
  }
  function create_default_slot_2(ctx) {
    let label;
    let input;
    let t0;
    let a;
    let t2;
    let t3;
    let button;
    let t4;
    let t5;
    let if_block_anchor;
    let mounted;
    let dispose;
    function select_block_type(ctx2, dirty) {
      if (!ctx2[3])
        return create_if_block_12;
      return create_else_block2;
    }
    let current_block_type = select_block_type(ctx, [-1, -1]);
    let if_block = current_block_type(ctx);
    return {
      c() {
        label = element("label");
        input = element("input");
        t0 = text("\n          \n          Contribute to help keep this list up to date. [");
        a = element("a");
        a.textContent = "?";
        t2 = text("]");
        t3 = space();
        button = element("button");
        t4 = text("Refresh");
        t5 = space();
        if_block.c();
        if_block_anchor = empty();
        attr(input, "type", "checkbox");
        attr(a, "title", "This will make PEE automatically send the\n           post number of posts you find with embedded content");
        button.disabled = ctx[3];
      },
      m(target, anchor) {
        insert(target, label, anchor);
        append(label, input);
        input.checked = ctx[5].tm;
        append(label, t0);
        append(label, a);
        append(label, t2);
        insert(target, t3, anchor);
        insert(target, button, anchor);
        append(button, t4);
        insert(target, t5, anchor);
        if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        if (!mounted) {
          dispose = [
            listen(input, "change", ctx[46]),
            listen(button, "click", ctx[11])
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & 32) {
          input.checked = ctx2[5].tm;
        }
        if (dirty[0] & 8) {
          button.disabled = ctx2[3];
        }
        if (current_block_type === (current_block_type = select_block_type(ctx2, dirty)) && if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block.d(1);
          if_block = current_block_type(ctx2);
          if (if_block) {
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        }
      },
      d(detaching) {
        if (detaching)
          detach(label);
        if (detaching)
          detach(t3);
        if (detaching)
          detach(button);
        if (detaching)
          detach(t5);
        if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block6(ctx) {
    let tabpanel;
    let current;
    tabpanel = new TabPanel_default({
      props: {
        $$slots: { default: [create_default_slot_1] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(tabpanel.$$.fragment);
      },
      m(target, anchor) {
        mount_component(tabpanel, target, anchor);
        current = true;
      },
      i(local) {
        if (current)
          return;
        transition_in(tabpanel.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tabpanel.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(tabpanel, detaching);
      }
    };
  }
  function create_default_slot_1(ctx) {
    let hydrussearch;
    let current;
    hydrussearch = new HydrusSearch_default({});
    return {
      c() {
        create_component(hydrussearch.$$.fragment);
      },
      m(target, anchor) {
        mount_component(hydrussearch, target, anchor);
        current = true;
      },
      i(local) {
        if (current)
          return;
        transition_in(hydrussearch.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(hydrussearch.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(hydrussearch, detaching);
      }
    };
  }
  function create_default_slot(ctx) {
    let tablist;
    let t0;
    let tabpanel0;
    let t1;
    let tabpanel1;
    let t2;
    let tabpanel2;
    let t3;
    let tabpanel3;
    let t4;
    let if_block_anchor;
    let current;
    tablist = new TabList_default({
      props: {
        $$slots: { default: [create_default_slot_7] },
        $$scope: { ctx }
      }
    });
    tabpanel0 = new TabPanel_default({
      props: {
        $$slots: { default: [create_default_slot_6] },
        $$scope: { ctx }
      }
    });
    tabpanel1 = new TabPanel_default({
      props: {
        $$slots: { default: [create_default_slot_4] },
        $$scope: { ctx }
      }
    });
    tabpanel2 = new TabPanel_default({
      props: {
        $$slots: { default: [create_default_slot_3] },
        $$scope: { ctx }
      }
    });
    tabpanel3 = new TabPanel_default({
      props: {
        $$slots: { default: [create_default_slot_2] },
        $$scope: { ctx }
      }
    });
    let if_block = ctx[6].akValid && create_if_block6(ctx);
    return {
      c() {
        create_component(tablist.$$.fragment);
        t0 = space();
        create_component(tabpanel0.$$.fragment);
        t1 = space();
        create_component(tabpanel1.$$.fragment);
        t2 = space();
        create_component(tabpanel2.$$.fragment);
        t3 = space();
        create_component(tabpanel3.$$.fragment);
        t4 = space();
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        mount_component(tablist, target, anchor);
        insert(target, t0, anchor);
        mount_component(tabpanel0, target, anchor);
        insert(target, t1, anchor);
        mount_component(tabpanel1, target, anchor);
        insert(target, t2, anchor);
        mount_component(tabpanel2, target, anchor);
        insert(target, t3, anchor);
        mount_component(tabpanel3, target, anchor);
        insert(target, t4, anchor);
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const tablist_changes = {};
        if (dirty[0] & 64 | dirty[1] & 134217728) {
          tablist_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablist.$set(tablist_changes);
        const tabpanel0_changes = {};
        if (dirty[0] & 96 | dirty[1] & 134217728) {
          tabpanel0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tabpanel0.$set(tabpanel0_changes);
        const tabpanel1_changes = {};
        if (dirty[0] & 35 | dirty[1] & 134217728) {
          tabpanel1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tabpanel1.$set(tabpanel1_changes);
        const tabpanel2_changes = {};
        if (dirty[0] & 32 | dirty[1] & 134217728) {
          tabpanel2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tabpanel2.$set(tabpanel2_changes);
        const tabpanel3_changes = {};
        if (dirty[0] & 56 | dirty[1] & 134217728) {
          tabpanel3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tabpanel3.$set(tabpanel3_changes);
        if (ctx2[6].akValid) {
          if (if_block) {
            if (dirty[0] & 64) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block6(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(tablist.$$.fragment, local);
        transition_in(tabpanel0.$$.fragment, local);
        transition_in(tabpanel1.$$.fragment, local);
        transition_in(tabpanel2.$$.fragment, local);
        transition_in(tabpanel3.$$.fragment, local);
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(tablist.$$.fragment, local);
        transition_out(tabpanel0.$$.fragment, local);
        transition_out(tabpanel1.$$.fragment, local);
        transition_out(tabpanel2.$$.fragment, local);
        transition_out(tabpanel3.$$.fragment, local);
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        destroy_component(tablist, detaching);
        if (detaching)
          detach(t0);
        destroy_component(tabpanel0, detaching);
        if (detaching)
          detach(t1);
        destroy_component(tabpanel1, detaching);
        if (detaching)
          detach(t2);
        destroy_component(tabpanel2, detaching);
        if (detaching)
          detach(t3);
        destroy_component(tabpanel3, detaching);
        if (detaching)
          detach(t4);
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function create_fragment9(ctx) {
    let div1;
    let div0;
    let h1;
    let t1;
    let hr;
    let t2;
    let tabs;
    let current;
    tabs = new Tabs_default({
      props: {
        $$slots: { default: [create_default_slot] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        div1 = element("div");
        div0 = element("div");
        h1 = element("h1");
        h1.textContent = "PEE Settings";
        t1 = space();
        hr = element("hr");
        t2 = space();
        create_component(tabs.$$.fragment);
        attr(h1, "class", "svelte-1epvqgf");
        attr(hr, "class", "svelte-1epvqgf");
        attr(div0, "class", "content svelte-1epvqgf");
        attr(div1, "class", "backpanel svelte-1epvqgf");
        toggle_class(div1, "enabled", ctx[2]);
        toggle_class(div1, "disabled", !ctx[2]);
      },
      m(target, anchor) {
        insert(target, div1, anchor);
        append(div1, div0);
        append(div0, h1);
        append(div0, t1);
        append(div0, hr);
        append(div0, t2);
        mount_component(tabs, div0, null);
        current = true;
      },
      p(ctx2, dirty) {
        const tabs_changes = {};
        if (dirty[0] & 123 | dirty[1] & 134217728) {
          tabs_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tabs.$set(tabs_changes);
        if (dirty[0] & 4) {
          toggle_class(div1, "enabled", ctx2[2]);
        }
        if (dirty[0] & 4) {
          toggle_class(div1, "disabled", !ctx2[2]);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(tabs.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tabs.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(div1);
        destroy_component(tabs);
      }
    };
  }
  function instance9($$self, $$props, $$invalidate) {
    let $settings;
    let $appState;
    component_subscribe($$self, settings, ($$value) => $$invalidate(5, $settings = $$value));
    component_subscribe($$self, appState, ($$value) => $$invalidate(6, $appState = $$value));
    let newbooru = {};
    let dial;
    function appendBooru() {
      set_store_value(settings, $settings.rsources = [...$settings.rsources, newbooru], $settings);
      dial.toggle();
      $$invalidate(0, newbooru = {});
    }
    let visible = false;
    let penisEvent = () => {
      $$invalidate(2, visible = !visible);
    };
    document.addEventListener("penis", penisEvent);
    console.log("app loaded");
    function removeTag(t) {
      set_store_value(settings, $settings.blacklist = $settings.blacklist.filter((e) => e != t), $settings);
    }
    function removeBooru(t) {
      const idx = $settings.rsources.findIndex((e) => e.domain == t);
      const rep = prompt("You DO know what you're doing, right? (type 'y')");
      if (!rep || rep != "y")
        return;
      if (idx >= 0)
        $settings.rsources.splice(idx, 1);
      settings.set($settings);
    }
    const boardname = location.pathname.match(/\/([^/]*)\//)[1];
    let updating = false;
    let threads = [];
    async function updateThreads() {
      $$invalidate(3, updating = true);
      let params = "";
      if ($settings.phash) {
        params = "?mdist=" + $settings.mdist;
      }
      let res = await fetch("https://shoujo.coom.tech/listing/" + boardname + params);
      $$invalidate(4, threads = await res.json());
      $$invalidate(3, updating = false);
    }
    function toggleBooru(t) {
      const elem = $settings.rsources.find((e) => e.domain == t);
      if (elem)
        elem.disabled = !elem.disabled;
      settings.set($settings);
    }
    onDestroy(() => {
      document.removeEventListener("penis", penisEvent);
    });
    function input0_change_handler() {
      $settings.vercheck = this.checked;
      settings.set($settings);
    }
    function input1_change_handler() {
      $settings.xpi = this.checked;
      settings.set($settings);
    }
    function input2_change_handler() {
      $settings.xpv = this.checked;
      settings.set($settings);
    }
    function input3_change_handler() {
      $settings.loop = this.checked;
      settings.set($settings);
    }
    function input4_change_handler() {
      $settings.dh = this.checked;
      settings.set($settings);
    }
    function input5_change_handler() {
      $settings.eye = this.checked;
      settings.set($settings);
    }
    function input_change_handler() {
      $settings.ho = this.checked;
      settings.set($settings);
    }
    function input6_change_handler() {
      $settings.pre = this.checked;
      settings.set($settings);
    }
    function input7_change_handler() {
      $settings.prev = this.checked;
      settings.set($settings);
    }
    function input8_change_handler() {
      $settings.hotlink = this.checked;
      settings.set($settings);
    }
    function input9_change_handler() {
      $settings.ca = this.checked;
      settings.set($settings);
    }
    function input10_change_handler() {
      $settings.sh = this.checked;
      settings.set($settings);
    }
    function input11_change_handler() {
      $settings.ep = this.checked;
      settings.set($settings);
    }
    function input12_change_handler() {
      $settings.hyd = this.checked;
      settings.set($settings);
    }
    function input_input_handler() {
      $settings.ak = this.value;
      settings.set($settings);
    }
    function input0_input_handler() {
      $settings.auto_embed = to_number(this.value);
      settings.set($settings);
    }
    function input1_input_handler() {
      $settings.auto_tags = this.value;
      settings.set($settings);
    }
    function input_change_handler_1() {
      $settings.te = this.checked;
      settings.set($settings);
    }
    function input0_change_handler_1() {
      $settings.phash = this.checked;
      settings.set($settings);
    }
    function input_input_handler_1() {
      $settings.mdist = to_number(this.value);
      settings.set($settings);
    }
    const func = (source, e) => e.domain == source.domain;
    const remove_handler = (source) => removeBooru(source.domain);
    const toggle_handler = (source) => toggleBooru(source.domain);
    const click_handler2 = (ev) => {
      dial.setPos([ev.clientX, ev.clientY]);
      dial.toggle();
    };
    function input0_input_handler_1() {
      newbooru.name = this.value;
      $$invalidate(0, newbooru);
    }
    function input1_input_handler_1() {
      newbooru.domain = this.value;
      $$invalidate(0, newbooru);
    }
    function input2_input_handler() {
      newbooru.endpoint = this.value;
      $$invalidate(0, newbooru);
    }
    function input3_input_handler() {
      newbooru.view = this.value;
      $$invalidate(0, newbooru);
    }
    function dialog_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        dial = $$value;
        $$invalidate(1, dial);
      });
    }
    const toggle_handler_1 = (tag) => removeTag(tag);
    const keydown_handler = (ev) => {
      if (ev.key == "Enter") {
        set_store_value(settings, $settings.blacklist = [...$settings.blacklist, ev.currentTarget.value], $settings);
        ev.currentTarget.value = "";
      }
    };
    function select_change_handler() {
      $settings.fhost = select_value(this);
      settings.set($settings);
    }
    function input_input_handler_2() {
      $settings.maxe = to_number(this.value);
      settings.set($settings);
    }
    function input_change_handler_2() {
      $settings.tm = this.checked;
      settings.set($settings);
    }
    return [
      newbooru,
      dial,
      visible,
      updating,
      threads,
      $settings,
      $appState,
      appendBooru,
      removeTag,
      removeBooru,
      boardname,
      updateThreads,
      toggleBooru,
      input0_change_handler,
      input1_change_handler,
      input2_change_handler,
      input3_change_handler,
      input4_change_handler,
      input5_change_handler,
      input_change_handler,
      input6_change_handler,
      input7_change_handler,
      input8_change_handler,
      input9_change_handler,
      input10_change_handler,
      input11_change_handler,
      input12_change_handler,
      input_input_handler,
      input0_input_handler,
      input1_input_handler,
      input_change_handler_1,
      input0_change_handler_1,
      input_input_handler_1,
      func,
      remove_handler,
      toggle_handler,
      click_handler2,
      input0_input_handler_1,
      input1_input_handler_1,
      input2_input_handler,
      input3_input_handler,
      dialog_binding,
      toggle_handler_1,
      keydown_handler,
      select_change_handler,
      input_input_handler_2,
      input_change_handler_2
    ];
  }
  var App = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance9, create_fragment9, safe_not_equal, {}, add_css8, [-1, -1]);
    }
  };
  var App_default = App;

  // src/Components/ScrollHighlighter.svelte
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  function add_css9(target) {
    append_styles(target, "svelte-ausv8u", ".hint.svelte-ausv8u.svelte-ausv8u{background-color:rgb(222 222 222 / 80%);z-index:-1;pointer-events:none}.scroll-container.svelte-ausv8u.svelte-ausv8u{position:fixed;height:100%;width:12px;top:0;right:0;z-index:1000}.scroll-container.svelte-ausv8u span.svelte-ausv8u{position:absolute;right:0;width:33%;cursor:pointer;transition:width 200ms}.scroll-container.svelte-ausv8u:hover span.svelte-ausv8u{width:100%}");
  }
  function get_each_context3(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[14] = list[i];
    child_ctx[16] = i;
    return child_ctx;
  }
  function create_if_block7(ctx) {
    let div;
    let t;
    let span;
    let each_value = ctx[2].foundPosts;
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block3(get_each_context3(ctx, each_value, i));
    }
    return {
      c() {
        div = element("div");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t = space();
        span = element("span");
        attr(span, "class", "hint svelte-ausv8u");
        attr(div, "class", "scroll-container svelte-ausv8u");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(div, null);
        }
        append(div, t);
        append(div, span);
        ctx[5](span);
      },
      p(ctx2, dirty) {
        if (dirty & 5) {
          each_value = ctx2[2].foundPosts;
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context3(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block3(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(div, t);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      d(detaching) {
        if (detaching)
          detach(div);
        destroy_each(each_blocks, detaching);
        ctx[5](null);
      }
    };
  }
  function create_each_block3(ctx) {
    let span;
    let mounted;
    let dispose;
    function click_handler2() {
      return ctx[4](ctx[16]);
    }
    return {
      c() {
        span = element("span");
        set_style(span, "top", ctx[0][ctx[16]][0] + "px");
        set_style(span, "height", ctx[0][ctx[16]][1] + "px");
        set_style(span, "background-color", ctx[0][ctx[16]][3]);
        attr(span, "class", "marker svelte-ausv8u");
      },
      m(target, anchor) {
        insert(target, span, anchor);
        if (!mounted) {
          dispose = listen(span, "click", click_handler2);
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty & 1) {
          set_style(span, "top", ctx[0][ctx[16]][0] + "px");
        }
        if (dirty & 1) {
          set_style(span, "height", ctx[0][ctx[16]][1] + "px");
        }
        if (dirty & 1) {
          set_style(span, "background-color", ctx[0][ctx[16]][3]);
        }
      },
      d(detaching) {
        if (detaching)
          detach(span);
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment10(ctx) {
    let if_block_anchor;
    let if_block = ctx[3].sh && create_if_block7(ctx);
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, [dirty]) {
        if (ctx2[3].sh) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block7(ctx2);
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function getOffset(el) {
    var _x = 0;
    var _y = 0;
    while (el && el instanceof HTMLElement) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: _y, left: _x };
  }
  function instance10($$self, $$props, $$invalidate) {
    let $appState;
    let $settings;
    component_subscribe($$self, appState, ($$value) => $$invalidate(2, $appState = $$value));
    component_subscribe($$self, settings, ($$value) => $$invalidate(3, $settings = $$value));
    let positions = [];
    const getViewport = () => (typeof visualViewport != "undefined" ? () => [visualViewport.width, visualViewport.height] : () => [document.documentElement.clientWidth, document.documentElement.clientHeight])();
    const getDistFromTop = () => (typeof visualViewport != "undefined" ? () => visualViewport.pageTop : () => document.documentElement.scrollTop)();
    let viewhint;
    const updatePositions = (v) => {
      const [sw, sh] = getViewport();
      const containerScrollHeight = document.documentElement.scrollHeight;
      $$invalidate(0, positions = v.foundPosts.map((v2) => {
        const coords = getOffset(v2);
        const top = sh * (coords.top / containerScrollHeight);
        const bot = sh * ((coords.top + v2.offsetHeight) / containerScrollHeight);
        const hei = bot - top;
        return [top, hei, coords.top, getComputedStyle(v2)["borderRightColor"]];
      }));
    };
    const updateViewhint = () => {
      if (!$settings.sh)
        return;
      const [sw, sh] = getViewport();
      const fromtop = getDistFromTop();
      const containerScrollHeight = document.documentElement.scrollHeight;
      const top = sh * (fromtop / containerScrollHeight);
      const bot = sh * ((fromtop + sh) / containerScrollHeight);
      const hei = bot - top;
      $$invalidate(1, viewhint.style.top = top + "px", viewhint);
      $$invalidate(1, viewhint.style.height = hei + "px", viewhint);
    };
    appState.subscribe((v) => updatePositions(v));
    const handleResize = () => {
      updatePositions($appState);
    };
    let locked = false;
    const handleScroll = async () => {
      if (locked)
        return;
      locked = true;
      updateViewhint();
      await new Promise((_2) => requestAnimationFrame(_2));
      locked = false;
    };
    const docRszObserver = new ResizeObserver((e) => {
      updatePositions($appState);
      updateViewhint();
    });
    onMount(() => {
      window.addEventListener("resize", handleResize);
      document.addEventListener("scroll", handleScroll);
      updateViewhint();
      docRszObserver.observe(document.documentElement);
    });
    onDestroy(() => {
      window.removeEventListener("resize", handleResize);
      document.addEventListener("scroll", handleScroll);
      docRszObserver.unobserve(document.documentElement);
    });
    const click_handler2 = (i) => window.scrollTo(0, positions[i][2]);
    function span_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        viewhint = $$value;
        $$invalidate(1, viewhint);
      });
    }
    return [positions, viewhint, $appState, $settings, click_handler2, span_binding];
  }
  var ScrollHighlighter = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance10, create_fragment10, safe_not_equal, {}, add_css9);
    }
  };
  var ScrollHighlighter_default = ScrollHighlighter;

  // src/Components/PostOptions.svelte
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  function add_css10(target) {
    append_styles(target, "svelte-bgqqj3", "a.svelte-bgqqj3 i.svelte-bgqqj3{font-style:normal}a.svelte-bgqqj3.svelte-bgqqj3{cursor:pointer}.root.svelte-bgqqj3.svelte-bgqqj3{position:relative}.additionnal.svelte-bgqqj3.svelte-bgqqj3{display:none;position:absolute;flex-direction:column;gap:5px;outline:1px solid #ce3d08;padding:5px;background-color:#fffdee;border-radius:5px;left:50%;transform:translateX(-50%)}.root.svelte-bgqqj3:hover>.additionnal.svelte-bgqqj3{display:flex}");
  }
  function create_if_block8(ctx) {
    let a;
    let i;
    let t_value = ctx[1].is4chanX ? "" : "\u274C";
    let t;
    let mounted;
    let dispose;
    return {
      c() {
        a = element("a");
        i = element("i");
        t = text(t_value);
        attr(i, "class", "fa fa-times svelte-bgqqj3");
        attr(a, "title", "Discard ALL selected content");
        attr(a, "class", "svelte-bgqqj3");
      },
      m(target, anchor) {
        insert(target, a, anchor);
        append(a, i);
        append(i, t);
        if (!mounted) {
          dispose = listen(a, "click", ctx[7]);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & 2 && t_value !== (t_value = ctx2[1].is4chanX ? "" : "\u274C"))
          set_data(t, t_value);
      },
      d(detaching) {
        if (detaching)
          detach(a);
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment11(ctx) {
    let div1;
    let a0;
    let i0;
    let t0_value = ctx[1].is4chanX ? "" : "\u{1F9F2}";
    let t0;
    let t1;
    let div0;
    let a1;
    let i1;
    let t2_value = ctx[1].is4chanX ? "" : "\u{1F589}";
    let t2;
    let t3;
    let mounted;
    let dispose;
    let if_block = ctx[0].length && create_if_block8(ctx);
    return {
      c() {
        div1 = element("div");
        a0 = element("a");
        i0 = element("i");
        t0 = text(t0_value);
        t1 = space();
        div0 = element("div");
        a1 = element("a");
        i1 = element("i");
        t2 = text(t2_value);
        t3 = space();
        if (if_block)
          if_block.c();
        attr(i0, "class", "fa fa-magnet svelte-bgqqj3");
        attr(a0, "title", "Add a file");
        attr(a0, "class", "svelte-bgqqj3");
        attr(i1, "class", "fa fa-pencil svelte-bgqqj3");
        attr(a1, "title", "Add a message (this uses the content of the comment text box)");
        attr(a1, "class", "svelte-bgqqj3");
        attr(div0, "class", "additionnal svelte-bgqqj3");
        attr(div1, "class", "root svelte-bgqqj3");
      },
      m(target, anchor) {
        insert(target, div1, anchor);
        append(div1, a0);
        append(a0, i0);
        append(i0, t0);
        append(div1, t1);
        append(div1, div0);
        append(div0, a1);
        append(a1, i1);
        append(i1, t2);
        append(div0, t3);
        if (if_block)
          if_block.m(div0, null);
        if (!mounted) {
          dispose = [
            listen(a0, "click", ctx[4]),
            listen(a1, "click", ctx[3])
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & 2 && t0_value !== (t0_value = ctx2[1].is4chanX ? "" : "\u{1F9F2}"))
          set_data(t0, t0_value);
        if (dirty & 2 && t2_value !== (t2_value = ctx2[1].is4chanX ? "" : "\u{1F589}"))
          set_data(t2, t2_value);
        if (ctx2[0].length) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block8(ctx2);
            if_block.c();
            if_block.m(div0, null);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(div1);
        if (if_block)
          if_block.d();
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance11($$self, $$props, $$invalidate) {
    let $settings;
    let $appState;
    component_subscribe($$self, settings, ($$value) => $$invalidate(10, $settings = $$value));
    component_subscribe($$self, appState, ($$value) => $$invalidate(1, $appState = $$value));
    let { processors: processors2 = [] } = $$props;
    let { textinput } = $$props;
    let { links = [] } = $$props;
    const addContent = async (...newfiles) => {
      $$invalidate(0, links = [...links, ...await uploadFiles(newfiles)]);
      return embedContent({});
    };
    let original;
    let currentEmbed;
    function restore() {
      document.dispatchEvent(new CustomEvent("QRSetFile", { detail: { file: original } }));
    }
    document.addEventListener("PEEFile", async (e) => {
      let file = e.detail;
      if (currentEmbed?.file != file) {
        original = file;
        if ($settings.auto_embed && $appState.client) {
          const tags = $settings.auto_tags.split(" ").map((e2) => e2.replaceAll("_", " "));
          const efs = await getFileFromHydrus($appState.client, tags.concat(["system:limit=" + $settings.auto_embed]), { file_sort_type: 4 });
          const files = await embeddedToBlob(...efs.map((e2) => e2[1]));
          const nlinks = await uploadFiles(files);
          $$invalidate(0, links = [...links, ...nlinks]);
        }
        embedContent(e);
      }
    });
    document.addEventListener("QRPostSuccessful", () => {
      if (currentEmbed) {
        $$invalidate(0, links = []);
        currentEmbed = void 0;
        original = void 0;
      }
    });
    document.addEventListener("AddPEE", (e) => {
      let link = e.detail;
      $$invalidate(0, links = links.concat(link));
      embedContent(e);
    });
    const embedText = async (e) => {
      if (textinput.value == "")
        return;
      if (textinput.value.length > 2e3) {
        fireNotification("error", "Message attachments are limited to 2000 characters");
        return;
      }
      await addContent(new File([new Blob([textinput.value], { type: "text/plain" })], `message${links.length}.txt`));
      $$invalidate(5, textinput.value = "", textinput);
    };
    const embedContent = async (e) => {
      const file = original;
      if (!file)
        return;
      if (links.length == 0)
        return;
      const type = file.type;
      try {
        const proc = processors2.filter((e2) => e2.inject).find((e2) => e2.match(file.name));
        if (!proc)
          throw new Error("Container filetype not supported");
        const buff = await proc.inject(file, links.slice(0, $settings.maxe));
        currentEmbed = {
          file: new Blob([buff], { type }),
          name: file.name
        };
        document.dispatchEvent(new CustomEvent("QRSetFile", { detail: currentEmbed }));
        fireNotification("success", `File${links.length > 1 ? "s" : ""} successfully embedded!`);
      } catch (err) {
        const e2 = err;
        fireNotification("error", "Couldn't embed file: " + e2.message);
      }
    };
    const embedFile = async (e) => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.multiple = true;
      input.onchange = async (ev) => {
        if (input.files) {
          addContent(...input.files);
        }
      };
      input.click();
    };
    const click_handler2 = () => ($$invalidate(0, links = []), restore());
    $$self.$$set = ($$props2) => {
      if ("processors" in $$props2)
        $$invalidate(6, processors2 = $$props2.processors);
      if ("textinput" in $$props2)
        $$invalidate(5, textinput = $$props2.textinput);
      if ("links" in $$props2)
        $$invalidate(0, links = $$props2.links);
    };
    return [
      links,
      $appState,
      restore,
      embedText,
      embedFile,
      textinput,
      processors2,
      click_handler2
    ];
  }
  var PostOptions = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance11, create_fragment11, safe_not_equal, { processors: 6, textinput: 5, links: 0 }, add_css10);
    }
    get processors() {
      return this.$$.ctx[6];
    }
    set processors(processors2) {
      this.$$set({ processors: processors2 });
      flush();
    }
    get textinput() {
      return this.$$.ctx[5];
    }
    set textinput(textinput) {
      this.$$set({ textinput });
      flush();
    }
    get links() {
      return this.$$.ctx[0];
    }
    set links(links) {
      this.$$set({ links });
      flush();
    }
  };
  var PostOptions_default = PostOptions;

  // src/Components/SettingsButton.svelte
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  function add_css11(target) {
    append_styles(target, "svelte-55kf6x", ".glow.svelte-55kf6x{text-shadow:0 0 4px red}.clickable.svelte-55kf6x{cursor:pointer}.clickable.svelte-55kf6x:hover{text-shadow:0 0 4px palevioletred}");
  }
  function create_fragment12(ctx) {
    let span;
    let mounted;
    let dispose;
    return {
      c() {
        span = element("span");
        span.textContent = "[PEE Settings]";
        attr(span, "class", "clickable svelte-55kf6x");
        toggle_class(span, "glow", ctx[0]);
      },
      m(target, anchor) {
        insert(target, span, anchor);
        if (!mounted) {
          dispose = listen(span, "click", ctx[2]);
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & 1) {
          toggle_class(span, "glow", ctx2[0]);
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(span);
        mounted = false;
        dispose();
      }
    };
  }
  function instance12($$self, $$props, $$invalidate) {
    "use strict";
    let visible = false;
    function opensettings() {
      $$invalidate(0, visible = !visible);
      document.dispatchEvent(new CustomEvent("penis"));
    }
    const click_handler2 = () => opensettings();
    return [visible, opensettings, click_handler2];
  }
  var SettingsButton = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance12, create_fragment12, safe_not_equal, {}, add_css11);
    }
  };
  var SettingsButton_default = SettingsButton;

  // src/Components/Embeddings.svelte
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  function get_each_context4(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[7] = list[i];
    child_ctx[8] = list;
    child_ctx[9] = i;
    return child_ctx;
  }
  function create_each_block4(ctx) {
    let embedding;
    let i = ctx[9];
    let current;
    const assign_embedding = () => ctx[5](embedding, i);
    const unassign_embedding = () => ctx[5](null, i);
    let embedding_props = { id: ctx[1], file: ctx[7] };
    embedding = new Embedding_default({ props: embedding_props });
    assign_embedding();
    embedding.$on("fileinfo", ctx[6]);
    return {
      c() {
        create_component(embedding.$$.fragment);
      },
      m(target, anchor) {
        mount_component(embedding, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (i !== ctx2[9]) {
          unassign_embedding();
          i = ctx2[9];
          assign_embedding();
        }
        const embedding_changes = {};
        if (dirty & 2)
          embedding_changes.id = ctx2[1];
        if (dirty & 1)
          embedding_changes.file = ctx2[7];
        embedding.$set(embedding_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(embedding.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(embedding.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        unassign_embedding();
        destroy_component(embedding, detaching);
      }
    };
  }
  function create_fragment13(ctx) {
    let each_1_anchor;
    let current;
    let each_value = ctx[0];
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block4(get_each_context4(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        each_1_anchor = empty();
      },
      m(target, anchor) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(target, anchor);
        }
        insert(target, each_1_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (dirty & 7) {
          each_value = ctx2[0];
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context4(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block4(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        destroy_each(each_blocks, detaching);
        if (detaching)
          detach(each_1_anchor);
      }
    };
  }
  function instance13($$self, $$props, $$invalidate) {
    const dispatch = createEventDispatcher();
    let { files } = $$props;
    let { id = "" } = $$props;
    let children2 = {};
    async function bepis(ev) {
      for (let child of Object.values(children2))
        child.bepis(ev);
    }
    function embedding_binding($$value, i) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        children2[i] = $$value;
        $$invalidate(2, children2);
      });
    }
    function fileinfo_handler(event) {
      bubble.call(this, $$self, event);
    }
    $$self.$$set = ($$props2) => {
      if ("files" in $$props2)
        $$invalidate(0, files = $$props2.files);
      if ("id" in $$props2)
        $$invalidate(1, id = $$props2.id);
    };
    return [files, id, children2, dispatch, bepis, embedding_binding, fileinfo_handler];
  }
  var Embeddings = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance13, create_fragment13, safe_not_equal, { dispatch: 3, files: 0, id: 1, bepis: 4 });
    }
    get dispatch() {
      return this.$$.ctx[3];
    }
    get files() {
      return this.$$.ctx[0];
    }
    set files(files) {
      this.$$set({ files });
      flush();
    }
    get id() {
      return this.$$.ctx[1];
    }
    set id(id) {
      this.$$set({ id });
      flush();
    }
    get bepis() {
      return this.$$.ctx[4];
    }
  };
  var Embeddings_default = Embeddings;

  // src/Components/EyeButton.svelte
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var import_buffer10 = __toESM(require_buffer(), 1);
  function add_css12(target) {
    append_styles(target, "svelte-64lw6s", ".clickable.svelte-64lw6s{cursor:pointer;margin-left:5px}.clickable.svelte-64lw6s:hover{text-shadow:0 0 4px palevioletred}");
  }
  function get_each_context5(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[12] = list[i];
    return child_ctx;
  }
  function create_if_block_33(ctx) {
    let span;
    let t_value = ctx[5].is4chanX ? "" : !ctx[3] ? "\u{1F441}" : "\u{1F926}";
    let t;
    let mounted;
    let dispose;
    return {
      c() {
        span = element("span");
        t = text(t_value);
        attr(span, "class", "fa clickable svelte-64lw6s");
        toggle_class(span, "fa-eye", !ctx[3]);
        toggle_class(span, "fa-eye-slash", ctx[3]);
      },
      m(target, anchor) {
        insert(target, span, anchor);
        append(span, t);
        if (!mounted) {
          dispose = listen(span, "click", ctx[6]);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & 40 && t_value !== (t_value = ctx2[5].is4chanX ? "" : !ctx2[3] ? "\u{1F441}" : "\u{1F926}"))
          set_data(t, t_value);
        if (dirty & 8) {
          toggle_class(span, "fa-eye", !ctx2[3]);
        }
        if (dirty & 8) {
          toggle_class(span, "fa-eye-slash", ctx2[3]);
        }
      },
      d(detaching) {
        if (detaching)
          detach(span);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_23(ctx) {
    let a;
    let t;
    let a_href_value;
    return {
      c() {
        a = element("a");
        t = text("Source");
        attr(a, "href", a_href_value = ctx[12].source);
        attr(a, "target", "_blank");
        attr(a, "class", "clickable svelte-64lw6s");
      },
      m(target, anchor) {
        insert(target, a, anchor);
        append(a, t);
      },
      p(ctx2, dirty) {
        if (dirty & 1 && a_href_value !== (a_href_value = ctx2[12].source)) {
          attr(a, "href", a_href_value);
        }
      },
      d(detaching) {
        if (detaching)
          detach(a);
      }
    };
  }
  function create_if_block_13(ctx) {
    let a;
    let t_value = ctx[12].page.title + "";
    let t;
    let a_href_value;
    return {
      c() {
        a = element("a");
        t = text(t_value);
        attr(a, "href", a_href_value = ctx[12].page.url);
        attr(a, "target", "_blank");
        attr(a, "class", "clickable svelte-64lw6s");
      },
      m(target, anchor) {
        insert(target, a, anchor);
        append(a, t);
      },
      p(ctx2, dirty) {
        if (dirty & 1 && t_value !== (t_value = ctx2[12].page.title + ""))
          set_data(t, t_value);
        if (dirty & 1 && a_href_value !== (a_href_value = ctx2[12].page.url)) {
          attr(a, "href", a_href_value);
        }
      },
      d(detaching) {
        if (detaching)
          detach(a);
      }
    };
  }
  function create_if_block9(ctx) {
    let a;
    let mounted;
    let dispose;
    return {
      c() {
        a = element("a");
        a.textContent = "[PEE contract]";
        attr(a, "alt", "By clicking this you agree to stay hydrated");
        attr(a, "class", "clickable svelte-64lw6s");
      },
      m(target, anchor) {
        insert(target, a, anchor);
        if (!mounted) {
          dispose = listen(a, "click", ctx[11]);
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching)
          detach(a);
        mounted = false;
        dispose();
      }
    };
  }
  function create_each_block5(ctx) {
    let span;
    let t0_value = ctx[5].is4chanX ? "" : "\u{1F5AB}";
    let t0;
    let span_title_value;
    let t1;
    let t2;
    let t3;
    let if_block2_anchor;
    let mounted;
    let dispose;
    function click_handler2() {
      return ctx[10](ctx[12]);
    }
    let if_block0 = ctx[12].source && create_if_block_23(ctx);
    let if_block1 = ctx[12].page && create_if_block_13(ctx);
    let if_block2 = ctx[7] && ctx[2] && create_if_block9(ctx);
    return {
      c() {
        span = element("span");
        t0 = text(t0_value);
        t1 = space();
        if (if_block0)
          if_block0.c();
        t2 = space();
        if (if_block1)
          if_block1.c();
        t3 = space();
        if (if_block2)
          if_block2.c();
        if_block2_anchor = empty();
        attr(span, "title", span_title_value = ctx[12].filename);
        attr(span, "class", "fa fa-download clickable svelte-64lw6s");
      },
      m(target, anchor) {
        insert(target, span, anchor);
        append(span, t0);
        insert(target, t1, anchor);
        if (if_block0)
          if_block0.m(target, anchor);
        insert(target, t2, anchor);
        if (if_block1)
          if_block1.m(target, anchor);
        insert(target, t3, anchor);
        if (if_block2)
          if_block2.m(target, anchor);
        insert(target, if_block2_anchor, anchor);
        if (!mounted) {
          dispose = listen(span, "click", click_handler2);
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty & 32 && t0_value !== (t0_value = ctx[5].is4chanX ? "" : "\u{1F5AB}"))
          set_data(t0, t0_value);
        if (dirty & 1 && span_title_value !== (span_title_value = ctx[12].filename)) {
          attr(span, "title", span_title_value);
        }
        if (ctx[12].source) {
          if (if_block0) {
            if_block0.p(ctx, dirty);
          } else {
            if_block0 = create_if_block_23(ctx);
            if_block0.c();
            if_block0.m(t2.parentNode, t2);
          }
        } else if (if_block0) {
          if_block0.d(1);
          if_block0 = null;
        }
        if (ctx[12].page) {
          if (if_block1) {
            if_block1.p(ctx, dirty);
          } else {
            if_block1 = create_if_block_13(ctx);
            if_block1.c();
            if_block1.m(t3.parentNode, t3);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }
        if (ctx[7] && ctx[2]) {
          if (if_block2) {
            if_block2.p(ctx, dirty);
          } else {
            if_block2 = create_if_block9(ctx);
            if_block2.c();
            if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
          }
        } else if (if_block2) {
          if_block2.d(1);
          if_block2 = null;
        }
      },
      d(detaching) {
        if (detaching)
          detach(span);
        if (detaching)
          detach(t1);
        if (if_block0)
          if_block0.d(detaching);
        if (detaching)
          detach(t2);
        if (if_block1)
          if_block1.d(detaching);
        if (detaching)
          detach(t3);
        if (if_block2)
          if_block2.d(detaching);
        if (detaching)
          detach(if_block2_anchor);
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment14(ctx) {
    let t;
    let each_1_anchor;
    let if_block = ctx[4].eye && create_if_block_33(ctx);
    let each_value = ctx[0];
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block5(get_each_context5(ctx, each_value, i));
    }
    return {
      c() {
        if (if_block)
          if_block.c();
        t = space();
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        each_1_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, t, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(target, anchor);
        }
        insert(target, each_1_anchor, anchor);
      },
      p(ctx2, [dirty]) {
        if (ctx2[4].eye) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_33(ctx2);
            if_block.c();
            if_block.m(t.parentNode, t);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
        if (dirty & 423) {
          each_value = ctx2[0];
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context5(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block5(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(t);
        destroy_each(each_blocks, detaching);
        if (detaching)
          detach(each_1_anchor);
      }
    };
  }
  function instance14($$self, $$props, $$invalidate) {
    let $settings;
    let $appState;
    component_subscribe($$self, settings, ($$value) => $$invalidate(4, $settings = $$value));
    component_subscribe($$self, appState, ($$value) => $$invalidate(5, $appState = $$value));
    let { id = "" } = $$props;
    let { files } = $$props;
    let { inst } = $$props;
    let isVideo = false;
    inst.$on("fileinfo", (info) => {
      $$invalidate(2, isVideo = isVideo || info.detail.type.mime.startsWith("video/"));
    });
    let visible = false;
    function reveal() {
      $$invalidate(3, visible = !visible);
      document.dispatchEvent(new CustomEvent("reveal", { detail: { id } }));
    }
    const isNotChrome = !navigator.userAgent.includes("Chrome/");
    async function downloadFile(file) {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      let url;
      if (typeof file.data != "string") {
        const thumb = import_buffer10.Buffer.isBuffer(file.data) ? file.data : await file.data();
        const type = await fileTypeFromBuffer(thumb);
        url = URL.createObjectURL(new Blob([thumb], { type: type?.mime }));
      } else
        url = file.data;
      a.href = url;
      a.download = file.filename;
      a.click();
      window.URL.revokeObjectURL(url);
    }
    const click_handler2 = (file) => downloadFile(file);
    const click_handler_1 = (ev) => {
      inst.bepis(ev);
    };
    $$self.$$set = ($$props2) => {
      if ("id" in $$props2)
        $$invalidate(9, id = $$props2.id);
      if ("files" in $$props2)
        $$invalidate(0, files = $$props2.files);
      if ("inst" in $$props2)
        $$invalidate(1, inst = $$props2.inst);
    };
    return [
      files,
      inst,
      isVideo,
      visible,
      $settings,
      $appState,
      reveal,
      isNotChrome,
      downloadFile,
      id,
      click_handler2,
      click_handler_1
    ];
  }
  var EyeButton = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance14, create_fragment14, safe_not_equal, { id: 9, files: 0, inst: 1 }, add_css12);
    }
    get id() {
      return this.$$.ctx[9];
    }
    set id(id) {
      this.$$set({ id });
      flush();
    }
    get files() {
      return this.$$.ctx[0];
    }
    set files(files) {
      this.$$set({ files });
      flush();
    }
    get inst() {
      return this.$$.ctx[1];
    }
    set inst(inst) {
      this.$$set({ inst });
      flush();
    }
  };
  var EyeButton_default = EyeButton;

  // src/Components/NotificationsHandler.svelte
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  function add_css13(target) {
    append_styles(target, "svelte-120v8nn", ".clickable.svelte-120v8nn.svelte-120v8nn{cursor:pointer;float:right}.root.svelte-120v8nn>span.svelte-120v8nn{display:flex;gap:10px;border:1px solid;padding:10px;border-radius:5px;font-weight:bolder;color:white;min-width:45vw}.root.svelte-120v8nn.svelte-120v8nn{position:fixed;top:0;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;gap:10px}.error.svelte-120v8nn.svelte-120v8nn{background-color:crimson}.info.svelte-120v8nn.svelte-120v8nn{background-color:cornflowerblue}.warning.svelte-120v8nn.svelte-120v8nn{background-color:darkgoldenrod}.success.svelte-120v8nn.svelte-120v8nn{background-color:green}");
  }
  function get_each_context6(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[4] = list[i];
    return child_ctx;
  }
  function create_each_block6(key_1, ctx) {
    let span1;
    let t0_value = ctx[4].content + "";
    let t0;
    let span0;
    let span1_class_value;
    let mounted;
    let dispose;
    function click_handler2() {
      return ctx[2](ctx[4]);
    }
    return {
      key: key_1,
      first: null,
      c() {
        span1 = element("span");
        t0 = text(t0_value);
        span0 = element("span");
        span0.textContent = "X";
        attr(span0, "class", "clickable svelte-120v8nn");
        attr(span1, "class", span1_class_value = null_to_empty(ctx[4].type) + " svelte-120v8nn");
        this.first = span1;
      },
      m(target, anchor) {
        insert(target, span1, anchor);
        append(span1, t0);
        append(span1, span0);
        if (!mounted) {
          dispose = listen(span0, "click", click_handler2);
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty & 1 && t0_value !== (t0_value = ctx[4].content + ""))
          set_data(t0, t0_value);
        if (dirty & 1 && span1_class_value !== (span1_class_value = null_to_empty(ctx[4].type) + " svelte-120v8nn")) {
          attr(span1, "class", span1_class_value);
        }
      },
      d(detaching) {
        if (detaching)
          detach(span1);
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment15(ctx) {
    let div;
    let each_blocks = [];
    let each_1_lookup = /* @__PURE__ */ new Map();
    let each_value = ctx[0];
    const get_key = (ctx2) => ctx2[4].id;
    for (let i = 0; i < each_value.length; i += 1) {
      let child_ctx = get_each_context6(ctx, each_value, i);
      let key = get_key(child_ctx);
      each_1_lookup.set(key, each_blocks[i] = create_each_block6(key, child_ctx));
    }
    return {
      c() {
        div = element("div");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(div, "class", "root svelte-120v8nn");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(div, null);
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & 3) {
          each_value = ctx2[0];
          each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div, destroy_block, create_each_block6, null, get_each_context6);
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(div);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].d();
        }
      }
    };
  }
  function instance15($$self, $$props, $$invalidate) {
    let { nots = [] } = $$props;
    const removeId = (id) => $$invalidate(0, nots = nots.filter((e) => e.id != id));
    let gid2 = 0;
    document.addEventListener("CreateNotification", (e) => {
      const id = gid2++;
      $$invalidate(0, nots = [...nots, { ...e.detail, id }]);
      setTimeout(() => removeId(id), (e.detail.lifetime || 3) * 1e3);
    });
    const click_handler2 = (not) => removeId(not.id);
    $$self.$$set = ($$props2) => {
      if ("nots" in $$props2)
        $$invalidate(0, nots = $$props2.nots);
    };
    return [nots, removeId, click_handler2];
  }
  var NotificationsHandler = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance15, create_fragment15, safe_not_equal, { nots: 0 }, add_css13);
    }
    get nots() {
      return this.$$.ctx[0];
    }
    set nots(nots) {
      this.$$set({ nots });
      flush();
    }
  };
  var NotificationsHandler_default = NotificationsHandler;

  // src/websites/index.ts
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var V4chan = {
    getFileThumbnail: (post) => post.querySelector("div.file"),
    getPost: (post) => post.querySelector(".post"),
    postsWithFiles: (h) => [...(h || document).querySelectorAll(".file")].map((e) => e.closest(".postContainer")),
    settingsHost: () => document.getElementById("navtopright"),
    catalogControlHost: () => document.getElementById("settings"),
    getImageLink: (post) => post.querySelector('a[target="_blank"]')?.getAttribute("href") || "",
    getFilename: (post) => {
      const a = post.querySelector('a[target="_blank"]');
      if (a && a.title)
        return a.title;
      return a?.textContent || "";
    },
    getMD5: (post) => post.querySelector("img[data-md5]")?.getAttribute("data-md5") || "",
    getThumbnailLink: (post) => post.querySelector("img[data-md5]")?.getAttribute("src") || "",
    getInfoBox: (post) => post.querySelector("div.fileText")
  };
  var X4chan = {
    getFileThumbnail: (post) => post.querySelector("div.file"),
    getPost: (post) => post.querySelector(".post"),
    postsWithFiles: (h) => [...(h || document).querySelectorAll('.postContainer:not([class*="noFile"])')],
    settingsHost: () => document.getElementById("shortcuts"),
    catalogControlHost: () => document.getElementById("index-options"),
    getImageLink: (post) => post.querySelector('a[target="_blank"]')?.getAttribute("href") || "",
    getFilename: (post) => {
      const a = post.querySelector('a[target="_blank"]');
      const origlink = post.querySelector('.file-info > a[target*="_blank"]');
      return (origlink.querySelector(".fnfull") || origlink)?.textContent || "";
    },
    getMD5: (post) => post.querySelector("img[data-md5]")?.getAttribute("data-md5") || "",
    getThumbnailLink: (post) => post.querySelector("img[data-md5]")?.getAttribute("src") || "",
    getInfoBox: (post) => post.querySelector("span.file-info")
  };
  var FoolFuuka = {
    getFileThumbnail: (post) => post.classList.contains("post_is_op") ? post.querySelector(".thread_image_link") : post.querySelector(".thread_image_box"),
    getPost: (post) => post.querySelector(".post_wrapper"),
    postsWithFiles: (h) => [...(h || document).querySelectorAll('article[class*="has_image"]')],
    settingsHost: () => document.querySelector(".letters"),
    catalogControlHost: () => document.getElementById("index-options"),
    getImageLink: (post) => post.querySelector("a[rel]")?.getAttribute("href") || "",
    getFilename: (post) => {
      const opfn = post.querySelector("a.post_file_filename")?.textContent;
      if (opfn)
        return opfn;
      const a = post.querySelector("a[rel]");
      return a?.title || "";
    },
    getMD5: (post) => post.querySelector("img[data-md5]")?.getAttribute("data-md5") || "",
    getThumbnailLink: (post) => {
      const e = post.querySelector("img[data-md5]");
      return e?.getAttribute("src") || e?.getAttribute("data-src") || "";
    },
    getInfoBox: (post) => post.querySelector("span.post_controls")
  };
  var getQueryProcessor = (is4chanX) => {
    if (["boards.4chan.org", "boards.4channel.org"].includes(location.host))
      return is4chanX ? X4chan : V4chan;
    if (document.querySelector('meta[name="generator"]')?.getAttribute("content")?.startsWith("FoolFuuka"))
      return FoolFuuka;
  };

  // src/Components/TextEmbeddings.svelte
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  function add_css14(target) {
    append_styles(target, "svelte-1yajkn2", ".additionnal.svelte-1yajkn2{border-top:2px dashed;clear:both;margin-top:10px;padding-top:10px}");
  }
  function get_each_context7(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[2] = list[i];
    return child_ctx;
  }
  function create_each_block7(ctx) {
    let div;
    let t0_value = ctx[2] + "";
    let t0;
    let t1;
    return {
      c() {
        div = element("div");
        t0 = text(t0_value);
        t1 = space();
        attr(div, "class", "additionnal svelte-1yajkn2");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, t0);
        append(div, t1);
      },
      p: noop,
      d(detaching) {
        if (detaching)
          detach(div);
      }
    };
  }
  function create_fragment16(ctx) {
    let each_1_anchor;
    let each_value = ctx[0];
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block7(get_each_context7(ctx, each_value, i));
    }
    return {
      c() {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        each_1_anchor = empty();
      },
      m(target, anchor) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(target, anchor);
        }
        insert(target, each_1_anchor, anchor);
      },
      p(ctx2, [dirty]) {
        if (dirty & 1) {
          each_value = ctx2[0];
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context7(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block7(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        destroy_each(each_blocks, detaching);
        if (detaching)
          detach(each_1_anchor);
      }
    };
  }
  function instance16($$self, $$props, $$invalidate) {
    let { files } = $$props;
    let contents = files.map((e) => e.data.toString());
    $$self.$$set = ($$props2) => {
      if ("files" in $$props2)
        $$invalidate(1, files = $$props2.files);
    };
    return [contents, files];
  }
  var TextEmbeddings = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance16, create_fragment16, safe_not_equal, { files: 1 }, add_css14);
    }
    get files() {
      return this.$$.ctx[1];
    }
    set files(files) {
      this.$$set({ files });
      flush();
    }
  };
  var TextEmbeddings_default = TextEmbeddings;

  // src/hydrus.ts
  init_define_BUILD_VERSION();
  init_esbuild_inject();
  var HydrusClient = class {
    constructor(ak, origin = "http://127.0.0.1", port2 = 45869) {
      this.ak = ak;
      this.origin = origin;
      this.port = port2;
    }
    get baseUrl() {
      return `${this.origin}:${this.port}`;
    }
    async get(params) {
      return await fetch(this.baseUrl + params, {
        headers: {
          "Hydrus-Client-API-Access-Key": this.ak
        }
      });
    }
    async verify() {
      try {
        const ret = await this.get("/verify_access_key");
        return !!await ret.json();
      } catch (e) {
        return false;
      }
    }
    async idsByTags(taglist, args) {
      const req = await this.get("/get_files/search_files?tags=" + encodeURIComponent(JSON.stringify(taglist)) + (args ? "&" + Object.entries(args).map((e) => `${e[0]}=${encodeURIComponent(e[1])}`).join("&") : ""));
      return await req.json();
    }
    async getMetaDataByIds(ids) {
      const req = await this.get("/get_files/file_metadata?file_ids=" + encodeURIComponent(JSON.stringify(ids)));
      return await req.json();
    }
    async getFile(id) {
      const req = await this.get("/get_files/file?file_id=" + id);
      return await req.arrayBuffer();
    }
    async getThumbnail(id) {
      const req = await this.get("/get_files/thumbnail?file_id=" + id);
      return await req.arrayBuffer();
    }
  };

  // src/main.ts
  var qp;
  var csettings5 = initial_settings;
  var processors = [thirdeye_default, pomf_default, pngv3_default, jpg_default, webm_default, gif_default];
  var cappState;
  settings.subscribe(async (b) => {
    if (b.hyd) {
      if (b.ak) {
        const hydCli = new HydrusClient(b.ak);
        console.log(b.ak);
        let herror;
        try {
          const valid = await hydCli.verify();
          if (!valid)
            herror = "Hydrus appears to not be running or the key is wrong.";
          appState.set({ ...cappState, akValid: valid, client: hydCli, herror });
        } catch {
          herror = "Hydrus appears to not be running";
          appState.set({ ...cappState, akValid: false, client: null, herror });
        }
      }
    }
    csettings5 = b;
    processors = [
      ...!csettings5.te ? [thirdeye_default] : [],
      pngv3_default,
      pomf_default,
      jpg_default,
      webm_default,
      gif_default
    ];
  });
  appState.subscribe((v) => {
    cappState = v;
  });
  var processImage = async (src, fn, hex, prevurl, onfound) => {
    return Promise.all(processors.filter((e) => e.match(fn)).map(async (proc) => {
      if (proc.skip) {
        const md5 = import_buffer11.Buffer.from(hex, "base64");
        if (await proc.has_embed(md5, fn, prevurl) === true) {
          onfound();
          return [await proc.extract(md5, fn), true];
        }
        return;
      }
      const iter = streamRemote(src);
      if (!iter)
        return;
      let cumul = import_buffer11.Buffer.alloc(0);
      let found;
      let chunk = { done: true };
      do {
        const { value, done } = await iter.next(found === false);
        if (done) {
          chunk = { done: true };
        } else {
          chunk = { done: false, value };
        }
        if (!done)
          cumul = import_buffer11.Buffer.concat([cumul, value]);
        found = await proc.has_embed(cumul);
      } while (found !== false && !chunk.done);
      await iter.next(true);
      if (found === false) {
        return;
      }
      onfound();
      return [await proc.extract(cumul), false];
    }));
  };
  var textToElement = (s) => document.createRange().createContextualFragment(s).children[0];
  var pendingPosts = [];
  var signalNewEmbeds = import_lodash2.default.debounce(async () => {
    if (!csettings5.tm)
      return;
    try {
      const boardname = location.pathname.match(/\/([^/]*)\//)[1];
      const reshaped = Object.fromEntries([...new Set(pendingPosts.map((e) => e.op))].map((e) => [e, pendingPosts.filter((p) => p.op == e).map((e2) => e2.id)]));
      console.log(reshaped);
      const res = await fetch("https://shoujo.coom.tech/listing/" + boardname, {
        method: "POST",
        body: JSON.stringify(reshaped),
        headers: {
          "content-type": "application/json"
        }
      });
      await res.json();
      pendingPosts = [];
    } catch (e) {
      console.error(e);
    }
  }, 5e3, { trailing: true });
  var processPost = async (post) => {
    const origlink = qp.getImageLink(post);
    if (!origlink)
      return;
    const thumbLink = qp.getThumbnailLink(post);
    if (!thumbLink)
      return;
    let res2 = await processImage(origlink, qp.getFilename(post), qp.getMD5(post), thumbLink, () => {
      if (csettings5.tm) {
        if (["boards.4chan.org", "boards.4channel.org"].includes(location.host)) {
          if (!cappState.isCatalog) {
            const op = +location.pathname.match(/\/thread\/(.*)/)[1];
            pendingPosts.push({ id: +post.id.match(/([0-9]+)/)[1], op });
            signalNewEmbeds();
          }
        }
      }
      post.querySelector(".post")?.classList.add("embedfound");
    });
    res2 = res2?.filter((e) => e);
    if (!res2 || res2.length == 0)
      return;
    processAttachments(post, res2?.flatMap((e) => e[0].map((k) => [k, e[1]])));
  };
  var versionCheck = async () => {
    const [lmajor, lminor] = (await (await ifetch("https://git.coom.tech/coomdev/PEE/raw/branch/%e4%b8%ad%e5%87%ba%e3%81%97/main.meta.js")).text()).split("\n").filter((e) => e.includes("// @version"))[0].match(/.*version\s+(.*)/)[1].split(".").map((e) => +e);
    const [major, minor] = define_BUILD_VERSION_default;
    if (major < lmajor || major == lmajor && minor < lminor) {
      fireNotification("info", `Last PEE version is ${lmajor}.${lminor}, you're on ${major}.${minor}`);
    }
  };
  function copyTextToClipboard(text2) {
    const copyFrom = document.createElement("textarea");
    copyFrom.textContent = text2;
    document.body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand("copy");
    copyFrom.blur();
    document.body.removeChild(copyFrom);
    navigator.clipboard.writeText(text2);
  }
  var scrapeBoard = async (self2) => {
    if (csettings5.tm) {
      fireNotification("success", "Scrapping board with telemetry on! Thank you for your service, selfless stranger ;_;7");
    }
    self2.disabled = true;
    self2.textContent = "Searching...";
    const boardname = location.pathname.match(/\/([^/]*)\//)[1];
    const res = await ifetch(`https://a.4cdn.org/${boardname}/threads.json`);
    const pages = await res.json();
    fireNotification("info", "Fetching all threads...");
    const threads = (await Promise.all(pages.reduce((a, b) => [...a, ...b.threads], []).map((e) => e.no).map(async (id) => {
      try {
        const res2 = await ifetch(`https://a.4cdn.org/${boardname}/thread/${id}.json`);
        return await res2.json();
      } catch {
        return void 0;
      }
    }))).filter((e) => e).map((e) => e);
    const filenames = threads.reduce((a, b) => [...a, ...b.posts.filter((p) => p.ext).map((p) => p)], []).filter((p) => p.ext != ".webm" && p.ext != ".gif").map((p) => [p.resto || p.no, `https://i.4cdn.org/${boardname}/${p.tim}${p.ext}`, p.md5, p.filename + p.ext, p.no]);
    console.log(filenames);
    fireNotification("info", "Analyzing images...");
    const n = 7;
    const processFile = (src, fn, hex) => {
      return Promise.all(processors.filter((e) => e.match(fn)).map(async (proc) => {
        if (proc.skip) {
          const md5 = import_buffer11.Buffer.from(hex, "base64");
          return await proc.has_embed(md5, fn);
        }
        const iter = streamRemote(src);
        if (!iter)
          return false;
        let cumul = import_buffer11.Buffer.alloc(0);
        let found;
        let chunk = { done: true };
        do {
          const { value, done } = await iter.next(found === false);
          if (done) {
            chunk = { done: true };
          } else {
            chunk = { done: false, value };
          }
          if (!done)
            cumul = import_buffer11.Buffer.concat([cumul, value]);
          found = await proc.has_embed(cumul);
        } while (found !== false && !chunk.done);
        await iter.next(true);
        return found === true;
      }));
    };
    const range = ~~(filenames.length / n) + 1;
    const hasEmbed = [];
    const total = filenames.length;
    let processed = 0;
    const int = setInterval(() => {
      fireNotification("info", `Processed [${processed} / ${total}] files`);
    }, 5e3);
    await Promise.all([...new Array(n + 1)].map(async (e, i) => {
      const postsslice = filenames.slice(i * range, (i + 1) * range);
      for (const post of postsslice) {
        try {
          const res2 = await processFile(post[1], post[3], post[2]);
          processed++;
          if (res2.some((e2) => e2)) {
            hasEmbed.push(post);
            if (["boards.4chan.org", "boards.4channel.org"].includes(location.host)) {
              pendingPosts.push({ id: post[4], op: post[0] });
              signalNewEmbeds();
            }
          }
        } catch (e2) {
          console.log(e2);
        }
      }
    }));
    clearInterval(int);
    const counters = {};
    for (const k of hasEmbed)
      counters[k[0]] = k[0] in counters ? counters[k[0]] + 1 : 1;
    console.log(counters);
    fireNotification("success", "Processing finished! Results pasted in the clipboard");
    const text2 = Object.entries(counters).sort((a, b) => b[1] - a[1]).map((e) => `>>${e[0]} (${e[1]})`).join("\n");
    console.log(text2);
    copyTextToClipboard(text2);
    self2.textContent = "Copy Results";
    self2.disabled = false;
    self2.onclick = () => {
      copyTextToClipboard(text2);
    };
  };
  var startup = async (is4chanX = true) => {
    const meta2 = document.querySelector('meta[name="referrer"]');
    if (meta2) {
      meta2.setAttribute("name", "referrer");
      meta2.setAttribute("content", "no-referrer");
    }
    appState.set({ ...cappState, is4chanX });
    const lqp = getQueryProcessor(is4chanX);
    if (!lqp)
      return;
    else
      qp = lqp;
    if (csettings5.vercheck)
      versionCheck();
    if (!is4chanX && location.host.startsWith("boards.4chan")) {
      const qr = QR;
      const show = qr.show.bind(qr);
      qr.show = (...args) => {
        show(...args);
        document.dispatchEvent(new CustomEvent("QRDialogCreation", {
          detail: document.getElementById("quickReply")
        }));
      };
      document.addEventListener("QRGetFile", (e) => {
        const qr2 = document.getElementById("qrFile");
        document.dispatchEvent(new CustomEvent("QRFile", { detail: (qr2?.files || [])[0] }));
      });
      document.addEventListener("QRSetFile", (e) => {
        const qr2 = document.getElementById("qrFile");
        if (!qr2)
          return;
        const dt = new DataTransfer();
        dt.items.add(new File([e.detail.file], e.detail.name));
        qr2.files = dt.files;
      });
      const notificationHost = document.createElement("span");
      new NotificationsHandler_default({
        target: notificationHost
      });
      document.body.append(notificationHost);
    }
    const mo = new MutationObserver((reco) => {
      for (const rec of reco)
        if (rec.type == "childList")
          rec.addedNodes.forEach((e) => {
            if (!(e instanceof HTMLElement))
              return;
            let el = qp.postsWithFiles(e);
            if (!el && e.classList.contains("postContainer"))
              el = [e];
            if (el)
              [...el].map((el2) => processPost(el2));
          });
    });
    document.querySelectorAll(".board").forEach((e) => {
      mo.observe(e, { childList: true, subtree: true });
    });
    const posts = qp.postsWithFiles();
    const scts = qp.settingsHost();
    const button = textToElement(`<span></span>`);
    const settingsButton = new SettingsButton_default({
      target: button
    });
    scts?.appendChild(button);
    const appHost = textToElement(`<div class="pee-settings"></div>`);
    const appInstance = new App_default({ target: appHost });
    document.body.append(appHost);
    const scrollHost = textToElement(`<div class="pee-scroll"></div>`);
    new ScrollHighlighter_default({ target: scrollHost });
    document.body.append(scrollHost);
    appState.set({
      ...cappState,
      isCatalog: !!document.querySelector(".catalog-small") || !!location.pathname.match(/\/catalog$/)
    });
    if (cappState.isCatalog) {
      const opts = qp.catalogControlHost();
      if (opts) {
        const button2 = document.createElement("button");
        button2.textContent = "\u304A\u3082\u3089\u3057";
        button2.onclick = () => scrapeBoard(button2);
        opts.insertAdjacentElement("beforebegin", button2);
      }
    }
    const n = 7;
    const range = ~~(posts.length / n) + 1;
    await Promise.all([...new Array(n + 1)].map(async (e, i) => {
      const postsslice = posts.slice(i * range, (i + 1) * range);
      for (const post of postsslice) {
        try {
          await processPost(post);
        } catch (e2) {
          console.log("Processing failed for post", post, e2);
        }
      }
    }));
  };
  document.addEventListener("4chanXInitFinished", () => startup(true));
  document.addEventListener("4chanParsingDone", () => startup(false), { once: true });
  if (supportedAltDomain(location.host)) {
    window.addEventListener("load", () => {
      startup(false);
    }, { once: true });
  }
  document.addEventListener("4chanThreadUpdated", (e) => {
    document.dispatchEvent(new CustomEvent("ThreadUpdate", {
      detail: {
        newPosts: [...document.querySelector(".thread").children].slice(-e.detail.count).map((e2) => "b." + e2.id.slice(2))
      }
    }));
  });
  document.addEventListener("ThreadUpdate", async (e) => {
    const newPosts = e.detail.newPosts;
    for (const post of newPosts) {
      const postContainer = document.getElementById("pc" + post.substring(post.indexOf(".") + 1));
      processPost(postContainer);
    }
  });
  document.addEventListener("QRDialogCreation", (e) => {
    const a = document.createElement("span");
    const po = new PostOptions_default({
      target: a,
      props: { processors, textinput: (e.detail || e.target).querySelector("textarea") }
    });
    let target;
    if (!cappState.is4chanX) {
      target = e.detail;
      a.style.display = "inline-block";
      target.querySelector("input[type=submit]")?.insertAdjacentElement("beforebegin", a);
    } else {
      target = e.target;
      target.querySelector("#qr-filename-container")?.appendChild(a);
      const filesinp = target.querySelector("#file-n-submit");
      let prevFile;
      const obs = new MutationObserver(async (m) => {
        const currentFile = await getSelectedFile();
        if (prevFile != currentFile) {
          prevFile = currentFile;
          document.dispatchEvent(new CustomEvent("PEEFile", { detail: prevFile }));
        }
      });
      obs.observe(filesinp, { attributes: true });
    }
  }, { once: !cappState.is4chanX });
  var customStyles = document.createElement("style");
  customStyles.appendChild(document.createTextNode(global_default));
  document.documentElement.insertBefore(customStyles, null);
  var meta = document.querySelector('meta[name="referrer"]');
  if (meta) {
    meta.setAttribute("name", "referrer");
    meta.setAttribute("content", "no-referrer");
  }
  function processAttachments(post, ress) {
    if (ress.length == 0)
      return;
    const replyBox = qp.getPost(post);
    const external = ress[0][1];
    if (external)
      replyBox?.classList.add("hasext");
    else
      replyBox?.classList.add("hasembed");
    if (ress.length > 1)
      replyBox?.classList.add("hasmultiple");
    if (!cappState.foundPosts.includes(replyBox))
      cappState.foundPosts.push(replyBox);
    appState.set(cappState);
    const isCatalog = replyBox?.classList.contains("catalog-post");
    if (!isCatalog) {
      const ft = qp.getFileThumbnail(post);
      const info = qp.getInfoBox(post);
      const quot = post.querySelector("blockquote");
      const textInsertCursor = document.createElement("div");
      quot?.appendChild(textInsertCursor);
      const filehost = ft.querySelector(".filehost");
      const eyehost = info.querySelector(".eyehost");
      const imgcont = filehost || document.createElement("div");
      const eyecont = eyehost || document.createElement("span");
      if (!filehost) {
        ft.append(imgcont);
        imgcont.classList.add("fileThumb");
        imgcont.classList.add("filehost");
      } else {
        imgcont.innerHTML = "";
      }
      if (!eyehost) {
        info.append(eyecont);
        eyecont.classList.add("eyehost");
      } else {
        eyecont.innerHTML = "";
      }
      const id = ~~(Math.random() * 2e7);
      const text2 = new TextEmbeddings_default({
        target: textInsertCursor,
        props: {
          files: ress.map((e) => e[0]).filter((e) => import_buffer11.Buffer.isBuffer(e.data) && e.filename.endsWith(".txt") && e.filename.startsWith("message"))
        }
      });
      const emb = new Embeddings_default({
        target: imgcont,
        props: {
          files: ress.map((e) => e[0]),
          id: "" + id
        }
      });
      new EyeButton_default({
        target: eyecont,
        props: {
          files: ress.map((e) => e[0]),
          inst: emb,
          id: "" + id
        }
      });
    } else {
      const opFile = post.querySelector(".catalog-link");
      const ahem = opFile?.querySelector(".catalog-host");
      const imgcont = ahem || document.createElement("div");
      imgcont.className = "catalog-host";
      if (ahem) {
        imgcont.innerHTML = "";
      }
      const emb = new Embeddings_default({
        target: imgcont,
        props: {
          files: ress.map((e) => e[0])
        }
      });
      if (!ahem)
        opFile?.append(imgcont);
    }
    post.setAttribute("data-processed", "true");
  }
})();
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
