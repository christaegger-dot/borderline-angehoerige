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
          "Cochrane-Übersichtsarbeit zu 75 randomisierten Studien (4'507 Teilnehmer:innen). Psychotherapie zeigte gegenüber Vergleichsbedingungen im Mittel Vorteile; die Vertrauenswürdigkeit der Evidenz war für viele Ergebnisse jedoch niedrig oder sehr niedrig. Nur bei der BPS-Symptomschwere wurde der vorab festgelegte Schwellenwert für klinische Relevanz erreicht. Der Review begründet keine sichere Rangfolge einzelner Verfahren.",
        link: "https://pubmed.ncbi.nlm.nih.gov/32368793/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Qian, X. et al.",
        jahr: "2022",
        titel:
          "Sex differences in borderline personality disorder: A scoping review",
        quelle: "PLOS ONE 17(12), e0279015. DOI: 10.1371/journal.pone.0279015",
        hinweis:
          "Scoping Review zu Unterschieden zwischen Frauen und Männern bei Borderline. Klinische Stichproben werden häufig als frauendominiert wahrgenommen; bevölkerungsbezogene Studien berichten teils keine signifikanten Unterschiede. Symptompräsentation, Begleiterkrankungen und Behandlungswege unterscheiden sich in Teilen; die Forschung ist heterogen. Die Review untersuchte keine trans Personen und belegt keine Aussage zu allen Geschlechtsidentitäten.",
        link: "https://doi.org/10.1371/journal.pone.0279015",
        linkLabel: "PLOS ONE",
      },
      {
        autoren: "Porter, C. et al.",
        jahr: "2020",
        titel:
          "Childhood adversity and borderline personality disorder: a meta-analysis",
        quelle:
          "Acta Psychiatrica Scandinavica 141(1), 6–20. DOI: 10.1111/acps.13118",
        hinweis:
          "Metaanalyse zum Zusammenhang zwischen belastenden Kindheitserfahrungen und Borderline. Der Zusammenhang belegt keine einfache Ursache; entsprechende Erfahrungen sind weder notwendig noch hinreichend für die Diagnose.",
        link: "https://pubmed.ncbi.nlm.nih.gov/31630389/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Shah, R. & Zanarini, M. C.",
        jahr: "2018",
        titel:
          "Comorbidity of Borderline Personality Disorder: Current Status and Future Directions",
        quelle:
          "Psychiatric Clinics of North America 41(4), 583–593. DOI: 10.1016/j.psc.2018.07.009",
        hinweis:
          "Übersichtsarbeit zu häufig gemeinsam auftretenden psychischen Erkrankungen. Sie stützt die allgemeine Einordnung affektiver, Angst-, Substanzgebrauchs- und Essstörungen, aber keine pauschale Häufigkeitszahl für alle Menschen mit Borderline.",
        link: "https://pubmed.ncbi.nlm.nih.gov/30447726/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Weiner, L., Perroud, N. & Weibel, S.",
        jahr: "2019",
        titel:
          "Attention Deficit Hyperactivity Disorder and Borderline Personality Disorder in Adults: A Review of Their Links and Risks",
        quelle:
          "Neuropsychiatric Disease and Treatment 15, 3115–3129. DOI: 10.2147/NDT.S192871",
        hinweis:
          "Übersichtsarbeit zu Überschneidungen und gleichzeitigem Auftreten von ADHS und Borderline bei Erwachsenen. Sie begründet die Aufnahme von ADHS als mögliche Begleiterkrankung, nicht eine allgemeine Prävalenzangabe.",
        link: "https://pubmed.ncbi.nlm.nih.gov/31806978/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Zanarini, M. C. et al.",
        jahr: "2010",
        titel:
          "Time to attainment of recovery from borderline personality disorder and stability of recovery: A 10-year prospective follow-up study",
        quelle:
          "American Journal of Psychiatry 167(6), 663–667. DOI: 10.1176/appi.ajp.2009.09081130",
        hinweis:
          "Grundlage für die 10-Jahres-Angaben auf der Genesungsseite: Von 290 zu Beginn stationär behandelten Erwachsenen erreichten 93% mindestens einmal eine zweijährige symptomatische Remission und 50% mindestens einmal die zweijährige, zusätzlich sozial und beruflich definierte Recovery. Spezialisierte Stichprobe; keine individuelle Prognose.",
        link: "https://pubmed.ncbi.nlm.nih.gov/20395399/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Zanarini, M. C. et al.",
        jahr: "2012",
        titel:
          "Attainment and stability of sustained symptomatic remission and recovery among patients with borderline personality disorder and Axis II comparison subjects: A 16-year prospective follow-up study",
        quelle:
          "American Journal of Psychiatry 169(5), 476–483. DOI: 10.1176/appi.ajp.2011.11101550",
        hinweis:
          "Separates 16-Jahres-Follow-up zur Dauer und Stabilität von symptomatischer Remission und Recovery. Diese Publikation ist nicht die Quelle für die 10-Jahres-Werte von 93% und 50%; diese stammen aus Zanarini et al. (2010).",
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
        autoren: "Linehan, M. M.",
        jahr: "1997",
        titel: "Validation and psychotherapy",
        quelle:
          "In A. C. Bohart & L. S. Greenberg (Hrsg.), Empathy Reconsidered: New Directions in Psychotherapy, 353–392. DOI: 10.1037/10226-016",
        hinweis:
          "Primärquelle zu den Validierungsstufen der DBT. Die Website überträgt das Modell vereinfacht auf Gespräche von Angehörigen und kennzeichnet es nicht als Pflichtfolge.",
        link: "https://doi.org/10.1037/10226-016",
        linkLabel: "APA DOI",
      },
      {
        autoren: "Degasperi, G. et al.",
        jahr: "2021",
        titel:
          "Parsing variability in borderline personality disorder: a meta-analysis of neuroimaging studies",
        quelle: "Translational Psychiatry",
        hinweis:
          "Metaanalyse von 52 fMRT-Studien. Über unterschiedliche Aufgaben hinweg zeigte sich kein konsistentes Aktivierungsmuster; die begrenzten Befunde bei Emotionsaufgaben waren in Sensitivitätsanalysen nicht robust. Grundlage dafür, auf ein anatomisch festgeschriebenes «Borderline-Gehirn» zu verzichten.",
        link: "https://pubmed.ncbi.nlm.nih.gov/34031363/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Baranger, D. A. A. et al.",
        jahr: "2020",
        titel:
          "Borderline Personality Traits Are Not Correlated With Brain Structure in Two Large Samples",
        quelle:
          "Biological Psychiatry: Cognitive Neuroscience and Neuroimaging 5(7), 669–677",
        hinweis:
          "In zwei grossen Stichproben mit zusammen 2'398 Personen waren Borderline-Merkmale mit keinem der 152 untersuchten Strukturmasse nach Korrektur für multiples Testen verbunden. Das stützt eine zurückhaltende, nicht essentialistische Darstellung neurobiologischer Befunde.",
        link: "https://pubmed.ncbi.nlm.nih.gov/32312691/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Shields, G. S., Sazma, M. A. & Yonelinas, A. P.",
        jahr: "2016",
        titel:
          "The effects of acute stress on core executive functions: A meta-analysis and comparison with cortisol",
        quelle: "Neuroscience & Biobehavioral Reviews 68, 651–668",
        hinweis:
          "Metaanalyse zu akutem Stress, Arbeitsgedächtnis, Inhibition und kognitiver Flexibilität. Sie begründet vorsichtige Kann-Aussagen über vorübergehend erschwertes Abwägen, nicht die Lokalisierung eines individuellen Zustands in einzelnen Hirnregionen.",
        link: "https://pubmed.ncbi.nlm.nih.gov/27371161/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Santangelo, P., Bohus, M. & Ebner-Priemer, U. W.",
        jahr: "2014",
        titel:
          "Ecological momentary assessment in borderline personality disorder: a review of recent findings and methodological challenges",
        quelle: "Journal of Personality Disorders 28(4), 555–576",
        hinweis:
          "Übersichtsarbeit zu wiederholten Erhebungen im Alltag. Sie ordnet affektive und zwischenmenschliche Veränderungen als dynamische, kontextabhängige Prozesse ein; daraus lässt sich kein allgemeingültiger Vier-Phasen-Ablauf ableiten.",
        link: "https://pubmed.ncbi.nlm.nih.gov/22984853/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Skodol, A. E. et al.",
        jahr: "2005",
        titel:
          "The Collaborative Longitudinal Personality Disorders Study (CLPS): overview and implications",
        quelle:
          "Journal of Personality Disorders 19(5), 487–504. DOI: 10.1521/pedi.2005.19.5.487",
        hinweis:
          "Übersicht über die klinische CLPS-Längsschnittstudie zu Verlauf, Beeinträchtigungen und Behandlung von Persönlichkeitsstörungen. Keine bevölkerungsbezogene Prävalenzstudie.",
        link: "https://pubmed.ncbi.nlm.nih.gov/16274278/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Torgersen, S., Kringlen, E. & Cramer, V.",
        jahr: "2001",
        titel: "The prevalence of personality disorders in a community sample",
        quelle:
          "Archives of General Psychiatry 58(6), 590–596. DOI: 10.1001/archpsyc.58.6.590",
        hinweis:
          "Bevölkerungsbezogene Untersuchung von 2'053 Erwachsenen im Alter von 18 bis 65 Jahren in Oslo, erhoben 1994–1997 nach DSM-III-R. Die Borderline-Prävalenz lag in dieser Stichprobe bei 0,7%. Dieser Wert ist keine allgemeingültige oder Schweizer Prävalenzangabe.",
        link: "https://pubmed.ncbi.nlm.nih.gov/11386989/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Bailey, R. C. & Grenyer, B. F. S.",
        jahr: "2013",
        titel:
          "Burden and support needs of carers of persons with borderline personality disorder: A systematic review",
        quelle:
          "Harvard Review of Psychiatry 21(5), 248–258. DOI: 10.1097/HRP.0b013e3182a75c2c",
        hinweis:
          "Systematische Übersicht zu Belastung und Unterstützungsbedarf von Angehörigen. Sechs Studien mit insgesamt 465 Angehörigen wurden eingeschlossen; fünf Studien bezogen sich auf Borderline. Die Ergebnisse weisen auf Belastungen hin, die Autor:innen betonen zugleich erhebliche Forschungslücken.",
        link: "https://pubmed.ncbi.nlm.nih.gov/24651557/",
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
          "Aktuelle US-amerikanische Behandlungsleitlinie für Borderline-Persönlichkeitsstörung. Sie empfiehlt eine strukturierte Psychotherapie, die auf die zentralen Merkmale und damit verbundenen Beeinträchtigungen ausgerichtet ist, ohne ein einzelnes Verfahren pauschal an erste Stelle zu setzen.",
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
          "Aktualisiertes Standard-Manual zu den DBT-Skills (Achtsamkeit, Stresstoleranz, Emotionsregulation, zwischenmenschliche Effektivität). Auf der Website als Quelle für Radikale Akzeptanz und DEAR MAN verwendet. Die DEAR-Webhilfe zeigt bewusst nur die ersten vier inhaltlichen Schritte und nicht Mindful, Appear confident und Negotiate.",
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
          "Historisch einflussreicher Ratgeber für Angehörige, keine wissenschaftliche Studie oder aktuelle systematische Übersicht. Einzelne Beschreibungen verallgemeinern Beziehungsmuster und Motive; Krisenhinweise sind nicht als heutige Notfallanleitung zu verwenden. Als Erfahrungs- und Praxisquelle kritisch lesen. Originalausgabe (englisch) 1998.",
      },
      {
        autoren: "Kreisman, J. J. & Straus, H.",
        jahr: "2004",
        titel:
          "I Hate You – Don't Leave Me: Understanding the Borderline Personality",
        quelle: "Avery / Penguin",
        hinweis:
          "Historisch einflussreicher Ratgeber, keine wissenschaftliche Evidenzquelle. Das Buch kann Begriffe und Beziehungserleben anschaulich machen, verallgemeinert jedoch stellenweise. Nicht als diagnostische Grundlage oder pauschale Erklärung individueller Motive verwenden.",
      },
      {
        autoren: "Hoffman, P. D. et al.",
        jahr: "2005",
        titel:
          "Family Connections: A program for relatives of persons with borderline personality disorder",
        quelle: "Family Process",
        hinweis:
          "Psychoedukatives Angehörigenprogramm (NEA-BPD). Studien berichten vielversprechende Verbesserungen bei Belastung, Trauer und Bewältigung; wegen kleinerer Studien und begrenzter Vergleichsdaten bleibt die Evidenz vorläufig. Peer-reviewte Grundlagen psychoedukativer Familienarbeit sind separat bei Gunderson/Berkowitz ausgewiesen.",
      },
      {
        autoren: "Guillén, V. et al.",
        jahr: "2021",
        titel:
          "Interventions for Family Members and Carers of Patients with Borderline Personality Disorder: A Systematic Review",
        quelle: "Family Process 60(1), 134–144",
        hinweis:
          "Systematische Übersicht zu Interventionen für Familien und Betreuungspersonen. Die Ergebnisse sind ermutigend, die Autor:innen fordern jedoch methodisch stärkere Studien, bevor die Wirksamkeit verlässlich beurteilt werden kann.",
        link: "https://pubmed.ncbi.nlm.nih.gov/32304101/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Guillén, V. et al.",
        jahr: "2024",
        titel:
          '"Family Connections", a program for relatives of people with borderline personality disorder: A randomized controlled trial',
        quelle: "Family Process 63(4), 2195–2214. DOI: 10.1111/famp.13089",
        hinweis:
          "Randomisierte Studie mit 121 Angehörigen aus 82 Familieneinheiten in Spanien. Family Connections wurde mit einem aktiven Angehörigenangebot ähnlicher Dauer verglichen. Zwischen den Bedingungen fanden sich keine statistisch signifikanten Unterschiede; günstigere Mittelwerte in der Family-Connections-Gruppe belegen keine Überlegenheit. Ein fehlender signifikanter Unterschied beweist auch keine Gleichwertigkeit der Angebote.",
        link: "https://pubmed.ncbi.nlm.nih.gov/39624006/",
        linkLabel: "PubMed",
      },
      {
        autoren: "Cohen, S. et al.",
        jahr: "2024",
        titel:
          "Group intervention for family members of people with borderline personality disorder based on Dialectical Behavior Therapy: Implementation of the Family Connections® program in France and Switzerland",
        quelle:
          "Borderline Personality Disorder and Emotion Dysregulation 11, 16. DOI: 10.1186/s40479-024-00254-3",
        hinweis:
          "Beobachtungsstudie mit 149 Teilnehmenden an fünf Zentren in Frankreich und der Schweiz. Nach dem Programm wurden unter anderem weniger Belastung und depressive Symptome berichtet. Ohne randomisierte Kontrollgruppe lassen sich diese Veränderungen nicht sicher auf das Programm zurückführen; die Studie belegt auch keine aktuelle Verfügbarkeit eines Angebots vor Ort.",
        link: "https://pubmed.ncbi.nlm.nih.gov/39039536/",
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
        autoren: "World Health Organization (ICD-11)",
        jahr: "2024",
        titel:
          "Clinical descriptions and diagnostic requirements for ICD-11 mental, behavioural and neurodevelopmental disorders",
        quelle: "WHO",
        hinweis:
          "In der ICD-11 wird eine Persönlichkeitsstörung zunächst nach Schweregrad codiert. Das Borderline-Muster (6D11.5) kann zusätzlich angegeben werden. Dieses Modell ist nicht identisch mit der kategorialen DSM-5-TR-Diagnose.",
        link: "https://www.who.int/publications/i/item/9789240077263",
        linkLabel: "WHO-Publikation",
      },
      {
        autoren: "Bundesamt für Statistik (BFS)",
        jahr: "2026",
        titel: "Medizinisches Kodierungshandbuch 2026",
        quelle: "Bundesamt für Statistik, Neuchâtel",
        hinweis:
          "Für stationäre Austritte in der Schweiz ab 1. Januar 2026 gilt ICD-10-GM 2024. Dort wird der Borderline-Typ unter F60.31 codiert. Diese Vorgabe für die stationäre Kodierung ist keine pauschale Aussage über jedes ambulante oder klinische Dokumentationssystem.",
        link: "https://dam-api.bfs.admin.ch/hub/api/dam/assets/36144081/master",
        linkLabel: "BFS-PDF",
      },
      {
        autoren: "Bundesamt für Gesundheit (BAG)",
        jahr: "laufend",
        titel: "Berufs- oder Arztgeheimnis",
        quelle: "Patientenrechte in der Schweiz",
        hinweis:
          "Offizielle Einordnung des Berufsgeheimnisses. Das BAG hält fest, dass urteilsfähige minderjährige Patient:innen ein Recht auf vertrauliche Behandlung ihres Gesundheitszustands haben und dass die Urteilsfähigkeit von der konkreten Situation und Fragestellung abhängt.",
        link: "https://www.bag.admin.ch/de/berufs-oder-arztgeheimnis",
        linkLabel: "BAG",
      },
      {
        autoren:
          "Arbeitsgemeinschaft der Wissenschaftlichen Medizinischen Fachgesellschaften (AWMF)",
        jahr: "2022",
        titel: "S3-Leitlinie Borderline-Persönlichkeitsstörung",
        quelle: "AWMF-Registernummer 038-015",
        hinweis:
          "Fassung vom 14.11.2022, Version 2.0. Im AWMF-Register mit Gültigkeit bis 31.05.2026 geführt (Abgleich 22.09.2026). Die angegebene Gültigkeit ist abgelaufen; hier als datierte Quelle verwendet, nicht als aktuell gültige Leitlinie. Den aktuellen Status zeigt das Register.",
        link: "https://register.awmf.org/de/leitlinien/detail/038-015",
        linkLabel: "AWMF-Register und aktueller Status",
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
        autoren: "Bundesamt für Gesundheit (BAG)",
        jahr: "laufend (Abruf 06.10.2026)",
        titel: "Neuregelung der psychologischen Psychotherapie ab 1. Juli 2022",
        quelle: "BAG – obligatorische Krankenpflegeversicherung",
        hinweis:
          "Schweizer Primärinformation zum Anordnungsmodell, zur Zulassung und zur Kostenübernahme psychologischer Psychotherapie. Eine ärztliche Anordnung ist erforderlich; die reguläre Anordnungsbefugnis ist auf bestimmte Qualifikationen begrenzt. Die Regeln sind nicht pauschal auf ärztliche Psychotherapie oder stationäre Leistungen übertragbar. Der konkrete Zugangsweg und die Kostenübernahme sind mit Praxis und Krankenversicherung zu klären.",
        link: "https://www.bag.admin.ch/de/neuregelung-der-psychologischen-psychotherapie-ab-1-juli-2022",
        linkLabel: "BAG",
      },
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
        autoren: "World Health Organization (Suicide Q&A)",
        jahr: "2026",
        titel: "Suicide: Questions and answers",
        quelle: "WHO, 31. August 2026",
        hinweis:
          "Offizielle Gesundheitsinformation. Sie hält fest, dass direktes Fragen nach Suizidgedanken eine suizidale Handlung nicht auslöst und helfen kann, die Lage zu verstehen. Die Website verbindet diesen Befund mit ihren separat geregelten professionellen Hilfewegen.",
        link: "https://www.who.int/news-room/questions-and-answers/item/suicide",
        linkLabel: "WHO",
      },
      {
        autoren: "World Health Organization",
        jahr: "2026",
        titel: "Stress: Questions and answers",
        quelle: "WHO, 30. März 2026",
        hinweis:
          "Offizielle Gesundheitsinformation zu Stress und möglichen körperlichen und psychischen Reaktionen. Die fünf Bereiche der Website sind eine eigene redaktionelle Ordnung und kein WHO-Kategoriensystem.",
        link: "https://www.who.int/news-room/questions-and-answers/item/stress",
        linkLabel: "WHO",
      },
      {
        autoren: "National Institute for Health and Care Excellence (NICE)",
        jahr: "2020",
        titel: "Supporting adult carers (NG150)",
        quelle: "NICE guideline NG150, veröffentlicht am 22. Januar 2020",
        hinweis:
          "Britische Leitlinie zur Information sowie praktischen, emotionalen und sozialen Unterstützung erwachsener unbezahlter Betreuungspersonen. Nicht Borderline-spezifisch und nicht ohne Weiteres auf Schweizer Rechtsansprüche übertragbar.",
        link: "https://www.nice.org.uk/guidance/ng150",
        linkLabel: "NICE NG150",
      },
      {
        autoren: "National Institute for Health and Care Excellence (NICE)",
        jahr: "2022",
        titel:
          "Self-harm: assessment, management and preventing recurrence (NG225)",
        quelle: "NICE guideline NG225, veröffentlicht am 7. September 2022",
        hinweis:
          "Britische Leitlinie zur Versorgung nach Selbstverletzung, unabhängig von der vermuteten Absicht. Sie empfiehlt eine professionelle psychosoziale Beurteilung und gemeinsam erarbeitete Sicherheitspläne. Risikoskalen oder globale Einstufungen in niedriges, mittleres oder hohes Risiko sollen nicht zur Vorhersage von Suizid oder erneuter Selbstverletzung verwendet werden. Diese Fachaufgaben dürfen nicht auf Angehörige übertragen werden.",
        link: "https://www.nice.org.uk/guidance/ng225/chapter/Recommendations",
        linkLabel: "NICE NG225",
      },
      {
        autoren:
          "Arbeitsgemeinschaft der Wissenschaftlichen Medizinischen Fachgesellschaften (AWMF)",
        jahr: "2025",
        titel:
          "S3-Leitlinie Psychosoziale Therapien bei schweren psychischen Erkrankungen, Version 3.0",
        quelle: "AWMF-Registernummer 038-020, Kapitel 7.2",
        hinweis:
          "Kapitel 7.2 beschreibt konzeptionelle Aspekte und Schlüsselfaktoren persönlicher Recovery. Die Leitlinie ist nicht Borderline-spezifisch; sie dient auf der Genesungsseite als fachlicher Rahmen einer ausdrücklich redaktionellen Synthese.",
        link: "https://register.awmf.org/assets/guidelines/038-020l_S3_Psychosoziale_Therapien_bei_schweren_psychischen_Erkrankungen_2025-12.pdf",
        linkLabel: "AWMF-Leitlinie (PDF)",
      },
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
          "Historisches Grundlagenwerk zur Angst- und Bedrohungsverarbeitung, nicht BPS-spezifisch. Wegen der uneinheitlichen heutigen Neuroimaging-Evidenz wird es nicht mehr als zentrale Begründung für ein lokalisierendes Gehirnmodell verwendet.",
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
            Diese Website nutzt wissenschaftliche Forschung, Leitlinien,
            Fachliteratur und gesondert gekennzeichnete Ratgeber- und
            Praxisquellen. Hier finden Sie die Quellen nach ihrer Funktion
            geordnet.
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
            Ratgeber und Angehörigenliteratur werden nicht als wissenschaftliche
            Evidenz behandelt. Sie können Erfahrungswissen und Praxisideen
            beitragen, müssen aber hinsichtlich Alter, Sprache,
            Verallgemeinerungen und Krisenhinweisen kritisch eingeordnet werden.
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
