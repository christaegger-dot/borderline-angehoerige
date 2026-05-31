import {
  DisplayHeading,
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import Layout from "@/components/Layout";
import ReviewBadge from "@/components/ReviewBadge";
import SEO, { MedicalPageSchema } from "@/components/SEO";

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
        autoren: "Lamberti, J.",
        jahr: "2023",
        titel:
          "Sex differences in borderline personality disorder: A scoping review",
        quelle: "Comprehensive Psychiatry 124, 152420",
        hinweis:
          "Scoping Review zu Geschlechtsunterschieden bei Borderline-Persönlichkeitsstörung. Hilfreich für die Einordnung, dass Borderline Menschen aller Geschlechter betreffen kann und klinische Darstellung oder Diagnosepfade unterschiedlich gelesen werden können.",
        link: "https://pubmed.ncbi.nlm.nih.gov/36813014/",
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
        autoren:
          "Zanarini, M. C., Frankenburg, F. R., Dubo, E. D., Sickel, A. E., Trikha, A., Levin, A. & Reynolds, V.",
        jahr: "1998",
        titel: "Axis I comorbidity of borderline personality disorder",
        quelle: "American Journal of Psychiatry 155(12), 1733–1739",
        hinweis:
          "Klassische Studie zur lebenszeitigen Achse-I-Komorbidität bei Borderline-Persönlichkeitsstörung. Belegt sehr hohe Komorbiditätsraten zu Major Depression, Angststörungen und PTBS.",
        link: "https://pubmed.ncbi.nlm.nih.gov/9842784/",
        linkLabel: "PubMed",
      },
      {
        autoren:
          "Zanarini, M. C., Frankenburg, F. R., Hennen, J., Reich, D. B. & Silk, K. R.",
        jahr: "2004",
        titel:
          "Axis I comorbidity in patients with borderline personality disorder: 6-year follow-up and prediction of time to remission",
        quelle: "American Journal of Psychiatry 161(11), 2108–2114",
        hinweis:
          "6-Jahres-Verlaufsstudie zur Komorbidität bei BPS. Zeigt, dass Komorbiditätsraten im Verlauf abnehmen, was die Recovery-Perspektive bestätigt.",
        link: "https://pubmed.ncbi.nlm.nih.gov/15514413/",
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
          "In der klinischen Praxis – insbesondere in Trauma- und Körpertherapien – breit verwendet. Die zugrundeliegenden neurobiologischen Mechanismen sind in peer-reviewed Forschung umstritten; daher nur als didaktisches Modell mit Caveat verwenden, nicht als harte neurobiologische Kurzquelle.",
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
          "Psychoedukatives Angehörigenprogramm (NEA-BPD). In den Handouts wird Family Connections als Programm-/Praxisrahmen genannt; peer-reviewte Grundlagen psychoedukativer Familienarbeit sind separat bei Gunderson/Berkowitz ausgewiesen.",
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
          "Arbeitsgemeinschaft der Wissenschaftlichen Medizinischen Fachgesellschaften (AWMF)",
        jahr: "2022",
        titel: "S3-Leitlinie Persönlichkeitsstörungen",
        quelle: "AWMF-Registernummer 038-015",
        hinweis:
          "Deutschsprachige Leitlinie zur Diagnostik und Behandlung von Persönlichkeitsstörungen. Ergänzt die internationale Quellenbasis um einen DACH-Bezug.",
        link: "https://register.awmf.org/assets/guidelines/038-015l_S3_Persoenlichkeitsstoerungen_2022-10.pdf",
        linkLabel: "AWMF PDF",
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
  {
    kategorie: "Weitere Quellen & Hintergrundliteratur",
    eintraege: [
      {
        autoren: "National Institute for Health and Care Excellence (NICE)",
        jahr: "2009",
        titel:
          "Borderline personality disorder: recognition and management (Clinical guideline CG78)",
        quelle: "NICE, London",
        hinweis:
          "Britische Leitlinie zu Erkennung und Behandlung der Borderline-Persönlichkeitsstörung. Veröffentlicht 2009, zuletzt überprüft am 30. Juli 2024 (rein präsentationelle Vereinfachung, keine inhaltliche Praxisänderung). Empfiehlt unter anderem DBT bei BPS und wiederholter Selbstverletzung. Ergänzt die internationale Leitlinien-Basis (APA, AWMF) um den NICE-Bezug.",
        link: "https://www.nice.org.uk/guidance/cg78",
        linkLabel: "NICE CG78",
      },
      {
        autoren: "Carpenter, R. W. & Trull, T. J.",
        jahr: "2013",
        titel:
          "Components of emotion dysregulation in borderline personality disorder: a review",
        quelle: "Current Psychiatry Reports 15(1), 335",
        hinweis:
          "Peer-reviewte Übersichtsarbeit, die Emotionsdysregulation bei BPS nach Linehans biosozialem Modell in vier Komponenten gliedert: Emotionssensitivität, erhöhter und labiler Negativaffekt, Defizit angemessener und Überschuss maladaptiver Regulationsstrategien. Fachliche Grundlage für die Darstellung der Anspannungs- bzw. Arousal-Kurve.",
        link: "https://pubmed.ncbi.nlm.nih.gov/23250816/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Siegel, D. J.",
        jahr: "1999",
        titel:
          "The Developing Mind: Toward a Neurobiology of Interpersonal Experience",
        quelle: "Guilford Press, New York",
        hinweis:
          "Prägt das Konzept des «Window of Tolerance» – des optimalen Erregungsbereichs, in dem Menschen Belastung verarbeiten können, ohne in Über- oder Untererregung zu geraten. Als didaktisches Modell für die Anspannungskurve verwendet, nicht BPS-spezifisch.",
      },
      {
        autoren: "Ogden, P., Minton, K. & Pain, C.",
        jahr: "2006",
        titel: "Trauma and the Body: A Sensorimotor Approach to Psychotherapy",
        quelle: "W. W. Norton, New York",
        hinweis:
          "Überträgt das «Window of Tolerance» in die körperorientierte Traumatherapie (Hyper- und Hypoarousal). Wie Siegel (1999) als didaktisches Modell für die Anspannungskurve verwendet, nicht als BPS-spezifische Quelle.",
      },
      {
        autoren: "LeDoux, J. E.",
        jahr: "1996",
        titel:
          "The Emotional Brain: The Mysterious Underpinnings of Emotional Life",
        quelle: "Simon & Schuster, New York",
        hinweis:
          "Grundlegendes Werk zum furchtverarbeitenden Schaltkreis des Gehirns, insbesondere zur Rolle der Amygdala als Bedrohungs- und Alarmsystem. Als didaktisches Modell für das Blatt «Das Gehirn verstehen» (Amygdala, Hippocampus und präfrontaler Kortex bei emotionaler Überflutung) verwendet, nicht BPS-spezifisch.",
      },
      {
        autoren: "Sotomo",
        jahr: "2024",
        titel:
          "Stand by You Studie. Situation der Angehörigen und Vertrauten von Menschen mit psychischen Erkrankungen",
        quelle:
          "Im Auftrag von und in Zusammenarbeit mit Stand by You Schweiz, Zürich",
        hinweis:
          "Erste repräsentative Studie der Schweiz zur Rolle von Angehörigen und Vertrauten psychisch erkrankter Menschen (Befragung von 2'042 Personen, März 2024). Stand by You Schweiz ist die Nachfolgeorganisation der VASK Schweiz. Als Schweizer Kontext- und Häufigkeitsquelle herangezogen, nicht BPS-spezifisch.",
        link: "https://stand-by-you.ch/wp-content/uploads/2024/03/sby_studie_final.pdf",
        linkLabel: "Studienbericht (PDF)",
      },
      {
        autoren: "Lenz, A.",
        jahr: "2014",
        titel: "Kinder psychisch kranker Eltern",
        quelle:
          "Hogrefe Verlag, Göttingen, 2., vollständig überarbeitete und erweiterte Auflage",
        hinweis:
          "Standardwerk zu Belastungen, Schutzfaktoren und Unterstützung von Kindern psychisch erkrankter Eltern. Fachliche Grundlage des Blatts zu Kindern als Angehörige; nicht BPS-spezifisch, sondern allgemein zu Kindern psychisch kranker Eltern.",
      },
      {
        autoren: "Mattejat, F. & Lisofsky, B. (Hrsg.)",
        jahr: "2014",
        titel: "Nicht von schlechten Eltern. Kinder psychisch Kranker",
        quelle:
          "Balance buch + medien verlag, 4. korrigierte und erweiterte Auflage",
        hinweis:
          "Niedrigschwelliges Fach- und Ratgeberwerk für Fachpersonen, Betroffene und Angehörige, mit Fokus auf die oft übersehenen Kinder psychisch erkrankter Eltern. Mitherangezogen für das Blatt zu Kindern als Angehörige.",
      },
      {
        autoren:
          "Bundesverband der Angehörigen psychisch erkrankter Menschen (BApK)",
        jahr: "laufend",
        titel:
          "Informationsmaterialien für Angehörige, Kinder und Geschwister psychisch erkrankter Menschen",
        quelle: "BApK e. V., Bonn",
        hinweis:
          "Deutsche Dachorganisation der Angehörigen psychisch erkrankter Menschen; gibt Informations- und Selbsthilfematerialien heraus, unter anderem zu Kindern und Geschwistern. Als ergänzende Praxisquelle für das Blatt zu Kindern als Angehörige genannt.",
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
      <MedicalPageSchema
        title="Quellen & Literatur"
        description="Wissenschaftliche Grundlagen und Fachliteratur dieser Website: klinische Studien, DBT-Literatur, Angehörigenbücher und Diagnoseklassifikationen."
        path="/quellen"
      />

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="pb-16 pt-12 md:pb-24 md:pt-16">
          <EyebrowLabel spacing="compact">Quellen &amp; Literatur</EyebrowLabel>
          <DisplayHeading level={1} size="page">
            Quellen &amp; Literatur
          </DisplayHeading>
          <Lede className="mt-6">
            Diese Website basiert auf anerkannter Fachliteratur und
            evidenzbasierten Methoden. Hier finden Sie alle Quellen, geordnet
            nach Bereich.
          </Lede>
          <ReviewBadge path="/quellen" />
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
              <DisplayHeading level={2} spacing="compact">
                {gruppe.kategorie}
              </DisplayHeading>
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
        <EditorialSectionBlock
          label="Hinweis"
          title="Zur Auswahl der Quellen"
          rule
        >
          <EditorialProse>
            <p>
              Diese Liste ist nicht abschliessend. Einzelne Inhalte basieren auf
              klinischer Erfahrung, Angehörigenliteratur oder didaktischen
              Vereinfachungen. Bei konkreten Fragen zu Studien oder
              Behandlungsempfehlungen wenden Sie sich an eine Fachstelle.
            </p>
          </EditorialProse>
        </EditorialSectionBlock>
      </EditorialLayout>
    </Layout>
  );
}
