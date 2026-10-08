import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import T from "./T";
import BilingualText from "./BilingualText";
import { useLanguage } from "@/contexts/LanguageContext";

// Side drawer with the detail for one concept. Rendered in a portal so it is
// never clipped or offset by a transformed ancestor.
export default function ConceptDrawer({ concept, onClose }) {
  const { language } = useLanguage();
  const closeRef = useRef(null);
  const offscreen = language === "ar" ? "-100%" : "100%";
  const { theme, founder, stage } = concept;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return createPortal(
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
      />
      <motion.aside
        key="panel"
        role="dialog"
        aria-modal="true"
        aria-label={concept.name}
        data-lenis-prevent
        initial={{ x: offscreen }}
        animate={{ x: 0 }}
        exit={{ x: offscreen }}
        transition={{ type: "spring", damping: 34, stiffness: 260 }}
        className="fixed inset-y-2 end-2 z-[100] flex w-[calc(100%-1rem)] max-w-[560px] flex-col overflow-y-auto rounded-[26px] border border-[var(--border-default)] bg-[var(--bg-primary)] shadow-2xl"
      >
        {/* Brand header */}
        <div
          className="relative px-8 pb-10 pt-8 lg:px-10"
          style={{ background: theme.bg, color: theme.fg }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute end-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
          <p className="eyebrow mb-10 !text-[10px]" style={{ color: theme.accent }}>
            <BilingualText en="A FLVR Ventures concept" ar="مفهوم من فلايفر فينتشرز" />
          </p>
          <img
            src={concept.logo}
            alt={concept.name}
            className="mb-6 h-14 w-auto max-w-[70%] object-contain object-left rtl:object-right"
          />
          <p className="text-base font-light opacity-80">
            <T t={concept.tagline} />
          </p>
        </div>

        {/* Body */}
        <div className="flex-1 px-8 py-9 lg:px-10">
          <p className="text-[15px] leading-[1.8] text-[var(--text-secondary)]">
            <T t={concept.description} />
          </p>

          {(stage || founder) && (
            <dl className="mt-9 border-t border-[var(--border-default)]">
              {stage && (
                <div className="flex items-baseline justify-between gap-6 border-b border-[var(--border-default)] py-5">
                  <dt className="eyebrow">
                    <BilingualText en="Stage" ar="المرحلة" />
                  </dt>
                  <dd className="text-base text-[var(--text-primary)]">
                    <T t={stage} />
                  </dd>
                </div>
              )}
              {founder && (
                <div className="flex items-center justify-between gap-6 border-b border-[var(--border-default)] py-5">
                  <dt className="eyebrow">
                    <BilingualText en="Founder" ar="المؤسس" />
                  </dt>
                  <dd className="flex items-center gap-4 text-end">
                    <span>
                      <span className="block text-base text-[var(--text-primary)]">
                        <T t={founder.name} />
                      </span>
                      {founder.role && (
                        <span className="block text-sm text-[var(--text-muted)]">
                          <T t={founder.role} />
                        </span>
                      )}
                    </span>
                    {founder.photo && (
                      <img src={founder.photo} alt="" className="h-14 w-14 rounded-full object-cover" />
                    )}
                  </dd>
                </div>
              )}
            </dl>
          )}

          <div className="mt-9 grid gap-3">
            {concept.gallery.map((img, i) => (
              <figure
                key={i}
                className="relative overflow-hidden rounded-[18px] border border-[var(--border-default)]"
                style={{ background: theme.bg }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full brightness-[0.92]"
                />
                {img.visualisation && (
                  <figcaption className="pill absolute bottom-3 start-3 bg-black/40 text-white/75 backdrop-blur-md">
                    <BilingualText en="Brand visualisation" ar="تصور للعلامة" />
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="sticky bottom-0 border-t border-[var(--border-default)] bg-[var(--bg-primary)]/90 px-8 py-5 backdrop-blur-md lg:px-10">
          <Link
            to={`/contact?interest=invest&concept=${encodeURIComponent(concept.name)}`}
            onClick={onClose}
            className="btn-primary w-full"
          >
            <BilingualText en="Discuss this concept" ar="ناقش هذا المفهوم" />
          </Link>
        </div>
      </motion.aside>
    </>,
    document.body,
  );
}
