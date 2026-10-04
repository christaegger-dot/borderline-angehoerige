const diagnoses = [
  { x: 195, y: 330, lines: ["Depression"] },
  { x: 410, y: 330, lines: ["Angst-", "störungen"] },
  { x: 625, y: 330, lines: ["PTBS"] },
  { x: 195, y: 535, lines: ["Substanz-", "gebrauchsstörung"] },
  { x: 410, y: 535, lines: ["Essstörungen"] },
  { x: 625, y: 535, lines: ["ADHS"] },
] as const;

/* Inline statt <img>, damit Schrift und Design-Tokens sauber vererbt werden.
   Die sechs Einträge sind bewusst gleich gross und unverbunden: Die Darstellung
   zeigt weder diagnostische Hierarchie noch Ursache oder Wahrscheinlichkeit. */
export function BegleiterkrankungenSvg() {
  return (
    <svg
      className="ig-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 820 1045"
      width="820"
      height="1045"
      role="img"
      aria-labelledby="a2t a2d"
    >
      <title id="a2t">Mögliche Begleiterkrankungen bei Borderline</title>
      <desc id="a2d">
        Schematische Liste von sechs möglichen zusätzlichen Diagnosen:
        Depression, Angststörungen, posttraumatische Belastungsstörung,
        Substanzgebrauchsstörung, Essstörungen und ADHS. Alle Einträge sind
        gleich gross und unverbunden dargestellt. In Studien hatten viele, aber
        nicht alle Menschen mit Borderline weitere Diagnosen. Die Grafik zeigt
        weder Ursache noch individuelle Wahrscheinlichkeit oder Rangfolge.
        Angehörige müssen Beschwerden nicht selbst diagnostisch zuordnen.
      </desc>
      <rect width="820" height="1045" fill="var(--bg-primary)" />

      <text
        x="64"
        y="70"
        fontSize="13.5"
        fill="var(--accent-label)"
        fontWeight="600"
        textAnchor="start"
        letterSpacing="2.2"
      >
        KONSTELLATION · BEGLEITERKRANKUNGEN
      </text>
      <text
        x="64"
        y="116"
        fontSize="34"
        fill="var(--fg-primary)"
        fontWeight="700"
        textAnchor="start"
      >
        Mögliche Begleiterkrankungen
      </text>
      <rect x="64" y="132" width="58" height="3" fill="var(--accent-primary)" />
      <text
        x="64"
        y="162"
        fontSize="16.5"
        fill="var(--fg-secondary)"
        textAnchor="start"
      >
        Viele, aber nicht alle Menschen mit Borderline haben weitere Diagnosen
      </text>
      <text
        x="64"
        y="205"
        fontSize="12.5"
        fill="var(--fg-secondary)"
        fontStyle="italic"
        textAnchor="start"
      >
        Sechs mögliche Diagnosen · keine Rangfolge · keine individuelle Prognose
      </text>

      <g id="diagnosis-list" data-layout="equal-list" aria-hidden="true">
        {diagnoses.map(diagnosis => (
          <g key={`${diagnosis.x}-${diagnosis.y}`}>
            <circle
              cx={diagnosis.x}
              cy={diagnosis.y}
              r="68"
              fill="var(--ig-rose)"
              stroke="var(--accent-primary)"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            {diagnosis.lines.map((line, index) => (
              <text
                key={line}
                x={diagnosis.x}
                y={
                  diagnosis.y +
                  (index - (diagnosis.lines.length - 1) / 2) * 20 +
                  5
                }
                fontSize={line === "gebrauchsstörung" ? 12.5 : 15}
                fill="var(--accent-primary-h)"
                fontWeight="600"
                textAnchor="middle"
              >
                {line}
              </text>
            ))}
          </g>
        ))}
      </g>

      <text
        x="64"
        y="654"
        fontSize="12.5"
        fill="var(--fg-secondary)"
        fontStyle="italic"
        textAnchor="start"
      >
        Die Einträge sind schematisch, gleich gross und ohne Verbindungen
        dargestellt.
      </text>
      <text
        x="64"
        y="674"
        fontSize="12.5"
        fill="var(--fg-secondary)"
        fontStyle="italic"
        textAnchor="start"
      >
        Sie zeigen keine Ursache, individuelle Wahrscheinlichkeit oder
        Rangfolge.
      </text>

      <rect x="64" y="710" width="3" height="98" fill="var(--accent-primary)" />
      <text
        x="86"
        y="734"
        fontSize="17.5"
        fill="var(--fg-primary)"
        fontStyle="italic"
        textAnchor="start"
      >
        Mehrere Diagnosen heissen mehr Komplexität – nicht mehr Schuld.
      </text>
      <text
        x="86"
        y="764"
        fontSize="17.5"
        fill="var(--fg-primary)"
        fontStyle="italic"
        textAnchor="start"
      >
        Welche Unterstützung passt, wird individuell fachlich geklärt.
      </text>
      <text
        x="86"
        y="794"
        fontSize="17.5"
        fill="var(--fg-primary)"
        fontStyle="italic"
        textAnchor="start"
      >
        Sie müssen nicht sortieren, was was ist.
      </text>

      <rect
        x="64"
        y="836"
        width="692"
        height="95"
        rx="10"
        fill="var(--bg-sage-wash)"
      />
      <text
        x="84"
        y="860"
        fontSize="11.5"
        fill="var(--ig-sage-deep)"
        fontWeight="700"
        textAnchor="start"
        letterSpacing="2"
      >
        HINWEIS
      </text>
      <text
        x="84"
        y="883"
        fontSize="14"
        fill="var(--fg-primary)"
        textAnchor="start"
      >
        Bei deutlicher Verschlechterung, Hoffnungslosigkeit oder Sorge um die
        Sicherheit
      </text>
      <text
        x="84"
        y="903"
        fontSize="14"
        fill="var(--fg-primary)"
        textAnchor="start"
      >
        braucht es eine professionelle Einschätzung – unabhängig davon, welcher
        Diagnose
      </text>
      <text
        x="84"
        y="923"
        fontSize="14"
        fill="var(--fg-primary)"
        textAnchor="start"
      >
        Beschwerden zugeordnet werden.
      </text>

      <line
        x1="64"
        y1="961"
        x2="756"
        y2="961"
        stroke="var(--fg-primary)"
        strokeOpacity="0.14"
        strokeWidth="1"
      />
      <text
        x="64"
        y="985"
        fontSize="12.5"
        fill="var(--fg-secondary)"
        fontWeight="600"
        textAnchor="start"
      >
        Fachstelle Angehörigenarbeit · Psychiatrische Universitätsklinik Zürich
      </text>
      <text
        x="64"
        y="1005"
        fontSize="11.5"
        fill="var(--fg-secondary)"
        fontStyle="italic"
        textAnchor="start"
        opacity="0.9"
      >
        Quellen: S3-Leitlinie Borderline-Persönlichkeitsstörung (DGPPN 2022,
        AWMF 038-015) · Shah &amp; Zanarini (2018)
      </text>
      <text
        x="64"
        y="1021"
        fontSize="11.5"
        fill="var(--fg-secondary)"
        fontStyle="italic"
        textAnchor="start"
        opacity="0.9"
      >
        Vollbibliographie: borderline-angehoerige.netlify.app/quellen
      </text>
    </svg>
  );
}
