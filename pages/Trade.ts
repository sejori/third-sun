import { html, css } from "pekommunity/react/mod.ts"
import Head from "../components/Head.ts"
import Nav from "../components/Nav.ts"
import Tee from "../components/Tee.ts"
import Footer from "../components/Footer.ts"

const tees = [
  { name: "test", src: "/public/images/tees/BlckJumperFront.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/Sectapus001Jumper.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/Robot003Jumper.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/Shrooms007Jumper.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/WhiteTShirtFront.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/Sectapus002TShirt.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/Robot004TShirt.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/Shrooms006TShirt.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/BlckTshirtFront.png", link: "nearly-a-sale!" }
  { name: "test", src: "/public/images/tees/Sectapus001Tshirt.png", link: "nearly-a-sale!" }
  { name: "test", src: "/public/images/tees/Robot0003TShirt.png", link: "nearly-a-sale!" }
  { name: "test", src: "/public/images/tees/Shrooms007Tshirt.png", link: "nearly-a-sale!" }
]

const Trade = () => html`
  <${Head} />

  <body>
    <div class="parallax">
      <section id="info" class="blue-bg parallax__group">
        <${Nav} />
        <h1 id="trade-heading">Trade</h1>

        <div id="trade-block" class="foreground">
          <div class="container grid-auto tee-grid">
            ${tees.map(tee => html`<${Tee} tee=${tee} />`)}
          </div>
          <img id="trade-guy" is="img-resizing" class="width-500" alt="TradeGuy" src="/public/images/trade/TradePic.png?res=med" fetchpriority="high" />
        </div>
      </section>

      <${Footer} />
    </div>
  </body>
`

css`
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

  #trade-block div {
    margin-top: -80px;
  }

  @media (min-width: 1360px) {
    #trade-guy {
      position: sticky;
      top: 80px;
    }
  }
`

export default Trade
