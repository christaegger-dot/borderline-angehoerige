// Nachprüfung r4-65: SVG im Direkteinstieg und in einer Abbildung, Gate (C.gate) gegen Zugänglichkeitsbaum von Chromium (CDP).
// Aufruf: PLAYWRIGHT_MODULE=... node abgleich-svg.cjs <authoring-Verzeichnis> <dist/site-Verzeichnis>
const fs = require('fs'), path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const [src, site] = process.argv.slice(2);
const C = require(path.join(src, 'tools/contract.js'));
const cfg = JSON.parse(fs.readFileSync(path.join(src, 'site.config.json'), 'utf8'));
const base = {}; for (const f of fs.readdirSync(site).filter(f => f.endsWith('.html'))) base[f] = fs.readFileSync(path.join(site, f), 'utf8');
const LINK = /(<a class="puk-site-utility__link" href="kurz\.html"[^>]*>Kurz und klar)(<\/a>)/;
const MLINK = /(<a class="puk-web-nav__link puk-site-menu__utility-link" href="kurz\.html"[^>]*>Kurz und klar)(<\/a>)/;
const ART = '<svg class="puk-vis-scene__art" viewBox="0 0 640 300" aria-hidden="true" focusable="false">';
const wrapArt = (h, open, close) => { const i = h.indexOf('<svg class="puk-vis-scene__art"'); if (i < 0) throw new Error('Abbildung fehlt'); const j = h.indexOf('</svg>', i) + 6; return h.slice(0, i) + open + h.slice(i, j) + close + h.slice(j); };
const art = attr => h => h.replace(ART, `<svg class="puk-vis-scene__art" viewBox="0 0 640 300"${attr} focusable="false">`);
const svgIn = s => `<svg viewBox="0 0 10 10" width="10" height="10"${s}</svg>`;
const cases = [
  ['L1', 'index', 'line', 'Zeile: <svg hidden aria-label="Pfeil">', h => h.replace(LINK, `$1${svgIn(' hidden aria-label="Pfeil"><path d="M0 0h10v10z"/>')}$2`)],
  ['L2', 'index', 'line', 'Zeile: <svg inert><title>Pfeil</title>', h => h.replace(LINK, `$1${svgIn(' inert><title>Pfeil</title><path d="M0 0h10v10z"/>')}$2`)],
  ['L3', 'index', 'line', 'Zeile: <svg aria-hidden="true" aria-label="Pfeil">', h => h.replace(LINK, `$1${svgIn(' aria-hidden="true" aria-label="Pfeil"><path d="M0 0h10v10z"/>')}$2`)],
  ['L4', 'index', 'line', 'Zeile: <span hidden><svg aria-label="Pfeil">', h => h.replace(LINK, `$1<span hidden>${svgIn(' aria-label="Pfeil"><path d="M0 0h10v10z"/>')}</span>$2`)],
  ['L5', 'index', 'line', 'Zeile: <svg><g hidden><title>Pfeil</title></g>', h => h.replace(LINK, `$1${svgIn('><g hidden><title>Pfeil</title></g><path d="M0 0h10v10z"/>')}$2`)],
  ['L6', 'index', 'line', 'Zeile: <svg aria-hidden="true"> (ohne Namen)', h => h.replace(LINK, `$1${svgIn(' aria-hidden="true"><path d="M0 0h10v10z"/>')}$2`)],
  ['M1', 'index', 'menu', 'Menü: <svg inert><title>Pfeil</title>', h => h.replace(MLINK, `$1${svgIn(' inert><title>Pfeil</title><path d="M0 0h10v10z"/>')}$2`)],
  ['M2', 'index', 'menu', 'Menü: <svg hidden aria-label="Pfeil">', h => h.replace(MLINK, `$1${svgIn(' hidden aria-label="Pfeil"><path d="M0 0h10v10z"/>')}$2`)],
  ['F0', 'verstehen', 'fig', 'Abbildung: Bestand (aria-hidden="true")', h => h],
  ['F1', 'verstehen', 'fig', 'Abbildung: ohne aria-hidden', art('')],
  ['F2', 'verstehen', 'fig', 'Abbildung: hidden statt aria-hidden', art(' hidden')],
  ['F3', 'verstehen', 'fig', 'Abbildung: inert statt aria-hidden', art(' inert')],
  ['F4', 'verstehen', 'fig', 'Abbildung: aria-hidden="TRUE"', art(' aria-hidden="TRUE"')],
  ['F5', 'verstehen', 'fig', 'Abbildung: aria-hidden=" true "', art(' aria-hidden=" true "')],
  ['F6', 'verstehen', 'fig', 'Abbildung: aria-hidden="false"', art(' aria-hidden="false"')],
  ['F7', 'verstehen', 'fig', 'Abbildung: ohne aria-hidden in <span inert>', h => wrapArt(art('')(h), '<span inert>', '</span>')],
  ['F8', 'verstehen', 'fig', 'Abbildung: ohne aria-hidden in <span hidden>', h => wrapArt(art('')(h), '<span hidden>', '</span>')],
  ['F9', 'verstehen', 'fig', 'Abbildung: ohne aria-hidden, mit <title>', h => art('')(h).replace(/(<svg class="puk-vis-scene__art"[^>]*>)/, '$1<title>Szene</title>')],
];
const ids = { line: 'utility-nav', menu: 'nav', fig: 'figure-alt' };
const sel = { line: 'nav[aria-label="Direkteinstiege"] a[href="kurz.html"]', menu: 'a.puk-site-menu__utility-link[href="kurz.html"]', fig: 'svg.puk-vis-scene__art' };
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage(); const cdp = await pg.context().newCDPSession(pg);
  await cdp.send('DOM.enable'); await cdp.send('Accessibility.enable');
  const opts = f => ({ mode: 'draft', exists: p => Object.hasOwn(f, p) || fs.existsSync(path.join(src, p)) || fs.existsSync(path.join(site, p)) });
  let agree = 0; const rows = [];
  for (const [id, p, what, name, fn] of cases) {
    const file = p + '.html'; const f = Object.assign({}, base); f[file] = fn(base[file]);
    if (f[file] === base[file] && id !== 'F0') throw new Error('Mutation griff nicht: ' + id);
    const blocks = C.gate(cfg, f, opts(f)).findings.some(x => x.level === 'block' && x.page === p && x.id === ids[what]);
    await pg.setContent(f[file].replace('<head>', `<head><base href="file://${site}/">`), { waitUntil: 'load' });
    const { result } = await cdp.send('Runtime.evaluate', { expression: `document.querySelector(${JSON.stringify(sel[what])})` });
    let chrome = 'kein Element', bad = false;
    if (result.objectId) {
      const { node } = await cdp.send('DOM.describeNode', { objectId: result.objectId });
      const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { backendNodeId: node.backendNodeId, fetchRelatives: false });
      const ax = nodes[0]; const nm = (ax.name || {}).value || '';
      if (what === 'fig') { chrome = ax.ignored ? 'verborgen' : `sichtbar, Rolle ${(ax.role || {}).value}, Name «${nm}»`; bad = !ax.ignored && !nm; }
      else { chrome = ax.ignored ? 'verborgen' : `Name «${nm}»`; bad = ax.ignored || nm !== 'Kurz und klar'; }
    }
    const ok = bad === blocks; if (ok) agree++;
    rows.push(`${ok ? 'gleich    ' : 'ABWEICHUNG'} | ${id.padEnd(3)} | ${name.padEnd(48)} | Chromium: ${chrome.padEnd(40)} | Gate: ${blocks ? ids[what] : 'kein ' + ids[what]}`);
  }
  console.log(`Gate ${C.BUILD}`); rows.forEach(r => console.log(r)); console.log(`Übereinstimmung Gate/Chromium: ${agree} von ${cases.length}`); await b.close();
})();
