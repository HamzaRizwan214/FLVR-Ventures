import { useState, useEffect, useRef, useCallback } from "react";
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

const mobileMenuItems = menuItems;

const arabicFont = { fontFamily: "var(--font-arabic)" };
const ease = [0.22, 1, 0.36, 1];

// EN | عربي toggle: a pill with a sliding thumb under the active language. The two labels keep
// their places (EN left, عربي right) in both directions, so the thumb always travels the same way.
function LanguageSwitch({ className, light = false }) {
  const { language, toggleLanguage } = useLanguage();
  const isAr = language === "ar";
  const on = light ? "text-white" : "text-[#111]";
  const off = light ? "text-[var(--hero-ink)]/60" : "text-white/75 group-hover:text-white";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isAr}
      onClick={toggleLanguage}
      aria-label={isAr ? "Switch to English" : "Switch to Arabic"}
      dir="ltr"
      className={cn(
        "group relative flex h-10 w-[7.25rem] shrink-0 items-center rounded-full border p-1 transition-colors duration-300",
        light
          ? "border-[var(--hero-ink)]/20 bg-black/[0.06] hover:bg-black/[0.1]"
          : "border-white/20 bg-white/[0.08] backdrop-blur-md hover:bg-white/[0.14]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full shadow-[0_4px_14px_-4px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          light ? "bg-[var(--hero-ink)]" : "bg-white",
          isAr ? "translate-x-full" : "translate-x-0",
        )}
      />
      <span
        className={cn(
          "relative z-10 flex-1 text-center text-[12px] font-bold tracking-[0.08em] transition-colors duration-300",
          !isAr ? on : off,
        )}
      >
        EN
      </span>
      <span
        style={arabicFont}
        className={cn(
          "relative z-10 flex-1 text-center text-[14px] font-bold leading-none transition-colors duration-300",
          isAr ? on : off,
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

  // The bar is transparent, so each part (logo, links, right side) switches to dark ink while its
  // centre is over a light section (anything marked data-nav-light).
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const rightRef = useRef(null);
  const [light, setLight] = useState({ logo: false, links: false, right: false });

  const measure = useCallback(() => {
    const boxes = [...document.querySelectorAll("[data-nav-light]")].map((el) => el.getBoundingClientRect());
    const over = (ref) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r || !r.width) return false;
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      return boxes.some((b) => x >= b.left && x <= b.right && y >= b.top && y <= b.bottom);
    };
    const next = { logo: over(logoRef), links: over(linksRef), right: over(rightRef) };
    setLight((prev) =>
      prev.logo === next.logo && prev.links === next.links && prev.right === next.right ? prev : next,
    );
  }, []);

  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    schedule();
    // sections animate in after a route change, so measure again shortly after
    const timers = [200, 700, 1400].map((ms) => setTimeout(schedule, ms));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [measure, pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      {/* Fixed bar, full width, no fill: logo at the start, then the links, the language switch and
          the white button together at the end. The spacer in <Layout> keeps content below it
          (Home has none: its hero runs under the bar). */}
      <header id="site-nav" className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="pointer-events-auto mx-auto flex h-[72px] w-full max-w-[1480px] items-center justify-between px-5 sm:px-8 md:h-[88px] lg:px-12">
          <div ref={logoRef}>
            <Link to="/" aria-label="FLVR Ventures" className="flex items-center">
              <img
                src={light.logo ? "/flvr-dark.svg" : "/flvr.svg"}
                alt="FLVR Ventures"
                className="h-10 w-auto md:h-11"
              />
            </Link>
          </div>

          <div className="flex items-center gap-6 lg:gap-9">
            {/* Plain text links; a gradient underline follows the hover and rests on the current page */}
            <nav
              ref={linksRef}
              aria-label="Primary"
              onMouseLeave={() => setHovered(null)}
              className="hidden items-center gap-7 md:flex lg:gap-8"
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
                      "relative py-2 text-[14px] font-medium transition-colors duration-300",
                      light.links
                        ? lit || active
                          ? "text-[var(--hero-ink)]"
                          : "text-[var(--hero-ink)]/65"
                        : lit || active
                          ? "text-white"
                          : "text-white/70",
                    )}
                  >
                    <BilingualText en={item.name} ar={item.ar} />
                    {lit && (
                      <motion.span
                        layoutId="navUnderline"
                        className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-[image:var(--gradient-brand)]"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div ref={rightRef} className="flex items-center gap-3 lg:gap-4">
              <LanguageSwitch className="hidden md:flex" light={light.right} />
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                className={cn(
                  "flex items-center gap-2 rounded-full border py-2 pe-3.5 ps-4 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 md:hidden",
                  light.right
                    ? "border-white/10 bg-[var(--hero-ink)]/90 text-[var(--text-primary)] backdrop-blur-md"
                    : "border-[var(--border-strong)] text-[var(--text-primary)]",
                )}
              >
                <BilingualText en="Menu" ar="القائمة" />
                <Plus size={14} strokeWidth={1.5} />
              </button>
            </div>
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
