import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "daxfkv44",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
  deployment: {
    appId: "v9pnvam8bn0qbhngdas2elbj",
  },
});
