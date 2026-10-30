// Nachprüfung r4-61 · Zusatzprobe zu N61-1: Verbergen hidden und inert ein <svg> (bzw. <svg>-Kind) in Chromium?
// Teil 1: Gate (C.gate wie build.mjs) auf mutierten Seiten von <authoringDir>. Teil 2: dieselben Seiten in Chromium,
// Zugänglichkeitsbaum über CDP (getFullAXTree) und Grösse des SVG (getBoundingClientRect).
// Aufruf: PLAYWRIGHT_MODULE=… node svg-hidden.mjs <authoringDir> <siteDir>
import { readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const [dir, siteDir] = process.argv.slice(2);
const C = require(join(dir, 'tools/contract.js'));
const cfg = JSON.parse(readFileSync(join(dir, 'site.config.json'), 'utf8'));
const frag = {}; for (const p of cfg.pages) frag[p.id] = readFileSync(join(dir, 'content', p.id + '.html'), 'utf8');
const { injectSearchIndex } = await import(join(dir, 'tools/search-index.mjs'));
injectSearchIndex(cfg, frag);
const report = existsSync(join(dir, 'PRUEFBERICHT.md')) ? readFileSync(join(dir, 'PRUEFBERICHT.md'), 'utf8') : null;
const base = {}; for (const p of cfg.pages) if (p.status === 'published') base[C.resolve('', p.href).path] = C.renderPage(cfg, p, frag[p.id]);
const blocks = pages => C.gate(cfg, pages, { mode: 'production', report, exists: p => Object.hasOwn(pages, p) || existsSync(join(dir, p)) }).findings.filter(f => f.level === 'block').map(f => `${f.id}@${f.page}`);
const b0 = new Set(blocks(base));
const ZL = /(<a class="puk-site-utility__link" href="kurz\.html">)Kurz und klar</;
const cases = [
  ['S1 Zeilenlink: <svg hidden aria-label="Pfeil">', 'index.html', s => s.replace(ZL, '$1Kurz und klar<svg id="probe" hidden aria-label="Pfeil" width="8" height="8"></svg><'), 'nav[aria-label="Direkteinstiege"] a'],
  ['S2 Zeilenlink: <svg inert aria-label="Pfeil">', 'index.html', s => s.replace(ZL, '$1Kurz und klar<svg id="probe" inert aria-label="Pfeil" width="8" height="8"></svg><'), 'nav[aria-label="Direkteinstiege"] a'],
  ['S3 Zeilenlink: <svg hidden><title>Mehr</title></svg>', 'index.html', s => s.replace(ZL, '$1Kurz und klar<svg id="probe" hidden width="8" height="8"><title>Mehr</title></svg><'), 'nav[aria-label="Direkteinstiege"] a'],
  ['S4 Zeilenlink: <svg aria-hidden="true" aria-label="Pfeil"> (Gegenprobe)', 'index.html', s => s.replace(ZL, '$1Kurz und klar<svg id="probe" aria-hidden="true" aria-label="Pfeil" width="8" height="8"></svg><'), 'nav[aria-label="Direkteinstiege"] a'],
  ['S5 Figur verstehen.html: aria-hidden="true" am SVG durch hidden ersetzt', 'verstehen.html', s => s.replace(/(<svg class="puk-vis-scene__art"[^>]*) aria-hidden="true"/, '$1 id="probe" hidden'), '#probe'],
  ['S6 Figur verstehen.html: aria-hidden="true" am SVG entfernt (Gegenprobe)', 'verstehen.html', s => s.replace(/(<svg class="puk-vis-scene__art"[^>]*) aria-hidden="true"/, '$1 id="probe"'), '#probe'],
];
const browser = await chromium.launch();
console.log('# ' + C.BUILD + ' · Chromium ' + browser.version() + ' · Bestand ' + b0.size + ' Blocker');
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
let cur = null;
await ctx.route('http://np61.test/**', r => {
  const p = new URL(r.request().url()).pathname.slice(1) || 'index.html';
  if (cur && p === cur.file) return r.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: cur.html });
  const f = join(siteDir, p); const t = { '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' }[extname(f)];
  return existsSync(f) ? r.fulfill({ status: 200, contentType: t || 'application/octet-stream', body: readFileSync(f) }) : r.fulfill({ status: 404, body: '' });
});
const page = await ctx.newPage(); const cdp = await ctx.newCDPSession(page);
await cdp.send('DOM.enable'); await cdp.send('Accessibility.enable');
for (const [name, file, fn, sel] of cases) {
  const pages = { ...base }; const n = fn(pages[file]); if (n === pages[file]) { console.log(name + ' | NICHT ANWENDBAR'); continue; }
  pages[file] = n; const nb = blocks(pages).filter(x => !b0.has(x));
  cur = { file, html: n };
  await page.goto('http://np61.test/' + file, { waitUntil: 'load' });
  const box = await page.evaluate(() => { const e = document.getElementById('probe'); if (!e) return 'kein #probe'; const r = e.getBoundingClientRect(); return `${Math.round(r.width)}×${Math.round(r.height)} px, display ${getComputedStyle(e).display}`; });
  const { root } = await cdp.send('DOM.getDocument', { depth: -1 });
  const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: sel });
  const { node } = await cdp.send('DOM.describeNode', { nodeId });
  const { nodes } = await cdp.send('Accessibility.getFullAXTree');
  const ax = nodes.find(x => x.backendDOMNodeId === node.backendNodeId);
  const axs = !ax ? 'nicht im Baum' : ax.ignored ? 'ignoriert' : `${ax.role?.value} «${ax.name?.value ?? ''}»`;
  console.log(`${name} | Gate: ${nb.length ? 'BLOCK ' + nb.join(', ') : 'frei'} | SVG: ${box} | Chromium (${sel}): ${axs}`);
}
await browser.close();
