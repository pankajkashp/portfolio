'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { personalInfo } from '@/data/personal';

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ background: 'var(--background)' }}
        >
          {/* Ambient Glow */}
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute w-[400px] h-[400px] rounded-full blur-[120px] -z-10"
            style={{ background: 'rgba(var(--accent-rgb), 0.15)' }}
          />

          <div className="relative overflow-hidden mb-6">
            <motion.div
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <Typography variant="display" className="text-3xl md:text-5xl font-bold tracking-tighter">
                {personalInfo.name.split(' ')[0].toLowerCase()}<span style={{ color: 'var(--accent)' }}>.</span>
              </Typography>
            </motion.div>
          </div>

          <div className="w-40 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div 
              className="absolute inset-0"
              style={{ background: 'var(--accent)' }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <div className="mt-4 font-mono text-xs tabular-nums" style={{ color: 'var(--text-muted)' }}>
            {Math.min(progress, 100)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
