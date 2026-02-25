import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./graphql/schema/*.{gql,graphql}",
  documents: ["./graphql/schema/*.{gql,graphql}"],
  ignoreNoDocuments: true,
  generates: {
    // client preset（フロント用）
    "./graphql/__generated__/": {
      preset: "client",
      plugins: [],
    },

    // resolver型（サーバー用）
    "./graphql/__generated__/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        enumValues: {
          LinkType: "@prisma/client#LinkType",
        },
      },
    },
  },
};

export default config;
