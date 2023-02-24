import * as Peko from "peko"
import { recursiveReaddir } from "recursiveReadDir"
import { fromFileUrl } from "path"
import { cache } from "./server.ts"
import { emitTS } from "./handlers/emit-ts.ts"
import { resizableImage } from "./handlers/resize-image.ts"
import { preloader } from "./middleware/preload.ts"
// import { markdown } from "./handlers/markdown.ts"
// const htmlDoc = await Deno.readTextFile(indexUrl)

export const router = new Peko.Router()

const prod = !!Deno.env.get("DENO_DEPLOYMENT_ID")
const headers = new Headers({
  "Cache-Control": prod ? "max-age=600, stale-while-revalidate=86400" : ""
})
console.log("PROD:" + prod)

// PAGES
const indexUrl = new URL("./public/pages/index.html", import.meta.url)
const tradeUrl = new URL("./public/pages/trade.html", import.meta.url)
const archiveUrl = new URL("./public/pages/archive.html", import.meta.url)
router.addRoute("/", preloader, Peko.staticHandler(indexUrl, { headers }))
router.addRoute("/trade", preloader, Peko.staticHandler(tradeUrl, { headers }))
router.addRoute("/archive", preloader, Peko.staticHandler(archiveUrl, { headers }))

// COMPONENTS
const components = await recursiveReaddir(fromFileUrl(new URL("./components", import.meta.url)))
router.addRoutes(components.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+1)
  return {
    path: `/${fileRoute}`,
    middleware: prod ? Peko.cacher(cache) : [],
    handler: emitTS(new URL(`./${fileRoute}`, import.meta.url))
  }
}))


// IMAGES
const images = await recursiveReaddir(fromFileUrl(new URL("./public/images", import.meta.url)))
router.addRoutes(images.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+1)
  return {
    path: `/${fileRoute}`,
    middleware: prod ? Peko.cacher(cache) : [],
    handler: resizableImage(fileRoute)
  }
}))


// SCRIPTS
const scripts = await recursiveReaddir(fromFileUrl(new URL("./public/scripts", import.meta.url)))
router.addRoutes(scripts.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+1)
  return {
    path: `/${fileRoute}`,
    middleware: prod ? Peko.cacher(cache) : [],
    handler: Peko.staticHandler(new URL(`./${fileRoute}`, import.meta.url), { headers })
  }
}))

// const stories = await recursiveReaddir(fromFileUrl(new URL("./public/stories", import.meta.url)))
// const storyRoutes = await Promise.all(stories.filter(story => story.includes(".md")).map(async (file): Promise<Peko.Route> => {
//   const fileRoute = file.slice(Deno.cwd().length+1)
//   const content = await Deno.readTextFile(new URL(`./${fileRoute}`, import.meta.url))
//   return {
//     route: `/${fileRoute.replace(".md", "")}`,
//     middleware: Peko.cacher(cache),
//     handler: markdown(htmlDoc, content)
//   }
// }))

// STYLE
const style = await recursiveReaddir(fromFileUrl(new URL("./public/style", import.meta.url)))
router.addRoutes(style.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+1)
  return {
    path: `/${fileRoute}`,
    middleware: prod ? Peko.cacher(cache) : [],
    handler: Peko.staticHandler(new URL(`./${fileRoute}`, import.meta.url), { headers })
  }
}))