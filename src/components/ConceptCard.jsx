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
    "group relative block w-full aspect-[4/5] overflow-hidden rounded-[16px] text-start border border-black/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-primary)]";

  const content = (
    <>
      <img
        src={card.src}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${theme.bg} 0%, ${theme.bg}d9 28%, ${theme.bg}00 68%)`,
        }}
      />

      {card.visualisation && (
        <span className="absolute top-4 end-4 rounded-full bg-black/50 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur-md font-[Metropolis]">
          <BilingualText en="Brand visualisation" ar="تصور للعلامة" />
        </span>
      )}

      <div
        className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 lg:p-8"
        style={{ color: theme.fg }}
      >
        <div>
          <h3 className="text-2xl lg:text-3xl font-normal tracking-tight leading-tight">
            <BilingualText en={concept.name} ar={concept.nameAr} />
          </h3>
          <p className="mt-2 text-base opacity-80 font-[Metropolis]">
            <T t={concept.tagline} />
          </p>
        </div>
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 group-hover:text-black"
          style={{ borderColor: theme.accent }}
          aria-hidden="true"
        >
          <ArrowUpRight
            size={18}
            className="rtl:-scale-x-100 transition-transform duration-300 group-hover:rotate-45"
          />
        </span>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 start-0 h-1 w-0 transition-all duration-700 group-hover:w-full"
        style={{ background: theme.accent }}
      />
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {to ? (
        <Link
          to={to}
          className={className}
          style={{ background: theme.bg }}
          aria-label={concept.name}
        >
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
