import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ConceptModal from "@/components/ConceptModal";
import { getConcept } from "@/data/concepts";

const ConceptModalContext = createContext({ open: () => {}, close: () => {} });

// Holds which concept is open and renders the modal in place, on whatever page you are on.
export function ConceptModalProvider({ children }) {
  const [state, setState] = useState({ slug: null, index: 0 });
  const open = useCallback((slug, index = 0) => setState({ slug, index }), []);
  const close = useCallback(() => setState({ slug: null, index: 0 }), []);
  const value = useMemo(() => ({ open, close }), [open, close]);
  const concept = getConcept(state.slug);

  return (
    <ConceptModalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {concept && <ConceptModal key={concept.slug} concept={concept} startIndex={state.index} onClose={close} />}
      </AnimatePresence>
    </ConceptModalContext.Provider>
  );
}

export function useConceptModal() {
  return useContext(ConceptModalContext);
}
