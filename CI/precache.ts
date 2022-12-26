import { Server } from "peko"
import { Store } from "super_cereal"
import { cache, routes } from "../routes.ts"
import { preloadIndex } from "../utils/preload.ts"

const encoder = new TextEncoder()

const server = new Server()
server.addRoutes(routes)

// set up super_cereal store
const shelf: Record<string, string> = {}
const store = new Store({
  set: (key, value) => shelf[key] = value,
  get: key => shelf[key]
})

// run preload util to request all images and components
await preloadIndex(server)

// serialize cache items with store
const rootId = await store.save(cache.items.map(item => {
  return { key: item.key, value: item.value }
}))

// make precahce folder (if needed)
try {
  Deno.readDirSync(new URL("../precache", import.meta.url))
} catch(e) {
  console.log(e)
  console.log("so making dir like a good boy ^^")
  await Deno.mkdir(new URL("../precache", import.meta.url))
}

// store root id in root file
await Deno.writeFile(new URL("../precache/root.txt", import.meta.url), encoder.encode(rootId))
// store all cache items
await Promise.all(Object.entries(shelf).map(async entry => {
  await Deno.writeFile(new URL(`../precache/${entry[0]}.txt`, import.meta.url), encoder.encode(entry[1]))
}))









