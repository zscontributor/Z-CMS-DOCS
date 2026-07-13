---
title: Tổng quan chức năng
description: Bản đồ các chức năng chính trong Z-CMS Admin và nơi tìm hướng dẫn chi tiết.
sidebar:
  order: 2
---

Z-CMS là nền tảng multi-tenant: một hệ thống có thể quản lý nhiều website, nhưng dữ liệu và cấu hình của từng website vẫn được tách biệt. Các chức năng hiển thị trong Admin phụ thuộc vào vai trò của tài khoản và website đang được chọn.

| Khu vực | Bạn có thể làm gì | Hướng dẫn |
| --- | --- | --- |
| Sites | Tạo website, cấu hình hostname và nhận diện thương hiệu, xuất bản hoặc hủy xuất bản | [Quản lý nhiều website](/vi/users/sites/) |
| Content | Tạo trang hoặc bài viết, sử dụng block, dịch, xem trước và xuất bản | [Nội dung và xuất bản](/vi/users/content/) |
| Media | Tải lên, tìm kiếm, sắp xếp theo thư mục và sửa văn bản thay thế | [Media](/vi/users/media/) |
| Marketplace | Tìm và cài package đã ký | [Theme và plugin](/vi/users/extensions/) |
| Appearance | Kích hoạt theme, cấu hình từ schema và tạo dữ liệu mẫu | [Giao diện và theme](/vi/users/appearance/) |
| Users / Profile | Mời thành viên, gán vai trò, đổi mật khẩu và bật 2FA | [Người dùng và bảo mật](/vi/users/users-security/) |
| Settings → Mail | Cấu hình SMTP và gửi email test | [Mail và background job](/vi/users/operations/) |
| Jobs | Xem và chạy lại tác vụ trong hàng đợi lỗi | [Mail và tác vụ nền](/vi/users/operations/) |
| zAI | Quản lý page/blog bằng ngôn ngữ tự nhiên | [zAI Content Operator](/vi/users/zai/) |

## Cách xác định phạm vi thay đổi

Bộ chuyển website xác định website sẽ nhận các thay đổi về nội dung, media, giao diện, plugin và mail. Riêng màn hình **Sites** liệt kê tất cả website mà tài khoản được phép truy cập. Nếu không thấy menu hoặc nút thao tác cần dùng, hãy kiểm tra website hiện tại và vai trò của tài khoản trước khi kết luận chức năng bị lỗi.

## Các background component

Worker xử lý các biến thể ảnh, email, sitemap và hook của plugin. Marketplace đồng bộ danh sách package đã bị thu hồi. Nhật ký kiểm tra ghi lại các sự kiện bảo mật và thao tác quan trọng, bao gồm cả thao tác được thực hiện qua zAI.
