---
title: ページとブログ記事を表示する
description: site-runtime からテーマへ渡されるデータを使い、ページ、記事、一覧、フィールド、ブロック、メニュー、多言語リンクを表示する方法を説明します。
sidebar:
  order: 2
---

Z-CMS のテーマは、ページやブログ記事を取得するために Content API を直接呼び出しません。公開 URL へのリクエストごとに `site-runtime` がサイトを解決し、その結果を有効なテーマへ渡します。テーマは受け取ったデータだけを表示します。

リクエストは次の順序で処理されます。

1. 訪問者が公開 URL を開きます。
2. `site-runtime` が内部の Render API を 1 回呼び出します。
3. API がホスト名、ロケール、ルート、公開済みコンテンツ、メニュー、テーマ設定、有効なプラグインの capability を解決します。
4. `site-runtime` が適切なテーマテンプレートを選択します。
5. テンプレートが `content`、`archive`、`ctx` を表示します。

:::caution[テーマから Render API を呼び出さないでください]
内部リクエストは `GET /api/v1/render/resolve` で、internal token による認証が必要です。これは `site-runtime` が管理する処理であり、テーマコードから利用する API ではありません。テーマに API クライアントや `fetch` を追加したり、この token を埋め込んだりしないでください。
:::

## ステップ 1: テンプレートの型をインポートする

`@zcmsorg/theme-sdk` の型を使い、テンプレートの入力をランタイムの contract と一致させます。

```tsx
import {
  defineTheme,
  type ArchiveTemplateProps,
  type PageTemplateProps,
  type ThemeManifest,
} from "@zcmsorg/theme-sdk";
import manifestJson from "../theme.json";

const manifest = manifestJson as unknown as ThemeManifest;

interface Settings {
  accent: string;
}
```

`cms-api`、`site-runtime`、Prisma など、Z-CMS の内部モジュールから型をインポートしないでください。

## ステップ 2: ページを表示する

ランタイムは、URL に一致する公開済みページを `content` として渡します。

```tsx
function Page({ ctx, content }: PageTemplateProps<Settings>) {
  return (
    <article>
      <h1>{content.title}</h1>
      {content.excerpt ? <p>{content.excerpt}</p> : null}
      <div>{ctx.renderBlocks(content.blocks)}</div>
    </article>
  );
}
```

よく使う `content` のフィールドは次のとおりです。

| フィールド | 用途 |
| --- | --- |
| `title` | ページまたは記事のタイトル |
| `excerpt` | 省略可能な概要 |
| `path` | ロケール処理前のコンテンツパス |
| `contentType.key` | `page` や `post` などのコンテンツタイプ |
| `data` | コンテンツタイプで定義したカスタムフィールド |
| `blocks` | エディターで作成したブロックドキュメント |
| `publishedAt` | 公開日時または `null` |
| `author` | 投稿者情報または `null` |
| `seo` | コンテンツごとに解決された SEO 入力 |

公開用の render payload に含まれるのは公開済みコンテンツだけです。テーマ側で下書きを除外する必要はありません。

## ステップ 3: カスタムフィールドを安全に読む

`content.data` の値は JSON であり、型は `unknown` です。表示する前に値を検証してください。

```tsx
function text(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function Page({ ctx, content }: PageTemplateProps<Settings>) {
  const subtitle = text(content.data.subtitle);

  return (
    <article>
      <h1>{content.title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
      {ctx.renderBlocks(content.blocks)}
    </article>
  );
}
```

実行時に値を検証しないまま、`content.data` 全体を信頼済みの interface に変換しないでください。サイト管理者はテーマを更新せずにコンテンツタイプのフィールドを変更できます。

## ステップ 4: ブログ記事を表示する

`content.contentType.key` が `post` の場合、`site-runtime` は `templates.post` を選択します。テーマが `post` を提供していない場合は `templates.page` を使用します。

```tsx
function Post({ ctx, content }: PageTemplateProps<Settings>) {
  const date = content.publishedAt
    ? new Date(content.publishedAt).toLocaleDateString(ctx.locale)
    : "";

  return (
    <article>
      <a href={ctx.url("/blog")}>ブログ一覧へ戻る</a>
      <h1>{content.title}</h1>
      <p>{[date, content.author?.name].filter(Boolean).join(" · ")}</p>
      {content.excerpt ? <p>{content.excerpt}</p> : null}
      {ctx.renderBlocks(content.blocks)}
    </article>
  );
}
```

## ステップ 5: ブログ一覧を表示する

`/blog` などの一覧ルートには、`content` ではなく `archive` が渡されます。ランタイムが公開済み記事とページネーション情報を提供します。

```tsx
function Archive({ ctx, archive }: ArchiveTemplateProps<Settings>) {
  return (
    <section>
      <h1>{archive.title}</h1>

      {archive.items.length === 0 ? (
        <p>記事はまだありません。</p>
      ) : (
        <ul>
          {archive.items.map((item) => (
            <li key={item.id}>
              <a href={ctx.url(item.path)}>{item.title}</a>
              {item.excerpt ? <p>{item.excerpt}</p> : null}
            </li>
          ))}
        </ul>
      )}

      {archive.page > 1 ? (
        <a href={ctx.url(`${archive.basePath}?page=${archive.page - 1}`)}>前のページ</a>
      ) : null}
      {archive.page < archive.totalPages ? (
        <a href={ctx.url(`${archive.basePath}?page=${archive.page + 1}`)}>次のページ</a>
      ) : null}
    </section>
  );
}
```

サイト内のコンテンツパスと一覧パスは、必ず `ctx.url()` に渡してください。正しいロケール接頭辞が追加され、クエリ文字列も保持されます。`ctx.alternates` の path はすでに完成しているため、`ctx.url()` に渡してはいけません。

## ステップ 6: テンプレートを登録する

`page` テンプレートは必須です。その他のコンテンツテンプレートは `page` にフォールバックできますが、一覧ルートには `archive` が必要です。

```tsx
export default defineTheme<Settings>({
  manifest,
  Layout,
  templates: {
    home: Home,
    page: Page,
    post: Post,
    archive: Archive,
    notFound: NotFound,
    error: ErrorPage,
  },
  blocks,
});
```

| リクエスト | ランタイムが選ぶテンプレート |
| --- | --- |
| ホームページのコンテンツがある `/` | `home`、なければ `page` |
| key が `post` のコンテンツ | `post`、なければ `page` |
| その他のコンテンツ | `page` |
| `/blog` などのコンテンツタイプ一覧 | `archive` |
| 一致しないパス | `notFound` |

## ステップ 7: ブロックを表示する

各テンプレートでブロックを個別に走査せず、`ctx.renderBlocks(content.blocks)` を呼び出します。テーマが対応する各ブロックタイプの component を登録してください。

```tsx
import type { BlockProps } from "@zcmsorg/theme-sdk";

function value(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function Hero({ props }: BlockProps<Record<string, unknown>, Settings>) {
  return (
    <section>
      <h2>{value(props.heading)}</h2>
      {props.subheading ? <p>{value(props.subheading)}</p> : null}
    </section>
  );
}

const blocks = {
  "core/hero": Hero,
  "core/richtext": RichText,
  "core/features": Features,
  "core/image": ImageBlock,
  "core/cta": CallToAction,
};
```

ブロックタイプ名には namespace が必要です。未対応のブロックは開発環境では警告として表示され、本番環境ではスキップされます。対象サイトが使用するすべてのブロックタイプをテストしてください。

## ステップ 8: メニュー、アセット、多言語リンクを表示する

- `ctx.menus.primary`、`ctx.menus.footer`、または `theme.json` で宣言した別の key からメニューを読み取ります。
- サイト内リンクには `ctx.url(path)` を使用します。
- テーマに同梱するファイルには `ctx.asset("assets/logo.png")` を使用します。
- サイト共通のロゴとメインカラーには `ctx.site.brand` を使用します。
- テーマが宣言した設定には `ctx.settings` を使用します。
- 言語切り替えには `ctx.alternates` を使用します。

## ステップ 9: コンテンツフロー全体を確認する

パッケージ化する前に、次をテストしてください。

1. 概要があるページとないページ。
2. 対応するすべての core block を含むページ。
3. 投稿者や公開日時がある記事とない記事。
4. 空のブログ一覧と複数ページにまたがる一覧。
5. カスタムフィールドがない場合や、想定外の型である場合。
6. デフォルトロケールとそれ以外のロケール。特に一覧のページネーションリンク。
7. 未対応のブロックが含まれていてもページを表示できること。

次に、[テーマとプラグインを連携する方法](/ja/developers/theme-handbook/plugin-integration/)を確認してください。
