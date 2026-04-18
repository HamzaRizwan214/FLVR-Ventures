import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import BilingualText from "../components/BilingualText";
import { cn } from "@/lib/utils";

const methodology = [
  {
    step: "01",
    title: { en: "Filter", ar: "تصفية" },
    desc: {
      en: "Identify concepts with real relevance, repeat demand, and room to lead the market.",
      ar: "تحديد المفاهيم ذات الأهمية الحقيقية والطلب المتكرر ومساحة لقيادة السوق.",
    },
    accent: "bg-blue-500",
  },
  {
    step: "02",
    title: { en: "Lift", ar: "رفع" },
    desc: {
      en: "Strengthen the brand, business model, and operating foundation for aggressive scale.",
      ar: "تعزيز العلامة التجارية ونموذج العمل والأساس التشغيلي للتوسع الجريء.",
    },
    accent: "bg-emerald-500",
  },
  {
    step: "03",
    title: { en: "Validate", ar: "التحقق" },
    desc: {
      en: "Prove the concept through unit economics, market traction, and flawless execution.",
      ar: "إثبات المفهوم من خلال اقتصاديات الوحدة، والجاذبية في السوق، والتنفيذ الخالي من العيوب.",
    },
    accent: "bg-amber-500",
  },
  {
    step: "04",
    title: { en: "Run", ar: "تنفيذ" },
    desc: {
      en: "Accelerate growth through disciplined expansion and sustainable brand momentum.",
      ar: "تسريع النمو من خلال التوسع المنضبط وزخم العلامة التجارية المستدام.",
    },
    accent: "bg-[var(--brand-primary)]",
  },
];

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
        {/* Section 1: Hero Intro (Apple Editorial Style) */}
        <section className="container mx-auto px-6 lg:px-12 mb-40 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--brand-primary)] mb-6">
              <BilingualText en="The FLVR Protocol" ar="بروتوكول فليفر" />
            </p>
            <h1 className="text-5xl md:text-8xl font-light tracking-tighter text-black leading-[0.9] mb-12">
              <BilingualText
                en="Scaling is never accidental."
                ar="التوسع ليس صدفة أبداً."
              />
            </h1>
            <p className="text-xl md:text-3xl text-black/50 font-light leading-relaxed max-w-3xl">
              <BilingualText
                en="We combine strategic judgment and operating discipline to help promising concepts earn the right to scale."
                ar="نحن نجمع بين الحكم الاستراتيجي والانضباط التشغيلي لمساعدة الأفكار الواعدة على كسب الحق في التوسع."
              />
            </p>
          </motion.div>
        </section>

        {/* Section 2: The Flow (Timeline) */}
        <section
          ref={containerRef}
          className="container mx-auto px-6 lg:px-12 relative mb-48"
        >
          {/* PROGRESS LINE: 
            Mobile: Fixed at left-6 (matching px-6)
            Desktop: Fixed at 1/2 (center)
          */}
          <div className="absolute left-9 md:left-1/2 top-0 bottom-0 w-[2px] bg-black/[0.03] -translate-x-1/2 z-0" />
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-9 md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--brand-primary)] -translate-x-1/2 origin-top z-10"
          />

          <div className="flex flex-col space-y-24 md:space-y-64">
            {methodology.map((item, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={idx}
                  className={cn(
                    "relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12",
                    isEven ? "md:flex-row-reverse" : "",
                  )}
                >
                  {/* STEP BUBBLE: 
                    Mobile: Anchored to the left line
                    Desktop: Anchored to the center line
                  */}
                  <div className="absolute left-3 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20">
                    <motion.div
                      whileInView={{ scale: [0, 1.2, 1], opacity: 1 }}
                      viewport={{ once: true }}
                      className="w-12 h-12 md:w-24 md:h-24 rounded-full bg-white border border-black/5 shadow-xl flex items-center justify-center text-lg md:text-2xl font-mono text-[var(--brand-primary)]"
                    >
                      {item.step}
                    </motion.div>
                  </div>

                  {/* CONTENT BLOCK: 
                    Mobile: Pushed left to make room for bubble (pl-12)
                    Desktop: Clean layout (pt-0)
                  */}
                  <div
                    className={cn(
                      "w-full md:w-[42%] pl-12 md:pl-0 pt-2 md:pt-0",
                      isEven ? "md:text-left" : "md:text-right",
                    )}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      viewport={{ once: true }}
                    >
                      <h2 className="text-3xl md:text-7xl font-light tracking-tighter text-black mb-4 md:mb-6">
                        <BilingualText en={item.title.en} ar={item.title.ar} />
                      </h2>
                      <p className="text-base md:text-xl text-black/50 leading-relaxed font-light max-w-lg md:ml-auto">
                        <BilingualText en={item.desc.en} ar={item.desc.ar} />
                      </p>
                    </motion.div>
                  </div>

                  {/* VISUAL PLACEHOLDER: 
                    Hidden on mobile to keep the timeline clean
                  */}
                  <div className="hidden md:block w-[42%]">
                    <div
                      className={cn(
                        "aspect-square rounded-[3rem] opacity-10 blur-3xl",
                        item.accent,
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: The Fund (Glassmorphism Card) */}
        <section className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] p-8 md:p-24 border border-black/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden"
          >
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-4xl md:text-6xl font-light tracking-tighter text-[var(--brand-primary)] mb-8">
                  <BilingualText en="FLVR Fund 1" ar="صندوق فليفر ١" />
                </h3>
                <div className="flex gap-4 mb-8">
                  <div className="px-4 py-1 rounded-full border border-[var(--brand-primary)]/20 text-[var(--brand-primary)] text-[10px] font-bold uppercase tracking-widest">
                    Growth Equity
                  </div>
                  <div className="px-4 py-1 rounded-full border border-black/10 text-black/40 text-[10px] font-bold uppercase tracking-widest">
                    Saudi Focus
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-black leading-snug font-light">
                  <BilingualText
                    en="We back founder-led concepts with the potential to become category leaders."
                    ar="ندعم المفاهيم التي يقودها المؤسسون والمهيأة لتصبح رائدة في فئتها."
                  />
                </p>
                <p className="text-lg text-black/50 leading-relaxed font-light">
                  <BilingualText
                    en="Turning early traction into enduring scale takes more than momentum. It takes the right capital, sharper structure, and a clear growth playbook."
                    ar="تحويل النجاح الأولي إلى توسع مستدام يتطلب أكثر من مجرد زخم. يتطلب رأس المال المناسب، وهيكل تنظيمي أقوى، وخطة نمو واضحة."
                  />
                </p>
              </div>
            </div>
            {/* Background Branding */}
            <div className="absolute top-0 right-0 p-12 text-[12rem] font-bold text-black/[0.02] pointer-events-none select-none">
              FLVR
            </div>
          </motion.div>
        </section>
      </div>
    </PageWrapper>
  );
}
