import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import BilingualText from "./BilingualText";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Home", ar: "الرئيسية", href: "/" },
  { name: "Studio", ar: "الاستوديو", href: "/studio" },
  { name: "Funds", ar: "الصندوق", href: "/funds" },
];

// The desktop bar has a "Let's talk" button; the mobile menu lists Contact.
const mobileMenuItems = [...menuItems, { name: "Contact", ar: "تواصل", href: "/contact" }];

function LanguageSwitch({ className }) {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={language === "en" ? "Switch to Arabic" : "Switch to English"}
      className={cn("text-xs tracking-[0.16em] transition-colors", className)}
    >
      <span className={language === "en" ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}>
        EN
      </span>
      <span className="mx-2 text-[var(--text-muted)]">/</span>
      <span className={language === "ar" ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}>
        عربي
      </span>
    </button>
  );
}

export default function FloatingNav() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled &&
            "border-b border-[var(--border-default)] bg-[var(--bg-page)]/75 backdrop-blur-xl",
        )}
      >
        <div className="mx-auto flex items-center justify-between px-6 py-4 lg:px-12">
          <Link to="/" aria-label="FLVR Ventures" className="flex items-center">
            <img src="/flvr.svg" alt="FLVR Ventures" className="h-9 w-auto lg:h-10" />
          </Link>

          {/* Desktop */}
          <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
            {menuItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "relative text-xs uppercase tracking-[0.18em] transition-colors",
                    active
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  )}
                >
                  <BilingualText en={item.name} ar={item.ar} />
                  {active && (
                    <motion.span
                      layoutId="navDot"
                      className="absolute -bottom-2 start-0 h-px w-full bg-[var(--accent)]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-6">
            <LanguageSwitch className="hidden md:block" />
            <Link
              to="/contact"
              className="hidden rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-[var(--text-primary)] transition-colors hover:bg-white/[0.08] md:inline-flex"
            >
              <BilingualText en="Let's talk" ar="تواصل" />
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-primary)] md:hidden"
              aria-label="Open menu"
            >
              <BilingualText en="Menu" ar="القائمة" />
              <Plus size={16} strokeWidth={1.25} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[var(--bg-page)]/95 px-6 py-4 backdrop-blur-2xl md:hidden"
          >
            <div className="flex items-center justify-between">
              <img src="/flvr.svg" alt="FLVR Ventures" className="h-9 w-auto" />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-primary)]"
                aria-label="Close menu"
              >
                <BilingualText en="Close" ar="إغلاق" />
                <X size={16} strokeWidth={1.25} />
              </button>
            </div>

            <nav className="mt-16 flex flex-1 flex-col" aria-label="Mobile">
              {mobileMenuItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                  className="border-b border-[var(--border-default)]"
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "block py-6 text-4xl font-light tracking-[-0.01em]",
                      pathname === item.href
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)]",
                    )}
                  >
                    <BilingualText en={item.name} ar={item.ar} />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center justify-between border-t border-[var(--border-default)] py-6">
              <span className="eyebrow">
                <BilingualText en="Language" ar="اللغة" />
              </span>
              <LanguageSwitch />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
