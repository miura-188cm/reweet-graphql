import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./graphql/schema/*.{gql,graphql}",
  documents: ["./graphql/schema/*.{gql,graphql}"],
  ignoreNoDocuments: true,
  generates: {
    "graphql/__generated__/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
