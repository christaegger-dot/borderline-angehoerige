// Misst Kopfhöhe, Absenderzeile und Überlauf auf allen Seiten von site/ (Standardschrift und 200 %).
const {chromium}=require('playwright');const fs=require('fs');const http=require('http');const path=require('path');
const root=process.argv[2];const out=process.argv[3];
const pages=fs.readdirSync(root).filter(f=>f.endsWith('.html'));
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json'};
const srv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);const f=path.join(root,u);fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end();return;}r.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream'});r.end(d);});});
(async()=>{await new Promise(r=>srv.listen(0,r));const base='http://127.0.0.1:'+srv.address().port+'/';const res={};
for(const big of [false,true]){
 const b=await chromium.launch({args:big?['--blink-settings=defaultFontSize=32,defaultFixedFontSize=26']:[]});
 for(const w of [320,390,768,1100,1440]){const ctx=await b.newContext({viewport:{width:w,height:900}});const pg=await ctx.newPage();
  for(const p of pages){await pg.goto(base+p);await pg.evaluate(()=>document.fonts.ready);
   const m=await pg.evaluate(()=>{const h=document.querySelector('header');const s=document.querySelector('.puk-site-sender');const a=s&&s.querySelector('a');
    const r=e=>e?Math.round(e.getBoundingClientRect().height):null;
    return {kopf:r(h),absender:r(s),fs:s?getComputedStyle(s).fontSize:null,mail:a?Math.round(a.getBoundingClientRect().height)+'x'+Math.round(a.getBoundingClientRect().width):null,
     ueberlauf:document.documentElement.scrollWidth-innerWidth,
     abgeschnitten:s?[...s.querySelectorAll('*')].some(e=>e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible'):false};});
   res[`${big?200:100}|${w}|${p}`]=m;}
  await ctx.close();}
 await b.close();}
srv.close();fs.writeFileSync(out,JSON.stringify(res,null,1));
const keys=Object.keys(res);const ue=keys.filter(k=>res[k].ueberlauf>0);
console.log('Zustände',keys.length,'Überlauf',ue.length,ue.slice(0,5));
for(const k of keys.filter(k=>k.endsWith('|grenzen.html')))console.log(k,JSON.stringify(res[k]));
})();
