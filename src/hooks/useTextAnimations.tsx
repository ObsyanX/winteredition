import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Text Animation Hooks
 * 
 * Three micro-interaction animations:
 * 1. useTextScramble - Scrambles text with random characters before revealing
 * 2. useCountUp - Animates numbers counting up
 * 3. useTypewriter - Types text character by character
 */

// ============= TEXT SCRAMBLE =============

interface UseTextScrambleOptions {
  speed?: number;
  characters?: string;
  trigger?: boolean;
}

export const useTextScramble = (
  finalText: string,
  options: UseTextScrambleOptions = {}
) => {
  const {
    speed = 50,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*',
    trigger = true,
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const frameRef = useRef<number>();
  const iterationRef = useRef(0);

  useEffect(() => {
    if (!trigger) {
      setDisplayText('');
      setIsComplete(false);
      return;
    }

    iterationRef.current = 0;
    setIsComplete(false);

    const scramble = () => {
      const progress = iterationRef.current / finalText.length;
      
      let result = '';
      for (let i = 0; i < finalText.length; i++) {
        if (finalText[i] === ' ') {
          result += ' ';
        } else if (i < iterationRef.current) {
          result += finalText[i];
        } else {
          result += characters[Math.floor(Math.random() * characters.length)];
        }
      }
      
      setDisplayText(result);
      
      if (iterationRef.current < finalText.length) {
        iterationRef.current += 0.5;
        frameRef.current = window.setTimeout(scramble, speed);
      } else {
        setDisplayText(finalText);
        setIsComplete(true);
      }
    };

    scramble();

    return () => {
      if (frameRef.current) {
        clearTimeout(frameRef.current);
      }
    };
  }, [finalText, speed, characters, trigger]);

  return { displayText, isComplete };
};

// ============= COUNT UP =============

interface UseCountUpOptions {
  start?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  trigger?: boolean;
}

export const useCountUp = (
  end: number,
  options: UseCountUpOptions = {}
) => {
  const {
    start = 0,
    duration = 2000,
    decimals = 0,
    prefix = '',
    suffix = '',
    trigger = true,
  } = options;

  const [count, setCount] = useState(start);
  const [isComplete, setIsComplete] = useState(false);
  const startTimeRef = useRef<number>();
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!trigger) {
      setCount(start);
      setIsComplete(false);
      return;
    }

    setIsComplete(false);
    startTimeRef.current = undefined;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      
      // Easing function for smooth counting
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = start + (end - start) * easeOutQuart;
      
      setCount(Number(currentValue.toFixed(decimals)));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
        setIsComplete(true);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, start, duration, decimals, trigger]);

  const displayValue = `${prefix}${count.toFixed(decimals)}${suffix}`;

  return { count, displayValue, isComplete };
};

// ============= TYPEWRITER =============

interface UseTypewriterOptions {
  speed?: number;
  startDelay?: number;
  cursor?: boolean;
  loop?: boolean;
  deleteSpeed?: number;
  pauseTime?: number;
  trigger?: boolean;
}

export const useTypewriter = (
  text: string | string[],
  options: UseTypewriterOptions = {}
) => {
  const {
    speed = 100,
    startDelay = 0,
    cursor = true,
    loop = false,
    deleteSpeed = 50,
    pauseTime = 2000,
    trigger = true,
  } = options;

  const texts = Array.isArray(text) ? text : [text];
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setDisplayText('');
      setIsTyping(false);
      setIsDeleting(false);
      setTextIndex(0);
      setCharIndex(0);
      return;
    }

    const currentText = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (!isTyping && !isDeleting && charIndex === 0) {
      // Start delay
      timeout = setTimeout(() => {
        setIsTyping(true);
      }, startDelay);
    } else if (isTyping) {
      if (charIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, speed);
      } else {
        // Finished typing
        setIsTyping(false);
        if (loop || textIndex < texts.length - 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseTime);
        }
      }
    } else if (isDeleting) {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deleteSpeed);
      } else {
        // Finished deleting
        setIsDeleting(false);
        const nextIndex = (textIndex + 1) % texts.length;
        if (nextIndex !== 0 || loop) {
          setTextIndex(nextIndex);
          setIsTyping(true);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [trigger, isTyping, isDeleting, charIndex, textIndex, texts, speed, deleteSpeed, startDelay, pauseTime, loop]);

  return {
    displayText,
    isTyping,
    isDeleting,
    isComplete: !isTyping && !isDeleting && charIndex === texts[textIndex]?.length,
    cursor: cursor ? '|' : '',
  };
};

// ============= REACT COMPONENTS =============

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  trigger?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  className = '',
  speed = 50,
  trigger = true,
  as: Component = 'span',
}) => {
  const { displayText } = useTextScramble(text, { speed, trigger });

  return React.createElement(Component, { className }, displayText || '\u00A0');
};

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  trigger?: boolean;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  trigger = true,
}) => {
  const { displayValue } = useCountUp(end, { start, duration, decimals, prefix, suffix, trigger });

  return <span className={className}>{displayValue}</span>;
};

interface TypewriterProps {
  text: string | string[];
  className?: string;
  speed?: number;
  cursor?: boolean;
  cursorClassName?: string;
  loop?: boolean;
  trigger?: boolean;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  className = '',
  speed = 100,
  cursor = true,
  cursorClassName = '',
  loop = false,
  trigger = true,
}) => {
  const { displayText, cursor: cursorChar } = useTypewriter(text, { speed, cursor, loop, trigger });

  return (
    <span className={className}>
      {displayText}
      {cursor && (
        <span className={`animate-pulse ${cursorClassName}`}>{cursorChar}</span>
      )}
    </span>
  );
};
