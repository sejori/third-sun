import { Server } from "peko"
import { Store } from "super_cereal"
import { cache, routes } from "../routes.ts"
import { preloadIndex } from "../utils/preload.ts"

const encoder = new TextEncoder()

const server = new Server()
server.addRoutes(routes)

const shelf: Record<string, string> = {}
const store = new Store({
  set: (key, value) => shelf[key] = value,
  get: key => shelf[key]
})

await preloadIndex(server)

const rootId = await store.save(cache.items.map(item => {
  return { key: item.key, value: item.value }
}))

try {
  Deno.readDirSync("../precache")
} catch(e) {
  console.log(e)
  console.log("so making dir like a good boy ^^")
  await Deno.mkdir(new URL("../precache", import.meta.url))
}

await Deno.writeFile(new URL("../precache/root.txt", import.meta.url), encoder.encode(rootId))
await Promise.all(Object.entries(shelf).map(async entry => {
  // await Deno.create(`../precache/${entry[0]}`)
  await Deno.writeFile(new URL(`../precache/${entry[0]}.txt`, import.meta.url), encoder.encode(entry[1]))
}))









