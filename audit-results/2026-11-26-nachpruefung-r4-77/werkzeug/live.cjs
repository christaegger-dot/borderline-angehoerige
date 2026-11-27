const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const qs = require('fs').readFileSync(process.argv[2], 'utf8').split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split('\t')[1]);
(async () => { const br = await chromium.launch(); const pg = await br.newPage(); const errs = []; pg.on('pageerror', e => errs.push(String(e)));
  await pg.goto('https://borderline-angehoerige.netlify.app/suche.html', { waitUntil: 'networkidle' });
  const build = await pg.evaluate(() => document.documentElement.getAttribute('data-puk-site-build'));
  const out = await pg.evaluate(list => list.map(q => { const i = document.querySelector('#site-search'); i.value = q; i.dispatchEvent(new Event('input', { bubbles: true }));
    return [q, [...document.querySelectorAll('[data-search-results] > li:not([hidden]) a')].slice(0, 4).map(a => a.getAttribute('href').replace('.html', '')).join(' > ') || '–']; }), qs);
  console.log('# live', build, new Date().toISOString(), 'JS-Fehler', errs.length); out.forEach(r => console.log(r.join('\t'))); await br.close(); })();
