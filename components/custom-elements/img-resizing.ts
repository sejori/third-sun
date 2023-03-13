import { IMG_RESOLUTIONS } from "../config.ts"

class ImgResizing extends HTMLImageElement {
  triggerEvent: string | undefined
  baseSrc: string

  constructor() {
    super();

    this.baseSrc = this.src.slice(0, this.src.indexOf("?"))
    this.triggerEvent = this.dataset["triggerevent"]

    if (this.triggerEvent) {
      globalThis.document.addEventListener(this.triggerEvent, () => this.swapSrc())
    } else this.swapSrc();

    console.log("constructed img-resizing");
  }

  // connectedCallback() {
  //   console.log(this, 'connected!')
  // }

  async swapSrc() {
    let targetRes = [...IMG_RESOLUTIONS.keys()][0]

    // limit res to parent/screen size (doubled for high density displays)
    const [width, height] = this.parentElement 
      ? [this.parentElement.clientWidth, this.parentElement.clientHeight]
      : [globalThis.innerWidth, globalThis.innerHeight]

    for (const [key, value] of IMG_RESOLUTIONS) {
      if (value < width!*2 || value < height!*2) targetRes = key
    }

    // let initial src load before swapping
    while (!this.complete) await new Promise(res => setTimeout(res, 250))

    this.src = `${this.baseSrc}?res=${targetRes}`
  }
}

globalThis.addEventListener("load", () => {
  customElements.define('img-resizing', ImgResizing, {
    extends: "img"
  })
});