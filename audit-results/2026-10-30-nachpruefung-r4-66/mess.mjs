// Nachprüfung r4-66: Gate (C.gate, Eingabe wie build.mjs) gegen Chromium-Zugänglichkeitsbaum (CDP).
// Aufruf: node mess.mjs <worktree> [nurGate]
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, extname } from 'node:path';
const wt = process.argv[2]; const gateOnly = process.argv[3] === 'nurGate';
const require = createRequire(import.meta.url);
const C = require(join(wt, 'authoring/tools/contract.js'));
const { injectSearchIndex } = await import(join(wt, 'authoring/tools/search-index.mjs'));
const src = join(wt, 'authoring');
const cfg0 = JSON.parse(readFileSync(join(src, 'site.config.json'), 'utf8'));
const frags = Object.fromEntries(cfg0.pages.map(p => [p.id, readFileSync(join(src, 'content', p.id + '.html'), 'utf8')]));
injectSearchIndex(cfg0, frags);
const render = cfg => Object.fromEntries(cfg.pages.filter(p => p.status === 'published').map(p => [C.resolve('', p.href).path, C.renderPage(cfg, p, frags[p.id])]));
const runGate = (cfg, files) => C.gate(cfg, files, { mode: 'production', exists: p => Object.hasOwn(files, p) || existsSync(join(src, p)) });

const ROW = /(<a class="puk-site-utility__link" href="kurz\.html"[^>]*>)([^<]*)</;
const MENU = /(<a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz\.html"[^>]*>)([^<]*)</;
// [Name, Ort, Einfügung nach dem Linktext (oder Funktion text=>Inhalt)]
const T = 'Kurz und klar';
const cases = [
  ['Basis ohne Änderung', 'row', ''],
  ['img alt="Mehr"', 'row', '<img alt="Mehr" src="data:," width="8" height="8">'],
  ['img alt="" (leer)', 'row', '<img alt="" src="data:," width="8" height="8">'],
  ['img alt="   " (Leerraum)', 'row', '<img alt="   " src="data:," width="8" height="8">'],
  ['img ohne alt', 'row', '<img src="data:," width="8" height="8">'],
  ['img ohne alt mit title="Mehr"', 'row', '<img title="Mehr" src="data:," width="8" height="8">'],
  ['img alt="" title="Mehr"', 'row', '<img alt="" title="Mehr" src="data:," width="8" height="8">'],
  ['img alt = Beschriftung, Text entfernt', 'row', () => '<img alt="Kurz und klar" src="data:," width="8" height="8">'],
  ['Text + img alt = Beschriftung', 'row', '<img alt="Kurz und klar" src="data:," width="8" height="8">'],
  ['img alt mitten im Wort: «Kurz und kl<img alt=ar>»', 'row', () => 'Kurz und kl<img alt="ar" src="data:," width="8" height="8">'],
  ['img alt="" mitten: «Kurz und<img alt="">klar»', 'row', () => 'Kurz und<img alt="" src="data:," width="8" height="8">klar'],
  ['img role="presentation" alt="Mehr"', 'row', '<img role="presentation" alt="Mehr" src="data:," width="8" height="8">'],
  ['img role="none" alt="Mehr"', 'row', '<img role="none" alt="Mehr" src="data:," width="8" height="8">'],
  ['img aria-hidden="true" alt="Mehr"', 'row', '<img aria-hidden="true" alt="Mehr" src="data:," width="8" height="8">'],
  ['img hidden alt="Mehr"', 'row', '<img hidden alt="Mehr" src="data:," width="8" height="8">'],
  ['IMG ALT="Mehr" (Grossschrift)', 'row', '<IMG ALT="Mehr" SRC="data:," width="8" height="8">'],
  ['img in svg foreignObject? nein: picture>img alt="Mehr"', 'row', '<picture><img alt="Mehr" src="data:," width="8" height="8"></picture>'],
  ['map/area alt="Mehr" (img usemap)', 'row', '<img src="data:," width="8" height="8" alt="" usemap="#m"><map name="m"><area shape="rect" coords="0,0,8,8" href="fragen.html" alt="Mehr"></map>'],
  ['area alt="Mehr" direkt im Link', 'row', '<map name="m2"><area shape="rect" coords="0,0,8,8" href="fragen.html" alt="Mehr"></map>'],
  ['input type=text value="Mehr"', 'row', '<input type="text" value="Mehr">'],
  ['input type=text ohne value', 'row', '<input type="text">'],
  ['input type=text value=""', 'row', '<input type="text" value="">'],
  ['input type=text placeholder="Mehr"', 'row', '<input type="text" placeholder="Mehr">'],
  ['input ohne type value="Mehr"', 'row', '<input value="Mehr">'],
  ['input type=hidden value="Mehr"', 'row', '<input type="hidden" value="Mehr">'],
  ['input type=HIDDEN value="Mehr"', 'row', '<input type="HIDDEN" value="Mehr">'],
  ['input type=button value="Mehr"', 'row', '<input type="button" value="Mehr">'],
  ['input type=button ohne value', 'row', '<input type="button">'],
  ['input type=submit value="Mehr"', 'row', '<input type="submit" value="Mehr">'],
  ['input type=submit ohne value', 'row', '<input type="submit">'],
  ['input type=reset ohne value', 'row', '<input type="reset">'],
  ['input type=image alt="Mehr"', 'row', '<input type="image" alt="Mehr" src="data:,">'],
  ['input type=image alt="Mehr" value="X"', 'row', '<input type="image" alt="Mehr" value="X" src="data:,">'],
  ['input type=image ohne alt', 'row', '<input type="image" src="data:,">'],
  ['input type=checkbox', 'row', '<input type="checkbox">'],
  ['input type=checkbox value="Mehr"', 'row', '<input type="checkbox" value="Mehr">'],
  ['input type=radio value="Mehr"', 'row', '<input type="radio" value="Mehr">'],
  ['input type=range', 'row', '<input type="range">'],
  ['input type=color', 'row', '<input type="color">'],
  ['input type=file', 'row', '<input type="file">'],
  ['input hidden-Attribut value="Mehr"', 'row', '<input hidden value="Mehr">'],
  ['input aria-hidden="true" value="Mehr"', 'row', '<input aria-hidden="true" value="Mehr">'],
  ['input value = Beschriftung, Text entfernt', 'row', () => '<input value="Kurz und klar">'],
  ['textarea «Mehr»', 'row', '<textarea>Mehr</textarea>'],
  ['textarea leer', 'row', '<textarea></textarea>'],
  ['select option «Mehr»', 'row', '<select><option>Mehr</option></select>'],
  ['select zwei Optionen, zweite gewählt', 'row', '<select><option>A</option><option selected>Mehr</option></select>'],
  ['select mit leerer Option', 'row', '<select><option></option></select>'],
  ['button «Mehr»', 'row', '<button>Mehr</button>'],
  ['img alt="Mehr" title="Anders"', 'row', '<img alt="Mehr" title="Anders" src="data:," width="8" height="8">'],
  ['input type=text title="Mehr" ohne value', 'row', '<input type="text" title="Mehr">'],
  ['input type=button title="Mehr" ohne value', 'row', '<input type="button" title="Mehr">'],
  ['noscript mit img alt="Mehr"', 'row', '<noscript><img alt="Mehr" src="data:,"></noscript>'],
  ['template mit img alt="Mehr"', 'row', '<template><img alt="Mehr" src="data:,"></template>'],
  ['svg aria-hidden mit foreignObject img alt', 'row', '<svg aria-hidden="true" width="8" height="8"><foreignObject width="8" height="8"><img alt="Mehr" src="data:,"></foreignObject></svg>'],
  ['img alt="Mehr" in span aria-hidden="false"', 'row', '<span aria-hidden="false"><img alt="Mehr" src="data:,"></span>'],
  ['Menü: img alt="Mehr"', 'menu', '<img alt="Mehr" src="data:," width="8" height="8">'],
  ['Menü: img alt=""', 'menu', '<img alt="" src="data:," width="8" height="8">'],
  ['Menü: input type=button value="Mehr"', 'menu', '<input type="button" value="Mehr">'],
  ['Menü: input type=hidden value="Mehr"', 'menu', '<input type="hidden" value="Mehr">'],
  ['Menü: input type=checkbox', 'menu', '<input type="checkbox">'],
];
const apply = (html, where, ins) => {
  const re = where === 'menu' ? MENU : ROW;
  if (!re.test(html)) return null;
  return html.replace(re, (m, a, t) => a + (typeof ins === 'function' ? ins(t) : t + ins) + '<');
};
const blockIds = (cfg, files, page) => [...new Set(runGate(cfg, files).findings.filter(f => f.level === 'block' && f.page.includes(page.replace('.html', ''))).map(f => f.id))];

let pw, browser;
if (!gateOnly) { pw = require(process.env.PLAYWRIGHT_MODULE); browser = await pw.chromium.launch(); }
const dist = join(wt, 'dist/site');
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.json': 'application/json', '.ico': 'image/x-icon' };
async function axName(files, page, where) {
  const ctx = await browser.newContext({ viewport: where === 'menu' ? { width: 300, height: 800 } : { width: 1280, height: 900 } });
  const pg = await ctx.newPage();
  await pg.route('http://t/**', r => {
    const p = new URL(r.request().url()).pathname.slice(1) || 'index.html';
    if (Object.hasOwn(files, p)) return r.fulfill({ status: 200, contentType: 'text/html', body: files[p] });
    const f = join(dist, p); if (existsSync(f)) return r.fulfill({ status: 200, contentType: MIME[extname(f)] || 'application/octet-stream', body: readFileSync(f) });
    return r.fulfill({ status: 404, body: '' });
  });
  await pg.goto('http://t/' + page, { waitUntil: 'load' });
  const sel = where === 'menu' ? 'a.puk-site-menu__utility-link[href="kurz.html"]' : 'nav[aria-label="Direkteinstiege"] a[href="kurz.html"]';
  if (where === 'menu') { const b = await pg.$('.puk-site-menu .puk-disclosure__button'); if (b) await b.click(); }
  const cdp = await ctx.newCDPSession(pg);
  const { root } = await cdp.send('DOM.getDocument', { depth: 0 });
  const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: sel });
  let out = { name: '(Link fehlt)', ignored: null };
  if (nodeId) {
    const { node } = await cdp.send('DOM.describeNode', { nodeId });
    const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { backendNodeId: node.backendNodeId, fetchRelatives: false });
    const n = nodes[0]; out = { name: n?.name?.value ?? '', ignored: !!n?.ignored, role: n?.role?.value };
  }
  await ctx.close();
  return out;
}
const norm = s => String(s || '').replace(/\s+/g, ' ').trim();
const lines = [];
const log = s => { lines.push(s); console.log(s); };
log(`Worktree ${wt} · BUILD ${C.BUILD}`);
log(['Fall', 'Gate-Blocker (Seite index)', 'Chromium-Name', 'Chromium: Name ≠ «Kurz und klar»', 'Urteil'].join(' | '));
const files0 = render(cfg0);
for (const [name, where, ins] of cases) {
  const files = { ...files0 }; const h = apply(files['index.html'], where, ins);
  if (h == null) { log(`${name} | Mutation nicht anwendbar`); continue; }
  files['index.html'] = h;
  const ids = blockIds(cfg0, files, 'index').filter(x => x === 'utility-nav' || x === 'nav');
  const gateBlocks = ids.length > 0;
  let cr = '—', crBad = '—', verdict = '—';
  if (!gateOnly) {
    const a = await axName(files, 'index.html', where);
    cr = JSON.stringify(a.name) + (a.ignored ? ' (ignored)' : '');
    const bad = norm(a.name) !== T; crBad = bad ? 'ja' : 'nein';
    verdict = gateBlocks === bad ? 'gleich' : (gateBlocks ? 'FALSCH-POSITIV (Gate strenger)' : 'FALSCH-NEGATIV (Gate lässt durch)');
  }
  log(`${name} | ${ids.join(',') || 'kein Blocker'} | ${cr} | ${crBad} | ${verdict}`);
}
// Rückfall ohne utilityNav: Eintrag «Website durchsuchen»
{
  const cfg = JSON.parse(JSON.stringify(cfg0)); delete cfg.utilityNav;
  const files = render(cfg);
  const re = /(<a class="puk-site-utility__link" href="suche\.html"[^>]*>)([^<]*)</;
  const base = blockIds(cfg, files, 'index');
  const f2 = { ...files, 'index.html': files['index.html'].replace(re, '$1$2<img alt="Mehr" src="data:,"><') };
  const f3 = { ...files, 'index.html': files['index.html'].replace(re, '$1$2<img alt="" src="data:,"><input type="hidden" value="x"><') };
  log(`Rückfall ohne utilityNav: Basis | ${base.join(',') || 'kein Blocker'}`);
  log(`Rückfall ohne utilityNav: img alt="Mehr" (angewandt: ${f2['index.html'] !== files['index.html']}) | ${blockIds(cfg, f2, 'index').join(',') || 'kein Blocker'}`);
  log(`Rückfall ohne utilityNav: img alt="" + input hidden (angewandt: ${f3['index.html'] !== files['index.html']}) | ${blockIds(cfg, f3, 'index').join(',') || 'kein Blocker'}`);
}
// Fehlerseite: keine Zeile, keine Regel; img im Logo-Link o. ä. darf nichts auslösen
{
  const files = { ...files0 }; const before = blockIds(cfg0, files, '404');
  log(`Fehlerseite 404.html: Direkteinstiege-Zeile vorhanden: ${/aria-label="Direkteinstiege"/.test(files['404.html'])} | Blocker: ${before.join(',') || 'kein Blocker'}`);
  const f2 = { ...files, '404.html': files['404.html'].replace(/(<main[^>]*>)/, '$1<p><a href="index.html">Startseite<img alt="Mehr" src="data:,"></a></p>') };
  log(`Fehlerseite mit <a>…<img alt> im Inhalt (angewandt: ${f2['404.html'] !== files['404.html']}) | Blocker: ${blockIds(cfg0, f2, '404').join(',') || 'kein Blocker'}`);
}
// Wirkung ausserhalb der Direkteinstiege: Gesamtergebnis unverändert
{ const r = runGate(cfg0, files0); log(`Ungeänderte Seiten: ${r.blocks} Blocker, ${r.warns} Hinweise`); }
if (browser) await browser.close();
