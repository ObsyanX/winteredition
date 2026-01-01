import React, { useState, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeUp, fadeOnly, staggerContainer, cardHover, imageHover, MOTION } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { ProjectModal } from './ProjectModal';

// Import project screenshots
import savitrAiImage from '@/assets/project-savitr-ai.jpg';
import cyberpunkChatbotImage from '@/assets/project-cyberpunk-chatbot.jpg';
import roadSafetyImage from '@/assets/project-road-safety.jpg';

type ProjectCategory = 'all' | 'fullstack' | 'frontend' | 'data';

interface Project {
  title: string;
  tech: string;
  description: string;
  highlights: string[];
  github?: string;
  live?: string;
  images?: string[];
  fullDescription?: string;
  category: ProjectCategory;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: () => void;
}

/**
 * ProjectCard Component
 * Simplified with clean hover effects using motion variants
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onViewDetails }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={prefersReducedMotion ? fadeOnly : fadeUp}
      whileHover={prefersReducedMotion ? undefined : "hover"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onViewDetails}
      className="group relative p-6 rounded-xl cursor-pointer bg-card/50 border border-border/50 hover:border-border transition-colors"
    >
      {/* Project Image */}
      {project.images && project.images[0] && (
        <motion.div
          className="relative overflow-hidden rounded-lg mb-4 aspect-video"
          variants={prefersReducedMotion ? undefined : imageHover}
          whileHover="hover"
        >
          <img
            src={project.images[0]}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
        </motion.div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold mb-1 group-hover:text-editions-gold transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-muted-foreground">{project.tech}</p>
        </div>
        <div className="flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label={`View ${project.title} on GitHub`}
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
              className="p-2 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Problem Statement - 1 line */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* View Details */}
      <button
        className="flex items-center gap-2 text-sm text-editions-gold hover:text-foreground transition-colors"
        aria-label={`View details for ${project.title}`}
      >
        <Eye className="w-4 h-4" />
        <span>View Details</span>
      </button>
    </motion.div>
  );
};

/**
 * SidekickSection - Projects Section
 * Clean layout with consistent motion variants
 */
export const SidekickSection: React.FC = () => {
  const containerRef = React.useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');

  const filters: { label: string; value: ProjectCategory }[] = [
    { label: 'All', value: 'all' },
    { label: 'Full-Stack', value: 'fullstack' },
    { label: 'Frontend', value: 'frontend' },
    { label: 'Data', value: 'data' },
  ];

  const projects: Project[] = [
    {
      title: 'Savitr-AI',
      tech: 'Python, Node.js, MongoDB, Twilio',
      description: 'AI-powered delivery scheduler optimizing route planning with weather data and automated SMS rescheduling.',
      fullDescription: 'To solve the problem of inefficient last-mile deliveries, we developed an AI-powered scheduler that optimized route planning using weather and user data and automated SMS-based delivery rescheduling. This project won Best Paper at ICSAA 2025.',
      highlights: [
        'Built scalable backend with Node.js and MongoDB',
        'Integrated Twilio API for automated SMS',
        'Reduced failed deliveries by 30%',
        'Won Best Paper at ICSAA 2025',
      ],
      github: 'https://github.com/sayandutta',
      live: '#',
      images: [savitrAiImage],
      category: 'fullstack',
    },
    {
      title: 'Cyberpunk AI Chatbot',
      tech: 'JavaScript, CSS, Gemini API',
      description: 'Interactive chatbot with NLP-powered experience featuring cyberpunk-themed UI with advanced animations.',
      fullDescription: 'Designed an interactive UI using vanilla JS and advanced CSS animations for enhanced UX. Integrated Gemini API for NLP-powered chat experience, deployed on Render with 99.9% uptime.',
      highlights: [
        'Designed interactive UI with vanilla JS',
        'Integrated Gemini API for NLP',
        'Deployed on Render with 99.9% uptime',
        'Immersive cyberpunk visual experience',
      ],
      github: 'https://github.com/sayandutta',
      live: '#',
      images: [cyberpunkChatbotImage],
      category: 'frontend',
    },
    {
      title: 'Road Safety Dashboard',
      tech: 'Qlik Sense, Data Analytics',
      description: 'Data visualization dashboard analyzing Indian road accident patterns with safety recommendations.',
      fullDescription: 'Visualized Indian road accident data using Qlik Sense to detect critical patterns. Delivered safety recommendations through data storytelling, helping identify high-risk areas and time periods.',
      highlights: [
        'Visualized road accident data with Qlik Sense',
        'Detected critical safety patterns',
        'Actionable recommendations via data storytelling',
        'Interactive stakeholder dashboards',
      ],
      github: 'https://github.com/sayandutta',
      images: [roadSafetyImage],
      category: 'data',
    },
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="relative py-32 px-6 overflow-hidden" id="projects" ref={containerRef}>
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          variants={prefersReducedMotion ? fadeOnly : fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-editions-gold mb-4">
            Featured Work
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">
            Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building scalable solutions with modern technologies and AI integration
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          variants={prefersReducedMotion ? fadeOnly : fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-colors border",
                activeFilter === filter.value
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border/50 hover:border-foreground hover:text-foreground"
              )}
              aria-pressed={activeFilter === filter.value}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onViewDetails={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
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
