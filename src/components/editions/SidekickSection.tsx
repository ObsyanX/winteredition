import React, { useState, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeUp, fadeOnly, staggerContainer, cardHover, imageHover, MOTION } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { ExternalLink, Github, Eye, ChevronDown, ChevronUp, Code2, Database, Layout, Cpu } from 'lucide-react';
import { ProjectModal } from './ProjectModal';

// Import project screenshots
import savitrAiImage from '@/assets/project-savitr-ai.jpg';
import cyberpunkChatbotImage from '@/assets/project-cyberpunk-chatbot.jpg';
import roadSafetyImage from '@/assets/project-road-safety.jpg';

type ProjectCategory = 'all' | 'fullstack' | 'frontend' | 'data' | 'backend';

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
  isTemplate?: boolean;
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

  // Icon mapping for template projects
  const getCategoryIcon = () => {
    switch (project.category) {
      case 'frontend': return Layout;
      case 'backend': return Database;
      case 'fullstack': return Code2;
      case 'data': return Cpu;
      default: return Code2;
    }
  };

  const CategoryIcon = getCategoryIcon();

  return (
    <motion.div
      variants={prefersReducedMotion ? fadeOnly : fadeUp}
      whileHover={prefersReducedMotion ? undefined : "hover"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onViewDetails}
      className="group relative p-4 sm:p-6 rounded-xl cursor-pointer bg-card/50 border border-border/50 hover:border-border transition-colors"
    >
      {/* Project Image or Template Placeholder */}
      {project.images && project.images[0] ? (
        <motion.div
          className="relative overflow-hidden rounded-lg mb-3 sm:mb-4 aspect-video"
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
      ) : (
        <motion.div
          className="relative overflow-hidden rounded-lg mb-3 sm:mb-4 aspect-video bg-gradient-to-br from-card to-muted/30 flex items-center justify-center border border-border/30"
          variants={prefersReducedMotion ? undefined : imageHover}
          whileHover="hover"
        >
          <CategoryIcon className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/30 group-hover:text-editions-gold/50 transition-colors" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </motion.div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="text-base sm:text-lg font-semibold mb-0.5 sm:mb-1 group-hover:text-editions-gold transition-colors truncate">
            {project.title}
          </h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{project.tech}</p>
        </div>
        <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 sm:p-2 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 sm:p-2 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Problem Statement - 1 line */}
      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* View Details */}
      <button
        className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-editions-gold hover:text-foreground transition-colors min-h-[44px]"
        aria-label={`View details for ${project.title}`}
      >
        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
  const [showAll, setShowAll] = useState(false);

  const INITIAL_VISIBLE_COUNT = 3;

  const filters: { label: string; value: ProjectCategory }[] = [
    { label: 'All', value: 'all' },
    { label: 'Full-Stack', value: 'fullstack' },
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
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
    // Additional template projects
    {
      title: 'E-Commerce Platform',
      tech: 'React, Node.js, PostgreSQL, Stripe',
      description: 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
      fullDescription: 'A comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, Stripe payment integration, and a complete admin dashboard for inventory and order management.',
      highlights: [
        'Secure payment processing with Stripe',
        'Real-time inventory tracking',
        'Admin dashboard with analytics',
        'Responsive mobile-first design',
      ],
      github: 'https://github.com/sayandutta',
      category: 'fullstack',
      isTemplate: true,
    },
    {
      title: 'API Gateway Service',
      tech: 'Go, Redis, Docker, Kubernetes',
      description: 'High-performance API gateway with rate limiting, caching, and load balancing capabilities.',
      fullDescription: 'Built a scalable API gateway service handling authentication, rate limiting, request caching with Redis, and intelligent load balancing. Deployed on Kubernetes for high availability.',
      highlights: [
        'Sub-millisecond response times',
        'Redis-powered caching layer',
        'JWT authentication middleware',
        'Kubernetes orchestration',
      ],
      github: 'https://github.com/sayandutta',
      category: 'backend',
      isTemplate: true,
    },
    {
      title: 'Portfolio Dashboard',
      tech: 'React, TypeScript, Tailwind CSS',
      description: 'Interactive portfolio dashboard with data visualizations, dark mode, and smooth animations.',
      fullDescription: 'A modern portfolio dashboard showcasing projects, skills, and achievements with interactive charts, theme switching, and Framer Motion animations for a polished user experience.',
      highlights: [
        'Interactive data visualizations',
        'Dark/Light theme support',
        'Framer Motion animations',
        'Fully responsive design',
      ],
      github: 'https://github.com/sayandutta',
      live: '#',
      category: 'frontend',
      isTemplate: true,
    },
    {
      title: 'ML Pipeline Orchestrator',
      tech: 'Python, Apache Airflow, MLflow',
      description: 'Automated machine learning pipeline for model training, evaluation, and deployment workflows.',
      fullDescription: 'An end-to-end ML pipeline orchestration system using Apache Airflow for workflow management and MLflow for experiment tracking, model versioning, and deployment automation.',
      highlights: [
        'Automated model training pipelines',
        'Experiment tracking with MLflow',
        'Model versioning and registry',
        'Scheduled batch predictions',
      ],
      github: 'https://github.com/sayandutta',
      category: 'data',
      isTemplate: true,
    },
    {
      title: 'Real-Time Chat App',
      tech: 'React, Socket.io, Express, MongoDB',
      description: 'Real-time messaging application with private rooms, file sharing, and message encryption.',
      fullDescription: 'A full-stack real-time chat application featuring WebSocket communication, private chat rooms, end-to-end encryption, file sharing capabilities, and message history persistence.',
      highlights: [
        'Real-time WebSocket messaging',
        'End-to-end encryption',
        'File sharing support',
        'Message history & search',
      ],
      github: 'https://github.com/sayandutta',
      live: '#',
      category: 'fullstack',
      isTemplate: true,
    },
  ];

  const filteredProjects = useMemo(() => {
    let filtered = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);
    return showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE_COUNT);
  }, [activeFilter, showAll]);

  const totalFilteredCount = useMemo(() => {
    return activeFilter === 'all' ? projects.length : projects.filter(p => p.category === activeFilter).length;
  }, [activeFilter]);

  const hasMoreProjects = totalFilteredCount > INITIAL_VISIBLE_COUNT;

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden" id="projects" ref={containerRef}>
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          variants={prefersReducedMotion ? fadeOnly : fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-editions-gold mb-3 sm:mb-4">
            Featured Work
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display mb-4 sm:mb-6">
            Projects
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Building scalable solutions with modern technologies and AI integration
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          variants={prefersReducedMotion ? fadeOnly : fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => {
                setActiveFilter(filter.value);
                setShowAll(false);
              }}
              className={cn(
                "px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors border min-h-[40px] sm:min-h-[44px]",
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
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

        {/* View More Button */}
        {hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-8 sm:mt-12"
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className={cn(
                "group flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full",
                "border border-border/50 bg-card/30 backdrop-blur-sm",
                "hover:border-editions-gold/50 hover:bg-card/50",
                "transition-colors text-sm sm:text-base font-medium",
                "min-h-[48px] sm:min-h-[52px]"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                {showAll ? 'Show Less' : `View More (${totalFilteredCount - INITIAL_VISIBLE_COUNT})`}
              </span>
              <motion.div
                animate={{ y: showAll ? 0 : [0, 4, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: showAll ? 0 : Infinity,
                  ease: "easeInOut"
                }}
              >
                {showAll ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-editions-gold" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-editions-gold" />
                )}
              </motion.div>
            </motion.button>
          </motion.div>
        )}
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
