# Freigabe r4-29

Am 15. Oktober 2026 erhielt die Auftraggeberin für Release C drei Unterlagen:

- `FREIGABE-VORLAGE.md`: 15 Entscheide F0 bis F14 mit genauem Wortlaut und Empfehlung, 15 Bestätigungen, neue Pendenzen, die beabsichtigten Suchänderungen und die Wortbilanz.
- `WORTLAUT.md`: der vollständige neue und bisherige Wortlaut gegenüber 02dba06.
- `RECHTSABGLEICH.md`: die unabhängige Prüfung der rechtsnahen Sätze gegen den Gesetzeswortlaut.

Wortlaut und Vorlage stehen im Commit `3ceb220` auf dem Branch `claude/release-c-r4-29-1792043306`. Gefragt war, ob sie die Fassungen im Namen der PUK freigibt, die Rechtstexte eingeschlossen. Der Rechtsdienst hat nicht geprüft. Ihre Antwort vom 15. Oktober 2026, 09:41 Uhr, wörtlich:

> «Freigegeben mit allen Empfehlungen»

Die Freigabe gilt für den Wortlaut aus Commit `3ceb220` und für die angenommenen Vorschläge F1 bis F14. Diese sind mit `ersetzungen.py` genau so umgesetzt, wie die Vorlage sie zeigt. Die Ausnahme ist F14, siehe unten.

## Entscheide mit Bedingung

| Nr. | Empfehlung in der Vorlage | Umsetzung |
| --- | --- | --- |
| F0 | Option A: Die neue Seite wird mit der Freigabe veröffentlicht, die KJPP-Abstimmung bleibt als Pendenz offen (R29-P03). «Geschwister» wird gestrichen, wenn die Fachstelle nicht bestätigt, dass auch minderjährige Geschwister beraten werden. | Option A. «Geschwister» bleibt. Die Bestätigung liegt schon vor: Der Institutionsentscheid in `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` lautet «Die Angehörigenberatung der Fachstelle ist nicht auf Erwachsene begrenzt; auch junge Angehörige werden beraten.» |
| F14 | Die Hauptfassung «läuft nicht über die Krankenkasse» nur, wenn bestätigt ist, dass die Beratung nicht über die Krankenkasse abgerechnet wird. Sonst die Ausweichfassung. | Ausweichfassung: «Die Beratung ist kostenlos; Angaben daraus gehen nicht an Krankenkassen, und sie untersteht der Schweigepflicht.» Eine Bestätigung zur Abrechnung liegt nicht vor. Der bisherige Satz geht auf die Frage im Bestand zurück: «Entstehen Kosten, und werden Informationen an eine Krankenkasse weitergegeben?» (`PRUEFBERICHT.md`, Nr. 102). Gemeint ist also die Weitergabe von Angaben, und die Ausweichfassung behält diesen Sinn. |

## Umsetzung der Freigabe

- `ersetzungen.py` hat F1 bis F14 angewendet. Danach meldet der Entwurfsbuild 0 Blocker und 1 erwarteten Hinweis («change-review»). Der Quellenabgleich ergibt 82 Einträge ohne Abweichung.
- Die Suche liefert in 91 Testanfragen dieselben 19 beabsichtigten Änderungen wie in der Vorlage.
- Wortbilanz mit Quellenblock:

  | Seite | Wörter | Ziel |
  | --- | --- | --- |
  | Zugewandt und klar sprechen | 2421 | < 2800 |
  | Ihre Rolle klären | 1981 | < 2000 |
  | Behandlung und Ihre Rolle darin | 2399 | < 2400 |
  | Auf sich achten | 2257 | < 2300 |
  | Krisen begleiten | 1792 | ≤ 1800 |
  | Grenzen setzen | 2199 | ≤ 2200 |
  | Fragen und Nachschlagen | 2397 | ≤ 2400 |
  | Wenn Ihr jugendliches Kind betroffen ist | 898 | ≤ 900 |
  | Website gesamt | 30 666 | ≤ 33 000; bisher 35 422 |

- `authoring/site.config.json`:
  - Im `visualPlan` stehen die zehn neuen Zeilen von Release C auf `freigegeben`: `v-di-suizidalitaet`, `v-gr-riskant` und acht Zeilen `v-ju-*`. `v-be-auskunft` und `v-be-keine-behandlung` waren schon freigegeben.
  - `releaseApproval.reviewedAt` ist 2026-10-15, `reviewScope` nennt die Freigabe.
  - `releaseApproval.independentReview` bleibt `ausstehend`, bis W3 und R3 abgeschlossen sind.

## Was die Freigabe nicht ersetzt

- keine juristische Prüfung der Rechtstexte; der Rechtsabgleich ist keine juristische Prüfung
- keine Abstimmung mit der KJPP (R29-P03)
- kein Code-Review W3 und kein Go/No-Go R3
- keine Prüfung mit realen Nutzenden, mit Screenreader oder auf Geräten
- keine darüber hinausgehende WCAG-, ISO-, fachmedizinische oder rechtliche Gesamtfreigabe

## Nachtrag 1 · Freigabe der W3-Korrekturen (15.10.2026, 10.57 Uhr)

Nach dem Code-Review W3 (`W3-BERICHT.md`, kein kritischer Befund, zwei wichtige) wurde die Auftraggeberin gefragt, welche W3-Korrekturen noch in r4-29 kommen. Die Frage lautete: «W3 hat keinen kritischen Befund, aber zwei wichtige in der Suche (bestehen schon live) … Welche W3-Korrekturen sollen noch in Release C (r4-29)?» Zur Auswahl standen drei Antworten:

- A: Suche und Kleines jetzt (empfohlen)
- B: nur Kleines, die Suche in r4-30
- C: nur das Datum

Ihre Antwort, wörtlich:

> «Suche und Kleines jetzt (Recommended)»

**Umgesetzt in `32afa3f`:**

| Befund | Inhalt | Sichtbar |
| --- | --- | --- |
| W3C-01 | Suche: Umlaute werden umschrieben (ä → ae, ö → oe, ü → ue, ß → ss), damit Synonyme und Stoppwörter auch bei Eingaben mit Umlaut greifen | Treffer der Suche |
| W3C-02 | Suche: Die Rückfallstufe verlangt höchstens ein Wort weniger; neues Wortfeld Gewalt und Bedrohung; Pronomen und «bin» sind Stoppwörter; Alias «riskantes Verhalten» für «Grenzen setzen» › #riskant | Treffer der Suche |
| W3C-03 | Sprungziele: Nach dem Öffnen eines `details` wird zum Ziel gescrollt (Browser ohne natives Aufklappen, z. B. Safari vor 26.2) | Verhalten |
| W3C-06 | Gate-Prüfung «fold-config» für `collapsedSections` und `openFaqIds` | nein |
| W3C-08 | Erklärung zur Barrierefreiheit: «Stand: 15.10.2026» statt «Stand: 13.10.2026» | ja, ein Datum |
| W3C-09 | Alias-Anker für Lesezeichen aus r4-28: `kommunizieren#validierung`, `kommunizieren#rollen`, `selbstfuersorge#kraft-vertiefung` | nein |

**Zurückgestellt**, je mit Begründung (neue Pendenzen R29-P09 bis R29-P15):

| Befund | Begründung |
| --- | --- |
| W3C-04 Tabelle: ARIA-Rollen, doppelte Ansage, Container-Abfrage | In Chromium bleibt die Tabellensemantik erhalten. Die Wirkung in WebKit und VoiceOver ist nicht prüfbar. Die Container-Abfrage ändert das Profil-CSS und braucht einen Profilentscheid. |
| W3C-05 Silbentrennung in Überschriften | Ändert die Profilregel «Fliesstext manual» und braucht deshalb einen Profilentscheid. Hier nicht sichtbar prüfbar, weil das Trennwörterbuch fehlt. |
| W3C-07 Selbsttest des Gates | Wartung ohne Wirkung auf die Website. Laut R3 für r4-29 vertretbar, aber als Auflage R3C-A11 mit Frist 13.11.2026. |
| W3C-10 Kopfbereich auf dem Smartphone | braucht einen Profilentscheid (`NAV_MAX`) |
| W3C-11 Strategie für `aria-label` | 2.5.3 ist in 432 von 432 Fällen erfüllt. Die Strategie (im Build erzeugen oder weglassen) ist eine Wartungsfrage. |
| W3C-12 Leistung der Suche | Nur bei 6-fach gedrosselter CPU spürbar (bis 184 ms). Kommt zusammen mit der nächsten Änderung an der Suche (r4-30). |
| W3C-13 Kommentare im ausgelieferten CSS | Keine Geheimnisse. Ein Export-Filter ändert alle Dateien und verlangt eine neue Parität. Das ist Wartung. |

## Nachtrag 2 · R3 und die Entscheide dazu (15.10.2026, 11.59 Uhr)

**Zu `independentReview`.** Im Abschnitt «Umsetzung der Freigabe» oben steht, `independentReview` bleibe «ausstehend», bis W3 und R3 abgeschlossen sind. Die bauende Sitzung hat den Wert in `a7c5ec1` schon nach W3 auf «bestaetigt» gesetzt. Das Produktionsgate blockiert sonst, und R3 prüft den Produktionsexport. Grundlage waren W2, S, der Rechtsabgleich und W3. Das weicht vom Satz oben ab. R3 hat die Abweichung als R3C-04 festgehalten. Richtig wäre gewesen, die Abweichung vor dem Export hier zu begründen.

**R3** (`R3-BERICHT.md`, eine Prüfsitzung, die nicht gebaut hat): «Go mit Auflagen», kein Punkt ist kritisch. Danach wurden der Auftraggeberin vier Fragen gestellt. Ihre Antworten, wörtlich:

| Frage | Antwort |
| --- | --- |
| R3 ergibt «Go mit Auflagen» … Nimmst du «Go mit Auflagen» an? | «Annehmen (Recommended)» |
| W1 entfällt (Release C kürzt und verschiebt geprüften Inhalt; die neuen Rechtssätze sind durch Rechtsabgleich und deine Freigabe gedeckt), R1 entfällt (keine Profilkomponente geändert; R3 hält R1 vom 13.10. für ausreichend). Bestätigst du beide? | «Beide bestätigen (Recommended)» |
| R3C-A10: Drei Links auf «Quellen» führen seit r4-27 auf Seiten mit Notrufnummer im Kopf oder Kasten … Was gilt? | «Links entfernen (Recommended)»: Die Quellenangabe bleibt als Text, die Linkregel bleibt. |
| Wann sollen die Suchlücken … und die Linkentfernung umgesetzt werden? | «r4-30 direkt nach Merge (Recommended)» |

**Umsetzung:**

- **R3C-A1:** Statustabelle in `BERICHT.md`, Abschnitt 1.
- **R3C-A2:** dieser Nachtrag. Ausserdem sind die Status in `2026-10-15-struktur-w2-r4-28/BEFUNDE.csv` nachgeführt: 22 von 23 umgesetzt, W2-017 teilweise.
- **R3C-A3:** Annahme siehe oben. `releaseApproval.reviewScope` nennt jetzt R3 und die Annahme. `releaseApproval` wird nicht gerendert; die Parität mit `site/` bleibt bestehen.
- **R3C-A4:** Am 15.10.2026 von der bauenden Sitzung mit WebFetch abgerufen. Alle drei Adressen zeigen die erwartete Seite, keine hat einen Notfallblock:
  - `https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/`: «Informationen für Angehörige»
  - `https://www.pukzh.ch/unsere-angebote/erwachsenenpsychiatrie/behandlungsschwerpunkte/persoenlichkeitsstoerungen/`: «Persönlichkeitsstörungen & interpersonelle Konflikte», nennt DBT
  - `https://www.pukzh.ch/toolbox/datenschutzerklaerung/`: «Datenschutzerklärung»

  Ein erster Abruf mit falsch ergänzter Adresse (ohne `unsere-angebote/`) lieferte die Startseite; er zählt nicht.
- **R3C-A5:** Pull Request ohne Merge; Merge nur nach abgeschlossenem Codex-Review und auf ausdrücklichen Auftrag.
- **R3C-A6:** Produktionsprüfung am Tag des Merge.
- **R3C-A7:** `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` nachgeführt.
- **R3C-A8 bis R3C-A11:** Pendenzen mit Frist. R3C-A9 (Suchlücken) und R3C-A10 (Links entfernen) kommen in r4-30 direkt nach dem Merge.
