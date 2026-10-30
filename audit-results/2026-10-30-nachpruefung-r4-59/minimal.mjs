// Nachprüfung r4-59: Minimalprobe, wie Chromium aria-hidden-Werte auswertet (CDP Accessibility.getFullAXTree)
// im Vergleich zu Playwright locator.ariaSnapshot(). Aufruf: PLAYWRIGHT_MODULE=… node minimal.mjs
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch();
console.log('Chromium', browser.version());
const page = await browser.newPage();
const cdp = await page.context().newCDPSession(page);
const vals = ['true', 'TRUE', 'True', ' true ', 'true ', ' true', '\ttrue\n', 'false', 'FALSE', 'False', ' false ', '', ' ', 'yes', '1', '0', 'no', 'mixed', 'undefined'];
for (const v of vals) {
  const attr = v === 'undefined' ? '' : ` aria-hidden="${v}"`;
  await page.setContent(`<!doctype html><html lang="de"><body><nav aria-label="Probe"${attr}><a href="#a">Probe-Link</a></nav><p>Text</p></body></html>`);
  await cdp.send('Accessibility.enable');
  const { nodes } = await cdp.send('Accessibility.getFullAXTree');
  const link = nodes.find(n => n.role && n.role.value === 'link' && !n.ignored);
  const snap = await page.locator('body').ariaSnapshot();
  console.log(JSON.stringify(v === 'undefined' ? '(ohne Attribut)' : v).padEnd(18), '| Chromium (CDP):', link ? 'Link im Baum' : 'Link VERBORGEN', '| Playwright ariaSnapshot:', /Probe-Link/.test(snap) ? 'Link im Baum' : 'Link VERBORGEN');
}
await browser.close();
