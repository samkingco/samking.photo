import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { styled } from "../../../../stitches.config";
import { Layout } from "../../../components/Layout";
import SocialMeta from "../../../components/SocialMeta";
import { Body, Mono } from "../../../components/Typography";
import { cameras, keywords, lenses } from "../../../data/journal";

const Blocks = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "2em",
});

export const getStaticProps: GetStaticProps<{
  keywords: typeof keywords;
  cameras: typeof cameras;
  lenses: typeof lenses;
}> = async (context) => {
  // TODO: get count of each thing
  return { props: { keywords, cameras, lenses } };
};

export default function KeywordsPage({
  keywords,
  cameras,
  lenses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <SocialMeta
        title="Tags—Sam King Photo"
        description="Browse journal photographs by tag and camera information."
        socialImage="/og-image-journal.png"
      />

      <Blocks>
        <div>
          <Mono subdued>Tags</Mono>
          {keywords.map((keyword) => (
            <Body key={keyword.slug}>
              <Link href={`/journal/tags/${keyword.slug}`}>
                {keyword.title}
              </Link>
            </Body>
          ))}
        </div>
        <div>
          <Mono subdued>Cameras</Mono>
          {cameras.map((camera) => (
            <Body key={camera.slug}>
              <Link href={`/journal/tags/${camera.slug}`}>{camera.title}</Link>
            </Body>
          ))}
        </div>
        <div>
          <Mono subdued>Lenses</Mono>
          {lenses.map((lens) => (
            <Body key={lens.slug}>
              <Link href={`/journal/tags/${lens.slug}`}>{lens.title}</Link>
            </Body>
          ))}
        </div>
      </Blocks>
    </Layout>
  );
}
