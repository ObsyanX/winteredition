import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeUp, staggerContainer, ctaHover } from '@/lib/motion';
import { Mail, ArrowRight } from 'lucide-react';
import heroVideo from '@/assets/hero-video.mp4';

/**
 * HeroSection Component - Editorial Mask-Based Layout
 * Video blends into background via gradient mask, not hard split
 * Text has independent parallax for depth
 */
export const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress locked to hero viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Video: subtle scale-up and vertical drift locked to scroll
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  
  // Text: fade out and drift up as hero scrolls away (different rate for parallax depth)
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-15%']);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getVariant = (variant: typeof fadeUp) => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } }
      };
    }
    return variant;
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[600px] md:min-h-[700px] overflow-hidden snap-start"
    >
      {/* DESKTOP/TABLET: Full-bleed video with mask-based blend */}
      <div className="absolute inset-0 hidden md:block">
        {/* Video layer */}
        <motion.div
          className="absolute inset-0"
          style={prefersReducedMotion ? {} : { 
            scale: videoScale,
            y: videoY,
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-[70%_center]"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='hsl(0,0%25,5%25)'/%3E%3C/svg%3E"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </motion.div>

        {/* Gradient mask: ultra-soft dissolve from left - atmospheric blend */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              to right,
              hsl(var(--background)) 0%,
              hsl(var(--background)) 25%,
              hsl(var(--background) / 0.95) 35%,
              hsl(var(--background) / 0.8) 42%,
              hsl(var(--background) / 0.55) 50%,
              hsl(var(--background) / 0.3) 60%,
              hsl(var(--background) / 0.12) 72%,
              transparent 88%
            )`,
          }}
        />

        {/* Top/bottom cinematic vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              to bottom,
              hsl(var(--background) / 0.6) 0%,
              transparent 20%,
              transparent 80%,
              hsl(var(--background) / 0.6) 100%
            )`,
          }}
        />

        {/* Subtle film grain */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* MOBILE: Full-bleed video behind text with overlay */}
      <div className="absolute inset-0 md:hidden">
        {/* Video background */}
        <motion.div
          className="absolute inset-0"
          style={prefersReducedMotion ? {} : { 
            scale: videoScale,
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-[60%_center]"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </motion.div>
        
        {/* Dark overlay for text readability */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              to bottom,
              hsl(var(--background) / 0.85) 0%,
              hsl(var(--background) / 0.7) 40%,
              hsl(var(--background) / 0.4) 70%,
              hsl(var(--background) / 0.3) 100%
            )`,
          }}
        />
        
        {/* Film grain for mobile */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Text content - positioned on left, overlays the masked video */}
      <motion.div
        className="relative z-10 h-full flex items-center safe-area-inset"
        style={prefersReducedMotion ? {} : { 
          opacity: textOpacity, 
          y: textY 
        }}
      >
        <div className="w-full px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="max-w-xl lg:max-w-2xl"
          >
            {/* Role Badge */}
            <motion.div
              variants={getVariant(fadeUp)}
              className="mb-4 sm:mb-6"
            >
              <span className="text-[0.7rem] sm:text-xs md:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground font-medium">
                Software Engineer • UI/UX
              </span>
            </motion.div>

            {/* Main Headline - responsive clamp sizing */}
            <motion.h1
              variants={getVariant(fadeUp)}
              className="text-[clamp(1.75rem,5vw,3.5rem)] font-display font-medium tracking-tight leading-[1.15] mb-5 sm:mb-8 text-foreground"
            >
              Designing intelligent, human-centric digital experiences.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={getVariant(fadeUp)}
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md mb-8 sm:mb-10 leading-relaxed"
            >
              I build modern web apps, AI-powered tools, and scalable SaaS products with a strong UX foundation.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={getVariant(fadeUp)}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <motion.a
                href="#projects"
                variants={ctaHover}
                whileHover="hover"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-foreground text-background font-medium rounded-full transition-colors text-sm sm:text-base min-h-[48px]"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#contact"
                variants={ctaHover}
                whileHover="hover"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 border border-border bg-background/50 backdrop-blur-sm text-foreground font-medium rounded-full hover:bg-foreground hover:text-background transition-colors text-sm sm:text-base min-h-[48px]"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
