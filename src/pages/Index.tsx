import React from 'react';
import { Navigation } from '@/components/editions/Navigation';
import { HeroSection } from '@/components/editions/HeroSection';
import { GeometricBackground } from '@/components/editions/GeometricBackground';
import { SidekickSection } from '@/components/editions/SidekickSection';
import { AgenticSection, OnlineSection } from '@/components/editions/FeatureSections';
import { Footer } from '@/components/editions/Footer';

/**
 * Shopify Editions Winter '26 Clone
 * 
 * This page demonstrates various scroll animation techniques:
 * 
 * 1. INTERSECTION OBSERVER ANIMATIONS
 *    - Fade-in on scroll (useScrollAnimation hook)
 *    - Staggered children reveals (useStaggeredAnimation)
 *    - Trigger once vs continuous animations
 * 
 * 2. PARALLAX EFFECTS
 *    - Background layers moving at different speeds
 *    - Hero section scale/fade on scroll
 *    - Floating orbs with depth
 * 
 * 3. SCROLL PROGRESS
 *    - Navigation progress bar
 *    - Scroll-linked opacity/transforms
 * 
 * 4. MICRO-INTERACTIONS
 *    - Hover lift effects on cards
 *    - Magnetic button animations
 *    - Gradient border reveals
 *    - Shine/shimmer effects
 * 
 * 5. ENTRANCE ANIMATIONS
 *    - Staggered load animations
 *    - Blur-in effects
 *    - Scale-up reveals
 *    - Slide from directions
 */
const Index: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Fixed geometric background with parallax */}
      <GeometricBackground />

      {/* Navigation with scroll-based effects */}
      <Navigation />

      {/* Hero with dramatic entrance and scroll fade */}
      <HeroSection />

      {/* Sidekick section with staggered card animations */}
      <SidekickSection />

      {/* Agentic section with alternating slide animations */}
      <AgenticSection />

      {/* Online section with grid reveal and blur-in */}
      <OnlineSection />

      {/* Footer with link hover effects */}
      <Footer />
    </div>
  );
};

export default Index;
