import { html } from "../utils/react.ts"

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

export default Nav