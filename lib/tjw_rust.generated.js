// @generated file from wasmbuild -- do not edit
// deno-lint-ignore-file
// deno-fmt-ignore-file
// source-hash: 43388e184a831a08a541ce8eb2e29d4bcce37584
let wasm;
let cachedInt32Memory0;

const cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = new Uint8Array();

function getUint8Memory0() {
	if (cachedUint8Memory0.byteLength === 0) {
		cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
	}
	return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
	return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
 * Allocate memory into the module's linear memory
 * and return the offset to the start of the block.
 * @param {number} len
 * @returns {number}
 */
export function alloc(len) {
	const ret = wasm.alloc(len);
	return ret;
}

/**
 * Given a pointer to the start of a byte array and
 * its length, return the sum of its elements.
 * @param {number} ptr
 * @param {number} len
 * @param {number} width
 * @param {number} height
 * @returns {number}
 */
export function resize(ptr, len, width, height) {
	const ret = wasm.resize(ptr, len, width, height);
	return ret >>> 0;
}

const imports = {
	__wbindgen_placeholder__: {
		__wbindgen_throw: function (arg0, arg1) {
			throw new Error(getStringFromWasm0(arg0, arg1));
		},
	},
};

/**
 * Decompression callback
 *
 * @callback DecompressCallback
 * @param {Uint8Array} compressed
 * @return {Uint8Array} decompressed
 */

/**
 * Options for instantiating a Wasm instance.
 * @typedef {Object} InstantiateOptions
 * @property {URL=} url - Optional url to the Wasm file to instantiate.
 * @property {DecompressCallback=} decompress - Callback to decompress the
 * raw Wasm file bytes before instantiating.
 */

/** Instantiates an instance of the Wasm module returning its functions.
 * @remarks It is safe to call this multiple times and once successfully
 * loaded it will always return a reference to the same object.
 * @param {InstantiateOptions=} opts
 */
export async function instantiate(opts) {
	return (await instantiateWithInstance(opts)).exports;
}

let instanceWithExports;
let lastLoadPromise;

/** Instantiates an instance of the Wasm module along with its exports.
 * @remarks It is safe to call this multiple times and once successfully
 * loaded it will always return a reference to the same object.
 * @param {InstantiateOptions=} opts
 * @returns {Promise<{
 *   instance: WebAssembly.Instance;
 *   exports: { alloc: typeof alloc; resize: typeof resize }
 * }>}
 */
export function instantiateWithInstance(opts) {
	if (instanceWithExports != null) {
		return Promise.resolve(instanceWithExports);
	}
	if (lastLoadPromise == null) {
		lastLoadPromise = (async () => {
			try {
				const instance = (await instantiateModule(opts ?? {})).instance;
				wasm = instance.exports;
				cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
				cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
				instanceWithExports = {
					instance,
					exports: getWasmInstanceExports(),
				};
				return instanceWithExports;
			} finally {
				lastLoadPromise = null;
			}
		})();
	}
	return lastLoadPromise;
}

function getWasmInstanceExports() {
	return { alloc, resize };
}

/** Gets if the Wasm module has been instantiated. */
export function isInstantiated() {
	return instanceWithExports != null;
}

/**
 * @param {InstantiateOptions} opts
 */
async function instantiateModule(opts) {
	const wasmUrl = opts.url ?? new URL("tjw_rust_bg.wasm", import.meta.url);
	const decompress = opts.decompress;
	const isFile = wasmUrl.protocol === "file:";

	// make file urls work in Node via dnt
	const isNode = globalThis.process?.versions?.node != null;
	if (isNode && isFile) {
		// the deno global will be shimmed by dnt
		const wasmCode = await Deno.readFile(wasmUrl);
		return WebAssembly.instantiate(decompress ? decompress(wasmCode) : wasmCode, imports);
	}

	switch (wasmUrl.protocol) {
		case "file:":
		case "https:":
		case "http:": {
			if (isFile) {
				if (typeof Deno !== "object") {
					throw new Error("file urls are not supported in this environment");
				}
				if ("permissions" in Deno) {
					await Deno.permissions.request({ name: "read", path: wasmUrl });
				}
			} else if (typeof Deno === "object" && "permissions" in Deno) {
				await Deno.permissions.request({ name: "net", host: wasmUrl.host });
			}
			const wasmResponse = await fetch(wasmUrl);
			if (decompress) {
				const wasmCode = new Uint8Array(await wasmResponse.arrayBuffer());
				return WebAssembly.instantiate(decompress(wasmCode), imports);
			}
			if (
				isFile ||
				wasmResponse.headers.get("content-type")?.toLowerCase()
					.startsWith("application/wasm")
			) {
				return WebAssembly.instantiateStreaming(wasmResponse, imports);
			} else {
				return WebAssembly.instantiate(await wasmResponse.arrayBuffer(), imports);
			}
		}
		default:
			throw new Error(`Unsupported protocol: ${wasmUrl.protocol}`);
	}
}
