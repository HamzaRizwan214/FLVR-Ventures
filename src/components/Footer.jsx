import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import BilingualText from "./BilingualText";
import Disclaimer from "./Disclaimer";
import { useLanguage } from "../contexts/LanguageContext";

const links = [
  { name: { en: "How it Works", ar: "كيف نعمل" }, href: "/how-it-works" },
  { name: { en: "Studio", ar: "الاستوديو" }, href: "/portfolio" },
  { name: { en: "Funds", ar: "الصندوق" }, href: "/funds" },
  { name: { en: "About", ar: "من نحن" }, href: "/about" },
  { name: { en: "Contact", ar: "تواصل" }, href: "/contact" },
];

const email = import.meta.env.VITE_EMAIL_ADDRESS || "hello@flvrventures.com";

export default function Footer() {
  const { language, toggleLanguage } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--bg-primary)] border-t border-[var(--border-default)] pt-20 pb-10 overflow-hidden">
      {/* Brand watermark */}
      <div
        aria-hidden="true"
        className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0"
      >
        <span className="text-[25vw] font-bold text-[var(--text-primary)] opacity-[0.02] tracking-tighter leading-none">
          FLVR
        </span>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] mb-20">
          <div className="space-y-8">
            <Link to="/" className="inline-block">
              <img
                src="/flvr-logo.png"
                alt="FLVR Ventures"
                className="h-10 w-auto transition-opacity hover:opacity-80"
              />
            </Link>
            <p className="max-w-sm text-lg leading-relaxed text-[var(--text-secondary)] font-[Metropolis]">
              <BilingualText
                en="Backing the next generation of Saudi F&B brands."
                ar="ندعم الجيل القادم من علامات الأغذية والمشروبات السعودية."
              />
            </p>
          </div>

          <nav aria-label="Footer">
            <h4 className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-[var(--text-primary)]">
              <BilingualText en="Explore" ar="استكشف" />
            </h4>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-base text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-primary)] font-[Metropolis]"
                  >
                    <BilingualText en={link.name.en} ar={link.name.ar} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-[var(--text-primary)]">
              <BilingualText en="Contact" ar="تواصل" />
            </h4>
            <a
              href={`mailto:${email}`}
              dir="ltr"
              className="inline-flex items-center gap-3 text-base text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-primary)] font-[Metropolis]"
            >
              <Mail size={18} aria-hidden="true" />
              {email}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-8 border-t border-[var(--border-default)] pt-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <Disclaimer />
            <p className="text-sm text-[var(--text-muted)]">
              © {currentYear} FLVR Ventures.{" "}
              <BilingualText en="All rights reserved." ar="جميع الحقوق محفوظة." />
            </p>
          </div>
          <button
            onClick={toggleLanguage}
            className="self-start text-sm font-medium uppercase tracking-widest text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-primary)] md:self-auto"
          >
            {language === "en" ? "العربية" : "ENGLISH"}
          </button>
        </div>
      </div>
    </footer>
  );
}
