// Fotos und Messungen der 13 Abbildungen und der Validierungstabelle (R3C-A8).
// Aufruf: node fotos.js <base-url> <out-dir>
// Umgebung: PLAYWRIGHT_MODULE (Pfad zum Playwright-Modul, sonst 'playwright'), PLAYWRIGHT_BROWSERS_PATH.
// Bereinigt: Die Ansichten mit 32 px über CDP (Schriftgrössen der Seite) sind entfernt; Playwright setzt den
// Wert beim Elementfoto zurück, die Messreihe ist verworfen. 200 % misst schrift32.js über das Browserprofil.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.argv[2];
const OUT = process.argv[3];
if (!BASE || !OUT) { console.error('Aufruf: node fotos.js <base-url> <out-dir>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });

const FIGS = [
  ['verstehen', 'v-vs-eisberg'], ['verstehen', 'v-vs-anspannung'], ['verstehen', 'v-vs-bewertungen'],
  ['beziehungen', 'v-bz-schleife'], ['beziehungen', 'v-bz-sichten'], ['rolle', 'v-ro-weg'],
  ['grenzen', 'v-gr-dear'], ['behandlung', 'v-be-kontakt'], ['kommunizieren', 'v-ko-tassen'],
  ['kinder', 'v-ki-alltag'], ['selbstfuersorge', 'v-sf-abend'], ['genesung', 'v-ge-forschung'],
  ['genesung', 'v-ge-trieb'],
];
const TABLE = ['kommunizieren', 'tabelle'];

// view: [name, width, theme, photo]
const VIEWS = [
  ['1280-standard', 1280, null, true],
  ['1280-kontrast', 1280, 'kontrast', true],
  ['360-standard', 360, null, true],
  ['360-kontrast', 360, 'kontrast', true],
  ['320-standard', 320, null, false],
  ['768-standard', 768, null, false],
  ['1440-standard', 1440, null, false],
];

// measurement inside the page
function measure(sel) {
  const root = document.querySelector(sel);
  if (!root) return { error: 'not found ' + sel };
  const de = document.documentElement;
  const res = {
    rootFont: getComputedStyle(de).fontSize,
    theme: de.getAttribute('data-theme'),
    pageOverflow: de.scrollWidth - de.clientWidth,
    figScroll: root.scrollWidth, figClient: root.clientWidth,
    figBox: root.getBoundingClientRect().toJSON(),
    outside: [], overlaps: [], brokenWords: [], hyphenated: [], fonts: {},
  };
  const fb = root.getBoundingClientRect();
  // text line rects per element
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      if (!n.textContent.trim()) return NodeFilter.FILTER_REJECT;
      const el = n.parentElement;
      if (el.closest('.puk-sr')) return NodeFilter.FILTER_REJECT;
      const det = el.closest('details');
      if (det && !det.open && !el.closest('summary')) return NodeFilter.FILTER_REJECT;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') return NodeFilter.FILTER_REJECT;
      if (el.getClientRects().length === 0) return NodeFilter.FILTER_REJECT;
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
    // outside the figure box
    for (const x of rects) {
      if (x.right > fb.right + 1 || x.left < fb.left - 1) {
        res.outside.push({ text: n.textContent.trim().slice(0, 40), left: Math.round(x.left), right: Math.round(x.right), figL: Math.round(fb.left), figR: Math.round(fb.right) });
        break;
      }
    }
    // broken words: a word whose range spans more than one line
    const txt = n.textContent;
    const re = /[A-Za-zÄÖÜäöüéèàß0-9\-]{2,}/g;
    let m;
    while ((m = re.exec(txt))) {
      const wr = document.createRange();
      wr.setStart(n, m.index);
      wr.setEnd(n, m.index + m[0].length);
      const wrs = Array.from(wr.getClientRects()).filter((x) => x.width > 0.5);
      const tops = new Set(wrs.map((x) => Math.round(x.top)));
      if (tops.size > 1) res.brokenWords.push(m[0]);
    }
    const cs = getComputedStyle(el);
    const key = el.className && typeof el.className === 'string' ? el.tagName.toLowerCase() + '.' + el.className.split(' ')[0] : el.tagName.toLowerCase();
    if (!res.fonts[key]) res.fonts[key] = cs.fontSize;
  }
  // overlaps between line rects of different, non-nested elements
  const inter = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1;
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const A = items[i], B = items[j];
      if (A.el === B.el || A.el.contains(B.el) || B.el.contains(A.el)) continue;
      let hit = false;
      for (const a of A.rects) { for (const b of B.rects) { if (inter(a, b)) { hit = true; break; } } if (hit) break; }
      if (hit) res.overlaps.push([A.text, B.text]);
    }
  }
  // text over svg lines is ok by design (labels over drawing); report svg boxes too
  const svg = root.querySelector('svg');
  if (svg) res.svgBox = svg.getBoundingClientRect().toJSON();
  // elements overflowing horizontally inside figure
  res.scrollers = Array.from(root.querySelectorAll('*')).filter((e) => e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).overflowX !== 'visible').map((e) => e.className || e.tagName);
  return res;
}

async function main() {
  const browser = await chromium.launch();
  const results = {};
  for (const [vname, width, theme, photo] of VIEWS) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    let lastPage = null;
    for (const [pg, vid] of [...FIGS, TABLE]) {
      if (lastPage !== pg) {
        await page.goto(`${BASE}/${pg}.html`, { waitUntil: 'networkidle' });
        if (theme) await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(300);
        lastPage = pg;
      }
      const sel = vid === 'tabelle' ? '#anerkennen table' : `figure[data-visual-id="${vid}"]`;
      const m = await page.evaluate(measure, sel);
      m.errors = errors.slice();
      results[`${vid}|${vname}`] = m;
      if (photo) {
        const loc = page.locator(sel);
        await loc.scrollIntoViewIfNeeded();
        await loc.screenshot({ path: path.join(OUT, `${vid}-${vname}.png`) });
      }
    }
    await ctx.close();
  }
  // drawing without text (1280 and 360) and drawing alone (SVG or graphic part)
  for (const width of [1280, 360]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    let lastPage = null;
    for (const [pg, vid] of FIGS) {
      if (lastPage !== pg) {
        await page.goto(`${BASE}/${pg}.html`, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        lastPage = pg;
      }
      const sel = `figure[data-visual-id="${vid}"]`;
      // ohne Text: Worte unsichtbar, Formen bleiben
      await page.evaluate((s) => {
        const f = document.querySelector(s);
        const st = document.createElement('style');
        st.id = 'ohne-text';
        st.textContent = `${s} .puk-vis-label, ${s} .puk-vis-kern, ${s} .puk-vis-short, ${s} details, ${s} figcaption {display:none !important} ${s}, ${s} * {color: transparent !important; -webkit-text-fill-color: transparent !important}`;
        document.head.appendChild(st);
        f.scrollIntoView();
      }, sel);
      await page.waitForTimeout(150);
      await page.locator(sel).screenshot({ path: path.join(OUT, `${vid}-${width}-ohnetext.png`) });
      await page.evaluate(() => document.getElementById('ohne-text').remove());
      if (width === 1280) {
        // Zeichnung allein: SVG bzw. Grafikteil ohne Kernaussage, Kurztext, Vertiefung, Legende
        const svgSel = `${sel} svg:not(.puk-vis-cycle__loopmark)`;
        const hasSvg = await page.locator(svgSel).count();
        if (hasSvg) {
          await page.locator(svgSel).first().screenshot({ path: path.join(OUT, `${vid}-1280-zeichnung.png`) });
        } else {
          await page.evaluate((s) => {
            const st = document.createElement('style');
            st.id = 'nur-grafik';
            st.textContent = `${s} .puk-vis-label, ${s} .puk-vis-kern, ${s} .puk-vis-short, ${s} details, ${s} figcaption {display:none !important}`;
            document.head.appendChild(st);
          }, sel);
          await page.locator(sel).screenshot({ path: path.join(OUT, `${vid}-1280-zeichnung.png`) });
          await page.evaluate(() => document.getElementById('nur-grafik').remove());
        }
      }
    }
    await ctx.close();
  }
  // Abschnitt im Zusammenhang, 360 px (Handy), Standard
  {
    const ctx = await browser.newContext({ viewport: { width: 360, height: 800 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const secs = [['verstehen', 'anspannung'], ['beziehungen', 'zwei-sichten'], ['behandlung', 'kontakt'], ['genesung', 'forschung'], ['genesung', 'verlauf'], ['grenzen', 'dear'], ['kommunizieren', 'anerkennen']];
    for (const [pg, sid] of secs) {
      await page.goto(`${BASE}/${pg}.html`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.locator(`#${sid}`).screenshot({ path: path.join(OUT, `abschnitt-${pg}-${sid}-360.png`) });
    }
    await ctx.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(OUT, 'messung.json'), JSON.stringify(results, null, 1));
  console.log('Messungen:', Object.keys(results).length);
}
main().catch((e) => { console.error(e); process.exit(1); });
