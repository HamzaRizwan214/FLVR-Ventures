import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import BilingualText from "../components/BilingualText";
import { cn } from "@/lib/utils";

// ─── Images ──────────────────────────────────────────────────────────────────
const images = {
  hero: "/money.png",
  brand1:
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop",
  brand2:
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
  brand3:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
  brand4:
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
  pipeline:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const principles = [
  {
    en: "Capital Discipline",
    ar: "انضباط رأس المال",
    bodyEn:
      "We deploy capital with conviction, not comfort. Every SAR is accountable to a return thesis.",
    bodyAr:
      "نوظف رأس المال بقناعة، لا براحة. كل ريال مسؤول أمام أطروحة العائد.",
  },
  {
    en: "Brand Obsession",
    ar: "هوس العلامة التجارية",
    bodyEn:
      "Consumer love is built before unit economics. A brand that earns loyalty scales differently.",
    bodyAr:
      "يُبنى حب المستهلك قبل اقتصاديات الوحدة. العلامة التجارية التي تكسب الولاء تتوسع بشكل مختلف.",
  },
  {
    en: "Operational Rigor",
    ar: "الصرامة التشغيلية",
    bodyEn:
      "We install systems before we open doors. Playbooks, governance, and cadence come standard.",
    bodyAr:
      "نثبّت الأنظمة قبل أن نفتح الأبواب. الأدلة التشغيلية والحوكمة والإيقاع هي معيار أساسي.",
  },
];

const portfolio = [
  {
    id: "01",
    name: "LUNE CAFÉ",
    nameAr: "لون كافيه",
    category: { en: "Specialty Coffee", ar: "قهوة مختصة" },
    stage: "Growth",
    stageAr: "نمو",
    locations: 8,
    growth: "8×",
    growthLabel: {
      en: "Revenue growth in 18 months",
      ar: "نمو الإيرادات في 18 شهرًا",
    },
    target: { en: "National expansion", ar: "التوسع الوطني" },
    image: images.brand1,
    status: "Active",
    year: "2022",
    details: [
      {
        label: { en: "Stage", ar: "المرحلة" },
        value: { en: "Series A", ar: "الجولة أ" },
      },
      {
        label: { en: "Locations", ar: "المواقع" },
        value: { en: "8 branches, Riyadh", ar: "٨ فروع، الرياض" },
      },
      { label: { en: "Revenue Growth", ar: "نمو الإيرادات" }, value: "8×" },
      {
        label: { en: "Exit Strategy", ar: "استراتيجية الخروج" },
        value: { en: "Trade sale / IPO", ar: "بيع تجاري / طرح عام" },
      },
    ],
  },
  {
    id: "02",
    name: "BEYOND BURGER",
    nameAr: "بيوند برغر",
    category: { en: "Fast Casual", ar: "وجبات سريعة راقية" },
    stage: "Seed",
    stageAr: "بذرة",
    locations: 3,
    growth: "Market Entry",
    growthLabel: {
      en: "First Saudi plant-based concept",
      ar: "أول مفهوم نباتي سعودي",
    },
    target: { en: "Category creation", ar: "إنشاء فئة" },
    image: images.brand2,
    status: "Active",
    year: "2023",
    details: [
      {
        label: { en: "Stage", ar: "المرحلة" },
        value: { en: "Seed", ar: "بذرة" },
      },
      {
        label: { en: "Locations", ar: "المواقع" },
        value: { en: "3 pilots, Jeddah", ar: "٣ تجارب، جدة" },
      },
      {
        label: { en: "Positioning", ar: "التموضع" },
        value: { en: "Category pioneer", ar: "رائد الفئة" },
      },
      {
        label: { en: "Exit Strategy", ar: "استراتيجية الخروج" },
        value: { en: "Franchise scale-out", ar: "توسع بالامتياز" },
      },
    ],
  },
  {
    id: "03",
    name: "CLOUD KITCHEN X",
    nameAr: "كلاود كيتشن إكس",
    category: { en: "Ghost Kitchen", ar: "مطبخ سحابي" },
    stage: "Growth",
    stageAr: "نمو",
    locations: 12,
    growth: "3.2×",
    growthLabel: {
      en: "EBITDA margin vs. category avg.",
      ar: "هامش قبل الضرائب مقارنة بمتوسط الفئة",
    },
    target: { en: "Enterprise value creation", ar: "خلق قيمة المؤسسة" },
    image: images.brand3,
    status: "Active",
    year: "2021",
    details: [
      {
        label: { en: "Stage", ar: "المرحلة" },
        value: { en: "Growth equity", ar: "أسهم النمو" },
      },
      {
        label: { en: "Locations", ar: "المواقع" },
        value: {
          en: "12 dark kitchens, KSA",
          ar: "١٢ مطبخًا سحابيًا، المملكة",
        },
      },
      {
        label: { en: "EBITDA margin", ar: "هامش الأرباح" },
        value: "3.2x avg.",
      },
      {
        label: { en: "Exit Strategy", ar: "استراتيجية الخروج" },
        value: { en: "Strategic acquisition", ar: "استحواذ استراتيجي" },
      },
    ],
  },
  {
    id: "04",
    name: "THE NEW STREET",
    nameAr: "الشارع الجديد",
    category: { en: "Saudi Casual Dining", ar: "المطاعم غير الرسمية" },
    stage: "Pre-Seed",
    stageAr: "ما قبل البذرة",
    locations: 1,
    growth: "Launch",
    growthLabel: {
      en: "Modernizing Saudi classics",
      ar: "تحديث الكلاسيكيات السعودية",
    },
    target: { en: "Cultural positioning", ar: "التموضع الثقافي" },
    image: images.brand4,
    status: "Active",
    year: "2024",
    details: [
      {
        label: { en: "Stage", ar: "المرحلة" },
        value: { en: "Pre-Seed", ar: "ما قبل البذرة" },
      },
      {
        label: { en: "Locations", ar: "المواقع" },
        value: { en: "1 flagship, Riyadh", ar: "١ رئيسي، الرياض" },
      },
      {
        label: { en: "Concept type", ar: "نوع المفهوم" },
        value: { en: "Cultural dining", ar: "تجربة ثقافية" },
      },
      {
        label: { en: "Exit Strategy", ar: "استراتيجية الخروج" },
        value: { en: "Multi-city franchise", ar: "امتياز متعدد المدن" },
      },
    ],
  },
];

const metrics = [
  {
    value: "250+",
    labelEn: "Points of Sale",
    labelAr: "نقطة بيع",
    subEn: "across 4 Saudi cities",
    subAr: "في ٤ مدن سعودية",
  },
  {
    value: "14",
    labelEn: "Unique Concepts",
    labelAr: "مفهوم فريد",
    subEn: "built or invested in",
    subAr: "تم بناؤها أو الاستثمار فيها",
  },
  {
    value: "82%",
    labelEn: "Repeat Love Index",
    labelAr: "مؤشر الحب المتكرر",
    subEn: "avg. across active brands",
    subAr: "متوسط العلامات النشطة",
  },
  {
    value: "20M",
    labelEn: "SAR Under Management",
    labelAr: "ريال تحت الإدارة",
    subEn: "FLVR Fund I target",
    subAr: "هدف صندوق فليفر ١",
  },
];

const pipeline = [
  {
    code: "PRJ-07",
    hint: { en: "Dessert & Café Fusion", ar: "اندماج الحلويات والمقهى" },
    quarter: "Q2 2026",
    status: { en: "Concept validated", ar: "المفهوم محقق" },
    revealed: true,
  },
  {
    code: "PRJ-08",
    hint: { en: "Confidential Project", ar: "مشروع سري" },
    quarter: "Q3 2026",
    status: { en: "Term sheet signed", ar: "توقيع الاتفاقية" },
    revealed: false,
  },
  {
    code: "PRJ-09",
    hint: { en: "Confidential Project", ar: "مشروع سري" },
    quarter: "Q4 2026",
    status: { en: "Due diligence", ar: "العناية الواجبة" },
    revealed: false,
  },
];

// ─── Shared Primitives ────────────────────────────────────────────────────────

const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionLabel = ({ en, ar }) => (
  <p className="text-[10px] uppercase tracking-[0.35em] font-bold text-[var(--brand-primary)] mb-6 font-[Metropolis]">
    <BilingualText en={en} ar={ar} />
  </p>
);

const StageChip = ({ stage }) => {
  const color =
    stage === "Growth"
      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
      : stage === "Seed"
        ? "bg-amber-500/15 text-amber-400 border-amber-500/20"
        : stage === "Pre-Seed"
          ? "bg-blue-500/15 text-blue-400 border-blue-500/20"
          : "bg-white/10 text-white/50 border-white/10";
  return (
    <span
      className={cn(
        "text-[9px] uppercase tracking-[0.2em] border px-2 py-0.5 rounded-full font-bold font-[Metropolis]",
        color,
      )}
    >
      {stage}
    </span>
  );
};

// ─── Section 1: Hero ──────────────────────────────────────────────────────────
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-end pb-24 overflow-hidden px-6 lg:px-16"
    >
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-10" />
        <img src={images.hero} alt="" className="w-full h-full object-cover" />
      </motion.div>

      <motion.div
        style={{ opacity, y }}
        className="relative z-20 w-full max-w-[1600px] mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-8 font-bold font-[Metropolis]">
            <BilingualText
              en="FLVR Ventures — Portfolio"
              ar="فليفر فنتشرز — المحفظة"
            />
          </p>
          <h1 className="text-[clamp(3rem,10vw,9rem)] font-light text-white leading-[0.88] tracking-[-0.03em] mb-10 max-w-4xl">
            <BilingualText
              en={
                <>
                  Different
                  <br />
                  <em className="not-italic text-[var(--brand-reward)] font-extralight">
                    flavors.
                  </em>
                  <br />
                  One ambition.
                </>
              }
              ar={
                <>
                  نكهات
                  <br />
                  <em className="not-italic text-[var(--brand-reward)] font-extralight">
                    مختلفة.
                  </em>
                  <br />
                  طموح واحد.
                </>
              }
            />
          </h1>
          <div className="flex items-center gap-6">
            <div className="h-px w-16 bg-white/30" />
            <p className="text-white/60 text-sm tracking-widest uppercase font-medium font-[Metropolis]">
              <BilingualText en="Scale" ar="التوسع" />
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ─── Section 2: Thesis Statement ─────────────────────────────────────────────
const ThesisSection = () => (
  <section className="bg-[var(--bg-secondary)] py-32 lg:py-40 px-6 lg:px-16">
    <div className="max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        <div className="lg:col-span-5">
          <FadeUp>
            <SectionLabel en="Investment Philosophy" ar="فلسفة الاستثمار" />
            <img src="/cafe2.png" alt="" />
          </FadeUp>
        </div>
        <div className="lg:col-span-7">
          <FadeUp delay={0.1}>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-[var(--text-primary)] leading-[1.35] tracking-[-0.01em] mb-16">
              <BilingualText
                en="From bold ideas to breakout brands, our portfolio brings together concepts designed to stand out, earn repeat love, and grow with relevance."
                ar="من الأفكار الجريئة إلى العلامات التجارية الرائدة تجمع محفظتنا مفاهيم مصممة للتميز وكسب الولاء والنمو بشكل مستدام."
              />
            </blockquote>
          </FadeUp>

          <div className="border-t border-black/10">
            {principles.map((p, i) => (
              <FadeUp key={i} delay={0.15 + i * 0.08}>
                <div className="border-b border-black/10 py-8 grid grid-cols-12 gap-6 group">
                  <div className="col-span-1">
                    <span className="text-black/20 text-[10px] font-mono">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="col-span-4">
                    <h3 className="text-[var(--text-primary)] text-sm font-semibold tracking-wide font-[Metropolis]">
                      <BilingualText en={p.en} ar={p.ar} />
                    </h3>
                  </div>
                  <div className="col-span-7">
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-[Metropolis]">
                      <BilingualText en={p.bodyEn} ar={p.bodyAr} />
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Section 3: Portfolio Grid ────────────────────────────────────────────────
const PortfolioGridSection = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="bg-[var(--bg-primary)] py-24 lg:py-40 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* Header: Refined with "Counter" aesthetic */}
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-20 pb-8 border-b border-black/5">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[var(--brand-primary)]" />
                <SectionLabel en="Portfolio Index" ar="فهرس المحفظة" />
              </div>
              <h2 className="text-5xl lg:text-7xl font-light tracking-tighter text-[var(--text-primary)]">
                <BilingualText en="Selected Ventures" ar="مشاريع مختارة" />
              </h2>
            </div>
            <div className="mt-6 md:mt-0 text-right">
              <span className="text-[4rem] lg:text-[6rem] font-light leading-none text-black/[0.03] absolute right-16 -top-10 select-none">
                {portfolio.length.toString().padStart(2, "0")}
              </span>
              <p className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-muted)] font-[Metropolis]">
                <BilingualText en="Institutional Grade" ar="معايير مؤسسية" />
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Table Headers: Only visible on Desktop */}
        <div className="hidden lg:grid grid-cols-12 gap-6 px-8 mb-6">
          <HeaderItem label="No." span="col-span-1" />
          <HeaderItem label="Brand" span="col-span-3" />
          <HeaderItem label="Vertical" span="col-span-2" />
          <HeaderItem label="Status" span="col-span-2" />
          <HeaderItem label="Units" span="col-span-1" />
          <HeaderItem label="Performance" span="col-span-2" />
          <div className="col-span-1" />
        </div>

        {/* The Grid / Rows */}
        <div className="divide-y divide-black/5 border-t border-black/5">
          {portfolio.map((brand, i) => (
            <PortfolioRow
              key={brand.id}
              brand={brand}
              index={i}
              isHovered={hovered === brand.id}
              onHover={setHovered}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Sub-components for Cleanliness ---

const HeaderItem = ({ label, span }) => (
  <div
    className={cn(
      span,
      "text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] font-bold font-[Metropolis]",
    )}
  >
    {label}
  </div>
);

const PortfolioRow = ({ brand, index, isHovered, onHover }) => {
  return (
    <div
      onMouseEnter={() => onHover(brand.id)}
      onMouseLeave={() => onHover(null)}
      className="group relative"
    >
      {/* Desktop & Tablet Row */}
      <div
        className={cn(
          "relative grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center px-4 lg:px-8 py-6 lg:py-10 transition-all duration-500",
          isHovered ? "bg-black/[0.02]" : "bg-transparent",
        )}
      >
        {/* 1. ID / Index */}
        <div className="hidden lg:block col-span-1 font-[Metropolis] text-[10px] font-bold text-[var(--text-muted)]">
          {(index + 1).toString().padStart(2, "0")}
        </div>

        {/* 2. Brand Identity - Mobile Responsive Header */}
        <div className="col-span-full lg:col-span-3 flex items-center gap-4 lg:gap-5">
          <div className="relative w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl overflow-hidden border border-black/5 bg-white shadow-sm flex-shrink-0">
            <motion.img
              animate={{ scale: isHovered ? 1.15 : 1 }}
              src={brand.image}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h4 className="text-lg lg:text-xl font-medium tracking-tight text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors truncate">
              {brand.name}
            </h4>
            <p className="text-[10px] lg:text-xs text-[var(--text-muted)] mt-0.5 font-[Metropolis]">
              <BilingualText en={brand.nameAr} ar={brand.name} />
            </p>
          </div>
          {/* Mobile-only Stage Badge */}
          <div className="ml-auto lg:hidden">
            <StageChip stage={brand.stage} />
          </div>
        </div>

        {/* 3. Category - Hidden on small mobile */}
        <div className="hidden md:block col-span-2">
          <span className="text-[10px] lg:text-xs font-bold text-[var(--text-secondary)] py-1.5 px-3 rounded-full bg-black/[0.03] border border-black/5 font-[Metropolis]">
            <BilingualText en={brand.category.en} ar={brand.category.ar} />
          </span>
        </div>

        {/* 4. Stage - Desktop only */}
        <div className="hidden lg:block col-span-2">
          <StageChip stage={brand.stage} />
        </div>

        {/* 5. Units/Locations */}
        <div className="col-span-1 hidden lg:block">
          <span className="text-sm font-bold font-[Metropolis]">{brand.locations}</span>
        </div>

        {/* 6. Growth Metrics */}
        <div className="col-span-full lg:col-span-2 flex lg:flex-col justify-between items-center lg:items-start border-t lg:border-none border-black/5 pt-4 lg:pt-0 mt-2 lg:mt-0">
          <span className="lg:hidden text-[8px] uppercase tracking-widest text-[var(--text-muted)] font-bold">
            Performance
          </span>
          <div>
            <p className="text-base lg:text-lg font-bold text-[var(--brand-primary)] leading-none font-[Metropolis]">
              {brand.growth}
            </p>
            <p className="text-[8px] lg:text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] font-bold mt-1 font-[Metropolis]">
              <BilingualText
                en={brand.growthLabel.en}
                ar={brand.growthLabel.ar}
              />
            </p>
          </div>
        </div>

        {/* 7. Action Arrow */}
        <div className="hidden lg:flex col-span-1 justify-end">
          <motion.div
            animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
            className="w-10 h-10 rounded-full border border-[var(--brand-primary)] flex items-center justify-center text-[var(--brand-primary)]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- Animated Number Sub-component ---
const AnimatedNumber = ({ value }) => {
  // Extract number from string (e.g., "20M" -> 20)
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001,
  });

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest).toLocaleString(),
  );

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      motionValue.set(numericValue);
    }
  }, [inView, numericValue, motionValue]);

  return (
    <span ref={ref} className="tabular-nums font-[Metropolis]">
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
};

// --- Main Metrics Section ---
const MetricsSection = () => (
  <section className="bg-[var(--bg-primary)] py-32 border-y border-black/5 overflow-hidden">
    <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <div
            key={i}
            className={cn(
              "relative py-16 px-8 group transition-colors duration-500 hover:bg-black/[0.01]",
              // Responsive borders for a cleaner grid
              "border-b md:border-b-0 border-black/5",
              i !== 0 && "lg:border-l border-black/5",
            )}
          >
            {/* Subtle background accent for Arabian Luxury feel */}
            <div className="absolute top-0 left-0 w-1 h-0 bg-[var(--brand-primary)] transition-all duration-700 group-hover:h-full opacity-20" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h3 className="text-[clamp(3rem,6vw,5.5rem)] font-light text-[var(--brand-primary)] tracking-tighter leading-none mb-6">
                <AnimatedNumber value={m.value} />
              </h3>

              <div className="space-y-2">
                <p className="text-[var(--text-primary)] text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] flex items-center gap-3 font-[Metropolis]">
                  <BilingualText en={m.labelEn} ar={m.labelAr} />
                  <span className="h-px w-8 bg-[var(--brand-primary)]/30 inline-block" />
                </p>
                <p className="text-[var(--text-muted)] text-[11px] leading-relaxed max-w-[200px] font-[Metropolis]">
                  <BilingualText en={m.subEn} ar={m.subAr} />
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Section 5: Sticky Brand Deep-Dives ──────────────────────────────────────
const BrandDeepDiveSection = () => {
  return (
    <section className="bg-[var(--bg-primary)] py-32 lg:py-40 px-6 lg:px-16">
      <div className="max-w-[1600px] mx-auto">
        <FadeUp>
          <div className="mb-20">
            <SectionLabel en="Brand Deep-Dives" ar="تفاصيل العلامات" />
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter text-[var(--text-primary)]">
              <BilingualText en="Behind the numbers." ar="خلف الأرقام." />
            </h2>
          </div>
        </FadeUp>

        <div className="flex flex-col gap-4">
          {portfolio.map((brand, idx) => (
            <BrandAccordion key={brand.id} brand={brand} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BrandAccordion = ({ brand, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FadeUp delay={index * 0.05}>
      <div
        className={cn(
          "group relative mb-4 rounded-[2rem] border transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
          isOpen
            ? "border-black/20 bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] scale-[1.01]"
            : "border-black/5 bg-[#F9F9F9] hover:border-black/15 hover:bg-white",
        )}
      >
        {/* Trigger Row */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left p-4 lg:p-10 flex items-center gap-4 lg:gap-8 cursor-pointer"
        >
          {/* Logo/Icon with scale effect */}
          <div className="relative w-12 h-12 lg:w-20 lg:h-20 rounded-xl lg:rounded-2xl overflow-hidden flex-shrink-0 bg-white border border-black/5 shadow-sm">
            <motion.img
              animate={{ scale: isOpen ? 1.1 : 1 }}
              transition={{ duration: 0.8 }}
              src={brand.image}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 lg:gap-4 mb-1 lg:mb-2">
              <h3 className="text-lg lg:text-2xl font-light tracking-tight text-[var(--text-primary)] truncate">
                {brand.name}
              </h3>
              <div
                className={cn(
                  "px-2 lg:px-3 py-0.5 rounded-full text-[7px] lg:text-[9px] font-bold uppercase tracking-widest border shrink-0",
                  isOpen
                    ? "border-[var(--brand-primary)] text-[var(--brand-primary)]"
                    : "border-black/10 text-black/40",
                )}
              >
                {brand.stage}
              </div>
            </div>
            <p className="text-[10px] lg:text-sm font-medium text-black/40 tracking-wide uppercase flex items-center gap-2 truncate">
              <BilingualText en={brand.category.en} ar={brand.category.ar} />
              <span className="w-0.5 h-0.5 lg:w-1 lg:h-1 rounded-full bg-black/10" />
              <span>{brand.year}</span>
            </p>
          </div>

          {/* Growth Stat - Hidden on mobile, elegant on desktop */}
          <div className="hidden lg:flex items-center gap-12 mr-12">
            <div className="text-right">
              <p className="text-3xl font-bold text-[var(--brand-primary)] leading-none mb-1 font-[Metropolis]">
                {brand.growth}
              </p>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/30 font-[Metropolis]">
                <BilingualText
                  en={brand.growthLabel.en}
                  ar={brand.growthLabel.ar}
                />
              </p>
            </div>
          </div>

          {/* Interaction Indicator */}
          <div className="relative w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center shrink-0">
            <motion.div
              animate={{ rotate: isOpen ? 135 : 0, scale: isOpen ? 1.1 : 1 }}
              className="absolute inset-0 rounded-full border border-black/10 group-hover:border-black/20 transition-colors"
            />
            <svg
              className="w-3 h-3 lg:w-4 lg:h-4"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M7 0V14M0 7H14"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="p-4 lg:p-6 pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#F2F2F2] rounded-[1.5rem] overflow-hidden">
                  {/* Cinematic Image Mask */}
                  <div className="lg:col-span-5 relative h-[300px] lg:h-auto overflow-hidden">
                    <motion.img
                      initial={{ scale: 1.2, filter: "blur(10px)" }}
                      animate={{ scale: 1, filter: "blur(0px)" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      src={brand.image}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Narrative Details */}
                  <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between">
                    <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                      {brand.details.map((d, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.05 }}
                        >
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 mb-3 font-[Metropolis]">
                            <BilingualText en={d.label.en} ar={d.label.ar} />
                          </p>
                          <p className="text-lg font-bold text-black/80 leading-snug font-[Metropolis]">
                            {typeof d.value === "string" ? (
                              d.value
                            ) : (
                              <BilingualText en={d.value.en} ar={d.value.ar} />
                            )}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-12 pt-8 border-t border-black/5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 font-[Metropolis]">
                          <BilingualText
                            en="Strategic Partnership"
                            ar="شراكة استراتيجية"
                          />
                        </span>
                      </div>

                      <button className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand-primary)] hover:underline decoration-2 underline-offset-8 font-[Metropolis]">
                        View Case Study →
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeUp>
  );
};

// ─── Section 6: Pipeline ──────────────────────────────────────────────────────

const PipelineSection = () => (
  <section className="bg-[#FBFBFB] py-32 lg:py-48 px-6 lg:px-16 overflow-hidden border-t border-black/[0.03]">
    <div className="max-w-[1600px] mx-auto">
      {/* Header with enhanced, high-precision editorial layout */}
      <FadeUp>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--brand-primary)]"></span>
              </span>
              <SectionLabel en="Pipeline Alpha" ar="قيد التنفيذ" />
            </div>
            <h2 className="text-6xl lg:text-8xl font-light tracking-tighter text-black leading-[0.85]">
              <BilingualText en="The Next Wave." ar="الموجة القادمة." />
            </h2>
            <p className="text-xl text-black/60 mt-8 max-w-xl font-medium leading-relaxed font-[Metropolis]">
              <BilingualText
                en="Our active deal flow is focused on identifying the next generation of culture-defining F&B brands."
                ar="نركز حاليًا على تحديد الجيل القادم من العلامات التجارية الرائدة في قطاع الأغذية والمشروبات."
              />
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3 flex-shrink-0">
            <p className="text-[12px] font-bold uppercase tracking-[0.4em] text-black/30 font-[Metropolis]">
              <BilingualText en="Institutional Grade" ar="معايير مؤسسية" />
            </p>
            <div className="h-[2px] w-48 bg-black/5" />
          </div>
        </div>
      </FadeUp>

      {/* Grid: Fully enabled, premium cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pipeline.map((p, i) => (
          <PipelineCard key={i} p={p} index={i} />
        ))}
      </div>
    </div>
  </section>
);

const PipelineCard = ({ p, index }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  // Define the Apple-style color palette (Teal/Emerald base with warm gold accents)
  const gradientStyle = {
    "--gradient-col-1": "hsla(180, 50%, 50%, 0.7)", // Teal
    "--gradient-col-2": "hsla(140, 60%, 40%, 0.8)", // Emerald
    "--gradient-col-3": "hsla(40, 100%, 70%, 0.4)", // Gold
    "--mouse-x": `${mousePosition.x}px`,
    "--mouse-y": `${mousePosition.y}px`,
  };

  return (
    <FadeUp delay={index * 0.1}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        style={gradientStyle}
        className={cn(
          "group relative rounded-[3rem] p-10 lg:p-12 flex flex-col justify-between min-h-[400px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "bg-white border border-black/5",
          "shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]",
          // Enhanced interaction: slightly larger scale and deep shadow
          "hover:shadow-[0_80px_100px_-20px_rgba(0,0,0,0.15)] hover:scale-[1.03]",
        )}
      >
        {/* Apple-style Multi-Layer Volumetric 3D Gradient (Fluid and Dynamic) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out pointer-events-none">
          {/* Layer 1: The shifting base color flow */}
          <div
            className="absolute inset-0 z-0 animate-[fluidGradient_15s_ease_infinite]"
            style={{
              background:
                "linear-gradient(-45deg, var(--gradient-col-1), var(--gradient-col-2), var(--gradient-col-1))",
              backgroundSize: "400% 400%",
              filter: "blur(10px)",
            }}
          />
          {/* Layer 2: The mouse-tracked highlight portal (creates the 3D 'depth') */}
          <div
            className="absolute z-10 w-[600px] h-[600px] rounded-full blur-[80px]"
            style={{
              left: "calc(var(--mouse-x) - 300px)",
              top: "calc(var(--mouse-y) - 300px)",
              background:
                "radial-gradient(circle, var(--gradient-col-3), transparent 70%)",
            }}
          />
        </div>

        {/* Content Container (Needs higher Z-index than the gradient) */}
        <div className="relative z-20 flex flex-col h-full justify-between">
          {/* Top: Metadata Bar (Enhanced) */}
          <div className="flex items-center justify-between mb-12">
            <div className="px-4 py-1.5 rounded-full border border-black/5 bg-white/60 backdrop-blur-md shadow-inner">
              <span className="text-[11px] font-bold tracking-widest text-black/50 uppercase group-hover:text-black transition-colors font-[Metropolis]">
                {p.code}
              </span>
            </div>

            {/* Status Chip (Enhanced) */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[var(--brand-primary)]/5 text-[var(--brand-primary)] border border-[var(--brand-primary)]/10 font-[Metropolis]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] animate-pulse" />
              <BilingualText en={p.status.en} ar={p.status.ar} />
            </div>
          </div>

          {/* Middle: Brand Hint (Fully Revealed with improved typography) */}
          <div className="flex-1 space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-4xl font-light tracking-tighter text-black leading-tight group-hover:text-[var(--brand-primary)] transition-colors">
                <BilingualText en={p.hint.en} ar={p.hint.ar} />
              </h4>
              <div className="flex flex-wrap gap-2 pt-2">
                {/* Visual tags (Simplified for cleaner aesthetic) */}
                <span className="text-[10px] font-bold text-black/50 uppercase tracking-tight bg-black/[0.04] px-2.5 py-1 rounded font-[Metropolis]">
                  Riyadh
                </span>
                <span className="text-[10px] font-bold text-black/50 uppercase tracking-tight bg-black/[0.04] px-2.5 py-1 rounded font-[Metropolis]">
                  Fast-Casual
                </span>
              </div>
            </motion.div>
          </div>

          {/* Bottom: Quarter + Enhanced Action Arrow */}
          <div className="mt-12 flex items-center justify-between border-t border-black/[0.05] pt-8 group-hover:border-[var(--brand-primary)]/20 transition-colors duration-500">
            <div>
              <p className="text-[10px] font-bold text-black/30 uppercase tracking-[0.3em] mb-1 font-[Metropolis]">
                Target Launch
              </p>
              <p className="text-base font-bold text-black font-[Metropolis]">{p.quarter}</p>
            </div>

            {/* The Arrow Button is now always present but only reveals details on hover */}
            <div className="relative w-12 h-12 rounded-full border border-black/10 group-hover:border-[var(--brand-primary)]/20 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden">
              {/* This inner part slides and scales on hover */}
              <div className="absolute inset-0 bg-black scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 shadow-xl" />
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="relative z-10 text-black group-hover:text-white transition-colors duration-500"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Subtle Brand Watermark (Reduced opacity further to merge with the gradient) */}
        <div className="absolute bottom-6 right-10 text-[3rem] font-bold text-black/[0.005] pointer-events-none select-none">
          FLVR
        </div>
      </div>
    </FadeUp>
  );
};

// ─── Section 7: Partner CTA ───────────────────────────────────────────────────
const PartnerCTASection = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSent(true);
    }
  };

  return (
    <section className="bg-[var(--brand-primary)] py-32 lg:py-40 px-6 lg:px-16 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white blur-[120px]" />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <FadeUp>
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/50 mb-6 font-[Metropolis]">
              <BilingualText en="Partner with FLVR" ar="الشراكة مع فليفر" />
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tighter leading-[1.1] mb-8">
              <BilingualText
                en={
                  <>
                    We are actively
                    <br />
                    seeking co-investors
                    <br />
                    and franchise partners.
                  </>
                }
                ar={
                  <>
                    نبحث بنشاط عن
                    <br />
                    شركاء في الاستثمار
                    <br />
                    والامتياز التجاري.
                  </>
                }
              />
            </h2>
            <p className="text-white/60 text-base leading-relaxed max-w-md font-[Metropolis]">
              <BilingualText
                en="Open allocations available for Q4 2026. Minimum ticket SAR 500K. Strategic partners with F&B operating experience preferred."
                ar="تخصيصات مفتوحة متاحة للربع الرابع من ٢٠٢٦. الحد الأدنى للاستثمار ٥٠٠ ألف ريال. يُفضل الشركاء الاستراتيجيون ذوو الخبرة التشغيلية."
              />
            </p>
          </FadeUp>

          {/* Right */}
          <FadeUp delay={0.15}>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/15">
              {!sent ? (
                <>
                  <h3 className="text-white text-xl font-light mb-2">
                    <BilingualText
                      en="Request Partnership Deck"
                      ar="طلب ملف الشراكة"
                    />
                  </h3>
                  <p className="text-white/50 text-sm mb-8 font-[Metropolis]">
                    <BilingualText
                      en="Receive our full investor package within 24 hours."
                      ar="استلم حزمة المستثمر الكاملة خلال ٢٤ ساعة."
                    />
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full name"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-white/40 transition-colors font-[Metropolis]"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Business email"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-white/40 transition-colors font-[Metropolis]"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Organization / Fund name"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-white/40 transition-colors font-[Metropolis]"
                    />
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-white text-[var(--brand-primary)] font-bold text-sm py-4 rounded-xl tracking-wide hover:bg-white/90 transition-colors font-[Metropolis]"
                    >
                      <BilingualText en="Send Request →" ar="إرسال الطلب ←" />
                    </motion.button>
                  </form>
                  <p className="text-white/25 text-[10px] text-center mt-4 tracking-wide font-[Metropolis]">
                    <BilingualText
                      en="Your information is kept strictly confidential."
                      ar="معلوماتك تُحفظ بسرية تامة."
                    />
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-light mb-3">
                    <BilingualText
                      en="Request received."
                      ar="تم استلام طلبك."
                    />
                  </h3>
                  <p className="text-white/50 text-sm font-[Metropolis]">
                    <BilingualText
                      en="Our team will reach out within 24 hours."
                      ar="سيتواصل معك فريقنا خلال ٢٤ ساعة."
                    />
                  </p>
                </motion.div>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <PageWrapper noPadding>
      <div className="relative bg-[var(--bg-primary)]">
        <HeroSection />
        <ThesisSection />
        <PortfolioGridSection />
        <MetricsSection />
        <BrandDeepDiveSection />
        <PipelineSection />
        <PartnerCTASection />
      </div>
    </PageWrapper>
  );
}
