// Eigene Proben: vergleicht die Suche zweier Stände im Browser. Aufruf: node probe.cjs <bezug-site> <pruef-site> <proben.txt> <aus.tsv>
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const http = require('http'), fs = require('fs'), path = require('path');
const [base, test, file, out] = process.argv.slice(2).map(p => path.resolve(p));
const HOOK = "input.addEventListener('input', renderSearch);";
function serve(dir) {
  return new Promise(r => { const s = http.createServer((q, res) => {
    let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
    const f = path.join(dir, p); if (!fs.existsSync(f) || !fs.statSync(f).isFile()) { res.writeHead(404); return res.end(); }
    let b = fs.readFileSync(f); if (p === '/js/interaktion.js') b = Buffer.from(b.toString().replace(HOOK, 'window.__g = queryGroups; ' + HOOK));
    res.writeHead(200, { 'Content-Type': f.endsWith('.js') ? 'text/javascript' : f.endsWith('.css') ? 'text/css' : 'text/html; charset=utf-8' }); res.end(b);
  }); s.listen(0, '127.0.0.1', () => r(s)); });
}
(async () => {
  const lines = fs.readFileSync(file, 'utf8').split('\n').filter(l => l.trim() && !l.startsWith('#'));
  const qs = lines.map(l => l.split('\t')); // Kategorie \t Anfrage
  const br = await chromium.launch(); const res = [];
  for (const dir of [base, test]) {
    const s = await serve(dir); const pg = await br.newPage(); const errs = []; pg.on('pageerror', e => errs.push(String(e)));
    await pg.goto(`http://127.0.0.1:${s.address().port}/suche.html`, { waitUntil: 'networkidle' });
    res.push(await pg.evaluate(list => list.map(q => { const i = document.querySelector('#site-search'); i.value = q; i.dispatchEvent(new Event('input', { bubbles: true }));
      const h = [...document.querySelectorAll('[data-search-results] > li:not([hidden]) a')].map(a => a.getAttribute('href').replace('.html', ''));
      const g = window.__g(q); return { n: h.length, top: h.slice(0, 4), pins: g && g.pins ? g.pins.map(p => p.replace('.html', '')) : [], lead: !!(g && g.pinsAfterSafetyLead) }; }), qs.map(x => x[1])));
    if (errs.length) console.log('JS-Fehler', dir, errs); s.close();
  }
  await br.close();
  const rows = ['Kategorie\tAnfrage\tr4-76 (Treffer: erste vier)\tr4-77 (Treffer: erste vier)\tr4-77 angeheftet'];
  qs.forEach(([k, q], i) => { const a = res[0][i], b = res[1][i];
    rows.push([k, q, a.n ? a.top.join(' > ') + (a.pins.length ? ' [A]' : '') : '–', b.n ? b.top.join(' > ') : '–', b.pins.join(', ') + (b.lead ? ' (Signal)' : b.pins.length ? ' (Tötungswort/alt)' : '')].join('\t')); });
  fs.writeFileSync(out, rows.join('\n') + '\n'); console.log('geschrieben', out, qs.length);
})();
