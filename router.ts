import * as Peko from "peko"
import { resizableImage } from "pekommunity/imagemagick_deno/mod.ts"
import { html, renderToReadableStream, renderToString } from "pekommunity/react/mod.ts"
import { emitTSBundle } from "pekommunity/emit/mod.ts"
import { recursiveReaddir } from "recursiveReadDir"
import { fromFileUrl } from "path"

import { cache } from "./cache.ts"
import { loader } from "./middleware/loader.ts"
import { IMG_RESOLUTIONS } from "./components/config.ts" 
// import { markdown } from "./handlers/markdown.ts"
// const htmlDoc = await Deno.readTextFile(indexUrl)

import { getProducts } from "./utils/gelato.ts"

import Index from "./pages/Index.ts"
import Trade from "./pages/Trade.ts"
import Archive from "./pages/Archive.ts"

export const router = new Peko.Router()

const prod = Deno.args[0] !== "dev"
/* for dev -> */ // const prod = true
const headers = new Headers({
  "Cache-Control": prod ? "max-age=600, stale-while-revalidate=86400" : ""
})
console.log("PROD:" + prod)

// gelato test
router.addRoute("/t-shirts", async () => {
  return new Response(JSON.stringify(await getProducts("t-shirts"), null, 2), {
    headers: {
      "Content-Type": "application/json"
    }
  })
})

// PAGES
router.addRoute(
  "/", 
  prod ? loader(renderToString(html`<${Index} />`)) : [], 
  Peko.ssrHandler(() => renderToReadableStream(html`<${Index} />`), { headers })
)
router.addRoute(
  "/trade", 
  prod ? loader(renderToString(html`<${Trade} />`)) : [], 
  Peko.ssrHandler(() => renderToReadableStream(html`<${Trade} />`), { headers })
)
router.addRoute(
  "/archive", 
  prod ? loader(renderToString(html`<${Archive} />`)) : [], 
  Peko.ssrHandler(() => renderToReadableStream(html`<${Archive} />`), { headers })
)

// COMPONENTS
const components = await recursiveReaddir(fromFileUrl(new URL("./components", import.meta.url)))
router.addRoutes(components.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+1).replaceAll(/\\/g, "/")
  return {
    path: `/${fileRoute}`,
    middleware: prod ? Peko.cacher(cache) : [],
    handler: emitTSBundle(new URL(`./${fileRoute}`, import.meta.url))
  }
}))


// IMAGES
const images = await recursiveReaddir(fromFileUrl(new URL("./public/images", import.meta.url)))
router.addRoutes(images.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+1).replaceAll(/\\/g, "/")
  return {
    path: `/${fileRoute}`,
    middleware: prod ? Peko.cacher(cache) : [],
    handler: resizableImage(new URL(`./${fileRoute}`, import.meta.url), IMG_RESOLUTIONS)
  }
}))


// SCRIPTS
const scripts = await recursiveReaddir(fromFileUrl(new URL("./public/scripts", import.meta.url)))
router.addRoutes(scripts.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+1).replaceAll(/\\/g, "/")
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
  const fileRoute = file.slice(Deno.cwd().length+1).replaceAll(/\\/g, "/")
  return {
    path: `/${fileRoute}`,
    middleware: prod ? Peko.cacher(cache) : [],
    handler: Peko.staticHandler(new URL(`./${fileRoute}`, import.meta.url), { headers })
  }
}))