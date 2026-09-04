import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('keeps the demo route isolated from the production homepage', async () => {
  const [page, layout, contact, quoteCard] = await Promise.all([
    source('src/pages/demo-homepage.astro'),
    source('src/layouts/DemoBase.astro'),
    source('src/components/DemoContact.astro'),
    source('src/components/DemoQuoteCard.astro'),
  ]);

  assert.match(page, /DemoBase/);
  assert.match(page, /DemoHero/);
  assert.match(page, /DemoContact/);
  assert.match(layout, /noindex, nofollow, noarchive/);
  assert.doesNotMatch(layout, /googletagmanager|gtag\(/);
  assert.match(contact, /DemoQuoteCard/);
  assert.doesNotMatch(contact, /QuoteForm/);
  assert.match(quoteCard, /does not submit customer information/);
  assert.doesNotMatch(quoteCard, /leadconnectorhq|msgsndr/);
});

test('ships separate desktop and mobile web video assets', async () => {
  const hero = await source('src/components/DemoHero.astro');

  assert.match(hero, /shepard-hero-desktop\.mp4/);
  assert.match(hero, /shepard-hero-mobile\.mp4/);
  assert.match(hero, /prefers-reduced-motion: reduce/);
  assert.match(hero, /data-motion-control/);
  assert.match(hero, /userPaused/);
  assert.doesNotMatch(hero, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.hero-video \{ display: none; \}/);
});

test('keeps the review route out of discovery surfaces', async () => {
  const [astroConfig, vercelConfig] = await Promise.all([
    source('astro.config.mjs'),
    source('vercel.json'),
  ]);

  assert.match(astroConfig, /demo-homepage/);
  assert.match(vercelConfig, /X-Robots-Tag/);
  assert.match(vercelConfig, /noindex, nofollow, noarchive/);
});
