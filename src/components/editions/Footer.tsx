import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeUp, fadeOnly, staggerContainer, ctaHover } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from './ContactForm';

export const Footer: React.FC = () => {
  const containerRef = React.useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/sayandutta', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/sayandutta', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:duttasayan835@gmail.com', label: 'Email' },
  ];

  const getFadeUp = () => prefersReducedMotion ? fadeOnly : fadeUp;

  return (
    <footer className="relative border-t border-border bg-card/30 mt-8 sm:mt-16" id="contact">
      <div ref={containerRef} className="container mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16"
        >
          {/* Left Column - Contact Info */}
          <motion.div variants={getFadeUp()}>
            <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-editions-gold mb-3 sm:mb-4">
              Get in Touch
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display mb-4 sm:mb-6">
              Let's build something meaningful together.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mb-6 sm:mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>
            
            {/* Contact Details */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <a 
                href="mailto:duttasayan835@gmail.com" 
                className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors w-fit min-h-[44px]"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-editions-gold flex-shrink-0" />
                <span className="break-all">duttasayan835@gmail.com</span>
              </a>
              <a 
                href="tel:+919475958774" 
                className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors w-fit min-h-[44px]"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-editions-purple flex-shrink-0" />
                <span>+91 9475958774</span>
              </a>
              <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-editions-green flex-shrink-0" />
                <span>Siliguri, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  variants={ctaHover}
                  whileHover={prefersReducedMotion ? undefined : "hover"}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div variants={getFadeUp()}>
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-border safe-area-bottom">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              © 2025 Sayan Dutta. Built with React & Tailwind.
            </p>
            <span className="text-[10px] sm:text-xs text-muted-foreground">
              Designed with intention
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
