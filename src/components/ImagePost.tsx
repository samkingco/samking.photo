import { cva } from "class-variance-authority";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { ImageData } from "../blog-data";
import { Body, Mono } from "./Typography";

interface Props {
  image: ImageData;
  size?: "small" | "medium" | "large";
}

const imagePost = cva("image-post", {
  variants: {
    size: {
      small: "small",
      medium: "medium",
      large: "large",
    },
  },
});

export function ImagePost({ image, ...props }: Props) {
  return (
    <div className={imagePost(props)}>
      <Link href={`/posts/${image.id}`}>
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt=""
        />
      </Link>
      <Body className="image-post-title">{image.title}</Body>
      <Mono subdued>{format(image.captured, "dd/MM/yyyy")}</Mono>
    </div>
  );
}
