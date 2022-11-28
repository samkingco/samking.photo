import { GetStaticProps, InferGetStaticPropsType } from "next";
import { images } from "../blog-data";
import { ImagePost } from "../components/ImagePost";
import { Layout } from "../components/Layout";
import { pluralise } from "../utils/pluralise";

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
      <h2>Journal</h2>
      <p className="mono subdued">
        {pluralise(images.length, "photograph", "photographs")}
      </p>

      {images.map((image) => (
        <ImagePost image={image} key={image.id} />
      ))}
    </Layout>
  );
}
