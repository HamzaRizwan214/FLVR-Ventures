import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Eyebrow + statement title + optional lead. All props are ReactNodes.
export default function SectionHeading({ eyebrow, title, lead, center = false, className, titleClassName }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-12 lg:mb-16", center && "text-center", className)}
    >
      {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
      <h2
        className={cn(
          "max-w-3xl text-[clamp(1.9rem,3.6vw,3.3rem)] font-light leading-[1.14] tracking-[-0.01em] text-[var(--text-primary)]",
          center && "mx-auto",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-6 max-w-xl text-base leading-[1.75] text-[var(--text-secondary)]",
            center && "mx-auto",
          )}
        >
          {lead}
        </p>
      )}
    </motion.div>
  );
}
