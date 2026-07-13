---
title: Media
description: Tải lên, sắp xếp và sử dụng hình ảnh hoặc tệp.
sidebar:
  order: 5
---

Media Library sắp xếp tệp theo thư mục. Worker tạo các biến thể ảnh ở chế độ nền, vì vậy người dùng không phải chờ xử lý ảnh khi tải lên.

## Thao tác thường dùng

- Kéo thả nhiều tệp để tải lên.
- Tạo thư mục theo chiến dịch hoặc loại nội dung.
- Chọn nhiều tệp để di chuyển hoặc xóa.
- Cập nhật văn bản thay thế để cải thiện khả năng tiếp cận và SEO.

Không tải lên tệp chứa thông tin nhạy cảm nếu tệp đó sẽ được dùng trên website công khai.

## Duyệt, tìm kiếm và lọc

Khi duyệt Media Library, bạn chỉ thấy nội dung của thư mục hiện tại; breadcrumb cho biết vị trí của thư mục đó. Tìm kiếm luôn áp dụng cho toàn bộ thư viện, không chỉ thư mục đang mở. Bạn có thể lọc riêng hình ảnh hoặc tài liệu. Mỗi trang hiển thị tối đa 24 mục.

## Thư mục và metadata

Người có permission cập nhật media có thể tạo, đổi tên và di chuyển thư mục; đổi tên hoặc di chuyển tệp; chỉnh sửa văn bản thay thế. Xóa tệp hoặc thư mục yêu cầu permission `media:delete`. Trước khi xóa, hãy kiểm tra tệp có đang được nội dung, cấu hình theme hoặc logo thương hiệu sử dụng hay không.

## Biến thể ảnh

Quá trình tải lên hoàn tất trước khi worker tạo các biến thể ảnh. Nếu ảnh gốc đã xuất hiện nhưng ảnh thu nhỏ chưa có, hãy kiểm tra **Jobs** và trạng thái worker thay vì tải lên lại nhiều lần.

:::tip
Dùng tên tệp dễ nhận biết, cấu trúc thư mục nhất quán và văn bản thay thế mô tả đúng mục đích của ảnh trong ngữ cảnh. Không nhồi từ khóa SEO vào văn bản thay thế.
:::
