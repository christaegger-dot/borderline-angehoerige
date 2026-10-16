# Audit 03 · Teilbericht G4

Lauf-ID `2026-10-16-modul-03-r4-35` · Gruppe G4 · unabhängige Prüfsitzung (hat die Website weder gebaut noch korrigiert).
Prüfstand: `christaegger-dot/borderline-angehoerige`, Branch `claude/a8k-korrektur-1792143386`, Commit `ff5016b` (r4-35). Im Repository nichts geändert (`git status` sauber; nur gelesen, `node authoring/tools/wortbilanz.mjs` als reine Lesezählung ausgeführt).
Seiten: `krise`, `kinder`, `jugendliche`, `selbstfuersorge`, dazu ihre Einträge in `_seitenweit.md` (Titel, Beschreibung, `primaryTask`; eine eigene `navLabel` haben die vier Seiten nicht).
Grundlagen gelesen: `AUFTRAG.md`; `.agents/skills/website-audit/SKILL.md` (Modul 03, Einheitliche Befundregeln); Leitlinien `00-sprache-und-ton.md`, `00-fachliche-qualitaet-und-haltung.md`, `00-gesamtkohaerenz-und-aufbau.md`, `06-langform-und-psychoedukation.md`; frühere Befunde A03-001 bis A03-038, A03-H01/H02, S-Review s1 bis s3, `WORTLAUT.md`, `FREIGABE.md` und `FREIGABE-VORLAGE.md` (Release C), R3C-A8 (A8-01 bis A8-11), `FREIGABE.md` r4-35.

Befunde: `G4-befunde.csv`, 19 Befunde · P0 0 · P1 0 · P2 11 · P3 8.

| Seite | P2 | P3 | Wortbilanz aller Ersatzfassungen | Wortziel |
| --- | --- | --- | --- | --- |
| krise | G4-001, -002, -003, -007 | G4-004, -005, -006 | +5 → 1797 | ≤ 1800 |
| kinder | G4-008, -009, -010 | – | +4 → 987 | kein festes Ziel (S: «nicht wachsen») |
| jugendliche | G4-011, -012 | G4-013, -014 | +2 → 900 | ≤ 900 |
| selbstfuersorge | G4-015, -016 | G4-017, -018, -019 | +2 → 2259 | < 2300 |

Wortbilanz nach der Zählregel von `wortbilanz.mjs` (Leerraum-Einheiten, mit Quellenblock), Ausgangswerte aus dem Lauf auf `ff5016b`. Abhängigkeit auf `krise`: G4-004 spart 11 Wörter. Ohne G4-004 ergeben G4-001, -003, -006 und -007 zusammen +17 und überschreiten das Ziel; dann nur eine Auswahl übernehmen.

## 1. Je Seite

### krise · «Krisen begleiten»

**Blöcke gelesen:** 116 von 116 (Lesefassung) · Sprungliste 9 von 9 (Beschriftung und 8 Einträge, aus dem HTML) · Attributtexte 8 von 8 · `aria-label` der Sprungliste 1 von 1 · Verweis im Text (gerendert aus `responsibility.inline`) 1 von 1 · Seitenweit: Titel, Beschreibung, `primaryTask`.

**Gesamturteil.** Die Seite ist sicherheitlich sorgfältig, ruhig und ohne Alarmismus: Schutz- und Hilfesätze stehen klar und direkt an jeder Stelle, an der eine akute Lage beschrieben wird, und die freigegebenen Abschnitte zu Suizidgedanken und Selbstverletzung sind präzise und laienverständlich. Sprachlich trägt sie die höchste Verneinungslast der Website; ein Teil davon sind notwendige Schutzverbote, ein anderer Teil Entlastungssätze, die die eigentliche Handlung erst am Satzende nennen (G4-005). Die Gesprächsbeispiele unter «Was Sie sagen können» klingen stellenweise nach Institution oder Übungsanleitung (G4-002), die Stufen unter «Wenn Belastung zunimmt» nach Einstufungsskala (G4-007), und der sicherheitsrelevante erste Hinweis unter «Wenn Belastung oder Gefahr bleibt» steht in Fachsprache (G4-003). Kein Befund P0 oder P1.

**Kennzahlen** (1606 Wörter, 142 Sätze; Mittel 11,3, Median 9,5; über 25 Wörter 2,8 %; bis 6 Wörter 21,8 %; verneint 33,1 %; «Sie müssen/sollten/dürfen» 4; «kann/können» 1,6 je 100 Wörter; Gedankenstriche 0; «nicht … sondern» 0; längster Satz 37).
- **Verneinung 33,1 %, höchster Wert der Website.** Rund die Hälfte sind Schutzgrenzen, die bleiben müssen («Nehmen Sie nichts aus der Hand oder gegen Widerstand weg; greifen Sie nicht körperlich ein», «Versprechen Sie keine Geheimhaltung», die Liste «Vermeiden Sie es, …»). Der Rest sind Entlastungs- und Vorbehaltssätze in Folge: «Sie müssen keine perfekten Worte finden. Keine Formulierung garantiert einen bestimmten Verlauf.», «Sie dient nicht dazu, einen einzigen Auslöser zu finden. Niemand ist verpflichtet, …», «… beweist keine Sicherheit». Jeder einzelne ist vertretbar (E9); der Eindruck «die Seite sagt vor allem, was nicht gilt» entsteht durch die Dichte. G4-005 zeigt am Abschnittsbeginn, wie dieselbe Aussage positiv gefasst werden kann.
- **Median 9,5 und 21,8 % sehr kurze Sätze** sind hier überwiegend gewollt (Kurzbox, Sicherheitssätze, Gesprächsbeispiele). Echtes Stakkato findet sich in den Stufenbeschreibungen («Kontakt und einfache Absprachen sind möglich. Alltagsschritte gelingen zumindest teilweise.», G4-007).
- **«Sie müssen/dürfen» 4:** drei entlastende «Sie müssen nicht …» («… eine Krise nicht allein …», «… keine perfekten Worte finden», «… weder … noch …») und «dürfen Sie ruhig danach fragen» (G4-001). Keine Bevormundung.
- **Längster Satz 37** ist ein Quellenvermerk; der längste Fliesstextsatz (31 Wörter) ist der Verweis in G4-004.

### kinder · «Wenn Kinder mitbetroffen sind»

**Blöcke gelesen:** 67 von 67 · Sprungliste 5 von 5 · Attributtexte 4 von 4 · `aria-label` der Sprungliste 1 von 1 · Verweis im Text 1 von 1 · Seitenweit: Titel, Beschreibung, `primaryTask`.

**Gesamturteil.** Klar gegliedert, konkret und entlastend: Die Seite sagt den Erwachsenen, was sie organisieren, und den Kindern, dass sie nicht schuld sind; die Liste zum Betreuungsplan ist eine gute, alltagstaugliche Checkliste. Der Kernsatz, dass Kinder keine Erwachsenenaufgaben tragen, kommt aber sechsmal in fast gleicher Verneinungsform vor, zweimal unmittelbar hintereinander (Absatz §3 in «Alltag und Betreuung» und Kurztext der Abbildung). Das zentrale Gesprächsbeispiel für Kinder klingt nach Broschüre (G4-008), und der Schutzabschnitt beginnt mit einem KI-typischen «Wichtig ist» und wechselt bei den Schutzschritten in die dritte Person (G4-009, G4-010). Rechts- und Schutzaussagen sind richtig gewichtet; kein Befund P0 oder P1.

**Kennzahlen** (825 Wörter, 72 Sätze; Mittel 11,5, Median 11; über 25 Wörter 2,8 %; bis 6 Wörter 20,8 %; verneint 22,2 %; «Sie müssen» 1; «kann/können» 1,3; Gedankenstriche 1; längster Satz 34).
- **Verneinung 22,2 %** geht fast ganz auf die «Kinder müssen weder … noch …»-Sätze zurück (Kurzbox, §8 «Erklären», §3 «Alltag», Kurztext und Kindkarte der Abbildung, Screenreader-Text). Siehe Abschnitt 3.
- **Längste Sätze** sind der iks-Eintrag (34 Wörter, siehe Prüfbedarf) und die Aufzählung der Anlaufstellen (28); beide sind Listen in Satzform, keine Schachtelsätze.
- **Der eine Gedankenstrich** steht in der Kindkarte («– ohne Schuld und ohne Krisenverantwortung»), die in A8-04 schon offen ist.

### jugendliche · «Wenn Ihr jugendliches Kind betroffen ist»

**Blöcke gelesen:** 45 von 45 · Sprungliste 7 von 7 · Attributtexte 6 von 6 · `aria-label` der Sprungliste 1 von 1 · Seitenweit: Titel, Beschreibung, `primaryTask`.

**Gesamturteil.** Die Seite ist knapp, sachlich und spricht Eltern erkennbar als Eltern an; Schuldentlastung, geteilte Verantwortung und die Rechtslage ab dem 18. Geburtstag sind klar und ohne Pathos formuliert. Die höchste mittlere Satzlänge der Website geht vor allem auf Verweissätze und die Bücherangaben zurück, nicht auf schwer verständliche Erklärungen. Die wichtigste Lücke ist eine für Laien: Der tragende Rechtsbegriff «urteilsfähig» bleibt unerklärt, und dass die Vertraulichkeit auch gegenüber den Eltern gilt, steht nicht ausdrücklich da (G4-011, G4-012). Wegen des Wortziels (898 von ≤ 900) sind alle Ersatzfassungen wortneutral, ausser G4-012 (+2).

**Kennzahlen** (781 Wörter, 55 Sätze; Mittel 14,2, Median 13; über 25 Wörter 7,3 %; bis 6 Wörter 10,9 %; verneint 20,0 %; «Sie dürfen» 1; «kann/können» 1,2; längster Satz 42).
- **Mittel 14,2 und 7,3 % lange Sätze, beides Höchstwerte.** Die vier langen Fliesstextsätze sind Verweise und Literaturangaben: HYPE Züri (26), Bücher (27), «Welche Regeln … steht auf der Seite …» (24) und der Doppelpunktsatz in G4-013 (30). Die Rechtssätze liegen bei 23 Wörtern und sind klar gebaut. Der längste (42) ist der ZGB-Quellenvermerk.
- **Wenig Stakkato** (10,9 % sehr kurze Sätze, niedrigster Wert der vier Seiten).
- **«dürfen Sie Grenzen setzen»** ist eine echte Erlaubnis gegenüber einem minderjährigen Kind und passt.

### selbstfuersorge · «Auf sich achten»

**Blöcke gelesen:** 159 von 159 · Sprungliste 7 von 7 · Attributtexte 6 von 6 · `aria-label` der Sprungliste 1 von 1 · Seitenweit: Titel, Beschreibung, `primaryTask`.

**Gesamturteil.** Die Seite ist zugewandt, ohne zu bevormunden: Sie nimmt Belastung ernst, betont Freiwilligkeit und sagt ehrlich, dass Selbstfürsorge strukturelle Überlastung nicht ausgleicht. Abbildung 1 mit ihrem Kurztext gehört zu den gelungensten Stellen der Website. Schwächen sind ein mehrdeutiges «Sie» am Satzanfang bei den Warnzeichen (G4-015), ein Beispielsatz, der die eigene Erreichbarkeitsgrenze im nächsten Satz wieder aufhebt (G4-016), und eine Häufung von Entlastungsformeln («nicht allein» fünfmal, «nichts falsch» zweimal). Die Gliederung «heisst / heisst nicht / heisst auch nicht» bei der radikalen Akzeptanz ist schematisch, als Lernhilfe aber vertretbar; dort schlage ich nur zwei kleine Korrekturen vor (G4-017, G4-019).

**Kennzahlen** (2048 Wörter, 188 Sätze; Mittel 10,9, Median 10; über 25 Wörter 3,2 %; bis 6 Wörter 18,1 %; verneint 21,8 %; «Sie müssen/dürfen» 6; «kann/können» 2,1; Gedankenstriche 5; längster Satz 34).
- **«Sie müssen/dürfen» 6:** vier entlastende «Sie müssen nicht …» (rund um die Uhr erreichbar sein, erst völlig erschöpft sein, besonders belastet sein, Belastung allein tragen), dazu die Listenüberschrift «Sie dürfen:» und «Sie dürfen zuerst oder ausschliesslich für sich sorgen». Das sind Erlaubnisse im eigentlichen Sinn, keine Bevormundung; die Dichte ist aber spürbar.
- **«kann/können» 2,1 je 100 Wörter** (höchster Wert der vier Seiten): «kann Kraft kosten», «kann entlasten», «kann helfen». Für Selbstfürsorge ohne Wirkungsversprechen ist das angemessen; eine Absicherungshäufung in einem einzelnen Satz habe ich nicht gefunden.
- **5 Gedankenstriche** sind ausschliesslich die Buchstabenauflösung der STOPP-Übung («S – Stopp: …»), kein KI-Einschubmuster.
- **Längste Sätze** sind Quellenvermerk (34), der Kontakte-Absatz (29) und der Grundlagen-Satz (28, A03-014).

## 2. Musterstellen (unverändert lassen)

**krise**
- «Wenn Sie sich konkret sorgen, fragen Sie ruhig und direkt, ob die Person Suizidgedanken oder einen Plan hat. Das kann helfen, die Lage zu verstehen. Zum Beispiel: «Ich mache mir Sorgen um dich. Denkst du gerade daran, dir das Leben zu nehmen?»» – klare Handlung, ehrlicher Zweck, und ein Beispielsatz, den eine Angehörige genau so sagen kann.
- «Versorgen Sie kleine Wunden mit einfacher Erster Hilfe, ohne grosses Aufheben. Bei tiefen, stark blutenden oder unklaren Verletzungen holen Sie ärztliche Hilfe, auch wenn die Person das nicht möchte.» – ruhig, konkret, mit eindeutiger Schwelle; die Dringlichkeit kommt ohne Alarmton aus.
- «Vertrauen kann Zeit und viele kleine Momente der Verlässlichkeit brauchen. Auch Abstand oder eine Veränderung der Beziehung darf Thema sein.» – zugewandt ohne Floskel, und die Selbstbestimmung der Angehörigen bleibt offen.

**kinder**
- «Kinder brauchen verständliche Worte, verlässliche Erwachsene und Schutz vor Aufgaben, die Erwachsene tragen müssen.» – eine Dreierreihe, die trägt: Jedes Glied ist ein eigener Auftrag an die Erwachsenen.
- «Bei uns ist es gerade schwer. Du hast daran keine Schuld. Heute holt dich … von der Schule ab.» – kindgerecht, wahr und sofort mit dem nächsten Alltagsschritt verbunden.
- Die Liste «Halten Sie mit den beteiligten Erwachsenen fest: wer das Kind betreut, wenn ein Elternteil ausfällt / wie diese Person erreichbar ist und wer einspringt, … / wann die Absprachen gemeinsam überprüft werden» – echte Aufzählung, konkret und ohne Verpflichtungston.

**jugendliche**
- «Holen Sie früh Unterstützung für sich selbst. Sie tragen Verantwortung für Ihr Kind, aber nicht allein.» – nimmt die elterliche Pflicht ernst und entlastet im selben Atemzug, ohne sie kleinzureden.
- «Borderline hat keine einzelne Ursache. Niemand ist schuld an der Erkrankung: weder Ihr Kind noch Sie.» – kurz, klar, nicht beschwichtigend.
- «Schildern Sie der Fachperson konkrete Beobachtungen aus dem Alltag, und fragen Sie, wie Sie einbezogen werden können.» – eine Handlung, die Eltern morgen tun können.

**selbstfuersorge**
- Kurztext von Abbildung 1: «Das Buch liegt bereit, der Tee wird kalt, und ein Teil der Aufmerksamkeit bleibt beim Telefon. Diese ständige Bereitschaft kann Kraft kosten, auch wenn nichts passiert.» – ein Bild statt einer Behauptung; Erleben wird beschrieben, nicht unterstellt.
- «Nicht jede Belastung lässt sich durch Selbstfürsorge oder eine Pause ausgleichen. Manchmal müssen sich Aufgaben oder Bedingungen ändern. Dann braucht es praktische Entlastung und Unterstützung von aussen.» – verschiebt die Verantwortung nicht auf die Lesenden.
- «Erholung kann Raum schaffen, um neu zu entscheiden, ob, wie viel und welche Unterstützung Sie geben möchten.» – Selbstbestimmung als Entscheidung, nicht als Pflicht zur Rückkehr.

## 3. Seitenübergreifende Muster

1. **Kernsatz «Kinder müssen weder … noch …» in Serie.** Auf `kinder` sechsmal (Kurzbox §4, erklaeren §8, alltag §3, Abbildung: Kurztext §7, Kindkarte §13, Screenreader-Text §19), dazu auf `krise` › bleibt §11, `jugendliche` › geschwister §3, `grenzen`, `kurz`, `rolle`. Die konkreten Aufgaben wechseln (dolmetschen, Streit schlichten, Medikamente kontrollieren), das hält die Wiederholung teilweise sinnvoll. Unnötig ist die direkte Doppelung `kinder` › alltag §3 und Kurztext §7 der Abbildung. Kein eigener Befund, weil der Wortlaut der Abbildung in A8-04 und A8-10 offen ist; bei deren Bearbeitung den Kurztext so fassen, dass er nicht §3 wiederholt (E9: ein Kernsatz pro Seite).
2. **Verweissätze, die den Linktext vorwegnehmen.** «Wie Sie Gefühle anerkennen, ohne zuzustimmen, … im Abschnitt «Anerkennen, ohne zuzustimmen»» (G4-004); ebenso «Was bei Gewalt oder Bedrohung wichtig ist, steht … im Abschnitt «Wenn Gewalt oder Bedrohung vorkommt»» (`krise` › bleibt §9), «Was Sie bei Gewalt oder Bedrohung für Ihre eigene Sicherheit tun können, …» (`kinder` › eskalation §10), «Bei Gewalt oder Bedrohung hat Sicherheit Vorrang; was dann hilft, steht dort im Abschnitt «Wenn Gewalt oder Bedrohung vorkommt»» (`jugendliche` › grenzen §4). Fortsetzung von A03-028; nur die stärkste Stelle ist als Befund aufgenommen.
3. **Entlastungsformeln.** «nicht allein» (selbstfuersorge 5×: Kurzbox, H2 «Nicht allein tragen», «das Gefühl, nicht allein zu sein», Übungsschritt 4, Beispiel; krise 2×; jugendliche 1×), «ernst nehmen» (selbstfuersorge 4×, krise 3×, jugendliche 1×), «nichts falsch» (selbstfuersorge 2×). Einzeln stimmig; gehäuft auf `selbstfuersorge` nähern sie sich der Formel «Sie sind nicht allein». Kein Einzelbefund, weil keine Stelle für sich falsch ist.
4. **Sicherheitssatz «sofort Hilfe» je Abschnitt.** Auf `krise` siebenmal in leicht wechselnder Form («sofort professionelle Hilfe», «schützen Sie sich und holen sofort Hilfe», «holen Sie sofort Hilfe und schützen sich selbst»). Das ist gewollt (E9-Ausnahme, Einstieg über Sprungmarken und Suche) und kein Befund. Bei einer späteren Überarbeitung die Reihenfolge «schützen – Hilfe holen» vereinheitlichen.
5. **Dritte Person statt Anrede in Schutzschritten.** «Erwachsene organisieren …» steht als allgemeine Regel nach einer Sie-Aufforderung mehrfach (`krise` › bleibt §11, `grenzen`, `kurz`, `rolle`) und ist dort stimmig. Problematisch nur, wo die dritte Person die Aufforderung selbst trägt (G4-010).
6. **Seitenbeschreibungen als Überschriftenliste.** `krise.description` («Während einer Krise, Suizidgedanken ansprechen, wenn Sie eine Selbstverletzung bemerken, was Sie sagen können, …») reiht acht syntaktisch verschiedene Teile; ähnlich `jugendliche.description` und `selbstfuersorge.description`. Die Texte erscheinen sichtbar im Seitenverzeichnis von `suche` und speisen den Suchindex. Das Muster gilt für die ganze Website (z. B. `behandlung`, `grenzen`, `kommunizieren`) und ist mit dem Suchtest (216 Erwartungen) verknüpft; deshalb kein Einzelbefund, sondern eine Frage an die Fachstelle, ob die Beschreibungen als Sätze gefasst werden sollen. `kinder.description` zeigt, wie es gehen kann.
7. **Doppeldeutiges «Sie» am Satzanfang.** Ein Restfall des S-Musters auf `selbstfuersorge` (G4-015). Kein weiterer Fall auf den vier Seiten; Stellen wie «Sie zeigt, was für Sie anders gilt» (`jugendliche` › kopf) oder «Sie kann viele Anläufe brauchen» (`selbstfuersorge` › akzeptanz) sind über die Verbform eindeutig.
8. **Satzzeichen nach dem Guillemet** («Nachricht.»,). Ein Fall auf meinen Seiten (G4-018); dasselbe Muster steht laut Volltextsuche auch auf `genesung`, `kommunizieren` und `verstehen` (A03-018).
9. **«Was Sie tun können:»** wird konsequent als Komponente genutzt. Zweimal folgt ein zweiter Doppelpunkt (`jugendliche` › auskunft §6, G4-013; `selbstfuersorge` › kraft §26 «Was Sie tun können: Fragen Sie sich: …»); der zweite Fall ist kurz und bleibt.
10. **Register der Gesprächsbeispiele.** Auf `krise` mischt sich Angehörigensprache mit Institutionssprache («Ich hole Unterstützung», «Wir können Unterstützung holen», «zusammen atmen»). G4-002 korrigiert die Begriffsliste; das Beispiel «Ich bin gerade auch erschrocken. Ich hole Unterstützung.» (`krise` › waehrend §9) ist sprechbar und bleibt.

Stand früherer IDs auf meinen Seiten: A03-009 (krise, «Wartefrist») erledigt · A03-010 (selbstfuersorge, Kurzbox) erledigt · A03-016 (krise, «Leisten Sie keine Aufarbeitung») erledigt · A03-014 (selbstfuersorge, Grundlagen-Satz) teilweise erledigt: von 36 auf 28 Wörter, Wirkungsvorbehalt entfallen; «Forschung zu kurzer körperlicher Beruhigung» bleibt opak, und NICE NG150 ist eine Leitlinie zur Unterstützung von betreuenden Angehörigen, nicht «für» sie – kein neuer Befund, Querverweis A03-014 · A03-H01 (Titel «Krisen begleiten») nicht neu aufgemacht · A8-04 und A8-10 (Abbildung `v-ki-alltag`) offen, hier nicht dupliziert.

## 4. Prüfbedarf

### Recht

- **G4-012, `jugendliche` › auskunft §3:** Die Ergänzung «auch gegenüber den Eltern» übernimmt den Wortlaut von `behandlung` › auskunft §12 (Rechtsabgleich Release C). Bitte bestätigen, dass sie auf `jugendliche` ohne Einschränkung gilt. Der Rechtsdienst hat Release C nicht geprüft.
- **`kinder` › eskalation §7:** «wenn die körperliche, psychische oder sexuelle Integrität eines Kindes gefährdet erscheint» folgt dem ZGB-Wortlaut (Art. 314c). «Integrität» ist für Laien schwer verständlich. Eine Vereinfachung wie «wenn ein Kind körperlich, psychisch oder sexuell gefährdet erscheint» wäre lesbarer, braucht aber eine rechtliche Bestätigung; deshalb keine Ersatzfassung.
- **`kinder` › eskalation §9 (Vertiefung «Meldepflichten»):** «wenn im eigenen Tätigkeitsrahmen keine Abhilfe möglich ist» ist Amtsdeutsch. Der Satz gibt Art. 314d zusammengefasst wieder; eine Vereinfachung würde den Kreis der Meldepflichtigen leicht verschieben. Unverändert.

### Fachlich und Haltung

- **Zuständigkeitsverweis, nur sprachlicher Hinweis (ohne Ersatzfassung):** Auf `krise` folgt der Verweis im Text direkt auf den Kurzbox-Punkt «Holen Sie bei möglicher akuter Gefahr sofort professionelle Hilfe. Warten Sie nicht auf eine Antwort der Fachstelle per E-Mail.»; auf `kinder` auf «Bei akuter Gefahr holen Erwachsene sofort Hilfe und warten nicht auf eine Beratung per E-Mail.». Beide Male steht «sofort Hilfe» zweimal hintereinander, einmal ohne und einmal mit den zuständigen Stellen. Der Verweis ist geprüfter Wortlaut; zu prüfen ist, ob der vorangehende Punkt kürzer auf ihn hinführen soll. Auf `kinder` passt nach G4-010 wenigstens die Anrede zusammen.
- **`selbstfuersorge` › kraft §42:** «Wenn Sie sich nicht mehr sicher fühlen oder nicht einschätzen können, wie dringend es ist, wenden Sie sich an professionelle Hilfe. Warten Sie nicht auf bestimmte Warnzeichen.» «sicher» ist doppeldeutig (in Sicherheit oder gewiss), «es» hat keinen Bezug, und «Warten Sie nicht auf bestimmte Warnzeichen» folgt direkt auf eine Warnzeichenliste. Der Satz betrifft die eigene Lage der Lesenden; wegen des Entscheids gegen einen Abschnitt zur eigenen Krise schlage ich keinen Wortlaut vor. Bereits als optionaler Befund im `PRUEFBERICHT.md` (C1, Lautlesetest) vermerkt.
- **`selbstfuersorge` › zu-viel §5:** «Langsames Atmen kann Anspannung beeinflussen.» lässt die Richtung offen. Wenn Zaccaro et al. (2018) und NHS (2026) es tragen, wäre «kann helfen, Anspannung zu senken» verständlicher. Das ist eine Wirkungsaussage, deshalb nur Prüfbedarf.
- **`selbstfuersorge` › akzeptanz §18 (G4-019):** «Ich kann seine/ihre Entscheidung nicht allein verändern» kann nahelegen, die Entscheidung einer urteilsfähigen erwachsenen Person lasse sich gemeinsam mit anderen ändern. Unverändert gelassen.
- **`kinder` › hilfe §5 (iks):** «Die Beratung ist online und anonym, per Telefon, Zoom oder E-Mail oder vor Ort in Winterthur und Männedorf möglich.» Offen bleibt, ob «anonym» nur für die Online-Beratung oder für alle Wege gilt; Satz 1 des Eintrags hat 34 Wörter. Die Angebotsseite liess sich nicht abrufen (robots.txt); ohne Bestätigung beim Anbieter keine Ersatzfassung, weil der Eintrag ein geprüftes Angebot mit Prüfdatum ist.
- **`kinder` › eskalation §3:** «Nicht jede überforderte Familie braucht sofort eine Meldung.» Was «Meldung» heisst (an die KESB), erfahren Quereinsteigende erst zwei Blöcke später. Mit G4-009 bleibt der Satz unverändert; ein Zusatz «an die KESB» wäre möglich, ist aber eine Schutz- und Rechtsfrage.
- **`krise` › suizid §8:** Unter «Wenn Sie eine Selbstverletzung bemerken» folgt «Wenn Selbstverletzung im Raum steht, können Sie zusätzlich fragen: …». Gemeint ist die Frage nach weiterer Selbstverletzung; die Bedingung wirkt nach dem bereits bemerkten Ereignis überflüssig. Freigegebener Sicherheitswortlaut (Release A), daher unverändert.

## 5. Nicht geprüft

- **Fachliche und rechtliche Richtigkeit** (Modul 02): nicht Gegenstand. Rechtsnahe Ersatzfassungen sind als Prüfbedarf markiert.
- **Darstellung im Browser, mobile Ansicht, Umbrüche, Screenreader-Ausgabe** (Module 04 und 05): nicht geprüft. G4-011 und G4-013 ergänzen oder behalten Inline-Links; ihre Darstellung prüft W3.
- **Suche:** Keine Ersatzfassung ändert Überschriften, IDs oder Seitenbeschreibungen. Der Fliesstext geht aber in den Suchindex ein; nach dem Einsetzen den Suchtest (`authoring/tools/suchtest.mjs`) laufen lassen. Von mir nicht ausgeführt, weil er Build-Ausgaben braucht.
- **Wortbilanz:** nach der Zählregel des Werkzeugs nachgerechnet, nicht mit eingesetztem Text gemessen. Nach dem Einsetzen `node authoring/tools/wortbilanz.mjs` laufen lassen (krise ≤ 1800, jugendliche ≤ 900).
- **Angebotsangaben** (iks): Webseite wegen robots.txt nicht abrufbar.
- **Wirkung auf reale Angehörige:** Alle Urteile zu Natürlichkeit und Ton sind Expertenurteile (Lautlesen), kein Test mit Nutzenden; entsprechend als «heuristisch» markiert, wo die Wirkung angenommen ist.
- **Andere Seiten:** nur punktuell zum Abgleich gelesen (`behandlung` › auskunft, `begriffe` › Urteilsfähigkeit, `grenzen` › Gesprächsbeispiel, `fragen` › Kinder, `verstehen` › Anspannungskurve), nicht vollständig geprüft.
