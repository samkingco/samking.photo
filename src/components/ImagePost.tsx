import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ImageData } from "../blog-data";
import { Body, Mono } from "./Typography";

interface Props {
  image: ImageData;
}

export function ImagePost({ image }: Props) {
  return (
    <div className="image-post">
      <Link href={`/posts/${image.id}`}>
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt=""
        />
      </Link>
      <Body className="image-post-title">
        {image.id}. {image.title}
      </Body>
      <footer>
        <Mono subdued>
          {format(image.captured, "dd/MM/yyyy")}
          {image.keywords.map((keyword, index) => {
            const isFirst = index === 0 && image.keywords.length > 0;
            const isLast =
              index === image.keywords.length - 1 && image.keywords.length > 0;

            return (
              <React.Fragment key={keyword.slug}>
                {" "}
                {isFirst && "• "}
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
      </footer>
    </div>
  );
}
