import * as Peko from "https://deno.land/x/peko@v0.5/mod.ts"
import { fromFileUrl } from "https://deno.land/std@0.150.0/path/mod.ts"
import MarkdownIt from "https://esm.sh/markdown-it@13.0.1"

const decoder = new TextDecoder()
const md = new MarkdownIt()
const cache = new Peko.ResponseCache()

const htmlDoc = await Deno.readTextFile("./public/index.html")

const storyData = Array.from(
  Deno.readDirSync(
    fromFileUrl(new URL("./stories", import.meta.url))
  )
)
  .filter(file => file.name.includes(".md"))
  .map(storyFile => {
    const content = decoder.decode(
      Deno.readFileSync(
        fromFileUrl(new URL(`./stories/${storyFile.name}`, import.meta.url))
      )
    )

    return { 
      ...storyFile,
      url: `/stories/${storyFile.name.replace(".md", "")}`, 
      html: md.render((content))
    }
  })

const storyRoutes = storyData.map(story => ({
  route: story.url,
  middleware: Peko.cacher(cache),
  handler: Peko.ssrHandler({
    render: () => htmlDoc.replace(
      /(?<=<main(.)*>)(.|\n)*?(?=<\/main>)/,
      story.html
    )
  })
}))

storyRoutes.push({
  route: "/stories",
  middleware: Peko.cacher(cache),
  handler: Peko.ssrHandler({
    render: () => htmlDoc.replace(
      /(?<=<main(.)*>)(.|\n)*?(?=<\/main>)/,
      `<h1>Stories</h1>
      <ul class="story-list">
        ${storyData.map(story => `
          <li class="story-list-item">
            <a href="${story.url}">
              <h2>${story.name.toUpperCase()}</h2>
            </a>
          </li>
        `)}
      </ul>`
    )
  })
})

export default storyRoutes