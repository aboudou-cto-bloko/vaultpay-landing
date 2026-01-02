import { HeroSection } from "@/components/sections/HeroSection";
import { ProofBar } from "@/components/sections/ProofBar";
import { CostBreakdown } from "@/components/sections/CostBreakdown";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProofBar />
      <CostBreakdown />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
