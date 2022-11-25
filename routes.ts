import * as Peko from "peko"
import { recursiveReaddir } from "recursiveReadDir"
import { fromFileUrl } from "fromFileUrl"

import { bundleTs } from "./handlers/bundle-ts.ts"
import { markdown } from "./handlers/markdown.ts"
import { resizableImage } from "./handlers/resizable-image.ts"

const prod = Deno.env.get("ENVIRONMENT") === "production"
const cache = new Peko.ResponseCache()
const htmlDoc = await Deno.readTextFile(new URL("./index.html", import.meta.url))

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

export default [ 
  ...componentRoutes, 
  ...imageRoutes,
  ...styleRoutes,
  ...storyRoutes
]