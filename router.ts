import * as Peko from "peko"
import { recursiveReaddir } from "recursiveReadDir"
import { fromFileUrl } from "path"
import { loadPrecache } from "./utils/load_precache.ts"
import { emitTS } from "./handlers/emit-ts.ts"
import { resizableImage } from "./handlers/resize-image.ts"
// import { markdown } from "./handlers/markdown.ts"
// const htmlDoc = await Deno.readTextFile(indexUrl)

const router = new Peko.Router()
const prod = Deno.env.get("DENO_DEPLOYMENT_ID")
console.log("PROD:" + prod)

const cache = new Peko.ResponseCache()

const loadingUrl = new URL("./loading.html", import.meta.url)
const indexUrl = new URL("./index.html", import.meta.url)

// loading page -> index page
const loadTarget = new EventTarget()
router.addRoute("/", Peko.staticHandler(loadingUrl, {
  headers: new Headers({
    "Cache-Control": prod ? "max-age=600, stale-while-revalidate=86400" : ""
  })
}))

router.addRoute("/load-event", Peko.sseHandler(loadTarget))
loadPrecache(cache).then(() => {
  console.log("loaded precache")

  router.removeRoute("/")
  router.removeRoute("/load-event")

  router.addRoute("/", Peko.staticHandler(indexUrl, {
    headers: new Headers({
      "Cache-Control": prod ? "max-age=600, stale-while-revalidate=86400" : ""
    })
  }))
  router.addRoute("/load-event", () => Response.redirect("/", 302))

  loadTarget.dispatchEvent(new CustomEvent("send", { detail: "loaded" }))
})

const components = await recursiveReaddir(fromFileUrl(new URL("./components", import.meta.url)))
router.addRoutes(components.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+1)
  return {
    route: `/${fileRoute}`,
    middleware: prod ? Peko.cacher(cache) : [],
    handler: emitTS(new URL(`./${fileRoute}`, import.meta.url))
  }
}))

const images = await recursiveReaddir(fromFileUrl(new URL("./static/images", import.meta.url)))
router.addRoutes(images.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+1)
  return {
    route: `/${fileRoute}`,
    middleware: Peko.cacher(cache),
    handler: resizableImage(fileRoute)
  }
}))

const scripts = await recursiveReaddir(fromFileUrl(new URL("./static/scripts", import.meta.url)))
router.addRoutes(scripts.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+1)
  return {
    route: `/${fileRoute}`,
    middleware: prod ? Peko.cacher(cache) : [],
    handler: Peko.staticHandler(new URL(`./${fileRoute}`, import.meta.url), {
      headers: new Headers({ "Cache-Control": "max-age=600, stale-while-revalidate=86400" })
    })
  }
}))

// const stories = await recursiveReaddir(fromFileUrl(new URL("./static/stories", import.meta.url)))
// const storyRoutes = await Promise.all(stories.filter(story => story.includes(".md")).map(async (file): Promise<Peko.Route> => {
//   const fileRoute = file.slice(Deno.cwd().length+1)
//   const content = await Deno.readTextFile(new URL(`./${fileRoute}`, import.meta.url))
//   return {
//     route: `/${fileRoute.replace(".md", "")}`,
//     middleware: Peko.cacher(cache),
//     handler: markdown(htmlDoc, content)
//   }
// }))

const style = await recursiveReaddir(fromFileUrl(new URL("./static/style", import.meta.url)))
router.addRoutes(style.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+1)
  return {
    route: `/${fileRoute}`,
    middleware: prod ? Peko.cacher(cache) : [],
    handler: Peko.staticHandler(new URL(`./${fileRoute}`, import.meta.url), {
      headers: new Headers({ "Cache-Control": "max-age=600, stale-while-revalidate=86400" })
    })
  }
}))

export default router
export { cache }