/**
 * InvitationSection
 *
 * Wiederverwendbare Schluss-Sektion für Editorial-Modus-Seiten.
 * Kicker → h2 → Rule → Lede → Kontakt-Links (tel + mailto).
 *
 * Kontaktdaten werden aus data/kontakte.ts bezogen – keine hardcodierten Nummern.
 */

import { Phone } from "@/icons/root-icons";
import { kontaktByIdStrict, emailByIdStrict } from "@/data/kontakte";

const fachstelleTel = kontaktByIdStrict("INFO_FACHSTELLE");
const fachstelleEmail = emailByIdStrict("EMAIL_ANGEHOERIGEN");

interface InvitationSectionProps {
  /** Optionaler Kicker-Text (Standard: «Sie dürfen anrufen») */
  kicker?: string;
  /** Optionale h2-Überschrift */
  heading?: string;
  /** Optionaler Lede-Text */
  lede?: string;
  /** Zusätzliche CSS-Klassen für das äussere <section>-Element */
  className?: string;
}

export default function InvitationSection({
  kicker = "Sie dürfen anrufen",
  heading = "Sie müssen nicht wissen, was Sie sagen wollen.",
  lede = "Die Fachstelle Angehörigenarbeit berät auch Sie – nicht nur die erkrankte Person. Orientierung, Gespräch und Materialien für Partnerinnen, Eltern, Geschwister und erwachsene Kinder.",
  className = "",
}: InvitationSectionProps) {
  return (
    <section className={`py-14 md:py-20 bg-background ${className}`}>
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <span className="kicker">{kicker}</span>
          <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-4">
            {heading}
          </h2>
          <hr className="rule rule-narrow rule-center mb-6" />
          <p className="text-muted-foreground leading-relaxed prose-editorial mx-auto mb-8">
            {lede}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${fachstelleTel.tel}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-sage-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sage-darker"
            >
              <Phone className="w-4 h-4" />
              {fachstelleTel.nummer}
            </a>
            <a
              href={`mailto:${fachstelleEmail.adresse}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              {fachstelleEmail.adresse}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
