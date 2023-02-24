import * as Peko from "peko"
import router from "./router.ts"

const server = new Peko.Server()
export const cache = new Peko.ResponseCache()

server.use(Peko.logger(console.log))
server.use(async (_, next) => {
 try {
  await next()
 } catch(e) {
  console.log(e)
  return new Response("Oopsie!", { status: 500 })
 }
})

// not using addRoutes as modifying routes in router.ts
server.use(router)

server.listen(3000) //  say hello Rabbit boi .b,b!