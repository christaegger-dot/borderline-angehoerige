# Migration zur eigenständigen Website-Bearbeitung – Prüfnachweis

**13. Oktober 2026 · PR [#671](https://github.com/christaegger-dot/borderline-angehoerige/pull/671), gemergt am 13. Oktober 2026 (Merge-Commit `14f097d`)**

## Ziel und Umsetzung
- Direkte Bearbeitung im eigenen Repository mit `authoring/content/`, `authoring/site.config.json`, `authoring/css/` und `authoring/js/`.
- Übernahme des vorhandenen Seitenrenderers, des Gate-Codes, des ursprünglichen Prüfberichts und der lokalen Assets.
- Der vorhandene Stand unter `site/` bleibt unverändert, um das Deployment nicht zu verändern.
- Netlify veröffentlicht weiterhin ausschliesslich `site/`. Es gibt keine automatische Umstellung des produktiven Builds.
- `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` trennt den aktuellen operativen Status vom historischen Prüfbericht.

## Versionsbezug
Ursprünglicher Exportstand 4a6764a; für den aktuellen veröffentlichten r4-18-Renderer und die Freigabeunterlagen mit Quellstand 2bfda22 abgeglichen.

## Technischer Nachweis
- GitHub Actions: [Standalone authoring verification, Lauf 38419378555](https://github.com/christaegger-dot/borderline-angehoerige/actions/runs/38419378555) – **bestanden**
- Befehl: `node authoring/tools/build.mjs --production --verify-site`
- Erzeugt: **22 veröffentlichte Seiten**, insgesamt **33 Dateien**
- Vollständiger byteweiser Abgleich aller Dateiinhalte gegen `site/`: **keine Unterschiede**
- Prüfung der vorhandenen Freigabe-/Strukturgates: **0 Blocker**
- 1 nicht blockierender bestehender Hinweis: möglicher Notrufnummernbezug «144» auf der Quellenseite (crisis-number-check). Dies wurde durch die Migration weder eingeführt noch redaktionell geändert.

Die technische Prüfung bestätigt Reproduzierbarkeit und Artefaktgleichheit. Sie ist **keine neue medizinisch-fachliche, redaktionelle, juristische oder Accessibility-Freigabe**. Die historischen Freigabeunterlagen bleiben auf ihre jeweiligen geprüften Stände beschränkt.

## Arbeitsregel
Künftige Änderungen zuerst unter `authoring/` bearbeiten, anschliessend unabhängig prüfen, freigeben, mit `--out=site --write-site` regenerieren und mit `--verify-site` den PR abgleichen. Keine direkte Handbearbeitung der erzeugten HTML-Dateien in `site/`.

## Weiteres Vorgehen
Die Migration ist abgeschlossen. Änderungen an veröffentlichten Inhalten werden weiterhin über kontrollierte PRs ausgeliefert. Den aktuellen Arbeitsstand führt `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`.
