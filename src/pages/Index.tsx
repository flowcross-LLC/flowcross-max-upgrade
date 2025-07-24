import FlowCrossNavbar from "@/components/FlowCrossNavbar";
import FlowCrossHero from "@/components/FlowCrossHero";
import FlowCrossFeatures from "@/components/FlowCrossFeatures";
import FlowCrossStats from "@/components/FlowCrossStats";
import FlowCrossTestimonials from "@/components/FlowCrossTestimonials";
import AdvancedFeatures from "@/components/AdvancedFeatures";
import FlowCrossPricing from "@/components/FlowCrossPricing";
import FlowCrossFooter from "@/components/FlowCrossFooter";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingActionButton from "@/components/FloatingActionButton";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <ScrollProgress />
      <FlowCrossNavbar />
      <main className="relative z-10">
        <FlowCrossHero />
        <FlowCrossFeatures />
        <FlowCrossStats />
        <FlowCrossTestimonials />
        <AdvancedFeatures />
        <FlowCrossPricing />
      </main>
      <FlowCrossFooter />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
