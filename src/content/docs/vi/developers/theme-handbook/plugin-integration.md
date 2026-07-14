---
title: Tích hợp theme với plugin
description: Sử dụng capability và block có namespace mà không làm theme phụ thuộc vào code nội bộ của plugin.
sidebar:
  order: 3
---

Theme và plugin không import lẫn nhau. Plugin công bố một capability, render payload cho biết capability nào đang hoạt động và theme kiểm tra bằng `ctx.hasCapability()`.

:::note[Capability chứa gì?]
Capability chỉ là mã nhận diện tính năng, ví dụ `commerce.products` hoặc `reviews.summary`. Nó không chứa dữ liệu của plugin và không cho theme quyền truy cập plugin settings, storage, database table hoặc API.
:::

## Bước 1: Xác định public contract

Chọn một capability ổn định, có namespace và mô tả tính năng thay vì tên implementation cụ thể.

Ví dụ phù hợp:

- `reviews.summary`
- `commerce.products`
- `search.facets`

Không nên dùng tên gắn với một lần cài hoặc phiên bản như `acme-plugin-v2-installed`.

Tiếp theo, xác định nguồn của dữ liệu công khai:

- Dùng block props nếu dữ liệu là một phần của page document đã lưu.
- Dùng một field trong platform render payload nếu dữ liệu phải được tạo động cho mỗi request. Cách này cần thay đổi contract của Z-CMS core.
- Không để theme gọi endpoint riêng của plugin hoặc CMS.

## Bước 2: Công bố capability từ plugin

Thêm capability vào `plugin.json` của plugin:

```json
{
  "id": "com.acme.plugin.reviews",
  "capabilities": ["reviews.summary"]
}
```

Chỉ plugin đã cài **và đang hoạt động** mới đóng góp capability vào render payload của website. Khi plugin bị tắt, capability cũng biến mất.

## Bước 3: Khai báo capability tùy chọn trong theme

Thêm capability vào `theme.json`:

```json
{
  "id": "com.acme.theme.storefront",
  "optionalCapabilities": ["reviews.summary"]
}
```

Capability này phải là tùy chọn. Theme vẫn phải hiển thị được khi plugin chưa cài, bị tắt hoặc được thay bằng plugin khác.

## Bước 4: Kiểm tra tính năng trong template

Dùng `ctx.hasCapability()` và luôn có cách hiển thị thay thế.

```tsx
function ProductPage({ ctx, content }: PageTemplateProps<Settings>) {
  const reviewsEnabled = ctx.hasCapability("reviews.summary");

  return (
    <article>
      <h1>{content.title}</h1>
      {ctx.renderBlocks(content.blocks)}
      {!reviewsEnabled ? <p>Tính năng đánh giá hiện không khả dụng.</p> : null}
    </article>
  );
}
```

Capability chỉ trả lời câu hỏi “có provider đang hoạt động hay không?”. Nó không trả về review hoặc record khác của plugin.

## Bước 5: Hiển thị block liên quan đến plugin

Nếu page document chứa block có namespace và dữ liệu công khai nằm trong props, hãy đăng ký component hiển thị block đó trong theme.

Ví dụ block được lưu trong `content.blocks`:

```json
{
  "id": "review-summary-1",
  "type": "acme/review-summary",
  "props": {
    "average": 4.8,
    "count": 124
  }
}
```

Component trong theme:

```tsx
interface ReviewSummaryProps {
  average?: unknown;
  count?: unknown;
}

function ReviewSummary({
  ctx,
  props,
}: BlockProps<ReviewSummaryProps, Settings>) {
  if (!ctx.hasCapability("reviews.summary")) return null;

  const average = typeof props.average === "number" ? props.average : 0;
  const count = typeof props.count === "number" ? props.count : 0;

  return (
    <section aria-label="Đánh giá">
      <strong>{average.toFixed(1)} / 5</strong>
      <span>{count} lượt đánh giá</span>
    </section>
  );
}

const blocks = {
  "core/hero": Hero,
  "core/richtext": RichText,
  "acme/review-summary": ReviewSummary,
};
```

Hãy kiểm tra props của block do plugin cung cấp giống như core block. Đây là giá trị JSON, có thể bị thiếu hoặc đến từ phiên bản plugin cũ.

## Bước 6: Xử lý khi plugin bị thiếu hoặc thay đổi

Kiểm tra tất cả trạng thái sau:

1. Plugin chưa được cài.
2. Plugin đã cài nhưng chưa hoạt động.
3. Plugin đang hoạt động và có đầy đủ block data.
4. Capability tồn tại nhưng block props rỗng hoặc dùng schema cũ.
5. Page còn block nhưng plugin không còn cung cấp capability.

Page phải sử dụng được trong mọi trạng thái. Không để navigation, tiêu đề hoặc nội dung chính phụ thuộc hoàn toàn vào một capability tùy chọn.

## Giới hạn của contract hiện tại

Theme SDK đã có contract dùng chung để theme tích hợp **gián tiếp** với plugin:
`ctx.hasCapability()` phát hiện tính năng, `ctx.getIntegration()` đọc phần dữ liệu
công khai do core allow-list, và `ctx.renderSlot()` đặt UI tương tác do runtime
quản lý. Theme không import plugin và không nhận credential của plugin.

Contract hiện tại vẫn chưa cho phép:

- trực tiếp gọi tùy ý một plugin handler từ theme (không có
  `ctx.callPlugin()` hoặc `ctx.callCapability()`);
- đọc settings hoặc storage của plugin;
- query database table do plugin sở hữu;
- lấy dữ liệu plugin bất kỳ qua `ctx.hasCapability()`;
- để một package tự đăng ký thêm payload động mới.

Nếu tính năng cần dữ liệu hoặc action theo từng request, core phải định nghĩa và
allow-list public projection hoặc integration action tương ứng. Ví dụ hiện tại,
`ai.assistant` công khai dữ liệu hiển thị qua `getIntegration()`, đặt chat UI qua
`renderSlot("floating")`, và chỉ action `chat` được gateway cho phép. Đây không
phải một proxy tổng quát để theme gọi bất kỳ plugin nào. Hướng dẫn theme gọi
private API vẫn tạo ra theme không được hỗ trợ và không an toàn.

Xem [Hiển thị page và bài viết blog](/vi/developers/theme-handbook/rendering-content/) để hiểu đầy đủ luồng dữ liệu của template.
