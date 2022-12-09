import { 
  RequestContext,
  staticHandler
} from "peko"
import { instantiate } from "../lib/tjw_rust.generated.js"

import { IMG_RESOLUTIONS } from "../components/config.ts"

const { alloc, resize } = await instantiate()

export const resizableImage =  (fileRoute: string) => async (ctx: RequestContext) => await staticHandler(new URL(`../${fileRoute}`, import.meta.url), {
  transform: (contents) => {
    const params = new URL(ctx.request.url).searchParams
    const res  = IMG_RESOLUTIONS.get(params.get("res"))

    if (!res) return contents

    // create pointer to rust memory buffer of content size
    const ptr = alloc(contents.length)

    // copy content buffer into rust memory and store ref?
    const buffer = new Uint8Array(contents, ptr, contents.length);
    console.log(buffer.length);

    // perform resize 
    resize(ptr, contents.length, res, res)

    console.log(buffer.length)

    return buffer;
  },
  headers: new Headers({
    "Cache-Control": "max-age=600, stale-while-revalidate=86400"
  })
})(ctx)