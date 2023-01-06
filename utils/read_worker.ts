self.onmessage = async (e) => {
  const { filename } = e.data

  let text = ""
  try {
    text = await Deno.readTextFile(new URL(filename))
  } catch(e) {
    console.log(e)
  }

  self.postMessage(text)
  self.close()
};