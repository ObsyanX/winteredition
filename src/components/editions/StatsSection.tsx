import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeUp, fadeOnly, staggerContainer, staggerContainerSmall, scaleIn } from '@/lib/motion';
import { CountUp, TextScramble } from '@/hooks/useTextAnimations';
import { cn } from '@/lib/utils';

/**
 * StatsSection Component
 * Clean counting animations with consistent motion variants
 */
export const StatsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const containerRef = React.useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const stats = [
    { value: 8.79, suffix: '', label: 'CGPA', decimals: 2 },
    { value: 3, suffix: '+', label: 'Projects', decimals: 0 },
    { value: 2, suffix: '', label: 'Internships', decimals: 0 },
    { value: 4, suffix: '', label: 'Awards', decimals: 0 },
  ];

  const getFadeUp = () => prefersReducedMotion ? fadeOnly : fadeUp;

  return (
    <section className="relative py-24 px-6 border-y border-border/50 bg-card/30 overflow-hidden z-10">
      <div className="container mx-auto max-w-6xl relative z-10" ref={ref}>
        <motion.div
          ref={containerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={getFadeUp()}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-foreground">
                <CountUp 
                  end={stat.value} 
                  duration={2000} 
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                  trigger={isVisible} 
                />
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/**
 * SkillsShowcase Component
 * Clean layout with consistent motion variants
 */
export const SkillsShowcase: React.FC = () => {
  const containerRef = React.useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  const skillCategories = [
    { 
      title: 'Languages', 
      skills: ['Java', 'C++', 'Python', 'JavaScript (ES6+)', 'SQL'],
    },
    { 
      title: 'Frameworks & Libraries', 
      skills: ['React.js', 'Node.js', 'Tailwind CSS'],
    },
    { 
      title: 'Databases & Tools', 
      skills: ['MongoDB', 'Git', 'GitHub', 'Netlify', 'Render', 'Qlik Sense', 'Power BI'],
    },
    { 
      title: 'Core CS', 
      skills: ['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'OOP'],
    },
  ];

  const getFadeUp = () => prefersReducedMotion ? fadeOnly : fadeUp;
  const getScaleIn = () => prefersReducedMotion ? fadeOnly : scaleIn;

  return (
    <section className="relative py-32 px-6 overflow-hidden" id="skills" ref={containerRef}>
      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          variants={getFadeUp()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-editions-gold mb-4">
            Technical Proficiency
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display">
            Skills & Expertise
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={getFadeUp()}
              className="p-6 rounded-xl bg-card/50 border border-border/50"
            >
              <h3 className="text-lg font-semibold mb-4 text-editions-gold">
                {category.title}
              </h3>
              <motion.div
                variants={staggerContainerSmall}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="flex flex-wrap gap-2"
              >
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={getScaleIn()}
                    className="px-3 py-1.5 text-sm rounded-full border border-border/50 bg-background/50 text-muted-foreground"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
