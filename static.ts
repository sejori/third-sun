import * as Peko from "https://deno.land/x/peko@v0.5.2/mod.ts"
import { recursiveReaddir } from "https://deno.land/x/recursive_readdir@v2.0.0/mod.ts"
import { fromFileUrl } from "https://deno.land/std@0.150.0/path/mod.ts"
import { lookup } from "https://deno.land/x/media_types@v3.0.3/mod.ts"

const routes: Peko.Route[] = []
const cache = new Peko.ResponseCache()

const publicFiles = await recursiveReaddir(fromFileUrl(new URL("./public", import.meta.url)))
publicFiles.forEach(file => {
  const rootPath = `${Deno.cwd()}/public/`
  const fileRoute = `/${file.slice(rootPath.length)}`

  routes.push({
    route: fileRoute.replace("index.html", ""),
    middleware: Peko.cacher(cache),
    handler: Peko.staticHandler({
      fileURL: new URL(`./public/${fileRoute}`, import.meta.url),
      contentType: lookup(file)
    })
  })
})

export default routes