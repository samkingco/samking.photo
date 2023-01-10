import { stripIndent } from "common-tags";
import exifr from "exifr";
import fs from "fs";
import sizeOf from "image-size";
import path from "path";

const IMAGES_PATH = `post-images`;

const CAMERA_MAKE_MAP: Record<any, string> = {
  FUJIFILM: "Fujifilm",
};

const LENS_MAP: Record<any, string> = {
  "GF32-64mmF4 R LM WR": "GF 32-64mm f4",
};

interface SlugValue {
  slug: string;
  title: string;
}

interface Image {
  id: number;
  title: string;
  src: string;
  captured: number;
  width: number;
  height: number;
  exposure: string;
  aperture: string;
  iso: string;
  focal: string;
  camera: SlugValue;
  lens: SlugValue;
  keywords: SlugValue[];
}

async function readImageData(file: string): Promise<Image | undefined> {
  const absPath = `public/${IMAGES_PATH}/${file}`;
  const extension = path.extname(file);
  const filename = file.replace(extension, "");

  if (extension !== ".jpg") {
    return;
  }

  const exif = await exifr.parse(absPath, { iptc: true });
  const size = sizeOf(absPath);

  const camera = `${CAMERA_MAKE_MAP[exif.Make]} ${exif.Model}`;
  const lens = `${CAMERA_MAKE_MAP[exif.LensMake]} ${LENS_MAP[exif.LensModel]}`;

  return {
    id: parseInt(filename, 10),
    title: exif.ObjectName || "Untitled",
    src: `/${IMAGES_PATH}/${file}`,
    captured: new Date(exif.CreateDate).getTime(),
    width: size.width || 0,
    height: size.height || 0,
    exposure: `1/${Math.floor(1 / exif.ExposureTime)}s`,
    aperture: `ƒ/${exif.FNumber}`,
    iso: exif.ISO.toString(),
    focal: `${exif.FocalLength}mm`,
    camera: {
      slug: slugify(camera),
      title: camera,
    },
    lens: {
      slug: slugify(lens),
      title: lens,
    },
    keywords:
      exif.Keywords.map((title: string) => ({
        slug: slugify(title),
        title: title,
      })) || [],
  };
}

function makeKeywordsList(images: Image[]) {
  const keywords = new Map<string, SlugValue>();
  for (const image of images) {
    for (const keyword of image.keywords) {
      keywords.set(keyword.slug, keyword);
    }
  }
  return keywords;
}

function makeCamerasList(images: Image[]) {
  const cameras = new Map<string, SlugValue>();
  for (const image of images) {
    cameras.set(image.camera.slug, image.camera);
  }
  return cameras;
}

function makeLensesList(images: Image[]) {
  const lenses = new Map<string, SlugValue>();
  for (const image of images) {
    lenses.set(image.lens.slug, image.lens);
  }
  return lenses;
}

async function main() {
  const imageFiles = fs.readdirSync(`public/${IMAGES_PATH}`);
  const images: Image[] = [];

  for (const imageFile of imageFiles) {
    const image = await readImageData(imageFile);
    if (image) {
      images.push(image);
    }
  }

  const keywords = Array.from(makeKeywordsList(images).values());
  const cameras = Array.from(makeCamerasList(images).values());
  const lenses = Array.from(makeLensesList(images).values());

  const blogDataContents = stripIndent`
    export interface SlugValue {
      slug: string;
      title: string;
    }
    
    export interface ImageData {
      id: number;
      title?: string;
      src: string;
      captured: number;
      width: number;
      height: number;
      exposure: string;
      aperture: string;
      iso: string;
      focal: string;
      camera: SlugValue;
      lens: SlugValue;
      keywords: SlugValue[];
    }

    export const images: ImageData[] = ${JSON.stringify(
      images.sort((a, b) => a.id - b.id).reverse()
    )};

    export const keywords: SlugValue[] = ${JSON.stringify(
      keywords.sort((a, b) => a.slug.localeCompare(b.slug))
    )};
    
    export const cameras: SlugValue[] = ${JSON.stringify(
      cameras.sort((a, b) => a.slug.localeCompare(b.slug))
    )};
    
    export const lenses: SlugValue[] = ${JSON.stringify(
      lenses.sort((a, b) => a.slug.localeCompare(b.slug))
    )};
  `;

  fs.writeFileSync("src/journal.ts", blogDataContents);
  console.log("Blog data saved to `src/journal.ts`.");
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
