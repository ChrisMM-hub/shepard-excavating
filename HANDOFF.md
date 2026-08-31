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
Vercel builds the Astro site to `dist/`. Pushes to `main` auto-deploy after the
linked GitHub author check. The old `/api/lead` serverless function is retired;
the site now embeds HighLevel's native form directly. Any old
`HIGHLEVEL_WEBHOOK_URL`, `TURNSTILE_SECRET`, `PUBLIC_TURNSTILE_SITEKEY`, and
`TURNSTILE_HOSTNAMES` variables and the **Protect lead form** firewall rule are
inert cleanup items and are not required by the current site.

## HighLevel lead pipeline (native-form migration 2026-08-31)

- **Sub-account:** Shepard Excavating (location `o43aKWYnDo6IBr5XtAxK`). It is not in
  the `highlevel-router` credentials CSV, so use the authenticated HighLevel UI until
  credentials are added.
- **Website boundary:** `src/components/QuoteForm.astro` embeds the native HighLevel
  form **Shepard Website Estimate Request** (ID `8f2xiLQaiGhgx6T5O7az`) using the
  same inline embed pattern as Storlie Construction. The form redirects to
  `https://www.shepardexcavating.com/thank-you/` after a successful submission.
- **Fields:** Full Name (required), Email (optional), Phone (required), structured
  HighLevel Address (required and selected through address search), Service Needed
  (required), and Project Details (optional). Service Needed is the contact custom
  field `contact.service_needed`; Project Details uses
  `contact.website_lead_message`.
- **Pipeline:** **Website Leads** → New Lead / Contacted / Quoted / won/lost.
- **Opportunity behavior:** **Allow multiple opportunities per contact** is enabled at
  Settings → Objects → Opportunities so repeat project requests create separate cards
  while contact deduplication remains intact.
- **Workflow:** **Website Lead Intake | Native Form v2** (ID
  `c0106d7c-93ac-49bf-9063-fcf3769ce31c`; published). Native Form Submitted trigger, limited to
  the Shepard form, then:
  1. Add a permanent **Website estimate request** note containing service, structured
     address, project details, phone, and email at submission time.
  2. Create a **Website Leads / New Lead** opportunity named
     `Contact.Full Name - Contact.Custom Fields.Service Needed`.
  3. Email an internal notification to `Shepardexcavating@gmail.com` from
     **Shepard Excavating Website** `<website@mail.shepardexcavating.com>`. The email
     contains the validated name, phone, and email merge fields and points staff to
     the permanent note for service, address, and project details.
- **Legacy workflow:** **Website Lead Intake** (ID
  `1aae254c-167b-40ee-8932-6cd54f041bea`) is the retired inbound-webhook path. Keep it
  only for historical execution records; it is not used by the native form.

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

Status: **PROVISIONED_NOT_LAUNCH_VERIFIED**. The form and workflow were configured,
the website integration tests passed, and the production build completed. No live lead
was submitted during the 2026-08-31 migration. After deployment, submit once with
contact details you control, note the time, and verify:

1. the website reaches `/thank-you/` with no error;
2. one matching HighLevel contact and one New Lead opportunity exist;
3. the workflow execution finishes all three actions;
4. the notification appears in Gmail Inbox (also check Spam and category tabs); and
5. Gmail **Show original** reports SPF, DKIM, and DMARC PASS with the expected From.

Do not delete historical contacts or opportunities unless the exact test record is
uniquely identified and deletion is explicitly approved. SMS notification remains
intentionally unconfigured.

## TinaCMS (live since 2026-08-18)

A git-backed CMS is live at `/admin`. Content the staff editor can change lives
in `/content` (JSON overlays on the TS data); service and town hero photos can
be replaced periodically, and uploads land in `public/uploads` where they are
auto-compressed at build. Homepage and gallery photo rotations remain curated
site updates when a new batch is provided. Full details: `TINA-SETUP.md`.
