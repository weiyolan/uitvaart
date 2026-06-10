import { defineField, defineType } from "sanity";
import { nlValue } from "../utils";

/* The internationalized-array plugin localizes fields, not array members —
   so arrays of localized strings/paragraphs wrap each entry in an object. */

export const localizedItemType = defineType({
  name: "localizedItem",
  title: "Line",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Text",
      type: "internationalizedArrayString",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { value: "value" },
    prepare({ value }) {
      return { title: nlValue(value) || "—" };
    },
  },
});

export const localizedParagraphType = defineType({
  name: "localizedParagraph",
  title: "Paragraph",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "internationalizedArrayText",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { text: "text" },
    prepare({ text }) {
      return { title: nlValue(text) || "—" };
    },
  },
});
