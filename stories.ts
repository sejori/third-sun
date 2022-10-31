import * as Peko from "https://deno.land/x/peko@v0.5.2/mod.ts"
import { fromFileUrl } from "https://deno.land/std@0.150.0/path/mod.ts"
import MarkdownIt from "https://esm.sh/markdown-it@13.0.1"

const md = new MarkdownIt()
const cache = new Peko.ResponseCache()
const htmlDoc = await Deno.readTextFile("./static/index.html")
const storyRoutes: Peko.Route[] = []

const storiesPath = fromFileUrl(new URL("./stories", import.meta.url))

for await (const dirEntry of Deno.readDir(storiesPath)) {
  if (dirEntry.name.includes(".md")) {
    const content = await Deno.readTextFile(
      fromFileUrl(new URL(`./stories/${dirEntry.name}`, import.meta.url))
    )

    storyRoutes.push({
      route: `/stories/${dirEntry.name.replace(".md", "")}`,
      middleware: Peko.cacher(cache),
      handler: Peko.ssrHandler({
        render: () => htmlDoc.replace(
          /(?<=<main(.)*>)(.|\n)*?(?=<\/main>)/,
          md.render((content))
        )
      })
    })
  }
}

storyRoutes.push({
  route: "/stories",
  middleware: Peko.cacher(cache),
  handler: Peko.ssrHandler({
    render: () => htmlDoc.replace(
      /(?<=<main(.)*>)(.|\n)*?(?=<\/main>)/,
      `<h1>Stories!</h1>
      <ul class="story-list">
        ${storyRoutes.map(sRoute => sRoute.route !== "/stories" ? `<li class="story-list-item">
          <a href="${sRoute.route}">
            <h2>${sRoute.route.slice(sRoute.route.lastIndexOf("/")+1).toUpperCase()}</h2>
          </a>
        </li>` : "").join('')}
      </ul>`
    )
  })
})

export default storyRoutes