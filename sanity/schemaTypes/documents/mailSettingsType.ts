import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";
import { OWNER_EMAIL } from "../../../lib/mail-config";

/* Singleton (_id: "mailSettings") — who receives requests, and the wording of
   the confirmation mail visitors get. Empty text fields = built-in copy. */
export const mailSettingsType = defineType({
  name: "mailSettings",
  title: "Mail & berichten",
  type: "document",
  icon: EnvelopeIcon,
  groups: [
    { name: "recipients", title: "Ontvangers", default: true },
    { name: "confirmation", title: "Bevestigingsmail" },
  ],
  fields: [
    defineField({
      name: "ownerEmail",
      title: "Mijn e-mailadres",
      description: "Hier komt elke nieuwe aanvraag van het contactformulier binnen. Leeg = " + OWNER_EMAIL + ".",
      type: "string",
      group: "recipients",
      initialValue: OWNER_EMAIL,
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "notifyOwner",
      title: "Mail mij bij nieuwe aanvraag",
      description: "Uit = geen mail, de aanvraag blijft wel zichtbaar onder Berichten.",
      type: "boolean",
      group: "recipients",
      initialValue: true,
    }),
    defineField({
      name: "sendConfirmation",
      title: "Stuur bezoeker een bevestiging",
      description: "Aan = de bezoeker krijgt een mail met een overzicht van zijn aanvraag.",
      type: "boolean",
      group: "recipients",
      initialValue: true,
    }),
    defineField({
      name: "fromName",
      title: "Afzendernaam",
      description: "Naam die de bezoeker ziet als afzender, b.v. “Milo Weiler”. Leeg = de sitenaam. Het afzenderadres zelf staat vast (verifieerd domein).",
      type: "string",
      group: "recipients",
    }),
    defineField({
      name: "replyTo",
      title: "Antwoorden naar",
      description: "Wanneer de bezoeker op de bevestiging antwoordt. Leeg = het e-mailadres uit de Site-instellingen.",
      type: "string",
      group: "recipients",
      validation: (r) => r.email(),
    }),
    defineField({
      name: "confirmation",
      title: "Tekst van de bevestigingsmail",
      description: "Leeg laten = de standaardtekst. Per taal: de bezoeker krijgt de taal van de pagina waar hij het formulier invulde.",
      type: "object",
      group: "confirmation",
      fields: (["nl", "en", "fr"] as const).map((lang) =>
        defineField({
          name: lang,
          title: lang === "nl" ? "Nederlands" : lang === "en" ? "English" : "Français",
          type: "object",
          options: { collapsible: true, collapsed: lang !== "nl" },
          fields: [
            defineField({ name: "subject", title: "Onderwerp", description: "b.v. “Bedankt voor je aanvraag”.", type: "string" }),
            defineField({ name: "heading", title: "Kop", description: "Grote titel bovenaan de mail.", type: "string" }),
            defineField({ name: "lead", title: "Inleiding", description: "Eén of twee zinnen onder de kop, boven het overzicht.", type: "text", rows: 3 }),
            defineField({ name: "next", title: "Slotzin", description: "Onder het overzicht, b.v. wanneer je terugbelt.", type: "text", rows: 3 }),
          ],
        }),
      ),
    }),
  ],
  preview: {
    select: { email: "ownerEmail" },
    prepare: ({ email }) => ({ title: "Mail & berichten", subtitle: email || OWNER_EMAIL }),
  },
});
