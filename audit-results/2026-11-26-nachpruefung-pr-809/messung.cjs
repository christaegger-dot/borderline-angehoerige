const {chromium}=require(process.env.PLAYWRIGHT_MODULE);const fs=require('fs'),path=require('path'),http=require('http');
const root=process.argv[2];
const srv=http.createServer((q,r)=>{const f=root+decodeURIComponent(q.url.split('?')[0]);try{r.setHeader('Content-Type',{'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.svg':'image/svg+xml'}[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f));}catch(e){r.statusCode=404;r.end();}}).listen(0,async()=>{
 const b=await chromium.launch();const out={chromium:b.version()};
 for(const large of [false]){const c=await b.newContext({viewport:{width:375,height:812},locale:'de-CH'});const p=await c.newPage();
 await p.goto(`http://localhost:${srv.address().port}/verstehen.html`,{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);
 out.m=await p.evaluate(()=>{const fig=document.querySelector('[data-visual-id="v-vs-anspannung"]');const ft=fig.getBoundingClientRect().top;const rel=e=>{const r=e.getBoundingClientRect();return {top:Math.round(r.top-ft),bottom:Math.round(r.bottom-ft),h:Math.round(r.height)}};
  const lis=[...fig.querySelectorAll('ol.bl-phase-actions > li')];
  return {figH:Math.round(fig.getBoundingClientRect().height),
   allOl:[...fig.querySelectorAll('ol')].map(o=>({cls:o.className,inDetails:!!o.closest('details'),n:o.children.length})),
   cards:lis.map(li=>({...rel(li),h3:li.querySelector('h3')?.textContent,action:[...li.querySelectorAll('p')].map(x=>x.className||'(p)').join('+'),actionText:li.querySelector('div p:last-child')?.textContent.slice(0,40),actionBottom:rel(li.querySelector('div p:last-child')).bottom,visible:li.checkVisibility()})),
   schutz:rel(fig.querySelector('.bl-fig-schutz')),summaries:[...fig.querySelectorAll('summary')].map(s=>({t:s.textContent,...rel(s)})),caption:rel(fig.querySelector('figcaption')),detailsOpen:[...fig.querySelectorAll('details')].map(d=>d.open)};});
 await c.close();}
 console.log(JSON.stringify(out,null,1));await b.close();srv.close();});
