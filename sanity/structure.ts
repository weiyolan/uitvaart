import type { StructureResolver } from "sanity/structure";
import { CogIcon, HomeIcon, ImagesIcon } from "@sanity/icons";

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
        .child(S.documentTypeList("photo").title("Beeldbibliotheek")),
      S.listItem()
        .title("Site-instellingen")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Site-instellingen")),
    ]);
