import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BilingualText from "./BilingualText";

// --- Professional Icons (SVG) ---
const IconUsers = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const IconTrend = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
const IconRepeat = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>
);
const IconScale = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
);
const IconGlobe = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);

const Fund = () => {
  const navigate = useNavigate();
  const [movingIndex, setMovingIndex] = useState(0);

  const focusPoints = [
    {
      title: { en: "Founder-led", ar: "بقيادة المؤسس" },
      color: "bg-[#0B7285]", // Brand Primary
      icon: <IconUsers />,
      isDark: false,
    },
    {
      title: { en: "Clear pull", ar: "جذب واضح" },
      color: "bg-[#FAFAF8]", // Off White
      icon: <IconTrend />,
      isDark: true,
    },
    {
      title: { en: "Repeat demand", ar: "طلب متكرر" },
      color: "bg-[#0B7285]/80",
      icon: <IconRepeat />,
      isDark: false,
    },
    {
      title: { en: "Scalable model", ar: "نموذج قابل للتوسع" },
      color: "bg-[#0B7285]/40",
      icon: <IconScale />,
      isDark: false,
    },
    {
      title: { en: "Expansion", ar: "التوسع" },
      color: "bg-[#FAFAF8]/90",
      icon: <IconGlobe />,
      isDark: true,
    },
  ];

  // Animation logic: Change which box is "jittering" or moving slightly
  useEffect(() => {
    const interval = setInterval(() => {
      setMovingIndex((prev) => (prev + 1) % focusPoints.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [focusPoints.length]);

  return (
    <section className="bg-[#081012] py-32 lg:py-48 px-6 lg:px-16 relative overflow-hidden text-white font-sans">
      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header Content */}
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-8"
          >
            <div className="w-2 h-2 bg-[var(--brand-primary)]" />
            <span className="text-sm font-bold tracking-widest uppercase text-white/50 font-[Metropolis]">
              <BilingualText en="Fund Opportunity" ar="فرصة استثمارية" />
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2.5rem,6vw,6rem)] font-bold tracking-tighter leading-[0.95] mb-12"
          >
            <BilingualText 
              en={<>FLVR Fund is building the<br /><span className="text-white/40">future of Saudi F&B.</span></>} 
              ar={<>صندوق فليفر يبني<br /><span className="text-white/40">مستقبل المطاعم السعودية.</span></>} 
            />
          </motion.h2>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-16">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/contact")}
              className="bg-white text-black px-10 py-5 font-bold text-lg hover:bg-[#FAFAF8] transition-colors font-[Metropolis]"
            >
              <BilingualText en="Join the Waitlist" ar="انضم إلى قائمة الانتظار" />
            </motion.button>
            <div className="max-w-md">
              <p className="text-white/50 text-sm leading-relaxed font-medium font-[Metropolis]">
                <BilingualText 
                  en="A Saudi-focused growth fund designed to back founder-led brands with breakout potential."
                  ar="صندوق نمو يركز على السوق السعودي، مصمم لدعم العلامات التجارية التي يقودها مؤسسون."
                />
              </p>
            </div>
          </div>
        </div>

        {/* SAR 100M Single Line */}
        <div className="mb-8 border-b border-white/10 pb-6">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(3rem,8vw,8rem)] font-bold tracking-tighter leading-none text-[var(--brand-primary)]"
          >
            <BilingualText en="SAR 100M" ar="١٠٠ مليون ريال" />
            <span className="text-xl text-white/20 tracking-[0.4em] uppercase font-bold ml-8 font-[Metropolis]">
              <BilingualText en="Launching 01.01.2027" ar="ينطلق في ٢٠٢٧" />
            </span>
          </motion.p>
        </div>

        {/* Local Grid for Boxes - Sharp Aesthetic */}
        <div className="relative border border-white/10 bg-white/[0.02]">
          {/* Grid lines background */}
          <div 
            className="absolute inset-0 opacity-[0.05] pointer-events-none" 
            style={{ 
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: '100px 100px'
            }} 
          />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-0 relative z-10">
            {/* Box 1 */}
            <div className="aspect-square border-r border-b border-white/10 p-0 overflow-hidden relative">
              <motion.div
                animate={movingIndex === 0 ? { x: [0, 50, -50, 0], y: [0, -50, 50, 0] } : { x: 0, y: 0 }}
                transition={{ duration: 1.5, ease: "anticipate" }}
                className={`absolute inset-0 ${focusPoints[0].color} flex flex-col items-center justify-center gap-4 text-center p-6`}
              >
                <div className="text-white">{focusPoints[0].icon}</div>
                <span className="text-white font-bold uppercase tracking-widest text-[11px] font-[Metropolis]">
                  <BilingualText en={focusPoints[0].title.en} ar={focusPoints[0].title.ar} />
                </span>
              </motion.div>
            </div>

            {/* Empty Cell 1 */}
            <div className="aspect-square border-r border-b border-white/10" />

            {/* Box 2 */}
            <div className="aspect-square border-r border-b border-white/10 p-0 overflow-hidden relative">
              <motion.div
                animate={movingIndex === 1 ? { x: [-100, 0], y: [0, 100] } : { x: 0, y: 0 }}
                transition={{ duration: 1.2, ease: "circInOut" }}
                className={`absolute inset-0 ${focusPoints[1].color} flex flex-col items-center justify-center gap-4 text-center p-6`}
              >
                <div className="text-black">{focusPoints[1].icon}</div>
                <span className="text-black font-bold uppercase tracking-widest text-[11px] font-[Metropolis]">
                  <BilingualText en={focusPoints[1].title.en} ar={focusPoints[1].title.ar} />
                </span>
              </motion.div>
            </div>

            {/* Empty Cell 2 */}
            <div className="aspect-square border-b border-white/10" />

            {/* Box 3 */}
            <div className="aspect-square border-r border-white/10 p-0 overflow-hidden relative">
              <motion.div
                animate={movingIndex === 2 ? { x: [0, 100], y: [0, -100] } : { x: 0, y: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className={`absolute inset-0 ${focusPoints[2].color} flex flex-col items-center justify-center gap-4 text-center p-6`}
              >
                <div className="text-white">{focusPoints[2].icon}</div>
                <span className="text-white font-bold uppercase tracking-widest text-[11px] font-[Metropolis]">
                  <BilingualText en={focusPoints[2].title.en} ar={focusPoints[2].title.ar} />
                </span>
              </motion.div>
            </div>

            {/* Box 4 */}
            <div className="aspect-square border-r border-white/10 p-0 overflow-hidden relative">
              <motion.div
                animate={movingIndex === 3 ? { x: [-100, 100], y: [0, 0] } : { x: 0, y: 0 }}
                transition={{ duration: 1.8, ease: "backOut" }}
                className={`absolute inset-0 ${focusPoints[3].color} flex flex-col items-center justify-center gap-4 text-center p-6`}
              >
                <div className="text-white">{focusPoints[3].icon}</div>
                <span className="text-white font-bold uppercase tracking-widest text-[11px] font-[Metropolis]">
                  <BilingualText en={focusPoints[3].title.en} ar={focusPoints[3].title.ar} />
                </span>
              </motion.div>
            </div>

            {/* Empty Cell 3 */}
            <div className="aspect-square border-r border-white/10" />

            {/* Box 5 */}
            <div className="aspect-square border-white/10 p-0 overflow-hidden relative">
              <motion.div
                animate={movingIndex === 4 ? { x: [0, 0], y: [-100, 100] } : { x: 0, y: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className={`absolute inset-0 ${focusPoints[4].color} flex flex-col items-center justify-center gap-4 text-center p-6`}
              >
                <div className="text-black">{focusPoints[4].icon}</div>
                <span className="text-black font-bold uppercase tracking-widest text-[11px] font-[Metropolis]">
                  <BilingualText en={focusPoints[4].title.en} ar={focusPoints[4].title.ar} />
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fund;
