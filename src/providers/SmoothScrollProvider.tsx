'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import { ReactNode } from 'react';
import { usePerformanceProfile } from '@/hooks/usePerformanceProfile';

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const { shouldReduceEffects } = usePerformanceProfile();

  if (shouldReduceEffects) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.15,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.1,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
