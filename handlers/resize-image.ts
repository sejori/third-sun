import { 
  RequestContext,
  staticHandler
} from "peko"
import { instantiate } from "../rust/lib/tjw_images.generated.js"

import { IMG_RESOLUTIONS } from "../components/config.ts"

const { resize_image } = await instantiate()

export const resizableImage =  (fileRoute: string) => async (ctx: RequestContext) => await staticHandler(new URL(`../${fileRoute}`, import.meta.url), {
  transform: (contents) => {
    const params = new URL(ctx.request.url).searchParams
    const res  = IMG_RESOLUTIONS.get(params.get("res"))
    if (!res || res === 2000) return contents

    console.log("Resizing " + fileRoute + " to res: " + res)
    return resize_image(contents, res, res)
  },
  headers: new Headers({
    "Cache-Control": "max-age=600, stale-while-revalidate=86400"
  })
})(ctx)