import React from "npm:react@18.2.0"
import htm from "https://esm.sh/htm@3.1.1"
export { 
  renderToString,
  renderToReadableStream 
} from "npm:react-dom@18.2.0/server"
export const html = htm.bind(React.createElement)