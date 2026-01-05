import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  const iconVariants = {
    initial: { 
      scale: 0, 
      rotate: -180, 
      opacity: 0 
    },
    animate: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        duration: 0.5
      }
    },
    exit: { 
      scale: 0, 
      rotate: 180, 
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const raysVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.4,
        ease: [0, 0, 0.2, 1] as const
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        'relative p-2.5 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden',
        'hover:border-editions-gold/50 hover:bg-card',
        'focus:outline-none focus:ring-2 focus:ring-editions-gold/30',
        'min-w-[44px] min-h-[44px] flex items-center justify-center',
        className
      )}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Background glow that pulses on toggle */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle, hsl(var(--editions-gold) / 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, hsl(var(--editions-gold) / 0.25) 0%, transparent 70%)',
        }}
        transition={{ duration: 0.5 }}
      />

      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            className="relative"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Moon className="w-5 h-5 text-editions-gold" />
            {/* Subtle stars around moon */}
            <motion.div
              className="absolute -top-1 -right-1 w-1 h-1 rounded-full bg-editions-gold/60"
              variants={raysVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            />
            <motion.div
              className="absolute -bottom-0.5 -left-1 w-0.5 h-0.5 rounded-full bg-editions-gold/40"
              variants={raysVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ delay: 0.15 }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            className="relative"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Sun className="w-5 h-5 text-editions-gold" />
            {/* Sun rays animation */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={raysVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="absolute w-8 h-8 rounded-full border border-editions-gold/20" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Outer glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-full bg-editions-gold/10 blur-xl -z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 0.6, scale: 1.2 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};
