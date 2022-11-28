import Link from "next/link";
import { ImageData } from "../blog-data";
import { Body, Mono } from "./Typography";

interface Props {
  image: ImageData;
}

export function ExifGrid({ image }: Props) {
  return (
    <dl className="exif-grid">
      <div className="exif-grid-item exif-grid-item-full">
        <dt>
          <Mono subdued>Camera</Mono>
        </dt>
        <dd>
          <Body>
            <Link href={`/posts/tags/${image.camera.slug}`}>
              {image.camera.title}
            </Link>
          </Body>
        </dd>
      </div>

      <div className="exif-grid-item exif-grid-item-full">
        <dt>
          <Mono subdued>Lens</Mono>
        </dt>
        <dd>
          <Body>
            <Link href={`/posts/tags/${image.lens.slug}`}>
              {image.lens.title}
            </Link>
          </Body>
        </dd>
      </div>

      <div className="exif-grid-item">
        <dt>
          <Mono subdued>Shutter</Mono>
        </dt>
        <dd>
          <Body>{image.exposure}</Body>
        </dd>
      </div>

      <div className="exif-grid-item">
        <dt>
          <Mono subdued>Aperture</Mono>
        </dt>
        <dd>
          <Body>{image.aperture}</Body>
        </dd>
      </div>

      <div className="exif-grid-item">
        <dt>
          <Mono subdued>ISO</Mono>
        </dt>
        <dd>
          <Body>{image.iso}</Body>
        </dd>
      </div>

      <div className="exif-grid-item">
        <dt>
          <Mono subdued>Focal length</Mono>
        </dt>
        <dd>
          <Body>{image.focal}</Body>
        </dd>
      </div>
    </dl>
  );
}