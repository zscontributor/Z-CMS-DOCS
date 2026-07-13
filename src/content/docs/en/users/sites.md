---
title: Manage multiple sites
description: Create sites and configure hostnames, branding, and publication status.
sidebar:
  order: 3
---

One Z-CMS deployment can run many independent websites. Each site has its own hostname, content, languages, theme, settings, and memberships while sharing the same operating platform.

## View and switch sites

Open **Sites** to see each site's name, slug, status, hostnames, active theme, and brand. Before changing content, media, plugins, or settings, verify the current site in the site switcher.

## Create a site

Only an **Owner** can create a site because a hostname must be unique across the platform.

1. Open **Sites** and find **New site**.
2. Enter a name. Z-CMS suggests a slug, which remains editable.
3. Enter a hostname without a protocol, such as `news.example.com` or `localhost:3100` in development.
4. Select the default language and create the site.
5. Configure its brand, theme, and content before publishing.

A new site starts as a **Draft**, so visitors cannot reach it until you select **Publish**.

## Brand across themes

On the site detail page, set the **Primary color** and choose a logo from the Media Library. Themes receive these values from the site's brand, so changing themes preserves the basic identity. Check the logo previews on both light and dark backgrounds.

## Publish and unpublish

- **Publish** lets site-runtime serve the website on its configured hostname.
- **Unpublish** returns it to Draft without deleting content or settings.
- Site publication is separate from content publication; both the site and an entry must be public for visitors to see it.

:::caution
Before publishing, verify DNS/TLS, make sure the hostname contains no path, and confirm that the active theme renders a valid home page.
:::

## Access control

Viewers, Authors, and Editors can view site information. Admins can update the name, brand, and status. Only Owners can create or delete sites.
