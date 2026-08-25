// Compresses CMS-uploaded images in public/uploads in place, so a photo dropped
// in through TinaCMS can never ship uncompressed. Runs automatically before
// every build (npm "prebuild"). Files under the size cap are left untouched, so
// the pass is idempotent.
//
// sharp comes in as a dependency of Astro's image pipeline; no extra install.
import { readdir, stat, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const uploads = path.join(root, 'public', 'uploads');
const MAX_WIDTH = 1920;
const MAX_BYTES = 350 * 1024;
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

// Recursive: the Tina media manager supports folders inside the media root.
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

const files = await walk(uploads);
if (files.length === 0) {
  console.log('optimize-uploads: no uploads, nothing to do');
  process.exit(0);
}

let touched = 0;
for (const file of files) {
  const name = path.relative(uploads, file);
  const ext = path.extname(name).toLowerCase();
  if (!EXTS.has(ext)) continue;
  const { size } = await stat(file);
  const meta = await sharp(file).metadata();
  if (size <= MAX_BYTES && (meta.width ?? 0) <= MAX_WIDTH) continue;

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
    console.log(`optimize-uploads: ${name} ${(size / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
    touched++;
  } else {
    const { unlink } = await import('node:fs/promises');
    await unlink(tmp);
  }
}
console.log(`optimize-uploads: done, ${touched} file(s) compressed`);
