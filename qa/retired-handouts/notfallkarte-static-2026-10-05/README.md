# Ausgemusterte statische Notfallkarte

Der spätere, übergreifende Entscheid zu Krisenwegen steht unter
`docs/governance/12-krisenwege-und-soforthilfe-entscheid-2026-10-06.md`. Der
hier dokumentierte dauerhafte Verzicht auf PDF-, WebP- und Thumbnail-Fassungen
bleibt unverändert gültig.

Stand: 05.10.2026

## Dauerhafte Formatentscheidung

Die Notfallkarte Zürich wird ausschliesslich als gepflegte Webfassung unter
`/notfallkarte` angeboten. Eine separate PDF-, WebP- oder Thumbnail-Fassung
wird nicht neu erstellt und nicht veröffentlicht. Damit soll verhindert
werden, dass gespeicherte oder weitergegebene Kriseninformationen ausserhalb
der Website unbemerkt veralten.

Die allgemeine Webfassung bewirbt keine Druck- oder PDF-Funktion. Eine
browserseitig ausgelöste Druckausgabe kann technisch nicht vollständig
verhindert werden, ist aber keine veröffentlichte oder versionierte Fassung.
Das davon getrennte Werkzeug `/notfallkarte/erstellen` dient persönlichen,
nutzergenerierten Einträgen und gehört nicht zu dieser statischen
Publikationsfamilie.

## Entfernte historische Dateien

Die folgenden Binärdateien wurden aus dem aktuellen Projektbestand entfernt:

- `Notfallkarte-Zuerich-Psychische-Krise.pdf`
- `notfallkarte-preview.webp`

Prüfsummen der zuletzt zurückgehaltenen Fassungen:

- PDF: `33dce11c7bee46e07e57c4b100b50b39c32dba10633627b0009ed9191447049c`
- WebP: `9561fdca4415e04ec8371c5da8bc975c16b94d182bbaec50de37ea4bdc27e563`

Die Dateien bleiben über die Git-Historie nachvollziehbar und bei Bedarf für
eine historische Prüfung rekonstruierbar. Sie dürfen nicht wieder in
`client/public` oder andere produktive Auslieferungspfade übernommen werden.
Die früheren URLs werden durch Release-Gates dauerhaft auf HTTP 404 geprüft.
