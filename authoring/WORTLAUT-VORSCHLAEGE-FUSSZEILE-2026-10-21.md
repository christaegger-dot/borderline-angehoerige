# Wortlaut-Vorschläge Fusszeile und Absenderzeile · 21.10.2026

**Status: Musterentwurf, nicht fachlich geprüft.** Die Fachstelle wählt aus, ändert oder verwirft. Erst ein ausdrücklich freigegebener Wortlaut wird in `authoring/site.config.json` eingetragen; eine Auswahl zwischen Varianten gilt nicht als Freigabe des Wortlauts.

Ziel: Die Fusszeile soll persönlicher und einladender wirken, ohne mehr zu versprechen, als die Fachstelle leistet. Sie bleibt ohne Telefonnummern, Notfallblock und pauschalen Abgrenzungssatz.

Zu beachten (bestehende Entscheide):
- Der Satz zur Beratung ist absichtlich altersinklusiv (Institutionsentscheid 13.10.2026). Keine Einschränkung auf Erwachsene.
- Die Kontaktangabe in der Fusszeile bleibt kurz; der Akutwortlaut steht nur in den Themenabschnitten (Entscheid 17.10.2026).
- Die Seiten sprechen die Lesenden mit «Sie» an, aus ihrer Sicht, ohne ihnen Gefühle zu unterstellen.

---

## 1 · Kontaktsatz in der Fusszeile
Feld: `responsibility.text` · heute: «Kostenlose und vertrauliche Beratung für Angehörige.»

| Variante | Wortlaut | Begründung |
|---|---|---|
| A (heute) | Kostenlose und vertrauliche Beratung für Angehörige. | Knapp und sachlich, nennt aber niemanden, der berät. |
| B | Sie können sich kostenlos und vertraulich von uns beraten lassen. | Direkte Anrede, «uns» macht die Fachstelle als Menschen sichtbar. |
| C | Sie können uns schreiben, auch wenn Sie Ihre Frage noch nicht genau fassen können. Die Beratung ist kostenlos und vertraulich. | Senkt die Hürde zur ersten Kontaktaufnahme. **Prüfbedarf:** Passt das zum tatsächlichen Ablauf der Beratung? |
| D | Mit Ihren Fragen und Sorgen sind Sie bei uns willkommen. Die Beratung ist kostenlos und vertraulich. | Warm, aber «Sorgen» unterstellt eventuell ein Gefühl. **Prüfbedarf: Ton.** |

## 2 · Linktext zum Beratungsangebot
Feld: `responsibility.targetLabel` · heute: «Kontakt und Beratungsangebot»

| Variante | Wortlaut |
|---|---|
| A (heute) | Kontakt und Beratungsangebot |
| B | So erreichen Sie die Fachstelle |
| C | Wie die Beratung abläuft |

## 3 · Überschrift des Kontaktblocks
Feld: `responsibility.label` · heute: «Kontakt»

| Variante | Wortlaut |
|---|---|
| A (heute) | Kontakt |
| B | Beratung für Angehörige |
| C | Sie sind nicht allein damit |

Bei C liegt **Prüfbedarf** vor: Die Variante ist eher tröstend als informierend und könnte als Floskel wirken.

## 4 · Absenderzeile im Kopf
Felder: `sender.displayLabel` / `sender.contactLabel` · heute: «Eine Orientierungshilfe der» … «Beratung:»

| Variante | Wortlaut |
|---|---|
| A (heute) | Eine Orientierungshilfe der Fachstelle Angehörigenarbeit der PUK · Beratung: angehoerigenarbeit@pukzh.ch |
| B | Eine Orientierungshilfe der Fachstelle Angehörigenarbeit der PUK · Schreiben Sie uns: angehoerigenarbeit@pukzh.ch |

Hinweis: «Eine Orientierungshilfe der» wird schmal heute ausgeblendet (CSS). Das bleibt so.

## 5 · Angaben zur Website
Feld: `footer.heading` / `footer.about` · heute: «Fachstelle Angehörigenarbeit» / «Psychiatrische Universitätsklinik Zürich»

Keine Änderung vorgeschlagen. Diese Angaben sind Absenderin und Rechtsweg und sollen sachlich bleiben.

---

## Nach der Freigabe
1. Gewählten Wortlaut in `authoring/site.config.json` eintragen; bei `responsibility` auch `reviewedBy` und `reviewedAt` nachführen.
2. Build und Gate laufen lassen, Fusszeile bei 1280 px und 360 px ansehen.
3. Im Prüfbericht vermerken, welche Variante freigegeben wurde.
