import ContentSection from "@/components/ContentSection";
import {
  DisplayHeading,
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
  EyebrowLabel,
} from "@/components/editorial";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import ReviewBadge from "@/components/ReviewBadge";
import SEO from "@/components/SEO";
import { pageGovernance } from "@/data/pageGovernance";
import { PERSONAL_NOTFALLKARTE_PATH } from "@/domain/notfallkarte";

export default function Datenschutz() {
  const lastReviewed = pageGovernance["/datenschutz"]?.lastReviewed;

  const bodyStyle = {
    fontSize: "var(--text-sm)",
    lineHeight: "var(--lh-relaxed)",
    color: "var(--fg-secondary)",
  };

  const formattedReviewDate = lastReviewed
    ? lastReviewed.split("-").reverse().join(".")
    : null;

  return (
    <Layout>
      <SEO
        title="Datenschutz"
        description="Datenschutzerklärung: Wie diese Website mit Daten umgeht, welche Cookies gesetzt werden und welche Rechte Sie haben."
        path="/datenschutz"
      />

      <EditorialLayout width="narrow">
        <header className="pb-12 pt-12 md:pb-16 md:pt-16">
          <EyebrowLabel spacing="compact">Datenschutz</EyebrowLabel>
          <DisplayHeading level={1} size="page">
            Wie diese Website mit <em>Daten</em> umgeht
          </DisplayHeading>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Der Schutz Ihrer Privatsphäre ist uns wichtig. Diese Erklärung
            beschreibt, welche Daten technisch anfallen, welche lokal im Browser
            bleiben und welche Rechte Sie haben.
          </p>
          <div className="mt-6">
            <ReviewBadge path="/datenschutz" />
          </div>
        </header>

        <ContentSection
          variant="editorial"
          title="Rechtsgrundlage"
          id="rechtsgrundlage"
          defaultOpen={true}
          preview="Schweizer DSG, ergänzend DSGVO für Nutzer:innen aus dem EWR."
        >
          <EditorialProse>
            <p>
              Diese Website unterliegt dem{" "}
              <strong>Bundesgesetz über den Datenschutz (DSG, SR 235.1)</strong>{" "}
              der Schweiz in der revidierten Fassung vom 1. September 2023.
              Soweit die Website auch von Personen aus dem Europäischen
              Wirtschaftsraum genutzt wird, gilt ergänzend die{" "}
              <strong>
                EU-Datenschutz-Grundverordnung (DSGVO/GDPR, Verordnung (EU)
                2016/679)
              </strong>
              .
            </p>
            <p>
              Die Verarbeitung technischer Daten erfolgt auf Grundlage
              berechtigter Interessen zur Bereitstellung und Sicherung dieser
              Website.
            </p>
          </EditorialProse>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Hosting und Drittanbieter"
          id="hosting"
          preview="Hosting über Netlify; keine zusätzlichen Tracking- oder Werbedienste."
        >
          <EditorialProse>
            <p>
              Diese Website wird über <strong>Netlify, Inc.</strong> (San
              Francisco, USA) gehostet. Beim Aufruf der Website werden technisch
              notwendige Daten an Server von Netlify übertragen. Die
              Datenverarbeitung erfolgt auf Grundlage von
              Standardvertragsklauseln.
            </p>
            <p>
              Darüber hinaus werden{" "}
              <strong>keine weiteren Drittanbieter-Dienste</strong> eingesetzt:
              kein Analytics, kein externes Schrift-CDN, keine eingebetteten
              Social-Media-Plugins und keine Werbedienste.
            </p>
          </EditorialProse>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Unser Grundsatz"
          id="grundsatz"
          defaultOpen={true}
          preview="So wenige personenbezogene Daten wie möglich; kein Tracking, keine Werbung."
        >
          <EditorialProse>
            <p>
              Diese Website wurde mit dem Ziel entwickelt, möglichst wenige
              personenbezogene Daten zu erheben. Wir verzichten bewusst auf
              Tracking-Tools, Werbung und Social-Media-Plugins.
            </p>
            <p>
              Verantwortliche Stelle ist <strong>Christa Egger</strong>,
              Angehörigenberaterin. Bei Fragen zum Datenschutz können Sie sich
              an die im Impressum genannte verantwortliche Person wenden.
            </p>
          </EditorialProse>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Erhebung und Verarbeitung von Daten"
          id="datenerhebung"
          preview="Technisch notwendige Server-Logfiles ohne Zusammenführung mit anderen Datenquellen."
        >
          <EditorialProse>
            <p>
              Beim Zugriff auf diese Website werden automatisch Informationen in
              sogenannten Server-Logfiles gespeichert, die Ihr Browser technisch
              übermittelt.
            </p>
          </EditorialProse>

          <ul className="mt-6 space-y-3 pl-5 marker:text-[color:var(--accent-label)]">
            <li style={bodyStyle}>Browsertyp und Browserversion</li>
            <li style={bodyStyle}>verwendetes Betriebssystem</li>
            <li style={bodyStyle}>Referrer URL</li>
            <li style={bodyStyle}>Hostname des zugreifenden Rechners</li>
            <li style={bodyStyle}>Uhrzeit der Serveranfrage</li>
            <li style={bodyStyle}>IP-Adresse in anonymisierter Form</li>
          </ul>

          <p className="mt-6" style={bodyStyle}>
            Diese Daten werden ausschliesslich zur Gewährleistung eines
            störungsfreien Betriebs und zur technischen Verbesserung des
            Angebots ausgewertet. Eine Zusammenführung mit anderen Datenquellen
            findet nicht statt.
          </p>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Persönliche Notfallkarte und lokale Speicherung"
          id="notfallkarte-lokal"
          preview="Persönliche Einträge bleiben lokal im Browser und werden nicht an Server dieser Website übertragen."
        >
          <EditorialProse>
            <p>
              Die persönliche Notfallkarte kann personenbezogene Angaben
              enthalten, zum Beispiel Namen, Telefonnummern, Beziehungen,
              Beruhigungsstrategien oder freie Notizen.
            </p>
            <p>
              Diese Angaben werden{" "}
              <strong>lokal im Browser auf Ihrem Gerät</strong> gespeichert,
              damit die Notfallkarte zwischen Ihren Besuchen erhalten bleibt.
              Die Daten werden dabei{" "}
              <strong>nicht an einen Server dieser Website übertragen</strong>.
            </p>
            <p>
              Auf gemeinsam genutzten Geräten können andere Personen diese
              Einträge sehen, wenn sie denselben Browser verwenden. Wenn die
              Angaben nicht auf dem Gerät bleiben sollen, können Sie sie in der
              Notfallkarte über <strong>«Daten löschen»</strong> entfernen.
            </p>
            <p>
              Für die Druckansicht wird zusätzlich kurzfristig lokaler
              Browser-Speicher verwendet. Auch diese Daten werden nicht an
              unsere Server übertragen.
            </p>
          </EditorialProse>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Cookies"
          id="cookies"
          preview="Nur technisch notwendige Cookies; Notfallkarten-Einträge liegen im localStorage, nicht im Cookie."
        >
          <EditorialProse>
            <p>
              Diese Website verwendet ausschliesslich technisch notwendige
              Cookies, die für den Betrieb erforderlich sind. Es werden{" "}
              <strong>keine Tracking-Cookies</strong> oder Cookies zu
              Werbezwecken eingesetzt.
            </p>
            <p>
              Die persönliche Notfallkarte verwendet für ihre Einträge{" "}
              <strong>kein Cookie</strong>, sondern lokalen Browser-Speicher
              (`localStorage`). Dieser unterscheidet sich von Cookies und wird
              nur auf Ihrem Gerät abgelegt.
            </p>
            <p>
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen
              von Cookies informiert werden und Cookies nur im Einzelfall
              erlauben. Bei der Deaktivierung von Cookies kann die
              Funktionalität dieser Website eingeschränkt sein.
            </p>
          </EditorialProse>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Analyse- und Tracking-Tools"
          id="tracking"
          preview="Keine Analyse- oder Tracking-Tools, keine Social-Media-Plugins."
        >
          <EditorialProse>
            <p>
              Diese Website verwendet{" "}
              <strong>keine Analyse- oder Tracking-Tools</strong> wie Google
              Analytics, Facebook Pixel oder ähnliche Dienste. Wir erfassen
              keine Nutzungsprofile und geben keine Daten an Dritte weiter.
            </p>
            <p>
              Es werden auch <strong>keine Social-Media-Plugins</strong>{" "}
              eingebunden, die Daten an soziale Netzwerke übertragen könnten.
            </p>
          </EditorialProse>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Externe Links"
          id="externe-links"
          preview="Für externe Websites gelten deren eigene Datenschutzerklärungen."
        >
          <EditorialProse>
            <p>
              Diese Website enthält Links zu externen Websites Dritter, zum
              Beispiel Notfallressourcen oder Selbsthilfeangeboten. Auf deren
              Inhalte haben wir keinen Einfluss. Bitte beachten Sie die
              Datenschutzerklärungen der jeweiligen externen Anbieter.
            </p>
          </EditorialProse>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Downloads und Materialien"
          id="downloads"
          preview="Beim Download werden keine zusätzlichen personenbezogenen Inhalte aus Formularen übertragen."
        >
          <EditorialProse>
            <p>
              Die auf dieser Website angebotenen Infografiken und Handouts
              können heruntergeladen werden. Beim Download werden keine
              persönlichen Inhalte aus der Notfallkarte oder anderen lokalen
              Eingaben an uns übertragen. Die Materialien werden über die
              Website und ihren Hosting-Anbieter bereitgestellt.
            </p>
          </EditorialProse>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Ihre Rechte"
          id="rechte"
          preview="Auskunft, Berichtigung, Löschung und Widerspruch nach DSG und DSGVO."
        >
          <EditorialProse>
            <p>
              Gemäss dem schweizerischen Datenschutzgesetz und der
              EU-Datenschutz-Grundverordnung haben Sie insbesondere folgende
              Rechte:
            </p>
          </EditorialProse>

          <ul className="mt-6 space-y-4">
            <li>
              <p style={bodyStyle}>
                <strong>Auskunftsrecht:</strong> Sie können Auskunft über
                gespeicherte personenbezogene Daten verlangen.
              </p>
            </li>
            <li>
              <p style={bodyStyle}>
                <strong>Berichtigungsrecht:</strong> Sie können die Berichtigung
                unrichtiger Daten verlangen.
              </p>
            </li>
            <li>
              <p style={bodyStyle}>
                <strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer
                Daten verlangen.
              </p>
            </li>
            <li>
              <p style={bodyStyle}>
                <strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung
                Ihrer Daten widersprechen.
              </p>
            </li>
          </ul>

          <p className="mt-6" style={bodyStyle}>
            Auf unseren Servern speichern wir grundsätzlich keine persönlichen
            Inhalte aus der Notfallkarte. Falls Sie die persönliche Notfallkarte
            verwenden, können solche Angaben lokal auf Ihrem Gerät gespeichert
            sein. Diese Einträge können Sie direkt über{" "}
            <strong>«Daten löschen»</strong> entfernen.
          </p>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Änderungen dieser Datenschutzerklärung"
          id="aenderungen"
          preview="Anpassungen bei geänderten rechtlichen Anforderungen oder technischen Änderungen."
        >
          <EditorialProse>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit
              sie stets den aktuellen rechtlichen Anforderungen entspricht oder
              um Änderungen unserer Leistungen abzubilden. Für Ihren erneuten
              Besuch gilt dann die jeweils aktuelle Fassung.
            </p>
          </EditorialProse>
        </ContentSection>

        <EditorialSectionBlock label="Stand" title="Aktualität" rule>
          <p style={bodyStyle}>
            Stand der Erklärung: {formattedReviewDate ?? "nicht angegeben"}
          </p>
        </EditorialSectionBlock>

        <RelatedLinksEditorial
          links={[
            {
              href: "/impressum",
              title: "Impressum",
              description: "Verantwortung, Kontakt und rechtliche Hinweise.",
            },
            {
              href: "/barrierefreiheit",
              title: "Barrierefreiheit",
              description: "Wie die Website zugänglich gestaltet wird.",
            },
            {
              href: PERSONAL_NOTFALLKARTE_PATH,
              title: "Persönliche Notfallkarte",
              description:
                "Wie lokale Speicherung und Löschfunktion praktisch funktionieren.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
