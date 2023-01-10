import { useQuery } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import {
  ice64EditionTokens,
  ice64OriginalTokens,
  rootsEditionsTokens,
  rootsTokens,
} from "../data/nfts";
import { graphql } from "../graphql";

const subgraph = new GraphQLClient(
  "https://api.thegraph.com/subgraphs/name/samkingco/sks"
);

export const liveTokenDataDocument = graphql(/* GraphQL */ `
  query LiveTokenData {
    rootsNFTs {
      id
    }
    rootsEditionReleases {
      id
      mintedCount
    }
    ice64OriginalNFTs {
      id
    }
    ice64EditionNFTs {
      id
      mintedCount
    }
    dropsNFTs {
      id
      mintedCount
    }
  }
`);

type EditionLiveData = Record<
  string,
  {
    soldOut: boolean;
    mintedCount: number;
  }
>;

export function useLiveTokenData() {
  return useQuery(["liveTokens"], async () => {
    const res = await subgraph.request(liveTokenDataDocument);

    const rootsEditionReleasesLiveData: EditionLiveData =
      res.rootsEditionReleases.reduce((map, token) => {
        const mintedCount = parseInt(token.mintedCount, 10);
        return {
          ...map,
          [token.id]: { soldOut: mintedCount === 20, mintedCount },
        };
      }, {});

    const rootsEditions = rootsEditionsTokens.map((token) => {
      const liveData = rootsEditionReleasesLiveData[`${token.id}`];
      return {
        ...token,
        soldOut: liveData ? liveData.soldOut : token.soldOut,
        mintedCount: liveData && liveData.mintedCount,
      };
    });

    const ice64OriginalsLiveData: EditionLiveData =
      res.ice64OriginalNFTs.reduce((map, token) => {
        return {
          ...map,
          [token.id]: { soldOut: true },
        };
      }, {});

    const ice64Originals = ice64OriginalTokens.map((token) => {
      const liveData = ice64OriginalsLiveData[`${token.id}`];
      return {
        ...token,
        soldOut: liveData ? liveData.soldOut : token.soldOut,
      };
    });

    const ice64EditionsLiveData: EditionLiveData = res.ice64EditionNFTs.reduce(
      (map, token) => {
        const mintedCount = parseInt(token.mintedCount, 10);
        return {
          ...map,
          [token.id]: { soldOut: token.mintedCount === 64, mintedCount },
        };
      },
      {}
    );

    const ice64Editions = ice64EditionTokens.map((token) => {
      const liveData = ice64EditionsLiveData[`${token.id}`];
      return {
        ...token,
        soldOut: liveData ? liveData.soldOut : token.soldOut,
        mintedCount: liveData && liveData.mintedCount,
      };
    });

    return {
      roots: rootsTokens, // This project is already sold out, just return static data
      rootsEditions,
      ice64Originals,
      ice64Editions,
    };
  });
}
