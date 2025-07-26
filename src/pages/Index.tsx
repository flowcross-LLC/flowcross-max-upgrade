import FlowCrossNavbar from "@/components/FlowCrossNavbar";
import FlowCrossHero from "@/components/FlowCrossHero";
import FlowCrossFeatures from "@/components/FlowCrossFeatures";
import FlowCrossStats from "@/components/FlowCrossStats";
import InteractiveShowcase from "@/components/InteractiveShowcase";
import AdvancedFeatures from "@/components/AdvancedFeatures";
import FlowCrossPricing from "@/components/FlowCrossPricing";
import DownloadSection from "@/components/DownloadSection";
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
        <InteractiveShowcase />
        <AdvancedFeatures />
        <FlowCrossPricing />
        <DownloadSection />
      </main>
      <FlowCrossFooter />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
