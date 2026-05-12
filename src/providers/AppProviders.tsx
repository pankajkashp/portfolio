'use client';

import { ReactNode } from 'react';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { CinematicBackground } from '@/components/effects/CinematicBackground';
import { Preloader } from '@/components/effects/Preloader';
import { Navbar } from '@/components/layout/Navbar';

import { useDashboardStore } from '@/store/useDashboardStore';
import { motion, AnimatePresence } from 'framer-motion';

export function AppProviders({ children }: { children: ReactNode }) {
  const { isDashboardOpen } = useDashboardStore();

  return (
    <SmoothScrollProvider>
      <Preloader />
      <CinematicBackground />
      <AnimatePresence>
        {!isDashboardOpen && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
          >
            <div className="pointer-events-auto">
              <Navbar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <CustomCursor />
      {children}
    </SmoothScrollProvider>
  );
}
