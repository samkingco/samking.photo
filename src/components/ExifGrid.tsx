import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { ImageData } from "../blog-data";
import { Body, Mono } from "./Typography";

const Grid = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
  max-width: 16em;
`;

const Item = styled.div<{ full?: boolean }>`
  grid-column: 1 / -1;
  ${(p) =>
    !p.full &&
    css`
      @media (min-width: 20rem) {
        grid-column: initial;
      }
    `}
`;

const Key = styled.dt``;
const Value = styled.dd`
  margin: 0;
`;

interface Props {
  image: ImageData;
}

export function ExifGrid({ image }: Props) {
  return (
    <Grid>
      <Item full>
        <Key>
          <Mono subdued>Camera</Mono>
        </Key>
        <Value>
          <Body>
            <Link href={`/posts/tags/${image.camera.slug}`}>
              {image.camera.title}
            </Link>
          </Body>
        </Value>
      </Item>

      <Item full>
        <Key>
          <Mono subdued>Lens</Mono>
        </Key>
        <Value>
          <Body>
            <Link href={`/posts/tags/${image.lens.slug}`}>
              {image.lens.title}
            </Link>
          </Body>
        </Value>
      </Item>

      <Item>
        <Key>
          <Mono subdued>Shutter</Mono>
        </Key>
        <Value>
          <Body>{image.exposure}</Body>
        </Value>
      </Item>

      <Item>
        <Key>
          <Mono subdued>Aperture</Mono>
        </Key>
        <Value>
          <Body>{image.aperture}</Body>
        </Value>
      </Item>

      <Item>
        <Key>
          <Mono subdued>ISO</Mono>
        </Key>
        <Value>
          <Body>{image.iso}</Body>
        </Value>
      </Item>

      <Item>
        <Key>
          <Mono subdued>Focal length</Mono>
        </Key>
        <Value>
          <Body>{image.focal}</Body>
        </Value>
      </Item>
    </Grid>
  );
}
