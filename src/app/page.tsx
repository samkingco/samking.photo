import { images } from "../blog-data";
import { ImagePost } from "../components/ImagePost";

export default function Home() {
  return (
    <>
      {images.map((image) => (
        <ImagePost image={image} key={image.id} />
      ))}
    </>
  );
}
