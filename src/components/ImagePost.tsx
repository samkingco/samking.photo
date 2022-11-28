import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { ImageData } from "../blog-data";

interface Props {
  image: ImageData;
}

export function ImagePost({ image }: Props) {
  return (
    <div className="post-image mono">
      <Link href={`/posts/${image.id}`}>
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt=""
        />
      </Link>
      <p>
        <span className="subdued">{image.id}.</span> {image.title || "Untitled"}
      </p>
      <footer className="subdued">
        {format(image.captured, "dd/MM/yyyy")}
        {image.keywords.map((keyword, index) => {
          const isFirst = index === 0 && image.keywords.length > 0;
          const isLast =
            index === image.keywords.length - 1 && image.keywords.length > 0;

          return (
            <>
              {" "}
              {isFirst && "• "}
              <Link
                href={`/posts/tags/${keyword.slug}`}
                key={`${image.id}_${keyword.slug}`}
              >
                <span className="uppercase">{keyword.title}</span>
              </Link>
              {!isLast && ", "}
            </>
          );
        })}
      </footer>
    </div>
  );
}
