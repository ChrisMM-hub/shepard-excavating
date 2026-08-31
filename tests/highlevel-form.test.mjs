import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const quoteFormPath = new URL('../src/components/QuoteForm.astro', import.meta.url);
const baseLayoutPath = new URL('../src/layouts/Base.astro', import.meta.url);

test('uses the approved native HighLevel form embed', async () => {
  const source = await readFile(quoteFormPath, 'utf8');

  assert.match(source, /8f2xiLQaiGhgx6T5O7az/);
  assert.match(source, /api\.leadconnectorhq\.com\/widget\/form/);
  assert.match(source, /link\.msgsndr\.com\/js\/form_embed\.js/);
  assert.match(source, /Shepard Website Estimate Request/);
  assert.match(source, /data-layout='\{"id":"INLINE"\}'/);
  assert.match(source, /data-cookie-consent="true"/);
  assert.match(source, /href="\/privacy-policy\/"/);
});

test('does not retain the retired webhook or external-form integration', async () => {
  const [quoteForm, baseLayout] = await Promise.all([
    readFile(quoteFormPath, 'utf8'),
    readFile(baseLayoutPath, 'utf8'),
  ]);

  assert.doesNotMatch(quoteForm, /\/api\/lead|TURNSTILE|HIGHLEVEL_WEBHOOK|external-tracking/);
  assert.doesNotMatch(baseLayout, /external-tracking|data-tracking-id/);
});
