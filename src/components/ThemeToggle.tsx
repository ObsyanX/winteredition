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

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        'relative p-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm',
        'hover:border-editions-gold/50 hover:bg-card transition-colors duration-300',
        'focus:outline-none focus:ring-2 focus:ring-editions-gold/30',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Moon className="w-5 h-5 text-editions-gold" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Sun className="w-5 h-5 text-editions-gold" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-full bg-editions-gold/20 blur-xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};
