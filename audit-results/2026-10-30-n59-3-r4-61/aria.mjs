// r4-61 (Selbstprüfung, Skript der Nachprüfung r4-59): Vergleich Gate ↔ Chromium. Lädt jede mutierte Seite aus mutationen.mjs --dump in Chromium
// (übrige Dateien aus <siteDir>), Breite 1280 px. Die Menüeinträge «Direkteinstiege» werden per Stylesheet eingeblendet
// (sonst display:none ab 20 rem). Gelesen werden (a) der Zugänglichkeitsbaum von Chromium über CDP
// (Accessibility.getPartialAXTree: ignored, name) und (b) Playwright locator.ariaSnapshot() des Kopfs.
// Aufruf: PLAYWRIGHT_MODULE=… node aria.mjs <dump.json> <siteDir>
import { readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const [dumpFile, siteDir] = process.argv.slice(2);
const dumps = JSON.parse(readFileSync(dumpFile, 'utf8'));
const only = process.argv[4] ? new RegExp(process.argv[4]) : null;
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.ico': 'image/x-icon' };
const browser = await chromium.launch();
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
  if (!nodeId) return 'fehlt im DOM';
  const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false });
  const n = nodes[0];
  if (!n) return '?';
  if (n.ignored) return 'VERBORGEN (' + (n.ignoredReasons || []).filter(r => r.value && r.value.value === true).map(r => r.name).join(',') + ')';
  return `${n.role && n.role.value}${n.name ? ' «' + n.name.value + '»' : ' (ohne Namen)'}`;
}
for (const d of dumps) {
  if (only && !only.test(d.name)) continue;
  current = d;
  await page.goto('http://pruefung.test/' + d.file, { waitUntil: 'load' });
  await page.addStyleTag({ content: '.puk-site-menu__utility{display:block!important}.puk-disclosure__panel{display:block!important}' });
  await cdp.send('Accessibility.enable');
  const row = await ax('nav[aria-label="Direkteinstiege"] a[href="kurz.html"], nav[aria-label="Direkteinstiege"] a[href="suche.html"]');
  const menu = await ax('a.puk-site-menu__utility-link[href="kurz.html"], a.puk-site-menu__utility-link[href="suche.html"]');
  const sender = await ax('[data-sender] a');
  let snap = '';
  try { snap = await page.locator('nav[aria-label="Direkteinstiege"] a').first().ariaSnapshot({ timeout: 2000 }); } catch (e) { snap = 'Fehler: ' + e.message.split('\n')[0]; }
  const hdr = await page.locator('header').first().ariaSnapshot({ timeout: 2000 }).catch(() => '');
  const inHdr = /Direkteinstiege/.test(hdr) ? 'Zeile im Kopf-Snapshot' : 'Zeile NICHT im Kopf-Snapshot';
  console.log(`${d.name}\n   CDP Zeilenlink: ${row} | CDP Menülink: ${menu} | CDP Absenderin: ${sender}\n   Playwright Zeilenlink: ${snap.replace(/\n/g, ' ')} | ${inHdr}`);
}
await browser.close();
