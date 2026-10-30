// Zeilenzahl und Höhe der Footer-Teile, vorher gegen nachher. Aufruf: node zeilen.cjs <siteVorher> <siteNachher>
const fs=require('fs'),path=require('path'),http=require('http');const {chromium}=require(process.env.PLAYWRIGHT_MODULE);const [A,B]=process.argv.slice(2);
const serve=root=>new Promise(r=>{const s=http.createServer((q,res)=>{const f=path.join(root,decodeURIComponent(q.url.split('?')[0]));try{const e=path.extname(f);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.svg':'image/svg+xml'})[e]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.statusCode=404;res.end()}}).listen(0,'127.0.0.1',()=>r(s))});
(async()=>{const sa=await serve(A),sb=await serve(B);
 for(const large of [false,true]){const b=await chromium.launch({args:['--no-sandbox',...(large?['--blink-settings=defaultFontSize=32,defaultFixedFontSize=26']:[])]});
  for(const w of [320,390,1440])for(const [v,s] of [['vorher',sa],['nachher',sb]]){const p=await (await b.newContext({viewport:{width:w,height:900}})).newPage();await p.goto('http://127.0.0.1:'+s.address().port+'/grenzen.html');await p.evaluate(()=>document.fonts.ready);
   const r=await p.evaluate(()=>[...document.querySelectorAll('footer h2, footer .puk-web-footer__copy, footer nav, footer .puk-web-footer__details')].map(e=>{const rg=document.createRange();rg.selectNodeContents(e);const n=new Set([...rg.getClientRects()].filter(x=>x.width>1).map(x=>Math.round(x.top))).size;return e.textContent.trim().slice(0,18)+':'+n+'Z/'+Math.round(e.getBoundingClientRect().height)}).join(' | '));
   console.log((large?'200%':'100%'),w,v,r);await p.context().close();}
  await b.close();}
 sa.close();sb.close();})();
