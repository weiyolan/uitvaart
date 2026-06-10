import { migrateToLanguageField } from "sanity-plugin-internationalized-array/migrations";

/* Adds the `language` field to any v4 `_key`-only localized-array items
   (e.g. stale drafts that predate the v5 plugin upgrade). Content is
   preserved — only the field is added — and it runs on drafts + published.
   Idempotent: harmless on already-migrated items.

   Run:  npx sanity migration run migrateToLanguageField              (dry-run)
         npx sanity migration run migrateToLanguageField --no-dry-run (apply) */
export default migrateToLanguageField([
  "service",
  "homePage",
  "siteSettings",
  "photo",
]);
