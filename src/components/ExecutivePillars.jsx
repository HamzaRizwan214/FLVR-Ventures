import React from "react";
import { motion } from "framer-motion";
import BilingualText from "./BilingualText";

const pillars = [
  {
    title: { en: "Institutional Capital", ar: "رأس مال مؤسسي" },
    desc: {
      en: "Strategic funding to back visionary founders with traction and category-leading potential.",
      ar: "تمويل استراتيجي لدعم المؤسسين ذوي الرؤية والقدرة على قيادة القطاع.",
    },
    auras: ["bg-[#0b7285]", "bg-[#1864ab]", "bg-[#7048e8]"],
    image: "/investment.png",
    delay: 0,
  },
  {
    title: { en: "Creative Edge", ar: "حافة إبداعية" },
    desc: {
      en: "A boutique eye for identity, design, and market relevance that sparks breakout momentum.",
      ar: "نظرة متخصصة للهوية والتصميم والأهمية السوقية التي تثير زخم الانطلاق.",
    },
    auras: ["bg-[#ff6b6b]", "bg-[#e64980]", "bg-[#845ef7]"],
    image: "/cafe copy.png",
    delay: 0.1,
  },
  {
    title: { en: "Relentless Execution", ar: "تنفيذ لا هوادة فيه" },
    desc: {
      en: "Operating discipline and growth firepower to turn early traction into enduring scale.",
      ar: "الانضباط التشغيلي وقوة النمو لتحويل الزخم المبكر إلى توسع مستدام.",
    },
    auras: ["bg-[#087f5b]", "bg-[#ffd43b]", "bg-[#fab005]"],
    image: "/cafe2.png",
    delay: 0.2,
  },
];

const AuraBlob = ({ colors }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-1000">
      {colors.map((color, i) => (
        <motion.div
          key={i}
          className={`absolute w-[150%] h-[150%] rounded-full blur-[100px] ${color}`}
          animate={{
            x: [i * 20, i * -40, i * 30],
            y: [i * -30, i * 40, i * -20],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: `${(i - 1) * 30}%`,
            left: `${(i - 1) * 30}%`,
          }}
        />
      ))}
    </div>
  );
};

export default function ExecutivePillars() {
  return (
    <section className="relative py-32 bg-[var(--bg-primary)] overflow-hidden">
      <div className="mx-auto max-w-[1700px] px-6 lg:px-12">
        {/* Header (Optional, for context) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)] mb-4">
            <BilingualText en="Fundamental Philosophy" ar="الفلسفة الأساسية" />
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-tighter text-[var(--text-primary)]">
            <BilingualText
              en="Institutional Capital. Creative Edge. Relentless Execution."
              ar="رأس مال مؤسسي. حافة إبداعية. تنفيذ لا هوادة فيه."
            />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: pillar.delay,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{ y: -10 }}
              className="group relative h-[580px] rounded-[2.5rem] overflow-hidden border border-black/[0.03] bg-white/40 backdrop-blur-sm p-14 flex flex-col justify-end"
            >
              {/* Animated Background Auras */}
              <AuraBlob colors={pillar.auras} />

              {/* Glass Reflection Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-white/30 pointer-events-none" />

              {/* Image Section */}
              <div className="flex-1 flex items-center justify-center relative z-10 mb-8">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className={`w-full aspect-square flex items-center justify-center p-4 ${
                    idx === 1 ? "max-w-[360px]" : "max-w-[360px]"
                  }`}
                >
                  <img
                    src={pillar.image}
                    alt={pillar.title.en}
                    className="w-full h-full object-contain drop-shadow-2xl filter brightness-110"
                  />
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative z-10 transition-transform duration-500 group-hover:translate-y-[-5px]">
                <h3 className="text-2xl md:text-3xl font-[Metropolis] tracking-tight text-[var(--text-primary)] mb-4">
                  <BilingualText en={pillar.title.en} ar={pillar.title.ar} />
                </h3>
                <p className="text-base text-[var(--text-secondary)] leading-relaxed font-[Metropolis] opacity-80">
                  <BilingualText en={pillar.desc.en} ar={pillar.desc.ar} />
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <motion.div
                className={`absolute bottom-0 left-0 h-1 ${pillar.auras[0]} w-0 group-hover:w-full transition-all duration-700`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
