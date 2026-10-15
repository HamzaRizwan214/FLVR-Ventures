import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import T from "./T";
import { concepts } from "@/data/concepts";
import { useConceptModal } from "@/contexts/ConceptModalContext";
import { useLanguage } from "@/contexts/LanguageContext";

// Flat poster tones, the same orange-to-wine steps as the four stage cards on Home. `ink` is the
// text colour on each tone.
const tones = [
  { bg: "#f58a2e", ink: "#131415" },
  { bg: "#ec5d44", ink: "#131415" },
  { bg: "#c1304a", ink: "#ffffff" },
  { bg: "#8f1d3a", ink: "#ffffff" },
];
const photoPos = { nagu: "50% 40%", cosmic: "50% 50%", "amm-abdo": "50% 50%", "burger-abo-ashra": "50% 42%" };

const ease = [0.22, 1, 0.36, 1];

// The name is set as large as the panel allows. It stays on one line when it can be read at a
// good size there, otherwise it breaks into two balanced lines. Returns the lines and a size in cqw.
const CAP = 17; // largest size, in cqw
const FLOOR = 11; // below this, one line is too small, so use two
function setName(label, ar) {
  const width = 86; // usable panel width, in cqw
  const em = ar ? 0.55 : 0.7; // average letter width, in em
  const one = Math.min(CAP, width / (label.length * em));
  const words = label.split(" ");
  if (one >= FLOOR || words.length < 2) return { lines: [label], size: one };
  let best = null;
  for (let i = 1; i < words.length; i += 1) {
    const a = words.slice(0, i).join(" ");
    const b = words.slice(i).join(" ");
    const longest = Math.max(a.length, b.length);
    if (!best || longest < best.longest) best = { longest, lines: [a, b] };
  }
  return { lines: best.lines, size: Math.min(CAP, width / (best.longest * em)) };
}

// One concept as a poster: the concept's photo (warmed toward the panel colour) under a flat
// colour panel with a curved top edge. A round arrow button sits across the seam, ringed in the
// panel colour so it looks scooped out of the photo. All sizes are in cqw, so a poster scales
// with its width. Clicking opens the concept's pop-up.
// `scene` is the pinned Home scene: the poster fills the cell it is given, with no entrance of its
// own (the scene's timeline raises it) and no scroll drift on the photo.
export function Poster({ concept, index, scene = false }) {
  const tone = tones[index % tones.length];
  const { language } = useLanguage();
  const ar = language === "ar";
  const { lines, size } = setName(ar ? concept.nameAr : concept.name, ar);
  const { open } = useConceptModal();
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-5%", "5%"]);

  const card = (
      <button
        ref={ref}
        type="button"
        onClick={() => open(concept.slug)}
        aria-haspopup="dialog"
        aria-label={concept.name}
        className={`cp-card group relative block w-full overflow-hidden rounded-[1.25rem] text-start ${
          scene ? "sc-ccard h-full" : "aspect-[4/5]"
        }`}
        style={{ background: tone.bg, color: tone.ink, containerType: "inline-size" }}
      >
        {/* Photo, brightened and warmed */}
        <div className="absolute inset-x-0 top-0 h-[62%] overflow-hidden bg-black/20">
          <motion.img
            src={concept.card.src}
            alt=""
            loading="lazy"
            decoding="async"
            style={{
              ...(scene ? null : { y }),
              objectPosition: photoPos[concept.slug] ?? "50% 50%",
              filter: "saturate(1.12) brightness(1.1)",
            }}
            className={`${scene ? "sc-cc-img " : ""}absolute inset-0 h-full w-full scale-[1.14] object-cover transition-[scale] duration-[1200ms] ease-out group-hover:scale-[1.2]`}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "rgba(255,138,31,0.4)", mixBlendMode: "soft-light" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, rgba(10,4,6,0.4) 0%, rgba(10,4,6,0) 34%), linear-gradient(to top, ${tone.bg}b3 0%, ${tone.bg}00 34%)`,
            }}
          />
        </div>

        <img src="/flvr-white.svg" alt="" className="absolute start-[7cqw] top-[7cqw] h-[6.5cqw] w-auto" />

        {/* Panel, with a curved top edge that rises over the photo */}
        <div
          className="absolute inset-x-0 bottom-0 flex h-[44%] flex-col justify-center rounded-t-[9cqw] px-[7cqw] pb-[6cqw] pt-[8cqw]"
          style={{ background: tone.bg }}
        >
          <span
            className="w-fit rounded-[1.4cqw] border-[1.5px] px-[2.8cqw] py-[1.3cqw] leading-none"
            style={{ borderColor: tone.ink, fontSize: "clamp(12px, 4cqw, 14.5px)", fontWeight: 500 }}
          >
            <T t={concept.tagline} />
          </span>
          <h3
            className="mt-[4cqw] whitespace-nowrap leading-[1.04] tracking-[-0.03em] transition-transform duration-500 ease-out group-hover:translate-x-[1cqw] rtl:leading-[1.25] rtl:tracking-normal rtl:group-hover:-translate-x-[1cqw]"
            style={{ fontSize: `${size}cqw`, fontWeight: 700, color: tone.ink }}
          >
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>
        </div>

        {/* Round arrow across the seam, ringed in the panel colour */}
        <span
          aria-hidden="true"
          className="absolute end-[7cqw] flex h-[15cqw] w-[15cqw] items-center justify-center rounded-full bg-[#f2eee8] text-[#131415] transition-all duration-500 group-hover:bg-[image:var(--gradient-brand)] group-hover:text-white"
          style={{ top: "calc(56% - 7.5cqw)", boxShadow: `0 0 0 2.4cqw ${tone.bg}` }}
        >
          <ArrowUpRight
            className="h-[7cqw] w-[7cqw] transition-transform duration-500 group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45"
            strokeWidth={2.25}
          />
        </span>
      </button>
  );

  if (scene) return card;
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay: index * 0.09, ease }}
    >
      {card}
    </motion.div>
  );
}

// Four posters: a swipe row on phones, a grid from sm up with every second poster set lower.
export default function ConceptPosters() {
  return (
    <div className="cp-row -mx-5 flex snap-x snap-mandatory scroll-ps-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:scroll-ps-0 sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4 xl:gap-5 [&::-webkit-scrollbar]:hidden">
      {concepts.map((concept, i) => (
        <div key={concept.slug} className="w-[78%] shrink-0 snap-start sm:w-auto sm:even:mt-10 xl:even:mt-16">
          <Poster concept={concept} index={i} />
        </div>
      ))}
    </div>
  );
}
