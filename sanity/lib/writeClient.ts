import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/* Server-only writer for stored contact messages. Needs an Editor token; set
   SANITY_API_MESSAGES_TOKEN (falls back to SANITY_API_WRITE_TOKEN). Returns
   null when no token is configured so the form still sends its mails. */
export function getWriteClient() {
  const token = process.env.SANITY_API_MESSAGES_TOKEN || process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return null;
  return createClient({ projectId, dataset, apiVersion, token, useCdn: false });
}
