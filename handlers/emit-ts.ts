import { staticHandler } from "peko"
import { emit } from "emit"

const decoder = new TextDecoder()

export const emitTS = (fileUrl: URL) => staticHandler(fileUrl, {
  transform: async (content) => {
    console.log("Emitting: " + fileUrl.href)

    const result = await emit(fileUrl, {
      load(specifier: string) {
        return Promise.resolve({ kind: 'module', specifier, content: decoder.decode(content) })
      },
    })
    return result[fileUrl.toString()]
  },
  headers: new Headers({ "Content-Type": "application/javascript" })
})