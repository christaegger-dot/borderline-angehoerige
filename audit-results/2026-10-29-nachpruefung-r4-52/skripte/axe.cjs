const {chromium}=require(process.env.PLAYWRIGHT_MODULE);const http=require('http'),fs=require('fs'),path=require('path');
const root=process.argv[2],axePath=process.argv[3];const pages=JSON.parse(fs.readFileSync(process.argv[4])).pages.filter(p=>p.status==='published').map(p=>p.href);
const srv=http.createServer((q,res)=>{const f=path.join(root,decodeURIComponent(q.url.split('?')[0]));try{const e=path.extname(f);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.svg':'image/svg+xml'})[e]||'application/octet-stream');res.end(fs.readFileSync(f));}catch(e){res.statusCode=404;res.end();}});
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+srv.address().port+'/';
 const sets=[{large:false,widths:[390,1280],menu:false},{large:true,widths:[320,1440],menu:true}];
 for(const s of sets){const b=await chromium.launch({args:['--no-sandbox',...(s.large?['--blink-settings=defaultFontSize=32,defaultFixedFontSize=26']:[])]});
  for(const w of s.widths){let runs=0,viol=0,opened=0;const det=[];
   for(const href of pages){const c=await b.newContext({viewport:{width:w,height:900},locale:'de-CH'});const p=await c.newPage();await p.goto(base+href,{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);
    if(s.menu){const btn=p.locator('.puk-site-menu .puk-disclosure__button').first();if(await btn.count()&&await btn.isVisible()){await btn.click();if(await btn.getAttribute('aria-expanded')==='true')opened++;}}
    await p.addScriptTag({path:axePath});const r=await p.evaluate(async()=>{const x=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}});return x.violations.map(v=>v.id+'('+v.nodes.length+')');});
    runs++;viol+=r.length;if(r.length)det.push(href+': '+r.join(', '));await c.close();}
   console.log(`${s.large?'200 %':'100 %'} ${w}px${s.menu?' Menü offen '+opened+'/'+runs:''}: ${runs} Läufe, ${viol} Verstösse${det.length?' – '+det.join(' ; '):''}`);}
  await b.close();}
 srv.close();})();
