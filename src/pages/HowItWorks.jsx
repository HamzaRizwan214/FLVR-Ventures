import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import BilingualText from "../components/BilingualText";
import { cn } from "@/lib/utils";

// ─── 3D object PNGs (transparent background, editorial F&B / venture feel) ───
const OBJECTS = {
  filter:
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600&auto=format&fit=crop", // glass/lens
  lift: "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=80&w=600&auto=format&fit=crop", // upward object
  validate:
    "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=600&auto=format&fit=crop", // geometric solid
  run: "https://images.unsplash.com/photo-1542621334-a254cf47733d?q=80&w=600&auto=format&fit=crop", // motion/speed
};

// Curated 3D-style object images that feel premium
const CARD_IMGS = {
  filter:
    "https://images.unsplash.com/photo-1567361808960-dec9cb578182?q=80&w=500&auto=format&fit=crop",
  lift: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500&auto=format&fit=crop",
  validate:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop",
  run: "https://images.unsplash.com/photo-1526628953301-3cd24e28e08e?q=80&w=500&auto=format&fit=crop",
};

// ─── Step card data ───────────────────────────────────────────────────────────
const methodology = [
  {
    step: "01",
    key: "filter",
    title: { en: "Filter", ar: "تصفية" },
    sub: { en: "Concept Selection", ar: "اختيار المفهوم" },
    desc: {
      en: "Identify concepts with real relevance, repeat demand, and room to lead the market.",
      ar: "تحديد المفاهيم ذات الأهمية الحقيقية والطلب المتكرر ومساحة لقيادة السوق.",
    },
    cardBg: "#0b7285",
    criteria: [
      {
        label: { en: "Consumer repeat appeal", ar: "جاذبية متكررة" },
        pass: true,
      },
      {
        label: { en: "Category white space", ar: "فجوة في الفئة" },
        pass: true,
      },
      {
        label: { en: "Unit economics viability", ar: "جدوى اقتصاديات الوحدة" },
        pass: true,
      },
      { label: { en: "Founder conviction", ar: "قناعة المؤسس" }, pass: false },
    ],
    stats: [
      {
        val: "200+",
        label: { en: "Concepts reviewed", ar: "مفهوم تمت مراجعته" },
      },
      { val: "12%", label: { en: "Selection rate", ar: "معدل الاختيار" } },
    ],
  },
  {
    step: "02",
    key: "lift",
    title: { en: "Lift", ar: "رفع" },
    sub: { en: "Brand & Model Build", ar: "بناء العلامة والنموذج" },
    desc: {
      en: "Strengthen the brand, business model, and operating foundation for aggressive scale.",
      ar: "تعزيز العلامة التجارية ونموذج العمل والأساس التشغيلي للتوسع الجريء.",
    },
    cardBg: "#1a1a1a",
    metrics: [
      {
        label: { en: "Brand clarity score", ar: "وضوح العلامة" },
        from: 42,
        to: 91,
        unit: "%",
      },
      {
        label: { en: "Unit margin", ar: "هامش الوحدة" },
        from: 18,
        to: 34,
        unit: "%",
      },
      {
        label: { en: "NPS baseline", ar: "مؤشر الولاء" },
        from: 31,
        to: 72,
        unit: "",
      },
    ],
    pillars: [
      { en: "Identity & naming", ar: "الهوية والتسمية" },
      { en: "Menu architecture", ar: "هيكل القائمة" },
      { en: "Operating playbook", ar: "دليل التشغيل" },
      { en: "P&L restructuring", ar: "إعادة هيكلة الربح والخسارة" },
    ],
  },
  {
    step: "03",
    key: "validate",
    title: { en: "Validate", ar: "التحقق" },
    sub: { en: "Proof of Concept", ar: "إثبات المفهوم" },
    desc: {
      en: "Prove the concept through unit economics, market traction, and flawless execution.",
      ar: "إثبات المفهوم من خلال اقتصاديات الوحدة، والجاذبية في السوق، والتنفيذ المثالي.",
    },
    cardBg: "#ff6b6b",
    kpis: [
      {
        label: { en: "Repeat visit rate", ar: "معدل الزيارة المتكررة" },
        val: "68%",
        icon: "↩",
      },
      {
        label: { en: "COGS efficiency", ar: "كفاءة تكلفة المبيعات" },
        val: "29%",
        icon: "▼",
      },
      {
        label: { en: "Break-even timeline", ar: "نقطة التعادل" },
        val: "7 mo.",
        icon: "◷",
      },
      {
        label: { en: "Customer LTV", ar: "قيمة العميل" },
        val: "SAR 2.1k",
        icon: "↑",
      },
    ],
  },
  {
    step: "04",
    key: "run",
    title: { en: "Run", ar: "تنفيذ" },
    sub: { en: "Expansion Engine", ar: "محرك التوسع" },
    desc: {
      en: "Accelerate growth through disciplined expansion and sustainable brand momentum.",
      ar: "تسريع النمو من خلال التوسع المنضبط وزخم العلامة التجارية المستدام.",
    },
    cardBg: "#0f4c5c",
    locations: [
      { city: { en: "Riyadh", ar: "الرياض" }, count: 12, active: true },
      { city: { en: "Jeddah", ar: "جدة" }, count: 6, active: true },
      { city: { en: "Dammam", ar: "الدمام" }, count: 4, active: false },
      { city: { en: "NEOM", ar: "نيوم" }, count: 2, active: false },
    ],
    growth: {
      label: { en: "YoY Revenue Growth", ar: "نمو الإيرادات سنوياً" },
      val: "3.4×",
    },
  },
];

// ─── Shared ───────────────────────────────────────────────────────────────────
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Visual Card Components ───────────────────────────────────────────────────

/** Card 01 — Filter: checklist + pass/fail */
const FilterCard = ({ item }) => (
  <div
    className="relative rounded-2xl overflow-hidden p-8 flex flex-col justify-between h-full w-full"
    style={{ background: item.cardBg }}
  >
    {/* Header */}
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-1 font-bold font-[Metropolis]">
          <BilingualText en="Screening criteria" ar="معايير الفرز" />
        </p>
        <p className="text-white text-lg font-bold tracking-tight font-[Metropolis]">
          <BilingualText en="Concept scorecard" ar="بطاقة تقييم المفهوم" />
        </p>
      </div>
      <span className="text-[9px] border border-white/20 text-white/40 rounded-full px-3 py-1 uppercase tracking-wider font-bold font-[Metropolis]">
        {item.step}
      </span>
    </div>

    {/* Criteria list */}
    <div className="flex flex-col gap-3 my-6">
      {item.criteria.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 bg-white/8 rounded-xl px-4 py-3"
        >
          <span
            className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 font-[Metropolis]",
              c.pass
                ? "bg-emerald-400/20 text-emerald-300"
                : "bg-red-400/20 text-red-300",
            )}
          >
            {c.pass ? "✓" : "○"}
          </span>
          <span className="text-white/70 text-xs leading-tight font-bold font-[Metropolis]">
            <BilingualText en={c.label.en} ar={c.label.ar} />
          </span>
          <span
            className={cn(
              "ml-auto text-[9px] uppercase tracking-wider font-bold font-[Metropolis]",
              c.pass ? "text-emerald-400" : "text-white/25",
            )}
          >
            {c.pass ? "Pass" : "TBD"}
          </span>
        </motion.div>
      ))}
    </div>

    {/* Bottom stats */}
    <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
      {item.stats.map((s, i) => (
        <div key={i}>
          <p className="text-2xl font-bold text-white tracking-tighter font-[Metropolis]">
            {s.val}
          </p>
          <p className="text-[9px] uppercase tracking-wider text-white/35 mt-0.5 font-bold font-[Metropolis]">
            <BilingualText en={s.label.en} ar={s.label.ar} />
          </p>
        </div>
      ))}
    </div>

    {/* 3D object — abstract glass sphere */}
    {/* <div className="absolute -bottom-8 -right-8 w-40 h-40 opacity-20 pointer-events-none">
      <img
        src={CARD_IMGS.filter}
        alt=""
        className="w-full h-full object-cover rounded-full mix-blend-luminosity"
      />
    </div> */}
    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
  </div>
);

/** Card 02 — Lift: animated metric bars */
const LiftCard = ({ item }) => (
  <div
    className="relative rounded-2xl overflow-hidden p-8 flex flex-col justify-between h-full w-full"
    style={{ background: item.cardBg }}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-1 font-bold font-[Metropolis]">
          <BilingualText en="Before → After" ar="قبل ← بعد" />
        </p>
        <p className="text-white text-lg font-bold tracking-tight font-[Metropolis]">
          <BilingualText
            en="Brand elevation metrics"
            ar="مقاييس ارتقاء العلامة"
          />
        </p>
      </div>
      <span className="text-[9px] border border-white/20 text-white/40 rounded-full px-3 py-1 uppercase tracking-wider font-bold font-[Metropolis]">
        {item.step}
      </span>
    </div>

    {/* Metric bars */}
    <div className="flex flex-col gap-5 my-6">
      {item.metrics.map((m, i) => (
        <div key={i}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/60 font-bold font-[Metropolis]">
              <BilingualText en={m.label.en} ar={m.label.ar} />
            </span>
            <div className="flex items-center gap-2 text-[10px] font-bold font-[Metropolis]">
              <span className="text-white/30">
                {m.from}
                {m.unit}
              </span>
              <span className="text-white/20">→</span>
              <span className="text-emerald-400 font-bold">
                {m.to}
                {m.unit}
              </span>
            </div>
          </div>
          <div className="relative h-1.5 rounded-full bg-white/10">
            {/* From bar */}
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-white/20"
              style={{ width: `${m.from}%` }}
            />
            {/* To bar — animated */}
            <motion.div
              initial={{ width: `${m.from}%` }}
              whileInView={{ width: `${m.to}%` }}
              transition={{
                duration: 1,
                delay: 0.2 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              className="absolute left-0 top-0 h-full rounded-full bg-emerald-400"
            />
          </div>
        </div>
      ))}
    </div>

    {/* Pillars */}
    <div className="flex flex-wrap gap-2 border-t border-white/10 pt-5">
      {item.pillars.map((p, i) => (
        <span
          key={i}
          className="text-[9px] uppercase tracking-[0.15em] border border-white/15 text-white/45 rounded-full px-3 py-1 font-bold font-[Metropolis]"
        >
          <BilingualText en={p.en} ar={p.ar} />
        </span>
      ))}
    </div>

    {/* 3D object */}
    {/* <div className="absolute -bottom-10 -right-6 w-44 h-44 opacity-[0.12] pointer-events-none">
      <img
        src={CARD_IMGS.lift}
        alt=""
        className="w-full h-full object-cover mix-blend-luminosity"
        style={{ borderRadius: "2rem" }}
      />
    </div> */}
    <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-emerald-500/10 pointer-events-none" />
  </div>
);

/** Card 03 — Validate: KPI grid */
const ValidateCard = ({ item }) => (
  <div
    className="relative rounded-2xl overflow-hidden p-8 flex flex-col justify-between h-full w-full"
    style={{ background: item.cardBg }}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-1 font-bold font-[Metropolis]">
          <BilingualText en="Live KPIs" ar="المؤشرات الحية" />
        </p>
        <p className="text-white text-lg font-bold tracking-tight font-[Metropolis]">
          <BilingualText en="Validation dashboard" ar="لوحة التحقق" />
        </p>
      </div>
      <span className="text-[9px] border border-white/20 text-white/40 rounded-full px-3 py-1 uppercase tracking-wider font-bold font-[Metropolis]">
        {item.step}
      </span>
    </div>

    {/* KPI 2×2 grid */}
    <div className="grid grid-cols-2 gap-3 my-6">
      {item.kpis.map((k, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08 * i, duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white/10 rounded-2xl p-4"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-white/30 text-base">{k.icon}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1" />
          </div>
          <p className="text-xl font-bold text-white tracking-tighter mb-1 font-[Metropolis]">
            {k.val}
          </p>
          <p className="text-[9px] uppercase tracking-[0.12em] text-white/45 leading-tight font-bold font-[Metropolis]">
            <BilingualText en={k.label.en} ar={k.label.ar} />
          </p>
        </motion.div>
      ))}
    </div>

    {/* Status bar */}
    <div className="flex items-center gap-3 border-t border-white/15 pt-5">
      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-bold font-[Metropolis]">
        <BilingualText
          en="Concept validated — proceed to scale"
          ar="المفهوم محقق — المضي في التوسع"
        />
      </span>
    </div>

    {/* 3D object */}
    {/* <div className="absolute -bottom-6 -right-6 w-36 h-36 opacity-[0.15] pointer-events-none">
      <img
        src={CARD_IMGS.validate}
        alt=""
        className="w-full h-full object-cover mix-blend-luminosity rounded-2xl"
      />
    </div> */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
  </div>
);

/** Card 04 — Run: location rollout */
const RunCard = ({ item }) => (
  <div
    className="relative rounded-2xl overflow-hidden p-8 flex flex-col justify-between h-full w-full"
    style={{ background: item.cardBg }}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-1 font-bold font-[Metropolis]">
          <BilingualText en="Expansion map" ar="خريطة التوسع" />
        </p>
        <p className="text-white text-lg font-bold tracking-tight font-[Metropolis]">
          <BilingualText en="Growth rollout" ar="خطة انطلاق النمو" />
        </p>
      </div>
      <span className="text-[9px] border border-white/20 text-white/40 rounded-full px-3 py-1 uppercase tracking-wider font-bold font-[Metropolis]">
        {item.step}
      </span>
    </div>

    {/* Location rows */}
    <div className="flex flex-col gap-2 my-6">
      {item.locations.map((loc, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 * i, duration: 0.5 }}
          viewport={{ once: true }}
          className={cn(
            "flex items-center justify-between rounded-xl px-4 py-3",
            loc.active ? "bg-white/12" : "bg-white/5",
          )}
        >
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full flex-shrink-0",
                loc.active ? "bg-emerald-400" : "bg-white/20",
              )}
            />
            <span
              className={cn(
                "text-sm font-bold font-[Metropolis]",
                loc.active ? "text-white" : "text-white/35",
              )}
            >
              <BilingualText en={loc.city.en} ar={loc.city.ar} />
            </span>
          </div>
          <div className="flex items-center gap-3 font-bold font-[Metropolis]">
            <span
              className={cn(
                "text-sm tabular-nums",
                loc.active ? "text-white" : "text-white/25",
              )}
            >
              {loc.count}
            </span>
            <span className="text-[8px] uppercase tracking-wider text-white/25">
              {loc.active ? "Live" : "Pipeline"}
            </span>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Growth stat */}
    <div className="border-t border-white/10 pt-5 flex items-end justify-between">
      <div>
        <p className="text-[9px] uppercase tracking-[0.2em] text-white/35 mb-1 font-bold font-[Metropolis]">
          <BilingualText en={item.growth.label.en} ar={item.growth.label.ar} />
        </p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white tracking-tighter font-[Metropolis]"
        >
          {item.growth.val}
        </motion.p>
      </div>
      <div className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center">
        <svg
          className="w-5 h-5 text-white/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      </div>
    </div>

    {/* 3D object */}
    {/* <div className="absolute -bottom-8 -right-8 w-44 h-44 opacity-[0.12] pointer-events-none">
      <img
        src={CARD_IMGS.run}
        alt=""
        className="w-full h-full object-cover mix-blend-luminosity rounded-3xl"
      />
    </div> */}
    {/* Ambient glow */}
    <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[var(--brand-primary)]/15 blur-3xl pointer-events-none" />
  </div>
);

const CARD_MAP = {
  filter: FilterCard,
  lift: LiftCard,
  validate: ValidateCard,
  run: RunCard,
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <PageWrapper>
      <div className="w-full flex flex-col pt-24 pb-48 bg-[#FAFAFA]">
        {/* ── Section 1: Hero ──────────────────────────────────────────────── */}
        <section className="container mx-auto px-6 lg:px-12 mb-32 max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--brand-primary)] mb-6 font-[Metropolis]">
              <BilingualText en="The FLVR Protocol" ar="بروتوكول فليفر" />
            </p>
            <h1 className="text-5xl md:text-8xl font-light tracking-tighter text-black leading-[0.9] mb-12">
              <BilingualText
                en="Scaling is never accidental."
                ar="التوسع ليس صدفة أبداً."
              />
            </h1>
            <p className="text-xl md:text-3xl text-black/50 font-medium leading-relaxed max-w-3xl font-[Metropolis]">
              <BilingualText
                en="We combine strategic judgment and operating discipline to help promising concepts earn the right to scale."
                ar="نجمع بين الحكم الاستراتيجي والانضباط التشغيلي لمساعدة الأفكار الواعدة على كسب الحق في التوسع."
              />
            </p>
          </motion.div>
        </section>

        {/* ── Section 2: Steps + Visual Cards ──────────────────────────────── */}
        <section ref={containerRef} className="relative mb-48">
          <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
            {/* Vertical line — desktop only */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-black/6 -translate-x-1/2 z-0" />
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--brand-primary)] -translate-x-1/2 origin-top z-10"
            />

            <div className="flex flex-col gap-24 lg:gap-32">
              {methodology.map((item, idx) => {
                const isEven = idx % 2 === 1;
                const CardComponent = CARD_MAP[item.key];

                return (
                  <div
                    key={idx}
                    className={cn(
                      "relative grid grid-cols-1 items-center",
                      isEven
                        ? "lg:grid-cols-[1.4fr_80px_0.6fr]"
                        : "lg:grid-cols-[0.6fr_80px_1.4fr]",
                    )}
                  >
                    {/* ── Text Slot ── */}
                    <div
                      className={cn(
                        "z-10",
                        isEven ? "lg:order-3 lg:pl-12" : "lg:order-1 lg:pr-12",
                      )}
                    >
                      <FadeUp delay={0.05}>
                        <StepText
                          item={item}
                          align={isEven ? "left" : "right"}
                        />
                      </FadeUp>
                    </div>

                    {/* ── Center Bubble ── */}
                    <div className="hidden lg:flex order-2 items-center justify-center z-20">
                      <motion.div
                        whileInView={{ scale: [0, 1.15, 1], opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="w-16 h-16 rounded-full bg-white border border-black/8 shadow-xl flex items-center justify-center"
                      >
                        <span className="text-xs font-bold text-[var(--brand-primary)] font-[Metropolis]">
                          {item.step}
                        </span>
                      </motion.div>
                    </div>

                    {/* ── Card Slot ── */}
                    <div
                      className={cn(
                        "z-10",
                        isEven ? "lg:order-1 lg:pr-8" : "lg:order-3 lg:pl-8",
                      )}
                    >
                      <FadeUp delay={0.1}>
                        <div className="max-w-xl mx-auto lg:max-w-none">
                          <CardComponent item={item} />
                        </div>
                      </FadeUp>
                    </div>

                    {/* Mobile: step indicator */}
                    <div className="lg:hidden flex items-center gap-4 order-first mb-8">
                      <div className="w-10 h-10 rounded-full bg-white border border-black/8 shadow flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-[var(--brand-primary)] font-[Metropolis]">
                          {item.step}
                        </span>
                      </div>
                      <div className="h-px flex-1 bg-black/6" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Section 3: Fund Card ─────────────────────────────────────────── */}
        <section className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-[3rem] p-10 md:p-20 border border-black/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] relative overflow-hidden"
          >
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--brand-primary)] mb-6 font-[Metropolis]">
                  <BilingualText en="The Capital Arm" ar="ذراع رأس المال" />
                </p>
                <h3 className="text-4xl md:text-6xl font-light tracking-tighter text-[var(--brand-primary)] mb-8">
                  <BilingualText en="FLVR Fund I" ar="صندوق فليفر ١" />
                </h3>
                <div className="flex flex-wrap gap-3 font-[Metropolis]">
                  <span className="px-4 py-1.5 rounded-full border border-[var(--brand-primary)]/20 text-[var(--brand-primary)] text-[10px] font-bold uppercase tracking-widest">
                    Growth Equity
                  </span>
                  <span className="px-4 py-1.5 rounded-full border border-black/10 text-black/40 text-[10px] font-bold uppercase tracking-widest">
                    Saudi Focus
                  </span>
                  <span className="px-4 py-1.5 rounded-full border border-black/10 text-black/40 text-[10px] font-bold uppercase tracking-widest">
                    SAR 20M
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-black leading-snug font-medium font-[Metropolis]">
                  <BilingualText
                    en="We back founder-led concepts with the potential to become category leaders."
                    ar="ندعم المفاهيم التي يقودها المؤسسون والمهيأة لتصبح رائدة في فئتها."
                  />
                </p>
                <p className="text-base text-black/45 leading-relaxed font-medium font-[Metropolis]">
                  <BilingualText
                    en="Turning early traction into enduring scale takes more than momentum. It takes the right capital, sharper structure, and a clear growth playbook."
                    ar="تحويل النجاح الأولي إلى توسع مستدام يتطلب أكثر من مجرد زخم. يتطلب رأس المال المناسب وهيكل أقوى وخطة نمو واضحة."
                  />
                </p>
                <div className="grid grid-cols-3 gap-6 pt-4 border-t border-black/5">
                  {[
                    {
                      val: "SAR 20M",
                      label: { en: "Fund size", ar: "حجم الصندوق" },
                    },
                    {
                      val: "4–6",
                      label: {
                        en: "Target portfolio",
                        ar: "المحفظة المستهدفة",
                      },
                    },
                    {
                      val: "5–7yr",
                      label: { en: "Investment horizon", ar: "أفق الاستثمار" },
                    },
                  ].map((s, i) => (
                    <div key={i}>
                      <p className="text-2xl font-bold text-[var(--brand-primary)] tracking-tight font-[Metropolis]">
                        {s.val}
                      </p>
                      <p className="text-[9px] uppercase tracking-[0.18em] text-black/35 mt-1 leading-snug font-bold font-[Metropolis]">
                        <BilingualText en={s.label.en} ar={s.label.ar} />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Watermark */}
            <div className="absolute top-8 right-12 text-[9rem] font-bold text-black/[0.018] pointer-events-none select-none leading-none">
              FLVR
            </div>
          </motion.div>
        </section>
      </div>
    </PageWrapper>
  );
}

// ─── Step text block ──────────────────────────────────────────────────────────
function StepText({ item, align }) {
  return (
    <div
      className={cn(
        "space-y-5",
        align === "right" ? "lg:text-right" : "lg:text-left",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          align === "right" ? "lg:justify-end" : "",
        )}
      >
        <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--brand-primary)]/60 font-bold font-[Metropolis]">
          <BilingualText en={item.sub.en} ar={item.sub.ar} />
        </p>
      </div>
      <h2 className="text-[clamp(3rem,6vw,5.5rem)] font-extralight tracking-[-0.04em] text-black leading-[0.88]">
        <BilingualText en={item.title.en} ar={item.title.ar} />
      </h2>
      <div
        className={cn(
          "h-px w-12 bg-[var(--brand-primary)]/30",
          align === "right" ? "lg:ml-auto" : "",
        )}
      />
      <p
        className="text-base md:text-lg text-black/45 leading-relaxed font-medium max-w-md font-[Metropolis]"
        style={{ marginLeft: align === "right" ? "auto" : undefined }}
      >
        <BilingualText en={item.desc.en} ar={item.desc.ar} />
      </p>
    </div>
  );
}
