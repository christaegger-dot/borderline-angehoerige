# Bereinigung der Pendenzen · 26.11.2026 · Selbstprüfung

**Auftrag von Christa Egger, 26.11.2026:** «einverstanden, leg los» auf den Vorschlag, die Pendenzendatei zu bereinigen, das Gate für die Direkteinstiege im Menü (N51-1, N52-2) anzugehen und die alten offenen Pull Requests aufzuräumen.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung), keine unabhängige Prüfung und keine fachliche Freigabe. Gebaut hat die Sitzung, die #809, #813, #815, #822 und #824 gebaut hat.

- **Ausgangsstand:** `main` bei `04fecbb` (Website r4-71).
- **Umgebung:** Node 22.23.5, Playwright 1.64.0, Chrome Headless Shell 156.0.8078.4.
- **Website:** unverändert. `site/` und die Kennung r4-71 bleiben.

## 1. Direkteinstiege im Menü

- **N51-1 und N52-2 waren schon erledigt:** N51-1 mit r4-52 (`needsMenuUtility`, Selbsttestfall «Direkteinstiege im Menü fehlen (r4-52, N51-1)»), N52-2 mit r4-54 (Selbsttestfall «Zeile und Menüeinträge der Direkteinstiege fehlen (r4-54, N52-2)»). Die Tabellen der Nachprüfungen führten beide noch als offen.
- **Lücke seit r4-71:** Das Gate prüft das HTML. Ob die Direkteinstiege am Telefon sichtbar erreichbar sind, entscheidet seit r4-71 das Stylesheet (mit Skript stehen sie bis 760 px nur im Menü).
- **Neu in `authoring/tools/layouttest.cjs`:** Probe «direct entries reachable» bei 375 und 320 px, je mit Standardschrift und 200 % Schrift. Alle Direkteinstiege der Zeile müssen in der Zeile oder nach dem Öffnen des Menüs sichtbar sein.

| Lauf | Ergebnis |
|---|---|
| `layouttest.cjs` auf `site/` | 240 Seitenzustände, 34 Bedienproben, 2 Abweichungen (Sicherheitskarte bei 375 × 667 und 360 × 740, wie vor dieser Änderung); die vier neuen Proben bestehen |
| Gegenprobe: Kopie von `site/` mit `.puk-site-menu__utility{display:none!important}` | 6 Abweichungen: die vier neuen Proben schlagen fehl («sichtbar: keine»), dazu die zwei bekannten |

## 2. Pendenzendatei

- Neuer Abschnitt «Offene Pendenzen im Überblick · Stand 26.11.2026» am Anfang.
- Vermerk «Bereinigung 26.11.2026» an überholten Einträgen: «Nichts unter 16 px» (entschieden mit r4-71), N61-2 und Abschnitt r4-66 (#787 gemergt am 30.10.2026), N52-2, N51-1, N49-1, R3C-A11 (Selbsttest-Teil erledigt), Nachprüfung #811 (liegt als #823 vor).
- Prüfungen mit echtem Screenreader, Safari, Firefox und realen Geräten: nach AR3-3 (Entscheid vom 13.10.2026) keine Pendenz, sondern Evidenzgrenze. Die Einträge von heute zu r4-68 und r4-71 sind entsprechend umformuliert; ältere Vermerke bleiben als historischer Stand stehen.
- Historische Texte sind nicht gelöscht.

## 3. Alte offene Pull Requests (Abgleich mit `main` bei `04fecbb`)

Geprüft mit `git merge-tree` und `git diff` gegen die gemeinsame Basis. Nichts ist gemergt oder geschlossen.

| PR | Inhalt | Merge mit `main` | Stand des Inhalts auf `main` |
|---|---|---|---|
| #793 | Nachprüfung der früheren Fassung von #787 (13 Dateien, N65-1 bis N65-6) | ohne Konflikt | fehlt |
| #799 | Nachprüfung r4-65, gemergter Stand (N65-7, N65-8) | ohne Konflikt | fehlt |
| #801 | Nachprüfung r4-65, PR #784 (N65b-1 bis N65b-3) | ohne Konflikt | fehlt |
| #800, #803, #804 | drei Nachprüfungen von r4-66 (je N66-1 bis N66-3 oder mehr) | ohne Konflikt | fehlen |
| #802 | Nachprüfung r4-67 (N67-1, N67-2) | ohne Konflikt | fehlt |
| #823 | Nachprüfung von #811 (N811-1 bis N811-7), «technisch korrekt; Nachbesserung bei Ablauf und Nachweis empfohlen, ohne Blocker» | ohne Konflikt | fehlt |
| #805 | Pendenzen: Merge von #762, Merge-Regel R65-P01 | ohne Konflikt | fehlt (R65-P01 steht nicht auf `main`) |
| #806 | Pendenzen: Abschnitt zur Nachprüfung #801 | Konflikt (Kopfzeile) | fehlt |
| #807 | Pendenzen: #797, #798, «Offen» bei r4-64 | ohne Konflikt | fehlt |
| #795 | r4-67: `inSvg` für `<foreignObject>` (N62-2), Selbsttestfälle | Konflikt (Kennung, `site/`) | fehlt; reine Werkzeugänderung |
| #713 | Entwurf vom 23.10.2026 (Kennung r4-43, seither anders vergeben): Weiterleitungen, Sprungziele, Suchregeln, offene FAQ-Antworten, Silbentrennung, Suchfelder | Konflikt | fehlt: 0 von 10 Weiterleitungen auf `krise.html#krise-schnell`, Testliste 224 statt 249 Zeilen, Link `kinder.html#schnell` auf «Kurz und klar» |

**Auffällig bei #713:** `/notfall`, `/notfallkarte` und `/soforthilfe` leiten auf `main` auf die Startseite weiter (`authoring/_redirects`). #713 lenkt sie auf den Abschnitt «Das Wichtigste» von «Krisen begleiten» um.

Über Merge, Übernahme oder Schliessen entscheidet Christa Egger.
