import React from "https://esm.sh/react@18.2.0"
import htm from "https://esm.sh/htm@3.1.1"
export { 
  renderToString,
  renderToReadableStream 
} from "https://esm.sh/react-dom@18.2.0/server?dev"

export const html = htm.bind(React.createElement)
export const css = String