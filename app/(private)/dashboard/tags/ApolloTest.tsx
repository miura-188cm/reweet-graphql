"use client";

import { useQuery } from "@apollo/client/react";
import { ArrowUpRight, Tag as TagIcon } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AllOwnedTagsDocument } from "@/graphql/__generated__/graphql";
import { routes } from "@/util/routes";

type Props = {
  userId: string;
};

const badges = [
  "bg-orange-500/10 text-orange-600",
  "bg-blue-500/10 text-blue-600",
  "bg-emerald-500/10 text-emerald-600",
];

export const ApolloTest = ({ userId }: Props) => {
  const { data } = useQuery(AllOwnedTagsDocument, {
    variables: { userId },
    // まずキャッシュを見て、なければネットワークに取りに行く
    fetchPolicy: "cache-first",
    // 2回目以降の再実行はキャッシュだけで返す（再リクエストを抑える）
    nextFetchPolicy: "cache-only",
  });

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>タグ一覧</CardTitle>
        <CardDescription>
          作成済みタグと紐づくコンタクトの人数を確認できます。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {data?.allOwnedTags.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/30 px-6 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              まだタグがありません。Meetupで出会ったつながりを整理するタグを追加しましょう。
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {data?.allOwnedTags.map((tag, index) => {
              const accent = badges[index % badges.length];

              return (
                <Link
                  key={tag.id}
                  className="flex flex-col gap-3 rounded-xl border border-dashed border-muted-foreground/30 px-4 py-3 transition hover:border-orange-200 hover:bg-muted/40"
                  href={routes.dashboardTagDetail(tag.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      #{index + 1}
                    </span>
                    <div
                      className={`flex size-10 items-center justify-center rounded-full ${accent}`}
                    >
                      <TagIcon className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tag.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 text-xs font-semibold text-blue-600">
                      <span>詳細</span>
                      <ArrowUpRight className="size-4" />
                    </div>
                  </div>
                  <p>{tag.count}</p>
                </Link>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
