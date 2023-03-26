import { html, css } from "../utils/react.ts"
import Head from "../components/Head.ts"
import Nav, { NavCSS } from "../components/Nav.ts"
import Tee, { TeeCSS } from "../components/Tee.ts"
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
  <${Head} style=${TradeCSS.concat(NavCSS).concat(TeeCSS)} />

  <body>
    <div class="parallax">
      <section id="info" class="blue-bg parallax__group">
        <${Nav} />
        <h1 id="trade-heading">Trade</h1>

        <div id="trade-block" class="foreground">
          <div class="container grid-auto mt-80">
            ${tees.map(tee => html`<${Tee} tee=${tee} />`)}
          </div>
          <img id="trade-guy" is="img-resizing" class="width-500" alt="TradeGuy" src="/public/images/trade/TradePic.png?res=med" fetchpriority="high" />
        </div>
      </section>

      <${Footer} />
    </div>
  </body>
`

const TradeCSS = css`
  #trade-heading {
    position: absolute;
    visibility: hidden;
  }

  #trade-block {
    display: flex;
    flex-wrap: wrap-reverse;
    justify-content: flex-end;
    align-items: flex-end;
  }

  @media (min-width: 1360px) {
    #trade-guy {
      position: sticky;
      top: 80px;
    }
  }
`

export default Trade
