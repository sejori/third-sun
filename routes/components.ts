import * as Peko from "peko"
import { emit } from "emit"
import { recursiveReaddir } from "recursiveReadDir"
import { fromFileUrl } from "fromFileUrl"

const prod = Deno.env.get("ENVIRONMENT") === "production"
const cache = new Peko.ResponseCache()
const files = await recursiveReaddir(fromFileUrl(new URL("../components", import.meta.url)))

export default files.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length)

  return {
    route: fileRoute,
    middleware: prod ? Peko.cacher(cache) : [],
    handler: async (ctx) => {
      /* source: https://github.com/BrunoBernardino/deno-boilerplate-simple-website/blob/ab99bfb993485b796028af49006acb31f6a6e162/lib/utils.ts */
      const tsResponse = await Peko.staticHandler({
        fileURL: new URL(file),
        contentType: "application/javascript"
      })(ctx)
      const tsCode = await tsResponse.json()

      const jsCode = await transpileTs(tsCode, new URL(file))
      const { headers } = tsResponse;
    
      return new Response(jsCode, {
        status: tsResponse.status,
        statusText: tsResponse.statusText,
        headers
      })
    }
  }
})

/* source: https://github.com/BrunoBernardino/deno-boilerplate-simple-website/blob/ab99bfb993485b796028af49006acb31f6a6e162/lib/utils.ts */
async function transpileTs(content: string, specifier: URL) {
  const urlStr = specifier.toString();
  const result = await emit(specifier, {
    load(specifier: string) {
      if (specifier !== urlStr) {
        return Promise.resolve({ kind: 'module', specifier, content: '' });
      }
      return Promise.resolve({ kind: 'module', specifier, content });
    },
  });
  return result[urlStr];
}