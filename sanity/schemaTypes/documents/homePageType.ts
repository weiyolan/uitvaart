import { defineArrayMember, defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

/* Singleton (_id: "homePage") — all sections of the landing page.
   The three service rows live on the service documents. */
export const homePageType = defineType({
  name: "homePage",
  title: "Homepagina",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "philosophy", title: "Filosofie" },
    { name: "process", title: "Traject" },
    { name: "closing", title: "Slot" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "overline", title: "Overline", type: "internationalizedArrayString" }),
        defineField({ name: "titleLine1", title: "Titel — regel 1", type: "internationalizedArrayString" }),
        defineField({ name: "titleLine2", title: "Titel — regel 2", type: "internationalizedArrayString" }),
        defineField({ name: "sub", title: "Subtekst", type: "internationalizedArrayText" }),
        defineField({ name: "cue", title: "Scroll-cue", type: "internationalizedArrayString" }),
        defineField({ name: "cta", title: "CTA-knop", type: "internationalizedArrayString" }),
      ],
    }),
    defineField({
      name: "philosophy",
      title: "Filosofie",
      type: "object",
      group: "philosophy",
      fields: [
        defineField({ name: "overline", title: "Overline", type: "internationalizedArrayString" }),
        defineField({
          name: "pull",
          title: "Pull-quote",
          description: "Regelafbrekingen blijven behouden.",
          type: "internationalizedArrayText",
        }),
        defineField({ name: "lead", title: "Inleiding", type: "internationalizedArrayText" }),
        defineField({ name: "body", title: "Tekst", type: "internationalizedArrayText" }),
        defineField({ name: "indexOverline", title: "Diensten-overline", type: "internationalizedArrayString" }),
        defineField({
          name: "portrait",
          title: "Portret-scan",
          description: "Optionele foto uit de bibliotheek voor het fotograaf-kader. Placeholder tot er één gekozen is.",
          type: "reference",
          to: [{ type: "photo" }],
        }),
      ],
    }),
    defineField({
      name: "process",
      title: "Traject",
      type: "object",
      group: "process",
      fields: [
        defineField({ name: "overline", title: "Overline", type: "internationalizedArrayString" }),
        defineField({ name: "title", title: "Titel", type: "internationalizedArrayString" }),
        defineField({ name: "note", title: "Nota", type: "internationalizedArrayText" }),
        defineField({
          name: "steps",
          title: "Stappen",
          type: "array",
          of: [defineArrayMember({ type: "processStep" })],
          validation: (rule) => rule.min(1),
        }),
      ],
    }),
    defineField({
      name: "closing",
      title: "Slot",
      type: "object",
      group: "closing",
      fields: [
        defineField({ name: "overline", title: "Overline", type: "internationalizedArrayString" }),
        defineField({
          name: "statement",
          title: "Statement",
          description: "Regelafbrekingen blijven behouden.",
          type: "internationalizedArrayText",
        }),
        defineField({ name: "sub", title: "Subtekst", type: "internationalizedArrayString" }),
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Homepagina" };
    },
  },
});
