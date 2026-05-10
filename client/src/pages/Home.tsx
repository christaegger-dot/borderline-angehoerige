import {
  EditorialColorBlock,
  EditorialFootnotes,
  EditorialHero,
  EditorialLayout,
  EditorialOrnament,
  EditorialProse,
  EditorialPullQuote,
  EditorialSection,
  EyebrowLabel,
  TestimonialMark,
} from "@/components/editorial";
import { HeroLeuchtturmIllustration } from "@/components/illustrations";
import { VisualOrientationGrid } from "@/components/visualizations/VisualOrientationGrid";
import AppLink from "@/components/AppLink";
import Layout from "@/components/Layout";
import SEO, { MedicalPageSchema, WebsiteSchema } from "@/components/SEO";
import { ADRESSEN, EMAILS, INFO } from "@/data/kontakte";

// Single-source-of-truth: keine Telefon-/E-Mail-/Adress-Hardcoding im Markup
const FACHSTELLE = INFO.find(k => k.id === "INFO_FACHSTELLE");
const EMAIL_ANGEHOERIGEN = EMAILS.find(e => e.id === "EMAIL_ANGEHOERIGEN");
const ADRESSE_PUK = ADRESSEN.find(a => a.id === "ADRESSE_PUK");

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

      {/* ── 2 Anerkennung ── */}
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
            Zwischen zwei Polen
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel>Anerkennung</EyebrowLabel>
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
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 3 Kerngedanke ── vollflächige Aubergine-Sektion */}
      <EditorialSection variant="aubergine">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "#d6c8be",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Aus der DBT-Tradition
          </span>
          <span
            className="mt-2 block text-[12px] italic"
            style={{
              color: "rgba(245, 236, 230, 0.65)",
              lineHeight: 1.4,
            }}
          >
            Linehan 1993
          </span>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel tone="light">Grundgedanke</EyebrowLabel>
          <h2
            className="font-display"
            style={{
              fontSize: "var(--text-2xl)",
              lineHeight: "var(--lh-snug)",
              color: "#f5ece6",
              fontWeight: "var(--weight-display)",
              letterSpacing: "var(--tracking-tight)",
              marginBottom: "var(--space-5)",
            }}
          >
            Mitgefühl und Selbstschutz sind kein Widerspruch.
          </h2>
          <EditorialProse dropCap>
            <p>
              Viele Angehörige, die zu uns kommen, tragen eine leise Überzeugung
              mit sich: dass ihr Wunsch nach Abstand der Beweis sei, nicht genug
              zu lieben. Dass Grenzen kalt seien. Dass eine Pause Verrat ist.
            </p>
            <p>
              Diese Überzeugung ist verständlich, aber sie hält Beziehungen
              nicht zusammen – sie zermürbt sie. Wer dauerhaft in Anspannung
              lebt, verliert irgendwann die Fähigkeit, präsent zu sein, auch
              dort, wo Präsenz wirklich gebraucht wird. Erschöpfte Angehörige
              helfen weniger, nicht mehr. Sie reagieren härter, schweigen
              länger, ziehen sich tiefer zurück.
            </p>
            <p>
              Selbstschutz ist deshalb keine Gegenkraft zur Beziehung, sondern
              ihre Voraussetzung. Eine ruhig gesetzte Grenze, eine geschützte
              Pause, ein klarer Satz darüber, was Sie nicht mehr aushalten – das
              ist nicht Egoismus. Es ist die Bedingung dafür, dass Sie morgen
              noch da sein können.
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
              sein. Diese Sätze schliessen sich nicht aus, auch wenn sie sich
              oft so anfühlen.
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
        </EditorialSection.Body>
        <EditorialSection.Aside>
          <blockquote
            className="font-display italic"
            style={{
              fontSize: "1.75rem",
              lineHeight: 1.25,
              color: "#f5ece6",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                color: "rgba(245, 236, 230, 0.32)",
                marginRight: "0.05em",
              }}
            >
              «
            </span>
            Selbstschutz ist deshalb keine Gegenkraft zur Beziehung, sondern
            ihre Voraussetzung.
            <span
              aria-hidden="true"
              style={{
                color: "rgba(245, 236, 230, 0.32)",
                marginLeft: "0.05em",
              }}
            >
              »
            </span>
          </blockquote>
          <EditorialOrnament
            variant="small-arc"
            color="rgba(245, 236, 230, 0.45)"
            className="mt-6"
          />
        </EditorialSection.Aside>
      </EditorialSection>

      {/* ── 4 Visuelle Orientierung ── 8 Infografik-Tiles als narrativer Lese-Pfad */}
      <VisualOrientationGrid />

      {/* ── 5 Stimme ── vollflächige Sage-Wash-Sektion mit Testimonial-Mark
           Wegweiser-Sektion (1 Absatz mit Inline-Links zu Verstehen/Kommunizieren/
           Grenzen/Selbstfürsorge/Soforthilfe) wurde entfernt — die acht
           VisualOrientationGrid-Tiles direkt darüber bieten dieselbe
           Themen-Navigation visuell und ohnehin ausführlicher. */}
      <EditorialColorBlock variant="sage-wash" maxWidth="45rem">
        <div className="text-center">
          <TestimonialMark className="mx-auto" />
          <EyebrowLabel className="mt-8" spacing="compact">
            Aus der Angehörigenarbeit
          </EyebrowLabel>
          <div className="mt-6">
            <EditorialPullQuote
              variant="testimonial"
              cite="Eine redaktionell verdichtete Erfahrung aus der Angehörigenarbeit. Keine Einzelperson."
            >
              Ich habe alles versucht – und trotzdem nicht gewusst, was ich
              falsch mache. Was mir schliesslich geholfen hat, war zu verstehen,
              dass die Dynamik nicht an mir lag. Und dass Grenzen setzen keine
              Kälte ist, sondern Schutz für beide Seiten.
            </EditorialPullQuote>
          </div>
        </div>
      </EditorialColorBlock>

      {/* ── 7 Beratungseinladung ── Fachstelle-CTA mit Kontakt-Karte */}
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
            Fachstelle
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <h2
            className="font-display"
            style={{
              fontSize: "var(--text-2xl)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-primary)",
              fontWeight: "var(--weight-display)",
              letterSpacing: "var(--tracking-tight)",
              marginBottom: "var(--space-5)",
            }}
          >
            Sie müssen nicht wissen, was Sie sagen wollen.
          </h2>
          <EditorialProse>
            <p>
              Die Fachstelle Angehörigenarbeit berät auch Sie – nicht nur die
              betroffene Person. Orientierung, Gespräch und Materialien für
              Partnerinnen, Eltern, Geschwister und erwachsene Kinder.
            </p>
          </EditorialProse>
        </EditorialSection.Body>
        {FACHSTELLE && EMAIL_ANGEHOERIGEN && ADRESSE_PUK && (
          <EditorialSection.Aside>
            <div
              className="border p-6"
              style={{
                borderColor: "var(--rule-color-strong)",
                borderRadius: "0.25rem",
                background: "var(--bg-primary)",
              }}
            >
              <p
                className="text-[11px] font-medium uppercase"
                style={{
                  color: "var(--accent-label)",
                  letterSpacing: "var(--tracking-caps)",
                  marginBottom: "var(--space-3)",
                }}
              >
                Kontakt
              </p>
              <p
                className="font-display"
                style={{
                  fontSize: "var(--text-md)",
                  color: "var(--fg-primary)",
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                {FACHSTELLE.label}
              </p>
              <p
                className="mt-1"
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--fg-secondary)",
                  lineHeight: 1.5,
                }}
              >
                {ADRESSE_PUK.adresse}
              </p>
              <ul
                className="mt-4 space-y-2"
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--fg-secondary)",
                }}
              >
                <li>
                  <a href={`tel:${FACHSTELLE.tel}`} className="editorial-link">
                    {FACHSTELLE.nummer}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL_ANGEHOERIGEN.adresse}`}
                    className="editorial-link break-all"
                  >
                    {EMAIL_ANGEHOERIGEN.adresse}
                  </a>
                </li>
              </ul>
              {/* TODO: Öffnungszeiten ergänzen, sobald verfügbar; Foto optional. */}
            </div>
          </EditorialSection.Aside>
        )}
      </EditorialSection>

      {/* ── 8 Soforthilfe-Zeile ── nur Hairline + ein Satz */}
      <EditorialLayout width="narrow">
        <section
          className="border-t pt-12"
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
