import React from 'react';
import { Navigation } from '@/components/editions/Navigation';
import { HeroSection } from '@/components/editions/HeroSection';
import { GeometricBackground } from '@/components/editions/GeometricBackground';
import { SidekickSection } from '@/components/editions/SidekickSection';
import { AgenticSection, OnlineSection } from '@/components/editions/FeatureSections';
import { StatsSection, SkillsShowcase } from '@/components/editions/StatsSection';
import { TechStackSection } from '@/components/editions/TechStackSection';
import { Footer } from '@/components/editions/Footer';
import { CustomCursor } from '@/components/editions/CustomCursor';

const Index: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      <GeometricBackground />
      <Navigation />

      <main className="snap-y snap-proximity relative">
        <div className="snap-start relative z-0">
          <HeroSection />
        </div>

        <div className="snap-start relative z-10">
          <StatsSection />
        </div>

        <div className="snap-start relative z-10 mt-0">
          <SkillsShowcase />
        </div>

        {/* Horizontal scrolling tech stack */}
        <div className="snap-start">
          <TechStackSection />
        </div>

        <div className="snap-start">
          <SidekickSection />
        </div>

        <div className="snap-start">
          <AgenticSection />
        </div>

        <div className="snap-start">
          <OnlineSection />
        </div>

        <div className="snap-start">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Index;
