"use client";

import { useEffect, useState } from "react";
import { useDocumentStore } from "sanity";

export type PhotoRow = {
  _id: string;
  _type: "photo";
  title?: string;
  image?: unknown;
  alt?: unknown;
};

const PHOTOS_QUERY = `*[_type == "photo"] | order(_createdAt desc){ _id, _type, title, image, alt }`;

/* Live list of photos in the library. listenQuery re-emits on every
   create/update/delete, so the gallery stays in sync after upload/delete. The
   "drafts" perspective collapses each logical doc to one row (draft overlaid on
   published). Returns null while loading. */
export function usePhotos(): PhotoRow[] | null {
  const documentStore = useDocumentStore();
  const [photos, setPhotos] = useState<PhotoRow[] | null>(null);

  useEffect(() => {
    const sub = documentStore
      .listenQuery(PHOTOS_QUERY, {}, { perspective: "drafts" })
      .subscribe((result: PhotoRow[] | null) => setPhotos(result ?? []));
    return () => sub.unsubscribe();
  }, [documentStore]);

  return photos;
}
