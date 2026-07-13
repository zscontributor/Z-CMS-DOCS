---
title: Tổng quan kiến trúc
description: Các component và trust boundary chính của Z-CMS.
sidebar:
  order: 1
---

Z-CMS tách API, trình hiển thị website công khai, Admin, plugin runtime và worker thành các process độc lập.

## Các component

| Component | Trách nhiệm |
| --- | --- |
| `cms-api` | Xác thực, RBAC, nội dung, media, Marketplace và API hiển thị |
| `site-runtime` | Hiển thị website công khai bằng theme đang được kích hoạt |
| `admin-web` | Giao diện quản trị |
| `plugin-runtime` | Chạy plugin trong V8 isolate, không giữ credential |
| `worker` | Xử lý media variant, email, sitemap và deferred job |

## Trust boundary

- Tenant isolation được thực thi bằng PostgreSQL Row-Level Security.
- Plugin không chạy trong API process.
- Trước khi được cài, package phải được nhà phát hành ký, sau đó được Marketplace kiểm duyệt và ký thêm. Khi cài đặt, Z-CMS xác minh cả hai chữ ký và checksum để bảo đảm package không bị thay đổi sau khi ký.

Đây là các invariant bắt buộc của nền tảng, không phải convention mà extension có thể tùy ý bỏ qua.
