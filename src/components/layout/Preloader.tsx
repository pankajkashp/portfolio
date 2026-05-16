'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUSES = [
  'ENCRYPTING DATA STREAMS...',
  'CALIBRATING NEURAL NETWORK...',
  'ESTABLISHING SECURE UPLINK...',
  'LOADING OPERATIONAL DOSSIER...',
  'SYSTEM READY.'
];

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING CORE...');
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hero-preloader-shown');
    if (hasVisited) {
      const hideTimer = window.setTimeout(() => {
        setShow(false);
        onComplete();
      }, 0);
      return () => window.clearTimeout(hideTimer);
    }

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.max(8, Math.random() * 18);
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setStatus(STATUSES[STATUSES.length - 1]);
        clearInterval(interval);
        
        setTimeout(() => {
          sessionStorage.setItem('hero-preloader-shown', 'true');
          setShow(false);
          setTimeout(onComplete, 350);
        }, 500);
      } else {
        setProgress(currentProgress);
        const statusIndex = Math.floor((currentProgress / 100) * (STATUSES.length - 1));
        setStatus(STATUSES[statusIndex]);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[1000] bg-[#06060a] flex flex-col items-center justify-center overflow-hidden"
          exit={{ 
            opacity: 0,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
          }}
        >
          {/* Background Grid & Scanlines */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] via-transparent to-[#06060a]" />
          </div>

          {/* 3D Animated Core */}
          <div className="relative z-10 mb-20 perspective-[1000px] motion-heavy">
            <motion.div
              className="w-40 h-40 relative preserve-3d"
              animate={{ rotateX: [0, 10, 0], rotateY: [0, 8, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Outer Wireframe Rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 border-[#ff6b00]/30 rounded-full"
                  style={{ rotateZ: i * 60 }}
                  animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.5, 0.25] }}
                  transition={{ duration: 2.8 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}

              {/* Inner Pulsing Core */}
              <div className="absolute inset-4 rounded-full bg-[#ff6b00]/20 blur-2xl opacity-20 motion-heavy" />
              <div className="absolute inset-10 rounded-full border border-[#ff6b00] flex items-center justify-center">
                <div className="w-2 h-2 bg-[#ff6b00] rounded-full shadow-[0_0_20px_#ff6b00]" />
              </div>
            </motion.div>
          </div>

          {/* Progress & Status */}
          <div className="relative z-10 w-full max-w-md px-10 space-y-6">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-[0.5em] text-[#ff6b00] font-black">
                  System Status
                </div>
                <div className="text-xs font-mono text-white/40 tracking-widest">
                  {status}
                </div>
              </div>
              <div className="text-4xl font-black text-white tracking-tighter">
                {Math.round(progress)}<span className="text-white/20 text-xl">%</span>
              </div>
            </div>

            {/* Futuristic Progress Bar */}
            <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-[#ff6b00] shadow-[0_0_15px_#ff6b00]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.12 }}
              />
              {/* Ghost Bar */}
              <motion.div 
                className="absolute inset-y-0 left-0 bg-[#ff6b00]/20"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress + 10, 100)}%` }}
                transition={{ duration: 0.25 }}
              />
            </div>

            {/* Bottom Meta */}
            <div className="flex justify-between text-[8px] uppercase tracking-[0.4em] text-white/10 font-bold">
              <span>Auth: PK-ADMIN-01</span>
              <span>Loc: 28.6139 N, 77.2090 E</span>
            </div>
          </div>

          {/* Floating UI Bits */}
          <div className="absolute top-10 left-10 text-[10px] font-mono text-white/10 space-y-1 z-10 motion-heavy">
            <div>&gt; CHK_ROOT: OK</div>
            <div>&gt; MEM_SYNC: 8192MB</div>
            <div>&gt; GPU_ACCEL: ENABLED</div>
          </div>
          <div className="absolute bottom-10 right-10 text-[10px] font-mono text-white/10 text-right space-y-1 z-10 motion-heavy">
            <div>v2.4.0_PROD</div>
            <div>STABLE_RELEASE</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
