'use client';

import { useEffect, useState } from 'react';

type PerformanceProfile = {
  isReducedMotion: boolean;
  isTouchDevice: boolean;
  isFinePointer: boolean;
  isCompactViewport: boolean;
  shouldReduceEffects: boolean;
  shouldEnableHeavyEffects: boolean;
};

const defaultProfile: PerformanceProfile = {
  isReducedMotion: false,
  isTouchDevice: false,
  isFinePointer: true,
  isCompactViewport: false,
  shouldReduceEffects: false,
  shouldEnableHeavyEffects: true,
};

export function usePerformanceProfile() {
  const [profile, setProfile] = useState<PerformanceProfile>(defaultProfile);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointerQuery = window.matchMedia('(pointer: fine)');
    const touchQuery = window.matchMedia('(pointer: coarse)');

    const update = () => {
      const compactViewport = window.innerWidth < 768;
      const isReducedMotion = reducedMotionQuery.matches;
      const isTouchDevice = touchQuery.matches || 'ontouchstart' in window;
      const isFinePointer = finePointerQuery.matches;
      const shouldReduceEffects = isReducedMotion || isTouchDevice || compactViewport;

      setProfile({
        isReducedMotion,
        isTouchDevice,
        isFinePointer,
        isCompactViewport: compactViewport,
        shouldReduceEffects,
        shouldEnableHeavyEffects: isFinePointer && !shouldReduceEffects,
      });
    };

    update();

    reducedMotionQuery.addEventListener('change', update);
    finePointerQuery.addEventListener('change', update);
    touchQuery.addEventListener('change', update);
    window.addEventListener('resize', update, { passive: true });

    return () => {
      reducedMotionQuery.removeEventListener('change', update);
      finePointerQuery.removeEventListener('change', update);
      touchQuery.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return profile;
}
