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
- **No framework JS.** The only scripts are a small inline mobile-menu toggle and the form success state. Build ships 0 external JS bundles.
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
                         Gallery, ServiceArea, Reviews, EmergencyBand, Contact,
                         Footer, MobileCallBar
  pages/index.astro      assembles the homepage
  assets/photos/         the client's real photos (optimized at build)
public/                  logo, favicon, og-image, robots.txt
```

## Confirmed and remaining items
Most placeholders are now resolved from the client's original site and Facebook:
- **Reviews** — real Facebook recommendations (Chuck Savage, Jaime Duffy, Marcus C. Curtis). Done.
- **Hours** — verified: Mon–Fri 7am–5pm, Sat by appointment, Sun closed.
- **ZIP 56461** — verified. MPCA-certified installer, 20+ years, pump every 2–3 years: verified and used in the FAQ.

Still to confirm with Janele:
- Whether they offer true after-hours / 24/7 emergency response. Copy is currently softened to
  "emergency service available" (their original site never claimed 24/7).
- **Google review link** (`gbpReview` in `site.ts`).
- **Logo vector** (.ai/.eps/.svg) for a clean white-knockout version on dark sections.
- Equipment / drone video (Chris is sourcing) for an optional hero or feature section.

## Not yet wired (next steps)
- **Lead form** shows an inline success state only. Production: POST to the HighLevel
  webhook, then redirect to `/thank-you` for the GA4 conversion event.
- **GTM / GA4** not installed yet (no IDs). Load via Partytown when ready.
- Service and location pages (this is the homepage only).

## Deploy
Vercel auto-detects Astro (static). Push to GitHub and import, or `vercel` CLI.
Use the github-to-vercel deployment flow to avoid the commit-author build block.
