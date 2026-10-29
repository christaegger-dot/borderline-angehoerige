const {chromium}=require(process.env.PLAYWRIGHT_MODULE);const http=require('http'),fs=require('fs'),path=require('path');
const serve=root=>new Promise(r=>{const s=http.createServer((q,res)=>{const f=path.join(root,decodeURIComponent(q.url.split('?')[0]));try{const e=path.extname(f);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.svg':'image/svg+xml'})[e]||'application/octet-stream');res.end(fs.readFileSync(f));}catch(e){res.statusCode=404;res.end();}});s.listen(0,'127.0.0.1',()=>r(s));});
(async()=>{const sites={'r4-51':process.argv[2],'r4-52':process.argv[3]};const shots=process.argv[4];
 const vps=[[320,568],[375,667],[390,844],[768,1024],[1024,768],[1440,900],[991,800],[992,800]];
 for(const large of [false,true]){const b=await chromium.launch({args:['--no-sandbox',...(large?['--blink-settings=defaultFontSize=32,defaultFixedFontSize=26']:[])]});
  for(const [name,root] of Object.entries(sites)){const s=await serve(root);const base='http://127.0.0.1:'+s.address().port+'/';
   for(const [w,h] of vps){const c=await b.newContext({viewport:{width:w,height:h},locale:'de-CH'});const p=await c.newPage();await p.goto(base+'index.html',{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);
    const r=await p.evaluate(()=>{const li=document.querySelector('.bl-paths-cards li');const lr=li.getBoundingClientRect();const t=document.querySelector('.bl-titelbild');const tr=t.getBoundingClientRect();
     const vis=[...t.querySelectorAll('svg')].filter(x=>x.getBoundingClientRect().width>0).map(x=>x.getAttribute('class'));
     return {card:[Math.round(lr.top+scrollY),Math.round(lr.bottom+scrollY)],text:li.textContent.trim().slice(0,40),tb:[Math.round(tr.width),Math.round(tr.height)],tbDisplay:getComputedStyle(t).display,svg:vis,ariaHidden:t.getAttribute('aria-hidden')||t.querySelector('svg')?.getAttribute('aria-hidden'),sw:document.documentElement.scrollWidth,iw:innerWidth,rem:parseFloat(getComputedStyle(document.documentElement).fontSize)}});
    const status=r.card[0]>=h?'nicht sichtbar':(r.card[1]<=h?'ganz sichtbar':'angeschnitten');
    console.log([name,large?'200%':'100%',w+'x'+h,'Karte '+r.card.join('–')+' ('+status+')','Titelbild '+r.tb.join('×')+' '+r.tbDisplay+' '+JSON.stringify(r.svg),'scrollW '+r.sw+'/'+r.iw+(r.sw>r.iw?' ÜBERLAUF':''),'rem '+r.rem,'62rem='+62*r.rem+'px'].join(' | '));
    if(shots&&name==='r4-52'&&!large&&w===390)await p.screenshot({path:shots+'/startseite-390x844-r4-52.png'});
    if(shots&&name==='r4-51'&&!large&&w===390)await p.screenshot({path:shots+'/startseite-390x844-r4-51.png'});
    await c.close();}
   s.close();}
  await b.close();}
})();
