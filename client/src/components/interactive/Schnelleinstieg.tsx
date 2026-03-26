/**
 * Schnelleinstieg – Interaktives Element #6
 * „Ich brauche gerade…" – 4 Buttons auf der Startseite leiten zur passenden Seite.
 * Einfügepunkt: / (Home) → nach Hero, vor Crisis Matrix
 * Design: Tokens only, Inter only, mobile-first (375px safe)
 */
import { Link } from "wouter";
import { BookOpen, Wind, Shield, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const needs = [
  {
    label: "Verstehen",
    sublabel: "Was passiert hier?",
    href: "/verstehen",
    icon: BookOpen,
    color: "var(--color-sage-darker)",
    bgColor: "var(--color-sage-wash)",
    borderColor: "var(--color-sage-mid)",
  },
  {
    label: "Ruhig bleiben",
    sublabel: "Ich bin angespannt",
    href: "/selbstfuersorge#sofort-uebungen",
    icon: Wind,
    color: "var(--color-slate-dark)",
    bgColor: "var(--color-slate-wash)",
    borderColor: "var(--color-slate-mid)",
  },
  {
    label: "Grenzen setzen",
    sublabel: "Ich brauche Abstand",
    href: "/grenzen",
    icon: Shield,
    color: "var(--color-terracotta-darker)",
    bgColor: "var(--color-terracotta-wash)",
    borderColor: "var(--color-terracotta-mid)",
  },
  {
    label: "Akute Hilfe",
    sublabel: "Es ist dringend",
    href: "/soforthilfe",
    icon: Phone,
    color: "var(--color-alert)",
    bgColor: "var(--color-alert-wash)",
    borderColor: "var(--color-alert)",
  },
];

export default function Schnelleinstieg() {
  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-normal text-foreground mb-2">
            Ich brauche gerade…
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Wählen Sie, was jetzt am meisten hilft – Sie landen direkt beim passenden Inhalt.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
          {needs.map((need) => {
            const Icon = need.icon;
            return (
              <div key={need.label}>
                <Link href={need.href}>
                  <Card
                    className="group h-full cursor-pointer border transition-colors hover:border-border/70 hover:bg-muted/10"
                    style={{
                      borderColor: need.borderColor,
                      backgroundColor: need.bgColor,
                    }}
                  >
                    <CardContent className="p-4 md:p-5 text-center flex flex-col items-center gap-2">
                      <div
                        className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: need.color }}
                      >
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <p
                          className="font-semibold text-sm md:text-base"
                          style={{ color: need.color }}
                        >
                          {need.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                          {need.sublabel}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
