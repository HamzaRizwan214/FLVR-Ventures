import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BilingualText from "./BilingualText";

const partners = [
  { name: "Mamma Bunz", id: 1 },
  { name: "Global Partners", id: 2 },
  { name: "Culinary Assets", id: 3 },
  { name: "Growth Equity", id: 4 },
  { name: "Market Leaders", id: 5 },
];

export default function PartnersSection() {
  return (
    <section className="bg-[var(--bg-primary)] py-32 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-[var(--text-primary)]/90">
            <BilingualText
              en="Where Bold Concepts Become Iconic Brands"
              ar="حيث تتحول المفاهيم الجريئة إلى علامات تجارية رائدة"
            />
          </h2>
        </div>

        {/* Logo Strip with Vertical Separators */}
        <div className="relative mb-24">
          <div className="flex flex-wrap items-center justify-center gap-y-12 md:flex-nowrap">
            {partners.map((partner, index) => (
              <React.Fragment key={partner.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-1 min-w-[150px] flex items-center justify-center px-8 group"
                >
                  <span className="text-xl md:text-2xl font-normal tracking-tighter text-zinc-400 group-hover:text-[var(--text-primary)] transition-colors duration-300 select-none uppercase font-mono italic">
                    {partner.name}
                  </span>
                </motion.div>

                {index < partners.length - 1 && (
                  <div className="hidden md:block h-12 w-px bg-black/10" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* CTA Pill Bar */}
        <div className="flex justify-center">
          <motion.div whileHover={{ y: -4 }} className="group relative">
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 py-4 px-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
            >
              <p className="text-sm md:text-base text-zinc-400 group-hover:text-white transition-colors">
                <BilingualText
                  en="Our strategic ecosystem provides the discipline and growth firepower needed for breakout success"
                  ar="يوفر نظامنا البيئي الاستراتيجي الانضباط وقوة النمو اللازمة للنجاح المذهل"
                />
              </p>
              <ArrowRight className="h-5 w-5 text-[var(--brand-primary)] group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
