---
Datum: 2026-05-05
Zweck: Implementierungs-Brief für Claude Code — Cluster-4-Sitzung-2
Entscheide: CLUSTER-4-DECISIONS-S2-2026-05-05.md
---

# Cluster 4 — Sitzung 2: Implementierungs-Brief

## Auftrag

Lies diesen Brief vollständig, dann setze die 4 Edits (A–D) um. Erstelle danach einen PR mit dem Titel `feat(cluster-4-s2): Mythen-Ergänzung, DSM-5-Glossar, Selbsttest-Intensität`.

**Scope:** 3 Dateien + 1 Test-Datei. Keine neuen Komponenten, keine neuen Routen, keine Architektur-Änderungen.

---

## Edit A — `client/src/pages/Verstehen.tsx`

**Was:** Neuen Mythos «Borderline ist dasselbe wie Trauma.» in den bestehenden Mythen-Block einfügen.

**Einfüge-Position:** Nach dem `</p>`-Abschluss des «Grenzen setzen ist lieblos.»-Blocks, vor dem `<h4>`-Tag von «Suizid direkt anzusprechen macht es schlimmer.».

**Suche diesen Kontext:**

```tsx
              <p>
                Grenzen sind kein Verrat, sondern oft die Voraussetzung dafür,
                dass Beziehung tragfähig bleibt. Sie schützen Sie selbst und
                schaffen mehr Orientierung als wechselnde Nachgiebigkeit.
              </p>
              <h4
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Suizid direkt anzusprechen macht es schlimmer.»
```

**Ersetze durch (neuen Block einfügen zwischen den beiden):**

```tsx
              <p>
                Grenzen sind kein Verrat, sondern oft die Voraussetzung dafür,
                dass Beziehung tragfähig bleibt. Sie schützen Sie selbst und
                schaffen mehr Orientierung als wechselnde Nachgiebigkeit.
              </p>
              <h4
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Borderline ist dasselbe wie Trauma.»
              </h4>
              <p>
                Viele Menschen mit Borderline haben traumatische Erfahrungen
                gemacht — das ist dokumentiert und klinisch relevant. Borderline
                und PTBS sind aber eigenständige Diagnosen mit unterschiedlichen
                Kernmerkmalen und Behandlungsansätzen. Eine PTBS-Diagnose allein
                erklärt nicht die emotionale Dysregulation, das instabile
                Selbstbild oder die Beziehungsmuster, die für Borderline
                charakteristisch sind. Beide Diagnosen können gleichzeitig
                vorliegen.{" "}
                <Link href="/begleiterkrankungen" className="editorial-link">
                  Begleiterkrankungen
                </Link>
                .
              </p>
              <h4
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Suizid direkt anzusprechen macht es schlimmer.»
```

**EvidenceNote:** Die bestehende EvidenceNote «Quellen zu Mythen, Verlauf und Geschlecht» enthält bereits `quellenLinks.zanarini1998` (Komorbidität BPS/PTBS). Kein neuer Quellen-Eintrag nötig. Ergänze in der `definition` der EvidenceNote den Hinweis auf Komorbidität: Ändere «Verlaufsstudien und eine Übersichtsarbeit zu Geschlechtsunterschieden» zu «Verlaufsstudien, eine Komorbidität-Studie und eine Übersichtsarbeit zu Geschlechtsunterschieden».

---

## Edit B — `client/src/pages/Glossar.tsx`

**Was:** DSM-5-Kriterien als optionalen Aufklapp-Block im BPS-Eintrag ergänzen.

**Schritt 1:** `GlossaryTerm` Interface um ein optionales `criteria`-Feld erweitern:

```tsx
interface GlossaryTerm {
  term: string;
  abbreviation?: string;
  category: "therapie" | "kommunikation" | "symptome" | "selbsthilfe";
  definition: string;
  example?: string;
  criteria?: {
    intro: string;
    items: string[];
  };
  relatedPage?: string;
  relatedPageTitle?: string;
}
```

**Schritt 2:** Im BPS-Eintrag das `criteria`-Feld hinzufügen (nach `example`, vor `relatedPage`):

```tsx
    criteria: {
      intro:
        "Für eine Diagnose nach DSM-5 müssen mindestens 5 der folgenden 9 Merkmale zutreffen:",
      items: [
        "Verzweifeltes Bemühen, reales oder vorgestelltes Verlassenwerden zu vermeiden",
        "Instabile und intensive zwischenmenschliche Beziehungen (abwechselnd Idealisierung und Entwertung)",
        "Instabiles Selbstbild oder instabile Selbstwahrnehmung",
        "Impulsivität in mindestens zwei potenziell selbstschädigenden Bereichen (z.B. Geldausgaben, Substanzkonsum, Sexualität, rücksichtsloses Fahren, Essanfälle)",
        "Wiederkehrende suizidale Handlungen, Drohungen oder Selbstverletzungen",
        "Ausgeprägte Stimmungsinstabilität (intensive Episoden von Dysphorie, Reizbarkeit oder Angst)",
        "Chronisches Gefühl der Leere",
        "Unangemessene, intensive Wut oder Schwierigkeiten, Wut zu kontrollieren",
        "Vorübergehende, stressabhängige paranoide Vorstellungen oder schwere dissoziative Symptome",
      ],
    },
```

**Schritt 3:** Im Render-Teil des Glossars (in der `group.terms.map`-Schleife, nach dem `{t.example && ...}`-Block) das `criteria`-Feld rendern:

```tsx
{
  t.criteria && (
    <dd>
      <details className="mt-1">
        <summary
          className="cursor-pointer uppercase"
          style={{
            ...labelStyle,
            color: "var(--accent-primary)",
          }}
        >
          DSM-5-Kriterien anzeigen
        </summary>
        <div className="mt-3 space-y-2">
          <p style={ddStyle}>{t.criteria.intro}</p>
          <ol
            className="ml-4 mt-2 space-y-1"
            style={{ ...ddStyle, listStyleType: "decimal" }}
          >
            {t.criteria.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>
      </details>
    </dd>
  );
}
```

---

## Edit C — `client/src/components/Selbsttest.tsx`

**Was:** Frage 3 von Dauer-Messung auf Intensitäts-Messung umformulieren. 3 Optionen → 4 Optionen.

**Suche:**

```tsx
  {
    id: 3,
    text: "Wie lange begleiten Sie Ihren Angehörigen schon?",
    subtext: "Dies hilft uns, passende Ressourcen zu empfehlen.",
    options: [
      {
        text: "Seit kurzem (unter 6 Monate)",
        value: "neu",
        weight: { verstehen: 6, unterstuetzen: 4 },
      },
      {
        text: "Seit einiger Zeit (6 Monate bis 2 Jahre)",
        value: "mittel",
        weight: { kommunizieren: 4, grenzen: 3, selbstfuersorge: 3 },
      },
      {
        text: "Schon lange (über 2 Jahre)",
        value: "lang",
        weight: { selbstfuersorge: 5, grenzen: 3, kommunizieren: 2 },
      },
    ],
  },
```

**Ersetze durch:**

```tsx
  {
    id: 3,
    text: "Wie intensiv war die Belastung in den letzten Wochen?",
    subtext: "Dies hilft uns, passende Ressourcen zu empfehlen.",
    options: [
      {
        text: "Kaum spürbar — ich komme gut zurecht",
        value: "niedrig",
        weight: { verstehen: 4, unterstuetzen: 4 },
      },
      {
        text: "Deutlich spürbar — es kostet mich Kraft",
        value: "mittel",
        weight: { kommunizieren: 4, grenzen: 3, selbstfuersorge: 3 },
      },
      {
        text: "Sehr stark — ich bin oft erschöpft",
        value: "hoch",
        weight: { selbstfuersorge: 6, grenzen: 3, kommunizieren: 2 },
      },
      {
        text: "Ich bin am Limit",
        value: "limit",
        weight: { selbstfuersorge: 8, krise: 3, grenzen: 2 },
      },
    ],
  },
```

---

## Edit D — `client/src/__tests__/selbsttest.test.tsx`

**Was:** Zwei Tests verwenden die alten Frage-3-Texte und müssen angepasst werden.

**Änderung 1** — Zeile ~49 und ~102: `«Wie lange begleiten Sie Ihren Angehörigen schon?»` → `«Wie intensiv war die Belastung in den letzten Wochen?»`

**Änderung 2** — Zeile ~54: Button-Text `«Seit einiger Zeit (6 Monate bis 2 Jahre)»` → `«Deutlich spürbar — es kostet mich Kraft»`

**Änderung 3** — Zeile ~106: Button-Text `«Seit kurzem (unter 6 Monate)»` → `«Kaum spürbar — ich komme gut zurecht»`

Suche und ersetze alle drei Stellen. Keine anderen Test-Änderungen nötig.

---

## Abnahme-Kriterien

- [ ] `178/178` Tests grün (oder neue Gesamtzahl, falls Tests hinzugekommen)
- [ ] Verstehen-Page: 8 Mythen-Blöcke sichtbar (vorher 7), neuer Mythos zwischen «Grenzen» und «Suizid»
- [ ] Glossar BPS-Eintrag: `<details>`-Element mit «DSM-5-Kriterien anzeigen» vorhanden und aufklappbar
- [ ] Selbsttest Frage 3: Neue Frage-Text und 4 Optionen (niedrig / mittel / hoch / limit)
- [ ] Kein TypeScript-Fehler (`tsc --noEmit`)

---

## Was nicht geändert wird

- Keine neuen Routen
- Keine neuen Komponenten
- Keine Änderungen an `quellenLinks.ts` oder `Quellen.tsx`
- Keine Änderungen an anderen Selbsttest-Fragen
- Keine Änderungen an der Glossar-Render-Logik ausser dem `criteria`-Block
