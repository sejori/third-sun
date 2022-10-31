// This is a basic web component
class AppButton extends HTMLButtonElement {
  constructor() {
    super();

    this.addEventListener('click', this.setRandomValue);

    this.style.transition = 'all 40ms ease-in-out';
  }

  async setRandomValue() {
    const response = await fetch('/api/v0/random-positive-int');
    const { number } = await response.json();
    this.innerText = `Got ${number}! Click me again!`;
  }
}

export default AppButton;