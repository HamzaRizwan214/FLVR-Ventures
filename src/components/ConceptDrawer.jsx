import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import T from "./T";
import BilingualText from "./BilingualText";
import { useLanguage } from "@/contexts/LanguageContext";

// Side drawer with the detail for one concept. Rendered in a portal because
// PageWrapper applies a CSS filter, which would otherwise trap `position: fixed`.
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
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-[90] bg-black/55 backdrop-blur-sm"
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
        transition={{ type: "spring", damping: 32, stiffness: 280 }}
        className="fixed inset-y-0 end-0 z-[100] flex w-full max-w-[600px] flex-col overflow-y-auto bg-[var(--bg-primary)] shadow-2xl"
      >
        {/* Brand header */}
        <div
          className="relative px-8 pt-8 pb-12 lg:px-12"
          style={{ background: theme.bg, color: theme.fg }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-6 end-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
          >
            <X size={18} />
          </button>
          <p
            className="mb-10 text-[10px] font-medium uppercase tracking-[0.25em] font-[Metropolis]"
            style={{ color: theme.accent }}
          >
            <BilingualText
              en="A FLVR Ventures concept"
              ar="مفهوم من فلايفر فينتشرز"
            />
          </p>
          <img
            src={concept.logo}
            alt={concept.name}
            className="mb-6 h-16 w-auto max-w-[70%] object-contain object-left rtl:object-right"
          />
          <p className="text-xl font-[Metropolis] opacity-85">
            <T t={concept.tagline} />
          </p>
        </div>

        {/* Body */}
        <div className="flex-1 px-8 py-10 lg:px-12">
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] font-[Metropolis]">
            <T t={concept.description} />
          </p>

          {(stage || founder) && (
            <dl className="mt-10 border-t border-[var(--border-default)]">
              {stage && (
                <div className="flex items-baseline justify-between gap-6 border-b border-[var(--border-default)] py-5">
                  <dt className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)] font-[Metropolis]">
                    <BilingualText en="Stage" ar="المرحلة" />
                  </dt>
                  <dd className="text-lg text-[var(--text-primary)]">
                    <T t={stage} />
                  </dd>
                </div>
              )}
              {founder && (
                <div className="flex items-center justify-between gap-6 border-b border-[var(--border-default)] py-5">
                  <dt className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)] font-[Metropolis]">
                    <BilingualText en="Founder" ar="المؤسس" />
                  </dt>
                  <dd className="flex items-center gap-4 text-end">
                    <span>
                      <span className="block text-lg text-[var(--text-primary)]">
                        <T t={founder.name} />
                      </span>
                      {founder.role && (
                        <span className="block text-sm text-[var(--text-muted)] font-[Metropolis]">
                          <T t={founder.role} />
                        </span>
                      )}
                    </span>
                    {founder.photo && (
                      <img
                        src={founder.photo}
                        alt=""
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    )}
                  </dd>
                </div>
              )}
            </dl>
          )}

          <div className="mt-10 grid gap-4">
            {concept.gallery.map((img, i) => (
              <figure
                key={i}
                className="relative overflow-hidden rounded-[14px] border border-black/10"
                style={{ background: theme.bg }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
                {img.visualisation && (
                  <figcaption className="absolute bottom-3 start-3 rounded-full bg-black/55 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur-md font-[Metropolis]">
                    <BilingualText en="Brand visualisation" ar="تصور للعلامة" />
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="sticky bottom-0 border-t border-[var(--border-default)] bg-[var(--bg-primary)]/95 px-8 py-5 backdrop-blur-md lg:px-12">
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
