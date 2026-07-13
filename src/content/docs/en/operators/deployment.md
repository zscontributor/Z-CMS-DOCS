---
title: Production deployment
description: Components and safeguards required to operate Z-CMS.
sidebar:
  order: 1
---

A complete production deployment includes the API, site runtime, Admin, plugin runtime, worker, PostgreSQL, Redis and S3-compatible object storage.

## Checklist

- Use separate credentials for each service.
- Ensure the application database role is `NOBYPASSRLS` and owns no tables.
- Do not give database, S3 or session credentials to the plugin runtime.
- Pin `MARKETPLACE_PUBLIC_KEY` from a trusted source.
- Enable TLS for every public hostname.
- Run migrations before routing traffic to a new version.
- Configure backups and test restoration regularly.

:::danger
Never configure `APP_DATABASE_URL` with the database owner role. A table owner can bypass Row-Level Security and break tenant isolation.
:::
