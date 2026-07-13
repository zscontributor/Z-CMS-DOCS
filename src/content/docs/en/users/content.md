---
title: Content and publishing
description: Create, edit, translate and publish content.
sidebar:
  order: 4
---

Each content type has a schema that defines its allowed fields. Admin generates the editing interface from this schema so data stays consistent.

## Basic workflow

1. Open **Content** and choose a content type.
2. Select **Create**.
3. Enter the title, slug, body and required fields.
4. Save a **Draft** or select **Publish**.
5. Use **Preview** before making the entry public.

## Multilingual content

Translations are linked in one translation group. Each locale still has its own slug, status and content.

:::caution
Deleting one translation does not automatically delete the other locales in the group.
:::

## Find and filter content

The content list supports keyword search, status filters, and pagination. Each row shows the public path, last update, and author. A singleton type, such as a home or about page, opens directly in the editor because each site has only one entry.

## Status and permissions

- **Draft** is available only in Admin and protected previews.
- **Published** can appear publicly when the site itself is also Published.
- Authors can create and edit permitted content but cannot publish.
- Editors and higher roles can publish, unpublish, and delete content.

The slug forms the public path. Before changing the slug of published content, check internal links and plan a redirect.

## Blocks, fields, and SEO

The editor can contain schema-defined fields, a block area, and SEO fields. Use only blocks supported by the content type and theme. Set a dedicated SEO title and description when the editorial title is not suitable for search results.

## Pre-publication checklist

- Required fields, slug, and locale are correct.
- Images have alt text; links and calls to action work.
- Mobile layout, SEO metadata, and preview were checked.
- Related translations do not point to the wrong locale or stale content.
