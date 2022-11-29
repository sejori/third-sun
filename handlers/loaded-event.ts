import { 
  RequestContext,
  Server,
  sseHandler,
  staticHandler
} from "peko"

import { 
  preloadPageImages,
  preloadPageComponents
} from "../utils/preload.ts"

import { prod } from "../server.ts"

const reloadEventTarget = new EventTarget()

// swap "/" route to index.html and send reload event after successful
// requests to all page image and component assets
export const loadedEvent = (server: Server) => (ctx: RequestContext) => {
  const indexUrl = new URL("../index.html", import.meta.url)

  Promise.all([
    preloadPageComponents(indexUrl, server),
    preloadPageImages(indexUrl, server)
  ]).then(_ => {
    server.removeRoute("/")
    server.addRoute("/", {
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