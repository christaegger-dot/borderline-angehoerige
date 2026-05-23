import ContentSection from "@/components/ContentSection";
import { warningSignalGroups } from "@/content/selbstfuersorge-page";

interface SelbstfuersorgeSignalsSectionProps {
  defaultOpen?: boolean;
}

export function SelbstfuersorgeSignalsSection({
  defaultOpen = false,
}: SelbstfuersorgeSignalsSectionProps) {
  return (
    <ContentSection
      variant="editorial"
      title="Warnsignale für Überlastung"
      id="warnsignale"
      defaultOpen={defaultOpen}
      preview="Achten Sie auf diese Anzeichen – sie zeigen, dass Sie dringend mehr Selbstfürsorge brauchen."
    >
      <p className="editorial-small-copy mb-6">
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
              <h3 className="editorial-item-heading">{group.title}</h3>
              <ul className="mt-3 space-y-2 pl-5 list-disc marker:text-[color:var(--accent-label)]">
                {group.items.map(item => (
                  <li key={item} className="editorial-small-copy">
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
        <p className="editorial-small-copy">
          <strong className="editorial-strong">
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
