import * as Peko from "peko"
import { recursiveReaddir } from "recursiveReadDir"
import { fromFileUrl } from "fromFileUrl"
import { instantiate } from "../lib/rs_lib.generated.js";

const { resize_image } = await instantiate();

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
        const resolution = params.get("resolution")?.split("x")
        if (!resolution || resolution.length !== 2) return contents

        return resize_image(contents, Number(resolution[0]), Number(resolution[1]))
      },
      headers: new Headers({
        "Cache-Control": "max-age=600, stale-while-revalidate=86400"
      })
    })(ctx)
  }
})