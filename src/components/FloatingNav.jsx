import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import BilingualText from "./BilingualText";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Home", ar: "الرئيسية", href: "/" },
  { name: "About", ar: "من نحن", href: "/about" },
  { name: "Studio", ar: "استوديو", href: "/portfolio" },
  { name: "How it Works", ar: "كيف نعمل", href: "/how-it-works" },
  { name: "Get in touch", ar: "تواصل معنا", href: "/contact" },
];

export default function FloatingNav() {
  const { language, toggleLanguage } = useLanguage();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  // Smooth spring for scroll progress bar
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrolled(v > 0.04);
  });

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ── Desktop Header ── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "pt-3 pb-0" : "pt-5 pb-0",
        )}
      >
        {/* Scroll progress bar — sits at the very top edge */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-[#0b7285] origin-left"
          style={{ scaleX, right: 0, width: "100%" }}
        />

        <div
          className={cn(
            "mx-auto flex items-center justify-between transition-all duration-500",
            scrolled
              ? "max-w-[calc(100%-3rem)] px-6 py-3 bg-[#081012]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
              : "max-w-none px-10 lg:px-20 py-5 bg-transparent",
          )}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center z-50 group">
            <motion.img
              src="/flvr.svg"
              alt="FLVR"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.06 }}
              className="h-7 scale-150 origin-left"
            />
          </Link>

          {/* Desktop Nav Pill */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "hidden md:flex items-center gap-1 rounded-full px-2 py-1.5 border transition-all duration-500",
              scrolled
                ? "bg-white/[0.04] border-white/[0.07]"
                : "bg-[#0b7285]/70 backdrop-blur-md border-white/10",
            )}
          >
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative px-4 py-2 rounded-full text-sm font-medium font-[Metropolis] transition-colors duration-200 whitespace-nowrap"
                  style={{
                    color: isActive
                      ? scrolled
                        ? "#0b7285"
                        : "#000"
                      : "rgba(255,255,255,0.65)",
                  }}
                >
                  {/* Sliding active pill */}
                  {isActive && (
                    <motion.span
                      layoutId="navActivePill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        backgroundColor: scrolled
                          ? "rgba(11,114,133,0.15)"
                          : "rgba(255,255,255,0.92)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative z-10">
                    <BilingualText en={item.name} ar={item.ar} />
                  </span>
                </Link>
              );
            })}
          </motion.nav>

          {/* Right cluster */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 z-50"
          >
            {/* Language toggle */}
            <div
              className={cn(
                "hidden sm:flex relative rounded-full p-1 border transition-all duration-500",
                scrolled
                  ? "bg-white/[0.04] border-white/[0.07]"
                  : "bg-black/20 backdrop-blur-md border-white/10",
              )}
            >
              {/* Sliding bg indicator */}
              <motion.div
                className="absolute top-1 h-[calc(100%-8px)] rounded-full"
                animate={{
                  left: language === "en" ? "4px" : "50%",
                  width: "calc(50% - 4px)",
                  backgroundColor: language === "en" ? "#0b7285" : "#ffe37d",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
              <button
                onClick={() => language !== "en" && toggleLanguage()}
                className={cn(
                  "relative z-10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 font-[Metropolis]",
                  language === "en" ? "text-white" : "text-white/50",
                )}
              >
                EN
              </button>
              <button
                onClick={() => language !== "ar" && toggleLanguage()}
                className={cn(
                  "relative z-10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 font-[Metropolis]",
                  language === "ar" ? "text-black" : "text-white/50",
                )}
              >
                عربي
              </button>
            </div>

            {/* CTA — desktop */}
            <Link
              to="/contact"
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest font-[Metropolis] bg-white text-black hover:bg-[#ffe37d] transition-colors duration-200 shadow-md"
            >
              <BilingualText en="Let's Talk" ar="تواصل" />
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className={cn(
                "md:hidden flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300",
                scrolled
                  ? "bg-white/[0.06] border-white/10 text-white"
                  : "bg-[#0b7285]/80 border-white/10 text-white",
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {isOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </motion.div>
        </div>
      </header>

      {/* ── Mobile Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-[#081012]/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed inset-x-3 top-3 z-50 md:hidden overflow-hidden rounded-2xl border border-white/[0.08] bg-[#081012]/95 backdrop-blur-2xl shadow-[0_32px_80px_rgba(0,0,0,0.8)]"
            >
              {/* Top bar inside panel */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/[0.06]">
                <img
                  src="/flvr.svg"
                  alt="FLVR"
                  className="h-6 scale-150 origin-left"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/[0.05] text-white/70 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Links */}
              <div className="px-4 py-4 flex flex-col gap-1">
                {menuItems.map((item, i) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.06 + i * 0.055,
                        ease: [0.16, 1, 0.3, 1],
                        duration: 0.4,
                      }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-200 group",
                          isActive
                            ? "bg-[#0b7285]/20 text-white"
                            : "text-white/50 hover:text-white hover:bg-white/[0.04]",
                        )}
                      >
                        <span className="text-xl font-light tracking-tight font-[Metropolis]">
                          <BilingualText en={item.name} ar={item.ar} />
                        </span>
                        <span
                          className={cn(
                            "transition-all duration-200",
                            isActive
                              ? "text-[#ffe37d]"
                              : "text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                          )}
                        >
                          {isActive ? (
                            <span className="w-2 h-2 rounded-full bg-[#ffe37d] inline-block" />
                          ) : (
                            <ArrowUpRight size={16} />
                          )}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mx-4 mb-5 mt-2 flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 font-[Metropolis]">
                  <BilingualText en="Language" ar="اللغة" />
                </span>
                <div className="flex relative rounded-full p-1 bg-white/[0.05] border border-white/[0.07]">
                  <motion.div
                    className="absolute top-1 h-[calc(100%-8px)] rounded-full"
                    animate={{
                      left: language === "en" ? "4px" : "50%",
                      width: "calc(50% - 4px)",
                      backgroundColor:
                        language === "en" ? "#0b7285" : "#ffe37d",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                  <button
                    onClick={() => language !== "en" && toggleLanguage()}
                    className={cn(
                      "relative z-10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-[Metropolis] transition-colors duration-200",
                      language === "en" ? "text-white" : "text-white/40",
                    )}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => language !== "ar" && toggleLanguage()}
                    className={cn(
                      "relative z-10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-[Metropolis] transition-colors duration-200",
                      language === "ar" ? "text-black" : "text-white/40",
                    )}
                  >
                    عربي
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
