import { GetStaticProps, InferGetStaticPropsType } from "next";
import { images } from "../blog-data";
import { ImagesLayout } from "../components/ImagesLayout";
import { Layout } from "../components/Layout";
import SocialMeta from "../components/SocialMeta";

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
      <SocialMeta />
      <ImagesLayout images={images} layout="scroll" />
    </Layout>
  );
}
