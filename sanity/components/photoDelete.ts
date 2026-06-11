import type { SanityClient } from "@sanity/client";
import type { ToastContextValue } from "@sanity/ui";
import { getDraftId, getPublishedId } from "sanity";

type DeleteOutcome = "deleted" | "blocked" | "failed";

/* A still-referenced photo can't be deleted — the Content Lake returns 409. */
function isBlocked(err: unknown): boolean {
  const e = err as { statusCode?: number; response?: { statusCode?: number } };
  return e?.statusCode === 409 || e?.response?.statusCode === 409;
}

/* Delete a photo (both its published and draft ids). Returns the outcome so
   callers can tally — does not toast itself. */
export async function deletePhoto(client: SanityClient, id: string): Promise<DeleteOutcome> {
  try {
    await client.delete(getPublishedId(id));
  } catch (err) {
    return isBlocked(err) ? "blocked" : "failed";
  }
  // Remove the draft twin if present; ignore "not found".
  await client.delete(getDraftId(id)).catch(() => {});
  return "deleted";
}

/* One-click bin button: delete + toast only on failure (success is obvious —
   the tile vanishes when listenQuery re-emits). */
export async function deleteOne(
  client: SanityClient,
  id: string,
  toast: ToastContextValue,
): Promise<void> {
  const outcome = await deletePhoto(client, id);
  if (outcome === "blocked") {
    toast.push({
      status: "warning",
      title: "Kan niet verwijderen",
      description: "Deze foto wordt nog gebruikt op de site. Verwijder eerst de verwijzingen.",
    });
  } else if (outcome === "failed") {
    toast.push({ status: "error", title: "Verwijderen mislukt", description: "Probeer het opnieuw." });
  }
}

/* Bulk delete: never aborts on a single blocked/failed photo. Reports a summary
   distinguishing blocked (still in use) from genuinely failed (e.g. network). */
export async function deleteMany(
  client: SanityClient,
  ids: string[],
  toast: ToastContextValue,
): Promise<void> {
  const outcomes = await Promise.all(ids.map((id) => deletePhoto(client, id)));
  const deleted = outcomes.filter((o) => o === "deleted").length;
  const blocked = outcomes.filter((o) => o === "blocked").length;
  const failed = outcomes.filter((o) => o === "failed").length;

  const parts: string[] = [];
  if (deleted) parts.push(`${deleted} verwijderd`);
  if (blocked) parts.push(`${blocked} nog in gebruik`);
  if (failed) parts.push(`${failed} mislukt`);

  toast.push({
    status: blocked || failed ? "warning" : "success",
    title: "Foto's verwijderen",
    description: parts.join(", ") || "Niets verwijderd",
  });
}
