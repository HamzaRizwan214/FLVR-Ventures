import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(5px)"
  },
  in: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)"
  },
  out: {
    opacity: 0,
    y: -20,
    filter: "blur(5px)"
  }
};

const pageTransition = {
  type: "tween",
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.6
};

export default function PageWrapper({ children, noPadding = false }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={cn("w-full min-h-screen", !noPadding && "pt-24")}
    >
      {children}
    </motion.div>
  );
}
