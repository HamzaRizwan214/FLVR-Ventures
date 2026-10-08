import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import T from "./T";
import BilingualText from "./BilingualText";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1];
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// A concept shown in place, over whatever page you are on: image gallery on one side,
// the concept's details and its website link on the other. A bottom sheet on phones.
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

  return createPortal(
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.35 }}
        onClick={onClose}
        className="fixed inset-0 z-[90] bg-black/65 backdrop-blur-md"
      />

      <div className="pointer-events-none fixed inset-0 z-[100] flex items-end justify-center lg:items-center lg:p-6">
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={concept.name}
          data-lenis-prevent
          initial={{ opacity: 0, y: reduce ? 0 : 48, scale: reduce ? 1 : 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: reduce ? 0 : 32 }}
          transition={{ duration: reduce ? 0 : 0.55, ease }}
          className="pointer-events-auto relative flex max-h-[88dvh] w-full flex-col overflow-y-auto rounded-t-[28px] border border-[var(--border-default)] bg-[var(--bg-primary)] shadow-2xl lg:h-[min(500px,calc(100dvh-3rem))] lg:max-h-none lg:max-w-[860px] lg:flex-row lg:overflow-hidden lg:rounded-[28px]"
        >
          {/* Close */}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute end-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/70"
          >
            <X size={16} strokeWidth={1.5} />
          </button>

          {/* Gallery */}
          <div className="flex shrink-0 flex-col bg-[var(--bg-page)] lg:w-[56%] lg:min-h-0">
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-0 lg:flex-1">
              {/* blurred copy fills the frame so any aspect ratio looks intentional */}
              <img
                src={current.src}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-2xl"
              />
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.3 }}
                  className="relative h-full w-full object-contain"
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous image"
                    className="absolute start-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/70"
                  >
                    <PrevIcon size={15} strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next image"
                    className="absolute end-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/70"
                  >
                    <NextIcon size={15} strokeWidth={1.5} />
                  </button>
                </>
              )}

            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto p-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {images.map((image, i) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Image ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    "h-11 w-14 shrink-0 overflow-hidden rounded-lg border transition-all duration-300",
                    i === index ? "opacity-100" : "border-transparent opacity-55 hover:opacity-100",
                  )}
                  style={i === index ? { borderColor: theme.accent } : undefined}
                >
                  <img
                    src={image.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div
            data-lenis-prevent
            className="flex flex-1 flex-col p-6 sm:p-7 lg:min-h-0 lg:overflow-y-auto lg:p-8"
          >
            <p className="eyebrow !text-[10px]" style={{ color: theme.accent }}>
              <BilingualText en="A FLVR Ventures concept" ar="مفهوم من فلايفر فينتشرز" />
            </p>

            <img
              src={concept.logo}
              alt=""
              className="mt-6 h-11 w-auto max-w-[70%] self-start rounded-lg object-contain object-left rtl:object-right"
            />

            <h2 className="mt-5 text-[clamp(1.35rem,1.8vw,1.6rem)] font-light uppercase leading-[1.1] tracking-[-0.015em] text-[var(--text-primary)]">
              <BilingualText en={concept.name} ar={concept.nameAr} />
            </h2>
            <p className="mt-1.5 text-[14px] text-[var(--text-secondary)]">
              <T t={concept.tagline} />
            </p>

            <p className="mt-4 text-[14px] leading-[1.7] text-[var(--text-secondary)]">
              <T t={concept.description} />
            </p>

            {(stage || founder) && (
              <dl className="mt-8 border-t border-[var(--border-default)]">
                {stage && (
                  <div className="flex items-baseline justify-between gap-6 border-b border-[var(--border-default)] py-4">
                    <dt className="eyebrow">
                      <BilingualText en="Stage" ar="المرحلة" />
                    </dt>
                    <dd className="text-[15px] text-[var(--text-primary)]">
                      <T t={stage} />
                    </dd>
                  </div>
                )}
                {founder && (
                  <div className="flex items-center justify-between gap-6 border-b border-[var(--border-default)] py-4">
                    <dt className="eyebrow">
                      <BilingualText en="Founder" ar="المؤسس" />
                    </dt>
                    <dd className="flex items-center gap-4 text-end">
                      <span>
                        <span className="block text-[15px] text-[var(--text-primary)]">
                          <T t={founder.name} />
                        </span>
                        {founder.role && (
                          <span className="block text-sm text-[var(--text-muted)]">
                            <T t={founder.role} />
                          </span>
                        )}
                      </span>
                      {founder.photo && (
                        <img src={founder.photo} alt="" className="h-12 w-12 rounded-full object-cover" />
                      )}
                    </dd>
                  </div>
                )}
              </dl>
            )}

            {/* Actions */}
            <div className="mt-auto space-y-2.5 pt-7">
              {website ? (
                <a
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full"
                >
                  <BilingualText en={`Visit ${website.domain}`} ar={`زيارة ${website.domain}`} />
                  <ArrowUpRight size={15} strokeWidth={1.75} className="rtl:-scale-x-100" />
                </a>
              ) : (
                <button type="button" disabled aria-disabled="true" className="btn-secondary w-full">
                  <BilingualText en="Website in development" ar="الموقع قيد التطوير" />
                </button>
              )}
              <Link
                to={`/contact?interest=invest&concept=${encodeURIComponent(concept.name)}`}
                onClick={onClose}
                className="btn-secondary w-full"
              >
                <BilingualText en="Discuss this concept" ar="ناقش هذا المفهوم" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>,
    document.body,
  );
}
