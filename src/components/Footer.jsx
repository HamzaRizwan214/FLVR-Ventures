import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import BilingualText from "./BilingualText";
import Disclaimer from "./Disclaimer";
import { useLanguage } from "../contexts/LanguageContext";
import { useConceptModal } from "@/contexts/ConceptModalContext";
import { concepts } from "@/data/concepts";

const links = [
  { name: { en: "Home", ar: "الرئيسية" }, href: "/" },
  { name: { en: "Portfolio", ar: "المحفظة" }, href: "/portfolio" },
  { name: { en: "Funds", ar: "الصندوق" }, href: "/funds" },
  { name: { en: "Insights", ar: "رؤى" }, href: "/insights" },
];

const email = import.meta.env.VITE_EMAIL_ADDRESS || "hello@flvrventures.com";
const phone = import.meta.env.VITE_CONTACT;

const linkClass =
  "text-[14px] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]";

function Column({ title, children }) {
  return (
    <div>
      <h4 className="eyebrow mb-4">{title}</h4>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

// Footer: one plain, compact block. Brand on the left, three short link columns, then a single
// line with the legal text, the language switch and back-to-top.
export default function Footer() {
  const { language, toggleLanguage } = useLanguage();
  const { open } = useConceptModal();
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="panel mx-2 mb-2 px-6 py-10 sm:mx-3 sm:mb-3 lg:px-10">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 xl:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        {/* Brand */}
        <div className="col-span-2 md:col-span-4 xl:col-span-1">
          <Link to="/" aria-label="FLVR Ventures" className="inline-block">
            <img src="/flvr.svg" alt="FLVR Ventures" className="h-12 w-auto" />
          </Link>
          <p className="mt-3 max-w-[18rem] text-[14px] leading-[1.6] text-[var(--text-secondary)]">
            <BilingualText
              en="A venture studio for Saudi food and beverage."
              ar="استوديو مشاريع لقطاع الأغذية والمشروبات السعودي."
            />
          </p>
        </div>

        <Column title={<BilingualText en="Explore" ar="استكشف" />}>
          {links.map((link) => (
            <li key={link.href}>
              <Link to={link.href} className={linkClass}>
                <BilingualText en={link.name.en} ar={link.name.ar} />
              </Link>
            </li>
          ))}
        </Column>

        <Column title={<BilingualText en="Concepts" ar="المفاهيم" />}>
          {concepts.map((concept) => (
            <li key={concept.slug}>
              <button
                type="button"
                onClick={() => open(concept.slug)}
                aria-haspopup="dialog"
                className={`${linkClass} text-start`}
              >
                <BilingualText en={concept.name} ar={concept.nameAr} />
              </button>
            </li>
          ))}
        </Column>

        <div className="col-span-2 md:col-span-1">
          <Column title={<BilingualText en="Contact" ar="تواصل" />}>
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
              <Link to="/contact?interest=invest" className={`${linkClass} !text-[var(--text-primary)]`}>
                <BilingualText en="Speak with the team" ar="تحدث مع الفريق" />
              </Link>
            </li>
          </Column>
        </div>
      </div>

      {/* One line: legal on the left, controls on the right */}
      <div className="mt-8 flex flex-col gap-4 border-t border-[var(--border-default)] pt-5 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <p className="text-xs text-[var(--text-muted)]">
            © {year} FLVR Ventures. <BilingualText en="All rights reserved." ar="جميع الحقوق محفوظة." />
          </p>
          <Disclaimer className="!text-[11px]" />
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={language === "en" ? "Switch to Arabic" : "Switch to English"}
            className="rounded-full border border-[var(--border-default)] px-3.5 py-2 text-[11px] uppercase tracking-[0.14em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            {language === "en" ? (
              <span style={{ fontFamily: "var(--font-arabic)", letterSpacing: 0, fontSize: 13 }}>العربية</span>
            ) : (
              "English"
            )}
          </button>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
            aria-label={language === "en" ? "Back to top" : "العودة إلى الأعلى"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--text-primary)] transition-colors hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]"
          >
            <ArrowUp size={15} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </footer>
  );
}
