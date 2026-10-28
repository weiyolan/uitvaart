"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Box, Button, Flex, Popover, Text } from "@sanity/ui";
import { AddIcon, HelpCircleIcon } from "@sanity/icons";
import type { ArrayFieldProps, ArraySchemaType, FieldProps, ItemProps, ObjectItem, SchemaType } from "sanity";
import { DEFAULT_LOCALE, LOCALES } from "../../lib/i18n";

/* Studio UX layer (see SANITY.md → "Studio UX"):
   - help text behind a small ⓘ instead of a permanent description,
   - short fields on one row (title | input | "…"),
   - one language at a time via NL | EN | FR tabs on localized fields.
   Everything renders Sanity's own field via `renderDefault`, so comments,
   the "…" menu, validation and change bars keep working. */

/* ---------- help ⓘ ---------- */

export function Help({ text }: { text: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLSpanElement | null>(null);

  // Tap elsewhere closes it (Popover has no onClickOutside).
  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (anchor && e.target instanceof Node && anchor.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open, anchor]);

  return (
    <Popover
      open={open}
      portal
      placement="bottom-start"
      content={
        <Box padding={3} style={{ maxWidth: 320 }}>
          <Text size={1}>{text}</Text>
        </Box>
      }
    >
      <span
        ref={setAnchor}
        role="button"
        tabIndex={0}
        aria-label="Uitleg"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => e.key === "Enter" && setOpen((v) => !v)}
        style={{ display: "inline-flex", marginLeft: 4, verticalAlign: "middle", cursor: "help", opacity: 0.6 }}
      >
        <HelpCircleIcon style={{ fontSize: 15, width: "1em", height: "1em" }} />
      </span>
    </Popover>
  );
}

/* ---------- schema helpers ---------- */

function chain(type: SchemaType | undefined): string[] {
  const names: string[] = [];
  for (let t: SchemaType | undefined = type; t; t = t.type) names.push(t.name);
  return names;
}

const SHORT = new Set(["string", "number", "url", "date", "datetime", "slug", "reference"]);

const isI18nArray = (name: string) =>
  name.startsWith("internationalizedArray") && !name.endsWith("Value");

/* One row only for short single-value fields; never text, booleans, option
   lists, arrays, objects or fields with their own input. */
function isShort(props: FieldProps): boolean {
  const names = chain(props.schemaType);
  if (props.name === "value" || names.includes("text") || names.includes("boolean")) return false;
  const options = props.schemaType.options as { list?: unknown[] } | undefined;
  if (options?.list?.length) return false;
  if (props.schemaType.components?.input) return false;
  if (names.includes("internationalizedArrayText")) return false;
  return names.some((n) => SHORT.has(n));
}

/* ---------- one-row layout ---------- */

const ROW = `.inline-field [data-ui="Stack"]:has(> [data-ui="Flex"] > [data-ui="fieldHeaderContentBox"]):not(.i18n-tab-item *)`;
const HEAD = `${ROW} > [data-ui="Flex"]:first-child`;
const INLINE_CSS = `
.inline-field { container-type: inline-size; margin-block: -10px; }
${ROW} { display: grid !important; grid-template-columns: minmax(80px, 26%) minmax(0, 1fr) auto; column-gap: 8px; align-items: center; }
${HEAD} { display: contents !important; }
${HEAD} > [data-ui="fieldHeaderContentBox"] { grid-column: 1; grid-row: 1; }
${HEAD} > :not([data-ui="fieldHeaderContentBox"]) { grid-column: 3; grid-row: 1; position: static !important; inset: auto !important; }
${ROW} > :not(:first-child) { grid-column: 2; }
${ROW} > :nth-child(2) { grid-row: 1; }
@container (max-width: 300px) {
  ${ROW} { grid-template-columns: minmax(0, 1fr) auto; }
  ${HEAD} > [data-ui="fieldHeaderContentBox"] { grid-column: 1; }
  ${HEAD} > :not([data-ui="fieldHeaderContentBox"]) { grid-column: 2; }
  ${ROW} > :not(:first-child) { grid-column: 1 / -1; }
  ${ROW} > :nth-child(2) { grid-row: 2; }
}
`;

/* Plugin chrome we replace: the "NEDERLANDS" header above each input (the tab
   says it) and the ⊖ "remove this language" button (one tap wipes the text). */
const I18N_CSS = `
.i18n-tab-item [data-ui="Flex"]:has(> [data-ui="fieldHeaderContentBox"] label[for$=".value"]) { display: none; }
.i18n-tab-item > [data-ui="Card"] > [data-ui="Flex"] > :not(:first-child) { display: none; }
`;

/* ---------- language tabs ---------- */

const ActiveLanguage = createContext<string | null>(null);

type LangItem = { language?: string; value?: unknown } | undefined;

const randomKey = () => Math.random().toString(36).slice(2, 14);

function TabsField(props: FieldProps) {
  const [active, setActive] = useState<string>(DEFAULT_LOCALE);
  const items = (Array.isArray(props.value) ? props.value : []) as LangItem[];
  const has = (id: string) => items.some((i) => i?.language === id);
  const filled = (id: string) => {
    const v = items.find((i) => i?.language === id)?.value;
    return typeof v === "string" && v.trim() !== "";
  };
  // Only the default language can be required (see schema rules), so a
  // field-level error means: the default language is missing.
  const hasError = props.validation.some((v) => v.level === "error");

  const inputProps = (props as ArrayFieldProps).inputProps;
  const itemType = (props.schemaType as ArraySchemaType).of?.[0]?.name;
  const readOnly = Boolean(inputProps?.readOnly);
  const activeTitle = LOCALES.find((l) => l.id === active)?.title ?? active;
  const add = () =>
    itemType && inputProps?.onItemAppend({ _key: randomKey(), _type: itemType, language: active } as never);

  return (
    <ActiveLanguage.Provider value={active}>
      <style>{I18N_CSS}</style>
      {props.renderDefault({
        ...props,
        description: undefined,
        title: (
          <Flex align="center" gap={2} wrap="wrap" as="span">
            <span>
              {props.title}
              {props.description ? <Help text={props.description} /> : null}
            </span>
            <Flex gap={1} as="span" role="tablist">
              {LOCALES.map(({ id, title }) => {
                const isActive = id === active;
                const dot = hasError && id === DEFAULT_LOCALE && !filled(id) ? "critical" : filled(id) ? null : "empty";
                return (
                  <Button
                    key={id}
                    role="tab"
                    aria-selected={isActive}
                    mode={isActive ? "default" : "bleed"}
                    tone={isActive ? "primary" : "default"}
                    padding={1}
                    fontSize={0}
                    title={dot ? `${title}: nog leeg` : title}
                    onClick={() => setActive(id)}
                  >
                    <Flex align="center" gap={1} as="span">
                      <span>{id.toUpperCase()}</span>
                      {dot ? (
                        <span
                          aria-hidden
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: dot === "critical" ? "var(--card-badge-critical-dot-color, #e5484d)" : "currentColor",
                            opacity: dot === "critical" ? 1 : 0.45,
                          }}
                        />
                      ) : null}
                    </Flex>
                  </Button>
                );
              })}
            </Flex>
          </Flex> as unknown as string
        ),
      })}
      {/* Rendered after the field (renderDefault ignores a `children` override). */}
      {!has(active) && !readOnly ? (
        <Box marginTop={2}>
          <Button mode="ghost" icon={AddIcon} text={`${activeTitle} toevoegen`} onClick={add} style={{ width: "100%" }} />
        </Box>
      ) : null}
    </ActiveLanguage.Provider>
  );
}

/* Items of the other languages are only hidden, never left out of `members`:
   leaving them out breaks the plugin's add/translate actions. */
export function StudioItem(props: ItemProps) {
  const active = useContext(ActiveLanguage);
  const lang = (props.value as (ObjectItem & { language?: string }) | undefined)?.language;
  const name = props.schemaType.name;
  if (!active || !lang || !(name.startsWith("internationalizedArray") && name.endsWith("Value"))) {
    return props.renderDefault(props);
  }
  return (
    <div className="i18n-tab-item" style={lang === active ? undefined : { display: "none" }}>
      {props.renderDefault(props)}
    </div>
  );
}

/* ---------- form.components.field ---------- */

export function StudioField(props: FieldProps) {
  if (isI18nArray(props.schemaType.name)) return <TabsField {...props} />;

  const help =
    props.description && props.name !== "value" ? <Help text={props.description} /> : null;
  const rendered = props.renderDefault({
    ...props,
    description: undefined,
    title: (help ? (
      <>
        {props.title}
        {help}
      </>
    ) : (
      props.title
    )) as unknown as string,
  });

  if (!isShort(props)) return rendered;
  return (
    <div className="inline-field">
      <style>{INLINE_CSS}</style>
      {rendered}
    </div>
  );
}
