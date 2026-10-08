import { Link } from "react-router-dom";
import BilingualText from "./BilingualText";
import Disclaimer from "./Disclaimer";
import { useLanguage } from "../contexts/LanguageContext";

const links = [
  { name: { en: "Studio", ar: "الاستوديو" }, href: "/studio" },
  { name: { en: "Funds", ar: "الصندوق" }, href: "/funds" },
  { name: { en: "Contact", ar: "تواصل" }, href: "/contact" },
];

const email = import.meta.env.VITE_EMAIL_ADDRESS || "hello@flvrventures.com";

export default function Footer() {
  const { language, toggleLanguage } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="panel mx-2 mb-2 mt-0 px-6 py-12 sm:mx-3 sm:mb-3 lg:px-12 lg:py-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Link to="/" aria-label="FLVR Ventures" className="inline-block">
            <img src="/flvr.svg" alt="FLVR Ventures" className="h-14 w-auto" />
          </Link>
          <p className="max-w-xs text-[15px] leading-[1.8] text-[var(--text-secondary)]">
            <BilingualText
              en="A venture studio for Saudi food and beverage."
              ar="استوديو مشاريع لقطاع الأغذية والمشروبات السعودي."
            />
          </p>
        </div>

        <nav aria-label="Footer">
          <h4 className="eyebrow mb-6">
            <BilingualText en="Explore" ar="استكشف" />
          </h4>
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-[15px] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  <BilingualText en={link.name.en} ar={link.name.ar} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h4 className="eyebrow mb-6">
            <BilingualText en="Contact" ar="تواصل" />
          </h4>
          <a
            href={`mailto:${email}`}
            dir="ltr"
            className="text-[15px] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            {email}
          </a>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-6 border-t border-[var(--border-default)] pt-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <Disclaimer />
          <p className="text-xs text-[var(--text-muted)]">
            © {currentYear} FLVR Ventures.{" "}
            <BilingualText en="All rights reserved." ar="جميع الحقوق محفوظة." />
          </p>
        </div>
        <button
          type="button"
          onClick={toggleLanguage}
          className="self-start text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] md:self-auto"
        >
          {language === "en" ? (
            <span style={{ fontFamily: "var(--font-arabic)", letterSpacing: 0, fontSize: 14 }}>العربية</span>
          ) : (
            "English"
          )}
        </button>
      </div>
    </footer>
  );
}
