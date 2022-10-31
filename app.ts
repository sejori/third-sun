import * as Peko from "https://deno.land/x/peko@v0.5.4/mod.ts"
import staticRoutes from "./static.ts"
import storyRoutes from "./stories.ts"

const server = new Peko.Server({
  port: 3000,
  globalMiddleware: [ Peko.logger ],
  eventLogger: (e) => { if (e.type === "error") console.log(e) }
})

Array.from([
  ...staticRoutes, 
  ...storyRoutes
]).forEach(route => server.addRoute(route))

server.listen()