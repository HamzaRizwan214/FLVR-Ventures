import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import T from "./T";
import BilingualText from "./BilingualText";

// One concept. Renders a <Link> when `to` is given, otherwise a <button>
// that calls `onOpen` (used by the Studio page to open the drawer).
export default function ConceptCard({ concept, onOpen, to, index = 0 }) {
  const { theme, card } = concept;

  const className =
    "group relative block aspect-[4/5] w-full overflow-hidden rounded-[22px] border border-[var(--border-default)] text-start";

  const content = (
    <>
      <img
        src={card.src}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.85] saturate-[0.85] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${theme.bg} 0%, ${theme.bg}cc 22%, ${theme.bg}00 62%)`,
        }}
      />

      {card.visualisation && (
        <span className="pill absolute end-4 top-4 bg-black/35 text-white/75 backdrop-blur-md">
          <BilingualText en="Brand visualisation" ar="تصور للعلامة" />
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
        <div>
          <h3 className="text-[15px] font-normal uppercase tracking-[0.14em] text-[#ece8e1]">
            <BilingualText en={concept.name} ar={concept.nameAr} />
          </h3>
          <p className="mt-2 text-[13px] text-[#ece8e1]/65">
            <T t={concept.tagline} />
          </p>
        </div>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black"
          aria-hidden="true"
        >
          <ArrowUpRight size={16} strokeWidth={1.5} className="rtl:-scale-x-100" />
        </span>
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {to ? (
        <Link to={to} className={className} style={{ background: theme.bg }} aria-label={concept.name}>
          {content}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onOpen}
          className={className}
          style={{ background: theme.bg }}
          aria-label={concept.name}
        >
          {content}
        </button>
      )}
    </motion.div>
  );
}
