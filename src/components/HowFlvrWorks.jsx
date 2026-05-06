import React from "react";
import { motion } from "framer-motion";
import BilingualText from "./BilingualText";

const FLVR_STEPS = [
  {
    letter: "F",
    title: { en: "Filter", ar: "تصفية" },
    desc: {
      en: "We identify concepts with real relevance, repeat demand, and room to lead.",
      ar: "نحدد المفاهيم ذات الصلة الحقيقية، والطلب المتكرر، والقدرة على الريادة.",
    },
    color: "var(--brand-primary)",
    phase: "01",
  },
  {
    letter: "L",
    title: { en: "Lift", ar: "رفع" },
    desc: {
      en: "We strengthen the brand, economics, and operating foundation for scale.",
      ar: "نعزز العلامة التجارية والاقتصاديات والأساس التشغيلي للتوسع.",
    },
    color: "#0e8a9e",
    phase: "02",
  },
  {
    letter: "V",
    title: { en: "Validate", ar: "التحقق" },
    desc: {
      en: "We prove the concept through traction, execution, and disciplined performance.",
      ar: "نثبت المفهوم من خلال الجذب والتنفيذ والأداء المنضبط.",
    },
    color: "#ff6b6b",
    phase: "03",
  },
  {
    letter: "R",
    title: { en: "Run", ar: "انطلاق" },
    desc: {
      en: "We support growth through sharper expansion, tighter control, and better execution.",
      ar: "ندعم النمو من خلال توسع أذكى وتحكم أدق وتنفيذ أفضل.",
    },
    color: "#ffd43b",
    phase: "04",
  },
];

const HowFlvrWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1], // Cubic-bezier for a high-end feel
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-[#FAFAF8] py-32 lg:py-48 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12 border-b border-black/5 pb-16"
        >
          <div className="max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold mb-8 text-[var(--brand-primary)] font-[Metropolis]">
              <BilingualText en="The Methodology" ar="المنهجية" />
            </p>
            <h2 className="text-[clamp(2.5rem,5.5vw,6rem)] font-light tracking-tighter leading-[0.92] text-black">
              <BilingualText
                en={
                  <>
                    A Disciplined Path
                    <br />
                    <span className="italic font-thin text-[var(--brand-primary)]">
                      From Traction
                    </span>{" "}
                    to Scale.
                  </>
                }
                ar={
                  <>
                    مسار منضبط
                    <br />
                    <span className="italic font-thin text-[var(--brand-primary)]">
                      من الجذب
                    </span>{" "}
                    إلى التوسع.
                  </>
                }
              />
            </h2>
          </div>
          <div className="lg:max-w-xs lg:text-right">
            <p className="text-black/40 text-sm leading-relaxed font-[Metropolis] font-medium">
              <BilingualText 
                en="Four distinct phases designed to turn founder instinct into institutional-grade icons."
                ar="أربع مراحل متميزة مصممة لتحويل حدس المؤسس إلى أيقونات ذات مستوى مؤسسي."
              />
            </p>
          </div>
        </motion.div>

        {/* Grid Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5 border border-black/5 rounded-3xl overflow-hidden"
        >
          {FLVR_STEPS.map((step, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-[#FAFAF8] p-10 lg:p-14 flex flex-col gap-12 group hover:bg-white transition-colors duration-500"
            >
              <div className="flex items-start justify-between">
                <motion.span 
                  variants={letterVariants}
                  className="text-7xl lg:text-8xl font-thin leading-none tracking-tighter select-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3 origin-left inline-block"
                  style={{ color: step.color }}
                >
                  {step.letter}
                </motion.span>
                <span className="text-[10px] font-bold text-black/10 tracking-widest font-[Metropolis]">
                  {step.phase}
                </span>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--brand-primary)]/60 font-[Metropolis]">
                    <BilingualText en="Phase" ar="المرحلة" />
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-light tracking-tight text-black">
                    <BilingualText en={step.title.en} ar={step.title.ar} />
                  </h3>
                </div>
                <p className="text-black/45 text-sm lg:text-base leading-relaxed font-[Metropolis] font-medium group-hover:text-black/60 transition-colors duration-500">
                  <BilingualText en={step.desc.en} ar={step.desc.ar} />
                </p>
              </div>

              <div className="mt-auto pt-8">
                <div 
                  className="h-px w-0 group-hover:w-full transition-all duration-700 ease-out" 
                  style={{ backgroundColor: step.color }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowFlvrWorks;
