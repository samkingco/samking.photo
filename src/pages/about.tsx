import { styled } from "../../stitches.config";
import { Layout } from "../components/Layout";
import SocialMeta from "../components/SocialMeta";
import { Body, Mono } from "../components/Typography";

const Blurb = styled("article", {
  maxWidth: "40rem",
});

const WorkBlock = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$space$2",
  maxWidth: "32rem",
});

export default function Work() {
  return (
    <Layout>
      <SocialMeta title="About—Sam King Photo" />

      <Blurb>
        <Mono>Work in progress, more coming soon</Mono>

        <hr />

        <WorkBlock>
          <Mono>ICE64</Mono>
          <Body>
            16 photographs documenting the desolate landscape of Iceland during
            the winter. Available to collect as NFTs.
          </Body>
          <Mono>
            <a href="https://ice64.samking.studio">ice64.samking.studio</a>
          </Mono>
        </WorkBlock>

        <hr />

        <WorkBlock>
          <Mono>Roots</Mono>
          <Body>
            A collection of 40 photographs exploring my roots in the Scottish
            Highlands. Available to collect as NFTs.
          </Body>
          <Mono>
            <a href="https://roots.samking.studio">roots.samking.studio</a>
          </Mono>
        </WorkBlock>

        <hr />

        <WorkBlock>
          <Mono>Prints</Mono>
          <Body>
            High quality archival Giclée prints for holders of Roots NFTs.
          </Body>
          <Mono>
            <a href="https://prints.samking.studio">prints.samking.studio</a>
          </Mono>
        </WorkBlock>
      </Blurb>
    </Layout>
  );
}
