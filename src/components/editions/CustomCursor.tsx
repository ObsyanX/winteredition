import React, { useEffect, useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CursorPosition {
  x: number;
  y: number;
}

/**
 * CustomCursor Component
 * 
 * Creates a custom cursor with:
 * - Smooth following animation
 * - Scale up on hoverable elements
 * - Magnetic pull effect on buttons
 * - Blend mode for visibility on any background
 */
export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverText, setHoverText] = useState('');

  const requestRef = useRef<number>();
  const targetPosition = useRef<CursorPosition>({ x: 0, y: 0 });

  // Smooth cursor following with lerp
  const animate = useCallback(() => {
    setPosition((prev) => ({
      x: prev.x + (targetPosition.current.x - prev.x) * 0.15,
      y: prev.y + (targetPosition.current.y - prev.y) * 0.15,
    }));

    setDotPosition((prev) => ({
      x: prev.x + (targetPosition.current.x - prev.x) * 0.35,
      y: prev.y + (targetPosition.current.y - prev.y) * 0.35,
    }));

    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest('a, button, [data-cursor="pointer"], [data-magnetic]');
      const magnetic = target.closest('[data-magnetic]') as HTMLElement;

      if (hoverable) {
        setIsHovering(true);
        const cursorText = hoverable.getAttribute('data-cursor-text');
        if (cursorText) setHoverText(cursorText);
      } else {
        setIsHovering(false);
        setHoverText('');
      }

      // Magnetic effect
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;

        // Apply magnetic pull to the element
        magnetic.style.transform = `translate(${distX * 0.2}px, ${distY * 0.2}px)`;
      }
    };

    const handleElementLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magnetic = target.closest('[data-magnetic]') as HTMLElement;

      if (magnetic) {
        magnetic.style.transform = 'translate(0, 0)';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousemove', handleElementHover);
    document.addEventListener('mouseout', handleElementLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseout', handleElementLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Hide on mobile/touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor ring */}
      <div
        className={cn(
          'fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference',
          'transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div
          className={cn(
            'relative -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white',
            'transition-all duration-300 ease-out',
            isHovering ? 'w-16 h-16 bg-white/10' : 'w-10 h-10',
            isClicking && 'scale-75'
          )}
        >
          {/* Hover text */}
          {hoverText && (
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
              {hoverText}
            </span>
          )}
        </div>
      </div>

      {/* Center dot */}
      <div
        className={cn(
          'fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference',
          'transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          transform: `translate(${dotPosition.x}px, ${dotPosition.y}px)`,
        }}
      >
        <div
          className={cn(
            'relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-white',
            'transition-all duration-150',
            isHovering ? 'w-1 h-1' : 'w-2 h-2',
            isClicking && 'scale-150'
          )}
        />
      </div>

      {/* Hide default cursor globally */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};
