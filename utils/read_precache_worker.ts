self.onmessage = async (e) => {
  const { dir } = e.data

  try {
    for await (const dirEntry of Deno.readDir(new URL(dir))) {
      const key = dirEntry.name.split(".txt")[0]
      const value = await Deno.readTextFile(new URL(`${dir}/${dirEntry.name}`))

      self.postMessage(JSON.stringify({ key, value }))
    }
  } catch(e) {
    console.log(e)
  }

  self.postMessage("complete")
  self.close()
};