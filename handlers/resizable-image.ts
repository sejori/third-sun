import { 
  RequestContext,
  staticHandler
} from "peko"
import { instantiate } from "../lib/tjw_rust.generated.js"

export const IMG_RESOLUTIONS = new Map();
IMG_RESOLUTIONS.set("low", 800);
IMG_RESOLUTIONS.set("med", 1200);
IMG_RESOLUTIONS.set("high", 1600);
IMG_RESOLUTIONS.set("full", 2000);

const { resize_image } = await instantiate()

export const resizableImage =  (fileRoute: string) => async (ctx: RequestContext) => await staticHandler(new URL(`../${fileRoute}`, import.meta.url), {
  transform: (contents) => {
    const params = new URL(ctx.request.url).searchParams
    const res  = IMG_RESOLUTIONS.get(params.get("res"))

    if (!res) return contents

    return resize_image(contents, res, res)
  },
  headers: new Headers({
    "Cache-Control": "max-age=600, stale-while-revalidate=86400"
  })
})(ctx)