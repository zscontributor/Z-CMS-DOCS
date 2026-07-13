---
title: Tham chiếu API
description: Sử dụng tài liệu OpenAPI do Z-CMS tạo tự động.
sidebar:
  order: 5
---

Z-CMS tự động tạo tài liệu OpenAPI từ các route của `cms-api`.

Trong môi trường local, bạn có thể mở tài liệu API có giao diện tương tác tại:

```text
http://localhost:4100/api/v1/docs
```

Để xuất OpenAPI JSON:

```bash
pnpm openapi
```

Tài liệu tham chiếu API được tạo tự động và là nguồn chính xác nhất về endpoint, schema của request và schema của response. Các hướng dẫn còn lại giải thích tình huống sử dụng và ranh giới tin cậy liên quan.
