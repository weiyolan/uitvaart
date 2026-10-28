"use client";

import { Badge, Box, Button, Card, Flex, Stack, Text } from "@sanity/ui";
import { EnvelopeIcon } from "@sanity/icons";
import type { ObjectInputProps } from "sanity";

/* Readable view of a stored request (Studio → Berichten). Shows who/what/when
   and the answers as label/value, with a one-click "Antwoorden" mail link,
   above only the fields you actually edit (status, notitie). */

type Answer = { _key: string; label?: string; value?: string };
type Message = {
  name?: string;
  email?: string;
  service?: string;
  lang?: string;
  receivedAt?: string;
  delivery?: string;
  status?: string;
  answers?: Answer[];
};

const EDITABLE = new Set(["status", "note"]);

export function MessageCardInput(props: ObjectInputProps) {
  const msg = (props.value ?? {}) as Message;
  const date = msg.receivedAt ? new Date(msg.receivedAt) : null;
  const when =
    date && !Number.isNaN(date.getTime())
      ? date.toLocaleString("nl-BE", { dateStyle: "long", timeStyle: "short" })
      : "";
  const failed = msg.delivery?.startsWith("Mislukt");
  const subject = encodeURIComponent(`Re: je aanvraag${msg.service ? ` — ${msg.service}` : ""}`);

  return (
    <Stack space={5}>
      <Card border radius={2} padding={4}>
        <Stack space={4}>
          <Flex align="center" justify="space-between" gap={3} wrap="wrap">
            <Stack space={2}>
              <Text size={3} weight="semibold">{msg.name || "Zonder naam"}</Text>
              <Text size={1} muted>
                {[msg.service, msg.lang?.toUpperCase(), when].filter(Boolean).join(" · ")}
              </Text>
            </Stack>
            {msg.email ? (
              <Button
                as="a"
                href={`mailto:${msg.email}?subject=${subject}`}
                icon={EnvelopeIcon}
                text="Antwoorden"
                tone="primary"
              />
            ) : null}
          </Flex>
          {msg.email ? <Text size={1}>{msg.email}</Text> : null}
          <Stack space={3}>
            {(msg.answers ?? []).map((a) => (
              <Box key={a._key}>
                <Text size={0} muted style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {a.label}
                </Text>
                <Box marginTop={1}>
                  <Text size={2} style={{ whiteSpace: "pre-wrap" }}>{a.value}</Text>
                </Box>
              </Box>
            ))}
          </Stack>
          {msg.delivery ? (
            <Flex gap={2} align="center">
              <Badge tone={failed ? "critical" : "positive"} fontSize={0}>
                {failed ? "Mail mislukt" : "Mail verstuurd"}
              </Badge>
              <Text size={0} muted>{msg.delivery}</Text>
            </Flex>
          ) : null}
        </Stack>
      </Card>
      {props.renderDefault({
        ...props,
        members: props.members.filter((m) => m.kind === "field" && EDITABLE.has(m.name)),
      })}
    </Stack>
  );
}
