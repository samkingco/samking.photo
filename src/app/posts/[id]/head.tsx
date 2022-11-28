import { images } from "../../../blog-data";
import SocialMeta from "../../../components/SocialMeta";

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

export default function Head({ params: { id } }: Props) {
  const image = images.find((i) => i.id === id);
  if (!image) return null;
  return (
    <SocialMeta
      socialImage={image.src}
      title={`${image.id}. ${image.title}—Sam King Photo`}
    />
  );
}
