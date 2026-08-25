# TinaCMS Setup (Shepard Excavating)

Status: **Tina Cloud is live (2026-08-18).** Project `shepard-excavating`
exists at app.tina.io (ChrisMM-hub org), the main branch is indexed, and the
editor is available at `/admin`. Vercel builds with `npm run build:auto`, which
uses Tina when its environment variables are present and falls back to the
plain Astro build otherwise.

## What the CMS covers

| Collection | Files | Editable |
|---|---|---|
| Service Pages | `content/services/*.json` (9) | heading, search title/description, intro, included list, price factors, timeline, expectations, FAQs, optional hero photo replacement, optional photo-strip replacement |
| Town Pages | `content/locations/*.json` (7) | heading, search title/description, intro, local paragraph, FAQs, optional hero photo replacement |
| Homepage | `content/site/homepage.json` | hero headline + call button + optional background photo, the three feature bands (heading, paragraphs, button label, optional photo), the calculator banner |
| Customer Reviews | `content/site/reviews.json` | the homepage review cards (Google/Facebook source, quote, name, date) |
| Homepage FAQs | `content/site/faqs.json` | the homepage FAQ section |
| Project Gallery | `content/site/gallery.json` | the full gallery: remove, reorder, recategorize, add uploads (seeded with the 35 curated photos) |
| About Page Photos | `content/site/about.json` | optional replacements for the banner and crew photos |

Everything else (nav, slugs, layout, phone/schema data, the quote form,
photo art direction like crops and section order) is locked in the code and
not exposed to editors. All uploads land in `public/uploads` and are
compressed by `scripts/optimize-uploads.mjs` on every build.

## How the data flows

- `src/data/{site,services,locations}.ts` hold the full data as **fallback
  defaults**. The JSON in `/content` (what Tina edits) is **overlaid on top** at
  build time via `src/lib/content.ts`. JSON wins; deleting a JSON file reverts
  that page to the TS copy.
- Structure and copy are separated on purpose: editors can never break a route,
  the nav, or image wiring from the CMS.

## Images

- Tina's media manager uploads to `public/uploads/`.
- `scripts/optimize-uploads.mjs` runs before every build (`prebuild`) and
  compresses anything in that folder in place (max 1920px wide, ~quality 78),
  so an editor upload can never ship uncompressed.
- Service and town pages have an optional "Replace Hero Photo" field. Empty
  field = the art-directed photo from `src/assets` (fully optimized by Astro).
- Homepage and project-gallery rotations remain curated site updates. Collect
  the new original photos and preferred placements before each periodic refresh.

## Local editing (works today)

```bash
npm run dev        # site at localhost:4321, CMS at localhost:4321/admin/index.html
```

Local mode edits write straight to the files in `/content` and
`public/uploads/`; commit them like any other change. `npm run dev:site` runs
plain Astro without the CMS.

## Go-live configuration

1. Create a project at app.tina.io (free tier, 2 editors), connect it to the
   `ChrisMM-hub/shepard-excavating` GitHub repo, branch `main`.
2. Copy the project's **Client ID** and generate a **read-only token**.
3. In Vercel → shepard-excavating → Settings → Environment Variables, add
   `TINA_PUBLIC_CLIENT_ID`, `TINA_TOKEN` (read-only content token), and
   `TINA_SEARCH_TOKEN` (search token; powers the editor's search box and is
   required once the search block is in tina/config.ts, since the schema must
   match what the cloud indexed).
4. In Vercel → Settings → Build & Development, set the build command to
   `npm run build:tina` (builds the admin UI + indexes content).
5. Push/redeploy. The CMS is live at shepardexcavating.com/admin.
6. In app.tina.io, invite the staff editor by email (no GitHub account needed).
   Their saves become commits to `main` by the Tina bot, and Vercel redeploys
   (~2 min).

⚠️ Commits must still be authored/pushed per HANDOFF.md (`ChrisMM-hub`) when
working from this machine. Tina Cloud's commits come from Tina's GitHub app and
are not affected by the Vercel author block.

## Rollback

Any CMS edit is a normal git commit; revert it in GitHub or locally. Removing
the `/content` folder entirely reverts every page to the TS fallback copy.
