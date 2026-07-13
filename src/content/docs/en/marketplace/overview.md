---
title: Marketplace overview
description: Learn how Z-CMS distributes plugins and themes.
sidebar:
  order: 1
---

Z-CMS Marketplace is managed and operated by Z-SOFT. Developers can publish plugins and themes, while users discover and install packages directly from Admin.

The Marketplace handles discovery, publisher identity, package review, version metadata and the revocation feed. A runtime trusts only packages whose signatures match its pinned public key.

The publisher signs the artifact with the key created by `zcms keygen`. During intake, Marketplace verifies that signature, scans the package and adds its own co-signature. The co-signed package is served only after human approval, and Z-CMS verifies the Marketplace signature before installation.

## Listing requirements

- Description and screenshots.
- Version and changelog.
- Z-CMS compatibility.
- Requested permissions.
- Data and privacy policy.
- Support and documentation URLs.
- Security contact.

See [Publish a package](/en/marketplace/publishing/) for the complete upload, review, signing and release workflow.
