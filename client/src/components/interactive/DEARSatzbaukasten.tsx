/**
 * DEARSatzbaukasten – Interaktives Element #2
 * Nutzer füllt 4 Felder (D/E/A/R) mit eigenem Beispiel aus, Live-Vorschau zeigt den fertigen Satz.
 * Einfügepunkt: /grenzen → DEAR-Technik-Sektion
 * Design: Tokens only, Inter only, mobile-first (375px safe)
 */
import { useState, useMemo, useRef, useEffect } from "react";
import { Pencil, Copy, Check, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface DEARField {
  letter: string;
  label: string;
  placeholder: string;
  color: string;
  bgColor: string;
  hint: string;
}

const fields: DEARField[] = [
  {
    letter: "D",
    label: "Describe (Beschreiben)",
    placeholder: "Wenn du mich anrufst und ich nicht sofort abhebe…",
    color: "var(--color-sage-dark)",
    bgColor: "var(--color-sage-wash)",
    hint: "Beschreiben Sie die Situation sachlich, ohne Bewertung.",
  },
  {
    letter: "E",
    label: "Express (Ausdrücken)",
    placeholder: "…fühle ich mich unter Druck gesetzt.",
    color: "var(--color-terracotta-mid)",
    bgColor: "var(--color-terracotta-wash)",
    hint: "Drücken Sie Ihre Gefühle mit Ich-Botschaften aus.",
  },
  {
    letter: "A",
    label: "Assert (Bitten)",
    placeholder: "Ich möchte, dass du mir 30 Minuten Zeit gibst.",
    color: "var(--color-slate-dark)",
    bgColor: "var(--color-slate-wash)",
    hint: "Formulieren Sie eine klare, konkrete Bitte.",
  },
  {
    letter: "R",
    label: "Reinforce (Verstärken)",
    placeholder: "Dann kann ich entspannter mit dir sprechen.",
    color: "var(--color-sage-mid)",
    bgColor: "var(--color-sage-lighter)",
    hint: "Zeigen Sie die positiven Konsequenzen auf.",
  },
];

export default function DEARSatzbaukasten() {
  const [values, setValues] = useState<Record<string, string>>({
    D: "",
    E: "",
    A: "",
    R: "",
  });
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, []);

  const preview = useMemo(() => {
    const parts = fields.map((f) => values[f.letter]?.trim() || f.placeholder);
    return parts.join(" ");
  }, [values]);

  const hasInput = Object.values(values).some((v) => v.trim().length > 0);

  const handleCopy = async () => {
    const text = fields
      .map((f) => values[f.letter]?.trim() || "")
      .filter(Boolean)
      .join(" ");
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: do nothing
    }
  };

  const handleReset = () => {
    setValues({ D: "", E: "", A: "", R: "" });
    setCopied(false);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Pencil className="w-4 h-4 text-sage-mid" />
        <p className="text-sm text-muted-foreground">
          Füllen Sie die Felder mit Ihrer eigenen Situation aus – die Vorschau aktualisiert sich live.
        </p>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <motion.div
            key={field.letter}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
          >
            <div className="flex items-start gap-3">
              <span
                className="w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1"
                style={{ backgroundColor: field.color }}
              >
                {field.letter}
              </span>
              <div className="flex-1">
                <label
                  htmlFor={`dear-${field.letter}`}
                  className="text-xs font-medium text-muted-foreground mb-1 block"
                >
                  {field.label}
                </label>
                <textarea
                  id={`dear-${field.letter}`}
                  value={values[field.letter]}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      [field.letter]: e.target.value,
                    }))
                  }
                  placeholder={field.placeholder}
                  rows={2}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 bg-background focus:outline-none focus:ring-2 focus:ring-sage-mid/40 resize-none"
                  aria-describedby={`dear-hint-${field.letter}`}
                />
                <p
                  id={`dear-hint-${field.letter}`}
                  className="text-xs text-muted-foreground mt-1"
                >
                  {field.hint}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live-Vorschau */}
      <Card className="mt-6 border-2 border-dashed border-sage-mid/40 bg-sage-wash/30">
        <CardContent className="p-5">
          <p className="text-xs font-medium text-sage-dark mb-2">
            Ihr DEAR-Satz (Live-Vorschau):
          </p>
          <p className="text-sm text-foreground leading-relaxed italic">
            «{preview}»
          </p>
          <div className="flex items-center gap-3 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!hasInput}
              className="gap-2 text-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Kopiert
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Kopieren
                </>
              )}
            </Button>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Zurücksetzen
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
