// Waagrechtes Scrollen im Rahmen der Validierungstabelle (kommunizieren › anerkennen) bei 100 % und 200 % Schrift.
// Aufruf: node tablewrap.js <base-url> <profil-basis>
// Legt <profil-basis>/p16 und <profil-basis>/p32 mit der Browser-Einstellung «Schriftgrösse» 16 bzw. 32 px an.
// Umgebung: PLAYWRIGHT_MODULE, PLAYWRIGHT_BROWSERS_PATH.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('fs');
const path = require('path');

const [BASE, PBASE] = process.argv.slice(2);
if (!BASE || !PBASE) { console.error('Aufruf: node tablewrap.js <base-url> <profil-basis>'); process.exit(2); }

(async () => {
  for (const font of [16, 32]) {
    const prof = path.join(PBASE, `p${font}`);
    fs.mkdirSync(path.join(prof, 'Default'), { recursive: true });
    fs.writeFileSync(path.join(prof, 'Default', 'Preferences'), JSON.stringify({ webkit: { webprefs: { default_font_size: font, default_fixed_font_size: Math.round(font * 13 / 16) } } }));
    for (const width of [1440, 1280, 1024, 800, 768, 761, 760, 360, 320]) {
      const ctx = await chromium.launchPersistentContext(prof, { channel: 'chromium', headless: true, viewport: { width, height: 900 } });
      const page = ctx.pages()[0] || await ctx.newPage();
      await page.goto(`${BASE}/kommunizieren.html`, { waitUntil: 'networkidle' });
      const r = await page.evaluate(() => {
        const w = document.querySelector('#anerkennen .puk-vis-tablewrap');
        return { root: getComputedStyle(document.documentElement).fontSize, sw: w.scrollWidth, cw: w.clientWidth, display: getComputedStyle(w.querySelector('table')).display };
      });
      console.log(font, width, JSON.stringify(r));
      await ctx.close();
    }
  }
})().catch((e) => { console.error(e); process.exit(1); });
