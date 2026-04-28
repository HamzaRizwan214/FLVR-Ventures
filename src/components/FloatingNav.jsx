import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import BilingualText from "./BilingualText";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function FloatingNav() {
  const { language, toggleLanguage } = useLanguage();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrolled(latest > 0.05);
  });

  const menuItems = [
    { name: "Home", ar: "الرئيسية", href: "/" },
    { name: "About", ar: "من نحن", href: "/about" },
    { name: "Portfolio", ar: "محفظتنا", href: "/portfolio" },
    { name: "How it Works", ar: "كيف نعمل", href: "/how-it-works" },
    { name: "Get in touch", ar: "تواصل معنا", href: "/contact" },
  ];

  // Variants for the navigation bar animation
  const navVariants = {
    expanded: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
    collapsed: {
      opacity: 0.4,
      scale: 0.9,
      y: 0,
      filter: "blur(2px)",
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
  };

  return (
    <header
      className={cn(
        "fixed top-2 left-0 right-0 z-50 flex items-center justify-between p-12 lg:px-20 transition-all duration-300",
        scrolled ? "bg-white/0 py-4" : "bg-transparent py-6",
      )}
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center space-x-3 rtl:space-x-reverse z-50"
      >
        <img
          src="/flvr.png"
          alt="FLVR Logo"
          className="h-8 shadow-2xl scale-250"
        />
      </Link>

      {/* Navigation */}
      <motion.nav
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial="expanded"
        animate={scrolled && !isHovered ? "collapsed" : "expanded"}
        variants={navVariants}
        className={cn(
          "hidden md:flex items-center space-x-2 bg-[var(--brand-primary)]/80 backdrop-blur-md rounded-full px-4 py-2 border border-black/5 rtl:space-x-reverse cursor-pointer transition-colors duration-300",
          scrolled && !isHovered
            ? "bg-[var(--brand-primary)]/40"
            : "bg-[var(--brand-primary)]/80",
        )}
      >
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "text-[#FFFFFF]/70 hover:text-[#000000] text-sm font-normal px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200 whitespace-nowrap",
              pathname === item.href && "text-[#000000] bg-[#ffffffff]/90",
            )}
          >
            <BilingualText en={item.name} ar={item.ar} />
          </Link>
        ))}
      </motion.nav>

      <div className="flex items-center z-50 gap-4">
        <div className="hidden sm:flex bg-black/5 backdrop-blur-md rounded-full p-1 border border-black/5">
          <button
            onClick={() => language !== "en" && toggleLanguage()}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-semibold uppercase transition-all duration-300",
              language === "en"
                ? "bg-[#0b7285] text-black shadow-lg"
                : "text-white/70 hover:text-white",
            )}
          >
            En
          </button>
          <button
            onClick={() => language !== "ar" && toggleLanguage()}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-semibold uppercase transition-all duration-300",
              language === "ar"
                ? "bg-[#ffe37dff] text-black shadow-lg"
                : "text-white/70 hover:text-white",
            )}
          >
            عربي
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-white bg-[var(--brand-primary)] rounded-full border border-white/10 shadow-xl"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-4 top-24 bg-[var(--brand-primary)]/95 backdrop-blur-2xl rounded-[32px] p-8 border border-white/10 shadow-2xl z-[60] md:hidden overflow-hidden"
          >
            {/* Background Grain/Texture effect if desired, or just smooth color */}
            <div className="flex flex-col gap-6">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-2xl font-light tracking-tight transition-colors flex items-center justify-between",
                      pathname === item.href
                        ? "text-[#ffe37dff]"
                        : "text-white/70 hover:text-white",
                    )}
                  >
                    <span>
                      <BilingualText en={item.name} ar={item.ar} />
                    </span>
                    {pathname === item.href && (
                      <motion.div
                        layoutId="activeDotMobile"
                        className="w-2 h-2 rounded-full bg-[#ffe37dff]"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              <div className="h-px bg-white/10 my-4" />

              {/* Language Toggle in Mobile Menu */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white/50 uppercase tracking-widest">
                  <BilingualText en="Language" ar="اللغة" />
                </span>
                <div className="flex bg-black/20 rounded-full p-1 border border-white/10">
                  <button
                    onClick={() => {
                      language !== "en" && toggleLanguage();
                    }}
                    className={cn(
                      "px-4 py-2 rounded-full text-xs font-bold uppercase transition-all duration-300",
                      language === "en"
                        ? "bg-[#0b7285] text-white"
                        : "text-white/40",
                    )}
                  >
                    En
                  </button>
                  <button
                    onClick={() => {
                      language !== "ar" && toggleLanguage();
                    }}
                    className={cn(
                      "px-4 py-2 rounded-full text-xs font-bold uppercase transition-all duration-300",
                      language === "ar"
                        ? "bg-[#ffe37dff] text-black"
                        : "text-white/40",
                    )}
                  >
                    عربي
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
