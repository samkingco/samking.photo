import type { AppProps } from "next/app";
import Script from "next/script";
import { globalStyles } from "../components/globalStyles";

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <>
      <Component {...pageProps} />
      <Script
        defer
        data-domain="samking.photo"
        src="https://plausible.io/js/plausible.js"
        strategy="afterInteractive"
      />
    </>
  );
}
