import { html, css } from "pekommunity/react/mod.ts"

const Footer = () => html`
  <footer class="parallax__group container justify-end">
    <div class="align-center">
      <div class="footer-text-big">&nbsp;</div>
      <h2>Do you want a demonic website?</h2>
      <h3><a href="">Summon satanic forces</a></h3>
      <p>
        Made with ❤️‍🔥 by <a href="https://thesebsite.com">seb</a> & <a href="https://iiisun.art">iiisun</a>.
      </p>
    </div>
  </footer>
`

css`
  .footer-text-big {
    font-size: 10rem;
    margin-bottom: 80px;
  }
`

export default Footer