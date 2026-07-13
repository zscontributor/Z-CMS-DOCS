# Tài liệu Z-CMS

[English](../README.md) | **Tiếng Việt** | [日本語](README.ja.md)

Z-CMS là một CMS đa tenant: **một codebase và một bản triển khai vận hành nhiều
website độc lập** — dành cho các thương hiệu, chi nhánh hoặc khách hàng — mỗi
website có tên miền, nội dung, giao diện và thiết lập riêng. Không cần sao chép
hoặc duy trì mã nguồn riêng cho từng website, nhờ đó developer có thể triển khai
đến tất cả website từ một codebase duy nhất, còn doanh nghiệp có thể khởi tạo một
chi nhánh hoặc thương hiệu mới chỉ trong vài phút trên hạ tầng dùng chung.

Repository này chứa tài liệu dành cho người dùng Z-CMS, developer phát triển tiện
ích mở rộng, đội ngũ vận hành và nhà phát hành trên marketplace — được xuất bản
tại **[docs.z-cms.org](https://docs.z-cms.org)**.

## Phát triển

Yêu cầu Node.js 22.12+ và pnpm 10+.

```bash
pnpm install
pnpm dev
```

Website local có tại `http://localhost:4321`.

## Kiểm tra

```bash
pnpm check
pnpm build
```

## Nội dung

Tài liệu nằm trong `src/content/docs/<locale>/` và được phân nhóm theo đối tượng:

- `users` — chủ website, biên tập viên và quản trị viên
- `developers` — developer phát triển core, plugin và theme
- `operators` — đội ngũ self-host và vận hành production
- `marketplace` — nhà phát hành và phân phối package
- `contributing` — hướng dẫn đóng góp tài liệu

Tiếng Việt (`vi`) là locale mặc định. Các trang tiếng Anh sử dụng cùng đường dẫn
tương đối trong thư mục `en`.

## Triển khai

URL canonical của production là `https://docs.z-cms.org`. Kết quả build là website
tĩnh hoàn toàn trong thư mục `dist/` và có thể được triển khai lên bất kỳ nhà cung
cấp dịch vụ static hosting nào.
