import React from 'react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Sparkles, MessageSquare, Zap, BarChart3, Users, Mic } from 'lucide-react';

interface PromptCardProps {
  prompt: string;
  delay?: number;
}

/**
 * SidekickPromptCard Component
 * Demonstrates:
 * - Hover lift effect
 * - Gradient border on hover
 * - Staggered entrance animation
 * - Interactive micro-interactions
 */
const SidekickPromptCard: React.FC<PromptCardProps> = ({ prompt, delay = 0 }) => {
  const { ref, isVisible } = useScrollAnimation({ delay });

  return (
    <div
      ref={ref}
      className={cn(
        'group relative p-4 rounded-xl bg-card border border-border cursor-pointer transition-all duration-500 ease-out-expo',
        'hover:border-transparent hover:-translate-y-1 hover:shadow-xl hover:shadow-editions-gold/5',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-editions-gold via-editions-purple to-editions-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
      <div className="absolute inset-[1px] rounded-xl bg-card -z-10" />

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-muted-foreground group-hover:text-editions-gold transition-colors" />
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed">{prompt}</p>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </div>
  );
};

/**
 * SidekickSection Component
 * Interactive section showcasing AI prompt examples
 */
export const SidekickSection: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, visibleItems } = useStaggeredAnimation(6, 100);

  const prompts = [
    "Create an app that recommends which products I need to reorder.",
    "Create a task tracker for my whole team.",
    "Create an app that checks returns and cancellation eligibility for orders.",
    "Create an event prep app that generates discounted checkout links.",
    "Create a bulk B2B company importer that uploads from CSV.",
    "Build a customer loyalty dashboard with tier progression.",
  ];

  const features = [
    { icon: Sparkles, title: "Smart suggestions", description: "Personalized recommendations using market trends and store data" },
    { icon: Zap, title: "Custom app generation", description: "Build custom apps designed specifically for your business" },
    { icon: BarChart3, title: "Custom analytics", description: "Generate reports and visualizations in ShopifyQL" },
    { icon: Users, title: "Segmentation support", description: "Build customer segments or generate them from scratch" },
    { icon: MessageSquare, title: "Workflow automations", description: "Describe workflows and Sidekick builds them in Flow" },
    { icon: Mic, title: "Voice-powered chat", description: "Speak naturally on mobile for hands-free assistance" },
  ];

  return (
    <section id="sidekick" className="relative py-32 px-6 overflow-hidden">
      {/* Section background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={cn(
            'text-center mb-20 transition-all duration-1000 ease-out-expo',
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-editions-gold mb-4">AI-Powered</p>
          <h2 className="text-5xl md:text-7xl font-display mb-6">Sidekick</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The AI-powered Shopify expert who's just as obsessed with your business as you are.
          </p>
        </div>

        {/* Feature Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={cn(
                  'group p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-700 ease-out-expo',
                  'hover:border-muted-foreground/50 hover:-translate-y-2 hover:shadow-lg',
                  visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-editions-gold/20 transition-colors">
                  <Icon className="w-6 h-6 text-muted-foreground group-hover:text-editions-gold transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Try it with Sidekick */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center mb-8">Try it with Sidekick</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {prompts.map((prompt, index) => (
              <SidekickPromptCard key={index} prompt={prompt} delay={index * 80} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
