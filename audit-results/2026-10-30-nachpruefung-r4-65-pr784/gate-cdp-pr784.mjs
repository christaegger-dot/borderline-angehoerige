// Nachprüfung r4-65 (PR #784): eigene Mutationen über C.gate für r4-64 (d20973b) und r4-65 (19a72dc),
// Abgleich mit Chromium über CDP (Accessibility.getPartialAXTree / getFullAXTree), nicht über ariaSnapshot.
// Aufruf: PLAYWRIGHT_MODULE=$(npm root -g)/playwright node gate-cdp-pr784.mjs <arbeitsbaum-r4-64> <arbeitsbaum-r4-65>
import { readFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, extname, resolve } from 'node:path';
const [wtA, wtB] = process.argv.slice(2).map(p => resolve(p));
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

// Eingabe wie in authoring/tools/build.mjs (Zeilen 41–58): injectSearchIndex, renderPage, gate mit mode production, exists, report
async function load(wt) {
  const C = require(join(wt, 'authoring/tools/contract.js'));
  const src = join(wt, 'authoring');
  const config = JSON.parse(await readFile(join(src, 'site.config.json'), 'utf8'));
  const fragments = {};
  for (const p of config.pages) fragments[p.id] = await readFile(join(src, 'content', p.id + '.html'), 'utf8');
  const { injectSearchIndex } = await import(join(src, 'tools/search-index.mjs'));
  injectSearchIndex(config, fragments);
  const raw = {};
  for (const p of config.pages.filter(p => p.status === 'published')) raw[C.resolve('', p.href).path] = C.renderPage(config, p, fragments[p.id]);
  const rp = join(src, 'PRUEFBERICHT.md');
  const report = existsSync(rp) ? await readFile(rp, 'utf8') : null;
  const run = files => C.gate(config, files, { mode: 'production', exists: x => Object.hasOwn(files, x) || existsSync(join(src, x)), report });
  return { C, raw, run, build: C.BUILD, wt };
}
const A = await load(wtA), B = await load(wtB);

const ROW = /(<a class="puk-site-utility__link" href="kurz\.html"[^>]*>)(Kurz und klar)(<\/a>)/;
const MENU = /(<a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz\.html"[^>]*>)(Kurz und klar)(<\/a>)/;
const ART = /(<svg class="puk-vis-scene__art"[^>]*?) aria-hidden="true"/;
const SCENE = '<div class="puk-vis-scene">';
const NAV_ROW = '<nav class="puk-site-utility" aria-label="Direkteinstiege"';
const MENU_A = '<a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz.html"';
const SUBBAR = '<div class="puk-web-container puk-site-subbar"';
const HEADER = '<header class="puk-web-header"';
const req = (h, s) => { if (!(typeof s === 'string' ? h.includes(s) : s.test(h))) throw new Error('nicht anwendbar: ' + s); };
const ins = (re, x) => h => { req(h, re); return h.replace(re, `$1$2${x}$3`); };
const attr = (s, a) => h => { req(h, s); return h.replace(s, s + ' ' + a); };

const M = [];
// Q1: SVG im Linktext (Zeile und Menü)
const LINKINS = [
  ['svg hidden aria-label', '<svg hidden aria-label="Pfeil" width="8" height="8"></svg>'],
  ['svg inert aria-label', '<svg inert aria-label="Pfeil" width="8" height="8"></svg>'],
  ['svg hidden + title', '<svg hidden width="8" height="8"><title>Mehr</title></svg>'],
  ['svg inert + title', '<svg inert width="8" height="8"><title>Mehr</title></svg>'],
  ['svg HIDDEN (Grossschreibung) aria-label', '<svg HIDDEN aria-label="Pfeil" width="8" height="8"></svg>'],
  ['svg hidden="until-found" aria-label', '<svg hidden="until-found" aria-label="Pfeil" width="8" height="8"></svg>'],
  ['svg > g inert aria-label', '<svg width="8" height="8"><g inert aria-label="Pfeil"><rect width="8" height="8"/></g></svg>'],
  ['svg > text hidden', '<svg width="40" height="8"><text hidden y="8">Mehr</text></svg>'],
  ['svg aria-hidden="true" aria-label', '<svg aria-hidden="true" aria-label="Pfeil" width="8" height="8"></svg>'],
  ['svg aria-hidden=" true " + title', '<svg aria-hidden=" true " width="8" height="8"><title>Mehr</title></svg>'],
  ['svg aria-hidden="false" aria-label', '<svg aria-hidden="false" aria-label="Pfeil" width="8" height="8"></svg>'],
  ['svg aria-hidden="undefined" + title', '<svg aria-hidden="undefined" width="8" height="8"><title>Mehr</title></svg>'],
  ['span hidden > svg aria-label', '<span hidden><svg aria-label="Pfeil" width="8" height="8"></svg></span>'],
  ['span inert > svg + title', '<span inert><svg width="8" height="8"><title>Mehr</title></svg></span>'],
  ['span hidden aria-label', '<span hidden aria-label="Mehr"> mehr</span>'],
  ['Kontrolle: svg aria-label sichtbar', '<svg aria-label="Pfeil" width="8" height="8"></svg>'],
  ['Kontrolle: svg > g aria-label (ohne inert)', '<svg width="8" height="8"><g aria-label="Pfeil"><rect width="8" height="8"/></g></svg>'],
  ['Kontrolle: svg > text (ohne hidden)', '<svg width="40" height="8"><text y="8">Mehr</text></svg>'],
];
for (const [w, re] of [['Zeile', ROW], ['Menü', MENU]]) LINKINS.forEach(([n, x], i) => M.push({ id: `L${w === 'Zeile' ? 'Z' : 'M'}${i + 1}`, label: `${w}: ${n}`, page: 'index.html', ids: [w === 'Zeile' ? 'utility-nav' : 'nav'], mut: ins(re, x), probe: { kind: 'link', sel: w === 'Zeile' ? '.puk-site-utility__link[href="kurz.html"]' : '.puk-site-menu__utility-link[href="kurz.html"]' } }));
// Q2: SVG in Abbildungen (verstehen, Szene)
const noAH = h => { req(h, ART); return h.replace(ART, '$1'); };
const FIG = [
  ['svg hidden statt aria-hidden', h => h.replace(ART, '$1 hidden')],
  ['svg inert statt aria-hidden', h => h.replace(ART, '$1 inert')],
  ['svg ohne aria-hidden, Szene hidden', h => noAH(h).replace(SCENE, '<div class="puk-vis-scene" hidden>')],
  ['svg ohne aria-hidden, Szene inert', h => noAH(h).replace(SCENE, '<div class="puk-vis-scene" inert>')],
  ['svg ohne aria-hidden, Szene aria-hidden="true"', h => noAH(h).replace(SCENE, '<div class="puk-vis-scene" aria-hidden="true">')],
  ['svg ohne aria-hidden, Szene aria-hidden="false"', h => noAH(h).replace(SCENE, '<div class="puk-vis-scene" aria-hidden="false">')],
  ['svg aria-hidden="TRUE"', h => h.replace(ART, '$1 aria-hidden="TRUE"')],
  ['svg aria-hidden="false"', h => h.replace(ART, '$1 aria-hidden="false"')],
  ['svg aria-hidden="undefined"', h => h.replace(ART, '$1 aria-hidden="undefined"')],
  ['svg aria-hidden=""', h => h.replace(ART, '$1 aria-hidden=""')],
  ['svg aria-hidden="0"', h => h.replace(ART, '$1 aria-hidden="0"')],
  ['svg hidden inert aria-hidden="false"', h => h.replace(ART, '$1 hidden inert aria-hidden="false"')],
  ['svg ohne aria-hidden, mit aria-label', h => h.replace(ART, '$1 aria-label="Szene"')],
  ['Kontrolle: unverändert', h => { req(h, ART); return h; }],
];
FIG.forEach(([n, f], i) => M.push({ id: `F${i + 1}`, label: `Abbildung: ${n}`, page: 'verstehen.html', ids: ['figure-alt'], mut: h => { req(h, ART); return f(h); }, probe: { kind: 'svg', sel: 'svg.puk-vis-scene__art' } }));
// Q3: aria-hidden-Werte an Zeile, Menü-Link, Subbar, Kopf (Regeln utility-nav, nav, sender)
const VALS = ['true', 'TRUE', ' true ', 'yes', '0', 'false', 'False', ' false ', 'undefined', ''];
VALS.forEach((v, i) => {
  const a = `aria-hidden="${v}"`;
  M.push({ id: `AZ${i + 1}`, label: `Zeile <nav> ${a}`, page: 'index.html', ids: ['utility-nav'], mut: attr(NAV_ROW, a), probe: { kind: 'link', sel: '.puk-site-utility__link[href="kurz.html"]' } });
  M.push({ id: `AM${i + 1}`, label: `Menü-Link ${a}`, page: 'index.html', ids: ['nav'], mut: attr(MENU_A, a), probe: { kind: 'link', sel: '.puk-site-menu__utility-link[href="kurz.html"]' } });
  M.push({ id: `AS${i + 1}`, label: `Subbar ${a}`, page: 'index.html', ids: ['sender'], mut: attr(SUBBAR, a), probe: { kind: 'sender', sel: '[data-sender]' } });
  M.push({ id: `AK${i + 1}`, label: `Kopf ${a}`, page: '404.html', ids: ['sender'], mut: attr(HEADER, a), probe: { kind: 'sender', sel: '[data-sender]' } });
});
for (const [k, a] of [['hidden', 'hidden'], ['inert', 'inert']]) {
  M.push({ id: `S-${k}-sub`, label: `Subbar ${a}`, page: 'index.html', ids: ['sender'], mut: attr(SUBBAR, a), probe: { kind: 'sender', sel: '[data-sender]' } });
  M.push({ id: `S-${k}-kopf`, label: `Kopf ${a} (404)`, page: '404.html', ids: ['sender'], mut: attr(HEADER, a), probe: { kind: 'sender', sel: '[data-sender]' } });
}
M.push({ id: 'S-svg', label: 'Absenderin in <svg hidden><foreignObject> (Kontrolle Namensraum)', page: 'index.html', ids: ['sender'], mut: h => { const re = /(<p class="puk-site-sender" data-sender>[\s\S]*?<\/p>)/; req(h, re); return h.replace(re, '<svg hidden width="600" height="40"><foreignObject width="600" height="40">$1</foreignObject></svg>'); }, probe: { kind: 'sender', sel: '[data-sender]' } });

// Gate
const blocks = (V, page, html) => { const f = Object.assign({}, V.raw, { [page]: html }); return new Set(V.run(f).findings.filter(x => x.level === 'block').map(x => x.id)); };
const baseA = new Set(A.run(A.raw).findings.filter(x => x.level === 'block').map(x => x.id));
const baseB = new Set(B.run(B.raw).findings.filter(x => x.level === 'block').map(x => x.id));

// Chromium: Seiten aus <arbeitsbaum-r4-65>/site, die geprüfte Seite ersetzt
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml' };
const browser = await chromium.launch();
const chromVer = browser.version();
// Zeile und Abbildung bei 390 px; Menüeinträge erscheinen nur unter 20 rem (site.css:642–645), deshalb Menü bei 300 px und geöffnet
const ctx = await browser.newContext({ viewport: { width: 390, height: 900 } });
const ctxMenu = await browser.newContext({ viewport: { width: 300, height: 900 } });
async function probe(m, html) {
  const page = await (m.probe.sel.includes('menu') ? ctxMenu : ctx).newPage();
  await page.route('http://pruef.local/**', r => {
    const p = new URL(r.request().url()).pathname.replace(/^\//, '') || 'index.html';
    if (p === m.page) return r.fulfill({ status: 200, contentType: MIME['.html'], body: html });
    const fp = join(wtB, 'site', p);
    if (!existsSync(fp)) return r.fulfill({ status: 404, body: '' });
    return r.fulfill({ status: 200, contentType: MIME[extname(fp)] || 'application/octet-stream', body: readFileSync(fp) });
  });
  await page.goto('http://pruef.local/' + m.page, { waitUntil: 'load' });
  if (m.probe.sel.includes('menu')) { const t = page.locator('.puk-site-menu [aria-expanded]').first(); if (await t.count()) await t.click(); }
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('DOM.enable'); await cdp.send('Accessibility.enable');
  const { root } = await cdp.send('DOM.getDocument', { depth: 0 });
  const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: m.probe.sel });
  let out;
  if (!nodeId) out = { txt: 'Element fehlt', blockExpected: true };
  else {
    const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false });
    const n = nodes[0] || {};
    const role = n.role?.value, name = n.name?.value ?? '';
    const ign = !!n.ignored, why = (n.ignoredReasons || []).map(r => r.name).join(',');
    if (m.probe.kind === 'link') out = { txt: ign ? `ignoriert (${why})` : `${role} «${name}»`, blockExpected: ign || name !== 'Kurz und klar' };
    else if (m.probe.kind === 'svg') out = { txt: ign ? `ignoriert (${why})` : `${role} «${name}»`, blockExpected: !ign && !name };
    else {
      // Absenderin: im vollständigen Baum muss ein nicht ignorierter Knoten aus dem Teilbaum von [data-sender] den Namen der Fachstelle tragen
      const desc = (await cdp.send('DOM.describeNode', { nodeId, depth: -1, pierce: false })).node;
      const ids = new Set(); (function walk(d) { ids.add(d.backendNodeId); (d.children || []).forEach(walk); })(desc);
      const full = (await cdp.send('Accessibility.getFullAXTree')).nodes;
      const vis = full.filter(x => !x.ignored && ids.has(x.backendDOMNodeId) && /Fachstelle Angehörigenarbeit/.test(x.name?.value || ''));
      out = { txt: vis.length ? `${vis[0].role?.value} «${vis[0].name.value}» im Baum` : `nicht im Baum (Absatz: ${ign ? 'ignoriert, ' + why : role})`, blockExpected: !vis.length };
    }
  }
  await page.close();
  return out;
}

const rows = [];
let diffAB = 0, devB = 0, devA = 0;
for (const m of M) {
  let hA, hB;
  try { hA = m.mut(A.raw[m.page]); hB = m.mut(B.raw[m.page]); } catch (e) { rows.push(`${m.id}|${m.label}|nicht anwendbar`); continue; }
  const bA = blocks(A, m.page, hA), bB = blocks(B, m.page, hB);
  const gA = m.ids.filter(i => bA.has(i) && !baseA.has(i)), gB = m.ids.filter(i => bB.has(i) && !baseB.has(i));
  const extraA = [...bA].filter(i => !baseA.has(i) && !m.ids.includes(i)), extraB = [...bB].filter(i => !baseB.has(i) && !m.ids.includes(i));
  const c = await probe(m, hB);
  const okA = (gA.length > 0) === c.blockExpected, okB = (gB.length > 0) === c.blockExpected;
  if (gA.join() !== gB.join()) diffAB++;
  if (!okA) devA++; if (!okB) devB++;
  rows.push([m.id, m.label, gA.join(',') || '–', gB.join(',') || '–', (extraA.join(',') || '–') + '/' + (extraB.join(',') || '–'), c.txt, c.blockExpected ? 'Blocker' : 'kein', okA ? 'ja' : 'NEIN', okB ? 'ja' : 'NEIN'].join('|'));
}
await browser.close();
console.log(`# Gate r4-64 = ${A.build} (${wtA}), r4-65 = ${B.build} (${wtB}); Chromium ${chromVer} über CDP`);
console.log(`# Ausgangslage ohne Mutation: Blocker r4-64 ${[...baseA].join(',') || 'keine'}, r4-65 ${[...baseB].join(',') || 'keine'}`);
console.log('ID|Fall|Gate r4-64|Gate r4-65|weitere Blocker r4-64/r4-65|Chromium (CDP)|Chromium verlangt|r4-64 stimmt|r4-65 stimmt');
for (const r of rows) console.log(r);
console.log(`# Fälle: ${M.length} · r4-64 ≠ r4-65: ${diffAB} · Abweichungen Gate ↔ Chromium: r4-64 ${devA}, r4-65 ${devB}`);
