// r4-62 (übernommen aus dem Nachtrag zur Nachprüfung r4-60, PR #781): Abgleich Gate ↔ Chromium. Lädt jede mutierte Seite aus mutationen.mjs --dump in Chromium
// (übrige Dateien aus <siteDir>), Breite 1280 px, und liest den Zugänglichkeitsbaum über CDP
// (Accessibility.getPartialAXTree: ignored, ignoredReasons, role, name). Kein Playwright ariaSnapshot.
// Die Menüeinträge «Direkteinstiege» werden per Stylesheet eingeblendet (sonst display:none ab 20 rem),
// wie in aria.mjs der Nachprüfung r4-59.
// Aufruf: PLAYWRIGHT_MODULE=… node aria.mjs <dump.json> <siteDir>
import { readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const [dumpFile, siteDir] = process.argv.slice(2);
const dumps = JSON.parse(readFileSync(dumpFile, 'utf8'));
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.ico': 'image/x-icon' };
const browser = await chromium.launch();
console.log('# Chromium', browser.version());
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
let current = null;
await ctx.route('http://pruefung.test/**', route => {
  const p = new URL(route.request().url()).pathname.slice(1) || 'index.html';
  if (current && p === current.file) return route.fulfill({ status: 200, contentType: MIME['.html'], body: current.html });
  const f = join(siteDir, p);
  if (!existsSync(f)) return route.fulfill({ status: 404, body: '' });
  return route.fulfill({ status: 200, contentType: MIME[extname(f)] || 'application/octet-stream', body: readFileSync(f) });
});
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
async function ax(sel) {
  const { root } = await cdp.send('DOM.getDocument', { depth: 0 });
  const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: sel });
  if (!nodeId) return 'fehlt';
  const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false });
  const n = nodes[0];
  if (!n) return '?';
  if (n.ignored) return 'VERBORGEN(' + (n.ignoredReasons || []).filter(r => r.value && r.value.value === true).map(r => r.name).join(',') + ')';
  return `${n.role && n.role.value} «${n.name ? n.name.value : ''}»`;
}
for (const d of dumps) {
  current = d;
  await page.goto('http://pruefung.test/' + d.file, { waitUntil: 'load' });
  await page.addStyleTag({ content: '.puk-site-menu__utility{display:block!important}' });
  await cdp.send('Accessibility.enable');
  const out = [];
  if (d.file === 'verstehen.html') out.push('SVG: ' + await ax('svg.puk-vis-scene__art'));
  else {
    if (d.file !== '404.html') {
      out.push('Zeilenlink: ' + await ax('nav[aria-label="Direkteinstiege"] a[href="kurz.html"]'));
      out.push('Menülink: ' + await ax('a.puk-site-menu__utility-link[href="kurz.html"]'));
    }
    out.push('Absenderin: ' + await ax('[data-sender] a'));
  }
  console.log(`${d.name} => ${out.join(' | ')}`);
}
await browser.close();
