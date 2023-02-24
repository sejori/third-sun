import { recursiveReaddir } from "recursiveReadDir"
import { fromFileUrl } from "path"
import { instantiate } from "../lib/tjw_rust.generated.js"

const { resize_image } = await instantiate()

const images = (await recursiveReaddir(fromFileUrl(new URL("../public/images", import.meta.url))))
  .filter(filename => filename.includes("png"))

await Promise.all(images.map(async image => {
  console.log("minifying " + image)
  const buffer = await Deno.readFile(image)
  const resized = resize_image(buffer, 2160, 2160)
  await Deno.writeFile(image.replace(".png", ".min.png"), resized)
}))
