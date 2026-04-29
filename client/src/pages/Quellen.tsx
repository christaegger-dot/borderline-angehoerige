/**
 * Quellen & Literatur — Editorial-Redesign Phase 5 (Page 2/9, Tier 2)
 *
 * Migriert auf Editorial-Pattern. Folgt Phase-5-Master-Brief, Abschnitt
 * «Page 2 — Quellen».
 *
 * Pattern: Literatur-Liste gruppiert nach 4 Kategorien als <ul> mit
 * hängender Einrückung. Pro Eintrag: Autor (Jahr). *Titel*. Quelle.
 * Optional Hinweis-Paragraph + PubMed/WHO-Link als editorial-link.
 *
 * Stabile id-Anker pro Eintrag (Schema `src-<author-slug>-<year>`),
 * damit Tier-1-Pages später per `EditorialFootnotes` mit href auf
 * konkrete Quellen verlinken können. Aktuell keine Cross-Page-Refs zu
 * /quellen#-Ankern im Repo.
 */
import {
  EditorialLayout,
  EditorialProse,
  EditorialSection,
} from "@/components/editorial";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

interface QuelleEintrag {
  autoren: string;
  jahr: string;
  titel: string;
  quelle: string;
  hinweis?: string;
  link?: string | null;
  linkLabel?: string;
}

interface QuelleKategorie {
  kategorie: string;
  eintraege: QuelleEintrag[];
}

const quellen: QuelleKategorie[] = [
  {
    kategorie: "Klinische Studien & Forschung",
    eintraege: [
      {
        autoren: "Storebø, O. J. et al.",
        jahr: "2020",
        titel:
          "Psychological therapies for people with borderline personality disorder",
        quelle: "Cochrane Database of Systematic Reviews 5(5), CD012955",
        hinweis:
          "Cochrane-Übersichtsarbeit zu 75 randomisierten Studien (4'507 Teilnehmer:innen). DBT und MBT sind die am häufigsten untersuchten Verfahren. Insgesamt belegt der Review klinisch relevante Verbesserungen der Borderline-Symptomatik durch BPS-spezifische Psychotherapie gegenüber Standardbehandlung.",
        link: "https://pubmed.ncbi.nlm.nih.gov/32368793/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Zanarini, M. C. et al.",
        jahr: "2010",
        titel:
          "Time to attainment of recovery from borderline personality disorder and stability of recovery: A 10-year prospective follow-up study",
        quelle: "American Journal of Psychiatry",
        hinweis:
          "Grundlage für die 10-Jahres-Daten zu symptomatischer Remission und Recovery im McLean Study of Adult Development. Spezialisierte Stichprobe, daher nicht direkt auf alle Betroffenen übertragbar.",
        link: "https://pubmed.ncbi.nlm.nih.gov/20395399/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Zanarini, M. C. et al.",
        jahr: "2012",
        titel:
          "Attainment and stability of sustained symptomatic remission and recovery among borderline patients and Axis II comparison subjects",
        quelle: "American Journal of Psychiatry",
        hinweis:
          "Langzeit-Follow-up zur Stabilität von Remission und Recovery. Wichtige Grundlage für die Unterscheidung zwischen Symptombesserung und funktioneller Genesung.",
        link: "https://pubmed.ncbi.nlm.nih.gov/22737693/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Gunderson, J. G. et al.",
        jahr: "2011",
        titel:
          "Ten-year course of borderline personality disorder: Psychopathology and function from the Collaborative Longitudinal Personality Disorders study",
        quelle: "Archives of General Psychiatry 68(8), 827–837",
        hinweis:
          "Komplementär zur Zanarini-McLean-Studie: 85% Remission, 12% Rückfallrate über zehn Jahre. Belegt zudem persistierende Beeinträchtigungen im sozialen Funktionieren — Remission ist nicht gleichbedeutend mit voller funktioneller Genesung.",
        link: "https://pubmed.ncbi.nlm.nih.gov/21464343/",
        linkLabel: "PubMed",
      },
      {
        autoren:
          "Gunderson, J. G., Herpertz, S. C., Skodol, A. E., Torgersen, S. & Zanarini, M. C.",
        jahr: "2018",
        titel: "Borderline personality disorder",
        quelle: "Nature Reviews Disease Primers 4, 18029",
        hinweis:
          "Übersichtsarbeit zu Diagnose, Verlauf, Behandlung und Versorgung von BPS. In Handout-Materialien als Standard-Übersicht zitiert.",
        link: "https://pubmed.ncbi.nlm.nih.gov/29795363/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Gunderson, J. G., Berkowitz, C. & Ruiz-Sancho, A.",
        jahr: "1997",
        titel: "Families of borderline patients: a psychoeducational approach",
        quelle: "Bulletin of the Menninger Clinic 61(4), 446–457",
        hinweis:
          "Peer-reviewed Studie zur psychoedukativen Familienarbeit bei BPS. Wissenschaftliche Grundlage des später entwickelten NEABPD-Manuals «Family Guidelines» (siehe Eintrag in «Versorgungs-Materialien & Praxis-Manuale»).",
        link: "https://pubmed.ncbi.nlm.nih.gov/9401149/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Bateman, A. & Fonagy, P.",
        jahr: "2009",
        titel:
          "Randomized controlled trial of outpatient mentalization-based treatment versus structured clinical management for borderline personality disorder",
        quelle: "American Journal of Psychiatry 166(12), 1355–1364",
        hinweis:
          "Zentrale RCT-Wirksamkeitsstudie für ambulante Mentalisierungs-basierte Therapie (MBT). 134 Teilnehmer:innen, 18 Monate. Beide Verglichenen Bedingungen verbessern sich; MBT-Gruppe zeigt steileren Rückgang von Suizidversuchen, Selbstverletzung, Hospitalisierungen und selbstberichteten Symptomen. Aktualisierungs-Quelle zum älteren Bateman/Fonagy-2004-Eintrag in der Therapie-Kategorie.",
        link: "https://pubmed.ncbi.nlm.nih.gov/19833787/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Linehan, M. M.",
        jahr: "1993",
        titel:
          "Cognitive-Behavioral Treatment of Borderline Personality Disorder",
        quelle: "Guilford Press",
        hinweis:
          "Grundlagenwerk zur Dialektisch-Behavioralen Therapie (DBT). Beschreibt das bio-soziale Modell und Behandlungsansätze.",
      },
      {
        autoren: "Skodol, A. E. et al.",
        jahr: "2005",
        titel:
          "Prevalence and quality of life in personality disorders: Results from the Collaborative Longitudinal Personality Disorders Study",
        quelle: "Journal of Personality Disorders",
        hinweis: "Prävalenz- und Verlaufsdaten zu Persönlichkeitsstörungen.",
        link: "https://pubmed.ncbi.nlm.nih.gov/16274278/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Torgersen, S. et al.",
        jahr: "2000",
        titel: "The prevalence of personality disorders in a community sample",
        quelle: "Archives of General Psychiatry",
        hinweis: "Häufigkeit von BPS in der Allgemeinbevölkerung (ca. 1–3%).",
        link: "https://pubmed.ncbi.nlm.nih.gov/10872917/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Maslach, C. & Leiter, M. P.",
        jahr: "2016",
        titel:
          "Understanding the burnout experience: recent research and its implications for psychiatry",
        quelle: "World Psychiatry 15(2), 103–111",
        hinweis:
          "Burnout-Forschung (nicht BPS-spezifisch). Im Body als Beleg für soziale Unterstützung als Schutzfaktor gegen Überlastung und Erschöpfung referenziert (Selbstfürsorge).",
        link: "https://pubmed.ncbi.nlm.nih.gov/27265691/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Zaccaro, A., Piarulli, A., Laurino, M. et al.",
        jahr: "2018",
        titel:
          "How Breath-Control Can Change Your Life: A Systematic Review on Psycho-Physiological Correlates of Slow Breathing",
        quelle: "Frontiers in Human Neuroscience 12, 353",
        hinweis:
          "Systematischer Review zur psychophysiologischen Wirkung langsamer Atmung. Im Body als Beleg dafür referenziert, dass kurze Regulationsübungen akute Anspannung im Körper senken können (Selbstfürsorge).",
        link: "https://pubmed.ncbi.nlm.nih.gov/30245619/",
        linkLabel: "PubMed",
      },
    ],
  },
  {
    kategorie: "Fachliteratur Therapie & Behandlung",
    eintraege: [
      {
        autoren: "American Psychiatric Association (Keepers, G. A. et al.)",
        jahr: "2024",
        titel:
          "The American Psychiatric Association Practice Guideline for the Treatment of Patients With Borderline Personality Disorder",
        quelle: "American Journal of Psychiatry 181(11), 1024–1028",
        hinweis:
          "Aktuelle US-amerikanische Behandlungsleitlinie für Borderline-Persönlichkeitsstörung. Im Body als Quelle für klinische und diagnostische Einordnung referenziert (Verstehen, Home, Über uns).",
        link: "https://pubmed.ncbi.nlm.nih.gov/39482953/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Paris, J.",
        jahr: "2020",
        titel:
          "Treatment of Borderline Personality Disorder: A Guide to Evidence-Based Practice",
        quelle: "Guilford Press, 2nd Edition",
        hinweis:
          "Standardwerk zu Verlauf, Recovery und multifaktoriellen Modellen bei BPS. In Handouts als didaktische Inspirationsquelle für Verlaufs- und Genesungsmodelle referenziert (Inline-Verweise jeweils «in Anlehnung an Paris 2020», nicht als wortgenaues Zitat).",
      },
      {
        autoren: "Linehan, M. M.",
        jahr: "2015",
        titel: "DBT Skills Training Manual",
        quelle: "Guilford Press, 2. Auflage",
        hinweis:
          "Aktualisiertes Standard-Manual zu den DBT-Skills (Achtsamkeit, Stresstoleranz, Emotionsregulation, zwischenmenschliche Effektivität). Im Body als Quelle für das Konzept der Radikalen Akzeptanz referenziert (Selbstfürsorge).",
      },
      {
        autoren: "Linehan, M. M.",
        jahr: "1996",
        titel:
          "Dialektisch-Behaviorale Therapie der Borderline-Persönlichkeitsstörung",
        quelle: "CIP-Medien",
        hinweis: "Deutsche Ausgabe. Standardwerk für DBT-Behandlung.",
      },
      {
        autoren: "Bateman, A. & Fonagy, P.",
        jahr: "2004",
        titel:
          "Psychotherapy for Borderline Personality Disorder: Mentalization-Based Treatment",
        quelle: "Oxford University Press",
        hinweis:
          "Grundlage für mentalisierungsbasierte Therapie (MBT) als evidenzbasiertes Verfahren. Aktualisierte Wirksamkeitsdaten siehe Bateman & Fonagy (2009) im Block «Klinische Studien & Forschung».",
      },
      {
        autoren: "Fruzzetti, A. E.",
        jahr: "2006",
        titel: "The High-Conflict Couple: A Dialectical Behavior Therapy Guide",
        quelle: "New Harbinger Publications",
        hinweis:
          "DBT-Ansatz für Paare und Angehörige. Grundlage für Validierungs- und Kommunikationsmodule.",
      },
      {
        autoren: "Gunderson, J. G. & Hoffman, P. D.",
        jahr: "2005",
        titel:
          "Understanding and Treating Borderline Personality Disorder: A Guide for Professionals and Families",
        quelle: "American Psychiatric Publishing",
        hinweis: "Verbindet klinische und Angehörigenperspektive.",
      },
      {
        autoren: "Porges, S. W.",
        jahr: "2011",
        titel:
          "The Polyvagal Theory: Neurophysiological Foundations of Emotions, Attachment, Communication, and Self-Regulation",
        quelle: "W. W. Norton, New York",
        hinweis:
          "In der klinischen Praxis – insbesondere in Trauma- und Körpertherapien – breit verwendet. Die zugrundeliegenden neurobiologischen Mechanismen sind in peer-reviewed Forschung umstritten. Im Body in Handout-Materialien zur Atemregulation referenziert.",
      },
    ],
  },
  {
    kategorie: "Angehörigen-Literatur",
    eintraege: [
      {
        autoren: "Mason, P. T. & Kreger, R.",
        jahr: "2007 / 2014",
        titel: "Stop Walking on Eggshells / Schluss mit dem Eiertanz",
        quelle:
          "Balance Buch + Medien Verlag (deutsche Ausgabe 2007, 8. Auflage 2014); New Harbinger Publications (englische 3. Auflage 2014)",
        hinweis:
          "Praxisnahe Anleitung für Angehörige. Grundlage für Konzepte wie «walking on eggshells», Kommunikationsstrategien und Grenzen. Originalausgabe (englisch) 1998.",
      },
      {
        autoren: "Kreisman, J. J. & Straus, H.",
        jahr: "2004",
        titel:
          "I Hate You – Don't Leave Me: Understanding the Borderline Personality",
        quelle: "Avery / Penguin",
        hinweis: "Einflussreiches Angehörigenbuch; SET-Kommunikationsmodell.",
      },
      {
        autoren: "Hoffman, P. D. et al.",
        jahr: "2005",
        titel:
          "Family Connections: A program for relatives of persons with borderline personality disorder",
        quelle: "Family Process",
        hinweis:
          "Evidenzbasiertes Psychoedukationsprogramm für Angehörige (NEA-BPD). Grundlage für Angehörigen-Schulungsansätze.",
        link: "https://pubmed.ncbi.nlm.nih.gov/15943545/",
        linkLabel: "PubMed",
      },
    ],
  },
  {
    kategorie: "Diagnostik & Klassifikation",
    eintraege: [
      {
        autoren: "American Psychiatric Association",
        jahr: "2022",
        titel:
          "Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)",
        quelle: "American Psychiatric Association Publishing",
        hinweis:
          "Aktuelle US-amerikanische Klassifikation. Borderline-Kriterien sind gegenüber DSM-5 (2013) inhaltlich unverändert; die Text Revision aktualisiert vor allem epidemiologische und kontextuelle Beschreibungen.",
      },
      {
        autoren: "World Health Organization",
        jahr: "2019",
        titel: "International Classification of Diseases (ICD-11)",
        quelle: "WHO",
        hinweis:
          "Aktuelle internationale Klassifikation mit Borderline pattern (6D11.5) als Spezifier innerhalb der Persönlichkeitsstörungen.",
        link: "https://icd.who.int/browse/2025-01/mms/en#2006821354",
        linkLabel: "WHO ICD-11",
      },
      {
        autoren:
          "First, M. B., Williams, J. B. W., Benjamin, L. S. & Spitzer, R. L.",
        jahr: "2017",
        titel:
          "Structured Clinical Interview for DSM-5 Personality Disorders (SCID-5-PD)",
        quelle: "American Psychiatric Association Publishing, Arlington, VA",
        hinweis:
          "Standard-Interviewverfahren zur strukturierten Erfassung von Persönlichkeitsstörungen nach DSM-5. Wird in der klinischen Diagnostik bei Verdacht auf Borderline-Persönlichkeitsstörung eingesetzt.",
      },
      {
        autoren: "Loranger, A. W.",
        jahr: "1999",
        titel:
          "International Personality Disorder Examination (IPDE), DSM-IV and ICD-10 Modules",
        quelle: "World Health Organization / Cambridge University Press",
        hinweis:
          "International etabliertes Interviewverfahren zur Diagnose von Persönlichkeitsstörungen, mit Modulen für DSM-IV und ICD-10. Deutsche Version verfügbar.",
      },
    ],
  },
  {
    kategorie: "Versorgungs-Materialien & Praxis-Manuale",
    eintraege: [
      {
        autoren: "Project Air Strategy",
        jahr: "laufend",
        titel:
          "Understanding Self-Harm & Suicidal Thinking for Families & Carers",
        quelle: "University of Wollongong, Australien",
        hinweis:
          "Versorgungs-Material des Project Air Strategy-Programms (australisches Forschungs- und Versorgungsangebot zu Persönlichkeitsstörungen). Online frei verfügbar. In Handout-Materialien zu Selbstverletzung und Suizidgedanken referenziert.",
        link: "https://www.projectairstrategy.org/",
        linkLabel: "projectairstrategy.org",
      },
      {
        autoren: "Berkowitz, C. & Gunderson, J. G.",
        jahr: "laufend (URL-Snapshot 2011)",
        titel: "Family Guidelines for Borderline Personality Disorder",
        quelle:
          "National Education Alliance for Borderline Personality Disorder (NEABPD; Manual frei online)",
        hinweis:
          "Praxis-Manual für Angehörige, basiert auf der psychoedukativen Forschungsarbeit der Autor:innen (siehe Gunderson, Berkowitz & Ruiz-Sancho, 1997). NEABPD ist seit 2024 in BPD Alliance umbenannt; die ursprüngliche Manualversion ist weiterhin auf der alten Domain verfügbar.",
        link: "https://www.borderlinepersonalitydisorder.org/wp-content/uploads/2011/08/Family-Guidelines-standard.pdf",
        linkLabel: "PDF auf NEABPD-Archiv",
      },
    ],
  },
];

/** Slugifiziert Autor-Feld für stabile id-Anker. */
function slugifyAuthor(autoren: string): string {
  return autoren
    .replace(/,\s*[A-Z]\.\s*[A-Z]?\.?\s*(et al\.)?/gi, "")
    .replace(/&/g, "-")
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function entryAnchor(eintrag: QuelleEintrag): string {
  return `src-${slugifyAuthor(eintrag.autoren)}-${eintrag.jahr}`;
}

export default function Quellen() {
  const categoryHeadingStyle = {
    fontFamily: "var(--font-display)",
    fontSize: "var(--text-2xl)",
    fontWeight: "var(--weight-display)",
    color: "var(--fg-primary)",
    letterSpacing: "var(--tracking-tight)",
    lineHeight: "var(--lh-snug)",
  };

  const citationStyle = {
    fontSize: "var(--text-md)",
    lineHeight: "var(--lh-relaxed)",
    color: "var(--fg-primary)",
  };

  const noteStyle = {
    fontSize: "var(--text-sm)",
    lineHeight: "var(--lh-relaxed)",
    color: "var(--fg-tertiary)",
  };

  return (
    <Layout>
      <SEO
        title="Quellen & Literatur"
        description="Wissenschaftliche Grundlagen und Fachliteratur dieser Website: klinische Studien, DBT-Literatur, Angehörigenbücher und Diagnoseklassifikationen."
        canonicalPath="/quellen"
      />

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="pb-16 pt-16 md:pb-24 md:pt-24">
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
            }}
          >
            Quellen &amp; Literatur
          </p>
          <h1
            className="mt-8 font-display text-[var(--text-3xl)] md:text-[var(--text-4xl)]"
            style={{
              lineHeight: "var(--lh-tight)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--fg-primary)",
              fontWeight: "var(--weight-display)",
            }}
          >
            Quellen &amp; <em>Literatur</em>
          </h1>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Diese Website basiert auf anerkannter Fachliteratur und
            evidenzbasierten Methoden. Hier finden Sie alle Quellen, geordnet
            nach Bereich.
          </p>
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-sm)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--fg-tertiary)",
            }}
          >
            Nicht alle Aussagen lassen sich einzeln belegen — manche basieren
            auf klinischer Erfahrung und Angehörigenliteratur. Wo Studien
            zitiert werden, sind sie hier aufgeführt.
          </p>
        </header>

        {/* ── Quellen-Liste, gruppiert nach Kategorie ── */}
        <div className="space-y-16">
          {quellen.map(gruppe => (
            <section key={gruppe.kategorie} className="space-y-8">
              <h2 style={categoryHeadingStyle}>{gruppe.kategorie}</h2>
              <ul className="space-y-8">
                {gruppe.eintraege.map(q => (
                  <li
                    key={`${q.autoren}-${q.jahr}`}
                    id={entryAnchor(q)}
                    className="space-y-2"
                    style={{ paddingLeft: "1.5em" }}
                  >
                    <p
                      style={{
                        ...citationStyle,
                        textIndent: "-1.5em",
                      }}
                    >
                      <strong style={{ fontWeight: 600 }}>{q.autoren}</strong> (
                      {q.jahr}). <em>{q.titel}</em>. {q.quelle}.
                      {q.link && (
                        <>
                          {" · "}
                          <a
                            href={q.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="editorial-link"
                          >
                            {q.linkLabel ?? "Externer Link"}
                          </a>
                        </>
                      )}
                    </p>
                    {q.hinweis && <p style={noteStyle}>{q.hinweis}</p>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* ── Hinweis ── */}
        <EditorialSection label="Hinweis" title="Zur Auswahl der Quellen" rule>
          <EditorialProse>
            <p>
              Diese Liste ist nicht abschliessend. Einzelne Inhalte basieren auf
              klinischer Erfahrung, Angehörigenliteratur oder didaktischen
              Vereinfachungen. Bei konkreten Fragen zu Studien oder
              Behandlungsempfehlungen wenden Sie sich an eine Fachstelle.
            </p>
          </EditorialProse>
        </EditorialSection>
      </EditorialLayout>
    </Layout>
  );
}
