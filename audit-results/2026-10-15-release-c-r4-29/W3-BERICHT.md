# W3 Code-Review · Release C (r4-29) · Delta-Prüfung

| | |
| --- | --- |
| Website | «Borderline – Orientierung für Angehörige» |
| Repository | `christaegger-dot/borderline-angehoerige`, Branch `claude/release-c-r4-29-1792043306` |
| Geprüfter Stand | HEAD `40474e0` (Release C, PUK-Freigabe F1 bis F14 umgesetzt) |
| Vergleichsbasis | `02dba06` (r4-28, live) |
| Datum | 15.10.2026 |
| Rolle | unabhängige Prüfsitzung W3; hat die Website nicht gebaut, nichts korrigiert, nichts entschieden |
| Art | reines Review; im Repository wurde nur diese Datei angelegt |

## 1 Gesamturteil

Release C ist technisch sauber umgesetzt: Entwurfs- und Produktionsbuild (in einer Kopie) laufen ohne Blocker, axe meldet auf allen 23 Seiten bei 320 und 1280 px keinen WCAG-2.2-AA-Verstoss, es gibt keine Anfragen an fremde Hosts, keine Cookies oder Speicherung und keine defekten internen Links. Die neue Seite `jugendliche.html`, die FAQ-Faltung mit `openFaqIds`, die neuen Anker und die Validierungstabelle funktionieren in Chromium wie beabsichtigt, auch ohne JavaScript und im Druck. Kritische Befunde gibt es keine. Die zwei wichtigen Befunde betreffen die Suche und stammen nicht aus Release C (`interaktion.js` ist unverändert): Synonyme greifen bei Eingaben mit Umlaut nicht («Ich bin überfordert» ergibt 0 Treffer), und kurze Anfragen zu Gewalt wie «schlägt mich» oder «bedroht mich» finden nichts. Die drei wichtigsten Handlungsfelder sind (1) die Suche (getesteter Vorschlag, 11 Null-Treffer-Fälle weg, keine Änderung an 91 bisherigen Testanfragen), (2) die Robustheit ausserhalb von Chromium (Sprünge in eingeklappte Abschnitte, Tabellensemantik in Safari/VoiceOver, Wortbrüche in Überschriften bei 320 bis 360 px) und (3) die Absicherung des Gates (stille Tippfehler in `openFaqIds`/`collapsedSections`, Selbsttest läuft auf dieser Website ins Leere). Aus meiner Sicht steht kein Befund der Veröffentlichung von r4-29 entgegen.

## 2 Bestandesaufnahme

**Stack.** Eigener statischer Generator ohne Fremdabhängigkeiten (kein `package.json`), Node ab 18, geprüft mit Node 22.22.0.

| Bereich | Dateien | Umfang |
| --- | --- | --- |
| Inhalte | `authoring/content/*.html` | 23 Fragmente, eines pro Seite (neu: `jugendliche.html`) |
| Konfiguration | `authoring/site.config.json` | 2341 Zeilen: Seitenvertrag, Navigation, Suchaliase, Visualisierungsplan, Freigaben |
| Generator und Gate | `authoring/tools/build.mjs` (126 Z.), `contract.js` (720 Z.: Renderer, Gate, Selbsttest), `search-index.mjs` (75 Z.) | Suchindex wird beim Build in `suche.html` geschrieben |
| Werkzeug | `authoring/tools/wortbilanz.mjs` (neu, 54 Z.) | eigenständig, nicht Teil des Builds |
| Darstellung | `authoring/css/site.css` (1474 Z., 120 KB) | zusammengeführtes Kit-Bundle plus Website-Regeln; neu `.bl-tabelle` |
| Verhalten | `authoring/js/interaktion.js` (363 Z.) | Akkordeon, Filter, Suche, Sprungziel-Fokus, Druck; in Release C unverändert |
| Ressourcen | `authoring/fonts/` (Rubik 300/400/500, OFL), `authoring/assets/` (SVG) | selbst gehostet |
| Hosting | `authoring/_headers`, `_redirects` (88 Regeln), `robots.txt`, `netlify.toml` | Publish-Ordner `site/`, kein Build auf Netlify |
| CI | `.github/workflows/verify-authoring.yml` | Produktionsbuild und Paritätsprüfung bei Pull Requests, Rechte nur `contents: read` |

**Build-Ergebnis.**

- Entwurf `node authoring/tools/build.mjs --out=dist/w3`: 23 Seiten · 0 Blocker · 1 Hinweis «change-review». Wie erwartet.
- Produktion in einer Kopie ausserhalb des Repositorys, `releaseApproval.independentReview` testweise «bestaetigt»: 23 Seiten · 0 Blocker · 0 Hinweise. Weitere Produktionsblocker gibt es nicht.
- Paritätsprüfung `--verify-site` in der Kopie: schlägt erwartungsgemäss fehl, weil `site/` noch r4-28 ist (unter anderem «neu: jugendliche.html»).
- Selbsttest des Gates: `build.mjs` hat keinen Schalter dafür (`--help` gibt es nicht; der Aufruf baute stattdessen einen Entwurf in den ignorierten Ordner `dist/site`). Den Selbsttest `C.selftest()` habe ich mit einem eigenen Skript gegen die gerenderten Seiten ausgeführt: 29 von 76 bestanden, 44 Mutationen «nicht anwendbar» (siehe W3C-07).

**Eingesetzte Werkzeuge.** Playwright 1.56.0 mit Chromium 141.0.7390.37 (headless), axe-core 4.10.2 (Tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa), eigener Node-Server, der `_headers` anwendet (damit CSP-Verstösse sichtbar werden), Python `http.server`, Chrome DevTools Protocol (Barrierefreiheitsbaum, CPU- und Netzdrosselung), `pdftotext`/`pdfinfo`/`pdftoppm` für den Druck, `curl` für externe Links. Alle Skripte liegen ausserhalb des Repositorys im Arbeitsordner der Sitzung.

**Nicht verfügbar:** WebKit/Safari, Firefox, echte Screenreader, echte Geräte. Das Chromium dieser Umgebung hat kein deutsches Trennwörterbuch, `hyphens:auto` ist hier also nicht sichtbar.

## 3 Befundliste

Priorität: **kritisch** = defekt, Datenabfluss oder Barriere, die die Nutzung verhindert · **wichtig** = deutliche Einschränkung für einen Teil der Nutzenden oder erheblicher Wartungsaufwand · **optional** = Verbesserung. «Prüfbedarf» heisst: im Code eindeutig, die Wirkung auf dem betroffenen Gerät aber nicht selbst gemessen.

| ID | Priorität | Kriterium | Datei und Zeile | Problem | Warum relevant | Vorschlag |
| --- | --- | --- | --- | --- | --- | --- |
| W3C-01 | wichtig | A, B | `authoring/js/interaktion.js` 212–233 (`normalized`, `stopwords`, `synonymSets`) | `normalized()` macht aus Umlauten Grundbuchstaben («für» → «fur», «überfordert» → «uberfordert»). Die Synonym- und Stoppwortlisten sind aber in Umschrift geschrieben («fuer», «ueberfordert», «selbsttoetung», «moechte sterben», «aerztin», «gespraech»). Bei Eingaben mit echtem Umlaut greifen diese Einträge deshalb nie. Gemessen: «Ich bin überfordert» 0 Treffer, «Ich bin ueberfordert» 5; «Selbsttötung» 2 Treffer, «Selbsttoetung» 37; «erschöpft» 10, «erschoepft» 27. «für» ist kein Stoppwort. | Fast alle tippen Umlaute. Überlastung und Suizidgedanken sind Kernanliegen der Website; bei «überfordert» endet die Suche in «Keine passenden Inhalte». | Normalisierung mit Umschrift (ä→ae, ö→oe, ü→ue, ß→ss), damit Index, Eingabe und Listen gleich behandelt werden. Diff in Abschnitt 4.1. Getestet zusammen mit W3C-02. |
| W3C-02 | wichtig | A | `authoring/js/interaktion.js` 272 (`required`), 216–233, 215 | (a) Die Rückfallstufe greift bei genau zwei Suchwörtern nie: `Math.ceil(2 × 0,6) = 2`, also wie im strengen Modus. (b) Die Synonymliste hat kein Wortfeld für Gewalt und Bedrohung. (c) «mich», «mir», «ihm», «bin» sind keine Stoppwörter und werden zu Pflichtwörtern. Ergebnis: «schlägt mich», «er schlägt mich», «bedroht mich», «sie bedroht mich», «Angst vor ihm», «nimmt Drogen», «trinkt zu viel», «riskantes Verhalten», «Lügen erzählt» ergeben je 0 Treffer. | Gewalt und Bedrohung sind sicherheitsrelevant. Der neue Abschnitt `grenzen#riskant` ist mit naheliegenden Worten nicht auffindbar. | Rückfall verlangt höchstens ein Wort weniger; Gewalt-Wortfeld; Pronomen und «bin» als Stoppwörter. Diff in Abschnitt 4.1. Gemessen mit 119 Anfragen: Null-Treffer 11 → 0, keine Änderung eines Ersttreffers der 91 bisherigen Testanfragen. |
| W3C-03 | optional · Prüfbedarf | A, B | `authoring/js/interaktion.js` 343–358 (`revealHashTarget`), Zeile 355 | Das Skript öffnet ein geschlossenes `<details>`, scrollt aber nie selbst (`focus({ preventScroll: true })`). Es verlässt sich darauf, dass der Browser nativ zum Ziel springt. Chromium klappt beim Fragment-Sprung selbst auf (gemessen 209/209 Ziele korrekt). Safari kann das laut WebKit erst ab 26.2. In der Simulation eines Browsers ohne diese Fähigkeit lag keines der 30 eingeklappten Ziele im Sichtbereich. Betroffen sind 6 Links innerhalb einer Seite («Auf dieser Seite»: `kommunizieren#beispiele` 2×, `rolle#alltag`, `#mehrere`, `#nach-konflikten`, `selbstfuersorge#akzeptanz`); Sprünge von anderen Seiten öffnen sich beim Laden rechtzeitig. | Auf älteren iPhones scheint ein Tipp auf einen Eintrag im Seitenweg wirkungslos. | Nur wenn das Skript ein `<details>` geöffnet hat, zum Ziel scrollen. Diff in Abschnitt 4.2; simuliert 30/30 Ziele sichtbar, nativ weiterhin 209/209. |
| W3C-04 | optional · Prüfbedarf | B, F | `authoring/css/site.css` 1466–1474; `authoring/content/kommunizieren.html` Zeile 30 | `.bl-tabelle`: Chromium behält die Tabellensemantik auch mit `display:block` (Barrierefreiheitsbaum bei 320 px: table, 7 row, 3 columnheader, 6 rowheader, 12 cell). Für WebKit/VoiceOver nicht prüfbar; dort ging die Semantik bei geändertem `display` früher verloren. Bei 320 px liest der Zellname das `::before`-Label mit («Beispiel «Ich bin da …»»), dazu den Spaltenkopf «Beispiel»: doppelte Ansage. Bei 761 bis rund 795 px (zweispaltiges Raster, Spalte 427 px, Tabelle mindestens 457 px) und bei 200 % Textgrösse (818 statt 718 px) braucht die Tabelle eine horizontale Scrollleiste. Die Region ist fokussierbar und benannt (`role="region"`, `tabindex="0"`), es geht also nichts verloren. | iPhone mit VoiceOver ist bei dieser Zielgruppe wahrscheinlich. | Explizite ARIA-Tabellenrollen im Markup, Label für Hilfstechnik ausblenden, Container-Abfrage statt Viewport-Grenze. Abschnitt 4.3; die Container-Abfrage ist getestet (8 von 8 Fällen ohne Scrollen). |
| W3C-05 | optional · Profilentscheid | F | `authoring/css/site.css` 1074 (`.puk-web-page{overflow-wrap:break-word;hyphens:manual}`); 7 Stellen mit `hyphens:auto` ohne `-webkit-hyphens` | In Überschriften und Zusammenfassungen brechen lange Wörter ohne Trennstrich mitten im Wort um: 21 Stellen auf 12 Seiten bei 320/360 px, 11 davon mit nur 1 bis 2 Zeichen auf der neuen Zeile. Beispiele: H1 `diagnose` «Begleiterkrank|ungen», H1 `genesung` «unterschiedlic|h», `begriffe` (Borderline-Eintrag, im S markiert) «Persönlichkeitsstörun|g», `behandlung` H3 «Jugendpsychiatri|e». Dass `-webkit-hyphens` fehlt, betrifft ältere Safari-Versionen. | Lesbarkeit auf dem Smartphone, gerade in Seitentiteln. | `hyphens:auto` für Überschriften, `summary` und `dt` unter 760 px, dazu `-webkit-hyphens`. Abschnitt 4.4. Das ändert die Profilregel «Fliesstext manual»; laut README nur mit Profilentscheid. Auf Geräten prüfen (hier kein Trennwörterbuch). |
| W3C-06 | optional | G | `authoring/tools/contract.js` 107, 155–156, Gate ab 344 | Das Gate prüft `collapsedSections` und `openFaqIds` nicht. Getestet in der Kopie: Mit `openFaqIds: ["f-bedrohlich", "f-einweissung"]` und `collapsedSections: ["beispiel"]` wird die als kritisch offen gehaltene Antwort «f-einweisung» eingeklappt und `kommunizieren#beispiele` bleibt offen. Der Produktionsbuild meldet trotzdem 0 Blocker. | Die Release-C-Regel «kritische Information nie nur hinter einem Aufklappteil» hängt an der korrekten Schreibweise einer ID. | Gate-Prüfung «fold-config». Abschnitt 4.5; getestet: korrekt 0 Blocker, mit Tippfehlern 2 Blocker. |
| W3C-07 | optional | G | `authoring/tools/contract.js` 581–705 (`MUTATIONS`, `selftest`); `build.mjs` | Der Selbsttest ist auf die Seiten-IDs des Starters zugeschnitten (`behandlung-verstehen`, `unterstuetzung-finden`, `beziehungen-verstehen`): 29 von 76 bestanden, 44 «Mutation nicht anwendbar», 2 nicht erkannt. Weder Build noch CI rufen ihn auf. Die neue FAQ-Faltung hat keinen Test. | Das Gate ist der Freigabebeleg («0 Blocker»). Fällt eine Prüfregel aus, merkt es niemand. | IDs auf diese Website umstellen (nur dadurch 63/76), restliche Mutationen anpassen, Schalter `--selftest` und Aufruf in der CI. Skizze in Abschnitt 4.6. |
| W3C-08 | optional | B | `authoring/content/ueber.html` Zeile 5 («Stand: 13.10.2026») | Release C hat den Wortlaut der Erklärung zur Barrierefreiheit geändert (Konformitätssatz, «Bekannte Einschränkungen», `aria-label` am Mail-Link), das Datum blieb. | Die Erklärung soll den Stand nennen, für den sie gilt. | Datum auf den Tag der Freigabe bzw. Veröffentlichung von r4-29 setzen. Details unter 5.2. |
| W3C-09 | optional | A | entfernte Anker gegenüber r4-28 | `kommunizieren#validierung`, `kommunizieren#rollen`, `begriffe#b-set`, `selbstfuersorge#kraft-vertiefung` (plus Titel-IDs) gibt es nicht mehr. Intern verweist nichts mehr darauf (0 defekte Links), Weiterleitungen sind nicht betroffen. Alte Lesezeichen und Links aus Unterlagen landen ohne Hinweis am Seitenanfang. | Kleine Irritation bei Wiederkehrenden. | Leere Alias-Anker am neuen Ort, z. B. `<span id="validierung"></span>` vor `#anerkennen`, oder eine kleine Alias-Tabelle in `revealHashTarget`. |
| W3C-10 | optional · Profilentscheid | F | `authoring/tools/contract.js` 19 (`NAV_MAX = 6`), 159–167 | Mit 6 Hauptpunkten entsteht kein Menü. Der Kopfbereich ist bei 320×568 px 480 px hoch, die H1 beginnt bei 669 px, also unter dem ersten Bildschirm; bei 360×740 px 454 px. | Wer auf dem Smartphone eine Seite öffnet, sieht zuerst nur Navigation. | Profilentscheid prüfen: Menü unter 760 px unabhängig von der Anzahl (Kit kann das, Schwelle wäre konfigurierbar zu machen). Keine stille Änderung. |
| W3C-11 | optional | B, G | `authoring/content/*.html` (140 `aria-label` an Inhaltslinks, in Release C von 13 auf 140) | Die Linktexte sind schon sprechend; die `aria-label` («… auf der Seite X») sind für 2.4.4 nicht nötig. Sie übersteuern den sichtbaren Text, werden von Browser-Übersetzungen oft nicht übersetzt, und 94 Seitennamen sind von Hand gepflegt (heute alle gleich dem Seitentitel; 2.5.3 in 432/432 Fällen erfüllt, 50 beginnen aber nicht mit dem sichtbaren Text). | «ARIA nur, wo nötig»; Driftrisiko bei jeder Titeländerung. | Entscheiden: entweder weglassen (Kontext reicht) oder im Build erzeugen statt von Hand schreiben; mindestens eine Gate-Prüfung «Seitenname = Titel». |
| W3C-12 | optional | E | `authoring/js/interaktion.js` 267–286 (`score`); `authoring/tools/search-index.mjs` | Bei jedem Tastendruck werden alle 207 Indexeinträge neu normalisiert. Mit 6-fach gedrosselter CPU bis 184 ms je Eingabe (ungedrosselt bis 31 ms). `suche.html` ist 532 KB gross (101 KB gzip), weil der Index den vollen Abschnittstext trägt. | Spürbare Eingabeverzögerung auf einfachen Smartphones (INP-Grenze 200 ms). | Normalisierte Felder einmal beim Start in einem Array zwischenspeichern; optional Eingabe entprellen. |
| W3C-13 | optional | D, E | `authoring/css/site.css` (33 867 Zeichen Kommentar = 28 %), `interaktion.js`, `_redirects` | Interne Prüfvermerke werden öffentlich ausgeliefert («Prüfbefund BD-04 …», «Korrektur SP2-K-19 …», «gemessen …»). Keine Geheimnisse. Laut Coverage werden rund 44 % des CSS genutzt (Kit-Bundle mit Karussell, Reitern, Dialog usw.). | Unnötige öffentliche Interna und Bytes. | Kommentare beim Export entfernen (einfacher Filter in `build.mjs`, danach Parität neu erzeugen). Ungenutzte Kit-Teile nur mit Profilentscheid entfernen. |

## 4 Code-Vorschläge

Alle Vorschläge betreffen nur `authoring/`. Nichts davon ist umgesetzt. Die Tests liefen über Route-Interception bzw. in einer Kopie ausserhalb des Repositorys.

### 4.1 Suche (W3C-01 und W3C-02, wichtig)

```diff
--- a/authoring/js/interaktion.js
+++ b/authoring/js/interaktion.js
@@ -210,9 +210,9 @@
     if (!input || !results || !items.length) return;
     root.setAttribute('data-search-enhanced', '');
     function normalized(value) {
-      return String(value || '').toLocaleLowerCase('de-CH').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
+      return String(value || '').normalize('NFC').toLocaleLowerCase('de-CH').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
     }
-    var stopwords = new Set(('aber als am an auf aus bei bis brauche das dass dem den der des die darf ein eine einer einem einen er erlebt es fuer finde gefunden geht gibt hat haben helfen ich im in ist ja kann koennen lassen man mein meine meiner meinem meinen mit nach noch oder partner partnerin sage schon sich sie sind so sohn soll sprechen tochter um und uns unser unsere von vor warum was welche welcher welches wenn wer wie wir wo zu zum zur').split(' '));
+    var stopwords = new Set(('aber als am an auf aus bei bin bis brauche das dass dem den der des die darf dich dir ein eine einer einem einen er erlebt es fuer finde gefunden geht gibt hat haben helfen ich ihm ihn im in ist ja kann koennen lassen man mein meine meiner meinem meinen mich mir mit nach noch oder partner partnerin sage schon sich sie sind so sohn soll sprechen tochter um und uns unser unsere von vor warum was welche welcher welches wenn wer wie wir wo zu zum zur').split(' '));
@@ -229,7 +229,8 @@
       ['angehoerigengruppe', 'selbsthilfegruppe', 'gruppe', 'austausch'],
       ['gespraech', 'reden', 'kommunikation'],
       ['genesung', 'recovery', 'remission', 'besser', 'bessern', 'verbessern'],
-      ['kosten', 'bezahlt', 'bezahlen', 'krankenkasse', 'finanzierung']
+      ['kosten', 'bezahlt', 'bezahlen', 'krankenkasse', 'finanzierung'],
+      ['gewalt', 'gewalttaetig', 'schlaegt', 'schlagen', 'geschlagen', 'bedroht', 'bedrohen', 'bedrohung', 'angst vor ihm', 'angst vor ihr']
     ];
@@ -269,7 +270,7 @@
       var keywords = normalized(item.getAttribute('data-search-keywords'));
       var hitCount = groups.filter(function (group) { return matches(haystack, group); }).length;
-      var required = relaxed && groups.length > 1 ? Math.max(1, Math.ceil(groups.length * .6)) : groups.length;
+      var required = relaxed && groups.length > 1 ? Math.max(1, Math.min(groups.length - 1, Math.ceil(groups.length * .6))) : groups.length;
       if (hitCount < required) return -1;
```

Gemessene Wirkung des gesamten Diffs, 119 Anfragen (91 aus den bisherigen Testsätzen plus 28 neue):

- Anfragen ohne Treffer: 11 → 0.
- Geänderte Ersttreffer: 15, davon 0 aus den bisherigen Testsätzen. Beispiele: «Ich bin überfordert» → `selbstfuersorge.html#warnsignale`; «schlägt mich», «bedroht mich», «Angst vor ihm», «gewalttätig» → `grenzen.html#gewalt`; «nimmt Drogen» → `grenzen.html#riskant`.
- Nicht ideal bleibt «riskantes Verhalten» → `krise.html#selbstverletzung`. Ein Alias «riskantes verhalten» in `sectionSearchAliases` von `grenzen › riskant-title` würde es richten; das ist Aliaspflege.
- Der bekannte Punkt R27-O04 («FU» findet wegen Teilwortsuche fast alles) bleibt bestehen; «fu» steckt auch in «fuer».

Ersttreffer, die hier neu entstehen, sollten in den festgeschriebenen Suchtests (Ersttreffer, Suchintentionen) ergänzt werden, insbesondere die Gewalt- und Umlaut-Anfragen.

### 4.2 Sprungziele in eingeklappte Abschnitte (W3C-03)

```diff
--- a/authoring/js/interaktion.js
+++ b/authoring/js/interaktion.js
@@ -346,12 +346,15 @@
     try { target = document.getElementById(decodeURIComponent(window.location.hash.slice(1))); } catch (e) { return; }
     if (!target) return;
     var details = target.closest('details');
-    if (details) details.open = true;
+    var opened = false;
+    for (var d = details; d; d = d.parentElement && d.parentElement.closest('details')) { if (!d.open) { d.open = true; opened = true; } }
     var focusTarget = target.matches('summary, a, button, input, select, textarea, [tabindex]') ? target : (details ? details.querySelector('summary') : target);
     if (!focusTarget) return;
     var addedTabindex = !focusTarget.matches('summary, a, button, input, select, textarea, [tabindex]');
     if (addedTabindex) focusTarget.setAttribute('tabindex', '-1');
     window.requestAnimationFrame(function () {
+      /* Browser ohne natives Aufklappen beim Fragment-Sprung (z. B. Safari vor 26.2) scrollen nicht zum Ziel */
+      if (opened) target.scrollIntoView({ block: 'start' });
       focusTarget.focus({ preventScroll: true });
       if (addedTabindex) focusTarget.addEventListener('blur', function () { focusTarget.removeAttribute('tabindex'); }, { once: true });
     });
```

Getestet: Chromium nativ weiterhin 209/209 Ziele korrekt; Simulation ohne natives Aufklappen 30/30 eingeklappte Ziele im Sichtbereich (vorher 0/30). Weil `html{scroll-behavior:auto}` gilt, springt die Ansicht ohne Animation.

### 4.3 Validierungstabelle (W3C-04)

Markup in `authoring/content/kommunizieren.html`, Zeile 30. Reines Markup, der Wortlaut bleibt:

```html
<table class="bl-tabelle" role="table" aria-label="Sechs Stufen der Validierung mit Beispiel und Stolperstein">
  <thead role="rowgroup"><tr role="row"><th role="columnheader" scope="col">Stufe</th>…</tr></thead>
  <tbody role="rowgroup"><tr role="row"><th role="rowheader" scope="row">…</th><td role="cell" data-label="Beispiel">…</td>…</tr>…</tbody>
</table>
```

CSS in `authoring/css/site.css`, ab Zeile 1466:

```diff
-@media (max-width:760px){
+.puk-vis-tablewrap:has(> .bl-tabelle){container-type:inline-size}
+@container (max-width:36rem){
   .bl-tabelle thead{position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
   …
-  .bl-tabelle td::before{content:attr(data-label);display:block;font:var(--type-caption);color:var(--text-muted)}
+  .bl-tabelle td::before{content:attr(data-label);content:attr(data-label) / "";display:block;font:var(--type-caption);color:var(--text-muted)}
 }
```

- Die Container-Abfrage ist getestet: gestapelt bei 320, 761, 800 px und bei 200 % Text (640 und 1280 px), als Tabelle bei 640, 1024 und 1280 px; in keinem der 8 Fälle muss gescrollt werden.
- Die zweite `content`-Zeile blendet das sichtbare Label für Hilfstechnik aus. Browser ohne diese Syntax ignorieren die Zeile und behalten die erste.
- Die ARIA-Rollen und die Ausblendung des Labels sind nicht in WebKit getestet (Prüfbedarf mit VoiceOver).
- Browser ohne Container-Abfragen zeigen die Tabelle in der vorhandenen Scroll-Region.

### 4.4 Silbentrennung in Überschriften (W3C-05, Profilentscheid)

```css
@media (max-width:760px){
  .puk-web-page :is(h1,h2,h3,h4,summary,dt){-webkit-hyphens:auto;hyphens:auto}
}
/* zusätzlich bei den 7 bestehenden hyphens:auto jeweils -webkit-hyphens:auto ergänzen */
```

Nicht sichtbar prüfbar, weil diesem Chromium das Trennwörterbuch fehlt. Wirkung auf iPhone und Android kontrollieren.

### 4.5 Gate: Aufklapp-Konfiguration prüfen (W3C-06)

```diff
--- a/authoring/tools/contract.js
+++ b/authoring/tools/contract.js
@@ -406,6 +406,11 @@ function gate(cfg, files, opts = {}) {
         for (const label of ['Zielgruppe', 'Region', 'Art', 'Zugang und Kosten']) if (!body.includes(label)) add('block', pid, 'service-review', `${sid || 'Angebot'}: Pflichtangabe «${label}» fehlt`);
       }
     }
+    /* Aufklapp-Konfiguration (Release C): Jede ID muss ein Ziel haben, sonst bleibt eine als kritisch offen
+       gehaltene Antwort stillschweigend eingeklappt oder eine Vertiefung stillschweigend offen. */
+    for (const sid of p.collapsedSections || []) if (!one(doc, x => x.tag === 'section' && x.attrs.id === sid && !!up(x, y => y.tag === 'details'))) add('block', pid, 'fold-config', `collapsedSections: Abschnitt #${sid} fehlt oder ist nicht eingeklappt`);
+    for (const fid of p.openFaqIds || []) { const q = byId(doc, fid); if (!q || q.tag !== 'h3' || up(q, y => y.tag === 'details')) add('block', pid, 'fold-config', `openFaqIds: Frage #${fid} fehlt oder ist eingeklappt`); }
+    if ((p.openFaqIds || []).length && p.id !== 'fragen') add('warn', pid, 'fold-config', 'openFaqIds wirkt nur auf der Seite «fragen»');
     const h1 = all(doc, x => x.tag === 'h1'); if (h1.length !== 1) add('block', pid, 'h1', h1.length + ' h1-Elemente statt 1');
```

Getestet in der Kopie: mit der aktuellen Konfiguration 0 Blocker; mit den zwei Tippfehlern 2 Blocker. Die Ausgabe ändert sich nicht, die Parität ist also nicht betroffen. Eine passende Mutation für den Selbsttest gehört dazu (W3C-07).

### 4.6 Selbsttest lauffähig machen (W3C-07, Skizze, nicht als Ganzes getestet)

1. In `MUTATIONS` die Starter-IDs ersetzen: `behandlung-verstehen` → `behandlung`, `unterstuetzung-finden` → `unterstuetzung`, `beziehungen-verstehen` → `beziehungen`. Getestet: 63 von 76 bestehen allein dadurch.
2. Die restlichen 13 Mutationen auf vorhandenes Markup dieser Website umschreiben, zum Beispiel einen Kreislauf, eine Figur, einen eingeklappten Abschnitt oder eine Seite ohne sensibles Thema wie `impressum-datenschutz`.
3. In `build.mjs` nach dem Gate:

```js
if (args.includes("--selftest")) {
  const rows = C.selftest(config, rawPages, { exists: path => Object.hasOwn(rawPages, path) || existsSync(join(sourceDir, path)) });
  const failed = rows.filter(r => !r.ok);
  for (const r of failed) console.log("SELBSTTEST | " + r.name + " | erwartet " + r.expected + " | erhalten " + r.got);
  console.log("Selbsttest: " + (rows.length - failed.length) + " von " + rows.length + " bestanden");
  if (failed.length) process.exitCode = 1;
}
```

4. In `verify-authoring.yml` einen Schritt `node authoring/tools/build.mjs --selftest --out=dist/selftest` ergänzen.

## 5 Beurteilung der drei bekannten Punkte

### 5.1 Kurze externe Linktexte ohne `aria-label`

**Beurteilung: kein Verstoss gegen WCAG 2.4.4 (Stufe A), sondern eine Hausregel.**

2.4.4 lässt zu, dass sich der Linkzweck aus dem Linktext zusammen mit dem programmatisch bestimmbaren Kontext ergibt: Satz, Absatz, Listeneintrag, Tabellenzelle oder die vorangehende Überschrift (Techniken G53, H77, H78, H80). Statisch geprüft:

- `behandlung`: «DBT-Therapeutensuche öffnen» ist schon allein eindeutig. Der Link steht im `li` mit der H3 «DBT-Therapeutensuche, Dachverband DBT».
- `kinder`: «www.kinderseele.ch» steht im Absatz «Website: …» innerhalb eines `article` mit der H3 «Institut Kinderseele Schweiz (iks)». Ungenau ist nur, dass der Text die Domain nennt, der Link aber auf die Unterseite `/angehoerige-bekannte/beratung` führt.
- `unterstuetzung`: «www.stand-by-you.ch», «www.vaskzuerich.ch», «www.angehoerige.ch» stehen je unter einer H3 mit dem Namen der Organisation. «www.selbsthilfeschweiz.ch» hat keine eigene Überschrift; die Domain nennt aber die Organisation, und der Absatz davor spricht von «Selbsthilfe Schweiz».

Nicht erfüllt wäre nur 2.4.9 (Stufe AAA, Linkzweck allein aus dem Linktext), was nicht das Ziel ist. Wenn die Hausregel gelten soll, ist ein längerer sichtbarer Text («Website von Stand by You Schweiz») besser als ein weiteres `aria-label` (siehe W3C-11). Das Gate verlangt sprechende `aria-label` ohnehin nur bei Quellenlinks.

### 5.2 «Stand: 13.10.2026» in der Erklärung zur Barrierefreiheit

**Beurteilung: anpassen (W3C-08).** Release C hat den Wortlaut der Erklärung selbst geändert. Die aufgezählten Merkmale treffen nach Release C weiter zu:

- Skip-Link auf 46 von 46 Läufen erstes Ziel und funktionsfähig;
- Fokus an 1766 von 1766 Stopps sichtbar;
- kein Überlauf;
- Landmarken vorhanden;
- keine selbst startende Bewegung.

Das Datum sollte deshalb den Tag der Freigabe bzw. Veröffentlichung von r4-29 nennen. Die Datenschutzangaben auf `impressum-datenschutz` («Stand: 13.10.2026») brauchen keine Anpassung: Release C hat dort nur einen Impressumssatz geändert, und das gemessene Verhalten entspricht weiter dem Text (0 Fremdanfragen, 0 Cookies, kein Speicher, Suche lokal).

### 5.3 Stoppwörter «tochter» und «sohn» in der Suche

**Beurteilung: richtig so, beibehalten.** Die Suche verknüpft die Wörter mit UND, und «Tochter»/«Sohn» kommen im Text kaum vor. Wären sie Pflichtwörter, fände die Suche fast nichts. Gegenprobe mit einer Variante ohne diese zwei Stoppwörter:

| Anfrage | heute (Ersttreffer, Anzahl) | ohne Stoppwort |
| --- | --- | --- |
| Tochter 15 Borderline | `jugendliche.html`, 17 | `jugendliche.html`, 1 |
| Sohn ritzt sich | `krise.html#selbstverletzung`, 1 | keine Treffer |
| Tochter ritzt sich | `krise.html#selbstverletzung`, 1 | keine Treffer |
| meine Tochter ist 15 | `jugendliche.html`, 21 | keine Treffer |
| mein Sohn ist 16 | `jugendliche.html`, 12 | keine Treffer |
| Tochter verletzt sich | `krise.html#selbstverletzung`, 46 | keine Treffer |
| Sohn schneidet sich | `krise.html#selbstverletzung`, 1 | keine Treffer |
| Tochter volljährig | `jugendliche.html#volljaehrig`, 5 | keine Treffer |

Insgesamt: 14 Familienanfragen, heute alle mit Treffer, ohne Stoppwort 11 ohne Treffer.

Nebenwirkung: Die Familienrolle geht als Signal verloren. «Tochter Borderline» führt auf `kurz.html#borderline`, nicht auf die Elternseite. Das ist vertretbar. Wenn es gezielter sein soll, eignen sich Phrasen-Aliase (z. B. «tochter 15») besser als eine Änderung der Stoppwortliste. Dasselbe gilt für «partner» und «partnerin». Die eigentlichen Suchfehler liegen woanders (W3C-01, W3C-02).

## 6 Schnelle Verbesserungen

1. «Stand» der Erklärung zur Barrierefreiheit auf das Veröffentlichungsdatum setzen (W3C-08). Eine Zeile, nach der Freigabe.
2. Gate-Prüfung «fold-config» übernehmen (W3C-06). Ändert die Ausgabe nicht.
3. Alias-Anker für `kommunizieren#validierung` und `#rollen` setzen (W3C-09).
4. Alias «riskantes verhalten» für `grenzen › riskant-title` ergänzen (Rest aus W3C-02).
5. `-webkit-hyphens:auto` neben die 7 bestehenden `hyphens:auto` setzen (Teil von W3C-05, ohne Profiländerung).

## 7 Umsetzungsplan in Stufen

| Stufe | Inhalt | Voraussetzung | Wirkung auf `site/` |
| --- | --- | --- | --- |
| 1 · mit r4-29 | Schnelle Verbesserungen 1 bis 3 | Freigabe des Datums; Werkzeugänderung ohne Inhalt | Datum und Anker ändern die HTML-Ausgabe, «fold-config» nicht |
| 2 · nächster Patch (r4-30) | W3C-01 und W3C-02 (Suche), W3C-03 (Sprungziele), W3C-12 (Zwischenspeicher der Suche) | Suchtests neu festschreiben: 91 bisherige Anfragen plus Gewalt- und Umlaut-Anfragen; Produktions-Smoke-Test der Suche | nur `js/interaktion.js` |
| 3 · Profilentscheid | W3C-04 (Tabelle), W3C-05 (Silbentrennung), W3C-10 (Kopfbereich auf dem Smartphone), W3C-13 (ungenutzte Kit-Teile) | Entscheid im PUK Website-Profil, keine stille Profiländerung (README) | CSS, ggf. Renderer |
| 4 · Wartung | W3C-07 (Selbsttest und CI), W3C-11 (Strategie für `aria-label`), W3C-13 (Kommentare beim Export entfernen) | keine fachliche Freigabe nötig | Kommentarentfernung ändert CSS/JS-Bytes, Parität neu erzeugen |

## 8 Offene Prüfpunkte (nur im Browser, auf Geräten oder mit Screenreader prüfbar)

- **VoiceOver auf iOS/macOS (Safari):**
  - Tabellensemantik der gestapelten `.bl-tabelle` mit und ohne die vorgeschlagenen Rollen;
  - Überschriften in `<summary>` (FAQ, Begriffe): ob sie als Überschrift navigierbar bleiben;
  - Akkordeons;
  - Namen der Links mit `aria-label`.
- **NVDA mit Firefox:** dieselben Punkte.
- **Safari vor 26.2 und ältere Firefox-Versionen:** die 6 Links «Auf dieser Seite» in eingeklappte Abschnitte (W3C-03), mit und ohne Vorschlag.
- **Silbentrennung auf echten Geräten** (iPhone, Android) in Überschriften und Tabellenzellen (W3C-05).
- **Windows-Kontrastmodus real:** in der Emulation hatten 263 von 263 Fokusstopps eine Outline; die Darstellung der Abbildungen ist nicht geprüft.
- **Live-Prüfung nach dem Deploy von r4-29:** Sicherheits-Header von Netlify, Komprimierung (Brotli/gzip) und Ladezeit von `suche.html` über das Mobilnetz. Lokal ohne Komprimierung gemessen: «Fast 3G» DOMContentLoaded `index` 1,2 s, `suche` 4,4 s; das ist eine Obergrenze.
- **Externe Links mit 403 im normalen Browser öffnen** (Bot-Schutz): 5 Links auf pukzh.ch (Angehörige, Datenschutzerklärung, Persönlichkeitsstörungen Erwachsene und KJPP), ipw.ch, nhsinform.scot. Die 9 DOI-Links lösen auf die Verlagsseite auf (dort 403 für Skripte).
- **Touch-Bedienung real:** axe `target-size` ohne Verstoss, Navigation 134×44/60 px; Tippen auf Zusammenfassungen und Filterfelder auf einem Gerät prüfen.

## 9 Prüfpunkte mit Beleg

| Punkt | Ergebnis | Beleg (Seite, Datei, Zahl) |
| --- | --- | --- |
| Entwurfsbuild | bestanden | `--out=dist/w3`: 23 Seiten, 0 Blocker, 1 Hinweis «change-review» |
| Produktionsbuild (Kopie) | bestanden | `independentReview` «bestaetigt»: 23 Seiten, 0 Blocker, 0 Hinweise |
| Paritätsprüfung (Kopie) | erwartungsgemäss fehlgeschlagen | `site/` = r4-28; u. a. «neu: jugendliche.html» |
| Selbsttest des Gates | nicht wirksam | 29/76 bestanden, 44 nicht anwendbar; mit umbenannten IDs 63/76 |
| Gate bei Tippfehler in `openFaqIds`/`collapsedSections` | nicht erkannt | Kopie: 0 Blocker, «f-einweisung» eingeklappt; mit Vorschlag 2 Blocker |
| axe WCAG 2.2 AA | 0 Verstösse | 46 Läufe (23 Seiten × 320/1280 px); 7 Knoten «incomplete» color-contrast: `behandlung` 2 Pfeile mit `aria-hidden` (je Breite), `verstehen` 3 Kurvenbeschriftungen, visuell #222 auf #F7F7F7 |
| Kontrast der Tabellenbeschriftung (`::before`, axe prüft das nicht) | 5,92:1 | `kommunizieren` 320 px, rgb(100,100,100) auf #FFFFFF, 13 px |
| Überlauf | 0 | 138 Läufe: 23 Seiten × 320, 640, 1280, 640 mit offenen details, 320 mit offenen details, 320 mit Textabständen 1.4.12 |
| Im S markierte Stellen mit Platzbedarf | kein Überlauf | `grenzen#riskant`, `#kontakt`, Tabelle Stufe 5, `fragen#f-heilbar`, `#f-welche-therapie`, `begriffe#b-borderline` bei 320/640 px offen; Wortbruch siehe W3C-05 |
| 200 % Textgrösse | 1 auffällig | 46 Läufe; `kommunizieren` 1280 px: Tabellenregion 818/718 px scrollt |
| Tabelle 761–795 px | Scrollen in der Region | 761 px: Tabelle mind. 457 px, Region 427 px, `role="region"`, `tabindex="0"`, `aria-label` |
| Tabellensemantik in Chromium | erhalten | Barrierefreiheitsbaum 320 und 1280 px: table, 1 rowgroup, 7 row, 3 columnheader, 6 rowheader, 12 cell; Zellname bei 320 px «Beispiel «Ich bin da …»» |
| Tabelle im Druck | vollständig | PDF `kommunizieren` S. 4, alle 6 Stufen; Proben «Radikale Echtheit», «psychologisieren», «Stolperstein» |
| Skip-Link | 46/46 | erster Tab «Zum Hauptinhalt», Enter → `#main-content` |
| Fokus sichtbar | 1766/1766 | 46 Läufe, 15 bis 60 Stopps je Seite, alle mit `outline` oder Fokusring |
| Fokus im Kontrastmodus (Emulation) | 263/263 | 6 Seiten, `forced-colors: active`, jeder Stopp mit Outline |
| Interne Links und Sprungziele (statisch) | 0 defekt | 1133 Links, 585 mit Fragment, 209 verschiedene Ziele, 0 doppelte IDs |
| Sprungziele im Browser (Chromium) | 209/209 | 30 Ziele in `<details>`: geöffnet, Fokus auf `summary`, im Sichtbereich |
| Sprungziele ohne natives Aufklappen (Simulation) | 0/30 sichtbar, mit Vorschlag 30/30 | `pushState` + `hashchange` |
| Weiterleitungen | alle Ziele vorhanden | 88 Regeln, alle Dateien und Anker in r4-29 vorhanden |
| Entfernte Anker gegenüber r4-28 | 4 Inhaltsanker | `kommunizieren#validierung`, `#rollen`, `begriffe#b-set`, `selbstfuersorge#kraft-vertiefung`; 0 interne Verweise darauf |
| Neue Anker aus Release C | vorhanden und verlinkt | `krise#selbstverletzung`, `#krisenplan`, `diagnose#suizidalitaet`, `behandlung#keine-behandlung`, `#auskunft`, `grenzen#riskant`, `jugendliche#…` (8 Abschnitte) |
| Ohne JavaScript | Inhalte erreichbar | 69 `<details>` auf 11 Seiten, je das erste per Klick geöffnet; 4 Filter- und Suchfelder ausgeblendet; Suchverzeichnis mit 18 Links; Akkordeons offen |
| Druck | eingeklappte Inhalte vollständig | 8 Seiten × mit/ohne JS, 58 Proben, 0 fehlend; Navigation, Brotkrümel, Bereichsnavigation und Skip-Link nicht im PDF; externe URLs ausgeschrieben (`behandlung` 6, `grenzen` 3) |
| Anfragen an fremde Hosts | 0 | 46 Seitenaufrufe und alle Sucheingaben |
| Cookies und Speicher | 0 | Cookies 0, localStorage 0, sessionStorage 0, IndexedDB 0 auf 23 Seiten |
| CSP mit echten Headern | keine Verletzung | eigener Server mit `_headers`; 0 Konsolenfehler und -warnungen in 46 Läufen; das Einschleusen von axe per `addScriptTag` wurde blockiert (CSP wirkt) |
| Sicherheits-Header | vollständig | CSP, `nosniff`, `no-referrer`, Permissions-Policy, `X-Frame-Options: DENY`, `X-Robots-Tag`, HSTS (lokal ausgeliefert; live nicht geprüft) |
| `target="_blank"` | 0 | 94 externe Links |
| Externe Links | kein 404 | 91 Adressen: 52 × 200, 23 × 203 (PubMed über Proxy), 16 × 403 (Bot-Schutz; DOIs lösen auf) |
| Geheimnisse | keine | `git grep` auf Token-, Schlüssel- und Passwortmuster |
| Interne Notizen im Auslieferungsordner | vorhanden, unkritisch | CSS 33 867 Zeichen Kommentar (28 %) mit Prüfvermerken; HTML ohne Kommentare |
| Abhängigkeiten | keine | kein `package.json`; CI nur `actions/checkout@v4`, `actions/setup-node@v4` |
| Suche: Stoppwörter «tochter»/«sohn» | nützlich | 14 Familienanfragen: heute 14 mit Treffer, ohne Stoppwort 11 ohne |
| Suche: Umlaute | Fehler | «Ich bin überfordert» 0, «ueberfordert» 5; «Selbsttötung» 2, «Selbsttoetung» 37 |
| Suche: Gewalt, zwei Wörter | Fehler | «schlägt mich», «bedroht mich», «Angst vor ihm», «nimmt Drogen», «riskantes Verhalten»: je 0 |
| Suchvorschlag auf Regression | keine | 119 Anfragen, Null-Treffer 11 → 0, 0 Änderungen an 91 bisherigen Testanfragen |
| Suche: Datenschutz | erfüllt | 0 Netzwerkanfragen beim Tippen; Satz «Ihre Eingabe bleibt in Ihrem Browser» auf `suche` zutreffend |
| Suchlatenz | bis 184 ms | 6-fach gedrosselte CPU, 8 Eingaben; ungedrosselt bis 31 ms |
| Grössen | siehe W3C-12/13 | `suche.html` 532 KB/101 KB gzip; CSS 120 KB/29,6 KB; JS 23,4 KB/7,1 KB; Schriften 3 × 56–62 KB, alle drei Schnitte geladen, `font-display:swap`; CSS-Nutzung 44 % |
| Neue Seite `jugendliche` | eingebunden | Titel, Beschreibung, Open Graph, kanonischer Link; Brotkrümel «Übersicht › Alltag und Beziehungen › …»; Bereichsnavigation; 9 Suchindex-Einträge; im Suchverzeichnis; 11 Seiten verlinken darauf |
| Platzhalter E7 | 7 Seiten, je 1 | `krise`, `kurz`, `verstehen`, `diagnose`, `grenzen`, `kommunizieren`, `kinder`; `jugendliche` 0 |
| Zuständigkeitsverweis | eine feste Stelle | `renderPage` aus `site.config.responsibility` in der Fusszeile, Gate `safety-position`, 23/23 Seiten |
| FAQ-Faltung | korrekt | 27 Fragen, 25 gefaltet, offen `f-bedrohlich`, `f-einweisung`; kein `<details>` über eine Abschnittsgrenze |
| `sectionSearchAliases` | gültig | 45/45 Schlüssel zeigen auf eine Überschrift oder `summary` |
| Label in Name (2.5.3) | 432/432 | sichtbarer Text im Namen enthalten; 50 beginnen nicht damit; 94 Seitenangaben gleich dem Seitentitel |
| Wortbrüche ohne Trennstrich | 21 Stellen | 12 Seiten bei 320/360 px, 11 mit 1 bis 2 Zeichen Rest |
| Kopfbereich auf dem Smartphone | 480 px | 320×568: H1 bei 669 px; 360×740 und 390×844: 454 px |
| Reduzierte Bewegung | keine Animationen | 5 Seiten × «no-preference»/«reduce», 0 laufende Animationen |
| Typografie im sichtbaren Text | 0 Treffer | 23 Seiten: keine geraden oder deutschen Anführungszeichen, kein ß |
| Silbentrennung | nach Profilregel | `hyphens:manual` im Fliesstext, `auto` in schmalen Elementen, auch in den neuen Tabellenzellen; `lang="de-CH"` |
| 404-Seite | korrekt | `/alt/nicht/vorhanden` → Status 404, Ressourcen über absolute Pfade geladen, `noindex` |
| Werkzeug `wortbilanz.mjs` | läuft | Summe 30 666 mit Quellenblock, gleich `FREIGABE.md` |
| Zielgrössen | ohne Verstoss | axe `target-size` in 46 Läufen 0; Navigation 134×44 bzw. 60 px bei 320 px |

## 10 Was nur statisch oder nur in Chromium geprüft wurde

- **Nur statisch:**
  - Linkkontext der kurzen externen Linktexte (5.1);
  - Header-Wirkung auf Netlify;
  - Inhalt der externen Zielseiten (nur der HTTP-Status wurde abgerufen);
  - CI-Workflow;
  - Abhängigkeiten.
- **Nur in Chromium 141:**
  - Barrierefreiheitsbaum der Tabelle;
  - Deep-Link-Verhalten;
  - Druck (PDF aus Chromium);
  - Kontrastmodus (Emulation);
  - Suchlatenz.
- **Aus Quellen, nicht selbst getestet:** Safari kann `<details>` beim Fragment-Sprung erst ab 26.2 aufklappen ([WebKit Features for Safari 26.2](https://webkit.org/?p=17640), [WebKit Bug 228843](https://bugs.webkit.org/show_bug.cgi?id=228843)).
- **Nicht geprüft:**
  - Inhalte und Wortlaut (W1, W2, S);
  - rechtliche Richtigkeit der Datenschutzangaben;
  - reale Nutzende, Screenreader, Geräte.

## 11 Vermerk zum Vorgehen

- Im Repository wurde nur diese Datei angelegt. `git status` zeigt ausser ihr keine Änderung.
- Der Ausgabeordner `dist/w3` bleibt bestehen (`dist/` ist ignoriert).
- Der Aufruf `node authoring/tools/build.mjs --help` hat mangels Hilfeschalter einen Entwurfsbuild in den ebenfalls ignorierten Ordner `dist/site` geschrieben und eine dort liegende ältere Vorschau überschrieben.
- Der Produktionsbuild und alle Änderungsversuche liefen in einer Kopie ausserhalb des Repositorys.
- Keine git-Schreibbefehle, kein Zugriff auf Netlify.
