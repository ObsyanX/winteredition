import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { TextScramble, Typewriter } from '@/hooks/useTextAnimations';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from './ContactForm';

export const Footer: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/sayandutta', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/sayandutta', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:duttasayan835@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-border bg-card/30" id="contact">
      <div ref={ref} className="container mx-auto max-w-6xl px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className={cn(
            'transition-all duration-1000 ease-out-expo',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            <p className="text-sm tracking-[0.3em] uppercase text-editions-gold mb-4">
              <TextScramble text="GET IN TOUCH" trigger={isVisible} speed={40} />
            </p>
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              <Typewriter text="Let's Connect" speed={80} trigger={isVisible} cursorClassName="text-editions-gold" />
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>
            <div className="space-y-4 mb-8">
              <a href="mailto:duttasayan835@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors w-fit">
                <Mail className="w-5 h-5 text-editions-gold" />
                <span>duttasayan835@gmail.com</span>
              </a>
              <a href="tel:+919475958774" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors w-fit">
                <Phone className="w-5 h-5 text-editions-purple" />
                <span>+91 9475958774</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-editions-green" />
                <span>Siliguri, India</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-editions-gold hover:bg-editions-gold/10 transition-all duration-300 hover:scale-110">
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div className={cn(
            'transition-all duration-1000 ease-out-expo',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )} style={{ transitionDelay: '200ms' }}>
            <ContactForm />
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto max-w-6xl px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 Sayan Dutta. Built with React & Tailwind.</p>
            <span className="text-xs text-muted-foreground">Animation showcase portfolio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
