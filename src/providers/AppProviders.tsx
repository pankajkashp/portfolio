'use client';

import { ReactNode } from 'react';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { CinematicBackground } from '@/components/effects/CinematicBackground';
import { Preloader } from '@/components/effects/Preloader';
import { Navbar } from '@/components/layout/Navbar';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <Preloader />
      <CinematicBackground />
      <Navbar />
      <CustomCursor />
      {children}
    </SmoothScrollProvider>
  );
}
