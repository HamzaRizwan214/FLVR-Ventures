import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import T from "./T";
import BilingualText from "./BilingualText";
import { useConceptModal } from "@/contexts/ConceptModalContext";

// One concept: a photo card. Title and tag top-left and a frosted cream bar at the bottom.
// Clicking opens the concept modal in place, on whatever page you are on.
export default function ConceptCard({ concept, index = 0, aspect = "aspect-[3/4.1]" }) {
  const { card, founder } = concept;
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
        className={`group relative block ${aspect} w-full overflow-hidden rounded-[26px] border border-[var(--border-default)] bg-[var(--bg-secondary)] text-start`}
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

        {/* Title + tag */}
        <div className="absolute inset-x-0 top-0 p-6 lg:p-7">
          <h3 className="text-[clamp(1.7rem,2.3vw,2.3rem)] font-light leading-[1.05] tracking-[-0.02em] text-white">
            <BilingualText en={concept.name} ar={concept.nameAr} />
          </h3>
          <span className="pill mt-4 bg-white/15 text-white/85 backdrop-blur-md">
            {founder?.name ? (
              <T t={founder.name} />
            ) : (
              <BilingualText en="A FLVR Ventures concept" ar="مفهوم من فلايفر فينتشرز" />
            )}
          </span>
        </div>

        {/* Bottom bar */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-4 rounded-full bg-[#ece8e1]/95 px-5 py-3.5 text-[#17181a] backdrop-blur-md">
          <span className="truncate text-[11px] uppercase tracking-[0.14em] text-[#17181a]/65">
            <T t={concept.tagline} />
          </span>
          <span className="flex shrink-0 items-center gap-1.5 text-[13px] font-medium">
            <BilingualText en="View concept" ar="عرض المفهوم" />
            <ArrowUpRight
              size={15}
              strokeWidth={1.75}
              className="transition-transform duration-300 group-hover:rotate-45 rtl:-scale-x-100"
            />
          </span>
        </div>
      </button>
    </motion.div>
  );
}
