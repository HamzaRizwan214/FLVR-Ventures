import { motion } from "framer-motion";

// Opening block for inner pages. Sits under the fixed floating nav.
export default function PageHeader({ eyebrow, title, lead, children }) {
  return (
    <header className="px-6 lg:px-12 pt-40 pb-16 lg:pt-52 lg:pb-24 border-b border-[var(--border-default)]">
      <div className="mx-auto max-w-[1600px]">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-primary)] font-[Metropolis]"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.7 }}
          className="max-w-5xl text-5xl md:text-7xl lg:text-8xl font-normal tracking-tighter leading-[1.02] text-[var(--text-primary)]"
        >
          {title}
        </motion.h1>
        {lead && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-8 max-w-2xl text-xl md:text-2xl leading-relaxed text-[var(--text-secondary)] font-[Metropolis]"
          >
            {lead}
          </motion.p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </header>
  );
}
