import * as Peko from "peko"
import { recursiveReaddir } from "recursiveReadDir"
import { fromFileUrl } from "fromFileUrl"
import { transpileTs } from "../utils.ts"

const prod = Deno.env.get("ENVIRONMENT") === "production"
const cache = new Peko.ResponseCache()
const files = await recursiveReaddir(fromFileUrl(new URL("../components", import.meta.url)))

export default files.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length)
  const fileUrl = new URL(`..${fileRoute}`, import.meta.url)

  return {
    route: fileRoute,
    middleware: prod ? Peko.cacher(cache) : [],
    handler: async (ctx) => {
      const tsResponse = await Peko.staticHandler({
        fileURL: fileUrl,
        contentType: "application/javascript"
      })(ctx)
      const tsCode = await tsResponse.text()
      /* source: https://github.com/BrunoBernardino/deno-boilerplate-simple-website/blob/ab99bfb993485b796028af49006acb31f6a6e162/lib/utils.ts */
      const jsCode = await transpileTs(tsCode, fileUrl)
      const { headers } = tsResponse;
    
      return new Response(jsCode, {
        status: tsResponse.status,
        statusText: tsResponse.statusText,
        headers
      })
    }
  }
})