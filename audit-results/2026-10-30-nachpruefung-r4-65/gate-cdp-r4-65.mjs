// Nachprüfung r4-65: eigene Mutationen über C.gate (r4-62 = d6dd542, r4-65 = f7f8d18) und Abgleich mit dem
// Zugänglichkeitsbaum von Chromium über CDP (Accessibility.getPartialAXTree am Link selbst).
// Aufruf: PLAYWRIGHT_MODULE=… node gate-cdp-r4-65.mjs <arbeitsbaum-r4-62> <arbeitsbaum-r4-65>
// Eingabe des Gates wie build.mjs: renderPage, Suchindex, Modus production, report und exists wie dort.
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, extname } from 'node:path';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const [wtOld, wtNew] = process.argv.slice(2);

async function load(wt, tweak) {
  delete require.cache[require.resolve(join(wt, 'authoring/tools/contract.js'))];
  const C = require(join(wt, 'authoring/tools/contract.js'));
  const src = join(wt, 'authoring');
  const config = JSON.parse(await readFile(join(src, 'site.config.json'), 'utf8'));
  if (tweak) tweak(config);
  const fragments = {};
  for (const p of config.pages) fragments[p.id] = await readFile(join(src, 'content', p.id + '.html'), 'utf8');
  const { injectSearchIndex } = await import(join(src, 'tools/search-index.mjs'));
  injectSearchIndex(config, fragments);
  const raw = {};
  for (const p of config.pages.filter(p => p.status === 'published')) raw[C.resolve('', p.href).path] = C.renderPage(config, p, fragments[p.id]);
  const reportPath = join(src, 'PRUEFBERICHT.md');
  const report = existsSync(reportPath) ? await readFile(reportPath, 'utf8') : null;
  const gate = files => C.gate(config, files, { mode: 'production', exists: x => Object.hasOwn(files, x) || existsSync(join(src, x)), report });
  return { C, raw, gate };
}
const noUtility = c => { delete c.utilityNav; };
const V = {
  old: await load(wtOld), neu: await load(wtNew),
  oldFb: await load(wtOld, noUtility), neuFb: await load(wtNew, noUtility),
};
for (const [k, v] of Object.entries(V)) {
  const g = v.gate(v.raw);
  console.log(`Grundzustand ${k}: ${Object.keys(v.raw).length} Seiten · Blocker ${g.blocks} · ${g.findings.filter(f => f.level === 'block').map(f => f.page + ':' + f.id).join(', ')}`);
}

const G = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const ROW = h => new RegExp(`(<a class="puk-site-utility__link" href="${h}"[^>]*>)([^<]*)(</a>)`);
const MENU = h => new RegExp(`(<a class="puk-web-nav__link puk-site-menu__utility-link" href="${h}"[^>]*>)([^<]*)(</a>)`);
// [Kennung, Beschreibung, Einschub hinter dem Linktext; mit ersetzt: true ersetzt der Einschub den Linktext]
const INS = [
  ['I1', 'img alt=""', `<img alt="" src="${G}" width="8" height="8">`],
  ['I2', 'img alt="Mehr"', `<img alt="Mehr" src="${G}" width="8" height="8">`],
  ['I3', 'img alt gleich der Beschriftung, Text ersetzt', `<img alt="Kurz und klar" src="${G}" width="8" height="8">`, true],
  ['I4', 'img ohne alt', `<img src="${G}" width="8" height="8">`],
  ['I5', 'img alt="Mehr" aria-hidden="true"', `<img alt="Mehr" aria-hidden="true" src="${G}" width="8" height="8">`],
  ['I6', 'img alt="Mehr" hidden', `<img alt="Mehr" hidden src="${G}">`],
  ['I7', 'img alt="Mehr" inert', `<img alt="Mehr" inert src="${G}" width="8" height="8">`],
  ['I8', 'span hidden > img alt="Mehr"', `<span hidden><img alt="Mehr" src="${G}"></span>`],
  ['I9', 'span aria-hidden > img alt="Mehr"', `<span aria-hidden="true"><img alt="Mehr" src="${G}" width="8" height="8"></span>`],
  ['I10', 'span inert > img alt="Mehr"', `<span inert><img alt="Mehr" src="${G}" width="8" height="8"></span>`],
  ['I11', 'img alt="Mehr" role="presentation"', `<img alt="Mehr" role="presentation" src="${G}" width="8" height="8">`],
  ['I12', 'img alt="Mehr" role="none"', `<img alt="Mehr" role="none" src="${G}" width="8" height="8">`],
  ['I13', 'img ohne alt mit title="Mehr"', `<img title="Mehr" src="${G}" width="8" height="8">`],
  ['I14', 'img alt="" title="Mehr"', `<img alt="" title="Mehr" src="${G}" width="8" height="8">`],
  ['I15', 'img alt="  " (nur Leerraum)', `<img alt="  " src="${G}" width="8" height="8">`],
  ['I16', 'img alt="" ersetzt den Text', `<img alt="" src="${G}" width="8" height="8">`, true],
  ['I17', 'img alt="Mehr" in svg > foreignObject', `<svg width="8" height="8"><foreignObject width="8" height="8"><img alt="Mehr" src="${G}" width="8" height="8"></foreignObject></svg>`],
  ['I18', 'img alt="Mehr" hidden in svg > foreignObject', `<svg width="8" height="8"><foreignObject width="8" height="8"><img hidden alt="Mehr" src="${G}"></foreignObject></svg>`],
  ['N1', 'input type=button value="Mehr"', '<input type="button" value="Mehr">'],
  ['N2', 'input type=submit ohne value', '<input type="submit">'],
  ['N3', 'input type=submit value="Mehr"', '<input type="submit" value="Mehr">'],
  ['N4', 'input type=text ohne value', '<input type="text">'],
  ['N5', 'input type=text value="Mehr"', '<input type="text" value="Mehr">'],
  ['N6', 'input type=hidden value="Mehr"', '<input type="hidden" value="Mehr">'],
  ['N7', 'input type=HIDDEN value="Mehr"', '<input type="HIDDEN" value="Mehr">'],
  ['N8', 'input type=checkbox', '<input type="checkbox">'],
  ['N9', 'input type=checkbox value="Mehr"', '<input type="checkbox" value="Mehr">'],
  ['N10', 'input type=image alt="Mehr"', `<input type="image" alt="Mehr" src="${G}" width="8" height="8">`],
  ['N11', 'input type=button value="Mehr" hidden', '<input type="button" value="Mehr" hidden>'],
  ['N12', 'input type=button value="Mehr" aria-hidden', '<input type="button" value="Mehr" aria-hidden="true">'],
  ['N13', 'input type=reset ohne value', '<input type="reset">'],
  ['N14', 'input type=text placeholder="Mehr"', '<input type="text" placeholder="Mehr">'],
  ['N15', 'input ohne type, value=""', '<input value="">'],
  ['N16', 'input type=range', '<input type="range">'],
  ['N17', 'input type=button value="" ', '<input type="button" value="">'],
  ['N18', 'input type=button value gleich der Beschriftung, Text ersetzt', '<input type="button" value="Kurz und klar">', true],
  ['N19', 'input type=" hidden" (ungültig, also Text)', '<input type=" hidden" value="Mehr">'],
  ['B1', 'button Mehr', '<button type="button">Mehr</button>'],
  ['B2', 'button leer', '<button type="button"></button>'],
  ['B3', 'select mit einer option «Mehr»', '<select><option>Mehr</option></select>'],
  ['B4', 'select A / Mehr (selected)', '<select><option>A</option><option selected>Mehr</option></select>'],
  ['B5', 'textarea «Mehr»', '<textarea>Mehr</textarea>'],
  ['B6', 'textarea leer', '<textarea></textarea>'],
  ['B7', 'area alt="Mehr" (ohne map)', '<area alt="Mehr" href="kurz.html">'],
  ['B8', 'map > area alt="Mehr"', '<map name="m1"><area alt="Mehr" href="kurz.html" shape="rect" coords="0,0,8,8"></map>'],
  ['B9', 'button aria-hidden «Mehr»', '<button type="button" aria-hidden="true">Mehr</button>'],
  ['B10', 'span title="Mehr" (leer)', '<span title="Mehr"></span>'],
  ['B11', 'Kontrolle: svg > title «Mehr»', '<svg width="8" height="8"><title>Mehr</title></svg>'],
  ['B12', 'Kontrolle: span hidden > input value', '<span hidden><input type="button" value="Mehr"></span>'],
];

const sub = (files, page, re, ins, replace) => {
  const h = files[page]; if (!re.test(h)) return false;
  files[page] = h.replace(re, (m, a, t, z) => a + (replace ? '' : t) + ins + z); return true;
};
const blocks = (v, files) => v.gate(files).findings.filter(f => f.level === 'block');
const ids = list => [...new Set(list.map(f => f.id))].sort().join('+') || '–';

const CASES = [];
for (const [id, desc, ins, replace] of INS) {
  CASES.push({ id: id + 'z', desc: 'Zeile: ' + desc, where: 'row', label: replace ? 'Kurz und klar' : 'Kurz und klar', href: 'kurz.html', ins, replace, page: 'index.html', fb: false, rule: 'utility-nav' });
  CASES.push({ id: id + 'm', desc: 'Menü: ' + desc, where: 'menu', label: 'Kurz und klar', href: 'kurz.html', ins, replace, page: 'index.html', fb: false, rule: 'nav' });
}
// Rückfall ohne utilityNav: einziger Direkteinstieg «Website durchsuchen» (suche.html)
for (const id of ['I1', 'I2', 'I5', 'I11', 'I13', 'N1', 'N6', 'N4', 'B5']) {
  const [, desc, ins, replace] = INS.find(x => x[0] === id);
  CASES.push({ id: id + 'r', desc: 'Rückfall Zeile: ' + desc, where: 'row', label: 'Website durchsuchen', href: 'suche.html', ins, replace, page: 'index.html', fb: true, rule: 'utility-nav' });
  CASES.push({ id: id + 'rm', desc: 'Rückfall Menü: ' + desc, where: 'menu', label: 'Website durchsuchen', href: 'suche.html', ins, replace, page: 'index.html', fb: true, rule: 'nav' });
}

const browser = await chromium.launch();
async function axName(files, page, where, href, width) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const pg = await ctx.newPage();
  await pg.route('http://pruef.test/**', async route => {
    const p = new URL(route.request().url()).pathname.slice(1) || 'index.html';
    if (Object.hasOwn(files, p)) return route.fulfill({ body: files[p], contentType: 'text/html; charset=utf-8' });
    const f = join(wtNew, 'site', p);
    if (existsSync(f)) {
      const t = { '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.json': 'application/json' }[extname(f)] || 'application/octet-stream';
      return route.fulfill({ body: await readFile(f), contentType: t });
    }
    return route.fulfill({ status: 404, body: '' });
  });
  await pg.goto('http://pruef.test/' + page, { waitUntil: 'load' });
  const sel = where === 'row' ? `nav[aria-label="Direkteinstiege"] a[href="${href}"]` : `a.puk-site-menu__utility-link[href="${href}"]`;
  if (where === 'menu') { const b = pg.locator('.puk-site-menu .puk-disclosure__button'); if (await b.count()) await b.first().click(); }
  const cdp = await ctx.newCDPSession(pg);
  const { result } = await cdp.send('Runtime.evaluate', { expression: `document.querySelector(${JSON.stringify(sel)})` });
  let out;
  if (!result.objectId) out = { role: '–', name: '(kein Link)', ignored: true };
  else {
    const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { objectId: result.objectId, fetchRelatives: false });
    const n = nodes[0] || {};
    out = { role: n.role?.value ?? '?', name: n.name?.value ?? '', ignored: !!n.ignored };
  }
  await ctx.close();
  return out;
}

const norm = s => String(s || '').replace(/\s+/g, ' ').trim();
const rows = []; let agreeNew = 0, agreeOld = 0, strictNew = 0, mildNew = 0;
console.log('Kennung|Fall|Gate r4-62|Gate r4-65|Chromium|Chromium weicht ab|r4-65 ↔ Chromium|r4-62 → r4-65');
for (const k of CASES) {
  const vo = k.fb ? V.oldFb : V.old, vn = k.fb ? V.neuFb : V.neu;
  const fo = { ...vo.raw }, fn = { ...vn.raw };
  const re = (k.where === 'row' ? ROW : MENU)(k.href.replace('.', '\\.'));
  const ok = sub(fo, k.page, re, k.ins, k.replace) & sub(fn, k.page, re, k.ins, k.replace);
  if (!ok) { console.log(`${k.id}|${k.desc}|nicht anwendbar`); continue; }
  const bo = blocks(vo, fo), bn = blocks(vn, fn);
  const go = bo.some(f => f.id === k.rule), gn = bn.some(f => f.id === k.rule);
  const ax = await axName(fn, k.page, k.where, k.href, k.where === 'row' ? 1280 : 300);
  const devi = ax.ignored || ax.role !== 'link' || norm(ax.name) !== k.label;
  const rel = gn === devi ? 'gleich' : gn ? 'strenger' : 'MILDER';
  if (gn === devi) agreeNew++; else if (gn) strictNew++; else mildNew++;
  if (go === devi) agreeOld++;
  const chg = go === gn ? '–' : (gn ? 'neu blockiert' : 'NICHT MEHR BLOCKIERT');
  console.log(`${k.id}|${k.desc}|${ids(bo)}|${ids(bn)}|${ax.role}${ax.ignored ? ' (ignored)' : ''} «${ax.name}»|${devi ? 'ja' : 'nein'}|${rel}|${chg}`);
}
console.log(`\n${CASES.length} Fälle · r4-65 ↔ Chromium gleich ${agreeNew}, strenger ${strictNew}, milder ${mildNew} · r4-62 ↔ Chromium gleich ${agreeOld}`);

// Fehlerseite: keine Direkteinstiege; eine eingeschobene Zeile darf dort keinen utility-nav-Befund auslösen (isNotFound).
// Menüeinträge erscheinen erst unter 20 rem (Zeile ausgeblendet), darum wird das Menü bei 300 px geöffnet.
{
  const nf = Object.keys(V.neu.raw).find(p => /404/.test(p));
  const inj = `<nav aria-label="Direkteinstiege"><a href="kurz.html">Kurz und klar<img alt="Mehr" src="${G}"></a></nav>`;
  for (const [k, v] of [['r4-62', V.old], ['r4-65', V.neu]]) {
    const f = { ...v.raw }; f[nf] = f[nf].replace('</main>', inj + '</main>');
    const b = blocks(v, f); console.log(`Fehlerseite ${nf} mit eingeschobener Zeile (${k}): utility-nav ${b.some(x => x.id === 'utility-nav') ? 'ja' : 'nein'} · alle Blocker: ${b.map(x => x.id + ' «' + x.msg + '»').join('; ') || '–'}`);
  }
}
await browser.close();
