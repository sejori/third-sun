import { 
  RequestContext,
  staticHandler
} from "peko"
import { instantiate } from "../lib/tjw_rust.generated.js";

const { resize_image } = await instantiate();
const ALLOWED_RESOLUTIONS = [400,800,1200,1600]

export const resizableImage =  (fileRoute: string) => async (ctx: RequestContext) => await staticHandler(new URL(`../${fileRoute}`, import.meta.url), {
  transform: (contents) => {
    const params = new URL(ctx.request.url).searchParams
    const [widthStr, heightStr]  = params.get("resolution")?.split("x") || []
    const width = Number(widthStr), height = Number(heightStr)

    if (
      !ALLOWED_RESOLUTIONS.includes(width) || !ALLOWED_RESOLUTIONS.includes(height)
    ) return contents

    return resize_image(contents, width, height)
  },
  headers: new Headers({
    "Cache-Control": "max-age=600, stale-while-revalidate=86400"
  })
})(ctx)