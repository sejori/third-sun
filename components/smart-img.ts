customElements.define('smart-img', class SmartImg extends HTMLImageElement {
  triggerEvent: string | undefined
  baseSrc: string
  resParam: string
  resolutions: Array<string>

  constructor() {
    super();

    this.baseSrc = this.dataset.src || ""
    this.resolutions = JSON.parse(this.dataset.resolutions || "[]")
    this.triggerEvent = this.dataset["triggerevent"]
    this.resParam = this.dataset["param"] || "resolution"

    if (this.triggerEvent) {
      globalThis.document.addEventListener(this.triggerEvent, () => {
        this.beginLoading()
        this.style.visibility = "visible"
      })
      this.style.visibility = "hidden"
    } else this.beginLoading();

    console.log("constructed smart-img");
  }

  // connectedCallback() {
  //   console.log(this, 'connected!')
  // }

  async beginLoading() {
    if (!this.resolutions[0]) {
      // console.log(`requesting ${this.baseSrc}`)
      this.src = this.baseSrc
    }

    for (let i = 0; i < this.resolutions.length; i++) {
      const [width, height] = this.resolutions[i].split("x").map(s => Number(s))
      // limit to reasonable res for screen (doubled for high density displays)
      if (
        width > (globalThis.innerWidth*2) || 
        height > (globalThis.innerHeight*2)
      ) break

      const newSrc = `${this.baseSrc}?${this.resParam}=${this.resolutions[i]}`
      this.src = newSrc

      while (!this.complete) {
        // console.log(`loading ${newSrc}`)
        await new Promise(res => setTimeout(res, 100))
      }
    }
  }
}, {
  extends: "img"
});