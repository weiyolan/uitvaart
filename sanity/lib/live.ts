import { defineLive } from "next-sanity/live";
import { client } from "./client";
import { token } from "./token";

/* Live Content API: sanityFetch handles fetching, caching and invalidation;
   <SanityLive /> (rendered in the frontend root layout) keeps published
   content fresh without redeploys and powers Visual Editing in draft mode. */
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  // Only shared with the browser during a valid Draft Mode session.
  browserToken: token,
});
