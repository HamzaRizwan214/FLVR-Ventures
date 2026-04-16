import React from "react";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import BilingualText from "../components/BilingualText";

const methodology = [
  {
    step: "01",
    title: { en: "Filter", ar: "تصفية" },
    desc: {
      en: "Identify concepts with real relevance, repeat demand, and room to lead.",
      ar: "تحديد المفاهيم ذات الأهمية الحقيقية والطلب المتكرر ومساحة القيادة.",
    },
  },
  {
    step: "02",
    title: { en: "Lift", ar: "رفع" },
    desc: {
      en: "Strengthen the brand, business model, and operating foundation for scale.",
      ar: "تعزيز العلامة التجارية ونموذج العمل والأساس التشغيلي للتوسع.",
    },
  },
  {
    step: "03",
    title: { en: "Validate", ar: "التحقق" },
    desc: {
      en: "Prove the concept through traction, economics, and execution.",
      ar: "إثبات المفهوم من خلال الجاذبية والاقتصاد المالي والتنفيذ.",
    },
  },
  {
    step: "04",
    title: { en: "Run", ar: "تنفيذ" },
    desc: {
      en: "Accelerate growth through disciplined execution, expansion, and brand momentum.",
      ar: "تسريع النمو من خلال التنفيذ المنضبط والتوسع وزخم العلامة التجارية.",
    },
  },
];

export default function HowItWorks() {
  return (
    <PageWrapper>
      <div className="w-full flex flex-col pt-12 pb-32">
        {/* Intro */}
        <section className="container mx-auto px-6 lg:px-12 mb-32 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-8 text-[var(--text-primary)] leading-tight"
          >
            <BilingualText
              en="At FLVR, scaling is never accidental."
              ar="في فليفر، التوسع ليس صدفة أبداً."
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-3xl text-[var(--text-secondary)] font-normal leading-relaxed"
          >
            <BilingualText
              en="We combine strategic judgment, operating discipline, and growth execution to help promising concepts earn the right to scale—and the ability to sustain it."
              ar="نحن نجمع بين الحكم الاستراتيجي والانضباط التشغيلي والتنفيذ المستدام لمساعدة الأفكار الواعدة على كسب الحق في التوسع."
            />
          </motion.p>
        </section>

        {/* The Animated Pipeline visual (instead of cards, a giant timeline/list) */}
        <section className="container mx-auto px-6 lg:px-12 mb-32 relative">
          <div className="absolute left-[39px] md:left-[59px] rtl:left-auto rtl:right-[39px] rtl:md:right-[59px] top-0 bottom-0 w-px bg-[var(--border-strong)] z-0"></div>

          <div className="flex flex-col space-y-24">
            {methodology.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 flex items-start"
              >
                <div className="flex-shrink-0 w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-[var(--bg-primary)] bg-[var(--brand-primary)] text-white flex items-center justify-center text-2xl md:text-4xl font-medium rtl:ml-8 ltr:mr-8">
                  {item.step}
                </div>
                <div className="pt-4 md:pt-8 md:ml-12 rtl:md:mr-12">
                  <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-4 text-[var(--text-primary)]">
                    <BilingualText en={item.title.en} ar={item.title.ar} />
                  </h2>
                  <p className="text-xl md:text-2xl text-[var(--text-secondary)]">
                    <BilingualText en={item.desc.en} ar={item.desc.ar} />
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Foundational Info block */}
        <section className="container mx-auto px-6 lg:px-12">
          <div className="bg-[var(--bg-brand-tint)] p-8 md:p-16 rounded-3xl border border-[var(--border-strong)] relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10 max-w-4xl"
            >
              <h3 className="text-3xl md:text-5xl font-medium tracking-tighter text-[var(--brand-primary)] mb-8">
                <BilingualText en="FLVR Fund" ar="صندوق فليفر" />
              </h3>
              <p className="text-lg md:text-2xl text-[var(--text-primary)] leading-relaxed mb-6 font-normal">
                <BilingualText
                  en="FLVR Fund backs founder-led Saudi F&B concepts with the potential to become category leaders. We invest in brands with real consumer pull, repeat demand, and room to scale."
                  ar="يدعم صندوق فليفر مفاهيم الطعام السعودية التي يقودها المؤسسون."
                />
              </p>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
                <BilingualText
                  en="Our thesis is simple: many of the most exciting F&B concepts have the product, energy, and market relevance to break out—but turning early traction into enduring scale takes more than momentum alone. It takes the right capital, sharper structure, stronger execution, and a clear growth playbook."
                  ar="نطريتنا بسيطة: العديد من المفاهيم المثيرة تمتلك المنتج والطاقة والأهمية في السوق للنجاح - ولكن تحويل الزخم إلى توسع مستدام يتطلب أكثر من ذلك."
                />
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
