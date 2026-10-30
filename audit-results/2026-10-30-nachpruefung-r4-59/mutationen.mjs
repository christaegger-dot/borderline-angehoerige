// Nachprüfung r4-59: eigene Mutationen über C.gate (Eingabe wie build.mjs: C.renderPage, Modus production, report, exists).
// Aufruf: node mutationen.mjs <authoringDir>   (z. B. Arbeitsbaum von d65a6f3 = r4-58 oder 0c7d172 = r4-59)
// Ausgabe je Mutation: neue Blocker gegenüber dem Bestand (Seite:Regel«Meldung»). Mit --dump <datei.json> zusätzlich die
// mutierten Seiten als JSON (für den Vergleich im Zugänglichkeitsbaum von Chromium, aria.mjs).
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
const dir = process.argv[2];
const dump = process.argv.includes('--dump') ? process.argv[process.argv.indexOf('--dump') + 1] : null;
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
const run = (cfg, raw) => C.gate(cfg, raw, { mode: 'production', exists: p => Object.hasOwn(raw, p) || existsSync(join(dir, p)), report }).findings;
const clone = o => JSON.parse(JSON.stringify(o));
const base = render(baseCfg);
const baseF = run(baseCfg, base);
const key = f => [f.level, f.page, f.id, f.msg].join('|');
const baseKeys = new Set(baseF.map(key));
console.log(`# ${C.BUILD || ''} BASIS ${baseF.filter(f => f.level === 'block').length} Blocker ${baseF.filter(f => f.level !== 'block').length} Hinweise`);
const R = (file, re, to) => raw => { const s = raw[file]; const n = s.replace(re, to); if (n === s) throw new Error('nicht angewendet'); raw[file] = n; return file; };
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const A = {
  Zeile: '<nav class="puk-site-utility" aria-label="Direkteinstiege"',
  Zeilenlink: '<a class="puk-site-utility__link" href="kurz.html"',
  Menülink: '<a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz.html"',
  'Menü-<li>': '<li class="puk-site-menu__utility"><a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz.html"',
  subbar: '<div class="puk-web-container puk-site-subbar"',
  header: '<header class="puk-web-header"',
};
const ins = (file, where, attr) => where === 'Menü-<li>'
  ? R(file, new RegExp(esc(A[where])), m => m.replace('<li class="puk-site-menu__utility"', '<li class="puk-site-menu__utility" ' + attr))
  : R(file, new RegExp(esc(A[where])), m => m + ' ' + attr);
const ZL = /(<a class="puk-site-utility__link" href="kurz\.html"[^>]*>)([^<]*)</;
const ML = /(<a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz\.html"[^>]*>)([^<]*)</;
const M = [];
// P1: aria-hidden-Varianten an fünf Orten
const AH = [['TRUE', 'aria-hidden="TRUE"'], ['True', 'aria-hidden="True"'], ['␣true␣', 'aria-hidden=" true "'], ['true␣', 'aria-hidden="true "'], ['false', 'aria-hidden="false"'], ['leer', 'aria-hidden=""'], ['ohne Wert', 'aria-hidden']];
let i = 0;
for (const where of ['Zeile', 'Zeilenlink', 'Menü-<li>', 'Menülink', 'subbar', 'header']) for (const [n, attr] of AH) M.push([`P1.${++i} ${attr} auf ${where}`, ins('index.html', where, attr)]);
// P2: inert
i = 0; for (const where of ['Zeile', 'Zeilenlink', 'Menü-<li>', 'Menülink', 'subbar', 'header']) M.push([`P2.${++i} inert auf ${where}`, ins('index.html', where, 'inert')]);
M.push(['P2.7 inert="false" auf Zeile (boolesch, bleibt inert)', ins('index.html', 'Zeile', 'inert="false"')]);
M.push(['P2.8 hidden="until-found" auf Zeile', ins('index.html', 'Zeile', 'hidden="until-found"')]);
// P3: Linktext ganz oder teilweise in verborgenem span
i = 0;
for (const [lbl, re] of [['Zeile', ZL], ['Menü', ML]]) for (const sp of ['aria-hidden="true"', 'aria-hidden="TRUE"', 'hidden', 'inert']) {
  M.push([`P3.${++i} ${lbl}: ganzer Linktext in <span ${sp}>`, R('index.html', re, `$1<span ${sp}>$2</span><`)]);
  M.push([`P3.${++i} ${lbl}: «und klar» in <span ${sp}>`, R('index.html', re, (m, a, t) => `${a}${t.replace(' und klar', `<span ${sp}> und klar</span>`)}<`)]);
}
// P4: dekorative Zeichen neben dem sichtbaren Text (müssen zulässig sein)
M.push(['P4.1 Zeile: Text + <span aria-hidden="true"> →</span>', R('index.html', ZL, '$1$2<span aria-hidden="true"> →</span><')]);
M.push(['P4.2 Zeile: <span aria-hidden="true">→ </span> + Text', R('index.html', ZL, '$1<span aria-hidden="true">→ </span>$2<')]);
M.push(['P4.3 Menü: Text + <span aria-hidden="true"> →</span>', R('index.html', ML, '$1$2<span aria-hidden="true"> →</span><')]);
M.push(['P4.4 Zeile: Text + <svg aria-hidden="true"><title>Pfeil</title></svg>', R('index.html', ZL, '$1$2<svg aria-hidden="true" width="8" height="8"><title>Pfeil</title></svg><')]);
M.push(['P4.5 Zeile: Text + <span aria-hidden="false"> →</span> (nicht verborgen, Beschriftung weicht ab)', R('index.html', ZL, '$1$2<span aria-hidden="false"> →</span><')]);
M.push(['P4.6 Zeile: Text + <span aria-hidden=" true "> →</span> (in Chromium nicht verborgen)', R('index.html', ZL, '$1$2<span aria-hidden=" true "> →</span><')]);
M.push(['P4.7 Zeile: «Mehr» sichtbar + <span aria-hidden="true">Kurz und klar</span>', R('index.html', ZL, '$1Mehr<span aria-hidden="true">$2</span><')]);
// P5: aria-label / aria-labelledby
M.push(['P5.1 aria-label="Kurz und klar" (gleich) am Zeilenlink', ins('index.html', 'Zeilenlink', 'aria-label="Kurz und klar"')]);
M.push(['P5.2 aria-label="" am Zeilenlink', ins('index.html', 'Zeilenlink', 'aria-label=""')]);
M.push(['P5.3 aria-labelledby am Menülink', ins('index.html', 'Menülink', 'aria-labelledby="x"')]);
M.push(['P5.4 aria-label an einem <span> im Zeilenlink', R('index.html', ZL, '$1<span aria-label="Mehr">$2</span><')]);
M.push(['P5.5 title="Mehr" am Zeilenlink', ins('index.html', 'Zeilenlink', 'title="Mehr"')]);
// P6: andere Seiten, Fehlerseite
M.push(['P6.1 grenzen.html: Zeile aria-hidden="TRUE"', ins('grenzen.html', 'Zeile', 'aria-hidden="TRUE"')]);
M.push(['P6.2 suche.html: Menülink inert', ins('suche.html', 'Menülink', 'inert')]);
M.push(['P6.3 Fehlerseite: header inert', ins('404.html', 'header', 'inert')]);
M.push(['P6.4 Fehlerseite: header aria-hidden="TRUE"', ins('404.html', 'header', 'aria-hidden="TRUE"')]);
// P7: Grenzen (statisches HTML)
M.push(['P7.1 Zeile: Linktext in <span style="display:none"> (Grenze)', R('index.html', ZL, '$1<span style="display:none">$2</span><')]);
M.push(['P7.2 Zeile: Text + <span style="display:none"> extra</span>', R('index.html', ZL, '$1$2<span style="display:none"> extra</span><')]);
M.push(['P7.3 Zeile: Text + <span class="visually-hidden"> (Seite)</span>', R('index.html', ZL, '$1$2<span class="visually-hidden"> (Seite)</span><')]);
M.push(['P7.4 Zeilenlink role="presentation"', ins('index.html', 'Zeilenlink', 'role="presentation"')]);
M.push(['P7.5 Zeile: <span role="none">-Hülle um Text', R('index.html', ZL, '$1<span role="none">$2</span><')]);

const dumps = [];
for (const [name, fn] of M) {
  const raw = { ...base };
  let file; try { file = fn(raw); } catch (e) { console.log(name, '=> FEHLER', e.message); continue; }
  const nf = run(baseCfg, raw).filter(f => !baseKeys.has(key(f)));
  const blocks = nf.filter(f => f.level === 'block');
  console.log(name, '=>', blocks.length ? blocks.map(f => `${f.page}:${f.id}«${f.msg.slice(0, 80)}»`).join(' ; ') : 'keine neuen Blocker', nf.length - blocks.length ? `(+${nf.length - blocks.length} Hinweise)` : '');
  if (dump) dumps.push({ name, file, html: raw[file] });
}
// Rückfall ohne utilityNav
{ const cfg = clone(baseCfg); delete cfg.utilityNav; const raw = render(cfg); const f = run(cfg, raw);
  console.log('E1 ohne utilityNav (Rückfall) =>', f.filter(x => x.level === 'block').length, 'Blocker', f.filter(x => x.level !== 'block').length, 'Hinweise');
  const v = [['E2 Rückfall + Zeile aria-hidden="TRUE"', 'index.html', /<nav class="puk-site-utility" aria-label="Direkteinstiege"/, '$& aria-hidden="TRUE"'],
    ['E3 Rückfall + Zeile inert', 'index.html', /<nav class="puk-site-utility" aria-label="Direkteinstiege"/, '$& inert'],
    ['E4 Rückfall + Linktext in <span aria-hidden="true">', 'index.html', /(<a class="puk-site-utility__link" href="suche\.html">)([^<]*)</, '$1<span aria-hidden="true">$2</span><'],
    ['E5 Rückfall + Menülink inert', 'index.html', /<a class="puk-web-nav__link puk-site-menu__utility-link" href="suche\.html"/, '$& inert'],
    ['E6 Rückfall + dekoratives <span aria-hidden="true"> →</span>', 'index.html', /(<a class="puk-site-utility__link" href="suche\.html">)([^<]*)</, '$1$2<span aria-hidden="true"> →</span><']];
  for (const [name, file, re, to] of v) { const r2 = { ...raw }; const n = r2[file].replace(re, to); if (n === r2[file]) { console.log(name, '=> FEHLER nicht angewendet'); continue; } r2[file] = n;
    const b = run(cfg, r2).filter(x => x.level === 'block'); console.log(name, '=>', b.map(x => `${x.page}:${x.id}«${x.msg.slice(0, 60)}»`).join(' ; ') || 'keine Blocker'); }
}
if (dump) writeFileSync(dump, JSON.stringify(dumps));
