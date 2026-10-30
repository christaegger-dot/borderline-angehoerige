// Nachprüfung r4-61 · eigenes Prüfskript. Lädt jede mutierte Seite (gate-mutationen.mjs --dump) in Chromium
// (übrige Dateien aus <siteDir>, Breite 1280 px) und liest den Zugänglichkeitsbaum über CDP (Accessibility.getFullAXTree).
// Für die Direkteinstiege in Zeile und Menü wird der Knoten über backendDOMNodeId zugeordnet; ausgegeben werden Rolle,
// Name und ob er ignoriert ist. Das Menü wird nicht eingeblendet: ein Knoten mit display:none fehlt im Baum, darum wird
// vorher das Panel per Stylesheet sichtbar gemacht (nur Darstellung, kein Eingriff in Attribute).
// Aufruf: PLAYWRIGHT_MODULE=… node chromium-name.mjs <dump.json> <siteDir>
import { readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const [dumpFile, siteDir] = process.argv.slice(2);
const cases = JSON.parse(readFileSync(dumpFile, 'utf8'));
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2', '.png': 'image/png' };
const browser = await chromium.launch();
console.log('# Chromium ' + browser.version());
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
let cur = null;
await ctx.route('http://np61.test/**', r => {
  const p = decodeURIComponent(new URL(r.request().url()).pathname.slice(1)) || 'index.html';
  if (cur && p === cur.file) return r.fulfill({ status: 200, contentType: TYPES['.html'], body: cur.html });
  const f = join(siteDir, p);
  return existsSync(f) ? r.fulfill({ status: 200, contentType: TYPES[extname(f)] || 'application/octet-stream', body: readFileSync(f) }) : r.fulfill({ status: 404, body: '' });
});
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send('DOM.enable'); await cdp.send('Accessibility.enable');
async function names(selector) {
  const { root } = await cdp.send('DOM.getDocument', { depth: -1 });
  const { nodeIds } = await cdp.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector });
  const want = [];
  for (const id of nodeIds) { const { node } = await cdp.send('DOM.describeNode', { nodeId: id }); want.push(node.backendNodeId); }
  const { nodes } = await cdp.send('Accessibility.getFullAXTree');
  return want.map(b => { const n = nodes.find(x => x.backendDOMNodeId === b); if (!n) return 'nicht im Baum'; if (n.ignored) return 'ignoriert'; return `${n.role?.value} «${n.name?.value ?? ''}»`; });
}
for (const c of cases) {
  cur = c;
  await page.goto('http://np61.test/' + c.file, { waitUntil: 'load' });
  await page.addStyleTag({ content: '.puk-disclosure__panel,.puk-site-menu__utility{display:block!important;visibility:visible!important}' });
  const isMenu = / · Menü$|Menü$/.test(c.name);
  const sel = c.file === '404.html' || c.name.startsWith('G1') ? 'nav[aria-label="Hauptnavigation"] a.puk-web-nav__link:not(.puk-site-menu__utility-link)'
    : isMenu ? 'a.puk-site-menu__utility-link' : 'nav[aria-label="Direkteinstiege"] a';
  const got = await names(sel);
  const pick = c.name.startsWith('E') ? got : (c.file === '404.html' || c.name.startsWith('G1') ? got.slice(0, 1) : got.slice(0, 1));
  console.log(`${c.name} | ${pick.join(' ; ')}`);
}
await browser.close();
