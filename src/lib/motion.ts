/**
 * Motion System Foundation
 * Centralized motion tokens and Framer Motion variants
 * for consistent, professional animations across the portfolio
 */

// Core motion tokens
export const MOTION = {
  ease: [0.22, 1, 0.36, 1] as const,
  duration: {
    fast: 0.3,
    base: 0.45,
    slow: 0.6,
  },
  stagger: {
    small: 0.08,
    medium: 0.12,
  },
} as const;

// Reusable Framer Motion variants

/**
 * fadeUp - Primary entrance animation
 * Usage: Hero text, section headings, cards, CTAs
 */
export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION.duration.base,
      ease: MOTION.ease,
    },
  },
};

/**
 * fadeOnly - Readability-safe animation (no movement)
 * Usage: Long paragraphs, case study text, descriptions
 */
export const fadeOnly = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: MOTION.duration.fast,
      ease: MOTION.ease,
    },
  },
};

/**
 * scaleIn - Visual elements animation
 * Usage: Images, mockups, profile photo
 */
export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: MOTION.duration.slow,
      ease: MOTION.ease,
    },
  },
};

/**
 * staggerContainer - Grouped content animation
 * Usage: Project grids, form fields, skill tags
 */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: MOTION.stagger.medium,
    },
  },
};

/**
 * staggerContainerSmall - Tighter stagger for smaller groups
 */
export const staggerContainerSmall = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: MOTION.stagger.small,
    },
  },
};

/**
 * ctaHover - Interaction feedback for buttons
 */
export const ctaHover = {
  hover: {
    y: -3,
    transition: {
      duration: 0.2,
      ease: MOTION.ease,
    },
  },
};

/**
 * cardHover - Hover effect for project cards
 */
export const cardHover = {
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.25,
      ease: MOTION.ease,
    },
  },
};

/**
 * subtlePulse - Subtle pulse for submit buttons
 */
export const subtlePulse = {
  pulse: {
    scale: [1, 1.03, 1],
    transition: {
      duration: 0.6,
      ease: MOTION.ease,
      repeat: Infinity,
      repeatDelay: 2,
    },
  },
};

/**
 * imageHover - Nested image hover within cards
 */
export const imageHover = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: MOTION.ease,
    },
  },
};

/**
 * Helper to create reduced motion variants
 * Disables y/scale transforms, allows opacity only
 */
export const getReducedMotionVariants = (variants: Record<string, any>, prefersReducedMotion: boolean) => {
  if (!prefersReducedMotion) return variants;
  
  const reduced: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(variants)) {
    reduced[key] = {
      opacity: value.opacity ?? 1,
      transition: value.transition,
    };
  }
  
  return reduced;
};
