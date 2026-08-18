// Overlays TinaCMS-edited JSON (in /content) onto the TS fallback data in src/data.
// The TS literals remain the fallback defaults; whatever the CMS has saved wins.
// Deleting a JSON file (or this folder) reverts the site to the TS copy, so a bad
// CMS state can always be rolled back with git.
// The ternary keeps this module importable under plain Node (e.g. the
// scripts/extract-content.mjs one-off), where import.meta.glob doesn't exist;
// Vite still statically compiles the glob call for the site build.
const mods: Record<string, unknown> =
  typeof (import.meta as { glob?: unknown }).glob === 'function'
    ? import.meta.glob('../../content/**/*.json', { eager: true })
    : {};

export function contentJson<T>(rel: string): T | undefined {
  const hit = Object.entries(mods).find(([p]) => p.endsWith(`/content/${rel}.json`));
  if (!hit) return undefined;
  const mod = hit[1] as { default?: T };
  return (mod.default ?? (mod as unknown)) as T;
}
