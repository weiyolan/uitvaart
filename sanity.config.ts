"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { internationalizedArray } from "sanity-plugin-internationalized-array";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { resolve } from "./sanity/presentation/resolve";
import { LOCALES } from "./lib/i18n";

/* `@sanity/language-filter` (wired in by internationalized-array below) shows
   EVERY non-pinned language by default — its `defaultLanguages` only PINS nl as
   always-visible, it does not hide EN/FR. To get a Dutch-only default we seed the
   plugin's persisted selection to "no extra languages" once per browser, so only
   nl shows until an editor reveals EN/FR via the "Filter languages" funnel (their
   choice then persists). The one-time marker means we reset stale "show all" state
   exactly once, then leave the editor in control. Coupled to the plugin's
   localStorage key (stable across the 5.x line). */
if (typeof window !== "undefined") {
  const LANG_FILTER_KEY = "@sanity/plugin/language-filter/selected-languages";
  const SEEDED_MARKER = "studio/language-filter-default-seeded/v1";
  if (!window.localStorage.getItem(SEEDED_MARKER)) {
    window.localStorage.setItem(LANG_FILTER_KEY, "[]");
    window.localStorage.setItem(SEEDED_MARKER, "1");
  }
}

/* Types that are created/ordered by the seed + structure, not via the
   "new document" menu. */
const LOCKED_TYPES = ["siteSettings", "homePage", "service"];
/* Singletons should not be deleted or duplicated from the Studio. */
const SINGLETON_TYPES = ["siteSettings", "homePage"];

export default defineConfig({
  basePath: "/studio",
  title: "Milo Weiler",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    internationalizedArray({
      languages: [...LOCALES],
      // Initial locale item created on new documents.
      defaultLanguages: ["nl"],
      fieldTypes: ["string", "text"],
      // Built-in @sanity/language-filter integration (plugin v5+): no separate
      // import needed. `documentTypes` enables the funnel on these types and
      // `defaultLanguages` pins nl as always-visible. EN/FR are hidden on first
      // load via the localStorage seed above (the plugin itself would otherwise
      // show them); editors reveal EN/FR through the "Filter languages" funnel.
      languageFilter: {
        documentTypes: ["service", "homePage", "siteSettings", "photo"],
        defaultLanguages: ["nl"],
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev) =>
      prev.filter((item) => !LOCKED_TYPES.includes(item.templateId)),
    actions: (prev, context) =>
      SINGLETON_TYPES.includes(context.schemaType)
        ? prev.filter((action) => !["delete", "duplicate", "unpublish"].includes(action.action ?? ""))
        : prev,
  },
});
