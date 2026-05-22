'use client';

import { usePerformanceProfile } from '@/hooks/usePerformanceProfile';

export const CinematicBackground = () => {
  const { shouldReduceEffects } = usePerformanceProfile();

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Base darkness + warm/cool washes */}
      <div className="absolute inset-0 bg-[#06060a]" />
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          background:
            'radial-gradient(80% 60% at 18% 20%, rgba(168,85,247,0.14) 0%, transparent 62%), radial-gradient(70% 65% at 85% 30%, rgba(192,132,252,0.11) 0%, transparent 64%), radial-gradient(60% 70% at 50% 100%, rgba(124,58,237,0.12) 0%, transparent 67%)',
          filter: 'blur(14px)',
        }}
      />

      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Tiny star dots */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1.5px)',
          backgroundSize: '120px 120px',
        }}
      />

      {/* Accent color points */}
      <div
        className="absolute inset-0 opacity-[0.32]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 6% 22%, rgba(255,110,60,0.65) 0 2px, transparent 3px),
            radial-gradient(circle at 22% 67%, rgba(255,206,110,0.6) 0 2px, transparent 3px),
            radial-gradient(circle at 35% 8%, rgba(255,210,120,0.65) 0 2px, transparent 3px),
            radial-gradient(circle at 62% 31%, rgba(255,120,60,0.6) 0 2px, transparent 3px),
            radial-gradient(circle at 82% 70%, rgba(255,100,50,0.62) 0 2px, transparent 3px),
            radial-gradient(circle at 94% 18%, rgba(255,210,110,0.58) 0 2px, transparent 3px)
          `,
        }}
      />

      {/* Horizontal light streaks */}
      {!shouldReduceEffects && (
        <div className="absolute inset-0">
          <span className="cine-line cine-line-a" />
          <span className="cine-line cine-line-b" />
          <span className="cine-line cine-line-c" />
        </div>
      )}

      {/* Arc overlays */}
      <div className="absolute -bottom-[35%] right-[-5%] w-[64vw] h-[64vw] rounded-full border border-white/[0.05]" />
      <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[18vw] h-[18vw] rounded-full border border-[#f4be5e]/[0.28]" />
      <div className="absolute top-[24%] left-1/2 -translate-x-1/2 w-[23vw] h-[23vw] rounded-full border border-[#ff8d4f]/[0.17]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.42)_100%)]" />

      <style jsx global>{`
        .cine-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.75),
            rgba(255, 255, 255, 0)
          );
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.16);
          opacity: 0.38;
        }

        .cine-line-a {
          width: 220px;
          top: 41%;
          left: 26%;
          animation: cinePulse 4.6s ease-in-out infinite;
        }

        .cine-line-b {
          width: 260px;
          top: 78%;
          left: 44%;
          animation: cinePulse 5.4s ease-in-out infinite;
          animation-delay: 1.2s;
        }

        .cine-line-c {
          width: 130px;
          top: 51%;
          left: 84%;
          animation: cinePulse 5.8s ease-in-out infinite;
          animation-delay: 2.1s;
        }

        @keyframes cinePulse {
          0% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.45;
          }
          100% {
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
};
