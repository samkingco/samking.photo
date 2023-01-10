import { format } from "date-fns";
import { useContextualRouting } from "next-use-contextual-routing";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { styled } from "../../stitches.config";
import { ImageData } from "../data/journal";
import { ImageDetail } from "./ImageDetail";
import { Modal } from "./Modal";
import { Body, Mono } from "./Typography";

function getSizeFromId(id: number) {
  if (id % 5 === 0) return "medium";
  if (id % 8 === 0) return "large";
  return "small";
}

const ImagePost = styled("div", {
  width: "100%",
  maxWidth: "90vh",
  height: "fit-content",
  a: {
    display: "block",
  },
  variants: {
    size: {
      small: {
        alignSelf: "flex-start",
        margin: "0 auto",
        padding: "0 16vw 0 8vw",
        "&:nth-of-type(even)": {
          padding: "0 8vw 0 16vw",
        },
        "@xs": {
          padding: "0 32vw 0 12vw",
          "&:nth-of-type(even)": {
            padding: "0 12vw 0 32vw",
          },
        },
        "@sm": {
          "&, &:nth-of-type(even)": {
            padding: "0 6vw",
          },
          "&:nth-of-type(3n + 1)": {
            alignSelf: "center",
            padding: "0 8vw 0 4vw",
          },
          "&:nth-of-type(3n + 2)": {
            alignSelf: "flex-end",
            padding: "0 4vw 0 8vw",
          },
        },
        "@lg": {
          "&:nth-of-type(3n + 1)": {
            padding: "0 12vw 0 4vw",
          },
          "&:nth-of-type(3n + 2)": {
            padding: "0 4vw 0 12vw",
          },
        },
      },
      medium: {
        margin: "0 auto",
        padding: "0 0 0 8vw",
        justifySelf: "end",
        "&:nth-of-type(even)": {
          padding: "0 8vw 0 0",
        },
        "@sm": {
          "&, &:nth-of-type(even)": {
            margin: "2vw auto",
            padding: 0,
          },
        },
      },
      large: {
        "@sm": {
          width: "100%",
          maxWidth: "70vh",
          gridColumn: "auto/span 2",
          margin: "0 auto",
          padding: "0 2vw",
        },
      },
    },
  },
});

const Wrapper = styled("div", {
  variants: {
    layout: {
      grid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridAutoRows: "max-content",
        gridGap: "2rem",
        justifyItems: "flex-start",
        "@sm": {
          gridTemplateColumns: "repeat(3, 1fr)",
        },
        "@lg": {
          gridTemplateColumns: "repeat(4, 1fr)",
        },
        "@xl": {
          gridTemplateColumns: "repeat(5, 1fr)",
        },
        [`& ${ImagePost}`]: {
          padding: "0!important",
          margin: "0!important",
          alignSelf: "start!important",
          justifySelf: "start!important",
          gridColumn: "initial",
        },
      },
      scroll: {
        display: "grid",
        gridGap: "8vw 4vw",
        alignItems: "center",
        "@sm": {
          gridTemplateColumns: "1fr 1fr",
        },
      },
    },
  },
});

type Props = {
  images: ImageData[];
  layout: "grid" | "scroll";
};

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
    <Wrapper layout={layout}>
      {images.map((image) => (
        <ImagePost size={getSizeFromId(image.id)} key={image.id}>
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
          <Body css={{ mt: "0.5rem" }}>{image.title}</Body>
          <Mono subdued>{format(image.captured, "dd/MM/yyyy")}</Mono>
        </ImagePost>
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
    </Wrapper>
  );
}
