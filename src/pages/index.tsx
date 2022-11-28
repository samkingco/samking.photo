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

function getSizeFromId(id: number) {
  if (id % 5 === 0) return "medium";
  if (id % 8 === 0) return "large";
  return "small";
}

export default function Home({
  images,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <SocialMeta />
      <div className="photo-journal">
        {images.map((image) => (
          <ImagePost
            image={image}
            size={getSizeFromId(image.id)}
            key={image.id}
          />
        ))}
      </div>
    </Layout>
  );
}
