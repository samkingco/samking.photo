import Image from "next/image";
import Link from "next/link";
import { styled } from "../../stitches.config";
import { Project, projectTokenLink, type Token } from "../data/nfts";
import { displayEthAmount } from "../utils/displayEthAmount";
import { Mono } from "./Typography";

const Grid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridAutoRows: "max-content",
  gridGap: "2rem",
  justifyItems: "flex-start",
  "& + &": {
    mt: "2rem",
  },
  "@sm": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  "@lg": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
  "@xl": {
    gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 1fr))",
  },
});

const Token = styled("div", {
  width: "100%",
  maxWidth: "90vh",
  height: "fit-content",
  display: "grid",
  gridTemplateAreas: '"image image" "id price"',
  gridTemplateColumns: "1fr max-content",
  gridGap: "0.25rem",
});

const TokenImageArea = styled("div", {
  gridArea: "image",
  a: {
    display: "block",
  },
});

const TokenIdArea = styled("div", {
  gridArea: "id",
});

const TokenPriceArea = styled("div", {
  gridArea: "price",
  textAlign: "right",
});

type Props = {
  project: Project;
  tokens: Token[];
};

export function TokenGrid({ tokens }: Props) {
  return (
    <Grid>
      {tokens.map((token) => (
        <Token key={`${token.project}_${token.id}`}>
          <TokenImageArea>
            {token.released ? (
              <Link
                href={projectTokenLink(token.project, token.id)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={token.image}
                  alt=""
                  width={2800}
                  height={2800 * token.imageAspectRatio}
                  sizes={token.image.endsWith(".svg") ? undefined : "384px"}
                />
              </Link>
            ) : (
              <Image
                src={token.image}
                alt=""
                width={2800}
                height={2800 * token.imageAspectRatio}
                sizes={token.image.endsWith(".svg") ? undefined : "384px"}
              />
            )}
          </TokenImageArea>
          <TokenIdArea>
            <Mono subdued={!token.released}>
              {token.released ? (
                <Link
                  href={projectTokenLink(token.project, token.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  #{token.id}
                </Link>
              ) : (
                <>#{token.id}</>
              )}
              {token.mintedCount && token.editionSize ? (
                <Mono as="span" subdued>
                  {" "}
                  {`(${token.mintedCount}/${token.editionSize})`}
                </Mono>
              ) : null}
            </Mono>
          </TokenIdArea>
          <TokenPriceArea>
            {token.soldOut ? (
              <Mono subdued uppercase>
                Sold
              </Mono>
            ) : !token.released ? (
              <Mono subdued uppercase>
                Unreleased
              </Mono>
            ) : (
              <Mono subdued uppercase>
                {token.price.eq(0)
                  ? "Free"
                  : `Ξ${displayEthAmount(token.price)}`}
              </Mono>
            )}
          </TokenPriceArea>
        </Token>
      ))}
    </Grid>
  );
}
