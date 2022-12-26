import * as Peko from "peko"
import { routes } from "./routes.ts"

const server = new Peko.Server()

server.use(() => { throw new Error("poop") })

server.use(Peko.logger(console.log))

server.addRoutes(routes)

server.listen(3000) //  say hello Rabbit boi .b,b!