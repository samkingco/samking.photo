import { usePathname } from "next/navigation";

interface Props {
  title?: string;
  description?: string;
  socialImage?: string;
}

export default function SocialMeta({
  title = "Sam King Photo—",
  description = "A journal of photographs by Sam King.",
  socialImage = "/avatar.jpg",
}: Props) {
  const pathname = usePathname();
  const baseUrl = "https://samking.photo";
  const url = `${baseUrl}/${pathname || ""}`;
  const ogImage = `${baseUrl}${socialImage}`;

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />

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
    </>
  );
}
