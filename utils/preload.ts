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
      srcs.push(img.getAttribute("src") || "")
    }
  })
  // console.log(srcs)
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
  // console.log(srcs)
  const srcUrls = srcs.filter(src => src).map(src => new URL(`http://${server.hostname}:${server.port}${src}`))
  
  return await Promise.all(srcUrls.map(url => server.requestHandler(new Request(url))))
}

export const preloadIndex = (server: Server) => {
  const indexUrl = new URL("../index.html", import.meta.url)

  return Promise.all([
    preloadPageComponents(indexUrl, server),
    preloadPageImages(indexUrl, server)
  ])
}