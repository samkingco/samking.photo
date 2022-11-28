import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { ImageData, images } from "../../blog-data";
import { ImagePost } from "../../components/ImagePost";
import { Layout } from "../../components/Layout";
import SocialMeta from "../../components/SocialMeta";
import { Mono } from "../../components/Typography";

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
      <SocialMeta
        socialImage={image.src}
        title={`${image.id}. ${image.title || "Untitled"}—Sam King Photo`}
      />

      <ImagePost key={image.id} image={image} />
      <hr />
      <Mono>
        Camera:{" "}
        <Link href={`/posts/tags/${image.camera.slug}`}>
          {image.camera.title}
        </Link>
      </Mono>
      <Mono>
        Lens:{" "}
        <Link href={`/posts/tags/${image.lens.slug}`}>{image.lens.title}</Link>
      </Mono>
      <Mono>Shutter: {image.exposure}</Mono>
      <Mono>Aperture: {image.aperture}</Mono>
      <Mono>ISO: {image.iso}</Mono>
      <Mono>Focal length: {image.focal}</Mono>
    </Layout>
  );
}
