// Nachprüfung r4-55/r4-56: Kopf, Absenderzeile und Fusszeile auf allen Seiten, vorher gegen nachher (r4-60 gegen r4-63).
// Aufruf: node messung.cjs <siteVorher> <siteNachher> <site.config.json> <ausgabe.json>
const fs=require('fs'),path=require('path'),http=require('http');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE);
const [A,B,CFG,OUT]=process.argv.slice(2);
const pages=JSON.parse(fs.readFileSync(CFG)).pages.map(p=>p.id);
const serve=root=>new Promise(r=>{const s=http.createServer((q,res)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/index.html';const f=path.join(root,u);try{const e=path.extname(f);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.svg':'image/svg+xml'})[e]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.statusCode=404;res.end()}}).listen(0,'127.0.0.1',()=>r(s))});
const probe=()=>{
 const lum=c=>{const m=c.match(/[\d.]+/g).map(Number);const [r,g,b]=m.slice(0,3).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*r+.7152*g+.0722*b};
 const bg=e=>{for(;e;e=e.parentElement){const c=getComputedStyle(e).backgroundColor;if(c&&!/rgba\(0, 0, 0, 0\)|transparent/.test(c))return c}return 'rgb(255, 255, 255)'};
 const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
 const f=document.querySelector('footer.puk-web-footer'),fr=f.getBoundingClientRect(),fs=getComputedStyle(f);
 const texts=[...f.querySelectorAll('*')].filter(e=>[...e.childNodes].some(n=>n.nodeType===3&&n.data.trim())&&e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden');
 const sizes=[...new Set(texts.map(e=>getComputedStyle(e).fontSize))].sort();
 const contrasts=texts.map(e=>({t:e.textContent.trim().slice(0,30),r:+ratio(getComputedStyle(e).color,bg(e)).toFixed(2)})).sort((a,b)=>a.r-b.r);
 const links=[...f.querySelectorAll('a')].map(a=>{const r=a.getBoundingClientRect(),s=getComputedStyle(a);return {t:a.textContent.trim(),h:Math.round(r.height),w:Math.round(r.width),under:s.textDecorationLine,color:s.color,weight:s.fontWeight}});
 const heads=[...f.querySelectorAll('h2')].map(h=>{const s=getComputedStyle(h);return {t:h.textContent,fs:s.fontSize,fw:s.fontWeight,color:s.color}});
 const copy=getComputedStyle(f.querySelector('.puk-web-footer__copy'));
 const head=document.querySelector('header'),snd=document.querySelector('.puk-site-sender'),name=document.querySelector('.puk-site-sender__name'),mail=document.querySelector('.puk-site-sender a[data-sender-email]');
 const lines=el=>{if(!el)return 0;const r=document.createRange();r.selectNodeContents(el);return new Set([...r.getClientRects()].filter(x=>x.width>1).map(x=>Math.round(x.top))).size};
 const mr=mail?mail.getBoundingClientRect():null;
 const over=[...document.querySelectorAll('header *,footer *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>innerWidth+1&&getComputedStyle(e).position!=='absolute'&&!e.closest('.puk-sr')}).length;
 return {footerH:Math.round(fr.height),footerBg:fs.backgroundColor,footerBorder:fs.borderTopWidth+' '+fs.borderTopStyle+' '+fs.borderTopColor,borderContrast:+ratio(fs.borderTopColor,bg(f.parentElement)).toFixed(2),sizes,minContrast:contrasts[0],links,heads,copyFs:copy.fontSize,copyFw:copy.fontWeight,copyColor:copy.color,
  headerH:Math.round(head.getBoundingClientRect().height),senderFs:snd?getComputedStyle(snd).fontSize:null,nameLines:lines(name),senderLines:lines(snd),mail:mr?{h:Math.round(mr.height),w:Math.round(mr.width)}:null,scrollW:document.documentElement.scrollWidth,innerW:innerWidth,overflow:over};
};
(async()=>{
 const sa=await serve(A),sb=await serve(B);const bases={'vorher':'http://127.0.0.1:'+sa.address().port+'/','nachher':'http://127.0.0.1:'+sb.address().port+'/'};
 const res=[];
 for(const large of [false,true]){
  const br=await chromium.launch({args:['--no-sandbox',...(large?['--blink-settings=defaultFontSize=32,defaultFixedFontSize=26']:[])]});
  for(const [v,base] of Object.entries(bases)){
   const ctx=await br.newContext({viewport:{width:1440,height:900},locale:'de-CH'}),p=await ctx.newPage();
   for(const w of [320,390,768,1100,1440]){await p.setViewportSize({width:w,height:900});
    for(const pg of pages){await p.goto(base+pg+'.html',{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);res.push({v,large,w,page:pg,...await p.evaluate(probe)});}}
   await ctx.close();
  }
  await br.close();
 }
 fs.writeFileSync(OUT,JSON.stringify(res,null,1));sa.close();sb.close();
})();
