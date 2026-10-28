import { defineArrayMember, defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";
import { MessageCardInput } from "../../components/MessageCard";
import { MESSAGE_STATUSES } from "../../../lib/mail-config";

/* A request submitted through the website form. Created by /api/contact (never
   by hand), private (dotted _id), read in the Studio inbox: Nieuw → Beantwoord
   → Gearchiveerd. */
export const contactMessageType = defineType({
  name: "contactMessage",
  title: "Bericht",
  type: "document",
  icon: CommentIcon,
  // Status/notitie apply instantly — no draft + Publiceren for an inbox.
  liveEdit: true,
  components: { input: MessageCardInput },
  fields: [
    defineField({
      name: "status",
      title: "Status",
      description: "Nieuw = nog niet bekeken. Beantwoord = ik heb gereageerd. Gearchiveerd = afgehandeld.",
      type: "string",
      options: { list: [...MESSAGE_STATUSES], layout: "radio", direction: "horizontal" },
      initialValue: "new",
    }),
    defineField({ name: "name", title: "Naam", type: "string", readOnly: true }),
    defineField({ name: "email", title: "E-mail", description: "Klik rechts in de balk op “Antwoorden” om te mailen.", type: "string", readOnly: true }),
    defineField({ name: "service", title: "Dienst", type: "string", readOnly: true }),
    defineField({ name: "lang", title: "Taal", type: "string", readOnly: true }),
    defineField({ name: "receivedAt", title: "Ontvangen", type: "datetime", readOnly: true }),
    defineField({
      name: "answers",
      title: "Antwoorden",
      description: "Wat de bezoeker invulde, in de volgorde van het formulier.",
      type: "array",
      readOnly: true,
      of: [
        defineArrayMember({
          type: "object",
          name: "answer",
          fields: [
            defineField({ name: "label", title: "Vraag", type: "string" }),
            defineField({ name: "value", title: "Antwoord", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
    defineField({
      name: "note",
      title: "Interne notitie",
      description: "Alleen voor jezelf, b.v. “gebeld op dinsdag, offerte volgt”. Niet zichtbaar voor de bezoeker.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "delivery",
      title: "Mailstatus",
      description: "Of de meldingsmail en de bevestiging verstuurd zijn. Bij “mislukt”: bel of mail de bezoeker zelf.",
      type: "string",
      readOnly: true,
    }),
  ],
  orderings: [{ title: "Nieuwste eerst", name: "newest", by: [{ field: "receivedAt", direction: "desc" }] }],
  preview: {
    select: { name: "name", service: "service", status: "status", at: "receivedAt" },
    prepare({ name, service, status, at }) {
      const label = MESSAGE_STATUSES.find((s) => s.value === status)?.title ?? "Nieuw";
      const date = at ? new Date(at) : null;
      const when = date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString("nl-BE", { day: "numeric", month: "short" }) : "";
      return { title: name || "Zonder naam", subtitle: [label, service, when].filter(Boolean).join(" · ") };
    },
  },
});
