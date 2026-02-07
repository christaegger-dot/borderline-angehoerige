import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";

interface AnimatedStatProps {
  /** Endwert der Animation */
  end: number;
  /** Text vor der Zahl */
  prefix?: string;
  /** Text nach der Zahl (z.B. "%" oder " J.") */
  suffix?: string;
  /** Beschreibungstext unter der Zahl */
  label: string;
  /** Animationsdauer in ms */
  duration?: number;
  /** Verzögerung für gestaffeltes Erscheinen */
  delay?: number;
  /** Anzahl Dezimalstellen */
  decimals?: number;
}

export default function AnimatedStat({
  end,
  prefix = "",
  suffix = "",
  label,
  duration = 2000,
  delay = 0,
  decimals = 0,
}: AnimatedStatProps) {
  const { ref, displayValue } = useCountUp({
    end,
    duration,
    prefix,
    suffix,
    decimals,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="text-center p-6 bg-[oklch(0.95_0.03_145)] rounded-xl"
    >
      <div className="text-4xl font-bold text-[oklch(0.55_0.10_145)] mb-2">
        {displayValue}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}
