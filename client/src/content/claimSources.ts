export interface ClaimSource {
  label: string;
  url: string;
  version: string;
  scope: string;
  access: "read" | "carried-forward" | "blocked";
  checkedAt: string | null;
  accessNote: string;
}

/** Quellenabgleich ist ausdrücklich keine klinische oder rechtliche Freigabe. */
export const claimSources = {
  niceCg78: {
    label: "NICE CG78",
    url: "https://www.nice.org.uk/guidance/cg78/chapter/Recommendations",
    version: "CG78, veröffentlicht 2009; Überprüfung 30.07.2024",
    scope:
      "Britische Behandlungsleitlinie; keine Schweizer Rechts- oder Versorgungszusage.",
    access: "read",
    checkedAt: "2026-10-06",
    accessNote: "Empfehlungstext direkt gelesen, HTTP 200.",
  },
  niceNg225: {
    label: "NICE NG225",
    url: "https://www.nice.org.uk/guidance/ng225/chapter/Recommendations",
    version: "NG225, veröffentlicht 07.09.2022",
    scope:
      "Versorgung nach Selbstverletzung; Fachaufgaben, keine Risikodiagnostik durch Angehörige.",
    access: "read",
    checkedAt: "2026-10-06",
    accessNote: "Empfehlungstext direkt gelesen, HTTP 200.",
  },
  niceNg222: {
    label: "NICE NG222: Depression in adults",
    url: "https://www.nice.org.uk/guidance/ng222/chapter/Recommendations",
    version: "NG222, veröffentlicht 29.06.2022; Empfehlungen [2022]",
    scope:
      "Depressionsversorgung bei Erwachsenen; keine individuelle Suizidrisikoprognose.",
    access: "read",
    checkedAt: "2026-10-06",
    accessNote: "Empfehlungstext direkt gelesen, HTTP 200.",
  },
  niceNg150: {
    label: "NICE NG150: Supporting adult carers",
    url: "https://www.nice.org.uk/guidance/ng150/chapter/Recommendations",
    version: "NG150, veröffentlicht 22.01.2020",
    scope:
      "Erwachsene Betreuungspersonen; britischer Versorgungskontext, keine Schweizer Leistungsansprüche.",
    access: "read",
    checkedAt: "2026-10-06",
    accessNote: "Empfehlungstext direkt gelesen, HTTP 200.",
  },
  apa2024: {
    label: "APA-Behandlungsleitlinie 2024",
    url: "https://pubmed.ncbi.nlm.nih.gov/39482953/",
    version: "Keepers et al., 2024; DOI 10.1176/appi.ajp.24181010",
    scope:
      "US-Leitlinie; hier bibliografischer Nachweis und bisheriger redaktioneller Abgleich, keine Schweizer Freigabe.",
    access: "read",
    checkedAt: "2026-10-06",
    accessNote:
      "PubMed-Metadaten direkt gelesen, HTTP 200; kein neuer vollständiger Leitlinienreview.",
  },
  zgb: {
    label: "Schweizerisches Zivilgesetzbuch (SR 210)",
    url: "https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/24/233_245_233/20260701/de/html/fedlex-data-admin-ch-eli-cc-24-233_245_233-20260701-de-html-2.html",
    version: "Amtliche konsolidierte Fassung, Stand 01.07.2026",
    scope:
      "Gesetzestext; Einzelfallanwendung, kantonale Zuständigkeiten und Berufsgeheimnis müssen gesondert beurteilt werden.",
    access: "read",
    checkedAt: "2026-10-06",
    accessNote:
      "Amtlicher Text mit Artikeln 307, 314c, 314d, 328, 329, 426, 428 und 429 direkt gelesen, HTTP 200; keine juristische Freigabe.",
  },
  opferhilfeSchutz: {
    label: "Opferhilfe Schweiz: Schutz",
    url: "https://www.opferhilfe-schweiz.ch/de/was-ist-opferhilfe/schutz/",
    version:
      "Laufende offizielle Informationsseite; Seitendatum nicht ausgewiesen",
    scope:
      "Allgemeiner Schutz bei Gewalt/Bedrohung für Betroffene und Kinder; kein Borderline-spezifisches Protokoll.",
    access: "read",
    checkedAt: "2026-10-06",
    accessNote:
      "Schutzempfehlungen und Hinweis auf Polizei bei akuter Gefahr direkt gelesen, HTTP 200.",
  },
  bagBerufsgeheimnis: {
    label: "BAG: Berufs- oder Arztgeheimnis",
    url: "https://www.bag.admin.ch/de/berufs-oder-arztgeheimnis",
    version: "Laufende Informationsseite; Version nicht ausgewiesen",
    scope:
      "Allgemeine Patientenrechte und Berufsgeheimnis; Sonderfälle bedürfen Schweizer Rechtsprüfung.",
    access: "blocked",
    checkedAt: null,
    accessNote:
      "Abruf am 06.10.2026 HTTP 503; bisherige Quellenzuordnung übernommen, heute nicht neu textlich bestätigt.",
  },
  icd11: {
    label: "WHO ICD-11: klinische Diagnoseanforderungen",
    url: "https://www.who.int/publications/i/item/9789240077263",
    version: "Clinical descriptions and diagnostic requirements, 2024",
    scope:
      "ICD-11-Klassifikation; nicht identisch mit DSM-5-TR oder Schweizer stationärer Kodierung.",
    access: "blocked",
    checkedAt: null,
    accessNote:
      "Abruf am 06.10.2026 HTTP 403; bisherige Klassifikationszuordnung erhalten.",
  },
  dsm5tr: {
    label: "APA DSM-5-TR",
    url: "https://www.psychiatry.org/psychiatrists/practice/dsm",
    version:
      "Diagnostic and Statistical Manual, 5th edition, Text Revision, 2022",
    scope:
      "Klassifikation; Kriterien sind keine Selbst- oder Fremddiagnose und kein Rückschluss auf Motive.",
    access: "carried-forward",
    checkedAt: null,
    accessNote:
      "Bibliografischer Bestand; DSM-Kapitel in diesem Durchlauf nicht unabhängig vollständig gelesen.",
  },
  gunderson2018: {
    label: "Gunderson et al. 2018",
    url: "https://pubmed.ncbi.nlm.nih.gov/29795363/",
    version:
      "Borderline personality disorder; Nature Reviews Disease Primers 4, 18029 (2018)",
    scope:
      "Fachübersicht zu heterogenen Ursachen, Diagnose und Behandlung; keine individuelle Ursachenzuschreibung.",
    access: "read",
    checkedAt: "2026-10-06",
    accessNote:
      "PubMed-Abstract direkt gelesen, HTTP 200; kein neuer vollständiger Buch-/Volltextreview.",
  },
  porter2020: {
    label: "Porter et al. 2020",
    url: "https://pubmed.ncbi.nlm.nih.gov/31630389/",
    version:
      "Childhood adversity and borderline personality disorder: a meta-analysis (2020)",
    scope:
      "Zusammenhang mit Kindheitsbelastungen; weder notwendige/hinreichende Ursache noch Schuldbeleg.",
    access: "carried-forward",
    checkedAt: null,
    accessNote:
      "Korrekte bibliografische Zuordnung aus bisherigen Reviews erhalten.",
  },
  shah2018: {
    label: "Shah & Zanarini 2018",
    url: "https://pubmed.ncbi.nlm.nih.gov/30447726/",
    version:
      "Comorbidity of Borderline Personality Disorder: Current Status and Future Directions (2018)",
    scope:
      "Übersicht zu Begleiterkrankungen; keine allgemeine Häufigkeitszahl oder Einzelfalldiagnose.",
    access: "carried-forward",
    checkedAt: null,
    accessNote: "Bisheriger bibliografischer Abgleich erhalten.",
  },
  storebo2020: {
    label: "Storebø et al. 2020 (Cochrane)",
    url: "https://www.cochrane.org/evidence/CD012955_psychological-therapies-people-borderline-personality-disorder",
    version:
      "CD012955, Psychological therapies for people with borderline personality disorder (2020)",
    scope:
      "75 RCTs; häufig niedrige/sehr niedrige Evidenzsicherheit; keine verlässliche allgemeine Therapierangfolge.",
    access: "read",
    checkedAt: "2026-10-06",
    accessNote:
      "Zusammenfassung und vollständiger Review-Abstract auf offizieller Cochrane-Seite direkt gelesen, HTTP 200. Der heutige PubMed-Abruf zeigte dagegen eine Browserprüfung (HTTP 203).",
  },
  zanarini2010: {
    label: "Zanarini et al. 2010",
    url: "https://pubmed.ncbi.nlm.nih.gov/20395399/",
    version:
      "10-year prospective follow-up; DOI 10.1176/appi.ajp.2009.09081130",
    scope:
      "290 anfänglich stationär behandelte Erwachsene; 93% zweijährige Remission, 50% zweijährige studienspezifische Recovery, jeweils mindestens einmal; keine individuelle Prognose.",
    access: "read",
    checkedAt: "2026-10-06",
    accessNote:
      "PubMed-Abstract direkt gelesen, HTTP 200; bisherige genaue Zuordnung der 10-Jahres-Werte erhalten, kein neuer vollständiger Volltextreview.",
  },
  zanarini2012: {
    label: "Zanarini et al. 2012",
    url: "https://pubmed.ncbi.nlm.nih.gov/22737693/",
    version: "16-year prospective follow-up (2012)",
    scope:
      "Separates 16-Jahres-Follow-up, nicht Quelle der 10-Jahres-Werte 93%/50%.",
    access: "carried-forward",
    checkedAt: null,
    accessNote: "Bisherige Zuordnung erhalten.",
  },
  gunderson2011: {
    label: "Gunderson et al. 2011 (CLPS)",
    url: "https://pubmed.ncbi.nlm.nih.gov/21464343/",
    version: "Ten-year course of borderline personality disorder (2011)",
    scope:
      "Klinische Längsschnittstichprobe; symptomatischer und funktioneller Verlauf verschieden; keine Schweizer Prävalenz.",
    access: "carried-forward",
    checkedAt: null,
    accessNote: "Bisherige Zuordnung erhalten.",
  },
  dazzi2014: {
    label: "Dazzi et al. 2014",
    url: "https://pubmed.ncbi.nlm.nih.gov/24998511/",
    version:
      "Psychological Medicine 44(16), 3361–3363; DOI 10.1017/S0033291714001299",
    scope:
      "Übersicht: kein statistisch signifikanter Anstieg von Suizidgedanken durch Befragen in den eingeschlossenen Studien; keine Garantie für Einzelsituationen.",
    access: "read",
    checkedAt: "2026-10-06",
    accessNote:
      "PubMed-Abstract direkt gelesen, HTTP 200; keine vollständige neue systematische Recherche.",
  },
  linehan2015: {
    label: "Linehan 2015: DBT Skills Training Manual",
    url: "https://www.guilford.com/books/DBT-Skills-Training-Manual/Marsha-Linehan/9781462516995",
    version: "2. Auflage, 2015",
    scope:
      "Therapeutisches Manual; vereinfachte Übertragung auf Angehörigengespräche ist keine geprüfte Wirksamkeitszusage.",
    access: "carried-forward",
    checkedAt: null,
    accessNote:
      "Bibliografischer Bestand; kein neuer vollständiger Manualreview.",
  },
  linehan1997: {
    label: "Linehan 1997: Validation and psychotherapy",
    url: "https://doi.org/10.1037/10226-016",
    version: "Empathy Reconsidered, Kapitel S. 353–392 (1997)",
    scope:
      "Psychotherapeutisches Validierungskonzept; Gesprächsbeispiele sind redaktionelle Übertragungen.",
    access: "carried-forward",
    checkedAt: null,
    accessNote: "Bisherige bibliografische Zuordnung erhalten.",
  },
  bailey2013: {
    label: "Bailey & Grenyer 2013",
    url: "https://pubmed.ncbi.nlm.nih.gov/24651557/",
    version:
      "Burden and support needs of carers of persons with borderline personality disorder (2013)",
    scope:
      "Sechs Studien mit 465 Angehörigen; Belastung und Unterstützungsbedarf, erhebliche Forschungslücken.",
    access: "carried-forward",
    checkedAt: null,
    accessNote: "Bisherige bibliografische Zuordnung erhalten.",
  },
  eggshells2020: {
    label: "New Harbinger: Stop Walking on Eggshells, Third Edition",
    url: "https://www.newharbinger.com/9781684036899/stop-walking-on-eggshells/",
    version:
      "Englische 3. Auflage; Paperback ISBN 9781684036899; Dezember 2020",
    scope:
      "Verlagsnachweis zur konkreten englischen Ausgabe; Ratgeber, keine klinische Leitlinie.",
    access: "read",
    checkedAt: "2026-10-06",
    accessNote:
      "Offizielle Verlagsseite direkt gelesen: Third Edition / Published December 2020, HTTP 200.",
  },
  bagDolmetschen: {
    label: "BAG: Interkulturelles Dolmetschen",
    url: "https://www.bag.admin.ch/de/interkulturelles-dolmetschen",
    version:
      "Laufende offizielle Informationsseite; Seitendatum nicht ausgewiesen",
    scope:
      "Professionelle Sprachvermittlung im Schweizer Gesundheitsbereich; Finanzierung kantonal unterschiedlich.",
    access: "read",
    checkedAt: "2026-10-06",
    accessNote:
      "Einleitung und Abschnitt Finanzierung direkt gelesen, HTTP 200; keine lokale Verfügbarkeitszusage.",
  },
  interpret2019: {
    label: "INTERPRET: Dolmetschen im Gesundheitsbereich",
    url: "https://www.inter-pret.ch/admin/data/files/infolib_asset/file/193/argumentarium_gesundheit.pdf",
    version:
      "Argumentarium Interkulturelles Dolmetschen im Gesundheitsbereich, Juni 2019",
    scope:
      "Fachempfehlung zur professionellen Dolmetschung und gegen den Einsatz von Kindern als Dolmetschende; kein gesetzliches Verbot oder Kostenanspruch.",
    access: "read",
    checkedAt: "2026-10-06",
    accessNote:
      "Offizielles PDF, Seite 1, direkt gelesen, HTTP 200; auf offizieller Gesundheitsseite verlinkt.",
  },
  awmfPsychosozial2025: {
    label: "AWMF S3 Psychosoziale Therapien 2025",
    url: "https://register.awmf.org/assets/guidelines/038-020l_S3_Psychosoziale_Therapien_bei_schweren_psychischen_Erkrankungen_2025-12.pdf",
    version: "Version 3.0, 2025, Registernummer 038-020",
    scope:
      "Kapitel 7.2 zur persönlichen Recovery; nicht Borderline-spezifisch, keine Validierung eigener Website-Modelle.",
    access: "carried-forward",
    checkedAt: null,
    accessNote:
      "Bisherige fachliche Zuordnung erhalten; kein neuer vollständiger PDF-Abgleich.",
  },
  nhsCauses: {
    label: "NHS: Ursachen von Borderline",
    url: "https://www.nhs.uk/mental-health/conditions/borderline-personality-disorder/causes/",
    version:
      "Patienteninformation, zuletzt überprüft 04.11.2022; vorgesehene nächste Überprüfung 04.11.2025",
    scope:
      "Nur Einleitung und Abschnitt Genetics: keine einzelne Ursache, mögliche genetische Anfälligkeit. Die vereinfachenden Gehirn-/Neurotransmitterabschnitte werden nicht als Beleg übernommen.",
    access: "read",
    checkedAt: "2026-10-06",
    accessNote:
      "Offizielle Patienteninformation direkt gelesen, HTTP 200; vorgesehene Überprüfung liegt zurück, keine neue Leitlinie.",
  },
  niceCg78Full: {
    label: "NICE CG78: Vollleitlinie 2009",
    url: "https://www.nice.org.uk/guidance/cg78/evidence/full-guideline-pdf-242147197",
    version: "National Clinical Practice Guideline Number 78, 2009",
    scope:
      "Datierter Evidenzhintergrund zur Genese und zu Suizidversuchen bei Komorbidität. Keine heutige individuelle Risiko- oder Mortalitätsprognose; aktuelle Behandlungsempfehlungen separat.",
    access: "read",
    checkedAt: "2026-10-06",
    accessNote:
      "Offizielles NICE-PDF direkt gelesen, HTTP 200: Abschnitt 2.4/2.4.1, S.21–22; 8.3.5/8.3.9, S.317/319. Keine neue vollständige klinische Prüfung.",
  },
  bfs2026: {
    label: "BFS: Medizinisches Kodierungshandbuch 2026",
    url: "https://dam-api.bfs.admin.ch/hub/api/dam/assets/36144081/master",
    version: "Version 2026; stationäre Austritte ab 01.01.2026",
    scope:
      "Einleitung S.10 (PDF-S.12): Schweizer stationäre Kodierung mit ICD-10-GM 2024. Der Einzelcode F60.31 steht nicht in diesem Handbuch und wird separat belegt.",
    access: "read",
    checkedAt: "2026-10-06",
    accessNote:
      "Offizielles BFS-PDF direkt gelesen, HTTP 200; keine pauschale Aussage für jedes ambulante Dokumentationssystem.",
  },
  bfarmIcd10gm2024: {
    label: "BfArM: ICD-10-GM 2024, F60.31",
    url: "https://klassifikationen.bfarm.de/icd-10-gm/kode-suche/htmlgm2024/block-f60-f69.htm#F60.31",
    version: "Amtliche ICD-10-GM Version 2024",
    scope:
      "Einzelcode F60.31, Borderline-Typ; nur Code/Titel abgeglichen, keine Übernahme der älteren klinischen Beschreibungen als neuer BPD-Review.",
    access: "read",
    checkedAt: "2026-10-06",
    accessNote:
      "Amtlicher Klassifikationstext mit F60.31 direkt gelesen, HTTP 200.",
  },
  guillen2024: {
    label: "Guillén et al. 2024: Family Connections RCT",
    url: "https://pubmed.ncbi.nlm.nih.gov/39624006/",
    version: "Family Process 63(4), 2195–2214; DOI 10.1111/famp.13089",
    scope:
      "121 Angehörige aus 82 Familieneinheiten in Spanien; aktives Vergleichsangebot ähnlicher Dauer, kein statistisch signifikanter Gruppenunterschied. Keine Überlegenheits- oder Gleichwertigkeitsbehauptung.",
    access: "carried-forward",
    checkedAt: null,
    accessNote:
      "Bibliografischer und Designabgleich aus #653/#654 erhalten; kein neuer vollständiger Studienreview.",
  },
  cohen2024: {
    label: "Cohen et al. 2024: Family Connections Frankreich/Schweiz",
    url: "https://pubmed.ncbi.nlm.nih.gov/39039536/",
    version:
      "Borderline Personality Disorder and Emotion Dysregulation 11,16; DOI 10.1186/s40479-024-00254-3",
    scope:
      "Beobachtungsstudie mit 149 Teilnehmenden an fünf Zentren; ohne randomisierte Kontrollgruppe kein sicherer Kausalnachweis und keine örtliche Verfügbarkeitszusage.",
    access: "carried-forward",
    checkedAt: null,
    accessNote:
      "Bibliografischer und Designabgleich aus #653/#654 erhalten; kein neuer vollständiger Studienreview.",
  },
} as const satisfies Record<string, ClaimSource>;

export type ClaimSourceId = keyof typeof claimSources;
export type ClaimDomain = "medical" | "safety" | "swiss-legal" | "editorial";

export interface ContentClaim {
  id: string;
  statement: string;
  domains: ClaimDomain[];
  locations: { path: string; anchor: string; file: string }[];
  sourceRefs: { sourceId: ClaimSourceId; locator: string; scope: string }[];
  evidenceStatus: "supported" | "context" | "editorial" | "unmapped";
  limitation: string;
  reviewStatus: {
    clinical: "pending" | "not-applicable";
    swissLegal: "pending" | "not-applicable";
    reviewer: null;
    approvedAt: null;
  };
}

/** Vollständiges Frageninventar der FAQ; redaktionelle Übertragungen bleiben getrennt von direkten Belegen. */
export const contentClaims: ContentClaim[] = [
  {
    id: "faq-diagnose-ansprechen",
    statement:
      "Diagnosebegriffe gemeinsam klären und konkrete Beobachtungen besprechen; Diagnose nicht als Konfliktargument verwenden.",
    domains: ["editorial"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-soll-ich-die-diagnose-ansprechen",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceCg78",
        locator: "1.1.3.1 und 1.1.6",
        scope:
          "Respektvolle Beziehung und verständliche Information; konkrete Gesprächssätze sind redaktionell.",
      },
    ],
    evidenceStatus: "editorial",
    limitation:
      "Redaktionelle Übertragung; kein Nachweis der Wirkung jedes Beispiels. Fachprüfung ausstehend.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-remission",
    statement:
      "Symptomatische Remission und weiter gefasste Recovery sind unterschiedliche Endpunkte.",
    domains: ["medical"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-ist-borderline-heilbar",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "zanarini2010",
        locator: "Abstract: Definition zweijähriger Endpunkte",
        scope:
          "Studien-Recovery verlangt zusätzlich gutes soziales und berufliches Funktionieren; persönliche Recovery geht darüber hinaus.",
      },
      {
        sourceId: "awmfPsychosozial2025",
        locator: "Kapitel 7.2",
        scope:
          "Weiter gefasste persönliche Recovery, nicht Borderline-spezifisch.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Studiendefinition ist kein allgemeines Erfolgsversprechen; Begriff «heilbar» ist eine redaktionelle Einordnung.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-verlauf-individuell",
    statement:
      "Besserung und Remission kommen vor; Zeitpunkt und funktionelle Genesung unterscheiden sich.",
    domains: ["medical"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-ist-borderline-heilbar",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "zanarini2010",
        locator: "10-Jahres-Follow-up",
        scope:
          "Spezialisierte stationäre Ausgangsstichprobe, keine individuelle Prognose.",
      },
      {
        sourceId: "gunderson2011",
        locator: "10-Jahres-Verlauf CLPS",
        scope: "Remission und Funktionieren können sich unterscheiden.",
      },
    ],
    evidenceStatus: "supported",
    limitation: "Keine individuelle Zeit- oder Erfolgsgarantie.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-multifaktorielle-entstehung",
    statement:
      "Biologische und entwicklungsbezogene Einflüsse können zusammenwirken; Vererbung ist kein eins-zu-eins-Mechanismus.",
    domains: ["medical"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-ist-borderline-erblich-bin-ich-schuld",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceCg78Full",
        locator: "2.4/2.4.1, gedruckteS.21–22",
        scope:
          "Komplexe und unsichere Genese, genetische und umweltbezogene Einflüsse; keine sichere Weitergabe einer Diagnose.",
      },
      {
        sourceId: "gunderson2018",
        locator: "Abschnitt Entstehung/Risikofaktoren",
        scope: "Fachübersicht, kein individueller genetischer Nachweis.",
      },
      {
        sourceId: "porter2020",
        locator: "Metaanalyse Kindheitsbelastungen",
        scope: "Assoziation, keine notwendige oder hinreichende Ursache.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Datierter Evidenzhintergrund, keine heutige individuelle genetische Untersuchung; keine familiäre Schuldzuweisung. Klinische Prüfung ausstehend.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-keine-diagnostische-schuld",
    statement:
      "Eine Diagnose beweist keine Schuld; Kinder und Angehörige sind nicht für Behandlung oder Genesung allein verantwortlich.",
    domains: ["editorial"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-ist-borderline-erblich-bin-ich-schuld",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceNg150",
        locator: "1.3 und 1.7",
        scope:
          "Eigener Unterstützungsbedarf von Angehörigen; Schuld- und Rollenklärung ist redaktionell.",
      },
    ],
    evidenceStatus: "editorial",
    limitation:
      "Redaktionelle Übertragung; kein Nachweis der Wirkung jedes Beispiels. Fachprüfung ausstehend.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-beziehungskontext",
    statement:
      "Unterschiedliches Verhalten nicht als Beweis für Manipulation verwenden; konkret nach Erfahrungen, Bedürfnissen und beobachtbarem Verhalten fragen.",
    domains: ["editorial"],
    locations: [
      {
        path: "/faq",
        anchor:
          "faq-warum-verhaelt-sich-mein-angehoeriger-bei-anderen-regulierter-und-stabiler",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "gunderson2018",
        locator: "Klinische Beschreibung/zwischenmenschlicher Kontext",
        scope:
          "Allgemeiner Kontext; keine Feststellung des Motivs einer bestimmten Person.",
      },
    ],
    evidenceStatus: "editorial",
    limitation:
      "Redaktionelle Gesprächsanregung; keine individuelle Motiverklärung oder nachgewiesene Regulationshypothese.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-diagnostische-qualifikation",
    statement:
      "Eine vertiefte Borderline-Abklärung erfordert entsprechend qualifizierte Fachpersonen und eine umfassende Beurteilung.",
    domains: ["medical"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-wer-kann-eine-borderline-diagnose-stellen",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceCg78",
        locator: "1.1.8.1 und 1.3.1.1–1.3.1.2",
        scope:
          "Training und umfassende fachliche Abklärung; britische Versorgungsstruktur.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Keine abschliessende Festlegung Schweizer Berufsberechtigungen oder Anzahl nötiger Termine.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-diagnose-autonomie",
    statement:
      "Diagnosefragen können mit Zustimmung der betroffenen Person fachlich geklärt werden; bei akuter Gefahr zählt passende professionelle Hilfe.",
    domains: ["medical", "safety"],
    locations: [
      {
        path: "/faq",
        anchor:
          "faq-was-wenn-die-betroffene-person-die-diagnose-nicht-teilt-oder-unsicher-ist",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceCg78",
        locator: "1.1.3.1, 1.1.4.1 und 1.5.1.1",
        scope:
          "Autonomie, Einbezug mit Zustimmung und spezialisierte diagnostische Unterstützung.",
      },
      {
        sourceId: "niceNg225",
        locator: "1.5.1",
        scope: "Professionelle psychosoziale Abklärung nach Selbstverletzung.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Eine konkrete Zweitmeinung oder Beratung ist keine garantierte lokale Leistung; Zugang beim Anbieter klären.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-diagnostik-dauer",
    statement:
      "Diagnostik berücksichtigt Vorgeschichte, Verlauf und andere Erklärungen; die FAQ nennt keine feste Termindauer.",
    domains: ["medical"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-wie-lange-dauert-es-bis-eine-diagnose-feststeht",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceCg78",
        locator: "1.3.1.2 und 1.3.6.1",
        scope:
          "Umfassende Abklärung; Diagnose nach Krise und Begleiterkrankungen überprüfen.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Keine Quelle legt eine universelle Anzahl Termine fest; die Dauerangabe bleibt bewusst offen.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-komorbiditaet",
    statement:
      "Depression, Angst und PTBS können zusätzlich zu Borderline vorkommen und müssen fachlich berücksichtigt werden.",
    domains: ["medical"],
    locations: [
      {
        path: "/faq",
        anchor:
          "faq-was-bedeutet-es-wenn-mehrere-diagnosen-gleichzeitig-genannt-werden",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "shah2018",
        locator: "Übersicht zu Komorbiditäten",
        scope: "Allgemeine Einordnung ohne Häufigkeitszahl für alle Menschen.",
      },
      {
        sourceId: "niceCg78",
        locator: "1.3.6.1–1.3.6.3",
        scope: "Komorbiditäten individuell prüfen und behandeln.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Keine Einzelfalldiagnose und keine pauschale Behandlungsreihenfolge.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-depression-suizidalitaet",
    statement:
      "Bei Depression gehört Suizidalität zur fachlichen Abklärung; bei Sorge professionelle Hilfe holen.",
    domains: ["medical", "safety"],
    locations: [
      {
        path: "/faq",
        anchor:
          "faq-mein-angehoeriger-hat-zusaetzlich-zur-borderline-auch-eine-depression-was-bedeutet-das",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceNg222",
        locator: "1.2.8–1.2.12",
        scope:
          "Fachpersonen sollen Suizidgedanken/Absicht erfragen und bei Risiko passende Hilfe organisieren.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Keine aus Stimmungsschwankungen abgeleitete Diagnose oder individuelle Risikoprognose.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-suizidaeusserung",
    statement:
      "Suizidäusserungen ernst nehmen und professionelle Hilfe einbeziehen; Angehörige sollen das Risiko nicht allein beurteilen.",
    domains: ["safety"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-wie-reagiere-ich-auf-bedrohlich-wirkende-aussagen",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceNg225",
        locator: "1.5.1 und 1.6.1–1.6.5",
        scope:
          "Professionelle Beurteilung; Risikoskalen und globale Risikokategorien sind nicht zur Vorhersage geeignet.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Leitlinie betrifft Versorgung nach Selbstverletzung; das FAQ-Hilfeholen ist eine vorsichtige Übertragung auf Sorge um Sicherheit.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-bedrohung-schutz",
    statement:
      "Bei Bedrohung oder Gewalt haben Abstand, sicherer Ort und passende Hilfe Vorrang vor Gesprächsführung.",
    domains: ["safety"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-wie-reagiere-ich-auf-bedrohlich-wirkende-aussagen",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "opferhilfeSchutz",
        locator: "Wenn Sie in akuter Gefahr sind",
        scope:
          "Sicherheit aufsuchen und Polizei verständigen; auch Kinder werden berücksichtigt.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Diagnoseunabhängiger Schutzrahmen, kein individuell geprüftes Flucht- oder Krisenprotokoll.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-beschuldigung-gespraech",
    statement:
      "Gefühle vorsichtig anerkennen, ohne Beschuldigungen zu bestätigen; eigene Grenze und Gesprächspause sind mögliche Schritte.",
    domains: ["editorial"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-was-sage-ich-wenn-mein-angehoeriger-mich-beschuldigt",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "linehan1997",
        locator: "Validierungskonzept",
        scope:
          "Therapeutischer Hintergrund; konkrete Angehörigensätze sind nicht als Wirksamkeitsversprechen geprüft.",
      },
    ],
    evidenceStatus: "editorial",
    limitation:
      "Redaktionelle Übertragung; kein Nachweis der Wirkung jedes Beispiels. Fachprüfung ausstehend.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-wechselnde-bewertungen",
    statement:
      "Stark wechselnde Bewertungen können vorkommen und erlauben keinen Schluss auf Absicht oder Charakter.",
    domains: ["medical"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-was-hilft-bei-stark-wechselnden-bewertungen",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "gunderson2018",
        locator: "Klinische Beschreibung",
        scope:
          "Heterogenes Störungsbild; Alltagserklärung ist eine Vereinfachung.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Nicht bei allen Menschen; keine Motivdiagnose durch Angehörige.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-ehrlichkeit-privatsphaere",
    statement:
      "Respektvolle Ehrlichkeit und selbst gewählte Informationsgrenzen sind redaktionelle Gesprächsanregungen.",
    domains: ["editorial"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-soll-ich-luegen-um-konflikte-zu-vermeiden",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceNg150",
        locator: "1.1.10–1.1.13",
        scope:
          "Respekt, Zustimmung und Informationsaustausch im britischen Versorgungskontext.",
      },
    ],
    evidenceStatus: "editorial",
    limitation:
      "Redaktionelle Übertragung; kein Nachweis der Wirkung jedes Beispiels. Fachprüfung ausstehend.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-fu-voraussetzungen",
    statement:
      "FU setzt die gesetzlichen Voraussetzungen, eine geeignete Einrichtung voraus, dass notwendige Behandlung oder Betreuung nicht anders erfolgen kann.",
    domains: ["swiss-legal"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-wann-ist-eine-einweisung-noetig",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "zgb",
        locator: "Art. 426 Abs. 1–3",
        scope:
          "Psychische Störung, geistige Behinderung oder schwere Verwahrlosung; Subsidiarität, geeignete Einrichtung, Entlassung wenn Voraussetzungen entfallen.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Gesetzestext direkt abgeglichen; die Einzelfallanwendung bleibt juristisch ungeprüft. Akute Eigen-/Fremdgefahr ist nicht die einzige gesetzliche Konstellation.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "pending",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-fu-zustaendigkeit",
    statement:
      "Über FU entscheidet grundsätzlich die Erwachsenenschutzbehörde; kantonal bezeichnete Ärztinnen/Ärzte können ebenfalls befugt sein.",
    domains: ["swiss-legal"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-wann-ist-eine-einweisung-noetig",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "zgb",
        locator: "Art. 428 und Art. 429 Abs. 1",
        scope:
          "KESB-Zuständigkeit; kantonale ärztliche Befugnisse mit gesetzlicher Höchstdauer bis sechs Wochen.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Zuständigkeit und Verfahren richten sich zusätzlich nach kantonalem Recht; Angehörige ordnen keine FU an.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "pending",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-aufnahme-einschaetzung",
    statement:
      "Eine stationäre Aufnahme und die gesetzliche FU sind unterschiedliche Fragen; bei akuter Gefahr professionelle Soforthilfe nutzen.",
    domains: ["medical", "safety"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-wann-ist-eine-einweisung-noetig",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceCg78",
        locator: "1.4.1.1–1.4.1.3",
        scope:
          "Vor stationärer Aufnahme Alternativen prüfen und Nutzen/Risiken besprechen; britische Leitlinie.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Keine individuelle Aufnahmeentscheidung oder Aussage zur aktuellen örtlichen Aufnahmefähigkeit.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-trennung-sicherheit",
    statement:
      "Eine Krise begründet keine allgemeine Pflicht, in einer Beziehung oder unsicheren Situation zu bleiben; Schutz und Unterstützung sind eigene Anliegen.",
    domains: ["editorial", "safety", "swiss-legal"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-darf-ich-meinen-angehoerigen-verlassen",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "opferhilfeSchutz",
        locator: "Schutz und Wenn Sie in akuter Gefahr sind",
        scope:
          "Offizielle Hilfe zu sicheren Orten bei Gewalt/Bedrohung; nicht zum gesamten Familienrecht.",
      },
    ],
    evidenceStatus: "editorial",
    limitation:
      "Kein umfassender Rechtsrat: konkrete Sorge-, Betreuungs- und sonstige Pflichten sowie Sicherheitsplanung gesondert klären.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "pending",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-kind-alltag",
    statement:
      "Kinder brauchen verständliche Information, verlässliche Unterstützung und Schutz; sie sind nicht für elterliche Krisen verantwortlich.",
    domains: ["safety", "editorial"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-wie-schuetze-ich-meine-kinder",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceCg78",
        locator: "1.3.1.2 und 1.3.3.1",
        scope:
          "Fachliche Abklärung berücksichtigt Bedürfnisse und Wohlergehen abhängiger Kinder.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Routinen und Beispielsätze sind redaktionelle Anregungen, keine einzeln geprüfte Intervention.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-kind-beratung",
    statement:
      "Bei wiederholten Eskalationen oder Belastung eines Kindes fachliche Unterstützung suchen; keine Garantie für einzelne örtliche Angebote.",
    domains: ["safety"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-wie-schuetze-ich-meine-kinder",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceCg78",
        locator: "1.3.1.2",
        scope:
          "Bedürfnisse abhängiger Kinder erfassen und passende Versorgung berücksichtigen.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Die genannten Dienste sind mögliche Anlaufstellen; konkrete Zuständigkeit und Zugang klären.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-kesb-melderecht",
    statement:
      "Jede Person kann der KESB melden, wenn die körperliche, psychische oder sexuelle Integrität eines Kindes gefährdet erscheint.",
    domains: ["swiss-legal"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-wie-schuetze-ich-meine-kinder",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "zgb",
        locator: "Art. 314c Abs. 1; Abs. 2 betrifft Berufsgeheimnis",
        scope:
          "Melderecht setzt gefährdet erscheinende Integrität voraus, keinen durch Angehörige bereits erbrachten Gefährdungsbeweis.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Einzelfall, Vertraulichkeit und Zuständigkeit bleiben schweizerisch-rechtlich zu prüfen.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "pending",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-kesb-meldepflicht",
    statement:
      "Für bestimmte berufliche/amtliche Rollen gelten Meldepflichten; Berufsgeheimnis und zusätzliche kantonale Pflichten sind zu beachten.",
    domains: ["swiss-legal"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-wie-schuetze-ich-meine-kinder",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "zgb",
        locator: "Art. 314d Abs. 1–3",
        scope:
          "Konkrete Hinweise, regelmässiger beruflicher Kontakt/amtliche Tätigkeit, fehlende Abhilfe im Tätigkeitsrahmen; gesetzliche Ausnahmen und kantonale Ergänzungen.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Keine pauschale Behauptung einer Meldepflicht aller Angehörigen.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "pending",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-kindesschutz-massnahmen",
    statement:
      "Die Behörde trifft geeignete Kindesschutzmassnahmen, wenn das Kindeswohl gefährdet ist und Eltern nicht abhelfen oder dazu ausserstande sind.",
    domains: ["swiss-legal"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-wie-schuetze-ich-meine-kinder",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "zgb",
        locator: "Art. 307 Abs. 1",
        scope:
          "Voraussetzungen behördlicher Kindesschutzmassnahmen; nicht identisch mit der Schwelle des Melderechts.",
      },
    ],
    evidenceStatus: "supported",
    limitation: "Keine Vorhersage einer konkreten KESB-Massnahme.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "pending",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-kind-akute-gefahr",
    statement:
      "Bei akuter Gefahr Schutz für sich und das Kind suchen und professionelle Hilfe holen.",
    domains: ["safety"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-wie-schuetze-ich-meine-kinder",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "opferhilfeSchutz",
        locator: "Wenn Sie in akuter Gefahr sind",
        scope: "Sicherer Ort und Polizei; allgemeiner Schutzrahmen.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Kein individuell geprüfter Sicherheitsplan; Handlungen nur ohne Eigengefährdung.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-co-abhaengigkeit",
    statement:
      "Die FAQ verwendet Co-Abhängigkeit nicht zur Diagnose; konkrete Fragen zu eigenen Bedürfnissen sind keine Diagnoseliste.",
    domains: ["editorial"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-woran-merke-ich-dass-mein-eigenes-leben-zu-kurz-kommt",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceNg150",
        locator: "1.2.7 und 1.7",
        scope:
          "Eigene Bedürfnisse, konkurrierende Belastungen und Unterstützung von Angehörigen; keine Validierung des Begriffs.",
      },
    ],
    evidenceStatus: "editorial",
    limitation:
      "Redaktionelle Rollenklärung, keine diagnostische Negativrecherche oder Wirksamkeitsgarantie.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-therapie-autonomie",
    statement:
      "Behandlungsentscheidungen der betroffenen Person respektieren; eigene Unterstützung und bei akuter Gefahr professionelle Hilfe bleiben wichtige Anliegen.",
    domains: ["medical", "safety", "editorial"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-was-wenn-die-nahestehende-person-keine-therapie-moechte",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceCg78",
        locator: "1.1.3.1 und 1.1.4.1",
        scope: "Autonomie und vereinbarter Einbezug.",
      },
      {
        sourceId: "niceNg150",
        locator: "1.3.10",
        scope:
          "Eigenständige vertrauliche Gespräche über Bedürfnisse von Angehörigen.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Keine Rechtsaussage zu Urteilsunfähigkeit/FU und keine lokale Leistungszusage.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-strukturierte-psychotherapie",
    statement:
      "Strukturierte Psychotherapie steht im Zentrum; kein Verfahren ist für alle Personen als überlegen gesichert.",
    domains: ["medical"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-welche-therapie-ist-am-besten",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceCg78",
        locator: "1.3.4.1–1.3.4.7",
        scope:
          "Individuelle Auswahl und strukturierter Rahmen; DBT-Empfehlung 1.3.4.5 ausdrücklich begrenzt.",
      },
      {
        sourceId: "storebo2020",
        locator: "Cochrane-Abstract/Ergebniseinordnung",
        scope:
          "Niedrige bis sehr niedrige Evidenzsicherheit für viele Endpunkte; keine verlässliche Rangfolge.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Verfahren und Setting gemeinsam fachlich wählen; keine Behandlungsgarantie.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-medikamente-kernbehandlung",
    statement:
      "Medikamente sollen nicht spezifisch für Borderline oder ihre einzelnen Kernsymptome als allgemeine Kernbehandlung eingesetzt werden.",
    domains: ["medical"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-helfen-medikamente-bei-borderline",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceCg78",
        locator: "1.3.5.1–1.3.5.3",
        scope:
          "Keine spezifische medikamentöse BPS-Kernbehandlung; Komorbiditäten gesondert behandeln.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Britische Empfehlung, keine individuelle Verordnung; Ausnahmen/Zielsetzung ärztlich beurteilen.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-medikamente-zeitbegrenzung",
    statement:
      "Komorbiditäten und eng begrenzte Krisensituationen können ärztliche Arzneimittelentscheidungen begründen; Nutzen, Risiken und Dauer werden überprüft.",
    domains: ["medical", "safety"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-helfen-medikamente-bei-borderline",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceCg78",
        locator: "1.3.5.3–1.3.5.6 und 1.3.7.2–1.3.7.5",
        scope:
          "Krisensedierung nur vorsichtig und kurzzeitig; CG78 nennt höchstens eine Woche. Keine pauschale Empfehlung für irgendein Medikament.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Die FAQ nennt bewusst weder Wirkstoff noch Dosierung; genaue klinische Prüfung bleibt offen.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-medikamente-aenderung",
    statement:
      "Einnahmeänderungen und Absetzen ärztlich begleiten lassen; Angehörige übernehmen keine Verordnungs- oder Überwachungsaufgabe.",
    domains: ["medical", "safety", "editorial"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-helfen-medikamente-bei-borderline",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceCg78",
        locator: "1.3.5.6 und 1.3.7.4–1.3.7.5",
        scope: "Unnötige Medikamente fachlich überprüfen und Absetzen planen.",
      },
      {
        sourceId: "niceNg222",
        locator: "1.4.12–1.4.21",
        scope:
          "Bei Antidepressiva Absetzen mit verschreibender Fachperson besprechen; nicht alle Arzneimittel haben dasselbe Schema.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Keine individuelle Absetzanleitung; Rollenabgrenzung ist redaktionell.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-therapie-einbezug",
    statement:
      "Angehörigeneinbezug wird mit der betroffenen Person vereinbart und berücksichtigt Zustimmung und Vertraulichkeit.",
    domains: ["medical", "swiss-legal"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-soll-ich-an-der-therapie-teilnehmen",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceCg78",
        locator: "1.1.4.1–1.1.4.2",
        scope:
          "Zustimmung, Vertraulichkeit und bei jungen Menschen Abwägung von Autonomie/Verantwortung.",
      },
      {
        sourceId: "bagBerufsgeheimnis",
        locator: "Patientenrechte/Berufsgeheimnis",
        scope:
          "Schweizer Kontextquelle heute nicht neu textlich lesbar (HTTP 503).",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Schweizer Rechtsausnahmen und Zugang zur Fachstelle nicht als bestätigt ausgegeben; Rechtsprüfung ausstehend.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "pending",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-behandlungsdauer",
    statement:
      "Dauer und Setting einer Behandlung werden individuell vereinbart; es gibt keinen einheitlichen Zeitplan für alle Betroffenen.",
    domains: ["medical"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-wie-lange-dauert-die-behandlung",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceCg78",
        locator: "1.3.4.1–1.3.4.4 und 1.4.1",
        scope:
          "Therapierahmen und stationäre Alternativen individuell beurteilen; kein allgemeines Wochenmass stationärer Aufenthalte.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Eine pauschale Angabe «stationär oft einige Wochen» wurde entfernt; kein Erfolgszeitpunkt zugesagt.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-privatsphaere-information",
    statement:
      "Für eigene Unterstützung nur selbst verantwortete Informationen weitergeben und Privatsphäre mitbedenken.",
    domains: ["editorial", "swiss-legal"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-wie-erklaere-ich-die-situation-freunden-familie",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceCg78",
        locator: "1.1.4.1",
        scope:
          "Zustimmung/Vertraulichkeit in Versorgung; keine vollständige Schweizer Datenschutzbewertung.",
      },
    ],
    evidenceStatus: "editorial",
    limitation:
      "Konkrete Informationsweitergabe und gesetzliche Sonderpflichten gesondert klären.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "pending",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-sprache-dolmetschung",
    statement:
      "Bei Verständigungsschwierigkeiten nach professioneller Dolmetschung fragen; Kinder sollen sensible Diagnose-, Krisen- oder Gewaltgespräche nicht übernehmen müssen.",
    domains: ["medical", "safety", "editorial"],
    locations: [
      {
        path: "/faq",
        anchor:
          "faq-was-wenn-deutsch-nicht-die-hauptsprache-ist-oder-psychische-erkrankung-in-unserer-familie-tabuisiert-ist",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "bagDolmetschen",
        locator: "Einleitung und Finanzierung",
        scope:
          "Professionelle Sprachvermittlung im Gesundheitsbereich; Finanzierung kantonal unterschiedlich.",
      },
      {
        sourceId: "interpret2019",
        locator: "Seite 1",
        scope:
          "Fachempfehlung gegen den Einsatz von Kindern als Dolmetschende in Gesundheitsgesprächen; kein gesetzliches Verbot.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Keine Zusage aktueller örtlicher Verfügbarkeit oder Finanzierung; Gewaltschutzprotokolle nicht eigens geprüft. Fachprüfung ausstehend.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-sprache-schutz",
    statement:
      "Akute Schutzbedürfnisse benötigen passende Hilfe unabhängig davon, ob alle familiären Begriffe und Hintergründe geklärt sind.",
    domains: ["safety"],
    locations: [
      {
        path: "/faq",
        anchor:
          "faq-was-wenn-deutsch-nicht-die-hauptsprache-ist-oder-psychische-erkrankung-in-unserer-familie-tabuisiert-ist",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "opferhilfeSchutz",
        locator: "Wenn Sie in akuter Gefahr sind",
        scope: "Diagnoseunabhängiger allgemeiner Schutzrahmen.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Die konkrete interkulturelle Übertragung ist redaktionell; kein kulturbezogener Häufigkeitsclaim.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-kontrolle-grenzen",
    statement:
      "Kontrollierendes Verhalten ist kein Beweis für ein Diagnosemotiv; Privatsphäre und Sicherheit können zum Anlass eigener Grenzen werden.",
    domains: ["safety", "editorial"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-wie-gehe-ich-mit-eifersucht-und-kontrolle-um",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "opferhilfeSchutz",
        locator: "Schutz",
        scope:
          "Bedrohungs-/Gewaltschutz; nicht jede Eifersucht entspricht Gewalt.",
      },
    ],
    evidenceStatus: "editorial",
    limitation:
      "Gesprächsbeispiele sind keine geprüfte Deeskalationsintervention; bei Gefahr Schutz priorisieren.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-eigene-beduerfnisse",
    statement:
      "Eigene Beziehungen, Erholung und Unterstützung von Angehörigen sind eigenständige Anliegen.",
    domains: ["editorial"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-wie-kann-ich-mein-eigenes-leben-behalten",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceNg150",
        locator: "1.2.7, 1.5 und 1.7",
        scope:
          "Konkurrierende Anforderungen, soziale und emotionale Unterstützung.",
      },
    ],
    evidenceStatus: "editorial",
    limitation:
      "Keine Schweizer Leistungszusage oder allgemeine Garantie der Wirksamkeit jeder Selbstfürsorgemassnahme.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "faq-besserung-zeitplan",
    statement:
      "Gruppenstudien zu Genesung erlauben keinen individuellen Zeitplan; Angehörige sind nicht für den Genesungserfolg verantwortlich.",
    domains: ["medical", "editorial"],
    locations: [
      {
        path: "/faq",
        anchor: "faq-wann-wird-es-besser",
        file: "client/src/pages/FAQ.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "zanarini2010",
        locator: "10-Jahres-Follow-up",
        scope: "Spezialisierte Gruppe mit unterschiedlichen Endpunkten.",
      },
      {
        sourceId: "zanarini2012",
        locator: "16-Jahres-Follow-up",
        scope: "Separater längerer Verlauf; keine individuelle Prognose.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Rollenklärung ist redaktionell; Monatsangaben sind kein prognostisches Versprechen.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-borderline-persoenlichkeitsstoerung",
    statement:
      "Ein komplexes Störungsbild, das unter anderem intensive oder rasch wechselnde Gefühle, Schwierigkeiten mit innerer Stabilität, dem Selbstbild oder Beziehungen beschreiben kann. Erfahrungen und Ausprägung sind individuell verschieden. Klassifiziert im DSM-5-TR als eigenständige Persönlichkeitsstörung und im ICD-11 als «Borderline-Muster» (Code 6D11.5). Die englische Bezeichnung lautet Borderline Personality Disorder (BPD).",
    domains: ["medical"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-borderline-persoenlichkeitsstoerung",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "dsm5tr",
        locator: "Borderline-Diagnosekriterien",
        scope: "Mindestens fünf von neun DSM-Merkmalen; keine Laien-Diagnose.",
      },
      {
        sourceId: "icd11",
        locator: "Persönlichkeitsstörung/Borderline-Muster 6D11.5",
        scope: "Anderes Klassifikationsmodell; heutiger WHO-Abruf blockiert.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-dialektisch-behaviorale-therapie",
    statement:
      "Die DBT gehört zu den wissenschaftlich untersuchten Psychotherapien für Borderline. Sie verbindet Verhaltenstherapie und Achtsamkeitspraktiken; eine allgemeine Überlegenheit gegenüber allen geeigneten Verfahren ist nicht belegt.",
    domains: ["medical"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-dialektisch-behaviorale-therapie",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "storebo2020",
        locator: "Psychotherapieübersicht",
        scope: "DBT untersucht; keine universelle Rangfolge.",
      },
      {
        sourceId: "niceCg78",
        locator: "1.3.4.5",
        scope:
          "Enger Empfehlungsumfang für Frauen mit prioritärem Ziel Reduktion wiederholter Selbstverletzung.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-skills",
    statement:
      "Skills sind konkrete Fertigkeiten, die in der DBT erlernt werden. Sie sollen helfen, mit intensiven Emotionen, Krisen und zwischenmenschlichen Spannungen anders umzugehen, ohne sofort auf selbstschädigende oder eskalierende Muster zurückzugreifen.",
    domains: ["medical", "safety"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-skills",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "linehan2015",
        locator: "Skillsmodule",
        scope:
          "Therapeutisches Manual; Grounding-Beispiel redaktionell, individuell anpassen.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-komorbiditaet",
    statement:
      "Mehrere Erkrankungen, die gleichzeitig oder nacheinander auftreten. Bei Borderline besonders häufig: Depression, Angststörungen, PTBS, Essstörungen, Substanzgebrauchsstörungen. Der Begriff bedeutet nicht «doppelt schlimm», sondern beschreibt eine Kombination, die behandelt werden kann.",
    domains: ["medical"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-komorbiditaet",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "shah2018",
        locator: "Komorbiditätsübersicht",
        scope: "Keine pauschalen Häufigkeitszahlen.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-mentalisierung",
    statement:
      "Die Fähigkeit, das eigene Verhalten und das Verhalten anderer Menschen im Zusammenhang mit Gedanken, Gefühlen, Wünschen und möglichen Absichten zu verstehen. Diese Fähigkeit nutzen alle Menschen. Unter hoher Anspannung kann sie vorübergehend schwerer zugänglich sein — auch bei manchen Menschen mit Borderline. Sie lässt sich in der Therapie üben.",
    domains: ["medical"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-mentalisierung",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "gunderson2018",
        locator: "Behandlung/Mentalisierung",
        scope: "Allgemeiner therapeutischer Kontext, keine Motivfeststellung.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-uebertragungsfokussierte-psychotherapie",
    statement:
      "TFP ist eine wissenschaftlich untersuchte Psychotherapie, die mit dem Beziehungserleben in der therapeutischen Beziehung arbeitet. Eignung und Angebot werden individuell geklärt; kein Schweizer Verbreitungsvergleich.",
    domains: ["medical"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-uebertragungsfokussierte-psychotherapie",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "storebo2020",
        locator: "Psychotherapien",
        scope:
          "TFP wissenschaftlich untersucht; Evidenzsicherheit und individueller Nutzen begrenzt.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-remission",
    statement:
      "In der Borderline-Forschung bedeutet symptomatische Remission, dass eine Person während eines festgelegten Zeitraums nicht mehr genügend Kriterien für die Diagnose erfüllt. In der zehnjährigen Studie von Zanarini et al. (2010) erreichten 93% der 290 zu Beginn stationär behandelten Erwachsenen mindestens einmal eine zweijährige Remission. Das ist eine Gruppenbeobachtung aus einer spezialisierten Stichprobe, keine individuelle Prognose.",
    domains: ["medical"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-remission",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "zanarini2010",
        locator: "Zweijährige Remission im 10-Jahres-Follow-up",
        scope:
          "93% von 290 anfänglich stationär behandelten Erwachsenen mindestens einmal; kein Individualwert.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-recovery",
    statement:
      "In der zehnjährigen Studie von Zanarini et al. (2010) bezeichnete Recovery eine mindestens zweijährige symptomatische Remission zusammen mit gutem sozialem und beruflichem Funktionieren; 50% der 290 zu Beginn stationär behandelten Erwachsenen erreichten diesen Studienendpunkt mindestens einmal. Persönliche Recovery ist weiter gefasst und kann auch Hoffnung, Verbundenheit, Sinn und Selbstbestimmung umfassen. Die Zahl ist keine individuelle Prognose.",
    domains: ["medical"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-recovery",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "zanarini2010",
        locator: "Zweijährige Recovery im 10-Jahres-Follow-up",
        scope:
          "50% von 290 Erwachsenen mindestens einmal; eng definierter Studienendpunkt.",
      },
      {
        sourceId: "awmfPsychosozial2025",
        locator: "Kapitel 7.2",
        scope:
          "Weiter gefasste persönliche Recovery, nicht Borderline-spezifisch.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-validierung",
    statement:
      "Validierung bedeutet, die Gefühle und Erfahrungen einer Person als verständlich und nachvollziehbar anzuerkennen, auch wenn man das Verhalten nicht gutheisst. Für Angehörige ist sie oft ein hilfreicher Ausgangspunkt, weil sie Druck aus Gesprächen nehmen kann, ohne alles zu bestätigen.",
    domains: ["editorial"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-validierung",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "linehan1997",
        locator: "Validierungskonzept",
        scope: "Beispielsatz für Angehörige ist redaktionell.",
      },
    ],
    evidenceStatus: "editorial",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-set-kommunikation",
    statement:
      "SET steht für Support (Unterstützung), Empathy (Empathie) und Truth (Wahrheit/Realität). Der Begriff stammt aus der Angehörigenliteratur. Er ist kein allgemein empfohlenes oder verpflichtendes Schema; einzelne Elemente wie begrenzte Präsenz, vorsichtiges Spiegeln und Klarheit können situationsabhängig nützlich sein.",
    domains: ["editorial"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-set-kommunikation",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [],
    evidenceStatus: "editorial",
    limitation:
      "Die konkrete Ursprungsfassung von SET wurde hier nicht unabhängig textlich abgeglichen. Praxisbegriff und Beispiel sind keine klinisch geprüfte Intervention oder Pflichtfolge.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-dear-man",
    statement:
      "DEAR MAN ist eine DBT-Struktur für klare Bitten und Grenzen: Describe (beschreiben), Express (ausdrücken), Assert (klar benennen), Reinforce (verstärken und positive Folgen benennen), Mindful (achtsam beim Ziel bleiben), Appear confident (klar auftreten), Negotiate (verhandeln). DEAR bezeichnet darin die ersten vier inhaltlichen Schritte.",
    domains: ["editorial"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-dear-man",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "linehan2015",
        locator: "Interpersonelle Effektivität/DEAR MAN",
        scope: "DEAR sind die ersten vier Schritte; Webbeispiel vereinfacht.",
      },
    ],
    evidenceStatus: "editorial",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-invalidierung",
    statement:
      "Das Gegenteil von Validierung: Die Gefühle oder Erfahrungen einer Person werden abgewertet, ignoriert oder als übertrieben dargestellt. Das kann für viele Menschen schmerzhaft sein und ein belastetes Gespräch weiter erschweren.",
    domains: ["editorial"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-invalidierung",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "linehan1997",
        locator: "Validierung/Invalidierung",
        scope: "Keine Garantie einer bestimmten Gesprächswirkung.",
      },
    ],
    evidenceStatus: "editorial",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-emotionale-dysregulation",
    statement:
      "Schwierigkeiten, starke Emotionen zu regulieren. Gefühle können rasch an Intensität gewinnen und länger anhalten. Das kann ein Merkmal von Borderline sein, kommt aber auch in anderen Zusammenhängen vor und erklärt Verhalten nie vollständig.",
    domains: ["medical"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-emotionale-dysregulation",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "gunderson2018",
        locator: "Klinische Beschreibung",
        scope:
          "Emotionsdysregulation heterogen und nicht ausschliesslich BPS-spezifisch.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-splitting",
    statement:
      "Ein klinischer Begriff, der leicht missverstanden wird. Unter hoher Anspannung kann es vorübergehend schwer sein, widersprüchliche Eindrücke gleichzeitig im Blick zu behalten; eine Person oder Situation wird dann überwiegend positiv oder negativ erlebt. Das tritt nicht bei allen Menschen mit Borderline auf und erlaubt keinen Schluss auf Absicht oder Charakter.",
    domains: ["medical"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-splitting",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "gunderson2018",
        locator: "Klinische Beschreibung",
        scope: "Kein Rückschluss auf Absicht oder Charakter.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-verlassensangst",
    statement:
      "Eine intensive Sorge, eine wichtige Beziehung könne enden oder eine nahestehende Person könne sich zurückziehen. Sie kann mit aktuellen Signalen, früheren Beziehungserfahrungen oder beidem zusammenhängen und ist individuell unterschiedlich ausgeprägt.",
    domains: ["medical"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-verlassensangst",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "dsm5tr",
        locator: "Verlassenwerden als mögliches Merkmal",
        scope: "Keine individuelle Ursachenzuschreibung.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-dissoziation",
    statement:
      "Dissoziation kann sich etwa als Unwirklichkeitsgefühl, Abgetrenntsein von sich selbst oder Erinnerungslücken zeigen. Sie kann unter starkem Stress oder im Zusammenhang mit belastenden Erfahrungen auftreten, hat aber unterschiedliche Formen und kommt auch ausserhalb von Borderline vor. Wiederholte oder ausgeprägte Beschwerden brauchen eine fachliche Einordnung.",
    domains: ["medical"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-dissoziation",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "dsm5tr",
        locator: "Dissoziative Symptome",
        scope:
          "Beschwerden brauchen klinische Einordnung, nicht BPS-spezifisch.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-identitaetsdiffusion",
    statement:
      "Ein instabiles oder unklares Selbstbild. Manche Menschen mit Borderline erleben zeitweise Schwierigkeiten zu beschreiben, wer sie sind, was sie wollen oder was ihre Werte sind. Andere erleben dies nicht oder anders.",
    domains: ["medical"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-identitaetsdiffusion",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "dsm5tr",
        locator: "Identitätsstörung als mögliches Merkmal",
        scope: "Nicht bei jeder Person identisch ausgeprägt.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-selbstfuersorge",
    statement:
      "Bewusste Handlungen, um die eigene körperliche, emotionale und mentale Gesundheit zu erhalten. Angehörige dürfen ihre Bedürfnisse und Grenzen unabhängig davon schützen, wie viel Unterstützung sie geben können oder möchten.",
    domains: ["editorial"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-selbstfuersorge",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceNg150",
        locator: "1.2.7, 1.5 und 1.7",
        scope: "Eigene Bedürfnisse und Unterstützung; Definition redaktionell.",
      },
    ],
    evidenceStatus: "editorial",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-grenzen-setzen",
    statement:
      "Klare Kommunikation darüber, was für Sie möglich, sicher und tragbar ist. Grenzen können beide Seiten schützen; sie brauchen weder Zustimmung noch ein Versprechen auf späteren Kontakt.",
    domains: ["editorial", "safety"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-grenzen-setzen",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "opferhilfeSchutz",
        locator: "Schutz",
        scope:
          "Schutz bei Bedrohung; allgemeine Grenztechnik ist redaktionell.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-co-abhaengigkeit",
    statement:
      "Ein uneinheitlich verwendeter Begriff aus der Angehörigen- und Suchthilfeliteratur, keine klar abgegrenzte klinische Diagnose. Er kann Angehörige vorschnell etikettieren. Hilfreicher ist es, konkret zu fragen, ob eigene Bedürfnisse, Gesundheit oder Beziehungen zu kurz kommen und ob jemand mehr Verantwortung übernimmt, als gewollt oder tragbar ist.",
    domains: ["medical"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-co-abhaengigkeit",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceNg150",
        locator: "1.2.7 und 1.7",
        scope: "Keine Validierung des Begriffs Co-Abhängigkeit.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-enabling",
    statement:
      "Ein englischer Begriff aus der Sucht- und Angehörigenliteratur, der schnell vorwurfsvoll wirken kann. Statt eine helfende Handlung pauschal so zu etikettieren, sollte konkret geprüft werden: Entlastet sie kurzfristig? Überschreitet sie eigene Grenzen? Hat sie unbeabsichtigte Folgen? Verantwortlichkeiten und Unterstützung lassen sich möglichst gemeinsam klären.",
    domains: ["editorial"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-enabling",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceNg150",
        locator: "1.2.7 und 1.7",
        scope:
          "Kontext eigener Belastung; Begriff und Prüffragen nicht als diagnostisches Modell validiert.",
      },
    ],
    evidenceStatus: "editorial",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-leuchtturm-prinzip",
    statement:
      "Eine Metapher für die Selbstorientierung von Angehörigen: Sie können den eigenen nächsten Schritt an Werten, Grenzen, Möglichkeiten und verfügbarer Unterstützung ausrichten. Sie müssen nicht dauerhaft ruhig oder stabil sein und sind nicht für die Steuerung oder Genesung einer anderen Person verantwortlich.",
    domains: ["editorial"],
    locations: [
      {
        path: "/glossar",
        anchor: "term-leuchtturm-prinzip",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [],
    evidenceStatus: "editorial",
    limitation:
      "Beispiele und vereinfachte Übertragungen sind redaktionell; fachliche Prüfung ausstehend. Keine klinische Wirksamkeits- oder Rechtsfreigabe.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "glossar-dsm-kriterien",
    statement:
      "Nach DSM-5-TR gehören mindestens fünf von neun Borderline-Merkmalen zu einem überdauernden situationsübergreifenden Muster mit klinisch relevanter Belastung/Beeinträchtigung; fachliche Differenzialdiagnostik bleibt erforderlich.",
    domains: ["medical"],
    locations: [
      {
        path: "/glossar",
        anchor: "dsm-5-kriterien",
        file: "client/src/pages/Glossar.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "dsm5tr",
        locator:
          "Borderline-Persönlichkeitsstörung: Diagnosekriterien und allgemeine Persönlichkeitsstörungskriterien",
        scope:
          "Klassifikation 2022; die Liste ist keine Selbst- oder Fremddiagnose.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Kriterien als bisherige Klassifikationsangabe erhalten; im heutigen Durchlauf kein neuer vollständiger DSM-Kapitelreview. Klinische Prüfung ausstehend.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "core-dsm-kriterien",
    statement:
      "DSM-5-TR: mindestens fünf von neun Merkmalen im Kontext eines überdauernden klinisch relevanten Musters; keine Fremddiagnose durch Angehörige.",
    domains: ["medical"],
    locations: [
      {
        path: "/verstehen/diagnostik",
        anchor: "wie",
        file: "client/src/pages/Diagnostik.tsx",
      },
      {
        path: "/verstehen",
        anchor: "diagnostischer-ueberblick",
        file: "client/src/sections/VerstehenSupportSections.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "dsm5tr",
        locator: "Diagnosekriterien Borderline-Persönlichkeitsstörung",
        scope:
          "Klassifikation2022; kein heute vollständig neu gelesenes DSM-Kapitel.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Bisherige Klassifikationsangabe erhalten, aktuelle klinische Prüfung bleibt ausstehend.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "core-icd11-schweregrad",
    statement:
      "ICD-11 bewertet Persönlichkeitsstörungen nach Schweregrad; das Borderline-Muster6D11.5 kann zusätzlich angegeben werden und ist kein identisches DSM-Kriteriensystem.",
    domains: ["medical"],
    locations: [
      {
        path: "/verstehen/diagnostik",
        anchor: "wie",
        file: "client/src/pages/Diagnostik.tsx",
      },
      {
        path: "/verstehen",
        anchor: "diagnostischer-ueberblick",
        file: "client/src/sections/VerstehenSupportSections.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "icd11",
        locator: "Persönlichkeitsstörung und Borderline-Muster6D11.5",
        scope:
          "WHO-Klassifikation2024; heutiger Abruf403, kein neuer vollständiger Textreview.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Heutige WHO-Abrufgrenze sichtbar; keine Gleichsetzung mit Schweizer stationärer Kodierung.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "core-schweizer-stationaere-kodierung",
    statement:
      "Für stationäre Austritte in der Schweiz ab01.01.2026 gilt ICD-10-GM2024; darin bezeichnetF60.31 den Borderline-Typ.",
    domains: ["medical"],
    locations: [
      {
        path: "/verstehen/diagnostik",
        anchor: "wie",
        file: "client/src/pages/Diagnostik.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "bfs2026",
        locator: "Einleitung, gedruckteS.10/PDF-S.12",
        scope: "Schweizer stationäre Austritte2026 verwenden ICD-10-GM2024.",
      },
      {
        sourceId: "bfarmIcd10gm2024",
        locator: "F60.31",
        scope:
          "Separater offizieller Einzelcode-Nachweis, keine erneute klinische Definition.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Die Schweizer stationäre Kodierregel ist keine allgemeine Aussage über alle ambulanten Dokumentationssysteme.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "core-komorbiditaet-medikation",
    statement:
      "NICE empfiehlt keine Arzneimittel gezielt zur allgemeinen Behandlung von Borderline-Kernsymptomen; Komorbiditäten werden gesondert fachlich behandelt.",
    domains: ["medical"],
    locations: [
      {
        path: "/verstehen/begleiterkrankungen",
        anchor: "behandlung",
        file: "client/src/pages/Begleiterkrankungen.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceCg78",
        locator: "1.3.5.1–1.3.5.3 und1.3.6.2",
        scope:
          "Behandlungsempfehlung, keine Behauptung einer generellen pharmakologischen Unbehandelbarkeit.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Individuelle Indikation ärztlich klären; britische Leitlinie, keine Verordnungsanleitung.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "core-depression-medikation",
    statement:
      "Bei Depression mit zusätzlich diagnostizierter Persönlichkeitsstörung empfiehlt NICE, Antidepressivum plus psychologische Behandlung zu erwägen.",
    domains: ["medical"],
    locations: [
      {
        path: "/verstehen/begleiterkrankungen",
        anchor: "behandlung",
        file: "client/src/pages/Begleiterkrankungen.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceNg222",
        locator: "1.11.2",
        scope:
          "Empfehlung für Depression mit Persönlichkeitsstörung; weder automatische Verordnung noch Übertrag auf jede einzelne Symptomlage.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Individuelle ärztliche Behandlung und klinische Prüfung bleiben erforderlich.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "core-depression-suizidversuche",
    statement:
      "Die NICE-Vollleitlinie2009 beschreibt einen beobachteten Zusammenhang zwischen Borderline mit zusätzlicher Major Depression und Suizidversuchen.",
    domains: ["medical", "safety"],
    locations: [
      {
        path: "/verstehen/begleiterkrankungen",
        anchor: "suizidrisiko",
        file: "client/src/pages/Begleiterkrankungen.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceCg78Full",
        locator: "8.3.5 und8.3.9, gedruckteS.317/319",
        scope:
          "Gruppenbefund zu Suizidversuchen; der direkte Gruppenvergleich8.3.5 war numerisch höher, aber nicht statistisch signifikant.",
      },
      {
        sourceId: "niceNg222",
        locator: "1.2.8–1.2.12",
        scope:
          "Suizidalität professionell abklären und bei Sorge passende Hilfe organisieren.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Keine gesicherte additive Individual- oder Mortalitätsprognose und kein spezifischer Nachweis nur für «schwere Episoden».",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "core-remission-zehn-jahre",
    statement:
      "93% der290 anfänglich stationär behandelten Erwachsenen erreichten im10-Jahres-Follow-up mindestens einmal eine zweijährige symptomatische Remission.",
    domains: ["medical"],
    locations: [
      {
        path: "/genesung",
        anchor: "prognose-studien",
        file: "client/src/pages/Genesung.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "zanarini2010",
        locator: "Abstract: 10-Jahres-Follow-up und zweijährige Remission",
        scope:
          "Spezialisierte Ausgangsstichprobe; mindestens einmal erreicht, keine Quote dauerhaft geheilter Menschen.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Keine individuelle Prognose; die2012er Publikation ist ein separates16-Jahres-Follow-up.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "core-recovery-zehn-jahre",
    statement:
      "50% der290 anfänglich stationär behandelten Erwachsenen erreichten im10-Jahres-Follow-up mindestens einmal die mindestens zweijährige, auch sozial/beruflich definierte Recovery.",
    domains: ["medical"],
    locations: [
      {
        path: "/genesung",
        anchor: "prognose-studien",
        file: "client/src/pages/Genesung.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "zanarini2010",
        locator: "Abstract: zweijährige Recovery",
        scope:
          "Enger Studienendpunkt zusätzlich zur Remission; persönliche Recovery ist weiter gefasst.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Keine individuelle Prognose, keine Gleichsetzung mit einer universellen Definition persönlicher Genesung.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "core-family-connections-rct2024",
    statement:
      "Der2024er Family-Connections-RCT fand gegenüber dem aktiven Angehörigenangebot keine statistisch signifikanten Gruppenunterschiede.",
    domains: ["medical"],
    locations: [
      {
        path: "/unterstuetzen/therapie",
        anchor: "therapieformen",
        file: "client/src/pages/UnterstuetzenTherapie.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "guillen2024",
        locator: "RCT-Ergebnisse, PMID39624006",
        scope:
          "121 Angehörige/82Familieneinheiten in Spanien; aktiver Vergleich ähnlicher Dauer.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Kein Überlegenheitsnachweis; fehlende Signifikanz beweist keine Gleichwertigkeit. Bisheriger Studienabgleich erhalten, kein neuer vollständiger Review.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "core-family-connections-beobachtung2024",
    statement:
      "Die Frankreich-/Schweiz-Beobachtungsstudie berichtete Verbesserungen nach FamilyConnections, ohne randomisierte Kontrollgruppe.",
    domains: ["medical"],
    locations: [
      {
        path: "/unterstuetzen/therapie",
        anchor: "therapieformen",
        file: "client/src/pages/UnterstuetzenTherapie.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "cohen2024",
        locator: "Studienaufbau und Ergebnisse, PMID39039536",
        scope: "149 Teilnehmende an fünf Zentren, beobachtetes Vorher/Nachher.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Kein sicherer Kausalnachweis und keine Aussage zur heutigen örtlichen Angebotsverfügbarkeit.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "core-direkt-nach-suizid-fragen",
    statement:
      "Die von Dazzi2014 eingeschlossenen Studien fanden keinen statistisch signifikanten Anstieg von Suizidgedanken durch direktes Befragen.",
    domains: ["safety"],
    locations: [
      {
        path: "/unterstuetzen/krise",
        anchor: "krise-formulierungen",
        file: "client/src/pages/UnterstuetzenKrise.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "dazzi2014",
        locator: "Abstract/Ergebnis der Übersicht",
        scope:
          "Untersuchungen mit Erwachsenen/Jugendlichen in allgemeinen und gefährdeten Populationen.",
      },
    ],
    evidenceStatus: "supported",
    limitation:
      "Keine Wirkungsgarantie für Einzelsituationen; professionelle Hilfewege und eigene Sicherheit bleiben notwendig.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "core-angehoerigenrolle-rechtsgrenzen",
    statement:
      "Emotionale Unterstützung darf innerhalb eigener Möglichkeiten angeboten und begrenzt werden; das ist keine pauschale Aussage über sämtliche gesetzlichen Familienpflichten.",
    domains: ["editorial", "swiss-legal"],
    locations: [
      {
        path: "/kommunizieren",
        anchor: "rollen",
        file: "client/src/content/kommunizieren.ts",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceNg150",
        locator: "1.2.7 und1.7",
        scope:
          "Eigene Bedürfnisse und Unterstützung von Angehörigen; britischer Versorgungskontext.",
      },
      {
        sourceId: "zgb",
        locator: "Art.328 Abs.1–2 undArt.329 Abs.1–2",
        scope:
          "Unter Voraussetzungen Verwandtenunterstützung; keine Pflicht zur persönlichen Krisensteuerung oder Genesung daraus ableiten.",
      },
    ],
    evidenceStatus: "editorial",
    limitation:
      "Konkrete Unterhalts-/Betreuungs- und sonstige gesetzliche Pflichten gesondert Schweizer rechtlich prüfen.",
    reviewStatus: {
      clinical: "not-applicable",
      swissLegal: "pending",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "core-grounding-orientierung",
    statement:
      "Grounding wird als anpassbare Aufmerksamkeitsübung beschrieben; bei Unwohlsein abbrechen, keine garantierte Beruhigung oder klinische Wirkung.",
    domains: ["editorial", "safety"],
    locations: [
      {
        path: "/selbstfuersorge",
        anchor: "sofort-uebungen",
        file: "client/src/pages/Selbstfuersorge.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceNg150",
        locator: "1.7",
        scope:
          "Themenkontext eigener emotionaler Unterstützung; keine Wirksamkeitsquelle für die konkrete Grounding-Technik.",
      },
    ],
    evidenceStatus: "editorial",
    limitation:
      "Das konkrete Sinneseindrücke-Beispiel ist eine redaktionelle Selbsthilfeorientierung, keine klinisch geprüfte Intervention.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "core-gewalt-medizin-anbieterfragen",
    statement:
      "Bei Verletzungen medizinische Hilfe holen; Dokumentation, Spurensicherung und Vorgehen ohne sofortige Anzeige direkt mit einer spezialisierten Stelle klären.",
    domains: ["safety", "editorial"],
    locations: [
      {
        path: "/grenzen",
        anchor: "gewalt",
        file: "client/src/pages/Grenzen.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "opferhilfeSchutz",
        locator: "Schutz und akute Gefahr",
        scope:
          "Allgemeiner Schutzrahmen; keine Belegung eines konkreten Spurensicherungs-/Aufnahmeverfahrens.",
      },
    ],
    evidenceStatus: "editorial",
    limitation:
      "Keine zugesagte Leistung oder garantierte Verfahrensregel; das tatsächliche Angebot beim Dienst klären.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "core-akute-gefahr-weiterleitung",
    statement:
      "Bei möglicher unmittelbarer Gefahr oder Gewalt früh passende professionelle Soforthilfe einbeziehen, nur soweit dies für Angehörige sicher möglich ist.",
    domains: ["safety"],
    locations: [
      {
        path: "/unterstuetzen/alltag",
        anchor: "impulsivitaet",
        file: "client/src/pages/UnterstuetzenAlltag.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "opferhilfeSchutz",
        locator: "Wenn Sie in akuter Gefahr sind",
        scope: "Sicherheit aufsuchen und Polizei verständigen.",
      },
      {
        sourceId: "niceNg225",
        locator: "1.5.1 und1.6.1–1.6.5",
        scope:
          "Professionelle psychosoziale Beurteilung, keine Risikoeinstufung durch Angehörige.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Vorsichtige Übertragung auf allgemeine Sorge; kein spezifisches individuelles Krisenprotokoll.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
  {
    id: "core-anhaltende-krisenbelastung",
    statement:
      "Nach einer Krise können belastende Reaktionen auftreten; anhaltende oder beeinträchtigende Beschwerden brauchen eigene fachliche Unterstützung.",
    domains: ["medical", "safety"],
    locations: [
      {
        path: "/unterstuetzen/krise",
        anchor: "nach-der-krise",
        file: "client/src/pages/UnterstuetzenKrise.tsx",
      },
    ],
    sourceRefs: [
      {
        sourceId: "niceNg150",
        locator: "1.7",
        scope:
          "Bedarf an eigener psychologischer/emotionaler Unterstützung; kein vollständiger Beleg einer spezifischen Trauma-Symptomliste.",
      },
    ],
    evidenceStatus: "context",
    limitation:
      "Keine pauschale medizinische Normalitäts- oder Diagnoseaussage. Die konkrete Symptomliste und ihre zeitlichen Grenzen bleiben klinisch zu prüfen.",
    reviewStatus: {
      clinical: "pending",
      swissLegal: "not-applicable",
      reviewer: null,
      approvedAt: null,
    },
  },
];

export function claimById(id: string): ContentClaim {
  const item = contentClaims.find(item => item.id === id);
  if (!item) throw new Error(`Aussage nicht im Quelleninventar: ${id}`);
  return item;
}
