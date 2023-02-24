import * as Peko from "peko"
import { router } from "./router.ts"
import { cache } from "./cache.ts"

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