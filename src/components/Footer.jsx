import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import BilingualText from "./BilingualText";
import CtaLink from "./CtaLink";
import Disclaimer from "./Disclaimer";
import T from "./T";
import { useLanguage } from "../contexts/LanguageContext";
import { useConceptModal } from "@/contexts/ConceptModalContext";
import { concepts } from "@/data/concepts";
import { contact } from "@/data/content";

const links = [
  { name: { en: "Home", ar: "الرئيسية" }, href: "/" },
  { name: { en: "Portfolio", ar: "المحفظة" }, href: "/portfolio" },
  { name: { en: "Funds", ar: "الصندوق" }, href: "/funds" },
  { name: { en: "Insights", ar: "رؤى" }, href: "/insights" },
  { name: { en: "Contact", ar: "تواصل" }, href: "/contact" },
];

const email = import.meta.env.VITE_EMAIL_ADDRESS || "hello@flvrventures.com";
const phone = import.meta.env.VITE_CONTACT;

const closing = {
  title: { en: "Have something to discuss?", ar: "هل لديك ما تود مناقشته؟" },
};

const linkClass =
  "group inline-flex items-center gap-2 text-[15px] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]";

function Column({ title, children }) {
  return (
    <div>
      <h4 className="eyebrow mb-6">{title}</h4>
      {children}
    </div>
  );
}

// Footer: one rounded container with strong brand gradients. Brand and the closing call to
// action on top, then the link columns, then the legal line. No cut-outs.
export default function Footer() {
  const { language, toggleLanguage } = useLanguage();
  const { open } = useConceptModal();
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mx-2 mb-2 overflow-hidden rounded-[28px] bg-[var(--block-dark)] sm:mx-3 sm:mb-3">
      {/* Gradients: warm orange from the start edge, crimson into orange from the end edge,
          and a glow rising from the bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "linear-gradient(to right, rgba(227,121,15,0.38) 0%, rgba(214,92,40,0.14) 20%, transparent 46%)",
            "linear-gradient(to left, rgba(172,30,64,0.58) 0%, rgba(214,92,40,0.28) 22%, transparent 54%)",
            "radial-gradient(75% 60% at 50% 125%, rgba(227,121,15,0.26), transparent 70%)",
          ].join(", "),
        }}
      />

      {/* FLVR wordmark as a quiet watermark, cropped by the bottom edge */}
      <img
        src="/flvr.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[12%] end-[-2%] w-[min(52%,40rem)] select-none opacity-[0.09]"
      />

      <div className="relative px-6 pb-8 pt-14 sm:px-10 xl:px-14 xl:pb-10 xl:pt-16">
        {/* Top: brand left, closing call to action right */}
        <div className="flex flex-col gap-12 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <img src="/flvr.svg" alt="FLVR Ventures" className="h-20 w-auto xl:h-24" />
            <p className="mt-6 max-w-[22ch] text-balance text-[clamp(1.5rem,2.4vw,2.2rem)] font-light leading-[1.2] tracking-[-0.02em] text-[var(--text-primary)]">
              <BilingualText
                en="A venture studio for Saudi food and beverage."
                ar="استوديو مشاريع لقطاع الأغذية والمشروبات السعودي."
              />
            </p>
          </div>

          <div className="xl:w-[min(34%,28rem)] xl:pt-3">
            <p className="text-xl font-light tracking-[-0.01em] text-[var(--text-primary)]">
              <T t={closing.title} />
            </p>
            <p className="mt-3 max-w-[26rem] text-[14px] leading-[1.75] text-[var(--text-secondary)]">
              <T t={contact.lead} />
            </p>
            <div className="mt-6">
              <CtaLink to="/contact?interest=invest" variant="primary">
                <BilingualText en="Speak with the team" ar="تحدث مع الفريق" />
              </CtaLink>
            </div>
          </div>
        </div>

        {/* Columns */}
        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-[var(--border-default)] pt-12 md:grid-cols-3 xl:mt-20 xl:w-[66%]">
          <Column title={<BilingualText en="Explore" ar="استكشف" />}>
            <ul className="space-y-3.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className={linkClass}>
                    <BilingualText en={link.name.en} ar={link.name.ar} />
                  </Link>
                </li>
              ))}
            </ul>
          </Column>

          <Column title={<BilingualText en="Concepts" ar="المفاهيم" />}>
            <ul className="space-y-3.5">
              {concepts.map((concept) => (
                <li key={concept.slug}>
                  <button
                    type="button"
                    onClick={() => open(concept.slug)}
                    aria-haspopup="dialog"
                    className={`${linkClass} text-start`}
                  >
                    <BilingualText en={concept.name} ar={concept.nameAr} />
                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.5}
                      className="opacity-0 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100 rtl:-scale-x-100"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </Column>

          <Column title={<BilingualText en="Contact" ar="تواصل" />}>
            <ul className="space-y-3.5">
              <li>
                <a href={`mailto:${email}`} dir="ltr" className={linkClass}>
                  {email}
                </a>
              </li>
              {phone && (
                <li>
                  <a href={`tel:+966${phone}`} dir="ltr" className={linkClass}>
                    {`+966-${phone}`}
                  </a>
                </li>
              )}
              <li>
                <Link to="/contact?interest=fund" className={linkClass}>
                  <BilingualText en="Request fund overview" ar="اطلب نظرة عامة على الصندوق" />
                </Link>
              </li>
            </ul>
          </Column>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-6 border-t border-[var(--border-default)] pt-7 md:flex-row md:items-center md:justify-between xl:mt-16">
          <div className="space-y-2.5">
            <p className="text-xs text-[var(--text-muted)]">
              © {year} FLVR Ventures.{" "}
              <BilingualText en="All rights reserved." ar="جميع الحقوق محفوظة." />
            </p>
            <Disclaimer />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={language === "en" ? "Switch to Arabic" : "Switch to English"}
              className="rounded-full border border-[var(--border-default)] bg-white/[0.03] px-4 py-2.5 text-xs uppercase tracking-[0.16em] text-[var(--text-secondary)] transition-colors hover:bg-white/[0.08] hover:text-[var(--text-primary)]"
            >
              {language === "en" ? (
                <span style={{ fontFamily: "var(--font-arabic)", letterSpacing: 0, fontSize: 14 }}>
                  العربية
                </span>
              ) : (
                "English"
              )}
            </button>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
              aria-label={language === "en" ? "Back to top" : "العودة إلى الأعلى"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--text-primary)] transition-colors hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]"
            >
              <ArrowUp size={17} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
