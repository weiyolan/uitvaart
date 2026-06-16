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
      // import needed. Only `nl` is shown by default on these document types;
      // EN/FR fold behind the "Filter languages" funnel until an editor reveals
      // them. The selection is remembered per user/browser.
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
