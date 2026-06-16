"use client";

import { useState } from "react";
import { Box, Button, Stack } from "@sanity/ui";
import { ChevronDownIcon, ChevronRightIcon } from "@sanity/icons";
import type {
  ArrayOfObjectsInputProps,
  ArrayOfObjectsMember,
  InputProps,
} from "sanity";
import type { InternationalizedArrayItem } from "sanity-plugin-internationalized-array";
import { DEFAULT_LOCALE } from "../../lib/i18n";

/* Language id of an internationalized-array item member. In v5 the plugin
   stores the language in the item's `language` field (the `_key` is random). */
function memberLanguage(member: ArrayOfObjectsMember): string | undefined {
  if (member.kind !== "item") return undefined;
  return (member.item.value as InternationalizedArrayItem | undefined)?.language;
}

/* Custom input for the plugin's `internationalizedArrayString` /
   `internationalizedArrayText` fields. Shows only the default language (nl) and
   tucks the other languages behind a per-field toggle, collapsed by default —
   so editors are not faced with three stacked inputs on every field.

   It reuses the plugin's own input untouched: we only narrow which members it
   renders by passing a filtered `members` list to `renderDefault`. There are no
   data, query or field-path changes; add/remove and validation keep working,
   and the value still holds all languages whether expanded or not. */
export function LocaleArrayInput(props: ArrayOfObjectsInputProps) {
  const { members, renderDefault } = props;
  const [expanded, setExpanded] = useState(false);

  const secondary = members.filter((m) => memberLanguage(m) !== DEFAULT_LOCALE);

  // Nothing to hide (only nl present, or no languages added yet): render the
  // plugin input as-is so its own "+ EN / + FR" add buttons stay reachable.
  if (secondary.length === 0) return renderDefault(props);

  const primary = members.filter((m) => memberLanguage(m) === DEFAULT_LOCALE);
  // Never collapse to nothing: if nl is missing, keep the first row visible.
  const collapsedMembers = primary.length > 0 ? primary : members.slice(0, 1);
  const visibleMembers = expanded ? members : collapsedMembers;

  const hiddenCodes = members
    .filter((m) => !collapsedMembers.includes(m))
    .map(memberLanguage)
    .filter((id): id is string => Boolean(id))
    .map((id) => id.toUpperCase());

  return (
    <Stack space={2}>
      {renderDefault({ ...props, members: visibleMembers })}
      <Box>
        <Button
          mode="bleed"
          padding={2}
          fontSize={1}
          icon={expanded ? ChevronDownIcon : ChevronRightIcon}
          text={
            expanded
              ? "Verberg andere talen"
              : `Andere talen · ${hiddenCodes.join(" · ")}`
          }
          onClick={() => setExpanded((value) => !value)}
        />
      </Box>
    </Stack>
  );
}

/* Config-level form input: only the two internationalized array types are
   intercepted; every other input falls through unchanged. Defined here (a .tsx
   file) so `sanity.config.ts` can register it without containing JSX. */
export function localeAwareInput(props: InputProps) {
  if (
    props.schemaType.name === "internationalizedArrayString" ||
    props.schemaType.name === "internationalizedArrayText"
  ) {
    return <LocaleArrayInput {...(props as ArrayOfObjectsInputProps)} />;
  }
  return props.renderDefault(props);
}

export default LocaleArrayInput;
