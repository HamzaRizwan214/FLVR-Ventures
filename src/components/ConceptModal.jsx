import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import T from "./T";
import BilingualText from "./BilingualText";
import { useLanguage } from "@/contexts/LanguageContext";

const ease = [0.22, 1, 0.36, 1];
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Black or white, whichever reads better on a colour
const inkOn = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const lin = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const L = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  return L > 0.4 ? "#0b0b0c" : "#ffffff";
};

// A word that rises out of a mask
function Rise({ children, delay = 0, reduce }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: reduce ? 0 : "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// A concept shown in place, over whatever page you are on, in that concept's own brand colours:
// a rounded photo stage with its gallery on one side, the name, tagline and actions on the other.
// A bottom sheet on phones.
export default function ConceptModal({ concept, onClose, startIndex = 0 }) {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const rtl = language === "ar";

  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const [index, setIndex] = useState(startIndex);

  const images = concept.gallery;
  const current = images[index];
  const { founder, stage, website, theme } = concept;
  const accentInk = inkOn(theme.accent);
  const line = `${theme.fg}1f`;
  const nameWords = (rtl ? concept.nameAr : concept.name).split(" ");

  const go = useCallback(
    (delta) => setIndex((i) => (i + delta + images.length) % images.length),
    [images.length],
  );

  // Keyboard, focus trap, scroll lock, and returning focus to the card that opened it
  useEffect(() => {
    const opener = document.activeElement;
    const onKey = (e) => {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight") return go(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") return go(rtl ? 1 : -1);
      if (e.key === "Tab" && dialogRef.current) {
        const els = dialogRef.current.querySelectorAll(FOCUSABLE);
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, [onClose, go, rtl]);

  const PrevIcon = rtl ? ArrowRight : ArrowLeft;
  const NextIcon = rtl ? ArrowLeft : ArrowRight;
  const glass =
    "flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/65";

  return createPortal(
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.35 }}
        onClick={onClose}
        className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-md"
      />

      <div className="pointer-events-none fixed inset-0 z-[100] flex items-end justify-center lg:items-center lg:p-6">
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={concept.name}
          data-lenis-prevent
          initial={{ opacity: 0, y: reduce ? 0 : 56, scale: reduce ? 1 : 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: reduce ? 0 : 32 }}
          transition={{ duration: reduce ? 0 : 0.6, ease }}
          className="pointer-events-auto relative flex max-h-[92dvh] w-full flex-col overflow-y-auto rounded-t-[1.75rem] shadow-2xl lg:h-[min(580px,calc(100dvh-3rem))] lg:max-h-none lg:max-w-[1040px] lg:flex-row lg:overflow-hidden lg:rounded-[1.75rem]"
          style={{ background: theme.bg, color: theme.fg, border: `1px solid ${line}` }}
        >
          {/* Close */}
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className={`${glass} absolute end-4 top-4 z-30`}>
            <X size={16} strokeWidth={1.75} />
          </button>

          {/* Photo stage */}
          <div className="relative shrink-0 p-3 lg:w-[57%] lg:p-3.5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-black/30 lg:aspect-auto lg:h-full">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  initial={{ opacity: 0, scale: reduce ? 1 : 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.9, ease }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(8,6,6,0.45) 0%, rgba(8,6,6,0) 28%), linear-gradient(to top, rgba(8,6,6,0.62) 0%, rgba(8,6,6,0) 36%)",
                }}
              />

              <img src="/flvr-white.svg" alt="" className="absolute start-5 top-5 h-6 w-auto" />

              {/* Thumbnails, bottom start */}
              <div className="absolute bottom-3 start-3 flex gap-1.5 rounded-2xl bg-black/35 p-1.5 backdrop-blur-md">
                {images.map((image, i) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Image ${i + 1}`}
                    aria-current={i === index}
                    className={`h-10 w-10 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 sm:h-11 sm:w-11 ${
                      i === index ? "border-white opacity-100" : "border-transparent opacity-55 hover:opacity-100"
                    }`}
                  >
                    <img src={image.src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Arrows, bottom end */}
              {images.length > 1 && (
                <div className="absolute bottom-3 end-3 flex gap-2">
                  <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={glass}>
                    <PrevIcon size={16} strokeWidth={1.75} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next image"
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105"
                    style={{ background: theme.accent, color: accentInk }}
                  >
                    <NextIcon size={16} strokeWidth={2} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div
            data-lenis-prevent
            className="relative flex flex-1 flex-col overflow-hidden px-6 pb-6 pt-5 sm:px-8 lg:min-h-0 lg:overflow-y-auto lg:py-8 lg:pe-8 lg:ps-5"
          >
            {/* the concept's colour, glowing from the corner */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
              style={{ background: theme.accent }}
            />

            <img
              src={concept.logo}
              alt=""
              className="relative mt-1 h-12 w-auto max-w-[70%] self-start rounded-lg object-contain object-left rtl:object-right"
            />

            <h2
              className="relative mt-5 text-[clamp(2rem,3vw,2.75rem)] leading-[1.04] tracking-[-0.035em] rtl:leading-[1.25] rtl:tracking-normal"
              style={{ fontWeight: 700, color: theme.fg }}
            >
              {nameWords.map((word, i) => (
                <span key={`${word}${i}`}>
                  <Rise delay={0.25 + i * 0.07} reduce={reduce}>
                    {word}
                  </Rise>
                  {i < nameWords.length - 1 ? " " : ""}
                </span>
              ))}
            </h2>

            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.5, ease }}
              className="relative"
            >
              <span
                className="mt-4 inline-block rounded-full border px-3.5 py-1.5 text-[13px] font-medium leading-none"
                style={{ borderColor: `${theme.fg}55`, color: theme.fg }}
              >
                <T t={concept.tagline} />
              </span>

              <p className="mt-5 max-w-[34rem] text-[15px] leading-[1.7]" style={{ color: `${theme.fg}c7` }}>
                <T t={concept.description} />
              </p>

              {(stage || founder) && (
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {stage && (
                    <span className="rounded-full px-4 py-2 text-[13px] font-semibold" style={{ background: theme.accent, color: accentInk }}>
                      <BilingualText en="Stage" ar="المرحلة" />: <T t={stage} />
                    </span>
                  )}
                  {founder && (
                    <span
                      className="flex items-center gap-2.5 rounded-full border py-1.5 pe-4 ps-1.5 text-[13px] font-medium"
                      style={{ borderColor: `${theme.fg}33` }}
                    >
                      {founder.photo && <img src={founder.photo} alt="" className="h-7 w-7 rounded-full object-cover" />}
                      <T t={founder.name} />
                    </span>
                  )}
                </div>
              )}
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.65, ease }}
              className="relative mt-auto space-y-3 pt-8"
            >
              <Link
                to={`/contact?interest=invest&concept=${encodeURIComponent(concept.name)}`}
                onClick={onClose}
                className="group flex w-full items-center justify-between rounded-full py-1.5 pe-1.5 ps-6 text-[15px] font-semibold transition-shadow duration-300 hover:shadow-[0_16px_36px_-16px_var(--cta-glow)]"
                style={{ background: theme.accent, color: accentInk, "--cta-glow": theme.accent }}
              >
                <BilingualText en="Discuss this concept" ar="ناقش هذا المفهوم" />
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-45 rtl:group-hover:-rotate-45"
                  style={{ background: accentInk, color: theme.accent }}
                >
                  <ArrowUpRight size={18} strokeWidth={2} className="rtl:-scale-x-100" />
                </span>
              </Link>

              {website ? (
                <a
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border py-3.5 text-[14px] font-semibold transition-colors duration-300 hover:bg-white/10"
                  style={{ borderColor: `${theme.fg}40`, color: theme.fg }}
                >
                  <BilingualText en={`Visit ${website.domain}`} ar={`زيارة ${website.domain}`} />
                  <ArrowUpRight size={15} strokeWidth={1.75} className="rtl:-scale-x-100" />
                </a>
              ) : (
                <p className="flex items-center justify-center gap-2 text-[13px]" style={{ color: `${theme.fg}8c` }}>
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: theme.accent }} />
                  <BilingualText en="Website in development" ar="الموقع قيد التطوير" />
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>,
    document.body,
  );
}
