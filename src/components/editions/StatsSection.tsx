import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { CountUp, TextScramble, Typewriter } from '@/hooks/useTextAnimations';
import { cn } from '@/lib/utils';

/**
 * StatsSection Component - Portfolio Version
 * Demonstrates counting number animations with resume data
 */
export const StatsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const stats = [
    { value: 8.79, suffix: '', label: 'CGPA', decimals: 2 },
    { value: 3, suffix: '+', label: 'Projects', decimals: 0 },
    { value: 2, suffix: '', label: 'Internships', decimals: 0 },
    { value: 4, suffix: '', label: 'Awards', decimals: 0 },
  ];

  return (
    <section className="relative py-24 px-6 border-y border-border bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div
          ref={ref}
          className={cn(
            'grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12',
            'transition-all duration-1000 ease-out-expo',
            isVisible ? 'opacity-100' : 'opacity-0'
          )}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'text-center transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-editions-gold to-editions-purple bg-clip-text text-transparent">
                <CountUp 
                  end={stat.value} 
                  duration={2000} 
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                  trigger={isVisible} 
                />
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                <TextScramble text={stat.label} trigger={isVisible} speed={60} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * SkillsShowcase Component
 * Demonstrates typewriter effects for skills - aligned with resume
 */
export const SkillsShowcase: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  const skillCategories = [
    { 
      title: 'Languages', 
      skills: ['Java', 'C++', 'Python', 'JavaScript (ES6+)', 'SQL'],
      color: 'text-editions-gold'
    },
    { 
      title: 'Frameworks & Libraries', 
      skills: ['React.js', 'Node.js', 'Tailwind CSS'],
      color: 'text-editions-purple'
    },
    { 
      title: 'Databases & Tools', 
      skills: ['MongoDB', 'Git', 'GitHub', 'Netlify', 'Render', 'Qlik Sense', 'Power BI'],
      color: 'text-editions-blue'
    },
    { 
      title: 'Core CS', 
      skills: ['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'OOP'],
      color: 'text-editions-green'
    },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden" id="skills">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div
          ref={sectionRef}
          className={cn(
            'text-center transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-editions-green mb-4">
            <TextScramble text="TECHNICAL PROFICIENCY" trigger={isVisible} speed={40} />
          </p>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display mb-12">
            <Typewriter 
              text="Skills & Expertise" 
              speed={60} 
              trigger={isVisible}
              cursorClassName="text-editions-gold"
            />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {skillCategories.map((category, index) => (
              <div
                key={category.title}
                className={cn(
                  'p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all duration-700',
                  'hover:border-editions-gold/30 hover:shadow-lg',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                <h3 className={cn('text-lg font-semibold mb-4', category.color)}>
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className={cn(
                        'px-3 py-1.5 text-sm rounded-full border border-border/50 bg-background/50 transition-all duration-500',
                        'hover:border-editions-gold/50 hover:bg-editions-gold/10',
                        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                      )}
                      style={{ transitionDelay: `${(index * 150) + (skillIndex * 50) + 300}ms` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
