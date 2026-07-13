---
title: Render pages and blog posts
description: Learn how site-runtime supplies content to a theme and how to render pages, posts, archives, fields, blocks, menus, and localized links.
sidebar:
  order: 2
---

A Z-CMS theme does **not** call the Content API to load pages or blog posts. For every public URL, `site-runtime` resolves the site and passes the result to the active theme. The theme only renders the data it receives.

The request flow is:

1. A visitor opens a public URL.
2. `site-runtime` calls the internal Render API once.
3. The API resolves the hostname, locale, route, published content, menus, theme settings, and active plugin capabilities.
4. `site-runtime` selects the appropriate theme template.
5. The template renders `content`, `archive`, and `ctx`.

:::caution[Do not call the Render API from a theme]
The internal request is `GET /api/v1/render/resolve`, authenticated with an internal token. It is owned by `site-runtime`, not by theme code. Do not import an API client, call `fetch`, or copy this token into a theme.
:::

## Step 1: Import the template types

Use types from `@zcmsorg/theme-sdk` so that template inputs remain aligned with the runtime contract.

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

Do not import types from `cms-api`, `site-runtime`, Prisma, or other Z-CMS internals.

## Step 2: Render a page

The runtime passes the matched published page as `content`.

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

The most commonly used `content` fields are:

| Field | Use |
| --- | --- |
| `title` | Page or post title |
| `excerpt` | Optional summary |
| `path` | Final content path before locale handling |
| `contentType.key` | Content type, such as `page` or `post` |
| `data` | Custom fields defined for the content type |
| `blocks` | Block document created in the editor |
| `publishedAt` | Publication date or `null` |
| `author` | Author information or `null` |
| `seo` | Resolved per-content SEO input |

Only published content enters the public render payload. A theme does not need to filter out drafts.

## Step 3: Read custom fields safely

Values in `content.data` are JSON and therefore have the type `unknown`. Validate each value before rendering it.

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

Do not cast all of `content.data` to a trusted interface unless the theme also validates the values at runtime. Site owners can change content-type fields without publishing a new theme version.

## Step 4: Render an individual blog post

When `content.contentType.key` is `post`, `site-runtime` selects `templates.post`. If the theme does not provide it, the runtime falls back to `templates.page`.

```tsx
function Post({ ctx, content }: PageTemplateProps<Settings>) {
  const date = content.publishedAt
    ? new Date(content.publishedAt).toLocaleDateString(ctx.locale)
    : "";

  return (
    <article>
      <a href={ctx.url("/blog")}>Back to the blog</a>
      <h1>{content.title}</h1>
      <p>{[date, content.author?.name].filter(Boolean).join(" · ")}</p>
      {content.excerpt ? <p>{content.excerpt}</p> : null}
      {ctx.renderBlocks(content.blocks)}
    </article>
  );
}
```

## Step 5: Render the blog listing

An archive route such as `/blog` receives `archive`, not `content`. The runtime supplies the published items and pagination information.

```tsx
function Archive({ ctx, archive }: ArchiveTemplateProps<Settings>) {
  return (
    <section>
      <h1>{archive.title}</h1>

      {archive.items.length === 0 ? (
        <p>No posts yet.</p>
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
        <a href={ctx.url(`${archive.basePath}?page=${archive.page - 1}`)}>Previous</a>
      ) : null}
      {archive.page < archive.totalPages ? (
        <a href={ctx.url(`${archive.basePath}?page=${archive.page + 1}`)}>Next</a>
      ) : null}
    </section>
  );
}
```

Always pass site-relative content and archive paths through `ctx.url()`. It adds the correct locale prefix and preserves query strings. The paths in `ctx.alternates` are already final and must **not** be passed through `ctx.url()`.

## Step 6: Register the templates

The `page` template is required. Other content templates fall back to it, except an archive route, which requires `archive`.

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

| Request | Template selected by the runtime |
| --- | --- |
| `/` with homepage content | `home`, then `page` as fallback |
| A content item whose key is `post` | `post`, then `page` as fallback |
| Any other content item | `page` |
| A content-type archive such as `/blog` | `archive` |
| An unmatched path | `notFound` |

## Step 7: Render blocks

Call `ctx.renderBlocks(content.blocks)` instead of iterating over the block document in every template. Register a component for each block type the theme supports.

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

Block type names are namespaced. An unknown block is shown as a warning during development and skipped in production, so test every block type used by the target site.

## Step 8: Render menus, assets, and localized links

- Read menu locations from `ctx.menus.primary`, `ctx.menus.footer`, or another key declared in `theme.json`.
- Use `ctx.url(path)` for internal links.
- Use `ctx.asset("assets/logo.png")` for files shipped inside the theme.
- Use `ctx.site.brand` for the site-level logo and primary color.
- Use `ctx.settings` for settings declared by this theme.
- Use `ctx.alternates` to build a language switcher.

## Step 9: Verify the complete content flow

Before packaging, test:

1. A page with and without an excerpt.
2. A page containing every supported core block.
3. A post with and without an author or publication date.
4. An empty blog archive and an archive with multiple pages.
5. Custom fields with missing or unexpected values.
6. Default and non-default locales, especially archive pagination links.
7. An unknown block type to confirm that the page still renders.

Next, learn how to [integrate the theme with plugins](/en/developers/theme-handbook/plugin-integration/).
