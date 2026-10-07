import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import T from "./T";
import { loop } from "@/data/content";

// Studio → Investor → Fund. The one diagram that explains the whole model.
export default function LoopDiagram() {
  return (
    <div className="flex flex-col md:flex-row items-stretch gap-3">
      {loop.map((node, i) => (
        <React.Fragment key={i}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 border border-[var(--border-default)] bg-[var(--bg-secondary)] p-8 lg:p-10"
          >
            <p className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-primary)] font-[Metropolis]">
              <span className="text-[var(--text-muted)]">0{i + 1}</span>
              <T t={node.label} />
            </p>
            <h3 className="mb-3 text-2xl lg:text-3xl font-normal tracking-tight text-[var(--text-primary)]">
              <T t={node.title} />
            </h3>
            <p className="text-base leading-relaxed text-[var(--text-secondary)] font-[Metropolis]">
              <T t={node.text} />
            </p>
          </motion.div>
          {i < loop.length - 1 && (
            <div
              aria-hidden="true"
              className="flex items-center justify-center text-[var(--brand-primary)]"
            >
              <ArrowDown className="md:hidden" size={22} />
              <ArrowRight className="hidden md:block rtl:rotate-180" size={22} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
