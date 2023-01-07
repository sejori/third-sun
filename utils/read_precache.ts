export const readPrecache = async () => {
  const dirUrl = new URL("../precache", import.meta.url)
  const items: { key: string, value: string }[] = []

  try {
    for await (const dirEntry of Deno.readDir(dirUrl)) {
      const key = dirEntry.name.split(".txt")[0]
      const value = await Deno.readTextFile(new URL(`${dirUrl.href}/${dirEntry.name}`))

      items.push({ key, value })
    }
  } catch(e) {
    console.log(e)
  }

  return items
};