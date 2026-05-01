# Notfallkarte: Privacy-Fix

Status: als Umsetzungsanleitung für `client/src/pages/Notfallkarte.tsx` dokumentiert.

## Ziel

Die Notfallkarte speichert persönliche Einträge lokal im Browser. Für gemeinsam genutzte Geräte braucht es:

- einen sichtbaren Button `Daten löschen`
- Löschung von `localStorage` und des temporären Print-Transfers
- Rücksetzen auf leere Standarddaten
- Screenreader-Statusmeldung
- geschärften Hinweis auf gemeinsam genutzte Geräte

## Code-Bausteine

```ts
const EMPTY_DATA: NotfallkarteData = {
  personalContacts: [],
  calmingStrategies: DEFAULT_STRATEGIES,
  notes: "",
};
```

```ts
function deleteStoredData(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("notfallkarte-print-data");
    sessionStorage.removeItem("notfallkarte-print-data");
    return true;
  } catch {
    return false;
  }
}
```

```ts
const handleDeleteData = useCallback(() => {
  const confirmed = window.confirm(
    "Lokale Notfallkarten-Daten auf diesem Gerät löschen?"
  );

  if (!confirmed) return;

  if (deleteStoredData()) {
    setData(EMPTY_DATA);
    setAnnouncement("Lokale Notfallkarten-Daten wurden gelöscht.");
    setSaved(false);
  } else {
    setStorageError(true);
    setAnnouncement("Daten konnten nicht gelöscht werden.");
  }
}, []);
```

## Hinweistext

```txt
Ihre Daten bleiben auf diesem Gerät. Alle Angaben werden nur lokal in Ihrem Browser gespeichert und verlassen Ihr Gerät nicht. Auf gemeinsam genutzten Geräten können andere Personen diese Einträge sehen. Nutzen Sie «Daten löschen», wenn die Notfallkarte nicht auf diesem Gerät bleiben soll.
```
