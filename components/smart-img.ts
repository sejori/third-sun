import { IMG_RESOLUTIONS } from "./config.ts"

customElements.define('smart-img', class SmartImg extends HTMLImageElement {
  triggerEvent: string | undefined
  baseSrc: string

  constructor() {
    super();

    this.baseSrc = this.src.slice(0, this.src.indexOf("?"))
    this.triggerEvent = this.dataset["triggerevent"]

    if (this.triggerEvent) {
      globalThis.document.addEventListener(this.triggerEvent, () => {
        this.beginLoading()
        // this.style.visibility = "visible"
      })
      // this.style.visibility = "hidden"
    } else this.beginLoading();

    console.log("constructed smart-img");
  }

  // connectedCallback() {
  //   console.log(this, 'connected!')
  // }

  async beginLoading() {
    // find appropriate resolution to load
    let finalRes = ""
    for (const [key, value] of IMG_RESOLUTIONS) {
      // limit to reasonable res for screen (doubled for high density displays)
      if (
        value < (globalThis.innerWidth*2) || value < (globalThis.innerHeight*2)
      ) finalRes = key
    }

    while (!this.complete) await new Promise(res => setTimeout(res, 250))

    const newSrc = `${this.baseSrc}?res=${finalRes}`
    this.src = newSrc
  }
}, {
  extends: "img"
});