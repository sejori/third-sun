class NavMenu extends HTMLElement {
  home = this.parentElement
  ogHeight = this.style.height
  ogWidth = this.style.width
  open = false

  // used to throlle calls from IntersectionObserver
  // and relocate if menu opened not at scroll position
  onBody = false

  constructor() {
    super();

    globalThis.document.querySelector("#nav-button")!.addEventListener("click", () => {
      this.toggleOpen()
    });

    const observer = new IntersectionObserver(e => {
      const headerInView = e[0].isIntersecting
      if (!headerInView && !this.onBody) {
        this.onBody = true
        this.moveToBody()
      }
      if (headerInView && this.onBody) {
        this.onBody = false
        this.moveBackHome()
      }
    }, {
      root: null, // document body
      rootMargin: "0px", // viewport bounds
      threshold: [0]
    });
    
    const header = globalThis.document.body.querySelector("header")
    if (header) {
      observer.observe(header)
    } else {
      this.moveToBody()
    }

    console.log("constructed nav-menu")
  }

  // connectedCallback() {
  //   console.log(this, 'connected!')
  // }

  moveToBody() {
    globalThis.document.body.insertBefore(this, globalThis.document.body.firstChild)
    // completing hijacking these to implement a background hack. soz
    // will be triggered by event now
    globalThis.document.body.style.backgroundColor = "black"

    globalThis.document.dispatchEvent(new CustomEvent("nav-menu_move-to-body"))
  }

  moveBackHome() {
    this.home!.insertBefore(this, this.home!.firstChild)
    // completing hijacking these to implement a background hack. soz
    globalThis.document.body.style.backgroundColor = "#09132e"

    globalThis.document.dispatchEvent(new CustomEvent("nav-menu_move-back-home"))
  }

  async toggleOpen() {
    console.log("toggleOpen", this)

    this.open = !this.open
    this.classList.toggle("isOpen")

    if (!this.onBody) this.home?.scrollIntoView({
      behavior: "smooth"
    })
    
    if (this.classList.contains("isOpen")) {
      globalThis.document.querySelector("#nav-button")!.textContent = "X"
      this.style.height = "100vh"
      this.style.width = "100vw"
    } else {
      globalThis.document.querySelector("#nav-button")!.textContent = "+"
      await new Promise(res => setTimeout(res, 600))
      if (!this.open) {
        this.style.height = this.ogHeight
        this.style.width = this.ogWidth
      }
    }
  }
}

globalThis.addEventListener("load", () => {
  customElements.define('nav-menu', NavMenu, {
    extends: "nav"
  })
});