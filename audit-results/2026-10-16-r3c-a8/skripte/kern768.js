// Kernaussagen von drei Figuren bei 768 px mit 200 % Schrift fotografieren (Belege zu A8-10).
// Aufruf: node kern768.js <base-url> <out-dir> <profil-dir>
// Das Profil bekommt die Browser-Einstellung «Schriftgrösse» 32 px. Umgebung: PLAYWRIGHT_MODULE, PLAYWRIGHT_BROWSERS_PATH.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('fs');
const path = require('path');

const [BASE, OUT, PROFILE] = process.argv.slice(2);
if (!BASE || !OUT || !PROFILE) { console.error('Aufruf: node kern768.js <base-url> <out-dir> <profil-dir>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.join(PROFILE, 'Default'), { recursive: true });
fs.writeFileSync(path.join(PROFILE, 'Default', 'Preferences'), JSON.stringify({ webkit: { webprefs: { default_font_size: 32, default_fixed_font_size: 26 } } }));

(async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { channel: 'chromium', headless: true, viewport: { width: 768, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();
  for (const [pg, vid] of [['behandlung', 'v-be-kontakt'], ['kinder', 'v-ki-alltag'], ['genesung', 'v-ge-forschung']]) {
    await page.goto(`${BASE}/${pg}.html`, { waitUntil: 'networkidle' });
    console.log(vid, 'Wurzelschrift', await page.evaluate(() => getComputedStyle(document.documentElement).fontSize));
    await page.locator(`figure[data-visual-id="${vid}"] .puk-vis-kern`).screenshot({ path: path.join(OUT, `${vid}-768-schrift32-kern.png`) });
  }
  await ctx.close();
})().catch((e) => { console.error(e); process.exit(1); });
