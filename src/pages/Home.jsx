import React from "react";
import PageWrapper from "../components/PageWrapper";
import {
  HeroContent,
  ShaderBackground,
} from "@/components/ui/shaders-hero-section";
import HomeScaleSection from "@/components/HomeScaleSection";
import PartnersSection from "@/components/PartnersSection";
import StatsSection from "@/components/StatsSection";
import Preview from "@/components/RotatingTextSection";
import ExecutivePillars from "@/components/ExecutivePillars";
import BentoValueSection from "@/components/BentoValueSection";
import TestimonialSection from "@/components/TestimonialSection";

export default function Home() {
  return (
    <PageWrapper noPadding>
      <ShaderBackground>
        <HeroContent />
      </ShaderBackground>
      <HomeScaleSection />
      <PartnersSection />
      <StatsSection />
      <ExecutivePillars />
      <BentoValueSection />
      <TestimonialSection />
      <Preview />
    </PageWrapper>
  );
}
