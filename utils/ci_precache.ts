import { Server } from "peko"
import { Store } from "super_cereal"
import router, { cache } from "../router.ts"
import { recursiveReaddir } from "recursiveReadDir"
import { fromFileUrl } from "path"

import { IMG_RESOLUTIONS } from "../components/config.ts"

const encoder = new TextEncoder()

// dummy server for generating cache
const server = new Server()
server.addRoutes(router.routes)

// set up super_cereal store
const shelf: Record<string, string> = {}
const store = new Store({
  set: (key, value) => shelf[key] = value,
  get: key => shelf[key]
})

// reset precache folder
try {
  await Deno.remove(new URL("../precache", import.meta.url), { recursive: true })
} catch(e) { console.log(e) }
try {
  await Deno.mkdir(new URL("../precache", import.meta.url))
} catch(e) { console.log(e) }

// generate request addresses for images and components
const imgFiles = await recursiveReaddir(fromFileUrl(new URL("../static/images/header-bg", import.meta.url)))
let imgSrcs: string[] = []
imgFiles.forEach(fileName => {
  IMG_RESOLUTIONS.forEach((_, key) => {
    imgSrcs.push(`http://${server.hostname}:${server.port}${fileName.split(Deno.cwd())[1]}?res=${key}`)
  })
})
imgSrcs = imgSrcs.filter(src => src.includes(".png"))

// const componentFiles = await recursiveReaddir(fromFileUrl(new URL("../components", import.meta.url)))
// const componentSrcs = componentFiles.map(fileName => `http://${server.hostname}:${server.port}${fileName.split(Deno.cwd())[1]}`)

// make requests to file dummy cache
await Promise.all([
  ...imgSrcs,
  // ...componentSrcs
].map(url => server.requestHandler(new Request(url))))

// serialize dummy cache items with store
const rootId = await store.save(cache.items.map(item => {
  return { key: item.key, value: item.value }
}))

// write root id to root file
await Deno.writeFile(new URL("../precache/root.txt", import.meta.url), encoder.encode(rootId))
// write all cache items to files
await Promise.all(Object.entries(shelf).map(async entry => {
  await Deno.writeFile(new URL(`../precache/${entry[0]}.txt`, import.meta.url), encoder.encode(entry[1]))
}))