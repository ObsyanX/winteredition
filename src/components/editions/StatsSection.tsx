import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

/**
 * StatsSection Component
 */
export const StatsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const stats = [
    { value: '150+', label: 'Product Updates' },
    { value: '2.5M+', label: 'Merchants Worldwide' },
    { value: '10%', label: 'Conversion Increase' },
    { value: '24/7', label: 'AI Support' },
  ];

  return (
    <section className="relative py-24 px-6 border-y border-border bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div
          ref={ref}
          className={cn(
            'grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12',
            'transition-all duration-1000 ease-out-expo',
            isVisible ? 'opacity-100' : 'opacity-0'
          )}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'text-center transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                {stat.value}
              </div>
              <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * TextEffectsShowcase Component
 */
export const TextEffectsShowcase: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-32 px-6 overflow-hidden" id="updates">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div
          ref={sectionRef}
          className={cn(
            'text-center transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-editions-green mb-4">
            WINTER 2026 UPDATES
          </p>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display mb-8">
            Building the future of commerce
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Every feature designed with one goal: helping entrepreneurs succeed.
          </p>

          <div className="relative max-w-xl mx-auto">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-editions-gold" />
                <div className="w-3 h-3 rounded-full bg-editions-green" />
              </div>
              <div className="text-left font-mono text-sm">
                <span className="text-editions-purple">$</span> shopify sidekick --generate
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
