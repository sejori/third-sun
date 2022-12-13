import { 
  RequestContext,
  staticHandler
} from "peko"
import { instantiate } from "../lib/tjw_rust.generated.js"

import { IMG_RESOLUTIONS } from "../components/config.ts"

const { resize } = await instantiate()

export const resizableImage =  (fileRoute: string) => async (ctx: RequestContext) => await staticHandler(new URL(`../${fileRoute}`, import.meta.url), {
  transform: (contents) => {
    const params = new URL(ctx.request.url).searchParams;
    const res = IMG_RESOLUTIONS.get(params.get("res"));

    if (!res) return contents

    const memory = new WebAssembly.Memory({
      initial: 10,
      maximum: 100,
    });

    // copy content buffer into rust memory buffer
    const buffer = new Uint8Array(memory.buffer, undefined, contents.length);
    for (let i = 0; i < contents.length; i++) {
      buffer[i] = contents[i];
    }

    console.log(buffer.length);

    // perform resize with copy out
    const newLength = resize(memory, res, res);
    const newBuffer = new Uint8Array(memory.buffer, undefined, newLength);

    console.log(newBuffer.length);

    return newBuffer;
  },
  headers: new Headers({
    "Cache-Control": "max-age=600, stale-while-revalidate=86400"
  })
})(ctx)