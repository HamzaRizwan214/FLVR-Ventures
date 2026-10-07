import { motion } from "framer-motion";
import T from "./T";
import { model } from "@/data/content";

// How FLVR is organised: three parts side by side, deliberately not a sequence.
export default function ModelDiagram() {
  return (
    <div className="grid grid-cols-1 gap-px border border-[var(--border-default)] bg-[var(--border-default)] md:grid-cols-3">
      {model.parts.map((part, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[var(--bg-secondary)] p-8 lg:p-12"
        >
          <p className="mb-10 text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)] font-[Metropolis]">
            0{i + 1}
          </p>
          <h3 className="mb-4 text-2xl lg:text-3xl font-normal tracking-tight text-[var(--text-primary)]">
            <T t={part.title} />
          </h3>
          <p className="text-base leading-relaxed text-[var(--text-secondary)] font-[Metropolis]">
            <T t={part.text} />
          </p>
        </motion.div>
      ))}
    </div>
  );
}
