# P1-Handouts V3 · technische Nachprüfung R2

Stand: 4. Oktober 2026. Diese Nachprüfung gehört zu PR #618 und ersetzt die
frühere technische Beurteilung der PDF-Struktur. Sie ist keine institutionelle
Freigabe und kein realer Screenreader-, Nutzenden- oder Drucktest.

## Anlass

Die vertiefte Prüfung der ersten PDF/UA-Prüfkandidaten zeigte Befunde, die
veraPDF allein nicht erkennt: dekorative Vektorgruppen waren teilweise als
Inhalt getaggt, Listenmarker hatten kein `Lbl`, Seitenzahlen und Quellen waren
semantisch falsch eingeordnet, 64 Zeilenumbrüche enthielten im Inhaltsstrom
kein Leerzeichen und zwei Lesezeichentitel verloren Wortabstände. Das erste
externe Kandidatenpaket `borderline-p1-v3-pdfua-2026-10-04` ist deshalb als
überholt markiert.

## Deterministische Korrekturen

Der Generator und der fail-closed arbeitende PDF-Postprozessor leisten nun:

- ungeordnete und nummerierte Listen als `LI > Lbl + LBody`, mit
  `ListNumbering /Square` beziehungsweise `/Decimal`;
- rein dekorative, text- und bildfreie Vektorgruppen als `/Artifact /Layout`;
- ausschliesslich `Seite 1 / 1` als
  `/Artifact << /Type /Pagination /Subtype /Footer >>`;
- die externe Quellenzeile als `/BibEntry`;
- echte U+0020-Zeichen an geprüften Zeilenumbrüchen, ohne Rasteränderung;
- Lesezeichentitel aus den zugehörigen `/SE`-Überschriften;
- genau ein zugängliches Logo als `/Figure` mit dem Alternativtext
  `Psychiatrische Universitätsklinik Zürich`;
- ParentTree-, Inhaltsstrom- und Strukturbaum-Zuordnung als bijektive
  Konsistenzprüfung;
- nur das echte Dialogzitat als `/BlockQuote`; gestaltete Merksätze sind
  neutrale Hinweise.

Die drei semantischen Verträge werden beim Export und beim erneuten
Kandidatenlauf geprüft:

| Blatt                 | Layout-Artefakte | Pagination/Footer | BibEntry | BlockQuote | Figure | Lesezeichen |
| --------------------- | ---------------: | ----------------: | -------: | ---------: | -----: | ----------: |
| Radikale Akzeptanz    |                6 |                 1 |        1 |          0 |      1 |          11 |
| Wenn Gespräche kippen |                5 |                 1 |        1 |          0 |      1 |           8 |
| Beispiel-Dialog       |               11 |                 1 |        1 |          1 |      1 |          10 |

## Aktuelle Repository-PDFs

| Blatt                 | SHA-256                                                            |
| --------------------- | ------------------------------------------------------------------ |
| Radikale Akzeptanz    | `67bdbc5bd9155cd3a5175269e21d9fa6acc949a9907105e194175e6ba91b7e74` |
| Wenn Gespräche kippen | `5a21d06e0ab9d27f6e5073f87578ba61b0b70e1c8c30362edd4cf568b3e88056` |
| Beispiel-Dialog       | `2650e4ed6ee91d0457e2bdad6b2da4426e9c8039a1911500b2bfea89e436dfa7` |

Die Repository-PDFs bleiben bewusst ohne `pdfuaid:part=1`. Sie werden daher
nicht als PDF/UA-konform ausgegeben, solange die verantwortete manuelle Prüfung
und die realen Tests fehlen.

## Dauerhafte R2-Prüfkandidaten

Das neue, nicht publizierte Paket
`borderline-p1-v3-pdfua-2026-10-04-r2` liegt ausserhalb des Repository. Seine
Kandidaten tragen den PDF/UA-1-Identifier und sind gegenüber den jeweiligen
Repository-PDFs bei logischer Textextraktion, Layouttextextraktion und Raster
identisch.

| Blatt                 | Kandidaten-SHA-256                                                 |
| --------------------- | ------------------------------------------------------------------ |
| Radikale Akzeptanz    | `0a4ee16acf16dda41c026293d100be31b98faa364a9139b005c3664e9d77e0a7` |
| Wenn Gespräche kippen | `abf9bf70616c5448182e18d51c21c457755b32df630a0fb32ba7a1c927e9eb7f` |
| Beispiel-Dialog       | `06fcbedb675de0b86e3df72a0760770a4d592016351e24c554578b2abeb5a29a` |

veraPDF 1.30.0 mit erzwungenem Profil `ua1` meldet für jeden Kandidaten
106 bestandene Regeln, 0 fehlgeschlagene Regeln und 0 fehlgeschlagene Checks.
qpdf-, Text- und Rasterprüfungen sind ebenfalls bestanden. Die
maschinenlesbaren Nachweise stehen in
`pdf-preflight-v3-2026-10-04.json` und
`verapdf-ua1-candidates-v3-2026-10-04.json`.

## Visueller Testlauf auf macOS

Der nicht bildvergleichende Playwright-Test
`self-care infographic remains visible and contained` bestand in den drei
definierten Viewports Desktop, Tablet und Mobile. Die übrigen 30
Screenshot-Vergleiche waren in diesem macOS-Checkout nicht auswertbar, weil
ausschliesslich Linux-Baselines vorhanden sind und die benötigten
`*-darwin.png`-Baselines fehlen. Der Lauf ist deshalb weder als visueller
Fehler noch als bestandener Regressionstest gewertet. Es wurden keine neuen
Baselines übernommen.

## Bewusst offen

- verantwortete manuelle PDF-UA-/Matterhorn-Prüfung am R2-Kandidatenpaket;
- reales Anhören und Bedienen mit VoiceOver/Safari sowie NVDA/Firefox und
  NVDA/Acrobat;
- Tests mit Angehörigen;
- physische A4-Ausdrucke und nativer Browserdruck;
- institutioneller Publikationsentscheid.

Diese offenen menschlichen Prüfungen sind gemäss Projektentscheid kein
Merge-Kriterium für den geschützten Entwicklungsstand. Sie dürfen aber nicht
als durchgeführt oder bestanden bezeichnet werden. Massgeblich für die
manuelle Prüfung ist das [Matterhorn-Protokoll 1.1](https://pdfa.org/download-area/publications/Matterhorn-Protocol-1-1.pdf).
