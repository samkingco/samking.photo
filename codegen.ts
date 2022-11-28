import type { CodegenConfig } from "@graphql-codegen/cli";
import env from "dotenv";

env.config();

const config: CodegenConfig = {
  schema: process.env.CMS_ENDPOINT,
  // "https://api-eu-west-2.hygraph.com/v2/clazqd8tc1y5v01uhbu6s1t7f/master",
  documents: "src/**/!(*.d).{ts,tsx}",
  generates: {
    "./src/graphql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
