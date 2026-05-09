'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursorStore } from '@/store/useCursorStore';

export const CustomCursor = () => {
  const { cursorType } = useCursorStore();
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: 'var(--accent)',
    },
    pointer: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(255, 107, 0, 0.1)',
      border: '1px solid var(--accent)',
    },
    text: {
      width: 4,
      height: 24,
      borderRadius: '2px',
      backgroundColor: 'var(--accent)',
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: 'var(--accent)',
      mixBlendMode: 'difference' as const,
    },
    hidden: {
      opacity: 0,
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={cursorType}
        variants={variants}
        initial="default"
      >
        <div className="w-1 h-1 bg-white rounded-full" />
      </motion.div>
      
      {/* Outer Glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full blur-xl"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: 100,
          height: 100,
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          opacity: isVisible ? 0.3 : 0,
        }}
      />
    </>
  );
};
