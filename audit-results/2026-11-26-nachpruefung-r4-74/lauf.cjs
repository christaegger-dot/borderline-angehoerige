// Nachprüfung r4-74 (PR #836): eigener Vorher-Nachher-Lauf der Suche im Browser.
// Aufruf: PLAYWRIGHT_MODULE=… node lauf.cjs <vorher-site> <nachher-site> <modus> <eingabe> <ausgabe>
//   modus «proben»: Eingabedatei mit Zeilen «# Gruppe» und je einer Anfrage; Ausgabe je Anfrage vorher/nachher
//   modus «json»:   Eingabedatei ist ein JSON-Array von Anfragen; Ausgabe ist JSON mit allen Ergebnissen
// Das Skript der Website läuft unverändert bis auf eine Messzeile: queryGroups wird nach aussen gereicht,
// damit die Anheftung («pins») direkt gelesen werden kann und nicht aus der Trefferliste erraten wird.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const [dirA, dirB, mode, inFile, outFile] = process.argv.slice(2);
const HOOK = "input.addEventListener('input', renderSearch);";
function serve(dir) {
  dir = path.resolve(dir);
  const s = http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]); const f = path.join(dir, p);
    if (!f.startsWith(dir) || !fs.existsSync(f) || !fs.statSync(f).isFile()) { res.writeHead(404); res.end(); return; }
    let body = fs.readFileSync(f);
    if (p === '/js/interaktion.js') {
      const src = body.toString('utf8');
      if (!src.includes(HOOK)) throw new Error('Messzeile nicht gefunden');
      body = Buffer.from(src.replace(HOOK, "window.__qg = queryGroups; window.__norm = normalized; window.__ft = typeof fixTypos === 'function' ? fixTypos : null; " + HOOK));
    }
    res.writeHead(200, { 'Content-Type': f.endsWith('.html') ? 'text/html; charset=utf-8' : f.endsWith('.js') ? 'text/javascript' : f.endsWith('.css') ? 'text/css' : 'application/octet-stream' });
    res.end(body);
  });
  return new Promise(r => s.listen(0, '127.0.0.1', () => r(s)));
}
function inPage(queries) {
  const input = document.querySelector('#site-search');
  const status = document.querySelector('[data-search-status]');
  return queries.map(q => {
    input.value = q; input.dispatchEvent(new Event('input', { bubbles: true }));
    const hrefs = [...document.querySelectorAll('[data-search-results] > li:not([hidden]) a')].map(a => a.getAttribute('href'));
    const g = window.__qg(q);
    return { n: hrefs.length, top: hrefs.slice(0, 5), pins: g.pins ? g.pins.slice() : null };
  });
}
async function open() {
  const browser = await chromium.launch(); const errors = []; const pages = []; const servers = [];
  for (const d of [dirA, dirB]) {
    const s = await serve(d); servers.push(s);
    const page = await browser.newPage();
    page.on('pageerror', e => errors.push(String(e))); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(`http://127.0.0.1:${s.address().port}/suche.html`, { waitUntil: 'networkidle' });
    if (!(await page.evaluate(() => typeof window.__qg === 'function'))) throw new Error('Messzeile nicht aktiv');
    pages.push(page);
  }
  async function run(queries) {
    const res = [[], []];
    for (let i = 0; i < queries.length; i += 1000) for (let s = 0; s < 2; s++) res[s].push(...await pages[s].evaluate(inPage, queries.slice(i, i + 1000)));
    return queries.map((q, i) => ({ q, v: res[0][i], n: res[1][i] }));
  }
  return { run, errors, close: async () => { await browser.close(); servers.forEach(s => s.close()); } };
}
const fmt = r => (r.n ? r.top.join(' > ') + (r.n > r.top.length ? ` … (${r.n})` : '') : '–') + (r.pins ? ` [angeheftet: ${r.pins.join(', ')}]` : '');
module.exports = { open, fmt };
if (require.main === module) (async () => {
  const h = await open();
  if (mode === 'json') {
    const res = await h.run(JSON.parse(fs.readFileSync(inFile, 'utf8')));
    fs.writeFileSync(outFile, JSON.stringify(res));
  } else {
    const lines = fs.readFileSync(inFile, 'utf8').split('\n').filter(l => l.trim());
    const res = await h.run(lines.filter(l => !l.startsWith('#')));
    let i = 0;
    fs.writeFileSync(outFile, lines.map(l => { if (l.startsWith('#')) return l; const r = res[i++]; const same = JSON.stringify(r.v) === JSON.stringify(r.n); return `${same ? 'GLEICH  ' : 'GEÄNDERT'} | ${r.q} | vorher ${fmt(r.v)} | nachher ${fmt(r.n)}`; }).join('\n') + '\n');
  }
  console.log('JS-Fehler:', h.errors.length, h.errors.slice(0, 3).join(' | '));
  await h.close();
})();
