import { format } from "date-fns";
import { useContextualRouting } from "next-use-contextual-routing";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ImageData } from "../blog-data";
import { ExifGrid } from "./ExifGrid";
import { Mono, Subheading } from "./Typography";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface Props {
  image: ImageData;
  contextIds?: number[];
  onClose?: (id: number) => void;
  closeHref?: string;
}

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
    <div className="image-detail-modal" key={image.id}>
      <div className="image-detail-image">
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt=""
        />
      </div>

      <div className="image-detail-sidebar">
        <div>
          <Subheading as="h2">{image.title}</Subheading>
          <Mono subdued>{format(image.captured, "dd/MM/yyyy")}</Mono>
          <hr />

          {(closeContent || prevId || nextId) && (
            <>
              <nav className="image-detail-nav">
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
              </nav>

              <hr />
            </>
          )}
        </div>

        <ExifGrid image={image} />
      </div>
    </div>
  );
}
