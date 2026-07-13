---
title: zAI Content Operator
description: Dùng ngôn ngữ tự nhiên để liệt kê, tạo, sửa và xuất bản nội dung.
sidebar:
  order: 10
---

zAI cho phép bạn quản lý trang và bài viết bằng ngôn ngữ tự nhiên. zAI không thể vượt quá permission của tài khoản hiện tại; mọi yêu cầu vẫn đi qua Z-CMS API, bước kiểm tra permission và nhật ký kiểm tra.

## Tác vụ hỗ trợ

- Liệt kê hoặc tìm trang và bài viết.
- Tạo nội dung mới ở trạng thái Draft.
- Sửa tiêu đề, slug hoặc các trường được hỗ trợ.
- Xuất bản hoặc hủy xuất bản nội dung.
- Xóa nội dung sau bước xác nhận rõ ràng.

## Viết yêu cầu chính xác

Trong yêu cầu, hãy nêu rõ loại nội dung, trạng thái, ngôn ngữ và giá trị cần thay đổi. Ví dụ:

```text
Tạo một blog draft tiếng Việt tên "Thông báo bảo trì", slug "thong-bao-bao-tri".
```

```text
Liệt kê các trang đang được xuất bản có từ "dịch vụ" trong tiêu đề.
```

Sau mỗi thao tác, hãy mở **Content** để kiểm tra kết quả, đặc biệt là slug, ngôn ngữ, liên kết nội bộ và các trường SEO.

## Thao tác xóa

Khi bạn yêu cầu xóa, zAI sẽ tạm dừng và hiển thị bước **Xác nhận xóa**. Hãy kiểm tra lại đối tượng trước khi xác nhận. Nếu kết quả tìm kiếm chưa xác định được chính xác một đối tượng, hãy hủy thao tác.

:::caution
Không nhập secret, thông tin xác thực hoặc dữ liệu cá nhân nhạy cảm vào hội thoại. zAI hỗ trợ thao tác nội dung nhưng không thay thế quy trình biên tập và kiểm duyệt.
:::

Nếu zAI báo không đủ permission, hãy dùng tài khoản phù hợp hoặc nhờ Editor/Admin thực hiện. Không nên cấp vai trò cao hơn chỉ để hoàn thành một thao tác đơn lẻ.
