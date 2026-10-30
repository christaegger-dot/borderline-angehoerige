// Zeichen je Zeile in Titel und Einleitung der Startseite, dazu Sichtbarkeit beider Titelbild-Grafiken. Aufruf: node zeilen.cjs <site>
const {chromium}=require(process.env.PLAYWRIGHT_MODULE);const http=require('http'),fs=require('fs'),path=require('path');const root=process.argv[2];
const srv=http.createServer((q,res)=>{const f=path.join(root,decodeURIComponent(q.url.split('?')[0]));try{const e=path.extname(f);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.svg':'image/svg+xml'})[e]||'application/octet-stream');res.end(fs.readFileSync(f));}catch(e){res.statusCode=404;res.end();}});
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));
 for(const large of [false,true]){const b=await chromium.launch({args:['--no-sandbox',...(large?['--blink-settings=defaultFontSize=32,defaultFixedFontSize=26']:[])]});
 for(const w of (large?[1984,2399,2400]:[320,768,991,992,1024,1112,1199,1200,1440,1920])){const p=await (await b.newContext({viewport:{width:w,height:900}})).newPage();await p.goto('http://127.0.0.1:'+srv.address().port+'/index.html');await p.evaluate(()=>document.fonts.ready);
  const r=await p.evaluate(()=>{const lines=el=>{const out={};const tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;while(n=tw.nextNode()){for(let i=0;i<n.data.length;i++){if(n.data[i]==='­')continue;const rg=document.createRange();rg.setStart(n,i);rg.setEnd(n,i+1);const rc=[...rg.getClientRects()].filter(x=>x.width>0);if(!rc.length)continue;const t=Math.round(rc[rc.length-1].top);out[t]=(out[t]||0)+1;}}return Object.values(out)};
   const h=document.querySelector('.puk-longform__hero');const ps=[...h.querySelectorAll('p')];const vis=s=>{const e=document.querySelector(s);const r=e.getBoundingClientRect();return r.width&&r.height?Math.round(r.width)+'×'+Math.round(r.height):'aus'};
   return {intro:lines(ps[0]),p2:lines(ps[1]),h1:lines(h.querySelector('h1')).length,breit:vis('.bl-titelbild__breit'),band:vis('.bl-titelbild__band'),heroH:Math.round(h.getBoundingClientRect().height)}});
  console.log(`${large?'200%':'100%'} ${w}px: h1 ${r.h1} Zeilen; Einleitung ${r.intro.length} Zeilen, max ${Math.max(...r.intro)} Zeichen; Absatz 2 ${r.p2.length} Zeilen, max ${Math.max(...r.p2)} Zeichen; Kopfbereich ${r.heroH}px; Titelbild breit ${r.breit}, Band ${r.band}`);
  await p.context().close();}
 await b.close();}
 srv.close();})();
