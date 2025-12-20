import React, { useEffect, useState } from 'react';
import { useScrollProgress, useParallax } from '@/hooks/useScrollAnimation';
import { Typewriter, TextScramble } from '@/hooks/useTextAnimations';
import { GeometricFrame } from './GeometricBackground';
import { cn } from '@/lib/utils';
import { ChevronDown, Download, Mail, Github, Linkedin } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.jpeg';

/**
 * HeroSection Component - Portfolio Version
 * Demonstrates:
 * - Video background with gradient overlay
 * - Staggered load animations
 * - Parallax effects on scroll
 * - Typewriter and text scramble effects
 * - Animated scroll indicator
 */
export const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScrollProgress();
  const { ref: parallaxRef, offset } = useParallax(0.3);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroScale = Math.max(0.8, 1 - scrollY / 3000);

  const roles = [
    'Software Engineer',
    'Full Stack Developer',
    'AI Enthusiast',
    'Problem Solver',
  ];

  return (
    <section
      ref={parallaxRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start"
      style={{
        opacity: heroOpacity,
        transform: `scale(${heroScale}) translateY(${offset}px)`,
      }}
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
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Profile Photo */}
        <div
          className={cn(
            'mb-8 transition-all duration-1000 ease-out-expo',
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          )}
        >
          <div className="relative inline-block">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-editions-gold/50 shadow-2xl">
              <img
                src={profilePhoto}
                alt="Sayan Dutta - Software Engineer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Animated ring */}
            <div className="absolute inset-0 rounded-full border-2 border-editions-purple/30 animate-ping" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        {/* Greeting with scramble effect */}
        <p
          className={cn(
            'text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-4 transition-all duration-1000 ease-out-expo',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <TextScramble text="Hello, I'm" trigger={isLoaded} speed={40} />
        </p>

        {/* Main heading */}
        <h1 className="relative mb-6">
          <span
            className={cn(
              'block text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-none transition-all duration-1000 ease-out-expo',
              isLoaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-16 blur-sm'
            )}
            style={{ transitionDelay: '200ms' }}
          >
            <span className="bg-gradient-to-r from-editions-gold via-foreground to-editions-purple bg-clip-text text-transparent">
              Sayan Dutta
            </span>
          </span>
        </h1>

        {/* Typewriter Role */}
        <div
          className={cn(
            'text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 h-10 transition-all duration-1000 ease-out-expo',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '400ms' }}
        >
          <Typewriter
            text={roles}
            speed={80}
            cursor={true}
            cursorClassName="text-editions-gold"
            loop={true}
            trigger={isLoaded}
          />
        </div>

        {/* Brief intro */}
        <p
          className={cn(
            'text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 transition-all duration-1000 ease-out-expo',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '500ms' }}
        >
          Final-Year CSE Student with CGPA 8.79 | Passionate about building scalable software solutions with AI integration
        </p>

        {/* CTA Buttons */}
        <div
          className={cn(
            'flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ease-out-expo',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '600ms' }}
        >
          <a
            href="#projects"
            data-magnetic
            data-cursor-text="View"
            className="group relative overflow-hidden px-8 py-4 bg-foreground text-background font-medium rounded-full transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-editions-gold to-editions-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="mailto:duttasayan835@gmail.com"
            data-magnetic
            className="group flex items-center gap-2 px-8 py-4 border border-border text-foreground font-medium rounded-full transition-all duration-300 hover:bg-foreground hover:text-background"
          >
            <Mail className="w-4 h-4" />
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Social links */}
        <div
          className={cn(
            'mt-10 flex items-center justify-center gap-6 transition-all duration-1000 ease-out-expo',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '700ms' }}
        >
          <a
            href="https://github.com/sayandutta"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300 hover:scale-110"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/sayandutta"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300 hover:scale-110"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">Resume</span>
          </a>
        </div>

        {/* Location badge */}
        <div
          className={cn(
            'mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 transition-all duration-1000 ease-out-expo',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '800ms' }}
        >
          <span className="w-2 h-2 rounded-full bg-editions-green animate-pulse" />
          <span className="text-sm text-muted-foreground">Siliguri, India</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={cn(
          'absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000',
          isLoaded ? 'opacity-100' : 'opacity-0',
          scrollY > 100 ? 'opacity-0' : 'opacity-100'
        )}
        style={{ transitionDelay: '900ms' }}
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
