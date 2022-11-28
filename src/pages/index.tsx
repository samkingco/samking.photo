import { GetStaticProps, InferGetStaticPropsType } from "next";
import { images } from "../blog-data";
import { ImagePost } from "../components/ImagePost";
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
      {images.map((image) => (
        <ImagePost image={image} key={image.id} />
      ))}
    </Layout>
  );
}
