import ContentSection from "@/components/ContentSection";
import {
  DisplayHeading,
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import ReviewBadge from "@/components/ReviewBadge";
import SEO from "@/components/SEO";
import { pageGovernance } from "@/data/pageGovernance";

export default function Datenschutz() {
  const lastReviewed = pageGovernance["/datenschutz"]?.lastReviewed;

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

      <EditorialLayout width="wide">
        <header className="secondary-page-header">
          <EyebrowLabel spacing="compact">Datenschutz</EyebrowLabel>
          <DisplayHeading level={1} size="utility">
            Wie diese Website mit Daten umgeht
          </DisplayHeading>
          <Lede className="mt-6">
            Der Schutz Ihrer Privatsphäre ist uns wichtig. Diese Erklärung
            beschreibt, welche Daten technisch anfallen, welche lokal im Browser
            bleiben und welche Rechte Sie haben.
          </Lede>
          <div className="mt-6">
            <ReviewBadge path="/datenschutz" />
          </div>
        </header>

        <ContentSection
          variant="editorial"
          title="Rechtsgrundlage"
          id="rechtsgrundlage"
          defaultOpen={true}
          preview="Schweizer DSG; die ergänzende Anwendbarkeit der DSGVO richtet sich nach ihrem räumlichen Geltungsbereich."
        >
          <EditorialProse>
            <p>
              Diese Website unterliegt dem{" "}
              <strong>Bundesgesetz über den Datenschutz (DSG, SR 235.1)</strong>{" "}
              der Schweiz in der revidierten Fassung vom 1. September 2023. Je
              nach räumlichem Anwendungsbereich kann ergänzend die{" "}
              <strong>
                EU-Datenschutz-Grundverordnung (DSGVO/GDPR, Verordnung (EU)
                2016/679)
              </strong>{" "}
              anwendbar sein.
            </p>
            <p>
              Technische Daten werden bearbeitet, soweit dies für die
              Bereitstellung, Absicherung und Fehleranalyse der Website
              erforderlich ist. Die formelle Einordnung der Rechtsgrundlagen und
              Verantwortlichkeiten wird noch bestätigt.
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
              notwendige Daten an Netlify übertragen. Nach Angaben von Netlify
              können dazu insbesondere IP-Adresse, Gerätetyp, Betriebssystem
              sowie Browsertyp und -version gehören. Daten können ausserhalb der
              Schweiz bearbeitet werden. Netlify nennt dafür unter anderem
              Standardvertragsklauseln und das Swiss-U.S. Data Privacy
              Framework. Weitere Angaben enthält die{" "}
              <a
                href="https://www.netlify.com/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link"
              >
                Datenschutzerklärung von Netlify
              </a>
              .
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
              Datenschutzanfragen können Sie derzeit an die im Impressum
              genannte Kontaktperson richten. Die formelle datenschutzrechtliche
              Verantwortlichkeit der Fachstelle beziehungsweise der PUK wird
              noch bestätigt.
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

          <ul className="secondary-page-list secondary-page-list--bulleted">
            <li className="secondary-page-body">
              Browsertyp und Browserversion
            </li>
            <li className="secondary-page-body">verwendetes Betriebssystem</li>
            <li className="secondary-page-body">Referrer URL</li>
            <li className="secondary-page-body">
              Hostname des zugreifenden Rechners
            </li>
            <li className="secondary-page-body">Uhrzeit der Serveranfrage</li>
            <li className="secondary-page-body">IP-Adresse</li>
          </ul>

          <p className="secondary-page-body mt-6">
            Diese technischen Daten dienen der Bereitstellung, Absicherung und
            Fehleranalyse des Angebots. Die konkrete Aufbewahrungsdauer der
            Hosting-Protokolle und die datenschutzrechtliche Rollenverteilung
            werden derzeit mit der verantwortlichen Stelle geprüft.
          </p>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Frühere persönliche Notfallkarte und lokale Daten"
          id="notfallkarte-lokal"
          preview="Das persönliche Werkzeug wird derzeit nicht angeboten; ältere Einträge können noch lokal im Browser liegen."
        >
          <EditorialProse>
            <p>
              Das persönliche Notfallkarten-Werkzeug wird auf dieser Website
              derzeit nicht angeboten. Falls Sie es früher genutzt haben, können
              dabei gespeicherte Einträge noch lokal im Browser auf diesem Gerät
              liegen.
            </p>
            <p>
              Diese Website bietet für ältere Einträge keine Löschfunktion mehr
              an. Sie können gespeicherte Website-Daten in den Einstellungen
              Ihres Browsers entfernen. Die früheren Einträge wurden lokal
              gespeichert und nicht an Server dieser Website übertragen.
            </p>
          </EditorialProse>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Cookies"
          id="cookies"
          preview="Die Website setzt selbst keine Tracking- oder Werbe-Cookies."
        >
          <EditorialProse>
            <p>
              Die Website setzt nach aktuellem technischem Stand selbst{" "}
              <strong>keine Tracking- oder Werbe-Cookies</strong>. Beim
              geprüften Seitenaufruf wurde auch kein Cookie durch den
              Hosting-Dienst gesetzt.
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
              persönlichen Eingaben an uns übertragen. Die Materialien werden
              über die Website und ihren Hosting-Anbieter bereitgestellt.
            </p>
          </EditorialProse>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Ihre Rechte"
          id="rechte"
          preview="Datenschutzrechte richten sich nach dem anwendbaren Recht und den jeweiligen gesetzlichen Voraussetzungen."
        >
          <EditorialProse>
            <p>
              Je nach anwendbarem Recht und unter den jeweiligen gesetzlichen
              Voraussetzungen kommen insbesondere folgende Rechte in Betracht:
            </p>
          </EditorialProse>

          <ul className="secondary-page-list">
            <li>
              <p className="secondary-page-body">
                <strong>Auskunftsrecht:</strong> Sie können Auskunft über
                gespeicherte personenbezogene Daten verlangen.
              </p>
            </li>
            <li>
              <p className="secondary-page-body">
                <strong>Berichtigungsrecht:</strong> Sie können die Berichtigung
                unrichtiger Daten verlangen.
              </p>
            </li>
            <li>
              <p className="secondary-page-body">
                <strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer
                Daten verlangen.
              </p>
            </li>
            <li>
              <p className="secondary-page-body">
                <strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung
                Ihrer Daten widersprechen.
              </p>
            </li>
          </ul>

          <p className="secondary-page-body mt-6">
            Auf unseren Servern speichern wir keine persönlichen Inhalte aus dem
            früheren Notfallkarten-Werkzeug. Ältere Einträge können noch lokal
            auf Ihrem Gerät liegen; entfernen können Sie diese in den
            Einstellungen Ihres Browsers.
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
          <p className="secondary-page-body">
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
              href: "/soforthilfe",
              title: "Akute Hilfe und Notfallkontakte",
              description:
                "Die zentrale Seite mit Anlaufstellen für akute Situationen.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
