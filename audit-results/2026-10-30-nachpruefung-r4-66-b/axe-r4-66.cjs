// Nachprüfung r4-66: axe-core auf allen Seiten von dist/site bei 390 und 1280 px. axe-core aus einem eigenen Ordner, geladen per page.addScriptTag.
// Aufruf: PLAYWRIGHT_MODULE=… node axe-r4-66.cjs <dist/site> <axe.min.js>
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const [DIR, AXE] = process.argv.slice(2).map(p => path.resolve(p));
const T = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain' };
const srv = http.createServer((q, r) => { const p = path.join(DIR, decodeURIComponent(q.url.split('?')[0])); if (!p.startsWith(DIR) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': T[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(r); });
srv.listen(0, async () => {
  const port = srv.address().port; const pages = fs.readdirSync(DIR).filter(f => f.endsWith('.html')).sort();
  const b = await chromium.launch(); let runs = 0, viol = 0; const lines = [];
  for (const w of [390, 1280]) { const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    for (const f of pages) { const p = await ctx.newPage(); await p.goto(`http://127.0.0.1:${port}/${f}`); await p.addScriptTag({ path: AXE });
      const res = await p.evaluate(async () => { const r = await axe.run(document, { resultTypes: ['violations'] }); return { v: r.violations.map(v => `${v.id} (${v.impact}, ${v.nodes.length})`), build: document.documentElement.dataset.pukSiteBuild, ver: axe.version }; });
      runs++; viol += res.v.length; if (res.v.length) lines.push(`${w} ${f}: ${res.v.join(', ')}`); lines.build = res.build; lines.ver = res.ver; await p.close(); }
    await ctx.close(); }
  console.log(`axe ${lines.ver} · Build ${lines.build} · Chromium ${b.version()} · Seiten ${pages.length} · Läufe ${runs} · Verstösse ${viol}`); lines.forEach(l => console.log(l));
  await b.close(); srv.close(); });
