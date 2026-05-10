import { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
  }
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
  }
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    }
  }
};

export const blurReveal: Variants = {
  initial: { opacity: 0, filter: 'blur(20px)', y: 30, scale: 0.95 },
  animate: { 
    opacity: 1, 
    filter: 'blur(0px)',
    y: 0,
    scale: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
  }
};
