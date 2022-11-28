import { notFound } from "next/navigation";
import {
  cameras,
  images,
  keywords,
  lenses,
  SlugValue,
} from "../../../../blog-data";
import { ImagePost } from "../../../../components/ImagePost";
import { Body, Mono } from "../../../../components/Typography";
import { pluralise } from "../../../../utils/pluralise";

interface Params {
  keyword: string;
}

interface Props {
  params: Params;
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

export async function generateStaticParams() {
  return [...keywords, ...cameras, ...lenses].map((kw) => ({
    keyword: kw.slug,
  }));
}

export default function Keyword({ params: { keyword } }: Props) {
  const kw = findKeyword(keyword);
  if (!kw) notFound();
  const keywordImages = getImagesForKeyword(kw);

  return (
    <>
      <header className="page-header">
        <Body as="h2">{kw.title}</Body>
        <Mono subdued>
          {pluralise(keywordImages.length, "image", "images")}
        </Mono>
      </header>

      {keywordImages.map((image) => (
        <ImagePost image={image} key={image.id} />
      ))}
    </>
  );
}
