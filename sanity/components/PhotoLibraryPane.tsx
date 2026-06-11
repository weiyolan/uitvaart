"use client";

import { useCallback, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Grid,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@sanity/ui";
import { TrashIcon, UploadIcon } from "@sanity/icons";
import { useClient } from "sanity";
import { apiVersion } from "../env";
import { usePhotos } from "./usePhotos";
import { PhotoCard } from "./PhotoCard";
import { uploadMany } from "./photoUpload";
import { deleteMany, deleteOne } from "./photoDelete";

/* Custom Beeldbibliotheek pane: a thumbnail gallery with multi-file upload
   (picker + drag-drop), per-tile one-click delete, and multi-select + bulk
   delete. Editing a single photo reuses the standard document form via the
   list item's .child() resolver (see sanity/structure.ts). */
export function PhotoLibraryPane() {
  const client = useClient({ apiVersion });
  const toast = useToast();
  const photos = usePhotos();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const runUpload = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
      if (!list.length) return;
      setUploading(true);
      try {
        await uploadMany(client, list);
        toast.push({
          status: "success",
          title: "Geüpload",
          description: `${list.length} foto('s) toegevoegd.`,
        });
      } catch (err) {
        toast.push({
          status: "error",
          title: "Upload mislukt",
          description: (err as Error)?.message ?? "Onbekende fout",
        });
      } finally {
        setUploading(false);
      }
    },
    [client, toast],
  );

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleDeleteOne = useCallback(
    async (id: string) => {
      await deleteOne(client, id, toast);
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    },
    [client, toast],
  );

  const handleDeleteSelected = useCallback(async () => {
    setConfirmOpen(false);
    const ids = [...selected];
    setSelected(new Set());
    await deleteMany(client, ids, toast);
  }, [client, toast, selected]);

  return (
    <Flex direction="column" height="fill" style={{ minHeight: 0 }}>
      {/* toolbar */}
      <Card padding={3} borderBottom>
        <Flex align="center" gap={2}>
          <Button
            icon={UploadIcon}
            text="Afbeeldingen importeren"
            tone="primary"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          />
          {uploading && <Spinner muted />}
          <Box flex={1} />
          {selected.size > 0 && (
            <Button
              icon={TrashIcon}
              text={`Verwijder ${selected.size}`}
              tone="critical"
              mode="ghost"
              onClick={() => setConfirmOpen(true)}
            />
          )}
        </Flex>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files) runUpload(e.target.files);
            e.target.value = "";
          }}
        />
      </Card>

      {/* gallery / drop zone */}
      <Box
        flex={1}
        padding={3}
        style={{ overflowY: "auto", ...(dragging ? { outline: "2px dashed #8899ff", outlineOffset: -8 } : {}) }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (e.dataTransfer.files) runUpload(e.dataTransfer.files);
        }}
      >
        {photos === null ? (
          <Flex align="center" justify="center" padding={5}>
            <Spinner muted />
          </Flex>
        ) : photos.length === 0 ? (
          <Flex align="center" justify="center" padding={5}>
            <Text muted size={1}>
              {`Nog geen foto's. Sleep afbeeldingen hierheen of klik op "Afbeeldingen importeren".`}
            </Text>
          </Flex>
        ) : (
          <Grid columns={[2, 2, 3, 4]} gap={3}>
            {photos.map((photo) => (
              <PhotoCard
                key={photo._id}
                photo={photo}
                isSelected={selected.has(photo._id)}
                onToggle={() => toggle(photo._id)}
                onDelete={() => handleDeleteOne(photo._id)}
              />
            ))}
          </Grid>
        )}
      </Box>

      {/* bulk-delete confirmation */}
      {confirmOpen && (
        <Dialog
          id="confirm-bulk-delete"
          header="Foto's verwijderen"
          width={1}
          onClose={() => setConfirmOpen(false)}
          footer={
            <Flex justify="flex-end" gap={2} padding={2}>
              <Button text="Annuleren" mode="ghost" onClick={() => setConfirmOpen(false)} />
              <Button text={`Verwijder ${selected.size}`} tone="critical" onClick={handleDeleteSelected} />
            </Flex>
          }
        >
          <Box padding={4}>
            <Stack space={3}>
              <Text>{`Weet je zeker dat je ${selected.size} foto('s) wilt verwijderen?`}</Text>
              <Text muted size={1}>
                {`Foto's die nog op de site gebruikt worden, blijven behouden.`}
              </Text>
            </Stack>
          </Box>
        </Dialog>
      )}
    </Flex>
  );
}

export default PhotoLibraryPane;
