import React from 'react';
import { Navigation } from '@/components/editions/Navigation';
import { HeroSection } from '@/components/editions/HeroSection';
import { GeometricBackground } from '@/components/editions/GeometricBackground';
import { AboutSection } from '@/components/editions/AboutSection';
import { SidekickSection } from '@/components/editions/SidekickSection';
import { AgenticSection, OnlineSection } from '@/components/editions/FeatureSections';
import { StatsSection, SkillsShowcase } from '@/components/editions/StatsSection';
import { TechStackSection } from '@/components/editions/TechStackSection';
import { TestimonialsSection } from '@/components/editions/TestimonialsSection';
import { Footer } from '@/components/editions/Footer';
import { CustomCursor } from '@/components/editions/CustomCursor';
import { ScrollToTop } from '@/components/editions/ScrollToTop';

const Index: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      <ScrollToTop />
      <GeometricBackground />
      <Navigation />

      <main className="snap-y snap-proximity">
        <div className="snap-start">
          <HeroSection />
        </div>

        <div className="snap-start">
          <AboutSection />
        </div>

        <div className="snap-start relative z-10 bg-background">
          <StatsSection />
        </div>

        <div className="snap-start">
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
          <TestimonialsSection />
        </div>

        <div className="snap-start">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Index;
