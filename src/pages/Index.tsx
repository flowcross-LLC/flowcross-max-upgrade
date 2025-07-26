import { useState } from "react";
import FlowCrossNavbar from "@/components/FlowCrossNavbar";
import FlowCrossHero from "@/components/FlowCrossHero";
import FlowCrossFeatures from "@/components/FlowCrossFeatures";
import FlowCrossStats from "@/components/FlowCrossStats";
import InteractiveShowcase from "@/components/InteractiveShowcase";
import AdvancedFeatures from "@/components/AdvancedFeatures";
import FlowCrossPricing from "@/components/FlowCrossPricing";
import DownloadSectionMinimal from "@/components/DownloadSectionMinimal";
import LoadingAnimation from "@/components/LoadingAnimation";
import ModuleMarketplace from "@/components/ModuleMarketplace";
import FlowCrossFooter from "@/components/FlowCrossFooter";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingActionButton from "@/components/FloatingActionButton";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingAnimation onComplete={handleLoadingComplete} />;
  }

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
        <ModuleMarketplace />
        <FlowCrossPricing />
        <DownloadSectionMinimal />
      </main>
      <FlowCrossFooter />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
