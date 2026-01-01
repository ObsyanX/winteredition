import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollAnimation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MOTION, fadeUp, staggerContainer, ctaHover, scaleIn } from '@/lib/motion';
import { GeometricFrame } from './GeometricBackground';
import { cn } from '@/lib/utils';
import { ChevronDown, Mail, Github, Linkedin, ArrowRight } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.jpeg';

/**
 * HeroSection Component - Elite Portfolio Version
 * Clean, intentional animations with professional copy
 */
export const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScrollProgress();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 600);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start pb-24"
      style={{ opacity: heroOpacity }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%23000'/%3E%3C/svg%3E"
        >
          <source
            src="https://cdn.shopify.com/videos/c/o/v/a2d5a83e7f1d4a3a9f3e4d5c6b7a8d9e.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />
      </div>

      <GeometricFrame />

      {/* Content container */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Profile Photo */}
        <motion.div
          variants={prefersReducedMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : scaleIn}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-border/50 shadow-xl">
              <img
                src={profilePhoto}
                alt="Sayan Dutta - Full-Stack Developer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={prefersReducedMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : fadeUp}
          className="text-3xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight leading-tight mb-6"
        >
          <span className="text-foreground">
            Designing intelligent, human-centric
          </span>
          <br />
          <span className="bg-gradient-to-r from-editions-gold via-foreground to-editions-purple bg-clip-text text-transparent">
            digital experiences.
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={prefersReducedMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : fadeUp}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I'm a Full-Stack Developer & UI/UX Engineer crafting modern web apps, AI-powered tools, and scalable SaaS products.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={prefersReducedMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            variants={ctaHover}
            whileHover="hover"
            className="group flex items-center gap-2 px-8 py-4 bg-foreground text-background font-medium rounded-full transition-colors"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href="#contact"
            variants={ctaHover}
            whileHover="hover"
            className="flex items-center gap-2 px-8 py-4 border border-border text-foreground font-medium rounded-full hover:bg-foreground hover:text-background transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Me</span>
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={prefersReducedMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : fadeUp}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <motion.a
            href="https://github.com/sayandutta"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            whileHover={{ y: -2 }}
          >
            <Github className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/sayandutta"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            whileHover={{ y: -2 }}
          >
            <Linkedin className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Location */}
        <motion.div
          variants={prefersReducedMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : fadeUp}
          className="mt-8 inline-flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-editions-green" />
          <span className="text-sm text-muted-foreground">Siliguri, India</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={cn(
          'absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2',
          scrollY > 100 ? 'opacity-0' : 'opacity-100'
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded && scrollY <= 100 ? 1 : 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown className="h-5 w-5 text-muted-foreground animate-bounce" />
      </motion.div>

      {/* Subtle background gradients */}
      <div
        className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(var(--editions-gold)) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(var(--editions-purple)) 0%, transparent 70%)' }}
      />
    </section>
  );
};
