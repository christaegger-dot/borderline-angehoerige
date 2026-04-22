import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import MaterialienLibrarySection from "@/sections/MaterialienLibrarySection";

export default function Materialien() {
  return (
    <Layout>
      <SEO
        title="Materialien"
        description="Ausgewählte Materialien, Infografiken und Notfallhilfen für Angehörige von Menschen mit Borderline."
        path="/materialien"
      />

      <section className="pt-12 pb-6 md:pt-16 md:pb-8 bg-gradient-to-b from-sage-light/30 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center">
                <Download className="w-6 h-6 text-sage-darker" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-5">
              Materialien für Angehörige
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Hier finden Sie ausgewählte Handouts, Infografiken und
              Orientierungshilfen für belastende, unklare oder akute
              Situationen. Die Sammlung ist bewusst kuratiert: lieber wenige,
              wirklich hilfreiche Ressourcen als ein unübersichtliches Archiv.
            </p>
          </motion.div>
        </div>
      </section>

      <MaterialienLibrarySection />
    </Layout>
  );
}
