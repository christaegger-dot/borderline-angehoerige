# N59-1 bis N59-3 · r4-60 · 30.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 30.10.2026:** «Nachbesserung N59-1 bis N59-3 umsetzen».

- **Ausgangsstand:** `main` = `df7143b` (r4-59 mit Nachprüfung r4-59, PR #772, und Pendenzen, PR #774).
- **Befunde:** aus `audit-results/2026-10-30-nachpruefung-r4-59/NACHPRUEFUNG.md` (N59-1 wichtig, N59-2 und N59-3 gering). N59-4 und N59-5 sind mit PR #774 in der Pendenzendatei erledigt.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Unabhängigkeit:** Gebaut hat die Sitzung, die die Nachprüfung r4-59 verfasst hat, also die Befunde selbst gestellt hat. Die Nachprüfung von r4-60 muss eine andere Sitzung machen. Sie sollte die Grundannahme zu `aria-hidden` (Beleg 1 unten) selbst im Zugänglichkeitsbaum von Chromium nachprüfen und nicht übernehmen.

## Befunde

- **N59-1 (wichtig):** Chromium verbirgt ein Element bei jedem nicht leeren Wert von `aria-hidden` ausser `false`, auch bei `" true "`, `"yes"`, `"1"`, `"0"` oder `" false "`. Das Gate wertete nur `true` (ohne Rücksicht auf Gross- und Kleinschreibung) als verborgen. Kommentar, Selbstbericht r4-59 und Nachprüfung r4-58 sagten das Gegenteil.
- **N59-2 (gering):** Die Regel `sender` und die SVG-Prüfung in Abbildungen kannten nur `aria-hidden="true"` exakt und kein `inert`.
- **N59-3 (gering):** Ein `aria-label` oder `aria-labelledby` an einem Element *im* Direkteinstieg änderte in Chromium den Namen, das Gate meldete nichts.

## Umsetzung

Alle Änderungen in `authoring/tools/contract.js`:

- **N59-1, `ariaHidden`:** verborgen, wenn `aria-hidden` vorhanden und nicht leer ist und in Kleinschrift nicht `false` lautet. Kein Trimmen: `" false "` gilt wie in Chromium als verborgen. Leer oder ohne Wert gilt als nicht verborgen.
  - `hiddenFlag` = `hidden` oder `inert` oder `ariaHidden`. Damit gelten die Regel `concealed` (Zeile und Menü) und `accTxt` (Beschriftung ohne verborgene Teile) nach derselben Regel.
  - Der Kommentar nennt die Regel und die Messmethode (CDP, nicht `ariaSnapshot`).
- **N59-2:**
  - Regel `sender`: `hidden` nutzt `hiddenFlag`, dazu wie bisher `display:none`, `visibility:hidden` und die Klassen für versteckten Text.
  - SVG-Prüfung in Abbildungen: ausgeblendet ist ein SVG nach `ariaHidden`, am SVG oder an einem Vorfahren.
- **N59-3, `relabelled`:** blockiert auch `aria-label` oder `aria-labelledby` an einem Element im Link, wenn dieses Element nicht verborgen ist (weder selbst noch über ein Element zwischen ihm und dem Link). Ein dekoratives `<svg aria-hidden="true" aria-label="…">` im Link bleibt zulässig.
- **Fünf neue Selbsttestfälle** (109 statt 104):
  - Zeile mit `aria-hidden=" true "` → `utility-nav`;
  - Menüeintrag mit `aria-hidden="yes"` → `nav`;
  - Kopf mit `inert` → `sender`;
  - Kopf der Fehlerseite mit `aria-hidden="TRUE"` → `sender`;
  - `<span aria-label="Mehr">` im Zeilenlink → `utility-nav`.
- **Berichtigungen** (am Ende angefügt, als Berichtigung gekennzeichnet, übrige Datei unverändert):
  - `audit-results/2026-10-30-n58-1-n58-2-r4-59/BERICHT.md`;
  - `audit-results/2026-10-30-nachpruefung-r4-58/NACHPRUEFUNG.md` (N58-1 und D8).
- **Build-Kennung r4-60:** in `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`. `site/` ist neu gebaut.

Kein Wortlaut, kein Stylesheet, kein Skript und kein Renderer ist geändert.

## Wirkung

**Seiten:** Die 24 Seiten in `site/` sind bis auf die Build-Kennung byte-gleich mit r4-59. Geprüft je Seite mit `diff` nach Ersetzen der Kennung: `abweichend 0, geändert 24`. Bestand: 0 Blocker, 20 Hinweise, wie vorher. Die breitere Regel trifft also keine Stelle der heutigen Seiten.

**Neue Fälle greifen:** Die fünf Einträge in eine Kopie von `df7143b` (r4-59) eingesetzt:

```
FAIL | Zeile der Direkteinstiege mit aria-hidden=" true " verborgen (r4-60, N59-1) | erwartet: utility-nav | erhalten: crisis-number-check
FAIL | Direkteinstieg im Menü mit aria-hidden="yes" verborgen (r4-60, N59-1) | erwartet: nav | erhalten: crisis-number-check
FAIL | Kopf mit inert: Absenderin für Screenreader verborgen (r4-60, N59-2) | erwartet: sender | erhalten: utility-nav, nav, crisis-number-check
FAIL | Kopf der Fehlerseite mit aria-hidden="TRUE" (r4-60, N59-2) | erwartet: sender | erhalten: crisis-number-check
FAIL | Direkteinstieg mit aria-label an einem span im Link (r4-60, N59-3) | erwartet: utility-nav | erhalten: crisis-number-check
Selbsttest: 104/109 bestanden
```

**Mutationen** (`mutationen.mjs`, das Skript der Nachprüfung r4-59 mit 13 zusätzlichen Fällen Q1–Q13; Ausgabe `mutationen-ausgabe.txt`, gegen r4-59 und r4-60):

- **Neu blockiert, wie verlangt:**
  - `aria-hidden=" true "` und `"true "` auf Zeile, Zeilenlink, Menü-`<li>`, Menülink, Subbar und Kopf (P1.3/4, 10/11, 17/18, 24/25, 31/32, 38/39);
  - `" false "` (Q1), `"yes"` (Q3), `"0"` (Q4);
  - Absenderin verborgen: `sender` bei `TRUE`, `True`, `" true "`, `"true "` und `"yes"` auf Subbar oder Kopf, bei `inert` auf Subbar oder Kopf (P1.29–32, P1.36–39, P2.5–6, Q9) und auf der Fehlerseite (P6.3, P6.4, Q11);
  - `aria-label`/`aria-labelledby` an einem `<span>` im Link, Zeile und Menü (P5.4, Q7, Q8).
- **Neu zulässig, Falschmeldungen behoben:**
  - P4.6: `→` in `<span aria-hidden=" true ">` (in Chromium verborgen; die Beschreibung im Skript der Nachprüfung r4-59 «in Chromium nicht verborgen» ist an dieser Stelle falsch, das Ergebnis dort aber richtig eingeordnet);
  - Q12: SVG der Abbildung mit `aria-hidden="TRUE"` ergab mit r4-59 `figure-alt`, mit r4-60 nichts.
- **Gegenproben bleiben zulässig:** `aria-hidden="false"`, `"FALSE"`, leer, ohne Wert (P1.5–7 …, Q2, Q10); dekoratives `<svg aria-hidden="true" aria-label="Pfeil">` und `<span aria-hidden="true"><span aria-label="Pfeil">` im Link (Q5, Q6); E1 Rückfall ohne `utilityNav` (0 Blocker).
- **Unverändert streng:** Q13 SVG mit `aria-hidden="false"` ohne Titel → `figure-alt`, wie bisher.
- Alle übrigen Fälle ergeben dasselbe wie mit r4-59.

**Vergleich mit Chromium** (`aria.mjs`, `aria-ausgabe.txt`, CDP `Accessibility.getPartialAXTree` auf den mutierten Seiten aus `site/`): In allen geprüften neuen Fällen stimmt das Gate mit Chromium überein (verborgen ↔ Blocker, Name «Mehr» ↔ Blocker, Gegenproben im Baum mit Namen «Kurz und klar» ↔ kein Blocker). Ausnahme, bewusst streng: Q7 `<span aria-labelledby="x">` mit einer nicht vorhandenen ID ändert den Namen in Chromium nicht (`link «Kurz und klar»`), das Gate blockiert trotzdem; das entspricht der bisherigen Regel für `aria-labelledby` am Link selbst (N57-2).

**Beleg 1, Grundannahme:** `audit-results/2026-10-30-nachpruefung-r4-59/minimal-ausgabe.txt` (Chromium 153.0.8010.12): verborgen bei `true`, `TRUE`, `True`, `" true "`, `"true "`, `" true"`, Tab/Zeilenumbruch, `" false "`, `" "`, `yes`, `1`, `0`, `no`, `mixed`; im Baum bei `false`, `FALSE`, `False`, leer, ohne Attribut.

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0, Chromium 153 und Playwright 1.63.0 über `PLAYWRIGHT_MODULE`:

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel site` |
| `build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | `Selbsttest: 109/109 bestanden` |
| Suchtest (`dist/site`) | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| Sprach-/UI-Test | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0` |
| Layouttest | `240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.` `tension core exceeds 1800px` (bekannte Ausnahme B2c, Exit 1 wie bisher) |
| axe-core 4.14.0 (eigener Ordner ausserhalb des Repositorys) | `axe 4.14.0, build r4-60 · Läufe: 48 · Seiten: 24 · Verstösse: 0` |

**Nicht geprüft:** Screenreader, Safari und Firefox (wie sie `aria-hidden` mit Leerraum oder anderen Werten auswerten), reale Geräte.
