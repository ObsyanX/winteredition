import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ExternalLink, Github, X } from 'lucide-react';

interface ProjectModalProps {
  project: {
    title: string;
    tech: string;
    description: string;
    highlights: string[];
    github?: string;
    live?: string;
    images?: string[];
    fullDescription?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [activeImage, setActiveImage] = React.useState(0);

  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-display pr-8">
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Gallery */}
          {project.images && project.images.length > 0 && (
            <div className="space-y-3">
              <div className="aspect-video rounded-xl overflow-hidden bg-muted border border-border">
                <img
                  src={project.images[activeImage]}
                  alt={`${project.title} screenshot ${activeImage + 1}`}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
              {project.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {project.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={cn(
                        'flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all',
                        activeImage === index
                          ? 'border-editions-gold'
                          : 'border-border hover:border-muted-foreground'
                      )}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.split(', ').map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm rounded-full bg-editions-purple/10 text-editions-purple border border-editions-purple/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">About</h4>
            <p className="text-foreground leading-relaxed">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Key Features</h4>
            <ul className="space-y-2">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-editions-gold mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-border">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground hover:bg-foreground hover:text-background transition-all"
              >
                <Github className="w-4 h-4" />
                <span>View Code</span>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background hover:bg-editions-gold transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
