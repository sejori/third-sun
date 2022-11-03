import * as Peko from "peko"
import staticOnes from "./routes/static.ts"
import stories from "./routes/stories.ts"
import components from "./routes/components.ts"

const server = new Peko.Server()
server.use(Peko.logger)

// index.html route
server.addRoute({
  route: "/",
  method: "GET",
  handler: Peko.staticHandler({
    fileURL: new URL("./index.html", import.meta.url),
    contentType: "text/html",
    headers: new Headers({
      "Cache-Control": "max-age=600, stale-while-revalidate=86400"
    })
  })
})

// all other routes from "./routes"
server.addRoutes([
  { route: "/hello", handler: () => new Response("<code>.b,b! ~hello!</code>")},
  ...staticOnes, 
  ...stories,
  ...components
])

server.listen(3000) //  say hello Rabbit boi .b,b!