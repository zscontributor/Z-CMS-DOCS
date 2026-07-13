---
title: Nội dung và xuất bản
description: Tạo, chỉnh sửa, dịch và xuất bản nội dung.
sidebar:
  order: 4
---

Mỗi loại nội dung có một schema xác định các trường được phép sử dụng. Admin tạo trình soạn thảo từ schema này để dữ liệu luôn nhất quán.

## Quy trình cơ bản

1. Vào **Content** và chọn loại nội dung.
2. Chọn **Create**.
3. Nhập tiêu đề, slug, nội dung và các trường bắt buộc.
4. Lưu **Draft** để tiếp tục chỉnh sửa hoặc chọn **Publish**.
5. Dùng **Preview** để kiểm tra trước khi công khai.

## Nội dung đa ngôn ngữ

Các phiên bản ngôn ngữ thuộc cùng một nhóm bản dịch, nhưng mỗi phiên bản vẫn có slug, trạng thái và nội dung riêng.

:::caution
Xóa một phiên bản ngôn ngữ không tự động xóa các phiên bản còn lại trong cùng nhóm bản dịch.
:::

## Tìm và lọc nội dung

Danh sách nội dung hỗ trợ tìm kiếm theo từ khóa, lọc theo trạng thái và phân trang. Mỗi dòng hiển thị đường dẫn công khai, thời gian cập nhật gần nhất và tác giả. Với loại nội dung chỉ có một bản ghi, chẳng hạn trang chủ hoặc trang giới thiệu, Z-CMS mở thẳng trình soạn thảo.

## Trạng thái và quyền

- **Draft** chỉ hiển thị trong Admin và bản xem trước được bảo vệ.
- **Published** có thể hiển thị công khai nếu website cũng đã được xuất bản.
- Author có thể tạo và sửa nội dung được phép nhưng không thể xuất bản.
- Editor trở lên có thể xuất bản, hủy xuất bản và xóa nội dung.

Slug là một phần của URL công khai. Trước khi đổi slug của nội dung đã xuất bản, hãy kiểm tra các liên kết nội bộ và tạo chuyển hướng nếu cần.

## Blocks, fields và SEO

Trình soạn thảo có thể gồm các trường được định nghĩa trong schema, vùng block và các trường SEO. Chỉ sử dụng những block được loại nội dung hoặc theme hỗ trợ. Hãy đặt tiêu đề và mô tả SEO riêng nếu tiêu đề bài viết không phù hợp với kết quả tìm kiếm.

## Danh sách kiểm tra trước khi xuất bản

- Các trường bắt buộc, slug và ngôn ngữ đã đúng.
- Ảnh có alt text; liên kết và CTA hoạt động.
- Giao diện trên thiết bị di động, metadata SEO và bản xem trước đã được kiểm tra.
- Các phiên bản ngôn ngữ liên quan không trỏ nhầm ngôn ngữ hoặc nội dung cũ.
