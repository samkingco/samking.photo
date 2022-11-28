import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { ImageData, images } from "../../blog-data";
import { ImagePost } from "../../components/ImagePost";
import { Layout } from "../../components/Layout";

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = images.map((i) => ({ params: { slug: i.id } }));
  return {
    paths,
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<{
  image: ImageData;
}> = async (context) => {
  const params = context.params as IParams;
  const image = images.find((i) => i.id === params.slug);
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
      <ImagePost key={image.id} image={image} />
    </Layout>
  );
}
