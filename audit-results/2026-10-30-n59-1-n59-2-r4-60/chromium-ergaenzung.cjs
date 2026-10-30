const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage(); const cdp = await p.context().newCDPSession(p);
  const cases = {
    bare: '<nav aria-label="Direkteinstiege" aria-hidden><a href="a">Kurz und klar</a></nav>',
    spanYes: '<nav aria-label="Direkteinstiege"><a href="a"><span aria-hidden="yes">Kurz und klar</span></a></nav>',
    decorFalse: '<nav aria-label="Direkteinstiege"><a href="a">Kurz und klar<span aria-hidden="false"> →</span></a></nav>',
  };
  for (const [k, h] of Object.entries(cases)) {
    await p.setContent('<main>' + h + '</main>');
    const { nodes } = await cdp.send('Accessibility.getFullAXTree');
    const links = nodes.filter(n => n.role && n.role.value === 'link' && !n.ignored);
    console.log(k, '=>', links.length ? links.map(n => `link name="${n.name && n.name.value}"`).join(';') : 'kein Link im Baum');
  }
  await b.close();
})();
