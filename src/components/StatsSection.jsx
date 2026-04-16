import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BilingualText from "./BilingualText";

// Animated counter component using simple count-up logic for lightweight performance
function AnimatedCounter({ value, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseFloat(value.toString().replace(/[^0-9.]/g, ""));
      if (start === end) return;

      let totalDuration = 2000;
      let increment = end / (totalDuration / 16);
      
      let timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {Number.isInteger(count) ? count : count.toFixed(1)}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    margin: "-20%", // Trigger slightly before center for smoother transition
    amount: 0.3 
  });

  const stats = [
    { id: 1, value: "25", suffix: "k+", label: { en: "Funds and syndicates", ar: "الصناديق والتحالفات" } },
    { id: 2, value: "13", suffix: "k+", label: { en: "Active startups", ar: "الشركات الناشئة النشطة" } },
    { id: 3, value: "72", suffix: "k+", label: { en: "Active investors", ar: "المستثمرون النشطون" } },
    { id: 4, value: "10.7", prefix: "$", suffix: "B", label: { en: "Raised by active startups", ar: "بالأرقام" } },
  ];

  return (
    <motion.section
      ref={sectionRef}
      animate={{
        backgroundColor: isInView ? "var(--brand-primary)" : "var(--bg-primary)",
        color: isInView ? "#ffffff" : "var(--text-primary)",
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative min-h-[120vh] flex items-center py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
        
        {/* Left Side: Content & Report */}
        <div className="space-y-12">
          <div className="space-y-6">
            <motion.p 
              animate={{ color: isInView ? "rgba(255,255,255,0.6)" : "var(--text-muted)" }}
              className="text-xs uppercase tracking-[0.2em] font-medium"
            >
              <BilingualText en="By the numbers" ar="بالأرقام" />
            </motion.p>
            <h2 className="text-5xl md:text-7xl font-normal tracking-tighter leading-[1.1]">
              <BilingualText en="Fueling innovation" ar="تغذية الابتكار" />
            </h2>
            <p className="text-xl md:text-2xl font-normal leading-relaxed max-w-xl opacity-80">
              <BilingualText 
                en="With more than half of all top-tier VC deals run through our platform, FLVR is at the heart of venture investing. This exposure gives us the insight to identify gaps and build the solutions that bridge them." 
                ar="مع وجود أكثر من نصف صفقات رأس المال الجريء رفيعة المستوى عبر منصتنا، فإن فليفر في قلب الاستثمار الجريء."
              />
            </p>
          </div>

          {/* Report Card (Image-like) */}
          <div className="relative group max-w-md aspect-[4/3] rounded-sm overflow-hidden bg-black/10 border border-white/10 p-10 flex flex-col justify-end">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b7285]/20 to-transparent" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-normal leading-tight">
                <BilingualText en="THE FUND BENCHMARKS REPORT 2025" ar="تقرير معايير الصناديق 2025" />
              </h3>
              <div className="h-px w-12 bg-white/40" />
              <button className="text-sm uppercase tracking-widest font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                Data
              </button>
            </div>
            {/* Minimalist visual lines to mimic the report cover in image */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    <path d="M0 150 Q50 120 100 140 T200 110" fill="none" stroke="white" strokeWidth="0.5" />
                    <path d="M0 160 Q60 130 110 150 T200 120" fill="none" stroke="white" strokeWidth="0.5" />
                </svg>
            </div>
          </div>
        </div>

        {/* Right Side: Giant Stats Grid */}
        <div className="flex flex-col justify-center h-full pt-12 lg:pt-0">
          {/* Main Large Stat */}
          <div className="mb-24">
            <h3 className="text-[8rem] md:text-[12rem] lg:text-[15rem] leading-none font-normal tracking-tighter mix-blend-difference">
              <AnimatedCounter value="171" prefix="$" suffix="B" />
            </h3>
            <p className="text-xl md:text-2xl mt-4 opacity-70">
              <BilingualText en="Assets on platform" ar="الأصول على المنصة" />
            </p>
          </div>

          {/* Grid of 4 Stats */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-16 border-t border-white/20 pt-16">
            {stats.map((stat) => (
              <div key={stat.id} className="space-y-4">
                <div className="text-5xl md:text-7xl font-normal tracking-tighter">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <p className="text-base md:text-lg opacity-70 leading-tight">
                  <BilingualText en={stat.label.en} ar={stat.label.ar} />
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
}

