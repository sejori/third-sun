import * as Peko from "peko"
import staticOnes from "./routes/static.ts"
import images from "./routes/images.ts"
import stories from "./routes/stories.ts"
import components from "./routes/components.ts"

const server = new Peko.Server()
server.use(Peko.logger)

const prod = Deno.env.get("ENVIRONMENT") === "production"

// all routes from "./routes"
server.addRoutes([
  { route: "/hello", handler: () => new Response("<code>.b,b! ~hello!</code>")},
  ...staticOnes, 
  ...images,
  ...stories,
  ...components
])

const prepareAssets = async () => {
  await Promise.all([...images, ...components].map(route => route.handler(new Peko.RequestContext(server))))
  return "assets prepared"
}

// special load then swap index route
const reloadEventTarget = new EventTarget()
server.addRoute("/reload-event", { handler: Peko.sseHandler(reloadEventTarget) })
server.addRoute("/", {
  method: "GET",
  handler: (ctx) => {
    prepareAssets().then(status => {
      console.log(status)
      server.removeRoute("/")
      server.addRoute("/", {
        method: "GET",
        handler: Peko.staticHandler(new URL("./index.html", import.meta.url), {
          headers: new Headers({
            "Cache-Control": prod ? "max-age=600, stale-while-revalidate=86400" : ""
          })
        })
      })
      reloadEventTarget.dispatchEvent(new CustomEvent("data", {}))
    })

    return Peko.staticHandler(new URL("./loading.html", import.meta.url), {
      headers: new Headers({
        "Cache-Control": prod ? "max-age=600, stale-while-revalidate=86400" : ""
      })
    })(ctx)
  }
})

server.listen(3000) //  say hello Rabbit boi .b,b!