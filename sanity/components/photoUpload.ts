import type { SanityClient } from "@sanity/client";

/* Derive a readable internal title from an uploaded file name. Title is a
   required field, so this must never return an empty string. */
export function filenameToTitle(name: string): string {
  const cleaned = name
    .replace(/\.[^/.]+$/, "") // drop extension
    .replace(/[-_]+/g, " ") // separators -> spaces
    .replace(/\s+/g, " ")
    .trim();
  const base = cleaned || name.trim() || "Foto";
  return base.replace(/^\p{Ll}/u, (c) => c.toUpperCase()); // capitalize first letter
}

/* Upload one image asset and create a published photo doc referencing it, with
   the title prefilled from the file name. Alt is left empty — the editor fills
   the (required) NL alt afterwards; the gallery flags photos missing it. */
export async function uploadPhoto(client: SanityClient, file: File): Promise<void> {
  const asset = await client.assets.upload("image", file, { filename: file.name });
  await client.create({
    _type: "photo",
    title: filenameToTitle(file.name),
    image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
  });
}

/* Sequential to avoid rate spikes on large batches. Non-image files are skipped
   (drag-drop bypasses the input's accept filter). */
export async function uploadMany(client: SanityClient, files: FileList | File[]): Promise<void> {
  for (const file of Array.from(files)) {
    if (file.type.startsWith("image/")) await uploadPhoto(client, file);
  }
}
