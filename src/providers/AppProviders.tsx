'use client';

import { ReactNode } from 'react';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { Preloader } from '@/components/effects/Preloader';
import { ScrollProgress } from '@/components/layout/ScrollProgress';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <Preloader />
      <ScrollProgress />
      <CustomCursor />
      {children}
    </SmoothScrollProvider>
  );
}
