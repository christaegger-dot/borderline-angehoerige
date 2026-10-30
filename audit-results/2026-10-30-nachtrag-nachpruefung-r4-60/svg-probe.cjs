// Nachtrag zur Nachprüfung r4-60: Minimalprobe ohne Stylesheet der Website. Wirken hidden und inert an <svg> (SVG-Namensraum)
// und an einem <div> mit eigener display-Regel? Gelesen über CDP Accessibility.getPartialAXTree und getComputedStyle.
// Aufruf: PLAYWRIGHT_MODULE=… node svg-probe.cjs
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const cases = [
  ['svg ohne Attribut', '<svg id="t" width="40" height="40"><rect width="40" height="40"/></svg>'],
  ['svg hidden', '<svg id="t" hidden width="40" height="40"><rect width="40" height="40"/></svg>'],
  ['svg inert', '<svg id="t" inert width="40" height="40"><rect width="40" height="40"/></svg>'],
  ['svg aria-hidden="TRUE"', '<svg id="t" aria-hidden="TRUE" width="40" height="40"><rect width="40" height="40"/></svg>'],
  ['div hidden > svg', '<div hidden><svg id="t" width="40" height="40"><rect width="40" height="40"/></svg></div>'],
  ['div.grid hidden > svg (div{display:grid} im Autor-Stylesheet)', '<style>.g{display:grid}</style><div class="g" hidden><svg id="t" width="40" height="40"><rect width="40" height="40"/></svg></div>'],
  ['div inert > svg', '<div inert><svg id="t" width="40" height="40"><rect width="40" height="40"/></svg></div>'],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage(); const cdp = await p.context().newCDPSession(p);
  console.log('# Chromium', b.version());
  for (const [n, h] of cases) {
    await p.setContent('<!doctype html><html lang="de"><body><main>' + h + '</main></body></html>');
    await cdp.send('Accessibility.enable');
    const { root } = await cdp.send('DOM.getDocument', { depth: 0 });
    const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: '#t' });
    const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false });
    const x = nodes[0];
    const ax = x.ignored ? 'VERBORGEN(' + x.ignoredReasons.filter(r => r.value && r.value.value === true).map(r => r.name).join(',') + ')' : `${x.role.value} «${x.name ? x.name.value : ''}»`;
    const disp = await p.$eval('#t', e => getComputedStyle(e).display + ', Breite ' + Math.round(e.getBoundingClientRect().width));
    console.log(`${n} => CDP: ${ax} | display: ${disp}`);
  }
  await b.close();
})();
