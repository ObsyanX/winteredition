import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { TextScramble } from '@/hooks/useTextAnimations';
import { cn } from '@/lib/utils';

interface TechItem {
  name: string;
  icon: string;
  category: string;
  proficiency: number;
}

const techStack: TechItem[] = [
  // Languages
  { name: 'Python', icon: '🐍', category: 'Languages', proficiency: 95 },
  { name: 'Java', icon: '☕', category: 'Languages', proficiency: 90 },
  { name: 'JavaScript', icon: '💛', category: 'Languages', proficiency: 88 },
  { name: 'TypeScript', icon: '💙', category: 'Languages', proficiency: 85 },
  { name: 'C/C++', icon: '⚡', category: 'Languages', proficiency: 80 },
  { name: 'SQL', icon: '🗃️', category: 'Languages', proficiency: 88 },
  // Frameworks
  { name: 'React', icon: '⚛️', category: 'Frameworks', proficiency: 90 },
  { name: 'Next.js', icon: '▲', category: 'Frameworks', proficiency: 85 },
  { name: 'Node.js', icon: '🟢', category: 'Frameworks', proficiency: 88 },
  { name: 'FastAPI', icon: '🚀', category: 'Frameworks', proficiency: 85 },
  { name: 'Spring Boot', icon: '🌱', category: 'Frameworks', proficiency: 75 },
  { name: 'TensorFlow', icon: '🧠', category: 'Frameworks', proficiency: 82 },
  // Tools & Cloud
  { name: 'Docker', icon: '🐳', category: 'Tools', proficiency: 85 },
  { name: 'Kubernetes', icon: '☸️', category: 'Tools', proficiency: 78 },
  { name: 'AWS', icon: '☁️', category: 'Tools', proficiency: 80 },
  { name: 'Git', icon: '📦', category: 'Tools', proficiency: 92 },
  { name: 'MongoDB', icon: '🍃', category: 'Tools', proficiency: 85 },
  { name: 'PostgreSQL', icon: '🐘', category: 'Tools', proficiency: 88 },
];

export const TechStackSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    <section 
      ref={containerRef}
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-background via-card/20 to-background mt-8 sm:mt-16"
      id="tech"
    >
      {/* Background parallax elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] rounded-full bg-editions-gold/5 blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/4 w-[300px] sm:w-[450px] lg:w-[600px] h-[300px] sm:h-[450px] lg:h-[600px] rounded-full bg-editions-purple/5 blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
        />
      </div>

      <div ref={ref} className="container mx-auto px-4 sm:px-6 mb-10 sm:mb-16">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-editions-gold mb-3 sm:mb-4">
            <TextScramble text="TECHNOLOGIES" trigger={isVisible} speed={40} />
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display mb-4 sm:mb-6">
            Tech Stack
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            A curated collection of technologies I work with daily
          </p>
        </motion.div>
      </div>

      {/* Horizontal scrolling tech marquee - Row 1 */}
      <div className="relative mb-4 sm:mb-8">
        <motion.div
          className="flex gap-3 sm:gap-6 py-2 sm:py-4"
          style={{ x }}
        >
          {[...techStack, ...techStack].map((tech, index) => (
            <TechCard key={`${tech.name}-${index}`} tech={tech} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Horizontal scrolling tech marquee - Row 2 (reversed) */}
      <div className="relative">
        <motion.div
          className="flex gap-3 sm:gap-6 py-2 sm:py-4"
          style={{ x: useTransform(scrollYProgress, [0, 1], ['-50%', '0%']) }}
        >
          {[...techStack.slice().reverse(), ...techStack.slice().reverse()].map((tech, index) => (
            <TechCard key={`${tech.name}-rev-${index}`} tech={tech} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Infinite marquee at bottom */}
      <div className="mt-8 sm:mt-16 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...techStack, ...techStack, ...techStack].map((tech, index) => (
            <span
              key={`marquee-${index}`}
              className="mx-4 sm:mx-8 text-xl sm:text-2xl md:text-3xl font-light text-muted-foreground/30 hover:text-editions-gold transition-colors duration-300"
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

interface TechCardProps {
  tech: TechItem;
  index: number;
}

const TechCard: React.FC<TechCardProps> = ({ tech, index }) => {
  return (
    <motion.div
      className={cn(
        'group relative flex-shrink-0 w-36 sm:w-44 md:w-48 lg:w-56 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl',
        'bg-card/50 backdrop-blur-sm border border-border/50',
        'hover:border-editions-gold/50 hover:bg-card/80',
        'transition-all duration-500'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 6) * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-editions-gold/10 to-editions-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {/* Icon */}
        <span className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-4 block">{tech.icon}</span>
        
        {/* Name */}
        <h3 className="font-medium text-sm sm:text-base text-foreground mb-0.5 sm:mb-1">{tech.name}</h3>
        
        {/* Category */}
        <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">{tech.category}</p>
        
        {/* Proficiency bar */}
        <div className="h-0.5 sm:h-1 bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-editions-gold to-editions-purple"
            initial={{ width: 0 }}
            whileInView={{ width: `${tech.proficiency}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </div>
        
        {/* Proficiency label */}
        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {tech.proficiency}% proficiency
        </p>
      </div>
    </motion.div>
  );
};
