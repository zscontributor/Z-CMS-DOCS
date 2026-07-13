---
title: Media
description: Upload, organize and use images and files.
sidebar:
  order: 5
---

Media Library organizes files in folders and generates image variants in the background so uploads remain responsive.

## Common actions

- Drag and drop multiple files to upload them.
- Create folders by campaign or content type.
- Select multiple files to move or delete them.
- Add alt text to improve accessibility and SEO.

Do not upload sensitive information when a file will be used on a public website.

## Browse, search, and filter

While browsing, the library shows only the current folder and a breadcrumb identifies its location. Search always covers the entire library, not just the open folder. You can filter images and documents; each page displays up to 24 items.

## Folders and metadata

Users with media update permission can create, rename, and move folders; rename or move files; and edit alt text. Deleting a file or folder requires `media:delete`. Before deletion, check whether the asset is used by content, theme settings, or the site brand.

## Image variants

An upload completes before the worker finishes derived image sizes. If the original exists but a thumbnail is missing, inspect **Jobs** and worker health instead of uploading the file repeatedly.

:::tip
Use descriptive filenames, a stable folder structure, and alt text that communicates the image's purpose in context. Avoid SEO keyword stuffing.
:::
