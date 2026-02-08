import { ApolloServer } from "@apollo/server";
import { NextResponse, type NextRequest } from "next/server";

// Apollo Server は Node.js ランタイムで動かす
export const runtime = "nodejs";

// GraphQL のスキーマ定義:
// Query 型に、呼び出せるフィールド(関数名のようなもの)を定義する
const typeDefs = `#graphql
  type Query {
    helloworld: String!
    helloWorld: String!
  }
`;

// resolver:
// 各フィールドが呼ばれた時に、実際に何を返すかを定義する
const resolvers = {
  Query: {
    helloworld: () => "Hello, world!",
    helloWorld: () => "Hello, world!",
  },
};

// Apollo Server のインスタンスを作成
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// サーバー起動をバックグラウンドで開始
// (起動前にリクエストが来ても Apollo 側で待機して処理される)
server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

// POST で受け取る GraphQL リクエストの最小形
type GraphQLRequestBody = {
  query?: string;
  operationName?: string;
  variables?: Record<string, unknown>;
};

// /api/graphql への POST リクエストを処理する
export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: GraphQLRequestBody;

  try {
    // JSON body を読み取る
    body = (await request.json()) as GraphQLRequestBody;
  } catch {
    // JSON が壊れている場合は 400 を返す
    return NextResponse.json(
      { errors: [{ message: "Invalid JSON body" }] },
      { status: 400 },
    );
  }

  // query が無い場合は実行できないので 400 を返す
  if (typeof body.query !== "string" || body.query.length === 0) {
    return NextResponse.json(
      { errors: [{ message: "query is required" }] },
      { status: 400 },
    );
  }

  // GraphQL を実行
  const response = await server.executeOperation({
    query: body.query,
    operationName: body.operationName,
    variables: body.variables,
  });

  // この最小実装では、通常の single レスポンスのみ対応
  if (response.body.kind !== "single") {
    return NextResponse.json(
      { errors: [{ message: "Incremental response is not supported" }] },
      { status: 501 },
    );
  }

  // Apollo が返した HTTP ヘッダーを NextResponse に引き継ぐ
  const headers = new Headers();
  response.http.headers.forEach((value, key) => {
    headers.set(key, value);
  });

  // 実行結果を JSON で返す
  return NextResponse.json(response.body.singleResult, {
    status: response.http.status ?? 200,
    headers,
  });
}
