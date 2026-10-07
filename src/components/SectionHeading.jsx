import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Eyebrow + title + lead. `title`, `eyebrow` and `lead` are ReactNodes.
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  center = false,
  light = false,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-14 lg:mb-20", center && "text-center", className)}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-5 text-xs font-medium uppercase tracking-[0.25em] font-[Metropolis]",
            light ? "text-white/60" : "text-[var(--brand-primary)]",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl md:text-5xl font-normal tracking-tighter leading-[1.08]",
          light ? "text-white" : "text-[var(--text-primary)]",
          center && "mx-auto",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-6 max-w-2xl text-lg leading-relaxed font-[Metropolis]",
            light ? "text-white/75" : "text-[var(--text-secondary)]",
            center && "mx-auto",
          )}
        >
          {lead}
        </p>
      )}
    </motion.div>
  );
}
