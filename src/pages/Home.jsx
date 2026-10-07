import PageWrapper from "../components/PageWrapper";
import {
  HeroContent,
  ShaderBackground,
} from "@/components/ui/shaders-hero-section";
import HomeSteps from "@/components/HomeSteps";
import HomeConcepts from "@/components/HomeConcepts";
import HomeFund from "@/components/HomeFund";

export default function Home() {
  return (
    <PageWrapper noPadding>
      <ShaderBackground>
        <HeroContent />
      </ShaderBackground>
      <HomeSteps />
      <HomeConcepts />
      <HomeFund />
    </PageWrapper>
  );
}
