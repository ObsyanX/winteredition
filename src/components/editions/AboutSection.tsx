import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useParallax } from '@/hooks/useScrollAnimation';
import { TextScramble, Typewriter } from '@/hooks/useTextAnimations';
import { MapPin, Calendar, Heart, Code, Coffee, Lightbulb } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.jpeg';

/**
 * AboutSection Component
 * Personal bio with animated reveals and interests
 */
export const AboutSection: React.FC = () => {
  const containerRef = React.useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });
  const { offset } = useParallax(0.1);

  const interests = [
    { icon: Code, label: 'Full-Stack Development', color: 'editions-blue' },
    { icon: Lightbulb, label: 'AI & Machine Learning', color: 'editions-purple' },
    { icon: Coffee, label: 'Problem Solving', color: 'editions-gold' },
    { icon: Heart, label: 'Open Source', color: 'editions-green' },
  ];

  const values = [
    'Building scalable, maintainable solutions',
    'Writing clean, well-documented code',
    'Continuous learning and growth',
    'Collaborating with diverse teams',
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden mt-16" id="about" ref={containerRef}>
      {/* Parallax background elements */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 rounded-full bg-gradient-to-r from-editions-purple/10 to-transparent blur-3xl pointer-events-none"
        style={{ y: offset * 0.3 }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-gradient-to-r from-editions-gold/10 to-transparent blur-3xl pointer-events-none"
        style={{ y: offset * -0.2 }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-editions-gold mb-4">
            <TextScramble text="GET TO KNOW ME" trigger={inView} speed={40} />
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display">
            <Typewriter 
              text="About Me"
              speed={80} 
              trigger={inView}
              cursor={false}
            />
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative group">
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-r from-editions-gold via-editions-purple to-editions-blue rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
              
              {/* Image container */}
              <div className="relative overflow-hidden rounded-2xl border border-border/50">
                <img
                  src={profilePhoto}
                  alt="Sayan Dutta - Software Engineer portrait photo"
                  className="w-full h-auto object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                
                {/* Location badge */}
                <motion.div
                  className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.6 }}
                >
                  <MapPin className="w-4 h-4 text-editions-gold" aria-hidden="true" />
                  <span className="text-sm">Kolkata, India</span>
                </motion.div>
              </div>

              {/* Floating decoration */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 border border-editions-gold/30 rounded-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Bio */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-editions-gold">Hello!</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm Sayan Dutta, a passionate Software Engineer with a strong foundation in full-stack development 
                and a keen interest in AI/ML technologies. Currently pursuing my B.Tech in Computer Science & Engineering 
                at SRM Institute of Science and Technology.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I love building scalable applications that solve real-world problems. My journey includes developing 
                AI-powered delivery systems, creating interactive chatbots, and analyzing data to drive impactful decisions.
              </p>
            </div>

            {/* Current Status */}
            <motion.div
              className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border/50"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Calendar className="w-5 h-5 text-editions-purple" aria-hidden="true" />
              <div>
                <p className="text-sm text-muted-foreground">Currently</p>
                <p className="font-medium">Open to Software Engineering opportunities</p>
              </div>
            </motion.div>

            {/* Interests Grid */}
            <div>
              <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">What I love</h4>
              <div className="grid grid-cols-2 gap-3">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card/30 border border-border/30 hover:border-border transition-colors"
                  >
                    <interest.icon className={`w-5 h-5 text-${interest.color}`} aria-hidden="true" />
                    <span className="text-sm">{interest.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Values */}
            <div>
              <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">My values</h4>
              <ul className="space-y-2">
                {values.map((value, index) => (
                  <motion.li
                    key={value}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-editions-green flex-shrink-0" />
                    {value}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
