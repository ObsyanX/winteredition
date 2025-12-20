import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { TextScramble, Typewriter } from '@/hooks/useTextAnimations';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

/**
 * Footer Component - Portfolio Version
 * Demonstrates:
 * - Staggered link animations on scroll
 * - Hover underline effects
 * - Contact form section
 */
export const Footer: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/sayandutta', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/sayandutta', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:duttasayan835@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-border bg-card/30" id="contact">
      {/* Contact Section */}
      <div ref={ref} className="container mx-auto max-w-4xl px-6 py-20">
        <div
          className={cn(
            'text-center transition-all duration-1000 ease-out-expo',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-editions-gold mb-4">
            <TextScramble text="GET IN TOUCH" trigger={isVisible} speed={40} />
          </p>
          
          <h2 className="text-4xl md:text-6xl font-display mb-6">
            <Typewriter 
              text="Let's Connect" 
              speed={80} 
              trigger={isVisible}
              cursorClassName="text-editions-gold"
            />
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          {/* Contact Info */}
          <div
            className={cn(
              'flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '200ms' }}
          >
            <a
              href="mailto:duttasayan835@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-5 h-5 text-editions-gold" />
              <span>duttasayan835@gmail.com</span>
            </a>
            <a
              href="tel:+919475958774"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-5 h-5 text-editions-purple" />
              <span>+91 9475958774</span>
            </a>
          </div>

          <div
            className={cn(
              'flex items-center justify-center gap-2 text-muted-foreground mb-10 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '300ms' }}
          >
            <MapPin className="w-5 h-5 text-editions-green" />
            <span>Siliguri, India</span>
          </div>

          {/* Social Links */}
          <div
            className={cn(
              'flex items-center justify-center gap-4 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '400ms' }}
          >
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'group p-4 rounded-full border border-border/50 text-muted-foreground',
                  'hover:text-foreground hover:border-editions-gold hover:bg-editions-gold/10',
                  'transition-all duration-300 hover:scale-110'
                )}
                style={{ transitionDelay: `${index * 100 + 500}ms` }}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div
            className={cn(
              'mt-12 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '600ms' }}
          >
            <a
              href="mailto:duttasayan835@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-medium rounded-full transition-all duration-300 hover:scale-105 group"
            >
              <span>Send me a message</span>
              <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto max-w-6xl px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Sayan Dutta. Built with React & Tailwind.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-muted-foreground">
                Animation showcase portfolio
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
