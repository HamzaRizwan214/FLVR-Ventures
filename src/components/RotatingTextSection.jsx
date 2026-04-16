import React from "react";
import { TextRotate } from "./ui/text-rotate";
import BilingualText from "./BilingualText";

const verticals = [
  "FLVR Fund 1",
  "Venture Studio",
  "Off-Shelf Concepts",
  "FLVR Services",
];

export default function RotatingTextSection() {
  return (
    <section className="relative min-h-screen bg-[var(--bg-primary)] flex items-center justify-center py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-8">
          <BilingualText en="Our Verticals" ar="قطاعاتنا" />
        </p>

        {/* Main Heading with Rotating Text */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[var(--text-primary)]">
            <BilingualText
              en="Powering Growth Through"
              ar="تعزيز النمو من خلال"
            />
          </h2>

          {/* Rotating Text */}
          <div className="min-h-[120px] flex items-center justify-center">
            <TextRotate
              texts={verticals}
              mainClassName="text-5xl md:text-7xl lg:text-8xl font-medium text-[var(--brand-primary)] justify-center"
              splitLevelClassName="overflow-hidden pb-2"
              staggerFrom="first"
              animatePresenceMode="wait"
              loop={true}
              auto={true}
              rotationInterval={2500}
              staggerDuration={0.02}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
            />
          </div>
        </div>

        {/* Subtext */}
        <p className="mt-12 text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
          <BilingualText
            en="Four complementary platforms designed to capture value at every stage of the F&B lifecycle"
            ar="أربع منصات متكاملة مصممة لالتقاط القيمة في كل مرحلة من دورة حياة الأغذية والمشروبات"
          />
        </p>

        {/* Optional CTA */}
        <div className="mt-16">
          <button className="px-8 py-4 bg-[var(--brand-primary)] text-white rounded-full font-medium hover:opacity-90 transition-opacity">
            <BilingualText en="Explore Our Platform" ar="استكشف منصتنا" />
          </button>
        </div>
      </div>
    </section>
  );
}
