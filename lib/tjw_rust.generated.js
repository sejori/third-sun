// @generated file from wasmbuild -- do not edit
// deno-lint-ignore-file
// deno-fmt-ignore-file
// source-hash: 5c8a1cf7ce55021cbf91f3bf48a443ebd7bb4ae1
let wasm;
let cachedInt32Memory0;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) {
	return heap[idx];
}

let heap_next = heap.length;

function dropObject(idx) {
	if (idx < 36) return;
	heap[idx] = heap_next;
	heap_next = idx;
}

function takeObject(idx) {
	const ret = getObject(idx);
	dropObject(idx);
	return ret;
}

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

function addHeapObject(obj) {
	if (heap_next === heap.length) heap.push(heap.length + 1);
	const idx = heap_next;
	heap_next = heap[idx];

	heap[idx] = obj;
	return idx;
}
/**
 * @param {number} memory
 * @param {number} width
 * @param {number} height
 * @returns {number}
 */
export function resize(memory, width, height) {
	const ret = wasm.resize(memory, width, height);
	return ret >>> 0;
}

const imports = {
	__wbindgen_placeholder__: {
		__wbg_log_ef4a217eae298152: function (arg0, arg1) {
			console.log(getStringFromWasm0(arg0, arg1));
		},
		__wbindgen_object_drop_ref: function (arg0) {
			takeObject(arg0);
		},
		__wbg_buffer_3f3d764d4747d564: function (arg0) {
			const ret = getObject(arg0).buffer;
			return addHeapObject(ret);
		},
		__wbg_new_8c3f0052272a457a: function (arg0) {
			const ret = new Uint8Array(getObject(arg0));
			return addHeapObject(ret);
		},
		__wbg_set_83db9690f9353e79: function (arg0, arg1, arg2) {
			getObject(arg0).set(getObject(arg1), arg2 >>> 0);
		},
		__wbg_length_9e1ae1900cb0fbd5: function (arg0) {
			const ret = getObject(arg0).length;
			return ret;
		},
		__wbindgen_throw: function (arg0, arg1) {
			throw new Error(getStringFromWasm0(arg0, arg1));
		},
		__wbindgen_memory: function () {
			const ret = wasm.memory;
			return addHeapObject(ret);
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
 *   exports: { resize: typeof resize }
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
	return { resize };
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
