import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { getCssText } from "../../stitches.config";
import { globalStyles } from "../components/globalStyles";

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <>
      <Head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
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
