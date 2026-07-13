---
title: zAI Content Operator
description: Use natural language to list, create, edit, and publish content.
sidebar:
  order: 10
---

zAI manages pages and blog posts from natural-language commands. It cannot exceed the current account's privileges: every operation still passes through the Z-CMS API, permission checks, and audit log.

## Supported tasks

- List or find pages and blog posts.
- Create content as a Draft.
- Edit supported fields such as title and slug.
- Publish or unpublish content.
- Delete content after explicit confirmation.

## Write a precise request

Include the content type, status, locale, and values to change. For example:

```text
Create an English draft blog post named "Maintenance notice" with slug "maintenance-notice".
```

```text
List published pages with "services" in the title.
```

After an operation, open **Content** and verify the result, especially its slug, locale, internal links, and SEO fields.

## Destructive operations

For deletion, zAI stops and displays **Confirm deletion**. Read the referenced object before confirming and cancel if the search result is not specific enough.

:::caution
Do not put secrets, sensitive personal data, or credentials in the conversation. zAI assists with content operations; it does not replace editorial review.
:::

If zAI reports insufficient permission, use an appropriately authorized account or ask an Editor/Admin to perform the operation. Do not grant a broader role just for one task.
