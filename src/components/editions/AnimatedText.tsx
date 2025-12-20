import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  animation?: 'fade-up' | 'fade-in' | 'blur-in' | 'split';
}

/**
 * AnimatedText Component
 * Demonstrates various text animation techniques:
 * - Fade up: Classic scroll reveal
 * - Blur in: Dramatic focus effect
 * - Split: Character-by-character reveal
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  className,
  as: Component = 'p',
  delay = 0,
  animation = 'fade-up',
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ delay });

  if (animation === 'split') {
    // Split text into words for staggered animation
    const words = children.split(' ');
    
    return (
      <Component
        ref={ref as React.RefObject<any>}
        className={cn('overflow-hidden', className)}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
            <span
              className={cn(
                'inline-block transition-transform duration-700 ease-out-expo',
                isVisible ? 'translate-y-0' : 'translate-y-full'
              )}
              style={{ transitionDelay: `${wordIndex * 50}ms` }}
            >
              {word}
            </span>
          </span>
        ))}
      </Component>
    );
  }

  const animationClasses = {
    'fade-up': cn(
      'transition-all duration-1000 ease-out-expo',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    ),
    'fade-in': cn(
      'transition-opacity duration-1000 ease-out-expo',
      isVisible ? 'opacity-100' : 'opacity-0'
    ),
    'blur-in': cn(
      'transition-all duration-1000 ease-out-expo',
      isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'
    ),
  };

  return (
    <Component
      ref={ref as React.RefObject<any>}
      className={cn(animationClasses[animation], className)}
    >
      {children}
    </Component>
  );
};

interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * AnimatedHeading Component
 * Large display heading with dramatic reveal animation
 */
export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  children,
  className,
  delay = 0,
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLHeadingElement>({ delay });

  return (
    <h2
      ref={ref}
      className={cn(
        'transition-all duration-1000 ease-out-expo',
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-12 scale-95',
        className
      )}
    >
      {children}
    </h2>
  );
};
