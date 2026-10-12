import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import T from "./T";
import BilingualText from "./BilingualText";
import { useConceptModal } from "@/contexts/ConceptModalContext";

// One concept: a large rounded photo card. The picture drifts slightly against the scroll, the
// name sits top-left over a soft shade, and a white pill at the bottom opens the concept modal.
export default function ConceptCard({ concept, index = 0, aspect = "aspect-[4/5]" }) {
  const { card } = concept;
  const { open } = useConceptModal();
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-7%", "7%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={() => open(concept.slug)}
        aria-haspopup="dialog"
        aria-label={concept.name}
        className={`group relative block ${aspect} w-full overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[var(--bg-secondary)] text-start`}
      >
        <motion.img
          src={card.src}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ y }}
          className="absolute inset-0 h-full w-full scale-[1.16] object-cover transition-[scale] duration-[1200ms] ease-out group-hover:scale-[1.22]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/0 to-black/55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: "linear-gradient(to top, rgba(172,30,64,0.55), rgba(255,146,5,0) 55%)" }}
        />

        {/* Name + tagline */}
        <div className="absolute inset-x-0 top-0 p-5 lg:p-6">
          <h3 className="text-[clamp(1.35rem,1.9vw,1.9rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white rtl:leading-[1.25] rtl:tracking-normal">
            <BilingualText en={concept.name} ar={concept.nameAr} />
          </h3>
          <span className="pill mt-3 !px-3 !py-1 !text-[10px] bg-white/15 text-white/90 backdrop-blur-md">
            <T t={concept.tagline} />
          </span>
        </div>

        {/* Button, bottom start */}
        <div className="absolute bottom-3 start-3 flex w-fit items-center gap-2 rounded-full bg-white py-2 pe-2 ps-4 text-[#111]">
          <span className="text-[12px] font-semibold">
            <BilingualText en="View concept" ar="عرض المفهوم" />
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[image:var(--gradient-brand)] text-white">
            <ArrowUpRight
              size={14}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:rotate-45 rtl:-scale-x-100"
            />
          </span>
        </div>
      </button>
    </motion.div>
  );
}
