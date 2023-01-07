import { ResponseCache } from "peko"
import { Store } from "super_cereal"
import { readPrecache } from "./read_precache.ts"

export const loadPrecache = async (cache: ResponseCache) => {
  const initCacheMap: Map<string, string> = new Map()
  let rootId = ""

  const items = await readPrecache()

  items.forEach(({ key, value }) => {
    if (key === "root") {
      rootId = value
    } else {
      initCacheMap.set(key, value)
    }
  })

  if (!rootId) return

  const store = new Store(initCacheMap)
  const storeItems = await store.load(rootId)
  
  // deno-lint-ignore no-explicit-any
  storeItems.map((item: any) => cache.set(item.key, item.value))
}