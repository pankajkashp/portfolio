'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { fadeUp, fadeIn, blurReveal, scaleIn } from './variants';

interface RevealProps {
  children: ReactNode;
  variant?: 'fadeUp' | 'fadeIn' | 'blurReveal' | 'scaleIn';
  delay?: number;
  className?: string;
  width?: 'fit-content' | '100%';
}

export const Reveal = ({ 
  children, 
  variant = 'fadeUp', 
  delay = 0, 
  className = '', 
  width = 'fit-content' 
}: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const variants = {
    fadeUp,
    fadeIn,
    blurReveal,
    scaleIn,
  };

  const selectedVariant = variants[variant];

  return (
    <div ref={ref} className={className} style={{ width, position: 'relative', overflow: 'hidden' }}>
      <motion.div
        variants={selectedVariant}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};
