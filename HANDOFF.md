# Handoff Notes — Shepard Excavating site

## ⚠️ Critical: commits must be authored as ChrisMM-hub
Vercel blocks builds whose commit author is not linked to the Vercel team. This repo
must use the local author override (already set in `.git/config`):

```bash
git config user.name "ChrisMM-hub"
git config user.email "278738117+ChrisMM-hub@users.noreply.github.com"
```

The machine's global identity (`cjwestlund-glitch`) is the unlinked account and will
cause a BLOCKED deployment. Verify before pushing:

```bash
git log -1 --format='author: %an <%ae>'   # must say ChrisMM-hub
```

## What this is
The homepage prototype for Shepard Excavating and Septic Service, LLC. Astro static,
hardcoded content in `src/data/site.ts`. See `README.md` for run/build/deploy and the
list of PLACEHOLDER items to confirm with Janele (reviews, hours, ZIP, logo vector).

## Deploy
Vercel auto-detects Astro (static, builds to `dist/`). Import the repo in the Vercel
dashboard; later pushes auto-deploy.
