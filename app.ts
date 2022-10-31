import * as Peko from "peko"
import staticOnes from "./routes/static.ts"
import stories from "./routes/stories.ts"
import components from "./routes/components.ts"

const server = new Peko.Server({
  port: 3000,
  globalMiddleware: [ Peko.logger ],
  eventLogger: (e) => { if (e.type === "error") console.log(e) }
})

Array.from([
  ...staticOnes, 
  ...stories,
  ...components
]).forEach(route => server.addRoute(route))

server.listen()