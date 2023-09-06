import { Middleware, sseHandler, ssrHandler } from "peko"
import { cache } from "../cache.ts"
import { savePagePrecache, loadPagePrecache } from "../utils/precache.ts"
import { IMG_RESOLUTIONS } from "../components/config.ts"
import Loading from "../pages/Loading.ts"
import { html, renderToReadableStream } from "pekommunity/react/mod.ts"

const loadTarget = new EventTarget()

export function loader(pageHTML: string): Middleware {
  let loaded = false

  return (ctx, next) => {
    if (loaded) return next()

    if (!ctx.server.routes.some(route => route.path === "/load-event")) {
      ctx.server.addRoute("/load-event", (ctx) => {
        // update after connect in case load dispatch is too quick
        setTimeout(() => loadTarget.dispatchEvent(new CustomEvent("send", { detail: `loaded: ${loaded}` })), 3000);
        return sseHandler(loadTarget)(ctx)
      })
    }

    loadPagePrecache(new URL(ctx.request.url), cache, async worked => {
      console.log("preloader found assets: ", worked)
      if (worked) {
        loaded = true
        loadTarget.dispatchEvent(new CustomEvent("send", { detail: `loaded: ${loaded}` }))
      } else {
        // let initial response happen before blocking with request spam
        await new Promise(res => setTimeout(res, 250))

        // do all res query params for images
        const initImgSrcs = getSrcs(pageHTML, `img(.)*is="img-resizing"(.)*`)
        const imgSrcs = initImgSrcs.map(src => {
          const base = src.split("?")[0]
          return [...IMG_RESOLUTIONS.keys()].map(key => `${base}?res=${key}`)
        }).flat()

        await savePagePrecache(new URL(ctx.request.url), [
          ...imgSrcs,
          ...getSrcs(pageHTML, "script")
        ])
        
        loadTarget.dispatchEvent(new CustomEvent("send", { detail: `loaded: ${loaded}` }))
      }
    })

    return ssrHandler(() => renderToReadableStream(html`<${Loading} />`))(ctx)
  }
}

const getSrcs = (pageHTML: string, tag: string) => {
  const regex = new RegExp(`(?<=<${tag}(.)*src=")(.)*?(?="(.))`, "g")
  const matches = pageHTML.match(regex)

  return matches || []
}