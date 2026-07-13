---
title: Upgrades and rollback
description: Upgrade Z-CMS safely and preserve a rollback path.
sidebar:
  order: 2
---

Before an upgrade, read the release notes, verify theme and plugin compatibility, and create a backup that you know can be restored.

## Recommended process

1. Test the new version with a sanitized copy of production data.
2. Run migrations and smoke tests in staging.
3. Pause schema changes when a migration requires it.
4. Deploy in the compatibility order documented in the release notes.
5. Check API health, queues, rendering and audit events.
6. Remove old-version resources only after the rollback window has passed.
