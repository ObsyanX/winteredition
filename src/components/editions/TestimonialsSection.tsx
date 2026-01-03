import React, { useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useParallax } from '@/hooks/useScrollAnimation';
import { TextScramble } from '@/hooks/useTextAnimations';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
}

/**
 * TestimonialsSection Component
 * Animated carousel with testimonial cards
 */
export const TestimonialsSection: React.FC = () => {
  const containerRef = React.useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });
  const { offset } = useParallax(0.1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Sayan demonstrated exceptional problem-solving skills during his internship. His ability to quickly grasp complex concepts and deliver quality code was impressive.",
      author: "Tech Lead",
      role: "Senior Software Engineer",
      company: "Previous Internship",
    },
    {
      id: 2,
      quote: "A dedicated team player who consistently goes above and beyond. Sayan's contributions to our AI-powered delivery project were instrumental in winning Best Paper at ICSAA 2025.",
      author: "Project Mentor",
      role: "Professor",
      company: "SRM Institute",
    },
    {
      id: 3,
      quote: "Sayan's full-stack development skills and attention to detail made him stand out. His work on the cyberpunk chatbot showcased both technical expertise and creative vision.",
      author: "Peer Developer",
      role: "Colleague",
      company: "Collaborative Project",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (isPaused || !inView) return;
    
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, inView, testimonials.length]);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section 
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden mt-8 sm:mt-16" 
      id="testimonials" 
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Parallax decorations */}
      <motion.div
        className="absolute top-1/4 left-0 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 text-editions-gold/5 pointer-events-none"
        style={{ y: offset * 0.2 }}
      >
        <Quote className="w-full h-full" aria-hidden="true" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 right-0 w-24 sm:w-36 lg:w-48 h-24 sm:h-36 lg:h-48 text-editions-purple/5 pointer-events-none rotate-180"
        style={{ y: offset * -0.15 }}
      >
        <Quote className="w-full h-full" aria-hidden="true" />
      </motion.div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-editions-gold mb-3 sm:mb-4">
            <TextScramble text="WHAT OTHERS SAY" trigger={inView} speed={40} />
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display">
            Testimonials
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Main testimonial card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-gradient-to-b from-card/80 to-card/40 border border-border/50 rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-12"
          >
            {/* Quote icon */}
            <Quote className="absolute top-4 left-4 sm:top-6 sm:left-6 w-6 h-6 sm:w-8 sm:h-8 text-editions-gold/30" aria-hidden="true" />

            {/* Testimonial content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center pt-6 sm:pt-8"
              >
                <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 leading-relaxed mb-6 sm:mb-8 italic">
                  "{testimonials[activeIndex].quote}"
                </blockquote>

                <div className="space-y-0.5 sm:space-y-1">
                  <p className="font-semibold text-sm sm:text-base text-editions-gold">
                    {testimonials[activeIndex].author}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {testimonials[activeIndex].role} • {testimonials[activeIndex].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Gradient glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-editions-gold/10 via-editions-purple/10 to-editions-blue/10 rounded-xl sm:rounded-2xl blur-xl -z-10 opacity-50" />
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <motion.button
              onClick={goToPrevious}
              className="p-2.5 sm:p-3 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>

            {/* Progress dots */}
            <div className="flex gap-1.5 sm:gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-1.5 sm:h-2 rounded-full transition-all duration-300 min-h-[6px]",
                    index === activeIndex 
                      ? "w-6 sm:w-8 bg-editions-gold" 
                      : "w-1.5 sm:w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : 'false'}
                />
              ))}
            </div>

            <motion.button
              onClick={goToNext}
              className="p-2.5 sm:p-3 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>

          {/* Auto-progress indicator */}
          {!isPaused && inView && (
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 sm:h-1 bg-editions-gold/50 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
              key={activeIndex}
            />
          )}
        </div>
      </div>
    </section>
  );
};
