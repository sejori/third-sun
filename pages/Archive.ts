import { html } from "https://deno.land/x/pekommunity@0.0.1/react/mod.ts"
import Head from "../components/Head.ts"
import Nav from "../components/Nav.ts"
import Footer from "../components/Footer.ts"

const Archive = () => html`
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

      <section>
        <div class="container wide foreground">
          <img is="img-resizing" class="width-420 align-center" alt="WavesTshirt" src="/public/images/tees/WavesTshirt.png?res=low" fetchpriority="high" data-triggerevent="nav-menu_move-to-body" />
          <a class="cta" class="mt-50" href="#woop-nearly-a-sale!"><h4>£28.00</h4></a>
        </div>
        <div class="container wide background">
          <div class="shadowed align-end">
            <img is="img-resizing" class="width-300 align-start;" alt="Page2" src="/public/images/showcase/Page2.png?res=low" fetchpriority="low" data-triggerevent="nav-menu_move-to-body" />
          </div>
        </div>
      </section>

      <section class="parallax__group">
        <div class="container wide foreground">
          <img is="img-resizing" class="width-420 align-center" alt="Robotshirt" src="/public/images/tees/Robotshirt.png?res=low" fetchpriority="high" data-triggerevent="nav-menu_move-to-body" />
          <a class="cta" class="mt-50" href="#woop-nearly-a-sale!"><h4>£28.00</h4></a>
        </div>
        <div class="container wide midground">
          <div class="shadowed align-start">
            <img is="img-resizing" class="width-300" alt="birds" src="/public/images/showcase/birds.png?res=low" fetchpriority="low" data-triggerevent="nav-menu_move-to-body" />
          </div>
        </div>
      </section>

      <section class="parallax__group">
        <div class="container wide foreground">
          <img is="img-resizing" class="width-420 align-center" alt="Sectapustshirt" src="/public/images/tees/Sectapustshirt.png?res=low" fetchpriority="high" data-triggerevent="nav-menu_move-to-body" />
          <a class="cta" class="mt-50" href="#woop-nearly-a-sale!"><h4>£28.00</h4></a>
        </div>
        <div class="container wide background">
          <div class="shadowed align-center">
            <img is="img-resizing" class="width-420 align-end" alt="stop_vampyre" src="/public/images/showcase/stop_vampyre.png?res=low" fetchpriority="low" data-triggerevent="nav-menu_move-to-body" />
          </div>
        </div>
      </section>

      <section class="parallax__group">
        <div class="container wide foreground">
          <img is="img-resizing" class="width-420 align-center" alt="SnakeBoneTshirt" src="/public/images/tees/SnakeBoneTshirt.png?res=low" fetchpriority="high" data-triggerevent="nav-menu_move-to-body" />
          <a class="cta" class="mt-50" href="#woop-nearly-a-sale!"><h4>£28.00</h4></a>
        </div>
        <div class="container wide background">
          <div class="shadowed align-end">
            <img is="img-resizing" class="width-360" alt="Page3" src="/public/images/showcase/Page3.png?res=low" fetchpriority="low" data-triggerevent="nav-menu_move-to-body" />
          </div>
        </div>
      </section>

      <section class="parallax__group">
        <div class="container wide foreground">
          <img is="img-resizing" class="width-420 align-center" alt="SpookyScaryTshirt" src="/public/images/tees/SpookyScaryTshirt.png?res=low" fetchpriority="high" data-triggerevent="nav-menu_move-to-body" />
          <a class="cta" class="mt-50" href="#woop-nearly-a-sale!"><h4>£28.00</h4></a>
        </div>
        <div class="container wide midground">
          <div class="shadowed align-start">
            <img is="img-resizing" class="width-300 align-start;" alt="deer" src="/public/images/showcase/deer.png?res=low" fetchpriority="low" data-triggerevent="nav-menu_move-to-body" />
          </div>
        </div>
      </section>

      <section class="parallax__group">
        <div class="container wide foreground">
          <img is="img-resizing" class="width-420 align-center" alt="UndertheMoonTshirt" src="/public/images/tees/UndertheMoonTshirt.png?res=low" fetchpriority="high" data-triggerevent="nav-menu_move-to-body" />
          <a class="cta" class="mt-50" href="#woop-nearly-a-sale!"><h4>£28.00</h4></a>
        </div>
        <div class="container wide background">
          <div class="shadowed align-end">
            <img is="img-resizing" class="width-360" alt="Page1" src="/public/images/showcase/Page1.png?res=low" fetchpriority="low" data-triggerevent="nav-menu_move-to-body" />
          </div>
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

export default Archive