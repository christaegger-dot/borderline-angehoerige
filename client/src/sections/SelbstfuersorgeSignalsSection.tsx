import ContentSection from "@/components/ContentSection";
import { warningSignalGroups } from "@/content/selbstfuersorge-page";

export function SelbstfuersorgeSignalsSection() {
  const titleStyle = {
    fontSize: "var(--text-md)",
    fontWeight: 600,
    color: "var(--fg-primary)",
  };

  const bodyStyle = {
    fontSize: "var(--text-sm)",
    lineHeight: "var(--lh-relaxed)",
    color: "var(--fg-secondary)",
  };

  return (
    <ContentSection
      variant="editorial"
      title="Warnsignale für Überlastung"
      id="warnsignale"
      preview="Achten Sie auf diese Anzeichen – sie zeigen, dass Sie dringend mehr Selbstfürsorge brauchen."
    >
      <p className="mb-6" style={bodyStyle}>
        Achten Sie auf diese Anzeichen – sie zeigen, dass Sie dringend mehr
        Selbstfürsorge brauchen:
      </p>

      <div className="grid gap-8 sm:grid-cols-3">
        {warningSignalGroups.map(group => {
          return (
            <article
              key={group.title}
              className="border-t pt-4"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <h3 style={titleStyle}>{group.title}</h3>
              <ul className="mt-3 space-y-2 pl-5 list-disc marker:text-[color:var(--accent-label)]">
                {group.items.map(item => (
                  <li key={item} style={bodyStyle}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <div
        className="mt-8 border-t pt-5"
        style={{ borderColor: "var(--rule-color)" }}
      >
        <p style={bodyStyle}>
          <strong style={{ color: "var(--fg-primary)" }}>
            Wenn Sie mehrere dieser Warnsignale bei sich bemerken, ist es Zeit
            zu handeln.
          </strong>{" "}
          Sprechen Sie mit Ihrem Hausarzt oder suchen Sie professionelle
          Unterstützung.
        </p>
      </div>
    </ContentSection>
  );
}
