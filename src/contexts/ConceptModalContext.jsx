import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ConceptModal from "@/components/ConceptModal";
import { getConcept } from "@/data/concepts";

const ConceptModalContext = createContext({ open: () => {}, close: () => {} });

// Holds which concept is open and renders the modal in place, on whatever page you are on.
export function ConceptModalProvider({ children }) {
  const [slug, setSlug] = useState(null);
  const open = useCallback((s) => setSlug(s), []);
  const close = useCallback(() => setSlug(null), []);
  const value = useMemo(() => ({ open, close }), [open, close]);
  const concept = getConcept(slug);

  return (
    <ConceptModalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {concept && <ConceptModal key={concept.slug} concept={concept} onClose={close} />}
      </AnimatePresence>
    </ConceptModalContext.Provider>
  );
}

export function useConceptModal() {
  return useContext(ConceptModalContext);
}
