import { ResponseCache, Server, cacher } from "peko"
import { ensureDir } from "fs"
import { Store } from "super_cereal"
import { router } from "../router.ts"

export const loadPagePrecache = async (pageUrl: URL, cache: ResponseCache, cb: (worked: boolean) => void) => {  
  const dirUrl = toPrecacheDirUrl(pageUrl)
  const initCacheMap: Map<string, string> = new Map()
  let rootId = ""

  const items = await readPrecacheDir(dirUrl)

  items.forEach(({ key, value }) => {
    if (key === "root") {
      rootId = value
    } else {
      initCacheMap.set(key, value)
    }
  })

  if (!rootId) return cb(false)

  const store = new Store(initCacheMap)
  const storeItems = await store.load(rootId)
  
  // deno-lint-ignore no-explicit-any
  storeItems.map((item: any) => cache.set(item.key, item.value))

  return cb(true)
}

export const readPrecacheDir = async (dirUrl: URL) => {
  const items: { key: string, value: string }[] = []

  await ensureDir(dirUrl)

  for await (const dirEntry of Deno.readDir(dirUrl)) {    
    const key = dirEntry.name.split(".txt")[0]
    const value = await Deno.readTextFile(new URL(`${dirUrl.href}/${dirEntry.name}`))

    if (value) items.push({ key, value })
  }

  return items
}

export const savePagePrecache = async (pageUrl: URL, routePaths: string[]) => {
  const dirUrl = toPrecacheDirUrl(pageUrl)
  
  const encoder = new TextEncoder()

  // dummy server for generating cache
  const server = new Server()
  const cache = new ResponseCache()
  server.use(cacher(cache))
  server.use(router)

  // set up super_cereal store
  const shelf: Record<string, string> = {}
  const store = new Store({
    set: (key, value) => shelf[key] = value,
    get: key => shelf[key]
  })

  // ensure precache folder
  await ensureDir(dirUrl)

  // make requests to file dummy cache
  const requestChunkSize = 5;
  for (let i=0; i<routePaths.length; i+=requestChunkSize) {
    await Promise.all(routePaths.slice(i, i+requestChunkSize).map(path => server.requestHandler(new Request(new URL(`http://${server.hostname}:${server.port}${path}`)))))
  }

  // serialize dummy cache items with store
  const rootId = await store.save(cache.items.map(item => {
    return { key: item.key, value: item.value }
  }))

  // write root id to root file then write all cache items to files
  await Deno.writeFile(new URL("./root.txt", `${dirUrl}/`), encoder.encode(rootId))
  await Promise.all(Object.entries(shelf).map(async entry => {
    await Deno.writeFile(new URL(`./${entry[0]}.txt`, `${dirUrl}/`), encoder.encode(entry[1]))
  }))
}

const toPrecacheDirUrl = (url: URL) => {
  if (url.pathname === "/") url = new URL(`${url.href}index`)
  const path = url.pathname.substring(1)
  return new URL(`../precache/${encodeURIComponent(path)}`, import.meta.url) 
}