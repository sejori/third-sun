import * as Peko from "https://deno.land/x/peko@v0.5/mod.ts"
import staticRoutes from "./static.ts"
import storyRoutes from "./stories.ts"

const server = new Peko.Server({
  devMode: true,
  globalMiddleware: [ Peko.logger ],
  eventLogger: () => {}
})

Array.from([
  ...staticRoutes, 
  ... storyRoutes
]).forEach(route => server.addRoute(route))

server.listen()