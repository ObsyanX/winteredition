import React, { useEffect, useState } from 'react';
import { useScrollProgress, useParallax } from '@/hooks/useScrollAnimation';
import { GeometricFrame } from './GeometricBackground';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

/**
 * HeroSection Component
 * Demonstrates:
 * - Staggered load animations
 * - Parallax effects on scroll
 * - Animated scroll indicator
 * - Typography with special character styling
 */
export const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScrollProgress();
  const { ref: parallaxRef, offset } = useParallax(0.3);

  useEffect(() => {
    // Trigger entrance animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Calculate opacity and scale based on scroll for exit animation
  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroScale = Math.max(0.8, 1 - scrollY / 3000);

  return (
    <section
      ref={parallaxRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        opacity: heroOpacity,
        transform: `scale(${heroScale}) translateY(${offset}px)`,
      }}
    >
      {/* Geometric frame decoration */}
      <GeometricFrame />

      {/* Content container */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow text */}
        <p
          className={cn(
            'text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-8 transition-all duration-1000 ease-out-expo',
            isLoaded
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          )}
        >
          Shopify Editions
        </p>

        {/* Main heading */}
        <h1 className="relative mb-6">
          {/* "The" text */}
          <span
            className={cn(
              'block text-4xl md:text-6xl lg:text-7xl font-light tracking-tight transition-all duration-1000 ease-out-expo',
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            )}
            style={{ transitionDelay: '100ms' }}
          >
            The
          </span>

          {/* "Renaissance" with stylized letters */}
          <span
            className={cn(
              'block text-6xl md:text-8xl lg:text-[10rem] font-display font-medium tracking-tight leading-none mt-2 transition-all duration-1000 ease-out-expo',
              isLoaded
                ? 'opacity-100 translate-y-0 blur-0'
                : 'opacity-0 translate-y-16 blur-sm'
            )}
            style={{ transitionDelay: '200ms' }}
          >
            R
            <span className="font-display italic">e</span>
            n
            <span className="font-display italic">a</span>
            <span className="font-display italic">i</span>
            ss
            <span className="font-display italic">a</span>
            nce
          </span>

          {/* "Edition" text */}
          <span
            className={cn(
              'block text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mt-2 transition-all duration-1000 ease-out-expo',
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            )}
            style={{ transitionDelay: '300ms' }}
          >
            Edition
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={cn(
            'text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 transition-all duration-1000 ease-out-expo',
            isLoaded
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '400ms' }}
        >
          Introducing over 150+ product updates designed to help you build,
          market, and manage your business with AI-powered intelligence.
        </p>

        {/* CTA Buttons */}
        <div
          className={cn(
            'flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ease-out-expo',
            isLoaded
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '500ms' }}
        >
          <a
            href="#sidekick"
            className="group relative overflow-hidden px-8 py-4 bg-foreground text-background font-medium rounded-full transition-transform hover:scale-105"
          >
            <span className="relative z-10">Explore updates</span>
            <div className="absolute inset-0 bg-gradient-to-r from-editions-gold to-editions-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#"
            className="px-8 py-4 border border-border text-foreground font-medium rounded-full transition-all hover:bg-foreground hover:text-background hover:border-foreground"
          >
            Start for free
          </a>
        </div>

        {/* Winter '26 badge */}
        <div
          className={cn(
            'mt-16 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 transition-all duration-1000 ease-out-expo',
            isLoaded
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '600ms' }}
        >
          <span className="w-2 h-2 rounded-full bg-editions-gold animate-pulse" />
          <span className="text-sm text-muted-foreground">Winter '26</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={cn(
          'absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000',
          isLoaded ? 'opacity-100' : 'opacity-0',
          scrollY > 100 ? 'opacity-0' : 'opacity-100'
        )}
        style={{ transitionDelay: '800ms' }}
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          Scroll
        </span>
        <div className="animate-scroll-bounce">
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {/* Background gradient orbs */}
      <div
        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(45, 80%, 55%) 0%, transparent 70%)',
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      />
      <div
        className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(270, 60%, 50%) 0%, transparent 70%)',
          transform: `translateY(${scrollY * -0.15}px)`,
        }}
      />
    </section>
  );
};
