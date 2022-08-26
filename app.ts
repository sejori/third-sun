import * as Peko from "https://deno.land/x/peko@v0.5.1/mod.ts"
import staticRoutes from "./static.ts"
import storyRoutes from "./stories.ts"

console.log(Peko.staticHandler.toString())

const server = new Peko.Server({
  port: 3000,
  devMode: true,
  globalMiddleware: [ Peko.logger ],
  eventLogger: () => {}
})

Array.from([
  ...staticRoutes, 
  ... storyRoutes
]).forEach(route => server.addRoute(route))

server.listen()