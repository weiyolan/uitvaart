/* Mail & messaging config shared by the API route and the Studio schema. */

/* Owner of the studio / recipient of new requests. Overridable in the Studio
   (Instellingen → Mail & berichten) or via CONTACT_TO_EMAIL. */
export const OWNER_EMAIL = "milo.weiler@gmail.com";

export const MESSAGE_STATUSES = [
  { value: "new", title: "Nieuw" },
  { value: "answered", title: "Beantwoord" },
  { value: "archived", title: "Gearchiveerd" },
] as const;

export type MessageStatus = (typeof MESSAGE_STATUSES)[number]["value"];

/* Per-language overrides for the visitor confirmation mail. Empty = built-in copy. */
export type MailOverrides = {
  subject?: string;
  heading?: string;
  lead?: string;
  next?: string;
};

export type MailSettings = {
  ownerEmail: string;
  notifyOwner: boolean;
  sendConfirmation: boolean;
  fromName: string;
  replyTo: string;
  confirmation?: Partial<Record<"nl" | "en" | "fr", MailOverrides | null>> | null;
};

export const DEFAULT_MAIL_SETTINGS: MailSettings = {
  ownerEmail: "",
  notifyOwner: true,
  sendConfirmation: true,
  fromName: "",
  replyTo: "",
  confirmation: {},
};
