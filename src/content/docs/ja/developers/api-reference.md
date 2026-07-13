---
title: API リファレンス
description: Z-CMS が自動生成する OpenAPI ドキュメントの利用方法を説明します。
sidebar:
  order: 5
---

Z-CMS は、`cms-api` で定義されているルートから OpenAPI ドキュメントを自動生成します。

ローカル環境では、対話形式の API ドキュメントを次の URL で確認できます。

```text
http://localhost:4100/api/v1/docs
```

OpenAPI JSON を出力するには、次のコマンドを実行します。

```bash
pnpm openapi
```

自動生成された API リファレンスが、エンドポイント、リクエストスキーマ、レスポンススキーマの正確な仕様です。その他のガイドでは、主な利用例と信頼境界を説明します。
