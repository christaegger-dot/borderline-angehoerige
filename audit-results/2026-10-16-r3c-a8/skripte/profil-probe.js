// Probe: Gilt die Browser-Einstellung «Schriftgrösse» aus dem Profil auch nach einem Elementfoto und nach Seitenwechsel?
// Ergebnis am 16.10.2026: im vollen Chromium (channel 'chromium') 32 px vor und nach dem Foto und auf der nächsten Seite.
// Aufruf: node profil-probe.js <base-url> <profil-dir> <foto.png>
// Umgebung: PLAYWRIGHT_MODULE, PLAYWRIGHT_BROWSERS_PATH.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('fs');
const path = require('path');

const [BASE, P, FOTO] = process.argv.slice(2);
if (!BASE || !P || !FOTO) { console.error('Aufruf: node profil-probe.js <base-url> <profil-dir> <foto.png>'); process.exit(2); }

(async () => {
  fs.rmSync(P, { recursive: true, force: true });
  fs.mkdirSync(path.join(P, 'Default'), { recursive: true });
  fs.writeFileSync(path.join(P, 'Default', 'Preferences'), JSON.stringify({ webkit: { webprefs: { default_font_size: 32, default_fixed_font_size: 26 } } }));
  const ctx = await chromium.launchPersistentContext(P, { channel: 'chromium', headless: true, viewport: { width: 1280, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto(`${BASE}/verstehen.html`);
  console.log('vor dem Foto', await page.evaluate(() => getComputedStyle(document.documentElement).fontSize));
  await page.locator('figure').first().screenshot({ path: FOTO });
  console.log('nach dem Foto', await page.evaluate(() => getComputedStyle(document.documentElement).fontSize));
  await page.goto(`${BASE}/genesung.html`);
  console.log('nächste Seite', await page.evaluate(() => getComputedStyle(document.documentElement).fontSize));
  await ctx.close();
})().catch((e) => { console.error(e); process.exit(1); });
