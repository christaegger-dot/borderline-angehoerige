// Eigene Proben der Gegenprüfung gegen mehrere Stände (unabhängig vom Raster der bauenden Sitzung).
// Aufruf: node proben-b.cjs <proben.tsv> <name=site-dir> [<name=site-dir> ...]   (erster Stand = Bezug)
// Typ K: Tötungswort, I: klare Ich-Aussage, A: andere. Einordnung nach R34-P01:
//   a) K: Suizidabschnitt in Bezug unter den ersten zwei, im Prüfstand nicht (ausser Kinder zuerst)
//   b) K: ein Sicherheitsabschnitt aus den ersten zwei des Bezugs fehlt im Prüfstand unter den ersten drei (Anheftung nur bei K)
//   c) I: Bezug mit Treffer, Prüfstand ohne
//   x) ausserhalb: Sicherheitsabschnitt aus den ersten zwei verloren oder Treffer verloren, Typ A (oder I ohne c)
const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const [file, ...stands] = process.argv.slice(2);
const SAFETY = ['krise.html#suizid', 'krise.html#selbstverletzung', 'gefahr.html#gewalt', 'kinder.html#eskalation', 'kommunizieren.html#suizid-angesprochen'];
const probes = fs.readFileSync(file, 'utf8').split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split('\t'));
function serve(dir) { dir = path.resolve(dir); const s = http.createServer((q, r) => { const f = path.join(dir, decodeURIComponent(q.url.split('?')[0])); if (!f.startsWith(dir) || !fs.existsSync(f) || !fs.statSync(f).isFile()) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': f.endsWith('.html') ? 'text/html; charset=utf-8' : f.endsWith('.js') ? 'text/javascript' : 'text/css' }); r.end(fs.readFileSync(f)); }); return new Promise(ok => s.listen(0, '127.0.0.1', () => ok(s))); }
(async () => {
  const b = await chromium.launch(); const res = {}; const errs = []; const srv = [];
  for (const st of stands) { const [name, dir] = st.split('='); const s = await serve(dir); srv.push(s); const p = await b.newPage(); p.on('pageerror', e => errs.push(name + ': ' + e));
    await p.goto(`http://127.0.0.1:${s.address().port}/suche.html`, { waitUntil: 'networkidle' });
    res[name] = await p.evaluate(qs => { const i = document.querySelector('#site-search'); return qs.map(q => { i.value = q; i.dispatchEvent(new Event('input', { bubbles: true })); return [...document.querySelectorAll('[data-search-results] > li:not([hidden]) a')].map(a => a.getAttribute('href').replace('.html', '')).slice(0, 3); }); }, probes.map(p => p[1])); }
  const names = stands.map(s => s.split('=')[0]); const ref = names[0]; const out = [];
  const S = SAFETY.map(x => x.replace('.html', ''));
  for (const cmp of names.slice(1)) {
    const cnt = { a: 0, b: 0, c: 0, x: 0, gleich: 0 }; const lines = [];
    probes.forEach(([typ, q], i) => { const A = res[ref][i], B = res[cmp][i]; const k = [];
      if (JSON.stringify(A) === JSON.stringify(B)) cnt.gleich++;
      if (typ === 'K' && A.slice(0, 2).includes('krise#suizid') && !B.slice(0, 2).includes('krise#suizid') && !(B[0] || '').startsWith('kinder')) k.push('a');
      if (typ === 'K' && A.slice(0, 2).some(x => S.includes(x) && !B.includes(x))) k.push('b');
      if (typ === 'I' && A.length && !B.length) k.push('c');
      if (!k.length && (A.slice(0, 2).some(x => S.includes(x) && !B.slice(0, 2).includes(x)) || (A.length && !B.length))) k.push('x');
      k.forEach(z => cnt[z]++);
      lines.push(`${k.join('') || '·'}\t${typ}\t${q}\t${A.join(' > ') || '–'}\t${B.join(' > ') || '–'}`); });
    out.push(`## ${ref} gegen ${cmp}: ${probes.length} Proben · gleich ${cnt.gleich} · a) ${cnt.a} · b) ${cnt.b} · c) ${cnt.c} · ausserhalb der Stopp-Regel ${cnt.x}`, `Kennz\tTyp\tAnfrage\t${ref}\t${cmp}`, ...lines, '');
  }
  out.push(`JS-Fehler: ${errs.length}`, ...errs); console.log(out.join('\n'));
  await b.close(); srv.forEach(s => s.close());
})();
