import * as Peko from "peko"
import routes from "./routes.ts"

import { loadedEvent } from "./handlers/loaded-event.ts"
export const prod = Deno.env.get("ENVIRONMENT") === "production"

const server = new Peko.Server()
server.use(Peko.logger(console.log))

// initial loading page
server.addRoute("/", {
  handler: Peko.staticHandler(new URL("./loading.html", import.meta.url), {
    headers: new Headers({
      "Cache-Control": prod ? "max-age=600, stale-while-revalidate=86400" : ""
    })
  })
})

// setup reload event route to trigger image preloading
// swaps route to index and reload on completion
server.addRoute("/reload-event", { handler: loadedEvent(server) })

// all other routes from "./routes.ts"
server.addRoutes(routes)

server.listen(3000) //  say hello Rabbit boi .b,b!