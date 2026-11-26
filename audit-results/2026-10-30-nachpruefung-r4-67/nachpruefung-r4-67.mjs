// Nachprüfung r4-67: eigene Mutationen über C.gate (Eingabe wie build.mjs) und Abgleich mit Chromium über CDP.
// Aufruf: node nachpruefung-r4-67.mjs <Label=Arbeitsbaum> ... --chromium=<Arbeitsbaum mit dist/site> --tmp=<Ordner>
import { readFile, writeFile, cp, rm, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const versions = args.filter(a => !a.startsWith('--')).map(a => a.split('='));
const chrDir = args.find(a => a.startsWith('--chromium=')).slice(11);
const tmp = args.find(a => a.startsWith('--tmp=')).slice(6);

async function loadVersion(dir) {
  const src = join(dir, 'authoring');
  const C = require(join(src, 'tools', 'contract.js'));
  const config = JSON.parse(await readFile(join(src, 'site.config.json'), 'utf8'));
  const fragments = {};
  for (const p of config.pages) fragments[p.id] = await readFile(join(src, 'content', p.id + '.html'), 'utf8');
  const { injectSearchIndex } = await import(pathToFileURL(join(src, 'tools', 'search-index.mjs')).href);
  injectSearchIndex(config, fragments);
  const raw = {};
  for (const p of config.pages.filter(p => p.status === 'published')) raw[C.resolve('', p.href).path] = C.renderPage(config, p, fragments[p.id]);
  const rp = join(src, 'PRUEFBERICHT.md');
  const report = existsSync(rp) ? await readFile(rp, 'utf8') : null;
  const run = files => C.gate(config, files, { mode: 'production', exists: x => Object.hasOwn(files, x) || existsSync(join(src, x)), report });
  return { C, raw, run, build: C.BUILD };
}

// --- Mutationen: [Nr, Beschreibung, Ziel (Z|M|S|A), Datei, [[regex, ersatz], ...]] ---
const ZL = /(<a class="puk-site-utility__link" href="kurz\.html"[^>]*>)(Kurz und klar)/;
const ML = /(<a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz\.html"[^>]*>)(Kurz und klar)/;
const ins = s => '$1$2' + s;
const FO = s => `<svg width="8" height="8"><foreignObject width="8" height="8">${s}</foreignObject></svg>`;
const linkCases = [
  ['fO > span hidden aria-label', FO('<span hidden aria-label="Mehr">x</span>')],
  ['fO > span inert aria-label', FO('<span inert aria-label="Mehr">x</span>')],
  ['fO > span hidden Text', FO('<span hidden> mehr</span>')],
  ['fO > span inert Text', FO('<span inert> mehr</span>')],
  ['fO > div > span hidden Text (tiefer)', FO('<div><span hidden> mehr</span></div>')],
  ['fO > span aria-hidden Text', FO('<span aria-hidden="true"> mehr</span>')],
  ['fO > sichtbarer Text', FO('<span> mehr</span>')],
  ['fO > sichtbares aria-label', FO('<span aria-label="Mehr">x</span>')],
  ['foreignObject hidden > span Text', '<svg width="8" height="8"><foreignObject hidden width="8" height="8"><span> mehr</span></foreignObject></svg>'],
  ['foreignObject inert > span Text', '<svg width="8" height="8"><foreignObject inert width="8" height="8"><span> mehr</span></foreignObject></svg>'],
  ['foreignObject hidden > span aria-label', '<svg width="8" height="8"><foreignObject hidden width="8" height="8"><span aria-label="Mehr">x</span></foreignObject></svg>'],
  ['foreignObject aria-hidden > span Text', '<svg width="8" height="8"><foreignObject aria-hidden="true" width="8" height="8"><span> mehr</span></foreignObject></svg>'],
  ['svg aria-hidden > fO > span Text', '<svg aria-hidden="true" width="8" height="8"><foreignObject width="8" height="8"><span> mehr</span></foreignObject></svg>'],
  ['fO > svg aria-label (verschachtelt)', FO('<svg width="8" height="8" aria-label="Pfeil"></svg>')],
  ['fO > svg hidden aria-label (verschachtelt)', FO('<svg hidden width="8" height="8" aria-label="Pfeil"></svg>')],
  ['fO > svg inert aria-label (verschachtelt)', FO('<svg inert width="8" height="8" aria-label="Pfeil"></svg>')],
  ['fO > span hidden > svg aria-label', FO('<span hidden><svg width="8" height="8" aria-label="Pfeil"></svg></span>')],
  ['fO > div inert > svg aria-label', FO('<div inert><svg width="8" height="8" aria-label="Pfeil"></svg></div>')],
  ['fO > svg > fO > span hidden Text (doppelt)', FO('<svg width="8" height="8"><foreignObject width="8" height="8"><span hidden> mehr</span></foreignObject></svg>')],
  ['fO > svg > fO > span Text (doppelt, sichtbar)', FO('<svg width="8" height="8"><foreignObject width="8" height="8"><span> mehr</span></foreignObject></svg>')],
  ['svg hidden aria-label', '<svg hidden width="8" height="8" aria-label="Pfeil"></svg>'],
  ['svg inert aria-label', '<svg inert width="8" height="8" aria-label="Pfeil"></svg>'],
  ['svg aria-hidden aria-label', '<svg aria-hidden="true" width="8" height="8" aria-label="Pfeil"></svg>'],
  ['svg hidden > title', '<svg hidden width="8" height="8"><title>Mehr</title></svg>'],
  ['svg > g hidden > title', '<svg width="8" height="8"><g hidden><title>Mehr</title></g></svg>'],
  ['svg > g inert > title', '<svg width="8" height="8"><g inert><title>Mehr</title></g></svg>'],
  ['svg > g aria-hidden > title', '<svg width="8" height="8"><g aria-hidden="true"><title>Mehr</title></g></svg>'],
  ['svg > g hidden aria-label', '<svg width="8" height="8"><g hidden aria-label="Mehr"></g></svg>'],
  ['span hidden aria-label (HTML)', '<span hidden aria-label="Mehr">x</span>'],
  ['span inert Text (HTML)', '<span inert> mehr</span>'],
];
const M = [];
for (const [d, s] of linkCases) M.push([`Zeile: ${d}`, 'Z', 'index.html', [[ZL, ins(s)]]]);
for (const [d, s] of linkCases) M.push([`Menü: ${d}`, 'M', 'index.html', [[ML, ins(s)]]]);
const zA = a => [[/<a class="puk-site-utility__link" href="kurz\.html"/, `<a class="puk-site-utility__link" ${a} href="kurz.html"`]];
const mA = a => [[/<a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz\.html"/, `<a class="puk-web-nav__link puk-site-menu__utility-link" ${a} href="kurz.html"`]];
M.push(['Zeile: Link aria-hidden="true"', 'Z', 'index.html', zA('aria-hidden="true"')]);
M.push(['Zeile: Link inert', 'Z', 'index.html', zA('inert')]);
M.push(['Zeile: Link aria-hidden="false"', 'Z', 'index.html', zA('aria-hidden="false"')]);
M.push(['Zeile: nav aria-hidden="yes"', 'Z', 'index.html', [[/<nav class="puk-site-utility"/, '<nav aria-hidden="yes" class="puk-site-utility"']]]);
M.push(['Menü: Link inert', 'M', 'index.html', mA('inert')]);
M.push(['Menü: Link aria-hidden="TRUE"', 'M', 'index.html', mA('aria-hidden="TRUE"')]);
M.push(['Subbar aria-hidden="true"', 'S', 'index.html', [[/<div class="puk-web-container puk-site-subbar">/, '<div class="puk-web-container puk-site-subbar" aria-hidden="true">']]]);
M.push(['Subbar hidden', 'S', 'index.html', [[/<div class="puk-web-container puk-site-subbar">/, '<div class="puk-web-container puk-site-subbar" hidden>']]]);
M.push(['Subbar inert', 'S', 'index.html', [[/<div class="puk-web-container puk-site-subbar">/, '<div class="puk-web-container puk-site-subbar" inert>']]]);
M.push(['Kopf inert', 'S', 'index.html', [[/<header class="puk-web-header">/, '<header class="puk-web-header" inert>']]]);
M.push(['Absenderzeile aria-hidden="false"', 'S', 'index.html', [[/<p class="puk-site-sender" data-sender>/, '<p class="puk-site-sender" aria-hidden="false" data-sender>']]]);
const SC = /(<svg class="puk-vis-scene__art" viewBox="0 0 640 300") aria-hidden="true"( focusable="false">)/;
const inner = s => [[SC, `$1 aria-label="Szene"$2${s}`]];
const innerG = s => [[SC, `$1 role="group" aria-label="Szene"$2${s}`]];
M.push(['Abb.: Szenen-SVG ohne aria-hidden', 'A', 'verstehen.html', [[SC, '$1$2']]]);
M.push(['Abb.: Szenen-SVG hidden statt aria-hidden', 'A', 'verstehen.html', [[SC, '$1 hidden$2']]]);
M.push(['Abb.: Szenen-SVG inert statt aria-hidden', 'A', 'verstehen.html', [[SC, '$1 inert$2']]]);
M.push(['Abb.: .puk-vis-scene inert, SVG ohne aria-hidden', 'A', 'verstehen.html', [[SC, '$1$2'], [/<div class="puk-vis-scene">/, '<div class="puk-vis-scene" inert>']]]);
M.push(['Abb.: .puk-vis-scene hidden, SVG ohne aria-hidden', 'A', 'verstehen.html', [[SC, '$1$2'], [/<div class="puk-vis-scene">/, '<div class="puk-vis-scene" hidden>']]]);
M.push(['Abb.: SVG aria-label > fO > div inert > svg ohne Namen', 'A', 'verstehen.html', inner('<foreignObject width="40" height="40"><div inert><svg width="20" height="20"><rect width="20" height="20"/></svg></div></foreignObject>')]);
M.push(['Abb.: SVG aria-label > fO > div > svg ohne Namen (Kontrolle)', 'A', 'verstehen.html', inner('<foreignObject width="40" height="40"><div><svg width="20" height="20"><rect width="20" height="20"/></svg></div></foreignObject>')]);
M.push(['Abb.: SVG role=group > fO > div inert > svg ohne Namen', 'A', 'verstehen.html', innerG('<foreignObject width="40" height="40"><div inert><svg width="20" height="20"><rect width="20" height="20"/></svg></div></foreignObject>')]);
M.push(['Abb.: SVG role=group > fO > div > svg ohne Namen (Kontrolle)', 'A', 'verstehen.html', innerG('<foreignObject width="40" height="40"><div><svg width="20" height="20"><rect width="20" height="20"/></svg></div></foreignObject>')]);
M.push(['Abb.: SVG role=group > fO inert > svg ohne Namen', 'A', 'verstehen.html', innerG('<foreignObject inert width="40" height="40"><svg width="20" height="20"><rect width="20" height="20"/></svg></foreignObject>')]);
M.push(['Abb.: SVG role=group > fO > div hidden > svg ohne Namen', 'A', 'verstehen.html', innerG('<foreignObject width="40" height="40"><div hidden><svg width="20" height="20"><rect width="20" height="20"/></svg></div></foreignObject>')]);
M.push(['Abb.: SVG role=group > fO > div inert > svg inert ohne Namen', 'A', 'verstehen.html', innerG('<foreignObject width="40" height="40"><div><svg inert width="20" height="20"><rect width="20" height="20"/></svg></div></foreignObject>')]);
M.push(['Abb.: SVG role=group > fO > svg hidden ohne Namen', 'A', 'verstehen.html', innerG('<foreignObject width="40" height="40"><svg hidden width="20" height="20"><rect width="20" height="20"/></svg></foreignObject>')]);
M.push(['Abb.: SVG role=group > fO > span hidden > svg ohne Namen', 'A', 'verstehen.html', innerG('<foreignObject width="40" height="40"><span hidden><svg width="20" height="20"><rect width="20" height="20"/></svg></span></foreignObject>')]);
M.push(['Abb.: SVG role=group > fO > svg aria-hidden ohne Namen', 'A', 'verstehen.html', innerG('<foreignObject width="40" height="40"><svg aria-hidden="true" width="20" height="20"><rect width="20" height="20"/></svg></foreignObject>')]);

function apply(files, file, reps) {
  const f = Object.assign({}, files); let s = f[file];
  for (const [re, by] of reps) { const g = new RegExp(re.source, 'g'); const n = (s.match(g) || []).length; if (n !== 1) return null; s = s.replace(re, by); }
  f[file] = s; return f;
}
const REL = { Z: ['utility-nav', 'nav'], M: ['utility-nav', 'nav'], S: ['sender'], A: ['figure-alt'] };

const V = [];
for (const [label, dir] of versions) V.push({ label, ...(await loadVersion(dir)) });
const gateRes = V.map(v => { const base = new Set(v.run(v.raw).findings.filter(x => x.level === 'block').map(x => x.id)); return { base, rows: M.map(([, , file, reps]) => { const f = apply(v.raw, file, reps); if (!f) return 'n/a'; const ids = [...new Set(v.run(f).findings.filter(x => x.level === 'block').map(x => x.id))]; return ids.join(',') || '–'; }) }; });

// --- Chromium ---
const pw = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
await rm(tmp, { recursive: true, force: true }); await mkdir(tmp, { recursive: true });
await cp(join(chrDir, 'dist', 'site'), tmp, { recursive: true });
const dist = { 'index.html': await readFile(join(tmp, 'index.html'), 'utf8'), 'verstehen.html': await readFile(join(tmp, 'verstehen.html'), 'utf8') };
const browser = await pw.chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, javaScriptEnabled: false });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send('Accessibility.enable'); await cdp.send('DOM.enable');
const norm = s => String(s || '').replace(/\s+/g, ' ').trim();
async function ax(sel) {
  const { root } = await cdp.send('DOM.getDocument', { depth: 0 });
  const { nodeIds } = await cdp.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: sel });
  const out = [];
  for (const nodeId of nodeIds) { const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false }); const n = nodes[0]; out.push({ ignored: !!n.ignored, role: n.role?.value, name: norm(n.name?.value) }); }
  return out;
}
const FORCE = '<style>.puk-disclosure__panel,.puk-site-menu__utility{display:block!important;visibility:visible!important}</style></head>';
async function chromium(file, html, kind) {
  html = html.replace('</head>', FORCE);
  const name = `m-${file}`; await writeFile(join(tmp, name), html);
  await page.goto(pathToFileURL(join(tmp, name)).href);
  if (kind === 'Z' || kind === 'M') {
    const [n] = await ax(kind === 'Z' ? 'a.puk-site-utility__link[href="kurz.html"]' : 'a.puk-site-menu__utility-link[href="kurz.html"]');
    const txt = n.ignored ? 'ignoriert' : `${n.role} «${n.name}»`;
    return { txt, soll: n.ignored || n.name !== 'Kurz und klar' };
  }
  if (kind === 'S') { const [n] = await ax('p.puk-site-sender'); return { txt: n.ignored ? 'Absenderzeile ignoriert' : `${n.role} «${n.name.slice(0, 30)}…»`, soll: n.ignored }; }
  const svgs = await ax('.puk-vis-scene svg');
  const bad = svgs.filter(n => !n.ignored && n.role === 'image' && !n.name);
  return { txt: svgs.map(n => n.ignored ? 'ign' : `${n.role}«${n.name}»`).join(' / '), soll: bad.length > 0 };
}
const base0 = await chromium('index.html', dist['index.html'], 'Z');
const base1 = await chromium('index.html', dist['index.html'], 'M');
const lines = [];
lines.push(`# Nachprüfung r4-67 · ${M.length} Mutationen · Chromium ${browser.version()} · ${new Date().toISOString()}`);
lines.push(`# Gate-Grundzustand (Blocker): ${V.map((v, i) => `${v.label}: ${[...gateRes[i].base].join(',') || 'keine'}`).join(' · ')}`);
lines.push(`# Chromium-Grundzustand: Zeile ${base0.txt}, Menü ${base1.txt}`);
lines.push(`# Spalten: Nr | Fall | ${V.map(v => 'Gate ' + v.label).join(' | ')} | Chromium | Soll | ${V.map(v => 'stimmt ' + v.label).join(' | ')}`);
const dev = V.map(() => ({ streng: 0, mild: 0 }));
for (let i = 0; i < M.length; i++) {
  const [d, k, file, reps] = M[i];
  const h = apply(dist, file, reps);
  const c = h ? await chromium(file, h[file], k) : { txt: 'n/a', soll: null };
  const cells = V.map((v, j) => gateRes[j].rows[i]);
  const ok = cells.map((g, j) => { const hit = g.split(',').some(x => REL[k].includes(x)); if (c.soll === null || g === 'n/a') return '?'; if (hit === c.soll) return 'ja'; if (hit) dev[j].streng++; else dev[j].mild++; return 'NEIN'; });
  lines.push([`K${i + 1}`, d, ...cells, c.txt, c.soll ? 'Blocker' : 'kein', ...ok].join(' | '));
}
lines.push(`# Abweichungen Gate ↔ Chromium: ${V.map((v, j) => `${v.label} ${dev[j].streng + dev[j].mild} (strenger ${dev[j].streng}, milder ${dev[j].mild})`).join(' · ')}`);
console.log(lines.join('\n'));
await browser.close();
