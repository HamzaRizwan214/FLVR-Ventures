import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import T from "./T";
import BilingualText from "./BilingualText";
import { useConceptModal } from "@/contexts/ConceptModalContext";

// One concept: a photo card. Name and tagline top-left and a compact cream button at the bottom.
// Clicking opens the concept modal in place, on whatever page you are on.
export default function ConceptCard({ concept, index = 0, aspect = "aspect-[3/4.1]" }) {
  const { card } = concept;
  const { open } = useConceptModal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={() => open(concept.slug)}
        aria-haspopup="dialog"
        aria-label={concept.name}
        className={`group relative block ${aspect} w-full overflow-hidden rounded-[22px] border border-[var(--border-default)] bg-[var(--bg-secondary)] text-start`}
      >
        <img
          src={card.src}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/5 to-black/35"
        />

        {/* Name + tagline */}
        <div className="absolute inset-x-0 top-0 p-5 lg:p-6">
          <h3 className="text-[clamp(1.35rem,1.8vw,1.8rem)] font-light leading-[1.05] tracking-[-0.02em] text-white">
            <BilingualText en={concept.name} ar={concept.nameAr} />
          </h3>
          <span className="pill mt-3 !px-3 !py-1 !text-[10px] bg-white/15 text-white/90 backdrop-blur-md">
            <T t={concept.tagline} />
          </span>
        </div>

        {/* Compact button, bottom start */}
        <div className="absolute bottom-2.5 start-2.5 flex w-fit items-center gap-1.5 rounded-full bg-[#ece8e1]/95 py-2.5 pe-3.5 ps-4 text-[#17181a] backdrop-blur-md">
          <span className="text-[12px] font-medium">
            <BilingualText en="View concept" ar="عرض المفهوم" />
          </span>
          <ArrowUpRight
            size={13}
            strokeWidth={1.75}
            className="transition-transform duration-300 group-hover:rotate-45 rtl:-scale-x-100"
          />
        </div>
      </button>
    </motion.div>
  );
}
