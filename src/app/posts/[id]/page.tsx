import { notFound } from "next/navigation";
import { images } from "../../../blog-data";
import { ExifGrid } from "../../../components/ExifGrid";
import { ImagePost } from "../../../components/ImagePost";

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

export async function generateStaticParams() {
  return images.map((image) => ({
    id: image.id,
  }));
}

export default function Post({ params: { id } }: Props) {
  const image = images.find((i) => i.id === id);

  if (!image) {
    notFound();
  }

  return (
    <>
      <ImagePost key={image.id} image={image} />
      <hr />
      <ExifGrid image={image} />
    </>
  );
}
