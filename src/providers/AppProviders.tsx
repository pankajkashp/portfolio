'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { CinematicBackground } from '@/components/effects/CinematicBackground';
import { PanelSidebar } from '@/components/layout/PanelSidebar';
import { useDashboardStore } from '@/store/useDashboardStore';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Toaster } from 'sonner';
import { usePerformanceProfile } from '@/hooks/usePerformanceProfile';

const Navbar = dynamic(() => import('@/components/layout/Navbar').then((mod) => mod.Navbar), {
  ssr: false,
});

const CustomCursor = dynamic(() => import('@/components/cursor/CustomCursor').then((mod) => mod.CustomCursor), {
  ssr: false,
});

export function AppProviders({ children }: { children: ReactNode }) {
  const { isDashboardOpen } = useDashboardStore();
  const { shouldEnableHeavyEffects } = usePerformanceProfile();

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <CinematicBackground />
        <AnimatePresence>
          {!isDashboardOpen && (
            <motion.div
              initial={{ y: -32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -32, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
            >
              <div className="pointer-events-auto">
                <Navbar />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <PanelSidebar />
        {shouldEnableHeavyEffects ? <CustomCursor /> : null}
        <Toaster theme="dark" position="top-right" richColors />
        {children}
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
