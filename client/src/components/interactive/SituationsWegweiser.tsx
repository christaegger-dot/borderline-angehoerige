import AppLink from "@/components/AppLink";

export default function SituationsWegweiser() {
  return (
    <section className="space-y-4" aria-labelledby="wegweiser-hilfe">
      <h2
        id="wegweiser-hilfe"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-xl)",
          fontWeight: "var(--weight-display)",
          lineHeight: "var(--lh-snug)",
          color: "var(--fg-primary)",
        }}
      >
        Professionelle Hilfe bei akuter Gefahr oder Unsicherheit
      </h2>
      <p
        style={{
          fontSize: "var(--text-md)",
          lineHeight: "var(--lh-relaxed)",
          color: "var(--fg-secondary)",
        }}
      >
        Die Fachstelle Angehörigenarbeit bietet Beratung und Orientierung, aber
        keine Krisenintervention. Bei akuter Gefahr oder wenn Sie die
        Dringlichkeit nicht sicher einschätzen können, wenden Sie sich an den
        zuständigen Notfalldienst. Hinweise zu passenden Anlaufstellen finden
        Sie unter{" "}
        <AppLink href="/soforthilfe" className="editorial-link">
          «Akute Hilfe und Notfallkontakte»
        </AppLink>
        .
      </p>
    </section>
  );
}
