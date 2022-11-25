import {
  DOMParser,
  initParser,
} from "deno-dom"
import { Server } from "peko"

export const preloadPageImages = async (pageFileUrl: URL, server: Server) => {
  await initParser()
  const doc = new DOMParser().parseFromString(
    await Deno.readTextFile(pageFileUrl),
    "text/html",
  );

  const imgs = doc?.getElementsByTagName("img")
  const srcs: string[] = []
  imgs?.forEach(img => {
    if (img.getAttribute("is") === "smart-img") {
      const baseSrc = img.getAttribute("data-src")
      const resolutions = JSON.parse(img.getAttribute("data-resolutions") || "[]")

      resolutions.forEach((res: string) => srcs.push(`${baseSrc}?resolution=${res}`))
      srcs.push(baseSrc || "")
    } else {
      srcs.push(img.getAttribute("src") || "")
    }
  })
  console.log(srcs)
  const srcUrls = srcs.filter(src => src).map(src => new URL(`http://${server.hostname}:${server.port}${src}`))
  
  return await Promise.all(srcUrls.map(url => server.requestHandler(new Request(url))))
}

export const preloadPageComponents = async (pageFileUrl: URL, server: Server) => {
  await initParser()
  const doc = new DOMParser().parseFromString(
    await Deno.readTextFile(pageFileUrl),
    "text/html",
  );

  const scripts = doc?.getElementsByTagName("script")
  const srcs: string[] = []
  scripts?.forEach(img => {
    if (img.getAttribute("src")?.includes("components")) {
      srcs.push(img.getAttribute("src") || "")
    }
  })
  console.log(srcs)
  const srcUrls = srcs.filter(src => src).map(src => new URL(`http://${server.hostname}:${server.port}${src}`))
  
  return await Promise.all(srcUrls.map(url => server.requestHandler(new Request(url))))
}