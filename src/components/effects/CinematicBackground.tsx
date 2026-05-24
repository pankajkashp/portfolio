'use client';

import { usePerformanceProfile } from '@/hooks/usePerformanceProfile';

export const CinematicBackground = () => {
  const { shouldReduceEffects } = usePerformanceProfile();

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#06060a]" />

      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          background:
            'radial-gradient(80% 60% at 18% 20%, rgba(168,85,247,0.14) 0%, transparent 62%), radial-gradient(70% 65% at 85% 30%, rgba(192,132,252,0.11) 0%, transparent 64%), radial-gradient(60% 70% at 50% 100%, rgba(124,58,237,0.12) 0%, transparent 67%)',
          filter: 'blur(14px)',
        }}
      />

      <div
        className={`absolute -inset-[80px] opacity-[0.22] ${shouldReduceEffects ? '' : 'grid-pan'}`}
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

      {!shouldReduceEffects && (
        <div className="absolute inset-0">
          <span className="cine-line cine-line-a" />
          <span className="cine-line cine-line-b" />
          <span className="cine-line cine-line-c" />
        </div>
      )}

      <div className="absolute -bottom-[35%] right-[-5%] h-[64vw] w-[64vw] rounded-full border border-white/[0.05]" />
      <div className="absolute left-1/2 top-[22%] h-[18vw] w-[18vw] -translate-x-1/2 rounded-full border border-[#f4be5e]/[0.28]" />
      <div className="absolute left-1/2 top-[24%] h-[23vw] w-[23vw] -translate-x-1/2 rounded-full border border-[#ff8d4f]/[0.17]" />

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
