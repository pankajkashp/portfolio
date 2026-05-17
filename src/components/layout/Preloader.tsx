'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hero-preloader-shown');
    if (hasVisited) {
      const hideTimer = window.setTimeout(() => {
        setShow(false);
        onComplete();
      }, 0);
      return () => window.clearTimeout(hideTimer);
    }

    const finishTimer = window.setTimeout(() => {
      sessionStorage.setItem('hero-preloader-shown', 'true');
      setShow(false);
      window.setTimeout(onComplete, 250);
    }, 1400);

    return () => window.clearTimeout(finishTimer);
  }, [onComplete]);

  const letters = ['P', 'A', 'N', 'K', 'A', 'J'];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[1000] bg-[#06060a] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 0.98,
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
          }}
        >
          {/* Soft ambient background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.14),transparent_38%),radial-gradient(circle_at_50%_60%,rgba(192,132,252,0.06),transparent_55%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#06060a] via-transparent to-[#06060a]" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-end gap-1 sm:gap-2 md:gap-3">
              {letters.map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  className="text-[clamp(3rem,10vw,7rem)] font-black tracking-[0.2em] text-white leading-none"
                  animate={{ y: [0, -16, 0] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.08,
                  }}
                  style={{ color: index === 5 ? 'var(--accent)' : 'white' }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.div
              className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-white/25 font-black"
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="w-10 h-px bg-[#a855f7]" />
              <span>Loading</span>
              <span className="w-10 h-px bg-[#a855f7]" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
