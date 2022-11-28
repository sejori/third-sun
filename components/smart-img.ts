export const IMG_RESOLUTIONS = new Map();
IMG_RESOLUTIONS.set("low", 800);
IMG_RESOLUTIONS.set("med", 1200);
IMG_RESOLUTIONS.set("high", 1600);
IMG_RESOLUTIONS.set("full", 2000);

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
    for (const [key, value] of IMG_RESOLUTIONS) {
      const width = value, height = value

      // limit to reasonable res for screen (doubled for high density displays)
      if (
        !this.src.includes(key) && 
        (width > (globalThis.innerWidth*2) || 
        height > (globalThis.innerHeight*2))
      ) break

      while (!this.complete) await new Promise(res => setTimeout(res, 100))

      const newSrc = `${this.baseSrc}?res=${key}`
      console.log(newSrc)
      this.src = newSrc
    }
  }
}, {
  extends: "img"
});