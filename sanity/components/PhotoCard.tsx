"use client";

import { useState } from "react";
import { Badge, Box, Button, Card, Checkbox, Flex, Stack, Text } from "@sanity/ui";
import { TrashIcon } from "@sanity/icons";
import { usePaneRouter } from "sanity/structure";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "../lib/image";
import { nlValue } from "../schemaTypes/utils";
import type { PhotoRow } from "./usePhotos";

/* One photo tile: thumbnail (click opens the standard document form in the next
   pane), a select checkbox, a one-click bin button, the title and the NL alt —
   both ellipsised — or a "Geen alt" badge when the SEO alt is still missing. */
export function PhotoCard({
  photo,
  isSelected,
  onToggle,
  onDelete,
}: {
  photo: PhotoRow;
  isSelected: boolean;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const { ChildLink } = usePaneRouter();
  const [hover, setHover] = useState(false);
  const nlAlt = nlValue(photo.alt);
  const thumb = photo.image
    ? urlFor(photo.image as SanityImageSource).width(300).height(300).fit("crop").auto("format").url()
    : null;

  return (
    <Card
      radius={2}
      shadow={isSelected ? 2 : 1}
      tone={isSelected ? "primary" : "default"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* select checkbox */}
      <Box style={{ position: "absolute", top: 8, left: 8, zIndex: 2 }}>
        <Checkbox checked={isSelected} onChange={onToggle} aria-label="Selecteer foto" />
      </Box>

      {/* one-click delete, revealed on hover or while selected */}
      {(hover || isSelected) && (
        <Box style={{ position: "absolute", top: 6, right: 6, zIndex: 2 }}>
          <Button
            icon={TrashIcon}
            mode="ghost"
            tone="critical"
            padding={2}
            onClick={onDelete}
            aria-label="Verwijder foto"
          />
        </Box>
      )}

      {/* thumbnail -> standard document editor in the adjacent pane */}
      <ChildLink childId={photo._id} childPayload={{ type: "photo" }}>
        <Box
          style={{
            display: "block",
            aspectRatio: "1 / 1",
            background: "#dcdcdc",
            cursor: "pointer",
          }}
        >
          {thumb && (
            // Studio thumbnail (CDN-sized): next/image is not applicable here.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumb}
              alt={nlAlt ?? photo.title ?? ""}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          )}
        </Box>
      </ChildLink>

      {/* meta */}
      <Stack padding={2} space={2}>
        <Text size={1} weight="medium" textOverflow="ellipsis">
          {photo.title || "Naamloos"}
        </Text>
        {nlAlt ? (
          <Text size={0} muted textOverflow="ellipsis">
            {nlAlt}
          </Text>
        ) : (
          <Flex>
            <Badge tone="caution" fontSize={0}>
              Geen alt
            </Badge>
          </Flex>
        )}
      </Stack>
    </Card>
  );
}
