import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useScrollAnimation, useParallax } from '@/hooks/useScrollAnimation';
import { CountUp, TextScramble, Typewriter } from '@/hooks/useTextAnimations';
import { cn } from '@/lib/utils';
import { HoverCard, FloatingElement, ParallaxContainer } from './SectionTransition';

/**
 * StatsSection Component - Portfolio Version
 * Demonstrates counting number animations with enhanced parallax and hover effects
 */
export const StatsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { offset } = useParallax(0.15);
  const containerRef = React.useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });

  const stats = [
    { value: 8.79, suffix: '', label: 'CGPA', decimals: 2, icon: '📊' },
    { value: 3, suffix: '+', label: 'Projects', decimals: 0, icon: '🚀' },
    { value: 2, suffix: '', label: 'Internships', decimals: 0, icon: '💼' },
    { value: 4, suffix: '', label: 'Awards', decimals: 0, icon: '🏆' },
  ];

  return (
    <section className="relative py-24 px-6 border-y border-border/50 bg-card/30 overflow-hidden mt-0 z-10">
      {/* Parallax background elements */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-editions-gold/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-editions-purple/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                scale: 1.1, 
                transition: { duration: 0.3 } 
              }}
              className="text-center group cursor-default"
            >
              {/* Floating emoji */}
              <FloatingElement amplitude={10} duration={3 + index * 0.5}>
                <span className="text-2xl mb-2 block opacity-60 group-hover:opacity-100 transition-opacity">
                  {stat.icon}
                </span>
              </FloatingElement>
              
              <motion.div 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-editions-gold via-editions-purple to-editions-blue bg-clip-text text-transparent bg-[length:200%_auto]"
                whileHover={{
                  backgroundPosition: ['0%', '100%'],
                  transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' }
                }}
              >
                <CountUp 
                  end={stat.value} 
                  duration={2000} 
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                  trigger={isVisible} 
                />
              </motion.div>
              <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors">
                <TextScramble text={stat.label} trigger={isVisible} speed={60} />
              </p>
              
              {/* Underline animation on hover */}
              <motion.div 
                className="h-0.5 bg-gradient-to-r from-editions-gold to-editions-purple mt-2 mx-auto"
                initial={{ width: 0 }}
                whileHover={{ width: '50%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/**
 * SkillsShowcase Component
 * Enhanced with parallax background and card hover effects
 */
export const SkillsShowcase: React.FC = () => {
  const { offset } = useParallax(0.2);
  const containerRef = React.useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-50px' });

  const skillCategories = [
    { 
      title: 'Languages', 
      skills: ['Java', 'C++', 'Python', 'JavaScript (ES6+)', 'SQL'],
      color: 'editions-gold',
      gradient: 'from-editions-gold/20 to-transparent'
    },
    { 
      title: 'Frameworks & Libraries', 
      skills: ['React.js', 'Node.js', 'Tailwind CSS'],
      color: 'editions-purple',
      gradient: 'from-editions-purple/20 to-transparent'
    },
    { 
      title: 'Databases & Tools', 
      skills: ['MongoDB', 'Git', 'GitHub', 'Netlify', 'Render', 'Qlik Sense', 'Power BI'],
      color: 'editions-blue',
      gradient: 'from-editions-blue/20 to-transparent'
    },
    { 
      title: 'Core CS', 
      skills: ['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'OOP'],
      color: 'editions-green',
      gradient: 'from-editions-green/20 to-transparent'
    },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden" id="skills">
      {/* Parallax dot pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Floating gradient orbs */}
      <ParallaxContainer speed={0.3} className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-gradient-to-r from-editions-gold/10 to-transparent blur-3xl pointer-events-none" />
      <ParallaxContainer speed={-0.2} className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-gradient-to-r from-editions-purple/10 to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-editions-green mb-4">
            <TextScramble text="TECHNICAL PROFICIENCY" trigger={inView} speed={40} />
          </p>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display mb-12">
            <Typewriter 
              text="Skills & Expertise" 
              speed={60} 
              trigger={inView}
              cursorClassName="text-editions-gold"
            />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40, rotateX: -10 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: -10 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  transition: { duration: 0.3 }
                }}
                className={cn(
                  'p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm relative overflow-hidden group cursor-default',
                  'before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 before:transition-opacity before:duration-500',
                  `before:${category.gradient}`,
                  'hover:before:opacity-100'
                )}
              >
                {/* Animated border gradient */}
                <motion.div 
                  className={cn(
                    'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                    `bg-gradient-to-r from-${category.color}/30 via-transparent to-${category.color}/30`
                  )}
                  style={{ padding: 1 }}
                />
                
                <div className="relative z-10">
                  <h3 className={cn('text-lg font-semibold mb-4', `text-${category.color}`)}>
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: (index * 0.15) + (skillIndex * 0.05) + 0.3,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: `hsl(var(--${category.color}) / 0.2)`,
                          borderColor: `hsl(var(--${category.color}) / 0.5)`,
                          transition: { duration: 0.2 }
                        }}
                        className="px-3 py-1.5 text-sm rounded-full border border-border/50 bg-background/50 transition-colors cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
