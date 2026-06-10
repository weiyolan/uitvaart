import type { StructureResolver } from "sanity/structure";
import { CogIcon, HomeIcon, ImagesIcon, ThLargeIcon } from "@sanity/icons";
import { PhotoLibraryPane } from "./components/PhotoLibraryPane";
import { BeeldenOverviewPane } from "./components/BeeldenOverviewPane";

/* Pinned singletons + the three services in fixed order. All other types
   (including any legacy ones in the dataset) stay hidden. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhoud")
    .items([
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
      S.listItem()
        .title("Beelden")
        .icon(ThLargeIcon)
        .child(S.component(BeeldenOverviewPane).id("beeldenOverview").title("Beelden")),
      S.listItem()
        .title("Site-instellingen")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Site-instellingen")),
    ]);
