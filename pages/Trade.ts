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
  { name: "test", src: "/public/images/tees/WhteTShirtFront.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/Sectapus002TShirt.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/Robot004TShirt.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/Shrooms006Tshirt.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/BlckTshirtFront.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/Sectapus001Tshirt.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/Robot003TShirt.png", link: "nearly-a-sale!" },
  { name: "test", src: "/public/images/tees/Shrooms007TShirt.png", link: "nearly-a-sale!" },
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
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    background-image: url("/public/images/trade/TradePic.png?res=med");
    background-repeat: no-repeat;
    background-position: right;
    min-height: 100%;
  }

  #trade-block div {
    margin-top: 40px;
  }
`

export default Trade
