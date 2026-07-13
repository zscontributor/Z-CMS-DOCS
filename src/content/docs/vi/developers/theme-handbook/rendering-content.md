---
title: Hiển thị page và bài viết blog
description: Cách site-runtime truyền nội dung cho theme và cách hiển thị page, bài viết, trang danh sách, field, block, menu và link đa ngôn ngữ.
sidebar:
  order: 2
---

Theme Z-CMS **không gọi Content API** để lấy page hoặc bài viết blog. Với mỗi URL công khai, `site-runtime` xác định website và truyền kết quả cho theme đang hoạt động. Theme chỉ hiển thị dữ liệu được nhận.

Luồng xử lý một request:

1. Người dùng mở một URL công khai.
2. `site-runtime` gọi Render API nội bộ một lần.
3. API xác định hostname, ngôn ngữ, route, nội dung đã xuất bản, menu, cấu hình theme và capability của các plugin đang hoạt động.
4. `site-runtime` chọn template phù hợp trong theme.
5. Template hiển thị `content`, `archive` và `ctx`.

:::caution[Không gọi Render API từ theme]
Request nội bộ là `GET /api/v1/render/resolve` và cần internal token. Request này thuộc trách nhiệm của `site-runtime`, không phải code của theme. Không import API client, gọi `fetch` hoặc đưa token này vào theme.
:::

## Bước 1: Import type cho template

Dùng type từ `@zcmsorg/theme-sdk` để input của template luôn khớp với contract của runtime.

```tsx
import {
  defineTheme,
  type ArchiveTemplateProps,
  type PageTemplateProps,
  type ThemeManifest,
} from "@zcmsorg/theme-sdk";
import manifestJson from "../theme.json";

const manifest = manifestJson as unknown as ThemeManifest;

interface Settings {
  accent: string;
}
```

Không import type từ `cms-api`, `site-runtime`, Prisma hoặc module nội bộ khác của Z-CMS.

## Bước 2: Hiển thị một page

Runtime truyền page đã xuất bản và khớp với URL vào `content`.

```tsx
function Page({ ctx, content }: PageTemplateProps<Settings>) {
  return (
    <article>
      <h1>{content.title}</h1>
      {content.excerpt ? <p>{content.excerpt}</p> : null}
      <div>{ctx.renderBlocks(content.blocks)}</div>
    </article>
  );
}
```

Các field thường dùng trong `content`:

| Field | Mục đích |
| --- | --- |
| `title` | Tiêu đề page hoặc bài viết |
| `excerpt` | Phần tóm tắt, có thể không có |
| `path` | Đường dẫn nội dung trước khi xử lý tiền tố ngôn ngữ |
| `contentType.key` | Loại nội dung, ví dụ `page` hoặc `post` |
| `data` | Các field tùy chỉnh của content type |
| `blocks` | Danh sách block được tạo trong editor |
| `publishedAt` | Thời gian xuất bản hoặc `null` |
| `author` | Thông tin tác giả hoặc `null` |
| `seo` | Dữ liệu SEO đã xử lý cho nội dung |

Chỉ nội dung đã xuất bản mới được đưa vào public render payload. Theme không cần tự lọc nội dung nháp.

## Bước 3: Đọc custom field an toàn

Các giá trị trong `content.data` là JSON nên có type `unknown`. Hãy kiểm tra từng giá trị trước khi hiển thị.

```tsx
function text(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function Page({ ctx, content }: PageTemplateProps<Settings>) {
  const subtitle = text(content.data.subtitle);

  return (
    <article>
      <h1>{content.title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
      {ctx.renderBlocks(content.blocks)}
    </article>
  );
}
```

Không ép toàn bộ `content.data` sang một interface đáng tin cậy nếu theme không kiểm tra dữ liệu lúc chạy. Chủ website có thể thay đổi field của content type mà không phát hành phiên bản theme mới.

## Bước 4: Hiển thị một bài viết blog

Khi `content.contentType.key` là `post`, `site-runtime` chọn `templates.post`. Nếu theme không khai báo template này, runtime dùng `templates.page`.

```tsx
function Post({ ctx, content }: PageTemplateProps<Settings>) {
  const date = content.publishedAt
    ? new Date(content.publishedAt).toLocaleDateString(ctx.locale)
    : "";

  return (
    <article>
      <a href={ctx.url("/blog")}>Quay lại blog</a>
      <h1>{content.title}</h1>
      <p>{[date, content.author?.name].filter(Boolean).join(" · ")}</p>
      {content.excerpt ? <p>{content.excerpt}</p> : null}
      {ctx.renderBlocks(content.blocks)}
    </article>
  );
}
```

## Bước 5: Hiển thị danh sách bài viết blog

Route danh sách như `/blog` nhận `archive` thay vì `content`. Runtime truyền danh sách bài viết đã xuất bản và thông tin phân trang.

```tsx
function Archive({ ctx, archive }: ArchiveTemplateProps<Settings>) {
  return (
    <section>
      <h1>{archive.title}</h1>

      {archive.items.length === 0 ? (
        <p>Chưa có bài viết.</p>
      ) : (
        <ul>
          {archive.items.map((item) => (
            <li key={item.id}>
              <a href={ctx.url(item.path)}>{item.title}</a>
              {item.excerpt ? <p>{item.excerpt}</p> : null}
            </li>
          ))}
        </ul>
      )}

      {archive.page > 1 ? (
        <a href={ctx.url(`${archive.basePath}?page=${archive.page - 1}`)}>Trang trước</a>
      ) : null}
      {archive.page < archive.totalPages ? (
        <a href={ctx.url(`${archive.basePath}?page=${archive.page + 1}`)}>Trang sau</a>
      ) : null}
    </section>
  );
}
```

Luôn truyền đường dẫn nội bộ của content và archive qua `ctx.url()`. Hàm này thêm đúng tiền tố ngôn ngữ và giữ nguyên query string. Các path trong `ctx.alternates` đã hoàn chỉnh nên **không** truyền qua `ctx.url()`.

## Bước 6: Đăng ký template

Template `page` là bắt buộc. Các template nội dung khác có thể dùng `page` làm fallback; riêng archive route cần có `archive`.

```tsx
export default defineTheme<Settings>({
  manifest,
  Layout,
  templates: {
    home: Home,
    page: Page,
    post: Post,
    archive: Archive,
    notFound: NotFound,
    error: ErrorPage,
  },
  blocks,
});
```

| Request | Template do runtime chọn |
| --- | --- |
| `/` có nội dung trang chủ | `home`, fallback sang `page` |
| Nội dung có key là `post` | `post`, fallback sang `page` |
| Nội dung khác | `page` |
| Archive của content type, ví dụ `/blog` | `archive` |
| Đường dẫn không tồn tại | `notFound` |

## Bước 7: Hiển thị block

Gọi `ctx.renderBlocks(content.blocks)` thay vì tự lặp qua danh sách block trong từng template. Đăng ký component cho mỗi loại block mà theme hỗ trợ.

```tsx
import type { BlockProps } from "@zcmsorg/theme-sdk";

function value(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function Hero({ props }: BlockProps<Record<string, unknown>, Settings>) {
  return (
    <section>
      <h2>{value(props.heading)}</h2>
      {props.subheading ? <p>{value(props.subheading)}</p> : null}
    </section>
  );
}

const blocks = {
  "core/hero": Hero,
  "core/richtext": RichText,
  "core/features": Features,
  "core/image": ImageBlock,
  "core/cta": CallToAction,
};
```

Tên loại block phải có namespace. Trong môi trường development, block chưa được theme hỗ trợ sẽ hiện cảnh báo; trong production, block đó bị bỏ qua. Vì vậy cần kiểm tra tất cả loại block mà website mục tiêu đang dùng.

## Bước 8: Hiển thị menu, asset và link đa ngôn ngữ

- Đọc vị trí menu từ `ctx.menus.primary`, `ctx.menus.footer` hoặc key khác đã khai báo trong `theme.json`.
- Dùng `ctx.url(path)` cho link nội bộ.
- Dùng `ctx.asset("assets/logo.png")` cho file nằm trong package theme.
- Dùng `ctx.site.brand` cho logo và màu chính của website.
- Dùng `ctx.settings` cho thiết lập do theme khai báo.
- Dùng `ctx.alternates` để tạo bộ chuyển ngôn ngữ.

## Bước 9: Kiểm tra toàn bộ luồng nội dung

Trước khi đóng gói, hãy kiểm tra:

1. Page có và không có excerpt.
2. Page chứa tất cả core block mà theme hỗ trợ.
3. Bài viết có và không có tác giả hoặc ngày xuất bản.
4. Archive blog rỗng và archive có nhiều trang.
5. Custom field bị thiếu hoặc có giá trị sai kiểu.
6. Ngôn ngữ mặc định và ngôn ngữ phụ, đặc biệt là link phân trang archive.
7. Block chưa được hỗ trợ để xác nhận page vẫn hiển thị.

Tiếp theo, xem cách [tích hợp theme với plugin](/vi/developers/theme-handbook/plugin-integration/).
