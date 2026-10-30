// Usage: node mut.mjs <authoringDir>
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
const dir = process.argv[2];
const require = createRequire(import.meta.url);
const C = require(join(dir, 'tools/contract.js'));
const baseCfg = JSON.parse(readFileSync(join(dir, 'site.config.json'), 'utf8'));
const frags = {}; for (const p of baseCfg.pages) frags[p.id] = readFileSync(join(dir, 'content', p.id + '.html'), 'utf8');
const sidx = join(dir, 'tools/search-index.mjs');
const { injectSearchIndex } = existsSync(sidx) ? await import(sidx) : {};
const report = existsSync(join(dir, 'PRUEFBERICHT.md')) ? readFileSync(join(dir, 'PRUEFBERICHT.md'), 'utf8') : null;
function render(cfg) {
  const fr = { ...frags }; if (injectSearchIndex) injectSearchIndex(cfg, fr);
  const raw = {};
  for (const p of cfg.pages.filter(p => p.status === 'published')) raw[C.resolve('', p.href).path] = C.renderPage(cfg, p, fr[p.id]);
  return raw;
}
function run(cfg, raw) {
  const g = C.gate(cfg, raw, { mode: 'production', exists: p => Object.hasOwn(raw, p) || existsSync(join(dir, p)), report });
  return g.findings;
}
const clone = o => JSON.parse(JSON.stringify(o));
const base = render(baseCfg);
const baseF = run(baseCfg, base);
const key = f => [f.level, f.page, f.id, f.msg].join('|');
const baseKeys = new Set(baseF.map(key));
console.log('BASIS', baseF.filter(f => f.level === 'block').length, 'Blocker', baseF.filter(f => f.level !== 'block').length, 'Hinweise');
const R = (file, re, to) => raw => { const s = raw[file]; const n = s.replace(re, to); if (n === s) throw new Error('nicht angewendet'); raw[file] = n; };
const ul = '<nav class="puk-site-utility" aria-label="Direkteinstiege"';
const ua = '<a class="puk-site-utility__link" href="kurz.html"';
const ma = '<a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz.html"';
const mli = '<li class="puk-site-menu__utility"><a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz.html"';
const sub = '<div class="puk-web-container puk-site-subbar"';
const hd = '<header class="puk-web-header"';
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const ins = (file, anchor, attr) => R(file, new RegExp(esc(anchor)), m => m + ' ' + attr);
const insLi = (file, attr) => R(file, new RegExp(esc(mli)), m => m.replace('<li class="puk-site-menu__utility"', '<li class="puk-site-menu__utility" ' + attr));
const M = [
  ['A1 aria-hidden=true auf Zeile', ins('index.html', ul, 'aria-hidden="true"')],
  ['A2 hidden auf Zeile', ins('index.html', ul, 'hidden')],
  ['A3 aria-hidden=true auf Zeilenlink', ins('index.html', ua, 'aria-hidden="true"')],
  ['A4 hidden auf Zeilenlink', ins('index.html', ua, 'hidden')],
  ['A5 aria-hidden=true auf <li> im Menü', insLi('index.html', 'aria-hidden="true"')],
  ['A6 hidden auf <li> im Menü', insLi('index.html', 'hidden')],
  ['A7 aria-hidden=true auf Menülink', ins('index.html', ma, 'aria-hidden="true"')],
  ['A8 hidden auf Menülink', ins('index.html', ma, 'hidden')],
  ['A9 aria-hidden=true auf .puk-site-subbar', ins('index.html', sub, 'aria-hidden="true"')],
  ['A10 hidden auf .puk-site-subbar', ins('index.html', sub, 'hidden')],
  ['A11 aria-hidden=true auf header', ins('index.html', hd, 'aria-hidden="true"')],
  ['A12 hidden auf header', ins('index.html', hd, 'hidden')],
  ['A13 aria-hidden=false auf Zeile', ins('index.html', ul, 'aria-hidden="false"')],
  ['A14 aria-hidden=false auf Zeilenlink', ins('index.html', ua, 'aria-hidden="false"')],
  ['A15 aria-hidden=false auf Menülink', ins('index.html', ma, 'aria-hidden="false"')],
  ['A16 aria-hidden=false auf header', ins('index.html', hd, 'aria-hidden="false"')],
  ['B1 aria-label=Mehr an Zeilenlink', ins('index.html', ua, 'aria-label="Mehr"')],
  ['B2 aria-labelledby an Zeilenlink', ins('index.html', ua, 'aria-labelledby="x"')],
  ['B3 aria-label=Mehr an Menülink', ins('index.html', ma, 'aria-label="Mehr"')],
  ['B4 aria-labelledby an Menülink', ins('index.html', ma, 'aria-labelledby="x"')],
  ['B5 aria-label gleich sichtbarer Beschriftung an Zeilenlink', ins('index.html', ua, 'aria-label="Kurz und klar"')],
  ['B6 aria-label an der nav: anderer Wert «Schnell»', R('index.html', /aria-label="Direkteinstiege"/, 'aria-label="Schnell"')],
  ['B7 aria-labelledby zusätzlich an der nav', ins('index.html', ul, 'aria-labelledby="x"')],
  ['C1 Beschriftung Zeile «Mehr» (r4-57)', R('index.html', /(<a class="puk-site-utility__link" href="kurz\.html"[^>]*>)[^<]*</, '$1Mehr<')],
  ['C2 Zeile doppelt (r4-57)', R('index.html', /(<nav class="puk-site-utility"[\s\S]*?<\/nav>)/, '$1$1')],
  ['C3 Zeile ausserhalb des Kopfs (r4-57)', raw => { const m = /<nav class="puk-site-utility"[\s\S]*?<\/nav>/.exec(raw['index.html']); raw['index.html'] = raw['index.html'].replace(m[0], '').replace('</main>', m[0] + '</main>'); }],
  ['C4 Zeile fehlt (r4-57)', R('index.html', /<nav class="puk-site-utility"[\s\S]*?<\/nav>/, '')],
  ['C5 Reihenfolge Zeile vertauscht (r4-57)', R('index.html', /(<a class="puk-site-utility__link" href="kurz\.html">[^<]*<\/a>)(<a class="puk-site-utility__link" href="fragen\.html">[^<]*<\/a>)/, '$2$1')],
  ['C6 Beschriftung Menü «Mehr» (r4-57)', R('index.html', /(<a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz\.html"[^>]*>)[^<]*</, '$1Mehr<')],
  ['C7 Zeile auf behandlung.html mit aria-hidden', ins('behandlung.html', ul, 'aria-hidden="true"')],
  ['C8 Menülink auf behandlung.html mit hidden', ins('behandlung.html', ma, 'hidden')],
  ['D1 aria-hidden="TRUE" (Grossschreibung) auf Zeile', ins('index.html', ul, 'aria-hidden="TRUE"')],
  ['D2 inert auf Zeile', ins('index.html', ul, 'inert')],
  ['D3 style="display:none" auf Zeile', ins('index.html', ul, 'style="display:none"')],
  ['D4 role="presentation" an Zeilenlink', ins('index.html', ua, 'role="presentation"')],
  ['D5 Text des Zeilenlinks in <span aria-hidden>', R('index.html', /(<a class="puk-site-utility__link" href="kurz\.html">)([^<]*)</, '$1<span aria-hidden="true">$2</span><')],
  ['D6 aria-hidden=true auf Menü-<ul>', R('index.html', /<ul class="puk-web-nav__list puk-disclosure__panel"/, '$& aria-hidden="true"')],
  ['D7 hidden auf Hauptnavigation (nav)', R('index.html', /<nav class="puk-web-nav puk-site-nav--menu" aria-label="Hauptnavigation"/, '$& hidden')],
  ['D8 aria-hidden=" true " (Leerzeichen) auf Zeile', ins('index.html', ul, 'aria-hidden=" true "')],
  ['D9 Fehlerseite: aria-hidden auf header', ins('404.html', hd, 'aria-hidden="true"')],
  ['F1 aria-hidden="True" auf Zeile', ins('index.html', ul, 'aria-hidden="True"')],
  ['F2 aria-hidden="TRUE" auf Menülink', ins('index.html', ma, 'aria-hidden="TRUE"')],
  ['F3 aria-hidden="FALSE" auf Zeile', ins('index.html', ul, 'aria-hidden="FALSE"')],
  ['F4 aria-hidden="true " (Leerzeichen hinten) auf Zeile', ins('index.html', ul, 'aria-hidden="true "')],
  ['F5 inert auf Zeilenlink', ins('index.html', ua, 'inert')],
  ['F6 inert auf <li> im Menü', insLi('index.html', 'inert')],
  ['F7 inert auf .puk-site-subbar', ins('index.html', sub, 'inert')],
  ['F8 inert auf header', ins('index.html', hd, 'inert')],
  ['F9 inert auf Menü-<ul>', R('index.html', /<ul class="puk-web-nav__list puk-disclosure__panel"/, '$& inert')],
  ['F10 dekoratives <span aria-hidden> → nach Linktext (Zeile)', R('index.html', /(<a class="puk-site-utility__link" href="kurz\.html">)([^<]*)</, '$1$2<span aria-hidden="true"> →</span><')],
  ['F11 dekoratives <span aria-hidden> → nach Linktext (Menü)', R('index.html', /(<a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz\.html">)([^<]*)</, '$1$2<span aria-hidden="true"> →</span><')],
  ['F12 Linktext im Menü in <span aria-hidden>', R('index.html', /(<a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz\.html">)([^<]*)</, '$1<span aria-hidden="true">$2</span><')],
  ['F13 Teil des Linktexts in <span hidden> («Kurz <hidden>und</hidden> klar»)', R('index.html', /(<a class="puk-site-utility__link" href="kurz\.html">)Kurz und klar</, '$1Kurz <span hidden>und</span> klar<')],
  ['F14 Linktext in <span inert>', R('index.html', /(<a class="puk-site-utility__link" href="kurz\.html">)([^<]*)</, '$1<span inert>$2</span><')],
  ['F15 Linktext in <span aria-hidden="false">', R('index.html', /(<a class="puk-site-utility__link" href="kurz\.html">)([^<]*)</, '$1<span aria-hidden="false">$2</span><')],
  ['F16 Linktext in <span> (ohne Attribut)', R('index.html', /(<a class="puk-site-utility__link" href="kurz\.html">)([^<]*)</, '$1<span>$2</span><')],
  ['F17 Linktext in <strong> mit dekorativem <span hidden>x</span>', R('index.html', /(<a class="puk-site-utility__link" href="kurz\.html">)([^<]*)</, '$1<strong>$2</strong><span hidden>x</span><')],
  ['F18 <script> im Link (Text darin)', R('index.html', /(<a class="puk-site-utility__link" href="kurz\.html">)([^<]*)</, '$1$2<script>var a=1</script><')],
  ['F19 inert auf Hauptnavigation (nav)', R('index.html', /<nav class="puk-web-nav puk-site-nav--menu" aria-label="Hauptnavigation"/, '$& inert')],
  ['F20 Fehlerseite: inert auf header', ins('404.html', hd, 'inert')],
  ['F21 inert auf behandlung.html: Zeile', ins('behandlung.html', ul, 'inert')],
];
for (const [name, fn] of M) {
  const raw = { ...base };
  try { fn(raw); } catch (e) { console.log(name, '=> FEHLER', e.message); continue; }
  const nf = run(baseCfg, raw).filter(f => !baseKeys.has(key(f)));
  const blocks = nf.filter(f => f.level === 'block');
  console.log(name, '=>', blocks.length ? blocks.map(f => `${f.page}:${f.id}«${f.msg.slice(0, 70)}»`).join(' ; ') : 'keine neuen Blocker', nf.length - blocks.length ? `(+${nf.length - blocks.length} Hinweise)` : '');
}
// Rückfall ohne utilityNav
{ const cfg = clone(baseCfg); delete cfg.utilityNav; const raw = render(cfg); const f = run(cfg, raw);
  console.log('E1 ohne utilityNav (Rückfall) =>', f.filter(x => x.level === 'block').length, 'Blocker', f.filter(x => x.level !== 'block').length, 'Hinweise');
  const raw2 = { ...raw }; raw2['index.html'] = raw2['index.html'].replace(/<nav class="puk-site-utility" aria-label="Direkteinstiege"/, '$& hidden');
  const f2 = run(cfg, raw2).filter(x => x.level === 'block'); console.log('E2 Rückfall + hidden auf Zeile =>', f2.map(x => `${x.page}:${x.id}`).join(', ') || 'keine');
  const raw3 = { ...raw }; raw3['index.html'] = raw3['index.html'].replace(/<a class="puk-site-utility__link" href="suche\.html"/, '$& aria-label="x"');
  const f3 = run(cfg, raw3).filter(x => x.level === 'block'); console.log('E3 Rückfall + aria-label an Zeilenlink =>', f3.map(x => `${x.page}:${x.id}`).join(', ') || 'keine');
}
