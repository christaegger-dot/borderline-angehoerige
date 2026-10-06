# Umsetzung offener Folgearbeiten vom 06.10.2026

Dieses Folgepaket basiert auf `main` nach PR #654 (`a56ed27`). Es setzt die
technisch und redaktionell überprüfbaren Folgearbeiten um. Klinische,
institutionelle, rechtliche und perspektivenbezogene Freigaben werden daraus
nicht abgeleitet. `CURRENT_PUBLICATION_STATUS` bleibt unverändert `pending`.

## Änderungen

- **Materialfassungen (#650):** Warnsignale und Spiegeln statt Aufsaugen werden
  nur als Webtext angeboten. Die sechs abweichenden PDF-/WebP-/Thumbnail-Dateien
  liegen unverändert ausserhalb des öffentlichen Verzeichnisses unter
  `qa/withheld-handouts/issue-650-content-drift-2026-10-06/`, mit README und
  SHA-256-Nachweis. Zentrale Publikations- und Downloadfilter sperren die alten
  IDs. Bestehende Tests und HTTP-Gates prüfen auch die alten URLs und alte
  Buildkopien. Eine neue Grafikfassung ist damit weder erstellt noch freigegeben.
- **Materialregister (#650):** Das deterministische
  [Dateimanifest](../../qa/handout-asset-manifest.json) erfasst 45 Governance-IDs,
  42 Textpfade und 332 beobachtete Dateien, davon 15 öffentlich. Registrierte
  Katalogpfade, Kandidatenversionen und tatsächliche Ablage bleiben getrennt.
  Für 161 historische Dateien wird keine unbelegte Familienzuordnung erfunden.
  `pnpm audit:handout-assets` prüft Pfad-/Hash-Parität, unerwartete öffentliche
  Dateien, Paketnachweise und Snapshot-Drift; CI führt den Guard vor dem Build
  aus. Zusätzlich sind die tatsächlichen Datenmodelle aller 42 Webtextfassungen
  mit SHA-256 gebunden (sortierte JSON-Objektschlüssel, unveränderte Arrayreihenfolge).
  Das beweist keine gerenderte HTML-/PDF- oder semantische Formatparität.
  Reale Freigaben stehen getrennt auf `unknown`.
- **Übungen (#648, Teil von #647):** Reaktionen werden als kontextabhängige
  Möglichkeiten verglichen. Eine einzelne «richtige» Antwort und die Sperre
  weiterer Antworten entfallen. Die didaktische Herkunft und offenen fachlichen
  sowie perspektivenbezogenen Prüfungen werden sichtbar. Auswahl, Statusansage,
  Fokus und Reset erhalten Verhaltensprüfungen; sie ersetzen keinen realen
  Screenreader-Durchgang.
- **Barrierefreiheit (#647):** WCAG 2.2 AA wird als Projektziel bezeichnet.
  Automatisierte Stichproben, technische Massnahmen und ausstehende reale
  VoiceOver-/NVDA-/Mobilgeräte- und PDF-Prüfungen sind getrennt beschrieben.
  Eine vollständige Konformität wird nicht erklärt.
- **Datenschutz und Feedback (#646):** Absolute Zusicherungen zur Weitergabe
  und zu Drittanbietern entfallen. Die Erklärung unterscheidet Code-Einbindungen,
  Hosting-Daten und E-Mail-Übermittlung. Noch ungeklärter Protokollumfang,
  Empfänger, Bearbeitungsorte, Aufbewahrung und Postfachzugriff bleiben sichtbar.
  Die Feedbackseite bittet um datenarme Website-Rückmeldungen und verweist bei
  akuten Situationen auf Soforthilfe.
- **Audit:** Der wegen Inaktivität deaktivierte GitHub-Workflow
  `audit-regression.yml` wurde wieder aktiviert. `workflow_dispatch` ermöglicht
  künftig die manuelle Wahl zwischen `smoke` und `full`; PR-Smoke und Vollcheck des
  gebauten Stands bleiben getrennt. Der Zeitkommentar bildet Winter- und
  Sommerzeit korrekt ab. Die produktive Netlify-Seite verlangt beim direkten
  Abruf einen Login (HTTP 401 mit `edge-access`-Weiterleitung). Der Vollcheck
  wird deshalb gegen einen eigenen Produktionspreview ausgeführt. Eine
  tatsächliche Live-Abnahme braucht weiterhin autorisierten Netlify-Zugriff.
  Der Vollcheck prüft 29 Routen: Overflow bei sechs Breiten und axe bei
  1280 × 800 beziehungsweise 375 × 700 Pixeln. Er ersetzt keine Prüfung aller
  interaktiven Zustände oder eine reale Hilfsmittelprüfung.
- **Fachstelle (#649):** Ein gemeinsames Profil versorgt Kontaktseite,
  Beratungsübersicht, Suche und wiederverwendete Beratungshinweise. Zugang,
  Kosten, Terminbedingungen und Vertraulichkeitsrahmen werden nicht mehr als
  aktuell bestätigte Leistungsgarantien ausgegeben. Historische Angaben und
  offene aktuelle Prüfung bleiben unterscheidbar.

## Kontakte und Berichtigung früherer Zählungen

Das tatsächliche Register umfasst **26 Telefonnummern**, nicht 27. Vor diesem
Paket waren elf Nummernabgleiche dokumentiert und 15 offen. Sechs neue Belege
führen zu **17 bestätigten Nummern und neun offenen Abgleichen**.

Der [Kontaktbelegbericht](../../qa/contact-verification-2026-10-06.md) enthält
Primärquelle, Fundstelle, Prüfdatum und engen Prüfungsumfang. Neu geprüft wurden
144, 117, 112, Elternnotruf, regionale Opferhilfe Zürich und der Empfang des
Sanatoriums Kilchberg. Nummern und `tel`-Werte wurden nicht geändert.

Alle namentlichen Zuständigkeiten bleiben offen. Die acht PUK-Kontakte und IPW
sind wegen nicht unabhängig lesbarer Primärseiten nicht bestätigt. Beim KIZ
besteht zusätzlich ein direkt belegter Widerspruch zwischen kantonaler Quelle
und Register. Dieser muss vor einer kanonischen Nummernkorrektur geklärt werden.
Der öffentliche direkte KIZ-Telefonlink wird bis dahin zurückgehalten; ein
lokaler Hinweis verweist auf die noch ungeklärte Telefonangabe und Anbieterquellen.
Ein Nummernabgleich bestätigt keine Öffnungszeiten, Zugangskriterien, Kosten,
tatsächliche Erreichbarkeit oder fachliche Freigabe.

Die Zahl **27 Materialien** aus Bericht 14 bleibt davon unabhängig korrekt.

## GitHub-Nachführung

Die offenen Issues #631, #641 und #645–#651 bleiben offen. Ihre Checklisten
werden anhand konkreter Merge- und Prüfnachweise nachgeführt. Insbesondere
werden unbelegte Erledigt-Markierungen für reale Screenreader-Prüfungen,
Perspektivenreviews, vollständige Kontaktprüfung und Publikationsfreigaben
zurückgenommen. Die ursprünglichen Befunde und unerfüllten Kriterien bleiben
nachvollziehbar.

## Weiter erforderliche externe Nachweise

- Namentliche fachliche Zuständigkeiten, klinische Prüfung, institutioneller
  Grundsatzentscheid und Publikationsfreigabe (#631/#641/#645).
- Verbindliche Datenschutzrollen, Hosting-/Postfachkonfiguration,
  Aufbewahrung, Auslandbearbeitung und rechtliche Freigabe (#646).
- Reale VoiceOver/Safari- und NVDA/Firefox-Durchgänge, reale Mobilgeräte,
  Prüfung durch Nutzende und separate PDF/UA-/Druckprüfung (#647/#650).
- Prüfung der Übungen und Lernwege aus betroffener und angehöriger
  Perspektive sowie tatsächliche Journey-/Tree-Tests (#648/#651).
- Klärung der neun offenen Nummern, insbesondere des KIZ-Quellenkonflikts,
  bestätigte Angebotsbedingungen und namentliche Pflegeverantwortung (#649).

## Weiter erforderliche redaktionelle und technische Arbeiten

- Die vollständige Claim-to-source-Matrix für medizinische und rechtliche
  Aussagen sowie das noch ungeklärte Buchjahr vervollständigen (#645).
- Lernziel, Funktion, Quellenstatus und Verknüpfung der erklärenden Modelle
  kanonisch beschreiben; Lernwege und Redundanzen danach prüfen (#651).
- Das Kontaktregister um verantwortete Ablauf-/Reviewregeln und vollständig
  geprüfte Angebotsbedingungen ergänzen (#641/#649). Die dokumentierte
  Primärbestätigung einzelner Nummern genügt dafür nicht.
- Zurückgehaltene Grafiken erst nach Text-/Formatabgleich, Quellen- und
  Perspektivenprüfung sowie separat nachgewiesener PDF-/Druckprüfung neu
  erstellen und zur konkreten Freigabe vorlegen (#650).

## Technische Prüfung

- 616 Unit-Tests in 67 Dateien, ESLint, TypeScript, Prettier und Produktionsbuild
  bestanden. Der Build enthält 15 kanonische Infografikdateien.
- Materialguard und alle sieben Manifesttests bestanden. Ein zusätzlicher
  physischer Negativtest bestätigte die Ablehnung einer unbekannten öffentlichen
  Datei; die Testdatei wurde anschliessend entfernt. Die separate strenge
  TypeScript-Prüfung der neuen QA-Skripte für ES2022 bestand.
- P1-Illustrationsaudit bestanden: drei zurückgehaltene V3-Pakete und neun
  Entwurfsassets weiterhin ausserhalb öffentlicher Auslieferung.
- Audit-Smoke: alle zehn Prüfstufen bestanden, null Issues.
- Lokaler Voll-Audit des gebauten Stands: alle 29 Routen im oben beschriebenen
  Prüfumfang bestanden, null Issues. Prüfprotokoll:
  `audit-results/followup-full-built-2026-10-06/report.md`.
- `qa/scripts/audit-followup-web.mjs`: 62 Fälle bestanden gegen den gebauten
  Express-Server. 15 geänderte Routen bei 360 × 800, 768 × 900 und
  1440 × 1000 Pixeln, zusätzliche initiale und zurückgesetzte Übungszustände,
  zehn negative Direktdatei-/Download-API-Prüfungen und Soforthilfe ohne
  JavaScript. Keine axe-Verstösse, horizontalen Überläufe oder Laufzeitfehler.
  Auswahlwechsel, Tab/Shift+Tab/Enter/Space, Fokus, Reset und erneute Auswahl
  funktionieren bei allen sechs Übungskarten. Kontrastmessungen der
  Datenschutz-Accordions erfolgen nach der Öffnungsanimation.
- Visuelle Regression: 33 Tests bestanden. Sechs Vergleichsbilder für
  Soforthilfe und Fachstelle wurden nach Sichtprüfung ihrer beabsichtigten
  Text-/Höhenänderungen aktualisiert; Spezifikation und Pixeltoleranz unverändert.

Browseremulation und automatisierte Accessibility-Prüfungen sind keine realen
Hilfsmittel- oder Nutzungstests. Die GitHub-Checks werden vor dem Merge geprüft.

Reproduzierbarer zusätzlicher Browsercheck nach `pnpm build`: gebauten Server
mit `PORT=4192 pnpm start` starten, dann
`AUDIT_BASE_URL=http://127.0.0.1:4192 node qa/scripts/audit-followup-web.mjs`.
Die lokale URL dient ausschliesslich der internen Prüfung.
