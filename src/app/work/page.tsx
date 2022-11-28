import { Body, Mono } from "../../components/Typography";

export default function Work() {
  return (
    <>
      <Mono subdued>In progress, more coming soon</Mono>

      <hr />

      <div className="work-block">
        <Mono>ICE64</Mono>
        <Body>
          16 photographs documenting the desolate landscape of Iceland during
          the winter. Available to collect as NFTs.
        </Body>
        <Mono>
          <a href="https://ice64.samking.studio">ice64.samking.studio</a>
        </Mono>
      </div>

      <hr />

      <div className="work-block">
        <Mono>Roots</Mono>
        <Body>
          A collection of 40 photographs exploring my roots in the Scottish
          Highlands. Available to collect as NFTs.
        </Body>
        <Mono>
          <a href="https://roots.samking.studio">roots.samking.studio</a>
        </Mono>
      </div>

      <hr />

      <div className="work-block">
        <Mono>Prints</Mono>
        <Body>
          High quality archival Giclée prints for holders of Roots NFTs.
        </Body>
        <Mono>
          <a href="https://prints.samking.studio">prints.samking.studio</a>
        </Mono>
      </div>
    </>
  );
}
