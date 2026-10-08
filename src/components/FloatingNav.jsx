import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { Plus, X, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import BilingualText from "./BilingualText";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Home", ar: "الرئيسية", href: "/" },
  { name: "Portfolio", ar: "المحفظة", href: "/portfolio" },
  { name: "Funds", ar: "الصندوق", href: "/funds" },
  { name: "Insights", ar: "رؤى", href: "/insights" },
];

// Contact is reached through the "Speak with the team" button, on desktop and in the mobile menu.
const mobileMenuItems = menuItems;

const arabicFont = { fontFamily: "var(--font-arabic)" };
const ease = [0.22, 1, 0.36, 1];

// EN | عربي segmented toggle
function LanguageSwitch({ className }) {
  const { language, toggleLanguage } = useLanguage();
  const seg = "rounded-full px-3 py-1.5 transition-colors duration-300";
  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={language === "en" ? "Switch to Arabic" : "Switch to English"}
      className={cn(
        "flex items-center rounded-full border border-[var(--border-default)] bg-white/[0.03] p-1 text-[11px] tracking-[0.14em]",
        className,
      )}
    >
      <span
        className={cn(
          seg,
          language === "en" ? "bg-white/10 text-[var(--text-primary)]" : "text-[var(--text-muted)]",
        )}
      >
        EN
      </span>
      <span
        style={arabicFont}
        className={cn(
          seg,
          "text-[13px] tracking-normal",
          language === "ar" ? "bg-white/10 text-[var(--text-primary)]" : "text-[var(--text-muted)]",
        )}
      >
        عربي
      </span>
    </button>
  );
}

export default function FloatingNav() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  const isActive = (href) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  const activeHref = menuItems.find((m) => isActive(m.href))?.href ?? null;
  const litHref = hovered ?? activeHref;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      {/* Fixed bar, full width, the same at every scroll position. The spacer in <Layout> keeps
          content below it. */}
      <header className="pointer-events-none fixed inset-x-2 top-2 z-50 sm:inset-x-3 sm:top-3">
        <div className="pointer-events-auto flex h-[60px] w-full items-center justify-between rounded-[20px] border border-[var(--border-default)] bg-[var(--bg-primary)]/80 px-4 backdrop-blur-xl md:h-[68px] md:grid md:grid-cols-[1fr_auto_1fr] md:rounded-[22px] md:px-5 lg:px-7">
          <div className="justify-self-start">
            <Link to="/" aria-label="FLVR Ventures" className="flex items-center">
              <img src="/flvr.svg" alt="FLVR Ventures" className="h-10 w-auto md:h-11" />
            </Link>
          </div>

          {/* Desktop: segmented pill group with a sliding highlight */}
          <nav
            aria-label="Primary"
            onMouseLeave={() => setHovered(null)}
            className="hidden items-center rounded-full border border-[var(--border-default)] bg-white/[0.03] p-1 md:flex"
          >
            {menuItems.map((item) => {
              const active = item.href === activeHref;
              const lit = item.href === litHref;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onMouseEnter={() => setHovered(item.href)}
                  onFocus={() => setHovered(item.href)}
                  onBlur={() => setHovered(null)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300",
                    lit || active ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]",
                  )}
                >
                  {lit && (
                    <motion.span
                      layoutId="navPill"
                      className="absolute inset-0 rounded-full bg-white/[0.09]"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {active && <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />}
                    <BilingualText en={item.name} ar={item.ar} />
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 justify-self-end">
            <LanguageSwitch className="hidden md:flex" />

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="flex items-center gap-2 rounded-full border border-[var(--border-strong)] py-2 pe-3.5 ps-4 text-[11px] uppercase tracking-[0.18em] text-[var(--text-primary)] md:hidden"
            >
              <BilingualText en="Menu" ar="القائمة" />
              <Plus size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu: a full panel in the same visual language */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[var(--bg-page)]/80 p-2 backdrop-blur-xl sm:p-3 md:hidden"
          >
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="panel flex h-full flex-col px-5 pb-5 pt-3"
            >
              <div className="flex h-[52px] items-center justify-between">
                <img src="/flvr.svg" alt="FLVR Ventures" className="h-11 w-auto" />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center gap-2 rounded-full border border-[var(--border-strong)] py-2.5 pe-3.5 ps-4 text-[11px] uppercase tracking-[0.18em] text-[var(--text-primary)]"
                >
                  <BilingualText en="Close" ar="إغلاق" />
                  <X size={14} strokeWidth={1.5} />
                </button>
              </div>

              <nav className="mt-8 flex flex-1 flex-col justify-center" aria-label="Mobile">
                {mobileMenuItems.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease }}
                      className="border-t border-[var(--border-default)] last:border-b"
                    >
                      <Link
                        to={item.href}
                        className="flex items-center justify-between gap-4 py-6"
                      >
                        <span className="flex items-baseline gap-5">
                          <span className="eyebrow !text-[10px]">0{i + 1}</span>
                          <span
                            className={cn(
                              "text-[2.4rem] font-light leading-none tracking-[-0.02em]",
                              active ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]",
                            )}
                          >
                            <BilingualText en={item.name} ar={item.ar} />
                          </span>
                        </span>
                        {active ? (
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                        ) : (
                          <ArrowUpRight
                            size={18}
                            strokeWidth={1.25}
                            className="text-[var(--text-muted)] rtl:-scale-x-100"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">
                    <BilingualText en="Language" ar="اللغة" />
                  </span>
                  <LanguageSwitch />
                </div>
                <Link
                  to="/contact?interest=invest"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full"
                >
                  <BilingualText en="Speak with the team" ar="تحدث مع الفريق" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
