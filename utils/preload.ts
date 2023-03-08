export const getSrcs = async (pageURL: URL, tag: string) => {
  const regex = new RegExp(`(?<=<${tag}(.)*src=")(.)*?(?="(.))`, "g")
  const html = await Deno.readTextFile(pageURL)
  const matches = html.match(regex)
  return matches || []
}