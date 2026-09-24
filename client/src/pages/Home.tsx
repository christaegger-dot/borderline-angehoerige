import {
  DisplayHeading,
  EditorialProse,
  EditorialSection,
} from "@/components/editorial";
import AppLink from "@/components/AppLink";
import Layout from "@/components/Layout";
import SEO, { MedicalPageSchema, WebsiteSchema } from "@/components/SEO";
import AngehoerigenBeratung from "@/components/AngehoerigenBeratung";

export default function Home() {
  return (
    <Layout>
      <SEO
        title="Startseite"
        description="Orientierung für Angehörige von Menschen mit Borderline: Hilfe in schwierigen Situationen, verständliches Wissen und Raum für das eigene Leben."
        path="/"
      />
      <WebsiteSchema />
      <MedicalPageSchema
        title="Borderline: Orientierung für Angehörige"
        description="Informationen und Unterstützung für Angehörige von Menschen mit Borderline."
        path="/"
      />
      <section className="home-puk" aria-labelledby="home-title">
        <div className="home-puk__inner">
          <div className="home-puk__intro">
            <p>Borderline · Orientierung für Angehörige</p>
            <h1 id="home-title">
              Verstehen. Unterstützung finden. Auf sich achten.
            </h1>
            <p>
              Wenn ein nahestehender Mensch mit Borderline lebt, kann vieles
              schwierig werden. Hier finden Sie Hilfe für den Alltag und Ihre
              eigene Entlastung.
            </p>
          </div>
          <nav className="home-puk__paths" aria-label="Welcher Einstieg passt?">
            <AppLink
              href="/soforthilfe"
              className="home-puk__path home-puk__path--crisis"
            >
              <strong>Akute Hilfe</strong>
              <span>
                Notruf und Krisenberatung – auch wenn Sie unsicher sind.
              </span>
            </AppLink>
            <AppLink href="/wegweiser" className="home-puk__path">
              <strong>Eine konkrete Situation</strong>
              <span>Den nächsten hilfreichen Schritt finden.</span>
            </AppLink>
            <AppLink href="/verstehen" className="home-puk__path">
              <strong>Borderline verstehen</strong>
              <span>Erleben, Behandlung und Angehörigenrollen einordnen.</span>
            </AppLink>
          </nav>
          <p className="home-puk__more">
            Noch unsicher, wo anfangen?{" "}
            <AppLink href="/selbsttest" className="editorial-link">
              Passende Inhalte finden
            </AppLink>
          </p>
        </div>
      </section>
      <section
        className="home-practical"
        aria-labelledby="home-practical-title"
      >
        <div className="home-practical__inner">
          <DisplayHeading level={2} id="home-practical-title">
            Hilfe für den Alltag
          </DisplayHeading>
          <div className="home-practical__links">
            <AppLink href="/kommunizieren">
              <strong>Worte für schwierige Gespräche</strong>
              <span>
                Gefühle anerkennen, Anliegen formulieren und Pausen ermöglichen.
              </span>
            </AppLink>
            <AppLink href="/grenzen#grenzen-arten">
              <strong>Die eigenen Grenzen klären</strong>
              <span>
                Beispiele für körperliche, emotionale, zeitliche und materielle
                Grenzen.
              </span>
            </AppLink>
            <AppLink href="/selbstfuersorge">
              <strong>Die eigene Gesundheit schützen</strong>
              <span>
                Ihre Bedürfnisse und Ihr Leben zählen – unabhängig davon, wie
                viel Sie unterstützen.
              </span>
            </AppLink>
          </div>
        </div>
      </section>
      <EditorialSection variant="cream" density="compact">
        <EditorialSection.Body>
          <AngehoerigenBeratung />
          <p className="mt-4">
            <AppLink href="/materialien/text/kinder" className="editorial-link">
              Wenn Kinder mitbetroffen sind: erklären, Betreuung planen und
              entlasten
            </AppLink>
          </p>
        </EditorialSection.Body>
      </EditorialSection>
      <EditorialSection variant="cream-deep" density="compact">
        <EditorialSection.Body>
          <DisplayHeading level={2}>
            Mitgefühl und Selbstschutz gehören zusammen
          </DisplayHeading>
          <EditorialProse>
            <p>
              Sie können Unterstützung anbieten und zugleich entscheiden, was
              für Sie tragbar ist. Grenzen, eigene Beratung und Kontaktpausen
              dürfen dazugehören. Sie sind nicht allein für die Genesung eines
              anderen Menschen verantwortlich.
            </p>
            <p>
              <AppLink href="/genesung#garten">
                Was Sie beitragen können – und was nicht in Ihrer Hand liegt
              </AppLink>
              {" · "}
              <AppLink href="/materialien">Alle Materialien</AppLink>
            </p>
          </EditorialProse>
        </EditorialSection.Body>
      </EditorialSection>
    </Layout>
  );
}
