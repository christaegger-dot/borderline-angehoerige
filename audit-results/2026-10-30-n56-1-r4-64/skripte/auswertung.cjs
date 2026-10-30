// Auswertung von messung.json: je Stand, Schrift und Breite Spannweiten über alle Seiten. Aufruf: node auswertung.cjs <messung.json>
const r=require(require('path').resolve(process.argv[2]));
const g={};for(const x of r){const k=`${x.large?'200%':'100%'} ${x.w}`;(g[k]=g[k]||{})[x.v]=(g[k][x.v]||[]).concat(x)}
const rng=a=>{const mn=Math.min(...a),mx=Math.max(...a);return mn===mx?''+mn:mn+'–'+mx};
console.log('Zustand | Stand | Seiten | Footer px | Kopf px | Absender | Name Zeilen | Mail h×w | min. Kontrast | Schriften Footer | min. Linkhöhe | Überlauf');
for(const [k,o] of Object.entries(g))for(const v of ['vorher','nachher']){const a=o[v];
 const minc=a.map(x=>x.minContrast).sort((p,q)=>p.r-q.r)[0];
 const minlink=Math.min(...a.flatMap(x=>x.links.map(l=>l.h)));
 console.log([k,v,a.length,rng(a.map(x=>x.footerH)),rng(a.map(x=>x.headerH)),[...new Set(a.map(x=>x.senderFs))].join('/'),rng(a.map(x=>x.nameLines)),[...new Set(a.filter(x=>x.mail).map(x=>x.mail.h+'×'+x.mail.w))].join('/'),minc.r+' «'+minc.t+'»',[...new Set(a.flatMap(x=>x.sizes))].join(','),minlink,a.filter(x=>x.scrollW>x.innerW||x.overflow).length].join(' | '))}
const s=r.find(x=>x.v==='nachher'&&!x.large&&x.w===1440&&x.page==='index'),o=r.find(x=>x.v==='vorher'&&!x.large&&x.w===1440&&x.page==='index');
for(const [n,x] of [['vorher',o],['nachher',s]]){console.log('\n'+n,'Footer',x.footerBg,'|',x.footerBorder,'Linienkontrast',x.borderContrast);console.log(' h2',JSON.stringify(x.heads));console.log(' copy',x.copyFs,x.copyFw,x.copyColor);console.log(' links',JSON.stringify(x.links.map(l=>[l.t,l.h,l.under,l.color,l.weight])));}
const p404=r.filter(x=>x.page==='404'&&x.v==='nachher').map(x=>x.footerH+'/'+x.links.length).join(' ');console.log('\n404 r4-56 Footer/Links:',p404);
