import * as Peko from "peko"
import staticOnes from "./routes/static.ts"
import images from "./routes/images.ts"
import stories from "./routes/stories.ts"
import components from "./routes/components.ts"
const prod = Deno.env.get("ENVIRONMENT") === "production"

const server = new Peko.Server()
server.use(Peko.logger)

// index.html route
server.addRoute("/", {
  method: "GET",
  handler: Peko.staticHandler(new URL("./index.html", import.meta.url), {
    headers: new Headers({
      "Cache-Control": prod ? "max-age=600, stale-while-revalidate=86400" : ""
    })
  })
})

// all other routes from "./routes"
server.addRoutes([
  { route: "/hello", handler: () => new Response("<code>.b,b! ~hello!</code>")},
  ...staticOnes, 
  ...images,
  ...stories,
  ...components
])

server.listen(3000) //  say hello Rabbit boi .b,b!