'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING CORE...');
  const [show, setShow] = useState(true);

  const statuses = [
    'ENCRYPTING DATA STREAMS...',
    'CALIBRATING NEURAL NETWORK...',
    'ESTABLISHING SECURE UPLINK...',
    'LOADING OPERATIONAL DOSSIER...',
    'SYSTEM READY.'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setShow(false);
            setTimeout(onComplete, 1000);
          }, 800);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatus(statuses[Math.floor((progress / 100) * (statuses.length - 1))]);
    }, 800);
    return () => clearInterval(statusInterval);
  }, [progress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[1000] bg-[#06060a] flex flex-col items-center justify-center overflow-hidden"
          exit={{ 
            y: '-100%',
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          {/* Background Grid & Scanlines */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] via-transparent to-[#06060a]" />
            <div className="absolute inset-0 w-full h-[2px] bg-[#ff6b00]/20 animate-scanline z-10" />
          </div>

          {/* 3D Animated Core */}
          <div className="relative z-10 mb-20 perspective-[1000px]">
            <motion.div
              className="w-40 h-40 relative preserve-3d"
              animate={{ 
                rotateY: 360,
                rotateX: [0, 10, -10, 0],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {/* Outer Wireframe Rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 border-[#ff6b00]/30 rounded-full"
                  style={{ rotateZ: i * 60 }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotateZ: [i * 60, i * 60 + 360]
                  }}
                  transition={{ 
                    duration: 4 + i, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              ))}

              {/* Inner Pulsing Core */}
              <div className="absolute inset-4 rounded-full bg-[#ff6b00] blur-3xl opacity-20 animate-pulse" />
              <div className="absolute inset-10 rounded-full border border-[#ff6b00] flex items-center justify-center">
                <div className="w-2 h-2 bg-[#ff6b00] rounded-full shadow-[0_0_20px_#ff6b00]" />
              </div>
            </motion.div>
          </div>

          {/* Progress & Status */}
          <div className="relative z-10 w-full max-w-md px-10 space-y-6">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-[0.5em] text-[#ff6b00] font-black animate-pulse">
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
                transition={{ duration: 0.2 }}
              />
              {/* Ghost Bar */}
              <motion.div 
                className="absolute inset-y-0 left-0 bg-[#ff6b00]/20"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress + 10, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Bottom Meta */}
            <div className="flex justify-between text-[8px] uppercase tracking-[0.4em] text-white/10 font-bold">
              <span>Auth: PK-ADMIN-01</span>
              <span>Loc: 28.6139 N, 77.2090 E</span>
            </div>
          </div>

          {/* Floating UI Bits */}
          <div className="absolute top-10 left-10 text-[10px] font-mono text-white/10 space-y-1 z-10">
            <div>&gt; CHK_ROOT: OK</div>
            <div>&gt; MEM_SYNC: 8192MB</div>
            <div>&gt; GPU_ACCEL: ENABLED</div>
          </div>
          <div className="absolute bottom-10 right-10 text-[10px] font-mono text-white/10 text-right space-y-1 z-10">
            <div>v2.4.0_PROD</div>
            <div>STABLE_RELEASE</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
