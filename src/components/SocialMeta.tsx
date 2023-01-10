import Head from "next/head";
import { useRouter } from "next/router";

type Props = {
  title?: string;
  description?: string;
  socialImage?: string;
};

export default function SocialMeta({
  title = "Sam King Photo—",
  description = "Photography by Sam King",
  socialImage = "/og-image.png",
}: Props) {
  const router = useRouter();
  const baseUrl = "https://samking.photo";
  const url = `${baseUrl}/${router.asPath}`;
  const ogImage = `${baseUrl}${socialImage}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={title} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@samkingco" />
    </Head>
  );
}
