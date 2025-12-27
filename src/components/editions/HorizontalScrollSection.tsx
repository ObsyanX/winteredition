import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HorizontalScrollItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  color?: string;
}

interface HorizontalScrollSectionProps {
  items: HorizontalScrollItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({
  items,
  title,
  subtitle,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });
  
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    ['0%', `-${(items.length - 1) * 100}%`]
  );

  return (
    <section 
      ref={containerRef}
      className={cn('relative', className)}
      style={{ height: `${items.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header */}
        {(title || subtitle) && (
          <div className="absolute top-0 left-0 right-0 z-10 pt-24 pb-8 px-6 bg-gradient-to-b from-background via-background to-transparent">
            <div className="container mx-auto max-w-6xl">
              {subtitle && (
                <p className="text-sm tracking-[0.3em] uppercase text-editions-gold mb-4">
                  {subtitle}
                </p>
              )}
              {title && (
                <h2 className="text-4xl md:text-5xl font-display">{title}</h2>
              )}
            </div>
          </div>
        )}

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className="w-8 h-1 rounded-full bg-border overflow-hidden"
            >
              <motion.div
                className="h-full bg-editions-gold"
                style={{
                  scaleX: useTransform(
                    scrollYProgress,
                    [(index) / items.length, (index + 1) / items.length],
                    [0, 1]
                  ),
                  transformOrigin: 'left'
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Horizontal scroll container */}
        <motion.div 
          className="flex h-full items-center pt-32 pb-16"
          style={{ x }}
        >
          {items.map((item, index) => (
            <HorizontalCard 
              key={item.id} 
              item={item} 
              index={index}
              progress={scrollYProgress}
              totalItems={items.length}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface HorizontalCardProps {
  item: HorizontalScrollItem;
  index: number;
  progress: any;
  totalItems: number;
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({ 
  item, 
  index, 
  progress,
  totalItems 
}) => {
  const start = index / totalItems;
  const end = (index + 1) / totalItems;
  
  const scale = useTransform(
    progress,
    [start, start + 0.1, end - 0.1, end],
    [0.8, 1, 1, 0.8]
  );
  
  const opacity = useTransform(
    progress,
    [start, start + 0.1, end - 0.1, end],
    [0.5, 1, 1, 0.5]
  );

  return (
    <motion.div
      className="flex-shrink-0 w-screen h-full px-6 flex items-center justify-center"
      style={{ scale, opacity }}
    >
      <div 
        className={cn(
          'w-full max-w-4xl p-12 rounded-3xl',
          'bg-card/50 backdrop-blur-xl border border-border/50',
          'transition-all duration-500'
        )}
        style={{ 
          boxShadow: item.color ? `0 0 100px ${item.color}20` : undefined 
        }}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div>
            <motion.span 
              className="inline-block text-sm font-mono text-muted-foreground mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.span>
            
            <h3 className="text-3xl md:text-4xl font-display mb-4">
              {item.title}
            </h3>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Image/Visual */}
          {item.image ? (
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div 
              className="relative aspect-square rounded-2xl bg-gradient-to-br from-editions-gold/20 to-editions-purple/20 flex items-center justify-center"
            >
              <span className="text-8xl opacity-50">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HorizontalScrollSection;
