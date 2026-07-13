---
title: Mail and background jobs
description: Configure SMTP, send a test message, and recover failed background work.
sidebar:
  order: 9
---

Z-CMS processes email, image variants, sitemaps, and some plugin hooks in a worker so web requests do not wait for expensive tasks.

## Per-site mail settings

Open **Settings → Mail**. Typical fields include SMTP host, port, encryption, username, password, sender name, and sender address. Settings belong to the current site, so switch sites before editing them.

1. Enter the details supplied by your email provider.
2. Save the configuration.
3. Use **Send test email** with an address you control.
4. Check the inbox, spam folder, and provider logs.

`settings:read` gives read-only access, `settings:update` permits changes, and `mail:send` separately permits sending. The page also lists plugins granted `mail:send`, making it clear which extensions can use the site's sender identity.

:::caution
Do not paste an SMTP password into a ticket or screenshot. Send another test immediately after rotating credentials.
:::

## Failed jobs

Open **Jobs** to inspect the dead-letter queue. Each entry is work that exhausted its attempts, such as an email, image conversion, sitemap refresh, or plugin hook.

To handle a failure:

1. Read the job name, time, attempt count, and error message.
2. Fix the root cause, such as invalid SMTP details, storage permissions, or a failing plugin.
3. Retry only after the cause is addressed.
4. Confirm the job leaves the list and its expected output exists.

The page displays up to 50 items. When it warns that results are truncated, process them in batches and continue checking. Repeated retries before a fix can add load or send duplicate mail.
