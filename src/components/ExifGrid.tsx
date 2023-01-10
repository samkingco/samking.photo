import Link from "next/link";
import React from "react";
import { styled } from "../../stitches.config";
import { ImageData } from "../data/journal";
import { Body, Mono } from "./Typography";

const Grid = styled("dl", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridGap: "$space$4",
  maxWidth: "16em",
  "& dt, & dd": {
    margin: 0,
  },
});

const GridItem = styled("div", {
  gridColumn: "1 / -1",
});

const GridItemHalf = styled(GridItem, {
  "@xxs": {
    gridColumn: "initial",
  },
});

export function ExifGrid({ image }: { image: ImageData }) {
  return (
    <Grid>
      <GridItem>
        <dt>
          <Mono subdued>Camera</Mono>
        </dt>
        <dd>
          <Body>
            <Link href={`/journal/tags/${image.camera.slug}`}>
              {image.camera.title}
            </Link>
          </Body>
        </dd>
      </GridItem>

      <GridItem>
        <dt>
          <Mono subdued>Lens</Mono>
        </dt>
        <dd>
          <Body>
            <Link href={`/journal/tags/${image.lens.slug}`}>
              {image.lens.title}
            </Link>
          </Body>
        </dd>
      </GridItem>

      <GridItemHalf>
        <dt>
          <Mono subdued>Shutter</Mono>
        </dt>
        <dd>
          <Body>{image.exposure}</Body>
        </dd>
      </GridItemHalf>

      <GridItemHalf>
        <dt>
          <Mono subdued>Aperture</Mono>
        </dt>
        <dd>
          <Body>{image.aperture}</Body>
        </dd>
      </GridItemHalf>

      <GridItemHalf>
        <dt>
          <Mono subdued>ISO</Mono>
        </dt>
        <dd>
          <Body>{image.iso}</Body>
        </dd>
      </GridItemHalf>

      <GridItemHalf>
        <dt>
          <Mono subdued>Focal length</Mono>
        </dt>
        <dd>
          <Body>{image.focal}</Body>
        </dd>
      </GridItemHalf>

      <GridItem>
        <dt>
          <Mono subdued>Tags</Mono>
        </dt>
        <dd>
          <Body>
            {image.keywords.map((keyword, index) => {
              const isFirst = index === 0 && image.keywords.length > 0;
              const isLast =
                index === image.keywords.length - 1 &&
                image.keywords.length > 0;

              return (
                <React.Fragment key={keyword.slug}>
                  <Link
                    href={`/journal/tags/${keyword.slug}`}
                    key={`${image.id}_${keyword.slug}`}
                  >
                    {keyword.title}
                  </Link>
                  {!isLast && " • "}
                </React.Fragment>
              );
            })}
          </Body>
        </dd>
      </GridItem>
    </Grid>
  );
}
