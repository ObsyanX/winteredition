import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeUp, fadeOnly, scaleIn, staggerContainer, staggerContainerSmall } from '@/lib/motion';
import { MapPin, Calendar, Code, Lightbulb, Coffee, Heart } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.jpeg';

/**
 * AboutSection Component
 * Personal bio with professional copy and intentional animations
 */
export const AboutSection: React.FC = () => {
  const containerRef = React.useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const interests = [
    { icon: Code, label: 'Full-Stack Development' },
    { icon: Lightbulb, label: 'AI & Machine Learning' },
    { icon: Coffee, label: 'Problem Solving' },
    { icon: Heart, label: 'Open Source' },
  ];

  // Select appropriate variants based on reduced motion preference
  const getFadeUp = () => prefersReducedMotion ? fadeOnly : fadeUp;
  const getScaleIn = () => prefersReducedMotion ? fadeOnly : scaleIn;

  return (
    <section className="relative py-32 px-6 overflow-hidden" id="about" ref={containerRef}>
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          variants={getFadeUp()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-editions-gold mb-4">
            About Me
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display">
            Get to Know Me
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo Column */}
          <motion.div
            variants={getScaleIn()}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative">
              {/* Image container */}
              <div className="relative overflow-hidden rounded-2xl border border-border/50">
                <img
                  src={profilePhoto}
                  alt="Sayan Dutta - Full-Stack Developer portrait"
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                
                {/* Location badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50">
                  <MapPin className="w-4 h-4 text-editions-gold" aria-hidden="true" />
                  <span className="text-sm">Siliguri, India</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Bio - using fadeOnly for paragraphs */}
            <motion.div variants={fadeOnly} className="space-y-4">
              <h3 className="text-xl font-semibold text-editions-gold">Hello!</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a final-year Computer Science student passionate about building intelligent, human-focused software.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I enjoy working at the intersection of AI, design, and engineering — where clean UX meets performance and real-world impact.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently exploring AI-driven interfaces, computer vision, and modern SaaS architectures.
              </p>
            </motion.div>

            {/* Current Status */}
            <motion.div
              variants={fadeOnly}
              className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border/50"
            >
              <Calendar className="w-5 h-5 text-editions-purple" aria-hidden="true" />
              <div>
                <p className="text-sm text-muted-foreground">Currently</p>
                <p className="font-medium">Open to Software Engineering opportunities</p>
              </div>
            </motion.div>

            {/* Interests Grid with stagger */}
            <motion.div variants={fadeOnly}>
              <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">What I love</h4>
              <motion.div
                variants={staggerContainerSmall}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="grid grid-cols-2 gap-3"
              >
                {interests.map((interest) => (
                  <motion.div
                    key={interest.label}
                    variants={prefersReducedMotion ? fadeOnly : scaleIn}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card/30 border border-border/30"
                  >
                    <interest.icon className="w-5 h-5 text-editions-gold" aria-hidden="true" />
                    <span className="text-sm">{interest.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
