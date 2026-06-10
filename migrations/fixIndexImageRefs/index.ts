import { at, defineMigration, unset } from "sanity/migrate";

/* Removes the legacy inline-image value left on `service.indexImage` in stale
   drafts (pre photo-library refactor: `{_type:"image", alt:[…]}`). The field is
   now a reference; selecting a photo over the stale value fails with
   "Key 'alt' not allowed in ref". Unsetting clears it so a clean reference can
   be written. Idempotent — skips proper references and unset fields.

   Run:  npx sanity migration run fixIndexImageRefs              (dry-run)
         npx sanity migration run fixIndexImageRefs --no-dry-run (apply) */
export default defineMigration({
  title: "Unset legacy inline-image value on service.indexImage",
  documentTypes: ["service"],
  migrate: {
    document(doc) {
      const v = (doc as { indexImage?: { _type?: string; _ref?: string } }).indexImage;
      if (v && (v._type !== "reference" || !v._ref)) {
        return at("indexImage", unset());
      }
    },
  },
});
