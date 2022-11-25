import * as Peko from "peko"

import staticOnes from "./routes/static.ts"
import images from "./routes/images.ts"
import stories from "./routes/stories.ts"
import components from "./routes/components.ts"

import { 
  preloadPageImages,
  preloadPageComponents
} from "./utils/preload.ts"

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

// initial loading page
server.addRoute("/", {
  method: "GET",
  handler: (ctx) => {
    const loadingUrl = new URL("./loading.html", import.meta.url)

    return Peko.staticHandler(loadingUrl, {
      headers: new Headers({
        "Cache-Control": prod ? "max-age=600, stale-while-revalidate=86400" : ""
      })
    })(ctx)
  }
})

// setup reload event route to trigger image preloading
// swap route to index and reload on completion
const reloadEventTarget = new EventTarget()
server.addRoute("/reload-event", { 
  handler: (ctx) => {
    const indexUrl = new URL("./index.html", import.meta.url)

    Promise.all([
      preloadPageComponents(indexUrl, server),
      preloadPageImages(indexUrl, server)
    ]).then(_ => {
      console.log("in preload cb")
      server.removeRoute("/")
      server.addRoute("/", {
        method: "GET",
        handler: Peko.staticHandler(indexUrl, {
          headers: new Headers({
            "Cache-Control": prod ? "max-age=600, stale-while-revalidate=86400" : ""
          })
        })
      })

      reloadEventTarget.dispatchEvent(new CustomEvent("data"))
    })

    return Peko.sseHandler(reloadEventTarget)(ctx)
  }
})

server.listen(3000) //  say hello Rabbit boi .b,b!