"use client";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  ChefHat,
  Coffee,
  Utensils,
  Wheat,
  Croissant,
  Wine,
  Pizza,
  CupSoda,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import BilingualText from "@/components/BilingualText";

export function HeroSection() {
  return (
    <>
      <main className="overflow-x-hidden pt-20">
        <section className="relative">
          <div className="py-24 md:pb-32 lg:pb-36 lg:pt-52 relative z-10">
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                <h1 className="mt-8 max-w-2xl text-balance text-5xl md:text-6xl lg:mt-16 xl:text-7xl font-bold text-white">
                  <BilingualText
                    en="Building the Next Generation of Saudi F&B Brands"
                    ar="نبني الجيل القادم من العلامات التجارية السعودية في قطاع الأغذية والمشروبات"
                  />
                </h1>
                <p className="mt-8 max-w-2xl text-balance text-lg text-zinc-300 font-normal">
                  <BilingualText
                    en="Institutional Capital. Creative Edge. Relentless Execution."
                    ar="رأس مال مؤسسي. حافة إبداعية. تنفيذ لا هوادة فيه."
                  />
                </p>

                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-full pl-5 pr-3 text-base bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/90 text-white border-none"
                  >
                    <Link to="/contact">
                      <span className="text-nowrap">
                        <BilingualText en="Start Building" ar="ابدأ البناء" />
                      </span>
                      <ChevronRight className="ml-1 rtl:rotate-180" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="h-12 rounded-full px-5 text-base text-white hover:bg-white/10"
                  >
                    <Link to="/portfolio">
                      <span className="text-nowrap">
                        <BilingualText en="View Portfolio" ar="عرض المحفظة" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Background Video Container */}
            <div className="absolute inset-2 overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] border border-white/10 z-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="size-full object-cover opacity-60"
                src="/FLVR.mp4"
              ></video>
              {/* Overlay for contrast */}
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </section>

        <section className="bg-[var(--bg-primary)] pb-12">
          <div className="group relative m-auto max-w-7xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r border-[var(--border-default)] md:pr-6 rtl:md:border-r-0 rtl:md:border-l rtl:md:pl-6 rtl:md:pr-0">
                <p className="text-center md:text-end text-sm font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                  <BilingualText
                    en="Powering the best concepts"
                    ar="تشغيل أفضل المفاهيم"
                  />
                </p>
              </div>
              <div className="relative py-6 w-full md:w-[calc(100%-11rem)]">
                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                  {[
                    ChefHat,
                    Coffee,
                    Utensils,
                    Wheat,
                    Croissant,
                    Wine,
                    Pizza,
                    CupSoda,
                  ].map((Icon, idx) => (
                    <div key={idx} className="flex">
                      <Icon
                        size={32}
                        className="text-[var(--text-secondary)] opacity-50 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ))}
                </InfiniteSlider>

                <div className="bg-gradient-to-r from-[var(--bg-primary)] to-transparent absolute inset-y-0 left-0 w-20 z-10"></div>
                <div className="bg-gradient-to-l from-[var(--bg-primary)] to-transparent absolute inset-y-0 right-0 w-20 z-10"></div>

                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20 z-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20 z-20"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
