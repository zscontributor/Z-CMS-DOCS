---
title: Mail và tác vụ nền
description: Cấu hình SMTP, gửi email kiểm tra và xử lý tác vụ nền bị lỗi.
sidebar:
  order: 9
---

Z-CMS dùng worker để xử lý email, biến thể ảnh, sitemap và một số hook của plugin ở chế độ nền. Nhờ đó, yêu cầu web không phải chờ các tác vụ mất nhiều thời gian hoàn tất.

## Cấu hình mail theo website

Mở **Settings → Mail**. Các trường thường gồm máy chủ SMTP, cổng, chế độ mã hóa, tên đăng nhập, mật khẩu, tên người gửi và địa chỉ người gửi. Cấu hình được lưu theo website, vì vậy hãy chọn đúng website trước khi chỉnh sửa.

1. Nhập thông tin xác thực do nhà cung cấp email cung cấp.
2. Lưu cấu hình.
3. Dùng **Send test email** với địa chỉ bạn kiểm soát.
4. Kiểm tra hộp thư đến, thư rác và nhật ký của nhà cung cấp.

Permission `settings:read` cho phép xem cấu hình; `settings:update` cho phép chỉnh sửa; `mail:send` cho phép gửi email. Trang này cũng liệt kê các plugin được cấp `mail:send`, giúp bạn biết plugin nào có thể gửi email dưới danh nghĩa của website.

:::caution
Không đưa mật khẩu SMTP vào yêu cầu hỗ trợ hoặc ảnh chụp màn hình. Sau khi thay thông tin xác thực, hãy gửi lại email kiểm tra ngay.
:::

## Hàng đợi tác vụ lỗi

Mở **Jobs** để xem hàng đợi tác vụ lỗi. Mỗi mục là một tác vụ đã được chạy lại nhưng vẫn chưa hoàn tất, chẳng hạn như gửi email, tạo biến thể ảnh, làm mới sitemap hoặc chạy hook của plugin.

Khi xử lý lỗi:

1. Đọc tên tác vụ, thời gian, số lần thử và thông báo lỗi.
2. Khắc phục nguyên nhân gốc, chẳng hạn cấu hình SMTP sai, storage thiếu permission hoặc plugin bị lỗi.
3. Chọn chạy lại sau khi nguyên nhân đã được xử lý.
4. Xác nhận tác vụ biến mất khỏi danh sách và kết quả đầu ra đã được tạo.

Trang hiển thị tối đa 50 mục. Nếu có cảnh báo danh sách đã bị rút gọn, hãy xử lý lần lượt theo từng nhóm. Chạy lại liên tục khi chưa sửa nguyên nhân có thể làm tăng tải và gửi email trùng lặp.
