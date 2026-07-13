---
title: Integrate a theme with plugins
description: Use plugin capabilities and namespaced blocks without coupling a theme to plugin internals.
sidebar:
  order: 3
---

Themes and plugins do not import each other. A plugin advertises a capability, the render payload reports which capabilities are active, and the theme checks them through `ctx.hasCapability()`.

:::note[What a capability contains]
A capability is only a feature identifier, such as `commerce.products` or `reviews.summary`. It is not plugin data and does not grant the theme access to plugin settings, storage, database tables, or APIs.
:::

## Step 1: Define the public contract

Choose a stable, namespaced capability that describes the feature rather than a specific implementation.

Good examples:

- `reviews.summary`
- `commerce.products`
- `search.facets`

Avoid names tied to an installation or version, such as `acme-plugin-v2-installed`.

Also decide where the public data will come from:

- Use block props when the data is part of the saved page document.
- Use a field in the platform render payload when the data must be generated dynamically for every request. Adding such a field requires a Z-CMS core contract change.
- Do not make the theme call a private plugin or CMS endpoint.

## Step 2: Advertise the capability from the plugin

Add the capability to the plugin's `plugin.json`:

```json
{
  "id": "com.acme.plugin.reviews",
  "capabilities": ["reviews.summary"]
}
```

Only an installed **and active** plugin contributes capabilities to the site's render payload. Deactivating the plugin removes them.

## Step 3: Declare the capability as optional in the theme

Add the capability to `theme.json`:

```json
{
  "id": "com.acme.theme.storefront",
  "optionalCapabilities": ["reviews.summary"]
}
```

It is optional by design. A theme must still render when the plugin is absent, inactive, or replaced.

## Step 4: Detect the feature in a template

Use `ctx.hasCapability()` and provide a fallback.

```tsx
function ProductPage({ ctx, content }: PageTemplateProps<Settings>) {
  const reviewsEnabled = ctx.hasCapability("reviews.summary");

  return (
    <article>
      <h1>{content.title}</h1>
      {ctx.renderBlocks(content.blocks)}
      {!reviewsEnabled ? <p>Reviews are not available.</p> : null}
    </article>
  );
}
```

Capability detection answers only “is a provider active?”. It does not return reviews or other plugin records.

## Step 5: Render a plugin-related block

If the page document contains a namespaced block with public data in its props, register its renderer in the theme.

Example block stored in `content.blocks`:

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

Theme component:

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
    <section aria-label="Reviews">
      <strong>{average.toFixed(1)} / 5</strong>
      <span>{count} reviews</span>
    </section>
  );
}

const blocks = {
  "core/hero": Hero,
  "core/richtext": RichText,
  "acme/review-summary": ReviewSummary,
};
```

Validate plugin-related block props exactly as you validate core block props. They are JSON values and may be missing or come from an older plugin version.

## Step 6: Handle missing and changed plugins

Test all of these states:

1. The plugin is not installed.
2. The plugin is installed but inactive.
3. The plugin is active and the expected block data is present.
4. The capability exists but the block props are empty or from an older schema.
5. The page contains the block but the plugin no longer provides the capability.

The page must remain usable in every state. Do not make navigation, the page title, or the primary content depend entirely on an optional capability.

## Current contract limits

The current Theme SDK does **not** provide a generic method to:

- call a plugin from a theme;
- read plugin settings or plugin storage;
- query plugin-owned database tables;
- fetch arbitrary plugin data through `ctx.hasCapability()`;
- register a new dynamic payload shape from a package alone.

If a feature needs request-time data, first add a safe, public field to the Z-CMS render contract and populate it in core. The theme can then render that field without receiving plugin credentials or direct database access. Until that contract exists, documenting a private API call would produce a theme that is unsupported and unsafe.

See [Render pages and blog posts](/en/developers/theme-handbook/rendering-content/) for the complete template data flow.
