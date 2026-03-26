import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { Link } from "wouter";

export default function UnterstuetzenHeroSection() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-terracotta-light/30 to-background wave-divider">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <Link
            href="/verstehen"
            className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1"
          >
            ← Zurück zu Verstehen
          </Link>

          <div className="flex items-center gap-3 mb-6 mt-4">
            <div className="w-12 h-12 rounded-xl bg-terracotta-light flex items-center justify-center">
              <Compass className="w-6 h-6 text-terracotta-dark" />
            </div>
            <span className="text-sm font-medium text-terracotta-dark">
              Lesezeit: 8 Minuten
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Wie Angehörige hilfreich bleiben können
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Angehörige möchten oft gleichzeitig beruhigen, schützen, verstehen,
            Grenzen wahren und die Beziehung nicht verlieren. Genau diese
            Gleichzeitigkeit macht die Rolle so anspruchsvoll. Diese Seite hilft
            Ihnen, Unterstützung realistischer und tragfähiger zu denken.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
