import * as Peko from "peko"
import { recursiveReaddir } from "recursiveReadDir"
import { fromFileUrl } from "fromFileUrl"
import { emit } from "emit"

const decoder = new TextDecoder()

const prod = Deno.env.get("ENVIRONMENT") === "production"
const cache = new Peko.ResponseCache()
const files = await recursiveReaddir(fromFileUrl(new URL("../components", import.meta.url)))

export default files.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+1)
  const fileUrl = new URL(`../${fileRoute}`, import.meta.url)

  return {
    route: `/${fileRoute}`,
    middleware: prod ? Peko.cacher(cache) : [],
    handler: Peko.staticHandler(fileUrl, {
      transform: async (content) => {
        const urlStr = fileUrl.toString()
        const result = await emit(urlStr, {
          load(specifier: string) {
            return Promise.resolve({ kind: 'module', specifier, content: decoder.decode(content) });
          },
        })
        return result[urlStr]
      },
      headers: new Headers({ "Content-Type": "application/javascript" })
    })
  }
})