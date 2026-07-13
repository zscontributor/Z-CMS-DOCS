---
title: Phát hành package
description: Chuẩn bị và gửi package plugin hoặc theme lên Marketplace để kiểm duyệt.
sidebar:
  order: 2
---

Quy trình này bắt đầu sau khi plugin hoặc theme đã vượt qua các bước kiểm thử trên máy của bạn. Hãy gửi đúng file đã xác minh; không build lại trong quá trình kiểm duyệt.

## Bước 1: Tạo và đăng ký khóa của nhà phát hành

Tạo cặp khóa Ed25519 một lần cho nhà phát hành:

```bash
zcms keygen --out ./keys
```

Command này tạo khóa riêng `publisher-private.pem` với quyền truy cập `0600` và khóa công khai `publisher-public.pem`. Hãy sao lưu khóa riêng ở nơi an toàn; không commit, tải lên hoặc dán khóa này vào biểu mẫu web.

Mở [**Developer Portal → Publisher**](https://marketplace.z-cms.org/developer/publisher) và đăng ký:

1. Slug dài 3–40 ký tự, chỉ gồm chữ thường, số hoặc dấu gạch ngang; không bắt đầu hoặc kết thúc bằng dấu gạch ngang.
2. Display name.
3. Email liên hệ, không bắt buộc.
4. Toàn bộ nội dung của `publisher-public.pem`.

Mỗi khóa công khai chỉ được đăng ký cho một nhà phát hành. Nếu khóa riêng từng bị dán hoặc để lộ, hãy xem khóa đó đã bị xâm phạm và tạo cặp khóa mới.

## Bước 2: Chuẩn bị thông tin giới thiệu

Trang giới thiệu công khai được tạo từ manifest đã ký. Hoàn thiện các trường sau trước khi đóng gói:

1. `id` dạng reverse-DNS, tên hiển thị `name`, phiên bản semantic trong `version`, `description` và `author`.
2. Khoảng phiên bản Z-CMS tương thích trong `engine`.
3. `entry` đã được build, thông thường là `dist/index.js`.
4. `permissions`, khả năng và thiết lập của plugin; hoặc template và thiết lập của theme.
5. Tối đa ba ảnh chụp màn hình trong `media.screenshots`; chỉ nhận PNG, JPEG hoặc WebP, tối đa 2 MB và 4096 px mỗi chiều.
6. Video giới thiệu trong `media.video`, không bắt buộc. Nên tải video lên YouTube, đặt **Visibility** thành **Public**, rồi dùng URL HTTPS của trang xem video.

Để thêm video vào manifest:

1. Upload video demo plugin hoặc theme lên YouTube.
2. Trong **YouTube Studio → Content**, mở video và đặt **Visibility** thành **Public**.
3. Mở trang xem video, chọn **Share → Copy**. Nên dùng URL đầy đủ có dạng `https://www.youtube.com/watch?v=VIDEO_ID`.
4. Dán URL vào `media.video`:

   ```json
   {
     "media": {
       "screenshots": ["screenshots/admin.png"],
       "video": "https://www.youtube.com/watch?v=VIDEO_ID"
     }
   }
   ```

Marketplace và người kiểm duyệt phải mở được video mà không cần đăng nhập hoặc yêu cầu quyền truy cập. Không dùng URL của YouTube Studio, URL chỉnh sửa video hoặc video ở trạng thái **Private**. Trước khi đóng gói, hãy mở URL trong cửa sổ ẩn danh để xác nhận video phát được.

Nếu phiên bản mới bổ sung permission hoặc thay đổi cách xử lý dữ liệu, hãy nêu rõ thay đổi. Không giấu việc tăng permission trong một mục lịch sử thay đổi chung chung.

## Bước 3: Tạo file phát hành

Build từ một bản checkout sạch, dùng lockfile đã commit và đúng phiên bản bộ công cụ được ghi trong tài liệu của project.

1. Chạy kiểm tra kiểu dữ liệu, lint và unit test.
2. Xác nhận phiên bản trong manifest và entry đã build là chính xác.
3. Đóng gói thư mục đã build bằng khóa của nhà phát hành:

   ```bash
   mkdir -p release

   zcms pack ./path/to/built-package --kind plugin \
     --key ./keys/publisher-private.pem \
     --pub ./keys/publisher-public.pem \
     --out ./release/package.zcms
   ```

   Dùng `--kind theme` nếu đóng gói theme.

4. Lưu checksum do `zcms pack` in ra.
5. Xác minh chữ ký của nhà phát hành:

   ```bash
   zcms verify ./release/package.zcms
   ```

6. Để kiểm tra khả năng tái tạo bản build, hãy đóng gói cùng thư mục thêm một lần. CLI sắp xếp các tệp và đặt timestamp của archive về 0 nên checksum phải giống nhau.

Nếu checksum khác nhau, hãy loại bỏ dữ liệu đầu vào không ổn định như timestamp, thứ tự tệp thay đổi hoặc dependency chưa được cố định phiên bản trước khi gửi.

## Bước 4: Tải lên và gửi kiểm duyệt

Mở [**Developer Portal → Submit a package**](https://marketplace.z-cms.org/developer/submit), chọn file `.zcms` rồi nhấn **Submit for review**. Mỗi file được phép có dung lượng tối đa 20 MB; mỗi tài khoản developer được gửi tối đa 10 package trong khoảng thời gian một giờ liên tiếp.

Portal không yêu cầu chọn nhà phát hành, ID package hoặc phiên bản. Các giá trị này được đọc từ phần thông tin đã ký trong package; nhà phát hành được xác định bằng khóa công khai đã đăng ký.

Nếu tải lên qua API, gửi request `multipart/form-data` đã xác thực tới `POST /developer/submissions` và đặt file trong trường `file`. Dùng `GET /developer/submissions` để xem các lượt gửi của tài khoản hiện tại.

## Bước 5: Xác minh tự động

Marketplace tiếp nhận package theo đúng thứ tự:

1. Mở archive nhưng không chạy code và tính lại checksum của nội dung.
2. Tìm nhà phát hành từ khóa công khai đã đăng ký và xác nhận tài khoản developer sở hữu nhà phát hành đó.
3. Xác minh chữ ký nhà phát hành bằng khóa đã đăng ký, không chỉ tin khóa nằm trong package.
4. Xác minh media và chạy trình quét tĩnh.
5. Thêm chữ ký của Marketplace rồi lưu package đã được chấp nhận.

Nếu trình quét trả về `reject`, Marketplace báo lỗi và không tạo phiên bản. Kết quả `flag` tạo phiên bản ở trạng thái `QUARANTINED` kèm phát hiện cần xem xét. Kết quả sạch tạo phiên bản `PENDING`; trạng thái này chưa có nghĩa là đã được phê duyệt.

## Bước 6: Kiểm duyệt thủ công

Mọi phiên bản của bên thứ ba ở trạng thái `PENDING` hoặc `QUARANTINED` đều phải được nhân viên kiểm duyệt. Các trạng thái gồm `PENDING`, `QUARANTINED`, `APPROVED` và `REJECTED`. Developer Portal và thông báo sẽ hiển thị kết quả; package bị từ chối luôn đi kèm lý do.

Khi người kiểm duyệt yêu cầu thay đổi:

1. Đọc lý do từ chối và phát hiện của trình quét.
2. Cập nhật source, test và manifest.
3. Tăng phiên bản.
4. Build, ký và xác minh file `.zcms` mới.
5. Gửi phiên bản mới.

Mỗi phiên bản là bất biến. Nếu tải lên nội dung khác dưới một phiên bản đã tồn tại, package sẽ bị từ chối; nếu tải lại đúng nội dung cũ, kết quả kiểm duyệt trước đó được giữ nguyên.

## Bước 7: Marketplace ký package

`zcms pack` tạo chữ ký của nhà phát hành. Sau khi xác minh nhà phát hành và quét package, Marketplace thêm chữ ký thứ hai trên cùng checksum rồi lưu file `.zcms` có đủ hai chữ ký.

Chữ ký của Marketplace không tự động công khai package đang chờ duyệt. Registry chỉ cung cấp phiên bản `APPROVED` và chưa bị thu hồi. Trước khi cài, Z-CMS runtime xác minh chữ ký này bằng `MARKETPLACE_PUBLIC_KEY` đã được cấu hình cố định.

## Bước 8: Publish và kiểm tra

Khi người kiểm duyệt phê duyệt, phiên bản tự động xuất hiện trong registry công khai. Sau đó:

1. Mở trang giới thiệu công khai và kiểm tra metadata, ảnh chụp màn hình và lịch sử thay đổi.
2. Cài package từ Marketplace lên một website kiểm thử sạch.
3. Xác nhận quá trình xác minh chữ ký thành công.
4. Kích hoạt package với đúng các permission đã ghi trong tài liệu.
5. Chạy kiểm thử nhanh và kiểm tra khả năng gỡ cài đặt hoặc rollback.

Nếu đã tải file `.zcms` từ Marketplace và muốn tự kiểm tra chữ ký trước khi cài đặt, hãy chạy lệnh sau trên máy của bạn. Tham số `--marketplace-key` phải trỏ đến file public key chính thức của Marketplace:

```bash
zcms verify ./downloaded-package.zcms --marketplace-key ./marketplace-public.pem
```

## Bước 9: Duy trì bản phát hành

Theo dõi kênh hỗ trợ và địa chỉ liên hệ bảo mật. Mọi bản sửa lỗi phải được phát hành bằng semantic version mới; không sửa nội dung của bản phát hành đã có.

Khi có sự cố bảo mật, hãy phối hợp công bố thông tin, gửi package đã sửa và yêu cầu thu hồi phiên bản bị ảnh hưởng nếu cần. Runtime sẽ đồng bộ danh sách thu hồi đã ký và cách ly package đã bị thu hồi.
