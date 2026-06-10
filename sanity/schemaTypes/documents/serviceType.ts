import { defineArrayMember, defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";
import { nlValue } from "../utils";

const SERVICE_SLUGS = ["uitvaart", "portret", "huwelijk"];

/* One document per service (uitvaart / portret / huwelijk), structure-
   controlled with fixed _id "service-<slug>". Carries both the landing-page
   row and the full detail page. */
export const serviceType = defineType({
  name: "service",
  title: "Dienst",
  type: "document",
  icon: ImagesIcon,
  groups: [
    { name: "identity", title: "Identiteit", default: true },
    { name: "landing", title: "Landingspagina" },
    { name: "page", title: "Dienstpagina" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    /* ---- Identity ---- */
    defineField({
      name: "name",
      title: "Naam",
      type: "internationalizedArrayString",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "identity",
      description: "Vast: bepaalt de route /diensten/<slug> in elke taal.",
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return "Verplicht";
          if (!SERVICE_SLUGS.includes(slug.current)) {
            return `Moet één van ${SERVICE_SLUGS.join(", ")} zijn`;
          }
          return true;
        }),
    }),
    defineField({
      name: "order",
      title: "Volgorde",
      type: "number",
      group: "identity",
      validation: (rule) => rule.required().min(1).max(3),
    }),
    defineField({
      name: "number",
      title: "Nummer",
      description: "Romeins cijfer, b.v. “I” — gedeeld over talen.",
      type: "string",
      group: "identity",
    }),
    defineField({
      name: "note",
      title: "Tagline",
      description: "Korte regel op de homepagina-index, b.v. “Een leven, gevierd op film.”",
      type: "internationalizedArrayString",
      group: "identity",
    }),
    defineField({
      name: "indexFigLabel",
      title: "Indexkader: label",
      description: "Groot label in het kader, b.v. “UITVAART”.",
      type: "internationalizedArrayString",
      group: "identity",
    }),
    defineField({
      name: "indexFigCorner",
      title: "Indexkader: hoeknotatie",
      description: "b.v. “6×7 · I” — gedeeld over talen.",
      type: "string",
      group: "identity",
    }),
    defineField({
      name: "indexImage",
      title: "Indexkader: scan",
      description: "Optionele foto uit de bibliotheek voor het indexkader op de homepagina.",
      type: "reference",
      to: [{ type: "photo" }],
      group: "identity",
    }),

    /* ---- Landing-page row ---- */
    defineField({
      name: "landing",
      title: "Landingspagina-sectie",
      type: "object",
      group: "landing",
      fields: [
        defineField({ name: "overline", title: "Overline", type: "internationalizedArrayString" }),
        defineField({ name: "kicker", title: "Kicker", type: "internationalizedArrayString" }),
        defineField({ name: "title", title: "Titel", type: "internationalizedArrayString" }),
        defineField({ name: "why", title: "Waarom-tekst", type: "internationalizedArrayText" }),
        defineField({ name: "bodyTitle", title: "Tekst-kop", type: "internationalizedArrayString" }),
        defineField({
          name: "paragraphs",
          title: "Paragrafen",
          type: "array",
          of: [defineArrayMember({ type: "localizedParagraph" })],
        }),
        defineField({
          name: "specs",
          title: "Specificaties",
          type: "array",
          of: [defineArrayMember({ type: "localizedItem" })],
        }),
        defineField({ name: "resultLabel", title: "Resultaat: label", type: "internationalizedArrayString" }),
        defineField({ name: "resultValue", title: "Resultaat: waarde", type: "internationalizedArrayString" }),
        defineField({
          name: "figures",
          title: "Beelden",
          type: "array",
          of: [defineArrayMember({ type: "filmFigure" })],
        }),
      ],
    }),

    /* ---- Detail page ---- */
    defineField({
      name: "page",
      title: "Dienstpagina",
      type: "object",
      group: "page",
      fields: [
        defineField({
          name: "heroVariant",
          title: "Hero-variant",
          type: "string",
          options: {
            list: [
              { title: "Gecentreerd", value: "centered" },
              { title: "Gesplitst", value: "split" },
              { title: "Breed", value: "wide" },
            ],
            layout: "radio",
          },
          initialValue: "centered",
        }),
        defineField({ name: "crumb", title: "Kruimel", description: "b.v. “Dienst I”.", type: "internationalizedArrayString" }),
        defineField({
          name: "head",
          title: "Hero",
          type: "object",
          fields: [
            defineField({ name: "overline", title: "Overline", type: "internationalizedArrayString" }),
            defineField({ name: "titleLine1", title: "Titel — regel 1", type: "internationalizedArrayString" }),
            defineField({ name: "titleLine2", title: "Titel — regel 2", type: "internationalizedArrayString" }),
            defineField({ name: "sub", title: "Subtekst", type: "internationalizedArrayText" }),
            defineField({ name: "fig", title: "Beeld", type: "filmFigure" }),
          ],
        }),
        defineField({
          name: "why",
          title: "Waarom",
          type: "object",
          fields: [
            defineField({ name: "overline", title: "Overline", type: "internationalizedArrayString" }),
            defineField({ name: "lead", title: "Inleiding", type: "internationalizedArrayText" }),
            defineField({
              name: "paragraphs",
              title: "Paragrafen",
              type: "array",
              of: [defineArrayMember({ type: "localizedParagraph" })],
            }),
            defineField({
              name: "pull",
              title: "Pull-quote",
              description: "Regelafbrekingen blijven behouden.",
              type: "internationalizedArrayText",
            }),
            defineField({ name: "fig", title: "Beeld", type: "filmFigure" }),
          ],
        }),
        defineField({
          name: "how",
          title: "Werkwijze",
          type: "object",
          fields: [
            defineField({ name: "overline", title: "Overline", type: "internationalizedArrayString" }),
            defineField({ name: "title", title: "Titel", type: "internationalizedArrayString" }),
            defineField({ name: "note", title: "Nota", type: "internationalizedArrayText" }),
            defineField({
              name: "steps",
              title: "Stappen",
              type: "array",
              of: [defineArrayMember({ type: "processStep" })],
            }),
          ],
        }),
        defineField({
          name: "piece",
          title: "Het stuk",
          type: "object",
          fields: [
            defineField({ name: "overline", title: "Overline", type: "internationalizedArrayString" }),
            defineField({ name: "title", title: "Titel", type: "internationalizedArrayString" }),
            defineField({ name: "body", title: "Tekst", type: "internationalizedArrayText" }),
            defineField({
              name: "specs",
              title: "Specificaties",
              type: "array",
              of: [defineArrayMember({ type: "localizedItem" })],
            }),
            defineField({ name: "resultLabel", title: "Resultaat: label", type: "internationalizedArrayString" }),
            defineField({ name: "resultValue", title: "Resultaat: waarde", type: "internationalizedArrayString" }),
            defineField({ name: "fig", title: "Beeld", type: "filmFigure" }),
          ],
        }),
        defineField({
          name: "packages",
          title: "Formules",
          type: "object",
          fields: [
            defineField({ name: "overline", title: "Overline", type: "internationalizedArrayString" }),
            defineField({ name: "title", title: "Titel", type: "internationalizedArrayString" }),
            defineField({ name: "note", title: "Nota", type: "internationalizedArrayText" }),
            defineField({ name: "priceNote", title: "Prijsvermelding", type: "internationalizedArrayString" }),
            defineField({
              name: "items",
              title: "Formules",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "packageItem",
                  title: "Formule",
                  fields: [
                    defineField({ name: "name", title: "Naam", type: "internationalizedArrayString" }),
                    defineField({ name: "tagline", title: "Tagline", type: "internationalizedArrayString" }),
                    defineField({
                      name: "includes",
                      title: "Inbegrepen",
                      type: "array",
                      of: [defineArrayMember({ type: "localizedItem" })],
                    }),
                    defineField({ name: "featured", title: "Uitgelicht", type: "boolean", initialValue: false }),
                  ],
                  preview: {
                    select: { name: "name", featured: "featured" },
                    prepare({ name, featured }) {
                      return {
                        title: nlValue(name) || "Formule",
                        subtitle: featured ? "Uitgelicht" : undefined,
                      };
                    },
                  },
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: "faq",
          title: "Vragen",
          type: "object",
          fields: [
            defineField({ name: "overline", title: "Overline", type: "internationalizedArrayString" }),
            defineField({ name: "title", title: "Titel", type: "internationalizedArrayString" }),
            defineField({
              name: "items",
              title: "Vragen",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "faqItem",
                  title: "Vraag",
                  fields: [
                    defineField({ name: "q", title: "Vraag", type: "internationalizedArrayString" }),
                    defineField({ name: "a", title: "Antwoord", type: "internationalizedArrayText" }),
                  ],
                  preview: {
                    select: { q: "q" },
                    prepare({ q }) {
                      return { title: nlValue(q) || "Vraag" };
                    },
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [
    {
      title: "Volgorde",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { name: "name", number: "number", slug: "slug.current" },
    prepare({ name, number, slug }) {
      return {
        title: nlValue(name) || slug || "Dienst",
        subtitle: number ? `Dienst ${number}` : undefined,
      };
    },
  },
});
