customElements.define('nav-menu', class NavMenu extends HTMLElement {
  home = this.parentElement
  ogHeight = this.style.height
  ogWidth = this.style.width
  open = false

  // used to throlle calls from IntersectionObserver
  // and relocate if menu opened not at scroll position
  onBody = false

  constructor() {
    console.log("constructed nav-button");
    super();

    globalThis.document.querySelector("#nav-button")!.addEventListener('click', () => {
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
    
    observer.observe(globalThis.document.body.querySelector("header")!)
  }

  // connectedCallback() {
  //   console.log(this, 'connected!')
  // }

  moveToBody() {
    globalThis.document.body.insertBefore(this, globalThis.document.body.firstChild)
  }

  moveBackHome() {
    this.home!.insertBefore(this, this.home!.firstChild)
  }

  async toggleOpen() {
    console.log("toggleOpen", this)

    this.open = !this.open
    this.classList.toggle("isOpen");

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
}, {
  extends: "nav"
});