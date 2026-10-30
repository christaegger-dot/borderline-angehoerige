// Nachprüfung r4-60: eigene Mutationen an gerenderten Seiten, Gate (C.gate) gegen Zugänglichkeitsbaum von Chromium (CDP).
// Aufruf: PLAYWRIGHT_MODULE=... node abgleich.cjs <authoring-Verzeichnis> <dist/site-Verzeichnis>
const fs = require('fs'), path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const src = process.argv[2], site = process.argv[3];
const C = require(path.join(src, 'tools/contract.js'));
const cfg = JSON.parse(fs.readFileSync(path.join(src, 'site.config.json'), 'utf8'));
const base = {}; for (const f of fs.readdirSync(site).filter(f => f.endsWith('.html'))) base[f] = fs.readFileSync(path.join(site, f), 'utf8');
const LINE = '<nav class="puk-site-utility" aria-label="Direkteinstiege"';
const MENU_A = '<a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz.html"';
const LINE_A = '<a class="puk-site-utility__link" href="kurz.html"';
const SUB = '<div class="puk-web-container puk-site-subbar"';
const HEAD = '<header class="puk-web-header"';
const add = (html, at, attr) => { if (!html.includes(at)) throw new Error('fehlt: ' + at); return html.replace(at, at + ' ' + attr); };
const vals = [' true ', 'yes', '0', ' false ', 'TRUE', 'False', 'undefined', 'UNDEFINED', ' undefined ', '', null];
const av = v => v === null ? 'aria-hidden' : `aria-hidden="${v}"`;
const cases = [];
for (const v of vals) {
  cases.push(['index', `Zeile ${av(v)}`, h => add(h, LINE, av(v)), 'line']);
  cases.push(['index', `Menülink ${av(v)}`, h => add(h, MENU_A, av(v)), 'menu']);
  cases.push(['index', `Subbar ${av(v)}`, h => add(h, SUB, av(v)), 'sender']);
  cases.push(['404', `Kopf Fehlerseite ${av(v)}`, h => add(h, HEAD, av(v)), 'sender']);
  cases.push(['index', `Linktext + <span ${av(v)}> →</span>`, h => h.replace(/(<a class="puk-site-utility__link" href="kurz\.html"[^>]*>Kurz und klar)(<\/a>)/, `$1<span ${av(v)}> →</span>$2`), 'name']);
}
for (const [p, n, at, what] of [['index', 'Zeile inert', LINE, 'line'], ['index', 'Menülink inert', MENU_A, 'menu'], ['index', 'Kopf inert', HEAD, 'sender'], ['404', 'Kopf Fehlerseite inert', HEAD, 'sender'], ['index', 'Zeilenlink hidden', LINE_A, 'line']])
  cases.push([p, n, h => add(h, at, at.includes('hidden') ? 'hidden' : (n.includes('hidden') ? 'hidden' : 'inert')), what]);
const ids = { line: 'utility-nav', menu: 'nav', sender: 'sender', name: 'utility-nav' };
const sel = { line: 'nav[aria-label="Direkteinstiege"] a[href="kurz.html"]', menu: 'a.puk-site-menu__utility-link[href="kurz.html"]', sender: '[data-sender-unit]', name: 'nav[aria-label="Direkteinstiege"] a[href="kurz.html"]' };
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage(); const cdp = await pg.context().newCDPSession(pg);
  await cdp.send('DOM.enable'); await cdp.send('Accessibility.enable');
  const opts = f => ({ mode: 'production', exists: p => Object.hasOwn(f, p) || fs.existsSync(path.join(src, p)) || fs.existsSync(path.join(site, p)) });
  const g0 = C.gate(cfg, base, opts(base)).findings.filter(x => x.level === 'block').length;
  let agree = 0, total = 0; const rows = [];
  for (const [p, name, fn, what] of cases) {
    const file = p + '.html'; const f = Object.assign({}, base); f[file] = fn(base[file]);
    const blocks = C.gate(cfg, f, opts(f)).findings.filter(x => x.level === 'block' && x.page === p && x.id === ids[what]).length > 0;
    await pg.setContent(f[file], { waitUntil: 'domcontentloaded' });
    const { result } = await cdp.send('Runtime.evaluate', { expression: `document.querySelector(${JSON.stringify(sel[what])})` });
    let chrome = 'kein Element';
    if (what === 'sender' && result.objectId) { /* Ein schlichtes <span> ist in Chromium immer «ignored»; massgeblich ist sein Textknoten.
         Der Name der Fachstelle steht auch in der Fusszeile, deshalb gezielt der Textknoten in [data-sender-unit]. */
      const { node } = await cdp.send('DOM.describeNode', { objectId: result.objectId, depth: 1 });
      const t = (node.children || []).find(c => c.nodeType === 3);
      const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { backendNodeId: t.backendNodeId, fetchRelatives: false });
      chrome = nodes[0] && !nodes[0].ignored ? 'im Baum' : 'verborgen';
    } else if (result.objectId) {
      const { node } = await cdp.send('DOM.describeNode', { objectId: result.objectId });
      const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { backendNodeId: node.backendNodeId, fetchRelatives: false });
      const ax = nodes[0];
      if (what === 'name') chrome = ax.ignored ? 'verborgen' : `Name «${(ax.name || {}).value || ''}»`;
      else chrome = ax.ignored ? 'verborgen' : 'im Baum';
    }
    const chromeBad = what === 'name' ? chrome !== 'Name «Kurz und klar»' : chrome === 'verborgen';
    const ok = chromeBad === blocks; total++; if (ok) agree++;
    rows.push(`${ok ? 'gleich ' : 'ABWEICHUNG'} | ${p.padEnd(5)} | ${name.padEnd(42)} | Chromium: ${chrome.padEnd(22)} | Gate: ${blocks ? ids[what] : 'kein ' + ids[what]}`);
  }
  console.log(`Gate ${C.BUILD}, Bestand: ${g0} Blocker (${[...new Set(C.gate(cfg, base, opts(base)).findings.filter(x => x.level === 'block').map(x => x.page + ':' + x.id))].join(', ')})`); rows.forEach(r => console.log(r));
  console.log(`Übereinstimmung Gate/Chromium: ${agree} von ${total}`); await b.close();
})();
