import React, { useState, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useScrollAnimation, useParallax } from '@/hooks/useScrollAnimation';
import { TextScramble } from '@/hooks/useTextAnimations';
import { cn } from '@/lib/utils';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { ProjectModal } from './ProjectModal';
import { ParallaxContainer } from './SectionTransition';

// Import project screenshots
import savitrAiImage from '@/assets/project-savitr-ai.jpg';
import cyberpunkChatbotImage from '@/assets/project-cyberpunk-chatbot.jpg';
import roadSafetyImage from '@/assets/project-road-safety.jpg';
/**
 * ProjectCard Component
 * Enhanced with 3D tilt effect and gradient animations
 */
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
  inView: boolean;
  onViewDetails: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  inView,
  onViewDetails,
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotation({
      x: ((y - centerY) / centerY) * -8,
      y: ((x - centerX) / centerX) * 8,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -10 }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onViewDetails}
      className="group relative p-6 md:p-8 rounded-2xl cursor-pointer bg-gradient-to-b from-card/80 to-card/40 border border-border/50"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Animated gradient border */}
      <motion.div 
        className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-editions-gold via-editions-purple to-editions-blue p-[1px]">
          <div className="w-full h-full rounded-2xl bg-card" />
        </div>
      </motion.div>

      {/* Floating glow effect */}
      <motion.div 
        className="absolute -inset-1 bg-gradient-to-r from-editions-gold/20 via-editions-purple/20 to-editions-blue/20 rounded-2xl blur-xl -z-10"
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <motion.h3 
              className="text-xl md:text-2xl font-semibold mb-1"
              animate={{ color: isHovered ? 'hsl(var(--editions-gold))' : 'hsl(var(--foreground))' }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>
            <p className="text-sm text-editions-purple">{project.tech}</p>
          </div>
          <div className="flex gap-2">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
            )}
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4">{project.description}</p>

        {/* Highlights */}
        <ul className="space-y-2 mb-4">
          {project.highlights.slice(0, 2).map((highlight, idx) => (
            <motion.li 
              key={idx}
              className="flex items-start gap-2 text-sm text-muted-foreground"
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: index * 0.15 + idx * 0.1 + 0.3 }}
            >
              <motion.span 
                className="w-1.5 h-1.5 rounded-full bg-editions-green mt-2 flex-shrink-0"
                animate={{ scale: isHovered ? [1, 1.5, 1] : 1 }}
                transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
              />
              <span className="group-hover:text-foreground transition-colors">{highlight}</span>
            </motion.li>
          ))}
        </ul>

        {/* View Details Button */}
        <motion.button
          className="flex items-center gap-2 text-sm text-editions-gold hover:text-foreground transition-colors"
          onClick={onViewDetails}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
          <motion.span
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
};

/**
 * SidekickSection - Projects Section
 * Enhanced with parallax background and staggered card animations
 */
export const SidekickSection: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { offset } = useParallax(0.15);
  const containerRef = React.useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });
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
      images: [savitrAiImage],
      category: 'fullstack',
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
      images: [cyberpunkChatbotImage],
      category: 'frontend',
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
      images: [roadSafetyImage],
      category: 'data',
    },
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="relative py-32 px-6 overflow-hidden mt-16" id="projects">
      {/* Parallax grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)/0.03) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--foreground)/0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating gradient orbs with parallax */}
      <ParallaxContainer speed={0.25} className="absolute top-20 left-10 w-80 h-80 rounded-full bg-gradient-to-r from-editions-gold/10 to-transparent blur-3xl pointer-events-none" />
      <ParallaxContainer speed={-0.15} className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-to-r from-editions-purple/10 to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
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
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                activeFilter === filter.value
                  ? "bg-editions-gold text-background border-editions-gold"
                  : "bg-transparent text-muted-foreground border-border/50 hover:border-foreground hover:text-foreground"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={activeFilter === filter.value}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  inView={inView}
                  onViewDetails={() => setSelectedProject(project)}
                />
              </motion.div>
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
