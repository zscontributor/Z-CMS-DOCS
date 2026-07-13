---
title: Người dùng, vai trò và bảo mật tài khoản
description: Mời thành viên, gán vai trò, đổi mật khẩu và bật xác thực hai bước.
sidebar:
  order: 8
---

Z-CMS quản lý quyền truy cập theo tư cách thành viên của từng website. Cùng một người có thể giữ vai trò khác nhau trên mỗi website.

## Vai trò mặc định

| Vai trò | Khả năng chính |
| --- | --- |
| Viewer | Xem website, nội dung, media, theme, plugin và thiết lập |
| Author | Tạo và sửa nội dung được phép, tải lên và cập nhật media |
| Editor | Xuất bản hoặc xóa nội dung, xóa media và quản lý menu |
| Admin | Cấu hình website, loại nội dung, theme, plugin, mail và mời người dùng |
| Owner | Tạo hoặc xóa website, quản lý người dùng và xử lý package bị cách ly |

Mỗi vai trò là một tập hợp permission được xác định trước. Hệ thống vẫn kiểm tra permission trên từng tài nguyên. Author không thể xuất bản nội dung, còn Admin không thể tự nâng vai trò của mình thành Owner.

## Mời thành viên

1. Mở **Users** và chọn website cần cấp quyền.
2. Nhập email, sau đó chọn vai trò không cao hơn vai trò của chính bạn.
3. Gửi lời mời và theo dõi trong **Pending invitations**.
4. Người nhận mở liên kết mời, đăng nhập hoặc tạo tài khoản và chấp nhận lời mời tham gia website.

Admin có thể xem và mời thành viên; chỉ Owner có thể đổi vai trò hoặc xóa quyền truy cập của người khác.

## Hồ sơ và mật khẩu

Người dùng đã đăng nhập có thể mở **Profile** để đổi tên, ảnh đại diện và mật khẩu của mình. Email được dùng làm mã đăng nhập và có thể không cho phép chỉnh sửa, tùy cấu hình hệ thống.

## Xác thực hai bước

Trong **Profile**, bật TOTP, quét mã QR bằng ứng dụng xác thực rồi nhập mã để hoàn tất. Hãy lưu recovery code ở nơi an toàn, tách biệt với thiết bị dùng để tạo mã.

:::danger
Mỗi mã khôi phục chỉ dùng được một lần. Không lưu mã trong ghi chú công khai, yêu cầu hỗ trợ hoặc cùng nơi lưu thông tin của tài khoản dùng chung.
:::

Nếu nghi ngờ tài khoản bị lộ, hãy đổi mật khẩu, thu hồi phiên đăng nhập nếu hệ thống hỗ trợ, kiểm tra quyền thành viên và nhờ Admin hoặc Owner xem nhật ký kiểm tra.
