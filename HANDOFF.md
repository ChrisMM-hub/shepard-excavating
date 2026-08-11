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
Vercel builds the Astro site to `dist/` and serves the same-origin serverless function
at `api/lead.js`. Pushes to `main` auto-deploy after the linked GitHub author check.

The Vercel project must have the sensitive environment variable
`HIGHLEVEL_WEBHOOK_URL` in Production and Preview. Its value belongs only in Vercel,
never in source or this file. The production firewall rule **Protect lead form** limits
POST `/api/lead` to five requests per IP per 600 seconds and returns HTTP 429 after the
limit.

## HighLevel lead pipeline (configured 2026-08-11)

- **Sub-account:** Shepard Excavating (location `o43aKWYnDo6IBr5XtAxK`). It is not in
  the `highlevel-router` credentials CSV, so use the authenticated HighLevel UI until
  credentials are added.
- **Website boundary:** `src/components/QuoteForm.astro` POSTs JSON to `/api/lead`.
  `api/lead.js` validates origin and fields, applies honeypot/size/rate checks,
  forwards to the protected HighLevel URL, requires a successful upstream response,
  and only then returns success. A native no-JavaScript POST fallback uses the same
  endpoint. GA4 `generate_lead` fires only after HighLevel accepts the request.
- **Pipeline:** **Website Leads** → New Lead / Contacted / Quoted / won/lost.
- **Workflow:** **Website Lead Intake** (published; ID
  `1aae254c-167b-40ee-8932-6cd54f041bea`). Inbound Webhook →
  1. Create/Update Contact — full name, phone, email, and source.
  2. Create/Update Opportunity — Website Leads / New Lead / open, named
     `name - service`, with website source.
  3. Internal Notification → `Shepardexcavating@gmail.com` from
     **Shepard Excavating Website** `<website@mail.shepardexcavating.com>`.
- **Notification subject:** `New website lead: name — service` using the corresponding
  inbound-webhook merge tokens.
- **Notification body:** name, phone, email, service, property address/area, project
  details, source, and page. The saved webhook schema predates the `address` key, so
  the server mirrors `address` into the validated `location` compatibility key and
  falls back to the service-area page location when address is empty.
- **Payload keys:** name, phone, email, service, address, location, message, source,
  page, and submissionId. Source, trusted page, location precedence, and submissionId
  are finalized server-side.

## Email authentication

- Dedicated LeadConnector domain: `mail.shepardexcavating.com`.
- GoDaddy has the exact HighLevel-generated SPF, DKIM, tracking CNAME, two MX, and
  subdomain DMARC records. Both authoritative nameservers returned them on 2026-08-11.
- HighLevel reports the domain Active, all six provider records Verified, SSL Issued,
  and warmup Stage 1.
- Root `_dmarc.shepardexcavating.com` is monitoring-only (`p=none`). Tighten only after
  every legitimate sender is inventoried and passing alignment.
- The root domain has no MX, so do not create `@shepardexcavating.com` mailboxes without
  a separate mailbox-provider setup. This does not affect notifications delivered to
  the existing Gmail recipient.

## Verification status and next action

No live lead was submitted during the 2026-08-11 configuration work. Chris chose to
submit the production test manually. After deployment, submit once with contact details
you control, note the time, and verify:

1. the website reaches `/thank-you/` with no error;
2. one matching HighLevel contact and one New Lead opportunity exist;
3. the workflow execution finishes all three actions;
4. the notification appears in Gmail Inbox (also check Spam and category tabs); and
5. Gmail **Show original** reports SPF, DKIM, and DMARC PASS with the expected From.

Do not delete historical contacts or opportunities unless the exact test record is
uniquely identified and deletion is explicitly approved. SMS notification remains
intentionally unconfigured.
