import SocialMeta from "../../../../components/SocialMeta";
import { findKeyword, getImagesForKeyword } from "./page";

interface Params {
  keyword: string;
}

interface Props {
  params: Params;
}

export default function Head({ params: { keyword } }: Props) {
  const kw = findKeyword(keyword);
  if (!kw) return null;
  const keywordImages = getImagesForKeyword(kw);

  return (
    <SocialMeta
      title={`${kw.title}—Sam King Photo`}
      socialImage={keywordImages[0].src}
    />
  );
}
