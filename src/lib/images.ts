// Resolve an image basename to its processed ImageMetadata, so data files can
// reference photos by filename (e.g. 'svc-excavating.jpg') and pages stay data-driven.
const mods = import.meta.glob<{ default: ImageMetadata }>(
  ['../assets/photos/*.{jpg,jpeg,png}', '../assets/gallery/*.jpg'],
  { eager: true }
);

const map: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(mods)) {
  const name = path.split('/').pop() as string;
  map[name] = mod.default;
}

export function img(name: string): ImageMetadata {
  const found = map[name];
  if (!found) throw new Error(`images.ts: no image named "${name}"`);
  return found;
}
