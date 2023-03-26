import { html } from "../utils/react.ts"

const Tee = ({ tee }: { tee: Record<string, string>}) => html`
  <a href="${tee.link}" class="flex column">
    <img is="img-resizing" class="align-center" alt="${tee.name}" src="${tee.src}?res=low" fetchpriority="high" />
    <p class="align-center">Click to view</p>
  </a>
`

export default Tee