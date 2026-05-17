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
        <PanelSidebar />
        {shouldEnableHeavyEffects ? <CustomCursor /> : null}
        <Toaster theme="dark" position="top-right" richColors />
        {children}
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
