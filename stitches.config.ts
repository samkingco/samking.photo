import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  getCssText,
  keyframes,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      background: "rgb(255, 255, 255)",
      backgroundAlpha: "255, 255, 255",
      foreground: "rgb(0, 0, 0)",
      foregroundAlpha: "0, 0, 0",
      subdued: "rgb(140, 140, 140)",
      extraSubdued: "rgb(220, 220, 220)",
      accent: "rgb(245, 42, 42)",
      accentAlpha: "245, 42, 42",
    },
    fonts: {
      heading: '"Nikolai", serif',
      sans: '"Text", system, -apple-system, "Helvetica Neue", Helvetica, "Segoe UI", "Roboto", sans-serif',
      mono: '"Mono", SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace',
    },
    space: {
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
    },
  },
  media: {
    xxs: "(min-width: 20rem)",
    xs: "(min-width: 30rem)",
    sm: "(min-width: 36rem)",
    md: "(min-width: 40rem)",
    lg: "(min-width: 48rem)",
    xl: "(min-width: 64rem)",
    landscape: "(orientation: landscape)",
    portrait: "(orientation: portrait)",
  },
  utils: {
    m: (value: string) => ({
      margin: value,
    }),
    mt: (value: string) => ({
      marginTop: value,
    }),
    mr: (value: string) => ({
      marginRight: value,
    }),
    mb: (value: string) => ({
      marginBottom: value,
    }),
    ml: (value: string) => ({
      marginLeft: value,
    }),
    mx: (value: string) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: string) => ({
      marginTop: value,
      marginBottom: value,
    }),
  },
});
