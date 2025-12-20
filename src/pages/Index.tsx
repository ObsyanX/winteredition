import React from 'react';
import { Navigation } from '@/components/editions/Navigation';
import { HeroSection } from '@/components/editions/HeroSection';
import { GeometricBackground } from '@/components/editions/GeometricBackground';
import { SidekickSection } from '@/components/editions/SidekickSection';
import { AgenticSection, OnlineSection } from '@/components/editions/FeatureSections';
import { StatsSection, TextEffectsShowcase } from '@/components/editions/StatsSection';
import { Footer } from '@/components/editions/Footer';
import { CustomCursor } from '@/components/editions/CustomCursor';

/**
 * Shopify Editions Winter '26 Clone
 * 
 * Animation Techniques Demonstrated:
 * 
 * 1. INTERSECTION OBSERVER - Fade-in on scroll, staggered reveals
 * 2. PARALLAX EFFECTS - Background layers at different speeds
 * 3. SCROLL PROGRESS - Navigation progress bar
 * 4. MICRO-INTERACTIONS - Hover lifts, magnetic buttons, gradient borders
 * 5. TEXT ANIMATIONS - Scramble, counting, typewriter effects
 * 6. SCROLL SNAPPING - Smooth section-to-section scrolling
 * 7. VIDEO BACKGROUND - Hero video with gradient overlay
 * 8. CUSTOM CURSOR - Follows mouse with magnetic pull on buttons
 */
const Index: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Custom cursor with magnetic effects */}
      <CustomCursor />

      {/* Fixed geometric background with parallax */}
      <GeometricBackground />

      {/* Navigation with scroll-based effects */}
      <Navigation />

      {/* Main scrollable content with snap points */}
      <main className="snap-y snap-proximity">
        {/* Hero with video background and dramatic entrance */}
        <div className="snap-start">
          <HeroSection />
        </div>

        {/* Stats section with counting animations */}
        <div className="snap-start">
          <StatsSection />
        </div>

        {/* Sidekick section with staggered card animations */}
        <div className="snap-start">
          <SidekickSection />
        </div>

        {/* Agentic section with alternating slide animations */}
        <div className="snap-start">
          <AgenticSection />
        </div>

        {/* Online section with grid reveal and blur-in */}
        <div className="snap-start">
          <OnlineSection />
        </div>

        {/* Text effects showcase with typewriter and scramble */}
        <div className="snap-start">
          <TextEffectsShowcase />
        </div>

        {/* Footer with link hover effects */}
        <div className="snap-start">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Index;
