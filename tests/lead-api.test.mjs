import assert from 'node:assert/strict';
import test from 'node:test';

import { handleLeadRequest } from '../api/lead.js';

const endpoint = 'https://www.shepardexcavating.com/api/lead';
const origin = 'https://www.shepardexcavating.com';
const quietLogger = { error() {} };

function request(body, options = {}) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Origin: origin,
    'X-Forwarded-For': options.ip || '203.0.113.10',
    ...options.headers,
  };

  return new Request(endpoint, {
    method: options.method || 'POST',
    headers,
    body: options.method === 'GET' ? undefined : JSON.stringify(body),
  });
}

function validLead(overrides = {}) {
  return {
    name: 'Pat Example',
    phone: '(218) 555-0142',
    email: 'pat@example.com',
    service: 'Excavating',
    address: '123 Lake Road, Laporte',
    location: 'Laporte',
    message: 'Please call about a site-prep estimate.',
    page: 'https://www.shepardexcavating.com/excavating/',
    companyWebsite: '',
    ...overrides,
  };
}

function options(fetchImpl, overrides = {}) {
  return {
    webhookUrl: 'https://highlevel.invalid/webhook',
    fetchImpl,
    now: () => 5_000,
    disableRateLimit: true,
    logger: quietLogger,
    ...overrides,
  };
}

test('forwards a valid lead and returns success only after HighLevel accepts it', async () => {
  let forwarded;
  const response = await handleLeadRequest(
    request(validLead()),
    options(async (url, init) => {
      forwarded = { url, init, body: JSON.parse(init.body) };
      return new Response(null, { status: 200 });
    }),
  );

  assert.equal(response.status, 202);
  assert.deepEqual(await response.json(), { ok: true, accepted: true });
  assert.equal(forwarded.url, 'https://highlevel.invalid/webhook');
  assert.equal(forwarded.init.method, 'POST');
  assert.equal(forwarded.body.source, 'Website quote form');
  assert.equal(forwarded.body.address, '123 Lake Road, Laporte');
  assert.equal(forwarded.body.location, '123 Lake Road, Laporte');
  assert.match(forwarded.body.submissionId, /^[0-9a-f-]{36}$/);
});

test('requires an address even when a service-area page location is present', async () => {
  let calls = 0;
  const response = await handleLeadRequest(
    request(validLead({ address: '', location: 'Bemidji' }), { ip: '203.0.113.20' }),
    options(async (url, init) => {
      calls += 1;
      return new Response(null, { status: 200 });
    }),
  );

  assert.equal(response.status, 422);
  assert.deepEqual(await response.json(), { ok: false, error: 'Address is required.' });
  assert.equal(calls, 0);
});

test('does not report success when HighLevel returns an error', async () => {
  const response = await handleLeadRequest(
    request(validLead(), { ip: '203.0.113.11' }),
    options(async () => new Response(null, { status: 503 })),
  );

  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { ok: false, error: 'We could not deliver your request.' });
});

test('does not report success when the HighLevel request fails', async () => {
  const response = await handleLeadRequest(
    request(validLead(), { ip: '203.0.113.12' }),
    options(async () => {
      throw new Error('local simulated outage');
    }),
  );

  assert.equal(response.status, 502);
});

test('rejects invalid lead data before calling HighLevel', async () => {
  let calls = 0;
  const response = await handleLeadRequest(
    request(validLead({ phone: '12', email: 'not-an-email' }), { ip: '203.0.113.13' }),
    options(async () => {
      calls += 1;
      return new Response(null, { status: 200 });
    }),
  );

  assert.equal(response.status, 422);
  assert.equal(calls, 0);
});

test('requires the contact details and project message before calling HighLevel', async () => {
  let calls = 0;
  const response = await handleLeadRequest(
    request(validLead({ email: '', service: '', address: '', message: '' }), { ip: '203.0.113.22' }),
    options(async () => {
      calls += 1;
      return new Response(null, { status: 200 });
    }),
  );

  assert.equal(response.status, 422);
  assert.deepEqual(await response.json(), {
    ok: false,
    error: 'Email, Service needed, Address, Project details are required.',
  });
  assert.equal(calls, 0);
});

test('rejects JSON values that are not lead objects', async () => {
  let calls = 0;
  const response = await handleLeadRequest(
    request(null, { ip: '203.0.113.21' }),
    options(async () => {
      calls += 1;
      return new Response(null, { status: 200 });
    }),
  );

  assert.equal(response.status, 400);
  assert.equal(calls, 0);
});

test('honeypot submissions look successful but never reach HighLevel', async () => {
  let calls = 0;
  const response = await handleLeadRequest(
    request(validLead({ companyWebsite: 'https://spam.invalid' }), { ip: '203.0.113.14' }),
    options(async () => {
      calls += 1;
      return new Response(null, { status: 200 });
    }),
  );

  assert.equal(response.status, 202);
  assert.deepEqual(await response.json(), { ok: true, accepted: false });
  assert.equal(calls, 0);
});

test('rejects cross-origin requests', async () => {
  const response = await handleLeadRequest(
    request(validLead(), {
      ip: '203.0.113.16',
      headers: { Origin: 'https://spam.invalid' },
    }),
    options(async () => new Response(null, { status: 200 })),
  );

  assert.equal(response.status, 403);
});

test('supports a native form submission when JavaScript is unavailable', async () => {
  const body = new URLSearchParams(validLead()).toString();
  const nativeRequest = new Request(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Origin: origin,
      Referer: `${origin}/contact/`,
      'X-Forwarded-For': '203.0.113.17',
    },
    body,
  });

  const response = await handleLeadRequest(
    nativeRequest,
    options(async () => new Response(null, { status: 200 })),
  );

  assert.equal(response.status, 303);
  assert.equal(response.headers.get('location'), `${origin}/thank-you/`);
});

test('requires server-side HighLevel configuration', async () => {
  const response = await handleLeadRequest(
    request(validLead(), { ip: '203.0.113.18' }),
    {
      webhookUrl: '',
      now: () => 5_000,
      disableRateLimit: true,
      logger: quietLogger,
    },
  );

  assert.equal(response.status, 503);
});

test('allows only POST requests', async () => {
  const response = await handleLeadRequest(
    request(null, { method: 'GET', ip: '203.0.113.19' }),
    options(async () => new Response(null, { status: 200 })),
  );

  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'POST');
});
