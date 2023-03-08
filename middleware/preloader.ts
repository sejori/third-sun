import { Middleware, sseHandler, staticHandler } from "peko"
// import { cache } from "../cache.ts"
// import { loadPrecache } from "../utils/load_precache.ts"
import { getSrcs } from "../utils/preload.ts"

const loadingUrl = new URL("../public/pages/loading.html", import.meta.url)

const prod = !!Deno.env.get("DENO_DEPLOYMENT_ID")
const loadTarget = new EventTarget()

export const preloader = (pageUrl: URL): Middleware => {
  let loaded = false

  return async (ctx, next) => {
    if (loaded) return next()

    ctx.server.addRoute("/load-event", sseHandler(loadTarget))

    const srcs = [
      ...await getSrcs(pageUrl, "img"),
      ...await getSrcs(pageUrl, "script")
    ]

    Promise.all(srcs.map(async src => {
      await new Promise(res => setTimeout(res, 100))
      await ctx.server.requestHandler(new Request(new URL(`http://${ctx.server.hostname}:${ctx.server.port}${src}`)))
    })).then(() => {
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
}