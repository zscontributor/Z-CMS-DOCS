---
title: Feature overview
description: A map of the main Z-CMS Admin features and their detailed guides.
sidebar:
  order: 2
---

Z-CMS is multi-tenant: one platform manages many websites while data and settings remain site-scoped. Admin features appear according to the current account's role and selected site.

| Area | What you can do | Guide |
| --- | --- | --- |
| Sites | Create sites, claim hostnames, set branding, publish/unpublish | [Manage multiple sites](/en/users/sites/) |
| Content | Create pages/posts, use blocks, translate, preview, and publish | [Content and publishing](/en/users/content/) |
| Media | Upload, search, organize folders, and edit alt text | [Media](/en/users/media/) |
| Marketplace | Discover and install signed packages | [Themes and plugins](/en/users/extensions/) |
| Appearance | Activate themes, configure schemas, and seed demos | [Appearance and themes](/en/users/appearance/) |
| Users / Profile | Invite members, assign roles, change passwords, enable 2FA | [Users and security](/en/users/users-security/) |
| Settings → Mail | Configure SMTP and send a test | [Mail and background jobs](/en/users/operations/) |
| Jobs | Inspect and retry dead-letter queue jobs | [Mail and background jobs](/en/users/operations/) |
| zAI | Manage pages and posts with natural language | [zAI Content Operator](/en/users/zai/) |

## Determine the scope of a change

The site switcher decides which site receives content, media, appearance, plugin, and mail changes. The **Sites** screen instead lists every site the account may see. If a menu or action is absent, verify both the selected site and your role before treating it as a product failure.

## Background components

The worker processes image variants, mail, sitemaps, and plugin hooks. Marketplace synchronizes revoked-package data. The audit log records security events and important operations, including actions performed through zAI.
