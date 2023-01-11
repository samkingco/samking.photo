import Image from "next/image";
import Link from "next/link";
import { styled } from "../../stitches.config";
import { Layout } from "../components/Layout";
import SocialMeta from "../components/SocialMeta";
import { Body } from "../components/Typography";

const Blurb = styled("article", {
  maxWidth: "40rem",
  display: "flex",
  flexDirection: "column",
  gap: "$space$2",
  img: {
    maxWidth: "10rem",
    mb: "2rem",
  },
});

export default function Work() {
  return (
    <Layout>
      <SocialMeta
        title="About—Sam King Photo"
        description="Information about the photographer, Sam King."
      />

      <Blurb>
        <Image
          src="/avatar.jpg"
          width={180}
          height={180}
          alt="A black and white mirror self portrait of Sam King taken on a Hasselblad 500CM film camera."
        />
        <Body>
          I started out my journey with a camera in 2007, mostly shooting the
          action sports scene in the UK. When the magazines started going
          online, I moved into a career of design and coding, but kept shooting
          for myself. My photographic interests have since moved away from the
          action and towards the stillness of landscapes and environments.
        </Body>
        <Body>
          I recently took a break from my design career and I'm getting back to
          making photo work more full-time. I'm currently exploring my heritage,
          and also how the world can feel to an Autistic person like myself.
        </Body>
        <Body>You can find me on most social platforms @samkingco.</Body>
        <Body>
          I also have a free newsletter called Practice Process where I share
          the things I'm working on, and early releases of new work. You can{" "}
          <Link
            href="https://practiceprocess.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            subscribe on Substack
          </Link>
          .
        </Body>
      </Blurb>
    </Layout>
  );
}
