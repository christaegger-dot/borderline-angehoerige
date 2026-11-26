// N824-1: waagrechter Überlauf bei kleiner Standardschrift. Aufruf: PLAYWRIGHT_MODULE=… node kleinschrift.cjs <siteDir> [<siteDir2> …]
// Je Stand: Standardschrift 12 bis 16 px (CDP Page.setFontSizes), Breiten 560 bis 800 px in 20er-Schritten, Startseite und «Krisen begleiten», mit Skript.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE);const http=require('http'),fs=require('fs'),path=require('path');
const serve=dir=>new Promise(r=>{const s=http.createServer((q,a)=>{const f=path.join(dir,decodeURIComponent(q.url.split('?')[0]));try{a.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.svg':'image/svg+xml'})[path.extname(f)]||'application/octet-stream');a.end(fs.readFileSync(f))}catch(e){a.statusCode=404;a.end()}});s.listen(0,'127.0.0.1',()=>r(s))});
(async()=>{const b=await chromium.launch();
for(const dir of process.argv.slice(2)){const s=await serve(path.resolve(dir));const base='http://127.0.0.1:'+s.address().port+'/';let build='';
 for(const fsz of [12,13,14,15,16]){const bad=[];let unreach=[];
  for(let w=560;w<=800;w+=20){const ctx=await b.newContext({viewport:{width:w,height:800}});const p=await ctx.newPage();const cdp=await ctx.newCDPSession(p);await cdp.send('Page.setFontSizes',{fontSizes:{standard:fsz}});
   for(const pg of ['index.html','krise.html']){await p.goto(base+pg,{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);
    const r=await p.evaluate(()=>{const v=e=>e.checkVisibility({visibilityProperty:true,opacityProperty:true})&&e.getBoundingClientRect().height>0;const inView=e=>{const q=e.getBoundingClientRect();return q.left>=0&&q.right<=innerWidth+1};
     const row=[...document.querySelectorAll('.puk-site-utility__link')];const vis=[...document.querySelectorAll('.puk-site-utility__link,.puk-site-menu__utility-link')].filter(v);
     return {build:document.documentElement.getAttribute('data-puk-site-build'),over:document.documentElement.scrollWidth-innerWidth,menuBtn:v(document.querySelector('.puk-disclosure__button')),rowVisible:row.some(v),visOut:vis.filter(e=>!inView(e)).map(e=>e.textContent.trim())}});
    build=r.build;if(r.over>1)bad.push(`${w}:${pg.replace('.html','')}+${r.over}`);if(r.visOut.length)unreach.push(`${w}:${r.visOut.join('/')}`);}
   await ctx.close();}
  console.log(`${path.basename(path.resolve(dir))} (${build}) · Standardschrift ${fsz} px · Überlauf: ${bad.length?bad.join(' '):'keiner'}${unreach.length?' · ausserhalb des Bildschirms: '+[...new Set(unreach)].slice(0,4).join(' ')+(unreach.length>4?' …':''):''}`);}
 s.close();}
await b.close();})();
