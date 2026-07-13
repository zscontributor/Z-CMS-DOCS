---
title: Nâng cấp và rollback
description: Quy trình nâng cấp Z-CMS an toàn.
sidebar:
  order: 2
---

Trước khi nâng cấp, hãy đọc ghi chú phát hành, kiểm tra khả năng tương thích của theme và plugin, đồng thời chuẩn bị bản sao lưu đã được thử khôi phục thành công.

## Quy trình đề xuất

1. Kiểm thử phiên bản mới bằng bản sao dữ liệu production đã được loại bỏ hoặc che thông tin nhạy cảm.
2. Chạy migration và kiểm thử nhanh trong môi trường staging.
3. Tạm dừng các thay đổi schema nếu migration yêu cầu.
4. Triển khai các thành phần theo thứ tự được ghi trong ghi chú phát hành.
5. Kiểm tra tình trạng API, hàng đợi, kết quả hiển thị và sự kiện kiểm tra.
6. Chỉ xóa tài nguyên của phiên bản cũ sau khi hết thời hạn cho phép rollback.
