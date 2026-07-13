---
title: Quản lý nhiều website
description: Tạo website, cấu hình hostname, nhận diện thương hiệu và trạng thái xuất bản.
sidebar:
  order: 3
---

Một hệ thống Z-CMS có thể vận hành nhiều website độc lập trên cùng một nền tảng. Mỗi website có hostname, nội dung, ngôn ngữ, theme, thiết lập và thành viên riêng.

## Xem và chuyển website

Mở **Sites** để xem tên, slug, trạng thái, hostname, theme và nhận diện thương hiệu của từng website. Trước khi thay đổi nội dung, media, plugin hoặc thiết lập, hãy kiểm tra website đang được chọn trong bộ chuyển website.

## Tạo website

Chỉ **Owner** có quyền tạo website vì hostname phải là duy nhất trên toàn hệ thống.

1. Mở **Sites** và tìm phần **New site**.
2. Nhập tên website. Z-CMS sẽ đề xuất slug và cho phép bạn chỉnh sửa.
3. Nhập hostname không kèm giao thức, ví dụ `news.example.com` hoặc `localhost:3100` khi phát triển.
4. Chọn ngôn ngữ mặc định và tạo website.
5. Cấu hình thương hiệu, theme và nội dung trước khi xuất bản.

Website mới được tạo ở trạng thái **Draft**. Khách truy cập chỉ có thể mở website sau khi bạn chọn **Publish**.

## Nhận diện thương hiệu dùng chung giữa các theme

Trong trang chi tiết website, hãy đặt **Primary color** và chọn logo từ Media Library. Theme lấy các giá trị này từ nhận diện thương hiệu của website, vì vậy đổi theme không làm mất nhận diện cơ bản. Hãy xem trước logo trên cả nền sáng và nền tối.

## Xuất bản và hủy xuất bản

- **Publish** cho phép `site-runtime` phục vụ website trên hostname đã cấu hình.
- **Unpublish** đưa website về trạng thái Draft mà không xóa nội dung hay thiết lập.
- Xuất bản website và xuất bản nội dung là hai thao tác riêng. Khách truy cập chỉ xem được nội dung khi cả website và nội dung đó đều đã được xuất bản.

:::caution
Trước khi xuất bản, hãy chắc chắn DNS/TLS đã trỏ đúng, hostname không chứa đường dẫn và theme đang kích hoạt có trang chủ hợp lệ.
:::

## Phân quyền

Viewer, Author và Editor có thể xem website. Admin có thể cập nhật tên, nhận diện thương hiệu và trạng thái. Chỉ Owner mới có thể tạo hoặc xóa website.
