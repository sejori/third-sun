import * as Peko from "peko"
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
if (!Deno.env.get("DENO_DEPLOYMENT_ID")) {
  const watchTarget = new EventTarget()

  server.addRoute("/devSocket", Peko.sseHandler(watchTarget))
  const watcher = Deno.watchFs(new URL("./public", import.meta.url).pathname)
  for await (const event of watcher) {
    watchTarget.dispatchEvent(new CustomEvent("send", { detail: event }))
  }
}