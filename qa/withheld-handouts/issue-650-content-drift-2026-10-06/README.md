# Zurückgehaltene Grafikfassungen zu Issue #650

Diese sechs Dateien wurden am 06.10.2026 unverändert aus `client/public`
hierher verschoben. Die ursprüngliche Verzeichnisstruktur ist erhalten;
`SHA256SUMS` dokumentiert die bei der Verschiebung geprüften Dateiinhalte.
Sie sind ausschliesslich historische Prüfbasis und gehören nicht zur
öffentlichen Auslieferung.

- `manus-warnsignale-v3`: PDF, WebP und Thumbnail verwenden eine Einteilung
  in aufeinander bezogene Belastungsbereiche. Die aktuelle Webfassung
  beschreibt dagegen unspezifische Hinweise ohne feste Belastungs- oder
  Sicherheitsstufen, ohne Ableitung einer Stressursache aus Beschwerden und
  mit unabhängig davon zugänglicher Unterstützung und fachlicher Abklärung.
- `manus-spiegeln-statt-aufsaugen-v3`: PDF, WebP und Thumbnail verwenden
  unter anderem «Ich sehe dein Gefühl». Die aktuelle Webfassung trennt
  Beobachtung und Vermutung und bietet eine Rückfrage statt der sicheren
  Zuschreibung eines inneren Zustands an.

Beide Einträge in `handoutGovernance.ts` sind `text-only`. Die aktuellen
Webtexte bleiben unter `/materialien/text/warnsignale` und
`/materialien/text/spiegeln-statt-aufsaugen` erreichbar. Die sechs alten
Dateipfade sind zusätzlich als `retiredAssetSources` registriert.
Download-Endpunkte liefern für die zurückgehaltenen Materialien keine
Dateien; der Build entfernt auch alte Kopien aus einem vorhandenen
Ausgabeverzeichnis.

Dieser Schritt erzeugt weder neue Grafiken noch eine fachliche oder
institutionelle Freigabe. Eine zukünftige Grafikfassung braucht eine
gemeinsame Prüfung von Webtext, PDF, WebP, Thumbnail und Textalternative;
die hier archivierten Dateien dürfen nicht einfach wieder nach `public`
kopiert werden.
