# r4-43 · Struktur- und Technikbefunde aus dem Prüfbericht vom 23.10.2026

**Stand:** Branch `claude/2026-10-23-pruefbefunde-r4-43`, Basis `main` `a7f3073` (r4-42, PR #712). Selbstprüfung der bauenden Sitzung; keine unabhängige Prüfung, keine fachliche oder rechtliche Freigabe.

**Auftrag:** Christa Egger am 23.10.2026 nach dem Prüfbericht «Prüfbericht Borderline-Website r4-41» (Durchsicht aller 23 Seiten in sechs Prüfgruppen): «Einverstanden, leg los» auf das Angebot, die Punkte umzusetzen, die ohne Wortlaut-Entscheid gehen: Weiterleitungen und Sprungziele, Suche, offene Antworten auf «Fragen», Reihenfolge auf «Kurz und klar», Silbentrennung bei grosser Schrift, Eingabefelder.

## Umgesetzt

| Befund | Änderung | Dateien |
|---|---|---|
| S3 (Startseite, NF) | Zehn Weiterleitungen der früheren Notfallkarte, des Notfallplans und von «Soforthilfe» zeigen auf `krise.html#krise-schnell` statt auf die Startseite. Die Begründung «Fusszeile enthält den Zuständigkeitsverweis» gilt seit dem 17.10.2026 nicht mehr. | `authoring/_redirects` |
| NF-04 | Drei Kinder-Weiterleitungen zeigen auf `kinder.html` statt `rolle.html#kinder`. | `authoring/_redirects` |
| KU-03 | Link «Kinder informieren und schützen» auf `kinder.html#schnell` (Schnellorientierung mit Schutzschritt). | `content/kurz.html` |
| FR-05 | «Mehr dazu» bei der Medikamentenfrage auf `behandlung.html#medikamente`; Linktext ist der Titel des Zielabschnitts «Begleiterkrankungen und Medikamente». | `content/fragen.html` |
| BU-04 | Ein Sprungziel in einem Akkordeon öffnet dessen Eintrag (z. B. `buecher.html#kritisch`); Fokus auf die Schaltfläche. | `js/interaktion.js` |
| S4 / SU-01 | «… will nicht mehr» bzw. «möchte/mag nicht mehr» am Satzende: «Wenn Suizidgedanken ein Thema sind» zuerst, «Warnsignale für Überlastung» danach. Mundart «wott nüme», «nüme läbe». Füllwörter (vom, redet, spricht, sagt …) als Stoppwörter. «Abschiedsnachricht», «vom Sterben», «redet/spricht vom Tod». Tippfehler um ein Zeichen in Suizid- und Selbstverletzungswörtern sowie «Borderline», «Therapie», «Medikament(e)», «Krisenplan», nur für Wörter, die auf der Website nicht vorkommen. «geschnitten», «es blutet» zu Selbstverletzung. | `js/interaktion.js` |
| S4 / SU-02 | «Ohrfeige», «Angst um mein Leben» zu Gewalt; «beschimpft», «schreit mich an», «beleidigt» als eigene Gruppe; «aggressiv» zu Streit. Kinder als Betroffene von Gewalt ohne Tötungswort: «Bei Eskalation …» (Kinder) zuerst, mit denselben Ausnahmen wie die bestehende Regel. Gewalt gegen «mich» ohne Tötungswort: «Wenn Gewalt oder Bedrohung vorkommt» zuerst. | `js/interaktion.js` |
| S4 / SU-03 | Leermeldung mit zweitem Link auf `krise.html#krise-schnell`. Linktext ist der freigegebene Einstieg der Startseite «Ich sorge mich um Sicherheit, Selbstgefährdung oder Gewalt.»; kein neuer Wortlaut. | `content/suche.html`, `tools/sprachtest.mjs` |
| SU-05 | «Quellen zu dieser Seite» bleibt Abschnittsgrenze, wird aber nicht mehr dem vorangehenden Abschnitt zugeschlagen. Suchwörter «Arztgeheimnis», «Berufsgeheimnis», «Zweitmeinung» als Aliase der passenden Abschnitte. | `tools/search-index.mjs`, `site.config.json` |
| SU-06, SU-09, R27-O04 | «Zwangseinweisung», «Zwangsmedikation», «gegen ihren/seinen Willen» zur FU-Gruppe; Alias «Beschwerde Rekurs Frist». «FU» und «IV» nur als ganzes Wort (nicht in «für»). «Jugendamt» zu KESB, «Notfallplan» zu Krisenplan, «Chind» zu Kind, «Mentalisieren» zu Mentalisierung. | `js/interaktion.js`, `site.config.json` |
| S8 / FR-01 | `openFaqIds` um `f-kinder`, `f-verlassen`, `f-depression` ergänzt: Diese Antworten enthalten Handlungsanleitungen für akute Lagen. Die Planzeile `v-fr-schutz` stimmt damit wieder. | `site.config.json` |
| S9 / KU-01 | «Sie sorgen sich um die Sicherheit» steht als erste von sechs Situationen (wie auf der Startseite). Wortlaut unverändert. | `content/kurz.html` |
| X1, KR-01 | Regel W-2 sinngemäss für Zwischentitel, Lesetext, Schnellorientierung und Fusszeile: Ist die Spalte schmaler als 12 em ihrer Schrift, `hyphens:auto` mit `hyphenate-limit-chars:8 4 4`. Gemessen: greift bei 320 und 375 px mit 200 % Schrift, nicht bei 100 % und nicht ab 768 px. Schnellorientierung und Akuthinweis mit weniger Innenabstand in dieser Lage (Breite des Akuthinweises bei 375 px / 200 % von 251 auf 307 px). Zähler der Kapitelübersicht ohne Umbruch zwischen den Ziffern. | `css/site.css` |
| X3 | Suchfelder in der Seitenschrift und Browser-Schriftgrösse (`font:inherit`), Hinweistext in `--text-muted` mit mindestens 4,5 : 1. | `css/site.css` |
| — | Build-Kennung r4-43 (`contract.js`, `assetVersion`), `pendingScope`, Verzicht auf die Gesamtprüfung nach dem fortgeltenden Entscheid vom 18.10.2026 mit Vermerk. | `tools/contract.js`, `site.config.json` |

## Testliste der Suche

Neu 25 Erwartungen (241 statt 216), darunter Gegenproben: «… will nicht mehr in die Therapie» bleibt bei «keine Behandlung», «Ich mag nicht mehr mit ihr streiten» und «schlafen» führen nicht auf Sicherheitsabschnitte. Eine Erwartung ist geändert: «Geheimnis» erwartete `fragen.html#weitere`; dieser Treffer entstand nur über den mitindexierten Quellenblock (Quelle BAG «Berufs- oder Arztgeheimnis»). Neu erwartet: `behandlung.html#auskunft`.

Vergleich vorher/nachher über 266 freie Anfragen der Prüfgruppe G5: Abweichungen geprüft; drei unbeabsichtigte Rückschritte («Er droht mir», «mi Bueb isch i de Klinik», «F60.3») kamen von einer zu breiten Ganzwortregel und sind behoben; zwei Erwartungen der Testliste («Wutausbruch Tochter», «Schweigepflicht») sind durch Zurücknehmen von Begriffen wieder wie vorher.

## Bewusst nicht umgesetzt (braucht einen Entscheid)

- **S1, S2:** Akutweg auf den neun Seiten ohne Akuthinweis und eine mittlere Stufe für «Dringlichkeit unklar». Platzierung und Wortlaut sind Entscheide (E7, Fusszeile vom 17.10.2026).
- **S3, zweiter Teil:** Die neun Links «Wenn Suizidgedanken ein Thema sind» springen weiter auf `krise.html#suizid`, unter den Akutblock. Umlenken auf `#krise-schnell` widerspräche dem Linktext; ein Verweis in `#suizid` wäre ein zweiter auf der Seite (E7).
- **«Krisen begleiten» in «Weitere Themen in diesem Bereich»** auf «Alltag und Beziehungen»: Informationsarchitektur, offen.
- **KR-08:** Nummerierung der Kapitelübersicht auf «Krisen begleiten».
- **Profilpunkte:** `rel="noopener noreferrer"` bei externen Links, Brotkrümel-Links 44 px.
- **Hinweistexte der Suchfelder** sind am Handy abgeschnitten, mit der grösseren Schrift etwas mehr. Kürzen wäre Wortlaut.
- Alle übrigen Befunde des Prüfberichts betreffen Wortlaut oder Fachinhalt.

## Grenzen dieser Selbstprüfung

- Silbentrennung: Die automatische Trennung folgt dem Trennmuster des Browsers. Sie trennt Zusammensetzungen nicht immer an der Wortfuge («Suizidge-danken» statt «Suizid-gedanken»); das ist dieselbe offene Gestaltungsfrage wie bei den Titeln (gierige Trennung, Grenzwert `8 4 4`). Browser ohne deutsches Trennmuster brechen wie bisher.
- Weiterleitungen mit Status 301 bleiben in Browsern, die die alte Weiterleitung schon kennen, unter Umständen zwischengespeichert.
- Kein Screenreader verfügbar. Die geänderten Suchregeln betreffen Sicherheitsanfragen; vor dem Merge wird eine Nachprüfung durch eine Sitzung empfohlen, die nicht gebaut hat.

## Technischer Stand (Selbstprüfung)

| Prüfung | Vorher (r4-42) | Nachher (r4-43) |
|---|---|---|
| Selbsttest | 84/84 | 84/84 |
| Produktionsgate | 23 Seiten · 0 Blocker · 20 Hinweise | 23 Seiten · 0 Blocker · 20 Hinweise |
| `--verify-site` Parität | 34 Dateien bytegleich | 34 Dateien bytegleich |
| Suchtest | 216/216 | 241/241 |
| Sprach-/UI-Test | 73 | 74 (neu: zweiter Link der Leermeldung) |
| Layouttest (Audit 04) | 230 Zustände, 25 Bedienproben, 1 Abweichung (Ausnahme B2c) | unverändert |
| Waagrechter Überlauf, 23 Seiten bei 1280/100, 375/100, 375/200, 320/200 % | – | 0 Fälle, 0 JS-Fehler |

Belege: `krise-schnellorientierung-375-200-vorher-nachher.png` (links r4-41: «Suizidgedan / ken» ohne Trennstrich; rechts r4-43: breitere Spalte, Trennung nach Silben), `kurz-reihenfolge-375.png`, `suche-leermeldung-375.png`, `buecher-sprung-kritisch-1280.png` (Akkordeon nach Sprung offen, Fokus auf der Schaltfläche).
