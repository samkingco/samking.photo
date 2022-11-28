import "@reach/dialog/styles.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import "../globals.css";

export default function App({ Component, pageProps }: AppProps) {
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
