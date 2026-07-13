---
title: Triển khai trên môi trường production
description: Các thành phần và yêu cầu bảo mật khi vận hành Z-CMS trên môi trường production.
sidebar:
  order: 1
---

Một hệ thống production đầy đủ gồm API, site runtime, Admin, plugin runtime, worker, PostgreSQL, Redis và dịch vụ lưu trữ đối tượng tương thích S3.

## Checklist

- Dùng bộ thông tin xác thực riêng cho từng dịch vụ.
- Bảo đảm vai trò cơ sở dữ liệu của ứng dụng là `NOBYPASSRLS` và không sở hữu bảng.
- Không cấp thông tin xác thực của cơ sở dữ liệu, S3 hoặc phiên đăng nhập cho plugin runtime.
- Cấu hình cố định `MARKETPLACE_PUBLIC_KEY` lấy từ nguồn tin cậy.
- Bật TLS cho tất cả hostname công khai.
- Chạy migration trước khi chuyển lưu lượng sang phiên bản mới.
- Thiết lập sao lưu và định kỳ kiểm tra khả năng khôi phục.

:::danger
Không dùng vai trò chủ sở hữu cơ sở dữ liệu trong `APP_DATABASE_URL`. Chủ sở hữu bảng có thể bỏ qua Row-Level Security, làm mất khả năng cô lập tenant.
:::
