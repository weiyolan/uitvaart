import type { SchemaTypeDefinition } from "sanity";

import { seoType } from "./objects/seoType";
import { filmFigureType } from "./objects/filmFigureType";
import { processStepType } from "./objects/processStepType";
import { localizedItemType, localizedParagraphType } from "./objects/localizedItems";
import { photoType } from "./objects/photoType";
import { siteSettingsType } from "./documents/siteSettingsType";
import { homePageType } from "./documents/homePageType";
import { serviceType } from "./documents/serviceType";

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  seoType,
  filmFigureType,
  processStepType,
  localizedItemType,
  localizedParagraphType,
  // documents
  photoType,
  siteSettingsType,
  homePageType,
  serviceType,
];
