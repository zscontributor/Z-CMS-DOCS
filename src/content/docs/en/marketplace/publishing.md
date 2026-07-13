---
title: Publish a package
description: Prepare and submit a plugin or theme to the Marketplace.
sidebar:
  order: 2
---

This workflow starts after the plugin or theme has passed its local tests. Submit the same artifact that you verified locally; do not rebuild it during review.

## Step 1: Generate and register a publisher key

Generate an Ed25519 key pair once for the publisher:

```bash
zcms keygen --out ./keys
```

This creates `publisher-private.pem` with mode `0600` and `publisher-public.pem`. Back up the private key securely; never commit, upload or paste it into a web form.

Open **Developer Portal → Publisher** and register:

1. A slug of 3–40 lowercase letters, digits or hyphens, without a leading or trailing hyphen.
2. The display name.
3. An optional contact email.
4. The complete contents of `publisher-public.pem`.

The public key may belong to only one publisher. If a private key is ever pasted or exposed, treat it as compromised and generate a new pair.

## Step 2: Prepare the listing

The public listing is built from the signed manifest. Complete the following before packing:

1. Reverse-DNS `id`, display `name`, semantic `version`, `description` and `author`.
2. Compatible Z-CMS range in `engine`.
3. Built `entry`, normally `dist/index.js`.
4. Plugin `permissions`, capabilities and settings, or theme templates and settings.
5. Up to three screenshots in `media.screenshots`; each must be PNG, JPEG or WebP, at most 2 MB and 4096 px per side.
6. An optional external HTTPS video URL in `media.video`.

An update that adds permissions or changes data processing must call out the change explicitly. Do not hide a permission increase in a general changelog entry.

## Step 3: Produce one release artifact

Build from a clean checkout using the committed lockfile and the toolchain version documented by the project.

1. Run typecheck, lint and unit tests.
2. Confirm that the manifest version and built entry are correct.
3. Pack the built directory with the publisher key:

   ```bash
   zcms pack ./path/to/built-package --kind plugin \
     --key ./keys/publisher-private.pem \
     --pub ./keys/publisher-public.pem \
     --out ./release/package.zcms
   ```

   Use `--kind theme` for a theme.

4. Record the checksum printed by `zcms pack`.
5. Verify the publisher signature:

   ```bash
   zcms verify ./release/package.zcms
   ```

6. Pack the same built directory again when checking reproducibility; the CLI sorts files and zeroes archive timestamps, so the checksum should match.

If the checksums differ, find and remove nondeterministic inputs such as timestamps, unordered file lists or unpinned dependencies before submitting.

## Step 4: Upload and submit

Open **Developer Portal → Submit a package**, choose the `.zcms` file and select **Submit for review**. The upload limit is 20 MB, and each developer account may submit at most 10 packages in a sliding hour.

The portal does not ask you to select a publisher, package id or version. It reads these values from the signed envelope and resolves the publisher from the registered public key.

For API upload, send an authenticated `multipart/form-data` request to `POST /developer/submissions` with the file in the `file` field. Use `GET /developer/submissions` to list your submissions.

## Step 5: Automated validation

Marketplace performs intake in this order:

1. Open the archive without executing it and recompute the payload checksum.
2. Resolve the registered publisher from the public key and verify that the signed-in developer owns it.
3. Verify the publisher signature against the registered key, not a key supplied only by the package.
4. Validate media and run the static scanner.
5. Add the Marketplace co-signature and store the accepted artifact.

A scanner `reject` returns an error and creates no version. A scanner `flag` creates a `QUARANTINED` version with findings attached. A clean scan creates a `PENDING` version; it is not an approval.

## Step 6: Manual review

Every third-party `PENDING` or `QUARANTINED` version requires a human decision. The persisted states are `PENDING`, `QUARANTINED`, `APPROVED` and `REJECTED`. The Developer Portal and notifications show the result; a rejection includes a reason.

When changes are requested:

1. Read the rejection note and scanner findings.
2. Update source, tests and manifest.
3. Increment the version.
4. Build, sign and verify a new `.zcms` artifact.
5. Submit the new version.

Versions are immutable. Re-uploading different bytes under an existing version is refused; re-uploading identical bytes keeps the existing verdict.

## Step 7: Marketplace signing

`zcms pack` creates the publisher signature. During intake—after publisher verification and scanning—Marketplace adds a second signature over the same checksum and stores the co-signed `.zcms` file.

The Marketplace co-signature does not make a pending package public. Only an `APPROVED` and non-revoked version is served by the registry. Z-CMS runtimes verify the co-signature with their pinned `MARKETPLACE_PUBLIC_KEY` before installation.

## Step 8: Publish and verify

Approval makes the version available in the public registry. After approval:

1. Open the public listing and verify metadata, screenshots and changelog.
2. Install the package on a clean test site from Marketplace.
3. Confirm that signature verification succeeds.
4. Activate the package with only its documented permissions.
5. Run a short smoke test and verify uninstall or rollback behavior.

To verify a package downloaded from Marketplace outside the runtime, use the trusted Marketplace public key:

```bash
zcms verify ./downloaded-package.zcms --marketplace-key ./marketplace-public.pem
```

## Step 9: Maintain the release

Monitor the support channel and security contact. Publish fixes as new semantic versions; do not mutate an existing release.

For a security issue, coordinate disclosure, submit the fixed package and request revocation of affected versions when necessary. Runtimes synchronize the signed revocation feed and quarantine revoked packages.
