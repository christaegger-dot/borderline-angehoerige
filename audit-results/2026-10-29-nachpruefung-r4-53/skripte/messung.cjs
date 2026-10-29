// Misst Sicherheitskarte, Titelbild, Raster und waagrechtes Scrollen der Startseite: r4-52 gegen r4-53.
// Aufruf: node messung.cjs <siteA> <siteB> <ausgabeordner>
const fs=require('fs'),path=require('path'),http=require('http');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE);
const [A,B,OUT]=process.argv.slice(2);fs.mkdirSync(OUT,{recursive:true});
const serve=root=>new Promise(r=>{const s=http.createServer((q,res)=>{const f=path.join(root,decodeURIComponent(q.url.split('?')[0]));try{const e=path.extname(f);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.svg':'image/svg+xml'})[e]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.statusCode=404;res.end()}}).listen(0,()=>r(s))});
(async()=>{
 const sa=await serve(A),sb=await serve(B);const bases={'r4-52':'http://localhost:'+sa.address().port+'/','r4-53':'http://localhost:'+sb.address().port+'/'};
 const sizes=[[320,568],[390,844],[768,1024],[1024,768],[1112,834],[1150,800],[1199,800],[1200,800],[1280,800],[1440,900]];
 const big=[[320,568],[1024,768],[1984,1000],[2399,1000],[2400,1000],[2560,1200]];
 const res=[];
 for(const large of [false,true]){
  const br=await chromium.launch({args:['--no-sandbox',...(large?['--blink-settings=defaultFontSize=32,defaultFixedFontSize=26']:[])]});
  for(const [w,h] of (large?big:sizes)) for(const [v,base] of Object.entries(bases)){
   const ctx=await br.newContext({viewport:{width:w,height:h},locale:'de-CH'}),p=await ctx.newPage();
   await p.goto(base+'index.html',{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);
   const m=await p.evaluate(()=>{const c=document.querySelector('.bl-paths-cards li');const r=c.getBoundingClientRect();const t=document.querySelector('.bl-titelbild');const tr=t.getBoundingClientRect();const hero=document.querySelector('.puk-longform__hero');const hs=getComputedStyle(hero);
    const kids=[...hero.children].map(e=>{const r=e.getBoundingClientRect();return {tag:e.tagName,cls:e.className,w:Math.round(r.width),l:Math.round(r.left)}});
    const p=document.querySelector('.puk-longform__hero p');const fs=parseFloat(getComputedStyle(p).fontSize);
    return {top:Math.round(r.top+scrollY),bottom:Math.round(r.bottom+scrollY),text:c.textContent.trim().slice(0,40),titel:getComputedStyle(t).display==='none'?'aus':Math.round(tr.width)+'×'+Math.round(tr.height),display:hs.display,cols:hs.gridTemplateColumns,heroW:Math.round(hero.getBoundingClientRect().width),kids,pW:Math.round(p.getBoundingClientRect().width),pCh:Math.round(p.getBoundingClientRect().width/(fs*0.5)),scrollW:document.documentElement.scrollWidth,innerW:innerWidth,rootFs:getComputedStyle(document.documentElement).fontSize}});
   m.lage=m.bottom<=h?'ganz sichtbar':m.top<h?'angeschnitten':'nicht sichtbar';
   res.push({v,w,h,large,...m});
   if(!large&&(w===1024||w===1150)) await p.screenshot({path:`${OUT}/startseite-${w}x${h}-${v}.png`});
   await ctx.close();
  }
  await br.close();
 }
 fs.writeFileSync(OUT+'/messung.json',JSON.stringify(res,null,1));
 for(const r of res) console.log([r.v,`${r.w}×${r.h}`,r.large?'200%':'100%',`${r.top}–${r.bottom}`,r.lage,'Titelbild '+r.titel,r.display,r.display==='grid'?r.cols:'-','Kinderbreiten '+r.kids.map(k=>k.w).join('/'),'p '+r.pW+'px','scrollW '+r.scrollW+'/'+r.innerW].join(' | '));
 sa.close();sb.close();
})();
