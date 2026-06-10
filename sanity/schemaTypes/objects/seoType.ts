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
      description: "1200×630 recommended. Used for Open Graph / link previews.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "internationalizedArrayString",
        }),
      ],
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
