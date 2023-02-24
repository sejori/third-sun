import { Middleware, sseHandler, staticHandler } from "peko"
import { cache } from "../cache.ts"
import { loadPrecache } from "../utils/load_precache.ts"

const loadingUrl = new URL("../public/pages/loading.html", import.meta.url)

const prod = !!Deno.env.get("DENO_DEPLOYMENT_ID")
const loadTarget = new EventTarget()
let loaded = false

export const preloader: Middleware = (ctx, next) => {
  if (loaded) return next()

  try {
    ctx.server.addRoute("/load-event", sseHandler(loadTarget))
  } catch (e) {
    console.log(e)
  }

  loadPrecache(cache).then(() => {
    console.log("preloaded")
    loaded = true
    ctx.server.removeRoute("/load-event")
    loadTarget.dispatchEvent(new CustomEvent("send", { detail: "loaded" }))
  })

  return staticHandler(loadingUrl, {
    headers: new Headers({
      "Cache-Control": prod ? "max-age=600, stale-while-revalidate=86400" : ""
    })
  })(ctx)
}