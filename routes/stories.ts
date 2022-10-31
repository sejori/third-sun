import * as Peko from "peko"
import { fromFileUrl } from "fromFileUrl"
import MarkdownIt from "markdownit"

const md = new MarkdownIt()
const cache = new Peko.ResponseCache()
const htmlDoc = await Deno.readTextFile(new URL("../static/index.html", import.meta.url))
const storyRoutes: Peko.Route[] = []

const storiesPath = fromFileUrl(new URL("../stories", import.meta.url))

for await (const dirEntry of Deno.readDir(storiesPath)) {
  if (dirEntry.name.includes(".md")) {
    const content = await Deno.readTextFile(
      fromFileUrl(new URL(`../stories/${dirEntry.name}`, import.meta.url))
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