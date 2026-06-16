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
import { localeAwareInput } from "./sanity/components/LocaleArrayInput";
import { LOCALES } from "./lib/i18n";

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
      // Locale pre-filled on new documents; the others are added on demand.
      defaultLanguages: ["nl"],
      fieldTypes: ["string", "text"],
      // NB: no `languageFilter` here on purpose. The plugin's built-in
      // @sanity/language-filter is a per-user, per-browser funnel that does not
      // reliably hide EN/FR by default. We collapse them deterministically for
      // every editor via the custom input registered in `form.components` below.
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  form: {
    components: {
      // Localized fields show only Dutch by default; EN/FR fold behind a
      // per-field toggle. See sanity/components/LocaleArrayInput.tsx.
      input: localeAwareInput,
    },
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
