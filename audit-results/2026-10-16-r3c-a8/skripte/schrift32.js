// 200 % Schrift über die Browser-Einstellung «Schriftgrösse» (Profil: webkit.webprefs.default_font_size = 32).
// Aufruf: node schrift32.js <base-url> <out-dir> <profil-dir> [schrift-px, Standard 32]
// Mit 16 als viertem Argument: Gegenprobe bei 100 % im selben Browser. Das Profilverzeichnis wird angelegt.
// Umgebung: PLAYWRIGHT_MODULE, PLAYWRIGHT_BROWSERS_PATH. Braucht den vollen Chromium (channel 'chromium').
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.argv[2];
const OUT = process.argv[3];
const PROFILE = process.argv[4];
const FONT = Number(process.argv[5] || 32);
if (!BASE || !OUT || !PROFILE) { console.error('Aufruf: node schrift32.js <base-url> <out-dir> <profil-dir> [schrift-px]'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });

const FIGS = [
  ['verstehen', 'v-vs-eisberg'], ['verstehen', 'v-vs-anspannung'], ['verstehen', 'v-vs-bewertungen'],
  ['beziehungen', 'v-bz-schleife'], ['beziehungen', 'v-bz-sichten'], ['rolle', 'v-ro-weg'],
  ['grenzen', 'v-gr-dear'], ['behandlung', 'v-be-kontakt'], ['kommunizieren', 'v-ko-tassen'],
  ['kinder', 'v-ki-alltag'], ['selbstfuersorge', 'v-sf-abend'], ['genesung', 'v-ge-forschung'],
  ['genesung', 'v-ge-trieb'], ['kommunizieren', 'tabelle'],
];

function measure(sel) {
  const root = document.querySelector(sel);
  const de = document.documentElement;
  const res = { rootFont: getComputedStyle(de).fontSize, pageOverflow: de.scrollWidth - de.clientWidth, figScroll: root.scrollWidth, figClient: root.clientWidth, outside: [], overlaps: [], brokenWords: [], fonts: {} };
  const fb = root.getBoundingClientRect();
  const visible = (el) => {
    // clipped (visually hidden) elements do not count
    for (let e = el; e && e !== document.body; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.display === 'none' || cs.visibility === 'hidden') return false;
      if (cs.clip && cs.clip !== 'auto' && cs.position === 'absolute') return false;
      if (cs.clipPath && cs.clipPath.startsWith('inset(50%')) return false;
      const r = e.getBoundingClientRect();
      if (r.width <= 1 && r.height <= 1) return false;
    }
    return true;
  };
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      if (!n.textContent.trim()) return NodeFilter.FILTER_REJECT;
      const el = n.parentElement;
      if (el.closest('.puk-sr')) return NodeFilter.FILTER_REJECT;
      const det = el.closest('details');
      if (det && !det.open && !el.closest('summary')) return NodeFilter.FILTER_REJECT;
      if (!visible(el)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const items = [];
  let n;
  while ((n = walker.nextNode())) {
    const el = n.parentElement;
    const r = document.createRange();
    r.selectNodeContents(n);
    const rects = Array.from(r.getClientRects()).filter((x) => x.width > 0.5 && x.height > 0.5);
    if (!rects.length) continue;
    items.push({ el, text: n.textContent.trim().slice(0, 50), rects });
    for (const x of rects) {
      if (x.right > fb.right + 1 || x.left < fb.left - 1) { res.outside.push(n.textContent.trim().slice(0, 40)); break; }
    }
    const txt = n.textContent;
    const re = /[A-Za-zÄÖÜäöüéèàß0-9]{2,}/g; // ohne Bindestrich: Umbruch am Bindestrich ist kein Wortbruch
    let m;
    while ((m = re.exec(txt))) {
      const wr = document.createRange();
      wr.setStart(n, m.index); wr.setEnd(n, m.index + m[0].length);
      const tops = new Set(Array.from(wr.getClientRects()).filter((x) => x.width > 0.5).map((x) => Math.round(x.top)));
      if (tops.size > 1) res.brokenWords.push(m[0]);
    }
    const key = el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className ? '.' + el.className.split(' ')[0] : '');
    if (!res.fonts[key]) res.fonts[key] = getComputedStyle(el).fontSize;
  }
  const inter = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1;
  for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
    const A = items[i], B = items[j];
    if (A.el === B.el || A.el.contains(B.el) || B.el.contains(A.el)) continue;
    let hit = false;
    for (const a of A.rects) { for (const b of B.rects) if (inter(a, b)) { hit = true; break; } if (hit) break; }
    if (hit) res.overlaps.push([A.text, B.text]);
  }
  return res;
}

async function main() {
  fs.mkdirSync(path.join(PROFILE, 'Default'), { recursive: true });
  fs.writeFileSync(path.join(PROFILE, 'Default', 'Preferences'), JSON.stringify({ webkit: { webprefs: { default_font_size: FONT, default_fixed_font_size: Math.round(FONT * 13 / 16) } } }));
  const results = {};
  for (const width of [1440, 1280, 1024, 768, 360, 320]) {
    const ctx = await chromium.launchPersistentContext(PROFILE, { channel: 'chromium', headless: true, viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    const page = ctx.pages()[0] || await ctx.newPage();
    let last = null;
    for (const [pg, vid] of FIGS) {
      if (last !== pg) {
        await page.goto(`${BASE}/${pg}.html`, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(200);
        last = pg;
      }
      const sel = vid === 'tabelle' ? '#anerkennen table' : `figure[data-visual-id="${vid}"]`;
      const m = await page.evaluate(measure, sel);
      results[`${vid}|${width}-schrift${FONT}`] = m;
      if (width === 1280 || width === 360) {
        await page.locator(sel).scrollIntoViewIfNeeded();
        await page.locator(sel).screenshot({ path: path.join(OUT, `${vid}-${width}-schrift${FONT}.png`) });
        // nach dem Foto erneut prüfen, dass die Schrift gilt
        m.rootFontAfterPhoto = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
      }
    }
    await ctx.close();
  }
  fs.writeFileSync(path.join(OUT, `messung-schrift${FONT}.json`), JSON.stringify(results, null, 1));
  console.log('Messungen', Object.keys(results).length);
}
main().catch((e) => { console.error(e); process.exit(1); });
