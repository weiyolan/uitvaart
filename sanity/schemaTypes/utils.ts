/* Helpers for Studio previews of internationalized-array fields. */

type IntlEntry = { _key?: string; language?: string; value?: string };

export function nlValue(field: unknown): string | undefined {
  if (!Array.isArray(field)) return undefined;
  const entries = field as IntlEntry[];
  // v5 stores the locale on `language`; fall back to `_key` for any legacy data.
  return (
    entries.find((e) => (e.language ?? e._key) === "nl")?.value ?? entries[0]?.value
  );
}
