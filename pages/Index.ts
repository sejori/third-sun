import { html, css } from "https://deno.land/x/pekommunity@0.0.1/react/mod.ts"
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
      </section>

      <section class="parallax__group">
        <div class="container wide background">
          <h1>iii Sun</h1>
          <p> Graphic Design and illustration from Stonehenge, now based in Scotland.</p>
          <p> Combining the energy of Druid Circles and Pictish Standing Stones. Working with the a concept that is echoed throughout time.</p>
          <p> Truth is the harvest scythe. What is sown, Love, Anger or Bitterness. That shall be your bread. </p> 
          <p> This is belief that beauty is everywhere, because all is one in the universe. Including the monsters in our heads. </p>
        </div>
      </section>

      <section class="parallax__group">
        <div class="container wide foreground">
          <img is="img-resizing" class="align-center width-500" alt="Beastfrombelow" src="/public/images/showcase/Beastfrombelow.png?res=low" fetchpriority="low" data-triggerevent="nav-menu_move-to-body" />
          <h4 class="align-center">Beast from below <a href="/public/images/showcase/Beastfrombelow.png">view full</a></h4>
        </div>
      </section>

      <section class="parallax__group">
        <!-- <div class="container wide foreground">
          <img is="img-resizing" style="width: 420px; align-self: center;" alt="Sectapustshirt" src="/public/images/tees/Sectapustshirt.png?res=low" fetchpriority="high" data-triggerevent="nav-menu_move-to-body" />
          <a class="cta" style="margin-top: -50px" href="#woop-nearly-a-sale!"><h4>£28.00</h4></a>
        </div> -->
        <div class="container wide foreground">
          <img is="img-resizing" class="width-500 align-center" alt="Runawaycoward" src="/public/images/showcase/Runawaycoward.png?res=low" fetchpriority="low" data-triggerevent="nav-menu_move-to-body" />
          <h4 class="align-center">Runaway coward <a href="/public/images/showcase/Runawaycoward.png">view full</a></h4>
        </div>
      </section>

      <section class="parallax__group">
        <!-- <div class="container wide foreground">
          <img is="img-resizing" style="width: 420px; align-self: center;" alt="SnakeBoneTshirt" src="/public/images/tees/SnakeBoneTshirt.png?res=low" fetchpriority="high" data-triggerevent="nav-menu_move-to-body" />
          <a class="cta" style="margin-top: -50px" href="#woop-nearly-a-sale!"><h4>£28.00</h4></a>
        </div> -->
        <div class="container wide foreground">
          <img is="img-resizing" class="align-center width-500" alt="SeaGoddess" src="/public/images/showcase/SeaGoddess.png?res=low" fetchpriority="low" data-triggerevent="nav-menu_move-to-body" />
          <h4 class="align-center">Sea goddess <a href="/public/images/showcase/SeaGoddess.png">view full</a></h4>
        </div>
      </section>

      <section class="parallax__group">
        <!-- <div class="container wide foreground">
          <img is="img-resizing" style="width: 420px; align-self: center;" alt="SnakeBoneTshirt" src="/public/images/tees/SnakeBoneTshirt.png?res=low" fetchpriority="high" data-triggerevent="nav-menu_move-to-body" />
          <a class="cta" style="margin-top: -50px" href="#woop-nearly-a-sale!"><h4>£28.00</h4></a>
        </div> -->
        <div class="container wide foreground">
          <img is="img-resizing" class="align-center width-500" alt="Shellgoddess" src="/public/images/showcase/Shellgoddess.png?res=low" fetchpriority="low" data-triggerevent="nav-menu_move-to-body" />
          <h4 class="align-center">Shell goddess <a href="/public/images/showcase/Shellgoddess.png">view full</a></h4>
        </div>
      </section>

      <section class="parallax__group">
        <div class="container wide foreground">
          <div class="spacer-md"></div>
        </div>
      </section>

      <${Footer} />
    </div>
  </body>
`

export default Index
