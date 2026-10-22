import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('places the Walker project between the septic and Fisher sections', async () => {
  const page = await source('src/pages/index.astro');
  const septic = page.indexOf('heading={feat.septic.heading}');
  const project = page.indexOf('<ProjectVideoShowcase />');
  const fisher = page.indexOf('heading={feat.fisher.heading}');

  assert.match(page, /import ProjectVideoShowcase/);
  assert.ok(septic >= 0 && project > septic && fisher > project);
});

test('ships a responsive, user-initiated Walker project video', async () => {
  const section = await source('src/components/ProjectVideoShowcase.astro');

  assert.match(section, /Recent Project Highlight/);
  assert.match(section, /on Leech Lake, Minnesota/);
  assert.match(section, /Walker, Minnesota/);
  assert.match(section, /shepard-hero-desktop\.mp4/);
  assert.match(section, /shepard-hero-mobile\.mp4/);
  assert.match(section, /shepard-hero-desktop-poster\.jpg/);
  assert.match(section, /shepard-hero-mobile-poster\.jpg/);
  assert.match(section, /preload="none"/);
  assert.match(section, /aria-hidden="true"/);
  assert.match(section, /data-project-play/);
  assert.match(section, /video\.controls = true/);
  assert.match(section, /loadeddata/);
  assert.match(section, /is-loading/);
  assert.doesNotMatch(section, /Silent video|27 seconds|meta-runtime/);
  assert.match(section, /href="\/septic-system"/);
  assert.doesNotMatch(section, /<video[\s\S]*?\sautoplay(?:\s|>)/);
  assert.doesNotMatch(section, /\u2014/);
});
