import * as Peko from "peko"
import { recursiveReaddir } from "recursiveReadDir"
import { fromFileUrl } from "fromFileUrl"
import { instantiate } from "../lib/rs_lib.generated.js";

const { resize_image } = await instantiate();
const ALLOWED_RESOLUTIONS = [400,600,800,1000,1200,1400,1600,1800,2000]

const cache = new Peko.ResponseCache()
const files = await recursiveReaddir(fromFileUrl(new URL("../static/images", import.meta.url)))

export default files.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+1)

  return {
    route: `/${fileRoute}`,
    middleware: Peko.cacher(cache),
    handler: async (ctx) => await Peko.staticHandler(new URL(`../${fileRoute}`, import.meta.url), {
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
  }
})