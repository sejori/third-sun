import { html } from "https://deno.land/x/pekommunity@0.0.1/react/mod.ts"
import Head from "../components/Head.ts"

const Loading = () => html`
  <${Head} />

  <body>
    <div class="container center">
      <img src="/public/images/loading.gif" alt="Loading..." width="400" />
      <h4 id="loading-text"></h4>
    </div>

    <script src="/public/scripts/load-event.js"></script>
  </body>
`

export default Loading
