import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ImagesLayout } from "../../components/ImagesLayout";
import { Layout } from "../../components/Layout";
import SocialMeta from "../../components/SocialMeta";
import { images } from "../../data/journal";

export const getStaticProps: GetStaticProps<{
  images: typeof images;
}> = async () => {
  return { props: { images } };
};

export default function Home({
  images,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <SocialMeta
        description="A journal of photographs by Sam King."
        socialImage="/og-image-journal.png"
      />
      <ImagesLayout images={images} layout="scroll" />
    </Layout>
  );
}
