import { ssrHandler } from "peko"
import MarkdownIt from "markdownit"

const md = new MarkdownIt()

export const markdown = (htmlDoc: string, content: string) => ssrHandler(() => htmlDoc.replace(
  /(?<=<main(.)*>)(.|\n)*?(?=<\/main>)/,
  md.render((content))
))