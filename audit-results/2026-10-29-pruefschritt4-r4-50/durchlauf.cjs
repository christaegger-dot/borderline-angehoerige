const fs=require('fs'),path=require('path'),http=require('http');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE);
const root='/home/user/borderline-angehoerige/site',out=process.env.OUT;fs.mkdirSync(out+'/shots',{recursive:true});
const pages=fs.readdirSync(root).filter(f=>f.endsWith('.html')).map(f=>f.replace('.html','')).sort();
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.woff2':'font/woff2','.png':'image/png','.json':'application/json'};
const server=http.createServer((req,res)=>{let f=root+decodeURIComponent(req.url.split('?')[0].split('#')[0]);if(f.endsWith('/'))f+='index.html';fs.readFile(f,(e,d)=>{if(e){res.statusCode=404;res.end('nf');return;}res.setHeader('Content-Type',types[path.extname(f)]||'application/octet-stream');res.end(d);});});
const result={layout:[],forced:[],print:[],errors:[]};
const measure=()=>{
 const W=innerWidth;const vis=e=>{const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden')return false;const r=e.getBoundingClientRect();return r.width>1&&r.height>1;};
 const over=[];for(const e of document.querySelectorAll('body *')){if(e.closest('svg,.puk-sr,[data-puk-sr-only]'))continue;if(!vis(e))continue;const r=e.getBoundingClientRect();if(r.right>W+1){let a=e.parentElement,scroll=false;while(a){const o=getComputedStyle(a).overflowX;if(o==='auto'||o==='scroll'||o==='hidden'||o==='clip'){if(a.getBoundingClientRect().right<=W+1){scroll=true;break;}}a=a.parentElement;}if(!scroll)over.push((e.tagName+'.'+(e.className&&typeof e.className==='string'?e.className.split(' ')[0]:'')+'#'+(e.id||'')).slice(0,80)+' r='+Math.round(r.right));}}
 const clipped=[];for(const e of document.querySelectorAll('main *, header *')){const cs=getComputedStyle(e);if(!(cs.overflowX==='hidden'||cs.overflowX==='clip'||cs.textOverflow==='ellipsis'))continue;if(!vis(e)||e.getBoundingClientRect().width<4)continue;if(e.scrollWidth>e.clientWidth+2&&e.textContent.trim())clipped.push((e.tagName+'.'+(typeof e.className==='string'?e.className.split(' ')[0]:'')).slice(0,60)+' '+e.scrollWidth+'>'+e.clientWidth);}
 const h=document.querySelector('header');
 return {scrollX:document.documentElement.scrollWidth-document.documentElement.clientWidth,over:[...new Set(over)].slice(0,8),clipped:clipped.slice(0,6),header:h?Math.round(h.getBoundingClientRect().height):null,H:document.documentElement.scrollHeight};
};
(async()=>{
 await new Promise(r=>server.listen(0,r));const base='http://127.0.0.1:'+server.address().port+'/';
 for(const large of [false,true]){
  const browser=await chromium.launch({args:large?['--blink-settings=defaultFontSize=32,defaultFixedFontSize=26']:[]});
  const ctx=await browser.newContext({locale:'de-CH'});const p=await ctx.newPage();
  p.on('pageerror',e=>result.errors.push({large,url:p.url(),e:String(e).slice(0,200)}));
  p.on('console',m=>{if(m.type()==='error')result.errors.push({large,url:p.url(),console:m.text().slice(0,200)});});
  for(const width of [320,390,768,1100,1440]){
   await p.setViewportSize({width,height:large?900:844});
   for(const pg of pages){
    await p.goto(base+pg+'.html',{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);
    const m=await p.evaluate(measure);result.layout.push({page:pg,width,large,...m});
    if(!large||width===320||width===1440)await p.screenshot({path:`${out}/shots/${large?'200':'100'}-${width}-${pg}.png`});
   }
  }
  await browser.close();
 }
 // erzwungene Farben
 const browser=await chromium.launch();
 for(const width of [390,1440]){
  const ctx=await browser.newContext({viewport:{width,height:844},locale:'de-CH',forcedColors:'active'});const p=await ctx.newPage();
  for(const pg of pages){
   await p.goto(base+pg+'.html',{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);
   const boxes=await p.evaluate(()=>{const sel=['.puk-longform__boundary','.bl-tun','.puk-site-quick','.puk-vis-figure','.bl-band','.puk-say__item','.bl-paths-cards li','.puk-site-depth','details','.bl-titelbild'];const res={};
    for(const s of sel){const els=[...document.querySelectorAll(s)].filter(e=>getComputedStyle(e).display!=='none');if(!els.length)continue;const noBorder=els.filter(e=>{const cs=getComputedStyle(e);return ['Top','Right','Bottom','Left'].every(k=>parseFloat(cs['border'+k+'Width'])===0||cs['border'+k+'Style']==='none')&&(parseFloat(cs.outlineWidth)===0||cs.outlineStyle==='none');}).length;res[s]={n:els.length,noBorder};}
    res.titelbildHidden=document.querySelector('.bl-titelbild')?getComputedStyle(document.querySelector('.bl-titelbild')).display:'–';return res;});
   // Fokus: die ersten 12 Tabulatorschritte
   await p.evaluate(()=>{document.activeElement&&document.activeElement.blur();window.scrollTo(0,0);});
   const focus=[];for(let i=0;i<12;i++){await p.keyboard.press('Tab');focus.push(await p.evaluate(()=>{const e=document.activeElement;if(!e||e===document.body)return null;const cs=getComputedStyle(e);const ring=(cs.outlineStyle!=='none'&&parseFloat(cs.outlineWidth)>0);return {tag:e.tagName+'.'+(typeof e.className==='string'?e.className.split(' ')[0]:''),outline:ring?cs.outlineStyle+' '+cs.outlineWidth:'none',shadow:cs.boxShadow!=='none'};}));}
   const m=await p.evaluate(measure);
   result.forced.push({page:pg,width,boxes,focus:focus.filter(Boolean),noRing:focus.filter(f=>f&&f.outline==='none').map(f=>f.tag),scrollX:m.scrollX});
   if(['index','grenzen','krise','verstehen','kinder','gefahr'].includes(pg))await p.screenshot({path:`${out}/shots/forced-${width}-${pg}.png`});
  }
  await ctx.close();
 }
 // Druck
 const ctx=await browser.newContext({viewport:{width:794,height:1123},locale:'de-CH'});const p=await ctx.newPage();
 for(const pg of pages){
  await p.goto(base+pg+'.html',{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);
  await p.emulateMedia({media:'print'});await p.evaluate(()=>window.dispatchEvent(new Event('beforeprint')));
  const r=await p.evaluate(()=>{
   const L=c=>{const m=c.match(/rgba?\(([^)]+)\)/);const v=m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);const s=v.slice(0,3).map(x=>{x/=255;return x<=.03928?x/12.92:((x+.055)/1.055)**2.4});return .2126*s[0]+.7152*s[1]+.0722*s[2];};
   const light=[];for(const e of document.querySelectorAll('body *')){const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden')continue;if(![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))continue;const r=e.getBoundingClientRect();if(!r.width)continue;const cr=(1.05)/(L(cs.color)+.05);if(cr<4.5)light.push((e.tagName+'.'+(typeof e.className==='string'?e.className.split(' ')[0]:'')).slice(0,50)+' '+cs.color+' '+cr.toFixed(2));}
   const shown=s=>{const e=document.querySelector(s);return e?getComputedStyle(e).display!=='none':null};
   const closed=[...document.querySelectorAll('details')].filter(d=>!d.open).length;
   return {light:[...new Set(light)].slice(0,10),nav:shown('.puk-web-nav'),search:shown('[data-puk-search],.puk-site-search'),titelbild:shown('.bl-titelbild'),closedDetails:closed,details:document.querySelectorAll('details').length,scrollX:document.documentElement.scrollWidth-document.documentElement.clientWidth};
  });
  result.print.push({page:pg,...r});
  if(['index','grenzen','gefahr','verstehen','kinder','behandlung'].includes(pg)){await p.pdf({path:`${out}/shots/print-${pg}.pdf`,format:'A4',printBackground:false});}
  await p.emulateMedia({media:'screen'});
 }
 await browser.close();server.close();
 fs.writeFileSync(out+'/result.json',JSON.stringify(result,null,1));console.log('ok',result.layout.length,result.forced.length,result.print.length,result.errors.length);
})().catch(e=>{console.error(e);process.exit(1);});
