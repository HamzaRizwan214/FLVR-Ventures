import React from "react";
import { motion } from "framer-motion";

// Page shell: a stack of framed panels with a small gutter all round.
// `noPadding` is accepted for older call sites and ignored.
export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-screen w-full flex-col gap-2 p-2 sm:gap-3 sm:p-3"
    >
      {children}
    </motion.div>
  );
}
