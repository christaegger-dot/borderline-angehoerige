import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function MaterialienHeroSection() {
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
              <Download className="w-6 h-6 text-sage-dark" />
            </div>
            <span className="text-sm font-medium text-sage-dark">
              Materialsammlung
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Materialien für Angehörige
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Kuratierte Infografiken, Spickzettel und Notfallhilfen für
            Orientierung, Gespräche, Grenzen und Selbstfürsorge.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
