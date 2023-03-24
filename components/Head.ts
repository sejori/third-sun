import { html } from "../utils/react.ts"

const Head = () => html`
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>III Sun</title>
    <link rel="icon" type="image/png" href="/public/images/Logo-square.png" />
    <!-- <link rel="preload" href="static/style/iiisunFont-Regular.otf" as="font" type="font/otf"> -->

    <link rel="stylesheet" href="/public/style/index.css" />
    <link rel="stylesheet" href="/public/style/nav.css" />
    <link rel="stylesheet" href="/public/style/parallax.css" />

    <!-- polyfill for safari - https://stackoverflow.com/questions/67466609/customizable-built-in-elements-on-safari-polyfill-via-script-tag-vs-es6-import -->
    <script src="/public/scripts/dev-socket.js"></script>
    <script src="/public/scripts/custom-elements-shim.js"></script>
    <script type="module" src="/components/custom-elements/img-resizing.ts" async></script>
    <script type="module" src="/components/custom-elements/nav-menu.ts" async></script>
  </head>
`

export default Head