// r4-62 (übernommen aus dem Nachtrag zur Nachprüfung r4-60, PR #781, erweitert um Q6 für N61-1): eigene Mutationen über C.gate (Eingabe wie build.mjs: C.renderPage mit injectSearchIndex,
// Modus production, report und exists wie dort). Aufruf: node mutationen.mjs <authoringDir> [--dump <datei.json>]
// Ausgabe je Mutation: neue Blocker gegenüber dem Bestand (Seite:Regel). Mit --dump die mutierten Seiten als JSON
// für den Abgleich im Zugänglichkeitsbaum von Chromium (aria.mjs).
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
const dir = process.argv[2];
const dump = process.argv.includes('--dump') ? process.argv[process.argv.indexOf('--dump') + 1] : null;
const require = createRequire(import.meta.url);
const C = require(join(dir, 'tools/contract.js'));
const cfg = JSON.parse(readFileSync(join(dir, 'site.config.json'), 'utf8'));
const frags = {}; for (const p of cfg.pages) frags[p.id] = readFileSync(join(dir, 'content', p.id + '.html'), 'utf8');
const { injectSearchIndex } = await import(join(dir, 'tools/search-index.mjs'));
const report = existsSync(join(dir, 'PRUEFBERICHT.md')) ? readFileSync(join(dir, 'PRUEFBERICHT.md'), 'utf8') : null;
const fr = { ...frags }; injectSearchIndex(cfg, fr);
const base = {}; for (const p of cfg.pages.filter(p => p.status === 'published')) base[C.resolve('', p.href).path] = C.renderPage(cfg, p, fr[p.id]);
const run = raw => C.gate(cfg, raw, { mode: 'production', exists: p => Object.hasOwn(raw, p) || existsSync(join(dir, p)), report }).findings;
const key = f => [f.level, f.page, f.id, f.msg].join('|');
const baseF = run(base); const baseKeys = new Set(baseF.map(key));
console.log(`# ${C.BUILD} BASIS ${baseF.filter(f => f.level === 'block').length} Blocker ${baseF.filter(f => f.level !== 'block').length} Hinweise`);
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const A = {
  Zeile: '<nav class="puk-site-utility" aria-label="Direkteinstiege"',
  Zeilenlink: '<a class="puk-site-utility__link" href="kurz.html"',
  'Menü-<li>': '<li class="puk-site-menu__utility"><a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz.html"',
  Menülink: '<a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz.html"',
  subbar: '<div class="puk-web-container puk-site-subbar"',
  header: '<header class="puk-web-header"',
  Absenderin: '<p class="puk-site-sender" data-sender',
  'SVG Szene': '<svg class="puk-vis-scene__art"',
};
const ins = (where, attr) => s => where === 'Menü-<li>'
  ? s.replace(new RegExp(esc(A[where])), m => m.replace('<li class="puk-site-menu__utility"', '<li class="puk-site-menu__utility" ' + attr))
  : s.replace(new RegExp(esc(A[where])), m => m + ' ' + attr);
const ZL = /(<a class="puk-site-utility__link" href="kurz\.html"[^>]*>)([^<]*)</;
const ML = /(<a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz\.html"[^>]*>)([^<]*)</;
const SVG_OFF = s => s.replace('<svg class="puk-vis-scene__art" viewBox="0 0 640 300" aria-hidden="true"', '<svg class="puk-vis-scene__art" viewBox="0 0 640 300"');
const SCENE = '<div class="puk-vis-scene">';
const M = []; // [name, file, fn]
// Q1: Werte von aria-hidden an sechs Orten (Zeichen ␣ = Leerzeichen)
const VALS = ['true', 'TRUE', ' true ', 'true ', 'yes', '0', ' false ', 'FALSE ', 'null', '  ', '&#116;rue',
  'false', 'False', 'FALSE', 'undefined', 'UNDEFINED', '', null, '&#102;alse'];
const show = v => v === null ? 'ohne Wert' : `"${v.replace(/ /g, '␣')}"`;
let i = 0;
for (const where of ['Zeile', 'Zeilenlink', 'Menü-<li>', 'Menülink', 'subbar', 'header'])
  for (const v of VALS) M.push([`Q1.${++i} aria-hidden=${show(v)} auf ${where}`, 'index.html', ins(where, v === null ? 'aria-hidden' : `aria-hidden="${v}"`)]);
i = 0; for (const where of ['Zeile', 'Zeilenlink', 'Menü-<li>', 'Menülink', 'subbar', 'header']) M.push([`Q2.${++i} inert auf ${where}`, 'index.html', ins(where, 'inert')]);
// Q3: Linktext
i = 0;
for (const [lbl, re] of [['Zeile', ZL], ['Menü', ML]]) for (const sp of ['aria-hidden="yes"', 'aria-hidden=" true "', 'aria-hidden="0"', 'aria-hidden="False"'])
  M.push([`Q3.${++i} ${lbl}: ganzer Linktext in <span ${sp}>`, 'index.html', s => s.replace(re, `$1<span ${sp}>$2</span><`)]);
for (const [lbl, re] of [['Zeile', ZL], ['Menü', ML]]) for (const sp of ['aria-hidden=" true "', 'aria-hidden="yes"', 'aria-hidden="0"', 'aria-hidden="undefined"', 'aria-hidden="false"'])
  M.push([`Q3.${++i} ${lbl}: Text + dekoratives <span ${sp}> →</span>`, 'index.html', s => s.replace(re, `$1$2<span ${sp}> →</span><`)]);
// Q4: Regel sender, auch Fehlerseite
i = 0;
for (const file of ['index.html', '404.html']) {
  for (const a of ['inert', 'aria-hidden="TRUE"', 'aria-hidden=" true "', 'aria-hidden="yes"', 'aria-hidden="false"', 'aria-hidden="undefined"'])
    M.push([`Q4.${++i} ${file}: header ${a}`, file, ins('header', a)]);
  for (const a of ['inert', 'aria-hidden="TRUE"', 'aria-hidden="0"', 'aria-hidden=""'])
    M.push([`Q4.${++i} ${file}: Absenderin ${a}`, file, ins('Absenderin', a)]);
}
// Q5: SVG in Abbildungen (verstehen.html, Szene ohne <title>)
i = 0;
for (const v of ['TRUE', ' true ', 'yes', 'True', 'false', 'undefined', ''])
  M.push([`Q5.${++i} SVG Szene aria-hidden=${show(v)} statt "true"`, 'verstehen.html', s => s.replace('<svg class="puk-vis-scene__art" viewBox="0 0 640 300" aria-hidden="true"', `<svg class="puk-vis-scene__art" viewBox="0 0 640 300" aria-hidden="${v}"`)]);
M.push([`Q5.${++i} SVG Szene ohne aria-hidden`, 'verstehen.html', SVG_OFF]);
M.push([`Q5.${++i} SVG Szene ohne aria-hidden, mit hidden`, 'verstehen.html', s => SVG_OFF(s).replace('<svg class="puk-vis-scene__art"', '<svg class="puk-vis-scene__art" hidden')]);
M.push([`Q5.${++i} SVG Szene ohne aria-hidden, mit inert`, 'verstehen.html', s => SVG_OFF(s).replace('<svg class="puk-vis-scene__art"', '<svg class="puk-vis-scene__art" inert')]);
for (const a of ['hidden', 'inert', 'aria-hidden="TRUE"', 'aria-hidden="yes"', 'aria-hidden="false"', 'role="img" aria-label="Szene"'])
  M.push([`Q5.${++i} SVG Szene ohne aria-hidden, Vorfahre .puk-vis-scene mit ${a}`, 'verstehen.html', s => SVG_OFF(s).replace(SCENE, `<div class="puk-vis-scene" ${a}>`)]);
M.push([`Q5.${++i} SVG Szene ohne aria-hidden, in <div hidden> innerhalb der Szene`, 'verstehen.html', s => SVG_OFF(s).replace(/(<svg class="puk-vis-scene__art"[\s\S]*?<\/svg>)/, '<div hidden>$1</div>')]);

// Q6 (r4-62, N61-1): SVG im Linktext von Zeile und Menü
i = 0;
for (const [lbl, re] of [['Zeile', ZL], ['Menü', ML]]) for (const sv of ['<svg hidden aria-label="Pfeil" width="8" height="8"></svg>', '<svg inert aria-label="Pfeil" width="8" height="8"></svg>',
  '<svg hidden width="8" height="8"><title>Mehr</title></svg>', '<svg width="8" height="8"><g hidden><title>Mehr</title></g></svg>', '<svg aria-hidden="true" aria-label="Pfeil" width="8" height="8"></svg>',
  '<svg aria-hidden="yes" width="8" height="8"><title>Mehr</title></svg>', '<span hidden aria-label="Pfeil"> →</span>', '<span inert> →</span>'])
  M.push([`Q6.${++i} ${lbl}: Text + ${sv.replace(/ width="8" height="8"/, '')}`, 'index.html', s => s.replace(re, `$1$2${sv}<`)]);

const dumps = [];
for (const [name, file, fn] of M) {
  const raw = { ...base }; const n = fn(raw[file]);
  if (n === raw[file]) { console.log(name, '=> FEHLER nicht angewendet'); continue; }
  raw[file] = n;
  const nf = run(raw).filter(f => !baseKeys.has(key(f)) && f.level === 'block');
  console.log(name, '=>', nf.length ? [...new Set(nf.map(f => `${f.page}:${f.id}`))].join(' ; ') : 'keine neuen Blocker');
  if (dump) dumps.push({ name, file, html: n });
}
if (dump) writeFileSync(dump, JSON.stringify(dumps));
