/**
 * KONTAKTE – Single Source of Truth
 *
 * Diese Datei ist das kanonische Kontaktregister der Website.
 * Statische Sonderseiten und Druckvorlagen muessen mit diesen Werten
 * synchron bleiben; Regressionstests pruefen die Spiegelungen.
 *
 * Inventar: 27 Telefonnummern, 4 E-Mail-Adressen, 1 Adresse, 11 URLs.
 *
 * Regeln:
 * - NO-MIX: PUK ≠ USZ ≠ UZH
 * - Keine neuen Kontakte ohne explizite Freigabe
 * - sourceRef benennt interne Fundstellen, keine externe Verifikation.
 *   Externe Quellen und der Umfang eines aktuellen Abgleichs stehen getrennt
 *   in KONTAKT_NACHWEISE. Ein Nummernabgleich ist keine Publikationsfreigabe.
 * - Kategorien: ROT (Notruf), GELB (PUK 24/7), GRUEN (Entlastung), INFO (Beratung)
 * - 145 Tox Info Suisse: auf Website (Soforthilfe Block 4) UND Notfallkarte
 * - 143 ist GRUEN, niemals ROT. Niemals gleichrangig neben 144/117.
 * - UI-Trennung: ROT/GELB/GRUEN = Ampel. INFO immer separat als
 *   „Beratung & Fachstellen", damit Nutzer:innen INFO nicht als „akut" interpretieren.
 *
 * tel-Format:
 * - Kurznummern (3-stellig): nur Ziffern, z. B. "144", "117", "143"
 * - CH-Nummern (058/0848): +41… ohne Leerzeichen, z. B. "+41583846666"
 * - 0800-Gratsnummern: national wählen, z. B. "0800336655"
 *
 * ID-Schema: KATEGORIE_BEZEICHNUNG (Grossbuchstaben + Unterstriche, keine Umlaute)
 */

/**
 * HISTORISCHER QUELLENABGLEICH (Notfallnummern)
 *
 * Verifikationsdatum: 30.05.2026. Abgleich der sicherheitskritischen Notfall-
 * nummern gegen zwei offizielle Quellen — reiner Verifikations-Durchlauf, keine
 * Werte geaendert.
 * Dieser historische Eintrag ist kein erneuter Abgleich im Oktober 2026 und
 * keine dokumentierte fachliche oder institutionelle Publikationsfreigabe.
 *
 * Quelle A — PUK Zuerich, https://www.pukzh.ch (Notfall Zentrale)
 * Quelle B — Suizidpraevention Kanton Zuerich,
 *            https://www.suizidpraevention-zh.ch (Traeger BAG /
 *            reden-kann-retten.ch)
 *
 * Zuordnung (ID ↔ verifizierte Nummer ↔ Quelle), Stand 30.05.2026 — alle MATCH:
 *   GELB_PUK_KJP  058 384 66 66  A (KJPD auch bei B)
 *   GELB_PUK_ERW  058 384 20 00  A
 *   GELB_PUK_65   058 384 46 82  A
 *   INFO_KIZ      058 384 65 00  B (KIZ der PUK, Durchwahl 4)
 *   ROT_144       144            B
 *   ROT_145       145            B
 *   ROT_117       117            B
 *   GRUEN_143     143            B
 *
 * Hinweis: Die PUK-Telefonzentrale +41 58 384 21 11 ist KEIN Notfall-Kontakt
 * und daher bewusst nicht als ROT/GELB gefuehrt.
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
  /** Interne Fundstelle; kein externer Nummern- oder Freigabenachweis. */
  sourceRef: string;
  /** Verfügbarkeit, z. B. "24/7" */
  verfuegbarkeit?: string;
  /** Zielgruppe, z. B. "bis 18 Jahre" */
  fuerWen?: string;
}

/** Ein aktueller Nummernabgleich bestätigt weder Öffnungszeiten noch Freigabe. */
export interface KontaktNachweis {
  /** Region des Dienstes; keine Zusage zur Aufnahme oder zum Einzugsgebiet. */
  region: string;
  /** Offizielle Anbieterquelle; eine URL allein bedeutet keine Verifikation. */
  primarySourceUrl: string | null;
  /** Datum des unabhängig dokumentierten Abgleichs, nicht des Code-Updates. */
  independentCheckDate: string | null;
  /** Welche einzelne Angabe geprüft wurde; ungeprüfte Angaben bleiben offen. */
  independentCheckScope: string | null;
  /** Benannte fachliche Zuständigkeit; null bedeutet noch nicht zugewiesen. */
  namedOwner: string | null;
  status: "pending" | "number-confirmed";
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
    hinweis:
      "Bei unmittelbarer Lebensgefahr, laufender Selbstgefährdung, schwerer Verletzung oder wenn sofort medizinische Hilfe nötig ist",
    sourceRef: "public/soforthilfe/index.html, Notfallkarte v05 (HTML)",
    verfuegbarkeit: "24/7",
  },
  {
    id: "ROT_117",
    kategorie: "rot",
    nummer: "117",
    tel: "117",
    label: "Polizei",
    hinweis: "Bei Gewalt oder wenn Sie sich bedroht fühlen",
    sourceRef: "public/soforthilfe/index.html, Notfallkarte v05 (HTML)",
    verfuegbarkeit: "24/7",
  },
  {
    id: "ROT_112",
    kategorie: "rot",
    nummer: "112",
    tel: "112",
    label: "Notruf (wenn unsicher)",
    hinweis:
      "Europäische Notrufnummer. Eine Verbindung ohne SIM-Karte ist nicht gewährleistet.",
    sourceRef: "public/soforthilfe/index.html, Notfallkarte v05 (HTML)",
    verfuegbarkeit: "24/7",
  },
  {
    id: "ROT_145",
    kategorie: "rot",
    nummer: "145",
    tel: "145",
    label: "Tox Info Suisse",
    hinweis: "Bei Vergiftungsverdacht oder Medikamentenüberdosierung",
    sourceRef: "Notfallkarte v05 (HTML), public/soforthilfe/index.html",
    verfuegbarkeit: "24/7",
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
    hinweis:
      "Für Kinder und Jugendliche bis 18 Jahre – wenn es psychisch akut ist.",
    sourceRef:
      "public/soforthilfe/index.html, UnterstuetzenTherapie.tsx:310, Notfallkarte v05 (HTML)",
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
    sourceRef:
      "public/soforthilfe/index.html, UnterstuetzenTherapie.tsx:310, Notfallkarte v05 (HTML)",
    verfuegbarkeit: "24/7",
    fuerWen: "18–64 Jahre",
  },
  {
    id: "GELB_PUK_65",
    kategorie: "gelb",
    nummer: "058 384 46 82",
    tel: "+41583844682",
    label: "PUK Erwachsene (ab 65) (24/7)",
    hinweis: "Für Menschen ab 65 – akute psychische Krise.",
    sourceRef:
      "public/soforthilfe/index.html, UnterstuetzenTherapie.tsx:310, Notfallkarte v05 (HTML)",
    verfuegbarkeit: "24/7",
    fuerWen: "ab 65 Jahre",
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
    hinweis:
      "Anonymes Gesprächs- und Krisenangebot. Bei akuter Gefahr kein Ersatz für 144 oder 117.",
    sourceRef: "public/soforthilfe/index.html, Notfallkarte v05 (HTML)",
    verfuegbarkeit: "24/7",
  },
  {
    id: "GRUEN_147",
    kategorie: "gruen",
    nummer: "147",
    tel: "147",
    label: "Pro Juventute (24/7)",
    hinweis: "Beratung für Kinder und Jugendliche, anonym, vertraulich.",
    sourceRef: "public/soforthilfe/index.html, Notfallkarte v05 (HTML)",
    verfuegbarkeit: "24/7",
    fuerWen: "Kinder & Jugendliche",
  },
  {
    id: "GRUEN_ELTERN",
    kategorie: "gruen",
    nummer: "0848 35 45 55",
    tel: "+41848354555",
    label: "Elternnotruf (24/7)",
    hinweis: "Beratung für Eltern, anonym, vertraulich.",
    sourceRef: "public/soforthilfe/index.html, Notfallkarte v05 (HTML)",
    verfuegbarkeit: "24/7",
    fuerWen: "Eltern",
  },
];

// ─── INFO/SERVICE – Beratung & Fachstellen ───────────────
// UI: INFO wird NICHT in der Ampel (ROT/GELB/GRUEN) angezeigt,
// sondern separat darunter als „Beratung & Fachstellen".

export const INFO: Kontakt[] = [
  {
    id: "INFO_KIZ",
    kategorie: "info",
    nummer: "058 384 65 00",
    tel: "+41583846500",
    label: "Kriseninterventionszentrum (KIZ)",
    hinweis: "Ambulante Krisenintervention für Erwachsene",
    sourceRef: "public/soforthilfe/index.html, Notfallkarte v05 (HTML)",
    fuerWen: "Erwachsene",
  },
  {
    id: "INFO_AERZTEFON",
    kategorie: "info",
    nummer: "0800 33 66 55",
    tel: "0800336655",
    label: "Ärztefon Zürich",
    hinweis: "Ärztliche Beratung und Weitervermittlung, ggf. Hausbesuch",
    sourceRef: "public/soforthilfe/index.html",
  },
  {
    id: "INFO_OPFERHILFE_142",
    kategorie: "info",
    nummer: "142",
    tel: "142",
    label: "Opferhilfe",
    hinweis:
      "Nationale Opferhilfe-Hotline für körperliche, psychische oder sexuelle Gewalt",
    sourceRef: "Grenzen.tsx Gewalt-Sektion",
    verfuegbarkeit: "24/7",
  },
  {
    id: "INFO_OPFERHILFE_ZH_24_7",
    kategorie: "info",
    nummer: "044 455 21 42",
    tel: "+41444552142",
    label: "Opferhilfe Zürich (24/7)",
    hinweis:
      "Dringende Opferhilfe und Weitervermittlung im Kanton Zürich rund um die Uhr",
    sourceRef: "Grenzen.tsx Gewalt-Sektion",
    verfuegbarkeit: "24/7",
  },
  {
    id: "INFO_FORENSIC_NURSES",
    kategorie: "info",
    nummer: "0800 09 09 09",
    tel: "0800090909",
    label: "Forensic Nurses Zürich",
    hinweis:
      "Medizinische Hilfe, Beratung und Spurensicherung nach sexueller oder häuslicher Gewalt",
    sourceRef: "Grenzen.tsx Gewalt-Sektion",
    verfuegbarkeit: "24/7",
  },
  {
    id: "INFO_OPFERBERATUNG_ZH",
    kategorie: "info",
    nummer: "044 299 40 50",
    tel: "+41442994050",
    label: "Opferberatung Zürich",
    hinweis: "Vertrauliche, kostenlose Beratung zu Bürozeiten",
    sourceRef: "Grenzen.tsx Gewalt-Sektion",
  },
  {
    id: "INFO_PUK_ZENTRALE",
    kategorie: "info",
    nummer: "058 384 21 11",
    tel: "+41583842111",
    label: "PUK Zentrale",
    hinweis: "Allgemeine Auskunft PUK",
    sourceRef: "public/soforthilfe/index.html, UnterstuetzenTherapie.tsx:268",
  },
  {
    id: "INFO_PUK_KJPP_HYPE",
    kategorie: "info",
    nummer: "058 384 66 00",
    tel: "+41583846600",
    label: "KJPP HYPE-Programm",
    hinweis: "Spezialisiertes Programm für Jugendliche",
    sourceRef: "UnterstuetzenTherapie.tsx:251",
  },
  {
    id: "INFO_FACHSTELLE",
    kategorie: "info",
    nummer: "058 384 38 00",
    tel: "+41583843800",
    label: "Fachstelle Angehörigenarbeit PUK",
    hinweis: "Beratung und Begleitung für Angehörige",
    sourceRef: "Selbsthilfegruppen.tsx:348, Impressum.tsx:85",
  },
  {
    id: "INFO_STANDBYYOU",
    kategorie: "info",
    nummer: "0800 840 400",
    tel: "0800840400",
    label: "Stand by You HelpLine",
    hinweis: "Kostenlose HelpLine von Angehörigen für Angehörige",
    sourceRef: "Selbsthilfegruppen.tsx:223",
  },
  {
    id: "INFO_SELBSTHILFE_CH",
    kategorie: "info",
    nummer: "043 288 88 88",
    tel: "+41432888888",
    label: "Selbsthilfe Zürich",
    hinweis: "Vermittlung von Selbsthilfegruppen",
    sourceRef: "Selbsthilfegruppen.tsx:75",
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
  {
    id: "INFO_VASK_ZH",
    kategorie: "info",
    nummer: "044 240 48 68",
    tel: "+41442404868",
    label: "VASK Zürich",
    hinweis: "Beratungstelefon für Angehörige von psychisch Kranken",
    sourceRef: "Selbsthilfegruppen.tsx:286",
  },
  {
    id: "INFO_PUK_DBT",
    kategorie: "info",
    nummer: "058 384 94 91",
    tel: "+41583849491",
    label: "DBT-Station 62B PUK Zürich",
    hinweis: "Stationäre DBT-Behandlung (zertifiziert)",
    sourceRef: "UnterstuetzenTherapie.tsx:271",
  },
  {
    id: "INFO_IPW",
    kategorie: "info",
    nummer: "052 264 34 00",
    tel: "+41522643400",
    label: "IPW Psychotherapiestation junge Erwachsene",
    hinweis:
      "Integrierte Psychiatrie Winterthur, Wieshofstrasse 102, 8408 Winterthur",
    sourceRef: "UnterstuetzenTherapie.tsx:29",
  },
  {
    id: "INFO_SANATORIUM_KILCHBERG",
    kategorie: "info",
    nummer: "044 716 42 42",
    tel: "+41447164242",
    label: "Sanatorium Kilchberg",
    hinweis: "Privatklinik für Psychiatrie und Psychotherapie",
    sourceRef: "Diagnostik.tsx (Anbieter-Box)",
  },
];

// ─── E-Mail-Adressen ─────────────────────────────────────

export const EMAILS: EmailKontakt[] = [
  {
    id: "EMAIL_ANGEHOERIGEN",
    adresse: "angehoerigenarbeit@pukzh.ch",
    label: "Fachstelle Angehörigenarbeit PUK",
    hinweis: "Beratung und Begleitung für Angehörige",
    sourceRef: "Impressum.tsx:96, Feedback.tsx:74, Selbsthilfegruppen.tsx:352",
  },
  {
    id: "EMAIL_KJPP",
    adresse: "kjpp.ambizh@pukzh.ch",
    label: "KJPP Ambulanz Zürich",
    hinweis: "Ambulante Kinder- und Jugendpsychiatrie",
    sourceRef: "UnterstuetzenTherapie.tsx:254",
  },
  {
    id: "EMAIL_HARD",
    adresse: "station62b@pukzh.ch",
    label: "DBT-Station 62B PUK Zürich",
    hinweis: "Stationäre DBT-Behandlung (zertifiziert)",
    sourceRef: "UnterstuetzenTherapie.tsx:272",
  },
  {
    id: "EMAIL_VASK_ZH",
    adresse: "info@vaskzuerich.ch",
    label: "VASK Zürich",
    hinweis: "Kantonale Vereinigung der Angehörigen von psychisch Kranken",
    sourceRef: "Selbsthilfegruppen.tsx:301",
  },
];

// ─── Physische Adressen ──────────────────────────────────

export const ADRESSEN: AdresseKontakt[] = [
  {
    id: "ADRESSE_PUK",
    adresse: "Lenggstrasse 31, 8032 Zürich",
    label: "PUK Zürich",
    sourceRef: "public/soforthilfe/index.html",
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
    sourceRef: "UnterstuetzenTherapie.tsx:285",
  },
  {
    id: "URL_DBT_DACH",
    url: "https://www.dachverband-dbt.de/dbt-therapieangebote",
    label: "DBT-Dachverband",
    sourceRef: "UnterstuetzenTherapie.tsx:296",
  },
  {
    id: "URL_PUK",
    url: "https://www.pukzh.ch",
    label: "PUK Zürich – Website",
    sourceRef: "Fachstelle.tsx:181, Selbsthilfegruppen.tsx:104",
  },
  {
    id: "URL_VASK_ZH",
    url: "https://www.vaskzuerich.ch",
    label: "VASK Zürich",
    sourceRef: "Selbsthilfegruppen.tsx:306",
  },
  {
    id: "URL_IPW",
    url: "https://www.ipw.ch",
    label: "Integrierte Psychiatrie Winterthur (ipw)",
    sourceRef: "Diagnostik.tsx (Anbieter-Box)",
  },
  {
    id: "URL_SANATORIUM_KILCHBERG",
    url: "https://www.sanatorium-kilchberg.ch",
    label: "Sanatorium Kilchberg",
    hinweis: "Privatklinik für Psychiatrie und Psychotherapie",
    sourceRef: "Diagnostik.tsx (Anbieter-Box)",
  },
  {
    id: "URL_PUK_KJP_PERSOENLICHKEITSSTOERUNGEN",
    url: "https://www.pukzh.ch/unsere-angebote/kinder-und-jugendpsychiatrie/behandlungsschwerpunkte/persoenlichkeitsstoerungen/",
    label: "PUK KJPP – Persönlichkeitsstörungen / Elterngruppe",
    hinweis:
      "Behandlungsschwerpunkt der Kinder- und Jugendpsychiatrie der PUK; hier verortet ist die Eltern-Gruppe für Eltern jugendlicher Betroffener.",
    sourceRef: "Diagnostik.tsx (Elterngruppen-Hinweis)",
  },
];

// ─── Verbindliche Texte ──────────────────────────────────

export const TEXTE = {
  pukEinleitung:
    "Die Psychiatrische Universitätsklinik Zürich (PUK) ist die kantonale Anlaufstelle für psychiatrische Krisen. Rufen Sie hier an, wenn eine akute psychische Krise vorliegt, aber keine unmittelbare Lebensgefahr besteht. Bei Lebensgefahr oder wenn sofort Hilfe vor Ort nötig ist: 144 / 117 / 112.",
  pukTriage:
    "Am Telefon wird kurz eingeschätzt (Triage), was jetzt am besten hilft – z. B. Beratung, weiteres Vorgehen oder Notfallaufnahme.",
  gruenGefahrenhinweis:
    "Bei akuter medizinischer Gefahr zuerst 144, bei Gewalt oder Bedrohung 117 wählen. Gesprächsangebote ersetzen keinen Notruf. Ob eine Beratungsstelle bei unmittelbarer Gefahr weitere Hilfe beizieht, richtet sich nach dem jeweiligen Dienst und der konkreten Situation.",
  pukLabel:
    "PUK Zürich (24/7) – psychiatrische Krise, wenn keine unmittelbare Lebensgefahr besteht.",
} as const;

// ─── Hilfsfunktionen ─────────────────────────────────────

/** Alle Website-Kontakte, flach über alle Kategorien */
export const WEBSITE_KONTAKTE: Kontakt[] = [...ROT, ...GELB, ...GRUEN, ...INFO];

/** Website-ROT: Haupt-Notfallnummern (ohne 145 Spezialnummer) */
export const WEBSITE_ROT = ROT.filter(k => k.id !== "ROT_145");

/** Alle Kontakte flach */
export const ALLE_KONTAKTE: Kontakt[] = [...ROT, ...GELB, ...GRUEN, ...INFO];

function pendingKontaktNachweis(
  region: string,
  primarySourceUrl: string | null = null
): KontaktNachweis {
  return {
    region,
    primarySourceUrl,
    independentCheckDate: null,
    independentCheckScope: null,
    namedOwner: null,
    status: "pending",
  };
}

const pukPrimarySourceUrl = urlByIdStrict("URL_PUK").url;

/**
 * Getrennte Nachweise für alle 27 Telefonkontakte.
 *
 * Stand 06.10.2026: Nur die drei unten ausdrücklich gekennzeichneten Nummern
 * wurden auf den offiziellen Anbieterwebsites unabhängig bestätigt. Der
 * Abgleich umfasst keine Öffnungszeiten und keine Publikationsfreigabe.
 * Die historischen sourceRef-Fundstellen und der Mai-Abgleich oben ersetzen
 * diese Nachweise nicht. Fachliche Zuständigkeiten sind noch zu benennen.
 */
export const KONTAKT_NACHWEISE: Record<string, KontaktNachweis> = {
  ROT_144: pendingKontaktNachweis("Schweiz"),
  ROT_117: pendingKontaktNachweis("Schweiz"),
  ROT_112: pendingKontaktNachweis("Schweiz"),
  ROT_145: {
    region: "Schweiz",
    primarySourceUrl: "https://www.toxinfo.ch/",
    independentCheckDate: "2026-10-06",
    independentCheckScope:
      "Veröffentlichte Telefonnummer 145 auf der Anbieterwebsite bestätigt; keine Prüfung von Öffnungszeiten oder fachlicher Publikationsfreigabe.",
    namedOwner: null,
    status: "number-confirmed",
  },
  GELB_PUK_KJP: pendingKontaktNachweis("Kanton Zürich", pukPrimarySourceUrl),
  GELB_PUK_ERW: pendingKontaktNachweis("Kanton Zürich", pukPrimarySourceUrl),
  GELB_PUK_65: pendingKontaktNachweis("Kanton Zürich", pukPrimarySourceUrl),
  GRUEN_143: pendingKontaktNachweis("Schweiz"),
  GRUEN_147: pendingKontaktNachweis(
    "Schweiz",
    "https://www.147.ch/de/info/darum-kannst-du-uns-vertrauen/"
  ),
  GRUEN_ELTERN: pendingKontaktNachweis("Schweiz"),
  INFO_KIZ: pendingKontaktNachweis("Kanton Zürich", pukPrimarySourceUrl),
  INFO_AERZTEFON: pendingKontaktNachweis("Kanton Zürich"),
  INFO_OPFERHILFE_142: {
    region: "Schweiz",
    primarySourceUrl: "https://www.opferhilfe-schweiz.ch/de/",
    independentCheckDate: "2026-10-06",
    independentCheckScope:
      "Veröffentlichte Telefonnummer 142 auf der offiziellen Website der Opferhilfe Schweiz bestätigt; keine Prüfung von Öffnungszeiten oder fachlicher Publikationsfreigabe.",
    namedOwner: null,
    status: "number-confirmed",
  },
  INFO_OPFERHILFE_ZH_24_7: pendingKontaktNachweis("Kanton Zürich"),
  INFO_FORENSIC_NURSES: pendingKontaktNachweis("Kanton Zürich"),
  INFO_OPFERBERATUNG_ZH: pendingKontaktNachweis("Kanton Zürich"),
  INFO_PUK_ZENTRALE: pendingKontaktNachweis(
    "Kanton Zürich",
    pukPrimarySourceUrl
  ),
  INFO_PUK_KJPP_HYPE: pendingKontaktNachweis(
    "Kanton Zürich",
    urlByIdStrict("URL_PUK_KJP_PERSOENLICHKEITSSTOERUNGEN").url
  ),
  INFO_FACHSTELLE: pendingKontaktNachweis("Kanton Zürich", pukPrimarySourceUrl),
  INFO_STANDBYYOU: {
    region: "Schweiz",
    primarySourceUrl: "https://stand-by-you.ch/",
    independentCheckDate: "2026-10-06",
    independentCheckScope:
      "Veröffentlichte HelpLine-Nummer 0800 840 400 auf der Anbieterwebsite bestätigt; keine Prüfung von Öffnungszeiten oder fachlicher Publikationsfreigabe.",
    namedOwner: null,
    status: "number-confirmed",
  },
  INFO_SELBSTHILFE_CH: pendingKontaktNachweis("Kanton Zürich"),
  INFO_PROMENTE: pendingKontaktNachweis(
    "Schweiz",
    urlByIdStrict("URL_PROMENTE").url
  ),
  INFO_VASK_ZH: pendingKontaktNachweis(
    "Kanton Zürich",
    urlByIdStrict("URL_VASK_ZH").url
  ),
  INFO_PUK_DBT: pendingKontaktNachweis("Kanton Zürich", pukPrimarySourceUrl),
  INFO_IPW: pendingKontaktNachweis(
    "Kanton Zürich",
    urlByIdStrict("URL_IPW").url
  ),
  INFO_SANATORIUM_KILCHBERG: pendingKontaktNachweis(
    "Kanton Zürich",
    urlByIdStrict("URL_SANATORIUM_KILCHBERG").url
  ),
};

/** Getrennten Quellen- und Prüfstatus über die bestehende Kontakt-ID abrufen. */
export function kontaktNachweisById(id: string): KontaktNachweis | undefined {
  return KONTAKT_NACHWEISE[id];
}

export function kontaktNachweisByIdStrict(id: string): KontaktNachweis {
  const nachweis = kontaktNachweisById(id);
  if (!nachweis) throw new Error(`Kontaktnachweis nicht gefunden: "${id}"`);
  return nachweis;
}

/** Kontakt nach ID finden */
export function kontaktById(id: string): Kontakt | undefined {
  return ALLE_KONTAKTE.find(k => k.id === id);
}

/** Kontakt nach ID finden – wirft einen klaren Fehler wenn nicht gefunden */
export function kontaktByIdStrict(id: string): Kontakt {
  const k = kontaktById(id);
  if (!k)
    throw new Error(
      `Kontakt nicht gefunden: "${id}". Wurde die ID in kontakte.ts umbenannt oder entfernt?`
    );
  return k;
}

/**
 * Kanonischer Akutblock — geordnete ID-Liste (akut → entlastend), aus der die
 * Handout-Notfalllisten EINHEITLICH gerendert werden (Single Source of Truth
 * für die Krisennummern-Sätze). Reihenfolge bewusst: Rettung/Polizei →
 * ärztliche Triage → psychiatrische 24/7-Krise (PUK) → entlastendes Gespräch.
 *
 * Bewusst NICHT enthalten (Freigabe 30.05.2026):
 * - INFO_KIZ (ambulante Krisenintervention, kein 24/7-Notfall)
 * - INFO_FACHSTELLE (Angehörigen-Beratung — wird kontextuell als Ergänzung
 *   angehängt, nicht als Akutnummer geführt)
 */
export const AKUT_KONTAKT_IDS = [
  "ROT_144", // Sanität
  "ROT_117", // Polizei
  "INFO_AERZTEFON", // Ärztefon Zürich, Triage 24/7
  "GELB_PUK_ERW", // PUK Notfall Erwachsene 24/7
  "GELB_PUK_KJP", // PUK Kinder & Jugendliche 24/7
  "GELB_PUK_65", // PUK ab 65 24/7
  "GRUEN_143", // Dargebotene Hand
] as const;

/** E-Mail nach ID finden */
export function emailById(id: string): EmailKontakt | undefined {
  return EMAILS.find(e => e.id === id);
}

/** E-Mail nach ID – wirft Fehler wenn nicht gefunden */
export function emailByIdStrict(id: string): EmailKontakt {
  const e = emailById(id);
  if (!e) throw new Error(`E-Mail nicht gefunden: "${id}"`);
  return e;
}

/** URL nach ID finden */
export function urlById(id: string): UrlKontakt | undefined {
  return URLS.find(u => u.id === id);
}

/** URL nach ID – wirft Fehler wenn nicht gefunden */
export function urlByIdStrict(id: string): UrlKontakt {
  const u = urlById(id);
  if (!u) throw new Error(`URL nicht gefunden: "${id}"`);
  return u;
}

/** Adresse nach ID finden */
export function adresseById(id: string): AdresseKontakt | undefined {
  return ADRESSEN.find(a => a.id === id);
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
  }
  validateKontakteCoverage();
}

/** Fehlende, verwaiste oder widersprüchliche Telefonkontakt-Nachweise abweisen. */
export function validateKontakteCoverage(): void {
  const kontaktIds = new Set(ALLE_KONTAKTE.map(k => k.id));
  for (const id of Array.from(kontaktIds)) {
    const nachweis = kontaktNachweisById(id);
    if (!nachweis) throw new Error(`Kontakt ohne Kontaktnachweis: ${id}`);
    if (!nachweis.region.trim()) {
      throw new Error(`Kontaktnachweis ohne Region: ${id}`);
    }
    if (
      nachweis.status === "number-confirmed" &&
      (!nachweis.primarySourceUrl ||
        !nachweis.independentCheckDate ||
        !nachweis.independentCheckScope?.trim())
    ) {
      throw new Error(
        `Nummernbestätigung ohne Quelle, Datum oder Umfang: ${id}`
      );
    }
    if (
      nachweis.status === "pending" &&
      (nachweis.independentCheckDate !== null ||
        nachweis.independentCheckScope !== null)
    ) {
      throw new Error(
        `Offener Kontaktnachweis mit behauptetem Abgleich: ${id}`
      );
    }
  }
  for (const id of Object.keys(KONTAKT_NACHWEISE)) {
    if (!kontaktIds.has(id)) {
      throw new Error(`Kontaktnachweis ohne Kontakt: ${id}`);
    }
  }
}
