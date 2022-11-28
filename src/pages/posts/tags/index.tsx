import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { cameras, keywords, lenses } from "../../../blog-data";
import { Layout } from "../../../components/Layout";

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
      <h2>Tags</h2>
      {keywords.map((keyword) => (
        <Link href={`/posts/tags/${keyword.slug}`} key={keyword.slug}>
          {keyword.title}
        </Link>
      ))}

      <h2>Cameras</h2>
      {cameras.map((camera) => (
        <Link href={`/posts/tags/${camera.slug}`} key={camera.slug}>
          {camera.title}
        </Link>
      ))}

      <h2>Lenses</h2>
      {lenses.map((lens) => (
        <Link href={`/posts/tags/${lens.slug}`} key={lens.slug}>
          {lens.title}
        </Link>
      ))}
    </Layout>
  );
}
