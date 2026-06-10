import type { Thing, WithContext } from "schema-dts";

/* Renders a JSON-LD <script>. Caller passes typed, already stega-cleaned data.
   `<` is escaped so the payload can't break out of the script element. */
export function JsonLd<T extends Thing>({ data }: { data: WithContext<T> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
