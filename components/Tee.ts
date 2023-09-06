import { html, css } from "pekommunity/react/mod.ts"

// <a href="${tee.link}" class="tee-block">

const Tee = ({ tee }: { tee: Record<string, string>}) => html`
   <a href="/checkout" class="tee-block">
    <img is="img-resizing" class="align-center" alt="${tee.name}" src="${tee.src}?res=low" fetchpriority="high" />
    <p class="align-center">Purchase</p>
  </a>
`

css`
  .tee-block {
    display: flex;
    flex-direction: column;
  }
`

export default Tee