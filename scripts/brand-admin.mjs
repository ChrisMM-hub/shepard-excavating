// Rebrands the generated TinaCMS admin (public/admin/index.html) for the client:
// swaps the llama mascot for the Shepard logo, renames the login heading, and
// sets the tab title/favicon. Runs after `tinacms build` (see build:tina).
// Purely additive at runtime, so it survives Tina version bumps; if a selector
// stops matching someday, the admin still works, just with stock branding.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'public', 'admin', 'index.html');
const MARKER = '<!-- shepard-brand -->';

const snippet = `${MARKER}<script>
(function () {
  var TITLE = 'Shepard Excavating Editor';
  var HEADING = 'Shepard Excavating Website Editor';
  var SUB = 'Sign in to update your site. Changes go live a couple of minutes after you save.';
  function brand() {
    if (!document.body) return;
    if (document.title !== TITLE) document.title = TITLE;
    var icon = document.querySelector('link[rel~="icon"]');
    if (icon && icon.getAttribute('href') !== '/favicon.svg') icon.setAttribute('href', '/favicon.svg');
    // The login mascot ships as the bundle's only base64 PNG; show the client
    // logo instead, with the helper line beneath it.
    document.querySelectorAll('img[src^="data:image/png;base64"]').forEach(function (img) {
      img.src = '/logo-shepard.png';
      img.style.maxHeight = '110px';
      img.style.width = 'auto';
      img.style.objectFit = 'contain';
      img.alt = 'Shepard Excavating';
      if (!img.parentElement.querySelector('[data-shepard-sub]')) {
        var p = document.createElement('p');
        p.setAttribute('data-shepard-sub', '');
        p.textContent = SUB;
        p.style.cssText = 'font-size:14px;color:#4b5563;margin:14px auto 0;font-weight:400;text-align:center;max-width:34em;';
        img.insertAdjacentElement('afterend', p);
      }
    });
    // Rename the stock login heading and drop the mascot glyph beside it.
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.indexOf('get you editing with TinaCMS') !== -1) {
        node.nodeValue = HEADING;
        var header = node.parentElement && node.parentElement.parentElement;
        if (header) {
          header.querySelectorAll('svg').forEach(function (svg) { svg.style.display = 'none'; });
        }
      }
    }
  }
  // Observer first: brand() runs while the head is parsing (no body yet), so it
  // must never be able to throw before the observer is armed.
  new MutationObserver(function () {
    try { brand(); } catch (e) { /* keep observing */ }
  }).observe(document.documentElement, { subtree: true, childList: true });
  try { brand(); } catch (e) { /* body not ready yet */ }
})();
</script>`;

let html;
try {
  html = await readFile(file, 'utf8');
} catch {
  console.log('brand-admin: no public/admin/index.html (tinacms build not run), skipping');
  process.exit(0);
}

if (html.includes(MARKER)) {
  console.log('brand-admin: already branded');
  process.exit(0);
}
html = html.replace('</head>', snippet + '\n</head>');
await writeFile(file, html);
console.log('brand-admin: injected Shepard branding into admin/index.html');
