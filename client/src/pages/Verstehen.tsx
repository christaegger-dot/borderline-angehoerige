import TopicQuickLinks from "@/components/TopicQuickLinks";
import ContentSection from "@/components/ContentSection";
import {
  DisplayHeading,
  EditorialProse,
  EditorialSection,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import EvidenceNote from "@/components/EvidenceNote";
import GlossarBegriff from "@/components/GlossarBegriff";
import { EisbergIllustration } from "@/components/illustrations";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import { TableOfContents } from "@/components/UXEnhancements";
import { quellenLinks } from "@/content/quellenLinks";
import VerstehenMaterialsSection from "@/sections/VerstehenMaterialsSection";
import {
  VerstehenBegleitOverviewSection,
  VerstehenDiagnosticSection,
  VerstehenMeaningSection,
  VerstehenRelationshipSection,
} from "@/sections/VerstehenSupportSections";
import { Link } from "wouter";

export default function Verstehen() {
  return (
    <Layout>
      <SEO
        title="Borderline verstehen"
        description="Borderline personen- und perspektivenbewusst verstehen: individuelle Erfahrungen, diagnostische Grenzen und Orientierung für Angehörige."
        path="/verstehen"
      />
      <MedicalPageSchema
        title="Borderline verstehen"
        description="Borderline personen- und perspektivenbewusst verstehen: individuelle Erfahrungen, diagnostische Grenzen und Orientierung für Angehörige."
        path="/verstehen"
      />
      <TableOfContents />

      {/* ── 1 Hero ── EditorialSection mit EisbergIllustration als Aside */}
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
              hyphens: "auto",
              overflowWrap: "break-word",
            }}
          >
            {/* Soft-hyphens als defensive Backup-Break-Points falls
                hyphens:auto-Hyphenation-Dictionary den Compound nicht bricht.
                Brechpunkte: Borderline-|Persönlich|keits|störung */}
            {"Borderline-Persönlich­keits­störung"}
          </span>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel className="mb-3" spacing="compact">
            Verstehen
          </EyebrowLabel>
          <DisplayHeading level={1} size="topic">
            <em>Borderline</em> verstehen, ohne die Distanz zu verlieren.
          </DisplayHeading>
          <Lede size="hero">
            Borderline wird von jeder Person anders erlebt. Diese Seite bietet
            Angehörigen Orientierung, ohne Menschen auf eine Diagnose zu
            reduzieren, Motive festzulegen oder Angehörigen eine feste Rolle
            zuzuweisen.
          </Lede>
          <TopicQuickLinks
            items={[
              {
                href: "#angehoerige-erleben",
                label: "Erleben von Angehörigen",
              },
              { href: "#was-ist-borderline", label: "Borderline verstehen" },
              { href: "#muster", label: "Mögliche Wechselwirkungen" },
            ]}
          />
          <div
            className="mt-8 border-t pt-3"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <EyebrowLabel spacing="compact">
              Grundtext ca. 15 Min · Mit Vertiefungen länger
            </EyebrowLabel>
          </div>
        </EditorialSection.Body>
        <EditorialSection.Aside>
          <div
            className="ml-auto block aspect-square w-full max-w-[560px]"
            style={{
              filter: "drop-shadow(0 8px 24px rgba(91, 58, 78, 0.12))",
            }}
          >
            <EisbergIllustration
              className="block h-full w-full"
              ariaLabel="Eine Eisberg-Spitze über der Wasserlinie und eine grössere Form unter Wasser als Metapher für sichtbares Verhalten und mögliche Kontexte."
            />
          </div>
        </EditorialSection.Aside>
      </EditorialSection>

      {/* ── 2 Worum es hier vor allem geht ── EditorialSection mit Kernthema-MarginNote */}
      <EditorialSection variant="cream" density="compact">
        <EditorialSection.Body>
          <ul className="topic-takeaways">
            <li>
              Borderline kann Gefühle, Selbstbild und Beziehungen belasten und
              zeigt sich unterschiedlich.
            </li>
            <li>
              Ein Verhalten lässt keine sichere Aussage über Diagnose oder
              innere Motive zu.
            </li>
            <li>Verständnis und Selbstschutz dürfen gleichzeitig bestehen.</li>
          </ul>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 3 Redaktioneller Merksatz ── keine erfundene Personenstimme */}
      <EditorialSection variant="cream">
        <EditorialSection.Body>
          <p
            className="font-display"
            style={{
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              lineHeight: 1.4,
              color: "var(--accent-primary)",
              paddingTop: "var(--space-7)",
              paddingBottom: "var(--space-7)",
              fontWeight: 400,
              maxWidth: "32em",
            }}
          >
            Verstehen macht nicht alles leichter. Es kann aber helfen,
            Eskalationen nicht vorschnell als Bosheit, Distanz nicht nur als
            Ablehnung und Krisen nicht als persönliches Versagen zu lesen.
          </p>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 4 Kernabschnitte ── Erzählung als offene Prosa (collapsible={false});
          nur Mythen, Diagnostik und Begleiterkrankungen bleiben Akkordeon. */}
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
            Leitfragen
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          {/* ── ContentSection × 6 (editorial variant) ── */}
          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Was Angehörige in belasteten Beziehungen erleben können"
            id="angehoerige-erleben"
          >
            <EditorialProse>
              <p>
                Manche Angehörige berichten in belasteten Beziehungen von
                intensiver Nähe, Rückzug, Funkstille oder Konflikten. Eine
                Beziehung kann sich dabei gleichzeitig bedeutsam, zart,
                erschöpfend oder unsicher anfühlen. Solche Erfahrungen kommen
                nicht bei allen Menschen mit Borderline vor und lassen sich aus
                der Diagnose nicht vorhersagen.
              </p>
              <p>
                Viele Angehörige schwanken deshalb nicht nur zwischen Mitgefühl
                und Hilfsbereitschaft, sondern auch zwischen Angst, Wut,
                Selbstzweifel, Loyalität und dem Wunsch nach Abstand. Diese
                Ambivalenz ist nicht Ausdruck mangelnder Liebe, sondern oft Teil
                der Belastungsrealität.
              </p>
              <p>
                <strong>Wichtig:</strong> Verstehen kann entlasten, weil es
                Muster einordnen hilft. Es ersetzt aber weder Grenzsetzung noch
                Selbstschutz noch professionelle Hilfe.
              </p>
            </EditorialProse>
          </ContentSection>

          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Was die Diagnose Borderline beschreiben kann"
            id="was-ist-borderline"
          >
            <EditorialProse>
              <p>
                Die Borderline-Persönlichkeitsstörung ist ein komplexes
                Störungsbild. Die Diagnose kann unter anderem intensive oder
                rasch wechselnde Gefühle, Schwierigkeiten mit innerer
                Stabilität, dem Selbstbild oder Beziehungen beschreiben. Diese
                Erfahrungen sind individuell verschieden und kommen teilweise
                auch ausserhalb einer Borderline-Diagnose vor.
              </p>
              <p>
                Nicht alle Menschen mit Borderline zeigen dieselben Muster.
                Manche drücken starke Gefühle sichtbar aus, andere erleben sie
                eher nach innen gerichtet oder ziehen sich zurück. Ausdruck,
                Verlauf und Belastung unterscheiden sich deutlich. Die Diagnose
                allein erlaubt keine Aussage darüber, ob von einem Menschen
                Gefahr ausgeht.
              </p>
              <p>
                Für Angehörige ist vor allem wichtig: Bei heftigen Reaktionen
                können Überflutung, Angst, Scham oder Verlassenheitsstress eine
                Rolle spielen. Andere Erklärungen sind ebenfalls möglich. Das
                macht Verhalten nicht folgenlos und ersetzt kein Nachfragen,
                kann aber helfen, vorschnelle Deutungen zu vermeiden.
              </p>
            </EditorialProse>
            <EvidenceNote
              variant="editorial"
              title="Quellen zur diagnostischen und klinischen Einordnung"
              definition="Die Diagnose kann unterschiedliche Erfahrungen mit Gefühlen, Selbstbild und Beziehungen beschreiben. Kein einzelnes Merkmal gilt für alle; ähnliche Erfahrungen kommen auch ohne Borderline-Diagnose vor."
              reviewDate="24.03.2026"
              sources={[
                {
                  label: "WHO ICD-11: Borderline pattern specifier (6D11.5)",
                  href: quellenLinks.icd11,
                  type: "wissenschaft",
                },
                {
                  label:
                    "APA Practice Guideline for the Treatment of Patients With Borderline Personality Disorder (2024)",
                  href: quellenLinks.apa2024,
                  type: "wissenschaft",
                },
                {
                  label:
                    "Linehan, Cognitive-Behavioral Treatment of Borderline Personality Disorder",
                  href: quellenLinks.linehan1993,
                  type: "wissenschaft",
                  note: "Grundlagenwerk zu Emotionsregulation und Bindungsstress",
                },
              ]}
            />
          </ContentSection>

          <VerstehenRelationshipSection />

          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Scham, Wut und innere Überflutung"
            id="scham-wut"
          >
            <EditorialProse>
              <p>
                Ärger oder Wut können in einer Beziehung deutlich spürbar sein,
                müssen aber weder im Vordergrund stehen noch auf eine bestimmte
                Weise geäussert werden. Gleichzeitig können Scham, Sorge vor
                Beziehungsverlust, Ohnmacht, innere Leere oder ganz andere
                Erfahrungen mitwirken. Das Eisberg-Bild ist eine mögliche
                Verständnishilfe, keine Aussage darüber, was in einer konkreten
                Person sicher «darunterliegt».
              </p>
              <p>
                Scham kann eine Situation mitprägen und schwer auszusprechen
                sein. Manche Menschen reagieren dann mit Rückzug,
                Selbstentwertung oder Abwehr; andere reagieren anders. Aus einem
                harten Satz oder Kontaktabbruch lässt sich deshalb nicht sicher
                auf ein verborgenes Gefühl schliessen. Wenn ein Gespräch möglich
                ist, hilft offenes Nachfragen mehr als eine feste Deutung.
              </p>
            </EditorialProse>
            <div className="mt-6 space-y-6">
              <div>
                <h3
                  className="mb-3"
                  style={{
                    fontSize: "var(--text-md)",
                    fontWeight: 600,
                    color: "var(--fg-primary)",
                  }}
                >
                  Was sichtbar werden kann
                </h3>
                <ul
                  className="space-y-1"
                  style={{
                    fontSize: "var(--text-sm)",
                    lineHeight: "var(--lh-relaxed)",
                    color: "var(--fg-secondary)",
                  }}
                >
                  <li>hörbar geäusserter Ärger oder ein Vorwurf</li>
                  <li>Rückzug oder Schweigen</li>
                  <li>eine harte Bewertung oder der Wunsch nach Abstand</li>
                  <li>angespannter Ton oder abrupter Gesprächsabbruch</li>
                </ul>
              </div>
              <div>
                <h3
                  className="mb-3"
                  style={{
                    fontSize: "var(--text-md)",
                    fontWeight: 600,
                    color: "var(--fg-primary)",
                  }}
                >
                  Offene Fragen statt Zuordnungen
                </h3>
                <ul
                  className="space-y-1"
                  style={{
                    fontSize: "var(--text-sm)",
                    lineHeight: "var(--lh-relaxed)",
                    color: "var(--fg-secondary)",
                  }}
                >
                  <li>Was beschreibt die Person selbst als belastend?</li>
                  <li>Welche aktuellen Lebensumstände wirken mit?</li>
                  <li>Welche anderen Erklärungen sind möglich?</li>
                  <li>Ist ein Nachfragen gerade gewollt und sicher?</li>
                </ul>
                <p
                  className="mt-3"
                  style={{
                    fontSize: "var(--text-sm)",
                    lineHeight: "var(--lh-relaxed)",
                    color: "var(--fg-secondary)",
                  }}
                >
                  Zwischen den beiden Listen besteht keine Zuordnung. Aus einem
                  beobachtbaren Verhalten lässt sich kein bestimmtes Gefühl,
                  Bedürfnis oder Motiv ablesen.
                </p>
              </div>
            </div>
          </ContentSection>

          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Wenn Denken unter Stress enger wird"
            id="stressmodus"
          >
            <EditorialProse>
              <p>
                Unter hoher emotionaler Überflutung verengt sich das Erleben
                häufig stark auf den aktuellen Schmerz, die aktuelle Angst oder
                den aktuellen Konflikt. Dann verlieren Menschen leichter den
                Zugang zu Grautönen, Beziehungsgeschichte und nüchterner
                Einordnung.
              </p>
              <h3
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                Alarmmodus
              </h3>
              <p>
                Das innere Alarmsystem reagiert rasch und heftig. Neutrale
                Signale können leichter als Distanz, Kritik oder Bedrohung
                gelesen werden.
              </p>
              <h3
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                Tunnelblick
              </h3>
              <p>
                In diesem Zustand kommen Argumente, Erklärungen und Korrekturen
                oft kaum an. Weniger Druck, eine Pause, Abstand oder selbst
                gewählte Unterstützung können dann hilfreicher sein. Welche
                Erfahrung oder welcher innere Zustand mitwirkt, lässt sich von
                aussen nicht sicher ablesen.
              </p>
              <h3
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                <GlossarBegriff term="Dissoziation">
                  Dissoziation
                </GlossarBegriff>{" "}
                und Entfremdung
              </h3>
              <p>
                Unter starkem Stress können auch Unwirklichkeitsgefühle, innere
                Abspaltung oder das Gefühl auftreten, nicht mehr richtig präsent
                zu sein. Das ist für Betroffene wie Angehörige oft verstörend.
              </p>
              <p>
                <strong>Für Angehörige heisst das:</strong> Bei hoher Anspannung
                können eine Pause und wenige klare Worte hilfreicher sein als
                weitere Erklärungen. Sie müssen die andere Person nicht
                beruhigen können. Bei Gefahr hat Schutz Vorrang.
              </p>
            </EditorialProse>
          </ContentSection>

          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Mögliche Wechselwirkungen in belasteten Beziehungen"
            id="muster"
          >
            <EditorialProse>
              <p>
                Belastete Beziehungen können von wechselseitigem Druck,
                Unsicherheit, Rückzug oder unterschiedlichen Wünschen nach Nähe
                und Abstand geprägt sein. Daraus ergibt sich keine feste
                Abfolge, und die Diagnose einer Person erklärt den Verlauf nicht
                allein.
              </p>
              <p>
                Hilfreicher als ein vorgegebener Zyklus ist die gemeinsame
                Frage: Was ist gerade beobachtbar, was braucht jede beteiligte
                Person, und wo liegen ihre Grenzen? Die vertiefende Seite zeigt
                mögliche Wechselwirkungen, ohne Schuld oder feste Rollen
                zuzuteilen. Mehr dazu unter{" "}
                <Link href="/verstehen/beziehungen" className="editorial-link">
                  Borderline und Beziehungen
                </Link>
                .
              </p>
            </EditorialProse>
          </ContentSection>

          <VerstehenMeaningSection />

          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Verstehen hat Grenzen"
            id="grenzen-des-verstehens"
          >
            <EditorialProse>
              <p>
                Verstehen bedeutet nicht, alles auszuhalten. Es bedeutet auch
                nicht, dass Sie jede Eskalation auffangen, jedes Verhalten
                korrekt einordnen oder jede Krise mit der richtigen Reaktion
                entschärfen könnten.
              </p>
              <p>
                Mitgefühl und Selbstschutz widersprechen sich nicht. Gerade in
                belasteten Beziehungen kann es verantwortungsvoll sein, Grenzen
                zu setzen, Distanz zu schaffen oder Hilfe von aussen
                einzubeziehen.
              </p>
              <p>
                <strong>Merksatz für Angehörige:</strong> Verstehen hilft,
                ruhiger und klarer zu handeln. Es verpflichtet Sie nicht dazu,
                sich selbst zu verlieren.
              </p>
            </EditorialProse>
          </ContentSection>

          <ContentSection
            variant="editorial"
            title="Häufige Mythen — und was realistischer ist"
            id="mythen-realitaet"
            preview="Viele Sätze über Borderline klingen eindeutig, greifen aber zu kurz. Eine realistischere Einordnung hilft Angehörigen, Betroffenen und Fachpersonen."
          >
            <EditorialProse>
              <h3
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Borderline ist nicht behandelbar.»
              </h3>
              <p>
                Realistischer ist: Borderline ist belastend, aber behandelbar.
                Viele Menschen erleben über Jahre deutliche Besserungen,{" "}
                <GlossarBegriff term="Remission">Remission</GlossarBegriff> oder
                umfassendere Genesung — mit individuell unterschiedlichen,
                fachlich gut dokumentierten Verläufen. Mehr dazu auf{" "}
                <Link href="/genesung" className="editorial-link">
                  Genesung
                </Link>
                .
              </p>

              <h3
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Menschen mit Borderline manipulieren bewusst.»
              </h3>
              <p>
                Manche Aussagen oder Handlungen können bei Angehörigen Druck,
                Angst oder Verunsicherung auslösen. Ein Motiv lässt sich daraus
                nicht sicher ableiten. Fragen Sie offen nach, wenn ein Gespräch
                möglich ist, und bleiben Sie zugleich bei der beobachtbaren
                Wirkung, Ihrer Sicherheit und Ihrer eigenen Grenze. Mehr dazu
                auf{" "}
                <Link href="/kommunizieren" className="editorial-link">
                  Kommunizieren
                </Link>{" "}
                und{" "}
                <Link href="/grenzen" className="editorial-link">
                  Grenzen
                </Link>
                .
              </p>

              <h3
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Angehörige sind schuld.»
              </h3>
              <p>
                Angehörige sind weder Ursache der Borderline-Erkrankung noch für
                die Genesung einer anderen Person verantwortlich.
                Beziehungsmuster entstehen in einem konkreten Kontext und werden
                von mehreren Faktoren beeinflusst. Wechselseitigen Einfluss
                anzuerkennen bedeutet keine Schuldzuweisung und keine Aufteilung
                von Verantwortung für die Erkrankung.
              </p>

              <h3
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Grenzen setzen ist lieblos.»
              </h3>
              <p>
                Grenzen sind kein Verrat, sondern oft die Voraussetzung dafür,
                dass Beziehung tragfähig bleibt. Sie schützen Sie selbst und
                schaffen mehr Orientierung als wechselnde Nachgiebigkeit.
              </p>

              <h3
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Borderline ist dasselbe wie Trauma.»
              </h3>
              <p>
                In klinischen Studien berichten viele, aber nicht alle Menschen
                mit Borderline von Misshandlung, Vernachlässigung oder anderen
                belastenden Kindheitserfahrungen. Solche Erfahrungen können
                Risikofaktoren sein; sie sind weder notwendig noch hinreichend
                für eine Borderline-Diagnose. Borderline, PTBS und komplexe PTBS
                sind unterschiedliche diagnostische Einordnungen. Einzelne
                Merkmale können sich überschneiden; eine Borderline-Diagnose
                kann zusammen mit einer PTBS oder einer komplexen PTBS
                auftreten. Die Abgrenzung gehört in eine fachliche Diagnostik.{" "}
                <Link
                  href="/verstehen/begleiterkrankungen"
                  className="editorial-link"
                >
                  Begleiterkrankungen
                </Link>
                .
              </p>

              <h3
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Suizid direkt anzusprechen macht es schlimmer.»
              </h3>
              <p>
                Wenn Sie sich konkret sorgen, fragen Sie ruhig und direkt, ob
                die Person Suizidgedanken oder einen Plan hat. Solche Fragen
                lösen nach heutigem Wissensstand keine suizidale Handlung aus;
                sie können helfen, die Lage zu verstehen und passende
                professionelle Hilfe einzubeziehen. Mehr dazu auf{" "}
                <Link href="/soforthilfe" className="editorial-link">
                  Soforthilfe
                </Link>
                .
              </p>

              <h3
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Wenn jemand bei anderen stabiler wirkt, spielt er oder sie
                nur.»
              </h3>
              <p>
                Verhalten kann je nach Beziehung und Situation unterschiedlich
                sein. Das allein belegt weder Täuschung noch einen bestimmten
                inneren Beweggrund. Fragen Sie, wenn es möglich und sicher ist,
                nach dem Erleben der Person; auch eigene Grenzen bleiben
                wichtig.
              </p>

              <h3
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Borderline betrifft nur Frauen.»
              </h3>
              <p>
                Borderline wird bei Frauen und Männern diagnostiziert. In
                klinischen Kontexten wird die Störung häufig als frauendominiert
                wahrgenommen; bevölkerungsbezogene Studien berichten teils keine
                signifikanten Unterschiede. Unterschiede in Symptompräsentation,
                Begleiterkrankungen und Behandlungswegen sind beschrieben, die
                Forschung ist jedoch heterogen. Menschen aller Geschlechter und
                ihre Angehörigen sind hier mit gemeint.
              </p>
            </EditorialProse>
            <EvidenceNote
              variant="editorial"
              title="Quellen zu Mythen, Verlauf und Geschlecht"
              definition="Die Einordnungen stützen sich auf Behandlungs- und Verlaufsforschung, eine Metaanalyse zu Kindheitsbelastungen, eine WHO-Einordnung zur Suizidansprache und eine Übersichtsarbeit zu Geschlechtsunterschieden. Zusammenhänge sind keine einfachen Ursachen und erlauben keine individuelle Vorhersage."
              sources={[
                {
                  label:
                    "Storebø et al. (2020) – Psychotherapien bei Borderline (Cochrane Review)",
                  href: quellenLinks.storebo2020,
                  type: "wissenschaft",
                },
                {
                  label:
                    "Zanarini et al. (2012) – Remission und Recovery im Langzeitverlauf",
                  href: quellenLinks.zanarini2012,
                  type: "wissenschaft",
                },
                {
                  label:
                    "Porter et al. (2020) – Kindheitsbelastungen und Borderline (Metaanalyse)",
                  href: quellenLinks.porter2020,
                  type: "wissenschaft",
                },
                {
                  label:
                    "WHO (2024) – ICD-11: diagnostische Anforderungen für Borderline, PTBS und komplexe PTBS",
                  href: quellenLinks.icd11,
                  type: "versorgung",
                },
                {
                  label: "WHO (2026) – Direktes Fragen nach Suizidgedanken",
                  href: quellenLinks.whoSuicide2026,
                  type: "versorgung",
                },
                {
                  label:
                    "Qian et al. (2022) – Geschlechtsunterschiede bei Borderline (Scoping Review)",
                  href: quellenLinks.qian2022,
                  type: "wissenschaft",
                },
              ]}
            />
          </ContentSection>

          <VerstehenDiagnosticSection />
          <VerstehenBegleitOverviewSection />
        </EditorialSection.Body>
      </EditorialSection>

      <VerstehenMaterialsSection />

      {/* ── 6 Weiter-Hinweis ── EditorialSection mit «Weiter»-MarginNote */}
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
              Wenn Sie Dynamiken besser einordnen können, wird oft klarer, wie
              Sie hilfreicher reagieren, Grenzen besser halten und die eigene
              Belastung ernster nehmen können. Als Nächstes geht es darum, wie
              Unterstützung tragfähig bleiben kann, ohne dass Sie sich selbst
              verlieren —{" "}
              <Link href="/unterstuetzen/uebersicht" className="editorial-link">
                weiter zu Unterstützen
              </Link>
              .
            </p>
          </EditorialProse>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 7 Querverweise ── EditorialSection variant="cream-deep" */}
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
                href: "/unterstuetzen/uebersicht",
                title: "Unterstützen",
                description:
                  "Wie Sie konkret helfen können, ohne sich selbst zu verlieren – Alltag, Krise und Therapie.",
              },
              {
                href: "/kommunizieren",
                title: "Kommunizieren",
                description:
                  "Gesprächsführung in belasteten Situationen: Deeskalation, Grenzsätze und die DEAR-Technik.",
              },
              {
                href: "/selbsttest",
                title: "Passende Inhalte finden",
                description:
                  "Kurze Einschätzung Ihrer eigenen Belastung – als erster Orientierungsschritt.",
              },
            ]}
          />
        </EditorialSection.Body>
      </EditorialSection>
    </Layout>
  );
}
