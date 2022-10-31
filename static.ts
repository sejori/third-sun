import * as Peko from "peko"
import { recursiveReaddir } from "recursiveReadDir"
import { lookup } from "lookup"
import { fromFileUrl } from "fromFileUrl"

const prod = Deno.env.get("ENVIRONMENT") === "production"
const cache = new Peko.ResponseCache()
const files = await recursiveReaddir(fromFileUrl(new URL("./static", import.meta.url)))

export default files.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length)

  return {
    route: fileRoute.replace("static/index.html", ""),
    middleware: prod ? Peko.cacher(cache) : [],
    handler: Peko.staticHandler({
      fileURL: new URL(`.${fileRoute}`, import.meta.url),
      contentType: lookup(file),
      headers: new Headers({
        "Cache-Control": "max-age=600, stale-while-revalidate=86400"
      })
    })
  }
})