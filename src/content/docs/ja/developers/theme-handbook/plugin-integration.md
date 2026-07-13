---
title: テーマとプラグインを連携する
description: テーマをプラグインの内部実装に依存させず、capability と namespace 付きブロックを利用する方法を説明します。
sidebar:
  order: 3
---

テーマとプラグインは互いを import しません。プラグインが capability を公開し、render payload が有効な capability をテーマへ伝え、テーマは `ctx.hasCapability()` で確認します。

:::note[capability に含まれるもの]
capability は `commerce.products` や `reviews.summary` などの機能識別子です。プラグインのデータは含まれず、テーマにプラグイン設定、storage、database table、API へのアクセス権を与えるものでもありません。
:::

## ステップ 1: 公開 contract を決める

特定の実装名ではなく機能を表す、安定した namespace 付き capability を選びます。

適切な例:

- `reviews.summary`
- `commerce.products`
- `search.facets`

`acme-plugin-v2-installed` のように、特定のインストールやバージョンに結び付いた名前は避けてください。

次に、公開データをどこから受け取るかを決めます。

- 保存済みページドキュメントの一部であるデータには block props を使用します。
- リクエストごとに動的に生成する必要があるデータには、platform render payload のフィールドを使用します。この方法には Z-CMS core の contract 変更が必要です。
- テーマからプラグインや CMS の private endpoint を呼び出さないでください。

## ステップ 2: プラグインから capability を公開する

プラグインの `plugin.json` に capability を追加します。

```json
{
  "id": "com.acme.plugin.reviews",
  "capabilities": ["reviews.summary"]
}
```

サイトにインストールされ、かつ**有効な**プラグインだけが render payload に capability を追加します。プラグインを無効化すると、その capability も削除されます。

## ステップ 3: テーマで任意の capability として宣言する

`theme.json` に capability を追加します。

```json
{
  "id": "com.acme.theme.storefront",
  "optionalCapabilities": ["reviews.summary"]
}
```

これは任意の機能です。プラグインが未インストール、無効、または別のプラグインに置き換えられた場合でも、テーマは表示できなければなりません。

## ステップ 4: テンプレートで機能を検出する

`ctx.hasCapability()` を使用し、必ずフォールバック表示を用意します。

```tsx
function ProductPage({ ctx, content }: PageTemplateProps<Settings>) {
  const reviewsEnabled = ctx.hasCapability("reviews.summary");

  return (
    <article>
      <h1>{content.title}</h1>
      {ctx.renderBlocks(content.blocks)}
      {!reviewsEnabled ? <p>レビュー機能は現在利用できません。</p> : null}
    </article>
  );
}
```

capability の検出で分かるのは「provider が有効かどうか」だけです。レビューなどのプラグインレコードは返されません。

## ステップ 5: プラグイン関連ブロックを表示する

ページドキュメントに namespace 付きブロックがあり、公開データが props に保存されている場合は、テーマにその表示 component を登録します。

`content.blocks` に保存されるブロックの例:

```json
{
  "id": "review-summary-1",
  "type": "acme/review-summary",
  "props": {
    "average": 4.8,
    "count": 124
  }
}
```

テーマの component:

```tsx
interface ReviewSummaryProps {
  average?: unknown;
  count?: unknown;
}

function ReviewSummary({
  ctx,
  props,
}: BlockProps<ReviewSummaryProps, Settings>) {
  if (!ctx.hasCapability("reviews.summary")) return null;

  const average = typeof props.average === "number" ? props.average : 0;
  const count = typeof props.count === "number" ? props.count : 0;

  return (
    <section aria-label="レビュー">
      <strong>{average.toFixed(1)} / 5</strong>
      <span>{count} 件のレビュー</span>
    </section>
  );
}

const blocks = {
  "core/hero": Hero,
  "core/richtext": RichText,
  "acme/review-summary": ReviewSummary,
};
```

プラグイン関連ブロックの props も core block と同様に検証してください。JSON 値なので、欠けている場合や古いプラグインバージョンの形式である場合があります。

## ステップ 6: プラグインがない場合や変更された場合に対応する

次の状態をすべてテストしてください。

1. プラグインがインストールされていない。
2. プラグインはインストール済みだが無効である。
3. プラグインが有効で、想定したブロックデータがある。
4. capability はあるが、block props が空、または古い schema である。
5. ページにブロックが残っているが、プラグインが capability を提供しなくなった。

どの状態でもページの主要機能を利用できるようにしてください。ナビゲーション、ページタイトル、主要コンテンツを任意の capability だけに依存させないでください。

## 現在の contract の制限

現在の Theme SDK には、次の処理を行う汎用的な方法はありません。

- テーマからプラグインを呼び出す。
- プラグイン設定や plugin storage を読み取る。
- プラグイン所有の database table を query する。
- `ctx.hasCapability()` から任意のプラグインデータを取得する。
- package だけで新しい動的 payload 形式を登録する。

リクエスト時に生成するデータが必要な場合は、まず安全な公開フィールドを Z-CMS の render contract に追加し、core でその値を生成します。これにより、テーマはプラグインの credential や database への直接アクセスを受け取らずに、そのフィールドを表示できます。この contract がない状態で private API の呼び出しを案内すると、サポート対象外で安全でないテーマになります。

テンプレートのデータフロー全体については、[ページとブログ記事を表示する](/ja/developers/theme-handbook/rendering-content/)を参照してください。
