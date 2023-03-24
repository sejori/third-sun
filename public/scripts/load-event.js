const loadTexts = [
  "Performing ritual...",
  "Framing masterwork...",
  "Sharpening axe...",
  "Enticing legend...",
  "Forming framework...",
  "Distilling dye...",
  "Crafting medium...",
  "Exploring darkness...",
  "Casting utensil...",
  "Scripting commandments...",
  "Weaving spells...",
  "Enscribing runes...",
  "Polishing compendium..."
]

document.querySelector("#loading-text").textContent = loadTexts[Math.ceil(Math.random()*loadTexts.length-1)]

const sse = new EventSource("/load-event")
sse.onmessage = () => window.location.reload()
sse.onerror = () => sse.close()

document.body.addEventListener("unload", () => sse.close())