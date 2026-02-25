# 今後の GraphQL 学習計画

## 現状

- Schema 定義済み（Tag, Contact, Meetup）
- codegen で TypeScript 型・hooks を生成
- Apollo Server を Next.js API Route (`/api/graphql`) で動かしている
- Query 2つ（`allOwnedTags`, `allContacts`）を実装済み
- クライアント側で `useQuery` を実装済み（`ContactsList.tsx`）

---

## ステップ一覧

### Step 1: Mutation を実装する（推奨度: ★★★）

**なぜやるか**
GraphQL の核心の一つ。今は Read (Query) しかないので、Create・Update・Delete の Mutation を追加する。
既存の `action.ts` にある Create/Update/Delete ロジックを Mutation に置き換えることで、元プロジェクトとの比較で GraphQL の特性がよく見える。

**学べること**
- `type Mutation` の schema 定義
- `useMutation` フックの使い方（codegen で生成）
- Mutation 後のキャッシュ更新（`refetchQueries` / `cache.modify`）
- Input type の設計

**参考実装候補**
- `meetup` の作成・更新・削除（`createMeetupService.ts` と対応）
- `tag` の更新・削除（`updateTagService.ts`, `deleteTagService.ts` と対応）

---

### Step 2: 認証・Context を整える（推奨度: ★★★）

**なぜやるか**
現状は `userId` を Query の引数として渡しているが、本来は認証済みユーザー情報を Context に入れるのが GraphQL のイディオム。
セキュリティ上も重要（引数で userId を受け取る実装は任意の userId を指定できてしまう）。

**学べること**
- `ApolloServer` の `context` 関数の使い方
- Resolver から `context.userId` を参照するパターン
- 未認証時のエラーハンドリング（`GraphQLError` の使い方）

**実装イメージ**
```ts
// route.ts
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const session = await getSession(req);
    return { userId: session?.user?.id };
  },
});
```

---

### Step 3: Fragment と Fragment Colocation（推奨度: ★★）

**なぜやるか**
クライアント側の設計パターン。コンポーネントが「自分が必要なフィールドだけを Fragment で宣言する」手法。
UI と Query の対応が明確になり、過剰フェッチを防ぎやすくなる。

**学べること**
- `fragment` の書き方と `...FragmentName` でのスプレッド
- codegen が Fragment ごとに型を生成する仕組み
- コンポーネントと Query の分離

**実装イメージ**
```graphql
fragment ContactCard on ContactDto {
  id
  name
  company
  role
}

query AllContacts($userId: ID!) {
  allContacts(userId: $userId) {
    ...ContactCard
    links { ... }
    meetup { ... }
  }
}
```

---

### Step 4: N+1 問題と DataLoader（推奨度: ★★）

**なぜやるか**
Resolver を型ごとに分割すると（`Meetup.contacts` のような Object type resolver）、N+1 クエリが自然発生する。
GraphQL 固有の重要な問題で、`DataLoader` によるバッチ処理が定番の解決策。

**学べること**
- Object type resolver（`Meetup`, `ContactDto` などのフィールド resolver）
- N+1 がなぜ起きるかの理解
- `DataLoader` でのバッチ・キャッシュ処理

---

### Step 5: Subscription でリアルタイム通信（推奨度: ★）

**なぜやるか**
WebSocket を使ってリアルタイム更新を実現。元のサーバーアクション型では難しかった機能で、GraphQL ならではの体験。

**学べること**
- `type Subscription` の schema 定義
- WebSocket サーバーのセットアップ
- クライアント側の `useSubscription`

**注意**: Next.js の API Route は WebSocket に対応していないため、別途 WebSocket サーバー（例: standalone Express）が必要になる。

---

## 推奨実施順

```
Step 1（Mutation）
  → Step 2（Context/Auth）
    → Step 3（Fragment）
      → Step 4（N+1/DataLoader）
        → Step 5（Subscription）
```

**Step 1 が最もコスパ高い。**
`useMutation` + キャッシュ更新まで触ると Apollo Client の全体像が見えてくる。
また、元プロジェクトの `action.ts` との比較が学びになる。
