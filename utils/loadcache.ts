import { ResponseCache } from "peko"
import { Store } from "super_cereal"

export const loadPrecache = async (cache: ResponseCache) => {
  const initCacheMap: Map<string, string> = new Map()
  let rootId = ""

  const items: { key: string, value: string }[] = []
  const worker = new Worker(new URL("./read_precache_worker.ts", import.meta.url), { type: "module" })
  await new Promise(res => {
    worker.postMessage({ dir: new URL("../precache", import.meta.url).href })
    worker.addEventListener("message", (e) => {
      if (e.data === "complete") return res(true)
      items.push(JSON.parse(e.data))
    })
  })

  items.forEach(({ key, value }) => {
    if (key === "root") {
      rootId = value
    } else {
      initCacheMap.set(key, value)
    }
  })

  const store = new Store(initCacheMap)
  const storeItems = await store.load(rootId)
  
  // deno-lint-ignore no-explicit-any
  storeItems.map((item: any) => cache.set(item.key, item.value))
}