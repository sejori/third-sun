import * as Peko from "https://deno.land/x/peko@v0.5/mod.ts"
import { fromFileUrl } from "https://deno.land/std@0.150.0/path/mod.ts"
import MarkdownIt from "https://esm.sh/markdown-it@13.0.1"

const decoder = new TextDecoder()
const md = new MarkdownIt()
const htmlDoc = await Deno.readTextFile("./public/index.html")
const cache = new Peko.ResponseCache()

const storyFiles = Array.from(Deno.readDirSync(fromFileUrl(new URL("./stories", import.meta.url))))
  .filter(file => file.name.includes(".md"))

const storyRoutes = storyFiles.map(story => {
  const contents = decoder.decode(
    Deno.readFileSync(
      fromFileUrl(new URL(`./stories/${story.name}`, import.meta.url))
    )
  )

  return {
    route: `/stories/${story.name.replace(".md", "")}`,
    middleware: Peko.cacher(cache),
    handler: Peko.ssrHandler({
      render: () => htmlDoc.replace(
        /<body>(.|\n)*?<\/body>/,
        `<body>${md.render((contents))}</body>`
      )
    })
  }
})

export default storyRoutes