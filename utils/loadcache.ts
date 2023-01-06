import { ResponseCache } from "peko"
import { Store } from "super_cereal"

export const loadPrecache = async (cache: ResponseCache) => {
  const decoder = new TextDecoder()
  const initCacheMap: Map<string, string> = new Map()
  let rootId = ""

  try {
    for await (const dirEntry of Deno.readDir(new URL("../precache", import.meta.url))) {
      const key = dirEntry.name.split(".txt")[0]
      const value = decoder.decode(await Deno.readFile(new URL(`../precache/${dirEntry.name}`, import.meta.url)))

      if (key === "root") {
        rootId = value
        break
      }

      initCacheMap.set(key, value)
    }

    const store = new Store(initCacheMap)
    const storeItems = await store.load(rootId)
    
    // deno-lint-ignore no-explicit-any
    storeItems.map((item: any) => cache.set(item.key, item.value))
  } catch (e) {
    console.log(e)
  }
}