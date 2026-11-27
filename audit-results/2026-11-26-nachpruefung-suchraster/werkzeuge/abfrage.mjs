// node abfrage.mjs <site> <anfragen.txt>: erste drei Treffer je Anfrage (wie suchraster.mjs, ohne Anheftung)
import { createServer } from 'node:http'; import { readFileSync, existsSync, statSync } from 'node:fs'; import { join, resolve, extname } from 'node:path'; import { createRequire } from 'node:module';
const [dir, file] = [resolve(process.argv[2]), process.argv[3]];
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE);
const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css'};
const srv = createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';const f=join(dir,p);if(!existsSync(f)||!statSync(f).isFile()){r.writeHead(404);r.end();return;}r.writeHead(200,{'Content-Type':T[extname(f)]||'application/octet-stream'});r.end(readFileSync(f));});
await new Promise(r=>srv.listen(0,'127.0.0.1',r));
const b=await chromium.launch(); const pg=await b.newPage(); await pg.goto(`http://127.0.0.1:${srv.address().port}/suche.html`);
const qs=readFileSync(file,'utf8').split('\n').filter(Boolean);
const out=await pg.evaluate(qs=>{const i=document.querySelector('#site-search');return qs.map(q=>{i.value=q;i.dispatchEvent(new Event('input',{bubbles:true}));return [...document.querySelectorAll('[data-search-results] > li:not([hidden]) a')].map(a=>a.getAttribute('href')).slice(0,3);});},qs);
qs.forEach((q,k)=>console.log(q+'\t'+(out[k].join(' > ')||'–')));
await b.close(); srv.close();
