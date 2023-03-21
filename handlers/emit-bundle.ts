import { staticHandler } from "peko"
import { bundle } from "emit"

export const emitTSBundle = (fileUrl: URL) => staticHandler(fileUrl, {
  transform: async () => {
    console.log("Emitting ts bundle: " + fileUrl.href)
    const { code } = await bundle(fileUrl)
    return code
  },
  headers: new Headers({ "Content-Type": "application/javascript" })
})