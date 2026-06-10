import { defineField, defineType } from "sanity";
import { SearchIcon } from "@sanity/icons";

/* Reusable SEO object — optional overrides; pages fall back to their own
   content (coalesced in GROQ) when these are empty. */
export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  icon: SearchIcon,
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      description: "Overrides the page title in search results if provided.",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      description: "± 150 characters. Shown in search results and link previews.",
      type: "internationalizedArrayText",
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      description: "Pick a photo from the library. 1200×630 works best for link previews.",
      type: "reference",
      to: [{ type: "photo" }],
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
