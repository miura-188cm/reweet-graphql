"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";

const HELLOWORLD = gql`
  query helloworld {
    helloWorld
  }
`;

export const ApolloTest = () => {
  const [title, setTitle] = useState("ApolloClientTest");
  const { data, loading, error } = useQuery(HELLOWORLD, {
    // まずキャッシュを見て、なければネットワークに取りに行く
    fetchPolicy: "cache-first",
    // 2回目以降の再実行はキャッシュだけで返す（再リクエストを抑える）
    nextFetchPolicy: "cache-only",
  });

  return (
    <div>
      <h1 onClick={() => setTitle("ApolloTest")}>{title}</h1>
      {data != null && <pre>{JSON.stringify(data, null, 2)}</pre>}

      {loading ? "loading" : "not loading"}
      {error?.message}
      {error?.name}
    </div>
  );
};
