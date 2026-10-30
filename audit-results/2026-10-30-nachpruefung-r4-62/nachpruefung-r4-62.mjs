// Nachprüfung r4-62: eigene Mutationen über C.gate (r4-61 und r4-62) und Abgleich mit Chromium (CDP).
// Aufruf: node nachpruefung-r4-62.mjs <arbeitsbaum-r4-61> <arbeitsbaum-r4-62>
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, extname } from 'node:path';
const [wt61, wt62] = process.argv.slice(2);
const require = createRequire(import.meta.url);

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
  const report = existsSync(join(src, 'PRUEFBERICHT.md')) ? await readFile(join(src, 'PRUEFBERICHT.md'), 'utf8') : null;
  const run = files => C.gate(config, files, { mode: 'production', exists: x => Object.hasOwn(files, x) || existsSync(join(src, x)), report });
  return { C, raw, run, build: C.BUILD || config.assetVersion };
}
const V61 = await load(wt61), V62 = await load(wt62);

const ROW = /(<a class="puk-site-utility__link" href="kurz\.html"[^>]*>)(Kurz und klar)(<\/a>)/;
const MENU = /(<a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz\.html"[^>]*>)(Kurz und klar)(<\/a>)/;
const ART = /(<svg class="puk-vis-scene__art"[^>]*?) aria-hidden="true"/;
const SCENE = '<div class="puk-vis-scene">';
const sub = (h, re, fn) => { if (!re.test(h)) throw new Error('nicht anwendbar: ' + re); return h.replace(re, fn); };
// Einschübe hinter «Kurz und klar» im Link
const INS = [
  ['svg hidden aria-label', '<svg hidden aria-label="Pfeil" width="8" height="8"></svg>'],
  ['svg inert aria-label', '<svg inert aria-label="Pfeil" width="8" height="8"></svg>'],
  ['svg hidden + title', '<svg hidden width="8" height="8"><title>Mehr</title></svg>'],
  ['svg inert + title', '<svg inert width="8" height="8"><title>Mehr</title></svg>'],
  ['svg aria-hidden="true" aria-label', '<svg aria-hidden="true" aria-label="Pfeil" width="8" height="8"></svg>'],
  ['svg aria-hidden="yes" aria-label', '<svg aria-hidden="yes" aria-label="Pfeil" width="8" height="8"></svg>'],
  ['svg aria-hidden="true" + title', '<svg aria-hidden="true" width="8" height="8"><title>Mehr</title></svg>'],
  ['svg aria-label (sichtbar)', '<svg aria-label="Pfeil" width="8" height="8"></svg>'],
  ['svg + title (sichtbar)', '<svg width="8" height="8"><title>Mehr</title></svg>'],
  ['span hidden aria-label', '<span hidden aria-label="Mehr"> mehr</span>'],
  ['span inert aria-label', '<span inert aria-label="Mehr"> mehr</span>'],
  ['span hidden Text', '<span hidden> mehr</span>'],
  ['span inert Text', '<span inert> mehr</span>'],
  ['svg > g hidden > title', '<svg width="8" height="8"><g hidden><title>Mehr</title></g></svg>'],
  ['svg > g inert > title', '<svg width="8" height="8"><g inert><title>Mehr</title></g></svg>'],
  ['svg > g aria-hidden > title', '<svg width="8" height="8"><g aria-hidden="true"><title>Mehr</title></g></svg>'],
  ['svg > g hidden aria-label', '<svg width="8" height="8"><g hidden aria-label="Pfeil"><rect width="8" height="8"/></g></svg>'],
  ['svg aria-hidden > foreignObject > span aria-label', '<svg aria-hidden="true" width="8" height="8"><foreignObject width="8" height="8"><span aria-label="Mehr">x</span></foreignObject></svg>'],
  ['foreignObject > span hidden aria-label', '<svg width="8" height="8"><foreignObject width="8" height="8"><span hidden aria-label="Mehr">x</span></foreignObject></svg>'],
  ['foreignObject > span hidden Text', '<svg width="8" height="8"><foreignObject width="8" height="8"><span hidden> mehr</span></foreignObject></svg>'],
  ['foreignObject > span inert Text', '<svg width="8" height="8"><foreignObject width="8" height="8"><span inert> mehr</span></foreignObject></svg>'],
  ['foreignObject > span aria-label (sichtbar)', '<svg width="8" height="8"><foreignObject width="8" height="8"><span aria-label="Mehr">x</span></foreignObject></svg>'],
  ['Kontrolle: svg > g > title (ohne hidden)', '<svg width="8" height="8"><g><title>Mehr</title></g></svg>'],
  ['Kontrolle: svg > g aria-label (ohne hidden)', '<svg width="8" height="8"><g aria-label="Pfeil"><rect width="8" height="8"/></g></svg>'],
  ['Kontrolle: foreignObject > span Text (sichtbar)', '<svg width="8" height="8"><foreignObject width="8" height="8"><span> mehr</span></foreignObject></svg>'],
  ['span hidden > svg aria-label', '<span hidden><svg aria-label="Pfeil" width="8" height="8"></svg></span>'],
  ['span inert > svg aria-label', '<span inert><svg aria-label="Pfeil" width="8" height="8"></svg></span>'],
];
const M = [];
for (const [where, re, rule] of [['Zeile', ROW, 'utility-nav'], ['Menü', MENU, 'nav']])
  for (const [n, s] of INS) M.push({ k: 'link', where, name: `${where}: ${n}`, page: 'index.html', rule, mut: h => sub(h, re, (a, b, c, d) => b + c + s + d) });
// Regression: aria-hidden/hidden/inert an Link, Zeile, Menü, Subbar, Kopf
const reg = [
  ['Zeile: Link aria-hidden="true"', 'index.html', 'utility-nav', h => sub(h, ROW, (a, b, c, d) => b.replace('<a ', '<a aria-hidden="true" ') + c + d), 'link', 'Zeile'],
  ['Zeile: Link aria-hidden=" true "', 'index.html', 'utility-nav', h => sub(h, ROW, (a, b, c, d) => b.replace('<a ', '<a aria-hidden=" true " ') + c + d), 'link', 'Zeile'],
  ['Zeile: Link aria-hidden="false"', 'index.html', 'utility-nav', h => sub(h, ROW, (a, b, c, d) => b.replace('<a ', '<a aria-hidden="false" ') + c + d), 'link', 'Zeile'],
  ['Zeile: Link hidden', 'index.html', 'utility-nav', h => sub(h, ROW, (a, b, c, d) => b.replace('<a ', '<a hidden ') + c + d), 'link', 'Zeile'],
  ['Zeile: Link inert', 'index.html', 'utility-nav', h => sub(h, ROW, (a, b, c, d) => b.replace('<a ', '<a inert ') + c + d), 'link', 'Zeile'],
  ['Zeile: nav aria-hidden="yes"', 'index.html', 'utility-nav', h => sub(h, /<nav class="puk-site-utility"/, '$& aria-hidden="yes"'), 'link', 'Zeile'],
  ['Menü: Link aria-hidden="TRUE"', 'index.html', 'nav', h => sub(h, MENU, (a, b, c, d) => b.replace('<a ', '<a aria-hidden="TRUE" ') + c + d), 'link', 'Menü'],
  ['Menü: Link inert', 'index.html', 'nav', h => sub(h, MENU, (a, b, c, d) => b.replace('<a ', '<a inert ') + c + d), 'link', 'Menü'],
  ['Subbar aria-hidden="true"', 'index.html', 'sender', h => sub(h, /<div class="puk-web-container puk-site-subbar"/, '$& aria-hidden="true"'), 'sender'],
  ['Subbar aria-hidden="0"', 'index.html', 'sender', h => sub(h, /<div class="puk-web-container puk-site-subbar"/, '$& aria-hidden="0"'), 'sender'],
  ['Subbar hidden', 'index.html', 'sender', h => sub(h, /<div class="puk-web-container puk-site-subbar"/, '$& hidden'), 'sender'],
  ['Kopf inert', 'index.html', 'sender', h => sub(h, /<header class="puk-web-header"/, '$& inert'), 'sender'],
  ['Fehlerseite: Kopf aria-hidden="TRUE"', '404.html', 'sender', h => sub(h, /<header class="puk-web-header"/, '$& aria-hidden="TRUE"'), 'sender'],
  ['Absenderzeile aria-hidden="false"', 'index.html', 'sender', h => sub(h, /<p class="puk-site-sender"/, '$& aria-hidden="false"'), 'sender'],
];
for (const [name, page, rule, mut, k, where] of reg) M.push({ k, where, name, page, rule, mut });
// Abbildungen (verstehen.html, erste Szene)
const fig = [
  ['SVG ohne aria-hidden', h => sub(h, ART, '$1')],
  ['SVG hidden statt aria-hidden', h => sub(h, ART, '$1 hidden')],
  ['SVG inert statt aria-hidden', h => sub(h, ART, '$1 inert')],
  ['SVG aria-hidden="yes"', h => sub(h, ART, '$1 aria-hidden="yes"')],
  ['SVG aria-hidden="false"', h => sub(h, ART, '$1 aria-hidden="false"')],
  ['SVG ohne aria-hidden, Szene hidden (eigene display-Regel)', h => sub(sub(h, ART, '$1'), new RegExp(SCENE), '<div class="puk-vis-scene" hidden>')],
  ['SVG ohne aria-hidden, in <div hidden> (keine display-Regel)', h => sub(h, /(<svg class="puk-vis-scene__art"[^>]*?) aria-hidden="true"([^>]*>[\s\S]*?<\/svg>)/, '<div hidden>$1$2</div>')],
  ['SVG ohne aria-hidden, Szene inert', h => sub(sub(h, ART, '$1'), new RegExp(SCENE), '<div class="puk-vis-scene" inert>')],
  ['SVG ohne aria-hidden, Szene aria-hidden="true"', h => sub(sub(h, ART, '$1'), new RegExp(SCENE), '<div class="puk-vis-scene" aria-hidden="true">')],
  ['SVG ohne aria-hidden, Szene hidden + inert', h => sub(sub(h, ART, '$1'), new RegExp(SCENE), '<div class="puk-vis-scene" hidden inert>')],
  ['SVG ohne aria-hidden, mit aria-label', h => sub(h, ART, '$1 aria-label="Szene"')],
  ['SVG ohne aria-hidden, <g hidden><title>', h => sub(h, /(<svg class="puk-vis-scene__art"[^>]*?) aria-hidden="true"([^>]*>)/, '$1$2<g hidden><title>Szene</title></g>')],
  ['SVG ohne aria-hidden, <g inert> um nichts', h => sub(h, /(<svg class="puk-vis-scene__art"[^>]*?) aria-hidden="true"([^>]*>)/, '$1$2<g inert></g>')],
  ['SVG aria-hidden, darin verschachteltes <svg> ohne Namen', h => sub(h, /(<svg class="puk-vis-scene__art"[^>]*>)/, '$1<svg width="8" height="8"><rect width="8" height="8"/></svg>')],
  ['SVG aria-label, darin verschachteltes <svg hidden> ohne Namen', h => sub(h, /(<svg class="puk-vis-scene__art"[^>]*?) aria-hidden="true"([^>]*>)/, '$1 aria-label="Szene"$2<svg hidden width="8" height="8"><rect width="8" height="8"/></svg>')],
  ['Kontrolle: SVG aria-label, darin verschachteltes <svg> ohne Namen (ohne hidden)', h => sub(h, /(<svg class="puk-vis-scene__art"[^>]*?) aria-hidden="true"([^>]*>)/, '$1 aria-label="Szene"$2<svg width="8" height="8"><rect width="8" height="8"/></svg>')],
  ['SVG aria-hidden, foreignObject mit <svg> ohne Namen', h => sub(h, /(<svg class="puk-vis-scene__art"[^>]*>)/, '$1<foreignObject width="8" height="8"><div><svg width="8" height="8"><rect width="8" height="8"/></svg></div></foreignObject>')],
  ['SVG ohne aria-hidden, unter role="img" aria-label', h => sub(sub(h, ART, '$1'), new RegExp(SCENE), '<div class="puk-vis-scene" role="img" aria-label="Szene">')],
];
for (const [name, mut] of fig) M.push({ k: 'figure', name: 'Abbildung: ' + name, page: 'verstehen.html', rule: 'figure-alt', mut });

const blocks = (V, m) => { const f = Object.assign({}, V.raw); f[m.page] = m.mut(f[m.page]); return [...new Set(V.run(f).findings.filter(x => x.level === 'block').map(x => x.id))]; };
const base61 = V61.run(V61.raw).blocks, base62 = V62.run(V62.raw).blocks;

// Chromium
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const browser = await chromium.launch();
const ver = browser.version();
const dist = join(wt62, 'dist/site');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json', '.png': 'image/png' };
async function chromiumState(m) {
  const html = m.mut(V62.raw[m.page]);
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.route('http://pruef.local/**', async r => {
    const p = new URL(r.request().url()).pathname.slice(1) || 'index.html';
    if (p === m.page) return r.fulfill({ status: 200, contentType: TYPES['.html'], body: html });
    const fp = join(dist, p);
    if (!existsSync(fp)) return r.fulfill({ status: 404, body: '' });
    return r.fulfill({ status: 200, contentType: TYPES[extname(fp)] || 'application/octet-stream', body: await readFile(fp) });
  });
  await page.goto('http://pruef.local/' + m.page, { waitUntil: 'load' });
  if (m.where === 'Menü') await page.addStyleTag({ content: '.puk-site-menu .puk-disclosure__panel,.puk-site-menu__utility{display:block!important;visibility:visible!important}' });
  await page.evaluate(() => document.querySelectorAll('.puk-site-menu [hidden]').forEach(e => { if (e.matches('.puk-disclosure__panel')) e.hidden = false; }));
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Accessibility.enable');
  const { root } = await cdp.send('DOM.getDocument', { depth: -1, pierce: true });
  const ax = async sel => {
    const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: sel });
    if (!nodeId) return null;
    const { node } = await cdp.send('DOM.describeNode', { nodeId });
    const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { backendNodeId: node.backendNodeId, fetchRelatives: false });
    const n = nodes.find(x => x.backendDOMNodeId === node.backendNodeId) || nodes[0];
    return { ignored: !!n.ignored, role: n.role && n.role.value, name: n.name ? n.name.value : '', why: (n.ignoredReasons || []).map(r => r.name).join(',') };
  };
  let out;
  if (m.k === 'link') {
    const sel = m.where === 'Zeile' ? '.puk-site-utility__link[href="kurz.html"]' : '.puk-site-menu__utility-link[href="kurz.html"]';
    const a = await ax(sel);
    const bad = !a || a.ignored || a.name.trim() !== 'Kurz und klar';
    out = { bad, txt: a ? (a.ignored ? `ignoriert (${a.why})` : `${a.role} «${a.name}»`) : 'fehlt' };
  } else if (m.k === 'sender') {
    const s = await ax('.puk-site-sender');
    out = { bad: !s || s.ignored, txt: s ? (s.ignored ? `Absenderzeile ignoriert (${s.why})` : `Absenderzeile im Baum (${s.role})`) : 'fehlt' };
  } else {
    // alle SVG in der ersten Szene: ungenannte Bilder im Baum?
    const { nodes } = await cdp.send('Accessibility.getFullAXTree');
    const ids = await page.evaluate(() => [...document.querySelector('.puk-vis-scene').querySelectorAll('svg')].length);
    const svgs = [];
    const sc = await cdp.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: '.puk-vis-scene svg' });
    for (const nid of sc.nodeIds) { const { node } = await cdp.send('DOM.describeNode', { nodeId: nid }); const n = nodes.find(x => x.backendDOMNodeId === node.backendNodeId); svgs.push(n ? { ignored: !!n.ignored, role: n.role && n.role.value, name: n.name ? n.name.value : '' } : { ignored: true, role: '-', name: '', absent: true }); }
    const unnamed = svgs.filter(s => !s.ignored && /image|graphics/i.test(s.role || '') && !s.name.trim());
    out = { bad: unnamed.length > 0, txt: svgs.slice(0, 3).map(s => s.absent ? 'nicht im Baum' : s.ignored ? 'ignoriert' : `${s.role} «${s.name}»`).join(' | ') + (ids > 3 ? ` (+${ids - 3})` : '') };
  }
  await ctx.close();
  return out;
}

console.log(`Gate r4-61 (${V61.build}) Grundzustand: ${base61} Blocker · Gate r4-62 (${V62.build}): ${base62} Blocker · Chromium ${ver}`);
console.log(['Nr', 'Fall', 'Regel', 'r4-61', 'r4-62', 'Chromium', 'soll', 'r4-61=Chr', 'r4-62=Chr'].join('\t'));
let i = 0, d61 = 0, d62 = 0, fp62 = 0, fn62 = 0;
for (const m of M) {
  i++;
  const b61 = blocks(V61, m), b62 = blocks(V62, m);
  const c = await chromiumState(m);
  const g61 = b61.includes(m.rule), g62 = b62.includes(m.rule);
  if (g61 !== c.bad) d61++; if (g62 !== c.bad) d62++;
  if (g62 && !c.bad) fp62++; if (!g62 && c.bad) fn62++;
  const show = b => b.length ? b.join(',') : '–';
  console.log([`M${i}`, m.name, m.rule, show(b61), show(b62), c.txt, c.bad ? 'Blocker' : 'kein', g61 === c.bad ? 'ja' : 'NEIN', g62 === c.bad ? 'ja' : 'NEIN'].join('\t'));
}
console.log(`\n${M.length} Fälle · Abweichungen Gate ↔ Chromium: r4-61 ${d61}, r4-62 ${d62} (r4-62: ${fp62} strenger als Chromium, ${fn62} milder als Chromium)`);
await browser.close();
