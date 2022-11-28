import styled from "@emotion/styled";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { cameras, images, keywords, lenses } from "../../../blog-data";
import { ImagePost } from "../../../components/ImagePost";
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

export const getStaticProps: GetStaticProps<{
  title: string;
  images: typeof images;
}> = async (context) => {
  const params = context.params as IParams;

  const keyword = [...keywords, ...cameras, ...lenses].find(
    (i) => i.slug === params.keyword
  );

  if (!keyword) {
    return {
      notFound: true,
    };
  }

  const keywordImages = images.filter(
    (i) =>
      i.keywords.some((i) => i.slug === keyword.slug) ||
      i.camera.slug === keyword.slug ||
      i.lens.slug === keyword.slug
  );

  return { props: { title: keyword.title, images: keywordImages } };
};

const Header = styled.header`
  margin-bottom: 4em;
`;

export default function KeywordPage({
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
        <Body as="h2">{title}</Body>
        <Mono subdued>{pluralise(images.length, "image", "images")}</Mono>
      </Header>

      {images.map((image) => (
        <ImagePost image={image} key={image.id} />
      ))}
    </Layout>
  );
}
