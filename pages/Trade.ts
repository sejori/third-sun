import { html } from "../utils/react.ts"
import Head from "../components/Head.ts"
import Nav from "../components/Nav.ts"
import Tee from "../components/Tee.ts"
import Footer from "../components/Footer.ts"

const tees = [
  { name: "test", src: "/public/images/tees/WavesTshirt.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/WavesTshirt.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/WavesTshirt.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/WavesTshirt.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/WavesTshirt.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/WavesTshirt.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/WavesTshirt.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/WavesTshirt.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/WavesTshirt.png", link: "nearly-a-sale!" }
]

const Trade = () => html`
  <${Head} />

  <body>
    <div class="parallax">
      <section id="info" class="blue-bg parallax__group">
        <${Nav} />
        <h1 id="trade">Trade</h1>

        <div class="foreground flex justify-end wrap-reverse">
          <div class="container grid-auto mt-80">
            ${tees.map(tee => html`<${Tee} tee=${tee} />`)}
          </div>
          <img id="trade-guy" is="img-resizing" class="align-end width-500" alt="TradeGuy" src="/public/images/trade/TradePic.png?res=med" fetchpriority="high" />
        </div>
      </section>

      <${Footer} />
    </div>
  </body>
`

export default Trade
