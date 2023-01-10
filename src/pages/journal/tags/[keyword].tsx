import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { styled } from "../../../../stitches.config";
import { ImagesLayout } from "../../../components/ImagesLayout";
import { Layout } from "../../../components/Layout";
import SocialMeta from "../../../components/SocialMeta";
import { Body, Mono } from "../../../components/Typography";
import {
  cameras,
  images,
  keywords,
  lenses,
  SlugValue,
} from "../../../data/journal";
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

const Header = styled("header", {
  marginBottom: "4em",
  display: "flex",
  flexDirection: "column",
  gap: "1em",
});

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

      <Header>
        <Mono subdued>
          <Link href="/journal/tags">Tags</Link>
        </Mono>
        <div>
          <Body as="h2">{title}</Body>
          <Mono subdued>{pluralise(images.length, "image", "images")}</Mono>
        </div>
      </Header>

      <ImagesLayout images={images} layout="grid" />
    </Layout>
  );
}
