import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Script from "next/script";
import { globalStyles } from "../components/globalStyles";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <Script
        defer
        data-domain="samking.photo"
        src="https://plausible.io/js/plausible.js"
        strategy="afterInteractive"
      />
    </QueryClientProvider>
  );
}
