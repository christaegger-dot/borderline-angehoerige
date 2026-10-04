import AngehoerigenBeratung from "@/components/AngehoerigenBeratung";
import TopicQuickLinks from "@/components/TopicQuickLinks";
import ContentSection from "@/components/ContentSection";
import {
  DisplayHeading,
  EditorialProse,
  EditorialPullQuote,
  EditorialSection,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import EvidenceNote from "@/components/EvidenceNote";
import LastVerifiedBadge from "@/components/LastVerifiedBadge";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import UnterstuetzenSubNav from "@/components/UnterstuetzenSubNav";
import { TableOfContents } from "@/components/UXEnhancements";
import RollenOrbitVisualisierung from "@/components/visualizations/RollenOrbitVisualisierung";
import { quellenLinks } from "@/content/quellenLinks";
import {
  GELB,
  emailByIdStrict,
  kontaktByIdStrict,
  urlByIdStrict,
} from "@/data/kontakte";
import { Link } from "wouter";

const hype = kontaktByIdStrict("INFO_PUK_KJPP_HYPE");
const emailKjpp = emailByIdStrict("EMAIL_KJPP");
const pukDbt = kontaktByIdStrict("INFO_PUK_DBT");
const ipw = kontaktByIdStrict("INFO_IPW");
const emailHard = emailByIdStrict("EMAIL_HARD");
const clieniaUrl = urlByIdStrict("URL_CLIENIA");
const dbtDachUrl = urlByIdStrict("URL_DBT_DACH");

const zusammenarbeitSzenarien = [
  {
    titel: "Der Therapeut lädt mich nicht zur Sitzung ein",
    inhalt: [
      "Die Therapie braucht einen geschützten Raum. Wie Angehörige einbezogen werden, hängt unter anderem vom Wunsch der betroffenen Person, vom Behandlungsrahmen und vom Unterstützungsbedarf ab.",
      "Bitten Sie um Klärung: Ist ein gemeinsames Gespräch oder ein Angehörigentermin möglich? Vereinbaren Sie Anlass, Häufigkeit und Kommunikationsweg individuell.",
      "Eine mögliche Anfrage: «Ich möchte klären, was ich beitragen kann und welche Unterstützung ich selbst brauche.» Allgemeine Orientierung ist auch ohne vertrauliche Behandlungsauskünfte möglich.",
      "Sprechen Sie Ihren Wunsch nach Einbezug offen an und respektieren Sie die Grenzen der Schweigepflicht.",
    ],
  },
  {
    titel: "Ich möchte über meine eigene Belastung sprechen",
    inhalt: [
      "Das ist berechtigt – Sie dürfen Orientierung für Ihre eigene Rolle suchen",
      "Sie können unabhängig von der Behandlung eine Angehörigenberatung nutzen. Bei der Fachstelle Angehörigenarbeit der PUK ist sie kostenlos und ohne Vollmacht der erkrankten Person möglich.",
      "Wenn Sie sich an das Behandlungsteam wenden, klären Sie, welche allgemeine Beratung dort möglich ist und wer Sie bei Ihrer eigenen Belastung unterstützen kann.",
      "Mögliche Fragen: «Was kann ich übernehmen? Was ist zu viel für mich? Wen kann ich bei Unsicherheit kontaktieren?»",
    ],
  },
  {
    titel: "Ich mache mir Sorgen um den Verlauf",
    inhalt: [
      "Sie sehen von aussen nicht, was in der Therapie geschieht und welche Ziele die Person mit dem Fachteam vereinbart hat.",
      "Bei Sorgen können Sie konkrete Beobachtungen mitteilen und um Klärung des weiteren Vorgehens bitten. Vertrauliche Rückmeldungen setzen eine entsprechende Berechtigung voraus.",
      "Formulierungsbeispiel: «Ich beobachte weiterhin Selbstverletzungen und mache mir Sorgen. Welche Abklärung oder Unterstützung ist jetzt nötig?» Bei akuter Gefahr nutzen Sie den Notruf, statt auf eine Antwort zu warten.",
      "Bei begründeten Zweifeln an Diagnose oder Behandlung kann eine zweite fachliche Einschätzung sinnvoll sein; eine pauschale Wartefrist von einem Jahr gibt es dafür nicht. Besprechen Sie dies möglichst mit der betroffenen Person. Für Ihre eigene Rolle können Sie unabhängig davon Beratung suchen.",
    ],
  },
  {
    titel: "Ich habe den Eindruck, dass Therapie gerade schwierig ist",
    inhalt: [
      "Direkt ansprechen (in stabiler Phase): «Mir scheint, dass die Therapie für dich gerade schwierig ist. Was macht sie dir schwierig?»",
      "Sie können Motivation nicht erzwingen – aber Sie können Interesse zeigen",
      "Wenn Sie ausserhalb akuter Gefahr etwas mitteilen möchten, besprechen Sie Anlass, Inhalt und Kontaktweg möglichst vorher mit der betroffenen Person. Beschreiben Sie nur eigene konkrete Beobachtungen und Ihren eigenen Unterstützungsbedarf. Die Mitteilung begründet keinen Anspruch auf vertrauliche Auskünfte.",
      "Therapieambivalenz kann viele Gründe haben – Scham, Angst, Überforderung, schlechte Erfahrungen oder Misstrauen. Nehmen Sie das nicht vorschnell persönlich.",
    ],
  },
  {
    titel: "Was kann ich in einem vereinbarten Kontakt mitteilen?",
    inhalt: [
      "Eigene konkrete Beobachtungen, vereinbarte Themen und der eigene Unterstützungsbedarf – ohne Diagnose, Motiv- oder Verlaufsbewertung.",
      "Stimmen Sie nicht-akute Angaben möglichst mit der betroffenen Person ab. Eine laufende Überwachung ist nicht Ihre Aufgabe.",
      "Vereinbaren Sie Anlass, Zuständigkeit und einen geeigneten Übermittlungsweg. Bei möglicher akuter Gefahr nutzen Sie sofort die Notfallwege und warten nicht auf eine E-Mail-Antwort.",
      "Beobachtung statt Deutung: «Mir ist aufgefallen, dass …; an wen kann ich mich mit meiner Sorge wenden?»",
    ],
  },
  {
    titel: "Nach einer Krise: Zuständigkeiten klären",
    inhalt: [
      "Fragen Sie aktiv: «Wer übernimmt die Nachsorge, wann ist der nächste Kontakt und was kann ich verlässlich beitragen?»",
      "Klare Absprache: Wer macht was? Therapeutin, Angehöriger, betroffene Person",
      "Notfallkontakt klären: «Wenn es wieder kritisch wird, rufe ich … an?»",
      "Eine Entlassung bedeutet nicht automatisch, dass Angehörige Betreuung übernehmen oder rund um die Uhr verfügbar sind. Sagen Sie früh, was Sie freiwillig übernehmen können; auch eine nicht übernommene Aufgabe muss im Nachsorgeplan berücksichtigt werden.",
      "Bitten Sie mit Einwilligung der betroffenen Person um die für Ihre vereinbarte Rolle nötigen Informationen. Ohne entsprechende Einwilligung oder andere Rechtsgrundlage besteht kein allgemeiner Anspruch auf vertrauliche Behandlungsinformationen oder den Austrittsbericht. Ihre eigene Belastungsgrenze dürfen Sie trotzdem benennen.",
    ],
  },
] as const;

const therapieformen = [
  {
    name: "DBT · Dialektisch-Behaviorale Therapie",
    description:
      "Stark strukturiert, mit Fokus auf Emotionsregulation, Stresstoleranz, Achtsamkeit und zwischenmenschliche Skills.",
  },
  {
    name: "MBT · Mentalisierungsbasierte Therapie",
    description:
      "Konzentriert sich auf das Verstehen eigener und fremder innerer Zustände und auf Beziehungsgeschehen.",
  },
  {
    name: "Schematherapie",
    description:
      "Arbeitet mit frühen Prägungen, Beziehungsmustern und inneren Zuständen, die unter Stress reaktiv werden.",
  },
  {
    name: "TFP · Übertragungsfokussierte Psychotherapie",
    description:
      "Arbeitet mit dem Beziehungserleben in der therapeutischen Beziehung selbst: innere Konflikte werden im «Hier und Jetzt» zwischen Therapeut:in und Patient:in sichtbar und bearbeitbar. In der Schweizer Versorgungsrealität weniger verbreitet als DBT, aber als evidenzbasierte Therapie etabliert.",
  },
  {
    name: "Strukturierte generalistische Behandlung",
    description:
      "Auch klar strukturierte, störungsinformierte Behandlungen ohne spezialisiertes Therapielabel können wirksam sein. Dazu gehören ein verlässlicher Rahmen, gemeinsam vereinbarte Ziele, Krisenplanung, aktive Begleitung und eine koordinierte Behandlung von Begleiterkrankungen.",
  },
] as const;

const musterMail = `Betreff: Kurze Anfrage als Angehörige von [Vorname]

Guten Tag Frau/Herr [Name]

ich bin [Beziehung zu Vorname, z. B. Mutter, Vater oder Partnerin] von [Vorname].

Mir ist bewusst, dass Sie ohne entsprechende Einwilligung oder andere Rechtsgrundlage keine vertraulichen Behandlungsauskünfte weitergeben dürfen.

Ich möchte meine eigenen Beobachtungen mitteilen und klären, welche Unterstützung ich anbieten kann. Ist dafür ein Gespräch möglich, oder können Sie mir eine Angehörigenberatung nennen? Bitte teilen Sie mir mit, welcher Kontaktweg dafür geeignet ist.

Mit freundlichen Grüssen,
[Ihr Name]
[Optional: Telefonnummer für Rückruf]`;

export default function UnterstuetzenTherapie() {
  const h4Style = {
    fontSize: "var(--text-md)",
    fontWeight: 600,
    color: "var(--fg-primary)",
  };

  const bodyStyle = {
    fontSize: "var(--text-sm)",
    lineHeight: "var(--lh-relaxed)",
    color: "var(--fg-secondary)",
  };

  const labelStyle = {
    fontSize: "var(--text-xs)",
    letterSpacing: "var(--tracking-caps)",
    color: "var(--fg-tertiary)",
    fontWeight: 500,
  } as const;

  return (
    <Layout>
      <SEO
        title="Therapie und Angehörigenrolle"
        description="Behandlung verstehen, Autonomie und Schweigepflicht achten und die eigene Angehörigenrolle klären."
        path="/unterstuetzen/therapie"
      />
      <MedicalPageSchema
        title="Therapie und Angehörigenrolle"
        description="Behandlung verstehen, Autonomie und Schweigepflicht achten und die eigene Angehörigenrolle klären."
        path="/unterstuetzen/therapie"
      />
      <TableOfContents />

      <UnterstuetzenSubNav />

      {/* ── 1 Hero ── EditorialSection ohne Aside (Sub-Page-Identität) */}
      <EditorialSection
        variant="cream"
        density="compact"
        className="topic-intro"
      >
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.4,
            }}
          >
            Rolle und Rahmen
          </span>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel className="mb-3" spacing="compact">
            Therapie
          </EyebrowLabel>
          <DisplayHeading level={1} size="topic">
            Therapie und <em>Angehörigenrolle</em>
          </DisplayHeading>
          <Lede className="max-w-[40em]">
            Professionelle Behandlung kann ein wichtiger Teil eines
            individuellen Genesungswegs sein. Ob, wie und mit welchen Zielen sie
            stattfindet, entscheidet die betroffene Person gemeinsam mit
            Fachpersonen. Angehörige dürfen ihre eigene Rolle und Unterstützung
            unabhängig davon klären.
          </Lede>
          <TopicQuickLinks
            items={[
              { href: "#rolle", label: "Die eigene Rolle" },
              { href: "#zusammenarbeit", label: "Kontakt zum Behandlungsteam" },
              { href: "#musterbrief", label: "Musterbrief" },
              { href: "#therapieangebote", label: "Therapieangebote" },
            ]}
          />
          <div
            className="mt-8 border-t pt-3"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <EyebrowLabel spacing="compact">
              Grundtext ca. 10 Min · Mit Vertiefungen länger
            </EyebrowLabel>
            <LastVerifiedBadge
              path="/unterstuetzen/therapie"
              className="mt-3"
            />
          </div>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 2 Orientierung ── RollenOrbitVisualisierung
           (verschoben von zwischen Intro und CS1, jetzt nach Hero —
           analog Krise + Alltag-Pattern) */}
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Orientierung
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <RollenOrbitVisualisierung />
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 3 Intro: Was diese Seite bei Therapie ordnet ── */}
      <EditorialSection variant="cream" density="compact">
        <EditorialSection.Body>
          <ul className="topic-takeaways">
            <li>
              Behandlung liegt bei der erkrankten Person und den Fachpersonen.
            </li>
            <li>
              Beobachtungen mitteilen und vertrauliche Auskünfte erhalten sind
              unterschiedliche Dinge.
            </li>
            <li>
              Für Ihre eigene Belastung dürfen Sie unabhängig von der Behandlung
              Beratung nutzen.
            </li>
          </ul>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 4 Pull-Quote (dominant, eigene Sektion zwischen Intro und Group A) ── */}
      <EditorialSection variant="cream">
        <EditorialSection.Body>
          <EditorialPullQuote>
            Sie müssen eine Therapie weder zum Funktionieren bringen noch ihren
            Rahmen mittragen. Klären Sie, ob überhaupt etwas von Ihnen gewünscht
            ist und was Sie freiwillig übernehmen können.
          </EditorialPullQuote>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 5 Group A: Was hilft ── CS1 rolle + CS2 zusammenarbeit */}
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Was hilft
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Was Angehörige freiwillig anbieten können"
            id="rolle"
          >
            <EditorialProse>
              <p>
                Auf Wunsch können Angehörige eine organisatorische Hilfe, ein
                Gespräch oder Begleitung anbieten. Die betroffene Person darf
                das Angebot annehmen, verändern oder ablehnen. Sie müssen weder
                Therapieerfolg bewerten noch Motivation, Übungen oder
                Krisenregulation übernehmen.
              </p>
            </EditorialProse>
          </ContentSection>

          {/* ── ContentSection 2: zusammenarbeit ── */}
          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Mit dem Behandlungssystem zusammenarbeiten"
            id="zusammenarbeit"
          >
            <EditorialProse>
              <p>
                Klären Sie gemeinsam, welche Rolle Sie übernehmen möchten und
                können. Der Einbezug soll die Wünsche der betroffenen Person,
                den Behandlungsrahmen und Ihren eigenen Unterstützungsbedarf
                berücksichtigen. Drei Informationswege sind zu unterscheiden:
              </p>
            </EditorialProse>
            <div className="mt-6 space-y-6">
              <article className="space-y-2">
                <h3 style={h4Style}>1. Beobachtungen mitteilen</h3>
                <p style={bodyStyle}>
                  Ausserhalb akuter Gefahr sollte ein Kontakt zum
                  Behandlungsteam möglichst mit der betroffenen Person
                  abgesprochen sein. Beschreiben Sie eigene konkrete
                  Beobachtungen und Ihren eigenen Unterstützungsbedarf, ohne
                  Motive, Diagnose oder Therapieverlauf zu bewerten. Klären Sie
                  den geeigneten Kontaktweg. Vertraulichkeit Ihrer Mitteilung
                  gegenüber der betroffenen Person kann nicht pauschal
                  zugesichert werden. Bei möglicher akuter Gefahr nutzen Sie die
                  Notfallwege und warten nicht auf eine Rückmeldung per E-Mail.
                </p>
              </article>
              <article className="space-y-2">
                <h3 style={h4Style}>2. Vertrauliche Auskünfte erhalten</h3>
                <p style={bodyStyle}>
                  Informationen über Diagnose, Sitzungen oder Verlauf dürfen
                  grundsätzlich nur mit entsprechender Einwilligung oder einer
                  anderen Rechtsgrundlage weitergegeben werden. Eine Mitteilung
                  an das Team hebt die Schweigepflicht nicht auf. Besprechen
                  Sie, welche Informationen für Ihre vereinbarte Unterstützung
                  nötig sind und welche Einwilligung dafür vorliegt.
                </p>
              </article>
              <article className="space-y-2">
                <h3 style={h4Style}>3. Eigene Beratung nutzen</h3>
                <p style={bodyStyle}>
                  Für Ihre eigene Belastung und Ihre Fragen dürfen Sie
                  unabhängig Hilfe suchen. Die Fachstelle Angehörigenarbeit der
                  PUK berät kostenlos und vertraulich, auch ohne Vollmacht der
                  erkrankten Person. Diese Beratung gibt Ihnen keinen Zugang zu
                  deren Behandlungsinformationen.
                </p>
                <Link href="/fachstelle" className="editorial-link">
                  Angehörigenberatung kontaktieren
                </Link>
              </article>
            </div>
            <EvidenceNote
              title="Quellen zu Schweigepflicht, Angehörigenberatung und Zweitmeinung"
              sources={[
                {
                  label: "BAG: Berufs- oder Arztgeheimnis",
                  href: "https://www.bag.admin.ch/de/berufs-oder-arztgeheimnis",
                  type: "versorgung",
                },
                {
                  label: "PUK Zürich: Informationen für Angehörige",
                  href: "https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/",
                  type: "versorgung",
                },
                {
                  label: "Kanton Zürich: Anlaufstellen und Zweitmeinung",
                  href: "https://www.zh.ch/de/gesundheit/anlaufstellen-gesundheitswesen/patientinnen-patienten-angehoerige.html",
                  type: "versorgung",
                },
              ]}
            />
            <div className="mt-8 space-y-10">
              {zusammenarbeitSzenarien.map(szenario => (
                <article key={szenario.titel} className="space-y-3">
                  <h3 style={h4Style}>{szenario.titel}</h3>
                  <ul className="ml-5 list-disc space-y-1.5" style={bodyStyle}>
                    {szenario.inhalt.map(p => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <aside
              className="mt-10 border-l-4 pl-5"
              style={{ borderColor: "var(--accent-label)" }}
            >
              <h3 style={h4Style}>Die eigene Rolle und Ansprechwege klären</h3>
              <p className="mt-3" style={bodyStyle}>
                Sie müssen die Behandlung weder beurteilen noch ihren Verlauf
                kontrollieren. Hilfreicher ist, die eigene Perspektive, eine
                vereinbarte Rolle und erreichbare Ansprechwege zu klären.
              </p>
              <ul className="mt-3 ml-5 list-disc space-y-1.5" style={bodyStyle}>
                <li>
                  Welche eigenen konkreten Beobachtungen möchten Sie – möglichst
                  mit Wissen der betroffenen Person – in ein gemeinsames
                  Gespräch einbringen?
                </li>
                <li>
                  Was belastet Sie selbst, und wo erhalten Sie unabhängig von
                  der Behandlung Beratung oder Entlastung?
                </li>
                <li>
                  Welche Unterstützung haben alle Beteiligten miteinander
                  vereinbart – und was gehört ausdrücklich nicht zu Ihrer Rolle?
                </li>
                <li>
                  Welcher Kontaktweg ist für nicht akute Anliegen vorgesehen,
                  und an wen wenden Sie sich bei möglicher akuter Gefahr?
                </li>
              </ul>
              <p className="mt-3" style={bodyStyle}>
                Bei akuten Sicherheitsbedenken holen Sie sofort professionelle
                Hilfe. Nicht akute Beobachtungen können Sie, wenn möglich und
                gewünscht, zuerst mit der betroffenen Person besprechen. Das
                Behandlungsteam entscheidet gemeinsam mit ihr über Ziele und
                Verlauf; Sie dürfen sich auf Ihre eigene Rolle und Belastung
                konzentrieren.
              </p>
            </aside>
            <AngehoerigenBeratung />
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 6 Group B: Forschungsstand ── CS3 therapieformen + EvidenceNote */}
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Forschungsstand
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Therapieformen knapp eingeordnet"
            id="therapieformen"
          >
            <div className="mt-2 space-y-6">
              {therapieformen.map(item => (
                <article key={item.name} className="space-y-2">
                  <h3 style={h4Style}>{item.name}</h3>
                  <p style={bodyStyle}>{item.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-6">
              <EditorialPullQuote>
                Angehörige dürfen allgemeine Fragen zu Abläufen, Kontaktwegen
                und eigener Unterstützung stellen. Behandlungsziele und
                Fortschritt bewertet die betroffene Person gemeinsam mit dem
                Fachteam; Angehörige müssen den Therapieverlauf nicht
                beurteilen.
              </EditorialPullQuote>
            </div>
            <EvidenceNote
              variant="editorial"
              title="Quellen zu Therapieverfahren und Angehörigenprogrammen"
              definition="Mehrere strukturierte Psychotherapien können bei BPS helfen; die Sicherheit der Evidenz ist für viele Einzelvergleiche begrenzt, und es gibt keine für alle Menschen beste Methode. Auch strukturierte generalistische Behandlung ist relevant. Familienprogramme wie Family Connections zeigen vielversprechende Ergebnisse, die Evidenzbasis ist jedoch kleiner und vorläufiger als bei den untersuchten Psychotherapien."
              sources={[
                {
                  label:
                    "APA Practice Guideline (2024) – strukturierte Psychotherapie bei BPS",
                  href: quellenLinks.apa2024,
                  type: "wissenschaft",
                },
                {
                  label:
                    "Storebø et al. (2020) – Cochrane-Review zu psychologischen Therapien bei BPS",
                  href: quellenLinks.storebo2020,
                  type: "wissenschaft",
                },
                {
                  label:
                    "Bateman & Fonagy (2009) – RCT zu mentalisierungsbasierter Therapie",
                  href: quellenLinks.batemanFonagy2009,
                  type: "wissenschaft",
                },
                {
                  label: "Linehan (2015) – DBT Skills Training Manual",
                  href: quellenLinks.linehan2015,
                  type: "wissenschaft",
                },
                {
                  label: "Hoffman et al. (2005) – Family Connections",
                  href: quellenLinks.hoffman2005,
                  type: "wissenschaft",
                },
                {
                  label:
                    "Guillén et al. (2021) – systematische Übersicht zu Angehörigeninterventionen",
                  href: quellenLinks.guillen2021,
                  type: "wissenschaft",
                },
                {
                  label:
                    "Gunderson, Berkowitz & Ruiz-Sancho (1997) – psychoedukative Familienarbeit",
                  href: quellenLinks.gunderson1997,
                  type: "wissenschaft",
                },
              ]}
            />
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 7 Group C: Prozess-Begleitung ── CS4 unterstuetzen + CS5 musterbrief + CS6 rueckschlaege */}
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Rolle im Umfeld
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Welche Angebote möglich sein können"
            id="unterstuetzen"
          >
            <EditorialProse>
              <p>
                Wenn Unterstützung gewünscht ist, können kleine, begrenzte
                Angebote möglich sein:
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li>
                  Therapie als Möglichkeit ansprechen, nicht als Drohkulisse
                </li>
                <li>bei Organisation helfen, wenn das erwünscht ist</li>
                <li>
                  gemeinsam üben, wenn die Person dies ausdrücklich möchte
                </li>
                <li>
                  nachfragen, welche Veränderungen für die Person selbst
                  bedeutsam sind
                </li>
                <li>
                  schwierige Phasen ernst nehmen, ohne den Therapieverlauf von
                  aussen zu bewerten
                </li>
                <li>
                  eigene Unterstützung unabhängig von der Therapiebereitschaft
                  suchen
                </li>
              </ul>
              <p>
                Wenn Sprache, Scham oder Migrationserfahrungen Gespräche
                erschweren, ist das kein Ausschlusskriterium für Behandlung.
                Hilfreich ist oft, zunächst über das Beobachtbare zu sprechen:
                Schlaf, Alarmzustand, Rückzug, Selbstverletzung, Wut oder
                Sicherheit. Fragen Sie in Praxis, Klinik oder Beratung aktiv
                nach professioneller Dolmetschung, wenn Deutsch nicht für alle
                sicher genug ist. Kinder sollten Diagnose-, Krisen- oder
                Gewaltgespräche nicht dolmetschen müssen.
              </p>
              <p>
                Für die eigene Entlastung müssen Sie nicht auf eine
                Behandlungsentscheidung der betroffenen Person warten.
                Psychoedukative Angehörigenprogramme wie Family Connections sind
                nicht nur entlastende Zusatzangebote, sondern fachlich
                beschrieben. Mehr dazu finden Sie auf der{" "}
                <Link href="/quellen" className="editorial-link">
                  Quellen-Seite
                </Link>{" "}
                und unter{" "}
                <Link href="/beratung" className="editorial-link">
                  Selbsthilfegruppen & Netzwerke
                </Link>
                .
              </p>
            </EditorialProse>
          </ContentSection>

          {/* ── ContentSection 5: musterbrief ── */}
          <ContentSection
            variant="editorial"
            title="Erstkontakt mit dem Therapeuten – Musterbrief"
            id="musterbrief"
            preview="Eine kurze, klare E-Mail kann den Einstieg erleichtern. Hier ein Muster, das Sie anpassen können."
          >
            <EditorialProse>
              <p>
                Wenn Sie als nahestehende Person Kontakt mit dem Therapeuten
                aufnehmen möchten, kann eine kurze schriftliche Nachricht
                helfen. Das Muster unten dient als Ausgangspunkt, wenn Sie Ihre
                Perspektive einbringen oder nach einem Angehörigengespräch
                fragen möchten.
              </p>
            </EditorialProse>
            <figure
              className="mt-8 border-t pt-6"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <figcaption className="uppercase" style={labelStyle}>
                Muster-E-Mail
              </figcaption>
              <pre
                className="mt-3 whitespace-pre-line font-mono"
                style={{
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--lh-relaxed)",
                  color: "var(--fg-primary)",
                }}
              >
                {musterMail}
              </pre>
            </figure>
            <p className="mt-6" style={bodyStyle}>
              <strong style={{ color: "var(--fg-primary)" }}>Wichtig:</strong>{" "}
              Der Therapeut ist an die Schweigepflicht gebunden und darf ohne
              Einwilligung Ihres Angehörigen keine Inhalte der Behandlung
              besprechen. Das ist kein Ablehnen – sondern professionelles
              Handeln.
            </p>
          </ContentSection>

          {/* ── ContentSection 6: rueckschlaege ── */}
          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Rückschläge und Unterbrüche"
            id="rueckschlaege"
          >
            <EditorialProse>
              <p>
                Behandlungswege können Unterbrüche, Wechsel oder neue Anläufe
                enthalten. Angehörige erleben dabei mitunter Hoffnung, Sorge,
                Erleichterung oder Erschöpfung. Diese Reaktionen sind
                verständlich; sie machen Sie nicht zur Bewertungsinstanz des
                Verlaufs.
              </p>
            </EditorialProse>
            <div className="mt-4">
              <EditorialPullQuote>
                Wenn die Person darüber sprechen möchte, können offene Fragen
                helfen: Was war hilfreich? Was war schwierig? Welche Art von
                Unterstützung ist jetzt gewünscht – oder auch nicht?
              </EditorialPullQuote>
            </div>
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 8 Group D: Grenzen der Rolle ── CS7 nicht-ihre-rolle */}
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Grenzen der Rolle
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Was Ihre Rolle ausdrücklich nicht ist"
            id="nicht-ihre-rolle"
          >
            <EditorialProse>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  Sie müssen nicht Therapiesprache permanent in den Alltag
                  übersetzen.
                </li>
                <li>
                  Sie müssen nicht jedes Verhalten analysieren oder mit
                  Fachbegriffen einordnen.
                </li>
                <li>
                  Sie sind nicht dafür zuständig, Motivation dauerhaft
                  aufrechtzuerhalten.
                </li>
                <li>
                  Sie müssen Behandlungsfortschritt nicht kontrollieren oder
                  überwachen.
                </li>
              </ul>
            </EditorialProse>
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 9 Therapieangebote ZH ── eigener Block (nicht Group)
           ID 'therapieangebote' auf H2 — Ziel des /therapieangebote-Redirects */}
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Therapieangebote ZH
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel>Angebote</EyebrowLabel>
          <DisplayHeading level={2} id="therapieangebote">
            Therapieangebote im Kanton Zürich
          </DisplayHeading>
          <EditorialProse>
            <p>
              Therapie ist in drei Settings möglich: <em>ambulant</em> mit
              regelmässigen Terminen und Leben zu Hause, <em>teilstationär</em>{" "}
              in einer Tagesklinik mit Übernachtung zu Hause oder{" "}
              <em>stationär</em> mit Aufenthalt in der Klinik.
            </p>
          </EditorialProse>

          <article className="mt-10 space-y-2">
            <h3 style={h4Style}>HYPE Züri</h3>
            <p style={bodyStyle}>
              Frühinterventionsangebot für Jugendliche ab 13 Jahren mit
              Verdacht, Risiko oder bereits diagnostizierter Borderline-Störung.
            </p>
            <p
              className="flex flex-wrap gap-x-6 gap-y-1"
              style={{ fontSize: "var(--text-sm)" }}
            >
              <a href={`tel:${hype.tel}`} className="editorial-link">
                Telefon {hype.nummer}
              </a>
              <a
                href={`mailto:${emailKjpp.adresse}`}
                className="editorial-link"
              >
                {emailKjpp.adresse}
              </a>
            </p>
          </article>

          <article className="mt-8 space-y-2">
            <h3 style={h4Style}>PUK Zürich – Erwachsene</h3>
            <p style={bodyStyle}>
              Spezialisierte DBT-orientierte Behandlungsangebote für Erwachsene.
            </p>
            <p
              className="flex flex-wrap gap-x-6 gap-y-1"
              style={{ fontSize: "var(--text-sm)" }}
            >
              <a href={`tel:${pukDbt.tel}`} className="editorial-link">
                Telefon {pukDbt.nummer}
              </a>
              <a
                href={`mailto:${emailHard.adresse}`}
                className="editorial-link"
              >
                {emailHard.adresse}
              </a>
            </p>
          </article>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <article className="space-y-2">
              <h3 style={h4Style}>IPW Winterthur</h3>
              <p style={bodyStyle}>
                Erwachsenenpsychiatrisches Angebot in Winterthur mit regionaler
                Anbindung.
              </p>
              <p style={{ fontSize: "var(--text-sm)" }}>
                <a href={`tel:${ipw.tel}`} className="editorial-link">
                  Telefon {ipw.nummer}
                </a>
              </p>
            </article>
            <article className="space-y-2">
              <h3 style={h4Style}>Clienia Schlössli</h3>
              <p style={bodyStyle}>
                Weiterführendes stationäres Emotionsregulationsprogramm.
              </p>
              <p style={{ fontSize: "var(--text-sm)" }}>
                <a
                  href={clieniaUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link"
                >
                  Website besuchen
                </a>
              </p>
            </article>
            <article className="space-y-2">
              <h3 style={h4Style}>DBT-Therapeutensuche</h3>
              <p style={bodyStyle}>
                Suchweg für zertifizierte DBT-Therapeutinnen und -Therapeuten.
              </p>
              <p style={{ fontSize: "var(--text-sm)" }}>
                <a
                  href={dbtDachUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link"
                >
                  Therapeutensuche
                </a>
              </p>
            </article>
          </div>

          <article
            className="mt-10 border-t pt-6"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <h3 style={h4Style}>Notfall-Nummern PUK Zürich (24/7)</h3>
            <ul
              className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-3"
              style={bodyStyle}
            >
              {GELB.filter(k => k.id !== "GELB_KIZ").map(k => (
                <li key={k.id}>
                  <p style={labelStyle}>{k.fuerWen ?? k.label}</p>
                  <a
                    href={`tel:${k.tel}`}
                    className="editorial-link"
                    style={{ fontSize: "var(--text-md)", fontWeight: 500 }}
                  >
                    {k.nummer}
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 10 Weiter-Hinweis ── */}
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Weiter
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EditorialProse>
            <p>
              Wenn aus Therapierahmen akute Eskalation wird, geht es um{" "}
              <Link href="/unterstuetzen/krise" className="editorial-link">
                weiter: In der Krise unterstützen
              </Link>
              . Zurück geht es zu{" "}
              <Link href="/unterstuetzen/alltag" className="editorial-link">
                Im Alltag unterstützen
              </Link>
              .
            </p>
          </EditorialProse>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 11 Querverweise ── EditorialSection variant="cream-deep" */}
      <EditorialSection variant="cream-deep">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Verwandt
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <RelatedLinksEditorial
            flush
            links={[
              {
                href: "/unterstuetzen/krise",
                title: "Krisen begleiten",
                description:
                  "Deeskalation, Sicherheitsorientierung und passende Hilfe — wenn eine Krise den Therapierahmen übersteigt.",
              },
              {
                href: "/genesung",
                title: "Genesung",
                description:
                  "Realistische Perspektive auf Behandlungsverläufe, Remission und Recovery.",
              },
              {
                href: "/fachstelle",
                title: "Fachstelle",
                description:
                  "Beratung für Angehörige — auch unabhängig vom therapeutischen Rahmen.",
              },
            ]}
          />
        </EditorialSection.Body>
      </EditorialSection>
    </Layout>
  );
}
