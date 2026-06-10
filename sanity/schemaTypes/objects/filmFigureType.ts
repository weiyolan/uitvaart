import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";
import { nlValue } from "../utils";

/* A film frame: film-stock labelling (always shown) plus an optional real
   scan. While no image is uploaded the frontend renders the striped
   FilmFrame placeholder with these labels. */
export const filmFigureType = defineType({
  name: "filmFigure",
  title: "Film frame",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "tag",
      title: "Film stock",
      description: "e.g. “Kodak Portra 400” — shared across languages.",
      type: "string",
    }),
    defineField({
      name: "meta",
      title: "Caption",
      description: "Small label under the frame, e.g. “De mensen samen”.",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "corner",
      title: "Corner notation",
      description: "e.g. “6×7 · A” — shared across languages.",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Scan",
      description: "Optional real photograph. The placeholder is shown until one is uploaded.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          description: "Describe the photograph for search engines and screen readers.",
          type: "internationalizedArrayString",
          validation: (rule) =>
            rule.custom((alt, context) => {
              const parent = context.parent as { asset?: unknown } | undefined;
              if (parent?.asset && !nlValue(alt)) {
                return "Alt text is required when a scan is uploaded (important for SEO).";
              }
              return true;
            }),
        }),
      ],
    }),
  ],
  preview: {
    select: { tag: "tag", corner: "corner", meta: "meta", media: "image" },
    prepare({ tag, corner, meta, media }) {
      return {
        title: tag || "Film frame",
        subtitle: [nlValue(meta), corner].filter(Boolean).join(" — "),
        media,
      };
    },
  },
});
