import React, { useState } from 'react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { TextScramble } from '@/hooks/useTextAnimations';
import { cn } from '@/lib/utils';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { ProjectModal } from './ProjectModal';

/**
 * ProjectCard Component
 * Demonstrates hover effects, gradient borders, and staggered entrance
 */
interface Project {
  title: string;
  tech: string;
  description: string;
  highlights: string[];
  github?: string;
  live?: string;
  images?: string[];
  fullDescription?: string;
}

interface ProjectCardProps {
  project: Project;
  isVisible: boolean;
  delay: number;
  onViewDetails: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isVisible,
  delay,
  onViewDetails,
}) => {
  return (
    <div
      className={cn(
        'group relative p-6 md:p-8 rounded-2xl transition-all duration-700 cursor-pointer',
        'bg-gradient-to-b from-card/80 to-card/40',
        'border border-border/50 hover:border-editions-gold/50',
        'hover:shadow-2xl hover:shadow-editions-gold/10',
        'hover:-translate-y-2',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      )}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={onViewDetails}
    >
      {/* Gradient border effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-editions-gold via-editions-purple to-editions-blue p-[1px]">
          <div className="w-full h-full rounded-2xl bg-card" />
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-1 group-hover:text-editions-gold transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-editions-purple">{project.tech}</p>
          </div>
          <div className="flex gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4">{project.description}</p>

        {/* Highlights */}
        <ul className="space-y-2 mb-4">
          {project.highlights.slice(0, 2).map((highlight, index) => (
            <li 
              key={index}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-editions-green mt-2 flex-shrink-0" />
              <span className="group-hover:text-foreground transition-colors">{highlight}</span>
            </li>
          ))}
        </ul>

        {/* View Details Button */}
        <button
          className="flex items-center gap-2 text-sm text-editions-gold hover:text-foreground transition-colors"
          onClick={onViewDetails}
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </button>
      </div>

      {/* Floating effect shadow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-editions-gold/20 via-editions-purple/20 to-editions-blue/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
    </div>
  );
};

/**
 * SidekickSection - Projects Section
 * Portfolio projects with scroll animations
 */
export const SidekickSection: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, visibleItems } = useStaggeredAnimation(3, 150);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: 'Savitr-AI',
      tech: 'Python, Node.js, MongoDB, Twilio, Google Maps API',
      description: 'AI-powered delivery scheduler that optimizes route planning using weather and user data with automated SMS-based rescheduling.',
      fullDescription: 'To solve the problem of inefficient last-mile deliveries, we developed an AI-powered scheduler that optimized route planning using weather and user data and automated SMS-based delivery rescheduling. This project won Best Paper at ICSAA 2025.',
      highlights: [
        'Built scalable backend with Node.js and MongoDB to optimize route planning',
        'Integrated Twilio API to automate SMS-based delivery rescheduling',
        'Reduced failed deliveries by 30% through intelligent scheduling',
        'Won Best Paper at ICSAA 2025 conference',
      ],
      github: 'https://github.com/sayandutta',
      live: '#',
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
      ],
    },
    {
      title: 'Cyberpunk AI Chatbot',
      tech: 'JavaScript, CSS, Gemini API',
      description: 'Interactive chatbot with NLP-powered experience featuring a cyberpunk-themed UI with advanced CSS animations.',
      fullDescription: 'Designed an interactive UI using vanilla JS and advanced CSS animations for enhanced UX. Integrated Gemini API for NLP-powered chat experience, deployed on Render with 99.9% uptime.',
      highlights: [
        'Designed interactive UI with vanilla JS and advanced animations',
        'Integrated Gemini API for NLP-powered chat experience',
        'Deployed on Render with 99.9% uptime',
        'Created immersive cyberpunk-themed visual experience',
      ],
      github: 'https://github.com/sayandutta',
      live: '#',
      images: [
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop',
      ],
    },
    {
      title: 'Road Safety Dashboard',
      tech: 'Qlik Sense, Data Analytics, Data Visualization',
      description: 'Data visualization dashboard for analyzing Indian road accident patterns and delivering safety recommendations.',
      fullDescription: 'Visualized Indian road accident data using Qlik Sense to detect critical patterns. Delivered safety recommendations through data storytelling, helping identify high-risk areas and time periods.',
      highlights: [
        'Visualized comprehensive road accident data using Qlik Sense',
        'Detected critical safety patterns across regions',
        'Delivered actionable recommendations through data storytelling',
        'Created interactive dashboards for stakeholder presentations',
      ],
      github: 'https://github.com/sayandutta',
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
      ],
    },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden" id="projects">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)/0.03) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--foreground)/0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            'text-center mb-16 transition-all duration-1000 ease-out-expo',
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-editions-gold mb-4">
            <TextScramble text="FEATURED WORK" trigger={headerVisible} speed={40} />
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display mb-6">
            Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building scalable solutions with modern technologies and AI integration
          </p>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              isVisible={visibleItems[index]}
              delay={index * 150}
              onViewDetails={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
