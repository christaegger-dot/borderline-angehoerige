/* N829-2: Bericht zum Layouttest für die CI. Liest ERGEBNIS.json, schreibt die Zusammenfassung des Laufs
   und endet mit Exit 1, wenn es eine NEUE Abweichung gibt oder ERGEBNIS.json fehlt. Bekannte Abweichungen
   (KNOWN_ISSUES in layouttest.cjs) ergeben nur eine Warnung. Ohne GitHub schreibt das Skript auf die Konsole. */
const fs=require('fs');
const file=process.argv[2]||'dist/audit04-layout/ERGEBNIS.json',outcome=process.env.LAYOUT_OUTCOME||'unbekannt',summary=process.env.GITHUB_STEP_SUMMARY;
/* N832-6: Meldungen können Seitentext enthalten; in der Zusammenfassung stehen sie einzeilig und ohne HTML oder Markdown-Auszeichnung. */
const md=t=>String(t).replace(/[\r\n]+/g,' ').replace(/[<>&`*_#|\[\]]/g,c=>'&#'+c.charCodeAt(0)+';');
const lines=[],say=t=>lines.push(t),esc=t=>String(t).replace(/%/g,'%25').replace(/\r/g,'%0D').replace(/\n/g,'%0A');
let result=null,problem='';
try{result=JSON.parse(fs.readFileSync(file,'utf8'));if(!result||typeof result!=='object'||Array.isArray(result)){result=null;problem='ERGEBNIS.json enthält kein Ergebnisobjekt';}}catch(e){problem=fs.existsSync(file)?'ERGEBNIS.json ist nicht lesbar':'ERGEBNIS.json fehlt (Abbruch vor dem Schreiben)';}
let fail=false;
if(!result){
 say(`### Layouttest: ${problem}`);say('');say(`Schritt «Layout test»: ${outcome}. Ohne Ergebnis lässt sich nicht sagen, ob es neue Abweichungen gibt.`);
 console.log(`::error title=Layouttest ohne Ergebnis::${esc(problem)}`);fail=true;
}else{
 const issues=result.issues||[],known=result.knownIssues,fresh=result.newIssues;
 if(!Array.isArray(known)||!Array.isArray(fresh)){
  say('### Layouttest: ERGEBNIS.json ohne die Felder knownIssues und newIssues');console.log('::error title=Layouttest::ERGEBNIS.json ohne knownIssues/newIssues');fail=true;
 }else{
  say(`### Layouttest: ${fresh.length} neue, ${known.length} bekannte Abweichungen`);say('');
  say(`${result.states} Seitenzustände, ${result.interactions} Bedienproben. Schritt «Layout test»: ${outcome}.`);say('');
  if(fresh.length){say('**Neue Abweichungen (blockieren):**');fresh.forEach(i=>say('- '+md(i)));say('');fresh.forEach(i=>console.log(`::error title=Layouttest: neue Abweichung::${esc(i)}`));fail=true;}
  if(known.length){say('**Bekannte Abweichungen (blockieren nicht, siehe KNOWN_ISSUES in `layouttest.cjs`):**');known.forEach(i=>say('- '+md(i)));say('');console.log(`::warning title=Layouttest::${known.length} bekannte Abweichungen, ${fresh.length?fresh.length+' neue':'keine neue'}`);}
  if((result.knownNotSeen||[]).length){say('**Nicht mehr aufgetreten, Eintrag in KNOWN_ISSUES entfernen:** '+result.knownNotSeen.join(', '));say('');console.log(`::notice title=Layouttest::Bekannte Abweichung nicht mehr aufgetreten: ${esc(result.knownNotSeen.join(', '))}`);}
  if(!issues.length)say('Keine Abweichungen.');
  if(issues.length!==known.length+fresh.length){say('**Zählung stimmt nicht:** issues ≠ knownIssues + newIssues.');console.log('::error title=Layouttest::Zählung in ERGEBNIS.json stimmt nicht');fail=true;}
  if(outcome==='success'&&issues.length){say('**Widerspruch:** Schritt «success», aber Abweichungen in ERGEBNIS.json.');console.log('::error title=Layouttest::Schritt success, aber Abweichungen in ERGEBNIS.json');fail=true;}
  /* N832-6: Ein gescheiterter oder abgebrochener Schritt ohne Abweichung ist ebenfalls ein Widerspruch. */
  if((outcome==='failure'||outcome==='cancelled')&&!issues.length){say(`**Widerspruch:** Schritt «${outcome}», aber keine Abweichung in ERGEBNIS.json.`);console.log(`::error title=Layouttest::Schritt ${outcome}, aber keine Abweichung in ERGEBNIS.json`);fail=true;}
 }
}
const text=lines.join('\n')+'\n';
if(summary)fs.appendFileSync(summary,text);else console.log(text);
process.exit(fail?1:0);
