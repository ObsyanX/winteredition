import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MOTION, fadeUp, staggerContainer, ctaHover } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Mail, ArrowRight } from 'lucide-react';
import heroVideo from '@/assets/hero-video.mp4';

/**
 * HeroSection Component - Editorial Split Layout
 * Modern, cinematic hero with scroll-responsive video
 */
export const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-based transforms for video
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Video parallax: scale up and drift on scroll
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  
  // Text fade out and drift up on scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Simplified variants for reduced motion
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
      className="relative h-screen min-h-[700px] flex items-center overflow-hidden snap-start"
    >
      {/* Main container - Split layout */}
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row">
        
        {/* LEFT SIDE - Text Content */}
        <motion.div
          className="relative z-20 w-full lg:w-1/2 h-auto lg:h-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 py-20 lg:py-0"
          style={prefersReducedMotion ? {} : { opacity: textOpacity, y: textY }}
        >
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

            {/* Main Headline - Editorial, calm, single statement */}
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
        </motion.div>

        {/* RIGHT SIDE - Video with editorial edge treatment */}
        <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-full flex-shrink-0">
          {/* Soft gradient mask on left edge */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, hsl(var(--background)) 0%, transparent 25%)',
            }}
          />
          
          {/* Top/bottom fade for cinematic feel */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none hidden lg:block"
            style={{
              background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 15%, transparent 85%, hsl(var(--background)) 100%)',
            }}
          />

          {/* Mobile top fade */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none lg:hidden"
            style={{
              background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 20%)',
            }}
          />

          {/* Film grain overlay */}
          <div 
            className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Video container with scroll-based transforms */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
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
              className="absolute inset-0 w-full h-full object-cover"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='hsl(0,0%25,5%25)'/%3E%3C/svg%3E"
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </div>

      {/* Subtle background for left side */}
      <div className="absolute inset-0 z-0 bg-background" />
    </section>
  );
};
