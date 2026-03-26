import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function VerstehenHeroSection() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-sage-light/30 to-background wave-divider">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-sage-dark" />
            </div>
            <span className="text-sm font-medium text-sage-dark">
              Lesezeit: 15 Minuten
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Borderline verstehen
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Für Angehörige ist Borderline oft nicht nur schwer zu begreifen,
            sondern schwer auszuhalten. Situationen können rasch kippen,
            Reaktionen widersprüchlich wirken und die eigene Rolle unklar
            werden. Diese Seite hilft Ihnen, typische innere und
            zwischenmenschliche Dynamiken besser einzuordnen, ohne Verhalten zu
            beschönigen oder zu verurteilen.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
