/* Helpers for Studio previews of internationalized-array fields. */

type IntlEntry = { _key?: string; value?: string };

export function nlValue(field: unknown): string | undefined {
  if (!Array.isArray(field)) return undefined;
  const entries = field as IntlEntry[];
  return entries.find((e) => e._key === "nl")?.value ?? entries[0]?.value;
}
