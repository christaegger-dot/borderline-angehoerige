import {
  EditorialColorBlock,
  EditorialFootnotes,
  EditorialHero,
  EditorialLayout,
  EditorialProse,
  EditorialPullQuote,
  EditorialSection,
  HeroLeuchtturmIllustration,
} from "@/components/editorial";
import AppLink from "@/components/AppLink";
import Layout from "@/components/Layout";
import SEO, { MedicalPageSchema, WebsiteSchema } from "@/components/SEO";
import { EMAILS, INFO } from "@/data/kontakte";
import { Link } from "wouter";

// Single-source-of-truth: keine Telefon-/E-Mail-Hardcoding im Markup
const FACHSTELLE = INFO.find(k => k.id === "INFO_FACHSTELLE");
const EMAIL_ANGEHOERIGEN = EMAILS.find(e => e.id === "EMAIL_ANGEHOERIGEN");

export default function Home() {
  return (
    <Layout>
      <SEO
        title="Startseite"
        description="Orientierung für Angehörige von Menschen mit Borderline: differenziert, fachlich fundiert und transparent eingeordnet."
        path="/"
      />
      <WebsiteSchema />
      <MedicalPageSchema
        title="Borderline: Orientierung für Angehörige"
        description="Psychoedukative Unterstützung für Angehörige von Menschen mit Borderline-Muster."
        path="/"
        lastReviewed="2026-04-30"
      />

      <EditorialHero
        eyebrow="Fachstelle Angehörigenarbeit · Psychiatrische Universitätsklinik Zürich"
        title={
          <>
            Wenn jemand, den Sie lieben, eine{" "}
            <em>Borderline-Persönlichkeitsstörung</em> hat
          </>
        }
        lede="Eine Begleitung für Partnerinnen, Eltern, Geschwister und erwachsene Kinder."
        illustrationSlot={<HeroLeuchtturmIllustration />}
      />

      <EditorialLayout width="narrow">
        {/* ── 2 Anerkennung ── */}
        <EditorialSection label="Anerkennung">
          <EditorialProse>
            <p>
              Sie fragen sich seit Jahren, ob das, was Sie erleben, Krankheit
              ist, Charakter oder Ihre eigene Schuld.
            </p>
            <p>
              Sie haben gelernt, auf Eierschalen zu laufen – und schämen sich
              gleichzeitig dafür, müde zu sein.
            </p>
            <p>
              Sie schwanken zwischen «ich bleibe um jeden Preis» und «ich halte
              das nicht mehr aus» – manchmal innerhalb derselben Stunde.
            </p>
          </EditorialProse>
        </EditorialSection>
      </EditorialLayout>

      {/* ── 3 Kerngedanke ── vollflächige Aubergine-Sektion */}
      <EditorialColorBlock
        variant="aubergine"
        label="Grundgedanke"
        title="Mitgefühl und Selbstschutz sind kein Widerspruch."
      >
        <EditorialProse dropCap>
          <p>
            Viele Angehörige, die zu uns kommen, tragen eine leise Überzeugung
            mit sich: dass ihr Wunsch nach Abstand der Beweis sei, nicht genug
            zu lieben. Dass Grenzen kalt seien. Dass eine Pause Verrat ist.
          </p>
          <p>
            Diese Überzeugung ist verständlich, aber sie hält Beziehungen nicht
            zusammen – sie zermürbt sie. Wer dauerhaft in Anspannung lebt,
            verliert irgendwann die Fähigkeit, präsent zu sein, auch dort, wo
            Präsenz wirklich gebraucht wird. Erschöpfte Angehörige helfen
            weniger, nicht mehr. Sie reagieren härter, schweigen länger, ziehen
            sich tiefer zurück.
          </p>
          <p>
            Selbstschutz ist deshalb keine Gegenkraft zur Beziehung, sondern
            ihre Voraussetzung. Eine ruhig gesetzte Grenze, eine geschützte
            Pause, ein klarer Satz darüber, was Sie nicht mehr aushalten – das
            ist nicht Egoismus. Es ist die Bedingung dafür, dass Sie morgen noch
            da sein können.
          </p>
          <p>
            Das gilt auch dann, wenn Ihr Angehöriger es nicht so erlebt.
            Menschen in akuter Belastung empfinden Grenzen oft als Ablehnung,
            manchmal als Bedrohung.¹ Diese Reaktion ist Teil der Erkrankung –
            sie ist kein Beweis dafür, dass Sie etwas falsch tun.
          </p>
          <p>
            Die Inhalte dieser Seite gehen von dieser Grundannahme aus. Sie
            können verstehen <em>und</em> schützen. Sie können bleiben{" "}
            <em>und</em> Distanz wahren. Sie können lieben <em>und</em> müde
            sein. Diese Sätze schliessen sich nicht aus, auch wenn sie sich oft
            so anfühlen.
          </p>
        </EditorialProse>
        <EditorialFootnotes
          notes={[
            {
              id: "1",
              content: (
                <>
                  Zur Bindungssensibilität und Verlassenheits-Reaktivität bei
                  BPS: Linehan,{" "}
                  <em>
                    Cognitive-Behavioral Treatment of Borderline Personality
                    Disorder
                  </em>
                  ; APA Practice Guideline (2024).
                </>
              ),
            },
          ]}
        />
      </EditorialColorBlock>

      <EditorialLayout width="narrow">
        {/* ── 4 Orientierung ── */}
        <EditorialSection label="Orientierung">
          <EditorialProse>
            <p>
              Wenn Sie verstehen möchten, was passiert – die Beziehungsdynamik,
              das Innenleben Ihres Angehörigen, die wiederkehrenden Muster –
              beginnen Sie unter <Link href="/verstehen">Verstehen</Link>. Wenn
              Sie konkrete Werkzeuge für den Alltag suchen, finden Sie diese
              unter <Link href="/kommunizieren">Kommunizieren</Link>,{" "}
              <Link href="/grenzen">Grenzen</Link> und{" "}
              <Link href="/selbstfuersorge">Selbstfürsorge</Link>. Bei akuten
              Krisen führt <AppLink href="/soforthilfe">Soforthilfe</AppLink> zu
              den Schweizer Notfallnummern.
            </p>
          </EditorialProse>
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--fg-tertiary)",
            }}
          >
            Eine vollständige Themenübersicht finden Sie über das Menü.
          </p>
        </EditorialSection>

        {/* ── 5 Stimme ── */}
        <EditorialSection label="Aus der Angehörigenarbeit">
          <EditorialPullQuote cite="Eine redaktionell verdichtete Erfahrung aus der Angehörigenarbeit. Keine Einzelperson.">
            «Ich habe alles versucht – und trotzdem nicht gewusst, was ich
            falsch mache. Was mir schliesslich geholfen hat, war zu verstehen,
            dass die Dynamik nicht an mir lag. Und dass Grenzen setzen keine
            Kälte ist, sondern Schutz für beide Seiten.»
          </EditorialPullQuote>
        </EditorialSection>

        {/* ── 6 Beratungseinladung ── */}
        <EditorialSection
          label="Fachstelle"
          title="Sie müssen nicht wissen, was Sie sagen wollen."
        >
          <EditorialProse>
            <p>
              Die Fachstelle Angehörigenarbeit berät auch Sie – nicht nur die
              erkrankte Person. Orientierung, Gespräch und Materialien für
              Partnerinnen, Eltern, Geschwister und erwachsene Kinder.
            </p>
          </EditorialProse>
          {FACHSTELLE && EMAIL_ANGEHOERIGEN && (
            <div
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-6"
              style={{ fontSize: "var(--text-md)" }}
            >
              <a href={`tel:${FACHSTELLE.tel}`} className="editorial-link">
                {FACHSTELLE.nummer}
              </a>
              <a
                href={`mailto:${EMAIL_ANGEHOERIGEN.adresse}`}
                className="editorial-link"
              >
                {EMAIL_ANGEHOERIGEN.adresse}
              </a>
            </div>
          )}
        </EditorialSection>

        {/* ── 7 Soforthilfe-Zeile ── nur Hairline + ein Satz */}
        <section
          className="mt-24 border-t pt-12"
          style={{ borderColor: "var(--rule-color)" }}
        >
          <p
            style={{
              fontSize: "var(--text-md)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--fg-secondary)",
            }}
          >
            In einer akuten Krise zählt der schnellste funktionierende Weg.{" "}
            <AppLink href="/soforthilfe" className="editorial-link">
              Notfallnummern öffnen
            </AppLink>
            .
          </p>
        </section>
      </EditorialLayout>
    </Layout>
  );
}
