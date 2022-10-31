import * as Peko from "https://deno.land/x/peko@v0.5.2/mod.ts"
import { recursiveReaddir } from "https://deno.land/x/recursive_readdir@v2.0.0/mod.ts"
import { lookup } from "https://deno.land/x/media_types@v3.0.3/mod.ts"
import { fromFileUrl } from "https://deno.land/std@0.150.0/path/mod.ts"

const cache = new Peko.ResponseCache()
const files = await recursiveReaddir(fromFileUrl(new URL("./static", import.meta.url)))

export default files.map(file => {
  const fileRoute = file.slice(Deno.cwd().length)

  return {
    route: fileRoute.replace("static/index.html", ""),
    // middleware: Peko.cacher(cache),
    handler: Peko.staticHandler({
      fileURL: new URL(`.${fileRoute}`, import.meta.url),
      contentType: lookup(file)
    })
  }
})