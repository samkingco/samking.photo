import { GraphQLClient } from "graphql-request";

export const graphQlClient = new GraphQLClient(process.env.CMS_ENDPOINT || "", {
  headers: {
    Authorization: `Bearer ${process.env.CMS_AUTH || ""}`,
  },
});
