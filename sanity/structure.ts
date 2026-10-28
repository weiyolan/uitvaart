import type { StructureResolver } from "sanity/structure";
import { CogIcon, CommentIcon, EnvelopeIcon, HomeIcon, ImagesIcon, InboxIcon } from "@sanity/icons";
import { PhotoLibraryPane } from "./components/PhotoLibraryPane";

/* Logical flow, most-used first:
   1. Berichten  — what came in (inbox), newest first
   2. Pagina's   — homepage + the three services, then the photo library
   3. Instellingen — mail & berichten, site settings
   Every document is at most two clicks away. All other types (including any
   legacy ones in the dataset) stay hidden. */

const messageList = (S: Parameters<StructureResolver>[0], title: string, filter: string) =>
  S.documentList()
    .title(title)
    .schemaType("contactMessage")
    .filter(`_type == "contactMessage" && ${filter}`)
    .defaultOrdering([{ field: "receivedAt", direction: "desc" }]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhoud")
    .items([
      S.listItem()
        .title("Nieuwe berichten")
        .icon(InboxIcon)
        .child(messageList(S, "Nieuwe berichten", `coalesce(status, "new") == "new"`)),
      S.listItem()
        .title("Alle berichten")
        .icon(CommentIcon)
        .child(messageList(S, "Alle berichten", "true")),
      S.divider(),
      S.listItem()
        .title("Homepagina")
        .icon(HomeIcon)
        .child(S.document().schemaType("homePage").documentId("homePage").title("Homepagina")),
      S.listItem()
        .title("Diensten")
        .icon(ImagesIcon)
        .child(
          S.documentTypeList("service")
            .title("Diensten")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.divider(),
      S.listItem()
        .title("Beeldbibliotheek")
        .icon(ImagesIcon)
        .child(
          // Custom gallery pane (multi-upload, bulk select/delete). Clicking a
          // tile resolves to the standard photo form via this child resolver.
          S.component(PhotoLibraryPane)
            .id("photoLibrary")
            .title("Beeldbibliotheek")
            .child((documentId) => S.document().documentId(documentId).schemaType("photo"))
            .canHandleIntent(
              (intent, params) =>
                ["create", "edit"].includes(intent) && params?.type === "photo",
            ),
        ),
      S.divider(),
      S.listItem()
        .title("Mail & berichten")
        .icon(EnvelopeIcon)
        .child(S.document().schemaType("mailSettings").documentId("mailSettings").title("Mail & berichten")),
      S.listItem()
        .title("Site-instellingen")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Site-instellingen")),
    ]);
