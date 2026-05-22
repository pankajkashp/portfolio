'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { CinematicBackground } from '@/components/effects/CinematicBackground';
import { PanelSidebar } from '@/components/layout/PanelSidebar';
import { MotionConfig } from 'framer-motion';
import { Toaster } from 'sonner';
import { usePerformanceProfile } from '@/hooks/usePerformanceProfile';

const CustomCursor = dynamic(() => import('@/components/cursor/CustomCursor').then((mod) => mod.CustomCursor), {
  ssr: false,
});

export function AppProviders({ children }: { children: ReactNode }) {
  const { shouldEnableHeavyEffects } = usePerformanceProfile();

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <CinematicBackground />
        <div className="fixed inset-4 md:inset-6 rounded-[1.8rem] border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03),0_0_40px_rgba(0,0,0,0.35)] pointer-events-none z-20" />
        <PanelSidebar />
        {shouldEnableHeavyEffects ? <CustomCursor /> : null}
        <Toaster theme="dark" position="top-right" richColors />
        <div className="relative z-10">
          {children}
        </div>
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
