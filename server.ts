import * as Peko from "peko"
import { fromFileUrl } from "path"
import { router } from "./router.ts"

const server = new Peko.Server()

server.use(Peko.logger(console.log))
server.use(async (_, next) => {
 try {
  await next()
 } catch(e) {
  console.log(e)
  return new Response("Oopsie!", { status: 500 })
 }
})

server.use(router)

server.listen(3000) // say hello Rabbit boi .b,b!

// hot-reload events
if (Deno.args[0] === "dev") {
  const watchTarget = new EventTarget()

  server.addRoute("/devSocket", Peko.sseHandler(watchTarget))
  const watcher = Deno.watchFs(fromFileUrl(new URL("./public", import.meta.url)))
  for await (const event of watcher) {
    watchTarget.dispatchEvent(new CustomEvent("send", { detail: event }))
  }
}