import { Server } from "peko"
import { router } from "../router.ts"

// dummy server
const server = new Server()
server.use(router)

// request all routes with loader middleware (pages)
// loader will save page asset responses to precache if don't exist 
// pages with loader middleware will have their content scanned for img and script assets
// these assets are then requested in the precache util
// so all we need to do here is request to pages to kick start the middleware
const pageRoutes = router.routes.filter(route => {
  return (!route.path.includes("public") && !route.path.includes("components"))
})

for (const route of pageRoutes) {
  await server.requestHandler(
    new Request(
      new URL(`http://${server.hostname}:${server.port}${route.path}`)
    )
  )
}