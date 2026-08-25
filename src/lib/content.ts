// Overlays TinaCMS-edited JSON (in /content) onto the TS fallback data in src/data.
// The TS literals remain the fallback defaults; whatever the CMS has saved wins.
// Deleting a JSON file (or this folder) reverts the site to the TS copy, so a bad
// CMS state can always be rolled back with git.
// The try/catch keeps this module importable under plain Node, where
// import.meta.glob doesn't exist. Under Vite the glob call is statically
// compiled into an object literal, so the assignment cannot throw there.
// (Do NOT guard this with `typeof import.meta.glob === 'function'`: that
// check is evaluated at RUNTIME, where Vite provides no glob function, so
// it silently disables the whole CMS overlay in dev and build alike.)
let globbed: Record<string, unknown> = {};
try {
  globbed = import.meta.glob('../../content/**/*.json', { eager: true });
} catch {
  /* plain Node: no CMS overlay, TS fallbacks apply */
}
const mods: Record<string, unknown> = globbed;

export function contentJson<T>(rel: string): T | undefined {
  const hit = Object.entries(mods).find(([p]) => p.endsWith(`/content/${rel}.json`));
  if (!hit) return undefined;
  const mod = hit[1] as { default?: T };
  return (mod.default ?? (mod as unknown)) as T;
}
