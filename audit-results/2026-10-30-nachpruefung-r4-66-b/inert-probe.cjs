// Nachprüfung r4-66: Wie nimmt Chromium Inhalte unter inert in den Namen eines Links auf? (CDP, Accessibility.getPartialAXTree)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const C = [
  ['Text in span inert', 'Kurz und klar<span inert> Mehr</span>'],
  ['img alt in span inert', 'Kurz und klar<span inert><img alt="Mehr" src="data:,"></span>'],
  ['input value in span inert', 'Kurz und klar<span inert><input type="button" value="Mehr"></span>'],
  ['input value mit inert am Feld', 'Kurz und klar<input type="button" value="Mehr" inert>'],
  ['input type=text value in span inert', 'Kurz und klar<span inert><input type="text" value="Mehr"></span>'],
  ['button in span inert', 'Kurz und klar<span inert><button>Mehr</button></span>'],
  ['select in span inert', 'Kurz und klar<span inert><select><option>Mehr</option></select></span>'],
  ['textarea in span inert', 'Kurz und klar<span inert><textarea>Mehr</textarea></span>'],
  ['input value in span hidden', 'Kurz und klar<span hidden><input type="button" value="Mehr"></span>'],
  ['textarea placeholder', 'Kurz und klar<textarea placeholder="Mehr"></textarea>'],
  ['input type=text placeholder', 'Kurz und klar<input type="text" placeholder="Mehr">'],
  ['img ohne alt, title', 'Kurz und klar<img title="Mehr" src="data:,">'],
];
(async () => { const b = await chromium.launch(); const p = await b.newPage(); const cdp = await p.context().newCDPSession(p);
  for (const [d, h] of C) {
    await p.setContent(`<!doctype html><html lang="de"><body><nav><a id="t" href="#">${h}</a></nav></body></html>`);
    const { root } = await cdp.send('DOM.getDocument', { depth: -1 }); const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: '#t' });
    const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false });
    console.log(`${d} | ${h} | ${nodes[0].role.value} «${nodes[0].name ? nodes[0].name.value : ''}»`);
  }
  console.log('Chromium ' + b.version()); await b.close(); })();
