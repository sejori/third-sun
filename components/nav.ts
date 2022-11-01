customElements.define('nav-menu', class NavMenu extends HTMLElement {
  home = document.querySelector("#info")
  nextSection = document.querySelector("#showcase")

  initWidth = this.style.width
  initHeight = this.style.height
  initRadius = this.style.borderRadius
  initTransform = this.style.transform
  initTop = this.style.top
  initRight = this.style.right
  initColor = this.style.color
  initBg = this.style.backgroundColor

  canSeeShowcase = false

  constructor() {
    super();
    globalThis.document.querySelector("#nav-button")!.addEventListener('click', () => {
      this.toggleOpen()
    });
  }

  connectedCallback() {
    const observer = new IntersectionObserver(e => {
      const showcaseInView = e[0].isIntersecting
      if (showcaseInView && showcaseInView !== this.canSeeShowcase) {
        this.canSeeShowcase = true
        this.moveToBody()
      }
      if (!showcaseInView && showcaseInView !== this.canSeeShowcase) {
        this.canSeeShowcase = false
        this.moveBackHome()
      }
    }, {
      root: null, // document body
      rootMargin: "0px" // viewport bounds
    });
      
    observer.observe(this.nextSection!)
  }

  moveToBody() {
    globalThis.document.body.insertBefore(this, globalThis.document.body.firstChild)
  }

  moveBackHome() {
    this.home!.insertBefore(this, this.home!.firstChild)
  }

  toggleOpen() {
    this.classList.toggle("isOpen");
    
    if (this.classList.contains("isOpen")) {
      globalThis.document.querySelector("#nav-button")!.textContent = "X";
    } else {
      globalThis.document.querySelector("#nav-button")!.textContent = "+";
    }
  }
}, {
  extends: "nav"
});