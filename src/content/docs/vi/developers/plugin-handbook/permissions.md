---
title: Permission của plugin
description: Cách plugin khai báo và sử dụng permission.
sidebar:
  order: 2
---

Plugin khai báo permission trong manifest, nhưng permission chỉ có hiệu lực sau khi được Administrator phê duyệt. Runtime nhận token có phạm vi và thời hạn ngắn; CMS gateway kiểm tra lại phạm vi trước khi cho phép truy cập tài nguyên.

## Nguyên tắc

- Chỉ yêu cầu những permission cần thiết cho chức năng hiện tại.
- Xử lý đúng trường hợp Administrator chỉ phê duyệt một phần permission.
- Không lưu token này vào nơi lưu trữ hoặc nhật ký.
- Mọi thay đổi làm tăng permission phải được ghi rõ trong ghi chú phát hành.

Không được xem permission là bước kiểm tra chỉ diễn ra trên giao diện. CMS luôn thực thi permission tại ranh giới tin cậy.
