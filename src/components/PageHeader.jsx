import { motion } from "framer-motion";
import Crosshair from "./Crosshair";

// Opening panel for inner pages: uppercase title left, hairline + lead right.
export default function PageHeader({ eyebrow, title, lead, children }) {
  return (
    <header className="panel px-6 pb-12 pt-14 lg:px-12 lg:pb-16 lg:pt-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="eyebrow mb-8"
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.2rem,5.4vw,4.8rem)] font-light uppercase leading-[1.04] tracking-[-0.01em] text-[var(--text-primary)]"
          >
            {title}
          </motion.h1>
        </div>

        {(lead || children) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pt-10"
          >
            <div className="mb-8 flex items-center gap-5">
              <Crosshair />
              <span className="hairline flex-1" />
            </div>
            {lead && (
              <p className="max-w-md text-[15px] leading-[1.8] text-[var(--text-secondary)]">
                {lead}
              </p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </motion.div>
        )}
      </div>
    </header>
  );
}
