import { 
  RequestContext,
  sseHandler,
  staticHandler
} from "peko"
import { preloadIndex } from "../utils/preload.ts"

const prod = Deno.env.get("ENVIRONMENT") === "production"
const reloadEventTarget = new EventTarget()
const indexUrl = new URL("../index.html", import.meta.url)

// swap "/" route to index.html and send reload event after successful
// requests to all page image and component assets
export const loadEvent = (ctx: RequestContext) => {
  preloadIndex(ctx.server).then(_ => {
    ctx.server.removeRoute("/")
    ctx.server.addRoute("/", {
      handler: staticHandler(indexUrl, {
        headers: new Headers({
          "Cache-Control": prod ? "max-age=600, stale-while-revalidate=86400" : ""
        })
      })
    })

    reloadEventTarget.dispatchEvent(new CustomEvent("data"))
  })

  return sseHandler(reloadEventTarget)(ctx)
}