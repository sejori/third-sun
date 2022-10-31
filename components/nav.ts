customElements.define('nav-menu', class NavMenu extends HTMLElement {
  open = false;
  
  constructor() {
    super();

    this.addEventListener('click', this.toggleOpen);
    this.style.transition = 'all 40ms ease-in-out';

    console.log("constructed!", this)
  }

  connectedCallback() {
    console.log('connected.')
  }

  toggleOpen() {
    console.log('clicked', this.open)
    this.open = !this.open
  }
}, {
  extends: "nav"
});

console.log("im=here")

document.querySelector("nav")?.setAttribute("is", "nav-menu")