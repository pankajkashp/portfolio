'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';

const ROLES = [
  'AI ARCHITECT',
  'CREATIVE DEVELOPER',
  'FULLSTACK ENGINEER',
  'SYSTEM DESIGNER'
];

export const RoleRotator = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 md:h-12 overflow-hidden flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={ROLES[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <Typography variant="subtitle" className="text-accent font-mono tracking-widest uppercase">
            {ROLES[index]}
          </Typography>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
