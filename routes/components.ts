import * as Peko from "peko"
import { recursiveReaddir } from "recursiveReadDir"
import { fromFileUrl } from "fromFileUrl"
import { transpileTs } from "../utils.ts"

const prod = Deno.env.get("ENVIRONMENT") === "production"
const cache = new Peko.ResponseCache()
const files = await recursiveReaddir(fromFileUrl(new URL("../components", import.meta.url)))

export default files.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+1)
  const fileUrl = new URL(`../${fileRoute}`, import.meta.url)

  return {
    route: `/${fileRoute}`,
    middleware: prod ? Peko.cacher(cache) : [],
    handler: async (ctx) => {
      const tsResponse = await Peko.staticHandler({
        fileURL: fileUrl,
        contentType: "application/javascript"
      })(ctx)
      const tsCode = await tsResponse.text()
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