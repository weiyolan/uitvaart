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
      description: "Optional photograph from the library. The placeholder is shown until one is chosen.",
      type: "reference",
      to: [{ type: "photo" }],
    }),
  ],
  preview: {
    // `image.image` follows the photo reference to the photo's image field, so
    // the chosen scan shows as the array-item thumbnail; ImageIcon when empty.
    select: { tag: "tag", corner: "corner", meta: "meta", photo: "image.image" },
    prepare({ tag, corner, meta, photo }) {
      return {
        title: tag || "Film frame",
        subtitle: [nlValue(meta), corner].filter(Boolean).join(" — "),
        media: photo || ImageIcon,
      };
    },
  },
});
