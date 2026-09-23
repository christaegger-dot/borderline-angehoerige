import { Link } from "wouter";

export default function KinderEntlasten() {
  return (
    <aside
      className="my-8 border-t border-[color:var(--rule-color)] pt-6"
      aria-label="Kinder als Angehörige entlasten"
    >
      <h3 className="editorial-card-heading">Wenn Kinder mitbetroffen sind</h3>
      <p className="mt-3 text-base leading-relaxed">
        Erwachsene organisieren Hilfe und Betreuung. Kinder müssen weder Streit
        schlichten noch Medikamente kontrollieren oder einen Elternteil
        bewachen. Vereinbaren Sie, welche vertraute erwachsene Person das Kind
        betreut, wohin es gehen kann und wer erreichbar ist, wenn die erste
        Person ausfällt.
      </p>
      <p className="mt-3 text-base leading-relaxed">
        Besprechen Sie den Plan in einfachen Worten mit dem Kind. Es darf Fragen
        stellen, Gefühle zeigen und seinen Alltag mit Schule, Spiel und Freunden
        behalten. Bei akuter Gefahr holen Erwachsene sofort Hilfe.
      </p>
      <Link
        className="editorial-link mt-4 inline-block text-base"
        href="/materialien/text/kinder"
      >
        Erklärung und Betreuungsplan für Kinder
      </Link>
    </aside>
  );
}
