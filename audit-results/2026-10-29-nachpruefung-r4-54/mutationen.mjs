// Nachprüfung r4-54: eigene Mutationen über C.gate auf den gerenderten Seiten. Aufruf: node mutationen.mjs <authoring-Verzeichnis>
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
const src = process.argv[2];
const require = createRequire(import.meta.url);
const C = require(join(src, 'tools/contract.js'));
const { injectSearchIndex } = await import(join(src, 'tools/search-index.mjs'));
const baseCfg = JSON.parse(readFileSync(join(src, 'site.config.json'), 'utf8'));
const render = cfg => {
  const fr = Object.fromEntries(cfg.pages.map(p => [p.id, readFileSync(join(src, 'content', p.id + '.html'), 'utf8')]));
  injectSearchIndex(cfg, fr);
  return Object.fromEntries(cfg.pages.filter(p => p.status === 'published').map(p => [C.resolve('', p.href).path, C.renderPage(cfg, p, fr[p.id])]));
};
const LINE = /<nav class="puk-site-utility"[\s\S]*?<\/nav>/;
const MENU = /\n<li class="puk-site-menu__utility">[\s\S]*?<\/li>/g;
const onLine = (f, file, fn) => { const m = f[file].match(LINE); if (!m) throw new Error('keine Zeile: ' + file); const n = fn(m[0]); if (n === m[0]) throw new Error('Mutation griff nicht: ' + file); f[file] = f[file].replace(m[0], n); };
const SWAP = l => l.replace(/(<a [^>]*href="kurz.html"[^>]*>[^<]*<\/a>)(<a [^>]*href="fragen.html"[^>]*>[^<]*<\/a>)/, '$2$1');
const sub = (f, file, re, to) => { const b = f[file]; f[file] = b.replace(re, to); if (f[file] === b) throw new Error('Mutation griff nicht: ' + file + ' ' + re); };
const cases = [
  ['M0 Bestand', () => {}],
  ['M1 index: Zeile und Menüeinträge entfernt', (c, f) => { sub(f, 'index.html', LINE, ''); sub(f, 'index.html', MENU, ''); }],
  ['M2 index: nur Zeile entfernt', (c, f) => sub(f, 'index.html', LINE, '')],
  ['M3 index: Reihenfolge in der Zeile vertauscht', (c, f) => sub(f, 'index.html', /(<a class="puk-site-utility__link" href="kurz.html">Kurz und klar<\/a>)(<a class="puk-site-utility__link" href="fragen.html">Nachschlagen<\/a>)/, '$2$1')],
  ['M4 index: ein Eintrag zu viel in der Zeile', (c, f) => onLine(f, 'index.html', l => l.replace('</nav>', '<a class="puk-site-utility__link" href="verstehen.html">Verstehen</a></nav>'))],
  ['M5 index: ein Eintrag zu wenig in der Zeile', (c, f) => sub(f, 'index.html', /<a class="puk-site-utility__link" href="suche.html">Suchen<\/a>/, '')],
  ['M6 behandlung: nur Zeile entfernt', (c, f) => sub(f, 'behandlung.html', LINE, '')],
  ['M7 kinder: Zeile und Menüeinträge entfernt', (c, f) => { sub(f, 'kinder.html', LINE, ''); sub(f, 'kinder.html', MENU, ''); }],
  ['M8 suche: Reihenfolge vertauscht', (c, f) => onLine(f, 'suche.html', SWAP)],
  ['M9 alle Seiten: Zeile und Menüeinträge entfernt', (c, f) => { for (const k of Object.keys(f)) if (LINE.test(f[k])) { f[k] = f[k].replace(LINE, '').replace(MENU, ''); } }],
  ['M10 index: nur Menüeinträge entfernt (Regel r4-52)', (c, f) => sub(f, 'index.html', MENU, '')],
  ['M11 index: Beschriftung in der Zeile geändert', (c, f) => sub(f, 'index.html', '>Kurz und klar</a><a class="puk-site-utility__link" href="fragen.html"', '>Mehr</a><a class="puk-site-utility__link" href="fragen.html"')],
  ['M12 index: Zeile in die Fusszeile verschoben', (c, f) => { const m = f['index.html'].match(LINE)[0]; sub(f, 'index.html', LINE, ''); sub(f, 'index.html', /<\/footer>/, m + '</footer>'); }],
  ['M13 index: Zeile doppelt, zweite vertauscht', (c, f) => { const m = f['index.html'].match(LINE)[0]; const sw = m.replace(/(<a [^>]*kurz.html">[^<]*<\/a>)(<a [^>]*fragen.html">[^<]*<\/a>)/, '$2$1'); sub(f, 'index.html', LINE, m + sw); }],
  ['M14 404: Bestand ohne Zeile (Fehlerseite)', () => {}],
];
const cfgCases = [
  ['K1 utilityNav nicht konfiguriert (Rückfall «Website durchsuchen»)', c => { delete c.utilityNav; }, null],
  ['K2 utilityNav nicht konfiguriert, Rückfallzeile auf index entfernt', c => { delete c.utilityNav; }, (f) => sub(f, 'index.html', LINE, '')],
  ['K3 utilityNav leer []', c => { c.utilityNav = []; }, null],
  ['K4 utilityNav mit unbekannter pageId zusätzlich', c => { c.utilityNav = [...c.utilityNav, { pageId: 'gibt-es-nicht', label: 'X' }]; }, null],
];
const opts = f => ({ mode: 'production', exists: p => Object.hasOwn(f, p) || existsSync(join(src, p)), report: existsSync(join(src, 'PRUEFBERICHT.md')) ? readFileSync(join(src, 'PRUEFBERICHT.md'), 'utf8') : null });
const show = (name, cfg, f) => {
  const g = C.gate(cfg, f, opts(f));
  const b = g.findings.filter(x => x.level === 'block');
  const cnt = {}; for (const x of b) cnt[x.id] = (cnt[x.id] || 0) + 1;
  const det = b.filter(x => ['nav', 'utility-nav'].includes(x.id)).slice(0, 3).map(x => `${x.page}:${x.id}: ${x.msg}`).join(' || ');
  const nf = g.findings.filter(x => x.page === '404' && ['nav', 'utility-nav'].includes(x.id)).length;
  console.log(`${name}\t Blocker gesamt ${b.length}\t ${JSON.stringify(cnt)}\t 404-nav/utility: ${nf}\t ${det}`);
};
for (const [name, fn] of cases) { const cfg = structuredClone(baseCfg); const f = render(cfg); fn(cfg, f); show(name, cfg, f); }
for (const [name, cfn, ffn] of cfgCases) { const cfg = structuredClone(baseCfg); cfn(cfg); const f = render(cfg); if (ffn) ffn(f); show(name, cfg, f); }
