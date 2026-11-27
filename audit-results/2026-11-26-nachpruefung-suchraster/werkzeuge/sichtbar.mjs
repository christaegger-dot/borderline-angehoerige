import { createServer } from 'node:http'; import { readFileSync, existsSync, statSync } from 'node:fs'; import { join, resolve, extname } from 'node:path'; import { createRequire } from 'node:module';
const dir=resolve(process.argv[2]); const qs=process.argv.slice(3);
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE);
const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css'};
const srv=createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';const f=join(dir,p);if(!existsSync(f)||!statSync(f).isFile()){r.writeHead(404);r.end();return;}r.writeHead(200,{'Content-Type':T[extname(f)]||'application/octet-stream'});r.end(readFileSync(f));});
await new Promise(r=>srv.listen(0,'127.0.0.1',r)); const b=await chromium.launch(); const pg=await b.newPage(); await pg.goto(`http://127.0.0.1:${srv.address().port}/suche.html`);
for(const q of qs){ await pg.fill('#site-search',q);
 const r=await pg.evaluate(()=>({raster:[...document.querySelectorAll('[data-search-results] > li:not([hidden]) a')].slice(0,3).map(a=>a.getAttribute('href')),
  sichtbar:[...document.querySelectorAll('[data-search-results] > li:not([hidden])')].filter(li=>li.offsetParent!==null).slice(0,3).map(li=>li.querySelector('a').getAttribute('href')),
  leer_sicherheitslink_sichtbar:!![...document.querySelectorAll('[data-search-empty] a[href="krise.html#krise-schnell"]')].find(a=>a.offsetParent!==null)}));
 console.log(q, JSON.stringify(r)); }
await b.close(); srv.close();
