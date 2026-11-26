// Eigene Messung N811: Figur v-vs-anspannung je Breite, Standard- und 200-%-Schrift. Aufruf: node messung.cjs <site-ordner>
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/opt/borderline-browser/node_modules/playwright');
const path=require('path'),site=path.resolve(process.argv[2]);
(async()=>{const out=[];
for(const large of [false,true]){
 const b=await chromium.launch({args:['--no-sandbox',...(large?['--blink-settings=defaultFontSize=32,defaultFixedFontSize=26']:[])]});
 const p=await (await b.newContext({viewport:{width:375,height:812},locale:'de-CH'})).newPage();
 for(const width of [320,360,375,390,414,768]){
  await p.setViewportSize({width,height:812});await p.goto('file://'+site+'/verstehen.html',{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);
  out.push({width,large,...await p.evaluate(()=>{const f=document.querySelector('[data-visual-id="v-vs-anspannung"]'),t=f.getBoundingClientRect().top,r=e=>{const x=e.getBoundingClientRect();return [Math.round(x.top-t),Math.round(x.bottom-t)]};
   const cards=[...f.querySelectorAll(':scope ol.bl-phase-actions > li')];
   return {browser:navigator.userAgent.match(/Chrome\/[\d.]+/)[0],rootFont:getComputedStyle(document.documentElement).fontSize,figure:Math.round(f.getBoundingClientRect().height),cards:cards.map(r),end:Math.max(...cards.map(c=>Math.round(c.getBoundingClientRect().bottom-t))),schutz:r(f.querySelector('.bl-fig-schutz')),details:[...f.querySelectorAll('details')].map(d=>r(d)[0])};})});
 }
 await b.close();}
console.log(JSON.stringify(out,null,1).replace(/\n\s+(-?\d+),?\n\s+(-?\d+)\n\s+\]/g,' $1, $2 ]'));})();
