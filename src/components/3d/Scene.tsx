'use client';

import { Canvas } from '@react-three/fiber';
import { Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { ReactNode, Suspense } from 'react';

interface SceneProps {
  children: ReactNode;
  className?: string;
}

export const Scene = ({ children, className }: SceneProps) => {
  return (
    <div className={`relative ${className || ''}`}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
};
