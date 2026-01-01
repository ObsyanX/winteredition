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
    <footer className="relative border-t border-border bg-card/30 mt-16" id="contact">
      <div ref={containerRef} className="container mx-auto max-w-6xl px-6 py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16"
        >
          {/* Left Column - Contact Info */}
          <motion.div variants={getFadeUp()}>
            <p className="text-sm tracking-[0.3em] uppercase text-editions-gold mb-4">
              Get in Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              Let's build something meaningful together.
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>
            
            {/* Contact Details */}
            <div className="space-y-4 mb-8">
              <a 
                href="mailto:duttasayan835@gmail.com" 
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                <Mail className="w-5 h-5 text-editions-gold" />
                <span>duttasayan835@gmail.com</span>
              </a>
              <a 
                href="tel:+919475958774" 
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                <Phone className="w-5 h-5 text-editions-purple" />
                <span>+91 9475958774</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-editions-green" />
                <span>Siliguri, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                  variants={ctaHover}
                  whileHover={prefersReducedMotion ? undefined : "hover"}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
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
      <div className="border-t border-border">
        <div className="container mx-auto max-w-6xl px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Sayan Dutta. Built with React & Tailwind.
            </p>
            <span className="text-xs text-muted-foreground">
              Designed with intention
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
