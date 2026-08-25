// Compresses CMS-uploaded images in public/uploads in place, so a photo dropped
// in through TinaCMS can never ship uncompressed. Runs automatically before
// every build (npm "prebuild").
//
// Idempotency: each file gets exactly ONE optimization pass. The content hash
// of every already-processed file is recorded in scripts/uploads-manifest.json
// (committed), so later builds never re-encode a photo (no repo churn, no
// generational quality loss). A brand-new upload is always processed on first
// sight; on Vercel that happens fresh from the committed original each build,
// which is also single-generation.
//
// sharp comes in as a dependency of Astro's image pipeline; no extra install.
import { readdir, stat, rename, readFile, writeFile, unlink } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const uploads = path.join(root, 'public', 'uploads');
const manifestPath = path.join(root, 'scripts', 'uploads-manifest.json');
const MAX_WIDTH = 1920;
const MAX_BYTES = 350 * 1024;
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function walk(dir) {
  let entries = [];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const out = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

async function fileHash(file) {
  return createHash('sha1').update(await readFile(file)).digest('hex');
}

let manifest = { processed: [] };
try {
  manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
} catch {
  /* first run */
}
const processed = new Set(manifest.processed);

const files = await walk(uploads);
if (files.length === 0) {
  console.log('optimize-uploads: no uploads, nothing to do');
  process.exit(0);
}

let touched = 0;
let manifestDirty = false;
for (const file of files) {
  const name = path.relative(uploads, file);
  const ext = path.extname(name).toLowerCase();
  if (!EXTS.has(ext)) continue;

  let hash = await fileHash(file);
  if (processed.has(hash)) continue;

  const { size } = await stat(file);
  const meta = await sharp(file).metadata();
  const needsWork = size > MAX_BYTES || (meta.width ?? 0) > MAX_WIDTH;

  if (needsWork) {
    let pipe = sharp(file).rotate(); // respect EXIF orientation
    if ((meta.width ?? 0) > MAX_WIDTH) pipe = pipe.resize({ width: MAX_WIDTH });
    if (ext === '.png') pipe = pipe.png({ compressionLevel: 9, palette: true });
    else if (ext === '.webp') pipe = pipe.webp({ quality: 78 });
    else pipe = pipe.jpeg({ quality: 78, mozjpeg: true });

    const tmp = file + '.tmp';
    await pipe.toFile(tmp);
    const after = (await stat(tmp)).size;
    if (after < size) {
      await rename(tmp, file);
      hash = await fileHash(file);
      console.log(`optimize-uploads: ${name} ${(size / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
      touched++;
    } else {
      await unlink(tmp);
    }
  }

  // Record the final form (compressed or best-as-is) so it is never revisited.
  processed.add(hash);
  manifestDirty = true;
}

if (manifestDirty) {
  await writeFile(manifestPath, JSON.stringify({ processed: [...processed].sort() }, null, 2) + '\n');
}
console.log(`optimize-uploads: done, ${touched} file(s) compressed`);
