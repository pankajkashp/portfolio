'use client';

import { usePerformanceProfile } from '@/hooks/usePerformanceProfile';

export const CinematicBackground = () => {
  const { shouldReduceEffects } = usePerformanceProfile();

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Gradient Mesh — CSS only, zero JS overhead */}
      <div
        className={`absolute top-0 right-0 w-[42vw] h-[42vh] rounded-full opacity-[0.06] motion-heavy ${shouldReduceEffects ? 'hidden' : ''}`}
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.28) 0%, transparent 72%)',
          filter: 'blur(120px)',
          transform: 'translate3d(0,0,0)',
        }}
      />
      <div
        className={`absolute bottom-0 left-0 w-[34vw] h-[34vh] rounded-full opacity-[0.03] motion-heavy ${shouldReduceEffects ? 'hidden' : ''}`}
        style={{
          background: 'radial-gradient(circle, rgba(192,132,252,0.22) 0%, transparent 72%)',
          filter: 'blur(110px)',
          transform: 'translate3d(0,0,0)',
        }}
      />

      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }} />

      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />
    </div>
  );
};
