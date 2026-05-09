'use client';

import { ReactNode } from 'react';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { CustomCursor } from '@/components/cursor/CustomCursor';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      {children}
    </SmoothScrollProvider>
  );
}
