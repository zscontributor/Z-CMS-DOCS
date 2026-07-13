---
title: Architecture overview
description: Understand the main components and trust boundaries in Z-CMS.
sidebar:
  order: 1
---

Z-CMS separates the API, public renderer, Admin, plugin runtime and worker into independent processes.

## Components

| Component | Responsibility |
| --- | --- |
| `cms-api` | Authentication, RBAC, content, media, marketplace and render API |
| `site-runtime` | Renders public sites with the active theme |
| `admin-web` | Administration interface |
| `plugin-runtime` | Runs plugins in a V8 isolate without holding credentials |
| `worker` | Media variants, email, sitemaps and deferred jobs |

## Security boundaries

- Tenant isolation is enforced by PostgreSQL Row-Level Security.
- Plugin code never runs inside the API process.
- A package is installed only after its signature and integrity are verified.

These boundaries are platform invariants, not optional conventions for extension developers.
