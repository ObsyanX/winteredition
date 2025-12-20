import React from 'react';
import { useScrollAnimation, useParallax, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { TextScramble } from '@/hooks/useTextAnimations';
import { cn } from '@/lib/utils';
import { Award, Briefcase, GraduationCap, Trophy, Users } from 'lucide-react';

/**
 * AgenticSection - Experience Section
 * Demonstrates parallax background and alternating fade-in animations
 */
export const AgenticSection: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const { offset } = useParallax(0.2);

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
    <section className="relative py-32 px-6 overflow-hidden" id="experience">
      {/* Parallax background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-editions-gold to-editions-purple blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-editions-blue to-editions-green blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div
          ref={sectionRef}
          className={cn(
            'text-center mb-16 transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-editions-blue mb-4">
            <TextScramble text="PROFESSIONAL JOURNEY" trigger={isVisible} speed={40} />
          </p>
          <h2 className="text-4xl md:text-6xl font-display">
            Experience
          </h2>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <ExperienceRow
              key={exp.title}
              {...exp}
              index={index}
              isVisible={isVisible}
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
  isVisible: boolean;
}

const ExperienceRow: React.FC<ExperienceRowProps> = ({
  title,
  company,
  period,
  description,
  icon: Icon,
  color,
  index,
  isVisible,
}) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={cn(
        'group flex items-start gap-6 p-6 rounded-2xl transition-all duration-700',
        'bg-card/30 border border-border/30',
        `hover:bg-card/50 hover:border-${color}/30`,
        isVisible
          ? 'opacity-100 translate-x-0'
          : isEven
            ? 'opacity-0 -translate-x-12'
            : 'opacity-0 translate-x-12'
      )}
      style={{ transitionDelay: `${index * 150 + 200}ms` }}
    >
      <div className={cn(
        'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
        `bg-${color}/10 group-hover:bg-${color}/20`
      )}>
        <Icon className={cn('w-6 h-6', `text-${color}`)} />
      </div>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-sm text-muted-foreground">{period}</span>
        </div>
        <p className={cn('mb-2', `text-${color}`)}>{company}</p>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};

/**
 * OnlineSection - Education & Achievements Section
 * Demonstrates blur-in header and grid reveal animations
 */
export const OnlineSection: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, visibleItems } = useStaggeredAnimation(4, 100);

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
    <section className="relative py-32 px-6 overflow-hidden" id="education">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Education Header */}
        <div
          ref={headerRef}
          className={cn(
            'text-center mb-16 transition-all duration-1000',
            headerVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
          )}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-editions-green mb-4">
            <TextScramble text="ACADEMIC BACKGROUND" trigger={headerVisible} speed={40} />
          </p>
          <h2 className="text-4xl md:text-6xl font-display">
            Education & Achievements
          </h2>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {education.map((edu, index) => (
            <div
              key={edu.institution}
              className={cn(
                'p-6 rounded-2xl bg-card/50 border border-border/50 transition-all duration-700',
                'hover:border-editions-green/30 hover:shadow-lg',
                headerVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              )}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-editions-green/10 flex items-center justify-center mb-4">
                  <edu.icon className="w-6 h-6 text-editions-green" />
                </div>
                <h3 className="font-semibold mb-1 text-sm">{edu.institution}</h3>
                <p className="text-editions-purple text-sm mb-1">{edu.degree}</p>
                <p className="text-muted-foreground text-xs mb-2">{edu.period}</p>
                <p className="text-editions-gold font-medium mt-auto">{edu.details}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Header */}
        <div
          className={cn(
            'text-center mb-12 transition-all duration-1000',
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '400ms' }}
        >
          <h3 className="text-2xl md:text-3xl font-display text-editions-gold">
            Certifications & Achievements
          </h3>
        </div>

        {/* Achievements Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {achievements.map((achievement, index) => (
            <div
              key={achievement.title}
              className={cn(
                'p-5 rounded-xl bg-card/30 border border-border/30 transition-all duration-500',
                'hover:bg-card/50 hover:border-editions-gold/30 hover:-translate-y-1',
                visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <achievement.icon className="w-8 h-8 text-editions-gold mb-3" />
              <h4 className="font-medium text-sm mb-2">{achievement.title}</h4>
              <p className="text-xs text-muted-foreground">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
