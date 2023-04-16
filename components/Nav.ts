import { html, css } from "https://deno.land/x/pekommunity@0.0.1/react/mod.ts"

const Nav = () => html`
  <nav is="nav-menu">
    <button id="nav-button" name="nav-button">+</button>

    <div id="nav-content">
      <h1>Offerings</h1>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/trade">Trade</a>
        </li>
        <li>
          <a href="/stories">Stories</a>
        </li>
        <li>
          <a href="/archive">The depths</a>
        </li>
      </ul>
    </div>
  </nav>
`

css`
  nav {
    z-index: 3;
    position: absolute;
    top: 0px;
    right: 0px;
    overflow: hidden;
    width: 100px;
    height: 100px;
  }
  nav h1 {
    color: #09132e;
  }
  nav li {
    font-size: 32px;
    margin: 25px;
  }

  #nav-button {
    z-index: 3;
    width: 80px;
    height: 80px;
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 72px;
    color: #eb901a;
    border: none;
    background-color: unset;
    cursor: pointer;
    padding: 0;
  }

  #nav-content {
    padding: 50px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: whitesmoke;
    color: #09132e;

    /* changed with nav.isOpen */
    transform: translate(100%);

    /* for smooth animation */
    transition: transform 0.6s ease-in-out;
  }

  #nav-content::before {  
    pointer-events: none;
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    background-image: url("/public/images/nav-bg/offerings_left.gif"), url("/public/images/nav-bg/offerings_right.gif");
    background-size: 300px, 300px;
    background-repeat: no-repeat, no-repeat;
    background-position: left bottom, right bottom;
  }

  @media only screen and (max-width: 600px) {
    #nav-content::before {  
      background-image: url("/public/images/nav-bg/offerings_right.gif");
      background-size: 300px;
      background-repeat: no-repeat;
      background-position: right bottom;
    }
  }

  nav.isOpen > #nav-content  {
    transform: translate(0);
  }

  #nav-content > ul {
    list-style-type: decimal-leading-zero;
    margin: none;
  }
`

export default Nav