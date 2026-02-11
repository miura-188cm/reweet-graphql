"use client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8080/graphql" }),
  cache: new InMemoryCache(),
});

export const ApolloClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
