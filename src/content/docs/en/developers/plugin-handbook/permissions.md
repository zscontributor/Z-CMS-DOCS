---
title: Permissions
description: Learn how plugins declare and use permissions.
sidebar:
  order: 2
---

A permission is declared in the manifest but becomes effective only after an administrator approves it. The runtime receives a short-lived scoped token, and the CMS gateway verifies its scope again on the side that owns the resource.

## Principles

- Request only the permissions required by current functionality.
- Handle cases where an administrator approves only some permissions.
- Never store a scoped token in storage or logs.
- Clearly disclose permission increases in release notes.

Permissions are not UI checks. Enforcement always happens at the CMS trust boundary.
