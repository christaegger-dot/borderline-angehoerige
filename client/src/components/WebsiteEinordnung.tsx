import { CURRENT_PUBLICATION_STATUS } from "@/data/pageGovernance";

export default function WebsiteEinordnung() {
  return (
    <>
      <p>
        Erstellt von Christa Egger innerhalb der Fachstelle Angehörigenarbeit
        der PUK Zürich. Eine namentlich verantwortete fachliche und
        institutionelle Freigabe für den aktuellen Stand ist noch offen.
      </p>
      <p>
        Die Website ist ein eigenständig gestaltetes Informationsangebot und
        kein offizieller Kommunikationskanal der PUK Zürich.
      </p>
      <p>
        Textaktualisierung, Kontaktabgleich und fachliche Prüfung werden
        getrennt ausgewiesen. Aktuelle redaktionelle Änderungen und frühere
        Prüfangaben ersetzen keine fachliche oder institutionelle Freigabe.{" "}
        {CURRENT_PUBLICATION_STATUS.notice}
      </p>
    </>
  );
}
