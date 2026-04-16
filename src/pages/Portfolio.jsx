import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import BilingualText from "../components/BilingualText";

const portfolioImages = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2694&auto=format&fit=crop", // Cafe aesthetic
  "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=2680&auto=format&fit=crop", // Elegant dining
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2573&auto=format&fit=crop", // Coffee
];

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <PageWrapper>
      <div className="w-full min-h-screen flex flex-col pt-12 pb-32">
        {/* Header Section */}
        <section className="container mx-auto px-6 lg:px-12 mb-24 relative z-10">
          <motion.div style={{ y: yText }} className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-normal tracking-tighter mb-8 text-[var(--text-primary)]">
              <span className="text-[var(--brand-primary)]">
                <BilingualText en="Different flavors." ar="نكهات مختلفة." />
              </span>
              <br />
              <BilingualText
                en="One ambition: scale."
                ar="طموح واحد: التوسع."
              />
            </h1>
            <p className="text-xl md:text-3xl text-[var(--text-secondary)] font-normal leading-relaxed">
              <BilingualText
                en="From bold ideas to breakout brands, our portfolio brings together concepts designed to stand out, earn repeat love, and grow with relevance."
                ar="من الأفكار الجريئة إلى العلامات التجارية الرائدة، تجمع محفظتنا مفاهيم صُممت لتبرز، وتكسب الحب المتكرر، وتنمو بثقة."
              />
            </p>
          </motion.div>
        </section>

        {/* Dynamic Image Collage (Apple-style visual focus) */}
        <section className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full aspect-[4/5] relative rounded-3xl overflow-hidden group"
            >
              <img
                src={portfolioImages[0]}
                alt="Concept 1"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 150 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full aspect-square relative rounded-3xl overflow-hidden md:mt-32 group"
            >
              <img
                src={portfolioImages[1]}
                alt="Concept 2"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale hover:grayscale-0 transition-all"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full aspect-video md:col-span-2 relative rounded-3xl overflow-hidden group"
            >
              <img
                src={portfolioImages[2]}
                alt="Concept 3"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </motion.div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
