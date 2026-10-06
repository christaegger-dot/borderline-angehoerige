import { claimById, claimSources } from "@/content/claimSources";

/** Sichtbare lokale Quellen mit Reichweite, getrennt von der offenen Fachprüfung. */
export default function ClaimEvidence({ claimIds }: { claimIds: string[] }) {
  const claims = claimIds.map(claimById);
  const needsLegalReview = claims.some(claim =>
    claim.domains.includes("swiss-legal")
  );
  return (
    <aside
      className="mt-4 border-t pt-3 text-sm leading-relaxed"
      style={{ borderColor: "var(--rule-color)", color: "var(--fg-secondary)" }}
      aria-label="Belege und Reichweite"
      data-claim-evidence
    >
      <p>
        Quellen und Reichweite. Die Zuordnung ist redaktionell;
        {needsLegalReview
          ? " fachliche und schweizerisch-rechtliche Prüfung sind ausstehend."
          : " eine fachliche Prüfung des aktuellen Wortlauts ist ausstehend."}
      </p>
      <ul className="mt-2 space-y-2">
        {claims.map(claim => (
          <li key={claim.id} data-claim-id={claim.id}>
            <span>
              {claim.evidenceStatus === "supported"
                ? "Quelle stützt die begrenzte Aussage. "
                : claim.evidenceStatus === "context"
                  ? "Kontextbeleg; die konkrete Übertragung ist nicht vollständig geprüft. "
                  : claim.evidenceStatus === "editorial"
                    ? "Redaktionelle Orientierung. "
                    : "Direkter Beleg offen. "}
            </span>
            {claim.sourceRefs.length === 0 ? (
              <span>{claim.limitation}</span>
            ) : (
              <>
                {claim.sourceRefs.map((reference, index) => {
                  const source = claimSources[reference.sourceId];
                  return (
                    <span key={reference.sourceId + reference.locator}>
                      {index > 0 && " · "}
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="editorial-link"
                        data-claim-source={reference.sourceId}
                      >
                        {source.label}, {reference.locator}
                      </a>
                      {` — ${reference.scope}`}
                      <span>{` Fassung: ${source.version}.`}</span>
                      {source.access === "carried-forward" && (
                        <span>
                          {" "}
                          Bisherige Zuordnung; heute kein neuer vollständiger
                          Textreview.
                        </span>
                      )}
                      {source.access === "blocked" && (
                        <span>
                          {" "}
                          Heutiger Abruf nicht lesbar; kein neuer Textabgleich.
                        </span>
                      )}
                    </span>
                  );
                })}
                <span>{` ${claim.limitation}`}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
