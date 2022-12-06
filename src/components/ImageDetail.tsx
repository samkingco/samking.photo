import { format } from "date-fns";
import { useContextualRouting } from "next-use-contextual-routing";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { styled } from "../../stitches.config";
import { ImageData } from "../blog-data";
import { ExifGrid } from "./ExifGrid";
import { Mono, Subheading } from "./Typography";

const ImageDetailModal = styled("div", {
  display: "grid",
  gridTemplateAreas: '"image" "sidebar"',
  gridTemplateRows: "60vh max-content",
  gridGap: "2em",
  padding: "1em",
  "@landscape": {
    gridTemplateAreas: '"sidebar image"',
    gridTemplateColumns: "24em 1fr",
    gridTemplateRows: "1fr",
    height: "100vh",
  },
  "@md": {
    gridGap: "2em",
    "@portrait": {
      gridTemplateRows: "70vh max-content",
    },
  },
});

const ImageWrapper = styled("div", {
  gridArea: "image",
  width: "100%",
  height: "100%",
  position: "relative",
  img: {
    objectFit: "contain",
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
  },
});

const Sidebar = styled("aside", {
  gridArea: "sidebar",
  padding: "1em 1em 4em",
  display: "grid",
  gridTemplateColumns: "1fr",
  alignContent: "start",
  width: "100%",
  maxWidth: "40rem",
  margin: "0 auto",
  "@md": {
    gridTemplateColumns: "1fr 1fr",
    paddingBottom: "1em",
  },
  "@landscape": {
    gridTemplateColumns: "1fr",
  },
});

const Nav = styled("nav", {
  display: "flex",
  gap: "1em",
});

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

type Props = {
  image: ImageData;
  contextIds?: number[];
  onClose?: (id: number) => void;
  closeHref?: string;
};

export function ImageDetail({ image, contextIds, onClose, closeHref }: Props) {
  const router = useRouter();
  const { makeContextualHref } = useContextualRouting();
  const [hasPaginated, setHasPaginated] = useState(false);

  let closeContent = null;

  if (closeHref) {
    closeContent = (
      <Mono>
        <Link href={closeHref} aria-label="Close detail view">
          (ESC)
        </Link>
      </Mono>
    );
  }

  if (onClose) {
    closeContent = (
      <button onClick={() => onClose(image.id)} aria-label="Close detail view">
        (ESC)
      </button>
    );
  }

  const idInContext = contextIds
    ? contextIds.findIndex((i) => i === image.id)
    : -1;
  const prevId = contextIds
    ? contextIds[wrap(0, contextIds.length, idInContext - 1)]
    : null;
  const nextId = contextIds
    ? contextIds[wrap(0, contextIds.length, idInContext + 1)]
    : null;

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      if (prevId && ["ArrowLeft", "p"].includes(key)) {
        setHasPaginated(true);
        router.push(makeContextualHref({ id: prevId }), `/journal/${prevId}`, {
          scroll: false,
        });
      }
      if (nextId && ["ArrowRight", "n"].includes(key)) {
        setHasPaginated(true);
        router.push(makeContextualHref({ id: nextId }), `/journal/${nextId}`, {
          scroll: false,
        });
      }
      if (["Escape"].includes(key) && hasPaginated) {
        if (closeHref) {
          router.push(closeHref);
        }
        if (onClose) {
          onClose(image.id);
        }
      }
    };

    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [prevId, nextId, closeHref, makeContextualHref, router]);

  return (
    <ImageDetailModal key={image.id}>
      <ImageWrapper>
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt=""
          priority
        />
      </ImageWrapper>

      <Sidebar>
        <div>
          <Subheading as="h2">{image.title}</Subheading>
          <Mono subdued>{format(image.captured, "dd/MM/yyyy")}</Mono>
          <hr />

          {(closeContent || prevId || nextId) && (
            <>
              <Nav>
                {closeContent}

                {prevId && (
                  <Mono>
                    <Link
                      href={makeContextualHref({ id: prevId })}
                      as={`/journal/${prevId}`}
                      scroll={false}
                    >
                      (P)
                    </Link>
                  </Mono>
                )}

                {nextId && (
                  <Mono>
                    <Link
                      href={makeContextualHref({ id: nextId })}
                      as={`/journal/${nextId}`}
                      scroll={false}
                    >
                      (N)
                    </Link>
                  </Mono>
                )}
              </Nav>

              <hr />
            </>
          )}
        </div>

        <ExifGrid image={image} />
      </Sidebar>
    </ImageDetailModal>
  );
}
