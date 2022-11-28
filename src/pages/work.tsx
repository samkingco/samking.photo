import styled from "@emotion/styled";
import { Layout } from "../components/Layout";
import SocialMeta from "../components/SocialMeta";
import { Body, Mono } from "../components/Typography";

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  max-width: 32rem;
`;

export default function Work() {
  return (
    <Layout>
      <SocialMeta title="Work—Sam King Photo" />

      <Mono subdued>In progress, more coming soon</Mono>

      <hr />

      <Block>
        <Mono>ICE64</Mono>
        <Body>
          16 photographs documenting the desolate landscape of Iceland during
          the winter. Available to collect as NFTs.
        </Body>
        <Mono>
          <a href="https://ice64.samking.studio">ice64.samking.studio</a>
        </Mono>
      </Block>

      <hr />

      <Block>
        <Mono>Roots</Mono>
        <Body>
          A collection of 40 photographs exploring my roots in the Scottish
          Highlands. Available to collect as NFTs.
        </Body>
        <Mono>
          <a href="https://roots.samking.studio">roots.samking.studio</a>
        </Mono>
      </Block>

      <hr />

      <Block>
        <Mono>Prints</Mono>
        <Body>
          High quality archival Giclée prints for holders of Roots NFTs.
        </Body>
        <Mono>
          <a href="https://prints.samking.studio">prints.samking.studio</a>
        </Mono>
      </Block>
    </Layout>
  );
}
