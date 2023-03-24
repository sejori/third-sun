import { html } from "../utils/react.ts"
import Head from "../components/Head.ts"
import Nav from "../components/Nav.ts"
import Footer from "../components/Footer.ts"

const Trade = () => html`
  <${Head} />

  <body>
    <div class="parallax">
      <section id="info" class="blue-bg parallax__group">
        <${Nav} />

        <div class="container wide foreground">
          <img is="img-resizing" class="width-420 align-center" alt="TradePic.png" src="/public/images/showcase/tradePic.png?res=low" fetchpriority="high" data-triggerevent="nav-menu_move-to-body" />
          <a class="cta" class="mt-50" href="#woop-nearly-a-sale!"></a>
        </div>
      </section>

      <section class="parallax__group">
        <div class="container wide foreground">
          <img is="img-resizing" class="width-420 align-center" alt="Robotshirt" src="/public/images/tees/Robotshirt.png?res=low" fetchpriority="high" data-triggerevent="nav-menu_move-to-body" />
          <a class="cta" class="mt-50" href="#woop-nearly-a-sale!"><h4>£28.00</h4></a>
        </div>
      </section>

      <section class="parallax__group">
        <div class="container wide foreground">
          <img is="img-resizing" class="width-420 align-center" alt="Sectapustshirt" src="/public/images/tees/Sectapustshirt.png?res=low" fetchpriority="high" data-triggerevent="nav-menu_move-to-body" />
          <a class="cta" class="mt-50" href="#woop-nearly-a-sale!"><h4>£28.00</h4></a>
        </div>
      </section>

      <section class="parallax__group">
        <div class="container wide foreground">
          <img is="img-resizing" class="width-420 align-center" alt="SnakeBoneTshirt" src="/public/images/tees/SnakeBoneTshirt.png?res=low" fetchpriority="high" data-triggerevent="nav-menu_move-to-body" />
          <a class="cta" class="mt-50" href="#woop-nearly-a-sale!"><h4>£28.00</h4></a>
        </div>
      </section>

      <section class="parallax__group">
        <div class="container wide foreground">
          <img is="img-resizing" class="width-420 align-center" alt="SpookyScaryTshirt" src="/public/images/tees/SpookyScaryTshirt.png?res=low" fetchpriority="high" data-triggerevent="nav-menu_move-to-body" />
          <a class="cta" class="mt-50" href="#woop-nearly-a-sale!"><h4>£28.00</h4></a>
        </div>
      </section>

      <section class="parallax__group">
        <div class="container wide foreground">
          <img is="img-resizing" class="width-420px align-center" alt="UndertheMoonTshirt" src="/public/images/tees/UndertheMoonTshirt.png?res=low" fetchpriority="high" data-triggerevent="nav-menu_move-to-body" />
          <a class="cta" class="mt-50" href="#woop-nearly-a-sale!"><h4>£28.00</h4></a>
        </div>
      </section>

      <section class="parallax__group">
        <div class="container wide foreground">
          <div class="spacer-md">&nbsp;</div>
        </div>
      </section>

      <${Footer} />
    </div>
  </body>
`

export default Trade
