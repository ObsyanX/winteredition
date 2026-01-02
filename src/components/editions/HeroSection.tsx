import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeUp, staggerContainer, ctaHover } from '@/lib/motion';
import { Mail, ArrowRight } from 'lucide-react';
import heroVideo from '@/assets/hero-video.mp4';

/**
 * HeroSection Component - Editorial Mask-Based Layout
 * Video blends into background via gradient mask, not hard split
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
  
  // Text: fade out and drift up as hero scrolls away
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], ['0%', '-8%']);

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
      className="relative h-screen min-h-[700px] overflow-hidden snap-start"
    >
      {/* DESKTOP: Full-bleed video with mask-based blend */}
      <div className="absolute inset-0 hidden lg:block">
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
              hsl(var(--background)) 30%,
              hsl(var(--background) / 0.95) 38%,
              hsl(var(--background) / 0.8) 46%,
              hsl(var(--background) / 0.55) 54%,
              hsl(var(--background) / 0.3) 62%,
              hsl(var(--background) / 0.12) 72%,
              transparent 85%
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

      {/* MOBILE: Stacked layout - no masks */}
      <div className="absolute inset-0 lg:hidden">
        {/* Solid background for text area */}
        <div className="absolute inset-0 bg-background" />
        
        {/* Video positioned at bottom half */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%]">
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
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          </motion.div>
          
          {/* Top fade for mobile video */}
          <div 
            className="absolute inset-x-0 top-0 h-24 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)',
            }}
          />
        </div>
      </div>

      {/* Text content - positioned on left, overlays the masked video */}
      <motion.div
        className="relative z-10 h-full flex items-center"
        style={prefersReducedMotion ? {} : { 
          opacity: textOpacity, 
          y: textY 
        }}
      >
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 pb-[45%] lg:pb-0">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="max-w-xl"
          >
            {/* Role Badge */}
            <motion.div
              variants={getVariant(fadeUp)}
              className="mb-6"
            >
              <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-muted-foreground font-medium">
                Software Engineer • UI/UX
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={getVariant(fadeUp)}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-display font-medium tracking-tight leading-[1.1] mb-8 text-foreground"
            >
              Designing intelligent, human-centric digital experiences.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={getVariant(fadeUp)}
              className="text-base sm:text-lg text-muted-foreground max-w-md mb-10 leading-relaxed"
            >
              I build modern web apps, AI-powered tools, and scalable SaaS products with a strong UX foundation.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={getVariant(fadeUp)}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#projects"
                variants={ctaHover}
                whileHover="hover"
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-foreground text-background font-medium rounded-full transition-colors text-sm sm:text-base"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#contact"
                variants={ctaHover}
                whileHover="hover"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-border text-foreground font-medium rounded-full hover:bg-foreground hover:text-background transition-colors text-sm sm:text-base"
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
