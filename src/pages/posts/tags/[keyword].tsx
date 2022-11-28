import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { images, keywords } from "../../../blog-data";
import { ImagePost } from "../../../components/ImagePost";
import { Layout } from "../../../components/Layout";
import { pluralise } from "../../../utils/pluralise";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = keywords.map((i) => ({ params: { keyword: i.slug } }));
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

  const keyword = keywords.find((i) => i.slug === params.keyword);
  if (!keyword) {
    return {
      notFound: true,
    };
  }

  const keywordImages = images.filter((i) =>
    i.keywords.some((i) => i.slug === keyword.slug)
  );

  return { props: { title: keyword.title, images: keywordImages } };
};

export default function KeywordPage({
  images,
  title,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <h2>{title}</h2>
      <p className="mono subdued">
        {pluralise(images.length, "photograph", "photographs")}
      </p>

      {images.map((image) => (
        <ImagePost image={image} key={image.id} />
      ))}
    </Layout>
  );
}
