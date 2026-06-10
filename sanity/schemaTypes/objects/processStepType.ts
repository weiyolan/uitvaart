import { defineField, defineType } from "sanity";
import { OlistIcon } from "@sanity/icons";
import { nlValue } from "../utils";

export const processStepType = defineType({
  name: "processStep",
  title: "Process step",
  type: "object",
  icon: OlistIcon,
  fields: [
    defineField({
      name: "no",
      title: "Numeral",
      description: "e.g. “I” or “01” — shared across languages.",
      type: "string",
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "internationalizedArrayString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "internationalizedArrayText",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { no: "no", name: "name" },
    prepare({ no, name }) {
      return { title: [no, nlValue(name)].filter(Boolean).join(" — ") };
    },
  },
});
