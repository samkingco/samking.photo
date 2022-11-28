import styled from "@emotion/styled";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ImageData } from "../blog-data";
import { Body, Mono } from "./Typography";

const Wrapper = styled.div`
  & + & {
    margin-top: 4em;
  }

  @media (min-width: 40rem) {
    img {
      max-width: 84vw;
      max-height: 88vh;
    }
  }
`;

const PostTitle = styled(Body)`
  margin-top: 1em;
`;

interface Props {
  image: ImageData;
}

export function ImagePost({ image }: Props) {
  return (
    <Wrapper>
      <Link href={`/posts/${image.id}`}>
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt=""
        />
      </Link>
      <PostTitle>
        {image.id}. {image.title || "Untitled"}
      </PostTitle>
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
                  <span className="uppercase">{keyword.title}</span>
                </Link>
                {!isLast && ", "}
              </React.Fragment>
            );
          })}
        </Mono>
      </footer>
    </Wrapper>
  );
}
