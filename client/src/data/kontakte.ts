/**
 * KONTAKTE – Single Source of Truth
 *
 * Alle Telefonnummern, E-Mail-Adressen, Adressen und URLs auf der Website
 * kommen ausschliesslich aus dieser Datei. Keine Nummern im Fliesstext.
 *
 * Inventar: 19 Telefonnummern, 3 E-Mail-Adressen, 1 Adresse, 6 URLs.
 *
 * Regeln:
 * - NO-MIX: PUK ≠ USZ ≠ UZH
 * - Keine neuen Kontakte ohne explizite Freigabe
 * - INFO enthält nur Einträge, die im Forensik-Kontaktregister verifiziert sind
 *   (Fundstelle + Quelle). sourceRef ist Pflichtfeld.
 * - Kategorien: ROT (Notruf), GELB (PUK 24/7), GRUEN (Entlastung), INFO (Beratung)
 * - 118 nur auf Notfallkarte (PDF), nicht auf der Website
 * - 145 Tox Info Suisse: auf Website (Soforthilfe Block 4) UND Notfallkarte
 * - 143 ist GRUEN, niemals ROT. Niemals gleichrangig neben 144/117.
 * - UI-Trennung: ROT/GELB/GRUEN = Ampel. INFO immer separat als
 *   „Beratung & Fachstellen", damit Nutzer:innen INFO nicht als „akut" interpretieren.
 *
 * tel-Format:
 * - Kurznummern (3-stellig): nur Ziffern, z. B. "144", "117", "143"
 * - CH-Nummern (058/0800/0848): +41… ohne Leerzeichen, z. B. "+41583846666"
 *   Ausnahme: 0848-Nummern dürfen auch digit-only sein, z. B. "0848354555"
 *
 * ID-Schema: KATEGORIE_BEZEICHNUNG (Grossbuchstaben + Unterstriche, keine Umlaute)
 */

// ─── Typen ───────────────────────────────────────────────

export type Kategorie = "rot" | "gelb" | "gruen" | "info";

export interface Kontakt {
  /** Eindeutiger Schlüssel, z. B. "ROT_144", "GELB_PUK_KJP" */
  id: string;
  /** Kategorie für Farbcodierung */
  kategorie: Kategorie;
  /** Angezeigte Nummer (Schweizer Format) */
  nummer: string;
  /** Wählbare Nummer für tel:-Links (Kurznummern: Ziffern, CH-Nummern: +41…) */
  tel: string;
  /** Kurzname / Label */
  label: string;
  /** Einzeiliger Hinweistext */
  hinweis: string;
  /** Forensik-Fundstelle als Nachweis, z. B. "Soforthilfe.tsx:94" */
  sourceRef: string;
  /** Verfügbarkeit, z. B. "24/7" */
  verfuegbarkeit?: string;
  /** Zielgruppe, z. B. "bis 18 Jahre" */
  fuerWen?: string;
  /** Nur auf Notfallkarte (PDF), nicht auf Website */
  nurPdf?: boolean;
}

export interface EmailKontakt {
  id: string;
  adresse: string;
  label: string;
  hinweis: string;
  sourceRef: string;
}

export interface AdresseKontakt {
  id: string;
  adresse: string;
  label: string;
  sourceRef: string;
}

export interface UrlKontakt {
  id: string;
  url: string;
  label: string;
  hinweis?: string;
  sourceRef: string;
}

// ─── ROT – Notruf (Einsatzdienst kommt) ─────────────────

export const ROT: Kontakt[] = [
  {
    id: "ROT_144",
    kategorie: "rot",
    nummer: "144",
    tel: "144",
    label: "Rettungsdienst",
    hinweis: "Bei akuter Lebensgefahr, Selbstverletzung oder akuter Suizidgefahr",
    sourceRef: "Soforthilfe.tsx:94, Notfallkarte PDF v04",
    verfuegbarkeit: "24/7",
  },
  {
    id: "ROT_117",
    kategorie: "rot",
    nummer: "117",
    tel: "117",
    label: "Polizei",
    hinweis: "Bei Gewalt oder wenn Sie sich bedroht fühlen",
    sourceRef: "Soforthilfe.tsx:100, Notfallkarte PDF v04",
    verfuegbarkeit: "24/7",
  },
  {
    id: "ROT_112",
    kategorie: "rot",
    nummer: "112",
    tel: "112",
    label: "Notruf (wenn unsicher)",
    hinweis: "Wenn Sie unsicher sind, welche Nummer – funktioniert immer.",
    sourceRef: "Soforthilfe.tsx:106, Notfallkarte PDF v04",
    verfuegbarkeit: "24/7",
  },
  {
    id: "ROT_145",
    kategorie: "rot",
    nummer: "145",
    tel: "145",
    label: "Tox Info Suisse",
    hinweis: "Bei Vergiftungsverdacht oder Medikamentenüberdosierung",
    sourceRef: "Notfallkarte PDF v04, Soforthilfe.tsx Block 4",
    verfuegbarkeit: "24/7",
  },
  {
    id: "ROT_118",
    kategorie: "rot",
    nummer: "118",
    tel: "118",
    label: "Feuerwehr",
    hinweis: "Feuer, Elementarschäden",
    sourceRef: "Notfallkarte PDF v04",
    verfuegbarkeit: "24/7",
    nurPdf: true,
  },
];

// ─── GELB – Psychiatrische Notfallhilfe PUK Zürich (24/7) ──

export const GELB: Kontakt[] = [
  {
    id: "GELB_PUK_KJP",
    kategorie: "gelb",
    nummer: "058 384 66 66",
    tel: "+41583846666",
    label: "PUK Kinder & Jugendliche (24/7)",
    hinweis: "Für Kinder und Jugendliche bis 18 Jahre – wenn es psychisch akut ist.",
    sourceRef: "Soforthilfe.tsx:183, UnterstuetzenTherapie.tsx:379, Notfallkarte PDF v04",
    verfuegbarkeit: "24/7",
    fuerWen: "bis 18 Jahre",
  },
  {
    id: "GELB_PUK_ERW",
    kategorie: "gelb",
    nummer: "058 384 20 00",
    tel: "+41583842000",
    label: "PUK Erwachsene (24/7)",
    hinweis: "Für Erwachsene ab 18 – akute psychische Krise.",
    sourceRef: "Soforthilfe.tsx:207, UnterstuetzenTherapie.tsx:383, Notfallkarte PDF v04",
    verfuegbarkeit: "24/7",
    fuerWen: "ab 18 Jahre",
  },
  {
    id: "GELB_PUK_65",
    kategorie: "gelb",
    nummer: "058 384 46 82",
    tel: "+41583844682",
    label: "PUK Erwachsene (ab 65) (24/7)",
    hinweis: "Für Menschen ab 65 – akute psychische Krise.",
    sourceRef: "Soforthilfe.tsx:231, UnterstuetzenTherapie.tsx:386, Notfallkarte PDF v04",
    verfuegbarkeit: "24/7",
    fuerWen: "ab 65 Jahre",
  },
  {
    id: "GELB_KIZ",
    kategorie: "gelb",
    nummer: "058 384 65 00",
    tel: "+41583846500",
    label: "Kriseninterventionszentrum (KIZ)",
    hinweis: "Für akute psychiatrische Krisen bei Erwachsenen.",
    sourceRef: "Soforthilfe.tsx:255",
    verfuegbarkeit: "24/7",
    fuerWen: "Erwachsene",
  },
];

// ─── GRUEN – Zuhören & Entlastung (kein Einsatzdienst) ───

export const GRUEN: Kontakt[] = [
  {
    id: "GRUEN_143",
    kategorie: "gruen",
    nummer: "143",
    tel: "143",
    label: "Dargebotene Hand (24/7)",
    hinweis: "Anonymes Gesprächs- und Krisenangebot, vertraulich. Es kommt niemand vorbei.",
    sourceRef: "Soforthilfe.tsx:324, Notfallkarte PDF v04",
    verfuegbarkeit: "24/7",
  },
  {
    id: "GRUEN_147",
    kategorie: "gruen",
    nummer: "147",
    tel: "147",
    label: "Pro Juventute (24/7)",
    hinweis: "Beratung für Kinder und Jugendliche, anonym, vertraulich.",
    sourceRef: "Soforthilfe.tsx:367, Notfallkarte PDF v04",
    verfuegbarkeit: "24/7",
    fuerWen: "Kinder & Jugendliche",
  },
  {
    id: "GRUEN_ELTERN",
    kategorie: "gruen",
    nummer: "0848 35 45 55",
    tel: "0848354555",
    label: "Elternnotruf (24/7)",
    hinweis: "Beratung für Eltern, anonym, vertraulich.",
    sourceRef: "Soforthilfe.tsx:347, Notfallkarte PDF v04",
    verfuegbarkeit: "24/7",
    fuerWen: "Eltern",
  },
];

// ─── INFO/SERVICE – Beratung & Fachstellen ───────────────
// UI: INFO wird NICHT in der Ampel (ROT/GELB/GRUEN) angezeigt,
// sondern separat darunter als „Beratung & Fachstellen".

export const INFO: Kontakt[] = [
  {
    id: "INFO_AERZTEFON",
    kategorie: "info",
    nummer: "0800 33 66 55",
    tel: "+41800336655",
    label: "Ärztefon Zürich",
    hinweis: "Ärztliche Beratung und Weitervermittlung, ggf. Hausbesuch",
    sourceRef: "Soforthilfe.tsx:281",
  },
  {
    id: "INFO_PUK_ZENTRALE",
    kategorie: "info",
    nummer: "058 384 21 11",
    tel: "+41583842111",
    label: "PUK Zentrale",
    hinweis: "Allgemeine Auskunft PUK",
    sourceRef: "Soforthilfe.tsx:294, UnterstuetzenTherapie.tsx:333",
  },
  {
    id: "INFO_PUK_KJPP_HYPE",
    kategorie: "info",
    nummer: "058 384 66 00",
    tel: "+41583846600",
    label: "KJPP HYPE-Programm",
    hinweis: "Spezialisiertes Programm für Jugendliche",
    sourceRef: "UnterstuetzenTherapie.tsx:307",
  },
  {
    id: "INFO_FACHSTELLE",
    kategorie: "info",
    nummer: "058 384 38 00",
    tel: "+41583843800",
    label: "Fachstelle Angehörigenarbeit PUK",
    hinweis: "Beratung und Begleitung für Angehörige",
    sourceRef: "Selbsthilfegruppen.tsx:348, Impressum.tsx:81",
  },
  {
    id: "INFO_SELBSTHILFE_CH",
    kategorie: "info",
    nummer: "0800 840 400",
    tel: "+41800840400",
    label: "Selbsthilfe Schweiz",
    hinweis: "Vermittlung von Selbsthilfegruppen",
    sourceRef: "Selbsthilfegruppen.tsx:75",
  },
  {
    id: "INFO_SELBSTHILFE_INFO",
    kategorie: "info",
    nummer: "0848 33 99 00",
    tel: "+41848339900",
    label: "Selbsthilfe Infoline",
    hinweis: "Telefonische Beratung zu Selbsthilfe",
    sourceRef: "Selbsthilfegruppen.tsx:247",
  },
  {
    id: "INFO_PROMENTE",
    kategorie: "info",
    nummer: "0848 800 858",
    tel: "+41848800858",
    label: "Pro Mente Sana",
    hinweis: "Beratung zu psychischer Gesundheit",
    sourceRef: "Selbsthilfegruppen.tsx:277, Selbstfuersorge.tsx:601",
  },
];

// ─── E-Mail-Adressen ─────────────────────────────────────

export const EMAILS: EmailKontakt[] = [
  {
    id: "EMAIL_ANGEHOERIGEN",
    adresse: "angehoerigenarbeit@pukzh.ch",
    label: "Fachstelle Angehörigenarbeit PUK",
    hinweis: "Beratung und Begleitung für Angehörige",
    sourceRef: "Impressum.tsx:92, Feedback.tsx:275, Selbsthilfegruppen.tsx:352",
  },
  {
    id: "EMAIL_KJPP",
    adresse: "kjpp.ambizh@pukzh.ch",
    label: "KJPP Ambulanz Zürich",
    hinweis: "Ambulante Kinder- und Jugendpsychiatrie",
    sourceRef: "UnterstuetzenTherapie.tsx:310",
  },
  {
    id: "EMAIL_HARD",
    adresse: "klinik.hard@pukzh.ch",
    label: "DBT-Station B2 Hard",
    hinweis: "Stationäre DBT-Behandlung",
    sourceRef: "UnterstuetzenTherapie.tsx:336",
  },
];

// ─── Physische Adressen ──────────────────────────────────

export const ADRESSEN: AdresseKontakt[] = [
  {
    id: "ADRESSE_PUK",
    adresse: "Lenggstrasse 31, 8032 Zürich",
    label: "PUK Zürich",
    sourceRef: "Soforthilfe.tsx:167",
  },
];

// ─── Externe URLs ────────────────────────────────────────

export const URLS: UrlKontakt[] = [
  {
    id: "URL_STANDBYYOU",
    url: "https://www.stand-by-you.ch",
    label: "Stand By You",
    hinweis: "Angehörigen-Netzwerk",
    sourceRef: "Selbsthilfegruppen.tsx:86, Selbstfuersorge.tsx:597",
  },
  {
    id: "URL_SELBSTHILFE_CH",
    url: "https://www.selbsthilfeschweiz.ch",
    label: "Selbsthilfe Schweiz",
    sourceRef: "Selbsthilfegruppen.tsx:167",
  },
  {
    id: "URL_PROMENTE",
    url: "https://www.promentesana.ch",
    label: "Pro Mente Sana",
    sourceRef: "Selbsthilfegruppen.tsx:281",
  },
  {
    id: "URL_DEPRESS",
    url: "https://www.depressionen.ch",
    label: "Depressionen Schweiz",
    sourceRef: "Selbsthilfegruppen.tsx:314",
  },
  {
    id: "URL_CLIENIA",
    url: "https://www.clienia.ch/de/standorte/clienia-schloessli/stationen/a2/",
    label: "Clienia Schlössli DBT",
    sourceRef: "UnterstuetzenTherapie.tsx:351",
  },
  {
    id: "URL_DBT_DACH",
    url: "https://www.dachverband-dbt.de/dbt-therapieangebote",
    label: "DBT-Dachverband",
    sourceRef: "UnterstuetzenTherapie.tsx:362",
  },
  {
    id: "URL_PUK",
    url: "https://www.pukzh.ch",
    label: "PUK Zürich – Website",
    sourceRef: "Fachstelle.tsx:181, Selbsthilfegruppen.tsx:104",
  },
];

// ─── Verbindliche Texte ──────────────────────────────────

export const TEXTE = {
  pukEinleitung:
    "Die Psychiatrische Universitätsklinik Zürich (PUK) ist die kantonale Anlaufstelle für psychiatrische Krisen. Rufen Sie hier an, wenn eine akute psychische Krise vorliegt, aber keine unmittelbare Lebensgefahr besteht. Bei Lebensgefahr oder wenn sofort Hilfe vor Ort nötig ist: 144 / 117 / 112.",
  pukTriage:
    "Am Telefon wird kurz eingeschätzt (Triage), was jetzt am besten hilft – z.\u00A0B. Beratung, weiteres Vorgehen oder Notfallaufnahme.",
  gruenGefahrenhinweis:
    "Bei akuter Gefahr für sich oder andere: Immer zuerst 144 / 117 / 112 rufen. Die Nummern oben sind Sorgentelefone – es kommt niemand vorbei.",
  pukLabel:
    "PUK Zürich (24/7) – psychiatrische Krise, wenn keine unmittelbare Lebensgefahr besteht.",
} as const;

// ─── Hilfsfunktionen ─────────────────────────────────────

/** Alle Website-Kontakte (ohne nurPdf), flach über alle Kategorien */
export const WEBSITE_KONTAKTE: Kontakt[] = [...ROT, ...GELB, ...GRUEN, ...INFO].filter(
  (k) => !k.nurPdf,
);

/** Website-ROT (ohne 145/118) */
export const WEBSITE_ROT = ROT.filter((k) => !k.nurPdf);

/** Alle Kontakte flach (inkl. nurPdf) */
export const ALLE_KONTAKTE: Kontakt[] = [...ROT, ...GELB, ...GRUEN, ...INFO];

/** Kontakt nach ID finden */
export function kontaktById(id: string): Kontakt | undefined {
  return ALLE_KONTAKTE.find((k) => k.id === id);
}

/** E-Mail nach ID finden */
export function emailById(id: string): EmailKontakt | undefined {
  return EMAILS.find((e) => e.id === id);
}

/** URL nach ID finden */
export function urlById(id: string): UrlKontakt | undefined {
  return URLS.find((u) => u.id === id);
}

/** Adresse nach ID finden */
export function adresseById(id: string): AdresseKontakt | undefined {
  return ADRESSEN.find((a) => a.id === id);
}

// ─── QA-Guardrail: Validierung ───────────────────────────
// Einmal bei Bedarf ausführen (z. B. im Build oder als Test).

export function validateKontakte(): void {
  for (const k of ALLE_KONTAKTE) {
    if (!k.sourceRef?.trim()) {
      throw new Error(`Kontakt ohne sourceRef: ${k.id}`);
    }
    if (k.id === "GRUEN_143" && k.kategorie !== "gruen") {
      throw new Error("143 muss gruen sein");
    }
    if (k.id === "ROT_118" && !k.nurPdf) {
      throw new Error("118 muss nurPdf=true sein");
    }
  }
  // Prüfe, dass nurPdf-Einträge nicht in WEBSITE_KONTAKTE auftauchen
  for (const k of WEBSITE_KONTAKTE) {
    if (k.nurPdf) {
      throw new Error(`nurPdf-Eintrag in WEBSITE_KONTAKTE: ${k.id}`);
    }
  }
}
