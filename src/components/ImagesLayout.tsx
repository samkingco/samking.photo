import { cva } from "class-variance-authority";
import { format } from "date-fns";
import { useContextualRouting } from "next-use-contextual-routing";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ImageData } from "../blog-data";
import { ImageDetail } from "./ImageDetail";
import { Modal } from "./Modal";
import { Body, Mono } from "./Typography";

interface Props {
  images: ImageData[];
  layout: "grid" | "scroll";
}

function getSizeFromId(id: number) {
  if (id % 5 === 0) return "medium";
  if (id % 8 === 0) return "large";
  return "small";
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

export function ImagesLayout({ images, layout }: Props) {
  const router = useRouter();
  const { returnHref, makeContextualHref } = useContextualRouting();
  const [modalImage, setModalImage] = useState<ImageData | undefined>();
  const refs = useRef<Map<number, HTMLAnchorElement | null>>(new Map());

  useEffect(() => {
    refs.current = new Map(images.map((i) => [i.id, null]));
    return () => {
      refs.current = new Map();
    };
  }, []);

  useEffect(() => {
    const image = images.find((i) => `${i.id}` === router.query.id);
    setModalImage(image);
    return () => {
      setModalImage(undefined);
    };
  }, [router.query.id]);

  const onModalClose = (id: number) => {
    const returnToId = id;

    if (returnToId > -1) {
      // Scroll to the image and set focus when the modal closes
      // setTimeout hack because of focus locking in @reach/dialog
      setTimeout(() => {
        const ref = refs.current.get(returnToId);
        if (ref) {
          // @ts-ignore: Object is possibly 'null'.
          ref.scrollIntoView({
            block: "center",
            inline: "center",
          });
          // @ts-ignore: Object is possibly 'null'.
          ref.focus();
        }
      }, 0);
    }

    if (returnHref) {
      router.push(returnHref, undefined, {
        scroll: false,
      });
    }
  };

  return (
    <div
      className={
        layout === "scroll" ? "image-layout-scroll" : "image-layout-grid"
      }
    >
      {images.map((image) => (
        <div
          className={imagePost({ size: getSizeFromId(image.id) })}
          key={image.id}
        >
          <Link
            href={makeContextualHref({ id: image.id })}
            as={`/journal/${image.id}`}
            ref={(el) => refs.current.set(image.id, el)}
          >
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
      ))}

      <Modal
        a11yLabel={`Detail view of photo ${modalImage?.id}`}
        isOpen={Boolean(!!router.query.id && modalImage)}
        onClose={() => onModalClose(modalImage?.id || -1)}
      >
        {modalImage && (
          <ImageDetail
            image={modalImage}
            onClose={(id) => onModalClose(id)}
            contextIds={images.map((i) => i.id)}
          />
        )}
      </Modal>
    </div>
  );
}
