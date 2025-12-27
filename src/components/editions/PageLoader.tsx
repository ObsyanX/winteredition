import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextScramble } from '@/hooks/useTextAnimations';

interface PageLoaderProps {
  onComplete: () => void;
  minDuration?: number;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ 
  onComplete, 
  minDuration = 2500 
}) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    let animationFrame: number;
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / minDuration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress < 100) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        setIsExiting(true);
        setTimeout(onComplete, 800);
      }
    };
    
    animationFrame = requestAnimationFrame(updateProgress);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: 'blur(20px)',
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Geometric background pattern */}
          <div className="absolute inset-0 geometric-bg opacity-20" />
          
          {/* Animated geometric shapes */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-editions-gold/20"
                style={{
                  width: 200 + i * 100,
                  height: 200 + i * 100,
                  borderRadius: i % 2 === 0 ? '50%' : '0%',
                  left: '50%',
                  top: '50%',
                }}
                initial={{ 
                  x: '-50%', 
                  y: '-50%', 
                  rotate: 0,
                  opacity: 0,
                  scale: 0.5
                }}
                animate={{ 
                  x: '-50%', 
                  y: '-50%', 
                  rotate: i % 2 === 0 ? 360 : -360,
                  opacity: 0.3,
                  scale: 1
                }}
                transition={{ 
                  rotate: { duration: 20 + i * 5, repeat: Infinity, ease: 'linear' },
                  opacity: { duration: 0.5, delay: i * 0.1 },
                  scale: { duration: 0.5, delay: i * 0.1 }
                }}
              />
            ))}
          </div>

          {/* Logo/Name */}
          <motion.div
            className="relative z-10 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div
              className="text-6xl md:text-8xl font-display mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-gradient-animate">SD</span>
            </motion.div>
            
            <div className="text-lg md:text-xl tracking-[0.3em] uppercase text-muted-foreground">
              <TextScramble 
                text="SAYAN DUTTA" 
                trigger={true} 
                speed={50} 
              />
            </div>
          </motion.div>

          {/* Progress bar container */}
          <motion.div
            className="relative z-10 w-64 md:w-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Progress bar background */}
            <div className="h-[2px] bg-border/50 rounded-full overflow-hidden">
              {/* Progress bar fill */}
              <motion.div
                className="h-full bg-gradient-to-r from-editions-gold via-editions-purple to-editions-blue"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            {/* Progress percentage */}
            <motion.div 
              className="mt-4 text-center text-sm text-muted-foreground font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Math.round(progress)}%
            </motion.div>
          </motion.div>

          {/* Loading text */}
          <motion.p
            className="absolute bottom-12 text-xs tracking-[0.2em] uppercase text-muted-foreground/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Loading Experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
