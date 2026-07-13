---
title: Users, roles, and account security
description: Invite members, assign roles, change passwords, and enable two-factor authentication.
sidebar:
  order: 8
---

Z-CMS grants access through per-site memberships. One person can hold different roles on different sites.

## Default roles

| Role | Main capabilities |
| --- | --- |
| Viewer | Read sites, content, media, themes, plugins, and settings |
| Author | Create content, edit allowed content, upload and update media |
| Editor | Publish/delete content, delete media, and manage menus |
| Admin | Configure sites, content types, themes, plugins, mail, and invite users |
| Owner | Create/delete sites, manage users, and review quarantined packages |

Roles are explicit permission bundles, not a substitute for resource-level checks. Authors cannot publish, and Admins cannot promote themselves to Owner.

## Invite a member

1. Open **Users** and select the site that needs access.
2. Enter an email address and choose a role equal to or below your highest role.
3. Send the invitation and track it under **Pending invitations**.
4. The recipient follows the link, signs in or creates an account, and accepts the membership.

Admins can view and invite members. Only Owners can change another member's role or remove access.

## Profile and password

Every signed-in user can open **Profile** to update their own name, avatar, and password. Email is the login identity and may be read-only depending on system policy.

## Two-factor authentication

In **Profile**, enable TOTP, scan the QR code with an authenticator app, and enter a code to finish setup. Store recovery codes somewhere safe and separate from the device that generates codes.

:::danger
Each recovery code is single-use. Do not store codes in public notes, support tickets, or alongside a shared signed-in session.
:::

If an account may be compromised, change its password, revoke sessions where available, review memberships, and ask an Admin or Owner to inspect the audit log.
