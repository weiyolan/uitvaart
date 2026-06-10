# Sanity CMS — operations & handoff

This site's content lives in Sanity (project `daxfkv44`, dataset `production`). The Studio is embedded at `/studio`. All page copy (nl/en/fr) is managed there; `lib/content.ts`, `lib/content-pages.ts` and `lib/constants.ts` remain in the repo **only** as the seed source.

## Architecture

- **Locales** are URL-prefixed: `/nl`, `/en`, `/fr`. `proxy.ts` redirects unprefixed paths (and legacy `/diensten/*`) to the default locale (`nl`) with a 308. Single source of locales: `lib/i18n.ts`.
- **Field-level localization** via `sanity-plugin-internationalized-array` — one document per page/service; structure, slugs, figures and hero variants are shared across languages.
- **Documents** (all structure-controlled, fixed IDs):
  - `siteSettings` — business facts (feed LocalBusiness JSON-LD, footer, contact), nav/footer labels, UI microcopy, default SEO.
  - `homePage` — landing sections (hero, philosophy, process, work, closing).
  - `service` ×3 (`service-uitvaart|portret|huwelijk`) — landing row + full detail page.
- **Data flow**: GROQ in `sanity/lib/queries.ts` projects documents into the legacy `SiteContent`/`ServicePage` shapes (`lib/site-types.ts`, derived from TypeGen). Pages fetch via `sanity/lib/live.ts` (`sanityFetch`) and pass props to the client components.
- **SEO**: per-locale `generateMetadata` (canonical + hreflang incl. x-default), `app/sitemap.ts`, `app/robots.ts`, JSON-LD via `lib/jsonld.ts` + `components/shared/JsonLd.tsx` (ProfessionalService / Service / FAQPage / BreadcrumbList). All metadata/JSON-LD fetches use `stega: false`; logic/serialized values are `stegaClean`-ed.
- **Visual editing**: `defineLive` + `<SanityLive />` + `<VisualEditing />` (draft mode) + the Presentation tool (`sanity/presentation/resolve.ts`).

## Commands

```
npm run dev       # app + studio at http://localhost:3000/studio
npm run seed      # (re)populate the 5 documents from lib/content*.ts — OVERWRITES studio edits
npm run typegen   # regenerate sanity/types.ts after changing GROQ or schema
npm run build
```

After editing GROQ in `sanity/lib/queries.ts` or any schema, run `npm run typegen` and commit `sanity/types.ts`.

**Localized field shape (plugin v5):** the locale is stored on a dedicated `language` field, not `_key` (v4 stored it on `_key`). So queries filter with `field[language == $lang][0].value` and the seed writes `{ _key, _type: "internationalizedArray…Value", language, value }`. If you ever see a "migrate from v4 to v5" banner in the Studio, it means some values lack the `language` field — re-running `npm run seed` rewrites them in the v5 shape.

## Environment

`.env.local` (see `.env.example`):
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`
- `NEXT_PUBLIC_SITE_URL` — drives canonical/sitemap/JSON-LD URLs. Set to the real domain in production.
- `SANITY_API_READ_TOKEN` — runtime reads (live + draft mode).
- `SANITY_API_WRITE_TOKEN` — **seed script only**.

## Manual steps before/after deploy

1. **Netlify env vars** (Site settings → Environment): all `NEXT_PUBLIC_*` (with `NEXT_PUBLIC_SITE_URL=https://<your-domain>`) and `SANITY_API_READ_TOKEN`. **Do not** set `SANITY_API_WRITE_TOKEN` on Netlify.
2. **Sanity CORS** (sanity.io/manage → project → API → CORS origins): add `http://localhost:3000` and the production + deploy-preview Netlify origins, with credentials allowed.
3. **Token hygiene** (recommended): the token currently in `.env.local` is a read/write token that was shared in plaintext. Create a dedicated **Viewer** token for `SANITY_API_READ_TOKEN`, and **rotate** the write token. The browser only ever receives `SANITY_API_READ_TOKEN`, and only during an authenticated Draft Mode session — a Viewer token keeps that exposure read-only.
4. Deploy a **branch preview first** and confirm `/studio` loads in production (guards against the jsdom/parse5 serverless bug — `package.json` `overrides` preempt it; if it still 500s, drop `visionTool` from `sanity.config.ts`).

## Adding real photographs

Every `filmFigure` (and the service index image) has an optional `image` field with required alt text. Upload a scan in the Studio and the frontend swaps the striped placeholder for the real `next/image` automatically (`components/shared/SanityImage.tsx`, LQIP blur included). Remote images are allow-listed in `next.config.ts` (`cdn.sanity.io`).
