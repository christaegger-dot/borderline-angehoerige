// Misst die Fusszeile auf allen Seiten von site/ (Standardschrift und 200 %): Höhe, Schriftgrössen, Zielflächen, Kontrast, Überlauf.
const {chromium}=require('playwright');const fs=require('fs');const http=require('http');const path=require('path');
const root=process.argv[2];const out=process.argv[3];
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.woff2':'font/woff2'};
const srv=http.createServer((q,r)=>{const f=path.join(root,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end();return;}r.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream'});r.end(d);});});
const pages=fs.readdirSync(root).filter(f=>f.endsWith('.html'));
(async()=>{await new Promise(r=>srv.listen(0,r));const base='http://127.0.0.1:'+srv.address().port+'/';const res={};
for(const big of [false,true]){const b=await chromium.launch({args:big?['--blink-settings=defaultFontSize=32,defaultFixedFontSize=26']:[]});
 for(const w of [320,390,768,1100,1440]){const ctx=await b.newContext({viewport:{width:w,height:900}});const pg=await ctx.newPage();
  for(const p of pages){await pg.goto(base+p);await pg.evaluate(()=>document.fonts.ready);
   res[`${big?200:100}|${w}|${p}`]=await pg.evaluate(()=>{
    const lum=c=>{const m=c.match(/[\d.]+/g).map(Number);const f=x=>{x/=255;return x<=.03928?x/12.92:((x+.055)/1.055)**2.4};return .2126*f(m[0])+.7152*f(m[1])+.0722*f(m[2]);};
    const bgOf=e=>{for(let x=e;x;x=x.parentElement){const c=getComputedStyle(x).backgroundColor;if(!/rgba\(0, 0, 0, 0\)|transparent/.test(c))return c;}return 'rgb(255, 255, 255)';};
    const ratio=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((m,n)=>n-m);return (x+.05)/(y+.05);};
    const f=document.querySelector('footer');const els=[...f.querySelectorAll('h2,p,a,li,span')].filter(e=>e.getClientRects().length&&e.textContent.trim());
    const fsz=[...new Set(els.map(e=>getComputedStyle(e).fontSize))];
    const links=[...f.querySelectorAll('a')].map(a=>Math.round(a.getBoundingClientRect().height));
    const minK=Math.min(...els.map(e=>ratio(getComputedStyle(e).color,bgOf(e))));
    return {hoehe:Math.round(f.getBoundingClientRect().height),schrift:fsz,linksMin:Math.min(...links),kontrastMin:Math.round(minK*100)/100,
     flaeche:getComputedStyle(f).backgroundColor,ueberlauf:document.documentElement.scrollWidth-innerWidth};});}
  await ctx.close();}
 await b.close();}
srv.close();fs.writeFileSync(out,JSON.stringify(res,null,1));
const ks=Object.keys(res);console.log('Zustände',ks.length,'Überlauf',ks.filter(k=>res[k].ueberlauf>0).length,'Links<44',ks.filter(k=>res[k].linksMin<44).length,'Kontrast min',Math.min(...ks.map(k=>res[k].kontrastMin)),'Schrift',[...new Set(ks.flatMap(k=>res[k].schrift))].join(' '));
})();
