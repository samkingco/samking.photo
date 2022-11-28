import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  cameras,
  images,
  keywords,
  lenses,
  SlugValue,
} from "../../../blog-data";
import { ImagesLayout } from "../../../components/ImagesLayout";
import { Layout } from "../../../components/Layout";
import SocialMeta from "../../../components/SocialMeta";
import { Body, Mono } from "../../../components/Typography";
import { pluralise } from "../../../utils/pluralise";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [...keywords, ...cameras, ...lenses].map((i) => ({
    params: { keyword: i.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
  keyword: string;
}

export function findKeyword(keyword: string) {
  return [...keywords, ...cameras, ...lenses].find((i) => i.slug === keyword);
}

export function getImagesForKeyword(keyword: SlugValue) {
  return images.filter(
    (i) =>
      i.keywords.some((i) => i.slug === keyword.slug) ||
      i.camera.slug === keyword.slug ||
      i.lens.slug === keyword.slug
  );
}

export const getStaticProps: GetStaticProps<{
  title: string;
  images: typeof images;
}> = async (context) => {
  const params = context.params as IParams;
  const keyword = findKeyword(params.keyword);

  if (!keyword) {
    return {
      notFound: true,
    };
  }

  const keywordImages = getImagesForKeyword(keyword);

  return { props: { title: keyword.title, images: keywordImages } };
};

export default function Keyword({
  images,
  title,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <SocialMeta
        title={`${title}—Sam King Photo`}
        socialImage={images[0].src}
      />

      <header className="page-header">
        <Body as="h2">{title}</Body>
        <Mono subdued>{pluralise(images.length, "image", "images")}</Mono>
      </header>

      <ImagesLayout images={images} layout="grid" />
    </Layout>
  );
}