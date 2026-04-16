import React from "react";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import BilingualText from "../components/BilingualText";

const sections = [
  {
    title: { en: "About FLVR", ar: "عن فليفر" },
    text: {
      en: "FLVR Ventures was built to close the gap between early traction and enduring scale. In F&B, founders often have the instinct, creativity, and hustle to spark momentum—but turning a hot concept into a category-leading brand takes a different caliber of structure, discipline, and expertise. That is where FLVR comes in. We fuse institutional capital, brand thinking, financial discipline, operational excellence, and strategic growth firepower to turn high-potential concepts into iconic Saudi brands built for long-term value.",
      ar: "تم إنشاء فليفر لسد الفجوة بين الجاذبية المبكرة والتوسع المستدام. في قطاع الطعام، يمتلك المؤسسون غالباً الغريزة والإبداع والاندفاع لإشعال الزخم - ولكن تحويل فكرة رائعة إلى علامة تجارية رائدة يتطلب مستوى مختلفاً من الهيكلة والانضباط والخبرة. هنا يأتي دور فليفر.",
    },
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=2670&auto=format&fit=crop",
  },
  {
    title: { en: "Vision", ar: "الرؤية" },
    text: {
      en: "To build, nurture, and scale the next generation of iconic Saudi F&B brands.",
      ar: "بناء ورعاية وتوسيع الجيل القادم من العلامات التجارية السعودية الأيقونية.",
    },
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop",
  },
  {
    title: { en: "Mission", ar: "المهمة" },
    text: {
      en: "To turn promising F&B concepts into scalable, enduring brands through brand optimization, financial discipline, operational excellence, brand outreach, and strategic growth levers.",
      ar: "تحويل أفكار الطعام الواعدة إلى علامات تجارية قابلة للتوسع ومستدامة من خلال تحسين العلامة التجارية، الانضباط المالي، والتميز التشغيلي.",
    },
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2670&auto=format&fit=crop",
  },
];

const values = [
  {
    title: { en: "Ambition with Discipline", ar: "طموح بانضباط" },
    desc: {
      en: "Bold in vision, precise in execution. We build with creative edge and best-in-class rigor.",
      ar: "جرأة في الرؤية، دقة في التنفيذ.",
    },
  },
  {
    title: { en: "Built for Scale", ar: "مبنية للتوسع" },
    desc: {
      en: "We back concepts with repeat appeal, everyday relevance, and the operational simplicity to scale repeatedly.",
      ar: "ندعم الأفكار ذات الجاذبية المتكررة.",
    },
  },
  {
    title: { en: "Founder Partnership", ar: "شراكة المؤسسين" },
    desc: {
      en: "We empower visionary founders with the structure, tools, and strategic support to turn instinct into enduring businesses.",
      ar: "نمكّن المؤسسين أصحاب الرؤى بالهيكلة والأدوات.",
    },
  },
  {
    title: { en: "Value Creation", ar: "خلق القيمة" },
    desc: {
      en: "Every move is made to compound long-term brand strength, financial performance, and stakeholder returns.",
      ar: "كل خطوة تُتخذ لمضاعفة قوة العلامة التجارية على المدى الطويل.",
    },
  },
];

export default function About() {
  return (
    <PageWrapper>
      <div className="flex flex-col w-full pb-24">
        {/* Cinematic Blocks for About, Vision, Mission */}
        {sections.map((sec, idx) => (
          <section
            key={idx}
            className="relative w-full h-[70vh] flex items-center overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={sec.image}
                alt="FLVR Aesthetic"
                className="w-full h-full object-cover"
              />
              {/* Minimal modern fade via gradients rather than floating directly on raw image */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${idx % 2 === 0 ? "from-[var(--bg-primary)] via-[rgba(var(--bg-primary),0.9)] to-transparent rtl:bg-gradient-to-l" : "from-transparent via-[rgba(var(--bg-primary),0.9)] to-[var(--bg-primary)] rtl:bg-gradient-to-r"}`}
              ></div>
            </div>

            <div
              className={`container relative z-10 mx-auto px-6 lg:px-12 flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-2xl"
              >
                <h2 className="text-sm uppercase tracking-widest text-[var(--brand-primary)] mb-4 font-normal">
                  <BilingualText en={sec.title.en} ar={sec.title.ar} />
                </h2>
                <p className="text-2xl md:text-4xl text-[var(--text-primary)] leading-relaxed font-normal">
                  <BilingualText en={sec.text.en} ar={sec.text.ar} />
                </p>
              </motion.div>
            </div>
          </section>
        ))}

        {/* Values Section */}
        <section className="container mx-auto px-6 lg:px-12 mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-normal tracking-tighter mb-16 text-[var(--text-primary)]">
              <BilingualText en="Values" ar="القيم" />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="border-t border-[var(--border-default)] pt-8"
              >
                <h3 className="text-2xl text-[var(--brand-primary)] font-normal mb-4">
                  <BilingualText en={v.title.en} ar={v.title.ar} />
                </h3>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  <BilingualText en={v.desc.en} ar={v.desc.ar} />
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
