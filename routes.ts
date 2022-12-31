import * as Peko from "peko"
import { Store } from "super_cereal"
import { recursiveReaddir } from "recursiveReadDir"
import { fromFileUrl } from "path"

import { emitTS } from "./handlers/emit-ts.ts"
// import { markdown } from "./handlers/markdown.ts"
import { resizableImage } from "./handlers/resize-image.ts"

const decoder = new TextDecoder()
const initCacheMap: Map<string, string> = new Map()
let rootId = ""
let initCacheItems: { key: string, value: Response }[] = []

// CACHE SETUP
try {
  for await (const dirEntry of Deno.readDir("./precache")) {
    const key = dirEntry.name.split(".txt")[0]
    const value = decoder.decode(await Deno.readFile(`./precache/${dirEntry.name}`))

    if (key === "root") {
      rootId = value
      break
    }

    initCacheMap.set(key, value)
  }

  const store = new Store(initCacheMap)
  const storeItems = await store.load(rootId)
  // deno-lint-ignore no-explicit-any
  initCacheItems = storeItems.map((item: any) => {
    return { key: item.key, value: item.value }
  })
} catch (e) {
  console.log(e)
}

// const prod = Deno.env.get("ENVIRONMENT") === "production"
const prod = true
export const cache = new Peko.ResponseCache({
  items: initCacheItems
})

const indexUrl = new URL("./index.html", import.meta.url)
// const htmlDoc = await Deno.readTextFile(indexUrl)

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
    handler: emitTS(new URL(`./${fileRoute}`, import.meta.url))
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
  // ...storyRoutes,
  ...styleRoutes
]