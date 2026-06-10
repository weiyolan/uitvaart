"use client";

import { useEffect, useState } from "react";
import { Box, Card, Flex, Grid, Spinner, Text } from "@sanity/ui";
import { useClient } from "sanity";
import { IntentLink } from "sanity/router";
import { apiVersion } from "../env";

/* Beelden — a one-screen overview of every picture SLOT across the homepage
   and the three services (distinct from the Beeldbibliotheek, which lists the
   photo documents themselves). Each tile shows the chosen scan (or an empty
   state) and links to the document where it is set. Read-only navigation aid. */

type Slot = { title: string | null; url: string | null } | null;

type OverviewData = {
  home: { portrait: Slot } | null;
  services: Array<{
    _id: string;
    name: string;
    landing: Slot;
    hero: Slot;
    why: Slot;
    piece: Slot;
    gallery: Slot;
    index: Slot;
    og: Slot;
  }>;
} | null;

const slot = `{ "title": title, "url": image.asset->url }`;

const BEELDEN_QUERY = `{
  "home": *[_type == "homePage"][0]{ "portrait": philosophy.portrait->${slot} },
  "services": *[_type == "service"] | order(order asc){
    _id,
    "name": coalesce(name[language == "nl"][0].value, name[0].value, _id),
    "landing": landing.figures[0].image->${slot},
    "hero": page.head.fig.image->${slot},
    "why": page.why.fig.image->${slot},
    "piece": page.piece.fig.image->${slot},
    "gallery": page.galleryImage->${slot},
    "index": indexImage->${slot},
    "og": seo.ogImage->${slot}
  }
}`;

function SlotTile({ label, value, docId, docType }: { label: string; value: Slot; docId: string; docType: string }) {
  return (
    <IntentLink intent="edit" params={{ id: docId, type: docType }} style={{ textDecoration: "none", display: "block" }}>
      <Card radius={2} shadow={1} style={{ overflow: "hidden", cursor: "pointer" }}>
        <Box style={{ aspectRatio: "3 / 4", background: value?.url ? undefined : "var(--card-muted-fg-color, #e0e0e0)" }}>
          {value?.url ? (
            // Studio thumbnail — next/image does not apply inside the Studio bundle.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${value.url}?w=240&h=320&fit=crop&auto=format`}
              alt={value.title ?? label}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <Flex align="center" justify="center" style={{ height: "100%" }}>
              <Text muted size={0}>Leeg</Text>
            </Flex>
          )}
        </Box>
        <Box padding={2}>
          <Text size={0} weight="medium" textOverflow="ellipsis">{label}</Text>
        </Box>
      </Card>
    </IntentLink>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box>
      <Box paddingBottom={2}>
        <Text size={1} weight="semibold">{title}</Text>
      </Box>
      <Grid columns={[2, 3, 4]} gap={3}>{children}</Grid>
    </Box>
  );
}

export function BeeldenOverviewPane() {
  const client = useClient({ apiVersion });
  const [data, setData] = useState<OverviewData>(null);

  useEffect(() => {
    let cancelled = false;
    client.fetch<OverviewData>(BEELDEN_QUERY).then((result) => {
      if (!cancelled) setData(result);
    });
    return () => {
      cancelled = true;
    };
  }, [client]);

  if (data === null) {
    return (
      <Flex align="center" justify="center" height="fill" padding={5}>
        <Spinner muted />
      </Flex>
    );
  }

  return (
    <Box padding={4} style={{ overflowY: "auto", height: "100%" }}>
      <Flex direction="column" gap={5}>
        <Group title="Homepagina">
          <SlotTile label="Portret" value={data.home?.portrait ?? null} docId="homePage" docType="homePage" />
        </Group>
        {data.services.map((s) => (
          <Group key={s._id} title={s.name}>
            <SlotTile label="Landingsbeeld" value={s.landing} docId={s._id} docType="service" />
            <SlotTile label="Hero" value={s.hero} docId={s._id} docType="service" />
            <SlotTile label="Waarom" value={s.why} docId={s._id} docType="service" />
            <SlotTile label="Het stuk" value={s.piece} docId={s._id} docType="service" />
            <SlotTile label="Galerij D" value={s.gallery} docId={s._id} docType="service" />
            <SlotTile label="Indexkader" value={s.index} docId={s._id} docType="service" />
            <SlotTile label="Social (OG)" value={s.og} docId={s._id} docType="service" />
          </Group>
        ))}
      </Flex>
    </Box>
  );
}
