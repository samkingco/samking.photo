import Link from "next/link";
import { styled } from "../../stitches.config";
import { ExternalLinkIcon } from "../components/ExternalLinkIcon";
import { Layout } from "../components/Layout";
import SocialMeta from "../components/SocialMeta";
import { TokenGrid } from "../components/TokenGrid";
import { Body, Subheading } from "../components/Typography";
import {
  dropsTokens,
  ice64EditionTokens,
  ice64OriginalTokens,
  projectLink,
  rootsEditionsTokens,
  rootsTokens,
} from "../data/nfts";
import { useLiveTokenData } from "../hooks/useLiveTokenData";

const ProjectAside = styled("aside", {
  width: "100%",
  maxWidth: "28rem",
  "@xl": {
    width: "24vw",
  },
});

const Project = styled("section", {
  display: "grid",
  gridGap: "2rem",
  "&:not(:first-of-type)": {
    mt: "4rem",
  },
  "@xl": {
    gridTemplateColumns: "max-content 2fr",
  },
});

const Description = styled(Body, {
  marginBottom: "1rem",
});

export default function WorkPage() {
  const { data } = useLiveTokenData();
  console.log(data);

  return (
    <Layout>
      <SocialMeta title="Work—Sam King Photo" />

      <Project>
        <ProjectAside>
          <Subheading>
            <Link
              href={projectLink("ROOTS_EDITIONS")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Roots Editions <ExternalLinkIcon />
            </Link>
          </Subheading>
          <Description subdued>
            A collection of 12 limited edition photographs as a compliment to
            the original Roots project.
          </Description>
        </ProjectAside>
        <TokenGrid
          project="ROOTS_EDITIONS"
          tokens={data ? data.rootsEditions : rootsEditionsTokens}
        />
      </Project>

      <hr />

      <Project>
        <ProjectAside>
          <Subheading>
            <Link
              href={projectLink("ROOTS")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Roots <ExternalLinkIcon />
            </Link>
          </Subheading>
          <Description subdued>
            A collection of 40 photographs exploring my roots in the Scottish
            Highlands.
          </Description>
        </ProjectAside>
        <TokenGrid project="ROOTS" tokens={rootsTokens} />
      </Project>

      <hr />

      <Project>
        <ProjectAside>
          <Subheading>
            <Link
              href={projectLink("ICE64")}
              target="_blank"
              rel="noopener noreferrer"
            >
              ICE64 <ExternalLinkIcon />
            </Link>
          </Subheading>
          <Description subdued>
            A series of 16 photographs documenting the desolate landscape of
            Iceland during the winter. Each original also comes with an on-chain
            edition of the same photo.
          </Description>
        </ProjectAside>
        <div>
          <TokenGrid
            project="ICE64"
            tokens={data ? data.ice64Originals : ice64OriginalTokens}
          />
          <TokenGrid
            project="ICE64"
            tokens={data ? data.ice64Editions : ice64EditionTokens}
          />
        </div>
      </Project>

      <hr />

      <Project>
        <ProjectAside>
          <Subheading>
            <Link
              href={projectLink("DROPS")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Drops <ExternalLinkIcon />
            </Link>
          </Subheading>
          <Description subdued>
            Free photography drops available to friends and collectors of my
            work.
          </Description>
        </ProjectAside>
        <TokenGrid project="DROPS" tokens={dropsTokens} />
      </Project>
    </Layout>
  );
}
