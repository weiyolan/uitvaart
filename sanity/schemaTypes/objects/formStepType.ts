import { defineArrayMember, defineField, defineType } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";
import { nlValue } from "../utils";

/* One question/screen of a service's full-screen typeform. The `key` is the
   stable identifier used as the answer key + email label key (do not rename
   after publishing). Choice types (single/multi) carry localized `options`. */
export const formStepType = defineType({
  name: "formStep",
  title: "Vraag",
  type: "object",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "key",
      title: "Sleutel",
      description: "Stabiele sleutel, b.v. “email”, “datum”. Niet wijzigen na publicatie.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Korte tekst", value: "short-text" },
          { title: "Lange tekst", value: "long-text" },
          { title: "E-mail", value: "email" },
          { title: "Telefoon", value: "tel" },
          { title: "Datum", value: "date" },
          { title: "Tijdstip", value: "time" },
          { title: "Eén keuze", value: "single-choice" },
          { title: "Meerdere keuzes", value: "multi-choice" },
          { title: "Ja / nee", value: "boolean" },
        ],
      },
      initialValue: "short-text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Vraag",
      type: "internationalizedArrayString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "help",
      title: "Hulptekst",
      description: "Optionele toelichting onder de vraag (b.v. de koffietafel-nota).",
      type: "internationalizedArrayText",
    }),
    defineField({
      name: "placeholder",
      title: "Placeholder",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "required",
      title: "Verplicht",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "options",
      title: "Keuzes",
      description: "Enkel voor “Eén keuze” / “Meerdere keuzes”.",
      type: "array",
      of: [defineArrayMember({ type: "localizedItem" })],
      validation: (rule) =>
        rule.custom((opts, ctx) => {
          const type = (ctx.parent as { type?: string } | undefined)?.type;
          const isChoice = type === "single-choice" || type === "multi-choice";
          if (isChoice && (!opts || opts.length === 0)) return "Minstens één keuze vereist";
          return true;
        }),
    }),
  ],
  preview: {
    select: { label: "label", type: "type", required: "required" },
    prepare({ label, type, required }) {
      return {
        title: nlValue(label) || "Vraag",
        subtitle: [type, required ? "verplicht" : null].filter(Boolean).join(" · "),
      };
    },
  },
});
