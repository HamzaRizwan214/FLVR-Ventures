import React from "react";
import { motion } from "framer-motion";
import BilingualText from "./BilingualText";

// ─── Card Visuals ────────────────────────────────────────────────────────────

const FunnelVisual = () => {
  const stages = [
    { label: { en: "Ideation", ar: "الأفكار" }, count: 24, pct: 100 },
    { label: { en: "Validation", ar: "التحقق" }, count: 11, pct: 75 },
    { label: { en: "Build", ar: "البناء" }, count: 5, pct: 50 },
    { label: { en: "Launch", ar: "الإطلاق" }, count: 2, pct: 30 },
  ];
  return (
    <div className="w-full mt-4">
      <div className="flex flex-col gap-2">
        {stages.map((s, i) => (
          <motion.div
            key={i}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: `${s.pct}%`, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true }}
            className="relative h-12 rounded-xl flex items-center px-4 overflow-hidden group/bar"
            style={{
              background: `rgba(255,255,255,${0.85 + i * 0.75})`,
              backdropFilter: "blur(4px)",
            }}
          >
            <span className="text-sm text-[var(--text-primary)] font-medium flex-1">
              <BilingualText en={s.label.en} ar={s.label.ar} />
            </span>
            <span className="text-xs text-[var(--text-secondary)] font-semibold">
              {s.count}
            </span>
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--brand-primary)] opacity-0 group-hover/bar:opacity-30 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const BarChartVisual = () => {
  const bars = [
    { label: { en: "Growth", ar: "نمو" }, pct: 40, h: 140 },
    { label: { en: "Seed", ar: "بذرة" }, pct: 30, h: 100 },
    { label: { en: "Ops", ar: "تشغيل" }, pct: 20, h: 70 },
    { label: { en: "Reserve", ar: "احتياطي" }, pct: 10, h: 40 },
  ];
  return (
    <div className="w-full mt-6">
      <div className="flex items-end gap-3 h-[180px]">
        {bars.map((b, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 flex-1 group/bar"
          >
            <span className="text-xs text-[var(--text-secondary)] font-semibold">
              {b.pct}%
            </span>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: b.h, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true }}
              className="w-full rounded-2xl relative overflow-hidden"
              style={{
                background: "rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <div className="absolute inset-0 bg-[var(--brand-accent)] opacity-20 group-hover/bar:opacity-40 transition-opacity" />
            </motion.div>
            <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
              <BilingualText en={b.label.en} ar={b.label.ar} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ConceptReadinessVisual = () => {
  const concepts = [
    {
      name: { en: "Specialty Coffee", ar: "قهوة متخصصة" },
      fill: 92,
      tag: { en: "Ready", ar: "جاهز" },
    },
    {
      name: { en: "Fast Casual Grill", ar: "مشاوي سريعة" },
      fill: 78,
      tag: { en: "Ready", ar: "جاهز" },
    },
    {
      name: { en: "Dessert Lounge", ar: "صالون حلويات" },
      fill: 55,
      tag: { en: "In Dev", ar: "بالتطوير" },
    },
    {
      name: { en: "Cloud Kitchen", ar: "مطبخ سحابي" },
      fill: 30,
      tag: { en: "Pilot", ar: "تجريبي" },
    },
  ];
  return (
    <div className="w-full mt-6">
      <div className="flex flex-col gap-3">
        {concepts.map((c, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-3 border border-black/5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[var(--text-primary)] font-medium leading-none">
                <BilingualText en={c.name.en} ar={c.name.ar} />
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[var(--text-muted)] font-bold">
                <BilingualText en={c.tag.en} ar={c.tag.ar} />
              </span>
            </div>
            <div className="w-full h-1 rounded-full bg-black/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${c.fill}%` }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
                className="h-full rounded-full bg-[var(--brand-primary)]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatPillsVisual = () => {
  const stats = [
    { num: "12+", desc: { en: "Partners", ar: "شراكات" } },
    { num: "3×", desc: { en: "Growth", ar: "نمو" } },
    { num: "6", desc: { en: "Verticals", ar: "قطاعات" } },
    { num: "48h", desc: { en: "Delivery", ar: "تسليم" } },
  ];
  return (
    <div className="w-full mt-6">
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-black/5 shadow-sm"
          >
            <div className="text-3xl font-light text-[var(--text-primary)] leading-none tracking-tighter">
              {s.num}
            </div>
            <div className="text-[11px] text-[var(--text-secondary)] mt-2 uppercase tracking-widest font-medium">
              <BilingualText en={s.desc.en} ar={s.desc.ar} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── Card Config ─────────────────────────────────────────────────────────────

const bentoItems = [
  {
    title: { en: "Venture Studio", ar: "استوديو المشاريع" },
    desc: {
      en: "We identify white spaces and build concepts from the ground up, combining internal expertise with founder hustle.",
      ar: "نحدد الفجوات السوقية ونبني المفاهيم من الصفر، جامعاً بين خبرتنا الداخلية وطموح المؤسس.",
    },
    tag: { en: "Incubation", ar: "احتضان" },
    gridClass: "md:col-span-2 md:row-span-2 text-black",
    gradient:
      "linear-gradient(135deg, rgba(11, 114, 133, 0.22) 0%, rgba(255, 255, 255, 0.8) 100%)",
    aura: "bg-[#0b7285]",
    accent: "bg-[#0b7285]",
    metrics: [
      { label: { en: "Active Concepts", ar: "مفاهيم نشطة" }, value: "12+" },
      { label: { en: "Avg. Launch", ar: "متوسط الإطلاق" }, value: "4.2mo" },
      { label: { en: "Success Rate", ar: "نسبة النجاح" }, value: "75%" },
    ],
    infoGrid: [
      {
        title: { en: "Market Research", ar: "أبحاث السوق" },
        desc: {
          en: "Extensive data-driven gap analysis identifies white spaces in the F&B market, ensuring every concept meets demand.",
          ar: "تحليل فجوات مكثف يحدد المساحات البيضاء في سوق الأغذية والمشروبات، مما يضمن تلبية كل مفاهيمنا للطلب.",
        },
      },
      {
        title: { en: "Equity Focus", ar: "تركيز الملكية" },
        desc: {
          en: "We align with founders through an equity-led model, focusing on long-term value creation and sustainability.",
          ar: "نتوافق مع المؤسسين من خلال نموذج ملكية، مع التركيز على خلق قيمة طويلة الأجل والاستدامة.",
        },
      },
      {
        title: { en: "Shared Services", ar: "خدمات مشتركة" },
        desc: {
          en: "Concepts gain access to our world-class operational engine, including supply chain and growth infrastructure.",
          ar: "تكتسب المفاهيم وصولاً إلى محركنا التشغيلي العالمي، بما في ذلك سلاسل التوريد وبنية النمو.",
        },
      },
      {
        title: { en: "Seed Funding", ar: "تمويل أولي" },
        desc: {
          en: "We provide the initial capital required to launch and validate concepts swiftly before larger scale-up rounds.",
          ar: "نوفر رأس المال الأولي المطلوب لإطلاق وتحقق المفاهيم بسرعة قبل جولات التوسع الأكبر.",
        },
      },
    ],
    Visual: FunnelVisual,
  },
  {
    title: { en: "FLVR Fund I", ar: "صندوق فليفر 1" },
    desc: {
      en: "Providing the capital and strategic oversight to help breakout brands reach national scale.",
      ar: "توفير رأس المال والإشراف الاستراتيجي لمساعدة العلامات التجارية المتميزة.",
    },
    tag: { en: "Capital", ar: "رأس المال" },
    gridClass: "md:col-span-2 md:row-span-1 text-black",
    gradient:
      "linear-gradient(135deg, rgba(255, 107, 107, 0.22) 0%, rgba(255, 255, 255, 0.8) 100%)",
    aura: "bg-[#ff6b6b]",
    accent: "bg-[#ff6b6b]",
    Visual: BarChartVisual,
  },
  {
    title: { en: "Off-Shelf Concepts", ar: "مفاهيم جاهزة للتشغيل" },
    desc: {
      en: "Validated brand frameworks ready for deployment by strategic partners.",
      ar: "أطر عمل لعلامات تجارية مثبتة جاهزة للتنفيذ.",
    },
    tag: { en: "Frameworks", ar: "أطر عمل" },
    gridClass: "md:col-span-1 md:row-span-1 text-black",
    gradient:
      "linear-gradient(135deg, rgba(255, 212, 59, 0.28) 0%, rgba(255, 255, 255, 0.8) 100%)",
    aura: "bg-[#ffd43b]",
    accent: "bg-[#ffd43b]",
    Visual: ConceptReadinessVisual,
  },
  {
    title: { en: "FLVR Services", ar: "خدمات فليفر" },
    desc: {
      en: "Access to our shared best-in-class operational engine to accelerate growth infrastructure.",
      ar: "الوصول إلى محركنا التشغيلي المشترك الأفضل في فئته.",
    },
    tag: { en: "Operations", ar: "العمليات" },
    gridClass: "md:col-span-1 md:row-span-1 text-black",
    gradient:
      "linear-gradient(135deg, rgba(132, 94, 247, 0.22) 0%, rgba(255, 255, 255, 0.8) 100%)",
    aura: "bg-[#845ef7]",
    accent: "bg-[#0b7285]",
    Visual: StatPillsVisual,
  },
];

// ─── Section ─────────────────────────────────────────────────────────────────

export default function BentoValueSection() {
  return (
    <section className="py-32 bg-[var(--bg-primary)] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-4xl mb-16">
          <p className="text-[var(--brand-primary)] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            <BilingualText en="Platform Ecosystem" ar="نظام المنصة" />
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter text-[var(--text-primary)] leading-[1.1]">
            <BilingualText
              en="Turning High-Potential Concepts into Shareholder Value Drivers"
              ar="تحويل المفاهيم عالية الإمكانات إلى محركات قيمة للمساهمين"
            />
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:min-h-[850px]">
          {bentoItems.map((item, i) => {
            const Visual = item.Visual;
            return (
              <div
                key={i}
                style={{ background: item.gradient }}
                className={`group relative overflow-hidden rounded-[2.5rem] border border-black/5 p-8 lg:p-10 flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 backdrop-blur-xl ${item.gridClass}`}
              >
                {/* Header */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${item.accent}`}
                    />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[var(--text-muted)]">
                      <BilingualText en={item.tag.en} ar={item.tag.ar} />
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light text-[var(--text-primary)] tracking-tighter mb-3">
                    <BilingualText en={item.title.en} ar={item.title.ar} />
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm md:text-base font-normal leading-relaxed max-w-sm">
                    <BilingualText en={item.desc.en} ar={item.desc.ar} />
                  </p>
                </div>

                {/* Metrics Strip — only if item has metrics */}
                {item.metrics && (
                  <div className="relative z-10 mt-8 mb-4 grid grid-cols-3 gap-6 border-y border-black/5 py-6">
                    {item.metrics.map((m, idx) => (
                      <div key={idx} className="flex flex-col gap-1">
                        <span className="text-xl font-medium tracking-tighter text-[var(--text-primary)]">
                          {m.value}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">
                          <BilingualText en={m.label.en} ar={m.label.ar} />
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {/* Info Grid — only if item has infoGrid */}
                {item.infoGrid && (
                  <div className="relative z-10 grid grid-cols-2 gap-4 mt-6">
                    {item.infoGrid.map((info, idx) => (
                      <div
                        key={idx}
                        className="bg-[rgba(11,114,133,0.06)] backdrop-blur-md rounded-[1.5rem] p-6 border border-[var(--brand-primary)]/10 flex flex-col gap-3 min-h-[140px] transition-colors hover:bg-[rgba(11,114,133,0.1)]"
                      >
                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-primary)]">
                          <BilingualText en={info.title.en} ar={info.title.ar} />
                        </span>
                        <p className="text-[11px] md:text-xs leading-relaxed text-[var(--text-secondary)] font-normal">
                          <BilingualText en={info.desc.en} ar={info.desc.ar} />
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Visual — fills remaining space */}
                <div className="relative z-10 flex-1 flex flex-col justify-end pt-8">
                  <Visual />
                </div>

                {/* Hover CTA */}
                <div className="relative z-10 mt-8 flex items-center gap-2 text-[var(--brand-primary)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <span className="text-xs font-medium uppercase tracking-widest">
                    <BilingualText en="Explore" ar="استكشف" />
                  </span>
                  <svg
                    className="w-4 h-4 rtl:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>

                {/* Aura Blob */}
                <div className="absolute -top-24 -right-24 w-80 h-80 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-700">
                  <div
                    className={`absolute inset-0 rounded-full blur-[100px] ${item.aura}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
