// Nachprüfung r4-66: eigene Mutationen über C.gate (r4-65 und r4-66), verglichen mit dem Zugänglichkeitsbaum von Chromium über CDP.
// Aufruf: PLAYWRIGHT_MODULE=… node gate-cdp-r4-66.mjs <Arbeitsbaum r4-65> <Arbeitsbaum r4-66> <Arbeitsordner>
import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const [A, B, W] = process.argv.slice(2).map(p => resolve(p));
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

// Eingabe wie build.mjs: renderPage für veröffentlichte Seiten, Suchindex, Modus production, report und exists wie dort.
async function load(root, fallback) {
  const C = require(join(root, 'authoring/tools/contract.js'));
  const config = JSON.parse(await readFile(join(root, 'authoring/site.config.json'), 'utf8'));
  if (fallback) delete config.utilityNav;
  const fr = {}; for (const p of config.pages) fr[p.id] = await readFile(join(root, 'authoring/content', p.id + '.html'), 'utf8');
  const { injectSearchIndex } = await import(pathToFileURL(join(root, 'authoring/tools/search-index.mjs')));
  injectSearchIndex(config, fr);
  const files = {};
  for (const p of config.pages.filter(p => p.status === 'published')) files[C.resolve('', p.href).path] = C.renderPage(config, p, fr[p.id]);
  const rp = join(root, 'authoring/PRUEFBERICHT.md'); const report = existsSync(rp) ? await readFile(rp, 'utf8') : null;
  const run = f => C.gate(config, f, { mode: 'production', exists: p => Object.hasOwn(f, p) || existsSync(join(root, 'authoring', p)), report });
  return { C, config, files, run };
}
const SEL = {
  z: { re: href => new RegExp(`(<a class="puk-site-utility__link" href="${href}"[^>]*>)([^<]*)(</a>)`), css: href => `nav[aria-label="Direkteinstiege"] a[href="${href}"]`, rule: 'utility-nav' },
  m: { re: href => new RegExp(`(<a class="puk-web-nav__link puk-site-menu__utility-link" href="${href}"[^>]*>)([^<]*)(</a>)`), css: href => `.puk-site-menu__utility-link[href="${href}"]`, rule: 'nav' },
};
const D = 'src="data:," width="8" height="8"';
// [Kennung, Beschreibung, Ersatz des Linktexts T]
const CASES = [
  ['P0', 'unverändert', T => T],
  ['P1', 'Text « Mehr» ergänzt (Gegenkontrolle)', T => T + ' Mehr'],
  ['I1', 'img alt="Mehr" nach dem Text', T => `${T}<img alt="Mehr" ${D}>`],
  ['I2', 'img alt="" nach dem Text', T => `${T}<img alt="" ${D}>`],
  ['I3', 'img alt gleich der Beschriftung, Text ersetzt', T => `<img alt="${T}" ${D}>`],
  ['I4', 'img ohne alt', T => `${T}<img ${D}>`],
  ['I5', 'img ohne alt, title="Mehr"', T => `${T}<img title="Mehr" ${D}>`],
  ['I6', 'img alt="", title="Mehr"', T => `${T}<img alt="" title="Mehr" ${D}>`],
  ['I7', 'img alt="Mehr" aria-hidden="true"', T => `${T}<img alt="Mehr" aria-hidden="true" ${D}>`],
  ['I8', 'img alt="Mehr" hidden', T => `${T}<img alt="Mehr" hidden ${D}>`],
  ['I9', 'img alt="Mehr" inert', T => `${T}<img alt="Mehr" inert ${D}>`],
  ['I10', 'img alt="Mehr" in span hidden', T => `${T}<span hidden><img alt="Mehr" ${D}></span>`],
  ['I11', 'img alt="Mehr" in span inert', T => `${T}<span inert><img alt="Mehr" ${D}></span>`],
  ['I12', 'img alt="Mehr" in span aria-hidden="true"', T => `${T}<span aria-hidden="true"><img alt="Mehr" ${D}></span>`],
  ['I13', 'img alt="Mehr" role="presentation"', T => `${T}<img alt="Mehr" role="presentation" ${D}>`],
  ['I14', 'img alt="Mehr" role="none"', T => `${T}<img alt="Mehr" role="none" ${D}>`],
  ['I15', 'IMG ALT="Mehr" (Grossschreibung)', T => `${T}<IMG ALT="Mehr" SRC="data:," WIDTH="8" HEIGHT="8">`],
  ['I16', 'img alt="Mehr" aria-hidden="false"', T => `${T}<img alt="Mehr" aria-hidden="false" ${D}>`],
  ['I17', 'img alt="  " (nur Leerraum)', T => `${T}<img alt="  " ${D}>`],
  ['I18', 'picture mit img alt="Mehr"', T => `${T}<picture><img alt="Mehr" ${D}></picture>`],
  ['I19', 'img alt="" mitten im Wort', T => `${T.slice(0, 7)}<img alt="" ${D}>${T.slice(7)}`],
  ['I20', 'img alt="Mehr" style="display:none"', T => `${T}<img alt="Mehr" style="display:none" ${D}>`],
  ['I21', 'img alt gleich der Beschriftung neben dem Text', T => `${T}<img alt="${T}" ${D}>`],
  ['I22', 'img alt="Mehr" in span aria-hidden="false"', T => `${T}<span aria-hidden="false"><img alt="Mehr" ${D}></span>`],
  ['N1', 'input type=button value="Mehr"', T => `${T}<input type="button" value="Mehr">`],
  ['N2', 'input type=submit ohne value', T => `${T}<input type="submit">`],
  ['N3', 'input type=submit value="Mehr"', T => `${T}<input type="submit" value="Mehr">`],
  ['N4', 'input type=text ohne value', T => `${T}<input type="text">`],
  ['N5', 'input type=text value="Mehr"', T => `${T}<input type="text" value="Mehr">`],
  ['N6', 'input type=hidden value="Mehr"', T => `${T}<input type="hidden" value="Mehr">`],
  ['N7', 'input type=HIDDEN value="Mehr"', T => `${T}<input type="HIDDEN" value="Mehr">`],
  ['N8', 'input TYPE=Hidden value="Mehr"', T => `${T}<input TYPE="Hidden" value="Mehr">`],
  ['N9', 'input type=checkbox ohne value', T => `${T}<input type="checkbox">`],
  ['N10', 'input type=checkbox value="Mehr"', T => `${T}<input type="checkbox" value="Mehr">`],
  ['N11', 'input type=image alt="Mehr"', T => `${T}<input type="image" alt="Mehr" ${D}>`],
  ['N12', 'input type=image alt=""', T => `${T}<input type="image" alt="" ${D}>`],
  ['N13', 'input type=button value="Mehr" hidden', T => `${T}<input type="button" value="Mehr" hidden>`],
  ['N14', 'input type=button value="Mehr" aria-hidden="true"', T => `${T}<input type="button" value="Mehr" aria-hidden="true">`],
  ['N15', 'input type=text placeholder="Mehr"', T => `${T}<input type="text" placeholder="Mehr">`],
  ['N16', 'input type=button value gleich der Beschriftung, Text ersetzt', T => `<input type="button" value="${T}">`],
  ['N17', 'input type=button value=""', T => `${T}<input type="button" value="">`],
  ['N18', 'input type=range', T => `${T}<input type="range">`],
  ['N19', 'input ohne type', T => `${T}<input>`],
  ['N20', 'input type=BUTTON value="Mehr"', T => `${T}<input type="BUTTON" value="Mehr">`],
  ['N21', 'input type=button value="Mehr" in span inert', T => `${T}<span inert><input type="button" value="Mehr"></span>`],
  ['N22', 'input type=image alt gleich der Beschriftung, Text ersetzt', T => `<input type="image" alt="${T}" ${D}>`],
  ['B1', 'button Mehr', T => `${T}<button>Mehr</button>`],
  ['B2', 'button Mehr aria-hidden="true"', T => `${T}<button aria-hidden="true">Mehr</button>`],
  ['B3', 'leerer button', T => `${T}<button></button>`],
  ['B4', 'button mit der Beschriftung, Text ersetzt', T => `<button>${T}</button>`],
  ['B5', 'button mit img alt="Mehr"', T => `${T}<button><img alt="Mehr" ${D}></button>`],
  ['S1', 'select Mehr/Weniger', T => `${T}<select><option>Mehr</option><option>Weniger</option></select>`],
  ['S2', 'select mit leerer option', T => `${T}<select><option></option></select>`],
  ['S3', 'select, zweite option selected', T => `${T}<select><option>Mehr</option><option selected>Weniger</option></select>`],
  ['X1', 'textarea Mehr', T => `${T}<textarea>Mehr</textarea>`],
  ['X2', 'leere textarea', T => `${T}<textarea></textarea>`],
  ['X3', 'textarea placeholder="Mehr"', T => `${T}<textarea placeholder="Mehr"></textarea>`],
];
const norm = s => String(s || '').replace(/\s+/g, ' ').trim();
const rel = (r, html) => { if (!html) return null; const m = html.match(r); return m ? html.replace(r, (all, a, t, c) => a + 'XXT' + c) : null; };

const out = []; const log = s => { out.push(s); console.log(s); };
// Zeile bei 390 px; Direkteinstiege im Menü zeigt das Stylesheet nur unter 20 rem, darum dort 300 px und Menü geöffnet.
const browser = await chromium.launch(); const CTX = { z: await browser.newContext({ viewport: { width: 390, height: 900 } }), m: await browser.newContext({ viewport: { width: 300, height: 900 } }) };
await mkdir(W, { recursive: true });
for (const d of ['css', 'js', 'img', 'assets', 'fonts']) if (existsSync(join(B, 'site', d))) await cp(join(B, 'site', d), join(W, d), { recursive: true });
const stat = {}; const strictUnexpected = [];
log('Fall|Ort|Gate r4-65|Gate r4-66|Chromium (Rolle «Name», ignoriert?)|sichtbarer Text|Chromium = Beschriftung|r4-66 gegen Chromium|r4-66 gegen r4-65');
for (const fallback of [false, true]) {
  const a = await load(A, fallback), b = await load(B, fallback);
  const want = b.config.utilityNav ? { href: 'kurz.html', label: 'Kurz und klar' } : { href: 'suche.html', label: 'Website durchsuchen' };
  const base = { a: a.run(a.files).findings.filter(x => x.level === 'block').length, b: b.run(b.files).findings.filter(x => x.level === 'block').length };
  log(`# ${fallback ? 'Rückfall ohne utilityNav' : 'mit utilityNav'} · Ausgangslage Blocker r4-65 ${base.a}, r4-66 ${base.b}`);
  for (const pos of ['z', 'm']) {
    const s = SEL[pos];
    for (const [id, desc, f] of CASES) {
      const mut = st => { const fs = Object.assign({}, st.files); const h = fs['index.html']; const r = s.re(want.href); const m = h.match(r); if (!m) return null; fs['index.html'] = h.replace(r, (all, o, t, c) => o + f(t) + c); return fs; };
      const fa = mut(a), fb = mut(b); if (!fa || !fb) { log(`${id}|${pos}|Mutation nicht anwendbar`); continue; }
      const blk = (st, fs) => st.run(fs).findings.filter(x => x.level === 'block').map(x => x.id);
      const ga = blk(a, fa), gb = blk(b, fb);
      const hitA = ga.includes(s.rule), hitB = gb.includes(s.rule);
      const other = [...new Set(gb.filter(x => x !== s.rule))];
      const file = join(W, `${fallback ? 'r' : 'n'}-${pos}-${id}.html`); await writeFile(file, fb['index.html']);
      const ctx = CTX[pos]; const page = await ctx.newPage(); await page.goto(pathToFileURL(file).href); await page.waitForLoadState('load');
      if (pos === 'm') { const btn = await page.$('.puk-site-menu .puk-disclosure__button'); if (btn) { await btn.click(); await page.waitForTimeout(50); } else log('WARNUNG: kein Menüknopf'); }
      const cdp = await ctx.newCDPSession(page); await cdp.send('DOM.enable'); await cdp.send('Accessibility.enable');
      const { root } = await cdp.send('DOM.getDocument', { depth: -1 });
      const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: s.css(want.href) });
      let name = '(nicht gefunden)', role = '', ign = false, vis = '';
      if (nodeId) { const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false }); const n = nodes[0]; name = n.name ? n.name.value : ''; role = n.role ? n.role.value : ''; ign = !!n.ignored;
        vis = await page.$eval(s.css(want.href), el => el.innerText); }
      await page.close();
      const chrOk = !ign && role === 'link' && norm(name) === want.label;
      const visOk = norm(vis) === want.label;
      const cmp = hitB === !chrOk ? (hitB ? 'gleich (blockiert)' : 'gleich (frei)') : hitB ? 'STRENGER' : 'MILDER';
      const evo = hitA === hitB ? '–' : hitB ? 'NEU BLOCKIERT' : 'NICHT MEHR BLOCKIERT';
      const k = `${cmp}`; stat[k] = (stat[k] || 0) + 1; if (evo !== '–') stat[evo] = (stat[evo] || 0) + 1;
      log(`${id}${fallback ? 'r' : ''}|${pos === 'z' ? 'Zeile' : 'Menü'}: ${desc}|${hitA ? s.rule : '–'}|${hitB ? s.rule : '–'}${other.length ? ' +' + other.join(',') : ''}|${role} «${norm(name)}»${ign ? ' ignoriert' : ''}|«${norm(vis)}»|${chrOk ? 'ja' : 'nein'}${chrOk && !visOk ? ' (sichtbar nein)' : ''}|${cmp}|${evo}`);
    }
  }
}
// Fehlerseite und gewöhnliche Links: ctlTxt darf dort nichts ändern.
{
  const a = await load(A, false), b = await load(B, false);
  const ids = (st, fs) => JSON.stringify(st.run(fs).findings.map(x => [x.level, x.page, x.id, x.msg]).map(x => x.join('/')).sort());
  const same = (fa, fb) => ids(a, fa) === ids(b, fb) ? 'gleich' : 'VERSCHIEDEN';
  log('# Ohne Mutation: alle Befunde (Stufe, Seite, Regel, Meldung) r4-65 gegen r4-66: ' + same(a.files, b.files) + ` (${b.run(b.files).findings.length} Befunde)`);
  const g = st => { const fs = Object.assign({}, st.files); fs['index.html'] = fs['index.html'].replace('</main>', '<p><a href="kurz.html">Kurz und klar<img alt="Mehr" src="data:,"><input type="button" value="Mehr"></a></p></main>'); return fs; };
  log('# Gewöhnlicher Link im Inhalt mit img alt und input value: Befunde r4-65 gegen r4-66: ' + same(g(a), g(b)));
  const e = st => { const fs = Object.assign({}, st.files); fs['404.html'] = fs['404.html'].replace('</main>', '<nav aria-label="Direkteinstiege"><a href="/kurz.html">Kurz und klar<img alt="Mehr" src="data:,"></a></nav></main>'); return fs; };
  log('# Fehlerseite mit Zeile «Direkteinstiege» und img alt: Befunde r4-65 gegen r4-66: ' + same(e(a), e(b)) + ' · Blocker r4-66: ' + (b.run(e(b)).findings.filter(x => x.level === 'block').map(x => x.id).join(',') || 'keine'));
  log('# Fehlerseite unverändert, Blocker r4-66: ' + (b.run(b.files).findings.filter(x => x.level === 'block' && x.page === '404').length));
}
log('# Bilanz: ' + Object.entries(stat).map(([k, v]) => `${k} ${v}`).join(' · '));
log('# Chromium ' + browser.version());
await browser.close();
await writeFile(join(W, 'ausgabe.txt'), out.join('\n') + '\n');
