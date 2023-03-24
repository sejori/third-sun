import { html } from "../utils/react.ts"
import Head from "../components/Head.ts"
import Nav from "../components/Nav.ts"
import Footer from "../components/Footer.ts"

const Index = () => html`
  <${Head} />

  <body>
    <div class="parallax">
      <header class="parallax__group">
        <img is="img-resizing" class="parallax__layer deep" src="/public/images/header-bg/BLUE_LOGO-min.png?res=low" fetchpriority="high" />
        <img is="img-resizing" class="parallax__layer background" src="/public/images/header-bg/BLUE_BACKGROUND-min.png?res=low" fetchpriority="high" />
        <img is="img-resizing" class="parallax__layer midground" src="/public/images/header-bg/BLUE_MIDGROUND-min.png?res=low" fetchpriority="high" />
        <img is="img-resizing" class="parallax__layer foreground" src="/public/images/header-bg/BLUE_FOREGROUND-min.png?res=low" fetchpriority="high" />
      </header>

      <section id="info" class="blue-bg parallax__group">
        <${Nav} />

        <div class="container wide foreground">
          <h1>III Sun</h1>
          <p>A talent of legend from the depths below. A creator of things, graveyard so.</p>
          <p>Quencher of desires, noble and sadistic. Acquirer of knowledge, however non-altruistic.</p>
          <p>Sample the wares by continuing to scroll...</p>
          <p>When inspiration strikes, you know who to call...</p>
        </div>
      </section>

      <section class="parallax__group">
        <div class="container wide foreground">
          <div class="align-center">
            <img is="img-resizing" class="width-500" alt="Beastfrombelow" src="/public/images/showcase/Beastfrombelow.png?res=low" fetchpriority="low" data-triggerevent="nav-menu_move-to-body" />
            <h4>Beast from below <a href="/public/images/showcase/Beastfrombelow.png">view full</a></h4>
          </div>
        </div>
      </section>

      <section class="parallax__group">
        <!-- <div class="container wide foreground">
          <img is="img-resizing" style="width: 420px; align-self: center;" alt="Sectapustshirt" src="/public/images/tees/Sectapustshirt.png?res=low" fetchpriority="high" data-triggerevent="nav-menu_move-to-body" />
          <a class="cta" style="margin-top: -50px" href="#woop-nearly-a-sale!"><h4>£28.00</h4></a>
        </div> -->
        <div class="container wide foreground">
          <div class="align-center">
            <img is="img-resizing" class="width-500" alt="Runawaycoward" src="/public/images/showcase/Runawaycoward.png?res=low" fetchpriority="low" data-triggerevent="nav-menu_move-to-body" />
            <h4>Runaway coward <a href="/public/images/showcase/Runawaycoward.png">view full</a></h4>
          </div>
        </div>
      </section>

      <section class="parallax__group">
        <!-- <div class="container wide foreground">
          <img is="img-resizing" style="width: 420px; align-self: center;" alt="SnakeBoneTshirt" src="/public/images/tees/SnakeBoneTshirt.png?res=low" fetchpriority="high" data-triggerevent="nav-menu_move-to-body" />
          <a class="cta" style="margin-top: -50px" href="#woop-nearly-a-sale!"><h4>£28.00</h4></a>
        </div> -->
        <div class="container wide foreground">
          <div class="align-center">
            <img is="img-resizing" class="width-500" alt="SeaGoddess" src="/public/images/showcase/SeaGoddess.png?res=low" fetchpriority="low" data-triggerevent="nav-menu_move-to-body" />
            <h4>Sea goddess <a href="/public/images/showcase/SeaGoddess.png">view full</a></h4>
          </div>
        </div>
      </section>

      <section class="parallax__group">
        <!-- <div class="container wide foreground">
          <img is="img-resizing" style="width: 420px; align-self: center;" alt="SnakeBoneTshirt" src="/public/images/tees/SnakeBoneTshirt.png?res=low" fetchpriority="high" data-triggerevent="nav-menu_move-to-body" />
          <a class="cta" style="margin-top: -50px" href="#woop-nearly-a-sale!"><h4>£28.00</h4></a>
        </div> -->
        <div class="container wide foreground">
          <div class="align-center">
            <img is="img-resizing" class="width-500" alt="Shellgoddess" src="/public/images/showcase/Shellgoddess.png?res=low" fetchpriority="low" data-triggerevent="nav-menu_move-to-body" />
            <h4>Shell goddess <a href="/public/images/showcase/Shellgoddess.png">view full</a></h4>
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

export default Index
