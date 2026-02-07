/**
 * ProgressBar – Shared micro-component for displaying progress.
 * Shows a thin bar + "X / Y aufgedeckt" label.
 */
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  revealed: number;
  total: number;
  percentage: number;
  color?: string;
  label?: string;
}

export default function ProgressBar({
  revealed,
  total,
  percentage,
  color = "var(--color-sage-mid)",
  label = "aufgedeckt",
}: ProgressBarProps) {
  const isComplete = revealed === total;

  return (
    <div className="flex items-center gap-3">
      {/* Bar */}
      <div className="flex-1 h-1.5 rounded-full bg-muted/50 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Label */}
      <span className="text-xs text-muted-foreground flex items-center gap-1 flex-shrink-0 tabular-nums">
        {isComplete && (
          <CheckCircle2 className="w-3.5 h-3.5 text-sage-mid" />
        )}
        {revealed}/{total} {label}
      </span>
    </div>
  );
}
