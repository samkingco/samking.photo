import { globalCss } from "../../stitches.config";

export const globalStyles = globalCss({
  "@font-face": [
    {
      fontFamily: "Text",
      fontDisplay: "fallback",
      src: 'url("/fonts/Text.woff") format("woff"), url("/fonts/Text.woff2") format("woff2")',
      fontStyle: "normal",
      fontWeight: "normal",
    },
    {
      fontFamily: "Mono",
      fontDisplay: "fallback",
      src: 'url("/fonts/Mono.woff") format("woff"), url("/fonts/Mono.woff2") format("woff2")',
      fontStyle: "normal",
      fontWeight: "normal",
    },
    {
      fontFamily: "Nikolai",
      fontDisplay: "fallback",
      src: 'url("/fonts/Nikolai-Italic.woff") format("woff"), url("/fonts/Nikolai-Italic.woff2") format("woff2")',
      fontStyle: "italic",
      fontWeight: "bold",
    },
  ],
  ":root": {
    "--reach-dialog": 1,
  },
  "*, *:before, *:after": {
    boxSizing: "border-box",
    margin: 0,
  },
  "html, body, #__next": {
    height: "100%",
  },
  body: {
    margin: "0",
    padding: "0",
    fontFamily: "$sans",
    fontSize: "16px",
    lineHeight: "1.5",
    color: "$foreground",
    backgroundColor: "$background",
    cursor: "crosshair",
  },
  img: {
    maxWidth: "100%",
    width: "100%",
    height: "auto",
  },
  button: {
    margin: "0",
    padding: "0",
    fontFamily: "$mono",
    fontSize: "0.875rem",
    lineHeight: "1",
    overflow: "visible",
    textTransform: "none",
    border: "none",
    cursor: "crosshair",
    background: "transparent",
    outline: "none",
    textDecoration: "underline",
  },
  "a, button": {
    color: "inherit",
    textDecorationColor: "rgba($foreground-alpha, 0.4)",
    transition: "color 150ms ease, text-decoration-color 150ms ease",
    "&:hover": {
      color: "$accent",
      textDecorationColor: "$accent",
      cursor: "crosshair",
    },
    "&:focus-visible": {
      textDecorationColor: "$foreground",
      outline: "none",
    },
  },
  hr: {
    border: "none",
    background: "$extra-subdued",
    width: "100%",
    maxWidth: "4em",
    height: "1px",
    margin: "2em 0",
  },
  "::selection": {
    backgroundColor: "$accent",
    color: "$foreground",
  },
  "@media (prefers-color-scheme: dark)": {
    ":root": {
      "--colors-background": "rgb(0, 0, 0)",
      "--colors-background-alpha": "0, 0, 0",
      "--colors-foreground": "rgb(255, 255, 255)",
      "--colors-foreground-alpha": "255, 255, 255",
      "--colors-subdued": "rgb(168, 168, 168)",
      "--colors-extra-subdued": "rgb(30, 30, 30)",
    },
    "::selection": {
      color: "$foreground",
    },
  },
});
