import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { ImageData, images } from "../../blog-data";
import { ExifGrid } from "../../components/ExifGrid";
import { ImagePost } from "../../components/ImagePost";
import { Layout } from "../../components/Layout";
import SocialMeta from "../../components/SocialMeta";
import { Mono } from "../../components/Typography";

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
    <Layout>
      <SocialMeta
        socialImage={image.src}
        title={`${image.id}. ${image.title}—Sam King Photo`}
      />
      <ImagePost key={image.id} image={image} />
      <hr />
      <ExifGrid image={image} />
      <hr />
      <Mono>
        Tags:{" "}
        {image.keywords.map((keyword, index) => {
          const isFirst = index === 0 && image.keywords.length > 0;
          const isLast =
            index === image.keywords.length - 1 && image.keywords.length > 0;

          return (
            <React.Fragment key={keyword.slug}>
              <Link
                href={`/posts/tags/${keyword.slug}`}
                key={`${image.id}_${keyword.slug}`}
              >
                <Mono as="span" lowercase>
                  {keyword.title}
                </Mono>
              </Link>
              {!isLast && ", "}
            </React.Fragment>
          );
        })}
      </Mono>
    </Layout>
  );
}
