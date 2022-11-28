import Link from "next/link";
import { cameras, keywords, lenses } from "../../../blog-data";
import { Body, Mono } from "../../../components/Typography";

export default function Tags() {
  return (
    <>
      <div className="tag-blocks">
        <div>
          <Mono subdued>Tags</Mono>
          {keywords.map((keyword) => (
            <Body key={keyword.slug}>
              <Link href={`/posts/tags/${keyword.slug}`}>{keyword.title}</Link>
            </Body>
          ))}
        </div>

        <div>
          <Mono subdued>Cameras</Mono>
          {cameras.map((camera) => (
            <Body key={camera.slug}>
              <Link href={`/posts/tags/${camera.slug}`}>{camera.title}</Link>
            </Body>
          ))}
        </div>

        <div>
          <Mono subdued>Lenses</Mono>
          {lenses.map((lens) => (
            <Body key={lens.slug}>
              <Link href={`/posts/tags/${lens.slug}`}>{lens.title}</Link>
            </Body>
          ))}
        </div>
      </div>
    </>
  );
}
