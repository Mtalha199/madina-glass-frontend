"use client";

import { motion, Variants, Transition } from "framer-motion";
import { ReactNode } from "react";

/**
 * Reusable animation variants for common animations
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    }
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    }
  },
};

export const slideInFromTop: Variants = {
  hidden: { 
    opacity: 0, 
    y: -100,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    }
  },
};

export const slideInFromBottom: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    }
  },
};

export const slideInFromLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -50,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    }
  },
};

export const slideInFromRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 30,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    }
  },
};

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    }
  },
};

/**
 * Default transition for smooth animations
 */
export const defaultTransition: Transition = {
  duration: 0.6,
  ease: [0.6, -0.05, 0.01, 0.99],
};

/**
 * Stagger container for animating children with delay
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/**
 * Reusable Animated Component Props
 */
interface AnimatedComponentProps {
  children: ReactNode;
  variants?: Variants;
  initial?: string;
  animate?: string;
  transition?: Transition;
  className?: string;
  delay?: number;
}

/**
 * Reusable animated wrapper component
 */
export function AnimatedComponent({
  children,
  variants = fadeIn,
  initial = "hidden",
  animate = "visible",
  transition,
  className = "",
  delay = 0,
}: AnimatedComponentProps) {
  return (
    <motion.div
      variants={variants}
      initial={initial}
      animate={animate}
      transition={transition || { ...defaultTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated section wrapper for page sections
 */
interface AnimatedSectionProps {
  children: ReactNode;
  direction?: "top" | "bottom" | "left" | "right" | "fade";
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  direction = "fade",
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  const variantsMap = {
    top: slideInFromTop,
    bottom: slideInFromBottom,
    left: slideInFromLeft,
    right: slideInFromRight,
    fade: fadeIn,
  };

  return (
    <AnimatedComponent
      variants={variantsMap[direction]}
      className={className}
      delay={delay}
    >
      {children}
    </AnimatedComponent>
  );
}

