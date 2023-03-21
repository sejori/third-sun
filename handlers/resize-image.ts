import { 
  RequestContext,
  staticHandler
} from "peko"
import {
  ImageMagick,
  initializeImageMagick,
  MagickFormat,
} from "imagemagick"
import { IMG_RESOLUTIONS } from "../components/config.ts"

await initializeImageMagick()

export const resizableImage =  (fileRoute: string) => async (ctx: RequestContext) => {
  const params = new URL(ctx.request.url).searchParams
  const res = IMG_RESOLUTIONS.get(params.get("res"))

  return await staticHandler(new URL(`../${fileRoute}`, import.meta.url), {
    transform: (contents) => {
      if (!res) return contents
      console.log("Resizing " + fileRoute + " to res: " + res)
      
      return new Promise(resolve => ImageMagick.read(contents, (img) => {
        img.resize(res, res)
        img.write(data => resolve(new Uint8Array(data)), MagickFormat.Webp)
      }))
    },
    headers: new Headers({
      "Content-Type": res ? "image/webp" : "image/png",
      "Cache-Control": "max-age=600, stale-while-revalidate=86400"
    })
  })(ctx)
}