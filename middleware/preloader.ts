import { Middleware, sseHandler, staticHandler } from "peko"
import { cache } from "../cache.ts"
import { savePagePrecache, loadPagePrecache } from "../utils/precache.ts"
import { IMG_RESOLUTIONS } from "../components/config.ts"

const loadingUrl = new URL("../public/pages/loading.html", import.meta.url)
const loadTarget = new EventTarget()

export const preloader = (pageUrl: URL): Middleware => {
  let loaded = false

  return (ctx, next) => {
    if (loaded) return next()

    if (!ctx.server.routes.some(route => route.path === "/load-event")) {
      ctx.server.addRoute("/load-event", sseHandler(loadTarget))
    }

    loadPagePrecache(pageUrl, cache, async worked => {
      console.log("preloader found assets: ", worked)
      if (worked) {
        loaded = true
        ctx.server.removeRoute("/load-event")
        loadTarget.dispatchEvent(new CustomEvent("send", { detail: "loaded" }))
      } else {
        // let initial response happen before triggering loads more
        await new Promise(res => setTimeout(res, 100))

        // do all res query params for images
        const initImgSrcs = await getSrcs(pageUrl, `img(.)*is="smart-img"(.)*`)
        const imgSrcs = initImgSrcs.map(src => {
          const base = src.split("?")[0]
          return [...IMG_RESOLUTIONS.keys()].filter(val => val !== "high").map(key => `${base}?res=${key}`)
        }).flat()

        await savePagePrecache(pageUrl, [
          ...imgSrcs,
          ...await getSrcs(pageUrl, "script")
        ])
        ctx.server.removeRoute("/load-event")
        loadTarget.dispatchEvent(new CustomEvent("send", { detail: "saved" }))
      }
    })

    return staticHandler(loadingUrl)(ctx)
  }
}

const getSrcs = async (pageURL: URL, tag: string) => {
  const regex = new RegExp(`(?<=<${tag}(.)*src=")(.)*?(?="(.))`, "g")
  const html = await Deno.readTextFile(pageURL)
  const matches = html.match(regex)

  return matches || []
}