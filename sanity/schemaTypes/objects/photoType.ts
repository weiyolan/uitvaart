import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";
import { nlValue } from "../utils";

/* Central photo library. One document per photograph; the localized SEO alt
   text is managed here once and reused everywhere via references. The hotspot/
   crop set on the image apply to every placement. */
export const photoType = defineType({
  name: "photo",
  title: "Foto",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      description: "Interne naam in de bibliotheek (niet zichtbaar op de site).",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternatieve tekst",
      description:
        "Beschrijf de foto voor zoekmachines en schermlezers. Beheerd in alle talen, hergebruikt overal.",
      type: "internationalizedArrayString",
      validation: (rule) =>
        rule.custom((alt) =>
          nlValue(alt) ? true : "Alt-tekst (minstens NL) is verplicht — belangrijk voor SEO.",
        ),
    }),
    defineField({
      name: "credit",
      title: "Credit",
      description: "Optioneel — fotograaf of bronvermelding.",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title", alt: "alt", media: "image" },
    prepare({ title, alt, media }) {
      return { title: title || nlValue(alt) || "Foto", media };
    },
  },
});
