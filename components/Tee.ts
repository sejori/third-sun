import { html, css } from "https://deno.land/x/pekommunity@0.0.1/react/mod.ts"

const Tee = ({ tee }: { tee: Record<string, string>}) => html`
  <a href="${tee.link}" class="tee-block">
    <img is="img-resizing" class="align-center" alt="${tee.name}" src="${tee.src}?res=low" fetchpriority="high" />
    <p class="align-center">Click to view</p>
  </a>
`

css`
  .tee-block {
    display: flex;
    flex-direction: column;
  }
`

export default Tee