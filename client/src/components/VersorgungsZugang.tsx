import { EditorialProse } from "@/components/editorial";
import { Link } from "wouter";

export default function VersorgungsZugang() {
  return (
    <EditorialProse>
      <p>
        Wenn kein Therapieplatz verfügbar ist, kann die betroffene Person mit
        der Hausärzt:in oder einer bereits behandelnden Fachperson den nächsten
        Schritt besprechen. Angehörige dürfen bei der Organisation helfen, wenn
        das gewünscht und für sie tragbar ist.
      </p>
      <ol className="ml-6 list-decimal space-y-3">
        <li>
          <strong>Anmeldung klären:</strong> Nimmt die Stelle neue Patient:innen
          auf? Ist eine direkte Anmeldung möglich oder braucht es eine
          Überweisung beziehungsweise eine ärztliche Anordnung? Gibt es bei
          fehlender Kapazität eine passende Alternative?
        </li>
        <li>
          <strong>Kosten vor dem ersten Termin klären:</strong> Ärztliche und
          psychologische Psychotherapie sowie ambulante und stationäre
          Leistungen haben unterschiedliche Voraussetzungen. Fragen Sie Praxis
          und Krankenversicherung nach Anordnung oder Zuweisung,
          Kostenübernahme, einer allfälligen Kostengutsprache und eigener
          Kostenbeteiligung. Berücksichtigen Sie den vereinbarten Zugangsweg
          Ihres Versicherungsmodells. Für psychologische Psychotherapie zulasten
          der Grundversicherung ist eine ärztliche Anordnung nötig; nicht alle
          Ärzt:innen sind regulär anordnungsberechtigt. Klären Sie, wer sie
          ausstellen kann. Die Voraussetzungen erläutert das{" "}
          <a
            href="https://www.bag.admin.ch/de/neuregelung-der-psychologischen-psychotherapie-ab-1-juli-2022"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link"
          >
            Bundesamt für Gesundheit
          </a>
          .
        </li>
        <li>
          <strong>Wartezeit konkret besprechen:</strong> Gibt es eine Warteliste
          oder frei werdende Termine? Wer ist bis dahin ansprechbar, welche
          Zwischenhilfe ist möglich und wann findet der nächste Kontakt statt?
          Eine Warteliste ersetzt keine laufende Versorgung.
        </li>
        <li>
          <strong>Bei Verschlechterung neu beurteilen lassen:</strong> Melden
          Sie veränderte Beschwerden der zuständigen Fachperson und fragen Sie
          nach einem früheren Termin oder einer anderen Hilfe. Bei akuter Gefahr
          oder unklarer Dringlichkeit warten Sie nicht auf einen Therapieplatz:
          Nutzen Sie den zuständigen Notfalldienst. Die Wege finden Sie unter{" "}
          <a href="/soforthilfe" className="editorial-link">
            Akute Hilfe und Notfallkontakte
          </a>
          .
        </li>
      </ol>
      <p>
        <strong>In anderen Kantonen:</strong> Fragen Sie die Hausärzt:in oder
        den psychiatrischen Dienst Ihres Wohnkantons nach Anmeldung,
        Zuständigkeit und Zwischenversorgung. Die hier genannten Zürcher
        Angebote sind keine schweizweite Zuständigkeitsliste.
      </p>
      <p>
        <strong>Eigene Unterstützung:</strong> Angehörigenberatung kann
        unabhängig von einer Diagnose oder einem Therapieplatz genutzt werden.
        Auf der Seite{" "}
        <Link href="/beratung" className="editorial-link">
          Beratung und Unterstützung
        </Link>{" "}
        finden Sie passende Wege. Regionale Selbsthilfezentren vermittelt{" "}
        <a
          href="https://www.selbsthilfeschweiz.ch"
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-link"
        >
          Selbsthilfe Schweiz
        </a>
        . Beratung und Selbsthilfe ersetzen keine notwendige Behandlung.
      </p>
    </EditorialProse>
  );
}
