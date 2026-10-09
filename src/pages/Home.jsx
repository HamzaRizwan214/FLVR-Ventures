import PageWrapper from "../components/PageWrapper";
import Hero from "@/components/Hero";
import HomeSteps from "@/components/HomeSteps";
import HomeConcepts from "@/components/HomeConcepts";
import HomeFund from "@/components/HomeFund";
import HomeFaq from "@/components/HomeFaq";

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <HomeSteps />
      <HomeConcepts />
      <HomeFund />
      <HomeFaq />
    </PageWrapper>
  );
}
