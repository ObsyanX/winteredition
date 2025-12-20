import React from 'react';
import { useScrollAnimation, useParallax } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Bot, Brain, Workflow, ShoppingCart, Globe, Smartphone, CreditCard, Package, Truck } from 'lucide-react';

/**
 * AgenticSection Component
 * Demonstrates:
 * - Horizontal scroll reveal animation
 * - Alternating left/right fade-ins
 * - Parallax background elements
 * - Scale-up on scroll
 */
export const AgenticSection: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: parallaxRef, offset } = useParallax(0.15);

  const features = [
    {
      icon: Bot,
      title: "Autonomous Operations",
      description: "AI agents that handle routine tasks independently, from inventory management to customer inquiries.",
      color: "editions-purple",
    },
    {
      icon: Brain,
      title: "Intelligent Decision Making",
      description: "Machine learning models that optimize pricing, predict demand, and personalize experiences.",
      color: "editions-blue",
    },
    {
      icon: Workflow,
      title: "Self-Healing Workflows",
      description: "Automated systems that detect issues and resolve them before they impact your business.",
      color: "editions-green",
    },
  ];

  return (
    <section id="agentic" className="relative py-32 px-6 overflow-hidden">
      {/* Parallax background orb */}
      <div
        ref={parallaxRef}
        className="absolute top-1/2 right-0 w-[800px] h-[800px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
        style={{ transform: `translateY(${offset - 400}px) translateX(50%)` }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-editions-purple/20 via-transparent to-editions-blue/10 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header with scale animation */}
        <div
          ref={titleRef}
          className={cn(
            'text-center mb-24 transition-all duration-1000 ease-out-expo',
            titleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          )}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-editions-purple mb-4">Next Generation</p>
          <h2 className="text-5xl md:text-7xl font-display mb-6">Agentic</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI that doesn't just assist—it acts. Autonomous agents that run your business while you focus on growth.
          </p>
        </div>

        {/* Alternating Feature Rows */}
        {features.map((feature, index) => {
          const isEven = index % 2 === 0;
          return (
            <FeatureRow
              key={feature.title}
              feature={feature}
              isReversed={!isEven}
              delay={index * 150}
            />
          );
        })}
      </div>
    </section>
  );
};

interface FeatureRowProps {
  feature: {
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
  };
  isReversed?: boolean;
  delay?: number;
}

const FeatureRow: React.FC<FeatureRowProps> = ({ feature, isReversed, delay = 0 }) => {
  const { ref, isVisible } = useScrollAnimation({ delay });
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col md:flex-row items-center gap-12 mb-24 last:mb-0',
        isReversed && 'md:flex-row-reverse'
      )}
    >
      {/* Visual Side */}
      <div
        className={cn(
          'flex-1 transition-all duration-1000 ease-out-expo',
          isVisible
            ? 'opacity-100 translate-x-0'
            : isReversed
            ? 'opacity-0 translate-x-12'
            : 'opacity-0 -translate-x-12'
        )}
      >
        <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-card to-muted border border-border overflow-hidden group">
          {/* Animated pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id={`grid-${feature.title}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="0.5" fill="currentColor" />
              </pattern>
              <rect width="100" height="100" fill={`url(#grid-${feature.title})`} />
            </svg>
          </div>

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn(
              'w-24 h-24 rounded-2xl flex items-center justify-center transition-all duration-500',
              `bg-${feature.color}/20 group-hover:bg-${feature.color}/30 group-hover:scale-110`
            )}>
              <Icon className={cn('w-12 h-12', `text-${feature.color}`)} />
            </div>
          </div>

          {/* Glow effect */}
          <div className={cn(
            'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
            'bg-gradient-to-t from-transparent via-transparent to-white/5'
          )} />
        </div>
      </div>

      {/* Text Side */}
      <div
        className={cn(
          'flex-1 transition-all duration-1000 ease-out-expo',
          isVisible
            ? 'opacity-100 translate-x-0'
            : isReversed
            ? 'opacity-0 -translate-x-12'
            : 'opacity-0 translate-x-12'
        )}
        style={{ transitionDelay: '200ms' }}
      >
        <h3 className="text-3xl md:text-4xl font-semibold mb-4">{feature.title}</h3>
        <p className="text-lg text-muted-foreground mb-6">{feature.description}</p>
        <a
          href="#"
          className={cn(
            'inline-flex items-center gap-2 text-sm font-medium transition-colors',
            `text-${feature.color} hover:text-foreground`
          )}
        >
          Learn more
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
};

/**
 * OnlineSection Component
 * Demonstrates:
 * - Grid reveal with stagger
 * - Card flip/scale animations
 * - Image parallax within cards
 */
export const OnlineSection: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  const storeFeatures = [
    { icon: ShoppingCart, title: "Checkout Optimization", description: "AI-powered checkout that adapts to each customer" },
    { icon: Globe, title: "Global Markets", description: "Sell internationally with automatic localization" },
    { icon: Smartphone, title: "Mobile-First Design", description: "Beautiful storefronts optimized for every device" },
    { icon: CreditCard, title: "Shop Pay", description: "Fastest checkout on the internet" },
    { icon: Package, title: "Inventory Sync", description: "Real-time inventory across all channels" },
    { icon: Truck, title: "Smart Shipping", description: "AI-optimized delivery routes and carriers" },
  ];

  return (
    <section id="online" className="relative py-32 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-editions-blue/5 to-background pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header with blur-in effect */}
        <div
          ref={titleRef}
          className={cn(
            'text-center mb-20 transition-all duration-1000 ease-out-expo',
            titleVisible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-md translate-y-8'
          )}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-editions-blue mb-4">Commerce Reimagined</p>
          <h2 className="text-5xl md:text-7xl font-display mb-6">Online</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The future of online commerce. Every feature designed to convert visitors into loyal customers.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storeFeatures.map((feature, index) => (
            <OnlineFeatureCard
              key={feature.title}
              feature={feature}
              delay={index * 100}
              size={index === 0 || index === 5 ? 'large' : 'normal'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface OnlineFeatureCardProps {
  feature: {
    icon: React.ElementType;
    title: string;
    description: string;
  };
  delay?: number;
  size?: 'normal' | 'large';
}

const OnlineFeatureCard: React.FC<OnlineFeatureCardProps> = ({ feature, delay = 0, size = 'normal' }) => {
  const { ref, isVisible } = useScrollAnimation({ delay });
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={cn(
        'group relative p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden',
        'transition-all duration-700 ease-out-expo cursor-pointer',
        'hover:border-editions-blue/50 hover:shadow-xl hover:shadow-editions-blue/5',
        size === 'large' && 'md:col-span-2 lg:col-span-1 lg:row-span-2',
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
      )}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-editions-blue/10 via-transparent to-editions-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="w-14 h-14 rounded-xl bg-editions-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-7 h-7 text-editions-blue" />
        </div>

        <h3 className={cn(
          'font-semibold mb-3',
          size === 'large' ? 'text-2xl' : 'text-xl'
        )}>
          {feature.title}
        </h3>

        <p className={cn(
          'text-muted-foreground',
          size === 'large' ? 'text-lg' : 'text-base'
        )}>
          {feature.description}
        </p>

        {size === 'large' && (
          <a href="#" className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-editions-blue hover:text-foreground transition-colors">
            Explore features →
          </a>
        )}
      </div>

      {/* Animated corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-editions-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
};
