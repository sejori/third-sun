import { Server } from "peko"
import { router } from "../router.ts"

// dummy server
const server = new Server()
server.use(router)

// request pages to run preloader and generate precache
const pageRoutes = router.routes.filter(route => {
  return !route.path.includes("public") || !route.path.includes("components")
})

for (const route of pageRoutes) {
  await server.requestHandler(new Request(new URL(`http://${server.hostname}:${server.port}${route.path}`)))
}