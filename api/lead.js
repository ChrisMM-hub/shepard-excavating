const MAX_BODY_BYTES = 24 * 1024;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_RATE_LIMIT_KEYS = 1000;

// Best-effort protection for repeated requests that land on the same warm function
// instance. The origin check and honeypot provide the durable application layers;
// this map simply absorbs obvious bursts before they reach HighLevel.
const rateLimits = new Map();

function json(body, status = 200, headers = {}) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...headers,
    },
  });
}

function wantsJson(request) {
  return request.headers.get('accept')?.includes('application/json') ?? false;
}

function redirectBack(request) {
  const requestUrl = new URL(request.url);
  let destination;

  try {
    destination = new URL(request.headers.get('referer') || '/', requestUrl);
  } catch {
    destination = new URL('/', requestUrl);
  }

  if (destination.origin !== requestUrl.origin) destination = new URL('/', requestUrl);
  destination.searchParams.set('lead_error', '1');
  destination.hash = 'quote';
  return Response.redirect(destination, 303);
}

function failure(request, message, status) {
  if (wantsJson(request)) return json({ ok: false, error: message }, status);
  return redirectBack(request);
}

function success(request, accepted = true) {
  if (wantsJson(request)) return json({ ok: true, accepted }, 202);
  return Response.redirect(new URL('/thank-you/', request.url), 303);
}

function requestIp(request) {
  return (
    request.headers.get('x-vercel-forwarded-for') ||
    request.headers.get('x-forwarded-for') ||
    'unknown'
  )
    .split(',')[0]
    .trim();
}

function isRateLimited(request, now) {
  if (rateLimits.size >= MAX_RATE_LIMIT_KEYS) {
    for (const [key, value] of rateLimits) {
      if (value.resetAt <= now) rateLimits.delete(key);
    }

    while (rateLimits.size >= MAX_RATE_LIMIT_KEYS) {
      const oldestKey = rateLimits.keys().next().value;
      if (oldestKey === undefined) break;
      rateLimits.delete(oldestKey);
    }
  }

  const ip = requestIp(request);
  const current = rateLimits.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT;
}

function sameOriginRequest(request) {
  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get('origin');
  if (origin) return origin === requestOrigin;

  const referer = request.headers.get('referer');
  if (!referer) return false;

  try {
    return new URL(referer).origin === requestOrigin;
  } catch {
    return false;
  }
}

async function parseBody(request) {
  const declaredLength = Number(request.headers.get('content-length') || 0);
  if (declaredLength > MAX_BODY_BYTES) throw new Error('payload-too-large');

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    throw new Error('payload-too-large');
  }

  const contentType = request.headers.get('content-type')?.split(';')[0].trim();
  if (contentType === 'application/json') return JSON.parse(rawBody);
  if (contentType === 'application/x-www-form-urlencoded') {
    return Object.fromEntries(new URLSearchParams(rawBody));
  }

  throw new Error('unsupported-content-type');
}

function clean(value) {
  return typeof value === 'string' ? value.replaceAll('\0', '').trim() : '';
}

function validateLead(raw) {
  const lead = {
    name: clean(raw.name),
    phone: clean(raw.phone),
    email: clean(raw.email),
    service: clean(raw.service),
    address: clean(raw.address),
    location: clean(raw.location),
    message: clean(raw.message),
    page: clean(raw.page),
  };

  const limits = {
    name: 120,
    phone: 40,
    email: 254,
    service: 120,
    address: 240,
    location: 120,
    message: 4000,
    page: 2048,
  };

  if (!lead.name || !lead.phone) return { error: 'Name and phone are required.' };
  if (Object.entries(limits).some(([field, limit]) => lead[field].length > limit)) {
    return { error: 'One or more fields are too long.' };
  }

  const phoneDigits = lead.phone.replace(/\D/g, '');
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    return { error: 'Enter a valid phone number.' };
  }

  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return { error: 'Enter a valid email address.' };
  }

  return { lead };
}

function trustedPage(value, request) {
  const requestUrl = new URL(request.url);

  try {
    const pageUrl = new URL(value || request.headers.get('referer') || '/', requestUrl);
    if (pageUrl.origin === requestUrl.origin) return pageUrl.href;
  } catch {
    // Fall through to a safe same-origin URL.
  }

  return new URL('/', requestUrl).href;
}

/**
 * Handles a lead request. Optional overrides keep tests entirely local and prevent
 * them from contacting the real HighLevel webhook.
 */
export async function handleLeadRequest(request, overrides = {}) {
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed.' }, 405, { Allow: 'POST' });
  }

  if (!sameOriginRequest(request)) {
    return failure(request, 'Request origin was not accepted.', 403);
  }

  const now = overrides.now?.() ?? Date.now();
  if (!overrides.disableRateLimit && isRateLimited(request, now)) {
    return failure(request, 'Too many requests. Please call us or try again shortly.', 429);
  }

  let raw;
  try {
    raw = await parseBody(request);
  } catch (error) {
    const status = error instanceof Error && error.message === 'payload-too-large' ? 413 : 400;
    return failure(request, 'We could not read that request.', status);
  }

  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return failure(request, 'We could not read that request.', 400);
  }

  // Bots commonly fill fields that visitors never see. Return a normal-looking
  // success without sending anything so the field remains an effective trap.
  if (clean(raw.companyWebsite)) return success(request, false);

  const validation = validateLead(raw);
  if (validation.error) return failure(request, validation.error, 422);

  const webhookUrl = overrides.webhookUrl ?? process.env.HIGHLEVEL_WEBHOOK_URL;
  const logger = overrides.logger ?? console;
  if (!webhookUrl) {
    logger.error('Lead endpoint is missing its HighLevel configuration.');
    return failure(request, 'Lead delivery is temporarily unavailable.', 503);
  }

  const lead = validation.lead;
  const payload = {
    ...lead,
    // The existing HighLevel workflow has a validated `location` merge field.
    // Populate it with the visitor's property address, falling back to the
    // service-area page context when no address was entered.
    location: lead.address || lead.location,
    page: trustedPage(lead.page, request),
    source: 'Website quote form',
    submissionId: crypto.randomUUID(),
  };

  const send = overrides.fetchImpl ?? fetch;
  let upstream;
  try {
    upstream = await send(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
  } catch (error) {
    logger.error('HighLevel lead delivery failed before a response was received.', error);
    return failure(request, 'We could not deliver your request.', 502);
  }

  if (!upstream.ok) {
    logger.error(`HighLevel lead delivery returned HTTP ${upstream.status}.`);
    return failure(request, 'We could not deliver your request.', 502);
  }

  return success(request);
}

export default {
  fetch(request) {
    return handleLeadRequest(request);
  },
};
