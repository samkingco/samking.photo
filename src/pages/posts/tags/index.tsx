import styled from "@emotion/styled";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { cameras, keywords, lenses } from "../../../blog-data";
import { Layout } from "../../../components/Layout";
import SocialMeta from "../../../components/SocialMeta";
import { Body, Mono } from "../../../components/Typography";

export const getStaticProps: GetStaticProps<{
  keywords: typeof keywords;
  cameras: typeof cameras;
  lenses: typeof lenses;
}> = async (context) => {
  // TODO: get count of each thing
  return { props: { keywords, cameras, lenses } };
};

const Groups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

export default function KeywordsPage({
  keywords,
  cameras,
  lenses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <SocialMeta title="Tags—Sam King Photo" />

      <Groups>
        <div>
          <Mono subdued>Tags</Mono>
          {keywords.map((keyword) => (
            <Body key={keyword.slug}>
              <Link href={`/posts/tags/${keyword.slug}`}>{keyword.title}</Link>
            </Body>
          ))}
        </div>

        <div>
          <Mono subdued>Cameras</Mono>
          {cameras.map((camera) => (
            <Body key={camera.slug}>
              <Link href={`/posts/tags/${camera.slug}`}>{camera.title}</Link>
            </Body>
          ))}
        </div>

        <div>
          <Mono subdued>Lenses</Mono>
          {lenses.map((lens) => (
            <Body key={lens.slug}>
              <Link href={`/posts/tags/${lens.slug}`}>{lens.title}</Link>
            </Body>
          ))}
        </div>
      </Groups>
    </Layout>
  );
}
