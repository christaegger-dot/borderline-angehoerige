// Nach audit-results/2026-10-29-nachpruefung-r4-52/skripte/aria.cjs, Breiten 1024 und 1440 statt 390 und 1440. Aufruf: node aria.cjs <site>
const {chromium}=require(process.env.PLAYWRIGHT_MODULE);const http=require('http'),fs=require('fs'),path=require('path');const root=process.argv[2];
const srv=http.createServer((q,res)=>{const f=path.join(root,decodeURIComponent(q.url.split('?')[0]));try{const e=path.extname(f);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.svg':'image/svg+xml'})[e]||'application/octet-stream');res.end(fs.readFileSync(f));}catch(e){res.statusCode=404;res.end();}});
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch({args:['--no-sandbox']});
 for(const w of [1024,1440]){const p=await (await b.newContext({viewport:{width:w,height:900}})).newPage();await p.goto('http://127.0.0.1:'+srv.address().port+'/index.html');
  const snap=await p.locator('body').ariaSnapshot();const lines=snap.split('\n');
  console.log(`== ${w}px: ${lines.length} Zeilen; img/svg-Knoten: ${lines.filter(l=>/- (img|graphics)/.test(l)).length}; Titelbild-Text: ${/titelbild/i.test(snap)}`);
  console.log(lines.filter(l=>/- (img|graphics)/.test(l)).join("\n"));console.log(lines.filter(l=>/^\s*- (banner|navigation|main|contentinfo|complementary|region|search|heading)/.test(l)).map(l=>l.replace(/\s+$/,'')).join('\n'));
  const tb=await p.evaluate(()=>{const t=document.querySelector('.bl-titelbild');return {ariaHidden:t.getAttribute('aria-hidden'),focusable:t.querySelectorAll('a,button,[tabindex],input').length,svgFocusable:[...t.querySelectorAll('svg')].map(s=>s.getAttribute('focusable'))}});console.log('Titelbild:',JSON.stringify(tb));}
 await b.close();srv.close();})();
