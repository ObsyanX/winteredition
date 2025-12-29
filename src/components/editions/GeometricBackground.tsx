import React from 'react';
import { useParallax, useScrollProgress } from '@/hooks/useScrollAnimation';
import { useTheme } from '@/components/ThemeProvider';

/**
 * GeometricBackground Component
 * Creates the signature Shopify Editions golden ratio geometric patterns
 * Demonstrates:
 * - SVG animations
 * - Parallax scrolling
 * - CSS transforms based on scroll position
 * - Theme-aware styling
 */
export const GeometricBackground: React.FC = () => {
  const { progress } = useScrollProgress();
  const { ref: layer1Ref, offset: offset1 } = useParallax(0.1);
  const { ref: layer2Ref, offset: offset2 } = useParallax(0.05);
  const { theme } = useTheme();
  
  // Theme-aware colors
  const lineColor = theme === 'light' ? 'hsl(220, 15%, 70%)' : 'hsl(0, 0%, 30%)';
  const circleColor = theme === 'light' ? 'hsl(220, 15%, 60%)' : 'hsl(0, 0%, 40%)';
  const dotColor = theme === 'light' ? 'hsl(220, 15%, 50%)' : 'hsl(0, 0%, 50%)';
  const radialEnd = theme === 'light' ? 'hsl(40, 20%, 97%)' : 'hsl(0, 0%, 0%)';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Layer 1: Golden ratio spiral - moves slowly */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 opacity-20"
        style={{ transform: `translateY(${offset1}px)` }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Golden ratio rectangle grid */}
          <g stroke={lineColor} strokeWidth="0.5" fill="none">
            {/* Main frame */}
            <rect x="100" y="100" width="800" height="800" />
            
            {/* Golden ratio divisions */}
            <line x1="100" y1="594" x2="900" y2="594" />
            <line x1="594" y1="100" x2="594" y2="900" />
            
            {/* Fibonacci spiral approximation */}
            <path
              d="M 594 594 
                 A 306 306 0 0 1 900 594
                 A 189 189 0 0 1 711 783
                 A 117 117 0 0 1 594 666
                 A 72 72 0 0 1 666 594
                 A 45 45 0 0 1 621 549
                 A 27 27 0 0 1 594 576"
              className="animate-draw-line"
              style={{
                strokeDasharray: 1000,
                strokeDashoffset: 1000 - (progress * 10),
              }}
            />
            
            {/* Diagonal guides */}
            <line x1="100" y1="100" x2="900" y2="900" opacity="0.3" />
            <line x1="900" y1="100" x2="100" y2="900" opacity="0.3" />
          </g>

          {/* Animated circles at golden ratio points */}
          <g fill="none" stroke={circleColor} strokeWidth="0.5">
            <circle cx="594" cy="594" r="306" opacity="0.3" />
            <circle cx="594" cy="594" r="189" opacity="0.4" />
            <circle cx="594" cy="594" r="117" opacity="0.5" />
            <circle cx="594" cy="594" r="72" opacity="0.6" />
          </g>
        </svg>
      </div>

      {/* Layer 2: Technical grid - moves faster */}
      <div
        ref={layer2Ref}
        className="absolute inset-0 opacity-10"
        style={{ transform: `translateY(${offset2}px) rotate(${progress * 0.1}deg)` }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Dot grid pattern */}
          <pattern id="dotGrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="0.5" fill={dotColor} />
          </pattern>
          <rect width="100" height="100" fill="url(#dotGrid)" />
        </svg>
      </div>

      {/* Layer 3: Radial gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse at ${50 + Math.sin(progress * 0.05) * 10}% ${50 + Math.cos(progress * 0.05) * 10}%,
            transparent 0%,
            ${radialEnd} 70%
          )`,
        }}
      />

      {/* Floating accent elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-rotate-slow">
          <polygon
            points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
            fill="none"
            stroke="hsl(var(--editions-gold))"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-rotate-slow" style={{ animationDirection: 'reverse' }}>
          <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--editions-purple))" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="hsl(var(--editions-purple))" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="hsl(var(--editions-purple))" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
};

/**
 * GeometricFrame Component
 * Decorative frame for hero sections with animated border
 */
export const GeometricFrame: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--foreground))" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Animated border */}
        <rect
          x="5%"
          y="5%"
          width="90%"
          height="90%"
          fill="none"
          stroke="url(#frameGradient)"
          strokeWidth="1"
          className="animate-draw-line"
          style={{
            strokeDasharray: '10 5',
          }}
        />
        
        {/* Corner accents */}
        <line x1="5%" y1="5%" x2="15%" y2="5%" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.5" />
        <line x1="5%" y1="5%" x2="5%" y2="15%" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.5" />
        
        <line x1="85%" y1="5%" x2="95%" y2="5%" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.5" />
        <line x1="95%" y1="5%" x2="95%" y2="15%" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.5" />
        
        <line x1="5%" y1="95%" x2="15%" y2="95%" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.5" />
        <line x1="5%" y1="85%" x2="5%" y2="95%" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.5" />
        
        <line x1="85%" y1="95%" x2="95%" y2="95%" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.5" />
        <line x1="95%" y1="85%" x2="95%" y2="95%" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.5" />
      </svg>
    </div>
  );
};
