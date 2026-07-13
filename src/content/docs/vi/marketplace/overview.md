---
title: Tổng quan Marketplace
description: Cách Z-CMS phân phối plugin và theme.
sidebar:
  order: 1
---

Z-CMS Marketplace do Z-SOFT quản lý và vận hành. Developer có thể phát hành plugin hoặc theme lên Marketplace; người dùng có thể tìm và cài package ngay trong Admin.

Marketplace giúp người dùng tìm extension, xác minh danh tính nhà phát hành, kiểm duyệt package, quản lý metadata của từng phiên bản và cung cấp danh sách thu hồi. Runtime chỉ tin cậy package có chữ ký được xác minh bằng khóa công khai đã cấu hình cố định.

Nhà phát hành ký package bằng khóa do `zcms keygen` tạo. Khi tiếp nhận package, Marketplace xác minh chữ ký của nhà phát hành, quét nội dung rồi thêm chữ ký của Marketplace. Package chỉ được công khai sau khi nhân viên kiểm duyệt phê duyệt; Z-CMS xác minh chữ ký của Marketplace trước khi cài.

## Thông tin cần có trên trang giới thiệu

- Mô tả và ảnh chụp màn hình.
- Phiên bản và lịch sử thay đổi.
- Z-CMS compatibility.
- Các permission được yêu cầu.
- Chính sách dữ liệu và quyền riêng tư.
- URL hỗ trợ và URL tài liệu.
- Địa chỉ liên hệ về bảo mật.

Xem [Phát hành package](/vi/marketplace/publishing/) để thực hiện đầy đủ các bước tải lên, kiểm duyệt, ký và phát hành.
