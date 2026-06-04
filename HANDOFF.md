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

## HighLevel lead pipeline (live, tested 2026-05-29)
The quote form (`src/components/QuoteForm.astro`) POSTs leads as `application/json`
to a HighLevel Inbound Webhook. HL's webhook answers the CORS preflight with
`Access-Control-Allow-Origin: *`, so the browser POST works cross-origin. It needs a
JSON body (it rejects `text/plain`).

- **Sub-account:** Shepard Excavating (location `o43aKWYnDo6IBr5XtAxK`). Brand-new — not
  yet in the `highlevel-router` MCP credentials CSV, so verify in the HL UI, not via MCP.
- **Webhook URL:** stored in `src/data/site.ts` as `highlevelWebhook`. Empty string =
  demo mode (inline success, no POST).
- **Pipeline:** "Website Leads" → stages New Lead / Contacted / Quoted / (won/lost).
- **Workflow:** "Website Lead Intake" (published). Inbound Webhook →
  1. Create/Update Contact — Full Name `{{...name}}`, Phone `{{...phone}}`,
     Email `{{...email}}`, Contact Source `{{...source}}`.
  2. Create/Update Opportunity — pipeline Website Leads, stage New Lead, status open,
     name `{{...name}} - {{...service}}`, source `{{...source}}`.
  3. Internal Notification (email) → Shepardexcavating@gmail.com with all lead fields
     (name, phone, email, service, town, urgency, message, source, page).
- **Form payload keys:** name, phone, email, service, location, urgency, message,
  source, page. Merge tokens are `{{inboundWebhookRequest.<key>}}`.
- **Verified:** a test lead created the contact (fields correct), created the opportunity
  (named correctly), and the workflow reached "Finished". A test contact
  "Website Test (please ignore)" + its opportunity remain in the CRM — safe to delete.

### Follow-ups
- The sub-account has no verified sending domain yet, so the internal-notification email
  sends from a default LeadConnector address and may land in spam. Configure email
  sending (domain + DKIM) for reliable delivery before launch.
- SMS notification to Janele intentionally NOT set up yet (per Chris).
- To operate this sub-account via the `highlevel-router` MCP later, add it to
  `~/Documents/HighLevel/HL_Credentials.csv`.
