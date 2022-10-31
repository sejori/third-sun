customElements.define('nav-menu', class NavMenu extends HTMLButtonElement {
  open = false;
  
  constructor() {
    super();

    this.addEventListener('click', this.toggleOpen);
    this.style.transition = 'all 40ms ease-in-out';
  }

  toggleOpen() {
    console.log('clicked', this.open)
    this.open = !this.open
  }
}, {
  extends: "button"
});

console.log("im=here")