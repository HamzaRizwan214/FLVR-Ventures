import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import BilingualText from "../components/BilingualText";

// ─── Images ───────────────────────────────────────────────────────────────────
const IMG = {
  hero: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=2670&auto=format&fit=crop",
  origin: "/gap.jpg",
  studio:
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1400&auto=format&fit=crop",
  capital:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1400&auto=format&fit=crop",
  ops: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop",
  cta: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop",
};

// ─── Shared helpers ───────────────────────────────────────────────────────────
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Eyebrow = ({ en, ar, light = false }) => (
  <p
    className={`text-[10px] uppercase tracking-[0.4em] font-semibold mb-6 ${light ? "text-white/40" : "text-[var(--brand-primary)]"}`}
  >
    <BilingualText en={en} ar={ar} />
  </p>
);

// Animated counting number
const CountUp = ({ to, suffix = "", duration = 1.5 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

// ─── Section 1 — Manifesto Hero ───────────────────────────────────────────────
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <motion.div style={{ scale: imgScale }} className="absolute inset-0 z-0">
        <img src={IMG.hero} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
      </motion.div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-10 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "url(https://grainy-gradients.vercel.app/noise.svg)",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-20 w-full px-6 lg:px-16 max-w-[1600px] mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <Eyebrow
            en="FLVR Ventures — About"
            ar="فليفر فنتشرز — من نحن"
            light
          />

          <h1 className="text-[clamp(3.5rem,9vw,8.5rem)] font-extralight text-white leading-[0.87] tracking-[-0.04em] mb-10">
            <BilingualText
              en={
                <>
                  Turning
                  <br />
                  <span className="italic font-thin text-[var(--brand-reward)]">
                    instinct
                  </span>
                  <br />
                  into icons.
                </>
              }
              ar={
                <>
                  تحويل
                  <br />
                  <span className="italic font-thin text-[var(--brand-reward)]">
                    الغريزة
                  </span>
                  <br />
                  إلى أيقونات.
                </>
              }
            />
          </h1>

          <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16">
            <div className="h-px w-20 bg-white/30 mt-3 flex-shrink-0" />
            <p className="text-white/60 text-base md:text-xl font-light leading-relaxed max-w-xl">
              <BilingualText
                en="FLVR is more than capital. We are an operating partner designed for the high-velocity Saudi F&B market."
                ar="فليفر هي أكثر من مجرد رأس مال. نحن شريك تشغيلي مصمم لسوق الأغذية والمشروبات السعودي."
              />
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll signal */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-px h-14 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

// ─── Section 2 — Origin Story ─────────────────────────────────────────────────
const OriginSection = () => {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section className="bg-[#FAFAF8] py-32 lg:py-48 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          {/* Image column */}
          <div className="lg:col-span-6 xl:col-span-5 relative">
            <FadeIn>
              <div
                ref={imgRef}
                className="relative rounded-[2rem] overflow-hidden aspect-[3/4] lg:aspect-[4/5] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.18)]"
              >
                <motion.img
                  style={{ y: imgY }}
                  src={IMG.origin}
                  alt="Origin"
                  className="w-full h-[115%] object-cover -mt-[7.5%]"
                />
                {/* Glass overlay stat */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl px-7 py-6 border border-white/50 shadow-xl">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl font-light text-[var(--brand-primary)] tracking-tighter">
                        2026
                      </span>
                      <span className="text-xs uppercase tracking-[0.2em] text-black/40 font-medium">
                        Benchmark
                      </span>
                    </div>
                    <p className="text-[11px] text-black/50 leading-snug">
                      <BilingualText
                        en="Setting the standard for Saudi F&B growth equity."
                        ar="وضع معيار رأس مال النمو للمطاعم السعودية."
                      />
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Text column */}
          <div className="lg:col-span-6 xl:col-span-6 xl:col-start-7 lg:pl-8">
            <FadeUp>
              <Eyebrow en="Our Origin" ar="أصلنا" />
              <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-light tracking-tighter leading-[0.95] text-black mb-10">
                <BilingualText
                  en={
                    <>
                      Bridging
                      <br />
                      the gap.
                    </>
                  }
                  ar={
                    <>
                      سد
                      <br />
                      الفجوة.
                    </>
                  }
                />
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-xl text-black/55 font-light leading-[1.7] mb-10">
                <BilingualText
                  en="FLVR Ventures was built to close the gap between early traction and enduring scale. We fuse institutional capital with brand thinking and operational excellence to turn high-potential concepts into iconic Saudi brands."
                  ar="تم إنشاء فليفر لسد الفجوة بين الجاذبية المبكرة والتوسع المستدام. نجمع رأس المال المؤسسي بفكر العلامة التجارية والتميز التشغيلي."
                />
              </p>
            </FadeUp>
            <FadeUp delay={0.18}>
              <p className="text-base text-black/40 font-light leading-relaxed border-l-2 border-[var(--brand-primary)]/30 pl-6">
                <BilingualText
                  en="Saudi Arabia has strong consumer appetite, high F&B spending, young lifestyle-driven demand, and many passionate founders — but most concepts lack the structure to scale. FLVR fills that gap."
                  ar="المملكة العربية السعودية لديها شهية استهلاكية قوية وإنفاق مرتفع على المطاعم — لكن معظم الأفكار تفتقر للهيكل الذي يمكّنها من التوسع. فليفر تملأ هذه الفجوة."
                />
              </p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Section 3 — What We Do (4 Verticals) ────────────────────────────────────
const WhatWeDoSection = () => {
  const verticals = [
    {
      num: "01",
      title: { en: "FLVR Fund I", ar: "صندوق فليفر ١" },
      sub: { en: "Growth Capital", ar: "رأس مال النمو" },
      body: {
        en: "A SAR 20M venture-style fund providing structured capital and strategic oversight to help breakout F&B brands reach national scale.",
        ar: "صندوق بقيمة ٢٠ مليون ريال يوفر رأسمالاً هيكلياً وإشرافاً استراتيجياً لمساعدة العلامات الواعدة على التوسع الوطني.",
      },
      image: IMG.capital,
      tag: { en: "Capital", ar: "رأس المال" },
    },
    {
      num: "02",
      title: { en: "Venture Studio", ar: "استوديو المشاريع" },
      sub: { en: "Concept Incubation", ar: "حضانة الأفكار" },
      body: {
        en: "An internal studio that identifies white spaces in the Saudi market and builds concepts from the ground up — brand, operations, and growth architecture included.",
        ar: "استوديو داخلي يحدد الفجوات في السوق السعودية ويبني أفكاراً من الصفر — علامة تجارية وتشغيلاً وهيكل نمو.",
      },
      image: IMG.studio,
      tag: { en: "Incubation", ar: "الاحتضان" },
    },
    {
      num: "03",
      title: { en: "Off-Shelf Concepts", ar: "مفاهيم جاهزة" },
      sub: { en: "Brand Frameworks", ar: "أطر العلامة التجارية" },
      body: {
        en: "Validated, investor-ready concept packages — complete with brand identity, unit economics, and operating playbooks — available for franchise or licensing.",
        ar: "حزم مفاهيم جاهزة للاستثمار — تشمل هوية العلامة التجارية واقتصاديات الوحدة وأدلة التشغيل — متاحة للامتياز أو الترخيص.",
      },
      image: IMG.ops,
      tag: { en: "Frameworks", ar: "الأطر" },
    },
    {
      num: "04",
      title: { en: "FLVR Services", ar: "خدمات فليفر" },
      sub: { en: "Operational Edge", ar: "التفوق التشغيلي" },
      body: {
        en: "Marketing, social, and creative services for restaurant brands through partner agencies — the same tools our portfolio uses, made available to the broader market.",
        ar: "خدمات تسويق ورقمي وإبداعية للمطاعم عبر وكالات شريكة — الأدوات ذاتها التي تستخدمها محفظتنا، متاحة للسوق الأوسع.",
      },
      image: IMG.capital,
      tag: { en: "Services", ar: "الخدمات" },
    },
  ];

  return (
    <section className="bg-[#080808] py-32 lg:py-48 px-6 lg:px-16">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-white/8 pb-12">
          <FadeUp>
            <Eyebrow en="What We Do" ar="ما نقوم به" light />
            <h2 className="text-[clamp(2.5rem,5vw,5.5rem)] font-light tracking-tighter text-white leading-[0.92]">
              <BilingualText
                en={
                  <>
                    Four verticals.
                    <br />
                    One platform.
                  </>
                }
                ar={
                  <>
                    أربعة محاور.
                    <br />
                    منصة واحدة.
                  </>
                }
              />
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-white/35 text-base max-w-xs leading-relaxed md:text-right">
              <BilingualText
                en="Complementary by design. Compounding by nature."
                ar="متكاملة بالتصميم. متراكمة بالطبيعة."
              />
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06] rounded-3xl overflow-hidden">
          {verticals.map((v, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div className="group bg-[#080808] p-10 lg:p-14 flex flex-col gap-8 min-h-[340px] hover:bg-white/[0.03] transition-colors duration-500 relative overflow-hidden">
                {/* Subtle image on hover */}
                <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                  <img
                    src={v.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#080808]/80" />
                </motion.div>

                <div className="relative z-10 flex items-start justify-between">
                  <span className="text-[10px] font-mono text-white/20 tracking-[0.2em]">
                    {v.num}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] border border-white/10 text-white/30 px-3 py-1 rounded-full">
                    <BilingualText en={v.tag.en} ar={v.tag.ar} />
                  </span>
                </div>

                <div className="relative z-10 flex-1 flex flex-col justify-end gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--brand-primary)]/70 mb-2">
                      <BilingualText en={v.sub.en} ar={v.sub.ar} />
                    </p>
                    <h3 className="text-2xl md:text-3xl font-light text-white tracking-tighter mb-4 group-hover:text-white transition-colors">
                      <BilingualText en={v.title.en} ar={v.title.ar} />
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                      <BilingualText en={v.body.en} ar={v.body.ar} />
                    </p>
                  </div>
                  <div className="h-px w-0 group-hover:w-10 bg-[var(--brand-primary)] transition-all duration-500 ease-out" />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Section 4 — Vision × Mission ────────────────────────────────────────────
const VisionMissionSection = () => (
  <section className="bg-[#FAFAF8] py-32 lg:py-48 px-6 lg:px-16 overflow-hidden">
    <div className="max-w-[1600px] mx-auto">
      <FadeUp>
        <Eyebrow en="Why We Exist" ar="لماذا نوجد" />
      </FadeUp>

      {/* Large pull-quote */}
      <FadeUp delay={0.05}>
        <div className="border-t border-black/8 pt-12 mb-24">
          <h2 className="text-[clamp(1.8rem,4.5vw,4.5rem)] font-light text-black/80 leading-[1.25] tracking-tight max-w-5xl">
            <BilingualText
              en={
                <>
                  "The best F&B concepts don't fail because the food isn't good.
                  <br />
                  They fail because{" "}
                  <em className="italic not-italic text-black">
                    the system isn't ready.
                  </em>
                  "
                </>
              }
              ar={
                <>
                  "أفضل أفكار المطاعم لا تفشل لأن الطعام سيئ.
                  <br />
                  تفشل لأن{" "}
                  <em className="italic not-italic text-black">
                    النظام غير مستعد.
                  </em>
                  "
                </>
              }
            />
          </h2>
          <p className="text-sm text-[var(--brand-primary)] mt-6 tracking-[0.2em] uppercase">
            <BilingualText
              en="— FLVR founding principle"
              ar="— المبدأ التأسيسي لفليفر"
            />
          </p>
        </div>
      </FadeUp>

      {/* Vision / Mission side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[
          {
            icon: "◎",
            label: { en: "The Vision", ar: "الرؤية" },
            heading: {
              en: "Saudi icons that scale globally.",
              ar: "أيقونات سعودية تتوسع عالمياً.",
            },
            body: {
              en: "To build, nurture, and scale the next generation of iconic Saudi F&B brands — concepts that earn repeat love, define new categories, and carry the kingdom's culinary ambition to global audiences.",
              ar: "بناء الجيل القادم من العلامات السعودية الأيقونية — أفكار تكسب الولاء وتخلق فئات جديدة وتحمل الطموح الطهوي للمملكة إلى الجمهور العالمي.",
            },
            bg: "#0b7285",
          },
          {
            icon: "◇",
            label: { en: "The Mission", ar: "المهمة" },
            heading: {
              en: "Capital, craft, and cadence.",
              ar: "رأس المال، الإبداع، والإيقاع.",
            },
            body: {
              en: "Transforming promising concepts through capital optimization, financial discipline, brand development, and strategic growth governance — giving every great idea the infrastructure it deserves.",
              ar: "تحويل الأفكار الواعدة من خلال تحسين رأس المال والانضباط المالي وتطوير العلامة التجارية — منح كل فكرة رائعة البنية التحتية التي تستحقها.",
            },
            bg: "#ff6b6b",
          },
        ].map((card, i) => (
          <FadeUp key={i} delay={i * 0.1}>
            <div
              className="rounded-3xl p-10 lg:p-14 flex flex-col justify-between min-h-[420px] group relative overflow-hidden"
              style={{ backgroundColor: card.bg }}
            >
              {/* Ambient circle */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-black/10" />

              <div className="relative z-10">
                <span className="text-3xl text-white/30 group-hover:text-white/60 transition-colors duration-500">
                  {card.icon}
                </span>
              </div>

              <div className="relative z-10 space-y-5 mt-auto">
                <p className="text-[9px] uppercase tracking-[0.35em] text-white/40">
                  <BilingualText en={card.label.en} ar={card.label.ar} />
                </p>
                <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight leading-[1.2]">
                  <BilingualText en={card.heading.en} ar={card.heading.ar} />
                </h3>
                <p className="text-white/55 text-sm leading-relaxed group-hover:text-white/75 transition-colors duration-500">
                  <BilingualText en={card.body.en} ar={card.body.ar} />
                </p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ─── Section 5 — DNA / Values ─────────────────────────────────────────────────
const DNASection = () => {
  const values = [
    {
      step: "01",
      title: { en: "Ambition with Discipline", ar: "طموح بانضباط" },
      desc: {
        en: "Bold in vision, precise in execution. We build with creative edge and institutional rigor — never one without the other.",
        ar: "جرأة في الرؤية، دقة في التنفيذ. نبني بحافة إبداعية وصرامة مؤسسية — لا واحدة دون الأخرى.",
      },
    },
    {
      step: "02",
      title: { en: "Built for Scale", ar: "مبنية للتوسع" },
      desc: {
        en: "We back concepts with repeat appeal and the operational simplicity to franchise repeatedly. Scale is a design constraint, not an afterthought.",
        ar: "ندعم الأفكار ذات الجاذبية المتكررة والبساطة التشغيلية. التوسع قيد تصميمي، ليس فكرة لاحقة.",
      },
    },
    {
      step: "03",
      title: { en: "Founder Partnership", ar: "شراكة المؤسسين" },
      desc: {
        en: "We empower visionary founders with the tools and strategic support to turn gut instinct into governed, fundable businesses.",
        ar: "نمكّن المؤسسين أصحاب الرؤى بالأدوات والدعم الاستراتيجي لتحويل الغريزة إلى أعمال قابلة للتمويل.",
      },
    },
    {
      step: "04",
      title: { en: "Value Creation", ar: "خلق القيمة" },
      desc: {
        en: "Every move is made to compound long-term brand strength and shareholder returns. We measure in enterprise value, not just revenue.",
        ar: "كل خطوة تُتخذ لمضاعفة قوة العلامة التجارية وعوائد المساهمين. نقيس بقيمة المؤسسة، ليس الإيرادات فقط.",
      },
    },
  ];

  return (
    <section className="bg-white py-32 lg:py-48 px-6 lg:px-16 border-t border-black/5">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-black/6 pb-10">
          <FadeUp>
            <Eyebrow en="Our DNA" ar="قيمنا الأساسية" />
            <h2 className="text-[clamp(2.5rem,5vw,5.5rem)] font-light tracking-tighter leading-[0.92] text-black">
              <BilingualText
                en={
                  <>
                    Institutional
                    <br />
                    pillars.
                  </>
                }
                ar={
                  <>
                    ركائز
                    <br />
                    مؤسسية.
                  </>
                }
              />
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-black/35 text-sm max-w-xs md:text-right leading-relaxed">
              <BilingualText
                en="The principles that govern every investment and every concept we build."
                ar="المبادئ التي تحكم كل استثمار وكل مفهوم نبنيه."
              />
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-black/6">
          {values.map((v, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ backgroundColor: "#fafaf8" }}
                className="border-r border-b border-black/6 p-8 lg:p-10 group cursor-default transition-colors duration-300 min-h-[300px] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-mono text-[var(--brand-primary)] tracking-[0.2em]">
                    {v.step}
                  </span>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 24 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                    viewport={{ once: true }}
                    className="h-px bg-[var(--brand-primary)]/40"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-medium tracking-tight text-black mb-4 group-hover:text-[var(--brand-primary)] transition-colors duration-300">
                    <BilingualText en={v.title.en} ar={v.title.ar} />
                  </h4>
                  <p className="text-sm text-black/45 leading-relaxed">
                    <BilingualText en={v.desc.en} ar={v.desc.ar} />
                  </p>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {/* Stat row */}
        <div className="mt-0 grid grid-cols-2 lg:grid-cols-4 border-l border-black/6">
          {[
            {
              num: 20,
              suffix: "M+",
              label: { en: "SAR Under Management", ar: "ريال تحت الإدارة" },
            },
            {
              num: 14,
              suffix: "",
              label: {
                en: "Concepts Built or Backed",
                ar: "مفهوم تم بناؤه أو دعمه",
              },
            },
            {
              num: 82,
              suffix: "%",
              label: { en: "Repeat Love Index", ar: "مؤشر الولاء" },
            },
            {
              num: 4,
              suffix: "",
              label: { en: "Saudi Cities Active", ar: "مدن سعودية نشطة" },
            },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="border-r border-t border-black/6 p-8 lg:p-10">
                <p className="text-[clamp(2rem,4vw,3.5rem)] font-light text-[var(--brand-primary)] tracking-tighter leading-none mb-3">
                  <CountUp to={s.num} suffix={s.suffix} />
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-medium leading-snug">
                  <BilingualText en={s.label.en} ar={s.label.ar} />
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Section 6 — CTA ──────────────────────────────────────────────────────────
const CTASection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden min-h-[70vh] flex items-center px-6 lg:px-16 py-32"
    >
      {/* Parallax BG */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 z-0">
        <img
          src={IMG.cta}
          alt=""
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
      </motion.div>

      {/* Grain */}
      <div
        className="absolute inset-0 z-10 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "url(https://grainy-gradients.vercel.app/noise.svg)",
        }}
      />

      <div className="relative z-20 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <Eyebrow en="Join the Platform" ar="انضم إلى المنصة" light />
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-light text-white leading-[0.9] tracking-[-0.03em] mb-8">
              <BilingualText
                en={
                  <>
                    Ready
                    <br />
                    to scale?
                  </>
                }
                ar={
                  <>
                    جاهز
                    <br />
                    للتوسع؟
                  </>
                }
              />
            </h2>
            <p className="text-white/55 text-lg font-light leading-relaxed max-w-md mb-10">
              <BilingualText
                en="Whether you're a founder with a concept, an investor seeking Saudi F&B exposure, or a brand ready to grow — FLVR has a vertical for you."
                ar="سواء كنت مؤسساً بفكرة، أو مستثمراً يبحث عن تعرض لقطاع المطاعم السعودية، أو علامة تجارية جاهزة للنمو — فليفر لديها الحل."
              />
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-white text-black text-xs font-semibold uppercase tracking-[0.18em] rounded-full hover:bg-[var(--brand-primary)] hover:text-white transition-colors duration-300"
              >
                <BilingualText en="Contact Venture Team" ar="تواصل مع فريقنا" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-white/10 text-white text-xs font-semibold uppercase tracking-[0.18em] rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm"
              >
                <BilingualText en="View Portfolio" ar="استعرض المحفظة" />
              </motion.button>
            </div>
          </FadeUp>

          {/* Right: 3 quick links */}
          <FadeUp delay={0.15}>
            <div className="space-y-3">
              {[
                {
                  label: {
                    en: "I'm a founder with a concept",
                    ar: "أنا مؤسس لديّ فكرة",
                  },
                  hint: { en: "Venture Studio →", ar: "← استوديو المشاريع" },
                },
                {
                  label: { en: "I'm an investor", ar: "أنا مستثمر" },
                  hint: { en: "FLVR Fund I →", ar: "← صندوق فليفر ١" },
                },
                {
                  label: {
                    en: "I need a ready-made concept",
                    ar: "أحتاج مفهوماً جاهزاً",
                  },
                  hint: { en: "Off-Shelf →", ar: "← مفاهيم جاهزة" },
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 6 }}
                  className="bg-white/8 hover:bg-white/14 border border-white/10 hover:border-white/20 rounded-2xl px-7 py-5 cursor-pointer transition-all duration-300 flex items-center justify-between group"
                >
                  <span className="text-white/70 text-sm font-light group-hover:text-white transition-colors">
                    <BilingualText en={item.label.en} ar={item.label.ar} />
                  </span>
                  <span className="text-[var(--brand-primary)] text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    <BilingualText en={item.hint.en} ar={item.hint.ar} />
                  </span>
                </motion.div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <PageWrapper noPadding>
      <div className="bg-[#FAFAF8] selection:bg-[var(--brand-primary)] selection:text-white">
        <HeroSection />
        <OriginSection />
        <WhatWeDoSection />
        <VisionMissionSection />
        <DNASection />
        <CTASection />
      </div>
    </PageWrapper>
  );
}
