import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { ImageDetail } from "../../components/ImageDetail";
import SocialMeta from "../../components/SocialMeta";
import { ImageData, images } from "../../data/journal";

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = images.map((i) => ({ params: { id: i.id.toString() } }));
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
  const image = images.find((i) => i.id.toString() === params.id);
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
    <>
      <SocialMeta
        title={`${image.id}. ${image.title}—Sam King Photo`}
        description="A photograph from the journal."
        socialImage={image.src}
      />
      <ImageDetail image={image} closeHref="/" />
    </>
  );
}
