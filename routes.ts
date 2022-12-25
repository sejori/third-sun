import * as Peko from "peko"
import { Store } from "super_cereal"
import { recursiveReaddir } from "recursiveReadDir"
import { fromFileUrl } from "fromFileUrl"

import { bundleTs } from "./handlers/bundle-ts.ts"
import { markdown } from "./handlers/markdown.ts"
import { resizableImage } from "./handlers/resizable-image.ts"

const decoder = new TextDecoder()
const initCacheMap: Map<string, string> = new Map()
let rootId = ""
let initCacheItems = []

// CACHE SETUP
// try catch as won't exist at first
try {
  for await (const dirEntry of Deno.readDir("./precache")) {
    initCacheMap.set(dirEntry.name.split(".")[0], decoder.decode(await Deno.readFile(`./precache/${dirEntry.name}`)))
    if (dirEntry.name === "root.txt") rootId = initCacheMap.get(dirEntry.name.split(".")[0])!
  }
  const store = new Store(initCacheMap)
  initCacheItems = await store.load(rootId)
} catch (e) {
  console.log(e)
}

// const prod = Deno.env.get("ENVIRONMENT") === "production"
const prod = true
export const cache = new Peko.ResponseCache({
  items: initCacheItems
})

console.log(cache)
const indexUrl = new URL("./index.html", import.meta.url)
const htmlDoc = await Deno.readTextFile(indexUrl)

// pre-loading routes
const indexPage: Peko.Route = {
  route: "/",
  handler: Peko.staticHandler(indexUrl, {
    headers: new Headers({
      "Cache-Control": prod ? "max-age=600, stale-while-revalidate=86400" : ""
    })
  })
}

const components = await recursiveReaddir(fromFileUrl(new URL("./components", import.meta.url)))
const componentRoutes = components.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+1)
  return {
    route: `/${fileRoute}`,
    middleware: prod ? Peko.cacher(cache) : [],
    handler: bundleTs(new URL(`./${fileRoute}`, import.meta.url))
  }
})

const images = await recursiveReaddir(fromFileUrl(new URL("./static/images", import.meta.url)))
const imageRoutes = images.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+1)
  return {
    route: `/${fileRoute}`,
    middleware: Peko.cacher(cache),
    handler: resizableImage(fileRoute)
  }
})

const scripts = await recursiveReaddir(fromFileUrl(new URL("./static/scripts", import.meta.url)))
const scriptRoutes = scripts.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+1)
  return {
    route: `/${fileRoute}`,
    middleware: prod ? Peko.cacher(cache) : [],
    handler: Peko.staticHandler(new URL(`./${fileRoute}`, import.meta.url), {
      headers: new Headers({ "Cache-Control": "max-age=600, stale-while-revalidate=86400" })
    })
  }
})

const stories = await recursiveReaddir(fromFileUrl(new URL("./static/stories", import.meta.url)))
const storyRoutes = await Promise.all(stories.filter(story => story.includes(".md")).map(async (file): Promise<Peko.Route> => {
  const fileRoute = file.slice(Deno.cwd().length+1)
  const content = await Deno.readTextFile(new URL(`./${fileRoute}`, import.meta.url))
  return {
    route: `/${fileRoute.replace(".md", "")}`,
    middleware: Peko.cacher(cache),
    handler: markdown(htmlDoc, content)
  }
}))

const style = await recursiveReaddir(fromFileUrl(new URL("./static/style", import.meta.url)))
const styleRoutes = style.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+1)
  return {
    route: `/${fileRoute}`,
    middleware: prod ? Peko.cacher(cache) : [],
    handler: Peko.staticHandler(new URL(`./${fileRoute}`, import.meta.url), {
      headers: new Headers({ "Cache-Control": "max-age=600, stale-while-revalidate=86400" })
    })
  }
})

export const routes = [ 
  indexPage,
  ...componentRoutes, 
  ...imageRoutes,
  ...scriptRoutes,
  ...storyRoutes,
  ...styleRoutes
]