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
