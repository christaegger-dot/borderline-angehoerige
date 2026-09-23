import { kontaktByIdStrict } from "@/data/kontakte";
import { Link } from "wouter";

const kontakt = kontaktByIdStrict("INFO_FACHSTELLE");

export default function AngehoerigenBeratung() {
  return (
    <aside
      className="my-8 border-l-2 border-[color:var(--accent-primary)] bg-[color:var(--bg-sage-wash)] p-5"
      aria-label="Beratung für Angehörige"
    >
      <h3 className="editorial-card-heading">Beratung für Sie</h3>
      <p className="mt-3 text-base leading-relaxed">
        Sie dürfen sich auch mit Erschöpfung, Schuldgefühlen oder schwierigen
        Entscheidungen melden. Die Fachstelle Angehörigenarbeit berät kostenlos
        und vertraulich – ohne Vollmacht und auch dann, wenn die erkrankte
        Person nicht in der PUK behandelt wird. Gespräche sind telefonisch oder
        vor Ort nach Vereinbarung möglich.
      </p>
      <p className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-base">
        <a className="editorial-link" href={`tel:${kontakt.tel}`}>
          {kontakt.nummer}
        </a>
        <Link className="editorial-link" href="/fachstelle">
          Kontakt und Terminvereinbarung
        </Link>
      </p>
      <p className="mt-3 text-sm leading-relaxed">
        Die Fachstelle ist kein Krisendienst. Bei akuter Gefahr oder
        Unsicherheit:{" "}
        <Link className="editorial-link" href="/soforthilfe">
          Soforthilfe
        </Link>
        .
      </p>
    </aside>
  );
}
