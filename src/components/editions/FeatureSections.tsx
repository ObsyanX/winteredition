import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useScrollAnimation, useParallax, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { TextScramble } from '@/hooks/useTextAnimations';
import { cn } from '@/lib/utils';
import { Award, Briefcase, GraduationCap, Trophy, Users } from 'lucide-react';
import { FloatingElement, ParallaxContainer } from './SectionTransition';

/**
 * AgenticSection - Experience Section
 * Enhanced with smooth parallax background and card hover animations
 */
export const AgenticSection: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const { offset } = useParallax(0.2);
  const containerRef = React.useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });

  const experiences = [
    {
      title: 'Business Analytics Intern',
      company: 'SmartBridge (Qlik)',
      period: 'Apr – Jun 2024',
      description: 'Developed interactive Qlik dashboards with user-friendly visualizations from provided datasets. Extracted KPIs to support operational decision-making.',
      icon: Briefcase,
      color: 'editions-blue',
    },
    {
      title: 'Generative AI Intern',
      company: 'SmartBridge (Google Cloud)',
      period: 'Sep – Oct 2024',
      description: "Implemented and deployed production-ready models using Google Cloud's scalable infrastructure and APIs for AI-powered applications.",
      icon: Briefcase,
      color: 'editions-purple',
    },
    {
      title: 'Tech Lead (Web) & Content Lead',
      company: 'The CodeBird, UIT Burdwan',
      period: '2024 – 2025',
      description: 'Led web development initiatives and content strategy for community projects. Guided junior members on AI/ML tools, Git, and project best practices.',
      icon: Users,
      color: 'editions-gold',
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden mt-8 sm:mt-16" id="experience">
      {/* Parallax floating orbs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <div className="absolute top-1/4 left-1/4 w-[200px] sm:w-[300px] lg:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px] rounded-full bg-gradient-to-r from-editions-gold/10 to-editions-purple/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[150px] sm:w-[225px] lg:w-[300px] h-[150px] sm:h-[225px] lg:h-[300px] rounded-full bg-gradient-to-r from-editions-blue/10 to-editions-green/5 blur-3xl" />
      </div>

      {/* Animated grid pattern */}
      <ParallaxContainer speed={0.1} className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </ParallaxContainer>

      <div className="container mx-auto max-w-5xl relative z-10" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-editions-blue mb-3 sm:mb-4">
            <TextScramble text="PROFESSIONAL JOURNEY" trigger={isVisible} speed={40} />
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display">
            Experience
          </h2>
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-4 sm:space-y-6">
          {experiences.map((exp, index) => (
            <ExperienceRow
              key={exp.title}
              {...exp}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ExperienceRowProps {
  title: string;
  company: string;
  period: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  index: number;
  inView: boolean;
}

const ExperienceRow: React.FC<ExperienceRowProps> = ({
  title,
  company,
  period,
  description,
  icon: Icon,
  color,
  index,
  inView,
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: isEven ? -60 : 60,
        rotateY: isEven ? -5 : 5
      }}
      animate={inView ? { 
        opacity: 1, 
        x: 0,
        rotateY: 0
      } : { 
        opacity: 0, 
        x: isEven ? -60 : 60,
        rotateY: isEven ? -5 : 5
      }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15 + 0.2,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ 
        y: -4,
        scale: 1.02,
        boxShadow: `0 20px 40px rgba(0,0,0,0.2), 0 0 30px hsl(var(--${color}) / 0.1)`,
        transition: { duration: 0.3 }
      }}
      className={cn(
        'group flex items-start gap-3 sm:gap-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl cursor-default',
        'bg-card/30 border border-border/30 backdrop-blur-sm',
        'hover:bg-card/50 relative overflow-hidden'
      )}
    >
      {/* Animated background gradient on hover */}
      <motion.div 
        className={cn(
          'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
          `bg-gradient-to-r from-${color}/5 via-transparent to-${color}/5`
        )}
      />

      {/* Animated icon container */}
      <motion.div 
        className={cn(
          'flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center relative z-10',
          `bg-${color}/10`
        )}
        whileHover={{ 
          scale: 1.15, 
          rotate: 5,
          transition: { duration: 0.3 }
        }}
      >
        <Icon className={cn('w-5 h-5 sm:w-6 sm:h-6', `text-${color}`)} />
      </motion.div>
      
      <div className="flex-1 relative z-10 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 sm:mb-2 gap-1">
          <h3 className="text-base sm:text-lg font-semibold group-hover:text-editions-gold transition-colors">
            {title}
          </h3>
          <motion.span 
            className="text-xs sm:text-sm text-muted-foreground flex-shrink-0"
            whileHover={{ color: 'hsl(var(--foreground))' }}
          >
            {period}
          </motion.span>
        </div>
        <p className={cn('text-sm sm:text-base mb-1 sm:mb-2 transition-colors', `text-${color}`)}>{company}</p>
        <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors">
          {description}
        </p>
      </div>

      {/* Animated border line */}
      <motion.div 
        className={cn('absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl', `bg-${color}/30`)}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
        style={{ transformOrigin: 'top' }}
      />
    </motion.div>
  );
};

/**
 * OnlineSection - Education & Achievements Section
 * Enhanced with staggered animations and 3D card effects
 */
export const OnlineSection: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { offset } = useParallax(0.15);
  const containerRef = React.useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-50px' });

  const education = [
    {
      institution: 'University Institute of Technology, The University of Burdwan',
      degree: 'B.E. in Computer Science and Engineering',
      period: '2022 – Present',
      details: 'CGPA: 8.79/10 (5th Sem)',
      icon: GraduationCap,
    },
    {
      institution: 'Army Public School, Bengdubi',
      degree: 'Higher Secondary (CBSE)',
      period: '2019 – 2021',
      details: '91.2%',
      icon: GraduationCap,
    },
    {
      institution: 'Good Shepherd School, Bagdogra',
      degree: 'Secondary (ICSE)',
      period: '2006 – 2019',
      details: '87.2%',
      icon: GraduationCap,
    },
  ];

  const achievements = [
    {
      title: 'Best Paper – ICSAA 2025',
      description: 'Paper on "Savitr-AI: A Novel AI System for Dynamic Delivery Scheduling & Resource Optimization"',
      icon: Trophy,
    },
    {
      title: 'Outstanding Paper – Ideathon 2025',
      description: 'Recognized for innovative solution design',
      icon: Award,
    },
    {
      title: 'Finalist – Smart Bengal Hackathon 2024',
      description: 'State-level hackathon finalist',
      icon: Trophy,
    },
    {
      title: '1st Place – QuizWiz 2025',
      description: 'Technical quiz competition winner',
      icon: Award,
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden mt-8 sm:mt-16" id="education">
      {/* Parallax background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Floating decorative elements - hidden on small screens */}
      <FloatingElement amplitude={15} duration={5} className="hidden sm:block absolute top-20 right-20 w-3 h-3 rounded-full bg-editions-gold/30" />
      <FloatingElement amplitude={20} duration={6} className="hidden sm:block absolute bottom-40 left-20 w-4 h-4 rounded-full bg-editions-purple/30" />
      <FloatingElement amplitude={12} duration={4} className="hidden md:block absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-editions-blue/30" />

      <div className="container mx-auto max-w-6xl relative z-10" ref={containerRef}>
        {/* Education Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 50, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-editions-green mb-3 sm:mb-4">
            <TextScramble text="ACADEMIC BACKGROUND" trigger={headerVisible} speed={40} />
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display">
            Education & Achievements
          </h2>
        </motion.div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
          {education.map((edu, index) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15 + 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                y: -8,
                scale: 1.03,
                rotateX: -5,
                boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                transition: { duration: 0.3 }
              }}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card/50 border border-border/50 hover:border-editions-green/30 relative group cursor-default"
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            >
              {/* Shimmer effect on hover */}
              <motion.div 
                className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
                  backgroundSize: '200% 200%',
                }}
                animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              
              <div className="flex flex-col h-full relative z-10">
                <motion.div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-editions-green/10 flex items-center justify-center mb-3 sm:mb-4"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <edu.icon className="w-5 h-5 sm:w-6 sm:h-6 text-editions-green" />
                </motion.div>
                <h3 className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1 group-hover:text-editions-green transition-colors">
                  {edu.institution}
                </h3>
                <p className="text-editions-purple text-xs sm:text-sm mb-0.5 sm:mb-1">{edu.degree}</p>
                <p className="text-muted-foreground text-[10px] sm:text-xs mb-1.5 sm:mb-2">{edu.period}</p>
                <motion.p 
                  className="text-sm sm:text-base text-editions-gold font-medium mt-auto"
                  whileHover={{ scale: 1.05 }}
                >
                  {edu.details}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-display text-editions-gold">
            Certifications & Achievements
          </h3>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30, rotateZ: index % 2 === 0 ? -2 : 2 }}
              animate={inView ? { opacity: 1, y: 0, rotateZ: 0 } : { opacity: 0, y: 30, rotateZ: index % 2 === 0 ? -2 : 2 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1 + 0.5,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                y: -6,
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(180,140,60,0.15)',
                transition: { duration: 0.25 }
              }}
              whileTap={{ scale: 0.98 }}
              className="p-4 sm:p-5 rounded-lg sm:rounded-xl bg-card/30 border border-border/30 hover:bg-card/50 hover:border-editions-gold/30 group cursor-default"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <achievement.icon className="w-6 h-6 sm:w-8 sm:h-8 text-editions-gold mb-2 sm:mb-3" />
              </motion.div>
              <h4 className="font-medium text-xs sm:text-sm mb-1 sm:mb-2 group-hover:text-editions-gold transition-colors">
                {achievement.title}
              </h4>
              <p className="text-[10px] sm:text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
