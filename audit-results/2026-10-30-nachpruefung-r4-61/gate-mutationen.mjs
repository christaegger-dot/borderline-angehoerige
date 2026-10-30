// Nachprüfung r4-61 · eigenes Prüfskript (nicht aus den Skripten der bauenden Sitzung abgeleitet).
// Wendet Mutationen auf die gerenderten Seiten an und ruft C.gate wie authoring/tools/build.mjs auf
// (C.renderPage, Suchindex, Modus production, report = PRUEFBERICHT.md, exists wie dort).
// Aufruf: node gate-mutationen.mjs <authoringDir> [--dump datei.json]
// Ausgabe je Fall: neue Blocker gegenüber dem Bestand derselben Fassung (Regel@Seite).
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
const dir = process.argv[2];
const dumpAt = process.argv.indexOf('--dump');
const dump = dumpAt > 0 ? process.argv[dumpAt + 1] : null;
const require = createRequire(import.meta.url);
const C = require(join(dir, 'tools/contract.js'));
const cfg0 = JSON.parse(readFileSync(join(dir, 'site.config.json'), 'utf8'));
const frag = {}; for (const p of cfg0.pages) frag[p.id] = readFileSync(join(dir, 'content', p.id + '.html'), 'utf8');
const si = join(dir, 'tools/search-index.mjs');
const { injectSearchIndex } = existsSync(si) ? await import(si) : {};
const reportPath = join(dir, 'PRUEFBERICHT.md');
const report = existsSync(reportPath) ? readFileSync(reportPath, 'utf8') : null;
function render(cfg) {
  const fr = { ...frag }; if (injectSearchIndex) injectSearchIndex(cfg, fr);
  const out = {};
  for (const p of cfg.pages) { if (p.status !== 'published') continue; out[C.resolve('', p.href).path] = C.renderPage(cfg, p, fr[p.id]); }
  return out;
}
const gate = (cfg, pages) => C.gate(cfg, pages, { mode: 'production', report, exists: p => Object.hasOwn(pages, p) || existsSync(join(dir, p)) }).findings.filter(f => f.level === 'block');
const k = f => `${f.id}@${f.page}`;

// Fälle: [Name, Seite, Ersetzung(html) oder null, Konfiguration ändern (optional)]
const ZL = /(<a class="puk-site-utility__link" href="kurz\.html">)Kurz und klar</;
const ML = /(<a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz\.html">)Kurz und klar</;
const ZS = /(<a class="puk-site-utility__link" href="suche\.html">)([^<]*)</;   // Rückfall: «Website durchsuchen»
const MS = /(<a class="puk-web-nav__link puk-site-menu__utility-link" href="suche\.html">)([^<]*)</;
const T = 'Kurz und klar';
const PX = 'src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" width="8" height="8"';
const inner = (re, html) => s => { const n = s.replace(re, `$1${html}<`); if (n === s) throw new Error('nicht angewendet'); return n; };
const cases = [];
const both = (name, html, file = 'index.html') => { cases.push([`${name} · Zeile`, file, inner(ZL, html)]); cases.push([`${name} · Menü`, file, inner(ML, html)]); };
// A. Nicht verborgene Elemente mit aria-label/aria-labelledby (Erwartung: Gate blockiert; Chromium-Name ändert sich)
both('A1 <span aria-label="Mehr"> um den Text', `<span aria-label="Mehr">${T}</span>`);
both('A2 <strong aria-label="Mehr"> um den Text', `<strong aria-label="Mehr">${T}</strong>`);
both('A3 <svg aria-label="Pfeil"> nach dem Text', `${T}<svg aria-label="Pfeil" width="8" height="8"></svg>`);
both('A4 <svg role="img" aria-label="Pfeil"> nach dem Text', `${T}<svg role="img" aria-label="Pfeil" width="8" height="8"></svg>`);
both('A5 <img alt="" aria-label="Pfeil"> nach dem Text', `${T}<img alt="" aria-label="Pfeil" ${PX}>`);
both('A6 verschachtelt <span><em aria-label="Mehr">', `<span><em aria-label="Mehr">${T}</em></span>`);
both('A7 <span aria-labelledby="haltung-title"> (ID vorhanden)', `<span aria-labelledby="haltung-title">${T}</span>`);
both('A8 <span aria-labelledby="gibtsnicht"> (ID fehlt)', `<span aria-labelledby="gibtsnicht">${T}</span>`);
both('A9 <span aria-label="Kurz und klar"> (gleich der Beschriftung)', `<span aria-label="${T}">${T}</span>`);
both('A10 <span aria-label=""> (leer)', `<span aria-label="">${T}</span>`);
both('A11 <span aria-hidden="false" aria-label="Mehr">', `<span aria-hidden="false" aria-label="Mehr">${T}</span>`);
both('A12 <span aria-hidden="" aria-label="Mehr">', `<span aria-hidden="" aria-label="Mehr">${T}</span>`);
both('A13 <span aria-hidden="undefined" aria-label="Mehr">', `<span aria-hidden="undefined" aria-label="Mehr">${T}</span>`);
cases.push(['A14 <span aria-label="Mehr"> auf krise.html · Zeile', 'krise.html', inner(ZL, `<span aria-label="Mehr">${T}</span>`)]);
// B. Verborgene Elemente mit aria-label (Erwartung: Gate lässt zu; Chromium-Name bleibt)
for (const v of ['aria-hidden="true"', 'aria-hidden="TRUE"', 'aria-hidden=" true "', 'aria-hidden="yes"', 'hidden', 'inert'])
  both(`B svg ${v} aria-label="Pfeil"`, `${T}<svg ${v} aria-label="Pfeil" width="8" height="8"></svg>`);
both('B img aria-hidden="true" aria-label="Pfeil"', `${T}<img alt="" aria-hidden="true" aria-label="Pfeil" ${PX}>`);
for (const v of ['aria-hidden="true"', 'hidden', 'inert'])
  both(`B Zwischenelement <span ${v}> um <span aria-label="Pfeil">`, `${T}<span ${v}><span aria-label="Pfeil">→</span></span>`);
both('B Zwischen aria-hidden="true", innen aria-hidden="false" aria-label', `${T}<span aria-hidden="true"><span aria-hidden="false" aria-label="Pfeil">→</span></span>`);
// C. Andere Attribute (Erwartung: Gate blockiert nicht; Chromium-Name bleibt)
both('C1 <span aria-describedby="haltung-title">', `<span aria-describedby="haltung-title">${T}</span>`);
both('C2 <span title="Mehr"> um den Text', `<span title="Mehr">${T}</span>`);
// D. Weitere Namensquellen ohne aria-label (nicht Gegenstand von N59-3; Abgleich mit Chromium)
both('D1 leeres <span title="Mehr"> nach dem Text', `${T}<span title="Mehr"></span>`);
both('D2 <img alt="Mehr"> nach dem Text', `${T}<img alt="Mehr" ${PX}>`);
both('D3 <svg><title>Mehr</title></svg> nach dem Text', `${T}<svg width="8" height="8"><title>Mehr</title></svg>`);
both('D4 <input value="Mehr"> nach dem Text', `${T} <input type="button" value="Mehr">`);
// E. Rückfall ohne utilityNav: Eintrag «Website durchsuchen»
const noUtil = c => { delete c.utilityNav; };
const sInner = (re, f) => s => { const n = s.replace(re, (m, a, t) => a + f(t) + '<'); if (n === s) throw new Error('nicht angewendet'); return n; };
cases.push(['E0 Rückfall ohne Mutation', 'index.html', s => s, noUtil]);
cases.push(['E1 Rückfall <span aria-label="Mehr"> · Zeile', 'index.html', sInner(ZS, t => `<span aria-label="Mehr">${t}</span>`), noUtil]);
cases.push(['E2 Rückfall <span aria-label="Mehr"> · Menü', 'index.html', sInner(MS, t => `<span aria-label="Mehr">${t}</span>`), noUtil]);
cases.push(['E3 Rückfall <svg aria-hidden="true" aria-label> · Zeile', 'index.html', sInner(ZS, t => `${t}<svg aria-hidden="true" aria-label="Pfeil" width="8" height="8"></svg>`), noUtil]);
// F. Fehlerseite (ohne Zeile «Direkteinstiege»): aria-label in einem gewöhnlichen Menülink
cases.push(['F1 404: <span aria-label="Mehr"> in einem Hauptmenülink', '404.html', s => { const n = s.replace(/(<a class="puk-web-nav__link"[^>]*>)([^<]+)</, '$1<span aria-label="Mehr">$2</span><'); if (n === s) throw new Error('nicht angewendet'); return n; }]);
// G. Nicht-Direkteinstieg: aria-label in einem gewöhnlichen Hauptmenülink der Startseite (relabelled gilt dort nicht)
cases.push(['G1 index: <span aria-label="Mehr"> in einem Hauptmenülink', 'index.html', s => { const n = s.replace(/(<a class="puk-web-nav__link"(?! puk-site-menu)[^>]*>)([^<]+)</, '$1<span aria-label="Mehr">$2</span><'); if (n === s) throw new Error('nicht angewendet'); return n; }]);

const base = render(cfg0); const baseKeys = new Set(gate(cfg0, base).map(k));
console.log(`# ${C.BUILD} · Bestand ${baseKeys.size} Blocker`);
const dumps = [];
for (const [name, file, fn, cfgFn] of cases) {
  const cfg = JSON.parse(JSON.stringify(cfg0)); if (cfgFn) cfgFn(cfg);
  const pages = cfgFn ? render(cfg) : { ...base };
  const bk = cfgFn ? new Set(gate(cfg, pages).map(k)) : baseKeys;
  let res;
  try { pages[file] = fn(pages[file]); const nb = [...new Set(gate(cfg, pages).map(k))].filter(x => !bk.has(x)); res = nb.length ? 'BLOCK ' + nb.join(', ') : 'frei'; dumps.push({ name, file, html: pages[file] }); }
  catch (e) { res = 'NICHT ANWENDBAR: ' + e.message; }
  if (cfgFn && name.startsWith('E0')) res += ` (Bestand mit Rückfall: ${bk.size} Blocker)`;
  console.log(`${name} | ${res}`);
}
if (dump) writeFileSync(dump, JSON.stringify(dumps));
