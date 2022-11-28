import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { ImageData, images } from "../../blog-data";
import { ExifGrid } from "../../components/ExifGrid";
import { ImagePost } from "../../components/ImagePost";
import { Layout } from "../../components/Layout";
import SocialMeta from "../../components/SocialMeta";

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = images.map((i) => ({ params: { id: i.id } }));
  return {
    paths,
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<{
  image: ImageData;
}> = async (context) => {
  const params = context.params as IParams;
  const image = images.find((i) => i.id === params.id);
  if (!image) {
    return {
      notFound: true,
    };
  }
  return { props: { image } };
};

export default function PostPage({
  image,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <SocialMeta
        socialImage={image.src}
        title={`${image.id}. ${image.title || "Untitled"}—Sam King Photo`}
      />
      <ImagePost key={image.id} image={image} />
      <hr />
      <ExifGrid image={image} />
    </Layout>
  );
}
