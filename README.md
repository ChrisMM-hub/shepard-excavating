# Shepard Excavating — Homepage Prototype

Astro + hardcoded content homepage for Shepard Excavating and Septic Service, LLC.
Built as the pitch prototype. Brand, photos, and content are the client's real materials.

## Run it

```bash
npm install
npm run dev      # local dev at http://localhost:4321
npm run build    # static output to dist/
npm run preview  # serve the built dist/
```

## Stack
- **Astro 5** (static output), self-hosted **Barlow** fonts, `astro:assets` for AVIF/WebP.
- **No framework JS.** Site interactions stay lightweight; the estimate form uses HighLevel's native inline embed and resize script.
- `@astrojs/sitemap` generates `sitemap-index.xml`. `robots.txt` in `public/`.

## Performance (measured at build)
- HTML ~9.7 KB gzipped, CSS ~6.7 KB gzipped, hero ~73 KB WebP (mobile).
- Well under the 1 MB/page target from the brief.

## Structure
```
src/
  data/site.ts          all business content, services, towns, reviews, FAQs
  layouts/Base.astro     <head>, SEO, OG/Twitter, LocalBusiness + FAQ JSON-LD
  components/            Header, Hero, TrustBar, Services, Materials, WhyUs,
                         Gallery, ServiceArea, Reviews, Contact,
                         Footer, MobileCallBar
  pages/index.astro      assembles the homepage
  assets/photos/         the client's real photos (optimized at build)
public/                  logo, favicon, og-image, robots.txt
```

## Confirmed and remaining items
Most placeholders are now resolved from the client's original site and Facebook:
- **Reviews** — real Facebook recommendations (Chuck Savage, Jaime Duffy, Marcus C. Curtis). Done.
- **Hours** — owner-confirmed: Mon–Fri 7am–5pm; closed Saturday and Sunday.
- **ZIP 56461** — verified. MPCA-certified installer, 20+ years, pump every 2–3 years: verified and used in the FAQ.

Still to confirm with Janele:
- **Google review link** (`gbpReview` in `site.ts`).
- **Logo vector** (.ai/.eps/.svg) for a clean white-knockout version on dark sections.
- Equipment / drone video (Chris is sourcing) for an optional hero or feature section.

## Pages built
- Home, Project Gallery, About, Contact, Thank-You, Privacy Policy
- 9 service pages and 7 location pages, generated from data via `src/pages/[slug].astro`

## Editing content
- **Business facts, reviews, homepage FAQs:** `src/data/site.ts`
- **Service pages** (copy, FAQs, photos, related links): `src/data/services.ts`
- **Location pages** (town copy, local detail, map): `src/data/locations.ts`
- Photos referenced by filename; the resolver lives in `src/lib/images.ts`. Drop new
  images in `src/assets/photos/` or `src/assets/gallery/` and reference the filename.

## Integrations
- **Lead form:** native HighLevel form `Shepard Website Estimate Request` (ID
  `8f2xiLQaiGhgx6T5O7az`), embedded anywhere `QuoteForm.astro` is used. HighLevel
  owns validation, structured address capture, contact creation, and workflow enrollment.
- **GA4:** production-only measurement through `G-TC5EQEJWTB`.
- **Blog** (Phase 2): not built yet.
- 301 redirects for the 3 renamed slugs are in `vercel.json`.

## Deploy
Vercel auto-detects Astro (static). Push to GitHub and import, or `vercel` CLI.
Use the github-to-vercel deployment flow to avoid the commit-author build block.
